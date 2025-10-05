// ========================================
// LEARNENRICH - ASSIGNMENTS PAGE
// ========================================

let currentAssignmentFilter = 'all';

// Load assignments page
function loadAssignmentsPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    updateAssignmentStats();
    displayAssignments();
}

// Update assignment statistics
function updateAssignmentStats() {
    const courses = getUserCourses();
    const allAssignments = [];
    
    courses.forEach(course => {
        if (course.enrolled) {
            course.assignments.forEach(assignment => {
                allAssignments.push({
                    ...assignment,
                    courseTitle: course.title,
                    courseCode: course.code
                });
            });
        }
    });
    
    const pending = allAssignments.filter(a => a.status === 'pending').length;
    const submitted = allAssignments.filter(a => a.status === 'submitted').length;
    const graded = allAssignments.filter(a => a.status === 'graded').length;
    
    const gradedAssignments = allAssignments.filter(a => a.grade !== null);
    const average = gradedAssignments.length > 0 
        ? (gradedAssignments.reduce((sum, a) => sum + a.grade, 0) / gradedAssignments.length).toFixed(1)
        : '--';
    
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('submittedCount').textContent = submitted;
    document.getElementById('gradedCount').textContent = graded;
    document.getElementById('averageGrade').textContent = average !== '--' ? average + '%' : average;
}

// Filter assignments
function filterAssignments(filter) {
    currentAssignmentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayAssignments();
}

// Display assignments
function displayAssignments() {
    const courses = getUserCourses();
    const allAssignments = [];
    
    courses.forEach(course => {
        if (course.enrolled) {
            course.assignments.forEach(assignment => {
                allAssignments.push({
                    ...assignment,
                    courseTitle: course.title,
                    courseCode: course.code,
                    courseId: course.id
                });
            });
        }
    });
    
    // Filter assignments
    let filtered = allAssignments;
    if (currentAssignmentFilter !== 'all') {
        filtered = allAssignments.filter(a => a.status === currentAssignmentFilter);
    }
    
    // Sort by due date
    filtered.sort((a, b) => new Date(a.due) - new Date(b.due));
    
    const container = document.getElementById('assignmentsList');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>No assignments found</h3>
                <p>You don't have any assignments in this category</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(assignment => {
        const daysUntilDue = Math.ceil((new Date(assignment.due) - new Date()) / (1000 * 60 * 60 * 24));
        const urgency = daysUntilDue <= 3 ? 'urgent' : daysUntilDue <= 7 ? 'soon' : 'normal';
        const isPastDue = daysUntilDue < 0;
        
        return `
            <div class="assignment-card ${assignment.status}">
                <div class="assignment-header">
                    <div>
                        <h3>${assignment.title}</h3>
                        <p class="course-info">
                            <span class="course-badge">${assignment.courseCode}</span>
                            ${assignment.courseTitle}
                        </p>
                    </div>
                    <div class="status-badge status-${assignment.status}">
                        ${getStatusIcon(assignment.status)} ${assignment.status.toUpperCase()}
                    </div>
                </div>
                
                <div class="assignment-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>Due: ${new Date(assignment.due).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}</span>
                        ${isPastDue && assignment.status === 'pending' ? 
                            '<span class="overdue-badge">OVERDUE</span>' : 
                            assignment.status === 'pending' ?
                            `<span class="days-remaining ${urgency}">${daysUntilDue} days left</span>` : 
                            ''
                        }
                    </div>
                    
                    ${assignment.submitDate ? `
                        <div class="detail-item">
                            <i class="fas fa-check"></i>
                            <span>Submitted: ${new Date(assignment.submitDate).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}</span>
                        </div>
                    ` : ''}
                    
                    ${assignment.grade !== null ? `
                        <div class="detail-item">
                            <i class="fas fa-star"></i>
                            <span>Grade: <strong class="grade-value ${getGradeClass(assignment.grade)}">${assignment.grade}%</strong></span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="assignment-actions">
                    ${assignment.status === 'pending' ? `
                        <button class="btn-primary" onclick="openSubmitModal(${assignment.courseId}, ${assignment.id})">
                            <i class="fas fa-upload"></i> Submit Assignment
                        </button>
                    ` : assignment.status === 'submitted' ? `
                        <button class="btn-secondary" disabled>
                            <i class="fas fa-clock"></i> Awaiting Grade
                        </button>
                    ` : `
                        <button class="btn-success" onclick="viewFeedback(${assignment.courseId}, ${assignment.id})">
                            <i class="fas fa-comment"></i> View Feedback
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Get status icon
function getStatusIcon(status) {
    const icons = {
        pending: '<i class="fas fa-clock"></i>',
        submitted: '<i class="fas fa-check-circle"></i>',
        graded: '<i class="fas fa-star"></i>'
    };
    return icons[status] || '';
}

// Get grade class
function getGradeClass(grade) {
    if (grade >= 90) return 'grade-a';
    if (grade >= 80) return 'grade-b';
    if (grade >= 70) return 'grade-c';
    if (grade >= 60) return 'grade-d';
    return 'grade-f';
}

// Open submit modal
function openSubmitModal(courseId, assignmentId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    const assignment = course.assignments.find(a => a.id === assignmentId);
    
    document.getElementById('submitModalContent').innerHTML = `
        <div class="submit-form">
            <div class="form-info">
                <h3>${assignment.title}</h3>
                <p class="course-info">
                    <span class="course-badge">${course.code}</span>
                    ${course.title}
                </p>
                <p class="due-info">
                    <i class="fas fa-calendar"></i>
                    Due: ${new Date(assignment.due).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </p>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-file-upload"></i> Upload Your Work</label>
                <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click to select files or drag and drop</p>
                    <small>PDF, DOC, DOCX, ZIP (Max 10MB)</small>
                </div>
                <input type="file" id="fileInput" accept=".pdf,.doc,.docx,.zip" style="display: none">
                <div id="fileList" class="file-list"></div>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-comment"></i> Comments (Optional)</label>
                <textarea id="assignmentComments" rows="4" placeholder="Add any comments or notes for your instructor..."></textarea>
            </div>
            
            <div class="form-actions">
                <button class="btn-primary btn-large" onclick="submitAssignment(${courseId}, ${assignmentId})">
                    <i class="fas fa-paper-plane"></i> Submit Assignment
                </button>
                <button class="btn-secondary btn-large" onclick="closeSubmitModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    // File input handler
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const fileList = document.getElementById('fileList');
        const files = Array.from(e.target.files);
        
        fileList.innerHTML = files.map(file => `
            <div class="file-item">
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <small>${(file.size / 1024).toFixed(1)} KB</small>
            </div>
        `).join('');
    });
    
    document.getElementById('submitModal').classList.add('active');
}

// Close submit modal
function closeSubmitModal() {
    document.getElementById('submitModal').classList.remove('active');
}

// Submit assignment
function submitAssignment(courseId, assignmentId) {
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput.files.length === 0) {
        showCustomAlert('⚠️ Please Upload Files', 'Please upload your assignment files before submitting.', 'warning');
        return;
    }
    
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    const assignment = course.assignments.find(a => a.id === assignmentId);

    const commentsField = document.getElementById('assignmentComments');
    const comments = commentsField ? commentsField.value.trim() : '';
    const uploadedFiles = Array.from(fileInput.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
    }));

    showConfirm(
        `Submit "${assignment.title}"?\n\nOnce submitted, you won't be able to replace the files until it is graded.`,
        'warning',
        'Submit Assignment?'
    ).then(confirmed => {
        if (!confirmed) {
            return;
        }

        assignment.status = 'submitted';
        assignment.submitDate = new Date().toISOString();
        assignment.submission = {
            files: uploadedFiles,
            comments,
            submittedAt: assignment.submitDate,
        };

        saveUserCourses(courses);
        closeSubmitModal();

        showSubmissionSuccessModal(assignment.title);

        // Simulate grading after 2 seconds
        setTimeout(() => {
            const randomGrade = Math.floor(Math.random() * 20) + 75; // 75-95
            assignment.status = 'graded';
            assignment.grade = randomGrade;
            assignment.feedback = getRandomFeedback(randomGrade);
            saveUserCourses(courses);

            showGradingCompleteModal(assignment.title, randomGrade);

            loadAssignmentsPage();
        }, 2000);

        loadAssignmentsPage();
    });
}

// Show submission success modal
function showSubmissionSuccessModal(assignmentTitle) {
    const modalHTML = `
        <div class="custom-modal-overlay" id="submissionSuccessModal" onclick="closeSubmissionSuccessModal()">
            <div class="custom-modal-content success-modal" onclick="event.stopPropagation()">
                <div class="modal-icon success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Assignment Submitted!</h2>
                <p class="modal-message">
                    <strong>"${assignmentTitle}"</strong> has been submitted successfully.
                </p>
                <div class="submission-status-box">
                    <div class="status-item">
                        <i class="fas fa-paper-plane"></i>
                        <span>Submitted</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-clock"></i>
                        <span>Grading in progress...</span>
                    </div>
                </div>
                <p class="modal-note">
                    You will receive your grade soon. Check back in a few moments!
                </p>
                <button class="btn-primary" onclick="closeSubmissionSuccessModal()">
                    <i class="fas fa-check"></i> Okay
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show grading complete modal
function showGradingCompleteModal(assignmentTitle, grade) {
    const modalHTML = `
        <div class="custom-modal-overlay" id="gradingCompleteModal" onclick="closeGradingCompleteModal()">
            <div class="custom-modal-content grading-modal" onclick="event.stopPropagation()">
                <div class="modal-icon ${grade >= 85 ? 'success-icon' : 'warning-icon'}">
                    <i class="fas ${grade >= 85 ? 'fa-trophy' : 'fa-star'}"></i>
                </div>
                <h2>Assignment Graded!</h2>
                <p class="modal-message">
                    <strong>"${assignmentTitle}"</strong> has been graded.
                </p>
                <div class="grade-display-box">
                    <div class="grade-circle ${grade >= 85 ? 'excellent' : grade >= 75 ? 'good' : 'needs-work'}">
                        <span class="grade-number">${grade}%</span>
                    </div>
                    <p class="grade-label">${grade >= 90 ? 'Excellent Work!' : grade >= 80 ? 'Great Job!' : 'Good Effort!'}</p>
                </div>
                <p class="modal-note">
                    <i class="fas fa-comment-dots"></i> View detailed feedback in the Assignments page.
                </p>
                <button class="btn-primary" onclick="closeGradingCompleteModal()">
                    <i class="fas fa-check"></i> View Assignments
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close submission success modal
function closeSubmissionSuccessModal() {
    const modal = document.getElementById('submissionSuccessModal');
    if (modal) {
        modal.remove();
    }
}

// Close grading complete modal
function closeGradingCompleteModal() {
    const modal = document.getElementById('gradingCompleteModal');
    if (modal) {
        modal.remove();
    }
}

// Get random feedback
function getRandomFeedback(grade) {
    const feedbacks = {
        excellent: [
            'Excellent work! Your understanding of the concepts is outstanding.',
            'Outstanding submission! You demonstrated mastery of the material.',
            'Exceptional work! Your analysis was thorough and well-presented.'
        ],
        good: [
            'Good work! You showed solid understanding of the key concepts.',
            'Well done! Your work demonstrates good comprehension.',
            'Nice job! You covered the main points effectively.'
        ],
        satisfactory: [
            'Satisfactory work. Consider reviewing the feedback for improvement.',
            'Good effort. There are areas where you can strengthen your understanding.',
            'Acceptable work. Review the comments to improve next time.'
        ]
    };
    
    if (grade >= 90) return feedbacks.excellent[Math.floor(Math.random() * feedbacks.excellent.length)];
    if (grade >= 80) return feedbacks.good[Math.floor(Math.random() * feedbacks.good.length)];
    return feedbacks.satisfactory[Math.floor(Math.random() * feedbacks.satisfactory.length)];
}

// View feedback
function viewFeedback(courseId, assignmentId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    const assignment = course.assignments.find(a => a.id === assignmentId);
    
    alert(`📝 Assignment Feedback\n\n${assignment.title}\nGrade: ${assignment.grade}%\n\n${assignment.feedback || 'No feedback available yet.'}`);
}

// Add styles
const assignmentsStyle = document.createElement('style');
assignmentsStyle.textContent = `
    .assignment-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .stat-box {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .stat-box i {
        font-size: 2.5rem;
    }
    
    .stat-box h3 {
        font-size: 2rem;
        margin: 0;
        color: #1f2937;
    }
    
    .stat-box p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .pending-box i { color: #f59e0b; }
    .submitted-box i { color: #3b82f6; }
    .graded-box i { color: #10b981; }
    .average-box i { color: #8b5cf6; }
    
    .assignments-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .assignment-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border-left: 4px solid #e5e7eb;
        transition: all 0.3s;
    }
    
    .assignment-card:hover {
        transform: translateX(8px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .assignment-card.pending {
        border-left-color: #f59e0b;
    }
    
    .assignment-card.submitted {
        border-left-color: #3b82f6;
    }
    
    .assignment-card.graded {
        border-left-color: #10b981;
    }
    
    .assignment-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 1rem;
    }
    
    .assignment-header h3 {
        font-size: 1.25rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
    }
    
    .course-info {
        color: #6b7280;
        font-size: 0.875rem;
        margin: 0;
    }
    
    .course-badge {
        display: inline-block;
        background: #eff6ff;
        color: #2563eb;
        padding: 0.25rem 0.625rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.75rem;
        margin-right: 0.5rem;
    }
    
    .status-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        white-space: nowrap;
    }
    
    .status-pending {
        background: #fef3c7;
        color: #d97706;
    }
    
    .status-submitted {
        background: #dbeafe;
        color: #1d4ed8;
    }
    
    .status-graded {
        background: #d1fae5;
        color: #047857;
    }
    
    .assignment-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .detail-item i {
        color: #2563eb;
        width: 20px;
    }
    
    .days-remaining {
        margin-left: auto;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.75rem;
    }
    
    .days-remaining.urgent {
        background: #fee2e2;
        color: #dc2626;
    }
    
    .days-remaining.soon {
        background: #fed7aa;
        color: #ea580c;
    }
    
    .days-remaining.normal {
        background: #e0e7ff;
        color: #4f46e5;
    }
    
    .overdue-badge {
        margin-left: auto;
        background: #fee2e2;
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.75rem;
    }
    
    .grade-value {
        font-size: 1.125rem;
    }
    
    .grade-a { color: #059669; }
    .grade-b { color: #10b981; }
    .grade-c { color: #f59e0b; }
    .grade-d { color: #f97316; }
    .grade-f { color: #ef4444; }
    
    .assignment-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .assignment-actions button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .assignment-actions button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .btn-success {
        background: #10b981;
        color: white;
    }
    
    .btn-success:hover {
        background: #059669;
    }
    
    .submit-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .form-info h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }
    
    .due-info {
        color: #6b7280;
        margin-top: 0.5rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .form-group label {
        font-weight: 600;
        color: #374151;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .file-upload-area {
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .file-upload-area:hover {
        border-color: #2563eb;
        background: #eff6ff;
    }
    
    .file-upload-area i {
        font-size: 3rem;
        color: #2563eb;
        margin-bottom: 1rem;
    }
    
    .file-upload-area p {
        color: #1f2937;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .file-upload-area small {
        color: #6b7280;
    }
    
    .file-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .file-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 8px;
    }
    
    .file-item i {
        color: #2563eb;
        font-size: 1.25rem;
    }
    
    .file-item span {
        flex: 1;
        color: #1f2937;
        font-weight: 600;
    }
    
    .file-item small {
        color: #6b7280;
    }
    
    textarea {
        padding: 0.875rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.875rem;
        resize: vertical;
        transition: border-color 0.3s;
    }
    
    textarea:focus {
        outline: none;
        border-color: #2563eb;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
        .assignment-header {
            flex-direction: column;
            gap: 1rem;
        }
        
        .assignment-actions,
        .form-actions {
            flex-direction: column;
        }
        
        .assignment-actions button,
        .form-actions button {
            width: 100%;
        }
    }
`;
document.head.appendChild(assignmentsStyle);

// Initialize
if (window.location.pathname.includes('assignments.html')) {
    loadAssignmentsPage();
}

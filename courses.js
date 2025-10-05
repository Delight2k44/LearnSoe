// ========================================
// LEARNENRICH - COURSES PAGE
// ========================================

let currentFilter = 'all';

// Load courses page
function loadCoursesPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    displayCourses();
}

// Filter courses
function filterCourses(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayCourses();
}

// Display courses
function displayCourses() {
    const courses = getUserCourses();
    let filtered = courses;
    
    switch(currentFilter) {
        case 'enrolled':
            filtered = courses.filter(c => c.enrolled);
            break;
        case 'in-progress':
            filtered = courses.filter(c => c.enrolled && c.progress > 0 && c.progress < 100);
            break;
        case 'completed':
            filtered = courses.filter(c => c.progress === 100);
            break;
    }
    
    const container = document.getElementById('coursesGrid');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No courses found</h3>
                <p>Try selecting a different filter or enroll in a new course</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(course => `
        <div class="course-detail-card">
            <div class="course-detail-header ${course.level.toLowerCase()}">
                <div class="course-icon">
                    <i class="fas ${getCourseIcon(course.code)}"></i>
                </div>
                <span class="course-level-badge">${course.level}</span>
            </div>
            
            <div class="course-detail-body">
                <h3>${course.title}</h3>
                <p class="course-code">${course.code}</p>
                <p class="course-description">${course.description}</p>
                
                <div class="course-meta-grid">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${course.duration}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-book"></i>
                        <span>${course.modules} Modules</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>${course.instructor}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-signal"></i>
                        <span>${course.level}</span>
                    </div>
                </div>
                
                ${course.enrolled ? `
                    <div class="course-progress-section">
                        <div class="progress-header">
                            <span>Progress</span>
                            <strong>${course.progress}%</strong>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="course-actions">
                    ${course.enrolled ? `
                        <button class="btn-primary" onclick="continueLearning(${course.id})">
                            <i class="fas fa-play"></i> Continue Learning
                        </button>
                        <button class="btn-secondary" onclick="viewCourseDetails(${course.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    ` : `
                        <button class="btn-primary" onclick="enrollCourse(${course.id})">
                            <i class="fas fa-plus"></i> Enroll Now
                        </button>
                        <button class="btn-secondary" onclick="viewCourseDetails(${course.id})">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

// Get course icon
function getCourseIcon(code) {
    const icons = {
        'SOLAR-101': 'fa-solar-panel',
        'WIND-101': 'fa-wind',
        'EFFICIENCY-101': 'fa-lightbulb',
        'STORAGE-201': 'fa-battery-full'
    };
    return icons[code] || 'fa-book';
}

// Enroll in course
function enrollCourse(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    if (course.enrolled) {
        alert('✅ You are already enrolled in this course!');
        return;
    }
    
    if (confirm(`Enroll in "${course.title}"?\n\nThis course includes:\n• ${course.modules} modules\n• ${course.assignments.length} assignments\n• Final exam with ${course.exam.questions} questions`)) {
        course.enrolled = true;
        course.enrollDate = new Date().toISOString();
        saveUserCourses(courses);
        
        alert(`✅ Successfully enrolled in ${course.title}!\n\nStart learning now to begin your journey.`);
        displayCourses();
    }
}

// Continue learning
function continueLearning(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course || !course.enrolled) return;
    
    // Go to course content page
    window.location.href = `course-content.html?course=${course.code}`;
}

// View course details
function viewCourseDetails(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    document.getElementById('modalCourseTitle').textContent = course.title;
    document.getElementById('courseModalContent').innerHTML = `
        <div class="course-detail-full">
            <div class="detail-section">
                <h3><i class="fas fa-info-circle"></i> Course Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Course Code:</strong>
                        <span>${course.code}</span>
                    </div>
                    <div class="info-item">
                        <strong>Level:</strong>
                        <span>${course.level}</span>
                    </div>
                    <div class="info-item">
                        <strong>Duration:</strong>
                        <span>${course.duration}</span>
                    </div>
                    <div class="info-item">
                        <strong>Modules:</strong>
                        <span>${course.modules}</span>
                    </div>
                    <div class="info-item">
                        <strong>Instructor:</strong>
                        <span>${course.instructor}</span>
                    </div>
                    <div class="info-item">
                        <strong>Passing Score:</strong>
                        <span>${course.exam.passingScore}%</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-align-left"></i> Description</h3>
                <p>${course.description}</p>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-star"></i> Skills You'll Learn</h3>
                <div class="skills-grid">
                    ${course.skills.map(skill => `
                        <div class="skill-badge">
                            <i class="fas fa-check-circle"></i> ${skill}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-tasks"></i> Assignments (${course.assignments.length})</h3>
                <ul class="assignments-list">
                    ${course.assignments.map(assignment => `
                        <li>
                            <i class="fas fa-file-alt"></i>
                            ${assignment.title}
                            <span class="due-badge">Due: ${new Date(assignment.due).toLocaleDateString()}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-file-alt"></i> Final Exam</h3>
                <div class="exam-info">
                    <p><strong>${course.exam.title}</strong></p>
                    <ul>
                        <li><i class="fas fa-question-circle"></i> ${course.exam.questions} questions</li>
                        <li><i class="fas fa-clock"></i> ${course.exam.duration} minutes</li>
                        <li><i class="fas fa-check"></i> ${course.exam.passingScore}% to pass</li>
                        <li><i class="fas fa-redo"></i> ${course.exam.maxAttempts} attempts allowed</li>
                    </ul>
                </div>
            </div>
            
            <div class="modal-actions">
                ${course.enrolled ? `
                    <button class="btn-primary btn-large" onclick="closeCourseModal(); continueLearning(${course.id})">
                        <i class="fas fa-play"></i> Continue Learning
                    </button>
                ` : `
                    <button class="btn-primary btn-large" onclick="closeCourseModal(); enrollCourse(${course.id})">
                        <i class="fas fa-plus"></i> Enroll in This Course
                    </button>
                `}
                <button class="btn-secondary btn-large" onclick="closeCourseModal()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('courseModal').classList.add('active');
}

// Close course modal
function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
}

// Add styles for courses page
const coursesStyle = document.createElement('style');
coursesStyle.textContent = `
    .filter-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 0.5rem;
    }
    
    .filter-tab {
        padding: 0.75rem 1.5rem;
        background: transparent;
        border: none;
        color: #6b7280;
        font-weight: 600;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.3s;
    }
    
    .filter-tab:hover {
        color: #2563eb;
    }
    
    .filter-tab.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
    }
    
    .courses-detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 2rem;
    }
    
    .course-detail-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        border: 2px solid transparent;
    }
    
    .course-detail-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        border-color: #2563eb;
    }
    
    .course-detail-header {
        height: 180px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    .course-detail-header.beginner {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    
    .course-detail-header.intermediate {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    
    .course-detail-header.advanced {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }
    
    .course-icon {
        font-size: 5rem;
        color: white;
    }
    
    .course-level-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.875rem;
        backdrop-filter: blur(10px);
    }
    
    .course-detail-body {
        padding: 1.5rem;
    }
    
    .course-detail-body h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }
    
    .course-code {
        display: inline-block;
        background: #eff6ff;
        color: #2563eb;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .course-description {
        color: #6b7280;
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
    
    .course-meta-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    
    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .meta-item i {
        color: #2563eb;
    }
    
    .course-progress-section {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }
    
    .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        font-size: 0.875rem;
    }
    
    .progress-header strong {
        color: #2563eb;
        font-size: 1.125rem;
    }
    
    .course-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .course-actions button {
        flex: 1;
        padding: 0.875rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .btn-primary {
        background: #2563eb;
        color: white;
    }
    
    .btn-primary:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
    }
    
    .btn-secondary {
        background: white;
        color: #2563eb;
        border: 2px solid #2563eb;
    }
    
    .btn-secondary:hover {
        background: #eff6ff;
    }
    
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: #6b7280;
    }
    
    .empty-state i {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
    }
    
    .modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    
    .modal-container {
        position: relative;
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        border-bottom: 1px solid #e5e7eb;
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
    }
    
    .modal-header h2 {
        font-size: 1.75rem;
        color: #1f2937;
    }
    
    .modal-close {
        background: #f3f4f6;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.25rem;
        color: #6b7280;
        transition: all 0.3s;
    }
    
    .modal-close:hover {
        background: #e5e7eb;
        color: #1f2937;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .detail-section {
        margin-bottom: 2rem;
    }
    
    .detail-section h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: #1f2937;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .detail-section h3 i {
        color: #2563eb;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .info-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 8px;
    }
    
    .info-item strong {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .info-item span {
        color: #1f2937;
        font-weight: 600;
    }
    
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
    }
    
    .skill-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: #ecfdf5;
        color: #059669;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
    }
    
    .skill-badge i {
        color: #10b981;
    }
    
    .assignments-list {
        list-style: none;
    }
    
    .assignments-list li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .assignments-list li:last-child {
        border-bottom: none;
    }
    
    .assignments-list i {
        color: #2563eb;
        margin-right: 0.75rem;
    }
    
    .due-badge {
        background: #fef3c7;
        color: #d97706;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .exam-info {
        background: #eff6ff;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #2563eb;
    }
    
    .exam-info p {
        margin-bottom: 1rem;
        color: #1f2937;
    }
    
    .exam-info ul {
        list-style: none;
    }
    
    .exam-info li {
        padding: 0.5rem 0;
        color: #6b7280;
    }
    
    .exam-info i {
        color: #2563eb;
        margin-right: 0.75rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .btn-large {
        padding: 1rem 2rem;
        font-size: 1.125rem;
    }
    
    @media (max-width: 768px) {
        .courses-detail-grid {
            grid-template-columns: 1fr;
        }
        
        .info-grid,
        .skills-grid,
        .course-meta-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-container {
            width: 95%;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(coursesStyle);

// Initialize
if (window.location.pathname.includes('courses.html')) {
    loadCoursesPage();
}

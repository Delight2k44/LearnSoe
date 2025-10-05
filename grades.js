// ========================================
// LEARNENRICH - GRADES PAGE
// ========================================

// Load grades page
function loadGradesPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    calculateOverallPerformance();
    displayCourseGrades();
}

// Calculate overall performance
function calculateOverallPerformance() {
    const courses = getUserCourses();
    const enrolledCourses = courses.filter(c => c.enrolled);
    
    let allGrades = [];
    let totalGraded = 0;
    
    enrolledCourses.forEach(course => {
        // Add assignment grades
        course.assignments.forEach(assignment => {
            if (assignment.grade !== null) {
                allGrades.push(assignment.grade);
                totalGraded++;
            }
        });
        
        // Add exam grades
        if (course.exam.score !== null) {
            allGrades.push(course.exam.score);
            totalGraded++;
        }
    });
    
    const averageScore = allGrades.length > 0 
        ? allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length 
        : 0;
    
    const highestScore = allGrades.length > 0 
        ? Math.max(...allGrades) 
        : 0;
    
    // Calculate GPA (4.0 scale)
    const gpa = (averageScore / 100 * 4).toFixed(2);
    
    document.getElementById('overallGPA').textContent = gpa;
    document.getElementById('totalGraded').textContent = totalGraded;
    document.getElementById('averageScore').textContent = averageScore.toFixed(1) + '%';
    document.getElementById('highestScore').textContent = highestScore.toFixed(0) + '%';
}

// Display course grades
function displayCourseGrades() {
    const courses = getUserCourses();
    const enrolledCourses = courses.filter(c => c.enrolled);
    
    const container = document.getElementById('courseGrades');
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-line"></i>
                <h3>No grades available</h3>
                <p>Enroll in courses and complete assignments to see your grades</p>
                <a href="courses.html" class="btn-primary">
                    <i class="fas fa-book"></i> Browse Courses
                </a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = enrolledCourses.map(course => {
        const assignmentGrades = course.assignments.filter(a => a.grade !== null);
        const hasExamGrade = course.exam.score !== null;
        
        // Calculate course average (assignments 60%, exam 40%)
        let courseAverage = 0;
        if (assignmentGrades.length > 0 || hasExamGrade) {
            const assignmentAvg = assignmentGrades.length > 0
                ? assignmentGrades.reduce((sum, a) => sum + a.grade, 0) / assignmentGrades.length
                : 0;
            const examScore = course.exam.score || 0;
            
            if (assignmentGrades.length > 0 && hasExamGrade) {
                courseAverage = (assignmentAvg * 0.6) + (examScore * 0.4);
            } else if (assignmentGrades.length > 0) {
                courseAverage = assignmentAvg;
            } else {
                courseAverage = examScore;
            }
        }
        
        const letterGrade = getLetterGrade(courseAverage);
        
        return `
            <div class="course-grade-card">
                <div class="course-grade-header">
                    <div>
                        <h3>${course.title}</h3>
                        <p class="course-code-grade">${course.code} • ${course.instructor}</p>
                    </div>
                    <div class="course-grade-display">
                        <div class="letter-grade ${letterGrade.class}">
                            ${letterGrade.letter}
                        </div>
                        <div class="percentage-grade">
                            ${courseAverage.toFixed(1)}%
                        </div>
                    </div>
                </div>
                
                <div class="grade-breakdown">
                    <h4><i class="fas fa-tasks"></i> Assignments (60%)</h4>
                    ${course.assignments.length > 0 ? `
                        <div class="grade-items">
                            ${course.assignments.map(assignment => `
                                <div class="grade-item">
                                    <div class="grade-item-info">
                                        <span class="grade-item-title">${assignment.title}</span>
                                        <span class="grade-item-status ${assignment.status}">
                                            ${assignment.status === 'graded' 
                                                ? `${assignment.grade}%` 
                                                : assignment.status.toUpperCase()
                                            }
                                        </span>
                                    </div>
                                    ${assignment.grade !== null ? `
                                        <div class="grade-bar-container">
                                            <div class="grade-bar ${getGradeClass(assignment.grade)}" 
                                                 style="width: ${assignment.grade}%"></div>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p class="no-grades">No assignments yet</p>'}
                    
                    <h4><i class="fas fa-file-alt"></i> Final Exam (40%)</h4>
                    ${hasExamGrade ? `
                        <div class="grade-items">
                            <div class="grade-item">
                                <div class="grade-item-info">
                                    <span class="grade-item-title">${course.exam.title}</span>
                                    <span class="grade-item-status graded">${course.exam.score}%</span>
                                </div>
                                <div class="grade-bar-container">
                                    <div class="grade-bar ${getGradeClass(course.exam.score)}" 
                                         style="width: ${course.exam.score}%"></div>
                                </div>
                            </div>
                        </div>
                    ` : '<p class="no-grades">Exam not taken yet</p>'}
                </div>
                
                ${assignmentGrades.length > 0 || hasExamGrade ? `
                    <div class="course-summary">
                        <div class="summary-item">
                            <span>Course Progress</span>
                            <strong>${course.progress}%</strong>
                        </div>
                        <div class="summary-item">
                            <span>Assignments Graded</span>
                            <strong>${assignmentGrades.length}/${course.assignments.length}</strong>
                        </div>
                        <div class="summary-item">
                            <span>Final Grade</span>
                            <strong class="${letterGrade.class}">${letterGrade.letter} (${courseAverage.toFixed(1)}%)</strong>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get letter grade
function getLetterGrade(percentage) {
    if (percentage >= 93) return { letter: 'A', class: 'grade-a' };
    if (percentage >= 90) return { letter: 'A-', class: 'grade-a' };
    if (percentage >= 87) return { letter: 'B+', class: 'grade-b' };
    if (percentage >= 83) return { letter: 'B', class: 'grade-b' };
    if (percentage >= 80) return { letter: 'B-', class: 'grade-b' };
    if (percentage >= 77) return { letter: 'C+', class: 'grade-c' };
    if (percentage >= 73) return { letter: 'C', class: 'grade-c' };
    if (percentage >= 70) return { letter: 'C-', class: 'grade-c' };
    if (percentage >= 67) return { letter: 'D+', class: 'grade-d' };
    if (percentage >= 60) return { letter: 'D', class: 'grade-d' };
    return { letter: 'F', class: 'grade-f' };
}

// Get grade class (reuse from assignments.js)
function getGradeClass(grade) {
    if (grade >= 90) return 'grade-a';
    if (grade >= 80) return 'grade-b';
    if (grade >= 70) return 'grade-c';
    if (grade >= 60) return 'grade-d';
    return 'grade-f';
}

// Add styles
const gradesStyle = document.createElement('style');
gradesStyle.textContent = `
    .performance-overview {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .gpa-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        color: white;
        box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
    }
    
    .gpa-icon {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        backdrop-filter: blur(10px);
    }
    
    .gpa-info h2 {
        font-size: 3.5rem;
        margin: 0;
        font-weight: 700;
    }
    
    .gpa-info p {
        margin: 0;
        font-size: 1.125rem;
        opacity: 0.9;
    }
    
    .stats-grid-grades {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        display: flex;
        justify-content: space-around;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .stat-item-grade {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .stat-item-grade i {
        font-size: 2.5rem;
    }
    
    .stat-item-grade h3 {
        font-size: 2rem;
        margin: 0;
        color: #1f2937;
    }
    
    .stat-item-grade p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .course-grades-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .course-grade-card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 2px solid #e5e7eb;
    }
    
    .course-grade-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #e5e7eb;
        margin-bottom: 1.5rem;
    }
    
    .course-grade-header h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
    }
    
    .course-code-grade {
        color: #6b7280;
        margin: 0;
    }
    
    .course-grade-display {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .letter-grade {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        color: white;
    }
    
    .letter-grade.grade-a {
        background: linear-gradient(135deg, #10b981, #059669);
    }
    
    .letter-grade.grade-b {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
    }
    
    .letter-grade.grade-c {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }
    
    .letter-grade.grade-d {
        background: linear-gradient(135deg, #f97316, #ea580c);
    }
    
    .letter-grade.grade-f {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    
    .percentage-grade {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
    }
    
    .grade-breakdown {
        margin-bottom: 1.5rem;
    }
    
    .grade-breakdown h4 {
        font-size: 1.125rem;
        color: #374151;
        margin: 1.5rem 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .grade-breakdown h4 i {
        color: #2563eb;
    }
    
    .grade-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .grade-item {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
    }
    
    .grade-item-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }
    
    .grade-item-title {
        color: #374151;
        font-weight: 600;
    }
    
    .grade-item-status {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 700;
    }
    
    .grade-item-status.graded {
        background: #d1fae5;
        color: #047857;
    }
    
    .grade-item-status.pending {
        background: #fef3c7;
        color: #d97706;
    }
    
    .grade-item-status.submitted {
        background: #dbeafe;
        color: #1d4ed8;
    }
    
    .grade-bar-container {
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .grade-bar {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s;
    }
    
    .grade-bar.grade-a {
        background: linear-gradient(90deg, #10b981, #059669);
    }
    
    .grade-bar.grade-b {
        background: linear-gradient(90deg, #3b82f6, #2563eb);
    }
    
    .grade-bar.grade-c {
        background: linear-gradient(90deg, #f59e0b, #d97706);
    }
    
    .grade-bar.grade-d {
        background: linear-gradient(90deg, #f97316, #ea580c);
    }
    
    .grade-bar.grade-f {
        background: linear-gradient(90deg, #ef4444, #dc2626);
    }
    
    .no-grades {
        color: #9ca3af;
        font-style: italic;
        margin: 0.5rem 0;
    }
    
    .course-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding-top: 1.5rem;
        border-top: 2px solid #e5e7eb;
    }
    
    .summary-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .summary-item span {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .summary-item strong {
        font-size: 1.25rem;
        color: #1f2937;
    }
    
    .summary-item strong.grade-a { color: #059669; }
    .summary-item strong.grade-b { color: #2563eb; }
    .summary-item strong.grade-c { color: #d97706; }
    .summary-item strong.grade-d { color: #ea580c; }
    .summary-item strong.grade-f { color: #dc2626; }
    
    @media (max-width: 1024px) {
        .performance-overview {
            grid-template-columns: 1fr;
        }
    }
    
    @media (max-width: 768px) {
        .stats-grid-grades {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .course-grade-header {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .course-summary {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(gradesStyle);

// Initialize
if (window.location.pathname.includes('grades.html')) {
    loadGradesPage();
}

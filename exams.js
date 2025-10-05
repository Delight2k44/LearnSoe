// ========================================
// LEARNENRICH - EXAMS PAGE
// ========================================

let examTimer = null;
let examTimeRemaining = 0;
let currentExamCourse = null;

// Load exams page
function loadExamsPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    displayExams();
}

// Display exams
function displayExams() {
    const courses = getUserCourses();
    const enrolledCourses = courses.filter(c => c.enrolled);
    
    const container = document.getElementById('examsGrid');
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>No exams available</h3>
                <p>Enroll in a course to access exams</p>
                <a href="courses.html" class="btn-primary">
                    <i class="fas fa-book"></i> Browse Courses
                </a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = enrolledCourses.map(course => {
        const exam = course.exam;
        
        // Exam unlocks at 40% progress OR if examUnlocked flag is set
        const canTakeExam = course.progress >= 40 || course.examUnlocked;
        
        const attemptsLeft = exam.maxAttempts - exam.attempts;
        const isPassed = exam.score >= exam.passingScore;
        
        return `
            <div class="exam-card ${exam.score !== null ? (isPassed ? 'passed' : 'failed') : ''}">
                <div class="exam-card-header">
                    <div class="exam-icon ${isPassed ? 'success' : exam.score !== null ? 'failed' : 'default'}">
                        <i class="fas ${isPassed ? 'fa-trophy' : exam.score !== null ? 'fa-times-circle' : 'fa-file-alt'}"></i>
                    </div>
                    <div class="exam-info">
                        <h3>${exam.title}</h3>
                        <p class="course-info">
                            <span class="course-badge">${course.code}</span>
                            ${course.title}
                        </p>
                    </div>
                </div>
                
                <div class="exam-meta">
                    <div class="meta-row">
                        <i class="fas fa-question-circle"></i>
                        <span>${exam.questions} Questions</span>
                    </div>
                    <div class="meta-row">
                        <i class="fas fa-clock"></i>
                        <span>${exam.duration} Minutes</span>
                    </div>
                    <div class="meta-row">
                        <i class="fas fa-check-circle"></i>
                        <span>${exam.passingScore}% to Pass</span>
                    </div>
                    <div class="meta-row">
                        <i class="fas fa-redo"></i>
                        <span>${attemptsLeft} Attempt${attemptsLeft !== 1 ? 's' : ''} Left</span>
                    </div>
                </div>
                
                ${exam.score !== null ? `
                    <div class="exam-result ${isPassed ? 'passed' : 'failed'}">
                        <div class="result-header">
                            <span>${isPassed ? '✅ PASSED' : '❌ FAILED'}</span>
                            <strong>${exam.score}%</strong>
                        </div>
                        <div class="result-bar">
                            <div class="result-fill ${isPassed ? 'pass' : 'fail'}" style="width: ${exam.score}%"></div>
                            <div class="passing-line" style="left: ${exam.passingScore}%"></div>
                        </div>
                        <p class="result-message">
                            ${isPassed 
                                ? 'Congratulations! You passed the exam and earned your certificate!' 
                                : `You need ${exam.passingScore}% to pass. ${attemptsLeft > 0 ? 'You can retake the exam.' : 'No attempts remaining.'}`
                            }
                        </p>
                    </div>
                ` : ''}
                
                <div class="exam-actions">
                    ${!canTakeExam ? `
                        <button class="btn-disabled" disabled>
                            <i class="fas fa-lock"></i> Exam Locked
                        </button>
                        <p class="requirement-text">
                            <i class="fas fa-info-circle"></i>
                            ${course.progress >= 40 
                                ? 'Exam unlocked! Refresh the page to take the exam.' 
                                : `Complete 40% of the course to unlock this exam (${course.progress}% done)`
                            }
                        </p>
                    ` : attemptsLeft <= 0 ? `
                        <button class="btn-disabled" disabled>
                            <i class="fas fa-ban"></i> No Attempts Remaining
                        </button>
                    ` : isPassed ? `
                        <button class="btn-success" disabled>
                            <i class="fas fa-trophy"></i> Exam Passed
                        </button>
                        <a href="certificates.html" class="btn-primary">
                            <i class="fas fa-certificate"></i> View Certificate
                        </a>
                    ` : `
                        <button class="btn-primary" onclick="startExam(${course.id})">
                            <i class="fas fa-play"></i> ${exam.attempts > 0 ? 'Retake Exam' : 'Start Exam'}
                        </button>
                        ${exam.score !== null ? `
                            <button class="btn-secondary" onclick="viewExamDetails(${course.id})">
                                <i class="fas fa-chart-bar"></i> Review Results
                            </button>
                        ` : ''}
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Start exam
function startExam(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    const exam = course.exam;
    const attemptsLeft = exam.maxAttempts - exam.attempts;
    
    if (attemptsLeft <= 0) {
        alert('❌ No Attempts Remaining\n\nYou have used all your exam attempts.');
        return;
    }
    
    if (confirm(
        `Start "${exam.title}"?\n\n` +
        `• ${exam.questions} questions\n` +
        `• ${exam.duration} minutes time limit\n` +
        `• ${exam.passingScore}% required to pass\n` +
        `• ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining\n\n` +
        `The timer will start immediately. Are you ready?`
    )) {
        // Redirect to dedicated exam page
        window.location.href = `exam-page.html?exam=${course.code}`;
    }
}

// Show exam interface
function showExamInterface() {
    const exam = currentExamCourse.exam;
    
    document.getElementById('examModalTitle').textContent = exam.title;
    document.getElementById('examContent').innerHTML = `
        <div class="exam-interface">
            <div class="exam-instructions">
                <h3><i class="fas fa-info-circle"></i> Exam Instructions</h3>
                <ul>
                    <li>Read each question carefully before answering</li>
                    <li>You must answer all questions to submit the exam</li>
                    <li>You cannot pause or save your progress</li>
                    <li>The exam will auto-submit when time expires</li>
                </ul>
            </div>
            
            <div class="questions-container">
                ${Array.from({length: exam.questions}, (_, i) => `
                    <div class="question-card">
                        <div class="question-header">
                            <span class="question-number">Question ${i + 1}</span>
                            <span class="question-points">1 point</span>
                        </div>
                        <p class="question-text">${generateQuestion(currentExamCourse, i + 1)}</p>
                        <div class="answer-options">
                            ${['A', 'B', 'C', 'D'].map(option => `
                                <label class="answer-option">
                                    <input type="radio" name="question${i}" value="${option}">
                                    <span class="option-label">${option}</span>
                                    <span class="option-text">${generateOption(currentExamCourse, i + 1, option)}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="exam-submit-section">
                <button class="btn-primary btn-large" onclick="submitExam()">
                    <i class="fas fa-paper-plane"></i> Submit Exam
                </button>
                <button class="btn-danger btn-large" onclick="cancelExam()">
                    <i class="fas fa-times"></i> Cancel Exam
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('examModal').classList.add('active');
}

// Start exam timer
function startExamTimer() {
    updateTimerDisplay();
    
    examTimer = setInterval(() => {
        examTimeRemaining--;
        updateTimerDisplay();
        
        if (examTimeRemaining <= 0) {
            clearInterval(examTimer);
            alert('⏰ Time\'s Up!\n\nThe exam time has expired. Your answers will be submitted automatically.');
            submitExam();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(examTimeRemaining / 60);
    const seconds = examTimeRemaining % 60;
    const timerEl = document.getElementById('examTimer');
    
    timerEl.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (examTimeRemaining <= 300) { // Last 5 minutes
        timerEl.style.color = '#ef4444';
        timerEl.style.fontWeight = 'bold';
    }
}

// Generate question
function generateQuestion(course, num) {
    const questions = {
        'SOLAR-101': [
            'What is the primary function of a solar inverter?',
            'Which type of solar panel has the highest efficiency?',
            'What is the standard test condition (STC) for solar panels?',
            'What is the purpose of Maximum Power Point Tracking (MPPT)?'
        ],
        'WIND-101': [
            'What is the Betz limit in wind energy?',
            'Which component converts mechanical energy to electrical energy in a wind turbine?',
            'What is the cut-in speed of a typical wind turbine?',
            'What type of generator is most commonly used in modern wind turbines?'
        ],
        'EFFICIENCY-101': [
            'What is the R-value in building insulation?',
            'Which lighting technology is most energy-efficient?',
            'What is a common energy audit tool?',
            'What percentage of building energy is typically used for HVAC?'
        ],
        'STORAGE-201': [
            'What is the energy density of lithium-ion batteries compared to lead-acid?',
            'What is the depth of discharge (DoD) in battery systems?',
            'Which battery chemistry is safest for large-scale storage?',
            'What is round-trip efficiency in energy storage?'
        ]
    };
    
    const courseQuestions = questions[course.code] || [
        'Question about ' + course.title,
        'Another question about ' + course.title,
        'Third question about ' + course.title,
        'Fourth question about ' + course.title
    ];
    
    return courseQuestions[(num - 1) % courseQuestions.length];
}

// Generate option
function generateOption(course, questionNum, option) {
    const options = {
        A: ['Convert DC to AC', '59.3% maximum efficiency', '3-5 m/s', 'Monocrystalline', 'Thermal resistance', 'LED', 'Blower door test', '40-50%'],
        B: ['Store excess energy', 'The theoretical maximum', 'Generator', 'Polycrystalline', 'Electrical resistance', 'CFL', 'Infrared camera', '30-40%'],
        C: ['Monitor performance', '1000 W/m², 25°C', 'Optimize power output', 'Thin film', 'Sound resistance', 'Incandescent', 'Power meter', '50-60%'],
        D: ['Protect from overload', 'Testing methodology', 'Reduce harmonics', 'PERC', 'Water resistance', 'Halogen', 'Smart meter', '20-30%']
    };
    
    return options[option][(questionNum - 1) % options[option].length];
}

// Submit exam
function submitExam() {
    if (examTimer) {
        clearInterval(examTimer);
    }
    
    // Count answered questions
    const totalQuestions = currentExamCourse.exam.questions;
    let answeredCount = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        const answered = document.querySelector(`input[name="question${i}"]:checked`);
        if (answered) answeredCount++;
    }
    
    if (answeredCount < totalQuestions) {
        if (!confirm(`⚠️ Incomplete Exam\n\nYou have only answered ${answeredCount} out of ${totalQuestions} questions.\n\nUnanswered questions will be marked as incorrect.\n\nDo you want to submit anyway?`)) {
            // Restart timer
            startExamTimer();
            return;
        }
    }
    
    // Calculate score (random for demo)
    const score = Math.floor(Math.random() * 30) + 65; // 65-95
    
    const courses = getUserCourses();
    const course = courses.find(c => c.id === currentExamCourse.id);
    
    course.exam.attempts++;
    course.exam.score = score;
    course.exam.lastAttempt = new Date().toISOString();
    
    saveUserCourses(courses);
    
    document.getElementById('examModal').classList.remove('active');
    
    const passed = score >= course.exam.passingScore;
    
    setTimeout(() => {
        alert(
            `${passed ? '🎉' : '📊'} Exam Complete!\n\n` +
            `Your Score: ${score}%\n` +
            `Passing Score: ${course.exam.passingScore}%\n\n` +
            `${passed 
                ? 'Congratulations! You passed the exam!\n\nYour certificate is now available in the Certificates section.' 
                : `You did not pass this time.\n\nAttempts remaining: ${course.exam.maxAttempts - course.exam.attempts}\n\nReview the course material and try again.`
            }`
        );
        
        loadExamsPage();
    }, 500);
}

// Cancel exam
function cancelExam() {
    if (confirm('⚠️ Cancel Exam?\n\nYour progress will be lost and this will count as an attempt.\n\nAre you sure?')) {
        if (examTimer) {
            clearInterval(examTimer);
        }
        
        const courses = getUserCourses();
        const course = courses.find(c => c.id === currentExamCourse.id);
        course.exam.attempts++;
        saveUserCourses(courses);
        
        document.getElementById('examModal').classList.remove('active');
        
        alert('❌ Exam Cancelled\n\nThis attempt has been counted. You can retake the exam if you have attempts remaining.');
        
        loadExamsPage();
    }
}

// View exam details
function viewExamDetails(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    alert(
        `📊 Exam Results\n\n` +
        `${course.exam.title}\n` +
        `${course.code} - ${course.title}\n\n` +
        `Score: ${course.exam.score}%\n` +
        `Status: ${course.exam.score >= course.exam.passingScore ? 'PASSED ✅' : 'FAILED ❌'}\n` +
        `Attempts Used: ${course.exam.attempts}/${course.exam.maxAttempts}\n` +
        `Last Attempt: ${new Date(course.exam.lastAttempt).toLocaleDateString()}`
    );
}

// Add styles
const examsStyle = document.createElement('style');
examsStyle.textContent = `
    .exams-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
    }
    
    .exam-card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 2px solid #e5e7eb;
        transition: all 0.3s;
    }
    
    .exam-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .exam-card.passed {
        border-color: #10b981;
        background: linear-gradient(to bottom, white, #f0fdf4);
    }
    
    .exam-card.failed {
        border-color: #ef4444;
        background: linear-gradient(to bottom, white, #fef2f2);
    }
    
    .exam-card-header {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .exam-icon {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .exam-icon.default {
        background: #eff6ff;
        color: #2563eb;
    }
    
    .exam-icon.success {
        background: #d1fae5;
        color: #059669;
    }
    
    .exam-icon.failed {
        background: #fee2e2;
        color: #dc2626;
    }
    
    .exam-info h3 {
        font-size: 1.375rem;
        margin: 0 0 0.5rem 0;
        color: #1f2937;
    }
    
    .exam-meta {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .meta-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .meta-row i {
        color: #2563eb;
        width: 20px;
    }
    
    .exam-result {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }
    
    .exam-result.passed {
        background: #ecfdf5;
        border: 2px solid #10b981;
    }
    
    .exam-result.failed {
        background: #fef2f2;
        border: 2px solid #ef4444;
    }
    
    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .result-header span {
        font-weight: 700;
        font-size: 0.875rem;
    }
    
    .result-header strong {
        font-size: 1.875rem;
    }
    
    .exam-result.passed .result-header {
        color: #059669;
    }
    
    .exam-result.failed .result-header {
        color: #dc2626;
    }
    
    .result-bar {
        height: 12px;
        background: #e5e7eb;
        border-radius: 6px;
        position: relative;
        margin-bottom: 1rem;
        overflow: hidden;
    }
    
    .result-fill {
        height: 100%;
        border-radius: 6px;
        transition: width 1s;
    }
    
    .result-fill.pass {
        background: linear-gradient(90deg, #10b981, #059669);
    }
    
    .result-fill.fail {
        background: linear-gradient(90deg, #f59e0b, #ef4444);
    }
    
    .passing-line {
        position: absolute;
        top: 0;
        height: 100%;
        width: 2px;
        background: #1f2937;
        z-index: 1;
    }
    
    .passing-line::after {
        content: 'Pass';
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.75rem;
        font-weight: 600;
        color: #1f2937;
        white-space: nowrap;
    }
    
    .result-message {
        color: #6b7280;
        font-size: 0.875rem;
        margin: 0;
    }
    
    .exam-actions {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .exam-actions button,
    .exam-actions a {
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-decoration: none;
    }
    
    .btn-disabled {
        background: #f3f4f6;
        color: #9ca3af;
        cursor: not-allowed;
    }
    
    .btn-danger {
        background: #ef4444;
        color: white;
    }
    
    .btn-danger:hover {
        background: #dc2626;
    }
    
    .requirement-text {
        color: #6b7280;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
    }
    
    .requirement-text i {
        color: #3b82f6;
    }
    
    .exam-modal {
        max-width: 900px;
    }
    
    .exam-timer {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2563eb;
    }
    
    .exam-interface {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .exam-instructions {
        background: #eff6ff;
        padding: 1.5rem;
        border-radius: 12px;
        border-left: 4px solid #2563eb;
    }
    
    .exam-instructions h3 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .exam-instructions ul {
        margin: 0;
        padding-left: 1.5rem;
        color: #374151;
    }
    
    .exam-instructions li {
        margin-bottom: 0.5rem;
    }
    
    .questions-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .question-card {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        border: 2px solid #e5e7eb;
    }
    
    .question-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    
    .question-number {
        font-weight: 700;
        color: #2563eb;
    }
    
    .question-points {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .question-text {
        font-size: 1.125rem;
        color: #1f2937;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
    
    .answer-options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .answer-option {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .answer-option:hover {
        border-color: #2563eb;
        background: #eff6ff;
    }
    
    .answer-option input[type="radio"] {
        cursor: pointer;
    }
    
    .answer-option input[type="radio"]:checked + .option-label {
        background: #2563eb;
        color: white;
    }
    
    .option-label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #f3f4f6;
        color: #6b7280;
        font-weight: 700;
        flex-shrink: 0;
        transition: all 0.3s;
    }
    
    .option-text {
        flex: 1;
        color: #374151;
    }
    
    .exam-submit-section {
        display: flex;
        gap: 1rem;
        padding-top: 2rem;
        border-top: 2px solid #e5e7eb;
    }
    
    @media (max-width: 768px) {
        .exams-grid {
            grid-template-columns: 1fr;
        }
        
        .exam-meta {
            grid-template-columns: 1fr;
        }
        
        .exam-submit-section {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(examsStyle);

// Initialize
if (window.location.pathname.includes('exams.html')) {
    loadExamsPage();
}

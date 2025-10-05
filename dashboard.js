// ========================================
// LEARNENRICH - DASHBOARD SYSTEM
// ========================================

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('learnenrich_current_user'));
    if (!user) {
        alert('❌ Please login first!');
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('learnenrich_current_user');
        window.location.href = 'index.html';
    }
}

// Toggle user menu
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const userDropdown = document.querySelector('.user-dropdown');
    const menu = document.getElementById('userMenu');
    if (menu && !userDropdown?.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Course Database
const COURSES = [
    {
        id: 1,
        title: 'Solar PV System Design & Installation',
        code: 'SOLAR-101',
        description: 'Comprehensive training in solar photovoltaic systems design, installation, and maintenance',
        level: 'Beginner',
        duration: '8 weeks',
        modules: 12,
        progress: 0,
        enrolled: false,
        examUnlocked: false,
        completedLessons: [],
        quizCompleted: false,
        studyNotesCompleted: false,
    downloadedResources: [],
    quizAttempts: [],
    bestQuizScore: null,
        instructor: 'Dr. Sarah Johnson',
        skills: ['Solar Panel Installation', 'Electrical Systems', 'System Design', 'Safety Protocols'],
        assignments: [
            { id: 1, title: 'Solar Panel Types & Selection', due: '2025-10-15', status: 'pending', grade: null },
            { id: 2, title: 'System Sizing Calculations', due: '2025-10-22', status: 'pending', grade: null },
            { id: 3, title: 'Installation Best Practices', due: '2025-10-29', status: 'pending', grade: null },
            { id: 4, title: 'Maintenance & Troubleshooting', due: '2025-11-05', status: 'pending', grade: null }
        ],
        exam: {
            title: 'Solar PV Systems Final Exam',
            duration: 120, // minutes
            questions: 50,
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            score: null,
            history: []
        }
    },
    {
        id: 2,
        title: 'Wind Turbine Technology & Maintenance',
        code: 'WIND-101',
        description: 'Learn wind energy systems, turbine operations, and maintenance procedures',
        level: 'Intermediate',
        duration: '10 weeks',
        modules: 15,
        progress: 0,
        enrolled: false,
        examUnlocked: false,
        completedLessons: [],
        quizCompleted: false,
        studyNotesCompleted: false,
    downloadedResources: [],
    quizAttempts: [],
    bestQuizScore: null,
        instructor: 'Prof. Michael Chen',
        skills: ['Turbine Operations', 'Mechanical Systems', 'Electrical Grid', 'Preventive Maintenance'],
        assignments: [
            { id: 1, title: 'Wind Resource Assessment', due: '2025-10-18', status: 'pending', grade: null },
            { id: 2, title: 'Turbine Components Analysis', due: '2025-10-25', status: 'pending', grade: null },
            { id: 3, title: 'Safety & Emergency Procedures', due: '2025-11-01', status: 'pending', grade: null },
            { id: 4, title: 'Maintenance Scheduling', due: '2025-11-08', status: 'pending', grade: null }
        ],
        exam: {
            title: 'Wind Turbine Technology Final Exam',
            duration: 150,
            questions: 60,
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            score: null,
            history: []
        }
    },
    {
        id: 3,
        title: 'Energy Efficiency & Building Performance',
        code: 'EFFICIENCY-101',
        description: 'Master energy auditing, efficiency improvements, and building performance optimization',
        level: 'Intermediate',
        duration: '8 weeks',
        modules: 10,
        progress: 0,
        enrolled: false,
        examUnlocked: false,
        completedLessons: [],
        quizCompleted: false,
        studyNotesCompleted: false,
    downloadedResources: [],
    quizAttempts: [],
    bestQuizScore: null,
        instructor: 'Emily Rodriguez, LEED AP',
        skills: ['Energy Auditing', 'HVAC Systems', 'Building Envelope', 'Efficiency Calculations'],
        assignments: [
            { id: 1, title: 'Energy Audit Fundamentals', due: '2025-10-20', status: 'pending', grade: null },
            { id: 2, title: 'HVAC System Analysis', due: '2025-10-27', status: 'pending', grade: null },
            { id: 3, title: 'Lighting Retrofits', due: '2025-11-03', status: 'pending', grade: null },
            { id: 4, title: 'ROI Calculations', due: '2025-11-10', status: 'pending', grade: null }
        ],
        exam: {
            title: 'Energy Efficiency Final Exam',
            duration: 120,
            questions: 50,
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            score: null,
            history: []
        }
    },
    {
        id: 4,
        title: 'Battery Storage & Grid Integration',
        code: 'STORAGE-201',
        description: 'Advanced training in energy storage systems, battery technologies, and smart grid integration',
        level: 'Advanced',
        duration: '12 weeks',
        modules: 18,
        progress: 0,
        enrolled: false,
        examUnlocked: false,
        completedLessons: [],
        quizCompleted: false,
        studyNotesCompleted: false,
    downloadedResources: [],
    quizAttempts: [],
    bestQuizScore: null,
        instructor: 'Dr. James Williams',
        skills: ['Battery Technologies', 'Grid Integration', 'Power Electronics', 'System Optimization'],
        assignments: [
            { id: 1, title: 'Battery Chemistry & Selection', due: '2025-10-22', status: 'pending', grade: null },
            { id: 2, title: 'Grid Interconnection Design', due: '2025-10-29', status: 'pending', grade: null },
            { id: 3, title: 'Power Management Systems', due: '2025-11-05', status: 'pending', grade: null },
            { id: 4, title: 'Economic Analysis & ROI', due: '2025-11-12', status: 'pending', grade: null }
        ],
        exam: {
            title: 'Energy Storage Systems Final Exam',
            duration: 180,
            questions: 75,
            passingScore: 75,
            attempts: 0,
            maxAttempts: 3,
            score: null,
            history: []
        }
    }
];

// Get user courses from localStorage
function getUserCourses() {
    const user = checkAuth();
    if (!user) return [];
    
    const key = `learnenrich_courses_${user.id}`;
    const saved = localStorage.getItem(key);
    
    if (!saved) {
        // Initialize with COURSES data
        localStorage.setItem(key, JSON.stringify(COURSES));
        return COURSES;
    }
    
    return JSON.parse(saved);
}

// Save user courses
function saveUserCourses(courses) {
    const user = checkAuth();
    if (!user) return;
    
    const key = `learnenrich_courses_${user.id}`;
    localStorage.setItem(key, JSON.stringify(courses));
}

// Load dashboard data
function loadDashboard() {
    const user = checkAuth();
    if (!user) return;
    
    // Update user info
    document.getElementById('userName').textContent = user.fullName;
    const dashboardGreetingName = document.getElementById('dashboardGreetingName');
    if (dashboardGreetingName) {
        dashboardGreetingName.textContent = user.fullName.split(' ')[0] || user.fullName;
    }
    
    // Update streak with performance-based visualization
    const streakSummary = updateStreakDisplay(user);
    const dashboardSubheading = document.getElementById('dashboardSubheading');
    if (dashboardSubheading) {
        if (streakSummary?.avgScore !== null) {
            dashboardSubheading.textContent = `Average exam score: ${streakSummary.avgScore}% · ${streakSummary.message}`;
        } else {
            dashboardSubheading.textContent = 'Complete your first assessment to start tracking performance insights.';
        }
    }
    
    // Get user courses
    const courses = getUserCourses();
    const enrolled = courses.filter(c => c.enrolled);
    const completed = enrolled.filter(c => c.progress === 100);
    
    // Count pending assignments
    let pendingAssignments = 0;
    enrolled.forEach(course => {
        pendingAssignments += course.assignments.filter(a => a.status === 'pending').length;
    });
    
    // Count certificates
    const certificates = enrolled.filter(c => c.exam.score && c.exam.score >= c.exam.passingScore).length;
    
    // Update stats
    document.getElementById('enrolledCourses').textContent = enrolled.length;
    document.getElementById('completedCourses').textContent = completed.length;
    document.getElementById('pendingAssignments').textContent = pendingAssignments;
    document.getElementById('certificatesEarned').textContent = certificates;
    
    // Load continue learning section
    loadContinueCourses(enrolled);
    
    // Load deadlines
    loadDeadlines(enrolled);
}

// Update streak display with performance-based colors and messages
function getAllExamScores() {
    const courses = getUserCourses();
    const scores = [];

    courses.forEach(course => {
        const history = course.exam?.history || [];
        if (history.length) {
            history.forEach(attempt => {
                if (typeof attempt.score === 'number') {
                    scores.push(attempt.score);
                }
            });
        } else if (typeof course.exam?.score === 'number') {
            scores.push(course.exam.score);
        }
    });

    return scores;
}

function updateStreakDisplay(user) {
    const streakDays = user.streak || 1;
    document.getElementById('streakDays').textContent = streakDays;

    const examScores = getAllExamScores();
    const avgScore = examScores.length ? Math.round(examScores.reduce((a, b) => a + b, 0) / examScores.length) : null;
    const latestScore = examScores.length ? examScores[examScores.length - 1] : null;

    const streakCard = document.querySelector('.streak-card');
    const streakInfo = document.querySelector('.streak-info p');
    const streakIcon = document.querySelector('.streak-icon i');

    streakCard.classList.remove('streak-excellent', 'streak-good', 'streak-average', 'streak-needs-improvement');

    let summary = {
        tier: 'getting-started',
        message: 'Take your first exam to unlock performance insights.',
        avgScore,
        latestScore,
    };

    if (avgScore === null) {
        streakCard.classList.add('streak-good');
        streakCard.style.background = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)';
        streakCard.style.borderLeft = '5px solid #9333ea';
        streakIcon.style.color = '#fff';
        streakInfo.textContent = `🔥 ${streakDays} day streak! Complete an exam to see personalized feedback.`;
    } else if (avgScore >= 90) {
        streakCard.classList.add('streak-excellent');
        streakCard.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        streakCard.style.borderLeft = '5px solid #f59e0b';
        streakIcon.style.color = '#fbbf24';
        streakInfo.textContent = `🌟 Outstanding! ${streakDays} day streak and an elite ${avgScore}% average.`;
        summary = { tier: 'excellent', message: 'Elite performance—keep the momentum going!', avgScore, latestScore };
    } else if (avgScore >= 80) {
        streakCard.classList.add('streak-good');
        streakCard.style.background = 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)';
        streakCard.style.borderLeft = '5px solid #0ea5e9';
        streakIcon.style.color = '#fff';
        streakInfo.textContent = `🔥 ${streakDays} day streak with ${avgScore}% average—great job!`;
        summary = { tier: 'good', message: 'Solid results—aim for a new personal best.', avgScore, latestScore };
    } else if (avgScore >= 70) {
        streakCard.classList.add('streak-average');
        streakCard.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
        streakCard.style.borderLeft = '5px solid #fb923c';
        streakIcon.style.color = '#fff7ed';
        streakInfo.textContent = `⚡ ${streakDays} day streak. ${avgScore}% average—steady progress!`;
        summary = { tier: 'average', message: 'You’re on track—review notes to push past 80%.', avgScore, latestScore };
    } else {
        streakCard.classList.add('streak-needs-improvement');
        streakCard.style.background = 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)';
        streakCard.style.borderLeft = '5px solid #b91c1c';
        streakIcon.style.color = '#fee2e2';
        streakInfo.textContent = `🚀 ${streakDays} day streak. Use your ${avgScore}% average as a baseline—focus on practice.`;
        summary = { tier: 'needs-improvement', message: 'Target the areas you missed and retake the quiz when ready.', avgScore, latestScore };
    }

    if (streakDays >= 30) {
        streakCard.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.4)';
        streakCard.style.transform = 'scale(1.02)';
    } else if (streakDays >= 14) {
        streakCard.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        streakCard.style.transform = '';
    } else {
        streakCard.style.boxShadow = '';
        streakCard.style.transform = '';
    }

    return summary;
}

// Load continue learning courses
function loadContinueCourses(enrolledCourses) {
    const container = document.getElementById('continueCoursesGrid');
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No courses enrolled yet. <a href="courses.html" style="color: #2563eb; font-weight: 600;">Browse courses</a></p>';
        return;
    }
    
    const inProgress = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3);
    
    if (inProgress.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No courses in progress. <a href="courses.html" style="color: #2563eb; font-weight: 600;">Start a new course</a></p>';
        return;
    }
    
    container.innerHTML = inProgress.map(course => `
        <div class="course-card-mini">
            <div class="course-mini-header">
                <h4>${course.title}</h4>
                <span class="course-code">${course.code}</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${course.progress}%"></div>
            </div>
            <p class="progress-text">${course.progress}% Complete</p>
            <a href="courses.html" class="btn-continue">Continue Learning →</a>
        </div>
    `).join('');
}

// Load upcoming deadlines
function loadDeadlines(enrolledCourses) {
    const container = document.getElementById('deadlinesList');
    
    const allAssignments = [];
    enrolledCourses.forEach(course => {
        course.assignments.filter(a => a.status === 'pending').forEach(assignment => {
            allAssignments.push({
                ...assignment,
                courseName: course.title,
                courseCode: course.code
            });
        });
    });
    
    // Sort by due date
    allAssignments.sort((a, b) => new Date(a.due) - new Date(b.due));
    
    if (allAssignments.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No pending assignments 🎉</p>';
        return;
    }
    
    container.innerHTML = allAssignments.slice(0, 5).map(item => {
        const dueDate = new Date(item.due);
        const daysUntil = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
        const urgency = daysUntil <= 3 ? 'urgent' : daysUntil <= 7 ? 'soon' : 'normal';
        
        return `
            <div class="deadline-item ${urgency}">
                <div class="deadline-info">
                    <h4>${item.title}</h4>
                    <p>${item.courseCode} - ${item.courseName}</p>
                </div>
                <div class="deadline-date">
                    <span class="due-label">Due:</span>
                    <span class="due-date">${dueDate.toLocaleDateString()}</span>
                    <span class="due-days">${daysUntil} days</span>
                </div>
            </div>
        `;
    }).join('');
}

// Add CSS for new components
const style = document.createElement('style');
style.textContent = `
    .course-card-mini {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        transition: all 0.3s;
    }
    
    .course-card-mini:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .course-mini-header {
        margin-bottom: 1rem;
    }
    
    .course-mini-header h4 {
        font-size: 1.125rem;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }
    
    .course-code {
        display: inline-block;
        background: #eff6ff;
        color: #2563eb;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .progress-bar-container {
        background: #f3f4f6;
        height: 8px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-bar {
        background: linear-gradient(90deg, #2563eb, #10b981);
        height: 100%;
        transition: width 0.3s;
    }
    
    .progress-text {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }
    
    .btn-continue {
        display: inline-block;
        background: #2563eb;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
    }
    
    .btn-continue:hover {
        background: #1d4ed8;
    }
    
    .deadline-item {
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #6b7280;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .deadline-item.soon {
        border-left-color: #f59e0b;
    }
    
    .deadline-item.urgent {
        border-left-color: #ef4444;
        background: #fef2f2;
    }
    
    .deadline-info h4 {
        font-size: 1rem;
        color: #1f2937;
        margin-bottom: 0.25rem;
    }
    
    .deadline-info p {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .deadline-date {
        text-align: right;
    }
    
    .due-label {
        display: block;
        color: #6b7280;
        font-size: 0.75rem;
        margin-bottom: 0.25rem;
    }
    
    .due-date {
        display: block;
        color: #1f2937;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .due-days {
        display: inline-block;
        background: #f3f4f6;
        color: #6b7280;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .deadline-item.urgent .due-days {
        background: #fee2e2;
        color: #ef4444;
    }
    
    .deadline-item.soon .due-days {
        background: #fef3c7;
        color: #f59e0b;
    }
`;
document.head.appendChild(style);

// Initialize dashboard
if (window.location.pathname.includes('dashboard.html')) {
    loadDashboard();
}

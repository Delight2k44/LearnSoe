// ========================================
// PROFILE PAGE
// User profile and statistics
// ========================================

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProfile();
});

// Load profile
function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Basic info
    document.getElementById('userName').textContent = user.fullName;
    document.getElementById('profileName').textContent = user.fullName;
    document.getElementById('profileEmail').textContent = user.email;
    
    // Streak
    document.getElementById('streakDays').textContent = user.streak || 1;
    
    // Join date
    const joinDate = new Date(user.joinDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('joinDate').textContent = `${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
    
    // Load courses
    const courses = getUserCourses();
    document.getElementById('coursesEnrolled').textContent = courses.length;
    
    // Count completed courses (100% progress)
    const completed = courses.filter(c => c.progress === 100).length;
    document.getElementById('certificatesEarned').textContent = completed;
    
    // Calculate total hours (estimate 40 hours per course)
    const totalHours = courses.reduce((sum, c) => sum + Math.floor(c.progress * 0.4), 0);
    document.getElementById('totalHours').textContent = totalHours;
    
    // Calculate average score from exams
    const allExams = getUserCourses().flatMap(c => c.exams || []);
    if (allExams.length > 0) {
        const avgScore = Math.round(allExams.reduce((sum, e) => sum + e.score, 0) / allExams.length);
        document.getElementById('averageScore').textContent = avgScore + '%';
    } else {
        document.getElementById('averageScore').textContent = 'N/A';
    }
    
    // Load recent activity
    loadRecentActivity();
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        {
            icon: 'fa-book',
            color: '#2563eb',
            text: 'Completed module: Solar Panel Technology',
            time: '2 hours ago'
        },
        {
            icon: 'fa-certificate',
            color: '#10b981',
            text: 'Earned certificate: Solar PV System Design',
            time: '1 day ago'
        },
        {
            icon: 'fa-file-alt',
            color: '#f59e0b',
            text: 'Submitted assignment: Wind Turbine Components',
            time: '2 days ago'
        },
        {
            icon: 'fa-check-circle',
            color: '#10b981',
            text: 'Passed exam: Solar PV Fundamentals (88%)',
            time: '3 days ago'
        },
        {
            icon: 'fa-comment',
            color: '#8b5cf6',
            text: 'Posted in discussion: Best practices for installation',
            time: '4 days ago'
        }
    ];
    
    const container = document.getElementById('recentActivity');
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${activity.color}20; color: ${activity.color}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

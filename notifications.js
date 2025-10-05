// ========================================
// NOTIFICATIONS CENTER
// Live notification system
// ========================================

const NOTIFICATIONS = [
    {
        id: 1,
        type: 'courses',
        icon: 'fa-book',
        color: '#2563eb',
        title: 'New module unlocked!',
        message: 'Solar Panel Technology module is now available in Solar PV System Design',
        time: '10 minutes ago',
        read: false,
        link: 'course-content.html?course=SOLAR-101'
    },
    {
        id: 2,
        type: 'assignments',
        icon: 'fa-tasks',
        color: '#f59e0b',
        title: 'Assignment due soon',
        message: 'Solar Panel Types & Selection is due in 2 days',
        time: '1 hour ago',
        read: false,
        link: 'assignments.html'
    },
    {
        id: 3,
        type: 'social',
        icon: 'fa-comment',
        color: '#10b981',
        title: 'New reply to your discussion',
        message: 'Carlos Rivera replied to "Best practices for solar panel installation"',
        time: '2 hours ago',
        read: false,
        link: 'discussion.html'
    },
    {
        id: 4,
        type: 'exams',
        icon: 'fa-file-alt',
        color: '#ef4444',
        title: 'Exam results available',
        message: 'Your Solar PV Fundamentals exam has been graded. Score: 88%',
        time: '3 hours ago',
        read: true,
        link: 'grades.html'
    },
    {
        id: 5,
        type: 'courses',
        icon: 'fa-video',
        color: '#2563eb',
        title: 'New video lesson added',
        message: 'Watch: Advanced Inverter Configuration Techniques',
        time: '5 hours ago',
        read: true,
        link: 'course-content.html?course=SOLAR-101'
    },
    {
        id: 6,
        type: 'social',
        icon: 'fa-users',
        color: '#10b981',
        title: 'Study group invitation',
        message: 'Sarah Martinez invited you to join "NABCEP Prep Group"',
        time: '6 hours ago',
        read: true,
        link: 'discussion.html'
    },
    {
        id: 7,
        type: 'assignments',
        icon: 'fa-check-circle',
        color: '#10b981',
        title: 'Assignment graded',
        message: 'Wind Turbine Components assignment received 95/100',
        time: '1 day ago',
        read: true,
        link: 'grades.html'
    },
    {
        id: 8,
        type: 'courses',
        icon: 'fa-certificate',
        color: '#8b5cf6',
        title: 'Certificate progress',
        message: 'You\'re 75% complete with Solar PV System Design!',
        time: '1 day ago',
        read: true,
        link: 'certificates.html'
    },
    {
        id: 9,
        type: 'exams',
        icon: 'fa-clock',
        color: '#f59e0b',
        title: 'Upcoming exam',
        message: 'Wind Turbine Technology exam opens in 3 days',
        time: '2 days ago',
        read: true,
        link: 'exams.html'
    },
    {
        id: 10,
        type: 'social',
        icon: 'fa-fire',
        color: '#ef4444',
        title: 'Your topic is trending!',
        message: '"Inverter sizing calculation" has received 25+ replies',
        time: '2 days ago',
        read: true,
        link: 'discussion.html'
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUser();
    displayNotifications();
    startLiveNotifications();
});

// Load user info
function loadUser() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.fullName;
    }
}

// Display notifications
function displayNotifications() {
    const container = document.getElementById('notificationsList');
    
    let filtered = NOTIFICATIONS;
    if (currentFilter !== 'all') {
        filtered = NOTIFICATIONS.filter(n => n.type === currentFilter);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <h3>No notifications</h3>
                <p>You're all caught up!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
             onclick="openNotification(${notification.id})">
            <div class="notification-icon" style="background: ${notification.color}20; color: ${notification.color}">
                <i class="fas ${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">
                    <i class="fas fa-clock"></i> ${notification.time}
                </span>
            </div>
            <div class="notification-actions">
                ${!notification.read ? '<div class="unread-badge"></div>' : ''}
                <button class="notification-menu-btn" onclick="event.stopPropagation(); toggleNotificationMenu(${notification.id})">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter notifications
function filterNotifications(type) {
    currentFilter = type;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayNotifications();
}

// Open notification
function openNotification(id) {
    const notification = NOTIFICATIONS.find(n => n.id === id);
    if (!notification) return;
    
    // Mark as read
    notification.read = true;
    displayNotifications();
    
    // Navigate to link
    if (notification.link) {
        window.location.href = notification.link;
    }
}

// Mark all as read
function markAllAsRead() {
    NOTIFICATIONS.forEach(n => n.read = true);
    displayNotifications();
    showAlert('✅ All notifications marked as read', 'success');
}

// Toggle notification menu
function toggleNotificationMenu(id) {
    // For now, just mark as read/unread
    const notification = NOTIFICATIONS.find(n => n.id === id);
    if (notification) {
        notification.read = !notification.read;
        displayNotifications();
    }
}

// Start live notifications (simulate new notifications and performance-based)
function startLiveNotifications() {
    setInterval(() => {
        // 10% chance to generate a performance-based notification
        if (Math.random() > 0.9) {
            addPerformanceBasedNotification();
        }
    }, 30000); // Check every 30 seconds
}

// Add performance-based notification
function addPerformanceBasedNotification() {
    // Get user's performance data
    const userData = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const user = userData.find(u => u.username === currentUser?.username);
    
    if (!user) {
        addRandomNotification();
        return;
    }
    
    // Calculate performance metrics
    const examScores = [85, 92, 78, 95, 88]; // Example scores - in real app, get from user data
    const avgScore = examScores.reduce((a, b) => a + b, 0) / examScores.length;
    const lastScore = examScores[examScores.length - 1];
    const trend = lastScore > avgScore ? 'improving' : 'declining';
    
    // Get completion percentage (simulate)
    const completedCourses = 3;
    const totalCourses = 8;
    const completionRate = (completedCourses / totalCourses) * 100;
    
    // Get streak data
    const streakDays = parseInt(localStorage.getItem('streakDays') || '5');
    
    let notification;
    
    // High performer notifications
    if (avgScore >= 90) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'exams',
            icon: 'fa-trophy',
            color: '#f59e0b',
            title: '🌟 Outstanding Performance!',
            message: `Amazing work! You're maintaining a ${avgScore.toFixed(0)}% average. You're in the top 10% of learners!`,
            time: 'Just now',
            read: false,
            link: 'grades.html'
        };
    }
    // Good performer - encourage
    else if (avgScore >= 75) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'exams',
            icon: 'fa-star',
            color: '#10b981',
            title: '📈 Great Progress!',
            message: `You're doing well with ${avgScore.toFixed(0)}% average. Keep up the excellent work!`,
            time: 'Just now',
            read: false,
            link: 'grades.html'
        };
    }
    // Struggling - offer help
    else if (avgScore < 75) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'courses',
            icon: 'fa-life-ring',
            color: '#ef4444',
            title: '💡 Need Some Help?',
            message: `Your ${avgScore.toFixed(0)}% average suggests you might benefit from reviewing course materials or joining study groups.`,
            time: 'Just now',
            read: false,
            link: 'discussion.html'
        };
    }
    
    // Improvement notifications
    if (trend === 'improving' && Math.random() > 0.5) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'exams',
            icon: 'fa-chart-line',
            color: '#10b981',
            title: '🚀 You\'re Improving!',
            message: `Your last score (${lastScore}%) is above your average! Your hard work is paying off!`,
            time: 'Just now',
            read: false,
            link: 'grades.html'
        };
    }
    
    // Streak-based notifications
    if (streakDays >= 7 && Math.random() > 0.7) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'social',
            icon: 'fa-fire',
            color: '#f59e0b',
            title: '🔥 Streak Milestone!',
            message: `${streakDays} days of consistent learning! You're building great habits!`,
            time: 'Just now',
            read: false,
            link: 'dashboard.html'
        };
    }
    else if (streakDays === 0 && Math.random() > 0.6) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'courses',
            icon: 'fa-calendar-check',
            color: '#2563eb',
            title: '📅 Come Back Soon!',
            message: 'We miss you! Complete a lesson today to start your learning streak.',
            time: 'Just now',
            read: false,
            link: 'courses.html'
        };
    }
    
    // Completion-based notifications
    if (completionRate >= 80 && Math.random() > 0.7) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'courses',
            icon: 'fa-certificate',
            color: '#8b5cf6',
            title: '🎓 Almost There!',
            message: `You've completed ${completionRate.toFixed(0)}% of your courses. Finish strong to earn your certificates!`,
            time: 'Just now',
            read: false,
            link: 'certificates.html'
        };
    }
    else if (completionRate < 30 && Math.random() > 0.6) {
        notification = {
            id: NOTIFICATIONS.length + 1,
            type: 'courses',
            icon: 'fa-rocket',
            color: '#2563eb',
            title: '🎯 Start Your Journey!',
            message: 'Jump into your courses! Small daily progress leads to big achievements.',
            time: 'Just now',
            read: false,
            link: 'courses.html'
        };
    }
    
    // Fallback to random if no performance notification triggered
    if (!notification) {
        addRandomNotification();
        return;
    }
    
    NOTIFICATIONS.unshift(notification);
    displayNotifications();
    
    // Show browser notification (if permitted)
    if (Notification.permission === 'granted') {
        new Notification('LearnEnrich - ' + notification.title, {
            body: notification.message,
            icon: 'LearnEnrich Logo.png'
        });
    }
    
    // Show custom alert
    showAlert(
        `🔔 ${notification.title}\n\n${notification.message}`,
        'info',
        'Performance Update'
    );
}

// Add random notification
function addRandomNotification() {
    const types = ['courses', 'assignments', 'exams', 'social'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const newNotifications = {
        courses: {
            title: 'Course update',
            message: 'New study materials added to your enrolled courses',
            icon: 'fa-book',
            color: '#2563eb'
        },
        assignments: {
            title: 'Assignment reminder',
            message: 'You have pending assignments to submit',
            icon: 'fa-tasks',
            color: '#f59e0b'
        },
        exams: {
            title: 'Exam notification',
            message: 'Practice quiz results are ready for review',
            icon: 'fa-file-alt',
            color: '#ef4444'
        },
        social: {
            title: 'Discussion activity',
            message: 'New activity in your followed discussions',
            icon: 'fa-comment',
            color: '#10b981'
        }
    };
    
    const template = newNotifications[randomType];
    
    const newNotification = {
        id: NOTIFICATIONS.length + 1,
        type: randomType,
        icon: template.icon,
        color: template.color,
        title: template.title,
        message: template.message,
        time: 'Just now',
        read: false,
        link: '#'
    };
    
    NOTIFICATIONS.unshift(newNotification);
    displayNotifications();
    
    // Show browser notification (if permitted)
    if (Notification.permission === 'granted') {
        new Notification('LearnEnrich - ' + template.title, {
            body: template.message,
            icon: 'LearnEnrich Logo.png'
        });
    }
    
    // Show custom alert
    showAlert(
        `🔔 New Notification\n\n${template.title}\n${template.message}`,
        'info',
        'New Notification'
    );
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Auto-request on load
setTimeout(requestNotificationPermission, 2000);

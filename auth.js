// ========================================
// LEARNENRICH - AUTHENTICATION SYSTEM
// ========================================

// localStorage Database
const DB = {
    users: 'learnenrich_users',
    currentUser: 'learnenrich_current_user'
};

// Initialize data
function initData() {
    if (!localStorage.getItem(DB.users)) {
        localStorage.setItem(DB.users, JSON.stringify([]));
    }
}

// Get users
function getUsers() {
    return JSON.parse(localStorage.getItem(DB.users) || '[]');
}

// Save users
function saveUsers(users) {
    localStorage.setItem(DB.users, JSON.stringify(users));
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(DB.currentUser) || 'null');
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem(DB.currentUser, JSON.stringify(user));
}

// Update streak
function updateStreak(user) {
    const today = new Date().toDateString();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin).toDateString() : null;
    
    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastLogin === yesterdayStr) {
            user.streak = (user.streak || 0) + 1;
        } else if (lastLogin !== today) {
            user.streak = 1;
        }
        
        user.lastLogin = new Date().toISOString();
        
        const users = getUsers();
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user;
            saveUsers(users);
        }
    }
}

// Register Form Handler
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (fullName.length < 2) {
        alert('❌ Name must be at least 2 characters long');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('❌ Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }
    
    const users = getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('❌ Email already registered! Please login instead.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        fullName,
        email,
        password,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        streak: 1
    };
    
    users.push(newUser);
    saveUsers(users);
    
    alert('✅ Account created successfully! Please login.');
    window.location.href = 'login.html';
});

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('❌ Please enter both email and password');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('❌ Invalid email or password!');
        return;
    }
    
    // Update streak and login time
    updateStreak(user);
    setCurrentUser(user);
    
    // Auto-redirect to dashboard (no alert needed)
    window.location.href = 'dashboard.html';
});

// Initialize on page load
initData();

// ========================================
// SETTINGS PAGE
// Account management and preferences
// ========================================

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadSettings();
});

// Load current settings
function loadSettings() {
    const user = getCurrentUser();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    document.getElementById('settingsName').value = user.fullName;
    document.getElementById('settingsEmail').value = user.email;
    
    // Load preferences from localStorage
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    
    // Notification settings
    if (preferences.emailNotifications !== undefined) {
        document.getElementById('emailNotifications').checked = preferences.emailNotifications;
    }
    if (preferences.assignmentReminders !== undefined) {
        document.getElementById('assignmentReminders').checked = preferences.assignmentReminders;
    }
    if (preferences.discussionNotifications !== undefined) {
        document.getElementById('discussionNotifications').checked = preferences.discussionNotifications;
    }
    if (preferences.examReminders !== undefined) {
        document.getElementById('examReminders').checked = preferences.examReminders;
    }
    
    // Privacy settings
    if (preferences.profileVisibility !== undefined) {
        document.getElementById('profileVisibility').checked = preferences.profileVisibility;
    }
    
    // Learning preferences
    if (preferences.learningTime) {
        document.getElementById('learningTime').value = preferences.learningTime;
    }
    if (preferences.studyGoal) {
        document.getElementById('studyGoal').value = preferences.studyGoal;
    }
    if (preferences.completionGoal) {
        document.getElementById('completionGoal').value = preferences.completionGoal;
    }
}

// Save account settings
function saveAccountSettings() {
    const user = getCurrentUser();
    if (!user) return;
    
    const newName = document.getElementById('settingsName').value.trim();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate name
    if (!newName) {
        showAlert('Please enter your full name', 'error');
        return;
    }
    
    // Update name
    user.fullName = newName;
    
    // Change password if provided
    if (currentPassword || newPassword || confirmPassword) {
        if (!currentPassword) {
            showAlert('Please enter your current password', 'error');
            return;
        }
        
        if (currentPassword !== user.password) {
            showAlert('Current password is incorrect', 'error');
            return;
        }
        
        if (!newPassword) {
            showAlert('Please enter a new password', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showAlert('New password must be at least 6 characters', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showAlert('New passwords do not match', 'error');
            return;
        }
        
        user.password = newPassword;
    }
    
    // Update user in database
    setCurrentUser(user);
    const users = getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
        users[index] = user;
        saveUsers(users);
    }
    
    // Save notification preferences
    const preferences = {
        emailNotifications: document.getElementById('emailNotifications').checked,
        assignmentReminders: document.getElementById('assignmentReminders').checked,
        discussionNotifications: document.getElementById('discussionNotifications').checked,
        examReminders: document.getElementById('examReminders').checked,
        profileVisibility: document.getElementById('profileVisibility').checked,
        learningTime: document.getElementById('learningTime').value,
        studyGoal: document.getElementById('studyGoal').value,
        completionGoal: document.getElementById('completionGoal').value
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    
    showAlert(
        '✅ Settings saved successfully!\n\nYour account settings and preferences have been updated.',
        'success',
        'Settings Saved'
    );
    
    // Reload user display
    loadSettings();
}

// Confirm account deletion
function confirmDeleteAccount() {
    showConfirm(
        '⚠️ Delete Account\n\n' +
        'Are you absolutely sure you want to delete your account?\n\n' +
        'This action cannot be undone and will:\n' +
        '• Delete all your course progress\n' +
        '• Remove all certificates\n' +
        '• Delete all assignments and grades\n' +
        '• Permanently remove your account\n\n' +
        'Type DELETE to confirm:',
        function(confirmed) {
            if (confirmed) {
                // For safety, require typing DELETE
                const confirmation = prompt('Type DELETE in capital letters to confirm:');
                if (confirmation === 'DELETE') {
                    deleteAccount();
                } else {
                    showAlert('Account deletion cancelled', 'info');
                }
            }
        }
    );
}

// Delete account
function deleteAccount() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Remove user from database
    let users = getUsers();
    users = users.filter(u => u.email !== user.email);
    saveUsers(users);
    
    // Clear current user
    localStorage.removeItem(DB.currentUser);
    
    // Clear preferences
    localStorage.removeItem('userPreferences');
    
    showAlert(
        '✅ Account Deleted\n\n' +
        'Your account has been permanently deleted.\n\n' +
        'You will now be redirected to the home page.',
        'success',
        'Account Deleted'
    );
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

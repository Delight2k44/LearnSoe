// ========================================
// CUSTOM MODAL/NOTIFICATION SYSTEM
// Replaces browser alerts with styled modals
// ========================================

// Custom Alert
function showAlert(message, type = 'info', title = '') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const titleMap = {
            success: title || 'Success',
            error: title || 'Error',
            warning: title || 'Warning',
            info: title || 'Information'
        };
        
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <div class="custom-modal-icon ${type}">
                        <i class="fas ${iconMap[type]}"></i>
                    </div>
                    <h3 class="custom-modal-title">${titleMap[type]}</h3>
                </div>
                <div class="custom-modal-body">
                    ${message.split('\n').map(line => `<p style="margin: 0.5rem 0;">${line}</p>`).join('')}
                </div>
                <div class="custom-modal-actions">
                    <button class="custom-modal-btn custom-modal-btn-primary" onclick="this.closest('.custom-modal-overlay').remove()">
                        <i class="fas fa-check"></i> OK
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(true);
            }
        });
        
        overlay.querySelector('.custom-modal-btn').addEventListener('click', () => {
            resolve(true);
        });
    });
}

// Custom Confirm
function showConfirm(message, type = 'warning', title = '') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-question-circle'
        };
        
        const titleMap = {
            success: title || 'Confirm',
            error: title || 'Are you sure?',
            warning: title || 'Confirm Action',
            info: title || 'Confirmation'
        };
        
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-header">
                    <div class="custom-modal-icon ${type}">
                        <i class="fas ${iconMap[type]}"></i>
                    </div>
                    <h3 class="custom-modal-title">${titleMap[type]}</h3>
                </div>
                <div class="custom-modal-body">
                    ${message.split('\n').map(line => `<p style="margin: 0.5rem 0;">${line}</p>`).join('')}
                </div>
                <div class="custom-modal-actions">
                    <button class="custom-modal-btn custom-modal-btn-secondary" data-action="cancel">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button class="custom-modal-btn custom-modal-btn-primary" data-action="confirm">
                        <i class="fas fa-check"></i> Confirm
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(false);
            }
        });
        
        overlay.querySelectorAll('.custom-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action === 'confirm';
                overlay.remove();
                resolve(action);
            });
        });
    });
}

// Convenience wrappers to support legacy helpers
function showCustomAlert(titleOrMessage, messageOrType, maybeType) {
    let title = '';
    let message = '';
    let type = 'info';

    if (typeof messageOrType === 'string' && typeof maybeType === 'string') {
        title = titleOrMessage ?? '';
        message = messageOrType ?? '';
        type = maybeType || 'info';
    } else if (typeof messageOrType === 'string') {
        title = titleOrMessage ?? '';
        message = messageOrType ?? '';
        type = typeof maybeType === 'string' && maybeType ? maybeType : 'info';
    } else {
        message = titleOrMessage ?? '';
        type = typeof messageOrType === 'string' && messageOrType ? messageOrType : 'info';
    }

    return showAlert(message, type, title);
}

function showCustomConfirm(titleOrMessage, messageOrType, maybeType) {
    let title = '';
    let message = '';
    let type = 'warning';

    if (typeof messageOrType === 'string' && typeof maybeType === 'string') {
        title = titleOrMessage ?? '';
        message = messageOrType ?? '';
        type = maybeType || 'warning';
    } else if (typeof messageOrType === 'string') {
        title = titleOrMessage ?? '';
        message = messageOrType ?? '';
        type = typeof maybeType === 'string' && maybeType ? maybeType : 'warning';
    } else {
        message = titleOrMessage ?? '';
        type = typeof messageOrType === 'string' && messageOrType ? messageOrType : 'warning';
    }

    return showConfirm(message, type, title);
}

// Replace global alert
const originalAlert = window.alert;
window.alert = function(message) {
    if (typeof message === 'string') {
        // Determine type based on message content
        let type = 'info';
        if (message.includes('✅') || message.includes('Success') || message.includes('Congratulations') || message.includes('🎉')) {
            type = 'success';
        } else if (message.includes('❌') || message.includes('Error') || message.includes('Failed')) {
            type = 'error';
        } else if (message.includes('⚠️') || message.includes('Warning')) {
            type = 'warning';
        }
        
        return showAlert(message, type);
    }
    return originalAlert(message);
};

// Replace global confirm
const originalConfirm = window.confirm;
window.confirm = function(message) {
    if (typeof message === 'string') {
        return showConfirm(message, 'warning');
    }
    return originalConfirm(message);
};

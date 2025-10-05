// ========================================
// LEARNENRICH - CERTIFICATES PAGE
// ========================================

// Load certificates page
function loadCertificatesPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    updateCertificatesStats();
    displayCertificates();
}

// Update certificates statistics
function updateCertificatesStats() {
    const courses = getUserCourses();
    // Generate certificates for ALL courses where exam was attempted (even 0%)
    const earnedCertificates = courses.filter(c => 
        c.enrolled && c.exam.score !== null && c.exam.score !== undefined
    );
    
    // Get or initialize certificate data
    let certData = JSON.parse(localStorage.getItem('certificateData')) || {
        downloads: 0,
        shared: 0
    };
    
    document.getElementById('earnedCount').textContent = earnedCertificates.length;
    document.getElementById('downloadCount').textContent = certData.downloads;
    document.getElementById('sharedCount').textContent = certData.shared;
}

// Display certificates
function displayCertificates() {
    const courses = getUserCourses();
    const user = getCurrentUser();
    // Show certificates for ALL attempted exams (including 0%)
    const earnedCertificates = courses.filter(c => 
        c.enrolled && c.exam.score !== null && c.exam.score !== undefined
    );
    
    const container = document.getElementById('certificatesGrid');
    
    if (earnedCertificates.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-certificate"></i>
                <h3>No certificates yet</h3>
                <p>Complete courses and take exams to earn certificates</p>
                <a href="courses.html" class="btn-primary">
                    <i class="fas fa-book"></i> Browse Courses
                </a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = earnedCertificates.map(course => {
        const earnedDate = course.exam.lastAttempt 
            ? new Date(course.exam.lastAttempt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            })
            : 'Recently';
        
        const certificateId = `CERT-${course.code}-${Date.now().toString().slice(-6)}`;
        
        // Determine certificate type
        const isPassed = course.exam.score >= course.exam.passingScore;
        const certType = isPassed ? 'Achievement Certificate' : 'Participation Certificate';
        const certColor = isPassed ? '#10b981' : '#3b82f6';
        
        return `
            <div class="certificate-card">
                <div class="certificate-preview" onclick="viewCertificate(${course.id})" style="border-color: ${certColor};">
                    <div class="certificate-seal" style="background: ${certColor};">
                        <i class="fas fa-award"></i>
                    </div>
                    <div class="certificate-content-preview">
                        <div class="cert-logo">LearnEnrich</div>
                        <h3>${certType}</h3>
                        <p class="cert-student-name">${user.fullName}</p>
                        <p class="cert-course-name">${course.title}</p>
                        <div class="cert-details-preview">
                            <div class="cert-score" style="color: ${certColor};">Score: ${course.exam.score}%</div>
                            <div class="cert-date">${earnedDate}</div>
                        </div>
                    </div>
                    <div class="certificate-badge" style="background: ${certColor};">
                        <i class="fas fa-check-circle"></i> ${isPassed ? 'Passed' : 'Completed'}
                    </div>
                </div>
                
                <div class="certificate-info">
                    <h4>${course.title}</h4>
                    <p class="cert-id">Certificate ID: ${certificateId}</p>
                    <div class="cert-meta">
                        <span><i class="fas fa-calendar"></i> Earned: ${earnedDate}</span>
                        <span><i class="fas fa-star"></i> Score: ${course.exam.score}%</span>
                        <span style="color: ${certColor}; font-weight: 600;">
                            <i class="fas fa-certificate"></i> ${certType}
                        </span>
                    </div>
                </div>
                
                <div class="certificate-actions">
                    <button class="btn-primary" onclick="downloadCertificate(${course.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn-secondary" onclick="shareCertificate(${course.id})">
                        <i class="fab fa-linkedin"></i> Share
                    </button>
                    <button class="btn-secondary" onclick="viewCertificate(${course.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View certificate
function viewCertificate(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    const user = getCurrentUser();
    
    if (!course) return;
    
    const earnedDate = course.exam.lastAttempt 
        ? new Date(course.exam.lastAttempt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        })
        : 'Recently';
    
    const certificateId = `CERT-${course.code}-${Date.now().toString().slice(-6)}`;
    
    // Determine certificate type and styling
    const isPassed = course.exam.score >= course.exam.passingScore;
    const certType = isPassed ? 'Achievement Certificate' : 'Participation Certificate';
    const certSubtitle = isPassed 
        ? 'has successfully completed and passed the course' 
        : 'has participated in and completed the course';
    const certColor = isPassed ? '#10b981' : '#3b82f6';
    
    document.getElementById('certificatePreview').innerHTML = `
        <div class="certificate-full">
            <div class="certificate-border" style="border-color: ${certColor};">
                <div class="certificate-header-full">
                    <div class="cert-logo-large">
                        <i class="fas fa-graduation-cap"></i>
                        LearnEnrich
                    </div>
                    <div class="cert-seal-large" style="background: ${certColor};">
                        <i class="fas fa-award"></i>
                        <span>${isPassed ? 'Passed' : 'Completed'}</span>
                    </div>
                </div>
                
                <div class="certificate-body-full">
                    <h2 style="color: ${certColor};">${certType}</h2>
                    <p class="cert-intro">This is to certify that</p>
                    <h1 class="cert-name-large">${user.fullName}</h1>
                    <p class="cert-text">${certSubtitle}</p>
                    <h3 class="cert-course-large">${course.title}</h3>
                    <p class="cert-code-large">${course.code}</p>
                    
                    <div class="cert-details-full">
                        <div class="cert-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Completion Date</span>
                            <strong>${earnedDate}</strong>
                        </div>
                        <div class="cert-detail-item">
                            <i class="fas fa-star"></i>
                            <span>Final Score</span>
                            <strong style="color: ${certColor};">${course.exam.score}%</strong>
                        </div>
                        <div class="cert-detail-item">
                            <i class="fas fa-user"></i>
                            <span>Instructor</span>
                            <strong>${course.instructor}</strong>
                        </div>
                        <div class="cert-detail-item">
                            <i class="fas fa-certificate"></i>
                            <span>Status</span>
                            <strong style="color: ${certColor};">${isPassed ? 'PASSED' : 'COMPLETED'}</strong>
                        </div>
                    </div>
                    
                    <div class="cert-signature-section">
                        <div class="cert-signature">
                            <div class="signature-line" style="border-color: ${certColor};"></div>
                            <p>Director of Education</p>
                        </div>
                        <div class="cert-id-large">
                            Certificate ID: ${certificateId}
                        </div>
                    </div>
                </div>
                
                <div class="certificate-footer-full">
                    <p>Verify this certificate at learnenrich.com/verify/${certificateId}</p>
                </div>
            </div>
        </div>
        
        <div class="certificate-modal-actions">
            <button class="btn-primary btn-large" onclick="downloadCertificate(${course.id}); closeCertificateModal()">
                <i class="fas fa-download"></i> Download Certificate
            </button>
            <button class="btn-secondary btn-large" onclick="shareCertificate(${course.id})">
                <i class="fab fa-linkedin"></i> Share on LinkedIn
            </button>
        </div>
    `;
    
    document.getElementById('certificateModal').classList.add('active');
}

// Close certificate modal
function closeCertificateModal() {
    document.getElementById('certificateModal').classList.remove('active');
}

// Download certificate
function downloadCertificate(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    const user = getCurrentUser();
    
    if (!course) return;
    
    // Update download count
    let certData = JSON.parse(localStorage.getItem('certificateData')) || {
        downloads: 0,
        shared: 0
    };
    certData.downloads++;
    localStorage.setItem('certificateData', JSON.stringify(certData));

    generateCertificatePDF(course, user);
    updateCertificatesStats();
}

// Share certificate
function shareCertificate(courseId) {
    const courses = getUserCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    // Update shared count
    let certData = JSON.parse(localStorage.getItem('certificateData')) || {
        downloads: 0,
        shared: 0
    };
    certData.shared++;
    localStorage.setItem('certificateData', JSON.stringify(certData));
    
    const linkedInText = `I'm proud to share that I've earned a certificate in ${course.title} from LearnEnrich! 🎓`;
    
    alert(
        `📤 Share on LinkedIn\n\n` +
        `Your certificate for "${course.title}" is ready to share!\n\n` +
        `Suggested post:\n"${linkedInText}"\n\n` +
        `Click OK to open LinkedIn...`
    );
    
    // In a real app, this would open LinkedIn sharing
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedInText)}`, '_blank');
    
    updateCertificatesStats();
}

// Add styles
const certificatesStyle = document.createElement('style');
certificatesStyle.textContent = `
    .certificates-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .cert-stat-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .cert-stat-card i {
        font-size: 3rem;
        color: #f59e0b;
    }
    
    .cert-stat-card h3 {
        font-size: 2.5rem;
        margin: 0;
        color: #1f2937;
    }
    
    .cert-stat-card p {
        margin: 0;
        color: #6b7280;
    }
    
    .certificates-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
    }
    
    .certificate-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        border: 2px solid #f59e0b;
    }
    
    .certificate-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .certificate-preview {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        padding: 2rem;
        position: relative;
        cursor: pointer;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 3px solid #f59e0b;
    }
    
    .certificate-seal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
    
    .certificate-content-preview {
        text-align: center;
        width: 100%;
    }
    
    .cert-logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: #92400e;
        margin-bottom: 1rem;
    }
    
    .certificate-content-preview h3 {
        font-size: 1.125rem;
        color: #78350f;
        margin: 0 0 1rem 0;
        font-weight: 600;
    }
    
    .cert-student-name {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1f2937;
        margin: 1rem 0;
    }
    
    .cert-course-name {
        font-size: 1.25rem;
        color: #374151;
        margin: 1rem 0;
        font-weight: 600;
    }
    
    .cert-details-preview {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .certificate-badge {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #059669;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .certificate-info {
        padding: 1.5rem;
    }
    
    .certificate-info h4 {
        font-size: 1.25rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
    }
    
    .cert-id {
        font-size: 0.75rem;
        color: #6b7280;
        font-family: monospace;
        margin: 0 0 1rem 0;
    }
    
    .cert-meta {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .cert-meta span {
        color: #6b7280;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cert-meta i {
        color: #f59e0b;
    }
    
    .certificate-actions {
        display: flex;
        gap: 0.5rem;
        padding: 1rem 1.5rem;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
    }
    
    .certificate-actions button {
        flex: 1;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }
    
    .certificate-modal {
        max-width: 900px;
    }
    
    .certificate-full {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        padding: 3rem;
        border-radius: 16px;
    }
    
    .certificate-border {
        background: white;
        padding: 3rem;
        border: 8px double #f59e0b;
        border-radius: 12px;
        position: relative;
    }
    
    .certificate-header-full {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 2rem;
    }
    
    .cert-logo-large {
        font-size: 2rem;
        font-weight: 700;
        color: #92400e;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .cert-logo-large i {
        color: #f59e0b;
    }
    
    .cert-seal-large {
        text-align: center;
        color: #f59e0b;
    }
    
    .cert-seal-large i {
        font-size: 4rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .cert-seal-large span {
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
    }
    
    .certificate-body-full {
        text-align: center;
    }
    
    .certificate-body-full h2 {
        font-size: 2.5rem;
        color: #92400e;
        margin: 2rem 0 1rem 0;
        font-family: 'Georgia', serif;
    }
    
    .cert-intro {
        color: #6b7280;
        font-size: 1.125rem;
        margin: 0 0 1rem 0;
    }
    
    .cert-name-large {
        font-size: 3rem;
        color: #1f2937;
        margin: 1rem 0;
        font-family: 'Georgia', serif;
        font-style: italic;
    }
    
    .cert-text {
        color: #6b7280;
        font-size: 1.125rem;
        margin: 1rem 0;
    }
    
    .cert-course-large {
        font-size: 2rem;
        color: #1f2937;
        margin: 1rem 0;
        font-weight: 700;
    }
    
    .cert-code-large {
        color: #f59e0b;
        font-weight: 700;
        margin: 0 0 2rem 0;
    }
    
    .cert-details-full {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin: 2rem 0;
        padding: 2rem;
        background: #fef3c7;
        border-radius: 12px;
    }
    
    .cert-detail-item {
        text-align: center;
    }
    
    .cert-detail-item i {
        font-size: 2rem;
        color: #f59e0b;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .cert-detail-item span {
        display: block;
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }
    
    .cert-detail-item strong {
        display: block;
        color: #1f2937;
        font-size: 1.125rem;
    }
    
    .cert-signature-section {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-top: 3rem;
    }
    
    .cert-signature {
        text-align: left;
    }
    
    .signature-line {
        width: 200px;
        height: 2px;
        background: #1f2937;
        margin-bottom: 0.5rem;
    }
    
    .cert-signature p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .cert-id-large {
        color: #6b7280;
        font-size: 0.875rem;
        font-family: monospace;
    }
    
    .certificate-footer-full {
        text-align: center;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 2px solid #e5e7eb;
    }
    
    .certificate-footer-full p {
        color: #9ca3af;
        font-size: 0.75rem;
        margin: 0;
    }
    
    .certificate-modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
        .certificates-grid {
            grid-template-columns: 1fr;
        }
        
        .certificate-actions {
            flex-direction: column;
        }
        
        .certificate-full {
            padding: 1rem;
        }
        
        .certificate-border {
            padding: 1.5rem;
        }
        
        .cert-details-full {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .certificate-modal-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(certificatesStyle);

// Initialize
if (window.location.pathname.includes('certificates.html')) {
    loadCertificatesPage();
}

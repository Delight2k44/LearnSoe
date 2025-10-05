// ========================================
// LEARNENRICH - CAREER PATH PAGE
// ========================================

const CAREER_PATHS = [
    {
        id: 1,
        title: 'Solar PV Installation Technician',
        icon: 'fa-solar-panel',
        color: '#f59e0b',
        requiredCourses: ['SOLAR-101'],
        salary: 'R450,000 - R650,000',
        growth: '+27%',
        description: 'Install, maintain, and repair solar panel systems on residential and commercial buildings.',
        responsibilities: [
            'Install solar panels on rooftops and ground mounts',
            'Connect solar systems to electrical grids',
            'Perform system maintenance and troubleshooting',
            'Conduct site assessments and safety inspections',
            'Work with electrical components and wiring'
        ],
        skills: [
            'Electrical systems knowledge',
            'Rooftop safety procedures',
            'Blueprint reading',
            'Hand and power tool proficiency',
            'Problem-solving abilities'
        ],
        certifications: [
            'NABCEP PV Installation Professional',
            'OSHA 10-Hour Construction',
            'Electrical License (varies by state)',
            'First Aid/CPR Certification'
        ],
        jobOutlook: 'Solar installers are among the fastest-growing careers in the U.S., with employment projected to grow 27% from 2021 to 2031, much faster than the average for all occupations.',
        companies: [
            'Tesla Energy',
            'Sunrun',
            'Vivint Solar',
            'SunPower',
            'Trinity Solar'
        ]
    },
    {
        id: 2,
        title: 'Wind Turbine Service Technician',
        icon: 'fa-wind',
        color: '#3b82f6',
        requiredCourses: ['WIND-101'],
        salary: 'R520,000 - R740,000',
        growth: '+44%',
        description: 'Maintain and repair wind turbines to ensure optimal performance and safety.',
        responsibilities: [
            'Climb turbines to inspect and repair components',
            'Perform routine maintenance on mechanical and electrical systems',
            'Diagnose and troubleshoot equipment failures',
            'Collect and analyze turbine performance data',
            'Follow strict safety protocols for high-altitude work'
        ],
        skills: [
            'Mechanical aptitude',
            'Electrical troubleshooting',
            'Physical fitness for climbing',
            'Computer skills for diagnostics',
            'Safety consciousness'
        ],
        certifications: [
            'GWO (Global Wind Organisation) Basic Safety Training',
            'BZEE Wind Turbine Technician',
            'Climbing and Rescue Training',
            'High Voltage Safety Certification'
        ],
        jobOutlook: 'Wind turbine technician is the fastest-growing job in America, with 44% projected growth. The expansion of wind farms creates excellent job opportunities.',
        companies: [
            'Vestas',
            'GE Renewable Energy',
            'Siemens Gamesa',
            'Nordex',
            'Enercon'
        ]
    },
    {
        id: 3,
        title: 'Energy Efficiency Consultant',
        icon: 'fa-lightbulb',
        color: '#10b981',
        requiredCourses: ['EFFICIENCY-101'],
        salary: 'R550,000 - R850,000',
        growth: '+13%',
        description: 'Help organizations reduce energy consumption and costs through efficiency improvements.',
        responsibilities: [
            'Conduct energy audits of buildings and facilities',
            'Analyze energy usage patterns and costs',
            'Recommend efficiency improvements',
            'Prepare detailed reports and cost-benefit analyses',
            'Assist clients with implementing energy-saving measures'
        ],
        skills: [
            'Energy auditing techniques',
            'Building systems knowledge',
            'Data analysis',
            'Report writing',
            'Client communication'
        ],
        certifications: [
            'Certified Energy Manager (CEM)',
            'LEED Green Associate',
            'Building Performance Institute (BPI) Certification',
            'Certified Energy Auditor (CEA)'
        ],
        jobOutlook: 'Growing demand for sustainability and cost reduction drives steady growth in energy consulting roles across commercial and residential sectors.',
        companies: [
            'Johnson Controls',
            'Honeywell',
            'Schneider Electric',
            'AECOM',
            'WSP'
        ]
    },
    {
        id: 4,
        title: 'Battery Storage Specialist',
        icon: 'fa-battery-full',
        color: '#8b5cf6',
        requiredCourses: ['STORAGE-201'],
        salary: 'R600,000 - R950,000',
        growth: '+35%',
        description: 'Design, install, and maintain battery energy storage systems for renewable energy.',
        responsibilities: [
            'Design battery storage system configurations',
            'Install and commission battery systems',
            'Monitor system performance and health',
            'Troubleshoot battery and inverter issues',
            'Ensure compliance with safety standards'
        ],
        skills: [
            'Battery technology knowledge',
            'Electrical system design',
            'Safety protocol expertise',
            'System monitoring software',
            'Project management'
        ],
        certifications: [
            'NABCEP Battery Storage Specialist',
            'UL 9540 Battery Storage Systems',
            'Tesla Powerwall Certified Installer',
            'Advanced Electrical License'
        ],
        jobOutlook: 'Explosive growth in grid-scale and residential battery storage creates high demand for specialists. Market expected to grow over 30% annually.',
        companies: [
            'Tesla Energy',
            'LG Energy Solution',
            'Fluence',
            'Enphase Energy',
            'Sonnen'
        ]
    }
];

// Load career page
function loadCareerPage() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    calculateCareerReadiness();
    displayCareerPaths();
}

// Calculate career readiness
function calculateCareerReadiness() {
    const courses = getUserCourses();
    const completedCourses = courses.filter(c => c.progress === 100).length;
    const totalCourses = courses.filter(c => c.enrolled).length || 1;
    
    const readinessScore = Math.round((completedCourses / totalCourses) * 100);
    
    document.getElementById('readinessScore').textContent = readinessScore + '%';
    document.getElementById('readinessFill').style.width = readinessScore + '%';
    
    let message = '';
    if (readinessScore >= 80) {
        message = '🎉 Excellent! You\'re highly prepared for a career in renewable energy!';
        document.getElementById('readinessFill').style.background = 'linear-gradient(90deg, #10b981, #059669)';
    } else if (readinessScore >= 50) {
        message = '👍 Good progress! Complete more courses to boost your career readiness.';
        document.getElementById('readinessFill').style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
        message = '📚 Keep learning! More courses will improve your career opportunities.';
        document.getElementById('readinessFill').style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    }
    
    document.getElementById('readinessMessage').textContent = message;
}

// Display career paths
function displayCareerPaths() {
    const courses = getUserCourses();
    const container = document.getElementById('careerPathsGrid');
    
    container.innerHTML = CAREER_PATHS.map(career => {
        // Check if user completed required courses
        const requiredCompleted = career.requiredCourses.every(reqCode => {
            const course = courses.find(c => c.code === reqCode);
            return course && course.progress === 100 && course.exam.score >= course.exam.passingScore;
        });
        
        const partialProgress = career.requiredCourses.some(reqCode => {
            const course = courses.find(c => c.code === reqCode);
            return course && course.enrolled;
        });
        
        return `
            <div class="career-path-card ${requiredCompleted ? 'unlocked' : ''}">
                <div class="career-card-header" style="background: linear-gradient(135deg, ${career.color}, ${adjustColor(career.color, -20)});">
                    <div class="career-icon">
                        <i class="fas ${career.icon}"></i>
                    </div>
                    ${requiredCompleted ? `
                        <div class="career-unlocked-badge">
                            <i class="fas fa-unlock"></i> Qualified
                        </div>
                    ` : ''}
                </div>
                
                <div class="career-card-body">
                    <h3>${career.title}</h3>
                    <p class="career-description">${career.description}</p>
                    
                    <div class="career-stats">
                        <div class="career-stat">
                            <i class="fas fa-dollar-sign"></i>
                            <div>
                                <span>Salary Range</span>
                                <strong>${career.salary}</strong>
                            </div>
                        </div>
                        <div class="career-stat">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <span>Job Growth</span>
                                <strong>${career.growth}</strong>
                            </div>
                        </div>
                    </div>
                    
                    <div class="career-requirements">
                        <h4><i class="fas fa-graduation-cap"></i> Required Courses</h4>
                        <div class="required-courses">
                            ${career.requiredCourses.map(code => {
                                const course = courses.find(c => c.code === code);
                                const isComplete = course && course.progress === 100 && course.exam.score >= course.exam.passingScore;
                                const isEnrolled = course && course.enrolled;
                                
                                return `
                                    <div class="course-requirement ${isComplete ? 'complete' : isEnrolled ? 'enrolled' : 'locked'}">
                                        <i class="fas ${isComplete ? 'fa-check-circle' : isEnrolled ? 'fa-clock' : 'fa-lock'}"></i>
                                        <span>${code}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="career-actions">
                        <button class="btn-primary" onclick="viewCareerDetails(${career.id})">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                        ${!requiredCompleted ? `
                            <button class="btn-secondary" onclick="viewRequiredCourses(${career.id})">
                                <i class="fas fa-book"></i> Start Learning
                            </button>
                        ` : `
                            <button class="btn-success">
                                <i class="fas fa-check"></i> You're Ready!
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Adjust color brightness
function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// View career details
function viewCareerDetails(careerId) {
    const career = CAREER_PATHS.find(c => c.id === careerId);
    if (!career) return;
    
    document.getElementById('careerModalTitle').textContent = career.title;
    document.getElementById('careerModalContent').innerHTML = `
        <div class="career-detail-full">
            <div class="career-overview">
                <div class="overview-icon" style="background: ${career.color};">
                    <i class="fas ${career.icon}"></i>
                </div>
                <div class="overview-info">
                    <h3>${career.title}</h3>
                    <p>${career.description}</p>
                    <div class="overview-stats">
                        <div class="stat">
                            <strong>${career.salary}</strong>
                            <span>Annual Salary</span>
                        </div>
                        <div class="stat">
                            <strong>${career.growth}</strong>
                            <span>Job Growth Rate</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-tasks"></i> Key Responsibilities</h4>
                <ul class="detail-list">
                    ${career.responsibilities.map(item => `
                        <li><i class="fas fa-check"></i> ${item}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-star"></i> Required Skills</h4>
                <div class="skills-badges">
                    ${career.skills.map(skill => `
                        <div class="skill-badge-career">${skill}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-certificate"></i> Recommended Certifications</h4>
                <ul class="detail-list">
                    ${career.certifications.map(cert => `
                        <li><i class="fas fa-award"></i> ${cert}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-chart-bar"></i> Job Market Outlook</h4>
                <p class="outlook-text">${career.jobOutlook}</p>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-building"></i> Top Employers</h4>
                <div class="companies-grid">
                    ${career.companies.map(company => `
                        <div class="company-badge">
                            <i class="fas fa-briefcase"></i>
                            ${company}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="career-cta">
                <p><strong>Ready to start your career journey?</strong></p>
                <p>Complete the required courses and earn your certification to become job-ready!</p>
                <button class="btn-primary btn-large" onclick="closeCareerModal(); window.location.href='courses.html'">
                    <i class="fas fa-rocket"></i> Enroll in Courses
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('careerModal').classList.add('active');
}

// View required courses
function viewRequiredCourses(careerId) {
    const career = CAREER_PATHS.find(c => c.id === careerId);
    if (!career) return;
    
    alert(
        `📚 Required Courses for ${career.title}\n\n` +
        `To qualify for this career, you need to complete:\n\n` +
        career.requiredCourses.map(code => `✓ ${code}`).join('\n') +
        `\n\nClick OK to view available courses...`
    );
    
    window.location.href = 'courses.html';
}

// Close career modal
function closeCareerModal() {
    document.getElementById('careerModal').classList.remove('active');
}

// Add styles
const careerStyle = document.createElement('style');
careerStyle.textContent = `
    .career-readiness {
        margin-bottom: 2rem;
    }
    
    .readiness-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2.5rem;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 2rem;
        color: white;
        box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
    }
    
    .readiness-icon {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        backdrop-filter: blur(10px);
        flex-shrink: 0;
    }
    
    .readiness-info {
        flex: 1;
    }
    
    .readiness-info h2 {
        font-size: 1.75rem;
        margin: 0 0 1.5rem 0;
    }
    
    .readiness-score {
        margin-bottom: 1rem;
    }
    
    .score-display {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .score-bar {
        height: 20px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        overflow: hidden;
    }
    
    .score-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 1s;
    }
    
    .readiness-info p {
        margin: 1rem 0 0 0;
        font-size: 1.125rem;
        opacity: 0.95;
    }
    
    .career-paths-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
    }
    
    .career-path-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        border: 2px solid #e5e7eb;
    }
    
    .career-path-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .career-path-card.unlocked {
        border-color: #10b981;
        box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }
    
    .career-card-header {
        padding: 2rem;
        position: relative;
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .career-icon {
        font-size: 5rem;
        color: white;
    }
    
    .career-unlocked-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: white;
        color: #10b981;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .career-card-body {
        padding: 2rem;
    }
    
    .career-card-body h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0 0 1rem 0;
    }
    
    .career-description {
        color: #6b7280;
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
    
    .career-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 12px;
    }
    
    .career-stat {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .career-stat i {
        font-size: 1.5rem;
        color: #2563eb;
    }
    
    .career-stat div {
        display: flex;
        flex-direction: column;
    }
    
    .career-stat span {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .career-stat strong {
        font-size: 1.125rem;
        color: #1f2937;
    }
    
    .career-requirements {
        margin-bottom: 1.5rem;
    }
    
    .career-requirements h4 {
        font-size: 1rem;
        color: #374151;
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .required-courses {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }
    
    .course-requirement {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.875rem;
    }
    
    .course-requirement.complete {
        background: #d1fae5;
        color: #047857;
    }
    
    .course-requirement.enrolled {
        background: #dbeafe;
        color: #1d4ed8;
    }
    
    .course-requirement.locked {
        background: #f3f4f6;
        color: #9ca3af;
    }
    
    .career-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .career-actions button {
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
    
    .career-modal {
        max-width: 900px;
    }
    
    .career-overview {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        background: #f9fafb;
        border-radius: 12px;
        margin-bottom: 2rem;
    }
    
    .overview-icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: white;
        flex-shrink: 0;
    }
    
    .overview-info h3 {
        font-size: 1.75rem;
        margin: 0 0 0.75rem 0;
        color: #1f2937;
    }
    
    .overview-info p {
        color: #6b7280;
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
    
    .overview-stats {
        display: flex;
        gap: 2rem;
    }
    
    .overview-stats .stat {
        display: flex;
        flex-direction: column;
    }
    
    .overview-stats strong {
        font-size: 1.5rem;
        color: #1f2937;
        margin-bottom: 0.25rem;
    }
    
    .overview-stats span {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .detail-section {
        margin-bottom: 2rem;
    }
    
    .detail-section h4 {
        font-size: 1.25rem;
        color: #1f2937;
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .detail-section h4 i {
        color: #2563eb;
    }
    
    .detail-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .detail-list li {
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: start;
        gap: 0.75rem;
    }
    
    .detail-list li:last-child {
        border-bottom: none;
    }
    
    .detail-list i {
        color: #10b981;
        margin-top: 0.25rem;
    }
    
    .skills-badges {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
    }
    
    .skill-badge-career {
        padding: 0.875rem;
        background: #eff6ff;
        color: #1e40af;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
        font-size: 0.875rem;
    }
    
    .outlook-text {
        color: #374151;
        line-height: 1.8;
        background: #f0fdf4;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #10b981;
    }
    
    .companies-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .company-badge {
        padding: 1rem;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-weight: 600;
        color: #374151;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .company-badge i {
        color: #6b7280;
    }
    
    .career-cta {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        color: white;
        margin-top: 2rem;
    }
    
    .career-cta p {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
    }
    
    .career-cta .btn-primary {
        background: white;
        color: #667eea;
        margin-top: 1rem;
    }
    
    .career-cta .btn-primary:hover {
        background: #f3f4f6;
    }
    
    @media (max-width: 768px) {
        .career-paths-grid {
            grid-template-columns: 1fr;
        }
        
        .readiness-card {
            flex-direction: column;
            text-align: center;
        }
        
        .career-stats {
            grid-template-columns: 1fr;
        }
        
        .career-actions {
            flex-direction: column;
        }
        
        .career-overview {
            flex-direction: column;
            text-align: center;
        }
        
        .skills-badges,
        .companies-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(careerStyle);

// Initialize
if (window.location.pathname.includes('career.html')) {
    loadCareerPage();
}

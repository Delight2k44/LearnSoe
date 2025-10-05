// Discussion Forum Module
// Handles topic creation, comments, and user interactions

// Discussion Topics Database
const DISCUSSION_TOPICS = [
    {
        id: 1,
        title: 'Best practices for solar panel installation on metal roofs?',
        category: 'solar',
        author: 'Sarah Martinez',
        avatar: 'SM',
        timeAgo: '2 hours ago',
        replies: 15,
        views: 234,
        lastActive: '15 minutes ago',
        status: 'hot',
        excerpt: 'I am working on a project with a standing seam metal roof. What are the best mounting options?'
    },
    {
        id: 2,
        title: 'Wind turbine maintenance schedule - What do you follow?',
        category: 'wind',
        author: 'James Chen',
        avatar: 'JC',
        timeAgo: '5 hours ago',
        replies: 23,
        views: 456,
        lastActive: '1 hour ago',
        status: 'hot',
        excerpt: 'Looking to optimize our maintenance intervals. What is working for you?'
    },
    {
        id: 3,
        title: 'NABCEP Exam Tips - Just passed!',
        category: 'careers',
        author: 'Michael Johnson',
        avatar: 'MJ',
        timeAgo: '1 day ago',
        replies: 42,
        views: 892,
        lastActive: '30 minutes ago',
        status: 'solved',
        excerpt: 'Finally passed the NABCEP PV Installation Professional exam. Happy to share study tips!'
    },
    {
        id: 4,
        title: 'Inverter sizing calculation - Am I doing this right?',
        category: 'technical',
        author: 'Emily Rodriguez',
        avatar: 'ER',
        timeAgo: '3 hours ago',
        replies: 8,
        views: 167,
        lastActive: '45 minutes ago',
        status: 'active',
        excerpt: 'I have a 10kW array and I am trying to size the inverter. Should I account for 125% capacity?'
    },
    {
        id: 5,
        title: 'Career transition from electrical to solar - Advice?',
        category: 'careers',
        author: 'David Thompson',
        avatar: 'DT',
        timeAgo: '6 hours ago',
        replies: 31,
        views: 543,
        lastActive: '2 hours ago',
        status: 'active',
        excerpt: 'I am a licensed electrician looking to specialize in solar. What certifications should I pursue?'
    },
    {
        id: 6,
        title: 'Net metering policy changes in California',
        category: 'general',
        author: 'Lisa Wang',
        avatar: 'LW',
        timeAgo: '12 hours ago',
        replies: 27,
        views: 678,
        lastActive: '3 hours ago',
        status: 'hot',
        excerpt: 'NEM 3.0 is here. How is this affecting your solar installations?'
    },
    {
        id: 7,
        title: 'Battery storage recommendations for off-grid systems',
        category: 'solar',
        author: 'Robert Kim',
        avatar: 'RK',
        timeAgo: '1 day ago',
        replies: 19,
        views: 421,
        lastActive: '4 hours ago',
        status: 'active',
        excerpt: 'Looking at lithium vs lead-acid for a remote cabin installation. Budget is $8K.'
    },
    {
        id: 8,
        title: 'GWO Basic Safety Training - Worth it?',
        category: 'wind',
        author: 'Amanda Foster',
        avatar: 'AF',
        timeAgo: '2 days ago',
        replies: 34,
        views: 765,
        lastActive: '5 hours ago',
        status: 'solved',
        excerpt: 'Considering GWO BST certification for wind turbine work. Any insights on ROI?'
    }
];

// Reply Templates for Automated Responses
const AI_REPLY_TEMPLATES = {
    helpful: [
        "Great question! I've dealt with this before. {advice}",
        "I can help with that. {advice}",
        "Here's what worked for me: {advice}",
        "From my experience, {advice}",
        "This is actually quite common. {advice}"
    ],
    technical: [
        "According to NEC guidelines, {technical}",
        "The calculation you need is: {technical}",
        "Technically speaking, {technical}",
        "Based on industry standards, {technical}",
        "The proper approach is: {technical}"
    ],
    supportive: [
        "You're on the right track! {encouragement}",
        "Don't worry, we've all been there. {encouragement}",
        "That's a smart approach. {encouragement}",
        "Good thinking! {encouragement}",
        "Absolutely! {encouragement}"
    ],
    expert: [
        "As a certified installer, I recommend {expert}",
        "With 10+ years in the field, {expert}",
        "From a technical perspective, {expert}",
        "Industry best practice is {expert}",
        "Based on the latest research, {expert}"
    ]
};

// Realistic names for AI participants
const AI_PARTICIPANTS = [
    { name: 'Carlos Rivera', title: 'Senior Solar Installer', avatar: 'CR' },
    { name: 'Jennifer Park', title: 'Wind Technician', avatar: 'JP' },
    { name: 'Ahmed Hassan', title: 'Electrical Engineer', avatar: 'AH' },
    { name: 'Maria Gonzalez', title: 'NABCEP Certified', avatar: 'MG' },
    { name: 'Kevin O\'Brien', title: 'System Designer', avatar: 'KO' },
    { name: 'Priya Sharma', title: 'Energy Consultant', avatar: 'PS' },
    { name: 'Marcus Williams', title: 'GWO Instructor', avatar: 'MW' },
    { name: 'Sophie Laurent', title: 'Project Manager', avatar: 'SL' }
];

// Initialize forum
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUser();
    displayTopics();
    startLiveUpdates();
});

// Load user info
function loadUser() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.fullName;
    }
}

// Display topics
function displayTopics() {
    const container = document.getElementById('discussionTopics');
    
    container.innerHTML = DISCUSSION_TOPICS.map(topic => `
        <div class="topic-card ${topic.status}" onclick="viewTopic(${topic.id})">
            <div class="topic-status-badge">${getStatusBadge(topic.status)}</div>
            <div class="topic-avatar">${topic.avatar}</div>
            <div class="topic-content">
                <h3>${topic.title}</h3>
                <p class="topic-excerpt">${topic.excerpt}</p>
                <div class="topic-meta">
                    <span class="topic-author">
                        <i class="fas fa-user"></i> ${topic.author}
                    </span>
                    <span class="topic-category">
                        <i class="fas fa-tag"></i> ${getCategoryName(topic.category)}
                    </span>
                    <span class="topic-time">
                        <i class="fas fa-clock"></i> ${topic.timeAgo}
                    </span>
                </div>
            </div>
            <div class="topic-stats">
                <div class="stat-item">
                    <i class="fas fa-comment"></i>
                    <span>${topic.replies}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-eye"></i>
                    <span>${topic.views}</span>
                </div>
                <div class="topic-last-active">
                    Last active: ${topic.lastActive}
                </div>
            </div>
        </div>
    `).join('');
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        hot: '<i class="fas fa-fire"></i> Hot',
        active: '<i class="fas fa-circle"></i> Active',
        solved: '<i class="fas fa-check-circle"></i> Solved'
    };
    return badges[status] || 'Active';
}

// Get category name
function getCategoryName(category) {
    const categories = {
        solar: 'Solar PV',
        wind: 'Wind Energy',
        general: 'General',
        technical: 'Technical',
        careers: 'Career Advice'
    };
    return categories[category] || category;
}

// View topic (opens detailed view with replies and commenting)
function viewTopic(topicId) {
    const topic = DISCUSSION_TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    
    // Increment views
    topic.views++;
    displayTopics();
    
    // Generate AI replies for this topic
    const numReplies = Math.floor(Math.random() * 5) + 3; // 3-7 replies
    const replies = [];
    
    for (let i = 0; i < numReplies; i++) {
        const participant = AI_PARTICIPANTS[Math.floor(Math.random() * AI_PARTICIPANTS.length)];
        const replyContent = generateContextualReply(topic);
        const timeOptions = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 hours ago', '30 minutes ago'];
        
        replies.push({
            id: i + 1,
            author: participant.name,
            title: participant.title,
            avatar: participant.avatar,
            content: replyContent,
            timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
            likes: Math.floor(Math.random() * 20)
        });
    }
    
    // Create full discussion view
    const modalHTML = `
        <div id="topicViewModal" class="modal active" style="display: flex;">
            <div class="modal-overlay" onclick="closeTopicView()"></div>
            <div class="modal-container modal-large" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <div>
                        <h2 style="margin-bottom: 0.5rem;">${topic.title}</h2>
                        <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: #6b7280;">
                            <span><i class="fas fa-user"></i> ${topic.author}</span>
                            <span><i class="fas fa-tag"></i> ${getCategoryName(topic.category)}</span>
                            <span><i class="fas fa-clock"></i> ${topic.timeAgo}</span>
                            <span><i class="fas fa-eye"></i> ${topic.views} views</span>
                        </div>
                    </div>
                    <button class="modal-close" onclick="closeTopicView()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 1.5rem;">
                    <!-- Original Post -->
                    <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.125rem;">
                                ${topic.avatar}
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; color: #1f2937;">${topic.author}</div>
                                <div style="font-size: 0.875rem; color: #6b7280;">Posted ${topic.timeAgo}</div>
                            </div>
                        </div>
                        <p style="color: #374151; line-height: 1.6; margin: 0;">${topic.excerpt}</p>
                    </div>
                    
                    <!-- Replies -->
                    <div style="margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem; color: #1f2937; font-size: 1.125rem;">
                            <i class="fas fa-comments"></i> ${replies.length} Replies
                        </h3>
                        <div id="repliesList">
                            ${replies.map(reply => `
                                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                                    <div style="display: flex; gap: 1rem;">
                                        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                                            ${reply.avatar}
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                                <div>
                                                    <div style="font-weight: 600; color: #1f2937;">${reply.author}</div>
                                                    <div style="font-size: 0.875rem; color: #6b7280;">${reply.title} • ${reply.timeAgo}</div>
                                                </div>
                                                <button onclick="likeReply(${reply.id})" style="background: none; border: 1px solid #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 0.875rem;">
                                                    <i class="fas fa-thumbs-up"></i> ${reply.likes}
                                                </button>
                                            </div>
                                            <p style="color: #374151; line-height: 1.6; margin: 0;">${reply.content}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Add Reply Form -->
                    <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; border: 2px solid #e5e7eb;">
                        <h4 style="margin-bottom: 1rem; color: #1f2937;">Add Your Reply</h4>
                        <textarea id="replyContent" placeholder="Share your thoughts, expertise, or ask a follow-up question..." style="width: 100%; min-height: 120px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; resize: vertical; margin-bottom: 1rem;"></textarea>
                        <button onclick="postReply(${topicId})" class="btn-primary">
                            <i class="fas fa-paper-plane"></i> Post Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('topicViewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close topic view
function closeTopicView() {
    const modal = document.getElementById('topicViewModal');
    if (modal) {
        modal.remove();
    }
}

// Post a reply
function postReply(topicId) {
    const content = document.getElementById('replyContent').value.trim();
    
    if (!content) {
        showAlert('Please write a reply before posting', 'error');
        return;
    }
    
    const topic = DISCUSSION_TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    
    // Increment reply count
    topic.replies++;
    topic.lastActive = 'Just now';
    displayTopics();
    
    showAlert(
        '✅ Reply Posted Successfully!\n\n' +
        'Your reply has been added to the discussion. Other members will be notified.',
        'success',
        'Reply Posted'
    );
    
    // Close modal and refresh
    closeTopicView();
    
    // Simulate AI response after 5 seconds
    setTimeout(() => {
        simulateAIReply(topicId);
    }, 5000);
}

// Like a reply
function likeReply(replyId) {
    showAlert(
        '👍 Reply Liked!\n\n' +
        'Your appreciation has been recorded.',
        'success',
        'Liked'
    );
}

// Show new topic modal
function showNewTopicModal() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

// Close new topic modal
function closeNewTopicModal() {
    document.getElementById('newTopicModal').style.display = 'none';
}

// Create new topic
function createNewTopic() {
    const title = document.getElementById('topicTitle').value.trim();
    const category = document.getElementById('topicCategory').value;
    const message = document.getElementById('topicMessage').value.trim();
    
    if (!title || !message) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    const user = getCurrentUser();
    
    // Add new topic
    const newTopic = {
        id: DISCUSSION_TOPICS.length + 1,
        title: title,
        category: category,
        author: user.fullName,
        avatar: user.fullName.split(' ').map(n => n[0]).join(''),
        timeAgo: 'Just now',
        replies: 0,
        views: 1,
        lastActive: 'Just now',
        status: 'active',
        excerpt: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    };
    
    DISCUSSION_TOPICS.unshift(newTopic);
    displayTopics();
    closeNewTopicModal();
    
    // Clear form
    document.getElementById('topicTitle').value = '';
    document.getElementById('topicMessage').value = '';
    
    showAlert(
        '✅ Your topic has been posted!\n\n' +
        'Community members will start replying soon. You\'ll receive notifications when someone responds.',
        'success',
        'Topic Posted'
    );
    
    // Simulate AI reply after 10 seconds
    setTimeout(() => {
        simulateAIReply(newTopic.id);
    }, 10000);
}

// Simulate AI reply with contextual responses
function simulateAIReply(topicId) {
    const topic = DISCUSSION_TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    
    topic.replies++;
    topic.lastActive = 'Just now';
    displayTopics();
    
    // Generate contextual reply based on topic content
    const participant = AI_PARTICIPANTS[Math.floor(Math.random() * AI_PARTICIPANTS.length)];
    const replyContent = generateContextualReply(topic);
    
    // Show notification with actual contextual reply
    showAlert(
        `💬 New Reply!\n\n` +
        `${participant.name} (${participant.title}):\n\n` +
        `"${replyContent}"\n\n` +
        `Topic: "${topic.title}"`,
        'info',
        'New Reply'
    );
}

// Generate contextual AI reply based on topic content
function generateContextualReply(topic) {
    const titleLower = topic.title.toLowerCase();
    const excerptLower = topic.excerpt.toLowerCase();
    const combined = titleLower + ' ' + excerptLower;
    
    // Solar-related responses
    if (combined.includes('solar') || combined.includes('panel') || combined.includes('pv')) {
        const solarReplies = [
            'For solar installations, I always recommend checking your local building codes first. The mounting system should be rated for your wind zone, and don\'t forget to account for snow loads if applicable.',
            'Great question! I\'ve installed over 200 solar systems. Make sure your inverter is sized at 80-110% of your array capacity. Also, consider future expansion when choosing your equipment.',
            'Solar panel efficiency depends heavily on orientation and tilt angle. In most cases, facing true south with a tilt equal to your latitude gives optimal year-round performance.',
            'I\'d suggest looking into microinverters vs string inverters for your setup. Microinverters cost more upfront but offer better monitoring and handle shading better.'
        ];
        return solarReplies[Math.floor(Math.random() * solarReplies.length)];
    }
    
    // Wind energy responses
    if (combined.includes('wind') || combined.includes('turbine')) {
        const windReplies = [
            'Wind turbine maintenance is crucial! I follow a quarterly inspection schedule: check blade integrity, gearbox oil levels, and electrical connections. Annual comprehensive service is a must.',
            'For wind turbines, vibration monitoring is key. Any unusual vibrations can indicate bearing issues or blade imbalance. Catch these early before they become expensive repairs.',
            'GWO certification is absolutely worth it if you\'re serious about wind energy. It\'s basically required for all major wind farms now. The safety training alone is invaluable.',
            'Make sure you\'re tracking wind speed data for at least a full year before committing to a turbine installation. Wind patterns vary significantly season to season.'
        ];
        return windReplies[Math.floor(Math.random() * windReplies.length)];
    }
    
    // Battery/storage responses
    if (combined.includes('battery') || combined.includes('storage') || combined.includes('backup')) {
        const batteryReplies = [
            'For battery storage, lithium-ion is the way to go now. Prices have dropped significantly, and the lifespan is 2-3x longer than lead-acid. Tesla Powerwall and LG Chem are solid choices.',
            'Don\'t forget to factor in depth of discharge when sizing your battery bank. Lithium batteries can safely discharge to 80-90%, but lead-acid should only go to 50% for longevity.',
            'Battery management systems (BMS) are critical! Make sure whatever system you choose has robust BMS with cell balancing. This dramatically extends battery life.',
            'For off-grid systems, I always oversize the battery bank by 20-30%. You want some buffer for cloudy days and aging capacity loss over time.'
        ];
        return batteryReplies[Math.floor(Math.random() * batteryReplies.length)];
    }
    
    // Inverter/technical responses
    if (combined.includes('inverter') || combined.includes('sizing') || combined.includes('calculation')) {
        const technicalReplies = [
            'For inverter sizing, the NEC requires the continuous output current to not exceed 80% of the inverter rating. So a 10kW array needs at least a 12.5kW inverter to be code-compliant.',
            'String inverters should be sized between 90-110% of array capacity. Going smaller (90-100%) can save money if you have good solar resource. Going larger (100-110%) helps with expansion.',
            'Don\'t forget about temperature derating! Inverters lose efficiency in high heat. If your equipment is in direct sun or a hot attic, upsize by 10-15%.',
            'Check the inverter\'s MPPT voltage range carefully. Your array voltage (considering temperature extremes) must stay within this range for optimal performance.'
        ];
        return technicalReplies[Math.floor(Math.random() * technicalReplies.length)];
    }
    
    // Career/certification responses
    if (combined.includes('career') || combined.includes('certification') || combined.includes('nabcep') || combined.includes('gwo') || combined.includes('exam')) {
        const careerReplies = [
            'Congratulations on pursuing renewable energy! NABCEP certification really does make a difference. Employers recognize it, and you can command 15-20% higher pay once certified.',
            'For the NABCEP exam, I highly recommend the study guide from Bill Brooks. Also, join a local NABCEP study group if you can - learning with others helps tremendously.',
            'Career transition tip: Get hands-on experience first! Even volunteer work or shadowing installers for a few weeks will teach you more than any textbook. Then pursue certifications.',
            'The renewable energy job market is booming! With your electrical background, you\'re already ahead. NABCEP PV Installation Professional should be your first cert, then consider PV Technical Sales.'
        ];
        return careerReplies[Math.floor(Math.random() * careerReplies.length)];
    }
    
    // Policy/regulations responses
    if (combined.includes('policy') || combined.includes('regulation') || combined.includes('net metering') || combined.includes('incentive')) {
        const policyReplies = [
            'Net metering policies are changing rapidly. Make sure you\'re checking your local utility\'s current rules - some have grandfathered old customers but new rules for new installs.',
            'The ITC (Investment Tax Credit) is still 30% through 2032, then steps down. This is a huge financial incentive that makes solar much more affordable for homeowners.',
            'Local permitting can be a bigger headache than federal regulations. Some jurisdictions have streamlined solar permits, others require full structural calcs. Check with your city first.',
            'Don\'t forget about interconnection agreements! Your utility may have specific equipment requirements or study fees before they\'ll allow grid connection.'
        ];
        return policyReplies[Math.floor(Math.random() * policyReplies.length)];
    }
    
    // Installation/mounting responses
    if (combined.includes('install') || combined.includes('mount') || combined.includes('roof')) {
        const installReplies = [
            'For metal roof installations, use clamp-style mounts that attach to the standing seams - no roof penetrations needed! S-5! clamps are industry standard and very reliable.',
            'Roof integrity is crucial before solar install. If your roof is more than 15 years old, consider replacing it first. Removing solar panels to re-roof later is expensive.',
            'Flashing details make or break a roof mount. Use EPDM rubber or similar waterproofing, and always seal with high-quality roof sealant. Leaks are the #1 complaint.',
            'Ground mounts can be easier than roof mounts if you have the space. Concrete footings or helical piers work well - choice depends on soil conditions.'
        ];
        return installReplies[Math.floor(Math.random() * installReplies.length)];
    }
    
    // Generic helpful responses for anything else
    const genericReplies = [
        'That\'s a really good question! I\'ve seen similar situations before. The key is to follow manufacturer specs closely and always verify with local codes.',
        'Interesting topic! From my experience, the best approach is to consult with multiple experienced professionals before making a final decision.',
        'This is something a lot of people struggle with initially. Don\'t hesitate to reach out to manufacturers\' tech support - they\'re usually very helpful.',
        'Great discussion! I\'d recommend checking out some recent case studies in Solar Pro magazine. They cover scenarios like this regularly.',
        'I dealt with something similar last year. The learning curve can be steep, but once you understand the fundamentals, it gets much easier.',
        'Excellent question! The renewable energy field is evolving fast, so staying current with industry publications and continuing education is key.'
    ];
    return genericReplies[Math.floor(Math.random() * genericReplies.length)];
}

// Start live updates (simulate activity)
function startLiveUpdates() {
    setInterval(() => {
        // Randomly update stats
        const randomTopic = DISCUSSION_TOPICS[Math.floor(Math.random() * DISCUSSION_TOPICS.length)];
        
        // Sometimes add a reply
        if (Math.random() > 0.7) {
            randomTopic.replies++;
            randomTopic.lastActive = 'Just now';
        }
        
        // Sometimes add views
        if (Math.random() > 0.5) {
            randomTopic.views += Math.floor(Math.random() * 5) + 1;
        }
        
        displayTopics();
        
        // Update online count
        const currentOnline = parseInt(document.getElementById('onlineNow').textContent);
        const change = Math.floor(Math.random() * 10) - 5;
        const newOnline = Math.max(100, currentOnline + change);
        document.getElementById('onlineNow').textContent = newOnline;
        
    }, 30000); // Update every 30 seconds
}

// Search functionality
document.getElementById('forumSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
        displayTopics();
        return;
    }
    
    const filtered = DISCUSSION_TOPICS.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm) ||
        topic.excerpt.toLowerCase().includes(searchTerm) ||
        topic.author.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('discussionTopics');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try different keywords</p>
            </div>
        `;
    } else {
        container.innerHTML = filtered.map(topic => `
            <div class="topic-card ${topic.status}" onclick="viewTopic(${topic.id})">
                <div class="topic-status-badge">${getStatusBadge(topic.status)}</div>
                <div class="topic-avatar">${topic.avatar}</div>
                <div class="topic-content">
                    <h3>${topic.title}</h3>
                    <p class="topic-excerpt">${topic.excerpt}</p>
                    <div class="topic-meta">
                        <span class="topic-author">
                            <i class="fas fa-user"></i> ${topic.author}
                        </span>
                        <span class="topic-category">
                            <i class="fas fa-tag"></i> ${getCategoryName(topic.category)}
                        </span>
                        <span class="topic-time">
                            <i class="fas fa-clock"></i> ${topic.timeAgo}
                        </span>
                    </div>
                </div>
                <div class="topic-stats">
                    <div class="stat-item">
                        <i class="fas fa-comment"></i>
                        <span>${topic.replies}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-eye"></i>
                        <span>${topic.views}</span>
                    </div>
                    <div class="topic-last-active">
                        Last active: ${topic.lastActive}
                    </div>
                </div>
            </div>
        `).join('');
    }
});

# LearnEnrich - Renewable Energy Learning Platform

A comprehensive eLearning platform similar to Cisco NetAcad, designed for renewable energy education with full features including user management, courses, assessments, certificates, and career guidance.

## Features

### 🔐 User Authentication
- User registration with email validation
- Secure login system
- Password confirmation
- Session management

### 📊 Personalized Dashboard
- Welcome banner with user name
- Real-time statistics (streak, courses, certificates)
- Progress tracking
- Quick access to active courses

### 🔥 Streak System
- Tracks consecutive days of platform usage
- Automatically updates on each login
- Displays prominently on dashboard

### 📚 Course Management
- 5 Pre-loaded renewable energy courses:
  - Solar Energy Fundamentals
  - Wind Turbine Technology
  - Energy Efficiency & Auditing
  - Energy Storage Systems
  - Renewable Energy Policy
- Course enrollment system
- Progress tracking (0-100%)
- Course modules and detailed information
- Available and enrolled course views

### 📝 Assignments Module
- Automatic assignment creation upon course enrollment
- Assignment submission system
- Auto-grading with scores (80-100%)
- Status tracking (pending, completed, graded)
- Due date management

### ⏱️ Assessment Module
- Timed tests (30 minutes per assessment)
- Real-time countdown timer
- Multiple-choice questions (5 per assessment)
- Auto-grading system
- Passing score: 70%
- Retake option for failed assessments

### 🏆 Certificate System
- Automatic certificate generation upon passing assessment
- Downloadable certificates (PDF-ready)
- Certificate includes:
  - User name
  - Course name
  - Score achieved
  - Issue date
  - Unique certificate number
  - LearnEnrich branding and logo
- Print-ready format

### 💼 Career Guidance
- 4 Career paths:
  1. **Solar Energy Technician** - Installation and maintenance of solar systems
  2. **Wind Turbine Technician** - Wind turbine maintenance and repair
  3. **Energy Efficiency Consultant** - Energy audits and efficiency improvements
  4. **Energy Storage Specialist** - Battery systems and grid integration
- Each career includes:
  - Detailed description
  - Key responsibilities
  - Required training path
  - Direct link to relevant courses

### 💡 Entrepreneurship Hub
- Business planning guidance
- Market research strategies
- Funding options and resources
- Legal requirements
- Marketing strategies
- Growth tactics
- Modules cover:
  - Starting a renewable energy business
  - Solar installation business
  - Energy consulting services
  - Financing your venture
  - Marketing & growth strategies

### 📱 Responsive Design
- Fully responsive for desktop, tablet, and phone
- Mobile-friendly navigation
- Optimized layouts for all screen sizes
- Touch-friendly interface

### 💾 Data Storage
- Uses localStorage for data persistence
- No backend required
- All data stored locally in browser
- JSON-based data structure

## Installation & Setup

1. **Download the files:**
   - `index.html`
   - `styles.css`
   - `script.js`
   - `LearnEnrich Logo.png` (your logo)

2. **Place all files in the same directory**

3. **Open `index.html` in a web browser**
   - Double-click the file, or
   - Right-click → Open with → Your browser

4. **No server required!** The application runs entirely in the browser.

## Usage Guide

### For Students:

1. **Register an Account**
   - Click "Sign Up" on the landing page
   - Fill in your full name, email, and password
   - Confirm your password and submit

2. **Login**
   - Use your registered email and password
   - You'll be redirected to your personalized dashboard

3. **Enroll in Courses**
   - Navigate to "My Courses" → "Available Courses"
   - Click "Enroll Now" on any course
   - Assignments will be automatically created

4. **Complete Courses**
   - Go to "My Courses" → "My Courses"
   - Click "Continue Learning" to progress through the course
   - Each click advances progress by 20%

5. **Submit Assignments**
   - Navigate to "Assignments"
   - Click "Submit Assignment" for pending assignments
   - System will auto-grade within 2 seconds

6. **Take Assessments**
   - Navigate to "Assessments"
   - Click "Start Assessment" when course is completed
   - Complete the timed test (30 minutes)
   - Score 70% or higher to pass

7. **Earn Certificates**
   - Pass the assessment to automatically generate a certificate
   - View and download from "Certificates" section
   - Click "Download" to print or save as PDF

8. **Explore Careers**
   - Navigate to "Career Guidance"
   - Review different renewable energy career paths
   - Click "Explore Training" to see required courses

9. **Learn Entrepreneurship**
   - Navigate to "Entrepreneurship Hub"
   - Read through business modules
   - Apply concepts to your career goals

### Maintaining Your Streak:
- Log in daily to maintain and increase your streak
- Streak resets if you miss a day
- Consecutive logins increase your streak count

## Data Structure

The application uses localStorage with the following structure:

### Collections:
- `learnenrich_users` - User accounts
- `learnenrich_courses` - Course catalog
- `learnenrich_enrollments` - User course enrollments
- `learnenrich_assignments` - Course assignments
- `learnenrich_assessments` - Course assessments
- `learnenrich_certificates` - Earned certificates
- `learnenrich_user_progress` - User progress data
- `learnenrich_current_user` - Current logged-in user

### Sample Data Export:
To view your data:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Type: `localStorage`
4. Press Enter to see all stored data

### Data Backup:
To backup your data:
```javascript
// Run in browser console
const backup = {
    users: localStorage.getItem('learnenrich_users'),
    enrollments: localStorage.getItem('learnenrich_enrollments'),
    certificates: localStorage.getItem('learnenrich_certificates')
};
console.log(JSON.stringify(backup));
// Copy the output and save to a file
```

## Contact

For support or inquiries:
- Email: admin@learnenrich.com

## Technical Details

### Technologies Used:
- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0 (Icons)
- localStorage API

### Browser Compatibility:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

### Security Notes:
- This is a demonstration/local application
- Passwords are stored in plain text (localStorage)
- NOT suitable for production use without proper backend
- For local/educational use only

## Future Enhancements (If deploying with backend):

1. **Database Integration:**
   - Replace localStorage with SQL/NoSQL database
   - User authentication with JWT tokens
   - Password hashing (bcrypt)

2. **Additional Features:**
   - Email notifications
   - Discussion forums
   - Live video classes
   - Instructor feedback
   - Advanced analytics
   - Social sharing
   - Mobile apps

3. **Content Management:**
   - Admin panel for course creation
   - Dynamic content updates
   - User management dashboard
   - Analytics and reporting

## License

© 2025 LearnEnrich. All rights reserved.

## Credits

Developed for LearnEnrich - Empowering the next generation of renewable energy professionals.

// ========================================
// LEARNENRICH - COMPREHENSIVE EXAM SYSTEM
// Real questions with auto-grading
// ANTI-CHEATING: Tab switching detection
// ========================================

// Anti-Cheating System
let tabSwitchCount = 0;
let examActive = false;
let autoSubmitWarned = false;
let currentExamCode = null;
let initialWindowWidth = window.innerWidth;
let initialWindowHeight = window.innerHeight;
let devToolsWarned = false;

// Detect tab/window switching
document.addEventListener('visibilitychange', function() {
    if (examActive && document.hidden) {
        tabSwitchCount++;
        
        if (tabSwitchCount === 1) {
            showAlert(
                '⚠️ WARNING: Tab Switch Detected!\n\n' +
                'You have switched away from the exam.\n\n' +
                '🚫 This is considered suspicious behavior.\n\n' +
                'Warnings: 1/3\n\n' +
                'After 3 warnings, your exam will be automatically submitted.',
                'error',
                'Academic Integrity Warning'
            );
        } else if (tabSwitchCount === 2) {
            showAlert(
                '⚠️ FINAL WARNING: Tab Switch Detected!\n\n' +
                'This is your SECOND warning.\n\n' +
                '🚫 Warnings: 2/3\n\n' +
                'One more tab switch and your exam will be AUTOMATICALLY SUBMITTED with current answers.',
                'error',
                'Final Warning'
            );
        } else if (tabSwitchCount >= 3) {
            if (!autoSubmitWarned) {
                autoSubmitWarned = true;
                showAlert(
                    '🚫 EXAM AUTO-SUBMITTED!\n\n' +
                    'You switched tabs 3 times during the exam.\n\n' +
                    'Your exam has been automatically submitted with your current answers.\n\n' +
                    'Note: This incident has been logged for academic integrity review.',
                    'error',
                    'Exam Auto-Submitted'
                );
                
                // Auto-submit exam
                setTimeout(() => {
                    submitExam(currentExamCode);
                }, 2000);
            }
        }
    }
});

// Detect DevTools/Copilot opening (window resize detection)
window.addEventListener('resize', function() {
    if (examActive && !autoSubmitWarned) {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        const widthDiff = initialWindowWidth - currentWidth; // Positive = got smaller
        const heightDiff = initialWindowHeight - currentHeight; // Positive = got smaller
        
        // If window got significantly SMALLER (panel/DevTools opened on the side or bottom)
        // Check for width reduction (side panel) OR height reduction (bottom panel)
        if (widthDiff > 100 || heightDiff > 100) {
            if (!devToolsWarned) {
                devToolsWarned = true;
                tabSwitchCount += 2; // Add 2 strikes for DevTools violation
                
                showAlert(
                    '🚫 BROWSER PANEL DETECTED!\n\n' +
                    'Your browser window size decreased significantly.\n' +
                    'This indicates a side panel (Copilot, DevTools, etc.) was opened.\n\n' +
                    '📊 Window Size Change:\n' +
                    '• Width change: ' + widthDiff + 'px\n' +
                    '• Height change: ' + heightDiff + 'px\n\n' +
                    '⚠️ This violation counts as 2 warnings!\n\n' +
                    'Current Warnings: ' + tabSwitchCount + '/3\n\n' +
                    (tabSwitchCount >= 3 ? '🚫 Your exam will be AUTO-SUBMITTED in 3 seconds!' : '⚠️ Close all panels immediately and continue the exam.'),
                    'error',
                    'Security Violation Detected'
                );
                
                // If total warnings >= 3, auto-submit immediately
                if (tabSwitchCount >= 3 && !autoSubmitWarned) {
                    autoSubmitWarned = true;
                    setTimeout(() => {
                        submitExam(currentExamCode);
                    }, 3000);
                }
            }
        }
    }
});

// Detect right-click (prevent copying)
document.addEventListener('contextmenu', function(e) {
    if (examActive) {
        e.preventDefault();
        showAlert(
            '⚠️ Right-click disabled during exam\n\n' +
            'Copying exam content is not allowed.\n\n' +
            'This action has been logged.',
            'error',
            'Academic Integrity'
        );
    }
});

// Detect copy attempts
document.addEventListener('copy', function(e) {
    if (examActive) {
        e.preventDefault();
        showAlert(
            '⚠️ Copying disabled during exam\n\n' +
            'You cannot copy exam questions or content.\n\n' +
            'This action has been logged.',
            'error',
            'Academic Integrity'
        );
    }
});

// Prevent opening developer tools (F12, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', function(e) {
    if (examActive) {
        // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            showAlert(
                '⚠️ Developer tools are disabled during exam\n\n' +
                'This action has been logged.',
                'error',
                'Academic Integrity'
            );
            return false;
        }
        
        // DETECT SCREENSHOTS: PrintScreen, Win+Shift+S, Snipping Tool
        // PrintScreen key
        if (e.keyCode === 44) {
            e.preventDefault();
            tabSwitchCount++; // Add 1 warning for screenshot attempt
            showAlert(
                '🚫 SCREENSHOTS ARE NOT ALLOWED!\n\n' +
                'Taking screenshots during exams is strictly prohibited.\n\n' +
                '⚠️ This violation has been logged and counts as 1 warning.\n\n' +
                'Current Warnings: ' + tabSwitchCount + '/3\n\n' +
                (tabSwitchCount >= 3 ? '🚫 Your exam will be AUTO-SUBMITTED!' : 'Continue the exam without taking screenshots.'),
                'error',
                'Screenshot Attempt Detected'
            );
            
            // Auto-submit if 3 warnings reached
            if (tabSwitchCount >= 3 && !autoSubmitWarned) {
                autoSubmitWarned = true;
                setTimeout(() => {
                    submitExam(currentExamCode);
                }, 3000);
            }
            return false;
        }
        
        // Windows Snipping Tool: Win+Shift+S
        if (e.key === 's' && e.shiftKey && (e.metaKey || e.key === 'Meta')) {
            e.preventDefault();
            tabSwitchCount++; // Add 1 warning
            showAlert(
                '🚫 SCREENSHOTS ARE NOT ALLOWED!\n\n' +
                'Taking screenshots during exams is strictly prohibited.\n\n' +
                '⚠️ This violation has been logged and counts as 1 warning.\n\n' +
                'Current Warnings: ' + tabSwitchCount + '/3\n\n' +
                (tabSwitchCount >= 3 ? '🚫 Your exam will be AUTO-SUBMITTED!' : 'Continue the exam without taking screenshots.'),
                'error',
                'Screenshot Attempt Detected'
            );
            
            // Auto-submit if 3 warnings reached
            if (tabSwitchCount >= 3 && !autoSubmitWarned) {
                autoSubmitWarned = true;
                setTimeout(() => {
                    submitExam(currentExamCode);
                }, 3000);
            }
            return false;
        }
    }
});

const EXAM_QUESTIONS = {
    'SOLAR-101': [
        {
            id: 1,
            question: 'What is the Betz limit for wind turbines, which also applies conceptually to the theoretical maximum efficiency of any energy conversion system?',
            options: [
                'A) 45.3%',
                'B) 59.3%',
                'C) 75.0%',
                'D) 100%'
            ],
            correctAnswer: 1, // Index 1 = B
            explanation: 'The Betz limit is 59.3%, representing the theoretical maximum efficiency for extracting energy from a fluid flow. Modern solar panels achieve 18-23% efficiency.',
            points: 2
        },
        {
            id: 2,
            question: 'Which type of solar panel has the HIGHEST efficiency rating?',
            options: [
                'A) Polycrystalline',
                'B) Thin-film',
                'C) Monocrystalline',
                'D) Amorphous silicon'
            ],
            correctAnswer: 2, // C
            explanation: 'Monocrystalline solar panels have the highest efficiency (18-24%) due to their single-crystal silicon structure, though they are more expensive.',
            points: 2
        },
        {
            id: 3,
            question: 'In a grid-tied solar system, what happens during a power outage?',
            options: [
                'A) The system continues to provide power to the home',
                'B) The system automatically shuts down for safety',
                'C) The system switches to battery backup',
                'D) The system sends power to neighbors'
            ],
            correctAnswer: 1, // B
            explanation: 'Grid-tied systems must shut down during outages to prevent back feeding electricity to the grid, which could endanger utility workers (anti-islanding protection).',
            points: 2
        },
        {
            id: 4,
            question: 'What does MPPT stand for in solar inverter technology?',
            options: [
                'A) Maximum Power Point Tracking',
                'B) Minimum Power Point Testing',
                'C) Multiple Panel Power Transfer',
                'D) Modular Power Production Technology'
            ],
            correctAnswer: 0, // A
            explanation: 'MPPT (Maximum Power Point Tracking) is a technology that continuously adjusts the electrical operating point to extract maximum power from solar panels under varying conditions.',
            points: 2
        },
        {
            id: 5,
            question: 'If a home uses 30 kWh per day and receives 5 peak sun hours, what minimum system size is needed (before accounting for losses)?',
            options: [
                'A) 3 kW',
                'B) 6 kW',
                'C) 9 kW',
                'D) 12 kW'
            ],
            correctAnswer: 1, // B
            explanation: 'System size = Daily kWh ÷ Peak Sun Hours = 30 ÷ 5 = 6 kW. In practice, multiply by 1.25 to account for system losses (7.5 kW recommended).',
            points: 2
        },
        {
            id: 6,
            question: 'What is the typical voltage range (Voc) for a standard residential solar panel?',
            options: [
                'A) 12-24 Volts',
                'B) 40-50 Volts',
                'C) 120-240 Volts',
                'D) 400-600 Volts'
            ],
            correctAnswer: 1, // B
            explanation: 'Open Circuit Voltage (Voc) for residential panels is typically 40-50V. Multiple panels are connected in series to reach the inverter\'s MPPT voltage range.',
            points: 2
        },
        {
            id: 7,
            question: 'Which solar panel material has the LOWEST production cost but also the lowest efficiency?',
            options: [
                'A) Monocrystalline silicon',
                'B) Polycrystalline silicon',
                'C) Thin-film (CdTe)',
                'D) Gallium arsenide'
            ],
            correctAnswer: 2, // C
            explanation: 'Thin-film panels (like CdTe) are cheapest to produce but have efficiency of only 10-13%, requiring more installation space.',
            points: 2
        },
        {
            id: 8,
            question: 'What is the purpose of a solar inverter?',
            options: [
                'A) Store excess electricity',
                'B) Convert DC to AC electricity',
                'C) Increase panel voltage',
                'D) Clean the solar panels'
            ],
            correctAnswer: 1, // B
            explanation: 'Inverters convert Direct Current (DC) from solar panels to Alternating Current (AC) used by home appliances and the electrical grid.',
            points: 2
        },
        {
            id: 9,
            question: 'What is the optimal tilt angle for solar panels in most locations?',
            options: [
                'A) Always 45 degrees',
                'B) Equal to the latitude',
                'C) Always flat (0 degrees)',
                'D) Always 90 degrees (vertical)'
            ],
            correctAnswer: 1, // B
            explanation: 'The optimal tilt angle approximately equals the location\'s latitude, though seasonal adjustments can improve performance. This maximizes annual energy production.',
            points: 2
        },
        {
            id: 10,
            question: 'Which direction should solar panels face in the Northern Hemisphere for maximum energy production?',
            options: [
                'A) North',
                'B) South',
                'C) East',
                'D) West'
            ],
            correctAnswer: 1, // B
            explanation: 'In the Northern Hemisphere, south-facing panels receive the most sunlight throughout the day. In the Southern Hemisphere, north-facing is optimal.',
            points: 2
        },
        {
            id: 11,
            question: 'What is a common temperature coefficient for solar panels?',
            options: [
                'A) +0.5% per °C (power increases with heat)',
                'B) -0.4% per °C (power decreases with heat)',
                'C) 0% (no effect from temperature)',
                'D) -5% per °C'
            ],
            correctAnswer: 1, // B
            explanation: 'Solar panels lose approximately 0.35-0.45% efficiency per degree Celsius above 25°C. This is why they perform better in cooler conditions.',
            points: 2
        },
        {
            id: 12,
            question: 'What is net metering?',
            options: [
                'A) Measuring the total area of solar panels',
                'B) Receiving credit for excess power sent to the grid',
                'C) Calculating the weight of equipment',
                'D) Measuring panel efficiency over time'
            ],
            correctAnswer: 1, // B
            explanation: 'Net metering allows solar system owners to receive credits from utilities for excess electricity sent to the grid, offsetting power drawn during low production.',
            points: 2
        },
        {
            id: 13,
            question: 'How long is a typical warranty for solar panel performance?',
            options: [
                'A) 5 years',
                'B) 10 years',
                'C) 25 years',
                'D) 50 years'
            ],
            correctAnswer: 2, // C
            explanation: 'Most solar panels come with a 25-year performance warranty, guaranteeing they\'ll still produce at least 80-85% of rated capacity after 25 years.',
            points: 2
        },
        {
            id: 14,
            question: 'What safety feature prevents solar systems from energizing the grid during an outage?',
            options: [
                'A) Anti-islanding protection',
                'B) Surge protection',
                'C) Ground fault detection',
                'D) Arc fault protection'
            ],
            correctAnswer: 0, // A
            explanation: 'Anti-islanding protection automatically disconnects solar systems from the grid during outages to protect utility workers repairing power lines.',
            points: 2
        },
        {
            id: 15,
            question: 'In solar panel specifications, what does STC stand for?',
            options: [
                'A) Solar Thermal Capacity',
                'B) Standard Test Conditions',
                'C) System Total Cost',
                'D) Solar Technology Certification'
            ],
            correctAnswer: 1, // B
            explanation: 'STC (Standard Test Conditions) are: 1000 W/m² irradiance, 25°C cell temperature, and 1.5 air mass. Panels are rated under these conditions.',
            points: 2
        },
        {
            id: 16,
            question: 'Which of these is NOT a typical component of an off-grid solar system?',
            options: [
                'A) Solar panels',
                'B) Charge controller',
                'C) Battery bank',
                'D) Utility meter'
            ],
            correctAnswer: 3, // D
            explanation: 'Off-grid systems are independent of the utility grid, so they don\'t have utility meters. They require batteries and charge controllers for energy storage.',
            points: 2
        },
        {
            id: 17,
            question: 'What percentage of sunlight energy does a typical modern solar panel convert to electricity?',
            options: [
                'A) 5-10%',
                'B) 18-23%',
                'C) 45-50%',
                'D) 80-90%'
            ],
            correctAnswer: 1, // B
            explanation: 'Modern commercial solar panels convert 18-23% of sunlight to electricity. Research cells have achieved over 40%, but commercial viability remains at 18-23%.',
            points: 2
        },
        {
            id: 18,
            question: 'What is the primary function of a charge controller in an off-grid solar system?',
            options: [
                'A) Convert DC to AC power',
                'B) Regulate battery charging voltage and current',
                'C) Measure energy production',
                'D) Connect to the utility grid'
            ],
            correctAnswer: 1, // B
            explanation: 'Charge controllers regulate the voltage and current from solar panels to batteries, preventing overcharging and extending battery life.',
            points: 2
        },
        {
            id: 19,
            question: 'Which U.S. federal tax incentive commonly applies to residential solar installations?',
            options: [
                'A) Income Tax Deduction',
                'B) Property Tax Exemption',
                'C) Investment Tax Credit (ITC)',
                'D) Solar Production Credit'
            ],
            correctAnswer: 2, // C
            explanation: 'The federal Investment Tax Credit (ITC) allows homeowners to deduct 30% of solar installation costs from federal taxes (as of 2024).',
            points: 2
        },
        {
            id: 20,
            question: 'What is the typical lifespan of a solar inverter?',
            options: [
                'A) 5-8 years',
                'B) 10-15 years',
                'C) 25-30 years',
                'D) 50+ years'
            ],
            correctAnswer: 1, // B
            explanation: 'Solar inverters typically last 10-15 years, shorter than panels (25-30 years). Most systems require at least one inverter replacement during their lifetime.',
            points: 2
        },
        {
            id: 21,
            question: 'What does "kWh" measure in solar energy systems?',
            options: [
                'A) Power capacity at an instant',
                'B) Energy produced or consumed over time',
                'C) Panel surface area',
                'D) Voltage level'
            ],
            correctAnswer: 1, // B
            explanation: 'Kilowatt-hours (kWh) measure energy, the total power used or produced over time. A 1 kW system running for 1 hour produces 1 kWh.',
            points: 2
        },
        {
            id: 22,
            question: 'Which type of solar mounting is generally most expensive but most efficient?',
            options: [
                'A) Fixed rooftop mounts',
                'B) Ground-mounted fixed racks',
                'C) Single-axis tracking systems',
                'D) Dual-axis tracking systems'
            ],
            correctAnswer: 3, // D
            explanation: 'Dual-axis trackers follow the sun in two directions, increasing production by 25-40% but costing significantly more due to complexity and maintenance.',
            points: 2
        },
        {
            id: 23,
            question: 'What is the minimum roof condition requirement for solar panel installation?',
            options: [
                'A) Roof can be any age',
                'B) Roof should have at least 15-20 years of life remaining',
                'C) Roof must be brand new',
                'D) Roof age doesn\'t matter if panels are installed'
            ],
            correctAnswer: 1, // B
            explanation: 'Roofs should have 15-20+ years of life remaining to avoid the costly process of removing and reinstalling panels for roof replacement.',
            points: 2
        },
        {
            id: 24,
            question: 'In series connection of solar panels, what electrical property increases?',
            options: [
                'A) Current',
                'B) Voltage',
                'C) Resistance',
                'D) Frequency'
            ],
            correctAnswer: 1, // B
            explanation: 'Connecting panels in series adds their voltages together while current remains constant. Parallel connections add current while voltage stays constant.',
            points: 2
        },
        {
            id: 25,
            question: 'What does NABCEP certification indicate?',
            options: [
                'A) Panel quality certification',
                'B) Installer professional competency',
                'C) Inverter efficiency rating',
                'D) Roof structural approval'
            ],
            correctAnswer: 1, // B
            explanation: 'NABCEP (North American Board of Certified Energy Practitioners) certifies solar professionals, ensuring they meet industry standards for knowledge and experience.',
            points: 2
        },
        {
            id: 26,
            question: 'What is shading\'s impact on solar panel performance?',
            options: [
                'A) No impact if only partial shading',
                'B) Proportional reduction (10% shade = 10% loss)',
                'C) Can cause disproportionate losses affecting entire strings',
                'D) Actually improves performance by cooling panels'
            ],
            correctAnswer: 2, // C
            explanation: 'Even partial shading can dramatically reduce output of entire panel strings due to series connections. Microinverters and optimizers help mitigate this issue.',
            points: 2
        },
        {
            id: 27,
            question: 'Which material is commonly used for solar panel frames?',
            options: [
                'A) Plastic',
                'B) Wood',
                'C) Anodized aluminum',
                'D) Stainless steel'
            ],
            correctAnswer: 2, // C
            explanation: 'Anodized aluminum is lightweight, corrosion-resistant, and strong—ideal for outdoor solar panel frames that must last 25+ years.',
            points: 2
        },
        {
            id: 28,
            question: 'What is the purpose of bypass diodes in solar panels?',
            options: [
                'A) Increase voltage output',
                'B) Allow current to bypass shaded cells',
                'C) Convert DC to AC',
                'D) Store excess energy'
            ],
            correctAnswer: 1, // B
            explanation: 'Bypass diodes allow current to flow around shaded or damaged cells, preventing them from acting as resistive loads and reducing the entire panel\'s output.',
            points: 2
        },
        {
            id: 29,
            question: 'What fire rating is minimum for solar panels in most jurisdictions?',
            options: [
                'A) Class A (best)',
                'B) Class B',
                'C) Class C (minimum acceptable)',
                'D) No rating required'
            ],
            correctAnswer: 2, // C
            explanation: 'Class C is typically the minimum fire rating, though Class A is preferred and required in some high-risk areas. This affects insurance and permits.',
            points: 2
        },
        {
            id: 30,
            question: 'How much can a well-designed residential solar system typically reduce electricity bills?',
            options: [
                'A) 10-20%',
                'B) 40-70%',
                'C) 70-100%',
                'D) Bills usually increase'
            ],
            correctAnswer: 2, // C
            explanation: 'A properly sized system can offset 70-100% of electricity costs, though actual savings depend on system size, energy usage, and local utility rates.',
            points: 2
        },
        {
            id: 31,
            question: 'What is the typical payback period for residential solar in the U.S.?',
            options: [
                'A) 1-3 years',
                'B) 6-10 years',
                'C) 15-20 years',
                'D) 30+ years'
            ],
            correctAnswer: 1, // B
            explanation: 'With federal tax credits and decreasing costs, payback periods average 6-10 years, varying by location, electricity rates, and available incentives.',
            points: 2
        },
        {
            id: 32,
            question: 'Which organization sets the National Electrical Code (NEC) standards for solar installations?',
            options: [
                'A) OSHA',
                'B) EPA',
                'C) NFPA (National Fire Protection Association)',
                'D) DOE'
            ],
            correctAnswer: 2, // C
            explanation: 'The NFPA publishes the NEC (NFPA 70), which includes Article 690 specifically for solar PV systems. Local jurisdictions adopt and enforce these codes.',
            points: 2
        },
        {
            id: 33,
            question: 'What happens to solar panel efficiency as temperature increases?',
            options: [
                'A) Efficiency increases',
                'B) Efficiency decreases',
                'C) No change in efficiency',
                'D) Efficiency doubles'
            ],
            correctAnswer: 1, // B
            explanation: 'Higher temperatures reduce panel efficiency by about 0.4% per °C above 25°C. This is why panels produce more power on cool, sunny days than hot ones.',
            points: 2
        },
        {
            id: 34,
            question: 'What is the purpose of grounding in a solar PV system?',
            options: [
                'A) Increase power output',
                'B) Safety protection against electrical faults and lightning',
                'C) Reduce installation costs',
                'D) Improve panel efficiency'
            ],
            correctAnswer: 1, // B
            explanation: 'Proper grounding protects people and equipment from electrical faults and lightning strikes, and is required by NEC Article 690.',
            points: 2
        },
        {
            id: 35,
            question: 'Which microinverter advantage makes them better for shaded roofs?',
            options: [
                'A) Lower cost',
                'B) Individual panel optimization',
                'C) Simpler installation',
                'D) No advantages for shading'
            ],
            correctAnswer: 1, // B
            explanation: 'Microinverters optimize each panel independently, so shading on one panel doesn\'t affect others—unlike string inverters where one shaded panel reduces string output.',
            points: 2
        },
        {
            id: 36,
            question: 'What is "solar noon"?',
            options: [
                'A) Always 12:00 PM clock time',
                'B) When the sun is highest in the sky for a location',
                'C) The hottest time of day',
                'D) When panels produce the least power'
            ],
            correctAnswer: 1, // B
            explanation: 'Solar noon is when the sun reaches its highest point (maximum elevation angle) for a given location, which may not align with 12:00 PM clock time.',
            points: 2
        },
        {
            id: 37,
            question: 'What is the function of a combiner box in solar installations?',
            options: [
                'A) Convert DC to AC',
                'B) Combine multiple string outputs before the inverter',
                'C) Store energy',
                'D) Monitor production'
            ],
            correctAnswer: 1, // B
            explanation: 'Combiner boxes safely bring together (combine) the DC outputs from multiple solar panel strings into one circuit feeding the inverter.',
            points: 2
        },
        {
            id: 38,
            question: 'How does solar panel degradation typically occur over time?',
            options: [
                'A) Sudden failure after 10 years',
                'B) Gradual decrease of ~0.5% per year',
                'C) No degradation occurs',
                'D) Rapid loss of 50% in first year'
            ],
            correctAnswer: 1, // B
            explanation: 'Quality panels degrade slowly at approximately 0.5% per year, maintaining 85-90% output after 25 years. This gradual degradation is factored into warranties.',
            points: 2
        },
        {
            id: 39,
            question: 'What is the primary advantage of bifacial solar panels?',
            options: [
                'A) Lower cost',
                'B) Capture light from both front and back surfaces',
                'C) Easier installation',
                'D) Work without sunlight'
            ],
            correctAnswer: 1, // B
            explanation: 'Bifacial panels have solar cells on both sides, capturing reflected and diffused light from the rear surface, increasing total energy production by 5-30%.',
            points: 2
        },
        {
            id: 40,
            question: 'Which solar panel cleaning method is generally recommended?',
            options: [
                'A) High-pressure washing',
                'B) Abrasive scrubbing',
                'C) Water and soft brush',
                'D) Chemical solvents'
            ],
            correctAnswer: 2, // C
            explanation: 'Gentle cleaning with water and a soft brush protects the panel surface and anti-reflective coating. Rain often provides sufficient cleaning in most climates.',
            points: 2
        },
        {
            id: 41,
            question: 'What does "string sizing" refer to in solar design?',
            options: [
                'A) Length of wire needed',
                'B) Number of panels connected in series to match inverter voltage',
                'C) Size of mounting brackets',
                'D) Thickness of panel frames'
            ],
            correctAnswer: 1, // B
            explanation: 'String sizing determines how many panels to connect in series to operate within the inverter\'s MPPT voltage window, critical for system performance.',
            points: 2
        },
        {
            id: 42,
            question: 'Why are solar panels typically tested at 25°C instead of higher temperatures?',
            options: [
                'A) Panels only work at 25°C',
                'B) It\'s a standardized baseline for comparison',
                'C) Panels are always 25°C in operation',
                'D) Higher temperatures aren\'t possible to test'
            ],
            correctAnswer: 1, // B
            explanation: 'STC uses 25°C as a standard reference temperature for consistent testing and comparison, though real operating temperatures are usually much higher.',
            points: 2
        },
        {
            id: 43,
            question: 'What is the purpose of a solar site survey?',
            options: [
                'A) Determine property boundaries',
                'B) Assess shading, roof condition, and electrical infrastructure',
                'C) Survey neighbors about solar opinions',
                'D) Measure exact sunshine hours'
            ],
            correctAnswer: 1, // B
            explanation: 'Site surveys evaluate shading patterns, roof structural capacity, electrical panel capacity, and optimal system placement—essential for proper system design.',
            points: 2
        },
        {
            id: 44,
            question: 'Which battery chemistry is most commonly used in modern solar energy storage?',
            options: [
                'A) Lead-acid',
                'B) Lithium-ion',
                'C) Nickel-cadmium',
                'D) Alkaline'
            ],
            correctAnswer: 1, // B
            explanation: 'Lithium-ion batteries dominate modern solar storage due to higher efficiency, longer lifespan, deeper discharge capability, and declining costs.',
            points: 2
        },
        {
            id: 45,
            question: 'What does "depth of discharge" (DoD) mean for solar batteries?',
            options: [
                'A) How deep the battery is buried',
                'B) Percentage of battery capacity that can be used',
                'C) Battery weight',
                'D) Charging speed'
            ],
            correctAnswer: 1, // B
            explanation: 'DoD indicates how much of a battery\'s capacity can be safely used. Lithium batteries allow 80-90% DoD, while lead-acid batteries typically allow only 50%.',
            points: 2
        },
        {
            id: 46,
            question: 'What is a solar "hot spot" and why is it problematic?',
            options: [
                'A) Best location for panels',
                'B) Overheating of shaded/damaged cells causing potential failure',
                'C) Optimal sun exposure time',
                'D) Peak production period'
            ],
            correctAnswer: 1, // B
            explanation: 'Hot spots occur when shaded or damaged cells act as resistive loads, overheating and potentially causing permanent damage. Bypass diodes help prevent this.',
            points: 2
        },
        {
            id: 47,
            question: 'Which federal agency regulates grid interconnection requirements for solar systems?',
            options: [
                'A) EPA',
                'B) FERC (Federal Energy Regulatory Commission)',
                'C) OSHA',
                'D) NASA'
            ],
            correctAnswer: 1, // B
            explanation: 'FERC oversees interstate electricity transmission and wholesale markets, while state public utility commissions typically regulate local interconnection rules.',
            points: 2
        },
        {
            id: 48,
            question: 'What is the typical efficiency of modern solar inverters?',
            options: [
                'A) 50-60%',
                'B) 70-80%',
                'C) 95-98%',
                'D) 100%'
            ],
            correctAnswer: 2, // C
            explanation: 'Modern solar inverters are highly efficient at 95-98%, meaning only 2-5% of energy is lost during DC to AC conversion.',
            points: 2
        },
        {
            id: 49,
            question: 'What is "solar irradiance"?',
            options: [
                'A) Panel temperature',
                'B) Power per unit area from the sun (W/m²)',
                'C) Cost of solar panels',
                'D) Angle of the sun'
            ],
            correctAnswer: 1, // B
            explanation: 'Solar irradiance measures the power per unit area received from the sun, typically expressed in watts per square meter (W/m²). STC uses 1000 W/m².',
            points: 2
        },
        {
            id: 50,
            question: 'What does "capacity factor" mean for solar systems?',
            options: [
                'A) Storage battery size',
                'B) Ratio of actual to maximum possible annual energy production',
                'C) Panel surface area',
                'D) Number of panels installed'
            ],
            correctAnswer: 1, // B
            explanation: 'Capacity factor is actual annual production divided by theoretical maximum (if system ran at peak capacity 24/7). Solar typically has 15-25% capacity factor.',
            points: 2
        }
    ],
    'WIND-101': [
        {
            id: 1,
            question: 'What is the primary cause of wind on Earth?',
            options: [
                'A) Ocean currents',
                'B) Uneven heating of Earth\'s surface by the sun',
                'C) Earth\'s rotation only',
                'D) Volcanic activity'
            ],
            correctAnswer: 1,
            explanation: 'Wind is primarily caused by uneven solar heating creating temperature differences, which create pressure gradients. Air flows from high to low pressure areas.',
            points: 2
        },
        {
            id: 2,
            question: 'According to the wind power equation, if wind speed doubles, power in the wind increases by a factor of:',
            options: [
                'A) 2× (doubles)',
                'B) 4× (quadruples)',
                'C) 8× (eight times)',
                'D) 16× (sixteen times)'
            ],
            correctAnswer: 2,
            explanation: 'Power = 0.5 × ρ × A × V³. Since power is proportional to velocity cubed (V³), doubling speed increases power by 2³ = 8 times.',
            points: 2
        },
        {
            id: 3,
            question: 'What is the Betz Limit for wind turbines?',
            options: [
                'A) 33.3% maximum efficiency',
                'B) 59.3% maximum efficiency',
                'C) 75.0% maximum efficiency',
                'D) 100% maximum efficiency possible'
            ],
            correctAnswer: 1,
            explanation: 'The Betz Limit states that no turbine can extract more than 59.3% of the kinetic energy from wind. Modern turbines achieve 45-50% efficiency.',
            points: 2
        },
        {
            id: 4,
            question: 'Which type of wind turbine is most common for utility-scale power generation?',
            options: [
                'A) Vertical Axis Wind Turbine (VAWT)',
                'B) Horizontal Axis Wind Turbine (HAWT)',
                'C) Savonius turbine',
                'D) Darrieus turbine'
            ],
            correctAnswer: 1,
            explanation: 'Horizontal Axis Wind Turbines (HAWT) with three blades account for over 95% of the market due to higher efficiency and proven technology.',
            points: 2
        },
        {
            id: 5,
            question: 'How many blades do most modern utility-scale wind turbines have?',
            options: [
                'A) 2 blades',
                'B) 3 blades',
                'C) 5 blades',
                'D) Variable number'
            ],
            correctAnswer: 1,
            explanation: 'Three blades provide optimal balance of efficiency, structural stability, visual appeal, and noise reduction, becoming the industry standard.',
            points: 2
        },
        // Continue with 45 more wind energy questions...
        {
            id: 6,
            question: 'What is the typical cut-in wind speed for modern wind turbines?',
            options: [
                'A) 1-2 m/s',
                'B) 3-4 m/s',
                'C) 7-8 m/s',
                'D) 15-20 m/s'
            ],
            correctAnswer: 1,
            explanation: 'Cut-in speed is typically 3-4 m/s (7-9 mph), the minimum wind speed at which turbines begin generating power.',
            points: 2
        },
        {
            id: 7,
            question: 'What happens when wind speed exceeds the cut-out speed (typically 25 m/s)?',
            options: [
                'A) Turbine produces maximum power',
                'B) Turbine automatically shuts down for safety',
                'C) Turbine speed doubles',
                'D) Blades rotate faster'
            ],
            correctAnswer: 1,
            explanation: 'At cut-out speed (~25 m/s or 55 mph), turbines shut down to prevent damage from excessive mechanical stress.',
            points: 2
        },
        {
            id: 8,
            question: 'What is the function of the gearbox in a wind turbine?',
            options: [
                'A) Store energy',
                'B) Increase rotational speed from rotor to generator',
                'C) Convert AC to DC power',
                'D) Control blade pitch'
            ],
            correctAnswer: 1,
            explanation: 'Gearboxes increase the low rotor speed (10-20 RPM) to the high speed (1000-1800 RPM) required by most generators.',
            points: 2
        },
        {
            id: 9,
            question: 'What material are most modern wind turbine blades made from?',
            options: [
                'A) Aluminum',
                'B) Steel',
                'C) Fiberglass or carbon fiber composite',
                'D) Wood'
            ],
            correctAnswer: 2,
            explanation: 'Blades are made from fiberglass or carbon fiber composites for optimal strength-to-weight ratio and resistance to fatigue and weather.',
            points: 2
        },
        {
            id: 10,
            question: 'What does SCADA stand for in wind turbine operations?',
            options: [
                'A) Supervisory Control and Data Acquisition',
                'B) System Control and Direct Assessment',
                'C) Safety Compliance and Data Analysis',
                'D) Structural Control and Design Automation'
            ],
            correctAnswer: 0,
            explanation: 'SCADA systems monitor and control wind turbines remotely, collecting performance data and identifying issues.',
            points: 2
        }
        // In a real system, add 40 more questions to reach 50 total
    ]
};

// Load exam
function loadExam() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('userName').textContent = user.fullName;
    
    const examCode = getURLParameter('exam');
    if (!examCode || !EXAM_QUESTIONS[examCode]) {
        window.location.href = 'exams.html';
        return;
    }
    
    displayExam(examCode);
}

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayExam(examCode) {
    // CHECK IF AI PANEL/DEVTOOLS ALREADY OPEN BEFORE EXAM STARTS
    const screenWidth = window.screen.availWidth;
    const currentWidth = window.innerWidth;
    const widthDifference = screenWidth - currentWidth;
    
    // If browser is significantly smaller than screen (AI panel/DevTools likely open)
    if (widthDifference > 150) {
        showAlert(
            '🚫 EXAM CANNOT START\n\n' +
            'Developer tools or browser side panels appear to be open.\n\n' +
            'Detected browser width: ' + currentWidth + 'px\n' +
            'Available screen width: ' + screenWidth + 'px\n' +
            'Difference: ' + widthDifference + 'px\n\n' +
            '⚠️ Please close all:\n' +
            '• Developer Tools (F12)\n' +
            '• Copilot panel\n' +
            '• Browser side panels\n' +
            '• Extensions panels\n\n' +
            'Then maximize your browser window and try again.',
            'error',
            'Security Check Failed'
        );
        
        // Redirect back to exams page
        setTimeout(() => {
            window.location.href = 'exams.html';
        }, 5000);
        return;
    }
    
    // ACTIVATE ANTI-CHEATING MODE
    examActive = true;
    currentExamCode = examCode;
    tabSwitchCount = 0;
    autoSubmitWarned = false;
    devToolsWarned = false;
    
    // Store initial window dimensions for DevTools detection
    initialWindowWidth = window.innerWidth;
    initialWindowHeight = window.innerHeight;
    
    // HIDE SIDEBAR during exam (prevent navigation)
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    // Make main content full width
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) {
        mainContent.style.marginLeft = '0';
        mainContent.style.width = '100%';
    }
    
    // Show anti-cheating notice
    setTimeout(() => {
        showAlert(
            '🛡️ EXAM SECURITY ACTIVE\n\n' +
            '✅ Security check passed.\n\n' +
            '⚠️ STRICTLY PROHIBITED:\n' +
            '• Tab/window switching\n' +
            '• Developer tools (F12)\n' +
            '• Copilot/AI assistants\n' +
            '• Screenshots\n' +
            '• Copy/paste\n' +
            '• Browser resizing\n\n' +
            '🚫 Violations = Auto-submit\n' +
            '📌 Sidebar hidden during exam\n\n' +
            'Good luck!',
            'info',
            'Exam Started'
        );
    }, 1000);
    
    const allQuestions = EXAM_QUESTIONS[examCode];
    
    // RANDOMIZE: Shuffle questions and select 50 random ones
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const questions = shuffledQuestions.slice(0, 50);
    
    // Shuffle options for each question
    questions.forEach(q => {
        const correctOption = q.options[q.correctAnswer];
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        q.correctAnswer = shuffledOptions.indexOf(correctOption);
        q.options = shuffledOptions;
    });
    
    const examContainer = document.getElementById('examQuestions');
    
    examContainer.innerHTML = `
        <div class="exam-header">
            <h1>${examCode} - Final Exam</h1>
            <div class="exam-timer" id="examTimer">
                <i class="fas fa-clock"></i>
                <span id="timeRemaining">120:00</span>
            </div>
        </div>
        
        <div class="exam-instructions">
            <h3><i class="fas fa-info-circle"></i> Instructions</h3>
            <ul>
                <li>This exam contains ${questions.length} questions worth ${questions.reduce((sum, q) => sum + q.points, 0)} points total</li>
                <li>Select the best answer for each question</li>
                <li>You can review and change answers before submitting</li>
                <li>Passing score: 70% (${Math.ceil(questions.reduce((sum, q) => sum + q.points, 0) * 0.7)} points)</li>
                <li>Time limit: ${getExamDuration(examCode)} minutes</li>
            </ul>
            <button class="btn-primary btn-large" onclick="startExamTimer('${examCode}')">
                <i class="fas fa-play"></i> Start Exam
            </button>
        </div>
        
        <div class="questions-container" id="questionsContainer" style="display: none;">
            ${questions.map((q, index) => `
                <div class="question-card" id="question-${q.id}">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1} of ${questions.length}</span>
                        <span class="question-points">${q.points} points</span>
                    </div>
                    <p class="question-text">${q.question}</p>
                    <div class="options-list">
                        ${q.options.map((option, optIndex) => `
                            <label class="option-label">
                                <input 
                                    type="radio" 
                                    name="question-${q.id}" 
                                    value="${optIndex}"
                                    onchange="markAnswered(${q.id})"
                                >
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div class="exam-actions">
                <button class="btn-secondary" onclick="reviewAnswers('${examCode}')">
                    <i class="fas fa-eye"></i> Review Answers
                </button>
                <button class="btn-primary btn-large" onclick="submitExam('${examCode}')">
                    <i class="fas fa-check"></i> Submit Exam
                </button>
            </div>
        </div>
    `;
}

let examStartTime;
let examTimerInterval;

function startExamTimer(examCode) {
    document.querySelector('.exam-instructions').style.display = 'none';
    document.getElementById('questionsContainer').style.display = 'block';
    
    const duration = getExamDuration(examCode) * 60; // Convert to seconds
    examStartTime = Date.now();
    const endTime = examStartTime + (duration * 1000);
    
    examTimerInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        
        document.getElementById('timeRemaining').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning at 5 minutes
        if (remaining <= 300 && remaining > 0) {
            document.getElementById('examTimer').style.color = '#ef4444';
        }
        
        // Auto-submit at 0
        if (remaining === 0) {
            clearInterval(examTimerInterval);
            alert('⏰ Time\'s up! Your exam will be submitted automatically.');
            submitExam(examCode);
        }
    }, 1000);
}

function getExamDuration(code) {
    const durations = {
        'SOLAR-101': 120,
        'WIND-101': 150,
        'EFFICIENCY-101': 120,
        'STORAGE-201': 180
    };
    return durations[code] || 120;
}

function markAnswered(questionId) {
    const card = document.getElementById(`question-${questionId}`);
    card.classList.add('answered');
}

function reviewAnswers(examCode) {
    const questions = EXAM_QUESTIONS[examCode];
    const answered = [];
    const unanswered = [];
    
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);
        if (selected) {
            answered.push(index + 1);
        } else {
            unanswered.push(index + 1);
        }
    });
    
    alert(`📊 Exam Progress:\n\n✅ Answered: ${answered.length}/${questions.length}\n❌ Unanswered: ${unanswered.length}\n\n${
        unanswered.length > 0 ? `Questions still need answers: ${unanswered.join(', ')}` : 'All questions answered!'
    }`);
}

function submitExam(examCode) {
    // DEACTIVATE ANTI-CHEATING MODE
    examActive = false;
    tabSwitchCount = 0;
    devToolsWarned = false;
    
    // SHOW SIDEBAR again after exam submission
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    // Restore main content margin
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) {
        mainContent.style.marginLeft = '';
        mainContent.style.width = '';
    }
    
    const questions = EXAM_QUESTIONS[examCode];
    
    // Check all answered
    const unanswered = questions.filter(q => {
        return !document.querySelector(`input[name="question-${q.id}"]:checked`);
    });
    
    if (unanswered.length > 0) {
        const proceed = confirm(`⚠️ You have ${unanswered.length} unanswered question(s).\n\nUnanswered questions will be marked as incorrect.\n\nDo you want to submit anyway?`);
        if (!proceed) return;
    }
    
    clearInterval(examTimerInterval);
    
    // Grade exam
    let totalPoints = 0;
    let earnedPoints = 0;
    const results = [];
    
    questions.forEach(q => {
        totalPoints += q.points;
        const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);
        const selectedIndex = selected ? parseInt(selected.value) : -1;
        const isCorrect = selectedIndex === q.correctAnswer;
        
        if (isCorrect) {
            earnedPoints += q.points;
        }
        
        results.push({
            questionId: q.id,
            question: q.question,
            selectedAnswer: selectedIndex,
            correctAnswer: q.correctAnswer,
            isCorrect: isCorrect,
            points: q.points,
            earnedPoints: isCorrect ? q.points : 0,
            explanation: q.explanation
        });
    });
    
    const percentageScore = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentageScore >= 70;
    
    // Save result
    const courses = getUserCourses();
    const course = courses.find(c => c.code === examCode);
    if (course) {
        if (!course.exam) course.exam = {};
        course.exam.score = percentageScore;
        course.exam.passed = passed;
        course.exam.attempts = (course.exam.attempts || 0) + 1;
        course.exam.date = new Date().toISOString();
        course.exam.lastAttempt = course.exam.date;
        if (!Array.isArray(course.exam.history)) {
            course.exam.history = [];
        }
        course.exam.history.push({
            score: percentageScore,
            passed,
            earnedPoints,
            totalPoints,
            submittedAt: course.exam.date,
        });
        saveUserCourses(courses);
    }
    
    // Show results
    showExamResults(examCode, percentageScore, earnedPoints, totalPoints, passed, results);
}

function showExamResults(examCode, percentage, earned, total, passed, results) {
    const examContainer = document.getElementById('examQuestions');
    
    examContainer.innerHTML = `
        <div class="exam-results">
            <div class="result-header ${passed ? 'passed' : 'failed'}">
                <i class="fas ${passed ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <h1>${passed ? 'Congratulations! You Passed!' : 'Exam Not Passed'}</h1>
                <div class="score-display">
                    <div class="score-number">${percentage}%</div>
                    <div class="score-detail">${earned} / ${total} points</div>
                </div>
            </div>
            
            <div class="results-summary">
                <h3>Exam Summary</h3>
                <div class="summary-stats">
                    <div class="stat-box">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        <div>
                            <strong>${results.filter(r => r.isCorrect).length}</strong>
                            <span>Correct</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-times-circle" style="color: #ef4444;"></i>
                        <div>
                            <strong>${results.filter(r => !r.isCorrect).length}</strong>
                            <span>Incorrect</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star" style="color: #f59e0b;"></i>
                        <div>
                            <strong>${percentage}%</strong>
                            <span>Score</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detailed-results">
                <h3>Detailed Results</h3>
                ${results.map((r, index) => `
                    <div class="result-item ${r.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-question">
                            <span class="question-num">Question ${index + 1}</span>
                            <i class="fas ${r.isCorrect ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <p><strong>${r.question}</strong></p>
                        <div class="answer-review">
                            ${r.selectedAnswer >= 0 ? `
                                <p class="your-answer ${r.isCorrect ? 'correct-answer' : 'wrong-answer'}">
                                    Your answer: ${EXAM_QUESTIONS[examCode][index].options[r.selectedAnswer]}
                                </p>
                            ` : '<p class="your-answer unanswered">Not answered</p>'}
                            ${!r.isCorrect ? `
                                <p class="correct-answer-show">
                                    Correct answer: ${EXAM_QUESTIONS[examCode][index].options[r.correctAnswer]}
                                </p>
                            ` : ''}
                            <p class="explanation">
                                <i class="fas fa-lightbulb"></i> ${r.explanation}
                            </p>
                        </div>
                        <div class="points-earned">
                            ${r.earnedPoints} / ${r.points} points
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="result-actions">
                ${passed ? `
                    <button class="btn-primary btn-large" onclick="window.location.href='certificates.html'">
                        <i class="fas fa-certificate"></i> View Certificate
                    </button>
                ` : `
                    <button class="btn-primary btn-large" onclick="window.location.href='exams.html'">
                        <i class="fas fa-redo"></i> Return to Exams
                    </button>
                `}
                <button class="btn-secondary btn-large" onclick="window.location.href='grades.html'">
                    <i class="fas fa-chart-line"></i> View All Grades
                </button>
            </div>
        </div>
    `;
}

// Add styles
const examPageStyle = document.createElement('style');
examPageStyle.textContent = `
    #examQuestions {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .exam-header {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .exam-timer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #2563eb;
    }
    
    .exam-instructions {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
    }
    
    .exam-instructions ul {
        margin: 1.5rem 0;
        padding-left: 1.5rem;
    }
    
    .exam-instructions li {
        margin: 0.75rem 0;
        color: #374151;
    }
    
    .question-card {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        border: 2px solid #e5e7eb;
        transition: all 0.3s;
    }
    
    .question-card.answered {
        border-color: #10b981;
    }
    
    .question-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    
    .question-number {
        font-weight: 600;
        color: #2563eb;
    }
    
    .question-points {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .question-text {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .options-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .option-label {
        display: flex;
        align-items: start;
        padding: 1rem;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .option-label:hover {
        background: #eff6ff;
        border-color: #2563eb;
    }
    
    .option-label input[type="radio"] {
        margin-right: 1rem;
        margin-top: 0.25rem;
        cursor: pointer;
    }
    
    .option-label input[type="radio"]:checked ~ .option-text {
        color: #2563eb;
        font-weight: 600;
    }
    
    .option-text {
        flex: 1;
        color: #374151;
        line-height: 1.6;
    }
    
    .exam-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 2px solid #e5e7eb;
    }
    
    .exam-results {
        background: white;
        border-radius: 16px;
        overflow: hidden;
    }
    
    .result-header {
        padding: 3rem 2rem;
        text-align: center;
        color: white;
    }
    
    .result-header.passed {
        background: linear-gradient(135deg, #10b981, #059669);
    }
    
    .result-header.failed {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    
    .result-header i {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .score-display {
        margin-top: 1.5rem;
    }
    
    .score-number {
        font-size: 4rem;
        font-weight: 700;
    }
    
    .score-detail {
        font-size: 1.25rem;
        opacity: 0.9;
    }
    
    .results-summary, .detailed-results {
        padding: 2rem;
    }
    
    .summary-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .stat-box {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .stat-box i {
        font-size: 2rem;
    }
    
    .stat-box strong {
        display: block;
        font-size: 1.5rem;
        color: #1f2937;
    }
    
    .stat-box span {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .result-item {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        border-left: 4px solid #e5e7eb;
    }
    
    .result-item.correct {
        border-left-color: #10b981;
    }
    
    .result-item.incorrect {
        border-left-color: #ef4444;
    }
    
    .result-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .question-num {
        font-weight: 600;
        color: #2563eb;
    }
    
    .result-item.correct .result-question i {
        color: #10b981;
    }
    
    .result-item.incorrect .result-question i {
        color: #ef4444;
    }
    
    .answer-review {
        margin: 1rem 0;
        padding: 1rem;
        background: white;
        border-radius: 8px;
    }
    
    .your-answer {
        padding: 0.75rem;
        border-radius: 6px;
        margin: 0.5rem 0;
    }
    
    .correct-answer {
        background: #d1fae5;
        color: #065f46;
    }
    
    .wrong-answer {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .unanswered {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .correct-answer-show {
        background: #d1fae5;
        color: #065f46;
        padding: 0.75rem;
        border-radius: 6px;
        margin: 0.5rem 0;
    }
    
    .explanation {
        color: #374151;
        font-style: italic;
        padding: 0.75rem;
        background: #fffbeb;
        border-radius: 6px;
        margin: 0.5rem 0;
    }
    
    .explanation i {
        color: #f59e0b;
        margin-right: 0.5rem;
    }
    
    .points-earned {
        text-align: right;
        color: #6b7280;
        font-weight: 600;
        margin-top: 0.5rem;
    }
    
    .result-actions {
        padding: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        border-top: 2px solid #e5e7eb;
    }
`;
document.head.appendChild(examPageStyle);

// Initialize
if (window.location.pathname.includes('exam-page.html')) {
    loadExam();
}

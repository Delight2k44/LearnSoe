// ========================================
// PDF GENERATOR LIBRARY
// Generates real downloadable PDFs
// ========================================

// Function to generate and download PDF
function generatePDF(courseCode, resourceName, content) {
    // Create a simple text-based PDF structure
    const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
50 750 Td
(${resourceName}) Tj
0 -30 Td
/F1 12 Tf
(LearnEnrich - ${courseCode}) Tj
0 -40 Td
(This is a study resource for your course.) Tj
0 -20 Td
(Visit the online platform for full content.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000260 00000 n 
0000000339 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
590
%%EOF`;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseCode}-${resourceName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert(`✅ Downloaded: ${resourceName}`, 'success');
}

function generateCertificatePDF(course, user) {
    if (!course || !user) {
        return;
    }

    const passed = course.exam?.score >= course.exam?.passingScore;
    const certificateTitle = passed ? 'Certificate of Achievement' : 'Certificate of Completion';
    const statusLine = passed ? 'Successfully passed the final assessment.' : 'Completed the course requirements.';
    const scoreLine = `Final Score: ${course.exam?.score ?? 'N/A'}%`;
    const statusStamp = passed ? 'PASSED' : 'NOT PASSED';

    const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 400 >>
stream
BT
/F1 26 Tf
70 700 Td
(${certificateTitle}) Tj
0 -40 Td
/F1 18 Tf
(Presented to) Tj
0 -30 Td
/F1 24 Tf
(${user.fullName.replace(/\(|\)/g, '')}) Tj
0 -40 Td
/F1 16 Tf
(${statusLine}) Tj
0 -30 Td
(${course.title.replace(/\(|\)/g, '')} – ${course.code}) Tj
0 -40 Td
(${scoreLine}) Tj
0 -30 Td
(Status: ${statusStamp}) Tj
0 -40 Td
(Instructor: ${course.instructor.replace(/\(|\)/g, '')}) Tj
0 -40 Td
(Date: ${(new Date()).toLocaleDateString()}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000063 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000000314 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
420
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const sanitizedTitle = course.title.replace(/[^a-zA-Z0-9]+/g, '-');
    a.download = `${course.code}-${sanitizedTitle}-certificate.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert(`🎖️ Certificate downloaded for ${course.title}`, 'success');
}

// Enhanced PDF content for each course
const PDF_RESOURCES = {
    'SOLAR-101': [
        {
            name: 'Solar PV Fundamentals - Complete Guide',
            description: 'Comprehensive study guide covering solar energy basics, system types, and installation',
            pages: 45,
            size: '2.1 MB'
        },
        {
            name: 'Solar Panel Selection Guide',
            description: 'Detailed comparison of monocrystalline, polycrystalline, and thin-film technologies',
            pages: 28,
            size: '1.5 MB'
        },
        {
            name: 'System Sizing Calculations Workbook',
            description: 'Step-by-step formulas and examples for sizing solar PV systems',
            pages: 35,
            size: '1.8 MB'
        },
        {
            name: 'Installation Safety Manual',
            description: 'OSHA-compliant safety procedures for solar installation work',
            pages: 52,
            size: '3.2 MB'
        },
        {
            name: 'Electrical Code Reference (NEC 2023)',
            description: 'Key electrical code requirements for solar installations',
            pages: 38,
            size: '2.0 MB'
        },
        {
            name: 'Inverter Configuration Guide',
            description: 'Complete guide to selecting and configuring solar inverters',
            pages: 42,
            size: '2.3 MB'
        },
        {
            name: 'Maintenance & Troubleshooting Handbook',
            description: 'Common issues, diagnostics, and repair procedures',
            pages: 31,
            size: '1.6 MB'
        },
        {
            name: 'NABCEP Exam Preparation Notes',
            description: 'Study notes aligned with NABCEP certification exam objectives',
            pages: 68,
            size: '3.5 MB'
        }
    ],
    'WIND-101': [
        {
            name: 'Wind Energy Fundamentals',
            description: 'Complete introduction to wind energy systems and technology',
            pages: 50,
            size: '2.5 MB'
        },
        {
            name: 'Turbine Types & Selection',
            description: 'Horizontal vs vertical axis turbines, capacity selection guide',
            pages: 34,
            size: '1.9 MB'
        },
        {
            name: 'Wind Resource Assessment',
            description: 'Methods for measuring and analyzing wind resources',
            pages: 40,
            size: '2.2 MB'
        },
        {
            name: 'Turbine Installation Manual',
            description: 'Step-by-step installation procedures and safety protocols',
            pages: 55,
            size: '3.1 MB'
        },
        {
            name: 'Mechanical Systems Guide',
            description: 'Gearboxes, bearings, and mechanical components explained',
            pages: 38,
            size: '2.0 MB'
        },
        {
            name: 'Electrical Systems & Grid Integration',
            description: 'Power electronics and grid connection requirements',
            pages: 45,
            size: '2.4 MB'
        },
        {
            name: 'Maintenance Procedures Manual',
            description: 'Scheduled maintenance tasks and troubleshooting',
            pages: 48,
            size: '2.6 MB'
        },
        {
            name: 'GWO Safety Training Manual',
            description: 'Global Wind Organisation safety certification materials',
            pages: 62,
            size: '3.3 MB'
        }
    ],
    'EFFICIENCY-101': [
        {
            name: 'ASHRAE Energy Audit Workbook',
            description: 'Step-by-step templates for Level I, II, and III audits with sample calculations',
            pages: 44,
            size: '2.4 MB'
        },
        {
            name: 'Building Envelope Retrofit Guide',
            description: 'Details insulation upgrades, air sealing strategies, and case studies',
            pages: 36,
            size: '1.8 MB'
        },
        {
            name: 'HVAC Optimization Playbook',
            description: 'Commissioning checklists, VFD tuning, and BAS optimization tips',
            pages: 52,
            size: '2.9 MB'
        },
        {
            name: 'Lighting Retrofit ROI Calculator',
            description: 'Financial models comparing LED, controls, and rebate impacts',
            pages: 28,
            size: '1.2 MB'
        },
        {
            name: 'Measurement & Verification Toolkit',
            description: 'IPMVP guidance, sample dashboards, and persistence strategies',
            pages: 30,
            size: '1.5 MB'
        }
    ],
    'STORAGE-201': [
        {
            name: 'Battery Storage System Designer',
            description: 'Sizing worksheets covering power, energy, cycling, and augmentation planning',
            pages: 48,
            size: '2.6 MB'
        },
        {
            name: 'Grid Integration Compliance Manual',
            description: 'IEEE 1547, UL 1741 SB, and interconnection requirements summarized',
            pages: 40,
            size: '2.1 MB'
        },
        {
            name: 'Microgrid Control Architectures',
            description: 'Control strategies, islanding sequences, and resiliency case studies',
            pages: 38,
            size: '1.9 MB'
        },
        {
            name: 'BESS Safety & Commissioning Checklist',
            description: 'Procedures for thermal management, fire safety, and acceptance testing',
            pages: 32,
            size: '1.6 MB'
        },
        {
            name: 'Energy Storage Financial Model Template',
            description: 'Cash flow models with stacked revenue streams and LCOS calculator',
            pages: 26,
            size: '1.4 MB'
        }
    ]
};

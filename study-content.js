// ========================================
// STUDY NOTES & QUIZZES
// Different questions from exams
// ========================================

const STUDY_NOTES = {
    'SOLAR-101': {
        sections: [
            {
                title: 'Solar Energy Fundamentals',
                content: `
**What is Photovoltaic Effect?**
The photovoltaic effect is the creation of voltage and electric current in a material upon exposure to light. It was discovered by French physicist Edmund Becquerel in 1839 when he observed that certain materials would produce small amounts of electric current when exposed to light.

**Basic Principles:**
- Photons from sunlight carry energy
- When photons hit a solar cell, they transfer energy to electrons
- Energized electrons break free from atoms in the semiconductor
- The flow of free electrons creates an electric current
- Metal contacts collect and direct this current

**Key Components of Solar Cells:**
1. **N-type Silicon Layer** (negative) - Has extra electrons
2. **P-type Silicon Layer** (positive) - Has "holes" (missing electrons)
3. **P-N Junction** - The boundary where magic happens
4. **Metal Contacts** - Collect the current
5. **Anti-Reflective Coating** - Reduces light reflection

**Solar Panel Efficiency:**
- Monocrystalline: 18-22%
- Polycrystalline: 15-18%
- Thin-film: 10-12%
- Maximum theoretical efficiency (Shockley-Queisser limit): ~33%

**Factors Affecting Performance:**
- Temperature (higher = lower efficiency)
- Sunlight angle and intensity
- Shading (even partial shading significantly reduces output)
- Dust and debris
- Panel degradation (typically 0.5-1% per year)

<div class="content-images">
    <img src="800x600px diagram showing photovoltaic effect with photons hitting solar cell.png" alt="Photovoltaic Effect Diagram" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="800x600px cross-section of solar cell showing N-type and P-type layers.png" alt="Solar Cell Structure" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>
`,
                images: []
            },
            {
                title: 'System Design & Sizing',
                content: `
**Solar System Sizing Formula:**

**Step 1: Calculate Daily Energy Consumption**
- List all appliances and their wattage
- Multiply by hours used per day
- Example: 100W bulb × 5 hours = 500 Wh/day

**Step 2: Account for System Losses**
- Total Daily Load ÷ System Efficiency (typically 0.75-0.85)
- Example: 5000 Wh ÷ 0.8 = 6250 Wh needed

**Step 3: Calculate Panel Array Size**
- Required Wh ÷ Peak Sun Hours ÷ Panel Wattage
- Example: 6250 Wh ÷ 5 hours ÷ 300W = 4.2 panels → round to 5 panels

**Peak Sun Hours by Location:**
- Arizona: 6-7 hours
- California: 5-6 hours
- New York: 4-5 hours
- Seattle: 3-4 hours

**Battery Sizing (for off-grid):**
- Days of Autonomy × Daily Load ÷ Depth of Discharge ÷ Battery Voltage
- Example: 3 days × 5000 Wh ÷ 0.5 ÷ 48V = 625 Ah battery bank

**Inverter Sizing:**
- Sum of all loads that might run simultaneously
- Add 25% safety margin
- Example: 3000W loads × 1.25 = 3750W inverter minimum

**Wire Sizing Considerations:**
- Voltage drop should be < 3%
- Use appropriate AWG (American Wire Gauge)
- Longer runs require thicker wire
- Follow NEC Article 690
`
            },
            {
                title: 'Installation Best Practices',
                content: `
**Site Assessment Checklist:**
✓ Roof orientation (south-facing ideal in Northern Hemisphere)
✓ Roof pitch (30-40° optimal for most locations)
✓ Shading analysis (use Solar Pathfinder or similar tool)
✓ Structural capacity (150+ lbs per panel)
✓ Electrical panel capacity
✓ Local permits and HOA restrictions

**Installation Steps:**
1. **Structural Assessment**
   - Inspect roof condition
   - Locate rafters
   - Check load capacity

2. **Layout & Mounting**
   - Mark mounting locations
   - Install flashing (waterproofing)
   - Attach rails to roof
   - Secure mounting brackets

3. **Panel Installation**
   - Attach panels to rails
   - Use proper torque specifications
   - Install in landscape or portrait orientation
   - Ensure proper grounding

4. **Electrical Work**
   - String panels in series/parallel
   - Install junction boxes
   - Run conduit to inverter location
   - Connect to combiner box

5. **Inverter Installation**
   - Mount in shaded, ventilated area
   - Connect DC input from panels
   - Connect AC output to electrical panel
   - Install disconnect switches

6. **Testing & Commissioning**
   - Verify all connections
   - Test voltage and current
   - Configure inverter settings
   - Connect monitoring system
   - Final inspection and grid connection

**Safety Requirements:**
- OSHA fall protection when working above 6 feet
- Lock out/tag out procedures
- Arc-flash rated PPE
- Proper ladder safety
- Weather awareness (no installation in rain/wind)
`
            }
        ]
    },
    'WIND-101': {
        sections: [
            {
                title: 'Wind Energy Principles',
                content: `
**How Wind is Created:**
Wind is created by the uneven heating of Earth's surface by the sun. Warm air rises, creating areas of low pressure. Cool air rushes in to fill the void, creating wind.

**Wind Power Calculation:**
The power in wind is calculated using:
**P = 0.5 × ρ × A × V³**

Where:
- P = Power (Watts)
- ρ = Air density (kg/m³) - typically 1.225 kg/m³ at sea level
- A = Swept area (m²) - πr² for horizontal axis turbines
- V = Wind velocity (m/s)

**Critical Insight:** Power increases with the CUBE of wind speed!
- Wind at 8 m/s = 512 units of power
- Wind at 4 m/s = 64 units of power
- Doubling wind speed = 8× more power!

**Betz's Law:**
Maximum theoretical efficiency of any wind turbine is 59.3% (Betz Limit). Modern turbines achieve 35-45% efficiency.

**Wind Speed Classes:**
- Class 1: <6.4 m/s - Marginal
- Class 2: 6.4-7.0 m/s - Fair
- Class 3: 7.0-7.5 m/s - Good
- Class 4: 7.5-8.0 m/s - Excellent
- Class 5: 8.0-8.8 m/s - Outstanding
- Class 6: 8.8-11.9 m/s - Exceptional
- Class 7: >11.9 m/s - Superb

<div class="content-images">
    <img src="Wind resource map (800x600px).png" alt="Wind resource map highlighting high-quality wind zones" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Turbine Types:**

**Horizontal Axis (HAWT):**
- Most common (95% of installations)
- Rotor parallel to ground
- Higher efficiency
- Requires yaw mechanism
- Examples: Vestas, GE, Siemens

**Vertical Axis (VAWT):**
- Rotor perpendicular to ground
- Accepts wind from any direction
- Lower efficiency
- Good for urban areas
- Examples: Darrieus, Savonius
`
            },
            {
                title: 'Turbine Components',
                content: `
**Major Components:**

**1. Rotor Blades**
- Made from fiberglass or carbon fiber
- Aerodynamically designed (like airplane wings)
- Length determines swept area and power
- Typically 3 blades (optimal balance)
- Pitch control for power regulation

**2. Hub**
- Connects blades to main shaft
- Houses pitch control mechanism
- Cast iron or steel construction

**3. Nacelle (The "brain")**
Contains:
- Main shaft and gearbox
- Generator
- Controller
- Brake system
- Cooling system
- Yaw drive

**4. Tower**
- Tubular steel (most common)
- Height = 1.5× blade diameter (rule of thumb)
- Taller = more power (wind speed increases with height)
- Must withstand extreme loads

**5. Foundation**
- Concrete base (300-1000 tons)
- Depth: 10-30 feet
- Reinforced steel cage
- Critical for stability

**Gearbox:**
- Increases rotation speed (15-20 RPM → 1500-1800 RPM)
- Typically 3-stage planetary design
- Subject to significant wear
- Common failure point

**Generator Types:**
- Doubly Fed Induction Generator (DFIG) - Most common
- Permanent Magnet Synchronous Generator (PMSG)
- Squirrel Cage Induction Generator

**Control Systems:**
- Pitch control (adjusts blade angle)
- Yaw control (points turbine into wind)
- Power converter (converts variable frequency to grid frequency)
- SCADA monitoring (remote control and data collection)
`
            },
            {
                title: 'Maintenance Procedures',
                content: `
**Maintenance Schedule:**

**Daily (Automated Monitoring):**
- Performance metrics
- Vibration levels
- Temperature readings
- Power output
- Wind speed correlation

**Monthly:**
- Visual inspection from ground
- Check for oil leaks
- Monitor vibration trends
- Review error logs

**Every 6 Months:**
- Climb tower inspection
- Torque check on bolts
- Oil sample analysis
- Brake system check
- Blade surface inspection

**Annually:**
- Gearbox oil change
- Generator inspection
- Electrical connections check
- Pitch system calibration
- Yaw system maintenance
- Lightning protection test

**Every 2-3 Years:**
- Major component overhaul
- Blade inspection (rope access or drone)
- Structural integrity assessment
- Oil filter replacement

**Common Issues:**

**Gearbox Failure:**
- Symptoms: Unusual noise, metal particles in oil
- Cost: $200,000-$500,000 to replace
- Prevention: Regular oil analysis, vibration monitoring

**Blade Damage:**
- Causes: Lightning, erosion, bird strikes
- Repair: Composite patching or replacement
- Prevention: Leading edge tape, lightning protection

**Generator Bearing Failure:**
- Symptoms: Overheating, vibration
- Cause: Wear, contamination
- Prevention: Regular greasing, alignment checks

**Pitch System Malfunction:**
- Symptoms: Inability to feather blades
- Risk: Overspeed condition
- Safety: Turbine shuts down automatically

**GWO Training Requirements:**
- Basic Safety Training (BST)
- Basic Technical Training (BTT)
- Blade Repair Training
- First Aid and Manual Handling
- Recertification every 2 years
`
            }
        ]
    },
    'EFFICIENCY-101': {
        sections: [
            {
                title: 'Whole-Building Energy Audits',
                content: `
**Audit Phases:**
1. **Preliminary Analysis** – Benchmark utility bills, identify seasonal anomalies, gather building drawings.
2. **On-Site Assessment** – Document envelope condition, lighting, plug loads, and operational schedules.
3. **Diagnostic Testing** – Perform blower door tests, infrared scans, and data logging to quantify losses.
4. **Measure Evaluation** – Model ECM savings using DOE-2/eQUEST, calculate simple payback & SIR.
5. **Action Plan** – Prioritize ECMs by ROI, disruption, and carbon reduction impact.

**Key Metrics:**
- Energy Use Intensity (EUI): kBTU/ft²-year – target < 40 for offices, < 25 for schools.
- Baseline vs Post-Retrofit scenario modeled in TRACE 700 or EnergyPlus.
- Infiltration targets: ≤0.25 CFM/ft² @ 50 Pa for tight commercial buildings.

<div class="content-images">
    <img src="Thermal imaging of building showing heat loss (800x600px).png" alt="Thermal imaging showing envelope heat loss" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Audit Deliverables:** Executive summary, ECM table (cost, savings, payback), carbon reduction forecast, implementation roadmap.
`
            },
            {
                title: 'Air Tightness & HVAC Optimization',
                content: `
**Blower Door Testing:**
- Depressurize building to 50 Pa (ACH₅₀) to quantify infiltration.
- Use pressure pan readings to pinpoint leakage pathways.
- Target airtightness reductions up to 30% with weather-stripping, air sealing, and vestibule upgrades.

**HVAC Performance Enhancements:**
- Commission economizers to engage when outdoor enthalpy is favorable.
- Rebalance supply/return flows after retrofit to maintain design ventilation per ASHRAE 62.1.
- Add VFDs to fans/pumps to trim part-load energy by 20-40%.
- Integrate CO₂ demand-control ventilation for spaces with variable occupancy.

<div class="content-images">
    <img src="Blower door test equipment in action (800x600px).png" alt="Technician performing blower door test" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="HVAC system diagram (800x600px).png" alt="High-level HVAC system schematic" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Commissioning Checklist:** Verify sensor calibration, update BAS schedules, document control sequences, train O&M team.
`
            },
            {
                title: 'Lighting, Envelope & Occupant Engagement',
                content: `
**Lighting Retrofits:**
- Replace fluorescent fixtures with DLC-listed LED troffers (110+ lm/W).
- Layer controls: occupancy sensors, daylight harvesting, task lighting.
- Expected savings: 45-65% lighting kWh, 10-15% cooling load reduction.

**Envelope Upgrades:**
- Add continuous exterior insulation (R-10+) to eliminate thermal bridges.
- Upgrade glazing to low-e, argon-filled units with SHGC \leq 0.35.
- Seal rim joists, utility penetrations, roof-wall interfaces.

**Occupant Programs:**
- Launch “Kill-a-Watt” dashboards displaying real-time savings.
- Implement green office policies (setback thermostats, plug load timers, telework days).

<div class="content-images">
    <img src="LED vs traditional bulb comparison (800x600px).png" alt="LED vs traditional bulb energy comparison" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Building insulation layers cross-section (800x600px).png" alt="Building envelope insulation layers" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Reporting:** Summarize verified savings, occupant feedback, and persistence plan (M&V IPMVP Option C).
`
            }
        ]
    },
    'STORAGE-201': {
        sections: [
            {
                title: 'Battery Chemistries & Safety Fundamentals',
                content: `
**Chemistry Comparison:**
- **Lithium-Ion NMC** – 180-220 Wh/kg, 2-3C discharge, requires thermal management.
- **LFP (LiFePO₄)** – 140-160 Wh/kg, 1-2C discharge, excellent thermal stability.
- **Flow Batteries** – 20-40 Wh/kg, decoupled power/energy, ideal for 4+ hour duration.

**State of Health Monitoring:**
- Track capacity fade, internal resistance, coulombic efficiency.
- Utilize electrochemical impedance spectroscopy for predictive maintenance.

**Safety Systems:**
- Rack-level BMS with redundant contactors.
- UL 9540A compliant fire suppression (clean agent or inert gas).
- Thermal runway detection with fiber optic temperature sensing.

<div class="content-images">
    <img src="Lithium-ion battery cell diagram (800x600px).png" alt="Lithium-ion battery cell diagram" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Lifecycle Strategy:** Integrate second-life EV packs, implement cell balancing, plan for recycling logistics.
`
            },
            {
                title: 'Grid Integration & Microgrid Design',
                content: `
**Interconnection Essentials:**
- Follow IEEE 1547-2018 ride-through and reactive power requirements.
- Coordinate inverter settings with utility protection schemes (anti-islanding, voltage ride-through).
- Model grid impact using PSCAD / PSS®E for medium-voltage tie-ins.

**Microgrid Control Stack:**
- Primary (droop control), secondary (frequency restoration), tertiary (economic dispatch).
- Integrate DERMs/ADMS for real-time visibility.
- Implement black start sequences and islanding transitions.

<div class="content-images">
    <img src="Grid-scale battery storage facility (800x600px).png" alt="Grid-scale battery storage facility" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Microgrid schematic diagram (800x600px).png" alt="Microgrid schematic" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Use Cases:** Frequency regulation, peak shaving, resilience hubs, renewable smoothing, virtual power plant aggregation.
`
            },
            {
                title: 'Project Economics & Deployment Playbook',
                content: `
**Financial Modeling:**
- Stack revenue streams: capacity payments, demand charge reduction, arbitrage, ancillary services.
- Evaluate LCOS (Levelized Cost of Storage) factoring capex, augmentation, O&M, degradation.
- Apply Investment Tax Credit (ITC) bonus for domestic content / energy communities.

**Deployment Workflow:**
1. Feasibility study & load analysis
2. Site engineering (structural, civil, interconnection)
3. Procurement (battery modules, PCS, transformers)
4. Construction & commissioning
5. Performance verification and O&M handoff

<div class="content-images">
    <img src="Offshore wind farm aerial view (800x600px)1.png" alt="Hybrid offshore wind with storage" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Risk Mitigation:** Contract for performance guarantees, cybersecurity hardening (NERC CIP), spare parts strategy.
`
            }
        ]
    }
};

// Practice Quiz Questions (Different from exam questions!)
const PRACTICE_QUIZZES = {
    'SOLAR-101': [
        {
            question: 'What year was the photovoltaic effect discovered?',
            options: ['1839', '1900', '1954', '1970'],
            correctAnswer: 0,
            explanation: 'The photovoltaic effect was discovered by Edmund Becquerel in 1839, although practical solar cells weren\'t developed until 1954 at Bell Labs.'
        },
        {
            question: 'Which type of solar panel typically has the highest efficiency?',
            options: ['Polycrystalline', 'Thin-film', 'Monocrystalline', 'Amorphous'],
            correctAnswer: 2,
            explanation: 'Monocrystalline panels have the highest efficiency (18-22%) due to their uniform crystal structure and purity of silicon.'
        },
        {
            question: 'What is the typical system efficiency used in solar calculations?',
            options: ['50-60%', '60-70%', '75-85%', '90-95%'],
            correctAnswer: 2,
            explanation: 'System efficiency of 75-85% accounts for losses from wiring, inverter conversion, temperature effects, and soiling.'
        },
        {
            question: 'How much does a typical solar panel weigh?',
            options: ['10-15 lbs', '30-40 lbs', '50-60 lbs', '80-90 lbs'],
            correctAnswer: 1,
            explanation: 'A typical residential solar panel weighs 30-40 pounds, which must be considered when assessing roof structural capacity.'
        },
        {
            question: 'What is the ideal roof pitch for solar panels in most US locations?',
            options: ['10-20 degrees', '30-40 degrees', '50-60 degrees', '70-80 degrees'],
            correctAnswer: 1,
            explanation: '30-40 degrees is optimal for year-round energy production in most US locations, matching the latitude angle.'
        },
        {
            question: 'What does "peak sun hours" measure?',
            options: ['Hours of daylight', 'Hours when sun is directly overhead', 'Equivalent hours of 1000 W/m² sunlight', 'Hours above 50% capacity'],
            correctAnswer: 2,
            explanation: 'Peak sun hours represent the equivalent number of hours per day when solar irradiance averages 1000 W/m² (standard test conditions).'
        },
        {
            question: 'Which direction should solar panels face in the Northern Hemisphere?',
            options: ['North', 'South', 'East', 'West'],
            correctAnswer: 1,
            explanation: 'In the Northern Hemisphere, south-facing panels receive the most sunlight throughout the day.'
        },
        {
            question: 'What is net metering?',
            options: ['Measuring panel efficiency', 'Selling excess power to the grid', 'Calculating system losses', 'Monitoring power consumption'],
            correctAnswer: 1,
            explanation: 'Net metering allows you to sell excess electricity back to the utility grid, with your meter spinning backward when you produce more than you use.'
        },
        {
            question: 'What type of current do solar panels produce?',
            options: ['AC (Alternating Current)', 'DC (Direct Current)', 'Both AC and DC', 'Neither'],
            correctAnswer: 1,
            explanation: 'Solar panels produce DC (Direct Current), which must be converted to AC by an inverter for household use.'
        },
        {
            question: 'What is the typical degradation rate of solar panels per year?',
            options: ['0.1-0.3%', '0.5-1%', '2-3%', '5-7%'],
            correctAnswer: 1,
            explanation: 'Quality solar panels typically degrade at 0.5-1% per year, meaning they still produce 80-90% of original capacity after 25 years.'
        },
        {
            question: 'What does MPPT stand for in solar inverters?',
            options: ['Maximum Power Point Tracking', 'Multi-Panel Power Transfer', 'Mega Power Production Technology', 'Maximum Panel Performance Test'],
            correctAnswer: 0,
            explanation: 'MPPT (Maximum Power Point Tracking) technology allows inverters to extract maximum power from solar panels under varying conditions.'
        },
        {
            question: 'What is the minimum roof structural capacity recommended for solar installation?',
            options: ['50 lbs per panel', '100 lbs per panel', '150+ lbs per panel', '200+ lbs per panel'],
            correctAnswer: 2,
            explanation: 'Roofs should support at least 150 pounds per panel to account for panel weight, mounting equipment, and snow/wind loads.'
        },
        {
            question: 'Which article of the National Electrical Code (NEC) covers solar installations?',
            options: ['Article 250', 'Article 480', 'Article 690', 'Article 820'],
            correctAnswer: 2,
            explanation: 'NEC Article 690 specifically addresses solar photovoltaic systems, including wiring, grounding, and disconnects.'
        },
        {
            question: 'What is the purpose of a charge controller in off-grid systems?',
            options: ['Convert DC to AC', 'Regulate battery charging', 'Maximize panel output', 'Monitor system performance'],
            correctAnswer: 1,
            explanation: 'Charge controllers regulate the voltage and current from solar panels to safely charge batteries and prevent overcharging.'
        },
        {
            question: 'What is the typical warranty period for solar panels?',
            options: ['5-10 years', '10-15 years', '15-20 years', '25-30 years'],
            correctAnswer: 3,
            explanation: 'Most solar panels come with 25-30 year power output warranties, guaranteeing 80-90% of original capacity at the end of the warranty period.'
        },
        {
            question: 'What happens to grid-tied solar systems during a power outage?',
            options: ['Continue operating normally', 'Switch to battery backup', 'Shut down automatically', 'Operate at reduced capacity'],
            correctAnswer: 2,
            explanation: 'Grid-tied systems without battery backup shut down during outages for safety (anti-islanding protection) to protect utility workers.'
        },
        {
            question: 'What is the purpose of microinverters?',
            options: ['Reduce overall system cost', 'Convert DC to AC at each panel', 'Combine multiple strings', 'Monitor weather conditions'],
            correctAnswer: 1,
            explanation: 'Microinverters convert DC to AC at each individual panel, allowing better performance optimization and reducing impact of shading.'
        },
        {
            question: 'What depth of discharge (DoD) is recommended for lead-acid batteries?',
            options: ['20-30%', '50%', '80%', '100%'],
            correctAnswer: 1,
            explanation: 'Lead-acid batteries should only be discharged to 50% DoD to maximize lifespan, though this varies by battery type.'
        },
        {
            question: 'What is the typical voltage of a residential solar panel?',
            options: ['12V', '24V', '30-40V', '120V'],
            correctAnswer: 2,
            explanation: 'Residential solar panels typically operate at 30-40V DC, with multiple panels connected in series to create higher voltage strings.'
        },
        {
            question: 'What certification is most recognized for solar installation professionals in the US?',
            options: ['OSHA Certified', 'NABCEP Certified', 'IEEE Certified', 'ASHRAE Certified'],
            correctAnswer: 1,
            explanation: 'NABCEP (North American Board of Certified Energy Practitioners) is the gold standard certification for solar installation professionals.'
        }
    ],
    'EFFICIENCY-101': [
        {
            question: 'Which metric normalizes building energy use across different sizes?',
            options: ['Power Usage Effectiveness (PUE)', 'Energy Use Intensity (EUI)', 'Load Factor', 'Demand Charge'],
            correctAnswer: 1,
            explanation: 'Energy Use Intensity (EUI) is measured in kBTU per square foot per year and enables apples-to-apples benchmarking.'
        },
        {
            question: 'A blower door test reports ACH₅₀ = 0.65 for an office. What does this indicate?',
            options: ['Excessive infiltration requiring sealing', 'Strong air tightness well below 1.0', 'Mechanical ventilation failure', 'Humidity control issues'],
            correctAnswer: 1,
            explanation: 'An ACH₅₀ below 0.75 is considered tight for commercial buildings, showing effective air sealing.'
        },
        {
            question: 'What is the primary benefit of VFDs on supply fans?',
            options: ['Increase maximum airflow', 'Reduce part-load energy consumption', 'Eliminate filter maintenance', 'Replace economizer operation'],
            correctAnswer: 1,
            explanation: 'Variable frequency drives modulate motor speed, dramatically cutting energy at part loads based on the affinity laws.'
        },
        {
            question: 'Which ASHRAE Standard governs ventilation requirements for commercial buildings?',
            options: ['ASHRAE 55', 'ASHRAE 90.1', 'ASHRAE 62.1', 'ASHRAE 189.1'],
            correctAnswer: 2,
            explanation: 'ASHRAE 62.1 specifies ventilation rates and indoor air quality requirements for commercial spaces.'
        },
        {
            question: 'Daylight harvesting typically reduces lighting energy by:',
            options: ['5-10%', '10-20%', '20-40%', '50-70%'],
            correctAnswer: 2,
            explanation: 'Properly tuned daylight harvesting strategies deliver 20-40% lighting savings in perimeter zones.'
        }
    ],
    'STORAGE-201': [
        {
            question: 'Which lithium-ion chemistry offers the highest thermal stability?',
            options: ['NMC', 'LFP', 'NCA', 'LCO'],
            correctAnswer: 1,
            explanation: 'LiFePO₄ (LFP) cells are known for thermal stability and are widely adopted for stationary storage.'
        },
        {
            question: 'What tool is commonly used to study medium-voltage interconnections for storage projects?',
            options: ['MATLAB Simulink', 'PSS®E / PSCAD', 'HOMER Grid', 'RETScreen'],
            correctAnswer: 1,
            explanation: 'Utility planners rely on electromagnetic transient programs such as PSCAD or PSS®E for detailed interconnection studies.'
        },
        {
            question: 'Which control layer handles economic dispatch in a microgrid?',
            options: ['Primary', 'Secondary', 'Tertiary', 'Protective relays'],
            correctAnswer: 2,
            explanation: 'Tertiary controllers optimize economic dispatch, coordinating DERs against market signals and load forecasts.'
        },
        {
            question: 'Levelized Cost of Storage (LCOS) must include:',
            options: ['Capex only', 'O&M and augmentation costs', 'Utility retail tariffs', 'Insurance premiums only'],
            correctAnswer: 1,
            explanation: 'Accurate LCOS calculations include capital cost, operations & maintenance, augmentation, efficiency losses, and financing.'
        },
        {
            question: 'Which standard governs energy storage system safety testing for fire behavior?',
            options: ['IEEE 1547', 'NFPA 855', 'UL 9540A', 'IEC 62933'],
            correctAnswer: 2,
            explanation: 'UL 9540A evaluates thermal runaway propagation and is required by many AHJs for BESS installations.'
        }
    ],
    'WIND-101': [
        {
            question: 'According to Betz\'s Law, what is the maximum theoretical efficiency of a wind turbine?',
            options: ['45.3%', '59.3%', '75.0%', '85.0%'],
            correctAnswer: 1,
            explanation: 'Betz\'s Law states that no wind turbine can capture more than 59.3% of the kinetic energy in wind, due to the need for air to continue flowing past the blades.'
        },
        {
            question: 'How does wind power change when wind speed doubles?',
            options: ['Doubles', 'Triples', 'Quadruples', 'Increases 8 times'],
            correctAnswer: 3,
            explanation: 'Power in wind is proportional to velocity cubed (V³). Doubling wind speed means 2³ = 8 times more power.'
        },
        {
            question: 'What percentage of wind turbines are horizontal axis (HAWT) type?',
            options: ['50%', '70%', '85%', '95%'],
            correctAnswer: 3,
            explanation: 'Approximately 95% of installed wind turbines are horizontal axis (HAWT) due to their higher efficiency compared to vertical axis designs.'
        },
        {
            question: 'What is the typical lifespan of a modern wind turbine?',
            options: ['10-15 years', '20-25 years', '30-35 years', '40-45 years'],
            correctAnswer: 1,
            explanation: 'Modern wind turbines are designed for a 20-25 year operational lifespan, though major components may require replacement during this time.'
        },
        {
            question: 'What is the rule of thumb for optimal wind turbine tower height?',
            options: ['Equal to blade diameter', '1.5× blade diameter', '2× blade diameter', '3× blade diameter'],
            correctAnswer: 1,
            explanation: 'Tower height should be approximately 1.5 times the blade diameter to access stronger, less turbulent winds and maximize energy capture.'
        },
        {
            question: 'How many blades do most modern wind turbines have?',
            options: ['2 blades', '3 blades', '4 blades', '5 or more blades'],
            correctAnswer: 1,
            explanation: 'Three blades provide the optimal balance between efficiency, cost, and structural stability for large-scale wind turbines.'
        },
        {
            question: 'What is the typical rotation speed of large wind turbine rotors?',
            options: ['5-10 RPM', '15-20 RPM', '50-60 RPM', '100-120 RPM'],
            correctAnswer: 1,
            explanation: 'Large wind turbine rotors typically spin at 15-20 RPM, which is then increased by the gearbox to drive the generator at 1500-1800 RPM.'
        },
        {
            question: 'What does GWO stand for in wind energy training?',
            options: ['General Wind Operations', 'Global Wind Organisation', 'Grid Wind Optimization', 'Green Wind Operator'],
            correctAnswer: 1,
            explanation: 'GWO (Global Wind Organisation) sets international safety training standards for wind industry workers.'
        },
        {
            question: 'What is the primary cause of gearbox failures in wind turbines?',
            options: ['Lightning strikes', 'Excessive wear and lubrication issues', 'Bird strikes', 'Temperature extremes'],
            correctAnswer: 1,
            explanation: 'Gearbox failures are primarily caused by bearing wear, inadequate lubrication, and contamination - one of the costliest maintenance issues.'
        },
        {
            question: 'At what height above ground level does wind speed typically increase by 10%?',
            options: ['Every 10 meters', 'Every 30 meters', 'Every 50 meters', 'Every 100 meters'],
            correctAnswer: 1,
            explanation: 'Wind speed generally increases by approximately 10% for every 30 meters of elevation due to reduced surface friction.'
        },
        {
            question: 'What is "cut-in" wind speed?',
            options: ['Speed at maximum power', 'Minimum speed to start generating', 'Speed when turbine shuts down', 'Optimal operating speed'],
            correctAnswer: 1,
            explanation: 'Cut-in wind speed (typically 3-4 m/s) is the minimum wind speed at which the turbine begins generating electricity.'
        },
        {
            question: 'What is "cut-out" wind speed?',
            options: ['Speed at maximum power', 'Minimum speed to operate', 'Speed when turbine shuts down for safety', 'Optimal operating speed'],
            correctAnswer: 2,
            explanation: 'Cut-out wind speed (typically 25 m/s) is when the turbine automatically shuts down to prevent damage from excessive wind.'
        },
        {
            question: 'What material are most modern wind turbine blades made from?',
            options: ['Aluminum', 'Steel', 'Fiberglass or carbon fiber composite', 'Wood'],
            correctAnswer: 2,
            explanation: 'Turbine blades are made from fiberglass or carbon fiber composites for optimal strength-to-weight ratio and durability.'
        },
        {
            question: 'What is the typical capacity factor of wind turbines?',
            options: ['15-25%', '30-45%', '60-70%', '80-90%'],
            correctAnswer: 1,
            explanation: 'Capacity factor (actual output vs. maximum possible) for wind turbines is typically 30-45%, varying with location and wind resources.'
        },
        {
            question: 'What type of generator is most commonly used in modern wind turbines?',
            options: ['DC Generator', 'Synchronous Generator', 'Doubly Fed Induction Generator (DFIG)', 'Brushless Motor'],
            correctAnswer: 2,
            explanation: 'DFIG (Doubly Fed Induction Generator) is most common due to its ability to operate over variable speeds while maintaining grid frequency.'
        },
        {
            question: 'What is the purpose of the yaw system?',
            options: ['Increase rotation speed', 'Point turbine into wind', 'Cool the generator', 'Brake the rotor'],
            correctAnswer: 1,
            explanation: 'The yaw system rotates the nacelle to keep the turbine facing into the wind for optimal power generation.'
        },
        {
            question: 'How often should wind turbine gearbox oil typically be changed?',
            options: ['Every 3 months', 'Every 6 months', 'Annually', 'Every 2-3 years'],
            correctAnswer: 3,
            explanation: 'Gearbox oil is typically changed every 2-3 years, with regular oil analysis performed to monitor condition between changes.'
        },
        {
            question: 'What is blade pitch control?',
            options: ['Rotating the nacelle', 'Adjusting blade angle', 'Changing rotation speed', 'Applying brakes'],
            correctAnswer: 1,
            explanation: 'Pitch control adjusts the angle of blades relative to the wind to optimize power capture and prevent overspeeding.'
        },
        {
            question: 'What is the typical weight of a nacelle for a 2 MW wind turbine?',
            options: ['5-10 tons', '20-30 tons', '50-80 tons', '100-150 tons'],
            correctAnswer: 2,
            explanation: 'A nacelle for a 2 MW turbine typically weighs 50-80 tons, containing the gearbox, generator, and control systems.'
        },
        {
            question: 'What safety certification must wind technicians renew every 2 years?',
            options: ['OSHA 30', 'NABCEP', 'GWO BST', 'AWEA Certification'],
            correctAnswer: 2,
            explanation: 'GWO Basic Safety Training (BST) must be renewed every 2 years to maintain certification for working on wind turbines.'
        }
    ]
};

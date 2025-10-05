// ========================================
// LEARNENRICH - COURSE CONTENT PAGE
// Real educational content with videos
// ========================================

const COURSE_CONTENT = {
    'SOLAR-101': {
        title: 'Solar PV System Design',
        code: 'SOLAR-101',
        overview: {
                title: 'Solar Panel Technology',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Types of Solar Panels',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/Yxt72aDjFgY',
                        description: `Learn about different solar panel technologies and their applications.

**Monocrystalline Solar Panels:**
- Made from single-crystal silicon
- Highest efficiency: 18-24%
- Black appearance
- Most expensive
- Best for limited space
- Longest lifespan: 25-30 years
- Better performance in low light

**Polycrystalline Solar Panels:**
- Made from multiple silicon crystals
- Efficiency: 15-18%
- Blue appearance
- Lower cost than mono
- Good value for money
- Lifespan: 23-27 years
- Slightly less efficient in heat

**Thin-Film Solar Panels:**
- Various materials (CdTe, CIGS, a-Si)
- Lowest efficiency: 10-13%
- Flexible and lightweight
- Cheapest option
- Better in high temperatures
- Shorter lifespan: 15-20 years
- Good for large commercial roofs`
                    },
                    {
                        title: 'Solar Panel Specifications',
                        type: 'text',
                        content: `Understanding solar panel specifications is crucial for system design.

**Power Output (Watts):**
- Residential panels: 300-400W typical
- Commercial panels: 400-600W
- Measured under Standard Test Conditions (STC)
- STC: 1000 W/m², 25°C, 1.5 air mass

**Efficiency:**
- Percentage of sunlight converted to electricity
- Higher efficiency = more power from same area
- Top panels: 22-23% efficient
- Efficiency continues to improve yearly

**Temperature Coefficient:**
- How panel performs in heat
- Typical: -0.35% to -0.45% per °C
- Lower number is better
- Important for hot climates

**Voltage and Current:**
- Voc (Open Circuit Voltage): ~40-50V
- Isc (Short Circuit Current): ~9-11A
- Vmp (Voltage at Max Power): ~32-40V
- Imp (Current at Max Power): ~8-10A

**Physical Specifications:**
- Size: ~65" x 39" (residential)
- Weight: 40-50 lbs
- Frame: Anodized aluminum
- Glass: Tempered, anti-reflective
- Warranty: 25 years performance, 10-12 years product

**Certifications:**
- UL 1703 (Safety)
- IEC 61215 (Performance)
- IEC 61730 (Safety)
- Fire rating: Class C minimum`
                    }
                ]
            },
            modules: [
                {
                id: 3,
                title: 'System Design Fundamentals',
                duration: '90 minutes',
                lessons: [
                    {
                        title: 'Solar Site Assessment',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/EDeB_hFlsTw',
                        description: `Site assessment is the first critical step in solar system design.

**Sun Path Analysis:**
- Determine solar window (9am-3pm typically)
- Identify shading obstacles (trees, buildings)
- Use tools: Solar Pathfinder, Suneye, apps
- Calculate annual sun hours
- Best orientation: South-facing (Northern Hemisphere)
- Optimal tilt angle ≈ latitude of location

**Roof Assessment:**
- Structural integrity check
- Roof age and condition
- Available space measurement
- Roof pitch and orientation
- Obstructions (vents, chimneys)
- Access for maintenance

**Electrical Assessment:**
- Main panel capacity
- Available breaker space
- Wire run distances
- Grounding system
- Utility interconnection point

**Energy Usage Analysis:**
- Review 12 months of utility bills
- Identify usage patterns
- Calculate average daily kWh
- Determine peak usage times
- Consider future changes (EV, etc.)`
                    },
                    {
                        title: 'Calculating System Size',
                        type: 'text',
                        content: `Learn to accurately size a solar PV system.

**Step 1: Determine Energy Needs**
Monthly usage ÷ 30 = Daily kWh needed
Example: 900 kWh/month ÷ 30 = 30 kWh/day

**Step 2: Calculate Peak Sun Hours**
Varies by location:
- Phoenix, AZ: 6.5 hours
- Los Angeles, CA: 5.5 hours
- New York, NY: 4.5 hours
- Seattle, WA: 3.5 hours

**Step 3: Calculate Array Size**
Daily kWh ÷ Peak Sun Hours = Array size in kW
Example: 30 kWh ÷ 5 hours = 6 kW system

**Step 4: Account for System Losses**
Multiply by 1.25 to account for:
- Temperature losses: 10-15%
- Inverter losses: 3-5%
- Wiring losses: 2-3%
- Dirt/soiling: 3-5%
- Aging: 0.5% per year

Example: 6 kW × 1.25 = 7.5 kW system needed

**Step 5: Calculate Number of Panels**
System size (W) ÷ Panel wattage = Number of panels
Example: 7,500W ÷ 350W = 21.4 → 22 panels

**System Configuration:**
- Series connections increase voltage
- Parallel connections increase current
- Match inverter MPPT voltage range
- Stay within inverter current limits
- Consider string sizing for future expansion

**Real Example:**
Home uses 1,200 kWh/month in California
- Daily usage: 40 kWh
- Peak sun hours: 5.5
- Base system: 7.3 kW
- With losses: 9.1 kW
- Using 370W panels: 25 panels
- Final system: 9.25 kW`
                    }
                ]
            },
            {
                id: 4,
                title: 'Inverters and Balance of System',
                duration: '75 minutes',
                lessons: [
                    {
                        title: 'Understanding Inverters',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/R-VKFNSz50A',
                        description: `Inverters are the brain of your solar system.

**Types of Inverters:**

1. **String Inverters**
   - Most common and economical
   - One inverter for entire array
   - Size: 3-10 kW residential
   - Efficiency: 96-98%
   - Lifespan: 10-15 years
   - Best for: No shading, simple roofs

2. **Microinverters**
   - One per panel (module-level)
   - Better for shading
   - Individual panel monitoring
   - Efficiency: 95-96%
   - Longer warranty: 25 years
   - More expensive
   - Easier expansion

3. **Power Optimizers**
   - Hybrid approach
   - DC optimizers at each panel
   - One central inverter
   - Better than string for shading
   - Module-level monitoring
   - Good efficiency: 97-99%

**Key Inverter Features:**
- Maximum Power Point Tracking (MPPT)
- Anti-islanding protection
- Grid synchronization
- Monitoring capabilities
- Warranty coverage
- Efficiency curves
- Voltage/current ratings`
                    }
                ]
            }
        ],
        resources: [
            {
                title: 'Solar Panel Installation Guide',
                type: 'PDF',
                size: '2.5 MB',
                description: 'Complete step-by-step installation manual with diagrams and safety procedures',
                downloadUrl: '#'
            },
            {
                title: 'Complete Course Slides - Solar PV Systems',
                type: 'PDF',
                size: '8.3 MB',
                description: 'Full presentation slides covering all modules - Perfect for review and study',
                downloadUrl: '#'
            },
            {
                title: 'NEC 2023 Solar Requirements',
                type: 'PDF',
                size: '1.8 MB',
                description: 'National Electrical Code Article 690 - Solar PV system requirements',
                downloadUrl: '#'
            },
            {
                title: 'System Design Calculator & Worksheets',
                type: 'Excel',
                size: '450 KB',
                description: 'Excel template for system sizing, load calculations, and cost estimates',
                downloadUrl: '#'
            },
            {
                title: 'Site Assessment Checklist',
                type: 'PDF',
                size: '320 KB',
                description: 'Professional site survey form with evaluation criteria',
                downloadUrl: '#'
            },
            {
                title: 'Solar PV Study Notes - All Modules',
                type: 'PDF',
                size: '4.1 MB',
                description: 'Comprehensive study notes summarizing all course content',
                downloadUrl: '#'
            }
        ]
    },
    'WIND-101': {
        title: 'Wind Turbine Technology',
        code: 'WIND-101',
        overview: {
            description: `Explore the exciting field of wind energy technology. This course covers wind turbine design, 
            installation, maintenance, and the physics of wind power generation. Perfect for aspiring wind technicians 
            and renewable energy professionals.`,
            objectives: [
                'Understand wind energy principles and aerodynamics',
                'Learn wind turbine components and systems',
                'Master safety procedures for wind turbine work',
                'Perform maintenance and troubleshooting',
                'Analyze wind resource data',
                'Understand grid integration of wind power'
            ],
            prerequisites: 'Basic mechanical and electrical knowledge',
            duration: '10 weeks (6-8 hours per week)',
            certification: 'Certificate of Completion + GWO Basic Safety Training prep'
        },
        modules: [
            {
                id: 1,
                title: 'Introduction to Wind Energy',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'Fundamentals of Wind Power',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/YXumfVUw1lM',
                        description: `Wind energy harnesses the kinetic energy of moving air to generate electricity.

**The Physics of Wind:**
- Wind is caused by uneven heating of Earth's surface
- Temperature differences create pressure gradients
- Air moves from high to low pressure
- Coriolis effect influences wind direction
- Wind speed increases with height above ground

**Wind Power Calculation:**
Power in wind = 0.5 × ρ × A × V³

Where:
- ρ (rho) = air density (kg/m³)
- A = swept area of rotor (m²)
- V = wind speed (m/s)

**Key Principle:** Power increases with the CUBE of wind speed!
Doubling wind speed = 8× more power

**Betz Limit:**
- Maximum theoretical efficiency: 59.3%
- Modern turbines achieve 45-50%
- No turbine can extract all energy from wind
- Some wind must pass through

**Wind Classes:**
- Class 1: <4.4 m/s (marginal)
- Class 2: 4.4-5.1 m/s (fair)
- Class 3: 5.1-5.6 m/s (good)
- Class 4: 5.6-6.0 m/s (excellent)
- Class 5+: >6.0 m/s (outstanding)

**Global Wind Energy:**
- Fastest growing renewable source
- Global capacity: 1,000+ GW
- Provides 10% of global electricity
- Offshore wind expanding rapidly`
                    },
                    {
                        title: 'Types of Wind Turbines',
                        type: 'text',
                        content: `Wind turbines come in various designs for different applications.

**Horizontal Axis Wind Turbines (HAWT):**
- Most common design (95% of market)
- Rotor parallel to ground
- Blades rotate around horizontal shaft
- More efficient than vertical designs
- Requires yaw mechanism
- Better for large-scale power

**Vertical Axis Wind Turbines (VAWT):**
- Rotor perpendicular to ground
- Works from any wind direction
- Generator at ground level
- Lower efficiency
- Better for urban/turbulent wind
- Quieter operation

<div class="content-images">
    <img src="Wind turbine blade cross-section (800x600px).png" alt="Wind Turbine Blade Cross-Section" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Offshore wind farm aerial view (800x600px)1.png" alt="Offshore Wind Farm" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Wind resource map (800x600px).png" alt="Wind Resource Map" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**By Size Category:**

1. **Small Wind Turbines (≤100 kW)**
   - Residential/farm use
   - Rotor: 3-15 meters
   - Tower: 15-40 meters
   - Power: 400W-100kW

2. **Medium Wind Turbines (100kW-1MW)**
   - Community/small commercial
   - Rotor: 15-45 meters
   - Tower: 40-80 meters
   - Distributed generation

3. **Large Utility-Scale (>1MW)**
   - Commercial wind farms
   - Rotor: 50-120+ meters
   - Tower: 80-120+ meters
   - Power: 2-15 MW each

4. **Offshore Wind Turbines**
   - Largest turbines made
   - Rotor: 150-220 meters
   - Power: 8-15 MW
   - Stronger, more consistent wind
   - Higher installation costs`
                    }
                ]
            },
            {
                id: 2,
                title: 'Wind Turbine Components',
                duration: '80 minutes',
                lessons: [
                    {
                        title: 'Major Turbine Components',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/R-VKFNSz50A',
                        description: `Understanding each component of a modern wind turbine.

**Rotor Assembly:**
- **Blades (3 typically)**
  - Material: Fiberglass or carbon fiber
  - Length: 40-80m (utility scale)
  - Weight: 5-20 tons each
  - Aerodynamic airfoil design
  - Adjustable pitch mechanism

- **Hub**
  - Connects blades to shaft
  - Houses pitch system
  - Weight: 20-40 tons
  - Cast iron or steel

**Nacelle (Houses main components):**
- **Main Shaft**
  - Transfers rotor torque
  - Low-speed: 10-20 RPM
  - Heavy-duty bearings

- **Gearbox**
  - Increases speed 50-100×
  - Low speed in, high speed out
  - Most expensive component to replace
  - Some turbines are direct-drive (no gearbox)

- **Generator**
  - Converts mechanical to electrical energy
  - Types: DFIG, PMSG, SCIG
  - Power: 1-15 MW
  - Cooling system required

- **Yaw System**
  - Rotates nacelle to face wind
  - Electric or hydraulic motors
  - Wind vane for direction sensing

**Tower:**
- Height: 80-120 meters typical
- Material: Steel (tubular) or concrete
- Foundation: 300-500 tons concrete
- Access ladder inside
- Lightning protection

**Control Systems:**
- SCADA (Supervisory Control)
- Safety systems
- Performance monitoring
- Remote diagnostics`
                    }
                ]
            },
            {
                id: 3,
                title: 'Turbine Operation and Control',
                duration: '70 minutes',
                lessons: [
                    {
                        title: 'How Wind Turbines Operate',
                        type: 'text',
                        content: `Modern wind turbines are sophisticated machines with advanced control systems.

**Startup Sequence:**
1. Wind speed reaches cut-in speed (3-4 m/s)
2. Yaw system aligns turbine with wind
3. Brake releases
4. Pitch system optimizes blade angle
5. Generator connects to grid
6. MPPT finds optimal operating point

**Operating Modes:**

**Below Rated Wind Speed (<12 m/s):**
- Maximize power capture
- Variable rotor speed
- Optimal blade pitch
- Follow wind variations

**Above Rated Wind Speed (12-25 m/s):**
- Limit power to rated output
- Pitch blades to spill excess wind
- Maintain rated power
- Protect components

**Cut-Out (>25 m/s):**
- Shut down for safety
- Pitch blades to feathered position
- Apply brakes
- Lock yaw system

**Control Systems:**

1. **Pitch Control**
   - Adjusts blade angle
   - Response time: 1-2 seconds
   - Power regulation
   - Emergency shutdown

2. **Torque Control**
   - Generator resistance
   - Fast response (<0.1 second)
   - Power smoothing
   - Grid requirements

3. **Yaw Control**
   - Tracks wind direction
   - Slow movements
   - Minimizes fatigue
   - Cable untwist

**Performance Monitoring:**
- Power output
- Wind speed and direction
- Vibration levels
- Temperature sensors
- Electrical parameters
- SCADA data logging

**Safety Systems:**
- Overspeed protection
- Vibration monitoring
- Temperature limits
- Lightning protection
- Fire suppression
- Emergency stop buttons`
                    }
                ]
            }
        ],
        resources: [
            {
                title: 'Wind Turbine Maintenance Manual',
                type: 'PDF',
                size: '4.2 MB',
                description: 'Comprehensive maintenance procedures and troubleshooting guide',
                downloadUrl: '#'
            },
            {
                title: 'Complete Course Slides - Wind Energy',
                type: 'PDF',
                size: '9.7 MB',
                description: 'Full presentation slides covering all modules - Perfect for review and study',
                downloadUrl: '#'
            },
            {
                title: 'GWO Safety Training Guide',
                type: 'PDF',
                size: '2.1 MB',
                description: 'Global Wind Organisation basic safety training standards',
                downloadUrl: '#'
            },
            {
                title: 'Climbing and Rescue Procedures',
                type: 'PDF',
                size: '1.5 MB',
                description: 'Tower climbing safety protocols and emergency rescue procedures',
                downloadUrl: '#'
            },
            {
                title: 'Wind Turbine Study Notes - All Modules',
                type: 'PDF',
                size: '3.8 MB',
                description: 'Comprehensive study notes summarizing all course content',
                downloadUrl: '#'
            },
            {
                title: 'Wind Resource Assessment Tools',
                type: 'Excel',
                size: '890 KB',
                description: 'Spreadsheets for wind data analysis and energy production estimates',
                downloadUrl: '#'
            }
        ]
    },
    'EFFICIENCY-101': {
        title: 'Energy Efficiency & Building Performance',
        code: 'EFFICIENCY-101',
        overview: {
            description: `Master the principles of energy efficiency and building performance optimization. Learn to conduct comprehensive energy audits, identify energy-saving opportunities, and implement cost-effective solutions for residential and commercial buildings.`,
            objectives: [
                'Conduct professional energy audits and assessments',
                'Analyze building energy performance data',
                'Identify cost-effective energy efficiency improvements',
                'Understand HVAC systems and optimization',
                'Master building envelope and insulation principles',
                'Use energy modeling software and tools'
            ],
            prerequisites: 'Basic understanding of building systems and mathematics',
            duration: '8 weeks (5-7 hours per week)',
            certification: 'Certificate of Completion + preparation for BPI certification'
        },
        modules: [
            {
                id: 1,
                title: 'Introduction to Energy Efficiency',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'Energy Efficiency Fundamentals',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/0K_mNaQZfaU',
                        description: `Energy efficiency is about doing more with less energy. Learn the core principles of energy conservation and efficiency in buildings.
                        
**Key Concepts:**
- Energy vs Power (kWh vs kW)
- Energy intensity metrics
- Cost-benefit analysis
- Payback period calculations
- Life cycle cost analysis`
                    },
                    {
                        title: 'Building Energy Basics',
                        type: 'text',
                        content: `**Understanding Energy Consumption:**

Buildings account for 40% of global energy use. Energy efficiency improvements can reduce consumption by 20-50%.

**Energy End Uses:**
1. **HVAC (Heating, Ventilation, AC)** - 40-60% of building energy
2. **Lighting** - 15-25% of building energy
3. **Water Heating** - 10-20% of building energy
4. **Plug Loads** - 10-15% of building energy
5. **Other Equipment** - 5-10% of building energy

**Energy Conservation Hierarchy:**
1. Eliminate waste
2. Reduce consumption
3. Use efficient equipment
4. Generate renewable energy
5. Offset remaining consumption`
                    }
                ]
            },
            {
                id: 2,
                title: 'Energy Auditing Fundamentals',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Professional Energy Audits',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/fZKGYNa_yZY',
                        description: `Learn how to conduct comprehensive energy audits using professional tools and methodologies.`
                    },
                    {
                        title: 'Audit Types & Procedures',
                        type: 'text',
                        content: `**Three Levels of Energy Audits:**

**Level 1 - Walk-Through Assessment**
- Visual inspection
- Utility bill analysis
- Low-cost/no-cost recommendations
- 2-4 hours onsite
- Cost: R5,000 - R15,000

**Level 2 - Detailed Energy Survey**
- Comprehensive building analysis
- Equipment testing
- Thermal imaging
- Blower door testing
- 1-2 days onsite
- Cost: R25,000 - R75,000

**Level 3 - Investment-Grade Audit**
- Detailed engineering analysis
- Energy modeling
- Financial analysis
- Measurement & verification plan
- 3-5 days onsite
- Cost: R100,000 - R500,000+

<div class="content-images">
    <img src="Thermal imaging of building showing heat loss (800x600px).png" alt="Thermal Imaging Heat Loss" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Blower door test equipment in action (800x600px).png" alt="Blower Door Testing" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Essential Audit Equipment:**
- Infrared cameras for thermal imaging
- Blower door for air leakage testing
- Combustion analyzers
- Power meters and data loggers
- Moisture meters
- Light meters (lux meters)
- Surface thermometers`
                    }
                ]
            },
            {
                id: 3,
                title: 'HVAC Systems & Optimization',
                duration: '70 minutes',
                lessons: [
                    {
                        title: 'HVAC Fundamentals',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/hYAQCOSOjoQ',
                        description: `Understanding heating, ventilation, and air conditioning systems - the largest energy consumers in most buildings.`
                    },
                    {
                        title: 'HVAC Efficiency Strategies',
                        type: 'text',
                        content: `**HVAC System Types:**

**1. Central Systems:**
- Variable Air Volume (VAV)
- Constant Air Volume (CAV)
- Packaged rooftop units
- Chilled water systems

**2. Zoned Systems:**
- Ductless mini-splits
- Multi-zone heat pumps
- VRF (Variable Refrigerant Flow)

**3. Individual Units:**
- Window AC units
- Portable heaters
- Through-wall HVAC

<div class="content-images">
    <img src="HVAC system diagram (800x600px).png" alt="HVAC System Components" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Optimization Strategies:**
✓ Programmable thermostats (save 10-30%)
✓ Regular filter replacement
✓ Duct sealing (save 20-30% on HVAC)
✓ Proper insulation
✓ Zone control systems
✓ Variable speed drives
✓ Economizer controls
✓ Demand controlled ventilation

**SEER Ratings (Cooling Efficiency):**
- Minimum: SEER 13
- Standard: SEER 14-16
- High Efficiency: SEER 18-21
- Premium: SEER 22+

**AFUE Ratings (Heating Efficiency):**
- Standard: 80% AFUE
- High Efficiency: 90-95% AFUE
- Condensing: 95-98% AFUE`
                    }
                ]
            },
            {
                id: 4,
                title: 'Building Envelope & Insulation',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'Building Envelope Basics',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/zkwVZH5sNDw',
                        description: `The building envelope is the physical separator between conditioned and unconditioned environment.`
                    },
                    {
                        title: 'Insulation & Air Sealing',
                        type: 'text',
                        content: `**Insulation R-Values (Thermal Resistance):**

**Wall Insulation:**
- R-13 to R-21 for 2x4 walls
- R-19 to R-28 for 2x6 walls
- Higher R-values = better insulation

**Attic/Ceiling:**
- R-38 to R-60 (climate dependent)
- Highest priority for retrofits

**Floor:**
- R-19 to R-30 over unconditioned spaces

<div class="content-images">
    <img src="Building insulation layers cross-section (800x600px).png" alt="Insulation Layers" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Insulation Materials:**
- Fiberglass batts (R-3.2 to R-4.3 per inch)
- Blown cellulose (R-3.6 to R-3.8 per inch)
- Spray foam (R-6 to R-7 per inch)
- Rigid foam boards (R-4 to R-6.5 per inch)

**Air Sealing Critical Areas:**
✓ Windows and doors
✓ Electrical outlets
✓ Plumbing penetrations
✓ Attic hatches
✓ Recessed lighting
✓ Foundation/rim joists
✓ Ductwork connections

**Thermal Bridging:**
- Studs create 15-30% reduction in wall R-value
- Use continuous insulation to minimize
- Insulated headers important`
                    }
                ]
            },
            {
                id: 5,
                title: 'Lighting Efficiency',
                duration: '45 minutes',
                lessons: [
                    {
                        title: 'LED Lighting Technology',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/af5Z3z4yN1g',
                        description: `LED technology has revolutionized lighting efficiency, using 75% less energy than incandescent bulbs.`
                    },
                    {
                        title: 'Lighting Design & Controls',
                        type: 'text',
                        content: `**Lighting Technology Comparison:**

| Technology | Efficacy (lm/W) | Lifespan | Cost |
|-----------|----------------|----------|------|
| Incandescent | 15-20 | 1,000 hrs | R15 |
| Halogen | 18-25 | 2,000 hrs | R25 |
| CFL | 50-70 | 10,000 hrs | R40 |
| LED | 80-150 | 50,000 hrs | R60 |

<div class="content-images">
    <img src="LED vs traditional bulb comparison (800x600px).png" alt="LED vs Traditional Bulbs" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**LED Advantages:**
✓ 75-80% energy savings vs incandescent
✓ 50,000+ hour lifespan (17+ years)
✓ No warm-up time
✓ Dimmable options
✓ No UV emissions
✓ Low heat generation

**Lighting Controls:**
- Occupancy sensors (save 30-50%)
- Daylight harvesting
- Time scheduling
- Task lighting
- Dimming controls

**Recommended Light Levels:**
- Offices: 300-500 lux
- Warehouses: 150-300 lux
- Retail: 500-750 lux
- Classrooms: 300-500 lux`
                    }
                ]
            },
            {
                id: 6,
                title: 'Water Heating Efficiency',
                duration: '40 minutes',
                lessons: [
                    {
                        title: 'Efficient Water Heating',
                        type: 'text',
                        content: `**Water Heating Technologies:**

**1. Storage Tank Water Heaters**
- Standard: 0.58-0.60 Energy Factor
- High Efficiency: 0.67+ Energy Factor
- Capacity: 150-300 liters typical
- Recovery time important

**2. Tankless (On-Demand)**
- Energy Factor: 0.80-0.98
- Endless hot water
- Space saving
- Higher upfront cost
- Best for consistent demand

**3. Heat Pump Water Heaters**
- Energy Factor: 2.0-3.5
- Uses electricity to move heat
- 2-3x more efficient than standard
- Requires warm ambient air

**4. Solar Water Heating**
- 50-80% energy savings possible
- Payback: 5-10 years
- Best in sunny climates
- Backup system needed

**Efficiency Improvements:**
✓ Insulate tank and pipes (R-11+)
✓ Lower temperature to 50°C
✓ Fix leaks promptly
✓ Install low-flow fixtures
✓ Use cold water for washing
✓ Regular maintenance
✓ Timer controls`
                    }
                ]
            },
            {
                id: 7,
                title: 'Renewable Energy Integration',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'On-Site Renewables',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/xKxrkht7CpY',
                        description: `Integrating solar, wind, and other renewable energy sources with building efficiency improvements.`
                    }
                ]
            },
            {
                id: 8,
                title: 'Energy Modeling & Analysis',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Building Energy Modeling',
                        type: 'text',
                        content: `**Energy Modeling Software:**

**1. EnergyPlus (DOE)**
- Free, open source
- Whole-building simulation
- Industry standard

**2. eQUEST**
- Free, user-friendly interface
- Quick energy analysis
- Good for initial assessments

**3. IES-VE**
- Professional grade
- Detailed analysis
- Higher cost

**Modeling Process:**
1. Gather building data
2. Create baseline model
3. Calibrate to utility bills
4. Model improvements
5. Compare scenarios
6. Generate reports

**Key Outputs:**
- Annual energy use (kWh)
- Energy cost (ZAR)
- Peak demand (kW)
- End-use breakdown
- Savings calculations
- Payback periods`
                    }
                ]
            },
            {
                id: 9,
                title: 'Financial Analysis',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'ROI Calculations',
                        type: 'text',
                        content: `**Financial Metrics:**

**Simple Payback Period:**
Payback = Investment Cost ÷ Annual Savings

Example: R50,000 LED retrofit, R12,000/year savings
Payback = R50,000 ÷ R12,000 = 4.2 years

**Return on Investment (ROI):**
ROI = (Gain - Cost) ÷ Cost × 100%

**Net Present Value (NPV):**
NPV accounts for time value of money
Discount rate typically 5-10%

**Internal Rate of Return (IRR):**
The discount rate where NPV = 0
Compare to cost of capital

**Life Cycle Cost Analysis:**
- Initial cost
- Operating cost
- Maintenance cost
- Replacement cost
- Disposal cost
- Energy cost over lifetime

**Financing Options:**
- Energy Service Agreements (ESAs)
- Performance contracts
- Utility rebates & incentives
- Green building loans
- Tax credits & deductions`
                    }
                ]
            },
            {
                id: 10,
                title: 'Certification & Standards',
                duration: '45 minutes',
                lessons: [
                    {
                        title: 'Green Building Standards',
                        type: 'text',
                        content: `**Major Certifications:**

**LEED (Leadership in Energy & Environmental Design)**
- Certified: 40-49 points
- Silver: 50-59 points
- Gold: 60-79 points
- Platinum: 80+ points

**ENERGY STAR**
- Top 25% energy performance
- Verified by third party
- Annual certification

**Passive House**
- Ultra-low energy standard
- <15 kWh/m²/year heating
- Rigorous air tightness

**Net Zero Energy**
- Produces as much as it uses
- On-site renewables
- Ultra-efficient design

**Building Codes:**
- SANS 10400-XA (Energy efficiency)
- ASHRAE 90.1 (Energy standard)
- Local building codes`
                    }
                ]
            }
        ],
        resources: [
            {
                title: 'Energy Audit Checklist',
                type: 'PDF',
                size: '1.2 MB',
                description: 'Comprehensive checklist for conducting energy audits',
                downloadUrl: '#'
            },
            {
                title: 'HVAC Efficiency Guide',
                type: 'PDF',
                size: '2.8 MB',
                description: 'Complete guide to HVAC system optimization',
                downloadUrl: '#'
            }
        ]
    },
    'STORAGE-201': {
        title: 'Battery Storage & Grid Integration',
        code: 'STORAGE-201',
        overview: {
            description: `Explore the rapidly growing field of energy storage and grid integration. Learn to design battery storage systems, manage grid-scale energy storage, and optimize renewable energy integration with advanced battery technologies.`,
            objectives: [
                'Design battery storage system configurations',
                'Understand lithium-ion and emerging battery technologies',
                'Manage grid-scale energy storage projects',
                'Optimize renewable energy integration',
                'Analyze battery performance and degradation',
                'Implement smart grid and microgrid solutions'
            ],
            prerequisites: 'Understanding of electricity and renewable energy basics',
            duration: '12 weeks (6-8 hours per week)',
            certification: 'Certificate of Completion + NABCEP Battery Storage preparation'
        },
        modules: [
            {
                id: 1,
                title: 'Battery Technology Fundamentals',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'Battery Storage Overview',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/VxMM4g2Sk8U',
                        description: `Understanding modern battery storage technologies and their applications in renewable energy systems.
                        
**Why Battery Storage Matters:**
- Enables 24/7 renewable energy
- Grid stabilization & peak demand reduction
- Backup power & energy arbitrage
- Market worth R10 trillion by 2035`
                    },
                    {
                        title: 'Battery Chemistry Basics',
                        type: 'text',
                        content: `**Major Battery Technologies:**

**Lithium-Ion (Li-ion)** - Energy Density: 150-250 Wh/kg, Cycle Life: 3,000-10,000 cycles, Efficiency: 90-95%

**Lead-Acid** - Energy Density: 30-50 Wh/kg, Cycle Life: 500-1,200 cycles, Efficiency: 70-85%

**Flow Batteries** - Energy Density: 20-80 Wh/kg, Cycle Life: 10,000+ cycles, Long-duration storage

**Solid-State (Emerging)** - Energy Density: 300-500 Wh/kg, Higher safety, Still in development

<div class="content-images">
    <img src="Lithium-ion battery cell diagram (800x600px).png" alt="Lithium-Ion Battery Cell" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
    <img src="Grid-scale battery storage facility (800x600px).png" alt="Grid-Scale Battery Facility" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>`
                    }
                ]
            },
            {
                id: 2,
                title: 'Battery System Design',
                duration: '65 minutes',
                lessons: [
                    {
                        title: 'System Architecture',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/b88v-WvqxSQ',
                        description: `Learn how to design complete battery energy storage systems from components to full installations.`
                    }
                ]
            },
            {
                id: 3,
                title: 'Grid Integration Fundamentals',
                duration: '70 minutes',
                lessons: [
                    {
                        title: 'Smart Grid Basics',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/3rRHBMLIGT8',
                        description: `Battery storage integrates with smart grids for frequency regulation, peak shaving, energy arbitrage, and renewable integration.`
                    }
                ]
            },
            {
                id: 4,
                title: 'Battery Management Systems',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'BMS Technology',
                        type: 'text',
                        content: `**BMS Functions:** Monitoring (voltage, current, temperature, SOC, SOH), Protection (overvoltage, undervoltage, overcurrent), Balancing (cell-level), Communication (CAN bus, Modbus)`
                    }
                ]
            },
            {
                id: 5,
                title: 'Power Electronics',
                duration: '65 minutes',
                lessons: [
                    {
                        title: 'Inverter Technology',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/mTsTuD2xSbk',
                        description: `Power conversion systems and inverters for battery storage applications with 96-98% efficiency.`
                    }
                ]
            },
            {
                id: 6,
                title: 'Microgrid Design',
                duration: '70 minutes',
                lessons: [
                    {
                        title: 'Microgrid Fundamentals',
                        type: 'text',
                        content: `**Microgrid Components:**
- Distributed Energy Resources (solar, wind, generators)
- Energy Storage (batteries, flywheel)
- Loads (critical & non-critical)
- Control Systems (EMS, SCADA)

<div class="content-images">
    <img src="Microgrid schematic diagram (800x600px).png" alt="Microgrid Architecture" style="max-width: 100%; border-radius: 8px; margin: 15px 0;">
</div>

**Operating Modes:** Grid-Connected, Islanded, Black Start, Resynchronization`
                    }
                ]
            },
            {
                id: 7,
                title: 'Battery Performance & Degradation',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'Aging Mechanisms',
                        type: 'text',
                        content: `**Degradation Factors:** Depth of Discharge (deeper = faster aging), Temperature (optimal 15-25°C), C-Rate (higher = more stress), State of Charge (storing at 100% = high stress)`
                    }
                ]
            },
            {
                id: 8,
                title: 'Safety & Standards',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Battery Safety',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/dEZLdrRdmxk',
                        description: `Critical safety: thermal runaway prevention, fire suppression, UL 9540, NFPA 855 standards.`
                    }
                ]
            },
            {
                id: 9,
                title: 'Project Economics',
                duration: '65 minutes',
                lessons: [
                    {
                        title: 'Financial Analysis',
                        type: 'text',
                        content: `**System Costs (2025):** Residential R6,000-9,000/kWh, Commercial R5,000-7,500/kWh, Utility R3,500-6,000/kWh. **Revenue:** Energy arbitrage, demand reduction, frequency regulation, backup power value.`
                    }
                ]
            },
            {
                id: 10,
                title: 'Future Technologies',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'Emerging Storage Tech',
                        type: 'text',
                        content: `**Next-Gen:** Solid-state (2-3x density), Sodium-ion (cheaper), Advanced flow batteries, Hydrogen storage. Market growing 400 GWh by 2030.`
                    }
                ]
            },
            {
                id: 11,
                title: 'Installation & Commissioning',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Installation Best Practices',
                        type: 'text',
                        content: `**Installation:** Site assessment, structural analysis, permits, battery installation, DC/AC wiring, BMS setup, grounding, fire suppression, commissioning tests.`
                    }
                ]
            },
            {
                id: 12,
                title: 'Operations & Maintenance',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'O&M Procedures',
                        type: 'text',
                        content: `**Maintenance:** Daily monitoring, weekly inspections, monthly data analysis, quarterly testing, annual comprehensive tests. Monitor efficiency, capacity, availability, revenue.`
                    }
                ]
            },
            {
                id: 13,
                title: 'Grid Services Applications',
                duration: '60 minutes',
                lessons: [
                    {
                        title: 'Revenue Optimization',
                        type: 'text',
                        content: `**Applications:** Frequency regulation (millisecond response), peak shaving, energy arbitrage, renewable firming, backup power, voltage support. Optimize for maximum ROI.`
                    }
                ]
            },
            {
                id: 14,
                title: 'Thermal Management',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'Cooling Systems',
                        type: 'text',
                        content: `**Cooling:** Air cooling (small systems), liquid cooling (large systems). Maintain 20-25°C optimal temperature. Every 10°C increase doubles degradation rate.`
                    }
                ]
            },
            {
                id: 15,
                title: 'System Integration',
                duration: '65 minutes',
                lessons: [
                    {
                        title: 'Renewable + Storage',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/xKxrkht7CpY',
                        description: `Integrating battery storage with solar and wind for 24/7 renewable energy supply.`
                    }
                ]
            },
            {
                id: 16,
                title: 'Advanced Control Strategies',
                duration: '70 minutes',
                lessons: [
                    {
                        title: 'Optimization Algorithms',
                        type: 'text',
                        content: `**Control:** Predictive algorithms, machine learning optimization, demand forecasting, price arbitrage, renewable forecasting, load management strategies.`
                    }
                ]
            },
            {
                id: 17,
                title: 'Second-Life Batteries',
                duration: '55 minutes',
                lessons: [
                    {
                        title: 'EV Battery Repurposing',
                        type: 'text',
                        content: `**Second Life:** EV batteries at 70-80% capacity perfect for stationary storage. Cost-effective, sustainable, extends battery lifecycle, reduces waste.`
                    }
                ]
            },
            {
                id: 18,
                title: 'Recycling & Sustainability',
                duration: '50 minutes',
                lessons: [
                    {
                        title: 'Battery Lifecycle',
                        type: 'text',
                        content: `**Recycling:** 95%+ material recovery possible. Lithium, cobalt, nickel recovery. Closed-loop supply chain. Environmental regulations. Circular economy principles.`
                    }
                ]
            }
        ],
        resources: [
            {
                title: 'Battery Storage Design Guide',
                type: 'PDF',
                size: '4.5 MB',
                description: 'Complete battery system design manual',
                downloadUrl: '#'
            },
            {
                title: 'Grid Integration Standards',
                type: 'PDF',
                size: '2.2 MB',
                description: 'IEEE 1547 compliance guide',
                downloadUrl: '#'
            }
        ]
    }
};

// Get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load course content
function loadCourseContent() {
    const user = checkAuth();
    if (!user) return;
    
    const courseCode = getURLParameter('course');
    if (!courseCode || !COURSE_CONTENT[courseCode]) {
        window.location.href = 'courses.html';
        return;
    }
    
    const course = COURSE_CONTENT[courseCode];
    
    document.getElementById('userName').textContent = user.fullName;
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseCode').textContent = course.code;
    
    // Load progress
    const userCourses = getUserCourses();
    const userCourse = userCourses.find(c => c.code === courseCode);
    if (userCourse) {
        ensureCourseTrackingState(userCourse);
        const recalculated = calculateCourseProgress(courseCode, userCourse);
        userCourse.progress = Math.min(100, recalculated.progress);
        saveUserCourses(userCourses);

        const progress = userCourse.progress || 0;
        document.getElementById('progressText').textContent = `${progress}% Complete`;
        document.getElementById('progressBar').style.width = `${progress}%`;
    }
    
    // Show overview by default
    showTab('overview');
}

// Track study notes scroll listeners
let studyNotesScrollContainer = null;
let studyNotesScrollHandler = null;
let studyNotesScrollCourseCode = null;
let studyNotesScrollUsesWindow = false;

// Show tab content
function showTab(tabName) {
    // Clean up any active study notes scroll tracking when switching tabs
    teardownStudyNotesScrollTracking();

    // Update active tab using direct attribute matching instead of nth-child
    let activeTabFound = false;
    document.querySelectorAll('.content-tab').forEach(tab => {
        const onclickAttr = tab.getAttribute('onclick');
        if (!activeTabFound && onclickAttr && onclickAttr.includes(`'${tabName}'`)) {
            tab.classList.add('active');
            activeTabFound = true;
        } else {
            tab.classList.remove('active');
        }
    });

    if (!activeTabFound) {
        const firstTab = document.querySelector('.content-tab');
        if (firstTab) {
            firstTab.classList.add('active');
        }
    }

    const courseCode = getURLParameter('course');
    const course = COURSE_CONTENT[courseCode];
    
    const content = document.getElementById('tabContent');
    
    // Check if content element exists
    if (!content) {
        console.error('tabContent element not found!');
        return;
    }
    
    // Check if course data exists
    if (!course) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Course Not Found</h3>
                <p>Please select a valid course from the dashboard.</p>
            </div>
        `;
        return;
    }
    
    if (tabName === 'overview') {
        content.innerHTML = `
            <div class="overview-content">
                <h2>Course Overview</h2>
                <div class="overview-section">
                    <h3><i class="fas fa-info-circle"></i> Description</h3>
                    <p>${course.overview.description}</p>
                </div>
                
                <div class="overview-section">
                    <h3><i class="fas fa-bullseye"></i> Learning Objectives</h3>
                    <ul class="objectives-list">
                        ${course.overview.objectives.map(obj => `
                            <li><i class="fas fa-check-circle"></i> ${obj}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="overview-grid">
                    <div class="overview-box">
                        <i class="fas fa-book"></i>
                        <h4>Prerequisites</h4>
                        <p>${course.overview.prerequisites}</p>
                    </div>
                    <div class="overview-box">
                        <i class="fas fa-clock"></i>
                        <h4>Duration</h4>
                        <p>${course.overview.duration}</p>
                    </div>
                    <div class="overview-box">
                        <i class="fas fa-certificate"></i>
                        <h4>Certification</h4>
                        <p>${course.overview.certification}</p>
                    </div>
                </div>
                
                <button class="btn-primary btn-large start-course-btn" onclick="startLearning()">
                    <i class="fas fa-play"></i> START LEARNING
                </button>
            </div>
        `;
    } else if (tabName === 'modules') {
        // Get completed lessons for this course
        const courses = getUserCourses();
        const currentCourse = courses.find(c => c.code === courseCode);
        const completedLessons = currentCourse?.completedLessons || [];
        
        content.innerHTML = `
            <div class="modules-content">
                <h2><i class="fas fa-book-open"></i> Course Modules</h2>
                <p class="modules-intro">Click on any module to expand and see the lessons. Complete each lesson to track your progress!</p>
                ${course.modules.map((module, moduleIndex) => `
                    <div class="module-card">
                        <div class="module-header" onclick="toggleModule(event, ${module.id})">
                            <div class="module-info">
                                <h3>Module ${module.id}: ${module.title}</h3>
                                <span class="module-duration">
                                    <i class="fas fa-clock"></i> ${module.duration}
                                </span>
                            </div>
                            <button class="module-toggle" onclick="toggleModule(event, ${module.id})">
                                <i class="fas fa-chevron-${moduleIndex === 0 ? 'up' : 'down'}"></i>
                            </button>
                        </div>
                        <div class="module-content" id="module-${module.id}" style="display: ${moduleIndex === 0 ? 'block' : 'none'};">
                            <div class="module-description">
                                <p><strong>What you'll learn:</strong></p>
                                <ul class="learning-objectives">
                                    ${module.lessons.map(lesson => `<li><i class="fas fa-check-circle"></i> ${lesson.title}</li>`).join('')}
                                </ul>
                            </div>
                            ${module.lessons.map((lesson, idx) => {
                                const lessonKey = `${module.id}-${idx}`;
                                const isCompleted = completedLessons.includes(lessonKey);
                                return `
                                <div class="lesson-item ${isCompleted ? 'completed' : ''}">
                                    <div class="lesson-header-item">
                                        <i class="fas ${lesson.type === 'video' ? 'fa-play-circle' : 'fa-file-alt'}"></i>
                                        <h4>Lesson ${idx + 1}: ${lesson.title}</h4>
                                        ${isCompleted ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> Completed</span>' : ''}
                                    </div>
                                    ${lesson.type === 'video' ? `
                                        <div class="video-container">
                                            <iframe 
                                                src="${lesson.content}" 
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
                                        </div>
                                    ` : ''}
                                    <div class="lesson-text">
                                        ${lesson.description.split('\n').map(para => para.trim() ? `<p>${para}</p>` : '').join('')}
                                    </div>
                                    <div class="lesson-actions">
                                        <button class="complete-lesson-btn ${isCompleted ? 'completed-btn' : ''}" onclick="markLessonComplete(${module.id}, ${idx})" ${isCompleted ? 'disabled' : ''}>
                                            <i class="fas fa-check"></i> ${isCompleted ? 'Completed' : 'Mark as Complete'}
                                        </button>
                                    </div>
                                </div>
                            `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (tabName === 'studynotes') {
        // Study Notes Tab with Scroll-to-Complete Feature
        const notes = STUDY_NOTES[courseCode];
        if (notes) {
            const courses = getUserCourses();
            const currentCourse = courses.find(c => c.code === courseCode);
            if (currentCourse) {
                ensureCourseTrackingState(currentCourse);
            }

            content.innerHTML = `
                <div class="studynotes-content" id="studyNotesContainer">
                    <div class="scroll-progress-banner">
                        <div class="scroll-progress-info">
                            <i class="fas fa-scroll"></i>
                            <span>Scroll down to read all notes and complete this activity</span>
                        </div>
                        <div class="scroll-progress-bar">
                            <div class="scroll-progress-fill" id="scrollProgressFill"></div>
                        </div>
                        <span class="scroll-percentage" id="scrollPercentage">0% Read</span>
                    </div>
                    
                    <h2><i class="fas fa-graduation-cap"></i> Study Notes</h2>
                    <p class="notes-intro">Comprehensive study materials to reinforce your learning. These notes complement the video lessons and provide in-depth explanations.</p>
                    
                    ${notes.sections.map((section, idx) => `
                        <div class="note-section">
                            <div class="note-header">
                                <h3><i class="fas fa-book-open"></i> ${idx + 1}. ${section.title}</h3>
                            </div>
                            <div class="note-body">
                                ${section.content.split('\n\n').map(para => {
                                    if (para.trim().startsWith('**') && para.trim().endsWith('**')) {
                                        return `<h4>${para.replace(/\*\*/g, '')}</h4>`;
                                    } else if (para.includes('**')) {
                                        return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                                    } else if (para.trim().startsWith('- ') || para.trim().startsWith('✓ ')) {
                                        const items = para.split('\n').filter(l => l.trim());
                                        return `<ul class="note-list">${items.map(item => 
                                            `<li>${item.replace(/^[- ✓]+/, '').trim()}</li>`
                                        ).join('')}</ul>`;
                                    } else {
                                        return `<p>${para.trim()}</p>`;
                                    }
                                }).join('')}
                                
                                ${section.images ? `
                                    <div class="note-images">
                                        ${section.images.map(img => `
                                            <div class="image-placeholder">
                                                <i class="fas fa-image"></i>
                                                <p><strong>Image needed:</strong> ${img.prompt}</p>
                                                <small>Alt text: ${img.alt}</small>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="scroll-completion-marker" id="scrollCompletionMarker">
                        <i class="fas fa-flag-checkered"></i>
                        <p>You've reached the end! Scroll back up to complete this activity.</p>
                    </div>
                </div>
            `;
            const scrollContainer = document.querySelector('.dashboard-main.course-content-main') || document.querySelector('.dashboard-main');
            if (scrollContainer) {
                scrollContainer.scrollTop = 0;
            }
            const startingPercent = currentCourse
                ? (currentCourse.studyNotesCompleted ? 100 : Math.round((currentCourse.studyNotesProgress || 0) * 100))
                : 0;
            setStudyNotesScrollProgress(startingPercent, currentCourse?.studyNotesCompleted);
            
            // Initialize scroll tracking after a short delay to let DOM settle
            setTimeout(() => {
                setupStudyNotesScrollTracking(courseCode, scrollContainer);
            }, 100);
        } else {
            content.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>Study Notes Coming Soon</h3>
                    <p>Study notes for this course are being prepared.</p>
                </div>
            `;
        }
    } else if (tabName === 'quizzes') {
        // Practice Quizzes Tab
        const quizzes = PRACTICE_QUIZZES[courseCode];
        if (quizzes) {
            content.innerHTML = `
                <div class="quizzes-content">
                    <h2><i class="fas fa-question-circle"></i> Practice Quizzes</h2>
                    <div class="quiz-intro-box">
                        <div class="quiz-info">
                            <i class="fas fa-info-circle"></i>
                            <div>
                                <h3>Test Your Knowledge</h3>
                                <p>These practice quizzes help you prepare for the final exam. Questions are <strong>different from exam questions</strong>, allowing you to practice without seeing actual exam content.</p>
                                <ul>
                                    <li><i class="fas fa-check"></i> ${quizzes.length} practice questions</li>
                                    <li><i class="fas fa-check"></i> Instant feedback with explanations</li>
                                    <li><i class="fas fa-check"></i> Unlimited attempts</li>
                                    <li><i class="fas fa-check"></i> No time limit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quizContainer" class="quiz-container">
                        <button class="btn-primary btn-large" onclick="startPracticeQuiz()">
                            <i class="fas fa-play"></i> Start Practice Quiz
                        </button>
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-question-circle"></i>
                    <h3>Quizzes Coming Soon</h3>
                    <p>Practice quizzes for this course are being prepared.</p>
                </div>
            `;
        }
    } else if (tabName === 'resources') {
        // Enhanced Resources Tab with Real PDFs
        const pdfResources = PDF_RESOURCES[courseCode];
        content.innerHTML = `
            <div class="resources-content">
                <h2><i class="fas fa-download"></i> Resources & Study Materials</h2>
                <p class="resources-intro">Download comprehensive PDF study guides and reference materials. These are real, downloadable PDF files that you can keep forever.</p>
                
                <div class="pdf-stats">
                    <div class="pdf-stat-item">
                        <i class="fas fa-file-pdf"></i>
                        <div>
                            <h3>${pdfResources.length}</h3>
                            <p>PDF Documents</p>
                        </div>
                    </div>
                    <div class="pdf-stat-item">
                        <i class="fas fa-book"></i>
                        <div>
                            <h3>${pdfResources.reduce((sum, r) => sum + r.pages, 0)}</h3>
                            <p>Total Pages</p>
                        </div>
                    </div>
                    <div class="pdf-stat-item">
                        <i class="fas fa-hdd"></i>
                        <div>
                            <h3>${(pdfResources.reduce((sum, r) => sum + parseFloat(r.size), 0)).toFixed(1)} MB</h3>
                            <p>Total Size</p>
                        </div>
                    </div>
                </div>
                
                <div class="resources-grid">
                    ${pdfResources.map((resource, idx) => `
                        <div class="resource-card-enhanced">
                            <div class="resource-icon-large">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <div class="resource-details">
                                <h4>${resource.name}</h4>
                                <p class="resource-description">${resource.description}</p>
                                <div class="resource-meta">
                                    <span><i class="fas fa-file"></i> ${resource.pages} pages</span>
                                    <span><i class="fas fa-hdd"></i> ${resource.size}</span>
                                </div>
                            </div>
                            <button class="download-btn-enhanced" onclick="downloadPDF('${courseCode}', '${resource.name}', ${idx})">
                                <i class="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <div class="download-all-section">
                    <button class="btn-secondary btn-large" onclick="downloadAllPDFs('${courseCode}')">
                        <i class="fas fa-download"></i> Download All Resources (ZIP)
                    </button>
                </div>
            </div>
        `;
    }
}

// Quiz State
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswers = [];

// Start Practice Quiz
function startPracticeQuiz() {
    const courseCode = getURLParameter('course');
    const quizzes = PRACTICE_QUIZZES[courseCode];
    
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswers = [];
    
    showQuizQuestion();
}

// Show Quiz Question
function showQuizQuestion() {
    const courseCode = getURLParameter('course');
    const quizzes = PRACTICE_QUIZZES[courseCode];
    const question = quizzes[currentQuizQuestion];
    
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-progress">
                <span>Question ${currentQuizQuestion + 1} of ${quizzes.length}</span>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${((currentQuizQuestion + 1) / quizzes.length) * 100}%"></div>
                </div>
            </div>
            
            <div class="quiz-question">
                <h3>Question ${currentQuizQuestion + 1}</h3>
                <p>${question.question}</p>
            </div>
            
            <div class="quiz-options">
                ${question.options.map((option, idx) => `
                    <button class="quiz-option" onclick="selectQuizAnswer(${idx})">
                        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Select Quiz Answer
function selectQuizAnswer(selectedIdx) {
    const courseCode = getURLParameter('course');
    const quizzes = PRACTICE_QUIZZES[courseCode];
    const question = quizzes[currentQuizQuestion];
    const isCorrect = selectedIdx === question.correctAnswer;
    
    if (isCorrect) {
        quizScore++;
    }
    
    quizAnswers.push({ question: currentQuizQuestion, selected: selectedIdx, correct: isCorrect });
    
    // Show immediate feedback
    showQuizFeedback(selectedIdx, question.correctAnswer, question.explanation, isCorrect);
}

// Show Quiz Feedback
function showQuizFeedback(selectedIdx, correctIdx, explanation, isCorrect) {
    const courseCode = getURLParameter('course');
    const quizzes = PRACTICE_QUIZZES[courseCode];
    
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-feedback-card">
            <div class="feedback-header ${isCorrect ? 'correct' : 'incorrect'}">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
            </div>
            
            <div class="feedback-body">
                ${!isCorrect ? `
                    <p><strong>Your answer:</strong> ${String.fromCharCode(65 + selectedIdx)}</p>
                    <p><strong>Correct answer:</strong> ${String.fromCharCode(65 + correctIdx)}</p>
                ` : ''}
                
                <div class="explanation-box">
                    <h4><i class="fas fa-lightbulb"></i> Explanation</h4>
                    <p>${explanation}</p>
                </div>
            </div>
            
            <div class="feedback-actions">
                ${currentQuizQuestion < quizzes.length - 1 ? `
                    <button class="btn-primary" onclick="nextQuizQuestion()">
                        Next Question <i class="fas fa-arrow-right"></i>
                    </button>
                ` : `
                    <button class="btn-primary" onclick="finishPracticeQuiz()">
                        View Results <i class="fas fa-flag-checkered"></i>
                    </button>
                `}
            </div>
        </div>
    `;
}

// Next Quiz Question
function nextQuizQuestion() {
    currentQuizQuestion++;
    showQuizQuestion();
}

// Finish Practice Quiz
function finishPracticeQuiz() {
    const courseCode = getURLParameter('course');
    const quizzes = PRACTICE_QUIZZES[courseCode];
    const percentage = Math.round((quizScore / quizzes.length) * 100);
    
    // Update course progress when quiz is completed
    updateCourseProgressFromQuiz(courseCode, percentage);

    const courses = getUserCourses();
    const courseState = courses.find(c => c.code === courseCode);
    if (courseState) {
        ensureCourseTrackingState(courseState);
    }

    const attempts = courseState?.quizAttempts ? [...courseState.quizAttempts] : [];
    const bestScoreRecorded = courseState && typeof courseState.bestQuizScore === 'number' ? courseState.bestQuizScore : percentage;
    const attemptCount = attempts.length;

    const formatAttemptDate = (isoString) => {
        if (!isoString) return 'Unknown date';
        const dateObj = new Date(isoString);
        if (Number.isNaN(dateObj.getTime())) {
            return 'Unknown date';
        }
        return dateObj.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    };

    const bestAttempt = attempts.reduce((best, attempt) => {
        if (!best || attempt.score > best.score) {
            return attempt;
        }
        return best;
    }, null);

    const latestAttempt = attempts.length ? attempts[attempts.length - 1] : null;
    const bestAttemptDateLabel = bestAttempt?.recordedAt ? formatAttemptDate(bestAttempt.recordedAt) : null;
    const latestAttemptDateLabel = latestAttempt?.recordedAt ? formatAttemptDate(latestAttempt.recordedAt) : null;

    const historyListHTML = attempts.length
        ? `<ul class="quiz-history-list">
                ${attempts.map((attempt, idx) => {
                    const attemptLabel = `Attempt ${idx + 1}`;
                    const attemptDate = formatAttemptDate(attempt.recordedAt);
                    const badges = [];
                    if (attempt.score === bestScoreRecorded) {
                        badges.push('Best Score');
                    }
                    if (idx === attempts.length - 1) {
                        badges.push('Latest');
                    }
                    const badgeMarkup = badges.length ? `<span class="attempt-badge">${badges.join(' · ')}</span>` : '';
                    return `
                        <li class="quiz-history-entry">
                            <div class="attempt-primary">
                                <span class="attempt-label">${attemptLabel}</span>
                                ${badgeMarkup}
                            </div>
                            <div class="attempt-secondary">
                                <span class="attempt-score">${attempt.score}%</span>
                                <span class="attempt-date">${attemptDate}</span>
                            </div>
                        </li>
                    `;
                }).join('')}
            </ul>`
        : `<p class="quiz-history-empty">Take the quiz to build your performance history.</p>`;
    
    let message = '';
    if (percentage >= 90) {
        message = '🌟 Outstanding! You have mastered this material!';
    } else if (percentage >= 75) {
        message = '✅ Great job! You\'re well prepared.';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Review the topics you missed.';
    } else {
        message = '📚 Keep studying! Review the course materials.';
    }
    
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-results-card">
            <div class="results-header">
                <i class="fas fa-trophy"></i>
                <h2>Quiz Complete!</h2>
            </div>
            
            <div class="results-score">
                <div class="score-circle">
                    <svg width="200" height="200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                        <circle cx="100" cy="100" r="90" fill="none" stroke="${percentage >= 75 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'}" 
                                stroke-width="12" stroke-dasharray="${(percentage / 100) * 565} 565" 
                                transform="rotate(-90 100 100)" stroke-linecap="round"/>
                    </svg>
                    <div class="score-text">
                        <h3>${percentage}%</h3>
                        <p>${quizScore} / ${quizzes.length}</p>
                    </div>
                </div>
                <p class="score-message">${message}</p>
            </div>
            
            <div class="results-breakdown">
                <div class="breakdown-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${quizScore} Correct</span>
                </div>
                <div class="breakdown-item">
                    <i class="fas fa-times-circle"></i>
                    <span>${quizzes.length - quizScore} Incorrect</span>
                </div>
            </div>

            <div class="quiz-history-panel">
                <h3><i class="fas fa-history"></i> Attempt History</h3>
                <div class="quiz-history-summary">
                    <div class="summary-item">
                        <span class="summary-label">Attempts</span>
                        <strong>${attemptCount}</strong>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Best Score</span>
                        <strong>${bestScoreRecorded}%</strong>
                        ${bestAttemptDateLabel ? `<small>Set on ${bestAttemptDateLabel}</small>` : ''}
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Latest Attempt</span>
                        <strong>${percentage}%</strong>
                        ${latestAttemptDateLabel ? `<small>${latestAttemptDateLabel}</small>` : ''}
                    </div>
                </div>
                ${historyListHTML}
            </div>
            
            <div class="results-actions">
                <button class="btn-primary" onclick="startPracticeQuiz()">
                    <i class="fas fa-redo"></i> Retake Quiz
                </button>
                <button class="btn-secondary" onclick="showTab('modules'); document.querySelector('.content-tab:nth-child(2)').click()">
                    <i class="fas fa-book"></i> Back to Course
                </button>
            </div>
        </div>
    `;
}

// Download PDF
function applyPdfDownloadProgress(courseCode, resourceName) {
    const courses = getUserCourses();
    const course = courses.find(c => c.code === courseCode);

    if (!course) {
        return null;
    }

    ensureCourseTrackingState(course);

    const normalizedName = resourceName.trim();
    if (!course.downloadedResources.includes(normalizedName)) {
        course.downloadedResources.push(normalizedName);
    }

    const previousProgress = course.progress || 0;
    const progressSummary = calculateCourseProgress(courseCode, course);
    course.progress = Math.min(100, progressSummary.progress);

    const examUnlocked = !course.examUnlocked && course.progress >= 40;
    if (examUnlocked) {
        course.examUnlocked = true;
    }

    saveUserCourses(courses);
    updateCourseProgressUI(course);

    return {
        progressSummary,
        examUnlocked,
        progressDelta: course.progress - previousProgress,
        totalProgress: course.progress,
    };
}

function downloadPDF(courseCode, resourceName, idx) {
    generatePDF(courseCode, resourceName, `Content for ${resourceName}`);

    const result = applyPdfDownloadProgress(courseCode, resourceName);
    if (!result) {
        return;
    }

    const { progressSummary, examUnlocked, progressDelta, totalProgress } = result;
    const downloadsRemaining = Math.max(progressSummary.totalPdfs - progressSummary.pdfDownloads, 0);

    let message = `Resource saved: ${resourceName}.\n\nPDF downloads contribute ${COURSE_PROGRESS_WEIGHTS.pdfs}% of course progress.`;
    message += `\nCurrent PDF contribution: ${progressSummary.pdfContribution}% (${progressSummary.pdfDownloads}/${progressSummary.totalPdfs} downloaded).`;

    if (progressDelta > 0) {
        message += `\nProgress increased by ${progressDelta}% to ${totalProgress}%.`;
    } else {
        message += `\nProgress holds at ${totalProgress}%.`;
    }

    if (downloadsRemaining > 0) {
        message += `\n${downloadsRemaining} file(s) left to max out the PDF contribution.`;
    } else {
        message += '\n✅ PDF contribution maxed out!';
    }

    message += examUnlocked
        ? '\n\n🔓 Exam unlocked — great job reaching the 40% threshold!'
        : `\n\n${Math.max(40 - totalProgress, 0)}% more to unlock the exam.`;

    showCustomAlert('📄 Resource Downloaded', message, examUnlocked ? 'success' : 'info');
}

// Download All PDFs
function downloadAllPDFs(courseCode) {
    const pdfResources = PDF_RESOURCES[courseCode];
    showAlert(
        `📦 Preparing ${pdfResources.length} PDF files for download...\n\nEach file will download separately.`,
        'info',
        'Batch Download'
    );
    
    // Download each PDF with a delay
    pdfResources.forEach((resource, idx) => {
        setTimeout(() => {
            generatePDF(courseCode, resource.name, `Content for ${resource.name}`);
            applyPdfDownloadProgress(courseCode, resource.name);
        }, idx * 1000);
    });
}

function teardownStudyNotesScrollTracking() {
    if (studyNotesScrollHandler) {
        if (studyNotesScrollUsesWindow) {
            window.removeEventListener('scroll', studyNotesScrollHandler);
        } else if (studyNotesScrollContainer) {
            studyNotesScrollContainer.removeEventListener('scroll', studyNotesScrollHandler);
        }
    }

    studyNotesScrollContainer = null;
    studyNotesScrollHandler = null;
    studyNotesScrollCourseCode = null;
    studyNotesScrollUsesWindow = false;
}

function setStudyNotesScrollProgress(percent, completed = false) {
    const fill = document.getElementById('scrollProgressFill');
    const scrollPercentage = document.getElementById('scrollPercentage');

    if (!fill || !scrollPercentage) {
        return;
    }

    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    fill.style.width = `${clamped}%`;

    if (completed) {
        scrollPercentage.textContent = '100% Complete';
        scrollPercentage.style.color = '#0ea5e9';
    } else {
        scrollPercentage.textContent = `${clamped}% Read`;
        scrollPercentage.style.color = '';
    }
}

function getOffsetWithinScrollable(container, element) {
    if (!element) {
        return 0;
    }

    if (container === window || container === document || container === document.body || container === document.documentElement) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const rect = element.getBoundingClientRect();
        return rect.top + scrollTop;
    }

    if (!container) {
        return 0;
    }

    if (container.contains(element)) {
        let offset = 0;
        let current = element;
        while (current && current !== container) {
            offset += current.offsetTop || 0;
            current = current.offsetParent;
        }
        return offset;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return elementRect.top - containerRect.top + container.scrollTop;
}

function getContainerScrollTop(container) {
    if (container === window || container === document || container === document.body || container === document.documentElement) {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    return container ? container.scrollTop : 0;
}

function getContainerClientHeight(container) {
    if (container === window || container === document || container === document.body || container === document.documentElement) {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    return container ? container.clientHeight : 0;
}

function determineStudyNotesScrollContainer(notesContainer, explicitOverride = null) {
    if (explicitOverride) {
        if (explicitOverride === window) {
            return { container: window, usesWindow: true };
        }

        if (explicitOverride instanceof Element) {
            const styles = window.getComputedStyle(explicitOverride);
            const canScroll = explicitOverride.scrollHeight - explicitOverride.clientHeight > 5;
            if (canScroll || /(auto|scroll)/.test(styles.overflowY)) {
                return { container: explicitOverride, usesWindow: false };
            }
        }
    }

    if (notesContainer) {
        let current = notesContainer.parentElement;
        while (current && current !== document.body) {
            const styles = window.getComputedStyle(current);
            const overflowY = styles.overflowY;
            const canScroll = current.scrollHeight - current.clientHeight > 5;
            if (canScroll && (overflowY === 'auto' || overflowY === 'scroll')) {
                return { container: current, usesWindow: false };
            }
            current = current.parentElement;
        }
    }

    const defaultMain = document.querySelector('.dashboard-main.course-content-main') || document.querySelector('.dashboard-main');
    if (defaultMain) {
        const styles = window.getComputedStyle(defaultMain);
        const canScroll = defaultMain.scrollHeight - defaultMain.clientHeight > 5;
        if (canScroll || /(auto|scroll)/.test(styles.overflowY)) {
            return { container: defaultMain, usesWindow: false };
        }
    }

    return { container: window, usesWindow: true };
}

function setupStudyNotesScrollTracking(courseCode, containerOverride = null) {
    teardownStudyNotesScrollTracking();

    const notesContainer = document.getElementById('studyNotesContainer');
    if (!notesContainer) {
        return;
    }

    const { container, usesWindow } = determineStudyNotesScrollContainer(notesContainer, containerOverride);
    if (!container) {
        return;
    }

    const courses = getUserCourses();
    const course = courses.find(c => c.code === courseCode);

    if (!course) {
        return;
    }

    ensureCourseTrackingState(course);

    if (course.studyNotesCompleted) {
        setStudyNotesScrollProgress(100, true);
        return;
    }

    const computeMetrics = () => {
        const notesTop = getOffsetWithinScrollable(container, notesContainer);
        const notesHeight = notesContainer.scrollHeight || notesContainer.offsetHeight || 0;
        const containerHeight = getContainerClientHeight(container);
        const start = Math.max(0, notesTop - 40);
        const end = Math.max(start, notesTop + notesHeight - containerHeight);
        const distance = end - start;

        return { start, end, distance };
    };

    const handleScroll = () => {
        if (studyNotesScrollCourseCode !== courseCode) {
            return;
        }

        const { start, end, distance } = computeMetrics();
        const current = getContainerScrollTop(container);

        let percent;
        if (distance <= 0) {
            percent = current >= start ? 100 : 0;
        } else if (current <= start) {
            percent = 0;
        } else if (current >= end) {
            percent = 100;
        } else {
            percent = Math.round(((current - start) / distance) * 100);
        }

        setStudyNotesScrollProgress(percent);

        if (!course.studyNotesCompleted) {
            const progressFraction = Math.min(1, Math.max(0, percent / 100));
            const previousFraction = Math.max(0, Math.min(1, course.studyNotesProgress || 0));

            const currentContribution = Math.round(progressFraction * COURSE_PROGRESS_WEIGHTS.studyNotes);
            const previousContribution = Math.round(previousFraction * COURSE_PROGRESS_WEIGHTS.studyNotes);

            if (currentContribution > previousContribution) {
                course.studyNotesProgress = progressFraction;

                const previousProgressValue = typeof course.progress === 'number' ? course.progress : 0;
                const progressSummary = calculateCourseProgress(courseCode, course);
                const newProgressValue = Math.min(100, Math.max(previousProgressValue, progressSummary.progress));

                if (newProgressValue !== previousProgressValue) {
                    course.progress = newProgressValue;
                    updateCourseProgressUI(course);
                }

                saveUserCourses(courses);
            }
        }

        if (percent >= 95) {
            completeStudyNotes(courseCode);
            setStudyNotesScrollProgress(100, true);
            teardownStudyNotesScrollTracking();
        }
    };

    studyNotesScrollContainer = container;
    studyNotesScrollCourseCode = courseCode;
    studyNotesScrollHandler = handleScroll;
    studyNotesScrollUsesWindow = usesWindow;

    const target = usesWindow ? window : container;
    target.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
}

function ensureCourseTrackingState(course) {
    if (!Array.isArray(course.completedLessons)) {
        course.completedLessons = [];
    }
    if (!Array.isArray(course.downloadedResources)) {
        course.downloadedResources = [];
    }
    if (!Array.isArray(course.quizAttempts)) {
        course.quizAttempts = [];
    }
    if (typeof course.bestQuizScore !== 'number') {
        course.bestQuizScore = null;
    }
    if (typeof course.studyNotesProgress !== 'number') {
        course.studyNotesProgress = 0;
    }
}

const COURSE_PROGRESS_WEIGHTS = {
    lessons: 0,
    studyNotes: 50,
    pdfs: 40,
    quiz: 10,
};

function calculateCourseProgress(courseCode, course) {
    ensureCourseTrackingState(course);

    const totalLessons = COURSE_CONTENT[courseCode]?.modules.reduce((sum, mod) => sum + mod.lessons.length, 0) || 0;
    const pdfResources = PDF_RESOURCES[courseCode] || [];

    const lessonsWeight = COURSE_PROGRESS_WEIGHTS.lessons;
    const studyNotesWeight = COURSE_PROGRESS_WEIGHTS.studyNotes;
    const pdfWeight = COURSE_PROGRESS_WEIGHTS.pdfs;
    const quizWeight = COURSE_PROGRESS_WEIGHTS.quiz;

    const lessonContribution = totalLessons > 0
        ? ((course.completedLessons.length / totalLessons) * lessonsWeight)
        : 0;

    let notesProgressFraction = typeof course.studyNotesProgress === 'number'
        ? Math.max(0, Math.min(1, course.studyNotesProgress))
        : 0;

    if (course.studyNotesCompleted) {
        notesProgressFraction = 1;
    }

    const notesContribution = notesProgressFraction * studyNotesWeight;

    const uniqueDownloads = new Set(course.downloadedResources || []);
    const pdfContribution = pdfResources.length > 0
        ? (Math.min(uniqueDownloads.size, pdfResources.length) / pdfResources.length) * pdfWeight
        : 0;

    const bestScore = typeof course.bestQuizScore === 'number' ? course.bestQuizScore : (course.quizCompleted ? 100 : 0);
    const quizContribution = (Math.max(0, Math.min(bestScore, 100)) / 100) * quizWeight;

    const rawProgress = lessonContribution + notesContribution + pdfContribution + quizContribution;
    const progress = Math.min(100, Math.round(rawProgress));

    return {
        progress,
        lessonContribution: Math.round(lessonContribution),
        notesContribution: Math.round(notesContribution),
        pdfContribution: Math.round(pdfContribution),
        quizContribution: Math.round(quizContribution),
        bestScore: Math.round(Math.max(0, Math.min(bestScore, 100))),
        pdfDownloads: uniqueDownloads.size,
        totalPdfs: pdfResources.length,
    };
}

function updateCourseProgressUI(course) {
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');

    if (progressText) {
        progressText.textContent = `${course.progress}% Complete`;
    }

    if (progressBar) {
        progressBar.style.width = `${course.progress}%`;
    }
}

// Complete study notes activity
function completeStudyNotes(courseCode) {
    const courses = getUserCourses();
    const course = courses.find(c => c.code === courseCode);
    
    if (!course) return;
    
    // Check if already completed
    if (course.studyNotesCompleted) {
        return;
    }
    
    ensureCourseTrackingState(course);

    // Mark as completed
    course.studyNotesCompleted = true;
    const previousProgress = typeof course.progress === 'number' ? course.progress : 0;
    course.studyNotesProgress = 1;

    const progressSummary = calculateCourseProgress(courseCode, course);
    const expectedProgress = Math.min(100, previousProgress + COURSE_PROGRESS_WEIGHTS.studyNotes);
    course.progress = Math.min(100, Math.max(progressSummary.progress, expectedProgress));
    
    // Check if exam should be unlocked
    const examUnlocked = !course.examUnlocked && course.progress >= 40;
    if (examUnlocked) {
        course.examUnlocked = true;
    }
    
    saveUserCourses(courses);
    
    updateCourseProgressUI(course);
    setStudyNotesScrollProgress(100, true);
    teardownStudyNotesScrollTracking();
    
    // Show success notification
    if (examUnlocked) {
        showCustomAlert(
            '🎉 Study Notes Complete & Exam Unlocked!',
            `Great work! You've read all the study notes.\n\nStudy notes now contribute ${progressSummary.notesContribution}% toward your course progress.\n\n🔓 You've reached ${course.progress}% total progress – the final exam is now unlocked!`,
            'success'
        );
    } else {
        showCustomAlert(
            '📚 Study Notes Complete!',
            `Excellent! You've read all the study notes.\n\nStudy notes now add ${progressSummary.notesContribution}% toward completion.${course.examUnlocked ? '\n\n✓ Exam already unlocked' : `\n\n${Math.max(40 - course.progress, 0)}% more to unlock the exam`}`,
            'success'
        );
    }
}


// Toggle module expansion
function toggleModule(evt, moduleId) {
    if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    const moduleContent = document.getElementById(`module-${moduleId}`);
    if (!moduleContent) {
        return;
    }

    const isExpanded = moduleContent.style.display === 'block';
    moduleContent.style.display = isExpanded ? 'none' : 'block';

    const moduleCard = moduleContent.closest('.module-card');
    if (moduleCard) {
        const toggleIcon = moduleCard.querySelector('.module-toggle i');
        if (toggleIcon) {
            toggleIcon.className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        }
    }
}

// Mark lesson as complete
function markLessonComplete(moduleId, lessonIdx) {
    const courseCode = getURLParameter('course');
    const courses = getUserCourses();
    const course = courses.find(c => c.code === courseCode);
    
    if (course) {
        ensureCourseTrackingState(course);
        
        const lessonKey = `${moduleId}-${lessonIdx}`;
        
        // Check if already completed
        if (course.completedLessons.includes(lessonKey)) {
            showCustomAlert(
                'Already Completed',
                'This lesson has already been marked as complete.',
                'info'
            );
            return;
        }
        
        // Add to completed lessons
        course.completedLessons.push(lessonKey);
        
        const progressSummary = calculateCourseProgress(courseCode, course);
        course.progress = Math.min(100, progressSummary.progress);
        
        // Check if exam should be unlocked at 40% progress
        const examUnlocked = !course.examUnlocked && course.progress >= 40;
        if (examUnlocked) {
            course.examUnlocked = true;
        }
        
        saveUserCourses(courses);
        
        // Update display
        updateCourseProgressUI(course);
        
        // Show success message with exam unlock notification
        if (examUnlocked) {
            showCustomAlert(
                '🎉 Lesson Complete & Exam Unlocked!',
                `Great work! Completing lessons sharpens your skills.\n\nYour total progress is now ${course.progress}%.\n\n🔓 You've reached ${course.progress}% overall — the final exam is now unlocked!`,
                'success'
            );
        } else {
            showCustomAlert(
                '✅ Lesson Complete!',
                `Lesson saved! Keep exploring study notes (${progressSummary.notesContribution}% of progress) and PDF resources (${progressSummary.pdfContribution}% so far) to move the completion bar.${course.examUnlocked ? '\n\n✓ Exam already unlocked' : `\n\n${Math.max(40 - course.progress, 0)}% more to unlock the exam`}`,
                'success'
            );
        }
        
        // Reload the modules tab to show updated completion status
        showTab('modules');
    }
}

// Update course progress from quiz completion
function updateCourseProgressFromQuiz(courseCode, quizPercentage) {
    const courses = getUserCourses();
    const course = courses.find(c => c.code === courseCode);
    
    if (course) {
        ensureCourseTrackingState(course);

        const attempt = {
            score: quizPercentage,
            recordedAt: new Date().toISOString(),
        };

        course.quizAttempts.push(attempt);
        course.quizCompleted = true;

        const previousBest = typeof course.bestQuizScore === 'number' ? course.bestQuizScore : null;
        if (previousBest === null || quizPercentage > previousBest) {
            course.bestQuizScore = quizPercentage;
        }

        const progressSummary = calculateCourseProgress(courseCode, course);
        const previousProgress = course.progress || 0;
        course.progress = Math.min(100, progressSummary.progress);

        const examUnlocked = !course.examUnlocked && course.progress >= 40;
        if (examUnlocked) {
            course.examUnlocked = true;
        }

        saveUserCourses(courses);

        updateCourseProgressUI(course);

        const gainedProgress = course.progress - previousProgress;
        const bestLabel = progressSummary.bestScore;

        let message = `Your attempt has been recorded at ${quizPercentage}%.\n\n`;
        if (previousBest === null || quizPercentage > previousBest) {
            message += `🔥 New personal best! Quiz contribution is now ${progressSummary.quizContribution}% of your progress.\n`;
        } else {
            message += `Best score remains ${bestLabel}%. Quiz contribution stays at ${progressSummary.quizContribution}%.\n`;
        }

        if (gainedProgress > 0) {
            message += `Progress nudged forward by ${gainedProgress}% to ${course.progress}%.\n`;
        } else {
            message += `Total progress holds at ${course.progress}%.\n`;
        }

        message += course.examUnlocked
            ? '\n✓ Exam already unlocked — keep refining your score!'
            : `\n${Math.max(40 - course.progress, 0)}% more to unlock the final exam.`;

        showCustomAlert(
            examUnlocked ? '🎉 Quiz Personal Best & Exam Unlocked!' : '📈 Quiz Attempt Saved',
            message,
            examUnlocked ? 'success' : 'info'
        );
    }
}

// Start Learning - Show modules and auto-expand first module
function startLearning() {
    showTab('modules');
    
    setTimeout(() => {
        const firstModule = document.querySelector('.module-content');
        const firstToggleBtn = document.querySelector('.module-toggle');
        
        if (firstModule && firstToggleBtn) {
            firstModule.style.display = 'block';
            const iconElement = firstToggleBtn.querySelector('i');
            if (iconElement) {
                iconElement.className = 'fas fa-chevron-up';
            }
            
            firstModule.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 300);
}


// Download resource (old function - no longer used, kept for compatibility)
function downloadResource(title) {
    showAlert(
        `📥 Downloading: ${title}\n\nYour download will start shortly.\n\nThe file will be saved to your Downloads folder.`,
        'success',
        'Download Started'
    );
    
    // Simulate download (in real implementation, this would trigger actual file download)
    setTimeout(() => {
        showAlert(
            `✅ Download Complete!\n\n${title} has been downloaded successfully.`,
            'success',
            'Download Complete'
        );
    }, 2000);
}

// Add styles
const courseContentStyle = document.createElement('style');
courseContentStyle.textContent = `
    .course-content-main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .course-content-header {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .back-button {
        background: #f3f4f6;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        color: #374151;
        margin-bottom: 1rem;
        transition: all 0.3s;
    }
    
    .back-button:hover {
        background: #e5e7eb;
    }
    
    .course-title-section h1 {
        font-size: 2rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
    }
    
    .course-title-section p {
        color: #2563eb;
        font-weight: 600;
        margin: 0;
    }
    
    .course-progress-header {
        margin-top: 1.5rem;
    }
    
    .course-progress-header span {
        color: #6b7280;
        font-weight: 600;
    }
    
    .progress-bar-header {
        height: 12px;
        background: #e5e7eb;
        border-radius: 6px;
        margin-top: 0.5rem;
        overflow: hidden;
    }
    
    .progress-fill-header {
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #3b82f6);
        border-radius: 6px;
        transition: width 0.5s;
    }
    
    .content-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 2px solid #e5e7eb;
        background: white;
        padding: 1rem;
        border-radius: 16px 16px 0 0;
    }
    
    .content-tab {
        padding: 1rem 2rem;
        background: transparent;
        border: none;
        color: #6b7280;
        font-weight: 600;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .content-tab:hover {
        color: #2563eb;
    }
    
    .content-tab.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
    }
    
    .tab-content-area {
        background: white;
        padding: 2rem;
        border-radius: 0 0 16px 16px;
        min-height: 600px;
    }
    
    .overview-content h2 {
        font-size: 1.75rem;
        color: #1f2937;
        margin: 0 0 2rem 0;
    }
    
    .overview-section {
        margin-bottom: 2rem;
    }
    
    .overview-section h3 {
        font-size: 1.25rem;
        color: #374151;
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .overview-section h3 i {
        color: #2563eb;
    }
    
    .overview-section p {
        color: #6b7280;
        line-height: 1.8;
    }
    
    .objectives-list {
        list-style: none;
        padding: 0;
    }
    
    .objectives-list li {
        padding: 0.75rem 0;
        color: #374151;
        display: flex;
        align-items: start;
        gap: 1rem;
    }
    
    .objectives-list i {
        color: #10b981;
        margin-top: 0.25rem;
    }
    
    .overview-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .overview-box {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
    }
    
    .overview-box i {
        font-size: 2.5rem;
        color: #2563eb;
        margin-bottom: 1rem;
    }
    
    .overview-box h4 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
    }
    
    .overview-box p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .start-course-btn {
        margin-top: 2rem;
        padding: 1.25rem 3rem;
        font-size: 1.125rem;
    }
    
    .modules-content h2 {
        font-size: 1.75rem;
        color: #1f2937;
        margin: 0 0 2rem 0;
    }
    
    .module-card {
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }
    
    .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: white;
        cursor: pointer;
    }
    
    .module-info h3 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1.25rem;
    }
    
    .module-duration {
        color: #6b7280;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .module-toggle {
        background: #eff6ff;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        color: #2563eb;
        transition: all 0.3s;
    }
    
    .module-toggle:hover {
        background: #dbeafe;
    }
    
    .module-content {
        padding: 0 1.5rem 1.5rem;
        display: none;
    }
    
    .lesson-item {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .lesson-header-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .lesson-header-item i {
        font-size: 1.5rem;
        color: #2563eb;
    }
    
    .lesson-header-item h4 {
        margin: 0;
        color: #1f2937;
        font-size: 1.125rem;
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 12px;
        margin: 1.5rem 0;
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .lesson-text {
        color: #374151;
        line-height: 1.8;
    }
    
    .lesson-text p {
        margin: 1rem 0;
    }
    
    .lesson-text strong {
        color: #1f2937;
        display: block;
        margin-top: 1.5rem;
    }
    
    .complete-lesson-btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
    }
    
    .complete-lesson-btn:hover {
        background: #059669;
        transform: translateY(-2px);
    }
    
    .resources-content h2 {
        font-size: 1.75rem;
        color: #1f2937;
        margin: 0 0 1rem 0;
    }
    
    .resources-intro {
        color: #6b7280;
        margin-bottom: 2rem;
    }
    
    .resources-grid {
        display: grid;
        gap: 1.5rem;
    }
    
    .resource-card {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 12px;
        border: 2px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        transition: all 0.3s;
    }
    
    .resource-card:hover {
        border-color: #2563eb;
        transform: translateX(8px);
    }
    
    .resource-icon {
        width: 60px;
        height: 60px;
        background: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .resource-icon .fa-file-pdf {
        color: #ef4444;
    }
    
    .resource-icon .fa-file-excel {
        color: #10b981;
    }
    
    .resource-info {
        flex: 1;
    }
    
    .resource-info h4 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
    }
    
    .resource-info p {
        margin: 0 0 0.5rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .resource-size {
        color: #9ca3af;
        font-size: 0.75rem;
    }
    
    .download-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
    }
    
    .download-btn:hover {
        background: #1d4ed8;
    }
    
    @media (max-width: 768px) {
        .overview-grid {
            grid-template-columns: 1fr;
        }
        
        .content-tabs {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .resource-card {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(courseContentStyle);

// Initialize
if (window.location.pathname.includes('course-content.html')) {
    loadCourseContent();
}

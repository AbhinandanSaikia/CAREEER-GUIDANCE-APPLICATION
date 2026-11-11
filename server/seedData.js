// Rich seed dataset for Career Guidance Application
// Aligned with the 10 Categories and all requirements in the Project Synopsis

export const initialCategories = [
  {
    id: 1,
    name: 'Information Technology',
    slug: 'information-technology',
    description: 'Software development, artificial intelligence, cybersecurity, cloud computing, and modern computing systems.',
    icon: 'Code2',
    color: 'from-blue-600 to-indigo-600',
    display_order: 1
  },
  {
    id: 2,
    name: 'Engineering',
    slug: 'engineering',
    description: 'Design, construction, machines, infrastructure, robotics, aerospace, and physical innovation.',
    icon: 'Cpu',
    color: 'from-amber-500 to-orange-600',
    display_order: 2
  },
  {
    id: 3,
    name: 'Medical and Healthcare',
    slug: 'medical-and-healthcare',
    description: 'Clinical medicine, nursing, surgery, pharmaceuticals, public health, and biomedical sciences.',
    icon: 'Activity',
    color: 'from-rose-500 to-red-600',
    display_order: 3
  },
  {
    id: 4,
    name: 'Government Services',
    slug: 'government-services',
    description: 'Civil services (UPSC), defense forces, state administrative services, public banking, and policy.',
    icon: 'Building2',
    color: 'from-emerald-600 to-teal-700',
    display_order: 4
  },
  {
    id: 5,
    name: 'Business and Management',
    slug: 'business-and-management',
    description: 'Corporate leadership, product management, entrepreneurship, human resources, and operations.',
    icon: 'Briefcase',
    color: 'from-violet-600 to-purple-700',
    display_order: 5
  },
  {
    id: 6,
    name: 'Finance and Banking',
    slug: 'finance-and-banking',
    description: 'Chartered accountancy, investment banking, wealth management, financial modeling, and risk analysis.',
    icon: 'Landmark',
    color: 'from-cyan-600 to-blue-700',
    display_order: 6
  },
  {
    id: 7,
    name: 'Education and Teaching',
    slug: 'education-and-teaching',
    description: 'School teaching, collegiate professorship, educational technology, curriculum research, and counseling.',
    icon: 'GraduationCap',
    color: 'from-yellow-600 to-amber-700',
    display_order: 7
  },
  {
    id: 8,
    name: 'Design and Creative Fields',
    slug: 'design-and-creative-fields',
    description: 'UI/UX design, visual communication, animation, 3D modeling, architecture, and creative direction.',
    icon: 'Palette',
    color: 'from-pink-500 to-rose-600',
    display_order: 8
  },
  {
    id: 9,
    name: 'Media and Communication',
    slug: 'media-and-communication',
    description: 'Journalism, public relations, digital content creation, broadcast media, and corporate communication.',
    icon: 'Radio',
    color: 'from-fuchsia-600 to-pink-700',
    display_order: 9
  },
  {
    id: 10,
    name: 'Science and Research',
    slug: 'science-and-research',
    description: 'Scientific exploration, biotechnology, astrophysics, environmental sustainability, and R&D.',
    icon: 'FlaskConical',
    color: 'from-teal-600 to-emerald-600',
    display_order: 10
  }
];

export const initialCareers = [
  {
    id: 1,
    category_id: 1,
    title: 'Software Development Engineer (Full Stack)',
    slug: 'software-development-engineer',
    short_desc: 'Build scalable web, mobile, and cloud software applications used by millions.',
    full_desc: 'Software Development Engineers (SDEs) architect, build, test, and maintain software applications. As a Full-Stack Engineer, you bridge frontend interactive user experiences with backend microservices, high-performance databases, and cloud infrastructures.',
    educational_qualifications: '10+2 with Physics, Chemistry & Mathematics (PCM). Bachelor degree in Computer Science, IT, BCA, B.Tech or equivalent.',
    required_skills: ['JavaScript / TypeScript', 'React / Next.js', 'Node.js & Express', 'SQL & Neon PostgreSQL', 'Git & CI/CD', 'Data Structures & Algorithms', 'System Architecture'],
    job_roles: ['Frontend Developer', 'Backend Engineer', 'Full Stack SDE', 'System Architect', 'Tech Lead', 'Engineering Manager'],
    career_pathway: [
      { step: 1, title: 'High School Foundation', desc: 'Excel in 10+2 with Mathematics & Computer Science. Build curiosity in logic and basic programming (Python/C++).', duration: 'Class 11 - 12' },
      { step: 2, title: 'Formal Degree / CS Education', desc: 'Pursue B.Tech in CSE / BCA / B.Sc Computer Science. Master fundamentals: Data Structures, Operating Systems, DBMS & Networking.', duration: 'Years 1 - 4' },
      { step: 3, title: 'Modern Full-Stack Stack Mastery', desc: 'Build real-world production web applications with React, Node.js, and PostgreSQL. Deploy to cloud platforms.', duration: 'College Year 3' },
      { step: 4, title: 'Internships & Open Source', desc: 'Contribute to open-source software, participate in hackathons, and complete 1-2 summer internships.', duration: 'College Year 3 - 4' },
      { step: 5, title: 'Entry-Level SDE I', desc: 'Join a tech startup or enterprise as Associate Software Engineer. Deliver production features and master team workflows.', duration: '0 - 2 Years' },
      { step: 6, title: 'Senior SDE & Leadership', desc: 'Lead architecture choices, mentor juniors, handle high scale, and advance to Staff Engineer or Tech Lead.', duration: '5+ Years' }
    ],
    future_opportunities: 'Explosive demand with the integration of AI copilot agents, decentralized platforms, and edge compute. Full-stack developers who understand AI tooling will command premier roles globally.',
    salary_entry: '₹5.5 - 12 LPA',
    salary_mid: '₹14 - 28 LPA',
    salary_senior: '₹30 - 65+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Hybrid / Remote / Tech Campuses',
    top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Zomato', 'Swiggy', 'Razorpay', 'Atlassian'],
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    category_id: 1,
    title: 'AI & Machine Learning Engineer',
    slug: 'ai-ml-engineer',
    short_desc: 'Design, train, and deploy intelligent neural networks, generative AI, and predictive models.',
    full_desc: 'AI & ML Engineers develop advanced mathematical models, neural networks, natural language processing pipelines, and agentic workflows that enable computers to learn from massive datasets and make autonomous decisions.',
    educational_qualifications: '10+2 with strong Mathematics. B.Tech in CSE/AI/Data Science, B.Sc Statistics or M.Tech/M.S. in Machine Learning.',
    required_skills: ['Python & PyTorch', 'Mathematics & Linear Algebra', 'Deep Learning & LLMs', 'Vector Databases & RAG', 'MLOps & Docker', 'Feature Engineering'],
    job_roles: ['ML Engineer', 'AI Research Scientist', 'NLP Specialist', 'Computer Vision Engineer', 'MLOps Architect'],
    career_pathway: [
      { step: 1, title: 'Math & Coding Foundation', desc: 'Solid grasp of multivariable calculus, linear algebra, probability, and Python programming.', duration: '10+2 & Year 1' },
      { step: 2, title: 'Data Science & Classical ML', desc: 'Learn Pandas, Scikit-Learn, regression, clustering, and decision trees. Participate in Kaggle competitions.', duration: 'College Year 2' },
      { step: 3, title: 'Deep Learning & Transformers', desc: 'Train neural nets using PyTorch / TensorFlow, fine-tune open LLMs, and build Retrieval Augmented Generation systems.', duration: 'College Year 3' },
      { step: 4, title: 'AI Engineering & Production', desc: 'Learn model deployment, quantization, TensorRT, FastAPI serving, and monitoring.', duration: 'College Year 4' },
      { step: 5, title: 'Industry AI Practice', desc: 'Work on cutting-edge AI problems in healthcare, finance, search, or autonomous vehicles.', duration: '2 - 5+ Years' }
    ],
    future_opportunities: 'Among the fastest-growing careers in human history. Generative AI and automated reasoning are revolutionizing every single sector.',
    salary_entry: '₹7 - 16 LPA',
    salary_mid: '₹18 - 36 LPA',
    salary_senior: '₹40 - 80+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'High-tech labs / Remote / R&D Centers',
    top_recruiters: ['Google DeepMind', 'NVIDIA', 'OpenAI ecosystem', 'Microsoft AI', 'Adobe', 'Flipkart', 'Fractal Analytics'],
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    category_id: 1,
    title: 'Cybersecurity & Ethical Hacker',
    slug: 'cybersecurity-analyst',
    short_desc: 'Protect mission-critical data, networks, and applications against cyber intrusions and exploits.',
    full_desc: 'Cybersecurity specialists analyze digital systems, discover zero-day vulnerabilities, implement cryptographic protocols, and defend organizations against ransomware and state-sponsored cyberattacks.',
    educational_qualifications: '10+2 with PCM. B.Tech in CSE / Information Security / BCA with certifications like CEH, CompTIA Security+, CISSP.',
    required_skills: ['Network Protocols (TCP/IP)', 'Penetration Testing (Kali Linux, Burp Suite)', 'Cryptography', 'SIEM & Threat Hunting', 'Linux System Internals', 'Incident Response'],
    job_roles: ['SOC Analyst', 'Penetration Tester', 'Security Architect', 'Cyber Forensics Investigator', 'Chief Information Security Officer (CISO)'],
    career_pathway: [
      { step: 1, title: 'Networking Fundamentals', desc: 'Master how the internet works: packets, routing, DNS, firewalls, and Linux shell mastery.', duration: 'Year 1' },
      { step: 2, title: 'Offensive & Defensive Security', desc: 'Practice ethical hacking on platforms like TryHackMe, Hack The Box, and earn CEH certification.', duration: 'Years 2 - 3' },
      { step: 3, title: 'SOC Operations & Cloud Security', desc: 'Gain expertise in AWS/Azure security, SIEM tools like Splunk, and incident handling.', duration: 'Year 4' },
      { step: 4, title: 'Professional Cybersecurity Specialist', desc: 'Secure enterprise infrastructure, manage red/blue team exercises, and ensure regulatory compliance.', duration: 'Entry to Senior' }
    ],
    future_opportunities: 'Global shortage of 3.5+ million cyber professionals. Zero-trust security and government defense priorities make this an evergreen career.',
    salary_entry: '₹5 - 10 LPA',
    salary_mid: '₹12 - 25 LPA',
    salary_senior: '₹28 - 55+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Security Operations Centers (SOC) / Corporate HQ',
    top_recruiters: ['PwC', 'EY', 'Deloitte', 'CrowdStrike', 'Cisco', 'Wipro', 'Indian Armed Forces / CERT-In'],
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    category_id: 2,
    title: 'Robotics & Automation Engineer',
    slug: 'robotics-automation-engineer',
    short_desc: 'Create intelligent autonomous robots, robotic limbs, drones, and industrial automation lines.',
    full_desc: 'Robotics Engineers combine mechanical engineering, electrical circuits, sensors, and software programming to design robots capable of performing complex physical tasks autonomously.',
    educational_qualifications: '10+2 with PCM. B.Tech in Mechatronics, Mechanical, Electrical, or Robotics Engineering.',
    required_skills: ['ROS (Robot Operating System)', 'Microcontrollers (Arduino, STM32)', 'C++ & Python', 'CAD / SolidWorks', 'Control Systems', 'Computer Vision'],
    job_roles: ['Robotics Software Engineer', 'Automation Specialist', 'Mechatronics Engineer', 'Drone Systems Engineer', 'Robotics Hardware Architect'],
    career_pathway: [
      { step: 1, title: 'Science & Physics Mastery', desc: 'Strong foundation in mechanics, kinematics, electromagnetism, and calculus in 10+2.', duration: 'School' },
      { step: 2, title: 'Engineering Degree in Mechatronics / Mech', desc: 'Study sensors, motor drives, microprocessors, and fluid mechanics.', duration: 'Years 1 - 4' },
      { step: 3, title: 'Hands-on Projects & Drone Clubs', desc: 'Build line-following robots, robotic arms, quadcopters, and program them with ROS.', duration: 'College Years 2 - 4' },
      { step: 4, title: 'Industrial Robotics Practice', desc: 'Work with manufacturing plants, autonomous warehouse systems, or surgical robotics.', duration: 'Career' }
    ],
    future_opportunities: 'Tremendous growth in smart factories (Industry 4.0), medical surgeries, defense surveillance drones, and space exploration.',
    salary_entry: '₹4.5 - 9 LPA',
    salary_mid: '₹11 - 22 LPA',
    salary_senior: '₹25 - 50+ LPA',
    growth_outlook: 'High',
    work_environment: 'Manufacturing Plants, R&D Labs, Robotics Studios',
    top_recruiters: ['ISRO', 'DRDO', 'Tesla', 'KUKA Robotics', 'ABB', 'Tata Motors', 'Ideaforge'],
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    category_id: 2,
    title: 'Civil & Infrastructure Engineer',
    slug: 'civil-infrastructure-engineer',
    short_desc: 'Design iconic skyscrapers, high-speed rail, smart bridges, and sustainable urban infrastructure.',
    full_desc: 'Civil Engineers plan, design, construct, and oversee infrastructure systems that shape modern civilizations, ensuring structural integrity, environmental safety, and earthquake resilience.',
    educational_qualifications: '10+2 with PCM. B.Tech / B.E. in Civil Engineering (GATE for PSU roles and M.Tech).',
    required_skills: ['AutoCAD & Revit BIM', 'Structural Analysis (STAAD Pro)', 'Project Management (Primavera)', 'Geotechnical Surveying', 'Green Building Standards'],
    job_roles: ['Structural Engineer', 'Site Engineer', 'Urban Planner', 'Project Manager', 'Geotechnical Consultant'],
    career_pathway: [
      { step: 1, title: '10+2 PCM & Entrance Exams', desc: 'Crack JEE Main / State CETs for premier civil engineering colleges.', duration: 'Class 11 - 12' },
      { step: 2, title: 'Civil Engineering Curriculum', desc: 'Learn concrete technology, structural mechanics, fluid dynamics, and surveying.', duration: 'Years 1 - 4' },
      { step: 3, title: 'BIM & Structural Software', desc: 'Master 3D BIM modeling and structural simulation software.', duration: 'College Years 3 - 4' },
      { step: 4, title: 'On-site Execution & Licensing', desc: 'Supervise mega infrastructure projects, obtain Chartered Engineer credential.', duration: 'Career' }
    ],
    future_opportunities: 'India’s National Infrastructure Pipeline and global smart city initiatives create decades of steady demand for civil engineers.',
    salary_entry: '₹4 - 7 LPA',
    salary_mid: '₹8 - 18 LPA',
    salary_senior: '₹20 - 40+ LPA',
    growth_outlook: 'High',
    work_environment: 'Construction Sites & Architectural Design Offices',
    top_recruiters: ['L&T (Larsen & Toubro)', 'NHAI', 'Tata Projects', 'DLF', 'Afcons Infrastructure', 'Shapoorji Pallonji'],
    image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    category_id: 3,
    title: 'Doctor & Physician (MBBS / MD)',
    slug: 'doctor-physician',
    short_desc: 'Diagnose illnesses, prescribe therapeutics, perform surgeries, and preserve human lives.',
    full_desc: 'Doctors provide critical healthcare services, diagnosing acute and chronic medical disorders, performing life-saving surgical interventions, and counseling patients toward wellness.',
    educational_qualifications: '10+2 with Biology, Physics & Chemistry (PCB). Clear NEET-UG for MBBS (5.5 years including clinical internship), followed by NEET-PG for MD/MS specialization.',
    required_skills: ['Clinical Diagnosis', 'Patient Compassion & Ethics', 'Emergency First Response', 'Medical Pathology', 'Pharmacology', 'Crisis Calmness'],
    job_roles: ['General Physician', 'Surgeon', 'Cardiologist', 'Pediatrician', 'Radiologist', 'Chief Medical Officer'],
    career_pathway: [
      { step: 1, title: 'NEET-UG Preparation', desc: 'Intensive study in PCB, crack NEET-UG with high national rank to secure medical college.', duration: 'Class 11 - 12' },
      { step: 2, title: 'MBBS Medical School', desc: '5.5 years rigorous medical education: anatomy, physiology, pharmacology, and clinical rotations.', duration: '5.5 Years' },
      { step: 3, title: 'Compulsory Rotatory Internship', desc: 'Hands-on patient care across emergency, surgery, medicine, and obstetrics wards.', duration: '1 Year' },
      { step: 4, title: 'Post-Graduation (MD / MS / DNB)', desc: 'Specialize in General Medicine, Surgery, Pediatrics, Orthopedics, or Cardiology.', duration: '3 Years' },
      { step: 5, title: 'Senior Consultant & Clinical Practice', desc: 'Join premier hospitals or establish autonomous multi-specialty clinics.', duration: 'Lifelong' }
    ],
    future_opportunities: 'Evergreen, highly respected profession with acute global shortages of doctors and specialized healthcare providers.',
    salary_entry: '₹8 - 15 LPA',
    salary_mid: '₹18 - 35 LPA',
    salary_senior: '₹40 - 100+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Hospitals, Emergency Trauma Centers, Medical Colleges',
    top_recruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Government Medical Colleges', 'WHO'],
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    category_id: 3,
    title: 'Pharmacist & Clinical Research Specialist',
    slug: 'pharmacist-clinical-researcher',
    short_desc: 'Discover life-saving drug formulations, test clinical efficacy, and dispense therapeutics.',
    full_desc: 'Pharmacists and pharmaceutical scientists research biological mechanisms, formulate stable medication compounds, supervise clinical trials, and ensure regulatory drug safety standards.',
    educational_qualifications: '10+2 with PCB or PCM. Bachelor of Pharmacy (B.Pharm - 4 years) or Pharm.D (6 years), followed by M.Pharm.',
    required_skills: ['Pharmacokinetics', 'Organic Drug Chemistry', 'Drug Dispensing Ethics', 'FDA Regulatory Guidelines', 'Clinical Trial Management'],
    job_roles: ['Clinical Pharmacist', 'Drug Formulation Scientist', 'Quality Control Analyst', 'Medical Regulatory Affairs Officer'],
    career_pathway: [
      { step: 1, title: 'High School Chemistry & Biology', desc: 'Excel in organic chemistry and biological systems in 10+2.', duration: 'School' },
      { step: 2, title: 'B.Pharm / Pharm.D Degree', desc: 'Study medicinal chemistry, pharmacology, toxicology, and pharmaceutical tech.', duration: '4 - 6 Years' },
      { step: 3, title: 'State Pharmacy Council License', desc: 'Register as registered pharmacist; obtain GMP & clinical research credentials.', duration: 'Graduation' },
      { step: 4, title: 'Pharma R&D / Hospital Pharmacy', desc: 'Formulate new drug therapies or manage clinical hospital pharmacy distribution.', duration: 'Career' }
    ],
    future_opportunities: 'India is the pharmacy of the world. Growing demand for vaccine discovery, oncology formulations, and biosimilars.',
    salary_entry: '₹3.6 - 6 LPA',
    salary_mid: '₹7.5 - 15 LPA',
    salary_senior: '₹18 - 35+ LPA',
    growth_outlook: 'High',
    work_environment: 'Pharmaceutical R&D Labs, Hospitals, Clinical Trial Centers',
    top_recruiters: ['Sun Pharma', 'Dr. Reddy’s Laboratories', 'Cipla', 'Pfizer', 'Novartis', 'Biocon'],
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    category_id: 4,
    title: 'Civil Services Officer (IAS / IPS / IFS)',
    slug: 'civil-services-ias-ips',
    short_desc: 'Lead public administration, maintain law & order, formulate national policies, and govern districts.',
    full_desc: 'Indian Administrative Service (IAS) and Indian Police Service (IPS) officers manage district administration, national policy formulation, public revenue, and national security.',
    educational_qualifications: 'Graduation in any discipline (B.A., B.Sc., B.Tech, B.Com, MBBS, etc.). Must clear the prestigious UPSC Civil Services Examination (CSE - Prelims, Mains & Interview).',
    required_skills: ['Public Policy Analysis', 'Decision Making under Crisis', 'Ethical Leadership', 'Constitution & Governance', 'Empathy for Rural & Marginalized Citizens', 'Effective Communication'],
    job_roles: ['Sub-Divisional Magistrate (SDM)', 'District Collector / District Magistrate (DM)', 'Superintendent of Police (SP)', 'Joint Secretary to Govt. of India', 'Cabinet Secretary'],
    career_pathway: [
      { step: 1, title: 'Graduation & Broad General Studies', desc: 'Complete graduation while reading NCERTs, standard history, polity, economics, and daily newspapers.', duration: 'Graduation Years' },
      { step: 2, title: 'UPSC CSE Prelims & Mains Prep', desc: 'Prepare GS Papers 1 to 4, Essay, and chosen Optional Subject with rigorous answer-writing.', duration: '1 - 2 Years' },
      { step: 3, title: 'Personality Test & Selection', desc: 'Face UPSC interview board testing intellectual integrity, mental caliber, and critical judgment.', duration: 'Exam Year' },
      { step: 4, title: 'LBSNAA Mussoorie Training', desc: 'Undergo foundational and professional administrative training at the national academy.', duration: '1.5 Years' },
      { step: 5, title: 'District & National Governance', desc: 'Direct district administration and shape socio-economic growth of the country.', duration: 'Lifelong Service' }
    ],
    future_opportunities: 'Unmatched public impact, nation-building authority, job security, and leadership over government departments.',
    salary_entry: '₹7 - 12 LPA (7th Pay Commission + Perks)',
    salary_mid: '₹14 - 24 LPA + Allowances',
    salary_senior: '₹28 - 35 LPA (Apex Scale + Official Bungalow)',
    growth_outlook: 'High',
    work_environment: 'District Collectorates, Secretariats, Law Enforcement HQs',
    top_recruiters: ['Union Public Service Commission (Govt of India)', 'State Public Service Commissions (APSC, BPSC, etc.)'],
    image_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    category_id: 4,
    title: 'Probationary Officer (SBI / Public Sector Banks)',
    slug: 'banking-probationary-officer',
    short_desc: 'Manage banking operations, credit appraisal, loans, and corporate financial transactions.',
    full_desc: 'Bank Probationary Officers oversee customer credit lines, mortgage underwriting, trade finance, branch accounting, and digital banking services in major nationalized banks.',
    educational_qualifications: 'Graduation in any stream with minimum 55-60%. Clear IBPS PO or SBI PO entrance examinations.',
    required_skills: ['Quantitative Aptitude & Reasoning', 'Financial Literacy', 'Customer Relationship Management', 'Credit Risk Evaluation', 'Audit & Compliance'],
    job_roles: ['Probationary Officer', 'Assistant Branch Manager', 'Branch Manager', 'Chief Credit Officer', 'General Manager'],
    career_pathway: [
      { step: 1, title: 'Complete Graduation', desc: 'Bachelor degree in any stream while building strong quantitative math & English comprehension skills.', duration: 'College' },
      { step: 2, title: 'Crack SBI / IBPS PO Exam', desc: 'Prepare for Prelims (Aptitude, Reasoning, English) and Mains (Data Analysis, Banking Awareness).', duration: '6 - 12 Months' },
      { step: 3, title: 'Probation Period', desc: '2 years intensive rotational training across rural, semi-urban, and corporate banking branches.', duration: '2 Years' },
      { step: 4, title: 'Managerial Career Ladder', desc: 'Fast-track promotions through internal JAIIB / CAIIB banking certifications to Branch Manager and DGM.', duration: 'Career' }
    ],
    future_opportunities: 'High prestige, excellent loan perks, pension benefits, and mobility into private investment banks or fintech leadership.',
    salary_entry: '₹7 - 11 LPA + Housing Perks',
    salary_mid: '₹12 - 20 LPA',
    salary_senior: '₹22 - 35+ LPA',
    growth_outlook: 'High',
    work_environment: 'Bank Branches & Regional Financial HQs',
    top_recruiters: ['State Bank of India (SBI)', 'Punjab National Bank', 'Bank of Baroda', 'Reserve Bank of India (RBI Grade B)', 'NABARD'],
    image_url: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    category_id: 5,
    title: 'Product Manager (Tech & Digital Products)',
    slug: 'product-manager',
    short_desc: 'Sit at the intersection of business, technology, and user experience to launch beloved products.',
    full_desc: 'Product Managers define the product roadmap, translate market needs into functional software features, collaborate with engineers and designers, and drive revenue growth.',
    educational_qualifications: 'B.Tech / BBA / B.Des / BCA followed by MBA or demonstrable product execution track record.',
    required_skills: ['Product Roadmap Strategy', 'Data Analytics (SQL, Mixpanel)', 'User Research & Wireframing', 'Agile / Scrum Methodologies', 'Cross-functional Communication', 'Business Model Viability'],
    job_roles: ['Associate Product Manager (APM)', 'Product Manager', 'Senior PM', 'VP of Product', 'Chief Product Officer (CPO)'],
    career_pathway: [
      { step: 1, title: 'Engineering or Business Foundation', desc: 'Build fundamental understanding of how software gets built and how businesses generate revenue.', duration: 'College' },
      { step: 2, title: 'First Product Projects', desc: 'Launch side projects, write product requirement documents (PRDs), run user interviews.', duration: 'College Year 3 - 4' },
      { step: 3, title: 'APM Program / Business School', desc: 'Join top APM programs (Google, Uber, Flipkart) or earn MBA from premier institutions (IIMs, ISB).', duration: 'Years 1 - 2' },
      { step: 4, title: 'Lead Product Suites', desc: 'Drive key metrics: retention, activation, and multi-million dollar revenue pipelines.', duration: '5+ Years' }
    ],
    future_opportunities: 'One of the most lucrative and influential roles in modern industry, directly preparing professionals for CEO roles.',
    salary_entry: '₹10 - 20 LPA',
    salary_mid: '₹22 - 45 LPA',
    salary_senior: '₹50 - 100+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Tech Hubs & Modern Innovation Campuses',
    top_recruiters: ['Google', 'Microsoft', 'Uber', 'Zomato', 'Blinkit', 'MakeMyTrip', 'Razorpay', 'CRED'],
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    category_id: 5,
    title: 'Human Resource (HR) & People Operations Lead',
    slug: 'hr-people-operations-manager',
    short_desc: 'Attract premier talent, nurture employee culture, resolve disputes, and scale organizational teams.',
    full_desc: 'HR Leaders design recruitment strategies, craft fair compensation and employee benefit packages, lead leadership training, and build high-performance workplace cultures.',
    educational_qualifications: 'Bachelor degree in any stream; MBA in HR / Master in Personnel Management (from XLRI, TISS, IIMs).',
    required_skills: ['Talent Acquisition & Interviewing', 'Organizational Psychology', 'Labor Laws & POSH Compliance', 'Compensation & Benefits (Comp & Ben)', 'Conflict Resolution'],
    job_roles: ['Talent Acquisition Specialist', 'HR Business Partner (HRBP)', 'People Operations Manager', 'Chief Human Resources Officer (CHRO)'],
    career_pathway: [
      { step: 1, title: 'Bachelor Degree & Communication Focus', desc: 'Develop strong interpersonal psychology and public speaking skills.', duration: 'Undergrad' },
      { step: 2, title: 'Master in Human Resources (MBA)', desc: 'Specialize in HR management, industrial relations, and performance appraisals.', duration: '2 Years' },
      { step: 3, title: 'HR Generalist / Recruiter Experience', desc: 'Source top engineers and managers, conduct cultural alignment interviews.', duration: 'Years 1 - 3' },
      { step: 4, title: 'Strategic HRBP & People Leadership', desc: 'Direct enterprise talent policies, retention drives, and diversity programs.', duration: '5+ Years' }
    ],
    future_opportunities: 'Organizations are investing heavily in employee retention, remote work culture, and AI-enabled talent analytics.',
    salary_entry: '₹4.5 - 8 LPA',
    salary_mid: '₹10 - 20 LPA',
    salary_senior: '₹25 - 55+ LPA',
    growth_outlook: 'High',
    work_environment: 'Corporate Offices / Multinational Hubs',
    top_recruiters: ['Deloitte', 'Amazon', 'McKinsey & Co', 'Hindustan Unilever', 'Tata Consultancy Services', 'ITC'],
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    category_id: 6,
    title: 'Chartered Accountant (CA)',
    slug: 'chartered-accountant',
    short_desc: 'Master corporate taxation, statutory audits, financial forensics, and enterprise financial compliance.',
    full_desc: 'Chartered Accountants are the financial guardians of corporations, auditing public balance sheets, minimizing corporate tax liabilities ethically, and counseling on mergers and capital raising.',
    educational_qualifications: '10+2 (Commerce preferred, but any stream eligible). Register with ICAI and clear CA Foundation, CA Intermediate, 2 years Articleship training, and CA Final.',
    required_skills: ['Direct & Indirect Taxation (GST)', 'Statutory Auditing Standards', 'Financial Accounting (Ind AS / IFRS)', 'Corporate Law', 'Financial Analysis & Valuations'],
    job_roles: ['Statutory Auditor', 'Tax Consultant', 'Internal Auditor', 'Forensic Auditor', 'Chief Financial Officer (CFO)'],
    career_pathway: [
      { step: 1, title: 'CA Foundation Exam', desc: 'Appear after 10+2; covers principles of accounting, business laws, and quantitative aptitude.', duration: 'Months 1 - 9' },
      { step: 2, title: 'CA Intermediate & IT Training', desc: '8 comprehensive papers on corporate accounting, taxation, auditing, and cost management.', duration: '1 Year' },
      { step: 3, title: 'Articleship Practical Training', desc: 'Mandatory 2 years hands-on auditing experience with an active CA firm or Big 4.', duration: '2 Years' },
      { step: 4, title: 'CA Final Examination', desc: 'Clear the ultimate milestone of advanced financial reporting, strategic finance, and tax laws.', duration: '6 Months' },
      { step: 5, title: 'ICAI Membership & Practice', desc: 'Start independent practice or join top accounting firms and multinational enterprises.', duration: 'Lifelong' }
    ],
    future_opportunities: 'Statutory monopoly over company audit signing in India; supreme respect and evergreen high earning potential.',
    salary_entry: '₹8 - 14 LPA',
    salary_mid: '₹16 - 30 LPA',
    salary_senior: '₹35 - 75+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Audit Firms, Corporate Headquarters, Autonomous Practice',
    top_recruiters: ['Big 4 (PwC, EY, Deloitte, KPMG)', 'Grant Thornton', 'BDO', 'Tata Sons', 'Reliance Industries', 'HDFC Bank'],
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 13,
    category_id: 6,
    title: 'Investment Banker & Financial Analyst',
    slug: 'investment-banker-financial-analyst',
    short_desc: 'Facilitate billion-dollar IPOs, corporate mergers, debt syndication, and private equity investments.',
    full_desc: 'Investment Bankers advise corporate clients and institutional investors on capital raising, initial public offerings (IPOs), acquisitions, leveraged buyouts, and valuation models.',
    educational_qualifications: 'B.Com / BBA / B.Tech / Economics Honors followed by MBA in Finance (IIMs/ISB) or CFA (Chartered Financial Analyst) charter.',
    required_skills: ['Financial Modeling & DCF Valuation', 'Mergers & Acquisitions (M&A)', 'Pitch Deck Preparation', 'Bloomberg Terminal & Excel Mastery', 'Due Diligence'],
    job_roles: ['Investment Banking Analyst', 'Associate', 'Vice President (VP)', 'Managing Director (MD)'],
    career_pathway: [
      { step: 1, title: 'Strong Quantitative & Economics Base', desc: 'Build deep expertise in financial statement analysis, corporate balance sheets, and macroeconomic indicators.', duration: 'College' },
      { step: 2, title: 'CFA Level 1 & Financial Modeling', desc: 'Master discounted cash flow models, comparable company analysis, and LBO models in Excel.', duration: 'College Year 3' },
      { step: 3, title: 'Top Tier MBA (Finance)', desc: 'Graduate from premier business schools to enter campus investment banking recruitment pools.', duration: '2 Years' },
      { step: 4, title: 'Deal Making & Syndication', desc: 'Execute landmark cross-border mergers, IPO listings, and venture equity raises.', duration: 'Career' }
    ],
    future_opportunities: 'Premier high-compensation career with substantial performance bonuses and entry into Private Equity and Hedge Funds.',
    salary_entry: '₹12 - 25 LPA',
    salary_mid: '₹30 - 60 LPA',
    salary_senior: '₹70 - 150+ LPA (plus deal bonuses)',
    growth_outlook: 'High',
    work_environment: 'Global Financial Hubs (Mumbai, London, New York)',
    top_recruiters: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Kotak Investment Banking', 'Axis Capital', 'Avendus'],
    image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 14,
    category_id: 7,
    title: 'Assistant Professor / University Lecturer',
    slug: 'assistant-professor-lecturer',
    short_desc: 'Teach undergraduate and postgraduate scholars, author academic papers, and conduct pioneering research.',
    full_desc: 'College Professors and University Lecturers inspire the next generation of scholars, deliver university courses, guide PhD theses, publish research in peer-reviewed journals, and advance human knowledge.',
    educational_qualifications: 'Post-Graduation (Master degree with 55%+) in relevant discipline. Clear UGC-NET / CSIR-NET (or SLET) and ideally obtain a Ph.D. for permanent professorship.',
    required_skills: ['Subject Matter Mastery', 'Curriculum Design', 'Academic Research & Citation Methodology', 'Classroom Pedagogy & Mentoring', 'Public Speaking'],
    job_roles: ['Assistant Professor', 'Associate Professor', 'Professor', 'Head of Department (HOD)', 'Dean / Vice Chancellor'],
    career_pathway: [
      { step: 1, title: 'Master Degree with Distinction', desc: 'Pursue M.Sc, M.A., M.Com, or M.Tech with consistent academic excellence.', duration: '2 Years' },
      { step: 2, title: 'Clear UGC-NET / JRF', desc: 'Qualify National Eligibility Test with Junior Research Fellowship (JRF) for funded doctoral study.', duration: 'Post-PG' },
      { step: 3, title: 'Doctor of Philosophy (Ph.D.)', desc: 'Conduct 3-5 years original thesis research and publish papers in indexed international journals.', duration: '3 - 5 Years' },
      { step: 4, title: 'College / University Appointment', desc: 'Join autonomous colleges or universities under UGC 7th pay matrix with tenure track.', duration: 'Career' }
    ],
    future_opportunities: 'Intellectually fulfilling, autonomous schedule, prestigious societal standing, and international research sabbatical opportunities.',
    salary_entry: '₹7 - 12 LPA (UGC 7th Pay Level 10)',
    salary_mid: '₹14 - 22 LPA (Level 12 - 13A)',
    salary_senior: '₹24 - 36 LPA (Level 14 Professor)',
    growth_outlook: 'High',
    work_environment: 'Colleges, Autonomous Institutes & Central Universities',
    top_recruiters: ['Central Universities (DU, JNU, BHU)', 'State Universities', 'IITs & NITs', 'Autonomous & Premier Colleges'],
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 15,
    category_id: 8,
    title: 'UI/UX & Product Designer',
    slug: 'ui-ux-designer',
    short_desc: 'Design beautiful, intuitive interfaces, user journeys, design systems, and mobile apps.',
    full_desc: 'UI/UX Designers solve user friction through empathetic research, design interactive wireframes and micro-animations, and construct comprehensive design systems in Figma.',
    educational_qualifications: 'Bachelor of Design (B.Des), B.Arch, Fine Arts, BCA, or any graduate with a stellar digital portfolio.',
    required_skills: ['Figma Mastery', 'User Empathy & Qualitative Research', 'Information Architecture & Wireframing', 'Color Theory & Typography', 'Prototyping & Micro-interactions', 'Design Systems'],
    job_roles: ['UX Researcher', 'UI Designer', 'Product Designer', 'Design Systems Lead', 'Head of Design'],
    career_pathway: [
      { step: 1, title: 'Visual & Design Fundamentals', desc: 'Learn layout grids, visual hierarchy, typography, contrast, and color palettes.', duration: 'Year 1' },
      { step: 2, title: 'Figma & User Experience Flow', desc: 'Build end-to-end mobile and desktop case studies solving genuine user problems.', duration: 'College Year 2 - 3' },
      { step: 3, title: 'Portfolio Creation & Critique', desc: 'Showcase 3 in-depth case studies with wireframes, user testing data, and interactive prototypes.', duration: 'Final Year' },
      { step: 4, title: 'Lead Product Design', desc: 'Shape the aesthetic identity and usability of digital products for millions of daily active users.', duration: 'Career' }
    ],
    future_opportunities: 'High demand as every business requires refined consumer-grade applications. Designers who understand AI workflows are in massive demand.',
    salary_entry: '₹5 - 10 LPA',
    salary_mid: '₹12 - 25 LPA',
    salary_senior: '₹28 - 55+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Creative Studios, Tech Companies, Remote',
    top_recruiters: ['CRED', 'Swiggy', 'Zomato', 'Microsoft', 'Google', 'Urban Company', 'Design Agencies'],
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 16,
    category_id: 8,
    title: 'Graphic Designer & Visual Brand Identity Lead',
    slug: 'graphic-designer-brand-identity',
    short_desc: 'Craft striking logos, brand identity guidelines, marketing campaigns, and visual storytelling.',
    full_desc: 'Graphic Designers conceptualize visual branding that communicates corporate personality across advertising billboards, packaging, social media, and digital banners.',
    educational_qualifications: 'B.Des in Visual Communication, B.A. in Fine Arts, or self-taught with professional design portfolio.',
    required_skills: ['Adobe Illustrator & Photoshop', 'Brand Identity Systems', 'Typography & Vector Art', 'Packaging Design', 'Motion Graphics (After Effects)'],
    job_roles: ['Graphic Designer', 'Brand Visualizer', 'Art Director', 'Creative Director'],
    career_pathway: [
      { step: 1, title: 'Fine Arts & Vector Design', desc: 'Learn visual compositions, color theory, and pen tool mastery in Adobe Illustrator.', duration: 'Early Stage' },
      { step: 2, title: 'Brand Identity Case Studies', desc: 'Design full brand packages: logo variations, typography hierarchies, stationery, and packaging.', duration: 'Year 2' },
      { step: 3, title: 'Agency / Studio Experience', desc: 'Work with advertising agencies and brand marketing teams on commercial client briefs.', duration: 'Years 1 - 3' },
      { step: 4, title: 'Art Direction', desc: 'Direct multi-channel campaigns, supervise photo shoots, and establish brand guidelines.', duration: 'Senior' }
    ],
    future_opportunities: 'Brand differentiation is more vital than ever in saturated digital markets. Abundant opportunities for freelance and global agency work.',
    salary_entry: '₹3.6 - 7 LPA',
    salary_mid: '₹8 - 16 LPA',
    salary_senior: '₹18 - 35+ LPA',
    growth_outlook: 'High',
    work_environment: 'Advertising Agencies, Creative Studios, Freelance',
    top_recruiters: ['Ogilvy', 'Dentsu', 'WPP', 'McCann', 'Swiggy Studio', 'Red Bull', 'Boutique Creative Agencies'],
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 17,
    category_id: 9,
    title: 'Digital Content Strategist & Video Producer',
    slug: 'digital-content-strategist',
    short_desc: 'Produce viral video content, manage multi-channel digital media, and architect brand narratives.',
    full_desc: 'Content Strategists script, produce, and optimize multimedia content across YouTube, podcasts, LinkedIn, and streaming platforms to captivate global audiences and drive cultural conversations.',
    educational_qualifications: 'Bachelor degree in Journalism & Mass Communication (BJMC), English Literature, or Visual Arts.',
    required_skills: ['Video Editing (Premiere Pro, DaVinci Resolve)', 'Scriptwriting & Story Hooking', 'SEO & Audience Analytics', 'Social Media Algorithms', 'Podcast Production'],
    job_roles: ['Content Creator', 'Video Producer', 'Social Media Strategist', 'Head of Content', 'Creative Producer'],
    career_pathway: [
      { step: 1, title: 'Writing & Video Basics', desc: 'Master visual editing tools, camera lighting, sound engineering, and persuasive writing.', duration: 'Year 1' },
      { step: 2, title: 'Launch Autonomous Channels', desc: 'Build personal digital media channels to test algorithmic reach and audience engagement.', duration: 'College' },
      { step: 3, title: 'Join Media Houses / Creator Studios', desc: 'Produce high-retention documentaries, educational essays, or brand podcast series.', duration: 'Years 1 - 3' },
      { step: 4, title: 'Executive Content Direction', desc: 'Manage million-subscriber media networks and global sponsored creator partnerships.', duration: 'Senior' }
    ],
    future_opportunities: 'The creator economy is projected to surpass half a trillion dollars globally by 2027.',
    salary_entry: '₹4 - 7 LPA',
    salary_mid: '₹9 - 18 LPA',
    salary_senior: '₹20 - 45+ LPA',
    growth_outlook: 'High',
    work_environment: 'Production Studios, Media Houses, Remote / Studio',
    top_recruiters: ['Netflix India', 'The Quint', 'Brut India', 'Pocket Aces', 'Media.net', 'Independent Creator Networks'],
    image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 18,
    category_id: 10,
    title: 'Research Scientist (Biotechnology & Genetics)',
    slug: 'biotechnology-research-scientist',
    short_desc: 'Engineer gene-editing therapies (CRISPR), discover biopharmaceuticals, and study cellular organisms.',
    full_desc: 'Biotechnology scientists investigate molecular genetics, engineer microorganisms for medical treatments, develop bio-fertilizers, and discover vaccines against emerging pathogens.',
    educational_qualifications: '10+2 with PCB. B.Sc in Biotechnology / Biochemistry followed by M.Sc and Ph.D. in Molecular Biology or Genetic Engineering.',
    required_skills: ['CRISPR & Gene Cloning', 'Bioinformatics & Python (Biopython)', 'Spectroscopy & Chromatography', 'Mammalian Cell Culture', 'Data Statistical Modeling'],
    job_roles: ['Junior Research Fellow (JRF)', 'Scientist B / C', 'Bioinformatics Specialist', 'Principal Investigator (PI)', 'Director of Biotechnology'],
    career_pathway: [
      { step: 1, title: 'Bachelor in Life Sciences / Biotech', desc: 'Master molecular genetics, microbiology, and biochemical assays in wet laboratories.', duration: '3 - 4 Years' },
      { step: 2, title: 'M.Sc & National Fellowships', desc: 'Clear GATE / CSIR-JRF for fully funded master and doctoral research in premier labs.', duration: '2 Years' },
      { step: 3, title: 'Doctoral (Ph.D.) Research', desc: 'Conduct cutting-edge research in genomics, oncology, or agricultural biotechnology.', duration: '4 - 5 Years' },
      { step: 4, title: 'Post-Doctoral Fellowship & Lead Scientist', desc: 'Direct international lab research groups and invent novel biotechnological patents.', duration: 'Career' }
    ],
    future_opportunities: 'Synthetic biology, personalized gene therapy, and bio-manufacturing are set to transform global medicine and sustainability.',
    salary_entry: '₹5 - 9 LPA',
    salary_mid: '₹12 - 22 LPA',
    salary_senior: '₹25 - 50+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Biosafety Labs (BSL-2/3), Research Institutes, Genomics Centers',
    top_recruiters: ['CSIR Laboratories', 'ICMR', 'Biocon', 'Serum Institute of India', 'Syngene International', 'AstraZeneca'],
    image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 19,
    category_id: 10,
    title: 'Data Scientist & Statistical Modeler',
    slug: 'data-scientist',
    short_desc: 'Mine petabytes of enterprise data, build predictive statistical models, and uncover actionable insights.',
    full_desc: 'Data Scientists convert unstructured raw data into strategic intelligence using statistical hypothesis testing, machine learning pipelines, econometric models, and interactive visualizations.',
    educational_qualifications: '10+2 with Math/Stats. B.Tech / B.Sc Statistics / Mathematics / Economics followed by M.Sc or Data Science degree.',
    required_skills: ['Python & R', 'SQL Querying & Neon Database', 'Statistical Inference & Hypothesis Testing', 'Machine Learning Algorithms', 'Tableau / PowerBI', 'A/B Experimentation'],
    job_roles: ['Data Analyst', 'Data Scientist', 'Lead Statistical Modeler', 'Head of Analytics', 'Chief Data Officer'],
    career_pathway: [
      { step: 1, title: 'Math, Probability & Coding', desc: 'Build solid fundamentals in probability distributions, Bayesian inference, and Python.', duration: 'College Year 1 - 2' },
      { step: 2, title: 'Data Cleaning & SQL Mastery', desc: 'Extract, clean, and model complex relational data schemas with PostgreSQL and Pandas.', duration: 'College Year 3' },
      { step: 3, title: 'End-to-End Machine Learning Projects', desc: 'Predict customer churn, credit default, or medical diagnostics with verified metrics.', duration: 'College Year 4' },
      { step: 4, title: 'Enterprise Data Science', desc: 'Run large-scale A/B experiments and design production forecasting models.', duration: 'Senior' }
    ],
    future_opportunities: 'Every data-driven company requires top analytical minds to optimize margins, operations, and algorithmic personalization.',
    salary_entry: '₹6 - 13 LPA',
    salary_mid: '₹15 - 28 LPA',
    salary_senior: '₹32 - 65+ LPA',
    growth_outlook: 'Very High',
    work_environment: 'Corporate Tech Campuses & Remote Analytics Centers',
    top_recruiters: ['Amazon', 'Mu Sigma', 'Fractal', 'Walmart Global Tech', 'Tiger Analytics', 'J.P. Morgan'],
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 20,
    category_id: 2,
    title: 'Aerospace & Aeronautical Engineer',
    slug: 'aerospace-engineer',
    short_desc: 'Design supersonic aircraft, orbital launch rockets, satellite payloads, and propulsion systems.',
    full_desc: 'Aerospace Engineers design flight vehicles ranging from commercial airliners to military fighter jets and interplanetary spacecraft, analyzing aerodynamics, avionics, and thermodynamics.',
    educational_qualifications: '10+2 with PCM. B.Tech in Aerospace or Aeronautical Engineering (IIT Bombay, IIT Madras, IIST, etc.).',
    required_skills: ['Aerodynamics & CFD (Computational Fluid Dynamics)', 'Orbital Mechanics', 'Avionics & Flight Controls', 'MATLAB & Simulink', 'Propulsion & Combustion Analysis'],
    job_roles: ['Aerodynamicist', 'Flight Test Engineer', 'Avionics Specialist', 'Spacecraft Systems Lead'],
    career_pathway: [
      { step: 1, title: '10+2 with Exceptional Physics & Math', desc: 'Master Newtonian mechanics, fluid flow concepts, and calculus.', duration: 'School' },
      { step: 2, title: 'Aerospace Engineering Degree', desc: 'Study flight dynamics, rocket propulsion, compressible flow, and satellite bus architectures.', duration: '4 Years' },
      { step: 3, title: 'ISRO / DRDO / Aviation Internships', desc: 'Work on actual wind tunnel experiments and aerodynamic flight simulators.', duration: 'College' },
      { step: 4, title: 'Launch Vehicle & Defense Engineering', desc: 'Design satellite constellations, commercial aircraft, or military defense platforms.', duration: 'Career' }
    ],
    future_opportunities: 'Rapid privatization of space launch (SpaceX, Skyroot, Agnikul) and booming defense aerospace procurement.',
    salary_entry: '₹6 - 11 LPA',
    salary_mid: '₹14 - 26 LPA',
    salary_senior: '₹30 - 60+ LPA',
    growth_outlook: 'High',
    work_environment: 'Space Research Centers, Wind Tunnels, Aerospace Manufacturing',
    top_recruiters: ['ISRO', 'DRDO', 'HAL (Hindustan Aeronautics Limited)', 'Boeing', 'Airbus', 'Skyroot Aerospace'],
    image_url: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialCourses = [
  {
    id: 1,
    title: 'Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)',
    degree_type: 'Bachelor Degree',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (minimum 60-75% aggregate).',
    entrance_exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CETs (Assam CEE, WBJEE)'],
    top_colleges: ['IIT Bombay', 'IIT Delhi', 'IIT Guwahati', 'NIT Silchar', 'BITS Pilani', 'IIIT Hyderabad'],
    description: 'Premier undergraduate degree providing deep computational theory, programming languages, system architecture, database management, cloud systems, and AI.',
    category_name: 'Information Technology'
  },
  {
    id: 2,
    title: 'Bachelor of Computer Applications (BCA)',
    degree_type: 'Bachelor Degree',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in any stream (Science/Arts/Commerce) with Mathematics or Computer Applications preferred.',
    entrance_exams: ['CUET-UG', 'College-level merit admission', 'IPU CET'],
    top_colleges: ['Christ University Bangalore', 'St. Xavier\'s College', 'Loyola College Chennai', 'Symbiosis Pune'],
    description: 'Focuses on application software development, database design, web technologies, software engineering, and industry-oriented practical programming.',
    category_name: 'Information Technology'
  },
  {
    id: 3,
    title: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    degree_type: 'Bachelor Degree',
    duration: '5.5 Years (including 1 Year Internship)',
    eligibility: '10+2 with Physics, Chemistry & Biology with minimum 50% marks in PCB.',
    entrance_exams: ['NEET-UG (National Eligibility cum Entrance Test)'],
    top_colleges: ['AIIMS New Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'Gauhati Medical College', 'Assam Medical College Dibrugarh'],
    description: 'The fundamental medical qualification required to practice clinical medicine, surgery, and human pathology in India and worldwide.',
    category_name: 'Medical and Healthcare'
  },
  {
    id: 4,
    title: 'Chartered Accountancy (ICAI Course)',
    degree_type: 'Professional Certification',
    duration: '3.5 - 4.5 Years',
    eligibility: 'Can register for Foundation after Class 10/12, or Direct Entry after Graduation with 55-60%.',
    entrance_exams: ['CA Foundation', 'CA Intermediate', 'CA Final (administered by ICAI)'],
    top_colleges: ['The Institute of Chartered Accountants of India (ICAI Chapters Worldwide)'],
    description: 'Gold-standard certification for auditing, statutory financial management, Indian corporate tax law, GST, and international accounting standards.',
    category_name: 'Finance and Banking'
  },
  {
    id: 5,
    title: 'Bachelor of Design (B.Des in UI/UX & Visual Communication)',
    degree_type: 'Bachelor Degree',
    duration: '4 Years',
    eligibility: '10+2 in any stream (Science, Commerce, Arts) with creative aptitude.',
    entrance_exams: ['UCEED (IIT Bombay)', 'NID DAT', 'NIFT Entrance', 'SEAT'],
    top_colleges: ['NID Ahmedabad', 'IDC IIT Bombay', 'Dod IIT Guwahati', 'Srishti Institute of Art & Design'],
    description: 'Covers user-centric product design, ergonomics, typography, digital prototyping, visual storytelling, and design thinking methodologies.',
    category_name: 'Design and Creative Fields'
  },
  {
    id: 6,
    title: 'Bachelor of Business Administration (BBA) / Integrated MBA',
    degree_type: 'Bachelor Degree',
    duration: '3 Years (or 5 Years Integrated IPM)',
    eligibility: '10+2 in any stream with minimum 50-60%.',
    entrance_exams: ['IPMAT (IIM Indore/Rohtak)', 'CUET-UG', 'SET', 'NPAT'],
    top_colleges: ['IIM Indore (IPM)', 'Shaheed Sukhdev College of Business Studies (DU)', 'NMIMS Mumbai', 'Christ University'],
    description: 'Comprehensive business training covering financial accounting, marketing dynamics, organizational behavior, business analytics, and strategic management.',
    category_name: 'Business and Management'
  },
  {
    id: 7,
    title: 'UPSC Civil Services Foundation & Integrated Studies',
    degree_type: 'Competitive Examination Track',
    duration: '1 - 2 Years Preparation alongside/after Graduation',
    eligibility: 'Graduate in any recognized discipline (minimum age 21).',
    entrance_exams: ['UPSC Civil Services Examination (Prelims, Mains, Interview)'],
    top_colleges: ['LBSNAA Mussoorie (Post-selection National Academy)'],
    description: 'Rigorous national curriculum testing broad understanding of Indian polity, constitution, economic development, world history, ethics, and administrative aptitude.',
    category_name: 'Government Services'
  },
  {
    id: 8,
    title: 'B.Sc / M.Sc in Biotechnology & Genetic Sciences',
    degree_type: 'Bachelor / Master Degree',
    duration: '3 Years (B.Sc) + 2 Years (M.Sc)',
    eligibility: '10+2 with Biology & Chemistry.',
    entrance_exams: ['CUET-UG', 'GAT-B', 'IIT-JAM (for M.Sc at IITs)'],
    top_colleges: ['Jawaharlal Nehru University (JNU)', 'University of Delhi', 'Tezpur University', 'IISc Bangalore'],
    description: 'In-depth molecular biology, recombinant DNA technology, cell culture, fermentation, enzyme kinetics, and genomics for research and industry.',
    category_name: 'Science and Research'
  }
];

export const assessmentQuestions = [
  {
    id: 1,
    question: 'When faced with a complex new challenge, what is your natural first instinct?',
    category: 'Problem Solving Style',
    options: [
      {
        text: 'Break it down into logical steps, write code or design an algorithm to automate it.',
        traits: { 'Information Technology': 3, 'Science and Research': 2, 'Engineering': 1 }
      },
      {
        text: 'Inspect the physical mechanics, understand how moving parts interact, and build a structural prototype.',
        traits: { 'Engineering': 3, 'Information Technology': 1, 'Science and Research': 1 }
      },
      {
        text: 'Brainstorm how it impacts human lives and health, finding a compassionate solution.',
        traits: { 'Medical and Healthcare': 3, 'Education and Teaching': 2 }
      },
      {
        text: 'Visualize how it looks aesthetically, sketch wireframes or design an artistic layout.',
        traits: { 'Design and Creative Fields': 3, 'Media and Communication': 2 }
      }
    ]
  },
  {
    id: 2,
    question: 'Which of the following topics would you most enjoy reading about in your leisure time?',
    category: 'Curiosity & Interests',
    options: [
      {
        text: 'Artificial Intelligence, software breakthroughs, cybersecurity, and emerging tech.',
        traits: { 'Information Technology': 3, 'Science and Research': 1 }
      },
      {
        text: 'Stock market trends, company valuations, cryptocurrency, and financial investments.',
        traits: { 'Finance and Banking': 3, 'Business and Management': 2 }
      },
      {
        text: 'Government policies, international diplomacy, defense strategy, and public governance.',
        traits: { 'Government Services': 3, 'Media and Communication': 1 }
      },
      {
        text: 'Biomedical discoveries, brain neuroscience, surgeries, and longevity research.',
        traits: { 'Medical and Healthcare': 3, 'Science and Research': 2 }
      }
    ]
  },
  {
    id: 3,
    question: 'What type of daily work environment energizes you the most?',
    category: 'Work Environment',
    options: [
      {
        text: 'A modern dual-monitor desk setup with fast internet, collaborating with tech teams.',
        traits: { 'Information Technology': 3, 'Design and Creative Fields': 2 }
      },
      {
        text: 'An active clinical hospital or medical center saving lives and examining patients.',
        traits: { 'Medical and Healthcare': 3 }
      },
      {
        text: 'A high-impact administrative office resolving public grievances and directing district projects.',
        traits: { 'Government Services': 3, 'Business and Management': 1 }
      },
      {
        text: 'A university campus, lecture hall, or school library guiding young minds and researching.',
        traits: { 'Education and Teaching': 3, 'Science and Research': 2 }
      }
    ]
  },
  {
    id: 4,
    question: 'In a group project, which role do you naturally assume?',
    category: 'Team Dynamics & Leadership',
    options: [
      {
        text: 'The Team Leader / Product Lead: Setting goals, allocating budget, and keeping everyone aligned.',
        traits: { 'Business and Management': 3, 'Government Services': 2 }
      },
      {
        text: 'The Technical Architect: Writing the core logic, fixing bugs, and ensuring system stability.',
        traits: { 'Information Technology': 3, 'Engineering': 2 }
      },
      {
        text: 'The Creative Storyteller: Producing the pitch deck, visual branding, and video presentation.',
        traits: { 'Design and Creative Fields': 3, 'Media and Communication': 3 }
      },
      {
        text: 'The Researcher / Analyst: Fact-checking data, digging into papers, and verifying accuracy.',
        traits: { 'Science and Research': 3, 'Finance and Banking': 2 }
      }
    ]
  },
  {
    id: 5,
    question: 'How do you prefer to handle numbers and mathematics?',
    category: 'Quantitative Orientation',
    options: [
      {
        text: 'I love balance sheets, profit & loss, calculating taxes, and analyzing ROI.',
        traits: { 'Finance and Banking': 3, 'Business and Management': 2 }
      },
      {
        text: 'I like discrete mathematics, boolean logic, graph theory, and algorithmic complexity.',
        traits: { 'Information Technology': 3, 'Science and Research': 2 }
      },
      {
        text: 'I prefer physics calculations: torque, fluid mechanics, stress analysis, and structural loads.',
        traits: { 'Engineering': 3, 'Science and Research': 1 }
      },
      {
        text: 'I prefer qualitative ideas, human stories, emotions, and creative visual arts over heavy math.',
        traits: { 'Design and Creative Fields': 2, 'Media and Communication': 3, 'Education and Teaching': 1 }
      }
    ]
  },
  {
    id: 6,
    question: 'What is your primary motivation for your future career?',
    category: 'Life Aspirations',
    options: [
      {
        text: 'High earning potential, global remote mobility, and building next-generation digital products.',
        traits: { 'Information Technology': 3, 'Business and Management': 2, 'Finance and Banking': 2 }
      },
      {
        text: 'Direct societal respect, administrative authority, and serving the nation’s citizens.',
        traits: { 'Government Services': 3, 'Medical and Healthcare': 2 }
      },
      {
        text: 'Pushing the frontiers of human discovery through scientific experiments and papers.',
        traits: { 'Science and Research': 3, 'Education and Teaching': 2 }
      },
      {
        text: 'Creative freedom, self-expression, and seeing your artistic designs admired by people.',
        traits: { 'Design and Creative Fields': 3, 'Media and Communication': 2 }
      }
    ]
  },
  {
    id: 7,
    question: 'Which school or college subject did you find most engaging?',
    category: 'Academic Affinity',
    options: [
      {
        text: 'Computer Science, Information Technology, or Coding.',
        traits: { 'Information Technology': 3 }
      },
      {
        text: 'Biology, Human Physiology, and Anatomy.',
        traits: { 'Medical and Healthcare': 3, 'Science and Research': 2 }
      },
      {
        text: 'Economics, Accountancy, and Commerce.',
        traits: { 'Finance and Banking': 3, 'Business and Management': 2 }
      },
      {
        text: 'History, Political Science, Civics, and Social Studies.',
        traits: { 'Government Services': 3, 'Education and Teaching': 2, 'Media and Communication': 2 }
      }
    ]
  },
  {
    id: 8,
    question: 'How do you feel about public speaking and communicating with broad audiences?',
    category: 'Communication Style',
    options: [
      {
        text: 'I thrive in front of crowds, presenting news stories, hosting podcasts, or moderating debates.',
        traits: { 'Media and Communication': 3, 'Education and Teaching': 2 }
      },
      {
        text: 'I enjoy teaching concepts patiently one-on-one or to a classroom of eager students.',
        traits: { 'Education and Teaching': 3, 'Medical and Healthcare': 1 }
      },
      {
        text: 'I prefer communicating through well-crafted business reports, data dashboards, or clear email.',
        traits: { 'Business and Management': 2, 'Finance and Banking': 2 }
      },
      {
        text: 'I prefer letting my code, technical designs, or laboratory results speak for themselves.',
        traits: { 'Information Technology': 2, 'Science and Research': 2, 'Engineering': 2 }
      }
    ]
  }
];


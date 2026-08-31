export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('./')) return path;
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `./${cleanPath}`;
};

export const personalInfo = {
  name: "Karthikeyan S",
  title: "Full Stack Developer · B.Tech IT, 3rd Year",
  roleTagline: "Full Stack Developer | B.Tech IT Student | Java & React Developer",
  educationShort: "B.Tech Information Technology (2024 – 2028) · Currently in 3rd Year",
  institution: "Karpagam College of Engineering",
  location: "Coimbatore, Tamil Nadu",
  phone: "+91 9360536215",
  avatar: getAssetUrl("/assets/karthikeyan_profile.jpg"),
  resumePath: getAssetUrl("/assets/resume.pdf"),
  status: "OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES",
  
  description: "Motivated 3rd-year B.Tech IT student passionate about building scalable web applications using React.js and Spring Boot, with a solid foundation in Data Structures & Algorithms, Java, and C/C++. Actively upskilling in Salesforce as a specialization alongside full-stack development.",
  
  aboutShort: "Motivated 3rd-year B.Tech Information Technology student at Karpagam College of Engineering, currently enrolled in the Full Stack Developer placement batch, focusing on React.js, Spring Boot, Java, and Data Structures & Algorithms, with an upcoming specialization in Salesforce.",

  socialLinks: {
    github: "https://github.com/Karthi-2007",
    leetcode: "https://leetcode.com/u/AfgkZ9Jo50/",
    linkedin: "https://www.linkedin.com/in/karthikeyan-s-293542372/",
    email: "Karthikeyanrks2007@gmail.com"
  }
};

export const verifiedStats = [
  { label: "GitHub Repositories", value: "18", sub: "Public Code Projects", url: "https://github.com/Karthi-2007" },
  { label: "LeetCode Solved", value: "143", sub: "Verified Solved Problems", url: "https://leetcode.com/u/AfgkZ9Jo50/" },
  { label: "Java Problems", value: "98", sub: "Primary Language Focus", url: "https://leetcode.com/u/AfgkZ9Jo50/" }
];

export const aboutHighlights = [
  { label: "Education", title: "B.Tech IT (3rd Year)", detail: "2024–2028 · Karpagam College of Eng." },
  { label: "Placement Track", title: "Full Stack Developer", detail: "Full Stack Developer Track" },
  { label: "Backend Stack", title: "Java + Spring Boot", detail: "REST APIs & Database Management" },
  { label: "Frontend Stack", title: "React.js", detail: "Modern Responsive UI Development" },
  { label: "Specialization", title: "Salesforce", detail: "Upcoming Post End-Sem Specialization" },
  { label: "Problem Solving", title: "DSA & Algorithmic OOP", detail: "143+ Verified LeetCode Solved" }
];

export const techSkills = [
  {
    category: "Programming",
    items: [
      { name: "Java", level: "Primary" },
      { name: "C & C++", level: "Core OOP & DSA" },
      { name: "JavaScript", level: "Core Web" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React.js", level: "Framework" },
      { name: "HTML5 / CSS3", level: "Responsive Markup" },
      { name: "Vanilla JavaScript", level: "ES6+" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Spring Boot", level: "Enterprise Framework" },
      { name: "REST APIs", level: "Backend Services" },
      { name: "Node.js Basics", level: "Runtime" }
    ]
  },
  {
    category: "Database & Tools",
    items: [
      { name: "MySQL", level: "Relational DB" },
      { name: "Git & GitHub", level: "Version Control" },
      { name: "Postman", level: "API Testing" },
      { name: "VS Code", level: "Primary IDE" }
    ]
  }
];

export const smartLabAIProject = {
  id: "smartlab-ai",
  title: "SmartLab AI – Equipment Booking & Fault Management",
  category: "Full Stack Web Application",
  badge: "Featured Enterprise Project",
  status: "Fully Implemented & Documented",
  shortDescription: "A comprehensive laboratory management platform built with React.js, Spring Boot, MySQL, and REST APIs to digitize equipment reservations and automated maintenance reporting.",
  fullDescription: "SmartLab AI solves resource conflicts and equipment downtime in college & industrial laboratories. It provides role-based dashboards for Students, Faculty, and Lab Administrators to schedule equipment usage, log instant hardware faults, track service histories, and analyze lab utilization metrics.",
  techStack: ["React.js", "Spring Boot", "MySQL", "REST API", "Tailwind CSS", "Axios", "Java"],
  technologies: ["React.js", "Spring Boot", "MySQL", "REST API", "Tailwind CSS", "Axios", "Java"],
  features: [
    "Role-based authentication & authorization",
    "Equipment inventory management",
    "Real-time equipment booking system",
    "Instant fault reporting workflow",
    "Maintenance tracking & service logs",
    "Usage monitoring & health analytics",
    "Dashboard analytics",
    "AI-assisted equipment condition analysis"
  ],
  githubUrl: "https://github.com/Karthi-2007",
  liveDemoUrl: null,
  mainImage: getAssetUrl("/assets/smartlab_ai_mockup.jpg")
};

export const smartLabProject = smartLabAIProject;

export const githubProjects = [
  {
    name: "Web Technology Mini Projects",
    language: "HTML / CSS / JS",
    description: "Academic mini projects building responsive, mobile-first web pages, exploring backend integration, database connectivity fundamentals, and UI/UX principles.",
    url: "https://github.com/Karthi-2007"
  },
  {
    name: "Programming Practice Projects",
    language: "Java / C++",
    description: "Self-initiated ongoing repository implementing beginner-to-intermediate programs in Java and C++, covering OOP, DSA concepts, KMP, graph coloring, topological sort, and cycle detection.",
    url: "https://github.com/Karthi-2007"
  },
  {
    name: "MeetingSchedulerMeeting",
    language: "Java",
    description: "A Java & Spring Boot backend application for scheduling, managing, and tracking meeting room slots and notifications.",
    url: "https://github.com/Karthi-2007/MeetingSchedulerMeeting"
  },
  {
    name: "Warehouse-Operations-system",
    language: "Java",
    description: "Java-based warehouse logistics system managing inventory tracking, stock movements, and operational record keeping.",
    url: "https://github.com/Karthi-2007/Warehouse-Operations-system"
  },
  {
    name: "WarehouseApp",
    language: "Java / Full-Stack",
    description: "Warehouse management application facilitating real-time stock monitoring, order processing, and administrative controls.",
    url: "https://github.com/Karthi-2007/WarehouseApp"
  },
  {
    name: "Restaurant",
    language: "Java",
    description: "Object-oriented Java management system handling menu items, order fulfillment, table reservations, and billing records.",
    url: "https://github.com/Karthi-2007/Restaurant"
  }
];

export const leetCodeData = {
  profileUrl: "https://leetcode.com/u/AfgkZ9Jo50/",
  handle: "AfgkZ9Jo50",
  totalSolved: 143,
  breakdown: [
    { language: "Java", solved: 98, color: "#F97316" },
    { language: "C++", solved: 31, color: "#0284C7" },
    { language: "C", solved: 14, color: "#64748B" }
  ],
  topics: [
    "Arrays & Strings",
    "Graphs & Dynamic Programming",
    "Two Pointers & Hash Table",
    "KMP & Topological Sort",
    "Cycle Detection & Graph Coloring"
  ]
};

// Verified Authentic Certificate Dataset with Deployment-Safe Public Assets URLs
export const certificatesData = [
  // HIGH VALUE CERTIFICATES
  {
    id: "meta-fullstack",
    title: "Meta Full Stack Developer: Front-End & Back-End from Scratch",
    issuer: "Meta / Coursera",
    date: "August 18, 2026",
    category: "HIGH_VALUE",
    credentialId: "83E7H18GUPHD",
    verificationUrl: "https://coursera.org/verify/specialization/83E7H18GUPHD",
    skills: ["Full Stack Development", "React.js", "Advanced React", "JavaScript", "HTML/CSS", "Git", "Databases", "APIs", "Python", "Django"],
    certificateFile: getAssetUrl("/certificates/meta_fullstack_coursera.pdf"),
    badge: "Meta Specialization (10 Courses)"
  },
  {
    id: "iit-bombay-java",
    title: "Java Training (Passing Score: 92.50%)",
    issuer: "IIT Bombay (EduPyramids / SINE)",
    date: "November 24, 2025",
    category: "HIGH_VALUE",
    credentialId: "4080779EB7",
    skills: ["Java Programming", "OOP Concepts", "Data Structures", "Algorithms"],
    certificateFile: getAssetUrl("/certificates/iit_bombay_java.pdf"),
    badge: "IIT Bombay Online Exam"
  },
  {
    id: "coursera-mysql",
    title: "Create a Database with the Modeling Tool in MySQL Workbench",
    issuer: "Coursera Project Network",
    date: "August 9, 2025",
    category: "HIGH_VALUE",
    skills: ["MySQL", "Database Modeling", "Relational Databases", "SQL"],
    certificateFile: getAssetUrl("/certificates/coursera_mysql_workbench.pdf"),
    badge: "Guided Technical Project"
  },
  {
    id: "mongodb-overview",
    title: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB / Credly",
    date: "December 01, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://www.credly.com/badges/9510a330-db03-4f7f-9099-0a57644a36fc",
    skills: ["NoSQL Database", "MongoDB", "Database Architecture"],
    certificateFile: getAssetUrl("/certificates/mongodb_overview_credly.pdf"),
    badge: "Verified Credly Badge"
  },
  {
    id: "redhat-python",
    title: "Python Programming with Red Hat (AD141 - RHA)",
    issuer: "Red Hat / Credly",
    date: "December 12, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://www.credly.com/badges/d68dbbd0-0b6f-4dab-8b70-6d6778fe0c99",
    skills: ["Python Programming", "Scripting", "Red Hat Enterprise Systems"],
    certificateFile: getAssetUrl("/certificates/redhat_python_credly.pdf"),
    badge: "Verified Credly Badge"
  },
  {
    id: "celonis-ai",
    title: "Celonis AI Foundations",
    issuer: "Celonis / Credly",
    date: "October 07, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://www.credly.com/go/tRyhfwtr",
    skills: ["Process Mining", "AI Foundations", "Business Intelligence"],
    certificateFile: getAssetUrl("/certificates/celonis_ai_credly.pdf"),
    badge: "Verified Credly Badge"
  },
  {
    id: "ibm-data-analysis",
    title: "Data Analysis with Python (DA0101EN)",
    issuer: "IBM / Cognitive Class",
    date: "January 28, 2026",
    category: "HIGH_VALUE",
    verificationUrl: "https://courses.cognitiveclass.ai/certificates/87a68d0196d24e3097a357f9ac971e29",
    skills: ["Data Analysis", "Python", "Pandas", "NumPy"],
    certificateFile: getAssetUrl("/certificates/ibm_data_analysis.pdf"),
    badge: "IBM Cognitive Class"
  },
  {
    id: "ibm-data-viz",
    title: "Data Visualization with Python (DV0101EN)",
    issuer: "IBM / Cognitive Class",
    date: "January 28, 2026",
    category: "HIGH_VALUE",
    verificationUrl: "https://courses.cognitiveclass.ai/certificates/e51dc855674445feae47cd6daa5f066f",
    skills: ["Data Visualization", "Python", "Matplotlib", "Seaborn"],
    certificateFile: getAssetUrl("/certificates/ibm_data_visualization.pdf"),
    badge: "IBM Cognitive Class"
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    date: "Jul-Oct 2025",
    category: "HIGH_VALUE",
    credentialId: "NPTEL25CS103S854301543",
    skills: ["Python", "Algorithmic Thinking", "Problem Solving"],
    certificateFile: getAssetUrl("/certificates/nptel_joy_of_computing_python.pdf"),
    badge: "12-Week NPTEL Course"
  },
  {
    id: "saylor-networks",
    title: "CS402: Computer Communications and Networks (Score: 86.54%)",
    issuer: "Saylor Academy",
    date: "March 23, 2026",
    category: "HIGH_VALUE",
    credentialId: "2027616906KS",
    verificationUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=2027616906KS",
    skills: ["Networking", "Network Protocols", "TCP/IP", "Computer Systems"],
    certificateFile: getAssetUrl("/certificates/saylor_computer_networks.pdf"),
    badge: "Saylor Academy Certificate"
  },
  {
    id: "ict-mongodb-ai",
    title: "Introduction to MongoDB, AI, and Vector Search",
    issuer: "ICT Academy Learnathon",
    date: "October 07, 2025",
    category: "HIGH_VALUE",
    credentialId: "MDBn4w0poltjk",
    skills: ["MongoDB", "Vector Search", "AI Integration", "NoSQL"],
    certificateFile: getAssetUrl("/certificates/ict_mongodb_ai_vector_search.pdf"),
    badge: "ICT Academy Technical Cert"
  },
  {
    id: "infosys-c-prog",
    title: "C Programming Course",
    issuer: "Infosys Springboard",
    date: "June 19, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://verify.onwingspan.com",
    skills: ["C Programming", "Core Memory Management", "Algorithms"],
    certificateFile: getAssetUrl("/certificates/infosys_c_programming.pdf"),
    badge: "Infosys Technical Cert"
  },
  {
    id: "infosys-c-pointers",
    title: "Pointers In C Programming",
    issuer: "Infosys Springboard",
    date: "June 27, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://verify.onwingspan.com",
    skills: ["C Pointers", "Memory Allocation", "Data Structures"],
    certificateFile: getAssetUrl("/certificates/infosys_c_pointers.pdf"),
    badge: "Infosys Technical Cert"
  },
  {
    id: "infosys-network-security",
    title: "Communication & Network Security",
    issuer: "Infosys Springboard",
    date: "June 25, 2025",
    category: "HIGH_VALUE",
    verificationUrl: "https://verify.onwingspan.com",
    skills: ["Network Security", "Cybersecurity Protocols", "Encryption"],
    certificateFile: getAssetUrl("/certificates/infosys_network_security.pdf"),
    badge: "Infosys Technical Cert"
  },
  {
    id: "saylor-ai",
    title: "CS205: Building with Artificial Intelligence (Score: 86.27%)",
    issuer: "Saylor Academy",
    date: "December 16, 2025",
    category: "HIGH_VALUE",
    credentialId: "2331614081KS",
    verificationUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=2331614081KS",
    skills: ["Artificial Intelligence", "Neural Networks", "Machine Learning"],
    certificateFile: getAssetUrl("/certificates/saylor_ai_building.pdf"),
    badge: "Saylor Academy Certificate"
  },
  {
    id: "saylor-python",
    title: "CS105: Introduction to Python (Score: 96.84%)",
    issuer: "Saylor Academy",
    date: "January 25, 2026",
    category: "HIGH_VALUE",
    credentialId: "5164742289KS",
    verificationUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=5164742289KS",
    skills: ["Python Programming", "Data Structures"],
    certificateFile: getAssetUrl("/certificates/saylor_python_intro.pdf"),
    badge: "Saylor Academy Certificate"
  },

  // RELEVANT CERTIFICATES
  {
    id: "ms-cybersecurity",
    title: "Learnathon '25: Describe the concepts of cybersecurity",
    issuer: "Microsoft Learn",
    date: "October 7, 2025",
    category: "RELEVANT",
    verificationUrl: "https://learn.microsoft.com/en-us/users/karthikeyans-0895/achievements/print/pgb6svz4?tab=tab-challenges",
    skills: ["Cybersecurity", "Cloud Security", "Information Protection"],
    certificateFile: getAssetUrl("/certificates/ms_learn_cybersecurity.pdf"),
    badge: "Microsoft Learn Achievement"
  },
  {
    id: "infosys-genai",
    title: "Generative AI Foundations: IT Integration with Generative AI",
    issuer: "Infosys Springboard",
    date: "July 12, 2026",
    category: "RELEVANT",
    verificationUrl: "https://verify.onwingspan.com",
    skills: ["Generative AI", "IT Integration", "LLM Fundamentals"],
    certificateFile: getAssetUrl("/certificates/infosys_generative_ai.pdf"),
    badge: "Infosys Springboard"
  },
  {
    id: "ms-copilot",
    title: "Learnathon '25: Get started with Microsoft Copilot",
    issuer: "Microsoft Learn",
    date: "October 7, 2025",
    category: "RELEVANT",
    verificationUrl: "https://learn.microsoft.com/en-us/users/karthikeyans-0895/achievements/print/fqre7gsx?tab=tab-challenges",
    skills: ["Microsoft Copilot", "AI Productivity", "Generative AI Tools"],
    certificateFile: getAssetUrl("/certificates/ms_learn_copilot.pdf"),
    badge: "Microsoft Learn Achievement"
  },
  {
    id: "simplilearn-webdev",
    title: "Web Development for Beginners",
    issuer: "Simplilearn",
    date: "May 6, 2025",
    category: "RELEVANT",
    credentialId: "8307566",
    skills: ["HTML", "CSS", "JavaScript", "Web Fundamentals"],
    certificateFile: getAssetUrl("/certificates/simplilearn_web_development.pdf"),
    badge: "Simplilearn Technical Cert"
  },
  {
    id: "saylor-r-prog",
    title: "PRDV420: Introduction to R Programming (Score: 95.65%)",
    issuer: "Saylor Academy",
    date: "August 5, 2026",
    category: "RELEVANT",
    credentialId: "2519403231KS",
    verificationUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=2519403231KS",
    skills: ["R Programming", "Data Analytics"],
    certificateFile: getAssetUrl("/certificates/saylor_r_programming.pdf"),
    badge: "Saylor Academy Certificate"
  },
  {
    id: "infosys-datascience",
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    date: "August 8, 2026",
    category: "RELEVANT",
    verificationUrl: "https://verify.onwingspan.com",
    skills: ["Data Science", "Analytics", "Statistics"],
    certificateFile: getAssetUrl("/certificates/infosys_data_science.pdf"),
    badge: "Infosys Springboard"
  }
];

// Legacy export for backward compatibility
export const certifications = certificatesData;

export const educationList = [
  {
    institution: "Karpagam College of Engineering, Coimbatore",
    degree: "B.Tech – Information Technology",
    duration: "2024 – 2028 · Currently in 3rd Year",
    location: "Coimbatore, Tamil Nadu",
    highlights: [
      "Placement batch: Full Stack Developer track",
      "Specialization (upcoming): Salesforce"
    ]
  },
  {
    institution: "Muthamizhl Hr. Sec. School, Salem",
    degree: "Higher Secondary (12th Grade)",
    duration: "2022 – 2024",
    location: "Salem, Tamil Nadu",
    highlights: [
      "Completed Higher Secondary Education with focus on Computer Science & Mathematics"
    ]
  }
];

export const experienceList = [
  {
    title: "Hackathon Participant",
    organization: "College-Level Hackathon",
    year: "2024",
    points: [
      "Collaborated in a team to develop innovative technology solutions under time constraints.",
      "Led frontend design efforts using HTML, CSS, and JavaScript; contributed to idea conceptualization.",
      "Practiced rapid prototyping, teamwork, and real-world problem decomposition."
    ]
  },
  {
    title: "Web Technology Mini Projects",
    organization: "Academic Project",
    year: "2024 – 2025",
    points: [
      "Built responsive, mobile-first web pages using HTML5, CSS3, and Vanilla JavaScript.",
      "Explored basic backend integration concepts and database connectivity fundamentals.",
      "Applied UI/UX principles to improve user experience across multiple page layouts."
    ]
  },
  {
    title: "Programming Practice Projects",
    organization: "Self-initiated",
    year: "Ongoing",
    points: [
      "Implemented beginner-to-intermediate programs in Java and C++, covering OOP and DSA concepts.",
      "Solved algorithm challenges on LeetCode focusing on arrays, strings, graphs, and dynamic programming.",
      "Studied advanced algorithm topics: KMP, graph coloring, topological sort, and cycle detection."
    ]
  }
];

export const softSkillsAndLanguages = {
  softSkills: ["Problem Solving", "Teamwork & Collaboration", "Communication", "Adaptability", "Self-Learning"],
  languages: [
    { name: "English", level: "Professional" },
    { name: "Tamil", level: "Native" }
  ]
};

export const achievementData = {
  title: "Smart India Hackathon & College Hackathons",
  category: "National & College Level Technical Hackathons",
  details: "Participated in college and national level hackathons, leading frontend design, rapid prototyping, and software problem decomposition under time constraints."
};

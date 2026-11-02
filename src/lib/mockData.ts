import { JobListing, StudentProject, PortfolioData } from '../types';

export const samplePortfolios: PortfolioData[] = [
  {
    id: 'sample-1',
    fullName: 'Student Portfolio',
    headline: 'Full-Stack Developer & Cloud Enthusiast',
    institution: 'National Institute of Technology',
    degree: 'B.Tech Computer Science & Engineering',
    graduationYear: 2026,
    bio: 'Passionate about distributed web architectures, high-performance APIs, and intuitive user experiences. Focused on building production-grade web applications with modern TypeScript, React, and serverless databases.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git'],
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    email: 'student.portfolio@example.com',
    location: 'Bengaluru, India',
    projects: [
      {
        title: 'DevCollab — Real-time Code Workspace',
        description: 'Multiplayer markdown and code editor with live syntax highlighting and presence sync using WebSockets.',
        tech: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
        github: 'https://github.com',
        demo: 'https://demo.devcollab.app'
      },
      {
        title: 'CloudMetrics — Microservice Monitor',
        description: 'Lightweight monitoring dashboard tracking latency, error rates, and container health with automated alerts.',
        tech: ['Node.js', 'PostgreSQL', 'Docker', 'Chart.js'],
        github: 'https://github.com',
        demo: 'https://metrics-demo.app'
      }
    ]
  },
  {
    id: 'sample-2',
    fullName: 'Priya Narayanan',
    headline: 'Frontend Engineer & UI/UX Specialist',
    institution: 'Anna University (CEG), Chennai',
    degree: 'B.Tech Information Technology',
    graduationYear: 2026,
    bio: 'Specializing in accessible, mobile-first design systems and fluid micro-interactions. Committed to building delightful software that passes strict WCAG AAA contrast and screen-reader accessibility standards.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Radix UI', 'Next.js', 'Jest'],
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    email: 'priya.ui@example.com',
    location: 'Chennai, India',
    projects: [
      {
        title: 'AuraKit — Accessible Design System',
        description: 'WCAG AAA compliant React component library with built-in dark mode and keyboard navigation tokens.',
        tech: ['React', 'Tailwind CSS', 'Radix UI', 'Storybook'],
        github: 'https://github.com',
        demo: 'https://aurakit.dev'
      }
    ]
  }
];

export const initialProjects: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'CodeSync — Collaborative Editor ⚡',
    tagline: 'Multiplayer Markdown and code workspace with peer document editing and live conflict resolution',
    category: 'Web Development',
    authorName: 'Student Portfolio',
    authorCollege: 'NIT Trichy',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://codesync.demo.dev',
    stars: 38,
    featured: true,
    created_at: '2026-10-15T14:20:00Z'
  },
  {
    id: 'proj-2',
    title: 'AgriVision — Crop Disease Detector 🌿',
    tagline: 'MobileNetV3 computer vision model running on WebGL for real-time paddy crop blight detection in low-connectivity areas',
    category: 'AI & ML',
    authorName: 'Karthik Raja',
    authorCollege: 'PSG College of Technology, Coimbatore',
    technologies: ['TensorFlow.js', 'Python', 'React', 'FastAPI', 'PyTorch'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://agrivision.ai',
    stars: 52,
    featured: true,
    created_at: '2026-09-28T12:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'MetroEase — Offline Transit Route Planner 🚇',
    tagline: 'PWA for offline suburban and metro train route calculations with optimized Dijkstra algorithm',
    category: 'PWA & Mobile',
    authorName: 'Divya M.',
    authorCollege: 'Anna University (CEG), Chennai',
    technologies: ['PWA', 'JavaScript', 'IndexedDB', 'Service Workers', 'CSS3'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://metroease.app',
    stars: 27,
    featured: true,
    created_at: '2026-10-05T09:15:00Z'
  },
  {
    id: 'proj-4',
    title: 'AuraKit — Accessible UI System 🎨',
    tagline: 'WCAG AAA compliant React component toolkit designed for public sector and educational web portals',
    category: 'UI/UX Design',
    authorName: 'Priya N.',
    authorCollege: 'SSN College of Engineering, Chennai',
    technologies: ['React', 'Figma', 'Tailwind CSS', 'Radix UI', 'Storybook'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://aurakit.dev',
    stars: 44,
    featured: false,
    created_at: '2026-08-10T16:45:00Z'
  },
  {
    id: 'proj-5',
    title: 'DockerKube — Local Cluster Visualizer 🐳',
    tagline: 'Desktop & web dashboard visualizing pod topology, resource consumption, and container status in real-time',
    category: 'Cloud & DevOps',
    authorName: 'Siddharth Rao',
    authorCollege: 'BITS Pilani',
    technologies: ['Go', 'React', 'Docker SDK', 'Kubernetes API', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://dockerkube.dev',
    stars: 31,
    featured: false,
    created_at: '2026-07-22T11:00:00Z'
  },
  {
    id: 'proj-6',
    title: 'StudyResource Hub — Academic Repository 📚',
    tagline: 'High-speed student academic repository for previous year question papers, syllabus, and unit-wise notes',
    category: 'Web Development',
    authorName: 'Student Community',
    authorCollege: 'State Engineering Consortium',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'SQLite'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://studyhub.demo.app',
    stars: 64,
    featured: true,
    created_at: '2026-10-31T08:00:00Z'
  }
];

export const initialJobs: JobListing[] = [
  {
    id: 'job-1',
    title: 'Frontend Engineer Intern (React / TypeScript)',
    companyName: 'Zomato Engineering',
    companyLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&q=80',
    location: 'Gurugram / Bengaluru (Hybrid)',
    workplaceType: 'Hybrid',
    employmentType: 'Internship',
    graduationBatch: ['2025', '2026'],
    compensation: '₹40,000 / month',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    description: 'Join our customer experience web team building high-traffic, ultra-responsive web interfaces with strict performance standards.',
    applyUrl: 'https://www.zomato.com/careers',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-11-01T08:00:00Z'
  },
  {
    id: 'job-2',
    title: 'Full Stack Graduate Trainee',
    companyName: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    location: 'Chennai, Tamil Nadu (On-site)',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    graduationBatch: ['2025', '2026'],
    compensation: '₹6.5 - 8.5 LPA',
    requiredSkills: ['JavaScript', 'Java', 'SQL', 'Data Structures', 'Web Tech'],
    description: 'Work on core enterprise cloud SaaS products serving millions of businesses worldwide from Zoho Estancia Campus, Chennai.',
    applyUrl: 'https://www.zoho.com/careers',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-10-28T10:00:00Z'
  },
  {
    id: 'job-3',
    title: 'Software Development Engineer - Fresher (Backend)',
    companyName: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    location: 'Bengaluru, Karnataka (Hybrid)',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    graduationBatch: ['2025', '2026'],
    compensation: '₹14 - 18 LPA',
    requiredSkills: ['Node.js', 'PostgreSQL', 'System Design', 'Git', 'REST APIs'],
    description: 'Build mission-critical payment rails handling billions in transactions every month with 99.999% uptime requirements.',
    applyUrl: 'https://razorpay.com/jobs',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-10-30T14:30:00Z'
  },
  {
    id: 'job-4',
    title: 'Junior Web Developer (React & Cloud)',
    companyName: 'Freshworks Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
    location: 'Chennai / Bengaluru (Hybrid)',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    graduationBatch: ['2025', '2026'],
    compensation: '₹7.0 - 9.5 LPA',
    requiredSkills: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Collaborate with product design teams building customer service and CRM interfaces with AI-enhanced workflows.',
    applyUrl: 'https://www.freshworks.com/careers',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-11-01T12:00:00Z'
  },
  {
    id: 'job-5',
    title: 'React & Frontend Engineering Intern',
    companyName: 'Swiggy Tech',
    companyLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80',
    location: 'Bengaluru / Remote (India)',
    workplaceType: 'Remote',
    employmentType: 'Internship',
    graduationBatch: ['2026', '2027'],
    compensation: '₹45,000 / month',
    requiredSkills: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Performance'],
    description: 'Build lightning-fast web experiences for food and grocery delivery across 500+ Indian cities.',
    applyUrl: 'https://bytes.swiggy.com/careers',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-10-25T16:00:00Z'
  },
  {
    id: 'job-6',
    title: 'Associate Software Engineer (Campus 2026)',
    companyName: 'TCS Digital / Cognizant GenC',
    companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
    location: 'Chennai / Hyderabad / Pune',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    graduationBatch: ['2026'],
    compensation: '₹7.0 - 9.0 LPA',
    requiredSkills: ['Java / Python', 'SQL', 'Cloud Fundamentals', 'Git', 'Agile'],
    description: 'Elite digital development cohort focused on cloud transformation, microservices, and modern enterprise software engineering.',
    applyUrl: 'https://www.tcs.com/careers',
    verified: true,
    verifiedDate: 'Nov 2026',
    status: 'published',
    created_at: '2026-10-29T11:00:00Z'
  }
];

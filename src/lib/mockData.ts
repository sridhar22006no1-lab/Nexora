import { JobListing, StudentProject, PortfolioData, StudyNote, StudyTask, ExamMilestone } from '../types';

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

export const initialStudyNotes: StudyNote[] = [
  {
    id: 'note-1',
    userId: 'demo-student-01',
    title: 'Operating Systems: Process vs Thread & The 4 Coffman Deadlock Conditions',
    subject: 'Operating Systems',
    unit: 'Unit 3: Synchronization & Concurrency',
    content: `### Process vs Thread Architecture
- **Process**: Independent execution unit with private virtual memory address space, file descriptors, and security context. Context switching incurs high overhead (page table invalidation / TLB flush).
- **Thread**: Lightweight execution entity within a process. Shares heap, global variables, and open files with peer threads, but possesses its own program counter, registers, and call stack.

### 4 Coffman Deadlock Conditions (Must occur simultaneously):
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process holds at least one resource and requests additional resources held by other processes.
3. **No Preemption**: Resources cannot be forcibly expropriated; they can only be released voluntarily by the holding process.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource needed by the next.

\`\`\`c
// Classic Mutex Lock Pattern in POSIX C
pthread_mutex_t lock;
pthread_mutex_init(&lock, NULL);

pthread_mutex_lock(&lock);
// Critical Section Access
shared_counter++;
pthread_mutex_unlock(&lock);
\`\`\`

> **Exam Tip**: Breaking *Circular Wait* by imposing a global resource hierarchy ordering is the most practical deadlock prevention technique in commercial OS kernels.`,
    tags: ['Deadlocks', 'Concurrency', 'OS', 'Exam Prep'],
    isPinned: true,
    colorTheme: 'indigo',
    created_at: '2026-11-01T09:30:00Z',
    updated_at: '2026-11-02T10:15:00Z'
  },
  {
    id: 'note-2',
    userId: 'demo-student-01',
    title: 'Master Theorem for Divide & Conquer & 0/1 Knapsack Recurrence',
    subject: 'Data Structures & Algos',
    unit: 'Unit 2: Asymptotic Analysis & DP Patterns',
    content: `### Master Theorem Quick Reference
For recurrences of the form:
\`\`\`
T(n) = a * T(n / b) + O(n^d)
\`\`\`
Where:
- $a \\ge 1$ (number of subproblems)
- $b > 1$ (factor by which subproblem size decreases)
- $d \\ge 0$ (work done outside recursive calls)

1. **Case 1**: If $d < \\log_b(a) \\implies T(n) = \\Theta(n^{\\log_b a})$
2. **Case 2**: If $d = \\log_b(a) \\implies T(n) = \\Theta(n^d \\log n)$ (e.g. Merge Sort: $a=2, b=2, d=1 \\implies \\Theta(n \\log n)$)
3. **Case 3**: If $d > \\log_b(a) \\implies T(n) = \\Theta(n^d)$

### 0/1 Knapsack Dynamic Programming Recurrence
\`\`\`python
# DP State Definition: dp[i][w] = max value using first i items with weight capacity w
if weight[i-1] <= w:
    dp[i][w] = max(val[i-1] + dp[i-1][w - weight[i-1]], dp[i-1][w])
else:
    dp[i][w] = dp[i-1][w]
\`\`\`
- Time Complexity: $O(N \\times W)$ (Pseudo-polynomial)
- Space Complexity: $O(W)$ with 1D rolling array optimization.`,
    tags: ['Algorithms', 'Master Theorem', 'DP', 'Interview Cheat Sheet'],
    isPinned: true,
    colorTheme: 'purple',
    created_at: '2026-10-30T14:20:00Z',
    updated_at: '2026-11-01T16:00:00Z'
  },
  {
    id: 'note-3',
    userId: 'demo-student-01',
    title: 'Database Normalization Roadmap: 1NF, 2NF, 3NF & BCNF Rules',
    subject: 'Database Systems (DBMS)',
    unit: 'Unit 4: Relational Schema Design',
    content: `### Purpose of Normalization
Eliminate update anomalies, insertion anomalies, and deletion anomalies while minimizing data redundancy.

### Normal Forms Hierarchy:
- **1NF (First Normal Form)**:
  - Each column contains atomic (indivisible) values.
  - No repeating groups or arrays in a single column.
  - Every table must have a primary key.

- **2NF (Second Normal Form)**:
  - Meets 1NF requirements.
  - **No Partial Dependency**: Every non-prime attribute must be fully functionally dependent on the *entire* candidate key (applies only to composite keys).

- **3NF (Third Normal Form)**:
  - Meets 2NF requirements.
  - **No Transitive Dependency**: Non-prime attributes must not depend on other non-prime attributes ($X \\to Y \\implies X$ is a superkey or $Y$ is a prime attribute).

- **BCNF (Boyce-Codd Normal Form)**:
  - Stricter version of 3NF.
  - For every functional dependency $X \\to Y$, $X$ **must** be a Super Key.`,
    tags: ['DBMS', 'SQL', 'Normalization', 'Relational Design'],
    isPinned: false,
    colorTheme: 'blue',
    created_at: '2026-10-28T11:00:00Z',
    updated_at: '2026-10-28T11:00:00Z'
  }
];

export const initialStudyTasks: StudyTask[] = [
  {
    id: 'task-1',
    userId: 'demo-student-01',
    title: 'Solve 5 LeetCode Two-Pointer & Binary Search Problems',
    subject: 'Data Structures & Algos',
    dueDate: '2026-11-04',
    estimatedMinutes: 60,
    priority: 'high',
    status: 'in_progress',
    created_at: '2026-11-01T10:00:00Z'
  },
  {
    id: 'task-2',
    userId: 'demo-student-01',
    title: 'Review Banker\'s Algorithm & Semaphore Deadlock proofs',
    subject: 'Operating Systems',
    dueDate: '2026-11-05',
    estimatedMinutes: 45,
    priority: 'high',
    status: 'todo',
    created_at: '2026-11-02T08:30:00Z'
  },
  {
    id: 'task-3',
    userId: 'demo-student-01',
    title: 'Implement JWT refresh token rotation with Supabase RLS policies',
    subject: 'Full Stack Web Dev',
    dueDate: '2026-11-06',
    estimatedMinutes: 90,
    priority: 'medium',
    status: 'todo',
    created_at: '2026-11-02T09:00:00Z'
  },
  {
    id: 'task-4',
    userId: 'demo-student-01',
    title: 'Practice SQL Window Functions: ROW_NUMBER, RANK & DENSE_RANK',
    subject: 'Database Systems (DBMS)',
    dueDate: '2026-11-03',
    estimatedMinutes: 30,
    priority: 'medium',
    status: 'completed',
    completedAt: '2026-11-02T11:20:00Z',
    created_at: '2026-10-31T14:00:00Z'
  }
];

export const initialExamMilestones: ExamMilestone[] = [
  {
    id: 'exam-1',
    title: 'Semester End Theory: Operating Systems & System Architecture',
    subject: 'Operating Systems',
    examDate: '2026-11-20',
    targetScore: 'Grade A+ (90%+)'
  },
  {
    id: 'exam-2',
    title: 'TCS Digital / Infosys SP On-Campus Coding Assessment',
    subject: 'Data Structures & System Design',
    examDate: '2026-11-28',
    targetScore: 'Clear All Test Cases'
  },
  {
    id: 'exam-3',
    title: 'Database Systems & SQL Lab Practical Examination',
    subject: 'Database Systems',
    examDate: '2026-12-05',
    targetScore: '100% Query Execution'
  }
];

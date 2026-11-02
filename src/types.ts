export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Internship' | 'Full-time';
  graduationBatch: string[];
  compensation: string;
  requiredSkills: string[];
  description: string;
  applyUrl: string;
  verified: boolean;
  verifiedDate: string;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
}

export interface StudentProject {
  id: string;
  title: string;
  tagline: string;
  category: 'Web Development' | 'AI & ML' | 'UI/UX Design' | 'PWA & Algorithms' | 'Cloud & DevOps';
  authorName: string;
  authorCollege: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  stars?: number;
  featured?: boolean;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  username: string;
  fullName: string;
  headline: string;
  institution: string;
  degree: string;
  graduationYear: number;
  bio: string;
  skills: string[];
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone?: string;
  location: string;
  is_portfolio_public: boolean;
  avatarUrl?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export type ActiveTab = 'home' | 'jobs' | 'projects' | 'portfolio' | 'career-guide';

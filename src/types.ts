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
  category: 'Web Development' | 'AI & ML' | 'UI/UX Design' | 'PWA & Mobile' | 'Cloud & DevOps';
  authorName: string;
  authorCollege: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  stars?: number;
  featured?: boolean;
  created_at: string;
}

export interface PortfolioData {
  id?: string;
  fullName: string;
  headline: string;
  institution: string;
  degree: string;
  graduationYear: number;
  bio: string;
  skills: string[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  email: string;
  location: string;
  projects: {
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo: string;
  }[];
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export type ContactInquiry = ContactMessage;

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  institution?: string;
  degree?: string;
  graduationYear?: number;
  avatarUrl?: string;
  studyStreak: number;
  targetRole: string;
  created_at?: string;
}

export interface StudyNote {
  id: string;
  userId?: string;
  title: string;
  subject: string;
  unit?: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  colorTheme: 'purple' | 'indigo' | 'blue' | 'emerald' | 'amber' | 'rose';
  created_at: string;
  updated_at: string;
}

export interface StudyTask {
  id: string;
  userId?: string;
  title: string;
  subject: string;
  dueDate: string;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed';
  completedAt?: string;
  created_at: string;
}

export interface ExamMilestone {
  id: string;
  title: string;
  subject: string;
  examDate: string;
  targetScore?: string;
}

export interface AiQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AiStudyInteraction {
  id: string;
  mode: 'concept' | 'code' | 'quiz' | 'formula';
  prompt: string;
  response: string;
  quiz?: AiQuizQuestion[];
  created_at: string;
}

export interface SkillProgress {
  subject: string;
  hoursSpent: number;
  masteryPercentage: number;
  color: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

export type ActiveTab = 
  | 'home' 
  | 'dashboard' 
  | 'notes' 
  | 'planner' 
  | 'ai-study' 
  | 'analytics' 
  | 'jobs' 
  | 'projects' 
  | 'builder' 
  | 'career-guide';

export type ThemeMode = 'dark' | 'light';

export type SkillLevel = 'Proficient' | 'Learning';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  summary: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architectureNotes: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  visualType: 'codequest' | 'toyzy' | 'portfolio';
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  name: string;
  roleHeadline: string;
  heroIntro: string;
  biography: string[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  contact: ContactInfo;
}

export interface DraftMessageInput {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export interface FirestoreInquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  createdAtIso: string;
}

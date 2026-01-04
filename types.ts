
export type EventCategory = 'political' | 'cultural' | 'military' | 'economic' | 'scientific' | 'medical' | 'astronomical' | 'geographical';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface WorkItem {
  id: string;
  title: string;
  content: string; // 简述
  fullDetail?: string; // 详述
  imageUrl?: string; // 事物配图
}

export interface Submission {
  id: string;
  authorId: string;
  authorName: string;
  timestamp: number;
  type: 'event' | 'figure' | 'achievement' | 'work';
  action: 'add' | 'edit';
  targetId: string;
  targetSubId?: string;
  payload: any;
  changeSummary: string;
  status: SubmissionStatus;
  reviewerNote?: string;
}

export interface KeyFigure {
  id: string;
  name: string;
  title: string;
  description: string;
  biography: string;
  portraitUrl?: string;
  works?: WorkItem[];
  lastModifiedBy?: string;
  lastModifiedTime?: number;
}

export interface KeyEvent {
  id: string;
  year: string;
  month?: string;
  name: string;
  description: string;
  details: string;
  relatedFigures: string[];
  category: EventCategory;
  isMinor?: boolean;
  imageUrl?: string;
  lastModifiedBy?: string;
  lastModifiedTime?: number;
}

export interface Achievement {
  title: string;
  description: string;
  category: EventCategory;
}

export interface Dynasty {
  id: string;
  name: string;
  timeRange: string;
  duration: number;
  founder: string;
  capital: string;
  characteristics: string[];
  keyEvents: KeyEvent[];
  keyFigures: KeyFigure[];
  achievements: Achievement[];
  sealText: string;
  mapUrl: string;
}

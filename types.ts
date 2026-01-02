
export interface KeyFigure {
  name: string;
  title: string;
  description: string;
  biography: string; // Added for life story details
}

export interface KeyEvent {
  id: string;
  year: string;
  name: string;
  description: string;
  details: string;
  relatedFigures: string[];
  imageUrl?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Dynasty {
  id: string;
  name: string;
  timeRange: string;
  founder: string;
  capital: string;
  characteristics: string[];
  keyEvents: KeyEvent[];
  keyFigures: KeyFigure[];
  achievements: Achievement[];
  sealText: string;
}

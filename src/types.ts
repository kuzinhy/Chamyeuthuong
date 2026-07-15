export interface SolutionCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  visualContent: {
    type: 'image' | 'video' | 'interactive' | 'audio' | 'exhibition';
    url: string;
    caption: string;
    details: string[];
  };
}

export interface QuizOption {
  id: string;
  text: string;
  reaction: string;
  score: number;
  message: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  image: string;
  options: QuizOption[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'poster' | 'photovoice' | 'comic' | 'infographic';
  imageUrl: string;
  author: string;
  description: string;
}

export interface TimelineStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface MessageWallPost {
  id: string;
  name: string;
  text: string;
  timestamp: string;
  avatarSeed: number;
}

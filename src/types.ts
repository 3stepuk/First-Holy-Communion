export interface CatechismQA {
  id: number;
  question: string;
  answer: string;
  lessonId: number;
}

export interface Lesson {
  id: number;
  number: number;
  title: string;
  remember: string;
  explanation: string[];
  talkAboutIt: {
    question: string;
    guideNote: string;
  };
  questions: CatechismQA[];
  prayer: string;
  thisWeek: string;
  scriptureReferences?: string[];
}

export interface MassPart {
  part: string;
  whatHappens: string;
  howITakePart: string;
}

export interface StepByStepItem {
  step: number;
  whatHappens: string;
  whatIDo: string;
}

export interface PrayerItem {
  id: string;
  title: string;
  category: 'before' | 'during' | 'after' | 'spiritual';
  prayer: string;
  note?: string;
}

export interface ReadinessItem {
  id: string;
  area: string;
  whatReadinessLooksLike: string;
}

export interface UserProfile {
  childName: string;
  parish: string;
  catechistMentor: string;
  sponsorMentor: string;
  firstCommunionDate: string;
  firstConfessionCompleted: boolean;
  firstConfessionDate: string;
  email: string;
  notificationSent: boolean;
  notificationSentAt?: string;
}

export interface UserProgress {
  completedLessons: number[]; // lesson IDs
  masteredQuestions: number[]; // QA IDs (1-60)
  masteredSummaryQuestions: number[]; // Summary QA IDs (1-30)
  checkedMassParts: number[]; // Indices of checked parts in Mass guide
  checkedReadinessAreas: string[]; // Area IDs checked
  lessonNotes: Record<number, string>; // lessonId -> personal notes
  favoritePrayers: string[]; // prayer IDs
}

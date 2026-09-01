import { UserProfile, UserProgress } from '../types';

const PROFILE_KEY = 'mfhc_user_profile_v1';
const PROGRESS_KEY = 'mfhc_user_progress_v1';

export const DEFAULT_PROFILE: UserProfile = {
  childName: '',
  parish: '',
  catechistMentor: '',
  sponsorMentor: '',
  firstCommunionDate: '',
  firstConfessionCompleted: false,
  firstConfessionDate: '',
  email: '',
  notificationSent: false,
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  masteredQuestions: [],
  masteredSummaryQuestions: [],
  checkedMassParts: [],
  checkedReadinessAreas: [],
  lessonNotes: {},
  favoritePrayers: ['anima-christi', 'thanksgiving'],
};

export function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch (e) {
    console.error('Failed to load profile from localStorage', e);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage', e);
  }
}

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

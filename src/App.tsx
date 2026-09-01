import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { LessonView } from './components/LessonView';
import { MemoryDrill } from './components/MemoryDrill';
import { AppendicesView } from './components/AppendicesView';
import { ProfileView } from './components/ProfileView';
import { NotificationModal } from './components/NotificationModal';
import { LESSONS_DATA } from './data/lessonsData';
import { 
  loadProfile, 
  saveProfile, 
  loadProgress, 
  saveProgress,
  DEFAULT_PROFILE,
  DEFAULT_PROGRESS 
} from './lib/storage';
import { UserProfile, UserProgress } from './types';
import { Cross, Heart, BookOpen, Sparkles, Church, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Handler for selecting a lesson to view
  const handleSelectLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle completed lesson
  const handleToggleLessonComplete = (lessonId: number) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  // Toggle mastered question in 60 lesson Q&As
  const handleToggleQuestionMastered = (questionId: number) => {
    setProgress((prev) => {
      const exists = prev.masteredQuestions.includes(questionId);
      const updated = exists
        ? prev.masteredQuestions.filter((id) => id !== questionId)
        : [...prev.masteredQuestions, questionId];
      return { ...prev, masteredQuestions: updated };
    });
  };

  // Toggle mastered summary question in Appendix D
  const handleToggleSummaryMastered = (summaryQuestionId: number) => {
    setProgress((prev) => {
      const exists = prev.masteredSummaryQuestions.includes(summaryQuestionId);
      const updated = exists
        ? prev.masteredSummaryQuestions.filter((id) => id !== summaryQuestionId)
        : [...prev.masteredSummaryQuestions, summaryQuestionId];
      return { ...prev, masteredSummaryQuestions: updated };
    });
  };

  // Save personal note for a lesson
  const handleSaveLessonNote = (lessonId: number, note: string) => {
    setProgress((prev) => ({
      ...prev,
      lessonNotes: { ...prev.lessonNotes, [lessonId]: note }
    }));
  };

  // Toggle Mass part checked in Appendix A
  const handleToggleMassPart = (partIndex: number) => {
    setProgress((prev) => {
      const exists = prev.checkedMassParts.includes(partIndex);
      const updated = exists
        ? prev.checkedMassParts.filter((idx) => idx !== partIndex)
        : [...prev.checkedMassParts, partIndex];
      return { ...prev, checkedMassParts: updated };
    });
  };

  // Toggle Readiness area checked in Appendix E
  const handleToggleReadinessArea = (areaId: string) => {
    setProgress((prev) => {
      const exists = prev.checkedReadinessAreas.includes(areaId);
      const updated = exists
        ? prev.checkedReadinessAreas.filter((id) => id !== areaId)
        : [...prev.checkedReadinessAreas, areaId];
      return { ...prev, checkedReadinessAreas: updated };
    });
  };

  // Toggle favorite prayer
  const handleToggleFavoritePrayer = (prayerId: string) => {
    setProgress((prev) => {
      const exists = prev.favoritePrayers.includes(prayerId);
      const updated = exists
        ? prev.favoritePrayers.filter((id) => id !== prayerId)
        : [...prev.favoritePrayers, prayerId];
      return { ...prev, favoritePrayers: updated };
    });
  };

  // Reset progress
  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setProfile(DEFAULT_PROFILE);
    setSelectedLessonId(null);
    setActiveTab('overview');
  };

  // Import data
  const handleImportData = (newProfile: UserProfile, newProgress: UserProgress) => {
    setProfile(newProfile);
    setProgress(newProgress);
  };

  const currentLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E5E7EB] flex flex-col font-sans">
      
      {/* Ambient Accent Glows */}
      <div className="accent-glow-br" />
      <div className="accent-glow-tl" />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'lessons' && selectedLessonId === null) {
            setSelectedLessonId(1);
          }
        }}
        profile={profile}
        progress={progress}
        totalLessons={LESSONS_DATA.length}
        totalQuestions={60}
        onOpenNotification={() => setNotificationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 relative z-10">
        {activeTab === 'overview' && (
          <HeroLanding
            lessons={LESSONS_DATA}
            profile={profile}
            progress={progress}
            onSelectLesson={handleSelectLesson}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNotification={() => setNotificationModalOpen(true)}
            onSaveProfile={setProfile}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonView
            lesson={currentLesson}
            totalLessons={LESSONS_DATA.length}
            progress={progress}
            onToggleComplete={handleToggleLessonComplete}
            onToggleQuestionMastered={handleToggleQuestionMastered}
            onSaveNote={handleSaveLessonNote}
            onSelectLesson={(id) => {
              setSelectedLessonId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToOverview={() => {
              setActiveTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'drills' && (
          <MemoryDrill
            lessons={LESSONS_DATA}
            progress={progress}
            onToggleQuestionMastered={handleToggleQuestionMastered}
            onToggleSummaryMastered={handleToggleSummaryMastered}
          />
        )}

        {activeTab === 'mass-guide' && (
          <AppendicesView
            initialSubTab="mass-guide"
            progress={progress}
            profile={profile}
            onToggleMassPart={handleToggleMassPart}
            onToggleReadinessArea={handleToggleReadinessArea}
            onToggleFavoritePrayer={handleToggleFavoritePrayer}
          />
        )}

        {activeTab === 'step-by-step' && (
          <AppendicesView
            initialSubTab="step-by-step"
            progress={progress}
            profile={profile}
            onToggleMassPart={handleToggleMassPart}
            onToggleReadinessArea={handleToggleReadinessArea}
            onToggleFavoritePrayer={handleToggleFavoritePrayer}
          />
        )}

        {activeTab === 'prayers' && (
          <AppendicesView
            initialSubTab="prayers"
            progress={progress}
            profile={profile}
            onToggleMassPart={handleToggleMassPart}
            onToggleReadinessArea={handleToggleReadinessArea}
            onToggleFavoritePrayer={handleToggleFavoritePrayer}
          />
        )}

        {activeTab === 'readiness' && (
          <AppendicesView
            initialSubTab="readiness"
            progress={progress}
            profile={profile}
            onToggleMassPart={handleToggleMassPart}
            onToggleReadinessArea={handleToggleReadinessArea}
            onToggleFavoritePrayer={handleToggleFavoritePrayer}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            progress={progress}
            lessons={LESSONS_DATA}
            onSaveProfile={setProfile}
            onResetProgress={handleResetProgress}
            onImportData={handleImportData}
            onOpenNotification={() => setNotificationModalOpen(true)}
          />
        )}
      </main>

      {/* Pastoral Footer */}
      <footer className="bg-[#111111] border-t border-[#22161B] text-xs text-slate-500 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40 flex items-center justify-center font-cinzel text-xs font-bold">
                ☧
              </span>
              <span className="font-cinzel font-bold text-slate-300">
                My First Holy Communion — Catholic Preparation
              </span>
            </div>

            <div className="text-[11px] text-slate-400 font-garamond italic text-center sm:text-right">
              "O Sacrament most holy, O Sacrament divine, all praise and all thanksgiving be every moment thine."
            </div>
          </div>

          <div className="pt-4 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <div>
              Designed for parish catechetical series • Faithfully aligned with the Catechism of the Catholic Church
            </div>
            <div>
              Offline-ready • Privacy-focused • Local storage only
            </div>
          </div>
        </div>
      </footer>

      {/* Optional Notification Modal */}
      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
      />
    </div>
  );
}

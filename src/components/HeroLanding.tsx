import React, { useState } from 'react';
import { 
  Flame, 
  BookOpen, 
  Sparkles, 
  BrainCircuit, 
  Church, 
  Heart, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  UserCheck, 
  Calendar, 
  Award,
  Bell,
  Save,
  Check
} from 'lucide-react';
import { Lesson, UserProfile, UserProgress } from '../types';
import { PASTORAL_PRINCIPLES, HOW_TO_USE_BOOK } from '../data/appendicesData';

interface HeroLandingProps {
  lessons: Lesson[];
  profile: UserProfile;
  progress: UserProgress;
  onSelectLesson: (lessonId: number) => void;
  onNavigate: (tab: any) => void;
  onOpenNotification: () => void;
  onSaveProfile?: (profile: UserProfile) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  lessons,
  profile,
  progress,
  onSelectLesson,
  onNavigate,
  onOpenNotification,
  onSaveProfile
}) => {
  const completedCount = progress.completedLessons.length;
  const nextLesson = lessons.find((l) => !progress.completedLessons.includes(l.id)) || lessons[0];

  // Quick profile inline editing
  const [candidateName, setCandidateName] = useState(profile.childName || '');
  const [sponsorName, setSponsorName] = useState(profile.sponsorMentor || '');
  const [catechistName, setCatechistName] = useState(profile.catechistMentor || '');
  const [savedInline, setSavedInline] = useState(false);

  const handleQuickSave = () => {
    if (onSaveProfile) {
      onSaveProfile({
        ...profile,
        childName: candidateName,
        sponsorMentor: sponsorName,
        catechistMentor: catechistName
      });
      setSavedInline(true);
      setTimeout(() => setSavedInline(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Immersive Top Hero & Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left/Main Hero Card - Immersive Gradient Banner */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#7A1E3E] via-[#5E122A] to-[#380D1D] p-6 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#9E2A4E]/40 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-6 text-white/5 font-cinzel text-8xl font-black select-none pointer-events-none hidden sm:block">
            IHS
          </div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/15 text-[11px] text-white font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Lesson {nextLesson.number}: {nextLesson.title}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-extrabold text-white tracking-tight leading-tight">
              God Feeds His Children
            </h1>

            <p className="text-base sm:text-lg font-garamond text-slate-100 italic leading-relaxed">
              "Prepare your heart for the most beautiful gift of the Holy Eucharist."
            </p>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-sans">
              For children aged approximately 7–9 preparing with their families, catechists, mentors, and priests to receive the true Body and Blood of Christ.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <button
              id="begin-resume-lesson-btn"
              onClick={() => onSelectLesson(nextLesson.id)}
              className="px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#7A1E3E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#7A1E3E]" />
              <span>{completedCount === 0 ? 'Begin Course' : `Resume Lesson ${nextLesson.number}`}</span>
              <ArrowRight className="w-4 h-4 text-[#7A1E3E]" />
            </button>

            <button
              id="goto-drills-btn"
              onClick={() => onNavigate('drills')}
              className="px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-rose-200" />
              <span>Recall Drills (60 Q&As)</span>
            </button>

            <button
              id="goto-step-by-step-btn"
              onClick={() => onNavigate('step-by-step')}
              className="px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Step-by-Step</span>
            </button>
          </div>
        </div>

        {/* Right Candidate Card - Immersive Dark Card */}
        <div className="lg:col-span-4 rounded-xl bg-[#161616] border border-[#2A2A2A] p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <span className="text-[11px] font-cinzel font-bold text-[#E06D8C] uppercase tracking-widest">
                Candidate Record
              </span>
              <button
                onClick={() => onNavigate('profile')}
                className="text-[10px] text-slate-400 hover:text-white uppercase font-mono transition-colors"
              >
                Full Profile →
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-1 block">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  onBlur={handleQuickSave}
                  placeholder="e.g. Samuel Archer"
                  className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#7A1E3E] text-white px-3 py-2 rounded text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-1 block">
                  Sponsor / Mentor
                </label>
                <input
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  onBlur={handleQuickSave}
                  placeholder="e.g. Fr John / Sponsor"
                  className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#7A1E3E] text-white px-3 py-2 rounded text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-1 block">
                  Catechist / Mentor
                </label>
                <input
                  type="text"
                  value={catechistName}
                  onChange={(e) => setCatechistName(e.target.value)}
                  onBlur={handleQuickSave}
                  placeholder="Assigned Catechist"
                  className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#7A1E3E] text-white px-3 py-2 rounded text-xs outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#242424] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Status:</span>
              <span className="text-emerald-400 font-mono font-semibold">
                {completedCount}/12 Lessons Complete
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-garamond italic px-1">
              "I am the bread of life. Whoever comes to me will never go hungry." — John 6:35
            </div>
          </div>
        </div>

      </div>

      {/* Optional Notification Callout (if not yet sent) */}
      {!profile.notificationSent && (
        <section className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#7A1E3E]/20 border border-[#7A1E3E]/50 flex items-center justify-center text-[#E06D8C] shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-cinzel font-semibold text-white">
                Optional Sign-in for Father John
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-garamond">
                Let Father John know your child is preparing for First Holy Communion so the parish can pray for you. Opt-in only & privacy-respecting.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenNotification}
            className="px-4 py-2 rounded-lg bg-[#7A1E3E] hover:bg-[#9E2A4E] text-xs font-semibold text-white whitespace-nowrap transition-colors shadow-md cursor-pointer"
          >
            Send Notification
          </button>
        </section>
      )}

      {/* 12 Lessons Road Map Grid - Immersive UI Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wide">
              The 12 Lessons
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-garamond">
              Step-by-step catechetical instruction, discussion prompts, memory questions, prayers, and weekly actions
            </p>
          </div>
          <span className="text-xs font-mono text-[#E06D8C] bg-[#161616] px-3 py-1 rounded-full border border-[#2A2A2A]">
            {completedCount} / 12 Complete
          </span>
        </div>

        {/* 4-column responsive grid matching Immersive UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {lessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isCurrent = nextLesson.id === lesson.id;
            const masteredInLesson = lesson.questions.filter((q) => 
              progress.masteredQuestions.includes(q.id)
            ).length;
            const progressPercent = isCompleted ? 100 : (masteredInLesson / 5) * 100;

            return (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                onClick={() => onSelectLesson(lesson.id)}
                className={`cursor-pointer rounded-lg p-3.5 bg-[#161616] border transition-all duration-200 flex flex-col justify-between shadow-md ${
                  isCurrent 
                    ? 'border-l-4 border-l-[#7A1E3E] border-[#333] hover:border-[#7A1E3E]' 
                    : isCompleted
                    ? 'border-l-4 border-l-emerald-600 border-[#222] hover:border-[#7A1E3E]'
                    : 'border-[#222] hover:border-[#7A1E3E]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#7A1E3E] tracking-wider uppercase">
                      LESSON {lesson.number < 10 ? `0${lesson.number}` : lesson.number}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>

                  <h3 className="font-cinzel text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-garamond italic line-clamp-2 leading-snug mt-1.5">
                    "{lesson.remember}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#222]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>{isCompleted ? 'Complete' : `${masteredInLesson}/5 Mastered`}</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-1 bg-[#222] rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-[#7A1E3E]'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Appendices Quick Bar */}
      <div className="bg-[#161616] border border-[#222] p-3.5 sm:p-4 rounded-xl flex flex-wrap items-center gap-2 sm:gap-4 shadow-lg">
        <span className="text-[10px] uppercase font-bold text-[#7A1E3E] tracking-widest mr-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Appendices
        </span>
        
        <button
          onClick={() => onNavigate('mass-guide')}
          className="text-xs text-[#94A3B8] hover:text-[#E06D8C] px-2.5 py-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer border border-transparent hover:border-[#333]"
        >
          Guide to Mass
        </button>

        <button
          onClick={() => onNavigate('step-by-step')}
          className="text-xs text-[#94A3B8] hover:text-[#E06D8C] px-2.5 py-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer border border-transparent hover:border-[#333]"
        >
          Step by Step
        </button>

        <button
          onClick={() => onNavigate('prayers')}
          className="text-xs text-[#94A3B8] hover:text-[#E06D8C] px-2.5 py-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer border border-transparent hover:border-[#333]"
        >
          Communion Prayers
        </button>

        <button
          onClick={() => onNavigate('readiness')}
          className="text-xs text-[#94A3B8] hover:text-[#E06D8C] px-2.5 py-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer border border-transparent hover:border-[#333]"
        >
          Summary & Readiness
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="text-xs text-[#94A3B8] hover:text-[#E06D8C] px-2.5 py-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer border border-transparent hover:border-[#333] sm:ml-auto"
        >
          Candidate Record →
        </button>
      </div>

      {/* Pastoral Principles & How to Use Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pastoral Principles */}
        <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7A1E3E]/20 border border-[#7A1E3E]/50 flex items-center justify-center text-[#E06D8C]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel font-semibold text-base text-white">
                A Note for Parents, Catechists & Priests
              </h3>
              <p className="text-xs text-slate-400">Pastoral Principles of the Series</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {PASTORAL_PRINCIPLES.map((principle, idx) => (
              <div key={idx} className="bg-[#0A0A0A] p-3 rounded-lg border border-[#222]">
                <div className="text-xs font-semibold text-[#E06D8C] uppercase tracking-wide mb-1">
                  {principle.title}
                </div>
                <p className="text-xs text-slate-300 font-garamond text-sm leading-relaxed">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use This Book & Key Appendices */}
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7A1E3E]/20 border border-[#7A1E3E]/50 flex items-center justify-center text-[#E06D8C]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel font-semibold text-base text-white">
                  How to Use This Course
                </h3>
                <p className="text-xs text-slate-400">Practical guidance for family & parish</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1 text-xs text-slate-300 font-garamond text-sm leading-relaxed">
              {HOW_TO_USE_BOOK.map((instruction, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-[#E06D8C] border border-[#7A1E3E]/40 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-mono font-bold">
                    {idx + 1}
                  </span>
                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('mass-guide')}
              className="p-4 rounded-xl bg-[#161616] border border-[#222] hover:border-[#7A1E3E] text-left transition-colors group cursor-pointer shadow-md"
            >
              <Church className="w-5 h-5 text-[#E06D8C] mb-2" />
              <div className="font-cinzel text-xs font-semibold text-slate-100 group-hover:text-white">
                Child's Guide to Mass
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-garamond">
                Interactive walkthrough of Mass parts
              </p>
            </button>

            <button
              onClick={() => onNavigate('prayers')}
              className="p-4 rounded-xl bg-[#161616] border border-[#222] hover:border-[#7A1E3E] text-left transition-colors group cursor-pointer shadow-md"
            >
              <Heart className="w-5 h-5 text-rose-400 mb-2" />
              <div className="font-cinzel text-xs font-semibold text-slate-100 group-hover:text-white">
                Communion Prayers
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-garamond">
                Anima Christi, Acts of Faith & Thanksgiving
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

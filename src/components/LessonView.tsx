import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  Heart, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Check, 
  PenTool, 
  Layers,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, UserProgress } from '../types';

interface LessonViewProps {
  lesson: Lesson;
  totalLessons: number;
  progress: UserProgress;
  onToggleComplete: (lessonId: number) => void;
  onToggleQuestionMastered: (questionId: number) => void;
  onSaveNote: (lessonId: number, note: string) => void;
  onSelectLesson: (lessonId: number) => void;
  onBackToOverview: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  totalLessons,
  progress,
  onToggleComplete,
  onToggleQuestionMastered,
  onSaveNote,
  onSelectLesson,
  onBackToOverview
}) => {
  const [showCatechistNotes, setShowCatechistNotes] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [readingTextId, setReadingTextId] = useState<number | string | null>(null);
  const [personalNote, setPersonalNote] = useState<string>(
    progress.lessonNotes[lesson.id] || ''
  );
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Speech synthesis for accessibility / young children
  const speakText = (id: number | string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    if (readingTextId === id) {
      window.speechSynthesis.cancel();
      setReadingTextId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // clear, accessible pace for children
    utterance.pitch = 1.0;
    utterance.onend = () => setReadingTextId(null);
    utterance.onerror = () => setReadingTextId(null);
    setReadingTextId(id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleRevealAnswer = (qId: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const revealAllAnswers = () => {
    const all: Record<number, boolean> = {};
    lesson.questions.forEach((q) => { all[q.id] = true; });
    setRevealedAnswers(all);
  };

  const hideAllAnswers = () => {
    setRevealedAnswers({});
  };

  const handleNoteBlur = () => {
    onSaveNote(lesson.id, personalNote);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handleCompleteClick = () => {
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#7A1E3E', '#9E2A4E', '#FCD34D', '#10B981']
        });
      } catch (e) {
        // Confetti fallback
      }
    }
    onToggleComplete(lesson.id);
  };

  const hasPrev = lesson.number > 1;
  const hasNext = lesson.number < totalLessons;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#161616] border border-[#222] p-3 sm:p-4 rounded-xl shadow-md">
        <button
          onClick={onBackToOverview}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Lessons</span>
        </button>

        <div className="flex items-center gap-2">
          {hasPrev && (
            <button
              onClick={() => onSelectLesson(lesson.id - 1)}
              className="p-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#222] text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer border border-[#222]"
              title="Previous Lesson"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          )}

          <div className="text-xs font-mono font-semibold px-3 py-1 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A] text-[#E06D8C]">
            Lesson {lesson.number} of {totalLessons}
          </div>

          {hasNext && (
            <button
              onClick={() => onSelectLesson(lesson.id + 1)}
              className="p-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#222] text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer border border-[#222]"
              title="Next Lesson"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-block text-xs uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-[#7A1E3E]/30 text-[#E06D8C] border border-[#7A1E3E]/60">
            Lesson {lesson.number}
          </span>

          <button
            onClick={handleCompleteClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950'
                : 'bg-[#0A0A0A] hover:bg-[#7A1E3E]/40 border border-[#7A1E3E]/60 text-slate-300'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Completed Lesson</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-500" />
                <span>Mark Lesson Complete</span>
              </>
            )}
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-white tracking-wide leading-snug">
            {lesson.title}
          </h1>
        </div>

        {/* REMEMBER Box - High contrast Eucharistic highlight */}
        <div className="relative rounded-xl bg-[#0A0A0A] border-l-4 border-l-[#7A1E3E] border border-[#2A2A2A] p-4 sm:p-5 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-[#E06D8C] font-bold">
                REMEMBER
              </span>
              <p className="font-garamond text-lg sm:text-xl text-white font-medium italic leading-relaxed">
                "{lesson.remember}"
              </p>
            </div>
            <button
              onClick={() => speakText(`remember-${lesson.id}`, lesson.remember)}
              className="p-2 rounded-lg bg-[#161616] text-[#E06D8C] hover:text-white hover:bg-[#7A1E3E] transition-colors shrink-0 cursor-pointer border border-[#333]"
              title="Listen to Remember line"
              aria-label="Listen"
            >
              {readingTextId === `remember-${lesson.id}` ? (
                <VolumeX className="w-4 h-4 animate-pulse text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="space-y-4 pt-2">
          {lesson.explanation.map((para, idx) => (
            <p 
              key={idx} 
              className="text-slate-200 font-garamond text-base sm:text-lg leading-relaxed tracking-wide"
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Talk About It Discussion Box */}
      <div className="bg-[#161616] border border-[#222] rounded-xl p-5 sm:p-6 space-y-4 shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/50 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="font-cinzel text-base font-semibold text-white">
              Talk About It
            </h3>
          </div>
          
          <button
            onClick={() => setShowCatechistNotes(!showCatechistNotes)}
            className="text-xs font-medium text-slate-400 hover:text-[#E06D8C] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {showCatechistNotes ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Catechist Guide</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Catechist / Parent Guide</span>
              </>
            )}
          </button>
        </div>

        <p className="text-slate-200 font-garamond text-base sm:text-lg italic bg-[#0A0A0A] p-4 rounded-lg border border-[#222]">
          "{lesson.talkAboutIt.question}"
        </p>

        {showCatechistNotes && (
          <div className="bg-[#0A0A0A] border border-[#7A1E3E]/50 p-4 rounded-lg text-xs sm:text-sm text-slate-300 space-y-1 animate-fade-in font-sans">
            <div className="text-[11px] font-semibold text-[#E06D8C] uppercase tracking-wider">
              Guidance for Parents & Catechists
            </div>
            <p className="leading-relaxed text-slate-300">
              {lesson.talkAboutIt.guideNote}
            </p>
          </div>
        )}
      </div>

      {/* Learn These Answers (5 Catechism Q&As) */}
      <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#222]">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#E06D8C]" />
              <span>Learn These Answers</span>
            </h3>
            <p className="text-xs text-slate-400 font-garamond text-sm">
              Read aloud, practice saying in your own words, and memorize the formal answer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={revealAllAnswers}
              className="text-xs px-2.5 py-1 rounded bg-[#0A0A0A] hover:bg-[#222] border border-[#333] text-slate-300 transition-colors cursor-pointer"
            >
              Reveal All
            </button>
            <button
              onClick={hideAllAnswers}
              className="text-xs px-2.5 py-1 rounded bg-[#0A0A0A] hover:bg-[#222] border border-[#333] text-slate-400 transition-colors cursor-pointer"
            >
              Hide All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {lesson.questions.map((qa, idx) => {
            const isMastered = progress.masteredQuestions.includes(qa.id);
            const isRevealed = revealedAnswers[qa.id] ?? false;

            return (
              <div
                key={qa.id}
                id={`qa-item-${qa.id}`}
                className={`rounded-xl border p-4 sm:p-5 transition-all ${
                  isMastered 
                    ? 'bg-[#0E1712] border-emerald-800/60' 
                    : 'bg-[#0A0A0A] border-[#242424] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                      Question {qa.id} • Lesson {lesson.number} (#{idx + 1})
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {qa.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => speakText(`qa-${qa.id}`, `${qa.question}. Answer: ${qa.answer}`)}
                      className="p-1.5 rounded-md hover:bg-[#222] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Listen"
                      aria-label="Read Question and Answer"
                    >
                      {readingTextId === `qa-${qa.id}` ? (
                        <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => onToggleQuestionMastered(qa.id)}
                      className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-[#161616] text-slate-400 hover:text-slate-200 border border-[#2D2D2D]'
                      }`}
                      title={isMastered ? 'Mastered!' : 'Mark as mastered'}
                    >
                      {isMastered ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline text-[11px]">{isMastered ? 'Mastered' : 'Check'}</span>
                    </button>
                  </div>
                </div>

                {/* Answer box / revealable toggle */}
                <div className="mt-3 pt-3 border-t border-[#1C1C1C]">
                  {isRevealed ? (
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-[#E06D8C] uppercase tracking-wider">
                        Answer
                      </div>
                      <p className="font-garamond text-base sm:text-lg text-slate-100 font-medium leading-relaxed bg-[#161616] p-3 rounded-lg border border-[#2A2A2A]">
                        {qa.answer}
                      </p>
                      <button
                        onClick={() => toggleRevealAnswer(qa.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        Hide Answer
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleRevealAnswer(qa.id)}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[#282828] text-xs font-medium text-[#E06D8C] hover:text-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tap to Reveal Answer</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prayer & This Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PRAYER Card */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E06D8C] font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              PRAYER
            </span>
            <button
              onClick={() => speakText(`prayer-${lesson.id}`, lesson.prayer)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Listen to prayer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="font-garamond text-base sm:text-lg text-slate-100 italic leading-relaxed">
            "{lesson.prayer}"
          </p>
        </div>

        {/* THIS WEEK Practical Action Card */}
        <div className="bg-[#161616] border border-[#222] rounded-xl p-5 sm:p-6 space-y-3 shadow-md">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              THIS WEEK'S ACTION
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {lesson.thisWeek}
          </p>
        </div>
      </div>

      {/* Child & Catechist Reflection Note */}
      <div className="bg-[#161616] border border-[#222] rounded-xl p-5 sm:p-6 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-[#E06D8C]" />
            <h4 className="font-cinzel text-sm font-semibold text-white">
              Personal Notes & Reflection (Optional)
            </h4>
          </div>
          {noteSavedFeedback && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
        <textarea
          id={`lesson-note-${lesson.id}`}
          rows={3}
          value={personalNote}
          onChange={(e) => {
            setPersonalNote(e.target.value);
            onSaveNote(lesson.id, e.target.value);
          }}
          onBlur={handleNoteBlur}
          placeholder="Write a question for Father John/Catechist, or note what you learned today..."
          className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#7A1E3E] rounded-lg p-3 text-xs sm:text-sm text-slate-200 outline-none resize-none"
        />
        <div className="flex justify-end">
          <span className="text-[10px] text-[#7A1E3E]/80 font-medium">
            ✓ Auto-saved to this device as you type
          </span>
        </div>
      </div>

      {/* Bottom Completion & Navigation Footer */}
      <div className="bg-[#161616] border border-[#222] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <button
          onClick={handleCompleteClick}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isCompleted
              ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
              : 'bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white shadow-lg'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lesson Completed!</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Finish & Mark Completed</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {hasNext ? (
            <button
              onClick={() => onSelectLesson(lesson.id + 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0A0A0A] hover:bg-[#222] border border-[#333] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Next: Lesson {lesson.number + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToOverview}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0A0A0A] hover:bg-[#222] border border-[#333] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Back to Overview</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

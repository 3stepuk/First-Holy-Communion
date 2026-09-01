import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  RotateCw, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Sparkles, 
  Search, 
  HelpCircle,
  Award,
  Layers,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, CatechismQA, UserProgress } from '../types';
import { APPENDIX_D_SUMMARY_CATECHISM } from '../data/appendicesData';

interface MemoryDrillProps {
  lessons: Lesson[];
  progress: UserProgress;
  onToggleQuestionMastered: (questionId: number) => void;
  onToggleSummaryMastered: (questionId: number) => void;
}

type DrillMode = 'flashcards' | 'quiz' | 'list';
type QuestionSet = 'lessons' | 'summary';

export const MemoryDrill: React.FC<MemoryDrillProps> = ({
  lessons,
  progress,
  onToggleQuestionMastered,
  onToggleSummaryMastered
}) => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>('lessons');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [drillMode, setDrillMode] = useState<DrillMode>('flashcards');
  
  // Flashcard state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [readingText, setReadingText] = useState<string | null>(null);

  // Search & Quiz state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);

  // All 60 lesson questions
  const allLessonQuestions: CatechismQA[] = useMemo(() => {
    return lessons.flatMap((l) => l.questions);
  }, [lessons]);

  // Current active pool of questions based on set and filters
  const activeQuestions: CatechismQA[] = useMemo(() => {
    let pool: CatechismQA[] = [];
    if (questionSet === 'lessons') {
      pool = selectedLessonFilter === 'all'
        ? allLessonQuestions
        : allLessonQuestions.filter((q) => q.lessonId === selectedLessonFilter);
      
      if (statusFilter === 'mastered') {
        pool = pool.filter((q) => progress.masteredQuestions.includes(q.id));
      } else if (statusFilter === 'unmastered') {
        pool = pool.filter((q) => !progress.masteredQuestions.includes(q.id));
      }
    } else {
      pool = APPENDIX_D_SUMMARY_CATECHISM;
      if (statusFilter === 'mastered') {
        pool = pool.filter((q) => progress.masteredSummaryQuestions.includes(q.id));
      } else if (statusFilter === 'unmastered') {
        pool = pool.filter((q) => !progress.masteredSummaryQuestions.includes(q.id));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      );
    }

    return pool;
  }, [questionSet, selectedLessonFilter, statusFilter, searchQuery, allLessonQuestions, progress]);

  // Safe current question for flashcards
  const currentCard: CatechismQA | undefined = activeQuestions[currentIndex];

  const isCurrentMastered = useMemo(() => {
    if (!currentCard) return false;
    return questionSet === 'lessons'
      ? progress.masteredQuestions.includes(currentCard.id)
      : progress.masteredSummaryQuestions.includes(currentCard.id);
  }, [currentCard, questionSet, progress]);

  const toggleCurrentMastered = () => {
    if (!currentCard) return;
    if (questionSet === 'lessons') {
      onToggleQuestionMastered(currentCard.id);
    } else {
      onToggleSummaryMastered(currentCard.id);
    }
    if (!isCurrentMastered) {
      try {
        confetti({
          particleCount: 40,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#7A1E3E', '#9E2A4E', '#10B981']
        });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, activeQuestions.length));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    setCurrentIndex((prev) => (prev - 1 + activeQuestions.length) % Math.max(1, activeQuestions.length));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    const rand = Math.floor(Math.random() * activeQuestions.length);
    setCurrentIndex(rand);
  };

  // Generate quiz options
  const quizOptions = useMemo(() => {
    if (!currentCard) return [];
    const pool = questionSet === 'lessons' ? allLessonQuestions : APPENDIX_D_SUMMARY_CATECHISM;
    const others = pool.filter((q) => q.id !== currentCard.id).map((q) => q.answer);
    // Shuffle and pick 3 wrong answers
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const all = [currentCard.answer, ...shuffledOthers].sort(() => 0.5 - Math.random());
    return all;
  }, [currentCard, questionSet, allLessonQuestions]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (readingText === text) {
      setReadingText(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setReadingText(null);
    utterance.onerror = () => setReadingText(null);
    setReadingText(text);
    window.speechSynthesis.speak(utterance);
  };

  // Mastered counts
  const totalInSet = questionSet === 'lessons' ? 60 : 30;
  const masteredInSet = questionSet === 'lessons' 
    ? progress.masteredQuestions.length 
    : progress.masteredSummaryQuestions.length;
  const setPercentage = Math.round((masteredInSet / totalInSet) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header & Stats Banner */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                <BrainCircuit className="w-5 h-5" />
              </span>
              <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Catechism Recall Drills
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-garamond text-base mt-1">
              Test your knowledge of the faith with interactive flashcards, quizzes, and search
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#0A0A0A] p-3 rounded-xl border border-[#222] self-start sm:self-auto">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Mastery</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {masteredInSet} <span className="text-xs text-slate-400">/ {totalInSet}</span>
              </div>
            </div>
            <div className="w-12 h-2 bg-[#222] rounded-full overflow-hidden self-center">
              <div 
                className="h-full bg-gradient-to-r from-[#7A1E3E] to-emerald-500 transition-all duration-300"
                style={{ width: `${setPercentage}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-300">{setPercentage}%</span>
          </div>
        </div>

        {/* Set & Mode Selectors */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#222]">
          
          {/* Question Set Toggle */}
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-[#222]">
            <button
              onClick={() => { setQuestionSet('lessons'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                questionSet === 'lessons'
                  ? 'bg-[#7A1E3E] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              12 Lessons (60 Q&As)
            </button>
            <button
              onClick={() => { setQuestionSet('summary'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                questionSet === 'summary'
                  ? 'bg-[#7A1E3E] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Appendix D Summary (30 Q&As)
            </button>
          </div>

          {/* Drill Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-[#222]">
            <button
              onClick={() => setDrillMode('flashcards')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                drillMode === 'flashcards'
                  ? 'bg-[#222] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcard</span>
            </button>
            <button
              onClick={() => { setDrillMode('quiz'); setQuizAnswerChecked(false); setSelectedQuizOption(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                drillMode === 'quiz'
                  ? 'bg-[#222] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setDrillMode('list')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                drillMode === 'list'
                  ? 'bg-[#222] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full List</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {questionSet === 'lessons' && (
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Filter by Lesson
              </label>
              <select
                value={selectedLessonFilter}
                onChange={(e) => {
                  setSelectedLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value));
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
              >
                <option value="all">All 12 Lessons</option>
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    Lesson {l.number}: {l.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
              Mastery Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
            >
              <option value="all">All Questions</option>
              <option value="unmastered">Still Practicing (Unmastered)</option>
              <option value="mastered">Mastered Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
              Search Text
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search question or answer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Drill Arena */}
      {activeQuestions.length === 0 ? (
        <div className="bg-[#161616] border border-[#222] rounded-xl p-12 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-cinzel font-semibold text-slate-300">
            No questions match your filter
          </h3>
          <p className="text-xs text-slate-400">
            Try selecting "All Lessons" or clearing the search box.
          </p>
          <button
            onClick={() => { setSelectedLessonFilter('all'); setStatusFilter('all'); setSearchQuery(''); }}
            className="px-4 py-2 bg-[#7A1E3E] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : drillMode === 'flashcards' && currentCard ? (
        
        /* Flashcard Mode */
        <div className="space-y-6">
          {/* Card Meta & Navigation Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="font-mono">
              Card {currentIndex + 1} of {activeQuestions.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#161616] hover:bg-[#222] border border-[#2A2A2A] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Shuffle"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>

              <button
                onClick={() => speakText(isFlipped ? currentCard.answer : currentCard.question)}
                className="p-1.5 rounded bg-[#161616] hover:bg-[#222] border border-[#2A2A2A] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Listen"
              >
                {readingText ? <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* 3D Flip Flashcard */}
          <div 
            id="flashcard-container"
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer min-h-[300px] sm:min-h-[340px] rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#7A1E3E] p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                isFlipped ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40' : 'bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40'
              }`}>
                {isFlipped ? 'Answer (Tap to see question)' : 'Question (Tap to reveal answer)'}
              </span>

              {isCurrentMastered && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  <Check className="w-3 h-3" /> Mastered
                </span>
              )}
            </div>

            {/* Center Content */}
            <div className="py-6 sm:py-8 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs text-slate-500 font-mono">
                    {questionSet === 'lessons' ? `Lesson ${currentCard.lessonId} • #${currentCard.id}` : `Summary #${currentCard.id - 100}`}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white leading-snug">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                    Catechism Answer
                  </span>
                  <p className="text-lg sm:text-xl md:text-2xl font-garamond text-slate-100 font-medium italic leading-relaxed max-w-2xl mx-auto">
                    "{currentCard.answer}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-[#222]">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-[#E06D8C]" />
                <span>Tap card to flip</span>
              </span>
              <span className="text-slate-400 font-mono">
                {isFlipped ? 'Click again for question' : 'Click to check'}
              </span>
            </div>
          </div>

          {/* Flashcard Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#0A0A0A] hover:bg-[#222] border border-[#2A2A2A] text-slate-300 font-medium text-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={toggleCurrentMastered}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isCurrentMastered
                  ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                  : 'bg-[#0A0A0A] hover:bg-emerald-950/40 border border-[#2A2A2A] hover:border-emerald-800/60 text-slate-300'
              }`}
            >
              {isCurrentMastered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-500" />
                  <span>Mark as Mastered</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#7A1E3E]/20 hover:bg-[#7A1E3E]/40 border border-[#7A1E3E]/50 text-[#E06D8C] font-semibold text-xs transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      ) : drillMode === 'quiz' && currentCard ? (

        /* Quiz Mode */
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Quiz Question {currentIndex + 1} of {activeQuestions.length}</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#7A1E3E]/20 text-[#E06D8C]">
              Multiple Choice Drill
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
              {currentCard.question}
            </h3>
            <p className="text-xs text-slate-400">Select the correct catechism answer below:</p>
          </div>

          <div className="space-y-3">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedQuizOption === opt;
              const isCorrect = opt === currentCard.answer;
              
              let btnStyle = 'bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#7A1E3E]/60 text-slate-200';
              if (quizAnswerChecked) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-[#0A0A0A] opacity-40 border-[#222] text-slate-500';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#7A1E3E]/30 border-[#7A1E3E] text-white';
              }

              return (
                <button
                  key={idx}
                  onClick={() => !quizAnswerChecked && setSelectedQuizOption(opt)}
                  className={`w-full text-left p-4 rounded-lg border font-garamond text-base transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 font-mono mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Quiz Action Row */}
          <div className="pt-4 border-t border-[#222] flex items-center justify-between gap-3">
            {!quizAnswerChecked ? (
              <button
                disabled={!selectedQuizOption}
                onClick={() => {
                  setQuizAnswerChecked(true);
                  if (selectedQuizOption === currentCard.answer) {
                    if (questionSet === 'lessons') onToggleQuestionMastered(currentCard.id);
                    else onToggleSummaryMastered(currentCard.id);
                    try {
                      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                    } catch (e) {}
                  }
                }}
                className="px-6 py-2.5 rounded-lg bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white font-semibold text-xs disabled:opacity-40 transition-all cursor-pointer"
              >
                Check Answer
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="text-xs">
                  {selectedQuizOption === currentCard.answer ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct! Answer Mastered.
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold">
                      Not quite. Study the answer above and try again!
                    </span>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-lg bg-[#7A1E3E] text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      ) : (

        /* Full List Mode */
        <div className="space-y-3">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Showing {activeQuestions.length} Questions
          </div>
          {activeQuestions.map((qa) => {
            const isMastered = questionSet === 'lessons'
              ? progress.masteredQuestions.includes(qa.id)
              : progress.masteredSummaryQuestions.includes(qa.id);

            return (
              <div
                key={qa.id}
                className={`p-4 sm:p-5 rounded-xl border bg-[#161616] transition-all ${
                  isMastered ? 'border-emerald-800/60 bg-[#0E1712]' : 'border-[#222] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {questionSet === 'lessons' ? `Lesson ${qa.lessonId} • #${qa.id}` : `Summary Question`}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white mt-0.5">
                      {qa.question}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      if (questionSet === 'lessons') onToggleQuestionMastered(qa.id);
                      else onToggleSummaryMastered(qa.id);
                    }}
                    className={`p-1.5 rounded-md text-xs flex items-center gap-1 shrink-0 cursor-pointer ${
                      isMastered 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' 
                        : 'bg-[#0A0A0A] text-slate-400 border border-[#2D2D2D]'
                    }`}
                  >
                    {isMastered ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{isMastered ? 'Mastered' : 'Check'}</span>
                  </button>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-[#222]">
                  <p className="font-garamond text-base sm:text-lg text-slate-200 leading-relaxed">
                    {qa.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

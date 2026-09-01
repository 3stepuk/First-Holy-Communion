import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  BrainCircuit, 
  Church, 
  Heart, 
  CheckSquare, 
  User, 
  ChevronRight, 
  Flame, 
  Menu, 
  X,
  Cross
} from 'lucide-react';
import { UserProfile, UserProgress } from '../types';

export type NavTab = 
  | 'overview' 
  | 'lessons' 
  | 'drills' 
  | 'mass-guide' 
  | 'step-by-step' 
  | 'prayers' 
  | 'readiness' 
  | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  profile: UserProfile;
  progress: UserProgress;
  totalLessons: number;
  totalQuestions: number;
  onOpenNotification: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  progress,
  totalLessons,
  totalQuestions,
  onOpenNotification
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const masteredCount = progress.masteredQuestions.length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'lessons', label: '12 Lessons', icon: <Flame className="w-4 h-4 text-[#E06D8C]" /> },
    { id: 'drills', label: 'Recall Drills', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'mass-guide', label: 'Mass Guide', icon: <Church className="w-4 h-4" /> },
    { id: 'step-by-step', label: 'Step by Step', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'prayers', label: 'Prayers', icon: <Heart className="w-4 h-4" /> },
    { id: 'readiness', label: 'Readiness & Summary', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222]">
      {/* Top Eucharistic burgundy accent bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#5E122A] via-[#7A1E3E] to-[#9E2A4E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Title */}
          <div 
            onClick={() => handleNavClick('overview')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#161616] border border-[#7A1E3E]/60 flex items-center justify-center text-[#E06D8C] group-hover:border-[#9E2A4E] transition-colors shadow-inner">
              <span className="font-cinzel text-base sm:text-lg font-bold">☧</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel font-bold text-sm sm:text-base md:text-lg text-white tracking-[0.5px] uppercase">
                  My First Holy Communion
                </h1>
                <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#7A1E3E]/30 text-[#E06D8C] border border-[#7A1E3E]/50">
                  Catholic Preparation
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-garamond italic">
                "Jesus gives himself to me in the Blessed Sacrament"
              </p>
            </div>
          </div>

          {/* Right Header Status & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-xs text-slate-400 italic">Welcome, Child of God</span>

            {/* Progress Pill */}
            <div 
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2.5 bg-[#161616] border border-[#2A2A2A] hover:border-[#7A1E3E]/80 px-3 py-1.5 rounded-full cursor-pointer transition-all"
              title="Click to view overall progress"
            >
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-300 font-medium">
                  {completedCount}/{totalLessons} Lessons
                </div>
                <div className="text-[9px] text-emerald-400 font-mono">
                  {masteredCount}/60 Q&As
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#7A1E3E] border border-white/20 flex items-center justify-center text-[10px] font-bold text-white font-mono shadow-sm">
                {progressPercent}%
              </div>
            </div>

            {/* Child Profile chip */}
            {profile.childName ? (
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2 bg-[#161616] border border-[#7A1E3E]/50 hover:border-[#7A1E3E] text-slate-200 px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#7A1E3E] text-white flex items-center justify-center text-[10px] font-bold">
                  {profile.childName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate font-medium">{profile.childName}</span>
              </button>
            ) : (
              <button
                onClick={onOpenNotification}
                className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-[#2A2A2A] hover:border-[#7A1E3E] bg-[#161616] transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#E06D8C]" />
                <span>Candidate Sign-In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="text-xs font-mono px-2 py-1 bg-[#161616] border border-[#2A2A2A] text-[#E06D8C] rounded font-bold"
            >
              {progressPercent}%
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-[#161616] border border-[#2A2A2A] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 pb-2.5 overflow-x-auto no-scrollbar pt-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7A1E3E] text-white shadow-md shadow-[#7A1E3E]/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#161616]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === 'lessons' && completedCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-slate-200 font-mono">
                    {completedCount}/12
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#7A1E3E] text-white font-medium'
                    : 'text-slate-300 hover:bg-[#161616]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.id === 'lessons' && (
                  <span className="text-xs font-mono opacity-80">
                    {completedCount}/12
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-[#222] flex flex-col gap-2">
            {!profile.childName && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNotification();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#161616] border border-[#2A2A2A] text-xs text-slate-200 text-center"
              >
                Optional Candidate Sign-in / Father John
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Save, 
  CheckCircle2, 
  Circle, 
  Printer, 
  RotateCcw, 
  Download, 
  Upload, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Church, 
  Calendar, 
  Mail,
  Bell
} from 'lucide-react';
import { UserProfile, UserProgress, Lesson } from '../types';
import { APPENDIX_E_READINESS } from '../data/appendicesData';

interface ProfileViewProps {
  profile: UserProfile;
  progress: UserProgress;
  lessons: Lesson[];
  onSaveProfile: (profile: UserProfile) => void;
  onResetProgress: () => void;
  onImportData: (profile: UserProfile, progress: UserProgress) => void;
  onOpenNotification: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  progress,
  lessons,
  onSaveProfile,
  onResetProgress,
  onImportData,
  onOpenNotification
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const completedLessonsCount = progress.completedLessons.length;
  const masteredQCount = progress.masteredQuestions.length;
  const readinessCount = progress.checkedReadinessAreas.length;
  const isReady = completedLessonsCount === 12 && readinessCount >= 6 && formData.firstConfessionCompleted;

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleExportData = () => {
    const backup = {
      profile: formData,
      progress: progress,
      exportedAt: new Date().toISOString(),
      app: 'My First Holy Communion — Catholic Preparation'
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `first-holy-communion-${formData.childName || 'candidate'}-progress.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.profile && parsed.progress) {
            setFormData(parsed.profile);
            onImportData(parsed.profile, parsed.progress);
            alert('Progress and profile imported successfully!');
          }
        } catch (err) {
          alert('Invalid backup file.');
        }
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
              <User className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                Candidate Record
              </span>
              <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Candidate & Preparation Profile
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record / Certificate</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 font-garamond text-base">
          Keep track of candidate details, parish mentors, sponsor information, confession readiness, and preparation milestones. All data is stored privately on this device.
        </p>
      </div>

      {/* Preparation Progress Stats Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 no-print">
        <div className="bg-[#161616] border border-[#222] p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">12 Lessons</span>
          <div className="text-xl font-bold font-mono text-white">
            {completedLessonsCount} <span className="text-xs text-slate-400">/ 12</span>
          </div>
          <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#7A1E3E]" 
              style={{ width: `${(completedLessonsCount / 12) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Q&A Mastered</span>
          <div className="text-xl font-bold font-mono text-emerald-400">
            {masteredQCount} <span className="text-xs text-slate-400">/ 60</span>
          </div>
          <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${(masteredQCount / 60) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Readiness Areas</span>
          <div className="text-xl font-bold font-mono text-amber-300">
            {readinessCount} <span className="text-xs text-slate-400">/ 8</span>
          </div>
          <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400" 
              style={{ width: `${(readinessCount / 8) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">First Confession</span>
          <div className={`text-sm font-semibold mt-1 flex items-center gap-1 ${
            formData.firstConfessionCompleted ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {formData.firstConfessionCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-500" />
                <span>In Preparation</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {formData.firstConfessionDate || 'Date not set'}
          </span>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl no-print">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <h2 className="font-cinzel text-lg font-bold text-white">
            Candidate & Parish Details
          </h2>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Profile Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Child's Full Name <span className="text-[#E06D8C]">*</span>
              </label>
              <input
                id="profile-child-name"
                type="text"
                value={formData.childName}
                onChange={(e) => handleInputChange('childName', e.target.value)}
                placeholder="e.g. Maria Teresa Santos"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Parish
              </label>
              <input
                id="profile-parish"
                type="text"
                value={formData.parish}
                onChange={(e) => handleInputChange('parish', e.target.value)}
                placeholder="e.g. St. Peter and St. Paul"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Catechist / Mentor
              </label>
              <input
                id="profile-catechist-mentor"
                type="text"
                value={formData.catechistMentor}
                onChange={(e) => handleInputChange('catechistMentor', e.target.value)}
                placeholder="e.g. Sister Agnes / John Catechist"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Sponsor / Mentor
              </label>
              <input
                id="profile-sponsor-mentor"
                type="text"
                value={formData.sponsorMentor}
                onChange={(e) => handleInputChange('sponsorMentor', e.target.value)}
                placeholder="e.g. Uncle David / Godmother Lucy"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Expected Date of First Holy Communion
              </label>
              <input
                id="profile-communion-date"
                type="date"
                value={formData.firstCommunionDate}
                onChange={(e) => handleInputChange('firstCommunionDate', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Parent / Family Contact Email
              </label>
              <input
                id="profile-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="e.g. family@domain.com"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Sacramental Confession Status Box */}
          <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#222] space-y-3">
            <div className="flex items-center gap-3">
              <input
                id="confession-completed-chk"
                type="checkbox"
                checked={formData.firstConfessionCompleted}
                onChange={(e) => handleInputChange('firstConfessionCompleted', e.target.checked)}
                className="w-4 h-4 rounded text-[#7A1E3E] focus:ring-[#7A1E3E] bg-[#161616] border-[#333] cursor-pointer"
              />
              <label htmlFor="confession-completed-chk" className="text-xs font-semibold text-white cursor-pointer">
                First Sacramental Confession Completed Before Communion (Canon 914)
              </label>
            </div>

            {formData.firstConfessionCompleted && (
              <div className="pl-7">
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                  Date of First Sacramental Confession
                </label>
                <input
                  type="date"
                  value={formData.firstConfessionDate}
                  onChange={(e) => handleInputChange('firstConfessionDate', e.target.value)}
                  className="bg-[#161616] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none"
                />
              </div>
            )}
          </div>

          {/* Father John Notification Status */}
          <div className="bg-[#181014] p-4 rounded-xl border border-[#3A1825] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#E06D8C]" />
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Optional Sign-in Notification: {formData.notificationSent ? 'Sent to Father John' : 'Not yet sent'}
                </div>
                <p className="text-[11px] text-slate-400 font-garamond text-xs">
                  {formData.notificationSent 
                    ? `Notification recorded on ${formData.notificationSentAt || 'recently'}.` 
                    : 'Notify parish priest that candidate has begun this preparation module.'}
                </p>
              </div>
            </div>

            {!formData.notificationSent ? (
              <button
                type="button"
                onClick={onOpenNotification}
                className="px-3.5 py-1.5 rounded-lg bg-[#7A1E3E]/30 hover:bg-[#7A1E3E] border border-[#7A1E3E]/60 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Send Notification
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Registered
              </span>
            )}
          </div>

          <div className="pt-3 flex justify-end">
            <button
              id="save-profile-btn"
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </div>
        </form>
      </div>

      {/* Printable Certificate / Preparation Record Component */}
      <div 
        id="printable-communion-record"
        className="bg-[#161616] dark-card-print border border-[#2A2A2A] rounded-xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden"
      >
        <div className="text-center space-y-2 border-b border-[#222] pb-6">
          <div className="font-cinzel text-2xl font-bold text-[#E06D8C] tracking-widest uppercase">
            Parish Sacramental Record
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            My First Holy Communion Preparation
          </h2>
          <p className="font-garamond text-base sm:text-lg text-slate-300 italic">
            "Jesus gives himself to me in the Blessed Sacrament"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm py-4 border-b border-[#222]">
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">Candidate Name</span>
            <span className="text-white font-bold text-base">{formData.childName || '__________________________'}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">Parish Community</span>
            <span className="text-white font-bold text-base">{formData.parish || '__________________________'}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">Catechist / Mentor</span>
            <span className="text-slate-200 font-semibold">{formData.catechistMentor || '__________________________'}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">Sponsor / Mentor</span>
            <span className="text-slate-200 font-semibold">{formData.sponsorMentor || '__________________________'}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">First Confession Status</span>
            <span className="text-emerald-400 font-semibold">
              {formData.firstConfessionCompleted ? `Completed (${formData.firstConfessionDate || 'Verified'})` : 'In Preparation'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] block">First Holy Communion Date</span>
            <span className="text-white font-semibold">{formData.firstCommunionDate || '__________________________'}</span>
          </div>
        </div>

        {/* 12 Lessons Checklist on Certificate */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono text-slate-400 font-semibold block">
            The 12 Lessons Completed ({completedLessonsCount}/12)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {lessons.map((lesson) => {
              const isDone = progress.completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="flex items-center gap-2 text-slate-300">
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    isDone ? 'bg-emerald-900 text-emerald-300' : 'border border-slate-600'
                  }`}>
                    {isDone ? '✓' : ''}
                  </span>
                  <span className={isDone ? 'text-slate-100 font-medium' : 'text-slate-500'}>
                    {lesson.number}. {lesson.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signatures for Priest / Catechist */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-400 border-t border-[#222]">
          <div>
            <div className="border-b border-slate-600 w-3/4 mx-auto mb-2" />
            <span>Parish Priest / Catechist Signature</span>
          </div>
          <div>
            <div className="border-b border-slate-600 w-3/4 mx-auto mb-2" />
            <span>Date</span>
          </div>
        </div>
      </div>

      {/* Data Backup & Reset Options */}
      <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-4 no-print shadow-xl">
        <h3 className="font-cinzel text-sm font-semibold text-white">
          Data Management & Local Storage
        </h3>
        <p className="text-xs text-slate-400 font-garamond text-sm">
          All progress is stored only in your web browser's local storage. You can export a backup file or restore it anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A0A0A] hover:bg-[#222] border border-[#2A2A2A] text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E06D8C]" />
            <span>Export Progress Backup</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A0A0A] hover:bg-[#222] border border-[#2A2A2A] text-slate-200 text-xs font-medium transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-[#E06D8C]" />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress on this device?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-medium transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

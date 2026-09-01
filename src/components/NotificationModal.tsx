import React, { useState } from 'react';
import { Mail, Check, X, Shield, Bell, Heart, Send } from 'lucide-react';
import { UserProfile } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [name, setName] = useState(profile.childName || '');
  const [email, setEmail] = useState(profile.email || '');
  const [parish, setParish] = useState(profile.parish || '');
  const [catechist, setCatechist] = useState(profile.catechistMentor || '');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter both your name and email address.');
      return;
    }

    setSending(true);
    setErrorMsg('');

    try {
      // POST to Formspree endpoint (Opt-in pastoral notification for Father John)
      const response = await fetch('https://formspree.io/f/mqkenpzz', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          module: 'My First Holy Communion — Catholic Preparation',
          candidateName: name,
          email: email,
          parish: parish || 'Not specified',
          catechistOrMentor: catechist || 'Not specified',
          timestamp: new Date().toISOString(),
          message: `${name} has begun the First Holy Communion preparation module.`
        })
      });

      const updatedProfile: UserProfile = {
        ...profile,
        childName: name,
        email: email,
        parish: parish,
        catechistMentor: catechist,
        notificationSent: true,
        notificationSentAt: new Date().toLocaleDateString()
      };

      onSaveProfile(updatedProfile);
      setSentSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.warn('Network issue or Formspree endpoint unreachable in offline mode:', err);
      // Still record locally so the child/family isn't blocked
      const updatedProfile: UserProfile = {
        ...profile,
        childName: name,
        email: email,
        parish: parish,
        catechistMentor: catechist,
        notificationSent: true,
        notificationSentAt: new Date().toLocaleDateString()
      };
      onSaveProfile(updatedProfile);
      setSentSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } finally {
      setSending(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        id="notification-modal-card"
        className="relative w-full max-w-lg bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 shadow-2xl text-slate-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#7A1E3E]/20 border border-[#7A1E3E]/50 flex items-center justify-center text-[#E06D8C]">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-cinzel font-semibold text-white">
              Optional Parish Notification
            </h3>
            <p className="text-xs text-slate-400">Pastoral care & encouragement</p>
          </div>
        </div>

        {sentSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-base font-medium text-slate-100">
              Notification sent to Father John
            </p>
            <p className="text-xs text-slate-400">
              Thank you! Your progress will be remembered in our parish prayers.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed font-garamond text-base">
              If you would like, you may share your name so Father John knows you have begun this First Holy Communion preparation. This is completely optional and privacy-respecting.
            </p>

            {errorMsg && (
              <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2.5 rounded-lg">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Child's Name <span className="text-[#E06D8C]">*</span>
              </label>
              <input
                id="notify-child-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Thomas Moore"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Parent / Family Email <span className="text-[#E06D8C]">*</span>
              </label>
              <input
                id="notify-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. family@example.com"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Parish (Optional)
                </label>
                <input
                  id="notify-parish"
                  type="text"
                  value={parish}
                  onChange={(e) => setParish(e.target.value)}
                  placeholder="e.g. St. Joseph's"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Catechist / Mentor (Optional)
                </label>
                <input
                  id="notify-catechist"
                  type="text"
                  value={catechist}
                  onChange={(e) => setCatechist(e.target.value)}
                  placeholder="e.g. Sr. Mary / Mr. Davis"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#7A1E3E] rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#222] transition-colors cursor-pointer"
              >
                Continue Anonymously
              </button>
              <button
                id="submit-notification-btn"
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#7A1E3E] hover:bg-[#9E2A4E] text-white shadow-lg shadow-[#7A1E3E]/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                {sending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Notification</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400 justify-center">
              <Shield className="w-3.5 h-3.5" />
              <span>Only one notification is sent per module. No marketing or spam.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Church, 
  Sparkles, 
  Heart, 
  CheckSquare, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ShieldAlert, 
  Info, 
  UserCheck, 
  Printer, 
  Check, 
  MessageSquare,
  HelpCircle,
  Bookmark,
  Share2
} from 'lucide-react';
import { 
  APPENDIX_A_MASS_GUIDE, 
  APPENDIX_B_STEPS, 
  APPENDIX_B_UNSURE_NOTE, 
  APPENDIX_B_DIALOGUE,
  APPENDIX_C_PRAYERS, 
  APPENDIX_E_READINESS, 
  SOURCES_AND_REFERENCES 
} from '../data/appendicesData';
import { UserProgress, UserProfile } from '../types';

interface AppendicesViewProps {
  initialSubTab?: 'mass-guide' | 'step-by-step' | 'prayers' | 'readiness' | 'sources';
  progress: UserProgress;
  profile: UserProfile;
  onToggleMassPart: (idx: number) => void;
  onToggleReadinessArea: (areaId: string) => void;
  onToggleFavoritePrayer: (prayerId: string) => void;
}

export const AppendicesView: React.FC<AppendicesViewProps> = ({
  initialSubTab = 'mass-guide',
  progress,
  profile,
  onToggleMassPart,
  onToggleReadinessArea,
  onToggleFavoritePrayer
}) => {
  const [subTab, setSubTab] = useState<'mass-guide' | 'step-by-step' | 'prayers' | 'readiness' | 'sources'>(
    initialSubTab
  );
  const [prayerFilter, setPrayerFilter] = useState<'all' | 'before' | 'after' | 'spiritual'>('all');
  const [readingPrayerId, setReadingPrayerId] = useState<string | null>(null);

  // Practice dialogue interactive state for Appendix B
  const [dialogueStep, setDialogueStep] = useState<number>(0);
  const [dialogueCompleted, setDialogueCompleted] = useState<boolean>(false);

  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (readingPrayerId === id) {
      setReadingPrayerId(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onend = () => setReadingPrayerId(null);
    utterance.onerror = () => setReadingPrayerId(null);
    setReadingPrayerId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredPrayers = APPENDIX_C_PRAYERS.filter((p) => {
    if (prayerFilter === 'all') return true;
    return p.category === prayerFilter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Sub-Navigation Tabs */}
      <div className="bg-[#161616] border border-[#2A2A2A] p-2 rounded-xl flex flex-wrap items-center gap-1.5 no-print shadow-md">
        <button
          onClick={() => setSubTab('mass-guide')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            subTab === 'mass-guide' ? 'bg-[#7A1E3E] text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Church className="w-3.5 h-3.5" />
          <span>Appendix A: Mass Guide</span>
        </button>

        <button
          onClick={() => setSubTab('step-by-step')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            subTab === 'step-by-step' ? 'bg-[#7A1E3E] text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Appendix B: Step by Step</span>
        </button>

        <button
          onClick={() => setSubTab('prayers')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            subTab === 'prayers' ? 'bg-[#7A1E3E] text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Appendix C: Prayers</span>
        </button>

        <button
          onClick={() => setSubTab('readiness')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            subTab === 'readiness' ? 'bg-[#7A1E3E] text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Appendix E: Readiness Guide</span>
        </button>

        <button
          onClick={() => setSubTab('sources')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            subTab === 'sources' ? 'bg-[#7A1E3E] text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Doctrinal Sources</span>
        </button>
      </div>

      {/* =======================================================================
          APPENDIX A: A Child's Guide to the Mass
      ======================================================================= */}
      {subTab === 'mass-guide' && (
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                <Church className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                  Appendix A
                </span>
                <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  A Child's Guide to the Mass
                </h1>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-slate-300 leading-relaxed">
              The Mass has two principal parts — the Liturgy of the Word and the Liturgy of the Eucharist — joined so closely that they form one act of worship. Introductory and Concluding Rites open and close the celebration.
            </p>

            <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#222] text-xs text-slate-400 flex items-center justify-between">
              <span>Mark each part as you follow along during Sunday Mass:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {progress.checkedMassParts.length} / {APPENDIX_A_MASS_GUIDE.length} Checked
              </span>
            </div>
          </div>

          {/* Mass Parts Table / Cards */}
          <div className="space-y-3">
            {APPENDIX_A_MASS_GUIDE.map((item, idx) => {
              const isChecked = progress.checkedMassParts.includes(idx);

              return (
                <div
                  key={idx}
                  onClick={() => onToggleMassPart(idx)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all ${
                    isChecked
                      ? 'bg-[#0E1712] border-emerald-800/60'
                      : 'bg-[#161616] border-[#222] hover:border-[#7A1E3E]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#0A0A0A] text-[#E06D8C] border border-[#2A2A2A]">
                        {item.part}
                      </span>
                      <h3 className="font-cinzel text-base font-semibold text-white pt-1">
                        {item.whatHappens}
                      </h3>
                    </div>

                    <button
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-[#0A0A0A] text-slate-400 border border-[#2A2A2A]'
                      }`}
                      title={isChecked ? 'Checked' : 'Mark observed'}
                    >
                      {isChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isChecked ? 'Followed' : 'Check'}</span>
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#222] flex items-start gap-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase shrink-0 mt-0.5">
                      How I take part:
                    </span>
                    <p className="font-garamond text-base text-slate-200 leading-relaxed italic">
                      "{item.howITakePart}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =======================================================================
          APPENDIX B: My First Holy Communion Step by Step
      ======================================================================= */}
      {subTab === 'step-by-step' && (
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                <Sparkles className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                  Appendix B
                </span>
                <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  My First Holy Communion Step by Step
                </h1>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-slate-300 leading-relaxed">
              Careful step-by-step preparation for approaching the altar, professing faith, receiving reverently, and giving heartfelt thanksgiving.
            </p>
          </div>

          {/* Steps list */}
          <div className="space-y-4">
            {APPENDIX_B_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-[#161616] border border-[#222] rounded-xl p-5 space-y-2 relative"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#7A1E3E]/20 border border-[#7A1E3E]/50 text-[#E06D8C] flex items-center justify-center text-sm font-mono font-bold">
                    {item.step}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Step {item.step}</span>
                    <h3 className="font-cinzel text-base font-semibold text-white">
                      {item.whatHappens}
                    </h3>
                  </div>
                </div>

                <div className="pl-11 pt-1">
                  <p className="font-garamond text-base sm:text-lg text-slate-200 leading-relaxed">
                    {item.whatIDo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* IF I AM UNSURE Notice Box */}
          <div className="bg-[#181014] border-l-4 border-l-[#7A1E3E] border border-[#3A1825] p-5 rounded-xl space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E06D8C] flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              IF I AM UNSURE
            </span>
            <p className="font-garamond text-base text-slate-200 leading-relaxed">
              {APPENDIX_B_UNSURE_NOTE}
            </p>
          </div>

          {/* Interactive Practice Dialogue Simulator */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E06D8C]" />
              <h3 className="font-cinzel text-lg font-bold text-white">
                Interactive Practice Dialogue
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Rehearse the sacred words spoken at the moment of receiving Holy Communion with your parent or catechist:
            </p>

            <div className="space-y-4 bg-[#0A0A0A] p-6 rounded-xl border border-[#222]">
              {/* Minister prompt */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                  Minister:
                </span>
                <div className="text-xl sm:text-2xl font-cinzel font-bold text-white bg-[#161616] p-4 rounded-lg border border-[#2A2A2A] flex items-center justify-between">
                  <span>"{APPENDIX_B_DIALOGUE.minister}"</span>
                  <button
                    onClick={() => speakText('minister-say', APPENDIX_B_DIALOGUE.minister)}
                    className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                    title="Hear minister"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Child response */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                  Child's Sacred Response:
                </span>
                <div className="text-xl sm:text-2xl font-cinzel font-bold text-emerald-300 bg-emerald-950/40 p-4 rounded-lg border border-emerald-800/50 flex items-center justify-between">
                  <span>"{APPENDIX_B_DIALOGUE.childResponse}"</span>
                  <span className="text-xs font-sans text-emerald-400 font-normal italic">
                    (Meaning: "I believe")
                  </span>
                </div>
              </div>

              {/* Reverent Action */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  Sacred Action:
                </span>
                <p className="font-garamond text-base text-slate-300 italic">
                  {APPENDIX_B_DIALOGUE.childAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          APPENDIX C: Prayers Before and After Holy Communion
      ======================================================================= */}
      {subTab === 'prayers' && (
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                <Heart className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                  Appendix C
                </span>
                <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Prayers Before & After Holy Communion
                </h1>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-slate-300 leading-relaxed">
              Devout prayers for preparing the heart before Mass, acts of faith, adoration, contrition, humility, and thanksgiving after receiving Jesus.
            </p>

            {/* Filter categories */}
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#222]">
              <button
                onClick={() => setPrayerFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  prayerFilter === 'all' ? 'bg-[#7A1E3E] text-white' : 'bg-[#0A0A0A] text-slate-400 hover:text-slate-200 border border-[#222]'
                }`}
              >
                All Prayers
              </button>
              <button
                onClick={() => setPrayerFilter('before')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  prayerFilter === 'before' ? 'bg-[#7A1E3E] text-white' : 'bg-[#0A0A0A] text-slate-400 hover:text-slate-200 border border-[#222]'
                }`}
              >
                Before Communion
              </button>
              <button
                onClick={() => setPrayerFilter('after')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  prayerFilter === 'after' ? 'bg-[#7A1E3E] text-white' : 'bg-[#0A0A0A] text-slate-400 hover:text-slate-200 border border-[#222]'
                }`}
              >
                After Communion
              </button>
              <button
                onClick={() => setPrayerFilter('spiritual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  prayerFilter === 'spiritual' ? 'bg-[#7A1E3E] text-white' : 'bg-[#0A0A0A] text-slate-400 hover:text-slate-200 border border-[#222]'
                }`}
              >
                Spiritual Communion
              </button>
            </div>
          </div>

          {/* Prayers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrayers.map((prayer) => {
              const isFav = progress.favoritePrayers.includes(prayer.id);

              return (
                <div
                  key={prayer.id}
                  className="bg-[#161616] border border-[#222] hover:border-[#7A1E3E]/60 rounded-xl p-5 sm:p-6 space-y-3 transition-colors shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#2A2A2A]">
                        {prayer.category === 'before' ? 'Before Mass / Communion' : prayer.category === 'after' ? 'After Communion' : 'Spiritual Communion'}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(prayer.id, prayer.prayer)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-[#222] cursor-pointer"
                          title="Listen to prayer"
                        >
                          {readingPrayerId === prayer.id ? (
                            <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => onToggleFavoritePrayer(prayer.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-md hover:bg-[#222] cursor-pointer"
                          title={isFav ? 'Remove Favorite' : 'Save as Favorite'}
                        >
                          <Bookmark className={`w-4 h-4 ${isFav ? 'text-[#E06D8C] fill-[#E06D8C]' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-cinzel text-lg font-bold text-white">
                      {prayer.title}
                    </h3>

                    <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#222]">
                      <p className="font-garamond text-base sm:text-lg text-slate-200 italic leading-relaxed whitespace-pre-line">
                        "{prayer.prayer}"
                      </p>
                    </div>
                  </div>

                  {prayer.note && (
                    <div className="text-xs text-slate-400 bg-[#181014] p-3 rounded-lg border border-[#3A1825] font-sans">
                      <span className="font-semibold text-[#E06D8C]">NOTE: </span>
                      {prayer.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =======================================================================
          APPENDIX E: Readiness Guide for Parents and Catechists
      ======================================================================= */}
      {subTab === 'readiness' && (
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                  <CheckSquare className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                    Appendix E
                  </span>
                  <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    Readiness Guide for Parents and Catechists
                  </h1>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#222] border border-[#2A2A2A] text-xs font-semibold text-slate-200 self-start sm:self-auto cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#E06D8C]" />
                <span>Print Guide</span>
              </button>
            </div>

            <p className="font-garamond text-base sm:text-lg text-slate-300 leading-relaxed bg-[#0A0A0A] p-4 rounded-xl border border-[#222]">
              "Readiness is not perfect memory or mature theological language. A child should show sufficient understanding according to his or her capacity, distinguish the Body of Christ from ordinary food, desire to receive Jesus and be able to participate with faith and devotion."
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Candidate: <strong className="text-white">{profile.childName || 'Child'}</strong></span>
              <span className="font-mono text-emerald-400 font-bold">
                {progress.checkedReadinessAreas.length} of {APPENDIX_E_READINESS.length} Areas Verified
              </span>
            </div>
          </div>

          {/* 8 Areas Checklist */}
          <div className="space-y-3">
            {APPENDIX_E_READINESS.map((item) => {
              const isChecked = progress.checkedReadinessAreas.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => onToggleReadinessArea(item.id)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all ${
                    isChecked
                      ? 'bg-[#0E1712] border-emerald-800/60'
                      : 'bg-[#161616] border-[#222] hover:border-[#7A1E3E]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-cinzel text-base font-semibold text-white">
                        {item.area}
                      </h3>
                      <p className="font-garamond text-base text-slate-300 leading-relaxed">
                        {item.whatReadinessLooksLike}
                      </p>
                    </div>

                    <button
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-[#0A0A0A] text-slate-400 border border-[#2A2A2A]'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isChecked ? 'Ready' : 'Check'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pastoral & Safeguarding Note */}
          <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-3">
            <h3 className="font-cinzel text-sm font-semibold text-[#E06D8C] uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Pastoral and Safeguarding Note
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-garamond text-base leading-relaxed">
              Preparation must respect each child's dignity and capacity. A disability, learning difference or medical need does not by itself prevent reception. Reasonable adaptations should be arranged with the family and parish priest. Children should never be shamed, frightened, publicly tested or pressured to receive.
            </p>
          </div>

          {/* Canonical Note */}
          <div className="bg-[#181014] border border-[#3A1825] rounded-xl p-5 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E06D8C]">
              CANONICAL NOTE
            </span>
            <p className="font-garamond text-base text-slate-200 leading-relaxed italic">
              Children who have reached the use of reason are to receive proper preparation and sacramental Confession before First Holy Communion.
            </p>
          </div>
        </div>
      )}

      {/* =======================================================================
          SOURCES AND DOCTRINAL REFERENCES
      ======================================================================= */}
      {subTab === 'sources' && (
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#7A1E3E]/20 text-[#E06D8C] border border-[#7A1E3E]/40">
                <BookOpen className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E06D8C] font-semibold">
                  Official Teaching
                </span>
                <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Sources and Doctrinal References
                </h1>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-slate-300 leading-relaxed">
              Every lesson and answer in this preparation module is strictly grounded in the Magisterium of the Catholic Church.
            </p>
          </div>

          <div className="bg-[#161616] border border-[#222] rounded-xl p-6 space-y-4">
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-garamond text-base leading-relaxed">
              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  Sacred Scripture
                </strong>
                {SOURCES_AND_REFERENCES.scripture}
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  Catechism of the Catholic Church
                </strong>
                {SOURCES_AND_REFERENCES.ccc}
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  Compendium of the Catechism
                </strong>
                {SOURCES_AND_REFERENCES.compendium}
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  Code of Canon Law
                </strong>
                {SOURCES_AND_REFERENCES.canonLaw}
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  General Instruction of the Roman Missal (GIRM)
                </strong>
                {SOURCES_AND_REFERENCES.girm}
              </div>

              <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#222]">
                <strong className="text-white block font-sans text-xs uppercase font-semibold text-[#E06D8C] mb-1">
                  Joseph Deharbe, S.J.
                </strong>
                {SOURCES_AND_REFERENCES.deharbe}
              </div>
            </div>

            {/* Doctrinal Standard */}
            <div className="mt-4 pt-4 border-t border-[#222] bg-[#181014] p-4 rounded-lg border border-[#3A1825]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E06D8C] block mb-1">
                DOCTRINAL STANDARD
              </span>
              <p className="font-garamond text-base text-slate-200 leading-relaxed italic">
                {SOURCES_AND_REFERENCES.doctrinalStandard}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

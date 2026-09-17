import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  Snail, 
  ArrowRight, 
  BookMarked,
  ChevronDown,
  Filter,
  Check,
  Heart,
  Activity,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Bookmark,
  CreditCard
} from 'lucide-react';
import { VocabItem, MasteryStatus } from '../types';
import { RELATED_CLUSTERS, VOCAB_MAP, SYSTEM_CATEGORIES, ALL_VOCAB } from '../data';
import { speakWord, soundManager } from '../utils/audio';

interface RelatedGroupsViewProps {
  onSelectWordDetail: (word: VocabItem) => void;
  onStartQuizWithWords: (words: VocabItem[]) => void;
  onStartFlashcardWithWords?: (words: VocabItem[]) => void;
  masteryStatus?: Record<string, MasteryStatus>;
  onUpdateMastery?: (wordId: string, status: MasteryStatus | null) => void;
  bookmarkedIds?: string[];
  onToggleBookmark?: (wordId: string) => void;
}

const MEDICAL_AFFIXES = [
  { affix: '-itis', type: 'Suffix (คำลงท้าย)', meaningTh: 'การอักเสบ (Inflammation)', examples: ['dermatitis', 'otitis', 'cystitis', 'arthritis', 'gingivitis', 'uveitis'] },
  { affix: '-megaly', type: 'Suffix (คำลงท้าย)', meaningTh: 'ภาวะขยายใหญ่ผิดปกติ (Enlargement)', examples: ['cardiomegaly', 'hepatomegaly', 'splenomegaly', 'nephromegaly'] },
  { affix: '-uria', type: 'Suffix (คำลงท้าย)', meaningTh: 'เกี่ยวกับปัสสาวะ / ภาวะในปัสสาวะ', examples: ['polyuria', 'oliguria', 'anuria', 'hematuria', 'dysuria', 'pyuria'] },
  { affix: '-algia / -dynia', type: 'Suffix (คำลงท้าย)', meaningTh: 'อาการเจ็บปวด (Pain)', examples: ['otalgia', 'cystalgia', 'odynophagia'] },
  { affix: '-rrhea', type: 'Suffix (คำลงท้าย)', meaningTh: 'การไหล / สารคัดหลั่งออกมาก (Discharge/Flow)', examples: ['diarrhea', 'otorrhea', 'steatorrhea', 'galactorrhea'] },
  { affix: '-rrhagia', type: 'Suffix (คำลงท้าย)', meaningTh: 'การตกเลือด / เลือดออกมาก (Excessive bleeding)', examples: ['hemorrhage', 'otorrhagia', 'epistaxis'] },
  { affix: '-cele', type: 'Suffix (คำลงท้าย)', meaningTh: 'ถุงน้ำ / การโป่งนูนยื่น (Hernia/Swelling)', examples: ['sialocele', 'arthrocele', 'vaginocele'] },
  { affix: '-spasm', type: 'Suffix (คำลงท้าย)', meaningTh: 'การบีบเกร็ง / กระตุกฉับพลัน (Involuntary contraction)', examples: ['blepharospasm', 'myospasm', 'clonic_spasm'] },
  { affix: 'hyper-', type: 'Prefix (คำนำหน้า)', meaningTh: 'มากเกิน / สูงเกิน (Above / Excessive)', examples: ['hyperthermia', 'hyperpnea', 'hyperkeratosis', 'hypertrophy'] },
  { affix: 'hypo-', type: 'Prefix (คำนำหน้า)', meaningTh: 'น้อยเกิน / ต่ำกว่าปกติ (Below / Deficient)', examples: ['hypothermia', 'hypoppnea', 'hypoventilation', 'hypopigmentation'] },
  { affix: 'tachy-', type: 'Prefix (คำนำหน้า)', meaningTh: 'เร็ว (Fast / Rapid)', examples: ['tachycardia', 'tachypnea'] },
  { affix: 'brady-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ช้า (Slow)', examples: ['bradycardia', 'bradyuria'] },
  { affix: 'dys-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ยาก / ลำบาก / ผิดปกติ (Difficult / Painful / Bad)', examples: ['dyspnea', 'dysphagia', 'dyschezia', 'dysuria', 'dystocia'] },
  { affix: 'a- / an-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ไม่มี / ขาดหาย / ปราศจาก (Without / Lack of)', examples: ['anuria', 'anorexia', 'alopecia', 'anophthalmos', 'afebrile'] },
];

export const RelatedGroupsView: React.FC<RelatedGroupsViewProps> = ({
  onSelectWordDetail,
  onStartQuizWithWords,
  onStartFlashcardWithWords,
  masteryStatus = {},
  onUpdateMastery,
  bookmarkedIds = [],
  onToggleBookmark,
}) => {
  const organCategories = useMemo(() => SYSTEM_CATEGORIES.filter(c => c.isOrgan), []);
  const [selectedOrganId, setSelectedOrganId] = useState<string>(organCategories[0]?.id || 'ระบบหัวใจและหลอดเลือด');
  const [selectedClusterId, setSelectedClusterId] = useState<string>(RELATED_CLUSTERS[0].id);
  const [activeTab, setActiveTab] = useState<'organs' | 'clusters' | 'affixes'>('organs');
  const [selectedMasteryFilter, setSelectedMasteryFilter] = useState<'all' | MasteryStatus | 'unrated'>('all');
  const [mobileClusterDropdownOpen, setMobileClusterDropdownOpen] = useState(false);
  const [mobileOrganDropdownOpen, setMobileOrganDropdownOpen] = useState(false);

  // Lock background scroll when mobile dropdown is open
  useEffect(() => {
    if (mobileClusterDropdownOpen || mobileOrganDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileClusterDropdownOpen, mobileOrganDropdownOpen]);

  const selectedCluster = RELATED_CLUSTERS.find(c => c.id === selectedClusterId) || RELATED_CLUSTERS[0];
  const clusterWords = useMemo(() => {
    return selectedCluster.wordIds
      .map(id => VOCAB_MAP.get(id))
      .filter((item): item is VocabItem => Boolean(item));
  }, [selectedCluster]);

  const selectedOrgan = organCategories.find(c => c.id === selectedOrganId) || organCategories[0];
  const organWords = useMemo(() => {
    return ALL_VOCAB.filter(w => w.category.includes(selectedOrgan.id) || w.relatedGroup.includes(selectedOrgan.id))
      .sort((a, b) => a.word.localeCompare(b.word));
  }, [selectedOrgan.id]);

  // Compute mastery counts for organ words
  const organMasteryCounts = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let forgotten = 0;
    let unrated = 0;

    organWords.forEach(item => {
      const status = masteryStatus[item.id];
      if (status === 'mastered') mastered++;
      else if (status === 'learning') learning++;
      else if (status === 'forgotten') forgotten++;
      else unrated++;
    });

    return { all: organWords.length, mastered, learning, forgotten, unrated };
  }, [organWords, masteryStatus]);

  const filteredOrganWords = useMemo(() => {
    if (selectedMasteryFilter === 'all') return organWords;
    if (selectedMasteryFilter === 'unrated') {
      return organWords.filter(item => !masteryStatus[item.id]);
    }
    return organWords.filter(item => masteryStatus[item.id] === selectedMasteryFilter);
  }, [organWords, selectedMasteryFilter, masteryStatus]);

  // Compute mastery counts for cluster words
  const clusterMasteryCounts = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let forgotten = 0;
    let unrated = 0;

    clusterWords.forEach(item => {
      const status = masteryStatus[item.id];
      if (status === 'mastered') mastered++;
      else if (status === 'learning') learning++;
      else if (status === 'forgotten') forgotten++;
      else unrated++;
    });

    return { all: clusterWords.length, mastered, learning, forgotten, unrated };
  }, [clusterWords, masteryStatus]);

  const filteredClusterWords = useMemo(() => {
    if (selectedMasteryFilter === 'all') return clusterWords;
    if (selectedMasteryFilter === 'unrated') {
      return clusterWords.filter(item => !masteryStatus[item.id]);
    }
    return clusterWords.filter(item => masteryStatus[item.id] === selectedMasteryFilter);
  }, [clusterWords, selectedMasteryFilter, masteryStatus]);

  const handlePronounce = async (e: React.MouseEvent, word: string, slow: boolean = false) => {
    e.stopPropagation();
    soundManager.playClick();
    await speakWord(word, slow);
  };

  const renderMasteryFilterBar = (counts: { all: number; mastered: number; learning: number; forgotten: number; unrated: number }, groupName: string) => {
    return (
      <div className="bg-[#F8FAFC] p-3 sm:p-4 rounded-xl border border-[#D2E0EC] space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A43]">
            <span>ระดับความจำ ({groupName}):</span>
            {selectedMasteryFilter !== 'all' && (
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                <span>แสดงเฉพาะ:</span>
                <span className="font-bold">
                  {selectedMasteryFilter === 'mastered' && '✓ จำได้แล้ว'}
                  {selectedMasteryFilter === 'learning' && '⚡ พอจำได้'}
                  {selectedMasteryFilter === 'forgotten' && '✕ จำไม่ได้ (ต้องทบทวน)'}
                  {selectedMasteryFilter === 'unrated' && 'ยังไม่ประเมิน'}
                </span>
              </span>
            )}
          </div>

          {selectedMasteryFilter !== 'all' && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('all');
              }}
              className="text-xs text-[#627D98] hover:text-[#102A43] underline font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>แสดงทั้งหมด ({counts.all} คำ)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
          {/* All */}
          <button
            id={`filter-mastery-all-${activeTab}`}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedMasteryFilter('all');
            }}
            className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedMasteryFilter === 'all'
                ? 'bg-[#334E68] text-white border-[#334E68] shadow-xs'
                : 'bg-white hover:bg-[#F0F5FA] text-[#334E68] border-[#D2E0EC]'
            }`}
          >
            <span>ทั้งหมด</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedMasteryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#E4ECF4] text-[#334E68]'
            }`}>
              {counts.all}
            </span>
          </button>

          {/* Mastered */}
          <button
            id={`filter-mastery-mastered-${activeTab}`}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedMasteryFilter('mastered');
            }}
            className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedMasteryFilter === 'mastered'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>จำได้แล้ว</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedMasteryFilter === 'mastered' ? 'bg-white/20 text-white' : 'bg-emerald-200 text-emerald-900'
            }`}>
              {counts.mastered}
            </span>
          </button>

          {/* Learning */}
          <button
            id={`filter-mastery-learning-${activeTab}`}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedMasteryFilter('learning');
            }}
            className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedMasteryFilter === 'learning'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>พอจำได้</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedMasteryFilter === 'learning' ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-900'
            }`}>
              {counts.learning}
            </span>
          </button>

          {/* Forgotten */}
          <button
            id={`filter-mastery-forgotten-${activeTab}`}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedMasteryFilter('forgotten');
            }}
            className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedMasteryFilter === 'forgotten'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
              <span>จำไม่ได้</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedMasteryFilter === 'forgotten' ? 'bg-white/20 text-white' : 'bg-rose-200 text-rose-900'
            }`}>
              {counts.forgotten}
            </span>
          </button>

          {/* Unrated */}
          <button
            id={`filter-mastery-unrated-${activeTab}`}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedMasteryFilter('unrated');
            }}
            className={`col-span-2 sm:col-span-1 flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedMasteryFilter === 'unrated'
                ? 'bg-[#486581] text-white border-[#486581] shadow-xs'
                : 'bg-white hover:bg-[#F0F5FA] text-[#486581] border-[#D2E0EC]'
            }`}
          >
            <span>ยังไม่ประเมิน</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedMasteryFilter === 'unrated' ? 'bg-white/20 text-white' : 'bg-[#D2E0EC] text-[#486581]'
            }`}>
              {counts.unrated}
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#D2E0EC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#E8EFF6] text-[#334E68]">
            หมวดหมู่ความหมายสัมพันธ์ & ระบบร่างกาย
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43]">
            หมวดหมู่ระบบอวัยวะ, กลุ่มโรค & รากศัพท์
          </h1>
          <p className="text-sm text-[#627D98] max-w-2xl">
            เรียนรู้คำศัพท์แยกตามระบบอวัยวะทั้ง 11 ระบบ กลุ่มรอยโรค อาการตรงข้าม และรากศัพท์การแพทย์ ช่วยให้จำแม่นยำและเชื่อมโยงได้รวดเร็ว
          </p>
        </div>

        {/* View Mode Toggle (3 tabs: Organs, Clusters, Affixes) */}
        <div className="w-full sm:w-auto grid grid-cols-3 sm:flex bg-[#F0F5FA] p-1 rounded-xl text-sm font-semibold shrink-0 border border-[#D2E0EC]">
          <button
            id="tab-btn-organs"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('organs');
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
              activeTab === 'organs'
                ? 'bg-rose-600 text-white shadow-xs font-bold'
                : 'text-[#627D98] hover:text-[#102A43]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>ระบบอวัยวะ ({organCategories.length})</span>
          </button>
          <button
            id="tab-btn-clusters"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('clusters');
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
              activeTab === 'clusters'
                ? 'bg-white text-[#102A43] shadow-xs font-bold'
                : 'text-[#627D98] hover:text-[#102A43]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>กลุ่มโรค ({RELATED_CLUSTERS.length})</span>
          </button>
          <button
            id="tab-btn-affixes"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('affixes');
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
              activeTab === 'affixes'
                ? 'bg-white text-[#102A43] shadow-xs font-bold'
                : 'text-[#627D98] hover:text-[#102A43]'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>รากศัพท์ & ปัจจัย</span>
          </button>
        </div>
      </div>

      {activeTab === 'organs' ? (
        /* Organ Systems Section */
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
          {/* Mobile Organ Dropdown */}
          <div className="lg:hidden space-y-2">
            <button
              id="btn-mobile-organ-dropdown"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileOrganDropdownOpen(!mobileOrganDropdownOpen);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#D2E0EC] text-[#102A43] text-sm font-bold shadow-xs active:bg-[#F0F5FA] transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Heart className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[#627D98] font-normal text-xs">ระบบอวัยวะ:</span>
                <span className="truncate font-bold text-[#102A43]">
                  {selectedOrgan.nameTh} ({organWords.length} คำ)
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#486581] transition-transform duration-200 shrink-0 ${mobileOrganDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileOrganDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                  onClick={() => setMobileOrganDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="mt-1.5 p-2 bg-white rounded-xl border border-[#D2E0EC] shadow-2xl max-h-72 overflow-y-auto space-y-1 animate-slide-up z-50 relative">
                  {organCategories.map((organ) => {
                    const isSelected = organ.id === selectedOrganId;
                    const count = ALL_VOCAB.filter(w => w.category.includes(organ.id) || w.relatedGroup.includes(organ.id)).length;
                    return (
                      <button
                        key={organ.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedOrganId(organ.id);
                          setMobileOrganDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-xs transition-colors text-left ${
                          isSelected
                            ? 'bg-rose-700 text-white font-bold'
                            : 'text-[#334E68] hover:bg-[#F0F5FA]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold truncate">{organ.nameTh}</p>
                          <p className={`text-[11px] truncate ${isSelected ? 'text-rose-100' : 'text-[#627D98]'}`}>{organ.nameEn}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-rose-900 text-white' : 'bg-[#E4ECF4] text-[#334E68]'}`}>
                            {count} คำ
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Desktop: Organ Systems Sidebar */}
          <div className="hidden lg:block lg:col-span-4 bg-white p-4 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-[#829AB1] uppercase tracking-wider px-2 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>เลือกระบบอวัยวะ (11 ระบบ)</span>
            </h3>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {organCategories.map((organ) => {
                const isSelected = organ.id === selectedOrganId;
                const count = ALL_VOCAB.filter(w => w.category.includes(organ.id) || w.relatedGroup.includes(organ.id)).length;

                return (
                  <button
                    key={organ.id}
                    id={`organ-btn-${organ.id}`}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedOrganId(organ.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-rose-700 border-rose-700 text-white shadow-2xs'
                        : 'bg-[#F0F5FA] hover:bg-rose-50 border-[#D2E0EC] text-[#243B53]'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#102A43]'}`}>
                        {organ.nameTh}
                      </p>
                      <p className={`text-xs truncate ${isSelected ? 'text-rose-100' : 'text-[#627D98]'}`}>
                        {organ.nameEn}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                      isSelected ? 'bg-rose-900 text-white' : 'bg-[#E4ECF4] text-[#334E68]'
                    }`}>
                      {count} คำ
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Organ Word Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D2E0EC] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <h2 className="text-lg sm:text-xl font-bold text-[#102A43]">
                      {selectedOrgan.nameTh}
                    </h2>
                  </div>
                  <p className="text-sm font-medium text-[#627D98] mt-0.5">
                    {selectedOrgan.nameEn} • ครอบคลุม: {selectedOrgan.organNameTh || selectedOrgan.nameTh} • {organWords.length} คำศัพท์
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {onStartFlashcardWithWords && (
                    <button
                      id="btn-flashcard-organ"
                      onClick={() => {
                        soundManager.playClick();
                        onStartFlashcardWithWords(filteredOrganWords.length > 0 ? filteredOrganWords : organWords);
                      }}
                      className="px-3.5 py-2 text-sm font-semibold rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#102A43] border border-[#D2E0EC] flex items-center gap-1.5 shrink-0 transition-colors"
                      title="ทบทวนด้วยแฟลชการ์ด"
                    >
                      <CreditCard className="w-4 h-4 text-[#486581]" />
                      <span>แฟลชการ์ด</span>
                    </button>
                  )}

                  <button
                    id="btn-quiz-organ"
                    onClick={() => {
                      soundManager.playClick();
                      onStartQuizWithWords(filteredOrganWords.length > 0 ? filteredOrganWords : organWords);
                    }}
                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>เริ่มทำควิซ ({filteredOrganWords.length} คำ)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mastery Filter Bar for Organ */}
            {renderMasteryFilterBar(organMasteryCounts, selectedOrgan.nameTh)}

            {/* Grid of words in this organ */}
            {filteredOrganWords.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-xl border border-[#D2E0EC] space-y-3">
                <p className="font-bold text-base text-[#102A43]">
                  ไม่พบคำศัพท์ที่ตรงกับระดับความจำที่เลือก
                </p>
                <p className="text-xs sm:text-sm text-[#627D98]">
                  ลองเลือกระดับอื่น หรือกดแสดงคำศัพท์ทั้งหมดในระบบ {selectedOrgan.nameTh}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedMasteryFilter('all');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#486581] text-white hover:bg-[#334E68] inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>แสดงคำศัพท์ทั้งหมด ({organWords.length} คำ)</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredOrganWords.map((item) => {
                  const isBookmarked = bookmarkedIds.includes(item.id);
                  const currentMastery = masteryStatus[item.id];

                  return (
                    <div
                      key={item.id}
                      id={`organ-word-card-${item.id}`}
                      onClick={() => {
                        soundManager.playClick();
                        onSelectWordDetail(item);
                      }}
                      className="bg-white rounded-xl p-4 sm:p-5 border border-[#D2E0EC] shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-lg font-bold text-[#102A43] group-hover:text-rose-700 transition-colors">
                              {item.word}
                            </h4>
                            <p className="text-xs text-[#829AB1] font-mono">
                              {item.phoneticTh}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {onToggleBookmark && (
                              <button
                                id={`btn-bookmark-organ-${item.id}`}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundManager.playClick();
                                  onToggleBookmark(item.id);
                                }}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isBookmarked
                                    ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                    : 'text-[#829AB1] hover:text-[#334E68] hover:bg-[#F0F5FA]'
                                }`}
                                title={isBookmarked ? 'ลบออกจากคำที่บันทึก' : 'บันทึกคำนี้'}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                              </button>
                            )}

                            <button
                              onClick={(e) => handlePronounce(e, item.word, false)}
                              className="p-1.5 rounded-lg text-[#486581] hover:text-[#102A43] hover:bg-[#E4ECF4] transition-colors"
                              title="ฟังเสียงปกติ"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handlePronounce(e, item.word, true)}
                              className="p-1.5 rounded-lg text-[#829AB1] hover:text-[#334E68] hover:bg-[#E4ECF4] transition-colors"
                              title="ฟังเสียงช้า"
                            >
                              <Snail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-[#243B53]">
                          {item.meaning}
                        </p>

                        {item.rootMeaning && (
                          <p className="text-xs text-[#627D98] bg-[#F0F5FA] p-2.5 rounded-lg border border-[#D2E0EC]">
                            {item.rootMeaning}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        {/* Quick Mastery Status Toggle */}
                        {onUpdateMastery && (
                          <div 
                            className="pt-2.5 border-t border-[#E8EFF6] flex items-center justify-between gap-1 flex-wrap" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-xs font-bold text-[#627D98]">ระดับความจำ:</span>
                            <div className="flex items-center gap-1">
                              <button
                                id={`btn-mastery-mastered-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'mastered' ? null : 'mastered';
                                  if (next) soundManager.playCorrect();
                                  else soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'mastered'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#047857] hover:bg-emerald-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: จำได้แล้ว"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>จำได้</span>
                              </button>
                              <button
                                id={`btn-mastery-learning-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'learning' ? null : 'learning';
                                  soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'learning'
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#B45309] hover:bg-amber-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: พอจำได้"
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>พอจำได้</span>
                              </button>
                              <button
                                id={`btn-mastery-forgotten-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'forgotten' ? null : 'forgotten';
                                  soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'forgotten'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#B91C1C] hover:bg-rose-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: จำไม่ได้"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>จำไม่ได้</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#E8EFF6] flex items-center justify-between text-xs text-[#829AB1]">
                          <span className="text-rose-700 font-semibold">{item.category}</span>
                          <span className="text-[#334E68] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            ดูรายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'clusters' ? (
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
          {/* Mobile Cluster Dropdown */}
          <div className="lg:hidden space-y-2">
            <button
              id="btn-mobile-cluster-dropdown"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileClusterDropdownOpen(!mobileClusterDropdownOpen);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#D2E0EC] text-[#102A43] text-sm font-bold shadow-xs active:bg-[#F0F5FA] transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Filter className="w-4 h-4 text-[#486581] shrink-0" />
                <span className="text-[#627D98] font-normal text-xs">กลุ่มโรค:</span>
                <span className="truncate font-bold text-[#102A43]">
                  {selectedCluster.titleTh} ({selectedCluster.wordIds.length} คำ)
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#486581] transition-transform duration-200 shrink-0 ${mobileClusterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileClusterDropdownOpen && (
              <>
                {/* Backdrop to close when tapping outside */}
                <div 
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                  onClick={() => setMobileClusterDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="mt-1.5 p-2 bg-white rounded-xl border border-[#D2E0EC] shadow-2xl max-h-72 overflow-y-auto space-y-1 animate-slide-up z-50 relative">
                  {RELATED_CLUSTERS.map((cluster) => {
                    const isSelected = cluster.id === selectedClusterId;
                    return (
                      <button
                        key={cluster.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedClusterId(cluster.id);
                          setMobileClusterDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-xs transition-colors text-left ${
                          isSelected
                            ? 'bg-[#334E68] text-white font-bold'
                            : 'text-[#334E68] hover:bg-[#F0F5FA]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold truncate">{cluster.titleTh}</p>
                          <p className={`text-[11px] truncate ${isSelected ? 'text-[#D2E0EC]' : 'text-[#627D98]'}`}>{cluster.titleEn}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-[#102A43] text-white' : 'bg-[#E4ECF4] text-[#334E68]'}`}>
                            {cluster.wordIds.length} คำ
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Desktop: Cluster List Sidebar */}
          <div className="hidden lg:block lg:col-span-4 bg-white p-4 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-[#829AB1] uppercase tracking-wider px-2">
              เลือกกลุ่มรอยโรค
            </h3>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {RELATED_CLUSTERS.map((cluster) => {
                const isSelected = cluster.id === selectedClusterId;
                const count = cluster.wordIds.length;

                return (
                  <button
                    key={cluster.id}
                    id={`cluster-btn-${cluster.id}`}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedClusterId(cluster.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#334E68] border-[#334E68] text-white'
                        : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] border-[#D2E0EC] text-[#243B53]'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#102A43]'}`}>
                        {cluster.titleTh}
                      </p>
                      <p className={`text-xs truncate ${isSelected ? 'text-[#D2E0EC]' : 'text-[#627D98]'}`}>
                        {cluster.titleEn}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                      isSelected ? 'bg-[#102A43] text-white' : 'bg-[#E4ECF4] text-[#334E68]'
                    }`}>
                      {count} คำ
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Cluster Word Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D2E0EC] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#102A43]">
                    {selectedCluster.titleTh}
                  </h2>
                  <p className="text-sm font-medium text-[#627D98]">
                    {selectedCluster.titleEn} • {clusterWords.length} คำศัพท์
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {onStartFlashcardWithWords && (
                    <button
                      id="btn-flashcard-cluster"
                      onClick={() => {
                        soundManager.playClick();
                        onStartFlashcardWithWords(filteredClusterWords.length > 0 ? filteredClusterWords : clusterWords);
                      }}
                      className="px-3.5 py-2 text-sm font-semibold rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#102A43] border border-[#D2E0EC] flex items-center gap-1.5 shrink-0 transition-colors"
                      title="ทบทวนด้วยแฟลชการ์ด"
                    >
                      <CreditCard className="w-4 h-4 text-[#486581]" />
                      <span>แฟลชการ์ด</span>
                    </button>
                  )}

                  <button
                    id="btn-quiz-cluster"
                    onClick={() => {
                      soundManager.playClick();
                      onStartQuizWithWords(filteredClusterWords.length > 0 ? filteredClusterWords : clusterWords);
                    }}
                    className="px-4 py-2 text-sm font-semibold rounded-xl btn-primary flex items-center gap-1.5 shrink-0"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>ทดสอบกลุ่มนี้ ({filteredClusterWords.length} ข้อ)</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-[#334E68] bg-[#F0F5FA] p-3.5 rounded-xl border border-[#D2E0EC] leading-relaxed">
                <span className="font-bold text-[#102A43]">คำอธิบาย:</span> {selectedCluster.descriptionTh}
              </p>
            </div>

            {/* Mastery Filter Bar for Cluster */}
            {renderMasteryFilterBar(clusterMasteryCounts, selectedCluster.titleTh)}

            {/* Word Grid in Cluster */}
            {filteredClusterWords.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-xl border border-[#D2E0EC] space-y-3">
                <p className="font-bold text-base text-[#102A43]">
                  ไม่พบคำศัพท์ที่ตรงกับระดับความจำที่เลือก
                </p>
                <p className="text-xs sm:text-sm text-[#627D98]">
                  ลองเลือกระดับอื่น หรือกดแสดงคำศัพท์ทั้งหมดในกลุ่ม {selectedCluster.titleTh}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedMasteryFilter('all');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#486581] text-white hover:bg-[#334E68] inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>แสดงคำศัพท์ทั้งหมด ({clusterWords.length} คำ)</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredClusterWords.map((item) => {
                  const isBookmarked = bookmarkedIds.includes(item.id);
                  const currentMastery = masteryStatus[item.id];

                  return (
                    <div
                      key={item.id}
                      id={`cluster-word-card-${item.id}`}
                      onClick={() => {
                        soundManager.playClick();
                        onSelectWordDetail(item);
                      }}
                      className="bg-white hover:bg-[#F7FAFC] p-4.5 rounded-xl border border-[#D2E0EC] shadow-xs transition-colors cursor-pointer group flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-base sm:text-lg text-[#102A43] group-hover:text-[#006270] transition-colors">
                              {item.word}
                            </h4>
                            <span className="text-sm text-[#486581] font-semibold">
                              {item.phoneticTh}
                            </span>
                          </div>

                          {/* Audio & Bookmark Buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            {onToggleBookmark && (
                              <button
                                id={`btn-bookmark-cluster-${item.id}`}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundManager.playClick();
                                  onToggleBookmark(item.id);
                                }}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isBookmarked
                                    ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                    : 'text-[#829AB1] hover:text-[#334E68] hover:bg-[#F0F5FA]'
                                }`}
                                title={isBookmarked ? 'ลบออกจากคำที่บันทึก' : 'บันทึกคำนี้'}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                              </button>
                            )}

                            <button
                              onClick={(e) => handlePronounce(e, item.word, false)}
                              className="p-1.5 rounded-lg text-[#627D98] hover:text-[#102A43] hover:bg-[#E4ECF4] transition-colors"
                              title="ฟังเสียงปกติ"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handlePronounce(e, item.word, true)}
                              className="p-1.5 rounded-lg text-[#829AB1] hover:text-[#334E68] hover:bg-[#E4ECF4] transition-colors"
                              title="ฟังเสียงช้า"
                            >
                              <Snail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-[#243B53]">
                          {item.meaning}
                        </p>

                        {item.rootMeaning && (
                          <p className="text-xs text-[#627D98] bg-[#F0F5FA] p-2.5 rounded-lg border border-[#D2E0EC]">
                            {item.rootMeaning}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        {/* Quick Mastery Status Toggle */}
                        {onUpdateMastery && (
                          <div 
                            className="pt-2.5 border-t border-[#E8EFF6] flex items-center justify-between gap-1 flex-wrap" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-xs font-bold text-[#627D98]">ระดับความจำ:</span>
                            <div className="flex items-center gap-1">
                              <button
                                id={`btn-cluster-mastery-mastered-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'mastered' ? null : 'mastered';
                                  if (next) soundManager.playCorrect();
                                  else soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'mastered'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#047857] hover:bg-emerald-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: จำได้แล้ว"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>จำได้</span>
                              </button>
                              <button
                                id={`btn-cluster-mastery-learning-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'learning' ? null : 'learning';
                                  soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'learning'
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#B45309] hover:bg-amber-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: พอจำได้"
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>พอจำได้</span>
                              </button>
                              <button
                                id={`btn-cluster-mastery-forgotten-${item.id}`}
                                type="button"
                                onClick={() => {
                                  const next = currentMastery === 'forgotten' ? null : 'forgotten';
                                  soundManager.playClick();
                                  onUpdateMastery(item.id, next);
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                  currentMastery === 'forgotten'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-[#F0F5FA] text-[#B91C1C] hover:bg-rose-50 border border-[#D2E0EC]'
                                }`}
                                title="ติ๊ก: จำไม่ได้"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>จำไม่ได้</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#E8EFF6] flex items-center justify-between text-xs text-[#829AB1]">
                          <span>{item.category}</span>
                          <span className="text-[#334E68] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            ดูรายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Affixes Section */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MEDICAL_AFFIXES.map((affix, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-[#D2E0EC] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#102A43] bg-[#E8EFF6] px-2.5 py-1 rounded-md font-mono">
                    {affix.affix}
                  </span>
                  <span className="text-xs text-[#627D98] font-semibold">
                    {affix.type}
                  </span>
                </div>

                <p className="text-sm font-bold text-[#243B53]">
                  {affix.meaningTh}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#E8EFF6]">
                  <span className="text-xs text-[#829AB1] font-bold uppercase">ตัวอย่างคำในระบบ:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {affix.examples.map((exId) => {
                      const exWord = VOCAB_MAP.get(exId);
                      if (!exWord) return null;

                      return (
                        <button
                          key={exId}
                          onClick={() => {
                            soundManager.playClick();
                            onSelectWordDetail(exWord);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#243B53] text-xs font-semibold border border-[#D2E0EC] transition-colors"
                        >
                          {exWord.word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Volume2, 
  Snail, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  SlidersHorizontal,
  Volume1,
  ChevronDown,
  Check,
  Filter,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Sparkles,
  CreditCard,
  Keyboard,
  ListFilter,
  Play
} from 'lucide-react';
import { VocabItem, MasteryStatus } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface DictionaryViewProps {
  vocabList: VocabItem[];
  bookmarkedIds: string[];
  masteryStatus: Record<string, MasteryStatus>;
  onToggleBookmark: (id: string) => void;
  onUpdateMastery: (wordId: string, status: MasteryStatus | null) => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onStartQuizWithWords?: (words: VocabItem[]) => void;
  onStartFlashcardWithWords?: (words: VocabItem[]) => void;
  onStartTypingWithWords?: (words: VocabItem[]) => void;
  onStartAudioPracticeWithWords?: (words: VocabItem[]) => void;
}

const ALPHABET = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  vocabList,
  bookmarkedIds,
  masteryStatus,
  onToggleBookmark,
  onUpdateMastery,
  onSelectWordDetail,
  onStartQuizWithWords,
  onStartFlashcardWithWords,
  onStartTypingWithWords,
  onStartAudioPracticeWithWords,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMasteryFilter, setSelectedMasteryFilter] = useState<'all' | MasteryStatus | 'unrated'>('all');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileLetterOpen, setMobileLetterOpen] = useState(false);

  // Lock background scroll when dropdown is open
  useEffect(() => {
    if (mobileCategoryOpen || mobileLetterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileCategoryOpen, mobileLetterOpen]);

  // Mastery Category Counts
  const masteryCounts = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let forgotten = 0;
    let unrated = 0;
    vocabList.forEach((item) => {
      const status = masteryStatus[item.id];
      if (status === 'mastered') mastered++;
      else if (status === 'learning') learning++;
      else if (status === 'forgotten') forgotten++;
      else unrated++;
    });
    return { all: vocabList.length, mastered, learning, forgotten, unrated };
  }, [vocabList, masteryStatus]);

  // Filtered and Sorted Vocab
  const filteredVocab = useMemo(() => {
    return vocabList.filter((item) => {
      if (showOnlyBookmarked && !bookmarkedIds.includes(item.id)) {
        return false;
      }
      // Mastery Status Category Filter
      if (selectedMasteryFilter !== 'all') {
        const status = masteryStatus[item.id];
        if (selectedMasteryFilter === 'unrated') {
          if (status) return false;
        } else {
          if (status !== selectedMasteryFilter) return false;
        }
      }
      // A-Z Letter Filter
      if (selectedLetter !== 'ALL') {
        const firstLetter = item.word.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }
      // Medical Category & Related Group Filter
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory) && !item.relatedGroup.includes(selectedCategory)) {
          return false;
        }
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(query);
        const matchesMeaning = item.meaning.toLowerCase().includes(query);
        const matchesPhonetic = item.phoneticTh.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesGroup = item.relatedGroup.toLowerCase().includes(query);
        const matchesRoot = item.rootMeaning ? item.rootMeaning.toLowerCase().includes(query) : false;
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));

        return matchesWord || matchesMeaning || matchesPhonetic || matchesCategory || matchesGroup || matchesRoot || matchesTags;
      }
      return true;
    }).sort((a, b) => a.word.localeCompare(b.word));
  }, [vocabList, searchQuery, selectedLetter, selectedCategory, selectedMasteryFilter, showOnlyBookmarked, bookmarkedIds, masteryStatus]);

  const handlePronounce = async (e: React.MouseEvent, text: string, id: string, slow: boolean = false) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveSpeechId(`${id}_${slow ? 'slow' : 'norm'}`);
    await speakWord(text, slow);
    setActiveSpeechId(null);
  };

  const handlePronounceThai = async (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveSpeechId(`${id}_th`);
    await speakThai(text, false);
    setActiveSpeechId(null);
  };

  const letterCounts = useMemo(() => {
    const map: Record<string, number> = { ALL: 0 };
    vocabList.forEach((item) => {
      if (showOnlyBookmarked && !bookmarkedIds.includes(item.id)) return;
      if (selectedMasteryFilter !== 'all') {
        const status = masteryStatus[item.id];
        if (selectedMasteryFilter === 'unrated') {
          if (status) return;
        } else {
          if (status !== selectedMasteryFilter) return;
        }
      }
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory) && !item.relatedGroup.includes(selectedCategory)) {
          return;
        }
      }
      map.ALL = (map.ALL || 0) + 1;
      const char = item.word.trim().charAt(0).toUpperCase();
      map[char] = (map[char] || 0) + 1;
    });
    return map;
  }, [vocabList, selectedCategory, selectedMasteryFilter, showOnlyBookmarked, bookmarkedIds, masteryStatus]);

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base">
      {/* Search & Filter Header - Muted Pastel Blue Box */}
      <div className="bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 border border-[#D2E0EC] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#829AB1]" />
            <input
              id="vocab-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาคำศัพท์, คำอ่านภาษาไทย (เช่น แบรดดิ...), คำแปล, หรือรากศัพท์..."
              className="w-full pl-12 pr-10 py-3 bg-[#F0F5FA] border border-[#D2E0EC] focus:border-[#486581] focus:bg-white rounded-xl text-base font-medium text-[#102A43] placeholder-[#829AB1] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#829AB1] hover:text-[#243B53] p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bookmarked Filter Button */}
          <div className="flex items-center gap-2">
            <button
              id="btn-filter-bookmarked"
              onClick={() => {
                soundManager.playClick();
                setShowOnlyBookmarked(!showOnlyBookmarked);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition-colors select-none ${
                showOnlyBookmarked
                  ? 'bg-[#FFF7E6] border-[#FFD591] text-[#D46B08]'
                  : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] border-[#D2E0EC] text-[#334E68]'
              }`}
            >
              {showOnlyBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-[#D46B08] fill-[#D46B08]" />
              ) : (
                <Bookmark className="w-4 h-4 text-[#829AB1]" />
              )}
              <span>คำที่บันทึกไว้ ({bookmarkedIds.length})</span>
            </button>

            {(searchQuery || selectedLetter !== 'ALL' || selectedCategory !== 'all' || showOnlyBookmarked || selectedMasteryFilter !== 'all') && (
              <button
                id="btn-reset-filters"
                onClick={() => {
                  soundManager.playClick();
                  setSearchQuery('');
                  setSelectedLetter('ALL');
                  setSelectedCategory('all');
                  setSelectedMasteryFilter('all');
                  setShowOnlyBookmarked(false);
                }}
                className="p-2.5 rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#486581] border border-[#D2E0EC] transition-colors"
                title="ล้างตัวกรองทั้งหมด"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mastery Recall Category Bar (จำได้แล้ว / พอจำได้ / จำไม่ได้ / ยังไม่ประเมิน) */}
        <div className="pt-2 border-t border-[#E8EFF6] space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#334E68] flex items-center gap-1.5">
              <ListFilter className="w-3.5 h-3.5 text-[#486581]" />
              <span>หมวดหมู่ตามระดับความจำ (Mastery Categories):</span>
            </span>
            {selectedMasteryFilter !== 'all' && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F0F5FA] text-[#006270] border border-[#D2E0EC]">
                กำลังกรอง: {
                  selectedMasteryFilter === 'mastered' ? '✓ จำได้แล้ว' :
                  selectedMasteryFilter === 'learning' ? '~ พอจำได้' :
                  selectedMasteryFilter === 'forgotten' ? '✕ จำไม่ได้ (ต้องทบทวนด่วน)' : 'ยังไม่ได้ประเมิน'
                }
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {/* All */}
            <button
              id="filter-mastery-all"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('all');
              }}
              className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedMasteryFilter === 'all'
                  ? 'bg-[#334E68] text-white border-[#334E68] shadow-xs'
                  : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#334E68] border-[#D2E0EC]'
              }`}
            >
              <span>ทั้งหมด</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
                selectedMasteryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#D2E0EC] text-[#334E68]'
              }`}>
                {masteryCounts.all}
              </span>
            </button>

            {/* Mastered */}
            <button
              id="filter-mastery-mastered"
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
                {masteryCounts.mastered}
              </span>
            </button>

            {/* Learning */}
            <button
              id="filter-mastery-learning"
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
                {masteryCounts.learning}
              </span>
            </button>

            {/* Forgotten */}
            <button
              id="filter-mastery-forgotten"
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
                {masteryCounts.forgotten}
              </span>
            </button>

            {/* Unrated */}
            <button
              id="filter-mastery-unrated"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('unrated');
              }}
              className={`col-span-2 sm:col-span-1 flex items-center justify-between p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedMasteryFilter === 'unrated'
                  ? 'bg-[#486581] text-white border-[#486581] shadow-xs'
                  : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#486581] border-[#D2E0EC]'
              }`}
            >
              <span>ยังไม่ประเมิน</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
                selectedMasteryFilter === 'unrated' ? 'bg-white/20 text-white' : 'bg-[#D2E0EC] text-[#486581]'
              }`}>
                {masteryCounts.unrated}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Filters: Dropdown buttons that expand downwards vertically */}
        <div className="md:hidden space-y-2.5 pt-1">
          {/* Category Dropdown Button on Mobile */}
          <div className="relative">
            <button
              id="btn-mobile-cat-dropdown"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileCategoryOpen(!mobileCategoryOpen);
                if (!mobileCategoryOpen) setMobileLetterOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] text-[#102A43] text-xs font-bold active:bg-[#E4ECF4] transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Filter className="w-3.5 h-3.5 text-[#486581] shrink-0" />
                <span className="text-[#627D98] font-normal">หมวดหมู่:</span>
                <span className="truncate text-[#102A43]">
                  {SYSTEM_CATEGORIES.find(c => c.id === selectedCategory)?.nameTh || 'ทุกหมวดหมู่'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#486581] transition-transform duration-200 shrink-0 ${mobileCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded Category List */}
            {mobileCategoryOpen && (
              <>
                {/* Backdrop to close when tapping outside */}
                <div 
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                  onClick={() => setMobileCategoryOpen(false)}
                  aria-hidden="true"
                />
                <div className="mt-1.5 p-2 bg-white rounded-xl border border-[#D2E0EC] shadow-2xl max-h-60 overflow-y-auto space-y-1 animate-slide-up z-50 relative">
                  {SYSTEM_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedCategory(cat.id);
                          setMobileCategoryOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                          isSelected
                            ? 'bg-[#486581] text-white font-bold'
                            : 'text-[#334E68] hover:bg-[#F0F5FA]'
                        }`}
                      >
                        <span>{cat.nameTh}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* A-Z Letter Dropdown Button on Mobile */}
          <div className="relative">
            <button
              id="btn-mobile-letter-dropdown"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileLetterOpen(!mobileLetterOpen);
                if (!mobileLetterOpen) setMobileCategoryOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] text-[#102A43] text-xs font-bold active:bg-[#E4ECF4] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#627D98] font-normal">ตัวอักษร:</span>
                <span className="text-[#102A43]">
                  {selectedLetter === 'ALL' ? 'ทั้งหมด (A-Z)' : `ตัวอักษร ${selectedLetter}`}
                </span>
                <span className="text-[11px] text-[#627D98] font-normal">
                  ({filteredVocab.length} คำ)
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#486581] transition-transform duration-200 shrink-0 ${mobileLetterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded Alphabet Grid */}
            {mobileLetterOpen && (
              <>
                {/* Backdrop to close when tapping outside */}
                <div 
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                  onClick={() => setMobileLetterOpen(false)}
                  aria-hidden="true"
                />
                <div className="mt-1.5 p-3 bg-white rounded-xl border border-[#D2E0EC] shadow-2xl animate-slide-up z-50 relative">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8EFF6]">
                    <span className="text-xs font-bold text-[#486581]">เลือกตัวอักษรเริ่มต้น</span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedLetter('ALL');
                        setMobileLetterOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        selectedLetter === 'ALL' ? 'bg-[#486581] text-white' : 'bg-[#F0F5FA] text-[#486581]'
                      }`}
                    >
                      ทั้งหมด (ALL)
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {ALPHABET.filter(l => l !== 'ALL').map((letter) => {
                      const count = letterCounts[letter] || 0;
                      const isSelected = selectedLetter === letter;
                      const isDisabled = count === 0;

                      return (
                        <button
                          key={letter}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedLetter(letter);
                            setMobileLetterOpen(false);
                          }}
                          className={`py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#334E68] text-white shadow-xs scale-105'
                              : isDisabled
                              ? 'bg-[#F8FAFC] text-[#BAC7D5] opacity-40 cursor-not-allowed'
                              : 'bg-[#F0F5FA] text-[#102A43] hover:bg-[#E4ECF4]'
                          }`}
                        >
                          <span>{letter}</span>
                          <span className={`text-[9px] font-normal ${isSelected ? 'text-white/80' : 'text-[#829AB1]'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop View: Category Pills & A - Z Navigation Bar */}
        <div className="hidden md:block space-y-3">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SYSTEM_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors border select-none ${
                    isSelected
                      ? 'bg-[#486581] border-[#486581] text-white'
                      : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] border-[#D2E0EC] text-[#486581]'
                  }`}
                >
                  {cat.nameTh}
                </button>
              );
            })}
          </div>

          {/* A - Z Navigation Bar */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pt-2 border-t border-[#E8EFF6] no-scrollbar">
            <div className="flex gap-1">
              {ALPHABET.map((letter) => {
                const count = letterCounts[letter] || 0;
                const isSelected = selectedLetter === letter;
                const isDisabled = letter !== 'ALL' && count === 0;

                return (
                  <button
                    key={letter}
                    id={`letter-nav-${letter}`}
                    disabled={isDisabled}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedLetter(letter);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-sm font-bold transition-colors select-none ${
                      isSelected
                        ? 'bg-[#334E68] text-white shadow-xs'
                        : isDisabled
                        ? 'text-[#BAC7D5] cursor-not-allowed opacity-50'
                        : 'text-[#486581] hover:bg-[#EBF2F7] hover:text-[#102A43]'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
            <span className="text-sm text-[#627D98] font-semibold whitespace-nowrap ml-3">
              {filteredVocab.length} คำ
            </span>
          </div>
        </div>
      </div>

      {/* Targeted Review Bar ("ทบทวนเฉพาะคำนั้นๆ ที่เลือกมาเป็นหมวดหมู่") */}
      {filteredVocab.length > 0 && (
        <div className="bg-[#102A43] rounded-2xl p-4 sm:p-5 text-white shadow-sm border border-[#243B53] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#006270] text-[#E0FCFF]">
                โฟกัสทบทวนเฉพาะกลุ่ม
              </span>
              <h3 className="font-bold text-sm sm:text-base text-white">
                พร้อมทบทวนคำศัพท์ชุดนี้ ({filteredVocab.length} คำ)
              </h3>
            </div>
            <p className="text-xs text-[#9FB3C8]">
              {selectedMasteryFilter !== 'all' ? `หมวดความจำ: ${selectedMasteryFilter === 'mastered' ? 'จำได้แล้ว' : selectedMasteryFilter === 'learning' ? 'พอจำได้' : selectedMasteryFilter === 'forgotten' ? 'จำไม่ได้ (ต้องทบทวนด่วน)' : 'ยังไม่ประเมิน'}` : 'ทุกระดับความจำ'}
              {selectedCategory !== 'all' ? ` • ${selectedCategory}` : ''}
              {selectedLetter !== 'ALL' ? ` • อักษร ${selectedLetter}` : ' • อักษร A-Z'}
              {showOnlyBookmarked ? ' • เฉพาะที่บันทึก' : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {onStartFlashcardWithWords && (
              <button
                id="btn-targeted-flashcard"
                onClick={() => {
                  soundManager.playClick();
                  onStartFlashcardWithWords(filteredVocab);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white text-[#102A43] hover:bg-[#F0F5FA] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.02]"
                title="ทบทวนคำศัพท์กลุ่มนี้ด้วยแฟลชการ์ด"
              >
                <CreditCard className="w-4 h-4 text-[#006270]" />
                <span>แฟลชการ์ด</span>
              </button>
            )}

            {onStartQuizWithWords && (
              <button
                id="btn-targeted-quiz"
                onClick={() => {
                  soundManager.playClick();
                  onStartQuizWithWords(filteredVocab);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#006270] hover:bg-[#004f5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.02]"
                title="ทำแบบทดสอบ 4 ตัวเลือกเฉพาะคำกลุ่มนี้"
              >
                <HelpCircle className="w-4 h-4" />
                <span>ช้อยส์ ({Math.min(10, filteredVocab.length)})</span>
              </button>
            )}

            {onStartTypingWithWords && (
              <button
                id="btn-targeted-typing"
                onClick={() => {
                  soundManager.playClick();
                  onStartTypingWithWords(filteredVocab);
                }}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-[#243B53] hover:bg-[#334E68] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#486581] transition-all hover:scale-[1.02]"
                title="ฝึกพิมพ์ตอบคำศัพท์เฉพาะกลุ่มนี้"
              >
                <Keyboard className="w-4 h-4 text-[#9FB3C8]" />
                <span>พิมพ์ตอบ</span>
              </button>
            )}

            {onStartAudioPracticeWithWords && (
              <button
                id="btn-targeted-audio"
                onClick={() => {
                  soundManager.playClick();
                  onStartAudioPracticeWithWords(filteredVocab);
                }}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-[#243B53] hover:bg-[#334E68] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#486581] transition-all hover:scale-[1.02]"
                title="ฝึกฟังเสียงคำศัพท์เฉพาะกลุ่มนี้"
              >
                <Volume2 className="w-4 h-4 text-[#9FB3C8]" />
                <span>ฟังเสียง</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Vocabulary Card / Table Container */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#D2E0EC] shadow-xs overflow-hidden">
        {filteredVocab.length === 0 ? (
          <div className="p-10 sm:p-14 text-center space-y-3">
            <p className="font-bold text-base sm:text-lg text-[#102A43]">ไม่พบคำศัพท์ที่ตรงกับเงื่อนไข</p>
            <p className="text-xs sm:text-sm text-[#627D98]">ลองค้นหาด้วยคำอื่น หรือกดปุ่มรีเซ็ตตัวกรอง</p>
            <button
              onClick={() => {
                soundManager.playClick();
                setSearchQuery('');
                setSelectedLetter('ALL');
                setSelectedCategory('all');
                setShowOnlyBookmarked(false);
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#486581] text-white hover:bg-[#334E68] inline-flex items-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ล้างตัวกรองทั้งหมด</span>
            </button>
          </div>
        ) : (
          <>
            {/* Mobile View: High-Clarity Word Cards (shown on screens < md) */}
            <div className="md:hidden divide-y divide-[#E8EFF6]">
              {filteredVocab.map((item, index) => {
                const isBookmarked = bookmarkedIds.includes(item.id);
                const isSpeakingNormal = activeSpeechId === `${item.id}_norm`;
                const isSpeakingSlow = activeSpeechId === `${item.id}_slow`;
                const isSpeakingThai = activeSpeechId === `${item.id}_th`;

                return (
                  <div
                    key={item.id}
                    id={`mobile-vocab-card-${item.id}`}
                    onClick={() => onSelectWordDetail(item)}
                    className="p-4 hover:bg-[#F7FAFC] active:bg-[#F0F5FA] transition-colors cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#829AB1]">
                            #{index + 1}
                          </span>
                          <span className="font-bold text-lg text-[#102A43]">
                            {item.word}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F0F5FA] text-[#486581] border border-[#D2E0EC]">
                            {item.category}
                          </span>
                        </div>

                        {/* Thai Phonetic with accent button */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[#334E68] font-bold text-sm">
                            {item.phoneticTh}
                          </span>
                          <button
                            id={`btn-mobile-pronounce-th-${item.id}`}
                            onClick={(e) => handlePronounceThai(e, item.phoneticTh, item.id)}
                            className={`px-2 py-0.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                              isSpeakingThai
                                ? 'bg-[#006270] text-white'
                                : 'bg-[#E0FCFF] text-[#006270] hover:bg-[#C4F1F9]'
                            }`}
                            title="ฟังเสียงสำเนียงไทย"
                            aria-label="Thai voice"
                          >
                            <Volume1 className="w-3.5 h-3.5" />
                            <span>สำเนียงไทย</span>
                          </button>
                        </div>
                      </div>

                      {/* Bookmark button */}
                      <button
                        id={`btn-mobile-bookmark-${item.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                          onToggleBookmark(item.id);
                        }}
                        className={`p-2 rounded-xl transition-colors shrink-0 ${
                          isBookmarked 
                            ? 'text-[#F59E0B] bg-[#FFFBEB]' 
                            : 'text-[#BAC7D5] hover:text-[#627D98] hover:bg-[#F0F5FA]'
                        }`}
                        title={isBookmarked ? 'ลบออกจากบันทึก' : 'บันทึกคำนี้'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-5 h-5 fill-[#F59E0B]" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Meaning */}
                    <p className="text-sm font-medium text-[#243B53] leading-relaxed">
                      {item.meaning}
                    </p>

                    {/* English Audio Actions + Tags */}
                    <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        {/* Normal Speed */}
                        <button
                          id={`btn-mobile-pronounce-en-${item.id}`}
                          onClick={(e) => handlePronounce(e, item.word, item.id, false)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isSpeakingNormal 
                              ? 'bg-[#486581] text-white' 
                              : 'bg-[#F0F5FA] text-[#486581] hover:bg-[#E4ECF4]'
                          }`}
                          title="ฟังเสียงอังกฤษปกติ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>เสียงอังกฤษ</span>
                        </button>

                        {/* Slow Speed */}
                        <button
                          id={`btn-mobile-pronounce-slow-${item.id}`}
                          onClick={(e) => handlePronounce(e, item.word, item.id, true)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isSpeakingSlow 
                              ? 'bg-[#334E68] text-white' 
                              : 'bg-[#F0F5FA] text-[#627D98] hover:bg-[#E4ECF4]'
                          }`}
                          title="ฟังเสียงอังกฤษช้า"
                        >
                          <Snail className="w-3.5 h-3.5" />
                          <span>ช้า</span>
                        </button>
                      </div>

                      {item.relatedGroup && (
                        <span className="text-[11px] text-[#627D98] bg-[#F8FAFC] border border-[#E8EFF6] px-2 py-0.5 rounded">
                          {item.relatedGroup}
                        </span>
                      )}
                    </div>

                    {/* Mastery Recall Status Quick Ticking */}
                    <div 
                      className="pt-2.5 border-t border-[#E8EFF6] flex items-center justify-between gap-1 flex-wrap" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-xs font-bold text-[#627D98]">ระดับความจำ:</span>
                      <div className="flex items-center gap-1">
                        <button
                          id={`btn-mobile-mastery-mastered-${item.id}`}
                          type="button"
                          onClick={() => {
                            const current = masteryStatus[item.id];
                            const next = current === 'mastered' ? null : 'mastered';
                            if (next) soundManager.playCorrect();
                            else soundManager.playClick();
                            onUpdateMastery(item.id, next);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            masteryStatus[item.id] === 'mastered'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-[#F0F5FA] text-[#047857] hover:bg-emerald-50 border border-[#D2E0EC]'
                          }`}
                          title="ติ๊ก: จำได้แล้ว"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>จำได้แล้ว</span>
                        </button>
                        <button
                          id={`btn-mobile-mastery-learning-${item.id}`}
                          type="button"
                          onClick={() => {
                            const current = masteryStatus[item.id];
                            const next = current === 'learning' ? null : 'learning';
                            soundManager.playClick();
                            onUpdateMastery(item.id, next);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            masteryStatus[item.id] === 'learning'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-[#F0F5FA] text-[#B45309] hover:bg-amber-50 border border-[#D2E0EC]'
                          }`}
                          title="ติ๊ก: พอจำได้"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>พอจำได้</span>
                        </button>
                        <button
                          id={`btn-mobile-mastery-forgotten-${item.id}`}
                          type="button"
                          onClick={() => {
                            const current = masteryStatus[item.id];
                            const next = current === 'forgotten' ? null : 'forgotten';
                            soundManager.playClick();
                            onUpdateMastery(item.id, next);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            masteryStatus[item.id] === 'forgotten'
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
                  </div>
                );
              })}
            </div>

            {/* Desktop Table (shown on screens >= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse" id="main-vocab-table">
                <thead>
                  <tr className="bg-[#F0F5FA] border-b border-[#D2E0EC] text-[#486581] font-bold text-sm tracking-wide">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4 min-w-[230px]">คำศัพท์ (English)</th>
                    <th className="py-3.5 px-4 min-w-[170px]">คำอ่านไทย (ไม่มีหัว)</th>
                    <th className="py-3.5 px-4 min-w-[280px]">ความหมายทางการแพทย์</th>
                    <th className="py-3.5 px-4 min-w-[170px] hidden md:table-cell">ระบบอวัยวะ</th>
                    <th className="py-3.5 px-4 min-w-[200px] hidden lg:table-cell">กลุ่มที่เชื่อมโยง & รากศัพท์</th>
                    <th className="py-3.5 px-4 min-w-[220px] text-center">ระดับความจำ</th>
                    <th className="py-3.5 px-4 w-16 text-center">บันทึก</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EFF6] text-base">
                  {filteredVocab.map((item, index) => {
                    const isBookmarked = bookmarkedIds.includes(item.id);
                    const isSpeakingNormal = activeSpeechId === `${item.id}_norm`;
                    const isSpeakingSlow = activeSpeechId === `${item.id}_slow`;

                    return (
                      <tr
                        key={item.id}
                        id={`vocab-row-${item.id}`}
                        onClick={() => onSelectWordDetail(item)}
                        className="hover:bg-[#F7FAFC] transition-colors cursor-pointer group"
                      >
                        {/* Index */}
                        <td className="py-4 px-4 text-center font-medium text-[#829AB1]">
                          {index + 1}
                        </td>

                        {/* English Word & Audio Buttons */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base sm:text-lg text-[#102A43] group-hover:text-[#006270] transition-colors">
                              {item.word}
                            </span>

                            {/* Normal Speed Speaker Button */}
                            <button
                              id={`btn-pronounce-${item.id}`}
                              onClick={(e) => handlePronounce(e, item.word, item.id, false)}
                              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                                isSpeakingNormal 
                                  ? 'bg-[#486581] text-white' 
                                  : 'text-[#627D98] hover:text-[#102A43] hover:bg-[#E4ECF4]'
                              }`}
                              title="ฟังเสียงออกเสียงภาษาอังกฤษ (ความเร็วปกติ)"
                              aria-label="Normal audio speed"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            {/* Slow Speed Turtle Button */}
                            <button
                              id={`btn-pronounce-slow-${item.id}`}
                              onClick={(e) => handlePronounce(e, item.word, item.id, true)}
                              className={`px-1.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                                isSpeakingSlow 
                                  ? 'bg-[#334E68] text-white' 
                                  : 'text-[#829AB1] hover:text-[#334E68] hover:bg-[#E4ECF4]'
                              }`}
                              title="ฟังเสียงออกเสียงแบบช้าๆ (Turtle Slow Speed 0.55x)"
                              aria-label="Slow audio speed"
                            >
                              <Snail className="w-4 h-4" />
                              <span className="text-[11px] hidden sm:inline">ช้า</span>
                            </button>
                          </div>
                        </td>

                        {/* Thai Phonetic (Loopless) */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#334E68] font-semibold text-sm sm:text-base">
                              {item.phoneticTh}
                            </span>
                            <button
                              id={`btn-pronounce-th-${item.id}`}
                              onClick={(e) => handlePronounceThai(e, item.phoneticTh, item.id)}
                              className={`p-1 rounded-md transition-colors ${
                                activeSpeechId === `${item.id}_th`
                                  ? 'bg-[#006270] text-white'
                                  : 'text-[#006270] hover:bg-[#E0FCFF]'
                              }`}
                              title="ฟังเสียงสำเนียงไทย"
                              aria-label="Thai pronunciation"
                            >
                              <Volume1 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Thai Meaning */}
                        <td className="py-4 px-4 text-[#243B53]">
                          <div className="space-y-1">
                            <p className="font-medium text-sm sm:text-base text-[#102A43] leading-snug">
                              {item.meaning}
                            </p>
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 3).map((tag, tIdx) => (
                                  <span key={tIdx} className="text-xs text-[#627D98] bg-[#F0F5FA] px-1.5 py-0.5 rounded">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 hidden md:table-cell">
                          <span className="text-sm font-medium text-[#486581]">
                            {item.category}
                          </span>
                        </td>

                        {/* Related group & root */}
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium text-[#334E68]">{item.relatedGroup}</span>
                            {item.rootMeaning && (
                              <p className="text-xs text-[#829AB1] line-clamp-1">{item.rootMeaning}</p>
                            )}
                          </div>
                        </td>

                        {/* Mastery Recall Status */}
                        <td className="py-4 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="inline-flex items-center p-1 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] gap-1 shadow-2xs">
                            <button
                              id={`btn-table-mastery-mastered-${item.id}`}
                              type="button"
                              onClick={() => {
                                const current = masteryStatus[item.id];
                                const next = current === 'mastered' ? null : 'mastered';
                                if (next) soundManager.playCorrect();
                                else soundManager.playClick();
                                onUpdateMastery(item.id, next);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                masteryStatus[item.id] === 'mastered'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'text-[#047857] hover:bg-white hover:text-emerald-800'
                              }`}
                              title="ติ๊ก: จำได้แล้ว"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>จำได้แล้ว</span>
                            </button>
                            <button
                              id={`btn-table-mastery-learning-${item.id}`}
                              type="button"
                              onClick={() => {
                                const current = masteryStatus[item.id];
                                const next = current === 'learning' ? null : 'learning';
                                soundManager.playClick();
                                onUpdateMastery(item.id, next);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                masteryStatus[item.id] === 'learning'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'text-[#B45309] hover:bg-white hover:text-amber-800'
                              }`}
                              title="ติ๊ก: พอจำได้"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>พอจำได้</span>
                            </button>
                            <button
                              id={`btn-table-mastery-forgotten-${item.id}`}
                              type="button"
                              onClick={() => {
                                const current = masteryStatus[item.id];
                                const next = current === 'forgotten' ? null : 'forgotten';
                                soundManager.playClick();
                                onUpdateMastery(item.id, next);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                masteryStatus[item.id] === 'forgotten'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'text-[#B91C1C] hover:bg-white hover:text-rose-800'
                              }`}
                              title="ติ๊ก: จำไม่ได้"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>จำไม่ได้</span>
                            </button>
                          </div>
                        </td>

                        {/* Bookmark button */}
                        <td className="py-4 px-4 text-center">
                          <button
                            id={`btn-bookmark-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                              onToggleBookmark(item.id);
                            }}
                            className={`p-2 rounded-xl transition-colors ${
                              isBookmarked 
                                ? 'text-[#F59E0B] bg-[#FFFBEB] hover:bg-[#FEF3C7]' 
                                : 'text-[#BAC7D5] hover:text-[#627D98] hover:bg-[#F0F5FA]'
                            }`}
                            title={isBookmarked ? 'ลบออกจากรายการบันทึก' : 'บันทึกคำศัพท์นี้'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-5 h-5 fill-[#F59E0B]" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Quick Test Prompt Box */}
      {filteredVocab.length > 0 && onStartQuizWithWords && (
        <div className="bg-[#334E68] rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base sm:text-lg">ทดสอบความจำจากคำศัพท์ชุดนี้ ({filteredVocab.length} คำ)</h3>
            <p className="text-sm text-[#D2E0EC] mt-0.5">
              สุ่มคำถาม 4 ตัวเลือกเพื่อทบทวนคำศัพท์และคำอ่านที่กำลังแสดงผล
            </p>
          </div>
          <button
            id="btn-quick-quiz-filtered"
            onClick={() => {
              soundManager.playClick();
              onStartQuizWithWords(filteredVocab);
            }}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-white text-[#102A43] hover:bg-[#F0F5FA] transition-colors shrink-0 shadow-xs"
          >
            เริ่มทำแบบทดสอบ ({Math.min(10, filteredVocab.length)} ข้อ)
          </button>
        </div>
      )}
    </div>
  );
};

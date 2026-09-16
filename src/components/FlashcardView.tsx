import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  RotateCw, 
  Volume2, 
  Snail, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  X, 
  Shuffle, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  SlidersHorizontal, 
  CreditCard, 
  CheckCircle2, 
  Volume1,
  ChevronDown,
  Filter,
  HelpCircle,
  XCircle,
  ListFilter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabItem, FlashcardFrontMode, HistoryWordItem, MasteryStatus } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface FlashcardViewProps {
  allVocab: VocabItem[];
  bookmarkedIds: string[];
  masteryStatus?: Record<string, MasteryStatus>;
  onToggleBookmark: (id: string) => void;
  onUpdateMastery?: (wordId: string, status: MasteryStatus | null) => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onFinishDeck?: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  customWordSet?: VocabItem[] | null;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  allVocab,
  bookmarkedIds,
  masteryStatus = {},
  onToggleBookmark,
  onUpdateMastery,
  onSelectWordDetail,
  onFinishDeck,
  customWordSet,
}) => {
  // Config state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMasteryFilter, setSelectedMasteryFilter] = useState<'all' | MasteryStatus>('all');
  const [frontMode, setFrontMode] = useState<FlashcardFrontMode>('en'); // 'en' = English front, 'th' = Thai meaning front
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [mobileCatDropdownOpen, setMobileCatDropdownOpen] = useState(false);

  // Lock background scroll when mobile dropdown is open
  useEffect(() => {
    if (mobileCatDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileCatDropdownOpen]);

  // Deck state
  const [deck, setDeck] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [isDeckCompleted, setIsDeckCompleted] = useState(false);
  const [showPhoneticHint, setShowPhoneticHint] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  // Filter pool
  const filteredPool = useMemo(() => {
    if (customWordSet && customWordSet.length > 0) {
      return customWordSet;
    }
    return allVocab.filter((item) => {
      if (showOnlyBookmarks && !bookmarkedIds.includes(item.id)) return false;
      if (selectedMasteryFilter !== 'all') {
        if (masteryStatus[item.id] !== selectedMasteryFilter) return false;
      }
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory) && !item.relatedGroup.includes(selectedCategory)) {
          return false;
        }
      }
      return true;
    });
  }, [allVocab, customWordSet, selectedCategory, selectedMasteryFilter, showOnlyBookmarks, bookmarkedIds, masteryStatus]);

  const initDeck = useCallback((wordsToUse?: VocabItem[]) => {
    const list = wordsToUse || filteredPool;
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setReviewIds([]);
    setIsDeckCompleted(false);
    setShowPhoneticHint(false);
  }, [filteredPool]);

  useEffect(() => {
    initDeck();
  }, [selectedCategory, selectedMasteryFilter, showOnlyBookmarks, initDeck]);

  const currentCard = deck[currentIndex] || null;

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      soundManager.playClick();
      setIsFlipped(false);
      setShowPhoneticHint(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      completeDeck();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundManager.playClick();
      setIsFlipped(false);
      setShowPhoneticHint(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMarkMastery = (status: MasteryStatus) => {
    if (!currentCard) return;
    if (onUpdateMastery) {
      onUpdateMastery(currentCard.id, status);
    }
    if (status === 'mastered') {
      soundManager.playCorrect();
      setMasteredIds((prev) => Array.from(new Set([...prev, currentCard.id])));
      setReviewIds((prev) => prev.filter((id) => id !== currentCard.id));
    } else if (status === 'learning') {
      soundManager.playClick();
      setReviewIds((prev) => Array.from(new Set([...prev, currentCard.id])));
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    } else {
      soundManager.playIncorrect();
      setReviewIds((prev) => Array.from(new Set([...prev, currentCard.id])));
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  const completeDeck = () => {
    setIsDeckCompleted(true);
    soundManager.playFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (onFinishDeck && deck.length > 0) {
      const reviewed: HistoryWordItem[] = deck.map((item) => ({
        id: item.id,
        word: item.word,
        meaning: item.meaning,
        isCorrect: masteredIds.includes(item.id),
      }));
      const score = masteredIds.length;
      const total = deck.length;
      const xpGained = score * 5 + 10;
      onFinishDeck(score, total, xpGained, reviewed);
    }
  };

  const handlePronounceEnglish = async (e: React.MouseEvent, word: string, id: string, slow: boolean = false) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveSpeech(`${id}_${slow ? 'slow' : 'norm'}`);
    await speakWord(word, slow);
    setActiveSpeech(null);
  };

  const handlePronounceThai = async (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    soundManager.playClick();
    setActiveSpeech(`${id}_th`);
    await speakThai(text, false);
    setActiveSpeech(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDeckCompleted || !currentCard) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight' || e.key === '1') {
        e.preventDefault();
        handleMarkMastery('mastered');
      } else if (e.key === '2') {
        e.preventDefault();
        handleMarkMastery('learning');
      } else if (e.code === 'ArrowLeft' || e.key === '3') {
        e.preventDefault();
        handleMarkMastery('forgotten');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, currentCard, isDeckCompleted, deck.length]);

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base max-w-4xl mx-auto">
      {/* Header Controls & Filter */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D2E0EC] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#102A43]">
                แฟลชการ์ดคำศัพท์ (Medical Flashcards)
              </h2>
              <p className="text-xs text-[#627D98]">
                เลือกหมวดหมู่และเลือกว่าจะแสดงคำศัพท์ภาษาอังกฤษหรือคำแปลขึ้นก่อน
              </p>
            </div>
          </div>

          {/* Front Side Mode Switch */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0F5FA] rounded-xl border border-[#D2E0EC] self-stretch sm:self-auto">
            <button
              id="flashcard-mode-en"
              onClick={() => {
                soundManager.playClick();
                setFrontMode('en');
                setIsFlipped(false);
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                frontMode === 'en'
                  ? 'bg-[#486581] text-white shadow-xs'
                  : 'text-[#486581] hover:text-[#102A43]'
              }`}
            >
              คำศัพท์อังกฤษขึ้นก่อน
            </button>
            <button
              id="flashcard-mode-th"
              onClick={() => {
                soundManager.playClick();
                setFrontMode('th');
                setIsFlipped(false);
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                frontMode === 'th'
                  ? 'bg-[#486581] text-white shadow-xs'
                  : 'text-[#486581] hover:text-[#102A43]'
              }`}
            >
              คำแปลไทยขึ้นก่อน
            </button>
          </div>
        </div>

        {/* Mastery Filter Bar (ทบทวนตามระดับความจำ) */}
        <div className="pt-3 border-t border-[#E8EFF6] flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#334E68] flex items-center gap-1.5">
            <ListFilter className="w-3.5 h-3.5 text-[#486581]" />
            <span>ระดับการจำที่ต้องการทบทวน:</span>
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              id="flashcard-filter-mastery-all"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                selectedMasteryFilter === 'all'
                  ? 'bg-[#334E68] text-white border-[#334E68]'
                  : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#334E68] border-[#D2E0EC]'
              }`}
            >
              ทุกระดับ
            </button>
            <button
              id="flashcard-filter-mastery-forgotten"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('forgotten');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                selectedMasteryFilter === 'forgotten'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>จำไม่ได้ (เน้นพิเศษ)</span>
            </button>
            <button
              id="flashcard-filter-mastery-learning"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('learning');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                selectedMasteryFilter === 'learning'
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>พอจำได้</span>
            </button>
            <button
              id="flashcard-filter-mastery-mastered"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMasteryFilter('mastered');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                selectedMasteryFilter === 'mastered'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>จำได้แล้ว</span>
            </button>
          </div>
        </div>

        {/* Category selector & actions row */}
        <div className="pt-3 border-t border-[#E8EFF6] space-y-2.5">
          {/* Mobile Category Dropdown Button */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center gap-2">
              <button
                id="btn-flashcard-mobile-cat"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMobileCatDropdownOpen(!mobileCatDropdownOpen);
                }}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] text-[#102A43] text-xs font-bold active:bg-[#E4ECF4] transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter className="w-3.5 h-3.5 text-[#486581] shrink-0" />
                  <span className="text-[#627D98] font-normal">หมวดหมู่:</span>
                  <span className="truncate text-[#102A43]">
                    {selectedCategory === 'all'
                      ? `ทุกหมวดหมู่ (${allVocab.length})`
                      : SYSTEM_CATEGORIES.find(c => c.id === selectedCategory)?.nameTh || selectedCategory}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#486581] transition-transform duration-200 shrink-0 ${mobileCatDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  initDeck();
                }}
                className="p-3 rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] border border-[#D2E0EC] text-[#486581] transition-colors shrink-0 flex items-center gap-1.5"
                title="สลับสับการ์ดใหม่"
              >
                <Shuffle className="w-4 h-4" />
                <span className="text-xs font-bold">{deck.length} การ์ด</span>
              </button>
            </div>

            {/* Mobile Expanded List */}
            {mobileCatDropdownOpen && (
              <>
                {/* Backdrop to close when tapping outside */}
                <div 
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                  onClick={() => setMobileCatDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="mt-1.5 p-2 bg-white rounded-xl border border-[#D2E0EC] shadow-2xl max-h-60 overflow-y-auto space-y-1 animate-slide-up z-50 relative">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory('all');
                      setMobileCatDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#486581] text-white font-bold'
                        : 'text-[#334E68] hover:bg-[#F0F5FA]'
                    }`}
                  >
                    <span>ทุกหมวดหมู่ ({allVocab.length})</span>
                    {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                  {SYSTEM_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedCategory(cat.id);
                          setMobileCatDropdownOpen(false);
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

          {/* Desktop Category Pills Bar */}
          <div className="hidden md:flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                  selectedCategory === 'all'
                    ? 'bg-[#334E68] text-white border-[#334E68]'
                    : 'bg-[#F0F5FA] text-[#486581] border-[#D2E0EC] hover:bg-[#E4ECF4]'
                }`}
              >
                ทุกหมวดหมู่ ({allVocab.length})
              </button>
              {SYSTEM_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                    selectedCategory === cat.id
                      ? 'bg-[#334E68] text-white border-[#334E68]'
                      : 'bg-[#F0F5FA] text-[#486581] border-[#D2E0EC] hover:bg-[#E4ECF4]'
                  }`}
                >
                  {cat.nameTh}
                </button>
              ))}
            </div>

            {/* Shuffle & Reset button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  soundManager.playClick();
                  initDeck();
                }}
                className="p-2 rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] border border-[#D2E0EC] text-[#486581] transition-colors"
                title="สลับสับการ์ดใหม่"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-[#627D98]">
                {deck.length} การ์ด
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Flashcard Interactive Area */}
      {deck.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-[#D2E0EC] text-center space-y-3">
          <p className="font-bold text-lg text-[#102A43]">ไม่พบคำศัพท์ในหมวดหมู่นี้</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 text-sm font-semibold rounded-xl btn-primary"
          >
            แสดงทุกหมวดหมู่
          </button>
        </div>
      ) : isDeckCompleted ? (
        /* Deck Completed Screen */
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#D2E0EC] shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#102A43]">
              เรียนครบทั้งสำรับแล้ว!
            </h3>
            <p className="text-sm text-[#627D98]">
              คุณได้เปิดทบทวนแฟลชการ์ดครบทั้งหมด {deck.length} ใบในชุดนี้
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
              <span className="text-xs font-bold text-[#166534] uppercase">จำได้แล้ว</span>
              <p className="text-2xl font-bold text-[#15803D] mt-1">{masteredIds.length} คำ</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
              <span className="text-xs font-bold text-[#991B1B] uppercase">ต้องทบทวนเพิ่ม</span>
              <p className="text-2xl font-bold text-[#B91C1C] mt-1">{reviewIds.length} คำ</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-[#92400E] uppercase">XP ที่ได้รับ</span>
              <p className="text-2xl font-bold text-[#D97706] mt-1">+{masteredIds.length * 5 + 10} XP</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {reviewIds.length > 0 && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  const needReviewWords = deck.filter((w) => reviewIds.includes(w.id));
                  initDeck(needReviewWords);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทบทวนเฉพาะการ์ดที่ยังจำไม่ได้ ({reviewIds.length} ใบ)</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playClick();
                initDeck();
              }}
              className="px-5 py-2.5 rounded-xl btn-primary font-bold text-sm flex items-center gap-2 shadow-xs"
            >
              <RotateCw className="w-4 h-4" />
              <span>เริ่มสำรับนี้ใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      ) : currentCard ? (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold text-[#627D98] px-1">
            <div className="flex items-center gap-2">
              <span>การ์ดที่ {currentIndex + 1} จาก {deck.length}</span>
              <span className="text-[#059669]">({masteredIds.length} จำได้)</span>
              {reviewIds.length > 0 && <span className="text-[#DC2626]">({reviewIds.length} ต้องทบทวน)</span>}
            </div>
            <span className="text-[#486581]">
              กด Spacebar หรือคลิกการ์ดเพื่อพลิกดูเฉลย
            </span>
          </div>

          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#486581] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card Container */}
          <div 
            id="flashcard-main-card"
            onClick={handleFlip}
            className="min-h-[340px] sm:min-h-[380px] bg-white rounded-3xl border-2 border-[#D2E0EC] shadow-sm hover:border-[#486581] hover:shadow-md transition-all cursor-pointer p-6 sm:p-8 flex flex-col justify-between select-none relative"
          >
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isFlipped && (
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#F0F5FA] text-[#334E68] border border-[#D2E0EC]">
                    {currentCard.category}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#829AB1]">
                  {isFlipped ? 'ด้านหลัง (คำเฉลย)' : 'ด้านหน้า (โจทย์)'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    onToggleBookmark(currentCard.id);
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    bookmarkedIds.includes(currentCard.id)
                      ? 'text-[#F59E0B] bg-[#FFFBEB]'
                      : 'text-[#829AB1] hover:text-[#102A43] hover:bg-[#F0F5FA]'
                  }`}
                  title="บุ๊กมาร์กคำนี้"
                >
                  {bookmarkedIds.includes(currentCard.id) ? (
                    <BookmarkCheck className="w-5 h-5 fill-[#F59E0B]" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Center Content based on Front/Back & mode */}
            <div className="my-auto py-6 text-center space-y-4">
              {!isFlipped ? (
                /* FRONT SIDE */
                frontMode === 'en' ? (
                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-5xl font-bold text-[#102A43] tracking-tight">
                      {currentCard.word}
                    </h3>

                    {/* Audio pronounce button */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={(e) => handlePronounceEnglish(e, currentCard.word, currentCard.id, false)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                        title="ฟังเสียงออกเสียงภาษาอังกฤษ"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>ฟังเสียง</span>
                      </button>
                      <button
                        onClick={(e) => handlePronounceEnglish(e, currentCard.word, currentCard.id, true)}
                        className="px-3 py-1.5 rounded-xl border border-[#D2E0EC] bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#334E68] text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="ฟังเสียงช้าๆ 0.55x"
                      >
                        <Snail className="w-4 h-4" />
                        <span>ช้า</span>
                      </button>
                    </div>

                    {/* Optional Phonetic Peek */}
                    <div className="pt-2">
                      {showPhoneticHint ? (
                        <span className="text-sm font-semibold text-[#006270] bg-[#E0FCFF] px-3 py-1 rounded-lg">
                          คำอ่าน: {currentCard.phoneticTh}
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPhoneticHint(true);
                          }}
                          className="text-xs text-[#829AB1] hover:text-[#486581] underline"
                        >
                          แอบดูคำอ่านไทย
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Thai Front Mode */
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#829AB1] uppercase tracking-wider">
                      ความหมายทางการแพทย์:
                    </p>
                    <h3 className="text-2xl sm:text-4xl font-bold text-[#102A43] leading-snug">
                      {currentCard.meaning}
                    </h3>
                  </div>
                )
              ) : (
                /* BACK SIDE (REVEALED ANSWER) */
                <div className="space-y-4 max-w-xl mx-auto text-left bg-[#F0F5FA] p-5 sm:p-6 rounded-2xl border border-[#D2E0EC]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D2E0EC] pb-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                        {currentCard.word}
                      </h3>
                      <p className="text-sm font-semibold text-[#006270] mt-0.5">
                        คำอ่าน: {currentCard.phoneticTh}
                      </p>
                    </div>

                    {/* Audio buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handlePronounceEnglish(e, currentCard.word, currentCard.id, false)}
                        className="p-2 rounded-xl bg-[#486581] text-white hover:bg-[#334E68] transition-colors"
                        title="ฟังเสียงภาษาอังกฤษ"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handlePronounceEnglish(e, currentCard.word, currentCard.id, true)}
                        className="p-2 rounded-xl border border-[#D2E0EC] bg-white text-[#334E68] hover:bg-[#E4ECF4] transition-colors"
                        title="ฟังเสียงช้า"
                      >
                        <Snail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handlePronounceThai(e, currentCard.phoneticTh, currentCard.id)}
                        className="px-2.5 py-2 rounded-xl border border-[#D2E0EC] bg-white text-[#006270] text-xs font-semibold hover:bg-[#E0FCFF] transition-colors flex items-center gap-1"
                        title="ฟังเสียงคำอ่านสำเนียงไทย"
                      >
                        <Volume1 className="w-4 h-4" />
                        <span>สำเนียงไทย</span>
                      </button>
                    </div>
                  </div>

                  {/* Thai Meaning */}
                  <div>
                    <span className="text-xs font-bold text-[#829AB1] uppercase">ความหมาย:</span>
                    <p className="text-base sm:text-lg font-bold text-[#102A43] mt-0.5">
                      {currentCard.meaning}
                    </p>
                  </div>

                  {/* Root / Etymology */}
                  {currentCard.rootMeaning && (
                    <div className="text-xs text-[#334E68] bg-white p-3 rounded-xl border border-[#D2E0EC]">
                      <span className="font-bold text-[#486581] block mb-0.5">รากศัพท์:</span>
                      {currentCard.rootMeaning}
                    </div>
                  )}

                  {/* Related Group */}
                  <div className="flex items-center justify-between text-xs text-[#627D98] pt-1">
                    <span>กลุ่มรอยโรค: {currentCard.relatedGroup}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        onSelectWordDetail(currentCard);
                      }}
                      className="font-bold text-[#486581] hover:underline"
                    >
                      ดูข้อมูลฉบับเต็ม →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Flip Helper */}
            <div className="text-center pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#627D98] bg-[#F0F5FA] px-3 py-1.5 rounded-full border border-[#D2E0EC]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>คลิกที่การ์ดเพื่อพลิก ({isFlipped ? 'ดูโจทย์' : 'ดูคำเฉลย'})</span>
              </span>
            </div>
          </div>

          {/* Action Buttons: Mastered vs Need Review & Nav */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-2.5 rounded-xl border border-[#D2E0EC] bg-white hover:bg-[#F0F5FA] text-[#334E68] text-sm font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ก่อนหน้า</span>
              </button>

              <button
                onClick={handleNext}
                className="px-3.5 py-2.5 rounded-xl border border-[#D2E0EC] bg-white hover:bg-[#F0F5FA] text-[#334E68] text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>ถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Evaluation Buttons: 3 Memory Tiers */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="btn-flashcard-forgotten"
                onClick={() => handleMarkMastery('forgotten')}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                title="จำไม่ได้เลย ต้องการทบทวนบ่อยๆ"
              >
                <XCircle className="w-4 h-4" />
                <span>จำไม่ได้</span>
              </button>

              <button
                id="btn-flashcard-learning"
                onClick={() => handleMarkMastery('learning')}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                title="พอจำได้ คุ้นๆ หรือยังไม่แม่นยำ 100%"
              >
                <HelpCircle className="w-4 h-4" />
                <span>พอจำได้</span>
              </button>

              <button
                id="btn-flashcard-mastered"
                onClick={() => handleMarkMastery('mastered')}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="จำได้แม่นยำแล้ว (+5 XP)"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>จำได้แล้ว (+5 XP)</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

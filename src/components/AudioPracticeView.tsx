import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Snail, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Headphones, 
  Keyboard, 
  ListOrdered, 
  Volume1, 
  Send, 
  Check, 
  X,
  ChevronDown,
  Filter
} from 'lucide-react';
import { VocabItem, HistoryWordItem, AudioPracticeType } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface AudioPracticeViewProps {
  allVocab: VocabItem[];
  customPracticeSet?: VocabItem[] | null;
  onFinishPractice: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onClearCustomSet?: () => void;
}

interface AudioQuestion {
  id: string;
  targetWord: VocabItem;
  choices: VocabItem[];
  correctIndex: number;
}

export const AudioPracticeView: React.FC<AudioPracticeViewProps> = ({
  allVocab,
  customPracticeSet,
  onFinishPractice,
  onSelectWordDetail,
  onClearCustomSet,
}) => {
  // Config
  const [practiceType, setPracticeType] = useState<AudioPracticeType>('choice');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [mobileCatDropdownOpen, setMobileCatDropdownOpen] = useState<boolean>(false);

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

  // Active session
  const [questions, setQuestions] = useState<AudioQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Choice mode state
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isChoiceChecked, setIsChoiceChecked] = useState(false);

  // Typing mode state
  const [typedInput, setTypedInput] = useState<string>('');
  const [isTypingSubmitted, setIsTypingSubmitted] = useState<boolean>(false);
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Results
  const [results, setResults] = useState<{
    word: VocabItem;
    userChoice?: string;
    userTyped?: string;
    isCorrect: boolean;
  }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const candidatePool = (customPracticeSet && customPracticeSet.length > 0)
    ? customPracticeSet
    : allVocab.filter((item) => {
        if (selectedCategory !== 'all') {
          return item.category.includes(selectedCategory) || item.relatedGroup.includes(selectedCategory);
        }
        return true;
      });

  const startSession = (overridePool?: VocabItem[]) => {
    soundManager.playClick();
    const pool = overridePool || candidatePool;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const count = questionCount === -1 ? shuffled.length : Math.min(questionCount, shuffled.length);
    const targets = shuffled.slice(0, count);

    const generated: AudioQuestion[] = targets.map((target) => {
      const distractors = allVocab
        .filter((v) => v.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allChoices = [target, ...distractors].sort(() => 0.5 - Math.random());
      const correctIdx = allChoices.findIndex((c) => c.id === target.id);

      return {
        id: `aud_${target.id}_${Date.now()}_${Math.random()}`,
        targetWord: target,
        choices: allChoices,
        correctIndex: correctIdx,
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedChoiceIndex(null);
    setIsChoiceChecked(false);
    setTypedInput('');
    setIsTypingSubmitted(false);
    setResults([]);
    setIsCompleted(false);
    setIsStarted(true);

    if (practiceType === 'typing') {
      setTimeout(() => {
        typingInputRef.current?.focus();
      }, 150);
    }
  };

  const currentQ = questions[currentIndex] || null;

  // Manual speak controls
  const handlePronounceEnglish = (slow: boolean = false) => {
    if (!currentQ) return;
    soundManager.playClick();
    speakWord(currentQ.targetWord.word, slow);
  };

  const handlePronounceThai = () => {
    if (!currentQ) return;
    soundManager.playClick();
    // Pronounce Thai phonetic reading (สำเนียงไทย) e.g. abasia -> อะเบเซีย
    speakThai(currentQ.targetWord.phoneticTh, false);
  };

  // Choice mode handlers
  const handleSelectChoice = (index: number) => {
    if (isChoiceChecked) return;
    soundManager.playClick();
    setSelectedChoiceIndex(index);
  };

  const handleCheckChoiceAnswer = () => {
    if (selectedChoiceIndex === null || isChoiceChecked || !currentQ) return;

    const correct = selectedChoiceIndex === currentQ.correctIndex;
    setIsChoiceChecked(true);

    if (correct) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    setResults((prev) => [
      ...prev,
      {
        word: currentQ.targetWord,
        userChoice: currentQ.choices[selectedChoiceIndex].word,
        isCorrect: correct,
      },
    ]);
  };

  const handleNextChoice = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoiceIndex(null);
      setIsChoiceChecked(false);
    } else {
      finishPractice(results);
    }
  };

  // Typing mode handlers
  const handleSubmitTyping = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedInput.trim() || isTypingSubmitted) return;
    soundManager.playClick();
    setIsTypingSubmitted(true);
  };

  const handleSelfCheckTyping = (isCorrect: boolean) => {
    if (!currentQ) return;

    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    const newResults = [
      ...results,
      {
        word: currentQ.targetWord,
        userTyped: typedInput.trim(),
        isCorrect,
      },
    ];
    setResults(newResults);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTypedInput('');
      setIsTypingSubmitted(false);
      setTimeout(() => {
        typingInputRef.current?.focus();
      }, 50);
    } else {
      finishPractice(newResults);
    }
  };

  const finishPractice = (finalResults: typeof results) => {
    setIsCompleted(true);
    const score = finalResults.filter((r) => r.isCorrect).length;
    const total = finalResults.length;
    const xpGained = score * 10 + 15;

    if (score > total * 0.7) {
      soundManager.playFanfare();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }

    const reviewedWords: HistoryWordItem[] = finalResults.map((r) => ({
      id: r.word.id,
      word: r.word.word,
      meaning: r.word.meaning,
      isCorrect: r.isCorrect,
      chosenAnswer: r.userChoice,
      userTyped: r.userTyped,
      correctAnswer: r.word.word,
    }));

    onFinishPractice(score, total, xpGained, reviewedWords);
  };

  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base max-w-3xl mx-auto">
      {/* SETUP / CONFIG SCREEN */}
      {!isStarted ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#102A43]">
                ฝึกฟังเสียงการออกเสียง (Medical Audio Listening)
              </h2>
              <p className="text-xs text-[#627D98]">
                ฝึกจับใจความเสียงออกเสียงคำศัพท์การแพทย์ทั้งภาษาอังกฤษ (ปกติ/ช้า) และเสียงอ่านสำเนียงไทย
              </p>
            </div>
          </div>

          {customPracticeSet && customPracticeSet.length > 0 && (
            <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-center justify-between text-xs text-[#92400E]">
              <span>กำลังเตรียมทบทวนเฉพาะคำศัพท์ที่ตอบผิด ({customPracticeSet.length} ข้อ)</span>
              {onClearCustomSet && (
                <button
                  onClick={onClearCustomSet}
                  className="font-bold underline hover:text-[#78350F]"
                >
                  ยกเลิก / ใช้คลังทั้งหมด
                </button>
              )}
            </div>
          )}

          {/* Mode Choice: Choice vs Typing */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              1. เลือกรูปแบบการฝึกฟัง:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="btn-audio-mode-choice"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPracticeType('choice');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  practiceType === 'choice'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-[#486581]" />
                    <span className="font-bold text-sm text-[#102A43]">
                      แบบช้อยส์ 4 ตัวเลือก (Multiple Choice)
                    </span>
                  </div>
                  {practiceType === 'choice' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  ฟังเสียงแล้วคลิกเลือกคำศัพท์ที่ถูกต้องจาก 4 ตัวเลือก
                </p>
              </button>

              <button
                id="btn-audio-mode-typing"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPracticeType('typing');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  practiceType === 'typing'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-[#486581]" />
                    <span className="font-bold text-sm text-[#102A43]">
                      แบบพิมพ์ตอบ (Dictation & Typing)
                    </span>
                  </div>
                  {practiceType === 'typing' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  ฟังเสียงแล้วพิมพ์คำศัพท์ที่ได้ยิน พร้อมขึ้นเฉลยและให้ตรวจคำตอบเอง
                </p>
              </button>
            </div>
          </div>

          {/* Category Choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              2. เลือกหมวดหมู่ระบบอวัยวะ:
            </label>

            {/* Mobile Category Dropdown Button */}
            <div className="md:hidden">
              <button
                id="btn-audio-mobile-cat"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMobileCatDropdownOpen(!mobileCatDropdownOpen);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] text-[#102A43] text-xs font-bold active:bg-[#E4ECF4] transition-colors"
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

            {/* Desktop Category Pills */}
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
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
                  type="button"
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
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              3. จำนวนข้อ:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setQuestionCount(count);
                  }}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border text-center ${
                    questionCount === count
                      ? 'bg-[#486581] text-white border-[#486581]'
                      : 'bg-[#F0F5FA] text-[#486581] border-[#D2E0EC] hover:bg-[#E4ECF4]'
                  }`}
                >
                  {count} ข้อ
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-3">
            <button
              id="btn-start-audio-practice"
              onClick={() => startSession()}
              disabled={candidatePool.length === 0}
              className="w-full py-3.5 rounded-xl btn-primary text-base font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Headphones className="w-5 h-5" />
              <span>เริ่มฝึกฟังเสียง</span>
            </button>
          </div>
        </div>
      ) : isCompleted ? (
        /* COMPLETED SCREEN */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#102A43]">
              ผลการฝึกฟังเสียง
            </h3>
            <p className="text-sm text-[#627D98]">
              คุณตอบถูก {correctCount} จากทั้งหมด {results.length} ข้อ ({Math.round((correctCount / results.length) * 100)}%)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
              <span className="text-xs font-bold text-[#166534] uppercase">ตอบถูก</span>
              <p className="text-2xl font-bold text-[#15803D] mt-0.5">{correctCount}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
              <span className="text-xs font-bold text-[#92400E] uppercase">XP ที่ได้รับ</span>
              <p className="text-2xl font-bold text-[#D97706] mt-0.5">+{correctCount * 10 + 15} XP</p>
            </div>
          </div>

          {/* List of reviewed words */}
          <div className="text-left space-y-2 pt-2 border-t border-[#E8EFF6]">
            <span className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              สรุปรายการคำศัพท์ในการฝึกฟัง:
            </span>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    item.isCorrect
                      ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                      : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#102A43]">{item.word.word}</span>
                      <span className="text-[11px] text-[#627D98]">({item.word.meaning})</span>
                    </div>
                    {item.userTyped && (
                      <p className="text-xs text-[#334E68]">
                        สิ่งที่คุณพิมพ์: <strong className={item.isCorrect ? 'text-[#15803D]' : 'text-[#B91C1C]'}>{item.userTyped}</strong>
                      </p>
                    )}
                  </div>
                  {item.isCorrect ? (
                    <span className="px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] font-bold shrink-0">
                      ถูกต้อง
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#B91C1C] font-bold shrink-0">
                      ตอบผิด
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {results.some((r) => !r.isCorrect) && (
              <button
                onClick={() => {
                  const mistakes = results.filter((r) => !r.isCorrect).map((r) => r.word);
                  startSession(mistakes);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทบทวนข้อที่ตอบผิด ({results.filter((r) => !r.isCorrect).length} ข้อ)</span>
              </button>
            )}

            <button
              onClick={() => setIsStarted(false)}
              className="px-5 py-2.5 rounded-xl btn-primary font-bold text-sm flex items-center gap-2 shadow-xs"
            >
              <span>ทำแบบฝึกหัดชุดใหม่</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* ACTIVE AUDIO PRACTICE SESSION */
        <div className="space-y-4">
          {/* Top Progress */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D2E0EC] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F0F5FA] text-[#486581] border border-[#D2E0EC]">
                ข้อ {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs text-[#627D98] hidden sm:inline">
                ({practiceType === 'choice' ? '4 ตัวเลือก' : 'พิมพ์ตอบ'})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#059669]">
                คะแนน: {correctCount} / {results.length}
              </span>
              <button
                onClick={() => setIsStarted(false)}
                className="text-xs text-[#829AB1] hover:text-[#102A43] underline ml-2"
              >
                ออกจากการฝึก
              </button>
            </div>
          </div>

          {/* Listening Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                {practiceType === 'choice'
                  ? 'ฟังเสียงคำศัพท์แล้วเลือกคำตอบที่ถูกต้อง'
                  : 'ฟังเสียงคำศัพท์แล้วพิมพ์สะกดคำที่ได้ยิน'}
              </span>
              <p className="text-xs text-[#486581]">
                มีเสียงอ่านทั้งคำศัพท์ภาษาอังกฤษ (ปกติ/ช้า) และเสียงอ่านสำเนียงไทย (คำอ่านไทย)
              </p>
            </div>

            {/* Audio Buttons Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 py-2">
              <button
                id="btn-audio-play-normal"
                type="button"
                onClick={() => handlePronounceEnglish(false)}
                className="px-5 py-3 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
                title="ฟังเสียงภาษาอังกฤษ ความเร็วปกติ"
              >
                <Volume2 className="w-5 h-5" />
                <span>ฟังเสียง (ปกติ)</span>
              </button>

              <button
                id="btn-audio-play-slow"
                type="button"
                onClick={() => handlePronounceEnglish(true)}
                className="px-4 py-3 rounded-xl border border-[#D2E0EC] bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#334E68] font-bold text-sm flex items-center gap-1.5 transition-colors"
                title="ฟังเสียงภาษาอังกฤษ แบบช้าๆ 0.55x"
              >
                <Snail className="w-5 h-5" />
                <span>ฟังแบบช้าๆ</span>
              </button>

              <button
                id="btn-audio-play-thai"
                type="button"
                onClick={handlePronounceThai}
                className="px-4 py-3 rounded-xl border border-[#006270] bg-[#E0FCFF] hover:bg-[#C4F1F9] text-[#006270] font-bold text-sm flex items-center gap-1.5 transition-colors"
                title="ฟังเสียงคำอ่านสำเนียงไทย"
              >
                <Volume1 className="w-5 h-5" />
                <span>ฟังเสียงสำเนียงไทย</span>
              </button>
            </div>

            {/* PRACTICE TYPE: 1. CHOICE MODE */}
            {practiceType === 'choice' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {currentQ.choices.map((choice, index) => {
                    const isSelected = selectedChoiceIndex === index;
                    const isTargetCorrect = index === currentQ.correctIndex;

                    let buttonStyle = 'bg-white hover:bg-[#F0F5FA] border-[#D2E0EC] text-[#243B53]';

                    if (isChoiceChecked) {
                      if (isTargetCorrect) {
                        buttonStyle = 'bg-[#E6FFFA] border-[#38B2AC] text-[#234E52] ring-2 ring-[#38B2AC]/30 font-semibold';
                      } else if (isSelected && !isTargetCorrect) {
                        buttonStyle = 'bg-[#FFF5F5] border-[#E53E3E] text-[#742A2A] font-semibold';
                      } else {
                        buttonStyle = 'bg-[#F0F5FA] border-[#D2E0EC] text-[#829AB1] opacity-60';
                      }
                    } else if (isSelected) {
                      buttonStyle = 'bg-[#334E68] text-white border-[#334E68] shadow-xs';
                    }

                    return (
                      <button
                        key={choice.id}
                        id={`audio-choice-${index}`}
                        disabled={isChoiceChecked}
                        onClick={() => handleSelectChoice(index)}
                        className={`p-4 rounded-xl border-2 transition-colors select-none flex flex-col justify-between gap-1 ${buttonStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-base sm:text-lg">
                            {choice.word}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F0F5FA] text-[#486581]">
                            {choice.phoneticTh}
                          </span>
                        </div>
                        {isChoiceChecked && (
                          <p className="text-xs text-[#627D98] line-clamp-1 mt-1">
                            {choice.meaning}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls for Choice Mode */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  {!isChoiceChecked ? (
                    <button
                      disabled={selectedChoiceIndex === null}
                      onClick={handleCheckChoiceAnswer}
                      className={`px-6 py-3 text-sm font-bold rounded-xl ml-auto transition-colors ${
                        selectedChoiceIndex !== null
                          ? 'btn-primary shadow-xs'
                          : 'bg-[#F0F5FA] text-[#BAC7D5] border border-[#D2E0EC] cursor-not-allowed'
                      }`}
                    >
                      ตรวจคำตอบ
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2 text-left">
                        {selectedChoiceIndex === currentQ.correctIndex ? (
                          <span className="text-sm font-bold text-[#059669] flex items-center gap-1.5">
                            <CheckCircle2 className="w-5 h-5" /> ถูกต้อง! (+10 XP)
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-[#DC2626] flex items-center gap-1.5">
                            <XCircle className="w-5 h-5" /> คำตอบที่ถูกต้องคือ {currentQ.targetWord.word}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleNextChoice}
                        className="px-6 py-2.5 rounded-xl btn-primary font-bold text-sm shadow-xs flex items-center gap-1.5"
                      >
                        <span>{currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูผลคะแนน'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PRACTICE TYPE: 2. TYPING / DICTATION MODE */}
            {practiceType === 'typing' && (
              <div className="space-y-4 pt-2 text-left">
                {!isTypingSubmitted ? (
                  <form onSubmit={handleSubmitTyping} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
                        พิมพ์คำศัพท์ภาษาอังกฤษที่คุณได้ยิน:
                      </label>
                      <div className="relative">
                        <input
                          ref={typingInputRef}
                          type="text"
                          required
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="false"
                          value={typedInput}
                          onChange={(e) => setTypedInput(e.target.value)}
                          placeholder="พิมพ์คำศัพท์ภาษาอังกฤษ เช่น arrhythmia"
                          className="w-full px-4 py-3 text-base sm:text-lg rounded-xl bg-[#F0F5FA] border-2 border-[#D2E0EC] focus:border-[#486581] focus:bg-white text-[#102A43] outline-none transition-all font-medium pr-12"
                        />
                        <button
                          type="submit"
                          disabled={!typedInput.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#486581] text-white disabled:opacity-30 transition-opacity"
                          title="ส่งคำตอบ"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#829AB1]">
                      <span>กดปุ่ม Enter หรือกดส่งเพื่อตรวจคำตอบ</span>
                      <button
                        type="button"
                        onClick={() => {
                          setTypedInput('(ไม่ทราบคำตอบ)');
                          setIsTypingSubmitted(true);
                        }}
                        className="text-[#486581] hover:underline font-medium"
                      >
                        ขอดูเฉลย
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Self-Check Evaluation for Audio Typing */
                  <div className="space-y-5 pt-2 border-t border-[#E8EFF6] animate-fade-in">
                    <div className="p-4 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] space-y-3">
                      <div>
                        <span className="text-xs font-bold text-[#627D98] block mb-1">
                          สิ่งที่คุณพิมพ์ตอบ:
                        </span>
                        <p className="text-base font-bold text-[#102A43] bg-white px-3 py-2 rounded-lg border border-[#D2E0EC]">
                          {typedInput || '(ไม่ได้พิมพ์คำตอบ)'}
                        </p>
                      </div>

                      <div className="pt-1">
                        <span className="text-xs font-bold text-[#059669] block mb-1">
                          เฉลยคำศัพท์ที่ถูกต้อง:
                        </span>
                        <div className="p-3.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-[#065F46] space-y-1">
                          <p className="text-xl font-bold">{currentQ.targetWord.word}</p>
                          <p className="text-xs text-[#047857]">
                            คำอ่าน: {currentQ.targetWord.phoneticTh} • ความหมาย: {currentQ.targetWord.meaning}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Self-check buttons */}
                    <div className="space-y-2 text-center">
                      <p className="text-xs font-bold text-[#486581] uppercase tracking-wider">
                        ตรวจความถูกต้องจากการพิมพ์ของคุณ:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleSelfCheckTyping(false)}
                          className="py-3 px-4 rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
                        >
                          <X className="w-5 h-5" />
                          <span>ฉันสะกดผิด (ไม่ถูกต้อง)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelfCheckTyping(true)}
                          className="py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                        >
                          <Check className="w-5 h-5" />
                          <span>ฉันตอบถูกต้อง (+10 XP)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Keyboard, 
  Sparkles, 
  Check, 
  X, 
  RotateCcw, 
  Volume2, 
  Snail, 
  Volume1, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Shuffle,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabItem, TypingMode, HistoryWordItem } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface TypingPracticeViewProps {
  allVocab: VocabItem[];
  bookmarkedIds: string[];
  onFinishSession: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  customWordSet?: VocabItem[] | null;
  onClearCustomSet?: () => void;
}

export const TypingPracticeView: React.FC<TypingPracticeViewProps> = ({
  allVocab,
  bookmarkedIds,
  onFinishSession,
  customWordSet,
  onClearCustomSet,
}) => {
  // Config state
  const [mode, setMode] = useState<TypingMode>('th_to_en'); // 'th_to_en' = prompt Thai -> type English, 'en_to_th' = prompt English -> type Thai
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Active quiz session state
  const [questions, setQuestions] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [results, setResults] = useState<{
    word: VocabItem;
    userTyped: string;
    isCorrect: boolean;
  }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Filter pool
  const candidatePool = useMemo(() => {
    if (customWordSet && customWordSet.length > 0) {
      return customWordSet;
    }
    return allVocab.filter((item) => {
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory) && !item.relatedGroup.includes(selectedCategory)) {
          return false;
        }
      }
      return true;
    });
  }, [allVocab, customWordSet, selectedCategory]);

  const startPractice = (overrideWords?: VocabItem[]) => {
    soundManager.playClick();
    const pool = overrideWords || candidatePool;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = questionCount === -1 ? shuffled : shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuestions(selected);
    setCurrentIndex(0);
    setTypedInput('');
    setIsSubmitted(false);
    setResults([]);
    setIsCompleted(false);
    setIsStarted(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    if (customWordSet && customWordSet.length > 0 && !isStarted) {
      startPractice(customWordSet);
    }
  }, [customWordSet]);

  const currentWord = questions[currentIndex] || null;

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedInput.trim() || isSubmitted) return;
    soundManager.playClick();
    setIsSubmitted(true);
  };

  const handleSelfEvaluation = (isCorrect: boolean) => {
    if (!currentWord) return;

    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    const newResults = [
      ...results,
      {
        word: currentWord,
        userTyped: typedInput.trim(),
        isCorrect,
      },
    ];
    setResults(newResults);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTypedInput('');
      setIsSubmitted(false);
      setTimeout(() => {
        inputRef.current?.focus();
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
      userTyped: r.userTyped,
      correctAnswer: mode === 'th_to_en' ? r.word.word : r.word.meaning,
    }));

    onFinishSession(score, total, xpGained, reviewedWords);
  };

  const handlePronounceEnglish = async (text: string, slow: boolean = false) => {
    soundManager.playClick();
    await speakWord(text, slow);
  };

  const handlePronounceThai = async (text: string) => {
    soundManager.playClick();
    await speakThai(text, false);
  };

  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base max-w-3xl mx-auto">
      {/* SETUP / CONFIG SCREEN */}
      {!isStarted ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#102A43]">
                แบบฝึกหัดพิมพ์ตอบ (Medical Spelling & Typing)
              </h2>
              <p className="text-xs text-[#627D98]">
                ฝึกสะกดคำศัพท์การแพทย์ภาษาอังกฤษ หรือพิมพ์ความหมายภาษาไทย พร้อมเฉลยและตรวจคำตอบ
              </p>
            </div>
          </div>

          {customWordSet && customWordSet.length > 0 && (
            <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-center justify-between text-xs text-[#92400E]">
              <span>กำลังเตรียมทบทวนเฉพาะคำศัพท์ที่ตอบผิด ({customWordSet.length} ข้อ)</span>
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

          {/* Practice Mode Choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              1. เลือกรูปแบบการพิมพ์ตอบ:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="btn-typing-mode-en"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode('th_to_en');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === 'th_to_en'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#102A43]">
                    โจทย์ไทย → พิมพ์คำศัพท์อังกฤษ
                  </span>
                  {mode === 'th_to_en' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  เห็นความหมายไทย แล้วฝึกสะกดคำศัพท์การแพทย์ภาษาอังกฤษ
                </p>
              </button>

              <button
                id="btn-typing-mode-th"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode('en_to_th');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === 'en_to_th'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#102A43]">
                    โจทย์อังกฤษ → พิมพ์คำแปลไทย
                  </span>
                  {mode === 'en_to_th' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  เห็นคำศัพท์ภาษาอังกฤษและฟังเสียง แล้วพิมพ์ความหมายภาษาไทย
                </p>
              </button>
            </div>
          </div>

          {/* Category Choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              2. เลือกหมวดหมู่ระบบอวัยวะ:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
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

          {/* Question count */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              3. จำนวนข้อ:
            </label>
            <div className="flex items-center gap-2">
              {[5, 10, 15, 20, -1].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setQuestionCount(count);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors border ${
                    questionCount === count
                      ? 'bg-[#486581] text-white border-[#486581]'
                      : 'bg-[#F0F5FA] text-[#486581] border-[#D2E0EC] hover:bg-[#E4ECF4]'
                  }`}
                >
                  {count === -1 ? 'ทั้งหมด' : `${count} ข้อ`}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <div className="pt-3">
            <button
              id="btn-start-typing-session"
              onClick={() => startPractice()}
              disabled={candidatePool.length === 0}
              className="w-full py-3.5 rounded-xl btn-primary text-base font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Keyboard className="w-5 h-5" />
              <span>เริ่มทำแบบฝึกหัดพิมพ์ตอบ</span>
            </button>
          </div>
        </div>
      ) : isCompleted ? (
        /* COMPLETED SUMMARY SCREEN */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#102A43]">
              ผลการฝึกพิมพ์ตอบ
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
              สรุปรายการคำศัพท์และสิ่งที่คุณตอบ:
            </span>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
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
                    <div className="text-xs text-[#334E68]">
                      <span>คุณพิมพ์: <strong className={item.isCorrect ? 'text-[#15803D]' : 'text-[#B91C1C]'}>{item.userTyped || '(ว่าง)'}</strong></span>
                      {!item.isCorrect && (
                        <span className="ml-2 text-[#006270]">
                          • เฉลย: <strong>{mode === 'th_to_en' ? item.word.word : item.word.meaning}</strong>
                        </span>
                      )}
                    </div>
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
                  startPractice(mistakes);
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
      ) : currentWord ? (
        /* ACTIVE QUESTION SCREEN */
        <div className="space-y-4">
          {/* Top Progress */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D2E0EC] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F0F5FA] text-[#486581] border border-[#D2E0EC]">
                ข้อ {currentIndex + 1} / {questions.length}
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

          {/* Main Question Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6">
            {/* Question Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#627D98] uppercase tracking-wider">
                  {mode === 'th_to_en' ? 'โจทย์ (ความหมายภาษาไทย):' : 'โจทย์ (คำศัพท์ภาษาอังกฤษ):'}
                </span>
              </div>

              {mode === 'th_to_en' ? (
                /* Thai Prompt -> User Types English */
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] leading-snug">
                    {currentWord.meaning}
                  </h3>
                </div>
              ) : (
                /* English Prompt -> User Types Thai */
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#102A43]">
                      {currentWord.word}
                    </h3>
                    <p className="text-sm font-semibold text-[#006270] mt-0.5">
                      คำอ่าน: {currentWord.phoneticTh}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handlePronounceEnglish(currentWord.word, false)}
                      className="p-2.5 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white transition-colors shadow-2xs"
                      title="ฟังเสียงภาษาอังกฤษ"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePronounceEnglish(currentWord.word, true)}
                      className="p-2.5 rounded-xl border border-[#D2E0EC] bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#334E68] transition-colors"
                      title="ฟังเสียงช้า"
                    >
                      <Snail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitAnswer} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
                    {mode === 'th_to_en' ? 'พิมพ์คำศัพท์ภาษาอังกฤษ:' : 'พิมพ์ความหมายภาษาไทย:'}
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      placeholder={mode === 'th_to_en' ? 'เช่น bradycardia' : 'เช่น ภาวะหัวใจเต้นช้า'}
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

                <div className="flex items-center justify-between text-xs text-[#829AB1] pt-1">
                  <span>กดปุ่ม Enter หรือกดส่งเพื่อตรวจคำตอบ</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTypedInput('(ไม่ทราบคำตอบ)');
                      setIsSubmitted(true);
                    }}
                    className="text-[#486581] hover:underline font-medium"
                  >
                    ขอดูเฉลยทันที
                  </button>
                </div>
              </form>
            ) : (
              /* REVEAL ANSWER & SELF-EVALUATION STATE */
              <div className="space-y-5 pt-2 border-t border-[#E8EFF6] animate-fade-in">
                {/* Comparison Box */}
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
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#059669]">
                        เฉลยคำตอบที่ถูกต้อง:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePronounceEnglish(currentWord.word, false)}
                          className="px-2 py-1 rounded-md bg-[#486581] text-white text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>ฟังเสียงอังกฤษ</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePronounceThai(currentWord.meaning)}
                          className="px-2 py-1 rounded-md bg-white border border-[#D2E0EC] text-[#006270] text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Volume1 className="w-3.5 h-3.5" />
                          <span>ฟังเสียงไทย</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-[#065F46]">
                      <p className="text-lg font-bold">
                        {mode === 'th_to_en' ? currentWord.word : currentWord.meaning}
                      </p>
                      <p className="text-xs text-[#047857] mt-0.5">
                        {mode === 'th_to_en' ? `ความหมาย: ${currentWord.meaning} (${currentWord.phoneticTh})` : `คำศัพท์: ${currentWord.word} (${currentWord.phoneticTh})`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Self-check selector: user explicitly decides if they were correct */}
                <div className="space-y-2">
                  <p className="text-center text-xs font-bold text-[#486581] uppercase tracking-wider">
                    คุณตรวจสอบคำตอบแล้ว คุณตอบถูกต้องหรือไม่?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="btn-self-check-incorrect"
                      type="button"
                      onClick={() => handleSelfEvaluation(false)}
                      className="py-3 px-4 rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>ฉันตอบไม่ถูกต้อง (ผิด)</span>
                    </button>

                    <button
                      id="btn-self-check-correct"
                      type="button"
                      onClick={() => handleSelfEvaluation(true)}
                      className="py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>ฉันตอบถูกต้อง (+10 XP)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

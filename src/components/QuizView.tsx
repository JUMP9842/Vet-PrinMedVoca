import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Snail, 
  Volume1,
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Lightbulb, 
  Award, 
  ArrowRight,
  HelpCircle,
  Check,
  RotateCw,
  ChevronDown,
  Filter
} from 'lucide-react';
import { VocabItem, QuizQuestion, QuizQuestionMode, HistoryWordItem } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface QuizViewProps {
  allVocab: VocabItem[];
  customQuestionSet?: VocabItem[] | null;
  onFinishQuiz: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onClearCustomSet?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  allVocab,
  customQuestionSet,
  onFinishQuiz,
  onSelectWordDetail,
  onClearCustomSet,
}) => {
  // Config
  const [questionMode, setQuestionMode] = useState<QuizQuestionMode>('en_to_th'); // 'en_to_th' = En prompt / Th choices, 'th_to_en' = Th prompt / En choices
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

  // Active Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [reviewedWords, setReviewedWords] = useState<HistoryWordItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<{ question: QuizQuestion; chosenIndex: number }[]>([]);
  const [showHint, setShowHint] = useState(false);

  const candidatePool = (customQuestionSet && customQuestionSet.length > 0)
    ? customQuestionSet
    : allVocab.filter((item) => {
        if (selectedCategory !== 'all') {
          return item.category.includes(selectedCategory) || item.relatedGroup.includes(selectedCategory);
        }
        return true;
      });

  const startQuiz = (overridePool?: VocabItem[]) => {
    soundManager.playClick();
    const pool = overridePool || candidatePool;
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const count = questionCount === -1 ? shuffledPool.length : Math.min(questionCount, shuffledPool.length);
    const selectedTargets = shuffledPool.slice(0, count);

    const generated: QuizQuestion[] = selectedTargets.map((target) => {
      const distractors = allVocab
        .filter((v) => v.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allChoices = [target, ...distractors].sort(() => 0.5 - Math.random());
      const correctIdx = allChoices.findIndex((c) => c.id === target.id);

      const isEnToTh = questionMode === 'en_to_th';

      return {
        id: `q_${target.id}_${Date.now()}_${Math.random()}`,
        targetWord: target,
        mode: questionMode,
        questionPrompt: isEnToTh ? target.word : target.meaning,
        choices: isEnToTh ? allChoices.map((c) => c.meaning) : allChoices.map((c) => c.word),
        correctChoiceIndex: correctIdx,
        phoneticHint: target.phoneticTh,
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedChoiceIndex(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setReviewedWords([]);
    setWrongAnswers([]);
    setQuizCompleted(false);
    setShowHint(false);
    setIsStarted(true);
  };

  useEffect(() => {
    if (customQuestionSet && customQuestionSet.length > 0 && !isStarted) {
      startQuiz(customQuestionSet);
    }
  }, [customQuestionSet]);

  const currentQuestion = questions[currentIndex] || null;

  // Manual audio buttons (NO auto-play on next question per user request)
  const handlePronounceEnglish = (slow: boolean = false) => {
    if (!currentQuestion) return;
    soundManager.playClick();
    speakWord(currentQuestion.targetWord.word, slow);
  };

  const handlePronounceThai = () => {
    if (!currentQuestion) return;
    soundManager.playClick();
    speakThai(currentQuestion.targetWord.meaning, false);
  };

  const handleSelectChoice = (index: number) => {
    if (isAnswerChecked) return;
    soundManager.playClick();
    setSelectedChoiceIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedChoiceIndex === null || isAnswerChecked || !currentQuestion) return;

    const correct = selectedChoiceIndex === currentQuestion.correctChoiceIndex;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    const wordItem: HistoryWordItem = {
      id: currentQuestion.targetWord.id,
      word: currentQuestion.targetWord.word,
      meaning: currentQuestion.targetWord.meaning,
      isCorrect: correct,
      chosenAnswer: currentQuestion.choices[selectedChoiceIndex],
      correctAnswer: currentQuestion.choices[currentQuestion.correctChoiceIndex],
    };

    setReviewedWords((prev) => [...prev, wordItem]);

    if (correct) {
      soundManager.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playIncorrect();
      setWrongAnswers((prev) => [...prev, { question: currentQuestion, chosenIndex: selectedChoiceIndex }]);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoiceIndex(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setQuizCompleted(true);
      const totalScore = isCorrect ? score : score;
      const xpGained = totalScore * 10;
      onFinishQuiz(totalScore, questions.length, xpGained, reviewedWords);

      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || quizCompleted) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          handleSelectChoice(idx);
        } else if (e.key === 'Enter' && selectedChoiceIndex !== null) {
          handleCheckAnswer();
        }
      } else {
        if (e.key === 'Enter') {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, quizCompleted, isAnswerChecked, selectedChoiceIndex, currentIndex, questions.length]);

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base max-w-3xl mx-auto">
      {/* SETUP / CONFIG SCREEN */}
      {!isStarted ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#102A43]">
                แบบทดสอบ 4 ตัวเลือก (Multiple Choice Quiz)
              </h2>
              <p className="text-xs text-[#627D98]">
                เลือกประเภทคำถาม จำนวนข้อ และหมวดหมู่ระบบอวัยวะที่ต้องการทดสอบ
              </p>
            </div>
          </div>

          {customQuestionSet && customQuestionSet.length > 0 && (
            <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-center justify-between text-xs text-[#92400E]">
              <span>กำลังเตรียมทบทวนเฉพาะข้อที่ตอบผิด ({customQuestionSet.length} ข้อ)</span>
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

          {/* Question Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              1. เลือกรูปแบบคำถาม:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="btn-quiz-mode-en"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setQuestionMode('en_to_th');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  questionMode === 'en_to_th'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#102A43]">
                    โจทย์คำศัพท์ภาษาอังกฤษ → ตัวเลือกแปลไทย
                  </span>
                  {questionMode === 'en_to_th' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  แสดงคำศัพท์ภาษาอังกฤษ แล้วเลือกความหมายภาษาไทยที่ถูกต้อง
                </p>
              </button>

              <button
                id="btn-quiz-mode-th"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setQuestionMode('th_to_en');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  questionMode === 'th_to_en'
                    ? 'border-[#486581] bg-[#F0F5FA] ring-2 ring-[#486581]/20 shadow-xs'
                    : 'border-[#D2E0EC] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#102A43]">
                    โจทย์ภาษาไทย → ตัวเลือกคำศัพท์อังกฤษ
                  </span>
                  {questionMode === 'th_to_en' && <Check className="w-4 h-4 text-[#486581]" />}
                </div>
                <p className="text-xs text-[#627D98]">
                  แสดงความหมายภาษาไทย แล้วเลือกคำศัพท์ภาษาอังกฤษที่ถูกต้อง
                </p>
              </button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              2. เลือกหมวดหมู่ระบบอวัยวะ:
            </label>

            {/* Mobile Category Dropdown Button */}
            <div className="md:hidden">
              <button
                id="btn-quiz-mobile-cat"
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

          {/* Question Count Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#486581] uppercase tracking-wider block">
              3. จำนวนข้อ:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[5, 10, 15, 20, -1].map((count) => (
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
                  {count === -1 ? 'ทั้งหมด' : `${count} ข้อ`}
                </button>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="pt-3">
            <button
              id="btn-start-custom-quiz"
              onClick={() => startQuiz()}
              disabled={candidatePool.length < 4}
              className="w-full py-3.5 rounded-xl btn-primary text-base font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <HelpCircle className="w-5 h-5" />
              <span>เริ่มทำแบบทดสอบ 4 ตัวเลือก</span>
            </button>
          </div>
        </div>
      ) : quizCompleted ? (
        /* QUIZ FINISHED SCREEN */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFF6] text-[#334E68] flex items-center justify-center mx-auto border border-[#D2E0EC]">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#102A43]">
              {Math.round((score / questions.length) * 100) >= 80
                ? 'ยอดเยี่ยมมาก! เชี่ยวชาญศัพท์ชุดนี้'
                : 'ทำแบบทดสอบเสร็จสมบูรณ์'}
            </h2>
            <p className="text-sm text-[#627D98]">
              บันทึกคะแนนและคำศัพท์ลงในประวัติการเรียนรู้เรียบร้อย
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F0F5FA] rounded-xl border border-[#D2E0EC]">
            <div>
              <span className="text-xs font-medium text-[#627D98]">คะแนน</span>
              <p className="text-xl font-bold text-[#102A43]">{score} / {questions.length}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-[#627D98]">ความแม่นยำ</span>
              <p className="text-xl font-bold text-[#102A43]">{Math.round((score / questions.length) * 100)}%</p>
            </div>
            <div>
              <span className="text-xs font-medium text-[#627D98]">XP ได้รับ</span>
              <p className="text-xl font-bold text-[#059669]">+{score * 10}</p>
            </div>
          </div>

          {/* Review wrong answers */}
          {wrongAnswers.length > 0 && (
            <div className="space-y-2 text-left pt-3 border-t border-[#E8EFF6]">
              <h4 className="font-bold text-sm text-[#243B53]">
                คำศัพท์ที่ควรทบทวน ({wrongAnswers.length} คำ)
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {wrongAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectWordDetail(item.question.targetWord)}
                    className="p-3.5 bg-[#F0F5FA] border border-[#D2E0EC] rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#E4ECF4] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#102A43]">{item.question.targetWord.word}</span>
                        <span className="text-xs text-[#627D98]">({item.question.targetWord.phoneticTh})</span>
                      </div>
                      <p className="text-xs text-[#059669] font-medium mt-0.5">
                        ความหมาย: {item.question.targetWord.meaning}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#829AB1]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {wrongAnswers.length > 0 && (
              <button
                onClick={() => {
                  const mistakes = wrongAnswers.map((w) => w.question.targetWord);
                  startQuiz(mistakes);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทบทวนข้อที่ตอบผิด ({wrongAnswers.length} ข้อ)</span>
              </button>
            )}

            <button
              onClick={() => setIsStarted(false)}
              className="px-5 py-2.5 rounded-xl btn-primary font-bold text-sm flex items-center gap-2 shadow-xs"
            >
              <RotateCw className="w-4 h-4" />
              <span>ทำแบบทดสอบชุดใหม่</span>
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        /* ACTIVE QUESTION SCREEN */
        <div className="space-y-4">
          {/* Top Progress Bar */}
          <div className="bg-white rounded-xl p-4 border border-[#D2E0EC] shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#486581] whitespace-nowrap">
                ข้อที่ {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs text-[#627D98] hidden sm:inline">
                ({currentQuestion.targetWord.category})
              </span>
            </div>

            <div className="flex-1 max-w-xs h-2 bg-[#F0F5FA] rounded-full overflow-hidden border border-[#D2E0EC] hidden xs:block">
              <div 
                className="h-full bg-[#486581] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#F59E0B] bg-[#FFFBEB] px-2.5 py-0.5 rounded-lg border border-[#FDE68A]">
                {score * 10} XP
              </span>
              <button
                onClick={() => setIsStarted(false)}
                className="text-xs text-[#829AB1] hover:text-[#102A43] underline ml-1"
              >
                ออก
              </button>
            </div>
          </div>

          {/* Main Question Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D2E0EC] shadow-xs space-y-6">
            {/* Question Prompt Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-[#627D98] uppercase tracking-wide">
                  {currentQuestion.mode === 'en_to_th'
                    ? 'เลือกคำแปลภาษาไทยที่ถูกต้อง (4 ตัวเลือก)'
                    : 'เลือกคำศัพท์ภาษาอังกฤษที่ถูกต้อง (4 ตัวเลือก)'}
                </span>

                {currentQuestion.mode === 'en_to_th' && (
                  <button
                    id="btn-toggle-hint"
                    onClick={() => {
                      soundManager.playClick();
                      setShowHint(!showHint);
                    }}
                    className="text-xs sm:text-sm font-semibold text-[#334E68] hover:text-[#102A43] bg-[#F0F5FA] hover:bg-[#E4ECF4] px-2.5 py-1 rounded-lg border border-[#D2E0EC] flex items-center gap-1.5 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                    <span>{showHint ? 'ซ่อนคำอ่าน' : 'ดูคำอ่านไทย'}</span>
                  </button>
                )}
              </div>

              <div className="p-6 bg-[#F0F5FA] rounded-2xl border border-[#D2E0EC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
                    {currentQuestion.questionPrompt}
                  </h2>
                  {showHint && currentQuestion.mode === 'en_to_th' && (
                    <p className="text-sm sm:text-base font-semibold text-[#006270] bg-[#E0FCFF] px-3 py-0.5 rounded-lg inline-block mt-1">
                      คำอ่าน: {currentQuestion.phoneticHint}
                    </p>
                  )}
                  {currentQuestion.mode === 'th_to_en' && (
                    <p className="text-xs text-[#627D98] mt-0.5">
                      กลุ่มโรค: {currentQuestion.targetWord.relatedGroup}
                    </p>
                  )}
                </div>

                {/* Audio Pronunciation Buttons: Normal, Slow, Thai */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="btn-quiz-speak-normal"
                    onClick={() => handlePronounceEnglish(false)}
                    className="p-3 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                    title="กดเพื่อฟังเสียงภาษาอังกฤษ (Normal Speed)"
                    aria-label="Play normal speech"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span className="text-xs font-semibold hidden sm:inline">ฟังเสียง</span>
                  </button>

                  <button
                    id="btn-quiz-speak-slow"
                    onClick={() => handlePronounceEnglish(true)}
                    className="p-3 rounded-xl border border-[#D2E0EC] bg-white hover:bg-[#F0F5FA] text-[#334E68] flex items-center gap-1.5 transition-colors"
                    title="กดเพื่อฟังเสียงแบบช้าๆ (Slow Speed 0.55x)"
                    aria-label="Play slow speech"
                  >
                    <Snail className="w-5 h-5" />
                    <span className="text-xs font-semibold hidden sm:inline">ช้า</span>
                  </button>

                  <button
                    id="btn-quiz-speak-thai"
                    onClick={handlePronounceThai}
                    className="p-3 rounded-xl border border-[#006270] bg-[#E0FCFF] hover:bg-[#C4F1F9] text-[#006270] flex items-center gap-1.5 transition-colors"
                    title="ฟังเสียงคำแปลไทย"
                  >
                    <Volume1 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = selectedChoiceIndex === index;
                const isTargetCorrect = index === currentQuestion.correctChoiceIndex;

                let buttonStyle = 'bg-white hover:bg-[#F0F5FA] border-[#D2E0EC] text-[#243B53]';

                if (isAnswerChecked) {
                  if (isTargetCorrect) {
                    buttonStyle = 'bg-[#E6FFFA] border-[#38B2AC] text-[#234E52] font-semibold ring-2 ring-[#38B2AC]/30';
                  } else if (isSelected && !isTargetCorrect) {
                    buttonStyle = 'bg-[#FFF5F5] border-[#E53E3E] text-[#742A2A] font-semibold';
                  } else {
                    buttonStyle = 'bg-[#F0F5FA] border-[#D2E0EC] text-[#829AB1] opacity-60';
                  }
                } else if (isSelected) {
                  buttonStyle = 'bg-[#334E68] text-white border-[#334E68] shadow-xs';
                }

                const choiceLetters = ['1', '2', '3', '4'];

                return (
                  <button
                    key={index}
                    id={`quiz-choice-${index}`}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectChoice(index)}
                    className={`p-4 rounded-xl border-2 text-left transition-colors flex items-start gap-3 select-none ${buttonStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-[#102A43] text-white' : 'bg-[#E4ECF4] text-[#334E68]'
                    }`}>
                      {choiceLetters[index]}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug flex-1">
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-white rounded-xl p-4 border border-[#D2E0EC] shadow-xs flex items-center justify-between gap-3">
            {!isAnswerChecked ? (
              <>
                <span className="text-xs text-[#627D98] hidden sm:inline">
                  กด 1, 2, 3, 4 บนคีย์บอร์ด หรือคลิกตัวเลือกแล้วกดตรวจคำตอบ
                </span>
                <button
                  id="btn-quiz-check"
                  disabled={selectedChoiceIndex === null}
                  onClick={handleCheckAnswer}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-xl ml-auto transition-colors ${
                    selectedChoiceIndex !== null 
                      ? 'btn-primary' 
                      : 'bg-[#F0F5FA] text-[#BAC7D5] border border-[#D2E0EC] cursor-not-allowed'
                  }`}
                >
                  ตรวจคำตอบ
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#E53E3E] shrink-0" />
                  )}
                  <span className={`text-sm font-bold ${isCorrect ? 'text-[#059669]' : 'text-[#E53E3E]'}`}>
                    {isCorrect
                      ? 'ถูกต้อง! (+10 XP)'
                      : `คำตอบที่ถูก: ${currentQuestion.choices[currentQuestion.correctChoiceIndex]}`}
                  </span>
                </div>

                <button
                  id="btn-quiz-continue"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 text-sm font-semibold rounded-xl btn-primary shrink-0"
                >
                  {currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูผลคะแนน'}
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

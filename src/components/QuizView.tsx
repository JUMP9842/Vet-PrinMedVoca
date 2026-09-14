import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Snail,
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Lightbulb,
  Award,
  ArrowRight
} from 'lucide-react';
import { VocabItem, QuizQuestion, HistoryWordItem } from '../types';
import { speakWord, soundManager } from '../utils/audio';

interface QuizViewProps {
  allVocab: VocabItem[];
  customQuestionSet?: VocabItem[] | null;
  onFinishQuiz: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  onSelectWordDetail: (word: VocabItem) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  allVocab,
  customQuestionSet,
  onFinishQuiz,
  onSelectWordDetail,
}) => {
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

  // Generate Questions helper
  const generateQuestions = useCallback(() => {
    const pool = (customQuestionSet && customQuestionSet.length >= 4) ? customQuestionSet : allVocab;
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const count = Math.min(10, shuffledPool.length);
    const selectedTargets = shuffledPool.slice(0, count);

    const generated: QuizQuestion[] = selectedTargets.map((target) => {
      const distractors = allVocab
        .filter((v) => v.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allChoices = [target, ...distractors].sort(() => 0.5 - Math.random());
      const correctIdx = allChoices.findIndex((c) => c.id === target.id);

      return {
        id: `q_${target.id}_${Date.now()}_${Math.random()}`,
        targetWord: target,
        questionPrompt: target.word,
        choices: allChoices.map((c) => c.meaning),
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
  }, [allVocab, customQuestionSet]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion && !isAnswerChecked && !quizCompleted) {
      speakWord(currentQuestion.targetWord.word, false);
    }
  }, [currentIndex, currentQuestion, isAnswerChecked, quizCompleted]);

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
      if (quizCompleted) return;

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
  }, [quizCompleted, isAnswerChecked, selectedChoiceIndex, currentIndex, questions.length]);

  if (questions.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#D2E0EC]">
        <p className="font-semibold text-base text-[#627D98]">กำลังเตรียมข้อสอบ...</p>
      </div>
    );
  }

  // Quiz Finished Screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const xpGained = score * 10;

    return (
      <div className="max-w-xl mx-auto space-y-6 pb-24 animate-fade-in text-base">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFF6] text-[#334E68] flex items-center justify-center mx-auto border border-[#D2E0EC]">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#102A43]">
              {percentage >= 80 ? 'ยอดเยี่ยมมาก! เชี่ยวชาญศัพท์ชุดนี้' : 'ทำแบบทดสอบเสร็จสมบูรณ์'}
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
              <p className="text-xl font-bold text-[#102A43]">{percentage}%</p>
            </div>
            <div>
              <span className="text-xs font-medium text-[#627D98]">XP ได้รับ</span>
              <p className="text-xl font-bold text-[#059669]">+{xpGained}</p>
            </div>
          </div>

          {/* Review wrong answers */}
          {wrongAnswers.length > 0 && (
            <div className="space-y-2 text-left pt-3 border-t border-[#E8EFF6]">
              <h4 className="font-bold text-sm text-[#243B53]">
                คำศัพท์ที่ควรทบทวน ({wrongAnswers.length} คำ)
              </h4>
              <div className="space-y-2">
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
                        คำตอบที่ถูก: {item.question.targetWord.meaning}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#829AB1]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              id="btn-quiz-retry"
              onClick={() => {
                soundManager.playClick();
                generateQuestions();
              }}
              className="w-full py-3 text-base font-semibold rounded-xl btn-primary flex items-center justify-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบชุดใหม่ (10 ข้อ)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-24 animate-fade-in text-base">
      {/* Top Progress Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#D2E0EC] shadow-xs flex items-center gap-3">
        <span className="text-sm font-semibold text-[#486581] whitespace-nowrap">
          ข้อที่ {currentIndex + 1} / {questions.length}
        </span>
        <div className="flex-1 h-2 bg-[#F0F5FA] rounded-full overflow-hidden border border-[#D2E0EC]">
          <div 
            className="h-full bg-[#486581] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm font-bold text-[#F59E0B] bg-[#FFFBEB] px-2.5 py-0.5 rounded-lg border border-[#FDE68A]">
          {score * 10} XP
        </span>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D2E0EC] shadow-xs space-y-6">
        {/* Question Prompt Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-[#627D98] uppercase tracking-wide">
              เลือกคำแปลภาษาไทยที่ถูกต้อง (4 ตัวเลือก)
            </span>
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
          </div>

          <div className="p-6 bg-[#F0F5FA] rounded-2xl border border-[#D2E0EC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
                {currentQuestion.questionPrompt}
              </h2>
              {showHint && (
                <p className="text-sm sm:text-base font-semibold text-[#006270] bg-[#E0FCFF] px-3 py-0.5 rounded-lg inline-block mt-1">
                  คำอ่าน: {currentQuestion.phoneticHint}
                </p>
              )}
            </div>

            {/* Audio Pronunciation Buttons: Normal & Slow */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-quiz-speak-normal"
                onClick={() => {
                  soundManager.playClick();
                  speakWord(currentQuestion.targetWord.word, false);
                }}
                className="p-3 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                title="ฟังเสียงปกติ (Normal Speed)"
                aria-label="Play normal speech"
              >
                <Volume2 className="w-5 h-5" />
                <span className="text-xs font-semibold hidden sm:inline">ฟังเสียง</span>
              </button>

              <button
                id="btn-quiz-speak-slow"
                onClick={() => {
                  soundManager.playClick();
                  speakWord(currentQuestion.targetWord.word, true);
                }}
                className="p-3 rounded-xl border border-[#D2E0EC] bg-white hover:bg-[#F0F5FA] text-[#334E68] flex items-center gap-1.5 transition-colors"
                title="ฟังเสียงแบบช้าๆ (Slow Speed)"
                aria-label="Play slow speech"
              >
                <Snail className="w-5 h-5" />
                <span className="text-xs font-semibold hidden sm:inline">ช้า</span>
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
              กดแป้นพิมพ์ 1, 2, 3, 4 หรือคลิกเลือกคำตอบ แล้วกดตรวจคำตอบ
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
                {isCorrect ? 'ถูกต้อง! (+10 XP)' : `คำตอบที่ถูก: ${currentQuestion.targetWord.meaning}`}
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
  );
};

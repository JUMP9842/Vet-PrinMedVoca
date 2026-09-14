import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Snail, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  Headphones
} from 'lucide-react';
import { VocabItem, HistoryWordItem } from '../types';
import { speakWord, soundManager } from '../utils/audio';

interface AudioPracticeViewProps {
  allVocab: VocabItem[];
  customPracticeSet?: VocabItem[] | null;
  onFinishPractice: (score: number, total: number, xpGained: number, reviewedWords: HistoryWordItem[]) => void;
  onSelectWordDetail: (word: VocabItem) => void;
}

interface AudioPracticeQuestion {
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
}) => {
  const [questions, setQuestions] = useState<AudioPracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reviewedWords, setReviewedWords] = useState<HistoryWordItem[]>([]);

  const generatePracticeSet = useCallback(() => {
    const pool = (customPracticeSet && customPracticeSet.length > 0) ? customPracticeSet : allVocab;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const count = (customPracticeSet && customPracticeSet.length > 0) 
      ? Math.min(customPracticeSet.length, 10) 
      : Math.min(10, shuffled.length);
    const targets = shuffled.slice(0, count);

    const generated: AudioPracticeQuestion[] = targets.map((target) => {
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
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setReviewedWords([]);
    setIsCompleted(false);
  }, [allVocab, customPracticeSet]);

  useEffect(() => {
    generatePracticeSet();
  }, [generatePracticeSet]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ && !isAnswerChecked && !isCompleted) {
      speakWord(currentQ.targetWord.word, false);
    }
  }, [currentIndex, currentQ, isAnswerChecked, isCompleted]);

  const handlePronounce = (slow: boolean = false) => {
    if (!currentQ) return;
    soundManager.playClick();
    speakWord(currentQ.targetWord.word, slow);
  };

  const handleSelectChoice = (index: number) => {
    if (isAnswerChecked) return;
    soundManager.playClick();
    setSelectedChoiceIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedChoiceIndex === null || isAnswerChecked || !currentQ) return;

    const correct = selectedChoiceIndex === currentQ.correctIndex;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    const wordItem: HistoryWordItem = {
      id: currentQ.targetWord.id,
      word: currentQ.targetWord.word,
      meaning: currentQ.targetWord.meaning,
      isCorrect: correct,
      chosenAnswer: currentQ.choices[selectedChoiceIndex].word,
    };

    setReviewedWords((prev) => [...prev, wordItem]);

    if (correct) {
      soundManager.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoiceIndex(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      setIsCompleted(true);
      const totalScore = isCorrect ? score : score;
      const xpGained = totalScore * 10;
      onFinishPractice(totalScore, questions.length, xpGained, reviewedWords);

      soundManager.playFanfare();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#D2E0EC]">
        <p className="font-semibold text-base text-[#627D98]">กำลังเตรียมแบบฝึกการฟัง...</p>
      </div>
    );
  }

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-24 animate-fade-in text-base">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFF6] text-[#334E68] flex items-center justify-center mx-auto border border-[#D2E0EC]">
            <Headphones className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#102A43]">
              {percentage >= 80 ? 'ทักษะการฟังยอดเยี่ยม!' : 'ฝึกฟังเสียงเสร็จสมบูรณ์'}
            </h2>
            <p className="text-sm text-[#627D98]">
              สามารถฟังและจับคู่คำศัพท์ทางการแพทย์ได้แม่นยำขึ้น
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
              <p className="text-xl font-bold text-[#059669]">+{score * 10}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              generatePracticeSet();
            }}
            className="w-full py-3 text-base font-semibold rounded-xl btn-primary flex items-center justify-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ฝึกฟังเสียงชุดใหม่ (10 ข้อ)</span>
          </button>
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

      {/* Main Listening Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D2E0EC] shadow-xs space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#627D98] uppercase tracking-wider">
            ฟังเสียงคำศัพท์แล้วเลือกคำศัพท์ภาษาอังกฤษที่ถูกต้อง
          </span>
          <p className="text-sm text-[#486581]">
            กดปุ่มลำโพงเพื่อฟังซ้ำ หรือกดปุ่มเต่าเพื่อฟังแบบช้าๆ
          </p>
        </div>

        {/* Audio Trigger Buttons */}
        <div className="flex items-center justify-center gap-3 py-4">
          <button
            id="btn-practice-speak-normal"
            onClick={() => handlePronounce(false)}
            className="px-6 py-3.5 rounded-xl bg-[#486581] hover:bg-[#334E68] text-white font-semibold text-base flex items-center gap-2.5 transition-colors shadow-xs"
            title="ฟังเสียงความเร็วปกติ"
          >
            <Volume2 className="w-6 h-6" />
            <span>ฟังเสียง (ปกติ)</span>
          </button>

          <button
            id="btn-practice-speak-slow"
            onClick={() => handlePronounce(true)}
            className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F0F5FA] text-[#334E68] font-semibold text-base border border-[#D2E0EC] flex items-center gap-2 transition-colors"
            title="ฟังเสียงแบบช้าๆ (Turtle Speed)"
          >
            <Snail className="w-5 h-5" />
            <span>ฟังแบบช้าๆ</span>
          </button>
        </div>

        {/* Word Choices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {currentQ.choices.map((choice, index) => {
            const isSelected = selectedChoiceIndex === index;
            const isTargetCorrect = index === currentQ.correctIndex;

            let buttonStyle = 'bg-white hover:bg-[#F0F5FA] border-[#D2E0EC] text-[#243B53]';

            if (isAnswerChecked) {
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
                disabled={isAnswerChecked}
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
                {isAnswerChecked && (
                  <p className="text-xs text-[#627D98] line-clamp-1 mt-1">
                    {choice.meaning}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-xl p-4 border border-[#D2E0EC] shadow-xs flex items-center justify-between gap-3">
        {!isAnswerChecked ? (
          <button
            id="btn-practice-check"
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
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-[#E53E3E] shrink-0" />
              )}
              <span className={`text-sm font-bold ${isCorrect ? 'text-[#059669]' : 'text-[#E53E3E]'}`}>
                {isCorrect ? 'ถูกต้อง! (+10 XP)' : `คำตอบที่ถูกต้อง: ${currentQ.targetWord.word}`}
              </span>
            </div>

            <button
              id="btn-practice-continue"
              onClick={handleNext}
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

import React, { useState, useMemo } from 'react';
import { 
  History, 
  Flame, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Volume2, 
  Snail,
  User, 
  Calendar,
  LogIn,
  Cloud,
  Database,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, VocabItem, PracticeHistoryRecord } from '../types';
import { VOCAB_MAP } from '../data';
import { soundManager, speakWord } from '../utils/audio';

interface HistoryViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup' | 'switch') => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onStartQuiz: () => void;
  onStartQuizWithWords: (words: VocabItem[]) => void;
  onStartAudioPractice: (words?: VocabItem[]) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  user,
  onOpenAuth,
  onSelectWordDetail,
  onStartQuiz,
  onStartQuizWithWords,
  onStartAudioPractice,
}) => {
  const [showAllMistakesList, setShowAllMistakesList] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // If user is not logged in
  if (!user) {
    return (
      <div className="space-y-6 pb-24 animate-fade-in text-base">
        {/* Sign In Required Banner */}
        <div className="bg-white rounded-2xl p-8 border border-[#D2E0EC] shadow-xs text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFF6] text-[#486581] flex items-center justify-center mx-auto shadow-xs">
            <Database className="w-8 h-8" />
          </div>

          <div className="max-w-lg mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-[#102A43]">
              ยังไม่ได้เข้าสู่ระบบ
            </h2>
            <p className="text-sm text-[#627D98] leading-relaxed">
              เข้าสู่ระบบหรือสร้างบัญชีผู้เรียน เพื่อเริ่มบันทึกคะแนนสะสม XP, รักษาสถิติการเรียนต่อเนื่อง (Streak), จัดเก็บประวัติการทำแบบทดสอบ และระบบทบทวนข้อที่เคยตอบผิดลงบนฐานข้อมูล
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAuth('signin');
              }}
              className="px-6 py-3 rounded-xl btn-primary text-base font-bold flex items-center gap-2 shadow-xs transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-5 h-5" />
              <span>เข้าสู่ระบบ / สร้างบัญชีผู้เรียน</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-2xl mx-auto text-left border-t border-[#E8EFF6]">
            <div className="p-3.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#486581]">
                <Cloud className="w-4 h-4 text-[#059669]" />
                <span>บันทึกบนฐานข้อมูล</span>
              </div>
              <p className="text-xs text-[#627D98]">ประวัติและคะแนนจะถูกบันทึกจริงตามบัญชีของคุณ</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#486581]">
                <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
                <span>ทบทวนข้อที่ผิด</span>
              </div>
              <p className="text-xs text-[#627D98]">ระบบรวบรวมข้อที่ตอบผิดเพื่อให้กลับมาฝึกซ้ำได้ตรงจุด</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#486581]">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>เข้าถึงได้ทุกอุปกรณ์</span>
              </div>
              <p className="text-xs text-[#627D98]">ล็อกอินด้วยอีเมลเดิมเพื่อดึงประวัติเดิมกลับมาได้ทันที</p>
            </div>
          </div>
        </div>

        {/* Quick Quiz / Practice without signin */}
        <div className="bg-[#F0F5FA] rounded-2xl border border-dashed border-[#D2E0EC] p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-[#334E68]">
            สามารถทดลองทำแบบฝึกหัดหรือฟังเสียงก่อนเข้าสู่ระบบได้:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onStartQuiz();
              }}
              className="px-4 py-2 rounded-xl btn-secondary text-sm font-semibold flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-[#486581]" />
              <span>ทดลองทำแบบทดสอบ</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onStartAudioPractice();
              }}
              className="px-4 py-2 rounded-xl btn-secondary text-sm font-semibold flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-[#486581]" />
              <span>ทดลองฝึกฟังเสียง</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = user.stats;
  const historyList = user.history || [];

  const overallAccuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

  // Aggregate all unique mistakes across all sessions
  const aggregatedMistakes = useMemo(() => {
    const map = new Map<string, { vocab: VocabItem; failCount: number; latestDate: string }>();

    historyList.forEach((record) => {
      if (!record.wordsReviewed) return;
      record.wordsReviewed.forEach((rw) => {
        if (!rw.isCorrect) {
          const vocab = VOCAB_MAP.get(rw.id);
          if (vocab) {
            const existing = map.get(rw.id);
            if (existing) {
              existing.failCount += 1;
            } else {
              map.set(rw.id, {
                vocab,
                failCount: 1,
                latestDate: record.dateFormatted,
              });
            }
          }
        }
      });
    });

    return Array.from(map.values()).sort((a, b) => b.failCount - a.failCount);
  }, [historyList]);

  const allMistakeVocabs = useMemo(() => {
    return aggregatedMistakes.map(m => m.vocab);
  }, [aggregatedMistakes]);

  const handlePronounce = async (e: React.MouseEvent, word: string, id: string, slow: boolean) => {
    e.stopPropagation();
    soundManager.playClick();
    setPlayingAudioId(`${id}_${slow ? 'slow' : 'norm'}`);
    await speakWord(word, slow);
    setPlayingAudioId(null);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#D2E0EC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl text-white font-bold text-2xl flex items-center justify-center shadow-xs shrink-0"
            style={{ backgroundColor: user.avatarColor || '#486581' }}
          >
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#102A43]">
                {user.displayName}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#ECFDF5] text-[#065F46] flex items-center gap-1">
                <Cloud className="w-3 h-3" /> บันทึกบนฐานข้อมูล
              </span>
            </div>
            <p className="text-sm text-[#627D98] flex items-center gap-2">
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        {/* Switch / Sign in user button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAuth('switch');
            }}
            className="px-4 py-2 rounded-xl text-sm font-semibold btn-secondary flex items-center gap-2"
          >
            <User className="w-4 h-4 text-[#486581]" />
            <span>จัดการบัญชี / สลับผู้เรียน</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-5 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#829AB1]">
            <span className="text-xs font-bold uppercase tracking-wider">คะแนนสะสม XP</span>
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#102A43]">{stats.xp}</p>
          <p className="text-xs text-[#627D98]">สะสมจากการทำแบบทดสอบ</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#829AB1]">
            <span className="text-xs font-bold uppercase tracking-wider">เรียนต่อเนื่อง</span>
            <Flame className="w-5 h-5 text-[#F08C00]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#102A43]">{stats.streak} วัน</p>
          <p className="text-xs text-[#627D98]">เป้าหมายรายวัน: {user.dailyGoalXp} XP</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#829AB1]">
            <span className="text-xs font-bold uppercase tracking-wider">คำที่เรียนรู้แล้ว</span>
            <Award className="w-5 h-5 text-[#486581]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#102A43]">{stats.learnedWordsCount} คำ</p>
          <p className="text-xs text-[#627D98]">ตอบถูกสะสม {stats.totalCorrectAnswers} ครั้ง</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#829AB1]">
            <span className="text-xs font-bold uppercase tracking-wider">ความแม่นยำรวม</span>
            <CheckCircle2 className="w-5 h-5 text-[#059669]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#102A43]">{overallAccuracy}%</p>
          <p className="text-xs text-[#627D98]">จาก {stats.totalQuestionsAnswered} คำถาม</p>
        </div>
      </div>

      {/* MISTAKES REVIEW SECTION (ทบทวนข้อที่ผิด) */}
      <div className="bg-white rounded-2xl border border-[#D2E0EC] shadow-xs overflow-hidden">
        <div className="p-6 bg-[#FEF6F6] border-b border-[#FEE2E2] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 shadow-xs">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#991B1B]">
                  ทบทวนข้อที่เคยตอบผิด (Mistakes Review)
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]">
                  {aggregatedMistakes.length} คำ
                </span>
              </div>
              <p className="text-sm text-[#7F1D1D]/80">
                {aggregatedMistakes.length > 0
                  ? 'ระบบรวบรวมคำศัพท์ที่คุณเคยตอบผิดจากทุกรอบ เพื่อให้ทบทวนบทเรียนและทำซ้ำจนแม่นยำ'
                  : 'ยอดเยี่ยมมาก! ไม่มีคำศัพท์ที่คุณเคยตอบผิดค้างอยู่'}
              </p>
            </div>
          </div>

          {aggregatedMistakes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                id="btn-start-mistake-quiz"
                onClick={() => {
                  soundManager.playClick();
                  onStartQuizWithWords(allMistakeVocabs);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
                title="ทำแบบทดสอบ 4 ตัวเลือกเฉพาะข้อที่เคยตอบผิด"
              >
                <HelpCircle className="w-4 h-4" />
                <span>ทำแบบทดสอบทบทวน ({allMistakeVocabs.length} ข้อ)</span>
              </button>

              <button
                id="btn-start-mistake-audio"
                onClick={() => {
                  soundManager.playClick();
                  onStartAudioPractice(allMistakeVocabs);
                }}
                className="px-3.5 py-2.5 rounded-xl border border-[#FECACA] bg-white hover:bg-[#FEF2F2] text-[#991B1B] text-sm font-semibold flex items-center gap-1.5 transition-colors"
                title="ฝึกฟังเสียงคำที่เคยตอบผิด"
              >
                <Volume2 className="w-4 h-4" />
                <span>ฝึกฟังเสียง</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowAllMistakesList(!showAllMistakesList);
                }}
                className="p-2.5 rounded-xl border border-[#FECACA] bg-white hover:bg-[#FEF2F2] text-[#991B1B] transition-colors"
                title={showAllMistakesList ? 'ซ่อนรายการคำศัพท์' : 'แสดงรายการคำศัพท์'}
              >
                {showAllMistakesList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* Detailed Mistake Word List Cards */}
        {aggregatedMistakes.length > 0 && showAllMistakesList && (
          <div className="p-6 bg-white border-b border-[#E8EFF6] space-y-3">
            <h4 className="text-sm font-bold text-[#486581] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#DC2626]" />
              <span>รายการคำศัพท์ที่เคยตอบผิดและต้องทบทวน:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {aggregatedMistakes.map(({ vocab, failCount, latestDate }) => {
                const isSpeakingNorm = playingAudioId === `${vocab.id}_norm`;
                const isSpeakingSlow = playingAudioId === `${vocab.id}_slow`;

                return (
                  <div
                    key={vocab.id}
                    className="p-4 rounded-xl border border-[#FECACA] bg-[#FFFBFB] hover:bg-[#FEF2F2] transition-colors flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span 
                          onClick={() => {
                            soundManager.playClick();
                            onSelectWordDetail(vocab);
                          }}
                          className="font-bold text-base text-[#991B1B] hover:underline cursor-pointer"
                        >
                          {vocab.word}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B]">
                          ตอบผิด {failCount} ครั้ง
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#334E68]">
                        คำอ่าน: <span className="text-[#006270]">{vocab.phoneticTh}</span>
                      </p>
                      <p className="text-sm text-[#102A43] font-medium leading-snug">
                        {vocab.meaning}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#FEE2E2] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => handlePronounce(e, vocab.word, vocab.id, false)}
                          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                            isSpeakingNorm ? 'bg-[#DC2626] text-white' : 'bg-white border border-[#FECACA] text-[#991B1B] hover:bg-[#FEF2F2]'
                          }`}
                          title="ฟังเสียงปกติ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>ฟังเสียง</span>
                        </button>
                        <button
                          onClick={(e) => handlePronounce(e, vocab.word, vocab.id, true)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                            isSpeakingSlow ? 'bg-[#991B1B] text-white' : 'bg-white border border-[#FECACA] text-[#991B1B] hover:bg-[#FEF2F2]'
                          }`}
                          title="ฟังเสียงแบบช้าๆ 0.55x"
                        >
                          <Snail className="w-3.5 h-3.5" />
                          <span>ช้า</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onSelectWordDetail(vocab);
                        }}
                        className="text-xs font-bold text-[#486581] hover:text-[#102A43] hover:underline"
                      >
                        ดูรายละเอียดคำ →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* History Log */}
      <div className="bg-white rounded-2xl border border-[#D2E0EC] shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#102A43]">
              ประวัติการทำแบบทดสอบ & แบบฝึกหัด
            </h3>
            <p className="text-xs text-[#627D98]">
              บันทึกผลการทำแบบทดสอบ 4 ตัวเลือก และการฝึกฟังเสียงย้อนหลังบนฐานข้อมูล
            </p>
          </div>
          <span className="text-xs font-bold text-[#334E68] bg-[#F0F5FA] px-3 py-1 rounded-lg border border-[#D2E0EC]">
            {historyList.length} รายการ
          </span>
        </div>

        {historyList.length === 0 ? (
          <div className="p-12 text-center space-y-4 bg-[#F0F5FA] rounded-2xl border border-dashed border-[#D2E0EC]">
            <History className="w-10 h-10 text-[#BAC7D5] mx-auto" />
            <div className="space-y-1">
              <p className="font-bold text-base text-[#102A43]">ยังไม่มีประวัติการทำแบบทดสอบในบัญชีนี้</p>
              <p className="text-sm text-[#627D98]">
                เริ่มต้นทำแบบทดสอบ 4 ตัวเลือก หรือฝึกฟังเสียงเพื่อบันทึกประวัติและสะสมคะแนน
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onStartQuiz();
                }}
                className="px-5 py-2.5 rounded-xl btn-primary text-sm font-semibold flex items-center gap-2 shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                <span>เริ่มทำแบบทดสอบ 4 ตัวเลือก</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onStartAudioPractice();
                }}
                className="px-5 py-2.5 rounded-xl btn-secondary text-sm font-semibold flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-[#486581]" />
                <span>เริ่มฝึกฟังเสียง</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {historyList.map((record) => {
              const isQuiz = record.mode === 'quiz';
              const wrongWordsInSession = (record.wordsReviewed || [])
                .filter(w => !w.isCorrect)
                .map(w => VOCAB_MAP.get(w.id))
                .filter((v): v is VocabItem => Boolean(v));

              return (
                <div
                  key={record.id}
                  className="p-5 rounded-xl border border-[#D2E0EC] bg-[#FFFFFF] hover:bg-[#F7FAFC] transition-colors space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-xl text-white ${isQuiz ? 'bg-[#486581]' : 'bg-[#627D98]'}`}>
                        {isQuiz ? <HelpCircle className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-[#102A43]">
                          {record.modeTitle}
                        </h4>
                        <p className="text-xs text-[#829AB1] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{record.dateFormatted}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#102A43]">
                        {record.score} / {record.total} ข้อ ({record.percentage}%)
                      </span>
                      <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                        +{record.xpGained} XP
                      </span>
                    </div>
                  </div>

                  {/* Reviewed words chips and Re-quiz wrong answers button */}
                  {record.wordsReviewed && record.wordsReviewed.length > 0 && (
                    <div className="pt-3 border-t border-[#E8EFF6] space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#829AB1] uppercase">คำศัพท์ในรอบนี้:</span>
                        
                        {/* Session Re-quiz Button for Mistakes */}
                        {wrongWordsInSession.length > 0 && (
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              onStartQuizWithWords(wrongWordsInSession);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[#991B1B] text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                            title="ทำแบบทดสอบซ้ำเฉพาะข้อที่ตอบผิดในรอบนี้"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>ทบทวนข้อที่ผิดในรอบนี้ ({wrongWordsInSession.length} ข้อ)</span>
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {record.wordsReviewed.map((rw, rIdx) => {
                          const originalWord = VOCAB_MAP.get(rw.id);
                          return (
                            <button
                              key={rIdx}
                              onClick={() => {
                                if (originalWord) {
                                  soundManager.playClick();
                                  onSelectWordDetail(originalWord);
                                }
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                                rw.isCorrect
                                  ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534] hover:bg-[#DCFCE7]'
                                  : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B] hover:bg-[#FEE2E2]'
                              }`}
                              title={`${rw.word}: ${rw.meaning} (${rw.isCorrect ? 'ตอบถูก' : 'ตอบผิด - คลิกเพื่อดูรายละเอียด'})`}
                            >
                              {rw.isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-[#dc2626]" />
                              )}
                              <span>{rw.word}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

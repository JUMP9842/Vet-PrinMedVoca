import React from 'react';
import { 
  X, 
  Volume2, 
  Snail, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  HelpCircle
} from 'lucide-react';
import { VocabItem } from '../types';
import { VOCAB_MAP } from '../data';
import { speakWord, soundManager } from '../utils/audio';

interface WordDetailModalProps {
  word: VocabItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectConnectedWord: (word: VocabItem) => void;
  onQuickQuiz: (word: VocabItem) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectConnectedWord,
  onQuickQuiz,
}) => {
  if (!word) return null;

  const connectedWords = (word.connectedWordIds || [])
    .map(id => VOCAB_MAP.get(id))
    .filter((item): item is VocabItem => Boolean(item));

  const handlePronounce = async (slow: boolean = false) => {
    soundManager.playClick();
    await speakWord(word.word, slow);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/40 backdrop-blur-sm animate-fade-in text-base">
      <div 
        id="word-detail-modal-card"
        className="bg-white w-full max-w-xl rounded-2xl border border-[#D2E0EC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-[#E8EFF6] flex items-center justify-between bg-[#F0F5FA]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-white border border-[#D2E0EC] text-[#334E68]">
              {word.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-btn-bookmark"
              onClick={() => {
                soundManager.playClick();
                onToggleBookmark(word.id);
              }}
              className={`p-2 rounded-xl transition-colors ${
                isBookmarked ? 'text-[#F59E0B] bg-[#FFFBEB]' : 'text-[#829AB1] hover:text-[#102A43] hover:bg-[#E4ECF4]'
              }`}
              title={isBookmarked ? 'ลบออกจากที่บันทึก' : 'บันทึกคำศัพท์'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-[#F59E0B]" /> : <Bookmark className="w-5 h-5" />}
            </button>

            <button
              id="modal-btn-close"
              onClick={onClose}
              className="p-2 rounded-xl text-[#829AB1] hover:text-[#102A43] hover:bg-[#E4ECF4] transition-colors"
              title="ปิด"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Main Word & Pronunciation */}
          <div className="bg-[#F0F5FA] p-5 rounded-2xl border border-[#D2E0EC] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  {word.word}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-[#334E68] mt-1">
                  คำอ่านไทย: <span className="text-[#006270] font-bold">{word.phoneticTh}</span>
                </p>
              </div>

              {/* Speaker Audio Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="modal-speak-normal"
                  onClick={() => handlePronounce(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#486581] hover:bg-[#334E68] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  title="ฟังเสียงปกติ"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>ออกเสียง</span>
                </button>
                <button
                  id="modal-speak-slow"
                  onClick={() => handlePronounce(true)}
                  className="px-3 py-2 rounded-xl border border-[#D2E0EC] bg-white hover:bg-[#F0F5FA] text-[#334E68] text-sm font-semibold flex items-center gap-1 transition-colors"
                  title="ฟังเสียงแบบช้าๆ (Turtle 0.55x)"
                >
                  <Snail className="w-4 h-4" />
                  <span>ช้า</span>
                </button>
              </div>
            </div>

            {/* Thai Meaning */}
            <div className="pt-3 border-t border-[#D2E0EC]">
              <span className="text-xs font-bold text-[#829AB1] uppercase">ความหมายทางการแพทย์:</span>
              <p className="text-base sm:text-lg font-bold text-[#102A43] mt-0.5">
                {word.meaning}
              </p>
            </div>
          </div>

          {/* Root Meaning / Etymology */}
          {word.rootMeaning && (
            <div className="bg-[#F0F5FA] p-4 rounded-xl border border-[#D2E0EC] space-y-1">
              <span className="text-xs font-bold text-[#486581] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>รากศัพท์และโครงสร้างคำ (Medical Etymology)</span>
              </span>
              <p className="text-sm font-medium text-[#243B53] leading-relaxed">
                {word.rootMeaning}
              </p>
            </div>
          )}

          {/* Related Group */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#829AB1] uppercase">
              กลุ่มรอยโรคที่เกี่ยวข้อง
            </span>
            <div className="p-3 bg-[#F0F5FA] border border-[#D2E0EC] rounded-xl text-sm font-semibold text-[#243B53] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#486581] shrink-0" />
              <span>{word.relatedGroup}</span>
            </div>
          </div>

          {/* Connected Related Words */}
          {connectedWords.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#829AB1] uppercase">
                คำศัพท์ที่เชื่อมโยงกัน ({connectedWords.length} คำ)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {connectedWords.map((cw) => (
                  <button
                    key={cw.id}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectConnectedWord(cw);
                    }}
                    className="p-3 rounded-xl bg-[#F0F5FA] hover:bg-[#E4ECF4] border border-[#D2E0EC] text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#102A43] group-hover:text-[#006270]">
                        {cw.word}
                      </p>
                      <p className="text-xs text-[#62929E] line-clamp-1">
                        {cw.meaning}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#829AB1] group-hover:text-[#102A43] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F0F5FA] border-t border-[#E8EFF6] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-[#627D98] hover:text-[#102A43]"
          >
            ปิด
          </button>

          <button
            id="modal-btn-quiz-this"
            onClick={() => {
              soundManager.playClick();
              onQuickQuiz(word);
            }}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl btn-primary flex items-center gap-2 shadow-xs"
          >
            <HelpCircle className="w-4 h-4" />
            <span>ทดสอบคำนี้ (4 ตัวเลือก)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

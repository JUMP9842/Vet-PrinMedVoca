import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Volume2, 
  Snail, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  SlidersHorizontal,
  Volume1
} from 'lucide-react';
import { VocabItem } from '../types';
import { SYSTEM_CATEGORIES } from '../data';
import { speakWord, speakThai, soundManager } from '../utils/audio';

interface DictionaryViewProps {
  vocabList: VocabItem[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectWordDetail: (word: VocabItem) => void;
  onStartQuizWithWords?: (words: VocabItem[]) => void;
}

const ALPHABET = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  vocabList,
  bookmarkedIds,
  onToggleBookmark,
  onSelectWordDetail,
  onStartQuizWithWords,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  // Filtered and Sorted Vocab
  const filteredVocab = useMemo(() => {
    return vocabList.filter((item) => {
      if (showOnlyBookmarked && !bookmarkedIds.includes(item.id)) {
        return false;
      }
      if (selectedLetter !== 'ALL') {
        const firstLetter = item.word.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }
      if (selectedCategory !== 'all') {
        if (!item.category.includes(selectedCategory) && !item.relatedGroup.includes(selectedCategory)) {
          return false;
        }
      }
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
  }, [vocabList, searchQuery, selectedLetter, selectedCategory, showOnlyBookmarked, bookmarkedIds]);

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
    const map: Record<string, number> = { ALL: vocabList.length };
    vocabList.forEach((item) => {
      const char = item.word.trim().charAt(0).toUpperCase();
      map[char] = (map[char] || 0) + 1;
    });
    return map;
  }, [vocabList]);

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

            {(searchQuery || selectedLetter !== 'ALL' || selectedCategory !== 'all' || showOnlyBookmarked) && (
              <button
                id="btn-reset-filters"
                onClick={() => {
                  soundManager.playClick();
                  setSearchQuery('');
                  setSelectedLetter('ALL');
                  setSelectedCategory('all');
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

      {/* Vocabulary Table Card */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#D2E0EC] shadow-xs overflow-hidden">
        {filteredVocab.length === 0 ? (
          <div className="p-14 text-center space-y-3">
            <p className="font-bold text-lg text-[#102A43]">ไม่พบคำศัพท์ที่ตรงกับเงื่อนไข</p>
            <p className="text-sm text-[#627D98]">ลองค้นหาด้วยคำอื่น หรือกดปุ่มรีเซ็ตตัวกรอง</p>
            <button
              onClick={() => {
                soundManager.playClick();
                setSearchQuery('');
                setSelectedLetter('ALL');
                setSelectedCategory('all');
                setShowOnlyBookmarked(false);
              }}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#486581] text-white hover:bg-[#334E68] inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ล้างตัวกรองทั้งหมด</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="main-vocab-table">
              <thead>
                <tr className="bg-[#F0F5FA] border-b border-[#D2E0EC] text-[#486581] font-bold text-sm tracking-wide">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4 min-w-[230px]">คำศัพท์ (English)</th>
                  <th className="py-3.5 px-4 min-w-[170px]">คำอ่านไทย (ไม่มีหัว)</th>
                  <th className="py-3.5 px-4 min-w-[280px]">ความหมายทางการแพทย์</th>
                  <th className="py-3.5 px-4 min-w-[170px] hidden md:table-cell">ระบบอวัยวะ</th>
                  <th className="py-3.5 px-4 min-w-[200px] hidden lg:table-cell">กลุ่มที่เชื่อมโยง & รากศัพท์</th>
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

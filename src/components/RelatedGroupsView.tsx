import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  Snail,
  ArrowRight, 
  BookMarked
} from 'lucide-react';
import { VocabItem } from '../types';
import { RELATED_CLUSTERS, VOCAB_MAP } from '../data';
import { speakWord, soundManager } from '../utils/audio';

interface RelatedGroupsViewProps {
  onSelectWordDetail: (word: VocabItem) => void;
  onStartQuizWithWords: (words: VocabItem[]) => void;
}

const MEDICAL_AFFIXES = [
  { affix: '-itis', type: 'Suffix (คำลงท้าย)', meaningTh: 'การอักเสบ (Inflammation)', examples: ['dermatitis', 'otitis', 'cystitis', 'arthritis', 'gingivitis', 'uveitis'] },
  { affix: '-megaly', type: 'Suffix (คำลงท้าย)', meaningTh: 'ภาวะขยายใหญ่ผิดปกติ (Enlargement)', examples: ['cardiomegaly', 'hepatomegaly', 'splenomegaly', 'nephromegaly'] },
  { affix: '-uria', type: 'Suffix (คำลงท้าย)', meaningTh: 'เกี่ยวกับปัสสาวะ / ภาวะในปัสสาวะ', examples: ['polyuria', 'oliguria', 'anuria', 'hematuria', 'dysuria', 'pyuria'] },
  { affix: '-algia / -dynia', type: 'Suffix (คำลงท้าย)', meaningTh: 'อาการเจ็บปวด (Pain)', examples: ['otalgia', 'cystalgia', 'odynophagia'] },
  { affix: '-rrhea', type: 'Suffix (คำลงท้าย)', meaningTh: 'การไหล / สารคัดหลั่งออกมาก (Discharge/Flow)', examples: ['diarrhea', 'otorrhea', 'steatorrhea', 'galactorrhea'] },
  { affix: '-rrhagia', type: 'Suffix (คำลงท้าย)', meaningTh: 'การตกเลือด / เลือดออกมาก (Excessive bleeding)', examples: ['hemorrhage', 'otorrhagia', 'epistaxis'] },
  { affix: '-cele', type: 'Suffix (คำลงท้าย)', meaningTh: 'ถุงน้ำ / การโป่งนูนยื่น (Hernia/Swelling)', examples: ['sialocele', 'arthrocele', 'vaginocele'] },
  { affix: '-spasm', type: 'Suffix (คำลงท้าย)', meaningTh: 'การบีบเกร็ง / กระตุกฉับพลัน (Involuntary contraction)', examples: ['blepharospasm', 'myospasm', 'clonic_spasm'] },
  { affix: 'hyper-', type: 'Prefix (คำนำหน้า)', meaningTh: 'มากเกิน / สูงเกิน (Above / Excessive)', examples: ['hyperthermia', 'hyperpnea', 'hyperkeratosis', 'hypertrophy'] },
  { affix: 'hypo-', type: 'Prefix (คำนำหน้า)', meaningTh: 'น้อยเกิน / ต่ำกว่าปกติ (Below / Deficient)', examples: ['hypothermia', 'hypoppnea', 'hypoventilation', 'hypopigmentation'] },
  { affix: 'tachy-', type: 'Prefix (คำนำหน้า)', meaningTh: 'เร็ว (Fast / Rapid)', examples: ['tachycardia', 'tachypnea'] },
  { affix: 'brady-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ช้า (Slow)', examples: ['bradycardia', 'bradyuria'] },
  { affix: 'dys-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ยาก / ลำบาก / ผิดปกติ (Difficult / Painful / Bad)', examples: ['dyspnea', 'dysphagia', 'dyschezia', 'dysuria', 'dystocia'] },
  { affix: 'a- / an-', type: 'Prefix (คำนำหน้า)', meaningTh: 'ไม่มี / ขาดหาย / ปราศจาก (Without / Lack of)', examples: ['anuria', 'anorexia', 'alopecia', 'anophthalmos', 'afebrile'] },
];

export const RelatedGroupsView: React.FC<RelatedGroupsViewProps> = ({
  onSelectWordDetail,
  onStartQuizWithWords,
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(RELATED_CLUSTERS[0].id);
  const [activeTab, setActiveTab] = useState<'clusters' | 'affixes'>('clusters');

  const selectedCluster = RELATED_CLUSTERS.find(c => c.id === selectedClusterId) || RELATED_CLUSTERS[0];
  const clusterWords = selectedCluster.wordIds
    .map(id => VOCAB_MAP.get(id))
    .filter((item): item is VocabItem => Boolean(item));

  const handlePronounce = async (e: React.MouseEvent, word: string, slow: boolean = false) => {
    e.stopPropagation();
    soundManager.playClick();
    await speakWord(word, slow);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in text-base">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#D2E0EC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#E8EFF6] text-[#334E68]">
            หมวดหมู่ความหมายสัมพันธ์
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43]">
            กลุ่มคำศัพท์โรคเชื่อมโยง & รากศัพท์การแพทย์
          </h1>
          <p className="text-sm text-[#627D98] max-w-2xl">
            เรียนรู้คำศัพท์เป็นกลุ่มรอยโรค อาการตรงข้าม (Hyper vs Hypo), ชนิดกระดูกหัก และอาการสัมพันธ์ ช่วยให้จดจำและเชื่อมโยงรอยโรคได้แม่นยำขึ้น
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-[#F0F5FA] p-1 rounded-xl text-sm font-semibold shrink-0 border border-[#D2E0EC]">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('clusters');
            }}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'clusters'
                ? 'bg-white text-[#102A43] shadow-xs font-bold'
                : 'text-[#627D98] hover:text-[#102A43]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>กลุ่มโรคสัมพันธ์ ({RELATED_CLUSTERS.length})</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('affixes');
            }}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'affixes'
                ? 'bg-white text-[#102A43] shadow-xs font-bold'
                : 'text-[#627D98] hover:text-[#102A43]'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>รากศัพท์ & ปัจจัย</span>
          </button>
        </div>
      </div>

      {activeTab === 'clusters' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Cluster List */}
          <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-[#D2E0EC] shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-[#829AB1] uppercase tracking-wider px-2">
              เลือกกลุ่มรอยโรค
            </h3>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {RELATED_CLUSTERS.map((cluster) => {
                const isSelected = cluster.id === selectedClusterId;
                const count = cluster.wordIds.length;

                return (
                  <button
                    key={cluster.id}
                    id={`cluster-btn-${cluster.id}`}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedClusterId(cluster.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#334E68] border-[#334E68] text-white'
                        : 'bg-[#F0F5FA] hover:bg-[#E4ECF4] border-[#D2E0EC] text-[#243B53]'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#102A43]'}`}>
                        {cluster.titleTh}
                      </p>
                      <p className={`text-xs truncate ${isSelected ? 'text-[#D2E0EC]' : 'text-[#627D98]'}`}>
                        {cluster.titleEn}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                      isSelected ? 'bg-[#102A43] text-white' : 'bg-[#E4ECF4] text-[#334E68]'
                    }`}>
                      {count} คำ
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Cluster Word Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D2E0EC] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#102A43]">
                    {selectedCluster.titleTh}
                  </h2>
                  <p className="text-sm font-medium text-[#627D98]">
                    {selectedCluster.titleEn} • {clusterWords.length} คำศัพท์
                  </p>
                </div>

                <button
                  id="btn-quiz-cluster"
                  onClick={() => {
                    soundManager.playClick();
                    onStartQuizWithWords(clusterWords);
                  }}
                  className="px-4 py-2 text-sm font-semibold rounded-xl btn-primary flex items-center gap-1.5 shrink-0"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>ทดสอบกลุ่มนี้ ({clusterWords.length} ข้อ)</span>
                </button>
              </div>

              <p className="text-sm text-[#334E68] bg-[#F0F5FA] p-3.5 rounded-xl border border-[#D2E0EC] leading-relaxed">
                <span className="font-bold text-[#102A43]">คำอธิบาย:</span> {selectedCluster.descriptionTh}
              </p>
            </div>

            {/* Word Grid in Cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {clusterWords.map((item) => (
                <div
                  key={item.id}
                  id={`cluster-word-card-${item.id}`}
                  onClick={() => onSelectWordDetail(item)}
                  className="bg-white hover:bg-[#F7FAFC] p-4.5 rounded-xl border border-[#D2E0EC] shadow-xs transition-colors cursor-pointer group flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-[#102A43] group-hover:text-[#006270] transition-colors">
                          {item.word}
                        </h4>
                        <span className="text-sm text-[#486581] font-semibold">
                          {item.phoneticTh}
                        </span>
                      </div>

                      {/* Audio Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handlePronounce(e, item.word, false)}
                          className="p-1.5 rounded-lg text-[#627D98] hover:text-[#102A43] hover:bg-[#E4ECF4] transition-colors"
                          title="ฟังเสียงปกติ"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handlePronounce(e, item.word, true)}
                          className="p-1.5 rounded-lg text-[#829AB1] hover:text-[#334E68] hover:bg-[#E4ECF4] transition-colors"
                          title="ฟังเสียงช้า"
                        >
                          <Snail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-[#243B53]">
                      {item.meaning}
                    </p>

                    {item.rootMeaning && (
                      <p className="text-xs text-[#627D98] bg-[#F0F5FA] p-2.5 rounded-lg border border-[#D2E0EC]">
                        {item.rootMeaning}
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-[#E8EFF6] flex items-center justify-between text-xs text-[#829AB1]">
                    <span>{item.category}</span>
                    <span className="text-[#334E68] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      ดูรายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Affixes Section */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MEDICAL_AFFIXES.map((affix, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-[#D2E0EC] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#102A43] bg-[#E8EFF6] px-2.5 py-1 rounded-md font-mono">
                    {affix.affix}
                  </span>
                  <span className="text-xs text-[#627D98] font-semibold">
                    {affix.type}
                  </span>
                </div>

                <p className="text-sm font-bold text-[#243B53]">
                  {affix.meaningTh}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#E8EFF6]">
                  <span className="text-xs text-[#829AB1] font-bold uppercase">ตัวอย่างคำในระบบ:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {affix.examples.map((exId) => {
                      const exWord = VOCAB_MAP.get(exId);
                      if (!exWord) return null;

                      return (
                        <button
                          key={exId}
                          onClick={() => {
                            soundManager.playClick();
                            onSelectWordDetail(exWord);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#F0F5FA] hover:bg-[#E4ECF4] text-[#243B53] text-xs font-semibold border border-[#D2E0EC] transition-colors"
                        >
                          {exWord.word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export interface VocabItem {
  id: string;
  word: string;
  phoneticTh: string; // คำอ่านภาษาไทยแบบฟอนต์ไม่มีหัว เช่น "แบรดดิคาร์เดีย"
  meaning: string;    // ความหมายภาษาไทย
  category: string;   // หมวดหมู่ระบบอวัยวะ
  subCategory?: string;
  relatedGroup: string; // กลุ่มโรคหรืออาการที่เชื่อมโยงกัน
  tags: string[];     // แท็กเชื่อมโยง เช่น ["หัวใจ", "-cardia", "ช้า"]
  rootMeaning?: string; // คำอธิบายรากศัพท์ เช่น "brady- (ช้า) + cardia (หัวใจ)"
  connectedWordIds?: string[]; // คำศัพท์ที่เกี่ยวข้องกันหรือตรงข้ามกัน
  note?: string;
}

export type MainTab = 'dictionary' | 'related_groups' | 'quiz' | 'audio_practice' | 'history';

export type QuizModeType = 'en_to_th' | 'th_to_en';

export type AudioPracticeMode = 'choice' | 'typing';

export interface QuizQuestion {
  id: string;
  targetWord: VocabItem;
  questionPrompt: string;
  choices: string[];
  correctChoiceIndex: number;
  phoneticHint?: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  hearts: number;
  maxHearts: number;
  learnedWordsCount: number;
  totalQuizzesTaken: number;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
}

export interface HistoryWordItem {
  id: string;
  word: string;
  meaning: string;
  isCorrect: boolean;
  chosenAnswer?: string;
}

export interface PracticeHistoryRecord {
  id: string;
  timestamp: number;
  dateFormatted: string;
  mode: 'quiz' | 'audio_practice';
  modeTitle: string;
  score: number;
  total: number;
  percentage: number;
  xpGained: number;
  durationSeconds?: number;
  wordsReviewed: HistoryWordItem[];
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: number;
  lastActive: number;
  dailyGoalXp: number;
  stats: UserStats;
  bookmarkedIds: string[];
  history: PracticeHistoryRecord[];
  avatarColor: string;
}

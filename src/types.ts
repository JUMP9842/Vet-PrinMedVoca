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

export type MainTab = 
  | 'dictionary' 
  | 'related_groups' 
  | 'flashcard' 
  | 'quiz' 
  | 'typing_practice' 
  | 'audio_practice' 
  | 'history';

export type QuizQuestionMode = 'en_to_th' | 'th_to_en';

export type TypingMode = 'en_to_th' | 'th_to_en';

export type AudioPracticeType = 'choice' | 'typing';

export type FlashcardFrontMode = 'en' | 'th';

export interface QuizQuestion {
  id: string;
  targetWord: VocabItem;
  questionPrompt: string;
  choices: string[];
  correctChoiceIndex: number;
  phoneticHint?: string;
  mode: QuizQuestionMode;
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
  userTyped?: string;
  correctAnswer?: string;
}

export interface PracticeHistoryRecord {
  id: string;
  timestamp: number;
  dateFormatted: string;
  mode: 'quiz' | 'audio_practice' | 'typing_practice' | 'flashcard';
  modeTitle: string;
  score: number;
  total: number;
  percentage: number;
  xpGained: number;
  durationSeconds?: number;
  wordsReviewed: HistoryWordItem[];
}

export type MasteryStatus = 'mastered' | 'learning' | 'forgotten'; // 'จำได้แล้ว' | 'พอจำได้' | 'จำไม่ได้'

export interface UserProfile {
  id: string;
  username: string;
  password?: string;
  email?: string;
  displayName: string;
  createdAt: number;
  lastActive: number;
  dailyGoalXp: number;
  stats: UserStats;
  bookmarkedIds: string[];
  masteryStatus?: Record<string, MasteryStatus>; // Map of wordId -> 'mastered' | 'learning' | 'forgotten'
  history: PracticeHistoryRecord[];
  avatarColor: string;
}

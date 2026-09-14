import React, { useState, useEffect, useCallback } from 'react';
import { ALL_VOCAB } from './data';
import { VocabItem, MainTab, UserProfile, HistoryWordItem } from './types';
import { Navbar } from './components/Navbar';
import { DictionaryView } from './components/DictionaryView';
import { RelatedGroupsView } from './components/RelatedGroupsView';
import { QuizView } from './components/QuizView';
import { AudioPracticeView } from './components/AudioPracticeView';
import { HistoryView } from './components/HistoryView';
import { WordDetailModal } from './components/WordDetailModal';
import { AuthModal } from './components/AuthModal';
import { 
  getCachedActiveUser,
  getSavedActiveUserId,
  fetchUserFromFirestore,
  subscribeToUserProfile,
  addHistoryRecordAndSync,
  toggleBookmarkAndSync
} from './utils/auth';
import { soundManager } from './utils/audio';

export function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('dictionary');
  const [selectedWordDetail, setSelectedWordDetail] = useState<VocabItem | null>(null);
  const [quizWordSet, setQuizWordSet] = useState<VocabItem[] | null>(null);
  const [audioPracticeWordSet, setAudioPracticeWordSet] = useState<VocabItem[] | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active User Profile - null if no previous login on this machine/device
  const [activeUser, setActiveUser] = useState<UserProfile | null>(() => getCachedActiveUser());
  const [guestBookmarks, setGuestBookmarks] = useState<string[]>(['hyperthermia', 'dyspnea']);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'signin' | 'signup' | 'switch'>('signin');

  // Synchronize active user from Firestore on initial mount
  useEffect(() => {
    const savedUserId = getSavedActiveUserId();
    if (savedUserId) {
      // 1. Fetch latest profile
      fetchUserFromFirestore(savedUserId).then((fetched) => {
        if (fetched) {
          setActiveUser(fetched);
        }
      });

      // 2. Real-time listener for Firestore document
      const unsubscribe = subscribeToUserProfile(savedUserId, (updated) => {
        setActiveUser(updated);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  // When activeUser changes (e.g. user logs in or switches), subscribe to their Firestore doc
  useEffect(() => {
    if (activeUser?.id) {
      const unsubscribe = subscribeToUserProfile(activeUser.id, (updated) => {
        setActiveUser(updated);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [activeUser?.id]);

  const handleUserChanged = useCallback((updated: UserProfile | null) => {
    setActiveUser(updated);
  }, []);

  const handleToggleBookmark = async (id: string) => {
    if (activeUser) {
      const updated = await toggleBookmarkAndSync(activeUser, id);
      setActiveUser(updated);
    } else {
      // Guest local bookmarks
      setGuestBookmarks((prev) => 
        prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
      );
    }
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' | 'switch') => {
    setAuthModalInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleFinishQuiz = async (
    score: number, 
    total: number, 
    xpGained: number, 
    reviewedWords: HistoryWordItem[]
  ) => {
    if (activeUser) {
      const updated = await addHistoryRecordAndSync(activeUser, {
        mode: 'quiz',
        modeTitle: quizWordSet ? `แบบทดสอบทบทวนเฉพาะกลุ่ม (${total} ข้อ)` : `แบบทดสอบ 4 ตัวเลือก (${total} ข้อ)`,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        xpGained,
        wordsReviewed: reviewedWords,
      });
      setActiveUser(updated);
    }
  };

  const handleFinishPractice = async (
    score: number, 
    total: number, 
    xpGained: number, 
    reviewedWords: HistoryWordItem[]
  ) => {
    if (activeUser) {
      const updated = await addHistoryRecordAndSync(activeUser, {
        mode: 'audio_practice',
        modeTitle: audioPracticeWordSet ? `แบบฝึกฟังเสียงทบทวน (${total} ข้อ)` : `แบบฝึกฟังเสียงออกเสียง (${total} ข้อ)`,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        xpGained,
        wordsReviewed: reviewedWords,
      });
      setActiveUser(updated);
    }
  };

  const handleStartQuizWithWords = (words: VocabItem[]) => {
    setQuizWordSet(words);
    setCurrentTab('quiz');
  };

  const handleStartAudioPracticeWithWords = (words?: VocabItem[]) => {
    setAudioPracticeWordSet(words || null);
    setCurrentTab('audio_practice');
  };

  const handleQuickQuizSingleWord = (word: VocabItem) => {
    setSelectedWordDetail(null);
    setQuizWordSet([word, ...ALL_VOCAB.filter((w) => w.id !== word.id).slice(0, 9)]);
    setCurrentTab('quiz');
  };

  const currentBookmarks = activeUser ? activeUser.bookmarkedIds : guestBookmarks;

  return (
    <div className="min-h-screen bg-[#EDF3F8] text-[#1E2D3D] flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab !== 'quiz') {
            setQuizWordSet(null);
          }
          if (tab !== 'audio_practice') {
            setAudioPracticeWordSet(null);
          }
          setCurrentTab(tab);
        }}
        stats={activeUser ? activeUser.stats : null}
        activeUser={activeUser}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'dictionary' && (
          <DictionaryView
            vocabList={ALL_VOCAB}
            bookmarkedIds={currentBookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectWordDetail={setSelectedWordDetail}
            onStartQuizWithWords={handleStartQuizWithWords}
          />
        )}

        {currentTab === 'related_groups' && (
          <RelatedGroupsView
            onSelectWordDetail={setSelectedWordDetail}
            onStartQuizWithWords={handleStartQuizWithWords}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            allVocab={ALL_VOCAB}
            customQuestionSet={quizWordSet}
            onFinishQuiz={handleFinishQuiz}
            onSelectWordDetail={setSelectedWordDetail}
          />
        )}

        {currentTab === 'audio_practice' && (
          <AudioPracticeView
            allVocab={ALL_VOCAB}
            customPracticeSet={audioPracticeWordSet}
            onFinishPractice={handleFinishPractice}
            onSelectWordDetail={setSelectedWordDetail}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            user={activeUser}
            onOpenAuth={handleOpenAuth}
            onSelectWordDetail={setSelectedWordDetail}
            onStartQuiz={() => {
              setQuizWordSet(null);
              setCurrentTab('quiz');
            }}
            onStartQuizWithWords={handleStartQuizWithWords}
            onStartAudioPractice={handleStartAudioPracticeWithWords}
          />
        )}
      </main>

      {/* Word Detail Modal */}
      {selectedWordDetail && (
        <WordDetailModal
          word={selectedWordDetail}
          onClose={() => setSelectedWordDetail(null)}
          isBookmarked={currentBookmarks.includes(selectedWordDetail.id)}
          onToggleBookmark={handleToggleBookmark}
          onSelectConnectedWord={(word) => setSelectedWordDetail(word)}
          onQuickQuiz={handleQuickQuizSingleWord}
        />
      )}

      {/* Sign In / Sign Up / User Switch Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        activeUser={activeUser}
        onUserChanged={handleUserChanged}
        initialMode={authModalInitialMode}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#D2E0EC] bg-white py-5 text-center text-xs text-[#627D98]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-[#334E68]">
            MedVoca • ระบบเรียนรู้คำศัพท์อายุรศาสตร์และศัพท์การแพทย์
          </p>
          <p className="text-[#829AB1]">
            เชื่อมต่อฐานข้อมูลคลาวด์ • ฟอนต์ภาษาไทยไม่มีหัว • รองรับการฟังเสียงปกติและความเร็วช้า (Slow Speed)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

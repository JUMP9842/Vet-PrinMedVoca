import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, UserStats, PracticeHistoryRecord } from '../types';

const STORAGE_ACTIVE_USER_ID_KEY = 'medvoca_active_user_id_v5';
const STORAGE_CACHED_USER_KEY = 'medvoca_cached_user_v5';

const DEFAULT_AVATAR_COLORS = [
  '#486581', '#627D98', '#334E68', '#5B7B9A', '#3B5B78', '#4A6B8A', '#0D5F7A', '#317873'
];

/**
 * Generate a new UserProfile object from Username
 */
export function createNewUserProfileWithUsername(username: string, password?: string): UserProfile {
  const color = DEFAULT_AVATAR_COLORS[Math.floor(Math.random() * DEFAULT_AVATAR_COLORS.length)];
  const cleanUsername = username.trim().toLowerCase();
  const sanitizedId = 'usr_' + cleanUsername.replace(/[^a-z0-9]/g, '_');
  
  return {
    id: sanitizedId,
    username: cleanUsername,
    password: password ? password.trim() : undefined,
    email: `${cleanUsername}@medvoca.local`,
    displayName: username.trim(),
    createdAt: Date.now(),
    lastActive: Date.now(),
    dailyGoalXp: 50,
    avatarColor: color,
    stats: {
      xp: 0,
      streak: 1,
      hearts: 5,
      maxHearts: 5,
      learnedWordsCount: 0,
      totalQuizzesTaken: 0,
      totalCorrectAnswers: 0,
      totalQuestionsAnswered: 0,
    },
    bookmarkedIds: ['hyperthermia', 'dyspnea', 'closed_fracture'],
    history: [],
  };
}

/**
 * Get active user from local cache if previously signed in on this device
 */
export function getSavedActiveUserId(): string | null {
  try {
    return localStorage.getItem(STORAGE_ACTIVE_USER_ID_KEY) || null;
  } catch {
    return null;
  }
}

export function getCachedActiveUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_CACHED_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) {
        return parsed as UserProfile;
      }
    }
  } catch (err) {
    console.warn('Failed to parse cached user:', err);
  }
  return null;
}

export function saveLocalActiveUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_ACTIVE_USER_ID_KEY, user.id);
      localStorage.setItem(STORAGE_CACHED_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_ACTIVE_USER_ID_KEY);
      localStorage.removeItem(STORAGE_CACHED_USER_KEY);
    }
  } catch (err) {
    console.error('Failed to save active user to local storage:', err);
  }
}

/**
 * Listen to total registered users count in real-time
 */
export function subscribeToTotalUsersCount(
  onCountChange: (count: number) => void
): Unsubscribe {
  const usersCol = collection(db, 'users');
  return onSnapshot(
    usersCol,
    (snap) => {
      onCountChange(snap.size);
    },
    (err) => {
      console.warn('Error subscribing to users count:', err);
    }
  );
}

/**
 * Save user profile to Firebase Firestore (and update local storage)
 */
export async function syncUserToFirestore(user: UserProfile): Promise<void> {
  saveLocalActiveUser(user);
  try {
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, user, { merge: true });
  } catch (err) {
    console.error('Error saving user to Firestore:', err);
  }
}

/**
 * Fetch a user profile from Firestore by User ID
 */
export async function fetchUserFromFirestore(userId: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      saveLocalActiveUser(data);
      return data;
    }
  } catch (err) {
    console.error('Error fetching user from Firestore:', err);
  }
  return null;
}

/**
 * Register user with just username and password
 */
export async function registerWithUsernamePassword(
  username: string,
  password: string
): Promise<UserProfile> {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanUsername || !cleanPassword) {
    throw new Error('กรุณากรอกทั้ง Username และ Password');
  }

  if (cleanUsername.length < 2) {
    throw new Error('Username ต้องมีอย่างน้อย 2 ตัวอักษร');
  }

  if (cleanPassword.length < 3) {
    throw new Error('Password ต้องมีอย่างน้อย 3 ตัวอักษร');
  }

  const targetId = 'usr_' + cleanUsername.replace(/[^a-z0-9]/g, '_');
  const userDocRef = doc(db, 'users', targetId);

  try {
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      throw new Error('Username นี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านของคุณ');
    }

    const newUser = createNewUserProfileWithUsername(username, cleanPassword);
    await setDoc(userDocRef, newUser);
    saveLocalActiveUser(newUser);
    return newUser;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
  }
}

/**
 * Sign in user with username and password
 */
export async function loginWithUsernamePassword(
  username: string,
  password: string
): Promise<UserProfile> {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanUsername || !cleanPassword) {
    throw new Error('กรุณากรอกทั้ง Username และ Password');
  }

  const targetId = 'usr_' + cleanUsername.replace(/[^a-z0-9]/g, '_');
  const userDocRef = doc(db, 'users', targetId);

  try {
    const snap = await getDoc(userDocRef);

    if (!snap.exists()) {
      // Also search by username property if id format is different
      const usersCol = collection(db, 'users');
      const q = query(usersCol, where('username', '==', cleanUsername));
      const querySnap = await getDocs(q);

      if (querySnap.empty) {
        throw new Error(`ไม่พบบัญชี "${username}" ในระบบ กรุณากดแท็บ "สร้างบัญชีใหม่" เพื่อสมัครสมาชิก`);
      }

      const existingDoc = querySnap.docs[0];
      const existingData = existingDoc.data() as UserProfile;

      if (existingData.password && existingData.password !== cleanPassword) {
        throw new Error('รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
      }

      const updated: UserProfile = {
        ...existingData,
        lastActive: Date.now(),
      };
      await setDoc(doc(db, 'users', existingDoc.id), { lastActive: Date.now() }, { merge: true });
      saveLocalActiveUser(updated);
      return updated;
    }

    const existingData = snap.data() as UserProfile;

    if (existingData.password && existingData.password !== cleanPassword) {
      throw new Error('รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
    }

    const updated: UserProfile = {
      ...existingData,
      lastActive: Date.now(),
      // Set password if not previously set
      password: existingData.password || cleanPassword,
    };

    await setDoc(userDocRef, { lastActive: Date.now(), password: updated.password }, { merge: true });
    saveLocalActiveUser(updated);
    return updated;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
  }
}

/**
 * Backwards compatibility helper
 */
export async function authenticateOrRegisterUser(
  usernameOrEmail: string, 
  displayName: string
): Promise<UserProfile> {
  const clean = usernameOrEmail.trim().toLowerCase();
  const targetId = 'usr_' + clean.replace(/[^a-z0-9]/g, '_');
  const userDocRef = doc(db, 'users', targetId);

  const snap = await getDoc(userDocRef);
  if (snap.exists()) {
    const data = snap.data() as UserProfile;
    saveLocalActiveUser(data);
    return data;
  }

  const newUser = createNewUserProfileWithUsername(displayName || clean, '1234');
  await setDoc(userDocRef, newUser);
  saveLocalActiveUser(newUser);
  return newUser;
}

/**
 * Listen to real-time updates for a user's Firestore record
 */
export function subscribeToUserProfile(
  userId: string, 
  onUpdate: (user: UserProfile) => void
): Unsubscribe {
  const userDocRef = doc(db, 'users', userId);
  return onSnapshot(userDocRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      saveLocalActiveUser(data);
      onUpdate(data);
    }
  }, (err) => {
    console.warn('Firestore snapshot listener error:', err);
  });
}

/**
 * Add a completed quiz/practice history record and update stats in Firestore
 */
export async function addHistoryRecordAndSync(
  currentUser: UserProfile,
  record: Omit<PracticeHistoryRecord, 'id' | 'timestamp' | 'dateFormatted'>
): Promise<UserProfile> {
  const now = new Date();
  const dateFormatted = `${now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })} • ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

  const fullRecord: PracticeHistoryRecord = {
    ...record,
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    dateFormatted,
  };

  const newStats: UserStats = {
    ...currentUser.stats,
    xp: currentUser.stats.xp + record.xpGained,
    learnedWordsCount: currentUser.stats.learnedWordsCount + record.score,
    totalQuizzesTaken: currentUser.stats.totalQuizzesTaken + 1,
    totalCorrectAnswers: currentUser.stats.totalCorrectAnswers + record.score,
    totalQuestionsAnswered: currentUser.stats.totalQuestionsAnswered + record.total,
  };

  const updatedUser: UserProfile = {
    ...currentUser,
    lastActive: Date.now(),
    stats: newStats,
    history: [fullRecord, ...(currentUser.history || [])].slice(0, 100),
  };

  // Sync to Firestore & local storage
  await syncUserToFirestore(updatedUser);
  return updatedUser;
}

/**
 * Toggle bookmark for a user and sync to Firestore
 */
export async function toggleBookmarkAndSync(
  currentUser: UserProfile,
  wordId: string
): Promise<UserProfile> {
  const exists = currentUser.bookmarkedIds.includes(wordId);
  const newBookmarks = exists
    ? currentUser.bookmarkedIds.filter((id) => id !== wordId)
    : [...currentUser.bookmarkedIds, wordId];

  const updatedUser: UserProfile = {
    ...currentUser,
    bookmarkedIds: newBookmarks,
    lastActive: Date.now(),
  };

  await syncUserToFirestore(updatedUser);
  return updatedUser;
}

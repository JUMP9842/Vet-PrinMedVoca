// Audio and Sound Utility for Pronunciation and Sound Effects
// Optimized for iOS Safari (iPhone / iPad), Android, and Desktop browsers

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;

  constructor() {
    this.initAutoUnlock();
  }

  // Setup one-time touch/click unlock for iOS Web Audio & SpeechSynthesis
  private initAutoUnlock() {
    if (typeof window === 'undefined') return;

    const unlockHandler = () => {
      this.unlock();
      // Remove listeners once unlocked
      window.removeEventListener('touchstart', unlockHandler, true);
      window.removeEventListener('touchend', unlockHandler, true);
      window.removeEventListener('click', unlockHandler, true);
    };

    window.addEventListener('touchstart', unlockHandler, { capture: true, passive: true });
    window.addEventListener('touchend', unlockHandler, { capture: true, passive: true });
    window.addEventListener('click', unlockHandler, { capture: true, passive: true });
  }

  // Public method to explicitly unlock audio context on iOS
  public unlock() {
    if (this.isUnlocked) return;
    try {
      const ctx = this.getAudioContext();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        // Apple-recommended silent buffer to activate Web Audio on iOS Safari
        try {
          const buffer = ctx.createBuffer(1, 1, 22050);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);
        } catch {
          // ignore
        }
      }

      // Resume SpeechSynthesis if paused on iOS
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch {
          // ignore
        }
      }

      this.isUnlocked = true;
    } catch {
      // ignore
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play harmonious chime on correct answer
  public playCorrect() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);

        gain.gain.setValueAtTime(0, now + index * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, now + index * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.28);
      });
    } catch {
      // Audio context might be restricted
    }
  }

  // Play gentle error tone on incorrect answer
  public playIncorrect() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [311.13, 261.63]; // Eb4 -> C4

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + index * 0.12);

        gain.gain.setValueAtTime(0, now + index * 0.12);
        gain.gain.linearRampToValueAtTime(0.1, now + index * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 0.26);
      });
    } catch {
      // ignore
    }
  }

  // Play button click tap
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // ignore
    }
  }

  // Play fanfare sound
  public playFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const freqs = [440, 554.37, 659.25, 880, 1108.73];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.45);
      });
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();

// Keep a global reference to the current utterance to prevent iOS WebKit garbage collection bug
let activeUtterance: SpeechSynthesisUtterance | null = null;
let activeAudioElement: HTMLAudioElement | null = null;

export function isIosDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Stop any ongoing speech or audio element playback
export function stopAllSpeech() {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      // ignore
    }
  }
  activeUtterance = null;
  if (typeof window !== 'undefined') {
    (window as unknown as { _currentUtterance?: SpeechSynthesisUtterance | null })._currentUtterance = null;
  }
}

// Pre-fetch and cache available voices on browser load
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  }
}

function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  return cachedVoices;
}

// Helper for playing audio via HTML5 Audio
function playAudioFallback(text: string, lang: 'en' | 'th', slow: boolean, onDone: () => void) {
  try {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;
    const audio = new Audio();
    activeAudioElement = audio;
    audio.playbackRate = slow ? (lang === 'th' ? 0.8 : 0.7) : 1.0;

    let resolved = false;
    const finish = () => {
      if (!resolved) {
        resolved = true;
        if (activeAudioElement === audio) activeAudioElement = null;
        onDone();
      }
    };

    const timer = setTimeout(finish, 4000);
    audio.onended = () => {
      clearTimeout(timer);
      finish();
    };
    audio.onerror = () => {
      clearTimeout(timer);
      finish();
    };

    audio.src = url;
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => {
        clearTimeout(timer);
        finish();
      });
    }
  } catch {
    onDone();
  }
}

// Speech Synthesis for English pronunciation with Slow mode
export function speakWord(text: string, slow: boolean = false): Promise<void> {
  return new Promise((resolve) => {
    soundManager.unlock();
    stopAllSpeech();

    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    // Clean text for speech synthesis
    const cleanText = text
      .replace(/:.*/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/[-/]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        activeUtterance = null;
        if (typeof window !== 'undefined') {
          (window as unknown as { _currentUtterance?: SpeechSynthesisUtterance | null })._currentUtterance = null;
        }
        resolve();
      }
    };

    // Native Web Speech API (supported on iOS Safari, Chrome, Edge, Android)
    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';
        utterance.rate = slow ? 0.65 : 0.88;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Select best quality English voice
        const voices = getVoices();
        if (voices.length > 0) {
          const englishVoice = voices.find(
            (v) => (v.lang === 'en-US' || v.lang.startsWith('en')) && 
                   (v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('US') || v.name.includes('Daniel') || v.name.includes('Karen'))
          ) || voices.find((v) => v.lang.startsWith('en'));

          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }

        activeUtterance = utterance;
        (window as unknown as { _currentUtterance?: SpeechSynthesisUtterance | null })._currentUtterance = utterance;

        utterance.onend = finish;
        utterance.onerror = () => {
          playAudioFallback(cleanText, 'en', slow, finish);
        };

        // If iOS speech queue does not start within 1500ms, use audio element fallback
        const safetyTimer = setTimeout(() => {
          if (!finished) {
            playAudioFallback(cleanText, 'en', slow, finish);
          }
        }, 2000);

        utterance.onstart = () => {
          clearTimeout(safetyTimer);
        };

        window.speechSynthesis.speak(utterance);

        // iOS Safari resume bug fix
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        return;
      } catch {
        // Fall through to fallback
      }
    }

    playAudioFallback(cleanText, 'en', slow, finish);
  });
}

// Speech Synthesis for Thai pronunciation with authentic Thai accent
export function speakThai(text: string, slow: boolean = false): Promise<void> {
  return new Promise((resolve) => {
    soundManager.unlock();
    stopAllSpeech();

    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    // Clean Thai phonetic text: convert hyphens/slashes to smooth syllables
    const cleanText = text
      .replace(/\(.*?\)/g, '')
      .replace(/[-/]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        activeUtterance = null;
        if (typeof window !== 'undefined') {
          (window as unknown as { _currentUtterance?: SpeechSynthesisUtterance | null })._currentUtterance = null;
        }
        resolve();
      }
    };

    // Native Web Speech API
    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'th-TH';
        utterance.rate = slow ? 0.75 : 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Select the best quality Thai voice available on device (iOS Siri Kanya, Narisa, Premwadee, etc.)
        const voices = getVoices();
        if (voices.length > 0) {
          const thaiVoice = voices.find(
            (v) => (v.lang === 'th-TH' || v.lang.startsWith('th')) && 
                   (v.name.includes('Premwadee') || v.name.includes('Kanya') || v.name.includes('Siri') || v.name.includes('Narisa') || v.name.includes('Achara') || v.name.includes('Google') || v.name.includes('Thai'))
          ) || voices.find((v) => v.lang.startsWith('th') || v.lang.includes('th') || v.lang === 'th-TH');

          if (thaiVoice) {
            utterance.voice = thaiVoice;
          }
        }

        activeUtterance = utterance;
        (window as unknown as { _currentUtterance?: SpeechSynthesisUtterance | null })._currentUtterance = utterance;

        utterance.onend = finish;
        utterance.onerror = () => {
          playAudioFallback(cleanText, 'th', slow, finish);
        };

        const safetyTimer = setTimeout(() => {
          if (!finished) {
            playAudioFallback(cleanText, 'th', slow, finish);
          }
        }, 2000);

        utterance.onstart = () => {
          clearTimeout(safetyTimer);
        };

        window.speechSynthesis.speak(utterance);

        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        return;
      } catch {
        // Fall through
      }
    }

    playAudioFallback(cleanText, 'th', slow, finish);
  });
}


// Audio and Sound Utility for Pronunciation and Sound Effects

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

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

let activeAudioElement: HTMLAudioElement | null = null;

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
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

// Helper to play audio via cloud TTS endpoint (high-fidelity human voice)
function playCloudTtsAudio(text: string, lang: 'th' | 'en', speed: number = 1.0): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    try {
      stopAllSpeech();

      // Clean text for speech synthesis API
      const cleanText = text
        .replace(/\(.*?\)/g, '')
        .replace(/[-/]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        resolve(false);
        return;
      }

      const encoded = encodeURIComponent(cleanText);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;

      const audio = new Audio();
      activeAudioElement = audio;

      audio.playbackRate = Math.max(0.5, Math.min(2.0, speed));

      let resolved = false;
      const finish = (success: boolean) => {
        if (!resolved) {
          resolved = true;
          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }
          resolve(success);
        }
      };

      // Set timeout in case network stalls
      const timeoutTimer = setTimeout(() => {
        finish(false);
      }, 4000);

      audio.onended = () => {
        clearTimeout(timeoutTimer);
        finish(true);
      };

      audio.onerror = () => {
        clearTimeout(timeoutTimer);
        finish(false);
      };

      audio.src = url;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          clearTimeout(timeoutTimer);
          finish(false);
        });
      }
    } catch {
      resolve(false);
    }
  });
}

// Speech Synthesis for English pronunciation with Slow mode
export async function speakWord(text: string, slow: boolean = false): Promise<void> {
  const speed = slow ? 0.65 : 1.0;
  
  // Try cloud audio TTS first for crystal clear pronunciation
  const cloudSuccess = await playCloudTtsAudio(text, 'en', speed);
  if (cloudSuccess) return;

  // Fallback to Web Speech Synthesis API
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const cleanText = text
        .replace(/:.*/g, '')
        .replace(/\(.*\)/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = slow ? 0.55 : 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('US'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      let done = false;
      const doneCallback = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };

      utterance.onend = doneCallback;
      utterance.onerror = doneCallback;

      // Fail-safe timer
      setTimeout(doneCallback, 4000);

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

// Speech Synthesis for Thai pronunciation with authentic Thai accent
export async function speakThai(text: string, slow: boolean = false): Promise<void> {
  const speed = slow ? 0.75 : 1.0;
  
  // Clean text: strip parenthesis annotations, convert hyphens/slashes in phonetic words into smooth Thai syllables
  const cleanText = text
    .replace(/\(.*?\)/g, '')
    .replace(/[-/]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Try cloud audio TTS first for native Thai speech and tone
  const cloudSuccess = await playCloudTtsAudio(cleanText, 'th', speed);
  if (cloudSuccess) return;

  // Fallback to Web Speech Synthesis API
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'th-TH';
      utterance.rate = slow ? 0.75 : 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const thaiVoice = voices.find(
        (v) => (v.lang === 'th-TH' || v.lang.startsWith('th')) && 
               (v.name.includes('Premwadee') || v.name.includes('Kanya') || v.name.includes('Google') || v.name.includes('Thai') || v.name.includes('Siri') || v.name.includes('Narisa') || v.name.includes('Achara'))
      ) || voices.find((v) => v.lang.startsWith('th') || v.lang.includes('th') || v.lang === 'th-TH');

      if (thaiVoice) {
        utterance.voice = thaiVoice;
      }

      let done = false;
      const doneCallback = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };

      utterance.onend = doneCallback;
      utterance.onerror = doneCallback;

      // Fail-safe timer
      setTimeout(doneCallback, 4000);

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

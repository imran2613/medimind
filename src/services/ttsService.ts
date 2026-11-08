// Native Web Speech API for zero-cost, zero-latency regional voice synthesis

export type SupportedLang = 'en' | 'hi' | 'te';

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public speak(
    text: string,
    lang: SupportedLang,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ): void {
    if (!this.synth) {
      if (onError) onError('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate language code
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
    } else if (lang === 'te') {
      utterance.lang = 'te-IN';
      utterance.rate = 0.85;
    } else {
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
    }

    // Try finding an exact voice match if available
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.includes(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    // Keep reference active
    if (this.currentUtterance) {
      // active
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

export const ttsService = new TTSService();


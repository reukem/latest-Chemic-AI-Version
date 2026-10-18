/**
 * @file LucyVoiceEngine.ts
 * High-fidelity Speech Synthesis & Procedural Vocal Co-Pilot for Professor Lucy.
 * Powered by Web Speech API (speechSynthesis) with custom anime-kitsune acoustic pitch tuning,
 * KaTeX formula sanitization, and seamless bilingual English/Vietnamese voice routing.
 */

export type LucyEmotion = 'EXCITED' | 'INTRIGUED' | 'STRICT' | 'DISGUSTED' | 'NEUTRAL' | 'WARM';

interface ProsodySettings {
  pitch: number;
  rate: number;
  volume: number;
}

const EMOTION_PROSODY: Record<LucyEmotion, ProsodySettings> = {
  EXCITED: { pitch: 1.36, rate: 1.08, volume: 1.0 },
  INTRIGUED: { pitch: 1.25, rate: 1.02, volume: 1.0 },
  WARM: { pitch: 1.20, rate: 0.98, volume: 1.0 },
  NEUTRAL: { pitch: 1.15, rate: 1.00, volume: 0.95 },
  STRICT: { pitch: 0.98, rate: 0.92, volume: 1.0 },
  DISGUSTED: { pitch: 0.90, rate: 0.88, volume: 1.0 }
};

class LucyVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onSpeakingChangeCallbacks: Set<(isSpeaking: boolean) => void> = new Set();
  private isSpeakingState: boolean = false;
  private isEnabled: boolean = true;
  private masterVolume: number = 0.5;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      try {
        const saved = localStorage.getItem('chemic_lucy_voice_enabled');
        if (saved !== null) {
          this.isEnabled = saved === 'true';
        }
        const savedVol = localStorage.getItem('chemic_lucy_master_volume');
        if (savedVol !== null) {
          this.masterVolume = parseFloat(savedVol) || 0.5;
        }
      } catch (_) {}
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('chemic_lucy_master_volume', String(this.masterVolume));
    } catch (_) {}
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    try {
      localStorage.setItem('chemic_lucy_voice_enabled', String(enabled));
    } catch (_) {}
    if (!enabled) this.stop();
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public toggleEnabled(): boolean {
    const next = !this.isEnabled;
    this.setEnabled(next);
    return next;
  }

  public subscribeSpeaking(callback: (isSpeaking: boolean) => void): () => void {
    this.onSpeakingChangeCallbacks.add(callback);
    callback(this.isSpeakingState);
    return () => {
      this.onSpeakingChangeCallbacks.delete(callback);
    };
  }

  private setSpeaking(status: boolean) {
    this.isSpeakingState = status;
    this.onSpeakingChangeCallbacks.forEach(cb => cb(status));
  }

  /**
   * Detects Lucy's emotional stance from text tags or contextual sentiment.
   */
  public detectEmotion(rawText: string): LucyEmotion {
    const upper = rawText.toUpperCase();
    if (upper.includes('[EXCITED]') || upper.includes('TUYỆT VỜI') || upper.includes('CHÍNH XÁC') || upper.includes('WOW') || upper.includes('AMAZING')) {
      return 'EXCITED';
    }
    if (upper.includes('[INTRIGUED]') || upper.includes('THÚ VỊ') || upper.includes('ĐẶC BIỆT LÀ') || upper.includes('HÃY ĐOÁN XEM')) {
      return 'INTRIGUED';
    }
    if (upper.includes('[STRICT]') || upper.includes('NGUY HIỂM') || upper.includes('CẨN THẬN') || upper.includes('DANGER') || upper.includes('WARNING') || upper.includes('VI PHẠM')) {
      return 'STRICT';
    }
    if (upper.includes('[DISGUSTED]') || upper.includes('BÙN TRƠ') || upper.includes('SLUDGE')) {
      return 'DISGUSTED';
    }
    if (upper.includes('[WARM]') || upper.includes('TUYỆT LẮM EM') || upper.includes('CỐ LÊN NHÉ') || upper.includes('CÔ TIN EM')) {
      return 'WARM';
    }
    return 'NEUTRAL';
  }

  /**
   * Sanitizes rich Markdown, KaTeX, and LaTeX chemical symbols into smooth spoken phrases.
   */
  public sanitizeSpokenText(rawText: string, isVi: boolean): string {
    let clean = rawText;

    // 1. Remove bracketed databank headers
    clean = clean.replace(/\[LUCY OFFLINE DATABANK\]/gi, '');
    clean = clean.replace(/\[NEUTRAL\]|\[INTRIGUED\]|\[DISGUSTED\]|\[STRICT\]|\[EXCITED\]|\[WARM\]/gi, '');

    // 2. Remove code blocks
    clean = clean.replace(/```[\s\S]*?```/g, isVi ? ' mã lệnh đã bỏ qua. ' : ' code block omitted. ');
    clean = clean.replace(/`([^`]+)`/g, '$1');

    // 3. Clean KaTeX & LaTeX display math: $$ ... $$ and $ ... $
    clean = clean.replace(/\$\$([\s\S]*?)\$\$/g, (_match, eq) => {
      let spoken = eq
        .replace(/\\longrightarrow|\\rightarrow|\\to|→/g, isVi ? ' tạo thành ' : ' yields ')
        .replace(/\\rightleftharpoons|⇌/g, isVi ? ' cân bằng thuận nghịch với ' : ' is in dynamic equilibrium with ')
        .replace(/\\Delta H/g, isVi ? ' delta H ' : ' delta H ')
        .replace(/\\downarrow|↓/g, isVi ? ' kết tủa ' : ' precipitate ')
        .replace(/\\uparrow|↑/g, isVi ? ' bay hơi ' : ' gas evolved ')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathbf\{([^}]+)\}/g, '$1')
        .replace(/\\approx/g, isVi ? ' xấp xỉ ' : ' approximately ')
        .replace(/\\le/g, isVi ? ' nhỏ hơn hoặc bằng ' : ' less than or equal to ')
        .replace(/\\ge/g, isVi ? ' lớn hơn hoặc bằng ' : ' greater than or equal to ')
        .replace(/\\pm/g, isVi ? ' cộng trừ ' : ' plus or minus ')
        .replace(/\\circ/g, ' độ ')
        .replace(/\+/g, isVi ? ' tác dụng với ' : ' plus ')
        .replace(/[\\]/g, ' ');
      return spoken;
    });

    clean = clean.replace(/\$([^$]+)\$/g, (_match, inlineEq) => {
      return inlineEq
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\circ/g, ' độ ')
        .replace(/[\\]/g, ' ');
    });

    // 4. Remove Markdown formatting (*, #, _, >, etc.)
    clean = clean.replace(/^#{1,6}\s+/gm, '');
    clean = clean.replace(/\*\*([^*]+)\*\*/g, '$1');
    clean = clean.replace(/\*([^*]+)\*/g, '$1');
    clean = clean.replace(/__([^_]+)__/g, '$1');
    clean = clean.replace(/_([^_]+)_/g, '$1');
    clean = clean.replace(/^>\s+/gm, '');
    clean = clean.replace(/^[•*-]\s+/gm, '');

    // 5. Clean up Kaomojis & emojis for speech synthesis
    clean = clean.replace(/[\u{1F300}-\u{1FAFF}]/gu, '');
    clean = clean.replace(/\(:3|:3|\^_\^|\(つω`｡\)♡|\(ﾉ◕ヮ◕\)ﾉ\*:･ﾟ✧/g, '');

    // 6. Condense whitespace
    clean = clean.replace(/\s+/g, ' ').trim();

    return clean;
  }

  /**
   * Speaks the response with Lucy's expressive emotional neural voice profile.
   */
  public speak(rawText: string, language: 'en' | 'vi' = 'en') {
    if (!this.synth || !this.isEnabled) return;

    this.stop();

    const isVi = language === 'vi' || language === 'vn';
    const emotion = this.detectEmotion(rawText);
    const prosody = EMOTION_PROSODY[emotion];
    const spokenText = this.sanitizeSpokenText(rawText, isVi);
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    this.currentUtterance = utterance;

    // Pick best available voice matching language
    const voices = this.synth.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (isVi) {
      selectedVoice = voices.find(v => 
        (v.lang.toLowerCase().includes('vi')) && 
        (/natural|neural|hoaimy|google/i.test(v.name))
      ) || voices.find(v => v.lang.toLowerCase().includes('vi')) ||
           voices.find(v => v.name.toLowerCase().includes('vietnam') || v.name.toLowerCase().includes('vietnamese'));
      
      utterance.lang = 'vi-VN';
      utterance.pitch = prosody.pitch;
      utterance.rate = prosody.rate;
      utterance.volume = Math.max(0, Math.min(1, prosody.volume * this.masterVolume));
    } else {
      // Prioritize natural female English voices
      const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      selectedVoice = enVoices.find(v => 
        /natural|neural|jenny|aria|google us|samantha|zira/i.test(v.name)
      ) || enVoices[0];
      
      utterance.lang = 'en-US';
      utterance.pitch = prosody.pitch + 0.05; // Kitsune lively overtone
      utterance.rate = prosody.rate;
      utterance.volume = Math.max(0, Math.min(1, prosody.volume * this.masterVolume));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      this.setSpeaking(true);
    };

    utterance.onend = () => {
      this.setSpeaking(false);
      this.currentUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn("Lucy voice playback notice:", e);
      this.setSpeaking(false);
      this.currentUtterance = null;
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (!this.synth) return;
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
    this.setSpeaking(false);
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const lucyVoiceEngine = new LucyVoiceEngine();

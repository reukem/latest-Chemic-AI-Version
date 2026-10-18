class AudioManager {
    private ctx: AudioContext | null = null;
    private initialized: boolean = false;
    private masterVolume: number = 0.5;

    public setMasterVolume(vol: number) {
        this.masterVolume = Math.max(0, Math.min(1, vol));
    }

    public getMasterVolume(): number {
        return this.masterVolume;
    }

    public init() {
        if (!this.initialized) {
            // Lazy initialization
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.initialized = true;
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public playHover() {
        this.init();
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    public playClick() {
        this.init();
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    public playHydrogenPop() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // Sharp acoustic pop transient
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3200, time);
        osc.frequency.exponentialRampToValueAtTime(160, time + 0.08);

        gain.gain.setValueAtTime(0.45, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.08);

        // High crackle burst
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }
        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, time);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

        noiseSrc.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noiseSrc.start(time);
    }

    public playExplosionSound() {
        this.init();
        if (!this.ctx) return;

        const time = this.ctx.currentTime;

        // Layer 0: Sharp Instant Detonation Crack (Hydrogen Ignition Snap)
        this.playHydrogenPop();

        // Layer 1: White Noise with Dynamic Lowpass Filter (Explosive Rumble)
        const bufferSize = this.ctx.sampleRate * 2.2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.2);
        }

        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(3500, time);
        noiseFilter.frequency.exponentialRampToValueAtTime(80, time + 1.2);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(1.0, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.005, time + 1.8);

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseSrc.start(time);

        // Layer 2: Deep Sub Bass Shockwave Drop (Physical Punch)
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(28, time + 0.65);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(1.2, time);
        oscGain.gain.exponentialRampToValueAtTime(0.005, time + 1.2);

        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 1.2);
    }

    public playSizzle() {
        this.init();
        if (!this.ctx) return;

        const time = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 1.8; 
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            // Modulated bubbling sizzle
            const crackle = Math.random() > 0.85 ? (Math.random() * 2.5 - 1.25) : (Math.random() * 0.4 - 0.2);
            data[i] = crackle;
        }

        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(4500, time);
        noiseFilter.frequency.linearRampToValueAtTime(6500, time + 0.8);
        noiseFilter.frequency.linearRampToValueAtTime(3000, time + 1.6);
        noiseFilter.Q.setValueAtTime(3.0, time);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, time);
        noiseGain.gain.linearRampToValueAtTime(0.35, time + 0.5);
        noiseGain.gain.linearRampToValueAtTime(0.55, time + 1.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseSrc.start(time);
    }

    public playLegoSnap() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, time);
        osc.frequency.exponentialRampToValueAtTime(300, time + 0.07);
        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.07);
    }

    public playDiscoveryChime() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time + i * 0.07);
            gain.gain.setValueAtTime(0.12, time + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.07 + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(time + i * 0.07);
            osc.stop(time + i * 0.07 + 0.3);
        });
    }

    public playCuteSqueak() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, time);
        osc.frequency.exponentialRampToValueAtTime(1400, time + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1100, time + 0.16);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.18);
    }

    public playPunchImpact() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // Sub bass thump
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.35);
        oscGain.gain.setValueAtTime(1.0, time);
        oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);

        // Whoosh / punch transient
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, time);
        filter.frequency.exponentialRampToValueAtTime(180, time + 0.25);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start(time);
    }

    public playGlassShatter() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // High frequency glass resonant pings
        [2400, 3100, 4200, 5600, 7200].forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), time + idx * 0.015);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.4, time + idx * 0.015 + 0.4);
            gain.gain.setValueAtTime(0.25, time + idx * 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.015 + 0.45);
            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(time + idx * 0.015);
            osc.stop(time + idx * 0.015 + 0.45);
        });

        // Sharp glass fracture noise burst
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.4);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3000, time);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start(time);
    }

    public playPoutHmph() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, time);
        osc.frequency.exponentialRampToValueAtTime(250, time + 0.15);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
    }

    // ==========================================
    // LAB ASMR PROCEDURAL SOUNDSCAPE
    // ==========================================
    public playGlassClink() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // Dual pure crystal bell tones simulating borosilicate glassware contact
        [2450, 4920].forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.98, time + 0.18);

            gain.gain.setValueAtTime(0.08 / (idx + 1), time);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(time);
            osc.stop(time + 0.18);
        });
    }

    public playLiquidPour() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // Granular bubbling water stream with randomized droplet pitches
        const drops = 6;
        for (let i = 0; i < drops; i++) {
            const dropTime = time + i * 0.045 + (Math.random() * 0.02);
            const freq = 450 + Math.random() * 450;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, dropTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, dropTime + 0.05);

            gain.gain.setValueAtTime(0.04, dropTime);
            gain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(dropTime);
            osc.stop(dropTime + 0.05);
        }
    }

    public playEffervescence() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 1.2);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // High-density crackle for fizzing gas bubbles (CO2/H2 release)
            data[i] = Math.random() > 0.82 ? (Math.random() * 2 - 1) : 0;
        }

        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3200, time);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

        noiseSrc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noiseSrc.start(time);
    }

    public playSteamHiss() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.8);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
        }

        const noiseSrc = this.ctx.createBufferSource();
        noiseSrc.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(5500, time);
        filter.Q.setValueAtTime(2.0, time);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

        noiseSrc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noiseSrc.start(time);
    }

    public playCrystalPrecipitate() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        // Crystalline sedimentation chime
        [1800, 1400, 1100, 850].forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time + idx * 0.06);
            gain.gain.setValueAtTime(0.07, time + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.06 + 0.15);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(time + idx * 0.06);
            osc.stop(time + idx * 0.06 + 0.15);
        });
    }

    /**
     * Acoustic 0.05mL titration micro-drop plink.
     * Sweeps upward smoothly to mimic surface-tension capillary ping.
     */
    public playDrop() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1450, time);
        osc.frequency.exponentialRampToValueAtTime(2200, time + 0.04);

        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.09);
    }
}

export const audioManager = new AudioManager();

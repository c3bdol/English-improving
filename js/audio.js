// Sound Effects Engine using Web Audio API for "خطة عبدول"

class AudioEngine {
    constructor() {
        this.audioCtx = null;
        this.soundEnabled = true;
    }

    init() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    }

    playClick() {
        if (!this.soundEnabled) return;
        this.init();
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.05);
        } catch (e) { }
    }

    playCorrect() {
        if (!this.soundEnabled) return;
        this.init();
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, this.audioCtx.currentTime + 0.2); // G5
            gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.35);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.35);
        } catch (e) { }
    }

    playWrong() {
        if (!this.soundEnabled) return;
        this.init();
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, this.audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.2);
        } catch (e) { }
    }

    playLevelUp() {
        if (!this.soundEnabled) return;
        this.init();
        try {
            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now); // A4
            osc.frequency.setValueAtTime(554.37, now + 0.1); // C#5
            osc.frequency.setValueAtTime(659.25, now + 0.2); // E5
            osc.frequency.setValueAtTime(880, now + 0.3); // A5
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(now + 0.6);
        } catch (e) { }
    }
}

const audioEngine = new AudioEngine();

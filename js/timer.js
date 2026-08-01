// Creative Session Timer Module with Messages & Enlarged Glowing SVG Circle
class SessionTimer {
    constructor() {
        this.totalSeconds = 25 * 60;
        this.remainingSeconds = 25 * 60;
        this.timerId = null;
        this.isRunning = false;
        this.currentBlockId = "block-1";
        this.currentBlockName = "AI Speaking (25 min)";
        this.audioCtx = null;
        this.circumference = 597; // 2 * PI * 95
    }

    init(displayElementId, progressCircleId, statusElementId) {
        this.displayEl = document.getElementById(displayElementId);
        this.progressCircle = document.getElementById(progressCircleId);
        this.statusEl = document.getElementById(statusElementId);
        this.updateDisplay();
    }

    setDuration(minutes, blockName, blockId) {
        this.pause();
        this.totalSeconds = minutes * 60;
        this.remainingSeconds = this.totalSeconds;
        this.currentBlockName = blockName || `${minutes} Minutes`;
        this.currentBlockId = blockId || "block-1";
        if (this.statusEl) this.statusEl.innerText = this.currentBlockName;
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.initAudio();

        if (window.mascot) mascot.say("تم بدء مؤقت التركيز! ركز بدون تشتيت خلال الدقائق دي ⏱️🔥");
        if (window.app) window.app.showToast("⏱️ تم بدء مؤقت التركيز بنجاح!");

        this.timerId = setInterval(() => {
            if (this.remainingSeconds > 0) {
                this.remainingSeconds--;
                this.updateDisplay();
            } else {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        if (this.isRunning) {
            this.isRunning = false;
            if (window.mascot) mascot.say("تم إيقاف المؤقت مؤقتاً ⏸️ خذ نفس سريع وارسم هدفك واصل!");
            if (window.app) window.app.showToast("⏸️ تم إيقاف المؤقت مؤقتاً");
        }
    }

    reset() {
        this.pause();
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
        if (window.mascot) mascot.say("تم إعادة ضبط المؤقت 🔄 جاهز للبدء من جديد؟");
        if (window.app) window.app.showToast("🔄 تم إعادة ضبط المؤقت");
    }

    completeNow() {
        this.remainingSeconds = 0;
        this.updateDisplay();
        this.complete();
    }

    updateDisplay() {
        const mins = Math.floor(this.remainingSeconds / 60);
        const secs = this.remainingSeconds % 60;
        const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        if (this.displayEl) {
            this.displayEl.innerText = formatted;
        }

        if (this.progressCircle) {
            const percent = (this.remainingSeconds / this.totalSeconds);
            const strokeDashoffset = this.circumference * (1 - percent);
            this.progressCircle.style.strokeDashoffset = strokeDashoffset;
        }
    }

    complete() {
        this.pause();
        this.playChime();
        if (this.statusEl) {
            this.statusEl.innerText = `🎉 انتهى وقت ${this.currentBlockName}! تم إنهاء التاسك بنجاح!`;
        }
        if (window.mascot) mascot.say(mascot.messages.timerFinished);

        if (window.app && typeof window.app.onTaskTimerCompleted === 'function') {
            window.app.onTaskTimerCompleted(this.currentBlockId);
        }
    }

    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    }

    playChime() {
        try {
            if (!this.audioCtx) this.initAudio();
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 1.2);
        } catch (e) {
            console.log('Audio chime error:', e);
        }
    }
}

const appTimer = new SessionTimer();

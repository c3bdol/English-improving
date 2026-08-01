// Error Log Manager ("كشكول الغلطات") — 100% Local & Fast Bulk Text Parser

class ErrorLogManager {
    constructor() {
        this.STORAGE_KEY = 'b2_c1_error_logs_v7';
        this.errors = this.loadErrors();
    }

    loadErrors() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse error log', e);
            }
        }
        return [
            {
                id: 'err_1',
                wrongSentence: 'A significant problem happened in the server.',
                correctSentence: 'A significant issue arose in the server.',
                note: 'استخدم "arose" أو "occurred" مع "issue" بدل "happened".',
                dateAdded: new Date().toLocaleDateString('ar-EG')
            },
            {
                id: 'err_2',
                wrongSentence: 'If I knew about the vulnerability, I would report it yesterday.',
                correctSentence: 'If I had known about the vulnerability, I would have reported it yesterday.',
                note: 'في المواقف الخيالية في الماضي بنستخدم 3rd Conditional (If + had + PP).',
                dateAdded: new Date().toLocaleDateString('ar-EG')
            }
        ];
    }

    saveErrors() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.errors));
    }

    addError(wrongSentence, correctSentence, note = '') {
        const newError = {
            id: 'err_' + Date.now() + Math.random().toString(36).substr(2, 4),
            wrongSentence: wrongSentence.trim(),
            correctSentence: correctSentence.trim(),
            note: note.trim(),
            dateAdded: new Date().toLocaleDateString('ar-EG')
        };
        this.errors.unshift(newError);
        this.saveErrors();
        if (window.mascot) mascot.say("تم تسجيل الخطأ وملاحظة التعديل بنجاح! 📖✨");
        return newError;
    }

    // ⚡ Fast Local Bulk Text Parser (Instant Line Splitting, 0 Latency)
    parseAndAddBulkText(bulkText) {
        const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let currentWrong = '';
        let currentCorrect = '';
        let currentNote = '';
        let countAdded = 0;

        for (const line of lines) {
            const lower = line.toLowerCase();

            if (lower.includes('خطأ') || lower.includes('wrong') || line.includes('❌')) {
                if (currentWrong && currentCorrect) {
                    this.addError(currentWrong, currentCorrect, currentNote);
                    countAdded++;
                    currentWrong = ''; currentCorrect = ''; currentNote = '';
                }
                currentWrong = line.replace(/^(الجملة الخطأ:|الجملة الخطأ|الخطأ:|خطأ:|wrong:|❌)/i, '').trim();
            } else if (lower.includes('صحيح') || lower.includes('correct') || line.includes('✅')) {
                currentCorrect = line.replace(/^(الجملة الصحيحة:|الجملة الصحيحة|الصحيح:|صح:|correct:|✅)/i, '').trim();
            } else if (lower.includes('ملاحظة') || lower.includes('note') || line.includes('💡')) {
                currentNote = line.replace(/^(ملاحظة التعديل:|ملاحظة:|note:|💡)/i, '').trim();
            } else {
                if (!currentWrong) {
                    currentWrong = line;
                } else if (!currentCorrect) {
                    currentCorrect = line;
                } else {
                    currentNote = currentNote ? (currentNote + ' ' + line) : line;
                }
            }
        }

        if (currentWrong && currentCorrect) {
            this.addError(currentWrong, currentCorrect, currentNote);
            countAdded++;
        }

        return countAdded;
    }

    deleteError(id) {
        this.errors = this.errors.filter(e => e.id !== id);
        this.saveErrors();
    }
}

const errorLogManager = new ErrorLogManager();

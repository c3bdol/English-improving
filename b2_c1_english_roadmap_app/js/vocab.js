// Vocab & Anki Manager — 8-Field Card Format Standard

class VocabManager {
    constructor() {
        this.STORAGE_KEY = 'b2_c1_vocab_cards_v8';
        this.cards = this.loadCards();
    }

    loadCards() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse vocab cards', e);
            }
        }
        return [
            {
                id: 'v_1',
                word: 'Mitigate',
                arabicMeaning: 'يقلل من حدة / يخفف المخاطر',
                mySentence: 'The SOC team deployed rate limiting to mitigate DDoS vectors.',
                ipa: '/ˈmɪt.ɪ.ɡeɪt/',
                collocations: 'mitigate risk, mitigate threat, mitigate vulnerability',
                sourceSentence: 'Deploying WAF rules helps mitigate zero-day exploits.',
                techUsage: 'Web Pentesting / Remediation Report',
                synonyms: 'Syn: alleviate, lessen / Ant: exacerbate',
                frequency: 'High (Daily Security Register)',
                bucket: 'learned',
                dynamicContext: {
                    en: 'Deploying a web application firewall helps mitigate potential zero-day exploits.',
                    ar: 'تركيب جدار حماية المطبقات بيساعد في تقليل وتخفيف مخاطر ثغرات اليوم الصفر.'
                },
                reviewCount: 3,
                dateAdded: new Date().toLocaleDateString('ar-EG')
            },
            {
                id: 'v_2',
                word: 'Escalate privileges',
                arabicMeaning: 'رفع وتكبير الصلاحيات داخل النظام',
                mySentence: 'The attacker attempted to escalate privileges via local buffer overflow.',
                ipa: '/ˈes.kə.leɪt ˈprɪv.əl.ɪdʒ.ɪz/',
                collocations: 'escalate privileges to root, privilege escalation vector',
                sourceSentence: 'The vulnerability allowed low-privileged users to escalate privileges.',
                techUsage: 'OS & Web Penetration Testing',
                synonyms: 'Syn: gain elevated access',
                frequency: 'High (Core Pentesting Concept)',
                bucket: 'neutral',
                dynamicContext: {
                    en: 'Once inside the server, the pentester tried to escalate privileges to root.',
                    ar: 'بعد ما المخترق دخل السيرفر، حاول يرفع صلاحياته عشان يوصل لصلاحيات الـ root.'
                },
                reviewCount: 1,
                dateAdded: new Date().toLocaleDateString('ar-EG')
            }
        ];
    }

    saveCards() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cards));
    }

    addCard(cardData) {
        const word = (cardData.word || '').trim();
        const arabicMeaning = (cardData.arabicMeaning || '').trim();
        const mySentence = (cardData.mySentence || '').trim();

        const newCard = {
            id: 'v_' + Date.now() + Math.random().toString(36).substr(2, 4),
            word,
            arabicMeaning,
            mySentence,
            ipa: (cardData.ipa || '').trim(),
            collocations: (cardData.collocations || '').trim(),
            sourceSentence: (cardData.sourceSentence || '').trim(),
            techUsage: (cardData.techUsage || '').trim(),
            synonyms: (cardData.synonyms || '').trim(),
            frequency: (cardData.frequency || '').trim(),
            bucket: 'unlearned',
            dynamicContext: {
                en: `Security teams must ${word.toLowerCase()} threats across the environment.`,
                ar: `فرق الأمان لازم تتعامل مع المصادفات التقنية بشكل آمن.`
            },
            reviewCount: 0,
            dateAdded: new Date().toLocaleDateString('ar-EG')
        };
        this.cards.unshift(newCard);
        this.saveCards();
        if (window.mascot) mascot.say("تم إضافة الكلمة بالصيغة الكاملة لخطة عبدول إلى أنكي بنجاح! 🧠⚡");
        return newCard;
    }

    rateCard(id, rating) {
        const card = this.cards.find(c => c.id === id);
        if (!card) return;

        card.reviewCount = (card.reviewCount || 0) + 1;

        if (rating === 'fail') {
            card.bucket = 'unlearned';
        } else if (rating === 'neutral') {
            card.bucket = 'neutral';
        } else if (rating === 'easy') {
            card.bucket = 'learned';
        }

        this.saveCards();
    }

    deleteCard(id) {
        this.cards = this.cards.filter(c => c.id !== id);
        this.saveCards();
    }

    exportToAnkiTxt() {
        if (this.cards.length === 0) return '';
        let header = '#separator:Tab\n#html:true\n#deck:B2 to C1 English Roadmap Deck\n';
        let lines = this.cards.map(c => {
            let fields = [
                c.word,
                c.arabicMeaning,
                c.ipa || '',
                c.mySentence,
                c.collocations || '',
                c.sourceSentence || '',
                c.techUsage || '',
                c.synonyms || '',
                c.frequency || ''
            ];
            return fields.join('\t');
        });
        return header + lines.join('\n');
    }
}

const vocabManager = new VocabManager();

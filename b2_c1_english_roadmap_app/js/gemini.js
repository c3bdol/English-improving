// Smart Offline Engine — 100% Local (Zero API Key / Zero External Dependency)

class SmartOfflineEngine {
    constructor() {
        this.isOfflineMode = true;
    }

    hasKey() {
        return false;
    }

    getApiKey() {
        return '';
    }

    // ═══════════════════════════════════════════════════════════════
    // MODULE 1: ANKI VOCAB — Local Context Generator
    // ═══════════════════════════════════════════════════════════════
    async generateWordContext(word, arabicMeaning) {
        const cleanWord = word.trim();
        const lower = cleanWord.toLowerCase();

        const smartExamples = {
            mitigate: {
                en: "The SOC team deployed input validation and rate limiting to mitigate potential SSRF and DDoS vectors.",
                ar: "فريق الـ SOC طبق فحص المدخلات وتقييد معدل الطلبات علشان يقلل مخاطر هجمات الـ SSRF والـ DDoS."
            },
            escalate: {
                en: "Once initial access was gained, the pentester attempted to escalate privileges to root.",
                ar: "بعد الوصول المبدئي للسيرفر، حاول مهندس فحص الاختراق يرفع صلاحياته لسطح النظام (root)."
            },
            exfiltrate: {
                en: "Attackers used an encrypted DNS tunnel to exfiltrate confidential database records.",
                ar: "المخترقون استخدموا نفق DNS مشفر علشان يهربوا ويسربوا بيانات قاعدة البيانات السرية."
            },
            arbitrary: {
                en: "The unauthenticated RCE flaw allowed attackers to execute arbitrary commands on the target host.",
                ar: "ثغرة الـ RCE سمحت للمهاجمين بتنفيذ أوامر عشوائية بدون صلاحيات على السيرفر المستهدف."
            },
            remediate: {
                en: "Security engineers were instructed to patch the buffer overflow and remediate the vulnerability immediately.",
                ar: "تم توجيه مهندسي الأمان لسد ثغرة الـ Buffer Overflow ومعالجة المشكلة فوراً."
            }
        };

        for (const [k, val] of Object.entries(smartExamples)) {
            if (lower.includes(k)) {
                return { en: val.en, ar: val.ar, source: 'local' };
            }
        }

        return {
            en: `Security operations must effectively ${lower} risks and vulnerabilities across the network architecture.`,
            ar: `فرق حماية المعلومات لازم تتابع وتتعامل مع الكلمة المضافة في بيئة العمل التقنية بشكل آمن.`,
            source: 'local'
        };
    }

    async generateAIAnkiReviewBatch(cardsArray) {
        if (!cardsArray || cardsArray.length === 0) return [];
        return cardsArray.map(c => ({
            id: c.id,
            word: c.word,
            englishSentence: `We applied technical controls around ${c.word.toLowerCase()} to secure the infrastructure.`,
            arabicTranslation: `طبقنا ضوابط حماية تقنية تخص ${c.arabicMeaning} لتأمين البنية التحتية.`
        }));
    }

    // ═══════════════════════════════════════════════════════════════
    // MODULE 2: TASKS — Local Discussion Guides & Writing Analysis
    // ═══════════════════════════════════════════════════════════════
    async fetchTaskGuideAndWords(topicTitle) {
        return {
            discussionPoints: `💡 **محاور واسئلة نقاش C1 لموضوع اليوم:**
• What are the most common attack vectors related to "${topicTitle}" in web applications?
• How would you articulate the business impact of this issue in an executive summary?
• What specific mitigation controls would you recommend to the development team?`,
            suggestedWords: `💡 **مقترحات كلمات وتراكيب C1 احترافية:**
• **Plausible attack vector** (مسار هجوم منطقي) - *The audit identified a plausible attack vector.*
• **Mitigate risk** (تقليل المخاطر) - *Input sanitization mitigates XSS risks.*
• **Escalate privileges** (رفع الصلاحيات) - *The flaw allowed users to escalate privileges.*`
        };
    }

    async generateTaskAIGuide(topicTitle) {
        const res = await this.fetchTaskGuideAndWords(topicTitle);
        return res.discussionPoints;
    }

    async suggestTaskWords(taskType) {
        const res = await this.fetchTaskGuideAndWords(taskType);
        return res.suggestedWords;
    }

    async checkWriting(userText) {
        let analyzedHtml = userText;
        let corrections = [];

        const lower = userText.toLowerCase();

        if (lower.includes('happened')) {
            analyzedHtml = analyzedHtml.replace(/happened/gi, "<span class='err-red'>happened</span> <span class='corr-green'>arose</span>");
            corrections.push({
                wrong: "happened",
                correct: "arose",
                explanationAr: "في مستوى C1 نستخدم التعبير الاحترافي 'issues arose' أو 'occurred' بدلاً من 'happened'."
            });
        }

        if (lower.includes('make a test')) {
            analyzedHtml = analyzedHtml.replace(/make a test/gi, "<span class='err-red'>make a test</span> <span class='corr-green'>conduct an assessment</span>");
            corrections.push({
                wrong: "make a test",
                correct: "conduct an assessment",
                explanationAr: "في التقارير التقنية نفضل التراكيب المتقدمة مثل 'conduct a penetration test' أو 'conduct an assessment'."
            });
        }

        if (lower.includes('problem')) {
            analyzedHtml = analyzedHtml.replace(/problem/gi, "<span class='err-red'>problem</span> <span class='corr-green'>vulnerability / security flaw</span>");
            corrections.push({
                wrong: "problem",
                correct: "vulnerability",
                explanationAr: "استخدم المصطلحات المحددة دقيقاً مثل 'vulnerability' أو 'flaw' بدلاً من الكلمات العامة مثل 'problem'."
            });
        }

        if (corrections.length === 0) {
            analyzedHtml = userText + " <span class='corr-green'>✅ (صياغة سليمة وتركيب ممتاز!)</span>";
        }

        return { analyzedHtml, corrections, source: 'local' };
    }

    // ═══════════════════════════════════════════════════════════════
    // MODULE 3: ERROR LOG — Local Rule Engine
    // ═══════════════════════════════════════════════════════════════
    async analyzeErrorWithAI(wrongSentence, correctSentence) {
        const wrongLower = wrongSentence.toLowerCase();
        let category = 'تركيب لغوي وحصيلة كلمات';
        let explanation = 'تغيير الصياغة لاستخدام كلمات وتركيبات C1 احترافية تناسب التقارير التقنية.';

        if (wrongLower.includes('a ') || wrongLower.includes('the ') || wrongLower.includes('an ')) {
            category = 'استخدام أدوات التعريف والتنكير';
            explanation = 'مراجعة استخدام أدوات التعريف (the/a/an) قبل الأسماء القابلة والغير قابلة للعد.';
        } else if (wrongLower.includes('in ') || wrongLower.includes('on ') || wrongLower.includes('at ') || wrongLower.includes('to ')) {
            category = 'حروف الجر وحروف الربط';
            explanation = 'مراجعة حروف الجر الملازمة للأفعال والمصطلحات الأمنية.';
        } else if (wrongLower.includes('if ') || wrongLower.includes('had ') || wrongLower.includes('went ') || wrongLower.includes('was ')) {
            category = 'قواعد وأزمنة الأفعال';
            explanation = 'تعديل زمن الفعل والتركيب الشرطي ليناسب قواعد اللغة المتقدمة C1.';
        }

        return { category, explanation, source: 'local' };
    }

    // ═══════════════════════════════════════════════════════════════
    // MODULE 4: CYBER CIPHER — Local Offline Cipher Generator
    // ═══════════════════════════════════════════════════════════════
    async generateAICipher() {
        return null;
    }
}

// Global Alias so app callers work seamlessly
const geminiService = new SmartOfflineEngine();
const smartOfflineEngine = geminiService;

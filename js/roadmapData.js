// Complete 30-Day Structured Roadmap Data mapped from August 1st onwards

const THIRTY_DAY_SCHEDULE = [
    // Week 1 (1 Aug to 7 Aug)
    { day: 1, dateStr: '2026-08-01', displayDate: '1 أغسطس', week: 1, dayOfWeek: 'السبت', type: 'Writing', dailyTopic: 'Describe your day', promptType: 'Journal' },
    { day: 2, dateStr: '2026-08-02', displayDate: '2 أغسطس', week: 1, dayOfWeek: 'الأحد', type: 'Reading', dailyTopic: 'Explain a technical concept', promptType: 'Tech Article' },
    { day: 3, dateStr: '2026-08-03', displayDate: '3 أغسطس', week: 1, dayOfWeek: 'الإثنين', type: 'Shadowing', dailyTopic: 'Defend an opinion on tech/security news', promptType: 'Shadowing 1' },
    { day: 4, dateStr: '2026-08-04', displayDate: '4 أغسطس', week: 1, dayOfWeek: 'الثلاثاء', type: 'Writing', dailyTopic: 'Tell a short story with new vocab', promptType: 'Tech Concept Writeup' },
    { day: 5, dateStr: '2026-08-05', displayDate: '5 أغسطس', week: 1, dayOfWeek: 'الأربعاء', type: 'Reading', dailyTopic: 'Debate session (Special Topic)', promptType: 'Bug Bounty / CVE' },
    { day: 6, dateStr: '2026-08-06', displayDate: '6 أغسطس', week: 1, dayOfWeek: 'الخميس', type: 'Shadowing', dailyTopic: 'Describe your day', promptType: 'Shadowing 2 (Repeat Clip)' },
    { day: 7, dateStr: '2026-08-07', displayDate: '7 أغسطس', week: 1, dayOfWeek: 'الجمعة', type: 'Review', dailyTopic: 'Targeted Practice Session for Error Log', promptType: 'Sunday Review' },

    // Week 2 (8 Aug to 14 Aug)
    { day: 8, dateStr: '2026-08-08', displayDate: '8 أغسطس', week: 2, dayOfWeek: 'السبت', type: 'Writing', dailyTopic: 'Describe your day', promptType: 'Journal' },
    { day: 9, dateStr: '2026-08-09', displayDate: '9 أغسطس', week: 2, dayOfWeek: 'الأحد', type: 'Reading', dailyTopic: 'Explain a technical concept', promptType: 'Tech Article' },
    { day: 10, dateStr: '2026-08-10', displayDate: '10 أغسطس', week: 2, dayOfWeek: 'الإثنين', type: 'Shadowing', dailyTopic: 'Defend an opinion on tech/security news', promptType: 'Shadowing 1' },
    { day: 11, dateStr: '2026-08-11', displayDate: '11 أغسطس', week: 2, dayOfWeek: 'الثلاثاء', type: 'Writing', dailyTopic: 'Tell a short story with new vocab', promptType: 'Tech Concept Writeup' },
    { day: 12, dateStr: '2026-08-12', displayDate: '12 أغسطس', week: 2, dayOfWeek: 'الأربعاء', type: 'Reading', dailyTopic: 'Mock Interview for Pentester Role (Special Topic)', promptType: 'Bug Bounty / CVE' },
    { day: 13, dateStr: '2026-08-13', displayDate: '13 أغسطس', week: 2, dayOfWeek: 'الخميس', type: 'Shadowing', dailyTopic: 'Describe your day', promptType: 'Shadowing 2 (Repeat Clip)' },
    { day: 14, dateStr: '2026-08-14', displayDate: '14 أغسطس', week: 2, dayOfWeek: 'الجمعة', type: 'Review', dailyTopic: 'Targeted Practice Session for Error Log', promptType: 'Sunday Review' },

    // Week 3 (15 Aug to 21 Aug)
    { day: 15, dateStr: '2026-08-15', displayDate: '15 أغسطس', week: 3, dayOfWeek: 'السبت', type: 'Writing', dailyTopic: 'Describe your day', promptType: 'Journal' },
    { day: 16, dateStr: '2026-08-16', displayDate: '16 أغسطس', week: 3, dayOfWeek: 'الأحد', type: 'Reading', dailyTopic: 'Explain a technical concept', promptType: 'Tech Article' },
    { day: 17, dateStr: '2026-08-17', displayDate: '17 أغسطس', week: 3, dayOfWeek: 'الإثنين', type: 'Shadowing', dailyTopic: 'Defend an opinion on tech/security news', promptType: 'Shadowing 1' },
    { day: 18, dateStr: '2026-08-18', displayDate: '18 أغسطس', week: 3, dayOfWeek: 'الثلاثاء', type: 'Writing', dailyTopic: 'Tell a short story with new vocab', promptType: 'Tech Concept Writeup' },
    { day: 19, dateStr: '2026-08-19', displayDate: '19 أغسطس', week: 3, dayOfWeek: 'الأربعاء', type: 'Reading', dailyTopic: 'Explaining a Vulnerability - Dual Register (Special Topic)', promptType: 'Bug Bounty / CVE' },
    { day: 20, dateStr: '2026-08-20', displayDate: '20 أغسطس', week: 3, dayOfWeek: 'الخميس', type: 'Shadowing', dailyTopic: 'Describe your day', promptType: 'Shadowing 2 (Repeat Clip)' },
    { day: 21, dateStr: '2026-08-21', displayDate: '21 أغسطس', week: 3, dayOfWeek: 'الجمعة', type: 'Review', dailyTopic: 'Targeted Practice Session for Error Log', promptType: 'Sunday Review' },

    // Week 4 (22 Aug to 30 Aug)
    { day: 22, dateStr: '2026-08-22', displayDate: '22 أغسطس', week: 4, dayOfWeek: 'السبت', type: 'Writing', dailyTopic: 'Describe your day', promptType: 'Journal' },
    { day: 23, dateStr: '2026-08-23', displayDate: '23 أغسطس', week: 4, dayOfWeek: 'الأحد', type: 'Reading', dailyTopic: 'Explain a technical concept', promptType: 'Tech Article' },
    { day: 24, dateStr: '2026-08-24', displayDate: '24 أغسطس', week: 4, dayOfWeek: 'الإثنين', type: 'Shadowing', dailyTopic: 'Defend an opinion on tech/security news', promptType: 'Shadowing 1' },
    { day: 25, dateStr: '2026-08-25', displayDate: '25 أغسطس', week: 4, dayOfWeek: 'الثلاثاء', type: 'Writing', dailyTopic: 'Tell a short story with new vocab', promptType: 'Tech Concept Writeup' },
    { day: 26, dateStr: '2026-08-26', displayDate: '26 أغسطس', week: 4, dayOfWeek: 'الأربعاء', type: 'Reading', dailyTopic: 'Argue Both Sides of a Tech Issue (Special Topic)', promptType: 'Bug Bounty / CVE' },
    { day: 27, dateStr: '2026-08-27', displayDate: '27 أغسطس', week: 4, dayOfWeek: 'الخميس', type: 'Shadowing', dailyTopic: 'Describe your day', promptType: 'Shadowing 2 (Repeat Clip)' },
    { day: 28, dateStr: '2026-08-28', displayDate: '28 أغسطس', week: 4, dayOfWeek: 'الجمعة', type: 'Review', dailyTopic: 'Targeted Practice Session for Error Log', promptType: 'Sunday Review' },
    { day: 29, dateStr: '2026-08-29', displayDate: '29 أغسطس', week: 4, dayOfWeek: 'السبت', type: 'Writing', dailyTopic: 'Pre-Checkpoint Practice & Recording Draft', promptType: 'Journal' },
    { day: 30, dateStr: '2026-08-30', displayDate: '30 أغسطس', week: 4, dayOfWeek: 'الأحد', type: 'Checkpoint', dailyTopic: 'Day 30 Final Checkpoint & Recording Test', promptType: '30-Day Evaluation' }
];

const ROADMAP_DATA = {
    blocks: [
        {
            id: "block-1",
            title: "المحرك الأساسي: ممارسة التحدث اليومية (Speaking Practice)",
            duration: "25 دقيقة",
            minutes: 25,
            badge: "أولوية قصوى 🎯",
            summary: "تكلم بدون توقف لمدة 20 دقيقة متواصلة حول موضوع اليوم. ركز على الطلاقة وتصحيح أهم 3 أخطاء في الآخر.",
            icon: "microphone",
            category: "speaking",
            resources: [
                { name: "ChatGPT Voice Mode", url: "https://chatgpt.com" },
                { name: "Claude AI", url: "https://claude.ai" }
            ],
            instructions: {
                subtitle: "تكتيك الـ Production Practice تحت الضغط الزمني",
                why: "درجتك في الـ Speaking والـ Writing بتبين إن عندك فجوة بين الكلمات اللي بتفهمها والكلمات اللي تقدر تستعملها وأنت بتتكلم. التمرين ده هو المحرك الرئيسي في خطة عبدول لكسر الفجوة وتطوير الطلاقة بدون ترجمة سريعة!",
                steps: [
                    {
                        time: "الدقيقة 1 - 2",
                        text: "افتح تطبيق ChatGPT أو Claude على الموبايل وفعّل الـ Voice Mode. حدد للـ AI موضوع اليوم والدور المطلوب منه."
                    },
                    {
                        time: "الدقيقة 2 - 20",
                        text: "اتكلم متواصل! ما تعطلش نفسك عشان أخطاء في نص الجملة، كمل الفكرة للاخر. الهدف هنا هو الطلاقة والتعبير المستمر مش الكمالية."
                    },
                    {
                        time: "الدقيقة 20 - 25",
                        text: "في آخر 5 دقائق، قول للـ AI: 'What were my 3 biggest recurring errors in that conversation?' واكتب الـ 3 أنماط أخطاء دول في كشكول الغلطات."
                    }
                ],
                prompts: [
                    {
                        title: "أمر الـ Voice Mode القياسي",
                        text: "Act as an expert English language coach and Senior Pentester. Let me speak for 3 minutes at a time without interrupting me mid-sentence. Today's topic is: [TOPIC]. After I finish, respond naturally and give me my top 3 recurring errors."
                    }
                ],
                rules: [
                    "ماتخليش الـ AI يقاطعك في وسط الجملة عشان ماتفقدش طلاقتك ورغبتك في الكلام.",
                    "ما تطلبش منه يصحح كل غلطة.. اطلب منه تصحيح أهم 3 أخطاء متكررة بس."
                ]
            }
        },
        {
            id: "block-2",
            title: "تثبيت الكلمات والتركيبات (Vocabulary & Anki Consolidation)",
            duration: "15 دقيقة",
            minutes: 15,
            badge: "حفظ ذكي 🧠",
            summary: "أضف الكلمة بالإنجليزي، معناها بالعربي، وجملتك الخاصة. ثم راجع الكلمات وتقييم فهمها.",
            icon: "brain",
            category: "vocab",
            resources: [
                { name: "AnkiWeb", url: "https://apps.ankiweb.net/" },
                { name: "YouGlish (Real Context)", url: "https://youglish.com" }
            ],
            instructions: {
                subtitle: "تكتيك الـ Spaced Repetition (التكرار المتباعد)",
                why: "السبب في نسيان الكلمات هو حفظها بشكل مجرد. في خطة عبدول بنحفظ الكلمة بالإنجليزي + المعنى بالعربي + جملتك الخاصة المصنوعة بنفسك لترسيخ الإنتاج النشط!",
                steps: [
                    {
                        time: "الدقيقة 1 - 5",
                        text: "أضف الكلمات الجديدة لليوم (الكلمة + المعنى بالعربي + جملتك الخاصة بنفسك)."
                    },
                    {
                        time: "الدقيقة 5 - 15",
                        text: "راجع بطاقات اليوم وقيم مستوى فهمك (لم أفهمها ❌ / نص نص 🟡 / فهمتها ✅)."
                    }
                ],
                rules: [
                    "أهم حقل في الكارت هو 'جملتي الخاصة' (My own sentence) — بدون ما تكتب جملتك بنفسك الكارت بيمرن التعرف السلبي مش الإنتاج النشط!",
                    "قيم الكلمة بصدق عشان النظام يعيدها لك بكرة لو نسيتها."
                ]
            }
        },
        {
            id: "block-3",
            title: "البلوك المتغير يومياً (Rotating Input / Output Focus)",
            duration: "15 دقيقة",
            minutes: 15,
            badge: "تركيز اليوم 🔄",
            summary: "نشاط متغير حسب اليوم (كتابة حرّة، قراءة تقنية، أو Shadowing لمقطع تقني).",
            icon: "rotate",
            category: "rotation",
            resources: [
                { name: "PortSwigger Academy", url: "https://portswigger.net/web-security" },
                { name: "Krebs on Security", url: "https://krebsonsecurity.com" },
                { name: "HackerOne Writeups", url: "https://hackerone.com/hacktivity" },
                { name: "DEF CON Conference", url: "https://www.youtube.com/@DEFCONConference" },
                { name: "TED-Ed", url: "https://www.youtube.com/@TEDEd" },
                { name: "QuillBot", url: "https://quillbot.com" }
            ],
            instructions: {
                subtitle: "جدول التدوير الأسبوعي لخطة عبدول",
                why: "التدوير الأسبوعي بيدي كل مهارة تركيز عميق ومجهد (Effortful Practice) لمدة 15 دقيقة كاملة مرتين في الأسبوع بدل المرور السطحي السريع.",
                schedule: [
                    {
                        dayId: "mon",
                        dayName: "الإثنين",
                        activityTitle: "Writing — كتابة يوميات حرّة (Free Journal)",
                        purpose: "بناء عادة الكتابة اليومية بدون خوف أو ضغط تقني.",
                        method: "اكتب لمدة 15 دقيقة متواصلة مسودة أولى بدون توقف. بعد ما تخلص شغّل فاحص الذكاء الاصطناعي لرصد الأخطاء وضفها لـ كشكول الغلطات.",
                        resLink: "https://quillbot.com"
                    },
                    {
                        dayId: "tue",
                        dayName: "الثلاثاء",
                        activityTitle: "Reading — مقال تقني من Krebs / Hacker News / PortSwigger",
                        purpose: "التعود على المصطلحات التقنية في الأمن السيبراني.",
                        method: "اقرأ فقرة كاملة قبل ما تقف عند أي كلمة صعبة. حدد أقصى 5 كلمات جديدة واسمعهم على YouGlish واكتبهم في أنكي.",
                        resLink: "https://portswigger.net/web-security"
                    },
                    {
                        dayId: "wed",
                        dayName: "الأربعاء",
                        activityTitle: "Shadowing — محاكاة نطق مقطع TED-Ed أو DEF CON (فيديوهات خفيفة غير معقدة)",
                        purpose: "تحسين النطق والطلاقة والإيقاع في نفس الوقت.",
                        method: "اختر مقطع من 2-3 دقائق (TED-Ed أو قصص DEF CON). المرة الأولى استماع للفهم. المرة الثانية اتكلم مع المتحدث في نفس اللحظة (Shadowing). احتفظ بنفس المقطع ليوم السبت!",
                        resLink: "https://www.youtube.com/@DEFCONConference"
                    },
                    {
                        dayId: "thu",
                        dayName: "الخميس",
                        activityTitle: "Writing — شرح مفهوم تقني كتابةً (Technical Concept)",
                        purpose: "التدريب على الكتابة التقنية الدقيقة وسلاسة الأفكار.",
                        method: "اشرح مفهوم تقني من دراستك (مثل XSS أو SQLi أو Buffer Overflow) بكتابة منظمة ودقيقة خلال 15 دقيقة. استخدم فاحص الذكاء الاصطناعي للتصحيح النهائي.",
                        resLink: "https://quillbot.com"
                    },
                    {
                        dayId: "fri",
                        dayName: "الجمعة",
                        activityTitle: "Reading — تقرير ثغرة حقيقي (HackerOne / Bugcrowd / CVE)",
                        purpose: "التعود على التركيبات المتبعة في تقارير الثغرات.",
                        method: "اقرأ تقرير Bug Bounty حقيقي متاح على HackerOne أو CVE Advisory. ركز على قسم الـ Impact والـ Mitigation.",
                        resLink: "https://hackerone.com/hacktivity"
                    },
                    {
                        dayId: "sat",
                        dayName: "السبت",
                        activityTitle: "Shadowing — المقطع نفسه المأخوذ يوم الأربعاء (Pass 3)",
                        purpose: "ترسيخ التلقائية والطلاقة عبر التكرار المكثف لنفس المقطع.",
                        method: "استخدم نفس المقطع اللي جربته يوم الأربعاء. المرة دي اتكلم معاه وركز 100% على النبرة (Intonation) والضغط على المقاطع بدون التفكير في المعنى!",
                        resLink: "https://www.youtube.com/@TEDEd"
                    },
                    {
                        dayId: "sun",
                        dayName: "الأحد",
                        activityTitle: "Sunday Review Day — مراجعة وتصفية شاملة",
                        purpose: "تثبيت كل اللي اتعلمته خلال الأسبوع وتحويله لمعرفة مستدامة.",
                        method: "15 دقيقة مراجعة أنكي + 15 دقيقة قراءة كشكول الغلطات وصياغة 5 جمل جديدة + 20 دقيقة جلسة AI موجهة للأخطاء + 10 دقائق تقييم ذاتي للمستوى.",
                        resLink: "https://chatgpt.com"
                    }
                ]
            }
        },
        {
            id: "block-4",
            title: "إنهاء الجلسة وتسجيل الأخطاء (Session Close & Micro-Writing)",
            duration: "5 دقائق",
            minutes: 5,
            badge: "ختام ذهبي 🏁",
            summary: "اكتب جملة واحدة تلخص جلسة اليوم + سجل الأخطاء المتكررة في كشكول الغلطات.",
            icon: "check-circle",
            resources: [],
            instructions: {
                subtitle: "تثبيت العادة والتقييم السريع",
                why: "الخروج من الجلسة بدون توثيق سريع بيخلي الأخطاء تتكرر بنفس الشكل.",
                steps: [
                    {
                        time: "الدقيقة 1 - 2",
                        text: "اكتب جملة واحدة بالإنجليزي بتلخص اتعلمت إيه النهاردة (دي بتتحسب Micro-writing rep)."
                    },
                    {
                        time: "الدقيقة 3 - 4",
                        text: "لو في خطأ اتكرر النهاردة، ضيفه فوراً في كشكول الغلطات (إما إدخال منفرد أو لصق النص الكامل)."
                    },
                    {
                        time: "الدقيقة 5",
                        text: "فحص الـ Streak والـ XP وعينك على هدف بكرة!"
                    }
                ]
            }
        }
    ],

    achievements: [
        { id: "day_1", title: "بداية خطة عبدول 🚀", desc: "أكملت اليوم الأول في خطة عبدول (1 أغسطس)!", icon: "flag", reqStreak: 1 },
        { id: "timer_5", title: "سيد التركيز ⏱️", desc: "أكملت أول تايمر تركيز بدون تشتيت!", icon: "clock", reqTimer: 1 },
        { id: "freeze_shield", title: "درع حماية الستريك 🛡️", desc: "جمعت 7 أيام ستريك وحصلت على درع الحماية ضد الغياب الطارئ!", icon: "shield-alt", reqStreak: 7 },
        { id: "vocab_10", title: "مستكشف الكلمات 🧠", desc: "أضفت 10 كلمات جديدة في أنكي بحسابك الخاص!", icon: "brain", reqVocab: 10 },
        { id: "error_5", title: "صائد الغلطات 🎯", desc: "سجلت 5 أخطاء متكررة في كشكول الغلطات لعدم تكرارها!", icon: "book-medical", reqErrors: 5 },
        { id: "week_1", title: "أسبوع الحماس 🔥", desc: "أكملت الأسبوع الأول بالكامل (7 أيام)!", icon: "fire", reqStreak: 7 },
        { id: "week_2", title: "منتصف الطريق ⚡", desc: "أكملت 14 يوم من الالتزام اليومي مع عبدول!", icon: "bolt", reqStreak: 14 },
        { id: "speaking_pro", title: "طلاقة الـ Pentester 🎙️", desc: "أتممت 10 جلسات محادثة AI في مجال الأمن السيبراني!", icon: "microphone", reqSpeaking: 10 },
        { id: "checkpoint_30", title: "بطل خطة عبدول 👑", desc: "أتممت برنامج الـ 30 يوم بالكامل ووصلت لمستوى C1 طليق!", icon: "crown", reqStreak: 30 }
    ]
};
const MOTIVATIONAL_QUOTES = ["الاستمرارية تهزم الذكاء المنقطع. استمر اليوم! 🚀","اللغة مش مجرد حفظ، دي أداة بتفتحلك أبواب العالم. 🌍","كل غلطة بتعملها النهارده هي خطوة ناحية الطلاقة بكرة. 💡","ربع ساعة كل يوم أحسن من 5 ساعات في الويك إند. ⏱️","مفيش هاكر محترف من غير لغة قوية تخليه يفهم الـ Docs! 📖","اتكلم كتييير.. الطلاقة بتيجي من الإنتاج مش الاستهلاك. 🗣️","اللي بيتعب في الـ Practice بيرتاح في الـ Real-world. 💪","اغلط، اتعلم، كرر.. دي الخوارزمية الوحيدة للنجاح. 🔄","تخيل شكل مستقبلك لما تكون بتتكلم إنجليزي بثقة في الـ Interviews. ✨","الـ Bug Bounty محتاج صبر، واللغة كمان محتاجة نفس الصبر. 🛡️","اكتب جملتك الخاصة.. دماغك مش بتفتكر الحاجات الجاهزة. 🧠","ماتخليش الخوف من الغلط يمنعك تتكلم.. اتكلم وصحح بعدين. 🚫","المسافة بين البداية والاحتراف اسمها الاستمرارية. 🎯","فهمك للـ Vulnerability بيكمل لما تقدر تشرحه بالإنجليزي بطلاقة. 🗣️","لو حاسس بملل.. افتكر ليه بدأت. 🔥","متلازمات الكلمات (Collocations) هي السر اللي بيخليك تبان Native. 🧩","كل ربع ساعة بتبذلها دلوقتي هي استثمار في مستقبلك. ⏳","راجع كشكول الغلطات.. أخطائك القديمة هي كنز تطورك. 📚","نصيحة اليوم: اسمع النطق على YouGlish وقلد بالظبط (Shadowing). 🎧","ما تذاكرش اللغة كأنها مادة.. استخدمها كأنها أداة. 🔧","أعظم الإنجازات بتبدأ بـ 25 دقيقة تركيز (Pomodoro). 🍅","اتعلم تشرح ثغرة معقدة بكلمات بسيطة.. ده قمة الـ C1. 💬","التطور بيبقى بطيء في الأول، بس فجأة بتلاقي نفسك طاير! ✈️","متقارنش مستواك بحد.. قارن مستواك باللي كنت عليه امبارح. 📈","اقرأ Writeups كتيير.. اللغة التقنية محتاجة تعود. 📄","بلاش تشتت.. ركز على مصدر واحد وخلصه للاخر. 🎯","كتابة المسودة الأولى (Draft) هي أصعب خطوة، الباقي كله تعديل. ✍️","في الـ Security مفيش حاجة اسمها مستحيل، وفي اللغة كمان! 🔓","افتخر بكل كلمة جديدة بتتعلمها وبتحطها في جملة. 🌟","اليوم الـ 30 مش النهاية.. دي مجرد بداية لرحلتك كـ C1 محترف! 🏆"];

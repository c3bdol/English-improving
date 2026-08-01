// Main Application Orchestrator for 30-Day B2 to C1 English Roadmap (100% Offline Local Engine)
class RoadmapApp {
    constructor() {
        this.STORAGE_KEY = 'b2_c1_abdo_plan_v7';
        this.state = this.loadState();
        this.selectedDayNumber = this.calculateCurrentDayNumber();
    }

    init() {
        this.checkStreakAndDatesOnLoad();
        this.renderHeader();
        this.renderProgressBars();
        this.render30DayTabs();
        this.renderActiveDayBanner();
        this.renderTasks();
        this.renderBadges();
        this.renderVocabList();
        this.renderErrorLogList();
        this.renderQuote();
        this.bindEvents();

        const keyInput = document.getElementById('gemini-key-input');
        if (keyInput && window.geminiService) {
            keyInput.value = geminiService.getApiKeys().join('\n');
        }
    }

    getTodayDateStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    calculateCurrentDayNumber() {
        const startDate = new Date('2026-08-01');
        const today = new Date();
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays < 1) return 1;
        if (diffDays > 30) return 30;
        return diffDays;
    }

    loadState() {
        const stored = localStorage.getItem(this.STORAGE_KEY);

        let initialState = {
            streak: 0,
            streakFreezeCount: 0,
            lastCompletedDate: null,
            totalXP: 0,
            currentDayNumber: this.calculateCurrentDayNumber(),
            completedDays: [],
            completedTasksByDay: {},
            unlockedBadges: ['day_1']
        };

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                initialState = { ...initialState, ...parsed };
            } catch (e) {
                console.error('Error loading state from localStorage', e);
            }
        }

        return initialState;
    }

    saveState() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    }



    checkStreakAndDatesOnLoad() {
        const todayStr = this.getTodayDateStr();
        if (!this.state.lastCompletedDate) return;

        const lastDate = new Date(this.state.lastCompletedDate);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            if (this.state.streakFreezeCount > 0) {
                this.state.streakFreezeCount -= 1;
                this.showToast('🛡️ تم تفعيل درع الحماية ووقاية السلسلة من الكسر!');
            } else {
                this.state.streak = 0;
            }
            this.saveState();
        }
    }

    addBonusXP(amount) {
        const prevLevel = Math.floor(this.state.totalXP / 100) + 1;
        this.state.totalXP += amount;
        const newLevel = Math.floor(this.state.totalXP / 100) + 1;

        if (newLevel > prevLevel) {
            if (window.audioEngine) audioEngine.playLevelUp();
            const levelTitle = this.getLevelTitle(newLevel);
            this.showToast(`👑 مبروك! وصلت لـ ${levelTitle}!`);
        }

        this.saveState();
        this.renderHeader();
        this.renderProgressBars();
    }

    getLevelTitle(levelNum) {
        const titles = [
            'مبتدئ الـ Bug Bounty 🐣',
            'مستكشف الثغرات 🔍',
            'صائد الثغرات 🎯',
            'محلل الشفرات ⚡',
            'مختبر الاختراق 🛡️',
            'خبير الـ Pentesting 💻',
            'سيد الـ C1 الطليق 👑'
        ];
        return titles[Math.min(titles.length - 1, levelNum - 1)];
    }

    renderHeader() {
        const streakEl = document.getElementById('streak-counter');
        const xpEl = document.getElementById('xp-counter');
        const cefrEl = document.getElementById('cefr-level');
        const shieldEl = document.getElementById('shield-counter');

        if (streakEl) streakEl.innerText = this.state.streak;
        if (xpEl) xpEl.innerText = this.state.totalXP;
        if (shieldEl) shieldEl.innerText = this.state.streakFreezeCount || 0;
        
        const levelNum = Math.floor(this.state.totalXP / 100) + 1;
        const levelTitle = this.getLevelTitle(levelNum);

        if (cefrEl) {
            cefrEl.innerText = `${levelTitle} — ${this.state.totalXP} XP`;
        }
    }



    renderProgressBars() {
        const completedTasks = this.state.completedTasksByDay[this.selectedDayNumber] || [];
        const percentToday = Math.round((completedTasks.length / 4) * 100);

        const dailyProgressBar = document.getElementById('daily-progress-bar');
        const dailyPercentText = document.getElementById('daily-progress-percent');

        if (dailyProgressBar) dailyProgressBar.style.width = `${percentToday}%`;
        if (dailyPercentText) dailyPercentText.innerText = `${percentToday}%`;

        const completedDaysCount = this.state.completedDays.length;
        const thirtyDayPercent = Math.round((completedDaysCount / 30) * 100);
        
        const thirtyDayProgressBar = document.getElementById('thirty-day-progress-bar');
        const thirtyDayPercentText = document.getElementById('thirty-day-progress-percent');

        if (thirtyDayProgressBar) thirtyDayProgressBar.style.width = `${thirtyDayPercent}%`;
        if (thirtyDayPercentText) thirtyDayPercentText.innerText = `${completedDaysCount}/30 يوم (${thirtyDayPercent}%)`;
    }

    render30DayTabs() {
        const container = document.getElementById('thirty-day-tabs');
        const weekLabel = document.getElementById('current-week-label');
        if (!container) return;

        const dayData = THIRTY_DAY_SCHEDULE.find(d => d.day === this.selectedDayNumber);
        if (weekLabel && dayData) {
            weekLabel.innerText = `الأسبوع ${dayData.week} (${dayData.displayDate} - ${dayData.dayOfWeek})`;
        }

        const todayDayNum = this.calculateCurrentDayNumber();

        container.innerHTML = THIRTY_DAY_SCHEDULE.map(d => {
            const isSelected = d.day === this.selectedDayNumber;
            const isCompleted = this.state.completedDays.includes(d.day);
            const isCurrent = d.day === todayDayNum;
            const isMissed = d.day < todayDayNum && !isCompleted;

            return `
                <button class="thirty-day-pill ${isSelected ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'is-current' : ''} ${isMissed ? 'is-missed' : ''}" 
                        onclick="window.app.selectDayNumber(${d.day})" title="اليوم ${d.day} (${d.displayDate})">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : (isMissed ? '<i class="fas fa-lock"></i>' : `<span>${d.day}</span>`)}
                </button>
            `;
        }).join('');
    }

    selectDayNumber(dayNum) {
        if (window.audioEngine) audioEngine.playClick();
        const todayDayNum = this.calculateCurrentDayNumber();

        if (dayNum < todayDayNum && !this.state.completedDays.includes(dayNum)) {
            this.showToast('🔒 هذا اليوم مضى ولا يمكن التعديل عليه أو العودة له.');
        }

        this.selectedDayNumber = dayNum;
        this.render30DayTabs();
        this.renderActiveDayBanner();
        this.renderQuote();
        this.renderProgressBars();
        this.renderTasks();
    }

    renderActiveDayBanner() {
        const banner = document.getElementById('active-day-banner');
        if (!banner) return;

        const dayInfo = THIRTY_DAY_SCHEDULE.find(d => d.day === this.selectedDayNumber) || THIRTY_DAY_SCHEDULE[0];
        const isCompleted = this.state.completedDays.includes(dayInfo.day);

        banner.innerHTML = `
            <div class="banner-day-header">
                <span class="banner-day-badge">اليوم ${dayInfo.day} من 30 (${dayInfo.displayDate})</span>
                <span class="banner-week-name">الأسبوع ${dayInfo.week} — ${dayInfo.dayOfWeek}</span>
                ${isCompleted ? '<span class="banner-status-done">✅ مكتمل</span>' : ''}
            </div>
            <h3 class="banner-topic-title"><i class="fas fa-microphone"></i> موضوع المحادثة والتحدث اليوم: "${dayInfo.dailyTopic || dayInfo.aiTopic}"</h3>
            <p class="banner-rotation-desc">🔄 نشاط التركيز اليومي: <strong>${dayInfo.promptType}</strong> (${dayInfo.type})</p>
        `;
    }

    renderQuote() {
        const quoteWidget = document.getElementById('daily-quote-widget');
        if (!quoteWidget) return;

        if (typeof MOTIVATIONAL_QUOTES !== 'undefined' && MOTIVATIONAL_QUOTES.length > 0) {
            const dayIndex = (this.selectedDayNumber - 1) % MOTIVATIONAL_QUOTES.length;
            quoteWidget.innerHTML = `"${MOTIVATIONAL_QUOTES[dayIndex]}"`;
        }
    }

    renderTasks() {
        const tasksContainer = document.getElementById('daily-tasks-list');
        if (!tasksContainer) return;

        const completedForDay = this.state.completedTasksByDay[this.selectedDayNumber] || [];
        const dayInfo = THIRTY_DAY_SCHEDULE.find(d => d.day === this.selectedDayNumber) || THIRTY_DAY_SCHEDULE[0];

        tasksContainer.innerHTML = ROADMAP_DATA.blocks.map(block => {
            const isCompleted = completedForDay.includes(block.id);
            let displayTitle = block.title;
            let displaySummary = block.summary;

            if (block.id === 'block-1') {
                displayTitle = `Block 1: Speaking Practice — "${dayInfo.dailyTopic || dayInfo.aiTopic}"`;
            }

            if (block.id === 'block-3') {
                displayTitle = `Block 3: ${dayInfo.promptType} (${dayInfo.type})`;
                displaySummary = `نشاط التدوير الخاص بيوم ${dayInfo.dayOfWeek} للأسبوع ${dayInfo.week}.`;
            }

            return `
                <div class="task-card ${isCompleted ? 'completed' : ''}" id="card-${block.id}">
                    <div class="task-checkbox-wrapper" onclick="window.app.onTaskCheckboxClicked('${block.id}', ${isCompleted})">
                        <div class="custom-checkbox ${isCompleted ? 'checked' : ''}">
                            ${isCompleted ? '✓' : ''}
                        </div>
                    </div>
                    <div class="task-content" onclick="window.app.openTaskModal('${block.id}')">
                        <div class="task-header">
                            <span class="task-badge">${block.badge}</span>
                            <span class="task-duration"><i class="far fa-clock"></i> ${block.duration}</span>
                        </div>
                        <h3 class="task-title">${displayTitle}</h3>
                        <p class="task-summary">${displaySummary}</p>
                        <div class="task-footer-action">
                            <span><i class="fas fa-arrow-left"></i> تعليمات وإرشادات التاسك 👈</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    onTaskCheckboxClicked(blockId, isCompleted) {
        if (window.audioEngine) audioEngine.playClick();
        if (isCompleted) {
            this.showToast('✅ هذا التاسك مكتمل بالفعل لهذا اليوم!');
        } else {
            this.showToast('⏱️ يلزم إنهاء المؤقت الخاص بالتاسك أولاً لاكتماله تلقائياً!');
            this.openTaskModal(blockId);
        }
    }

    onTaskTimerCompleted(blockId) {
        let completedForDay = this.state.completedTasksByDay[this.selectedDayNumber] || [];

        if (!completedForDay.includes(blockId)) {
            completedForDay.push(blockId);
            this.addBonusXP(25);
            this.triggerConfetti();

            this.state.completedTasksByDay[this.selectedDayNumber] = completedForDay;

            if (completedForDay.length === 4) {
                if (!this.state.completedDays.includes(this.selectedDayNumber)) {
                    this.state.completedDays.push(this.selectedDayNumber);
                    this.state.streak += 1;
                    this.state.lastCompletedDate = this.getTodayDateStr();

                    if (this.state.streak % 7 === 0) {
                        this.state.streakFreezeCount = (this.state.streakFreezeCount || 0) + 1;
                        this.showToast('🛡️ مبروك! كسبت درع حماية الستريك (Streak Freeze Shield)!');
                    }

                    this.addBonusXP(100);
                    this.showToast(`🎉 مبروك! أكملت اليوم ${this.selectedDayNumber} بالكامل مع خطة عبدول! (+100 XP)`);
                }
            } else {
                this.showToast(`✅ تم إنهاء التاسك بنجاح وحساب +25 XP!`);
            }

            this.saveState();
            this.renderHeader();
            this.renderProgressBars();
            this.render30DayTabs();
            this.renderActiveDayBanner();
            this.renderTasks();
            this.checkBadges();
        }
    }

    async openTaskModal(blockId) {
        if (window.audioEngine) audioEngine.playClick();
        const modal = document.getElementById('task-modal');
        const modalBody = document.getElementById('modal-body-content');
        const modalTitle = document.getElementById('modal-task-title');

        if (!modal || !modalBody) return;

        const block = ROADMAP_DATA.blocks.find(b => b.id === blockId);
        if (!block) return;

        const dayInfo = THIRTY_DAY_SCHEDULE.find(d => d.day === this.selectedDayNumber) || THIRTY_DAY_SCHEDULE[0];
        let contentHtml = '';

        let resourcesHtml = block.resources && block.resources.length > 0 ? `
            <div class="modal-section-badge"><i class="fas fa-link"></i> المصادر والروابط المباشرة للتاسك</div>
            <div class="modal-resources-list">
                ${block.resources.map(r => `
                    <a href="${r.url}" target="_blank" class="resource-link-chip">
                        <i class="fas fa-external-link-alt"></i> ${r.name}
                    </a>
                `).join('')}
            </div>
        ` : '';



        if (blockId === 'block-1') {
            modalTitle.innerText = `تعليمات التاسك: Block 1 — Speaking Practice (اليوم ${dayInfo.day})`;
            contentHtml = `
                <div class="modal-section-badge"><i class="fas fa-bullhorn"></i> موضوع المحادثة المخصص لليوم ${dayInfo.day}</div>
                <div class="modal-info-box">
                    <p style="font-size:14px; font-weight:700; color:var(--accent-cyan);">"${dayInfo.dailyTopic || dayInfo.aiTopic}"</p>
                </div>

                <div class="modal-section-badge"><i class="fas fa-clock"></i> تقسيم الـ 25 دقيقة (Minute-by-Minute Breakdown)</div>
                <div class="modal-info-box" style="font-size:12px; line-height:1.6;">
                    <p>● <strong>الدقيقة 1–2:</strong> حدد الدور والموضوع. موضوع اليوم: <em>"${dayInfo.dailyTopic || dayInfo.aiTopic}"</em>.</p>
                    <p>● <strong>الدقيقة 2–20:</strong> تكلم متواصل بدون توقف للتصحيح في منتصف الجملة. أنقذ الفكرة واكمل للآخر!</p>
                    <p>● <strong>الدقيقة 20–25:</strong> اطلب تصحيح أهم 3 أخطاء متكررة فقط واكتبها في كشكول الغلطات.</p>
                </div>

                <div class="modal-section-badge"><i class="fas fa-quote-right"></i> الجملة الافتتاحية للمحادثة (Opening Line Prompt)</div>
                <div class="modal-info-box" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); font-size:11px;">
                    <p style="color:var(--accent-purple); font-weight:bold; font-family:monospace; margin-bottom:4px;">Opening line to give your partner/AI:</p>
                    <p style="font-style:italic; font-family:monospace;">"Let me speak for a few minutes without interrupting. At the end, tell me the 3 most important corrections — not every mistake, just the ones that matter most for sounding natural."</p>
                    <button class="btn-chip" style="margin-top:6px;" onclick="window.app.copyToClipboard('Let me speak for a few minutes without interrupting. At the end, tell me the 3 most important corrections — not every mistake, just the ones that matter most for sounding natural.')"><i class="fas fa-copy"></i> نسخ الجملة الافتتاحية</button>
                </div>

                <div class="modal-section-badge"><i class="fas fa-lightbulb"></i> نصيحة الأداء العالي (Tips & Automaticity)</div>
                <div class="modal-info-box" style="font-size:11px; color:var(--text-muted);">
                    <p>💡 اطلب متابعة 2-3 أخطاء رئيسية فقط. التصحيح المكثف الشامل يثبط العزيمة ولا يرسخ التعلم (Noticing Hypothesis).</p>
                </div>

                ${resourcesHtml}

                <div class="modal-timer-shortcut" style="margin-top:16px;">
                    <button class="btn btn-primary btn-block" onclick="window.app.startTimerForBlock(25, 'Speaking Practice (Day ${dayInfo.day})', 'block-1')">
                        <i class="fas fa-play-circle"></i> ابدأ مؤقت الـ 25 دقيقة للتاسك
                    </button>
                </div>
            `;
        } else if (blockId === 'block-3') {
            modalTitle.innerText = `تعليمات التاسك: Block 3 — ${dayInfo.promptType} (${dayInfo.dayOfWeek})`;
            const schedItem = block.instructions.schedule.find(s => s.dayId === dayInfo.dayOfWeek) || block.instructions.schedule[0];

            contentHtml = `
                <div class="modal-section-badge"><i class="fas fa-bullseye"></i> نشاط التدوير لليوم (${schedItem.dayName})</div>
                <div class="modal-info-box">
                    <p style="font-size:14px; font-weight:700; color:var(--accent-gold);">${schedItem.activityTitle}</p>
                    <p style="margin-top:4px; font-size:12px; color:var(--accent-cyan);"><strong>الهدف:</strong> ${schedItem.purpose}</p>
                </div>

                <div class="modal-section-badge"><i class="fas fa-tasks"></i> طريقة التنفيذ الدقيقة (Method)</div>
                <div class="modal-info-box" style="font-size:12px; line-height:1.6;">
                    <p>${schedItem.method}</p>
                    ${schedItem.resLink ? `<p style="margin-top:8px;"><a href="${schedItem.resLink}" target="_blank" class="resource-link-chip"><i class="fas fa-external-link-alt"></i> فتح رابط المصدر المستهدف (${schedItem.activityTitle.split('—')[0]})</a></p>` : ''}
                </div>

                ${resourcesHtml}

                <div class="modal-timer-shortcut" style="margin-top:16px;">
                    <button class="btn btn-primary btn-block" onclick="window.app.startTimerForBlock(15, '${dayInfo.promptType}', 'block-3')">
                        <i class="fas fa-play-circle"></i> ابدأ مؤقت الـ 15 دقيقة للتاسك
                    </button>
                </div>
            `;
        } else {
            modalTitle.innerText = `تعليمات التاسك: ${block.title}`;

            contentHtml = `
                <div class="modal-section-badge"><i class="fas fa-lightbulb"></i> الأساس العلمي وتكتيك الأداء</div>
                <div class="modal-info-box">
                    <p>${block.instructions.why}</p>
                </div>

                ${resourcesHtml}

                <div class="modal-timer-shortcut" style="margin-top:20px;">
                    <button class="btn btn-primary btn-block" onclick="window.app.startTimerForBlock(${block.minutes}, '${block.title}', '${block.id}')">
                        <i class="fas fa-play-circle"></i> تشغيل مؤقت الـ ${block.minutes} دقيقة للتاسك
                    </button>
                </div>
            `;
        }

        modalBody.innerHTML = contentHtml;
        modal.style.display = 'flex';

    }

    closeModal() {
        const modal = document.getElementById('task-modal');
        if (modal) modal.style.display = 'none';
    }

    startTimerForBlock(minutes, name, blockId) {
        this.closeModal();
        this.switchTab('timer');
        appTimer.setDuration(minutes, name, blockId);
        appTimer.start();
        this.showToast(`⏱️ تم بدء مؤقت ${minutes} دقيقة لـ ${name}`);
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('📋 تم نسخ الأمر إلى الحافظة بنجاح!');
        }).catch(err => {
            console.error('Failed to copy', err);
        });
    }

    triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    }

    showToast(message) {
        let toast = document.getElementById('app-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'app-toast';
            toast.className = 'app-toast';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    switchTab(tabId) {
        if (window.audioEngine) audioEngine.playClick();
        const views = document.querySelectorAll('.tab-view');
        const buttons = document.querySelectorAll('.nav-item-btn');

        views.forEach(v => v.classList.remove('active'));
        buttons.forEach(b => b.classList.remove('active'));

        const targetView = document.getElementById(`view-${tabId}`);
        const targetBtn = document.getElementById(`nav-btn-${tabId}`);

        if (targetView) targetView.classList.add('active');
        if (targetBtn) targetBtn.classList.add('active');
    }



    checkBadges() {
        if (this.state.completedDays.length >= 1 && !this.state.unlockedBadges.includes('day_1')) {
            this.state.unlockedBadges.push('day_1');
        }
        if (this.state.completedDays.length >= 7 && !this.state.unlockedBadges.includes('week_1')) {
            this.state.unlockedBadges.push('week_1');
            this.showToast('🏆 مبروك! فتحت شارة أسبوع الحماس (7 أيام)!');
        }
        if (this.state.completedDays.length >= 14 && !this.state.unlockedBadges.includes('week_2')) {
            this.state.unlockedBadges.push('week_2');
            this.showToast('⚡ مبروك! وصلت لمنتصف الطريق (14 يوم)!');
        }
        if (this.state.completedDays.length >= 30 && !this.state.unlockedBadges.includes('checkpoint_30')) {
            this.state.unlockedBadges.push('checkpoint_30');
            this.showToast('👑 مبروك! أصبحت بطل خطة عبدول ووصلت لمستوى C1!');
        }
        this.saveState();
        this.renderBadges();
    }

    renderBadges() {
        const container = document.getElementById('badges-grid');
        if (!container) return;

        container.innerHTML = ROADMAP_DATA.achievements.map(b => {
            const isUnlocked = this.state.unlockedBadges.includes(b.id);
            return `
                <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="badge-icon"><i class="fas fa-${b.icon}"></i></div>
                    <div class="badge-info">
                        <h4>${b.title}</h4>
                        <p>${b.desc}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderVocabList() {
        const container = document.getElementById('vocab-cards-list');
        if (!container) return;

        if (vocabManager.cards.length === 0) {
            container.innerHTML = '<p class="empty-state">مستودع المهارات فارغ. اكتسب أول تعويذة الآن!</p>';
            return;
        }

        const unlearnedCards = vocabManager.cards.filter(c => c.bucket === 'unlearned');
        const neutralCards = vocabManager.cards.filter(c => c.bucket === 'neutral');
        const learnedCards = vocabManager.cards.filter(c => c.bucket === 'learned');

        container.innerHTML = `
            <div class="vocab-bucket-section">
                <h4 class="bucket-title unlearned"><i class="fas fa-exclamation-circle"></i> تعاويذ تحت المراجعة [${unlearnedCards.length}]</h4>
                ${unlearnedCards.map(c => this.renderVocabCardHtml(c)).join('') || '<p class="empty-state">لا يوجد مهارات هنا</p>'}
            </div>

            <div class="vocab-bucket-section">
                <h4 class="bucket-title neutral"><i class="fas fa-minus-circle"></i> مهارات متوسطة [${neutralCards.length}]</h4>
                ${neutralCards.map(c => this.renderVocabCardHtml(c)).join('') || '<p class="empty-state">لا يوجد مهارات هنا</p>'}
            </div>

            <div class="vocab-bucket-section">
                <h4 class="bucket-title learned"><i class="fas fa-check-circle"></i> مهارات متقنة [${learnedCards.length}]</h4>
                ${learnedCards.map(c => this.renderVocabCardHtml(c)).join('') || '<p class="empty-state">لا يوجد مهارات هنا</p>'}
            </div>
        `;
    }

    renderVocabCardHtml(c) {
        return `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <h3>${c.word}</h3>
                    <button class="btn-delete" onclick="window.app.deleteVocabCard('${c.id}')"><i class="fas fa-trash"></i></button>
                </div>
                <p class="vocab-def" style="margin-top:6px;"><strong>المعنى بالعربي:</strong> ${c.arabicMeaning}</p>
                <p class="vocab-sentence" style="color:var(--accent-emerald);"><strong>الجملة من إنشائي (My Own Sentence):</strong> "${c.mySentence}"</p>
                
                <div class="srs-rating-row" style="margin-top:10px;">
                    <span style="font-size:11px; color:var(--text-muted);">تقييم الفهم:</span>
                    <div class="srs-rating-btns">
                        <button class="btn-srs fail" onclick="window.app.rateVocab('${c.id}', 'fail')">لم أفهمها ❌</button>
                        <button class="btn-srs neutral" onclick="window.app.rateVocab('${c.id}', 'neutral')">نص نص 🟡</button>
                        <button class="btn-srs easy" onclick="window.app.rateVocab('${c.id}', 'easy')">فهمتها ✅</button>
                    </div>
                </div>
            </div>
        `;
    }

    rateVocab(id, rating) {
        vocabManager.rateCard(id, rating);
        this.renderVocabList();
        this.showToast('✅ تم تحديث تصنيف الكلمة بنجاح!');
    }

    addNewVocabCard(event) {
        event.preventDefault();
        const word = document.getElementById('v-word').value;
        const arabicMeaning = document.getElementById('v-meaning').value;
        const mySentence = document.getElementById('v-mysentence').value;

        if (!word || !arabicMeaning || !mySentence) {
            this.showToast('⚠️ يرجى ملء الكلمة والمعنى وجملتك الخاصة (الحقول الإجبارية)');
            return;
        }

        const cardData = {
            word,
            arabicMeaning,
            mySentence
        };

        vocabManager.addCard(cardData);
        document.getElementById('vocab-form').reset();
        this.renderVocabList();
        this.checkBadges();
        this.showToast('✅ تم إضافة التعويذة بنجاح!');
    }

    deleteVocabCard(id) {
        vocabManager.deleteCard(id);
        this.renderVocabList();
        this.showToast('🗑️ تم حذف الكلمة');
    }

    exportAnkiCards() {
        const txt = vocabManager.exportToAnkiTxt();
        if (!txt) {
            this.showToast('⚠️ لا يوجد كلمات للتصدير');
            return;
        }
        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'b2_c1_abdo_plan_anki_deck.txt';
        a.click();
        this.showToast('📥 تم تحميل ملف أنكي جاهز للاستيراد!');
    }

    renderErrorLogList() {
        const container = document.getElementById('error-log-list');
        if (!container) return;

        if (errorLogManager.errors.length === 0) {
            container.innerHTML = '<p class="empty-state">سجل نقاط الضعف فارغ حالياً. درعك نظيف!</p>';
            return;
        }

        container.innerHTML = errorLogManager.errors.map(e => {
            return `
            <div class="error-log-card">
                <div class="error-log-header" style="justify-content:flex-end;">
                    <button class="btn-delete" onclick="window.app.deleteErrorLog('${e.id}')"><i class="fas fa-trash"></i></button>
                </div>
                <div class="error-comparison">
                    <p class="wrong-line"><i class="fas fa-times-circle"></i> ❌ <span>${e.wrongSentence}</span></p>
                    <p class="correct-line"><i class="fas fa-check-circle"></i> ✅ <span>${e.correctSentence}</span></p>
                </div>
                ${e.note ? `<p class="error-note">💡 <strong>ملاحظة التعديل:</strong> ${e.note}</p>` : ''}
            </div>
        `}).join('');
    }

    addNewErrorLog(event) {
        event.preventDefault();
        const wrong = document.getElementById('err-wrong').value;
        const correct = document.getElementById('err-correct').value;
        const note = document.getElementById('err-note').value;

        if (!wrong || !correct) {
            this.showToast('⚠️ يرجى كتابة الجملة الخاطئة والجملة المصححة');
            return;
        }

        errorLogManager.addError(wrong, correct, note);
        document.getElementById('error-log-form').reset();
        this.renderErrorLogList();
        this.checkBadges();
        this.showToast('✅ تم تسجيل الخطأ بنجاح!');
    }

    addBulkErrorLog(event) {
        event.preventDefault();
        const bulkText = document.getElementById('err-bulk-text').value;
        if (!bulkText) {
            this.showToast('⚠️ يرجى لصق النص الكامل للأخطاء');
            return;
        }

        const count = errorLogManager.parseAndAddBulkText(bulkText);
        document.getElementById('error-bulk-form').reset();
        this.renderErrorLogList();
        this.checkBadges();
        this.showToast(`✅ تم استخراج وحفظ ${count} أخطاء فوراً!⚡`);
    }

    deleteErrorLog(id) {
        errorLogManager.deleteError(id);
        this.renderErrorLogList();
        this.showToast('🗑️ تم حذف السجل');
    }

    bindEvents() {
        appTimer.init('timer-display', 'timer-progress-ring', 'timer-block-name');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new RoadmapApp();
    window.app.init();
});

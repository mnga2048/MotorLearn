// 自测练习模块
const Quiz = {
  STORAGE_KEY: 'motorlearn_quiz_results',

  getResults() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  // 统一取出一道题的答题记录：兼容旧格式(布尔)和新格式({selected,correct})
  // 返回 null(未答) / { selected, correct }
  _getResultEntry(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === 'boolean') return { selected: -1, correct: v };
    if (typeof v === 'object') return { selected: v.selected, correct: !!v.correct };
    return null;
  },

  saveResult(sectionId, questionIdx, correct) {
    const data = this.getResults();
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][questionIdx] = correct;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  render(sectionId, quizData) {
    if (!quizData || quizData.length === 0) return '';
    const rawResults = this.getResults()[sectionId] || {};
    // 标准化所有记录(兼容旧布尔格式)
    const results = {};
    let answered = 0, correctCount = 0;
    Object.keys(rawResults).forEach(k => {
      const e = this._getResultEntry(rawResults[k]);
      if (e) { results[k] = e; answered++; if (e.correct) correctCount++; }
    });

    return `
      <div class="mt-8 pt-6 border-t" style="border-color:var(--border)">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" style="color:var(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          自测练习
          <span class="quiz-score ${answered === 0 ? '' : (correctCount / answered >= 0.6 ? 'pass' : 'fail')} ml-auto" style="${answered === 0 ? 'display:none' : ''}">${correctCount}/${answered}</span>
        </h2>
        <div class="space-y-4">
          ${quizData.map((q, qi) => this.renderQuestion(sectionId, qi, q, results[qi])).join('')}
        </div>
      </div>`;
  },

  renderQuestion(sectionId, qi, q, prevResult) {
    const letterLabels = ['A', 'B', 'C', 'D'];
    const answered = prevResult !== null && prevResult !== undefined;
    return `
      <div class="quiz-card">
        <div class="quiz-question">${qi + 1}. ${q.question}</div>
        <div class="space-y-2">
          ${q.options.map((opt, oi) => {
            let cls = 'quiz-option';
            if (answered) {
              cls += ' disabled';
              if (oi === q.answer) cls += ' correct';
              else if (prevResult.selected === oi && oi !== q.answer) cls += ' wrong';
            }
            return `<div class="${cls}" onclick="Quiz.answer('${sectionId}',${qi},${oi},${q.answer})">
              <span class="font-medium" style="min-width:1.5rem">${letterLabels[oi]}</span>
              <span>${opt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="quiz-explanation ${answered ? 'visible' : ''}" id="quiz-exp-${sectionId}-${qi}">
          ${q.explanation || ''}
        </div>
      </div>`;
  },

  answer(sectionId, qi, selected, correct) {
    const data = this.getResults();
    if (data[sectionId]?.[qi]?.selected !== undefined) return; // 已答过
    const isCorrect = selected === correct;
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][qi] = { selected, correct: isCorrect };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    // 行业页(industry-*)是手风琴内测验，没有独立路由——直接就地更新DOM，
    // 不触发整页重渲染(否则手风琴会折叠、丢失展开状态)
    if (sectionId.startsWith('industry-')) {
      this.applyResultInline(sectionId, qi, selected, isCorrect);
      this.updateScoreInline(sectionId);
      return;
    }
    // 其他详情页：重新渲染整页（电机页 sectionId 形如 'motor-stepper'，需剥离前缀）
    const navTarget = sectionId.startsWith('motor-') ? sectionId.slice(6) : sectionId;
    navigateTo(navTarget);
  },

  // 行业页测验：就地更新单个题目的选项样式和解析显示
  applyResultInline(sectionId, qi, selected, isCorrect) {
    const correctIdx = (QuizData[sectionId]?.[qi]?.answer);
    const card = document.querySelector(`[onclick*="Quiz.answer('${sectionId}',${qi}"]`)?.closest('.quiz-card');
    if (!card) return;
    card.querySelectorAll('.quiz-option').forEach((opt, oi) => {
      opt.classList.add('disabled');
      if (oi === correctIdx) opt.classList.add('correct');
      else if (oi === selected) opt.classList.add('wrong');
    });
    const exp = card.querySelector('.quiz-explanation');
    if (exp) exp.classList.add('visible');
  },

  // 行业页测验：更新该组测验的得分显示
  updateScoreInline(sectionId) {
    const data = this.getResults()[sectionId] || {};
    const answered = Object.keys(data).length;
    const correctCount = Object.values(data).filter(v => v.correct).length;
    // 找到该测验的标题区(同一 sectionId 的 quiz-card 的前一个标题)
    const firstCard = document.querySelector(`[onclick*="Quiz.answer('${sectionId}',0,"]`);
    const scoreEl = firstCard?.closest('.mt-8')?.querySelector('.quiz-score');
    if (scoreEl) {
      scoreEl.textContent = `${correctCount}/${answered}`;
      scoreEl.classList.toggle('pass', correctCount / answered >= 0.6);
      scoreEl.classList.toggle('fail', correctCount / answered < 0.6);
      scoreEl.style.display = '';
    }
  },
};

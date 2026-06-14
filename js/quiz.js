// 自测练习模块
const Quiz = {
  STORAGE_KEY: 'motorlearn_quiz_results',

  getResults() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  saveResult(sectionId, questionIdx, correct) {
    const data = this.getResults();
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][questionIdx] = correct;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  render(sectionId, quizData) {
    if (!quizData || quizData.length === 0) return '';
    const results = this.getResults()[sectionId] || {};
    const answered = Object.keys(results).length;
    const correctCount = Object.values(results).filter(v => v).length;

    return `
      <div class="mt-8 pt-6 border-t" style="border-color:var(--border)">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" style="color:var(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          自测练习
          ${answered > 0 ? `<span class="quiz-score ${correctCount / answered >= 0.6 ? 'pass' : 'fail'} ml-auto">${correctCount}/${answered}</span>` : ''}
        </h2>
        <div class="space-y-4">
          ${quizData.map((q, qi) => this.renderQuestion(sectionId, qi, q, results[qi])).join('')}
        </div>
      </div>`;
  },

  renderQuestion(sectionId, qi, q, prevResult) {
    const letterLabels = ['A', 'B', 'C', 'D'];
    const answered = prevResult !== undefined;
    return `
      <div class="quiz-card">
        <div class="quiz-question">${qi + 1}. ${q.question}</div>
        <div class="space-y-2">
          ${q.options.map((opt, oi) => {
            let cls = 'quiz-option';
            if (answered) {
              cls += ' disabled';
              if (oi === q.answer) cls += ' correct';
              else if (prevResult !== undefined && prevResult.selected === oi && oi !== q.answer) cls += ' wrong';
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
    const results = this.getResults();
    if (results[sectionId]?.[qi] !== undefined) return; // 已答过
    const isCorrect = selected === correct;
    this.saveResult(sectionId, qi, isCorrect);
    // 存储选择用于显示
    const data = this.getResults();
    if (!data[sectionId]) data[sectionId] = {};
    data[sectionId][qi] = { selected, correct: isCorrect };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    // 重新渲染详情页
    // 注意：电机页的 sectionId 形如 'motor-stepper'，但路由 key 是 'stepper'
    // 需剥离 'motor-' 前缀，否则 navigateTo 找不到页面会回退到首页
    const navTarget = sectionId.startsWith('motor-') ? sectionId.slice(6) : sectionId;
    navigateTo(navTarget);
  },
};

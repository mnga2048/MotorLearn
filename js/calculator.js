// 公式计算器模块
const Calculator = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = MotorData.calculators.map((calc, i) => `
      <div class="knowledge-card" id="calc-${calc.id}">
        <h3>${calc.title}</h3>
        <div class="formula-block text-sm my-3">${calc.formula}</div>
        <div class="calc-group">
          ${calc.fields.map(f => f.options ? `
            <div class="calc-field">
              <label>${f.label}</label>
              <select id="calc-${calc.id}-${f.id}" onchange="Calculator.compute('${calc.id}')">
                ${f.options.map(o => `<option value="${o}"${o === f.default ? ' selected' : ''}>${o}</option>`).join('')}
              </select>
            </div>
          ` : `
            <div class="calc-field">
              <label>${f.label}</label>
              <input type="number" id="calc-${calc.id}-${f.id}" value="${f.default}" step="any" oninput="Calculator.compute('${calc.id}')">
            </div>
          `).join('')}
        </div>
        <div class="calc-result" id="calc-${calc.id}-result">
          <span class="text-gray-500 text-sm">结果：</span>
          <span class="text-xl font-bold text-blue-600 dark:text-blue-400" id="calc-${calc.id}-value">-</span>
          <span class="text-gray-400 ml-1">${calc.unit}</span>
        </div>
      </div>
    `).join('');
    // 初始计算
    MotorData.calculators.forEach(c => this.compute(c.id));
  },

  compute(calcId) {
    const calc = MotorData.calculators.find(c => c.id === calcId);
    if (!calc) return;
    const values = {};
    calc.fields.forEach(f => {
      const el = document.getElementById(`calc-${calcId}-${f.id}`);
      values[f.id] = f.options ? (el?.value || f.options[0]) : (parseFloat(el?.value) || 0);
    });
    const result = calc.calc(values);
    const el = document.getElementById(`calc-${calcId}-value`);
    if (el) el.textContent = result;
  },
};

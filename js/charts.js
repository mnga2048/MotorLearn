// ECharts 图表模块
const Charts = {
  renderKnowledgeGraph(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof echarts === 'undefined') return;

    const chart = echarts.init(container);
    const nodes = [
      { name: '电磁学基础', x: 200, y: 60, category: 0, symbolSize: 40 },
      { name: '电机分类', x: 400, y: 60, category: 0, symbolSize: 35 },
      { name: '基本参数', x: 600, y: 60, category: 0, symbolSize: 35 },
      { name: '驱动基础(H桥/PWM)', x: 800, y: 60, category: 0, symbolSize: 40 },
      { name: 'PID控制', x: 200, y: 200, category: 1, symbolSize: 40 },
      { name: 'FOC控制', x: 400, y: 200, category: 1, symbolSize: 45 },
      { name: '坐标变换', x: 600, y: 200, category: 1, symbolSize: 35 },
      { name: '无感控制', x: 800, y: 200, category: 1, symbolSize: 35 },
      { name: '有刷直流电机', x: 150, y: 340, category: 2, symbolSize: 40 },
      { name: '无刷直流电机', x: 350, y: 340, category: 2, symbolSize: 50 },
      { name: '步进电机', x: 550, y: 340, category: 2, symbolSize: 40 },
      { name: '伺服电机', x: 750, y: 340, category: 2, symbolSize: 45 },
      { name: '舵机', x: 950, y: 340, category: 2, symbolSize: 35 },
    ];

    const links = [
      { source: '电磁学基础', target: '电机分类' },
      { source: '电机分类', target: '基本参数' },
      { source: '基本参数', target: '驱动基础(H桥/PWM)' },
      { source: '驱动基础(H桥/PWM)', target: '有刷直流电机' },
      { source: '电磁学基础', target: 'PID控制' },
      { source: 'PID控制', target: 'FOC控制' },
      { source: 'FOC控制', target: '坐标变换' },
      { source: '坐标变换', target: '无感控制' },
      { source: 'FOC控制', target: '无刷直流电机' },
      { source: 'FOC控制', target: '伺服电机' },
      { source: '驱动基础(H桥/PWM)', target: '步进电机' },
      { source: '有刷直流电机', target: '舵机' },
      { source: '伺服电机', target: '舵机' },
      { source: '无感控制', target: '无刷直流电机' },
    ];

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#d1d5db' : '#374151';
    const lineColor = isDark ? '#4b5563' : '#9ca3af';

    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'graph',
        layout: 'none',
        symbol: 'circle',
        label: {
          show: true,
          fontSize: 11,
          color: textColor,
          position: 'bottom',
          distance: 8,
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.15)',
        },
        lineStyle: { color: lineColor, curveness: 0.1, width: 1.5 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 3 } },
        categories: [
          { name: '入门', itemStyle: { color: '#f59e0b' } },
          { name: '进阶', itemStyle: { color: '#3b82f6' } },
          { name: '电机类型', itemStyle: { color: '#10b981' } },
        ],
        nodes,
        links,
        roam: true,
        draggable: true,
      }],
    });

    // 响应式
    window.addEventListener('resize', () => chart.resize());
    return chart;
  },

  renderProgressChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof echarts === 'undefined') return;

    const stats = Progress.getStats();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const chart = echarts.init(container);

    chart.setOption({
      title: { text: '学习进度概览', left: 'center', textStyle: { color: isDark ? '#d1d5db' : '#374151', fontSize: 16 } },
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { bottom: '5%', textStyle: { color: isDark ? '#9ca3af' : '#6b7280' } },
      series: [{
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: isDark ? '#111827' : '#fff', borderWidth: 3 },
        label: { show: true, color: isDark ? '#d1d5db' : '#374151' },
        data: [
          { value: stats.completed, name: '已完成', itemStyle: { color: '#10b981' } },
          { value: stats.learning, name: '学习中', itemStyle: { color: '#f59e0b' } },
          { value: stats.pending, name: '未开始', itemStyle: { color: '#e5e7eb' } },
        ],
      }],
    });

    window.addEventListener('resize', () => chart.resize());
    return chart;
  },

  // 通用调度：扫描容器内所有 [data-chart] 元素并按类型渲染
  // content 里写 <div data-chart="pwm" class="chart-container"></div>
  renderAll(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof echarts === 'undefined') return;
    container.querySelectorAll('[data-chart]').forEach(el => {
      if (el.dataset.init) return;          // 防重复渲染
      el.dataset.init = '1';
      const type = el.dataset.chart;
      const fn = this._charts[type];
      if (fn) fn(el);
    });
  },

  // ====== 波形图渲染器 ======
  _charts: {
    // PWM 占空比波形（25%/50%/75% 三组对比）
    pwm(el) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const c = (isDark ? '#e0dcd4' : '#2a2518');
      // 生成方波数据：每个周期100点，占空比d
      function square(duty, cycles) {
        const pts = [];
        for (let i = 0; i < cycles * 100; i++) {
          const phase = i % 100;
          pts.push([i / 10, phase < duty * 100 ? 1 : 0]);
        }
        return pts;
      }
      echarts.init(el).setOption({
        backgroundColor: 'transparent',
        grid: { left: 50, right: 20, top: 40, bottom: 40 },
        legend: { top: 5, textStyle: { color: c } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'value', name: '时间', nameTextStyle: { color: c }, axisLabel: { color: c }, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        yAxis: { type: 'value', name: '电压', nameTextStyle: { color: c }, axisLabel: { color: c, formatter: '{value}·Vcc' }, min: -0.2, max: 1.2, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        series: [
          { name: '25%占空比', type: 'line', data: square(0.25, 4), symbol: 'none', step: 'end', lineStyle: { width: 2 }, itemStyle: { color: '#c2883e' } },
          { name: '50%占空比', type: 'line', data: square(0.50, 4), symbol: 'none', step: 'end', lineStyle: { width: 2 }, itemStyle: { color: '#4a8c5c' } },
          { name: '75%占空比', type: 'line', data: square(0.75, 4), symbol: 'none', step: 'end', lineStyle: { width: 2 }, itemStyle: { color: '#3b82f6' } },
        ],
      });
      window.addEventListener('resize', () => echarts.getInstanceByDom(el)?.resize());
    },

    // 霍尔三路波形（Ha/Hb/Hc 互错120°）
    hall(el) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const c = (isDark ? '#e0dcd4' : '#2a2518');
      // 三路方波，周期360，相位差120
      function hallWave(offset) {
        const pts = [];
        for (let i = 0; i <= 720; i += 5) {
          const phase = ((i + offset) % 360);
          pts.push([i, phase < 180 ? 1 : 0]);
        }
        return pts;
      }
      echarts.init(el).setOption({
        backgroundColor: 'transparent',
        grid: { left: 50, right: 20, top: 30, bottom: 50 },
        legend: { top: 0, textStyle: { color: c } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'value', name: '电角度(°)', nameTextStyle: { color: c }, axisLabel: { color: c }, min: 0, max: 720, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        yAxis: { type: 'value', axisLabel: { color: c, formatter: v => v ? '高' : '低' }, min: -0.3, max: 1.3, splitLine: { show: false } },
        series: [
          { name: 'Ha', type: 'line', data: hallWave(0), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#3b82f6' } },
          { name: 'Hb', type: 'line', data: hallWave(120), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#4a8c5c' } },
          { name: 'Hc', type: 'line', data: hallWave(240), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#d97706' } },
        ],
      });
      window.addEventListener('resize', () => echarts.getInstanceByDom(el)?.resize());
    },

    // 编码器 AB 正交波形
    encoder(el) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const c = (isDark ? '#e0dcd4' : '#2a2518');
      // A相周期100，B相滞后50（90°）
      function quad(offset) {
        const pts = [];
        for (let i = 0; i <= 400; i++) {
          const phase = (i + offset) % 100;
          pts.push([i, phase < 50 ? 1 : 0]);
        }
        return pts;
      }
      // 4倍频计数点标记
      const markPoints = [];
      [0, 50, 100, 150, 200, 250, 300, 350].forEach(x => {
        markPoints.push({ coord: [x, 1.05], symbol: 'circle', symbolSize: 6, itemStyle: { color: '#c0392b' } });
      });
      echarts.init(el).setOption({
        backgroundColor: 'transparent',
        grid: { left: 50, right: 20, top: 40, bottom: 50 },
        legend: { top: 5, textStyle: { color: c } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'value', name: '位置(计数值)', nameTextStyle: { color: c }, axisLabel: { color: c }, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        yAxis: { type: 'value', axisLabel: { color: c, formatter: v => v ? '高' : '低' }, min: -0.3, max: 1.3, splitLine: { show: false } },
        series: [
          { name: 'A相', type: 'line', data: quad(0), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#c2883e' }, markPoint: { data: markPoints } },
          { name: 'B相', type: 'line', data: quad(50), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#4a8c5c' } },
        ],
      });
      window.addEventListener('resize', () => echarts.getInstanceByDom(el)?.resize());
    },

    // 梯形/S曲线速度对比
    trajectory(el) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const c = (isDark ? '#e0dcd4' : '#2a2518');
      const N = 100, tAccel = 30, tCruise = 40, vMax = 1;
      // 梯形
      const trap = [];
      for (let i = 0; i <= N; i++) {
        let v;
        if (i < tAccel) v = vMax * i / tAccel;                  // 加速段
        else if (i < tAccel + tCruise) v = vMax;                // 匀速段
        else v = vMax * (N - i) / (N - tAccel - tCruise);       // 减速段
        trap.push([i, Math.max(0, v)]);
      }
      // S曲线（sigmoid过渡）
      const scurve = [];
      function sig(x) { return 1 / (1 + Math.exp(-6 * x)); }
      for (let i = 0; i <= N; i++) {
        let v;
        if (i < tAccel) v = vMax * sig(i / tAccel - 0.5);
        else if (i < tAccel + tCruise) v = vMax;
        else v = vMax * (1 - sig((i - tAccel - tCruise) / (N - tAccel - tCruise) - 0.5));
        scurve.push([i, Math.max(0, v)]);
      }
      echarts.init(el).setOption({
        backgroundColor: 'transparent',
        grid: { left: 50, right: 20, top: 40, bottom: 50 },
        legend: { top: 5, textStyle: { color: c } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'value', name: '时间', nameTextStyle: { color: c }, axisLabel: { color: c }, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        yAxis: { type: 'value', name: '速度', nameTextStyle: { color: c }, axisLabel: { color: c }, min: 0, max: 1.1, splitLine: { lineStyle: { color: isDark ? '#2a3050' : '#e8e0d4' } } },
        series: [
          { name: '梯形曲线', type: 'line', data: trap, symbol: 'none', lineStyle: { width: 2.5 }, itemStyle: { color: '#c2883e' } },
          { name: 'S曲线', type: 'line', data: scurve, symbol: 'none', lineStyle: { width: 2.5, type: 'dashed' }, itemStyle: { color: '#4a8c5c' } },
        ],
        markLine: { silent: true, symbol: 'none', lineStyle: { color: isDark ? '#4b5563' : '#9ca3af', type: 'dotted' }, data: [{ yAxis: 1 }] },
      });
      window.addEventListener('resize', () => echarts.getInstanceByDom(el)?.resize());
    },

    // H桥交互图：点击状态按钮，高亮导通MOS管+显示电流路径
    hbridge(el) {
      el.innerHTML = `
        <div style="text-align:center;margin-bottom:8px">
          <button class="hb-btn active" data-state="fwd">正转 (S1+S4)</button>
          <button class="hb-btn" data-state="rev">反转 (S2+S3)</button>
          <button class="hb-btn" data-state="brake">制动 (S2+S4)</button>
          <button class="hb-btn" data-state="coast">滑行 (全关)</button>
        </div>
        <svg viewBox="0 0 600 360" style="width:100%;max-width:560px;margin:0 auto;display:block;font-family:Consolas,monospace;font-size:15px">
          <defs><style>.hb-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:4px;stroke-linejoin:round}</style></defs>
          <line x1="60" y1="60" x2="540" y2="60" stroke="var(--text-secondary)" stroke-width="2.5"/>
          <line x1="60" y1="300" x2="540" y2="300" stroke="var(--text-secondary)" stroke-width="2.5"/>
          <text x="20" y="66" class="hb-lbl" fill="#c0392b" font-weight="bold">+V</text>
          <text x="14" y="306" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">GND</text>
          <line x1="170" y1="60" x2="170" y2="300" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="430" y1="60" x2="430" y2="300" stroke="var(--text)" stroke-width="1.8"/>
          <rect id="hb-s1" x="145" y="125" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5"/>
          <text x="158" y="156" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S1</text>
          <rect id="hb-s2" x="405" y="125" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5"/>
          <text x="418" y="156" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S2</text>
          <rect id="hb-s3" x="145" y="195" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5"/>
          <text x="158" y="226" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S3</text>
          <rect id="hb-s4" x="405" y="195" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5"/>
          <text x="418" y="226" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S4</text>
          <circle cx="300" cy="185" r="40" fill="var(--bg-card)" stroke="var(--text)" stroke-width="2.5"/>
          <text x="290" y="193" fill="var(--text)" font-size="20" font-weight="bold">M</text>
          <line x1="170" y1="150" x2="260" y2="170" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="170" y1="220" x2="260" y2="200" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="340" y1="170" x2="430" y2="150" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="340" y1="200" x2="430" y2="220" stroke="var(--text)" stroke-width="1.8"/>
          <path id="hb-flow" d="" fill="none" stroke="#c0392b" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
          <text id="hb-desc" x="300" y="338" text-anchor="middle" class="hb-lbl" fill="#c0392b" font-weight="bold" font-size="14"></text>
        </svg>`;
      // 内联按钮样式
      if (!document.getElementById('hb-style')) {
        const st = document.createElement('style');
        st.id = 'hb-style';
        st.textContent = '.hb-btn{margin:0 4px;padding:6px 14px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);font-size:13px;cursor:pointer;transition:all .15s}.hb-btn:hover{border-color:var(--primary);color:var(--primary)}.hb-btn.active{background:var(--primary);color:#fff;border-color:var(--primary)}';
        document.head.appendChild(st);
      }
      // 4种状态：哪些MOS导通 + 电流路径
      const states = {
        fwd:    { on: ['s1','s4'], path: 'M 300 60 L 170 60 L 170 125 M 170 175 L 260 180 M 340 185 L 430 200 M 430 245 L 430 300', desc: '正转：+V→S1→电机(左→右)→S4→GND' },
        rev:    { on: ['s2','s3'], path: 'M 300 60 L 430 60 L 430 125 M 430 175 L 340 180 M 260 185 L 170 200 M 170 245 L 170 300', desc: '反转：+V→S2→电机(右→左)→S3→GND' },
        brake:  { on: ['s2','s4'], path: 'M 430 175 L 430 195 M 340 200 L 260 200', desc: '制动：电机两端经S2、S4短路，反电动势形成反向电流制动' },
        coast:  { on: [], path: '', desc: '滑行：4个MOS全关断，电机断电自由旋转' },
      };
      const svg = el.querySelector('svg');
      function apply(state) {
        // 重置所有MOS为关断态
        ['s1','s2','s3','s4'].forEach(id => {
          const r = svg.querySelector('#hb-' + id);
          r.setAttribute('fill', 'none');
          r.setAttribute('stroke', 'var(--text-secondary)');
          r.setAttribute('stroke-width', '1.5');
          r.setAttribute('stroke-dasharray', '3,2');
        });
        // 高亮导通的MOS
        states[state].on.forEach(id => {
          const r = svg.querySelector('#hb-' + id);
          r.setAttribute('fill', 'rgba(192,57,43,0.15)');
          r.setAttribute('stroke', '#c0392b');
          r.setAttribute('stroke-width', '3');
          r.removeAttribute('stroke-dasharray');
        });
        svg.querySelector('#hb-flow').setAttribute('d', states[state].path);
        svg.querySelector('#hb-desc').textContent = states[state].desc;
      }
      el.querySelectorAll('.hb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          el.querySelectorAll('.hb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          apply(btn.dataset.state);
        });
      });
      apply('fwd');  // 默认显示正转
    },

    // 机械臂交互图：拖拽末端，实时显示θ1/θ2/x/y
    arm(el) {
      const L1 = 140, L2 = 110;
      const OX = 60, OY = 280;   // 原点(基座)在SVG里的像素坐标
      el.innerHTML = `
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-bottom:8px;flex-wrap:wrap;font-family:Consolas,monospace;font-size:14px">
          <span style="color:#d4940a">θ₁ = <b id="arm-th1">--</b></span>
          <span style="color:#d4940a">θ₂ = <b id="arm-th2">--</b></span>
          <span style="color:#c0392b">末端: x=<b id="arm-x">--</b>, y=<b id="arm-y">--</b></span>
          <span style="color:var(--text-secondary);font-size:12px">← 拖动红点</span>
        </div>
        <svg id="arm-svg" viewBox="0 0 480 320" style="width:100%;max-width:480px;margin:0 auto;display:block;touch-action:none">
          <defs>
            <marker id="arm-ax" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--text-secondary)"/></marker>
            <style>.arm-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:4px;stroke-linejoin:round}</style>
          </defs>
          <line x1="60" y1="280" x2="450" y2="280" stroke="var(--text-secondary)" stroke-width="1.5" marker-end="url(#arm-ax)"/>
          <line x1="60" y1="280" x2="60" y2="30" stroke="var(--text-secondary)" stroke-width="1.5" marker-end="url(#arm-ax)"/>
          <text x="456" y="296" class="arm-lbl" fill="var(--text-secondary)">x</text>
          <text x="40" y="28" class="arm-lbl" fill="var(--text-secondary)">y</text>
          <line id="arm-l1" x1="60" y1="280" stroke="#c2883e" stroke-width="7" stroke-linecap="round"/>
          <line id="arm-l2" stroke="#4a8c5c" stroke-width="7" stroke-linecap="round"/>
          <path id="arm-arc1" fill="none" stroke="#d4940a" stroke-width="2.5"/>
          <path id="arm-arc2" fill="none" stroke="#d4940a" stroke-width="2.5"/>
          <circle cx="60" cy="280" r="6" fill="var(--text)"/>
          <circle id="arm-j2" r="6" fill="var(--text)"/>
          <circle id="arm-end" r="10" fill="rgba(192,57,43,0.2)" stroke="#c0392b" stroke-width="3" style="cursor:grab"/>
          <line id="arm-proj-x" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line id="arm-proj-y" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4,3"/>
        </svg>`;
      const svg = el.querySelector('#arm-svg');
      const l1 = el.querySelector('#arm-l1');
      const l2 = el.querySelector('#arm-l2');
      const arc1 = el.querySelector('#arm-arc1');
      const arc2 = el.querySelector('#arm-arc2');
      const j2 = el.querySelector('#arm-j2');
      const end = el.querySelector('#arm-end');
      const projX = el.querySelector('#arm-proj-x');
      const projY = el.querySelector('#arm-proj-y');
      const th1El = el.querySelector('#arm-th1');
      const th2El = el.querySelector('#arm-th2');
      const xEl = el.querySelector('#arm-x');
      const yEl = el.querySelector('#arm-y');

      // 当前状态（用关节角表示，弧度）
      let th1 = 0.7, th2 = 0.5;

      function fk() {
        const j2x = OX + L1 * Math.cos(th1);
        const j2y = OY - L1 * Math.sin(th1);
        const ex = j2x + L2 * Math.cos(th1 + th2);
        const ey = j2y - L2 * Math.sin(th1 + th2);
        return { j2x, j2y, ex, ey };
      }

      function render() {
        const p = fk();
        l1.setAttribute('x2', p.j2x); l1.setAttribute('y2', p.j2y);
        l2.setAttribute('x1', p.j2x); l2.setAttribute('y1', p.j2y);
        l2.setAttribute('x2', p.ex); l2.setAttribute('y2', p.ey);
        j2.setAttribute('cx', p.j2x); j2.setAttribute('cy', p.j2y);
        end.setAttribute('cx', p.ex); end.setAttribute('cy', p.ey);
        projX.setAttribute('x1', p.ex); projX.setAttribute('y1', p.ey);
        projX.setAttribute('x2', p.ex); projX.setAttribute('y2', OY);
        projY.setAttribute('x1', p.ex); projY.setAttribute('y1', p.ey);
        projY.setAttribute('x2', OX); projY.setAttribute('y2', p.ey);
        // 角度弧（示意）
        const a1 = 28;
        arc1.setAttribute('d', `M ${OX + a1} ${OY} A ${a1} ${a1} 0 0 0 ${OX + a1*Math.cos(th1)} ${OY - a1*Math.sin(th1)}`);
        // 读数（角度转度，y轴方向：SVG向下为正，物理向上为正，故 y = OY - ey）
        th1El.textContent = (th1 * 180 / Math.PI).toFixed(1) + '°';
        th2El.textContent = (th2 * 180 / Math.PI).toFixed(1) + '°';
        xEl.textContent = (p.ex - OX).toFixed(0);
        yEl.textContent = (OY - p.ey).toFixed(0);
      }

      // 拖拽末端：根据鼠标位置反算关节角（逆运动学）
      let dragging = false;
      function getSVGPoint(evt) {
        const pt = svg.createSVGPoint();
        pt.x = evt.clientX; pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }
      function ikUpdate(evt) {
        const pt = getSVGPoint(evt);
        const x = pt.x - OX, y = OY - pt.y;   // 转为物理坐标系（y向上）
        const r = Math.sqrt(x*x + y*y);
        // 限制可达范围
        const rMax = L1 + L2 - 5, rMin = Math.abs(L1 - L2) + 5;
        const rr = Math.min(rMax, Math.max(rMin, r));
        const sx = x * rr / r, sy = y * rr / r;
        // 标准2-DOF IK（肘上）
        const c2 = (sx*sx + sy*sy - L1*L1 - L2*L2) / (2 * L1 * L2);
        th2 = Math.acos(Math.max(-1, Math.min(1, c2)));
        th1 = Math.atan2(sy, sx) - Math.atan2(L2 * Math.sin(th2), L1 + L2 * Math.cos(th2));
        render();
      }
      end.addEventListener('pointerdown', e => { dragging = true; end.style.cursor = 'grabbing'; e.preventDefault(); });
      window.addEventListener('pointermove', e => { if (dragging) ikUpdate(e); });
      window.addEventListener('pointerup', () => { dragging = false; end.style.cursor = 'grab'; });
      // 也允许点击SVG任意位置移动末端
      svg.addEventListener('click', e => { if (!dragging) ikUpdate(e); });

      render();
    },
  },
};

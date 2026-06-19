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
        <svg viewBox="0 0 600 380" style="width:100%;max-width:560px;margin:0 auto;display:block;font-family:Consolas,monospace;font-size:15px">
          <defs>
            <style>
              .hb-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:4px;stroke-linejoin:round}
              .hb-current{stroke-dasharray:10 6;animation:hb-flow 1s linear infinite}
              @keyframes hb-flow{to{stroke-dashoffset:-32}}
              @keyframes hb-cw{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
              @keyframes hb-ccw{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
              .hb-spin-cw{animation:hb-cw 1.2s linear infinite;transform-origin:300px 200px}
              .hb-spin-ccw{animation:hb-ccw 1.2s linear infinite;transform-origin:300px 200px}
            </style>
            <marker id="hb-arr" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#d97706"/>
            </marker>
          </defs>
          <!-- 上下电源轨 -->
          <line x1="60" y1="70" x2="540" y2="70" stroke="var(--text-secondary)" stroke-width="2.5"/>
          <line x1="60" y1="310" x2="540" y2="310" stroke="var(--text-secondary)" stroke-width="2.5"/>
          <text x="18" y="76" class="hb-lbl" fill="#c0392b" font-weight="bold">+V</text>
          <text x="12" y="316" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">GND</text>
          <!-- 左右竖线（H桥的两竖）-->
          <line x1="180" y1="70" x2="180" y2="310" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="420" y1="70" x2="420" y2="310" stroke="var(--text)" stroke-width="1.8"/>
          <!-- 4个MOS管 -->
          <rect id="hb-s1" x="155" y="130" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="168" y="161" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S1</text>
          <rect id="hb-s2" x="395" y="130" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="408" y="161" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S2</text>
          <rect id="hb-s3" x="155" y="200" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="168" y="231" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S3</text>
          <rect id="hb-s4" x="395" y="200" width="50" height="50" rx="5" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="408" y="231" class="hb-lbl" fill="var(--text-secondary)" font-weight="bold">S4</text>
          <!-- 电机：圆圈M + 内部旋转箭头（正反转可视化）-->
          <circle cx="300" cy="200" r="40" fill="var(--bg-card)" stroke="var(--text)" stroke-width="2.5"/>
          <text x="290" y="180" fill="var(--text)" font-size="18" font-weight="bold">M</text>
          <g id="hb-rotor">
            <path d="M 300 215 A 16 16 0 1 1 314 207" fill="none" stroke="var(--primary)" stroke-width="2.5" marker-end="url(#hb-arr)"/>
          </g>
          <!-- 连接线：MOS到电机 -->
          <line x1="180" y1="155" x2="260" y2="185" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="180" y1="225" x2="260" y2="215" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="340" y1="185" x2="420" y2="155" stroke="var(--text)" stroke-width="1.8"/>
          <line x1="340" y1="215" x2="420" y2="225" stroke="var(--text)" stroke-width="1.8"/>
          <!-- 电流路径（橙色流动动画）-->
          <path id="hb-flow" d="" fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round" opacity="0.9" marker-end="url(#hb-arr)"/>
          <!-- 说明文字 -->
          <text id="hb-desc" x="300" y="352" text-anchor="middle" class="hb-lbl" fill="#d97706" font-weight="bold" font-size="13"></text>
          <!-- 图例 -->
          <text x="300" y="372" text-anchor="middle" class="hb-lbl" fill="var(--text-secondary)" font-size="11">橙色流动线=电流路径 · 电机内旋转箭头=转向 · 红框MOS=导通 · 灰虚框=关断</text>
        </svg>`;
      // 按钮样式
      if (!document.getElementById('hb-style')) {
        const st = document.createElement('style');
        st.id = 'hb-style';
        st.textContent = '.hb-btn{margin:0 4px;padding:6px 14px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);font-size:13px;cursor:pointer;transition:all .15s}.hb-btn:hover{border-color:var(--primary);color:var(--primary)}.hb-btn.active{background:var(--primary);color:#fff;border-color:var(--primary)}';
        document.head.appendChild(st);
      }
      // 4种状态：导通的MOS + 电流路径SVG d属性 + 转向 + 说明
      // 坐标系：S1左上(155-205,130-180) S2右上(395-445,130-180) S3左下(155-205,200-250) S4右下(395-445,200-250)
      //        电机M(300,200,r40) 左接点(260,185/215) 右接点(340,185/215)
      const states = {
        fwd: {
          on: ['s1','s4'], spin: 'cw',
          // +V → 左竖线顶 → S1下沿 → 电机左 → 电机右 → S4上沿 → 右竖线底 → GND
          path: 'M 180 70 L 180 130 M 180 180 L 260 200 M 340 200 L 420 200 M 420 250 L 420 310',
          desc: '正转：+V→S1→电机(电流左→右)→S4→GND'
        },
        rev: {
          on: ['s2','s3'], spin: 'ccw',
          // +V → 右竖线顶 → S2下沿 → 电机右 → 电机左 → S3上沿 → 左竖线底 → GND
          path: 'M 420 70 L 420 130 M 420 180 L 340 200 M 260 200 L 180 200 M 180 250 L 180 310',
          desc: '反转：+V→S2→电机(电流右→左)→S3→GND'
        },
        brake: {
          on: ['s2','s4'], spin: 'none',
          // 电机两端经S2、S4短路，形成局部回路（反电动势制动）
          path: 'M 340 190 L 420 155 M 420 225 L 340 210',
          desc: '制动：电机两端经S2、S4短路，反电动势形成反向电流制动'
        },
        coast: {
          on: [], spin: 'none', path: '',
          desc: '滑行：4个MOS全关断，电机断电自由旋转（无电流）'
        },
      };
      const svg = el.querySelector('svg');
      const rotor = el.querySelector('#hb-rotor');
      function apply(state) {
        // 重置所有MOS为关断态
        ['s1','s2','s3','s4'].forEach(id => {
          const r = svg.querySelector('#hb-' + id);
          r.setAttribute('fill', 'none');
          r.setAttribute('stroke', 'var(--text-secondary)');
          r.setAttribute('stroke-width', '1.5');
          r.setAttribute('stroke-dasharray', '3,2');
          // MOS标签变灰
          const lbl = r.nextElementSibling;
          if (lbl && lbl.tagName === 'text') lbl.setAttribute('fill', 'var(--text-secondary)');
        });
        // 高亮导通的MOS（红框）
        states[state].on.forEach(id => {
          const r = svg.querySelector('#hb-' + id);
          r.setAttribute('fill', 'rgba(192,57,43,0.12)');
          r.setAttribute('stroke', '#c0392b');
          r.setAttribute('stroke-width', '3');
          r.removeAttribute('stroke-dasharray');
          const lbl = r.nextElementSibling;
          if (lbl && lbl.tagName === 'text') lbl.setAttribute('fill', '#c0392b');
        });
        // 电流路径
        const flow = svg.querySelector('#hb-flow');
        flow.setAttribute('d', states[state].path);
        flow.classList.toggle('hb-current', !!states[state].path);
        // 电机旋转动画
        rotor.classList.remove('hb-spin-cw', 'hb-spin-ccw');
        if (states[state].spin === 'cw') rotor.classList.add('hb-spin-cw');
        else if (states[state].spin === 'ccw') rotor.classList.add('hb-spin-ccw');
        // 说明文字
        svg.querySelector('#hb-desc').textContent = states[state].desc;
      }
      el.querySelectorAll('.hb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          el.querySelectorAll('.hb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          apply(btn.dataset.state);
        });
      });
      apply('fwd');
    },

    // FOC 坐标变换交互图：拖动θ角，观察 abc→αβ→dq 的变换过程
    foc(el) {
      // 电流幅值假设为1（归一化），便于观察几何关系
      // Ia = cos(θ), Ib = cos(θ-120°), Ic = cos(θ+120°)
      el.innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;justify-content:center;margin-bottom:10px;flex-wrap:wrap">
          <label style="font-size:13px;color:var(--text-secondary)">电角度 θ = <b id="foc-th" style="color:#d4940a;font-family:Consolas">0°</b></label>
          <input type="range" id="foc-slider" min="0" max="360" value="0" step="1" style="width:220px;accent-color:var(--primary)">
          <button id="foc-auto" style="padding:5px 14px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);font-size:13px;cursor:pointer">▶ 自动旋转</button>
        </div>
        <svg id="foc-svg" viewBox="0 0 820 300" style="width:100%;max-width:760px;margin:0 auto;display:block;touch-action:none">
          <defs>
            <marker id="foc-arr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="currentColor"/></marker>
            <style>.foc-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:3px;stroke-linejoin:round;font-family:Consolas,monospace}</style>
          </defs>
          <!-- 三个坐标系标题 -->
          <text x="140" y="24" text-anchor="middle" class="foc-lbl" fill="#c0392b" font-weight="bold" font-size="14">abc 三相 (旋转)</text>
          <text x="410" y="24" text-anchor="middle" class="foc-lbl" fill="#2e7d32" font-weight="bold" font-size="14">αβ 两相 (静止)</text>
          <text x="680" y="24" text-anchor="middle" class="foc-lbl" fill="#1565c0" font-weight="bold" font-size="14">dq 旋转 (直流!)</text>
          <!-- 左：abc 三相坐标系（中心140,160，R=70）-->
          <g id="foc-abc">
            <circle cx="140" cy="160" r="70" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="140" y1="160" x2="140" y2="80" stroke="var(--text-secondary)" stroke-width="1.2" marker-end="url(#foc-arr)" style="color:var(--text-secondary)"/>
            <line id="foc-va" x1="140" y1="160" stroke="#c0392b" stroke-width="3" marker-end="url(#foc-arr)" style="color:#c0392b"/>
            <line id="foc-vb" x1="140" y1="160" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#foc-arr)" style="color:#2e7d32" opacity="0.8"/>
            <line id="foc-vc" x1="140" y1="160" stroke="#8e44ad" stroke-width="2.5" marker-end="url(#foc-arr)" style="color:#8e44ad" opacity="0.8"/>
            <text id="foc-va-lbl" class="foc-lbl" fill="#c0392b" font-weight="bold" font-size="12">a</text>
            <text id="foc-vb-lbl" class="foc-lbl" fill="#2e7d32" font-weight="bold" font-size="12">b</text>
            <text id="foc-vc-lbl" class="foc-lbl" fill="#8e44ad" font-weight="bold" font-size="12">c</text>
          </g>
          <!-- 中：αβ 静止坐标系（中心410,160）-->
          <g id="foc-ab">
            <line x1="410" y1="160" x2="490" y2="160" stroke="var(--text-secondary)" stroke-width="1.2" marker-end="url(#foc-arr)" style="color:var(--text-secondary)"/>
            <line x1="410" y1="160" x2="410" y2="80" stroke="var(--text-secondary)" stroke-width="1.2" marker-end="url(#foc-arr)" style="color:var(--text-secondary)"/>
            <text x="496" y="164" class="foc-lbl" fill="var(--text-secondary)" font-size="11">α</text>
            <text x="416" y="78" class="foc-lbl" fill="var(--text-secondary)" font-size="11">β</text>
            <line id="foc-valpha" x1="410" y1="160" stroke="#2e7d32" stroke-width="3" marker-end="url(#foc-arr)" style="color:#2e7d32"/>
            <text id="foc-valpha-lbl" class="foc-lbl" fill="#2e7d32" font-weight="bold" font-size="12">Iα</text>
          </g>
          <!-- 右：dq 旋转坐标系（中心680,160）—— dq轴跟随θ转，但合成向量不动(直流) -->
          <g id="foc-dq">
            <circle cx="680" cy="160" r="70" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>
            <!-- dq 坐标轴：d轴方向固定(水平右)，q轴固定(垂直上)，因为合成向量在dq里是常量 -->
            <line id="foc-daxis" x1="680" y1="160" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="4,3" style="color:#1565c0" opacity="0.5"/>
            <line id="foc-qaxis" x1="680" y1="160" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="4,3" style="color:#1565c0" opacity="0.5"/>
            <text id="foc-d-lbl" class="foc-lbl" fill="#1565c0" font-size="11" opacity="0.7">d</text>
            <text id="foc-q-lbl" class="foc-lbl" fill="#1565c0" font-size="11" opacity="0.7">q</text>
            <!-- 合成向量：在dq里是常量(这里Id=0,Iq=1.5归一化)，画在q轴方向 -->
            <line id="foc-idq" x1="680" y1="160" stroke="#d4940a" stroke-width="3.5" marker-end="url(#foc-arr)" style="color:#d4940a"/>
            <text id="foc-idq-lbl" class="foc-lbl" fill="#d4940a" font-weight="bold" font-size="12">Iq</text>
          </g>
          <!-- 箭头连接：abc→αβ→dq -->
          <text x="275" y="165" text-anchor="middle" class="foc-lbl" fill="var(--text-secondary)" font-size="11">Clarke</text>
          <text x="275" y="180" text-anchor="middle" fill="var(--text-secondary)" font-size="16">→</text>
          <text x="545" y="165" text-anchor="middle" class="foc-lbl" fill="var(--text-secondary)" font-size="11">Park</text>
          <text x="545" y="180" text-anchor="middle" fill="var(--text-secondary)" font-size="16">→</text>
        </svg>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;font-family:Consolas,monospace;font-size:13px;margin-top:6px">
          <span style="color:#c0392b">Ia=<b id="foc-ia">1.00</b></span>
          <span style="color:#2e7d32">Ib=<b id="foc-ib">-0.50</b></span>
          <span style="color:#8e44ad">Ic=<b id="foc-ic">-0.50</b></span>
          <span style="color:#2e7d32">Iα=<b id="foc-ialpha">1.00</b></span>
          <span style="color:#1565c0">Id=<b id="foc-id">0.00</b></span>
          <span style="color:#d4940a">Iq=<b id="foc-iq">1.00</b></span>
        </div>
        <div style="text-align:center;color:var(--text-secondary);font-size:12px;margin-top:6px">拖动滑块改变θ，观察：左图三相向量随θ旋转(交流)；右图 Iq 始终是常量(直流)——这就是 FOC 能用 PI 控制的原因</div>`;
      const svg = el.querySelector('#foc-svg');
      const slider = el.querySelector('#foc-slider');
      const thLbl = el.querySelector('#foc-th');
      const autoBtn = el.querySelector('#foc-auto');
      // 坐标系中心与半径
      const ABC_CX = 140, ABC_CY = 160, ABC_R = 65;
      const AB_CX = 410, AB_CY = 160, AB_R = 65;
      const DQ_CX = 680, DQ_CY = 160, DQ_R = 60;
      let autoRAF = null;

      function setVec(id, x1, y1, x2, y2) {
        const ln = svg.querySelector('#' + id);
        ln.setAttribute('x1', x1); ln.setAttribute('y1', y1);
        ln.setAttribute('x2', x2); ln.setAttribute('y2', y2);
      }
      function setLbl(id, x, y) {
        const t = svg.querySelector('#' + id);
        t.setAttribute('x', x); t.setAttribute('y', y);
      }

      function render(deg) {
        const th = deg * Math.PI / 180;
        // 三相电流（幅值1）：Ia=cos(θ), Ib=cos(θ-120°), Ic=cos(θ+120°)
        const ia = Math.cos(th);
        const ib = Math.cos(th - 2 * Math.PI / 3);
        const ic = Math.cos(th + 2 * Math.PI / 3);
        // Clarke (幅值不变版 2/3)：Iα = Ia，Iβ = (Ia + 2Ib)/√3
        const ialpha = ia;
        const ibeta = (ia + 2 * ib) / Math.sqrt(3);
        // Park：Id = Iα·cosθ + Iβ·sinθ，Iq = -Iα·sinθ + Iβ·cosθ
        // 对于纯q轴电流设定，结果应为 Id≈0, Iq≈1.5
        const id = ialpha * Math.cos(th) + ibeta * Math.sin(th);
        const iq = -ialpha * Math.sin(th) + ibeta * Math.cos(th);

        // === 左：abc 三相向量（从中心指向 Ia/Ib/Ic 方向，长度按幅值缩放）===
        // a相方向：θ-90°(向上为正θ方向，因SVG y向下)，长度=|Ia|*R
        // 用径向表示：向量角度=相轴角度，长度=瞬时电流值(可正可负，负则反向)
        const aAng = -Math.PI / 2;       // a相轴指向正上(屏幕)
        const bAng = aAng + 2 * Math.PI / 3;  // b相轴顺时针120°
        const cAng = aAng - 2 * Math.PI / 3;  // c相轴
        setVec('foc-va', ABC_CX, ABC_CY, ABC_CX + Math.cos(aAng) * ia * ABC_R, ABC_CY + Math.sin(aAng) * ia * ABC_R);
        setVec('foc-vb', ABC_CX, ABC_CY, ABC_CX + Math.cos(bAng) * ib * ABC_R, ABC_CY + Math.sin(bAng) * ib * ABC_R);
        setVec('foc-vc', ABC_CX, ABC_CY, ABC_CX + Math.cos(cAng) * ic * ABC_R, ABC_CY + Math.sin(cAng) * ic * ABC_R);
        setLbl('foc-va-lbl', ABC_CX + Math.cos(aAng) * ia * ABC_R + 8, ABC_CY + Math.sin(aAng) * ia * ABC_R);
        setLbl('foc-vb-lbl', ABC_CX + Math.cos(bAng) * ib * ABC_R + 8, ABC_CY + Math.sin(bAng) * ib * ABC_R);
        setLbl('foc-vc-lbl', ABC_CX + Math.cos(cAng) * ic * ABC_R + 8, ABC_CY + Math.sin(cAng) * ic * ABC_R);

        // === 中：αβ 静止坐标合成向量 ===
        setVec('foc-valpha', AB_CX, AB_CY, AB_CX + ialpha * AB_R, AB_CY - ibeta * AB_R);
        setLbl('foc-valpha-lbl', AB_CX + ialpha * AB_R + 6, AB_CY - ibeta * AB_R);

        // === 右：dq 旋转坐标 ===
        // dq轴在屏幕上"看起来不动"(因为Iq恒定向上)，但物理上随θ转
        // 这里画 dq 轴指示方向(d水平右、q垂直上)，合成向量(Iq)画在q轴(上)
        setVec('foc-daxis', DQ_CX, DQ_CY, DQ_CX + DQ_R * 0.8, DQ_CY);
        setVec('foc-qaxis', DQ_CX, DQ_CY, DQ_CX, DQ_CY - DQ_R * 0.8);
        setLbl('foc-d-lbl', DQ_CX + DQ_R * 0.8 + 4, DQ_CY + 4);
        setLbl('foc-q-lbl', DQ_CX + 4, DQ_CY - DQ_R * 0.8);
        // 合成向量：Id沿d轴(水平)，Iq沿q轴(垂直)。画 (Id, Iq) 的合成
        setVec('foc-idq', DQ_CX, DQ_CY, DQ_CX + id * DQ_R, DQ_CY - iq * DQ_R);
        setLbl('foc-idq-lbl', DQ_CX + id * DQ_R + 8, DQ_CY - iq * DQ_R);

        // === 数值显示 ===
        thLbl.textContent = deg.toFixed(0) + '°';
        el.querySelector('#foc-ia').textContent = ia.toFixed(2);
        el.querySelector('#foc-ib').textContent = ib.toFixed(2);
        el.querySelector('#foc-ic').textContent = ic.toFixed(2);
        el.querySelector('#foc-ialpha').textContent = ialpha.toFixed(2);
        el.querySelector('#foc-id').textContent = id.toFixed(2);
        el.querySelector('#foc-iq').textContent = iq.toFixed(2);
      }

      slider.addEventListener('input', () => render(parseInt(slider.value)));
      // 自动旋转
      let autoDeg = 0;
      autoBtn.addEventListener('click', () => {
        if (autoRAF) {
          cancelAnimationFrame(autoRAF); autoRAF = null;
          autoBtn.textContent = '▶ 自动旋转';
          autoBtn.style.color = 'var(--text-secondary)';
          slider.disabled = false;
        } else {
          autoBtn.textContent = '⏸ 暂停';
          autoBtn.style.color = 'var(--primary)';
          slider.disabled = true;
          const tick = () => {
            autoDeg = (autoDeg + 1.5) % 360;
            slider.value = autoDeg;
            render(autoDeg);
            autoRAF = requestAnimationFrame(tick);
          };
          autoRAF = requestAnimationFrame(tick);
        }
      });
      render(0);
    },

    // BLDC 六步换向动画：6步按钮，电机截面图，转子旋转+导通相高亮
    bldc(el) {
      el.innerHTML = `
        <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-bottom:10px;flex-wrap:wrap">
          <button id="bldc-prev" class="hb-btn" style="padding:5px 12px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);cursor:pointer">◀ 上一步</button>
          <span style="font-size:13px;color:var(--text-secondary)">第 <b id="bldc-step" style="color:#d4940a;font-family:Consolas">1</b> / 6 步</span>
          <button id="bldc-next" class="hb-btn" style="padding:5px 12px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);cursor:pointer">下一步 ▶</button>
          <button id="bldc-auto" class="hb-btn" style="padding:5px 12px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text-secondary);cursor:pointer">▶ 自动</button>
        </div>
        <svg id="bldc-svg" viewBox="0 0 360 300" style="width:100%;max-width:360px;margin:0 auto;display:block">
          <defs><style>.bldc-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:3px;font-family:Consolas;font-weight:bold}</style></defs>
          <!-- 三相绕组(定子)：A上 B右下 C左下，中心(180,150) -->
          <g id="bldc-windings">
            <!-- A相(上) -->
            <ellipse id="bldc-wA" cx="180" cy="55" rx="36" ry="22" fill="#c0392b" opacity="0.25" stroke="#c0392b" stroke-width="2"/>
            <text x="180" y="40" text-anchor="middle" class="bldc-lbl" fill="#c0392b" font-size="14">A</text>
            <!-- B相(右下120°) -->
            <ellipse id="bldc-wB" cx="262" cy="197" rx="36" ry="22" fill="#2e7d32" opacity="0.25" stroke="#2e7d32" stroke-width="2" transform="rotate(120 262 197)"/>
            <text x="282" y="207" text-anchor="middle" class="bldc-lbl" fill="#2e7d32" font-size="14">B</text>
            <!-- C相(左下240°) -->
            <ellipse id="bldc-wC" cx="98" cy="197" rx="36" ry="22" fill="#1565c0" opacity="0.25" stroke="#1565c0" stroke-width="2" transform="rotate(-120 98 197)"/>
            <text x="78" y="207" text-anchor="middle" class="bldc-lbl" fill="#1565c0" font-size="14">C</text>
          </g>
          <!-- 电流方向箭头组(导通时显示) -->
          <g id="bldc-arrows"></g>
          <!-- 转子(N/S永磁体)，可旋转 -->
          <g id="bldc-rotor" transform="rotate(0 180 150)">
            <rect x="170" y="95" width="20" height="110" rx="4" fill="url(#bldc-rotor-grad)"/>
            <text x="180" y="108" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">N</text>
            <text x="180" y="200" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">S</text>
          </g>
          <defs>
            <linearGradient id="bldc-rotor-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ef4444"/>
              <stop offset="50%" stop-color="#9ca3af"/>
              <stop offset="50%" stop-color="#6b7280"/>
              <stop offset="100%" stop-color="#1e40af"/>
            </linearGradient>
          </defs>
          <!-- 中心轴 -->
          <circle cx="180" cy="150" r="6" fill="#374151"/>
        </svg>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;font-family:Consolas,monospace;font-size:13px;margin-top:8px">
          <span id="bldc-status" style="color:var(--text-secondary)">点击"下一步"看六步换向过程</span>
        </div>`;
      const svg = el.querySelector('#bldc-svg');
      const stepLbl = el.querySelector('#bldc-step');
      const statusEl = el.querySelector('#bldc-status');
      // 6步换向表：每步 {通电相: 进(+)/出(-), 转子目标角度}
      // A上(0°) B右下(120°) C左下(240°)。转子N极指向"进相"与"出相"合成磁场方向
      const steps = [
        { in: 'A', out: 'B', rotor: 330, desc: 'A进 B出：磁场指向A→B，转子N极转到60°反向' },
        { in: 'A', out: 'C', rotor: 30,  desc: 'A进 C出：合成磁场转60°，转子跟进' },
        { in: 'B', out: 'C', rotor: 90,  desc: 'B进 C出' },
        { in: 'B', out: 'A', rotor: 150, desc: 'B进 A出' },
        { in: 'C', out: 'A', rotor: 210, desc: 'C进 A出' },
        { in: 'C', out: 'B', rotor: 270, desc: 'C进 B出：完成一圈，回到起点' },
      ];
      let curStep = 0;
      let autoT = null;

      function colorOf(phase) { return phase === 'A' ? '#c0392b' : (phase === 'B' ? '#2e7d32' : '#1565c0'); }
      function cxOf(phase) { return phase === 'A' ? 180 : (phase === 'B' ? 262 : 98); }
      function cyOf(phase) { return phase === 'A' ? 55 : (phase === 'B' ? 197 : 197); }

      function render(stepIdx) {
        const s = steps[stepIdx];
        // 高亮导通相
        ['A', 'B', 'C'].forEach(p => {
          const w = svg.querySelector('#bldc-w' + p);
          const active = (p === s.in || p === s.out);
          w.setAttribute('opacity', active ? '0.7' : '0.15');
          w.setAttribute('stroke-width', active ? '4' : '2');
        });
        // 画电流箭头：进相→中心→出相
        const ar = svg.querySelector('#bldc-arrows');
        const inC = colorOf(s.in), outC = colorOf(s.out);
        ar.innerHTML = `
          <line x1="${cxOf(s.in)}" y1="${cyOf(s.in)}" x2="180" y2="150" stroke="${inC}" stroke-width="3" marker-end="url(#bldc-arr)" style="color:${inC}" opacity="0.9"/>
          <line x1="180" y1="150" x2="${cxOf(s.out)}" y2="${cyOf(s.out)}" stroke="${outC}" stroke-width="3" marker-end="url(#bldc-arr)" style="color:${outC}" opacity="0.9"/>
          <defs><marker id="bldc-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"/></marker></defs>`;
        // 转子旋转
        svg.querySelector('#bldc-rotor').setAttribute('transform', `rotate(${s.rotor} 180 150)`);
        stepLbl.textContent = (stepIdx + 1);
        statusEl.innerHTML = `<span style="color:${inC}">${s.in}进</span> <span style="color:${outC}">${s.out}出</span> — ${s.desc}`;
      }
      function next() { curStep = (curStep + 1) % 6; render(curStep); }
      function prev() { curStep = (curStep + 5) % 6; render(curStep); }

      el.querySelector('#bldc-next').onclick = () => { stopAuto(); next(); };
      el.querySelector('#bldc-prev').onclick = () => { stopAuto(); prev(); };
      const autoBtn = el.querySelector('#bldc-auto');
      function stopAuto() { if (autoT) { clearInterval(autoT); autoT = null; autoBtn.textContent = '▶ 自动'; autoBtn.style.color = 'var(--text-secondary)'; } }
      autoBtn.onclick = () => {
        if (autoT) { stopAuto(); }
        else { autoBtn.textContent = '⏸ 暂停'; autoBtn.style.color = 'var(--primary)'; next(); autoT = setInterval(next, 900); }
      };
      render(0);
    },

    // PID 阶跃响应交互图：滑块调Kp/Ki/Kd，实时画响应曲线
    'pid-response'(el) {
      el.innerHTML = `
        <div style="display:flex;gap:14px;align-items:center;justify-content:center;margin-bottom:8px;flex-wrap:wrap;font-size:13px;color:var(--text-secondary)">
          <label>Kp: <input type="range" id="pid-kp" min="0" max="8" step="0.1" value="2" style="width:110px;vertical-align:middle;accent-color:var(--primary)"><b id="pid-kp-v" style="color:#c084fc;font-family:Consolas;margin-left:4px">2.0</b></label>
          <label>Ki: <input type="range" id="pid-ki" min="0" max="3" step="0.05" value="0.4" style="width:110px;vertical-align:middle;accent-color:var(--primary)"><b id="pid-ki-v" style="color:#34d399;font-family:Consolas;margin-left:4px">0.40</b></label>
          <label>Kd: <input type="range" id="pid-kd" min="0" max="2" step="0.05" value="0.5" style="width:110px;vertical-align:middle;accent-color:var(--primary)"><b id="pid-kd-v" style="color:#60a5fa;font-family:Consolas;margin-left:4px">0.50</b></label>
        </div>
        <div id="pid-chart" style="width:100%;height:300px"></div>
        <div style="text-align:center;color:var(--text-secondary);font-size:12px;margin-top:4px">拖动滑块看PID参数对阶跃响应的影响：Kp↑快但易超调 | Ki↑消稳态误差但增振荡 | Kd↑抑制超调但放大噪声</div>`;
      const chartEl = el.querySelector('#pid-chart');
      // 用ECharts画
      const chart = typeof echarts !== 'undefined' ? echarts.init(chartEl) : null;
      const sliders = ['kp', 'ki', 'kd'].map(k => el.querySelector('#pid-' + k));
      const vals = ['kp', 'ki', 'kd'].map(k => el.querySelector('#pid-' + k + '-v'));

      // 模拟一阶系统 + PID 的阶跃响应（数值积分，简化电机模型 G=1/(0.1s+1)）
      function sim(kp, ki, kd) {
        const N = 300, dt = 0.01, setpoint = 1.0;
        const out = [], t = [];
        let y = 0, integ = 0, prevErr = setpoint, prevY = 0;
        for (let i = 0; i < N; i++) {
          const err = setpoint - y;
          integ += err * dt;
          // 微分项用实际输出变化(避免设定值突变尖峰)，加低通滤波
          const dydt = (y - prevY) / dt;
          const deriv = -dydt; // d(err)/dt = -dy/dt
          let u = kp * err + ki * integ + kd * deriv;
          // 限幅(模拟PWM饱和)
          if (u > 10) u = 10; if (u < -10) u = -10;
          // 一阶系统 dy/dt = (u - y) / tau, tau=0.3
          const tau = 0.3;
          y += (u - y) / tau * dt;
          t.push(i * dt);
          out.push(y);
          prevY = y;
          prevErr = err;
        }
        return { t, out };
      }

      function render() {
        const kp = parseFloat(sliders[0].value), ki = parseFloat(sliders[1].value), kd = parseFloat(sliders[2].value);
        vals[0].textContent = kp.toFixed(1); vals[1].textContent = ki.toFixed(2); vals[2].textContent = kd.toFixed(2);
        const { t, out } = sim(kp, ki, kd);
        // 算性能指标
        const steady = out[out.length - 1];
        let overshoot = 0, maxV = 0;
        out.forEach(v => { if (v > maxV) maxV = v; });
        overshoot = maxV > 1 ? ((maxV - 1) * 100).toFixed(0) : 0;
        if (!chart) return;
        chart.setOption({
          animation: false,
          grid: { left: 45, right: 20, top: 20, bottom: 30 },
          xAxis: { type: 'category', data: t.map(x => x.toFixed(2)), name: '时间(s)', axisLabel: { fontSize: 10 } },
          yAxis: { type: 'value', min: 0, max: Math.max(1.8, maxV + 0.1), name: '输出', axisLabel: { fontSize: 10 } },
          tooltip: { trigger: 'axis' },
          series: [
            { name: '设定值', type: 'line', data: t.map(() => 1), lineStyle: { color: '#94a3b8', type: 'dashed', width: 1.5 }, symbol: 'none' },
            { name: '响应', type: 'line', data: out, lineStyle: { color: '#d4940a', width: 2.5 }, symbol: 'none', areaStyle: { color: 'rgba(212,148,10,0.08)' },
              markPoint: { data: [{ name: '峰值', coord: [out.indexOf(maxV), maxV], label: { formatter: '超调' + overshoot + '%', fontSize: 10 } }] } }
          ]
        });
      }
      sliders.forEach(s => s.addEventListener('input', render));
      // 窗口resize自适应
      window.addEventListener('resize', () => chart && chart.resize());
      render();
    },

    // 机械臂交互图：拖拽末端，实时显示θ1/θ2/x/y，标注角度位置
    arm(el) {
      const L1 = 130, L2 = 100;
      const OX = 280, OY = 300;   // 基座原点(居中偏下，让连杆能在上方大范围活动)
      el.innerHTML = `
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-bottom:8px;flex-wrap:wrap;font-family:Consolas,monospace;font-size:14px">
          <span style="color:#d4940a">θ₁ = <b id="arm-th1">--</b></span>
          <span style="color:#d4940a">θ₂ = <b id="arm-th2">--</b></span>
          <span style="color:#c0392b">末端: x=<b id="arm-x">--</b>, y=<b id="arm-y">--</b></span>
          <span style="color:var(--text-secondary);font-size:12px">← 拖动红点或点击空白</span>
        </div>
        <svg id="arm-svg" viewBox="0 0 560 360" style="width:100%;max-width:540px;margin:0 auto;display:block;touch-action:none">
          <defs>
            <marker id="arm-ax" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--text-secondary)"/></marker>
            <style>.arm-lbl{paint-order:stroke;stroke:var(--bg-card);stroke-width:4px;stroke-linejoin:round}</style>
          </defs>
          <!-- 坐标轴 -->
          <line x1="${OX}" y1="${OY}" x2="540" y2="${OY}" stroke="var(--text-secondary)" stroke-width="1.5" marker-end="url(#arm-ax)"/>
          <line x1="${OX}" y1="${OY}" x2="${OX}" y2="30" stroke="var(--text-secondary)" stroke-width="1.5" marker-end="url(#arm-ax)"/>
          <text x="546" y="${OY+16}" class="arm-lbl" fill="var(--text-secondary)">x</text>
          <text x="${OX-18}" y="28" class="arm-lbl" fill="var(--text-secondary)">y</text>
          <text x="${OX-20}" y="${OY+18}" class="arm-lbl" fill="var(--text-secondary)" font-size="12">O</text>
          <!-- 连杆1（粗，带角度弧和标注会动态绘制）-->
          <line id="arm-l1" x1="${OX}" y1="${OY}" stroke="#c2883e" stroke-width="7" stroke-linecap="round"/>
          <text id="arm-l1-lbl" class="arm-lbl" fill="#c2883e" font-weight="bold" font-size="14">L₁</text>
          <!-- θ1 角度弧 + 标注 -->
          <path id="arm-arc1" fill="none" stroke="#d4940a" stroke-width="2.5"/>
          <text id="arm-arc1-lbl" class="arm-lbl" fill="#d4940a" font-weight="bold" font-size="13">θ₁</text>
          <!-- 连杆2 -->
          <line id="arm-l2" stroke="#4a8c5c" stroke-width="7" stroke-linecap="round"/>
          <text id="arm-l2-lbl" class="arm-lbl" fill="#4a8c5c" font-weight="bold" font-size="14">L₂</text>
          <!-- θ2 角度弧 + 标注 -->
          <path id="arm-arc2" fill="none" stroke="#d4940a" stroke-width="2.5"/>
          <text id="arm-arc2-lbl" class="arm-lbl" fill="#d4940a" font-weight="bold" font-size="13">θ₂</text>
          <!-- 关节1(基座)、关节2 -->
          <circle cx="${OX}" cy="${OY}" r="7" fill="var(--text)"/>
          <circle id="arm-j2" r="7" fill="var(--text)"/>
          <!-- 末端(可拖拽红点) -->
          <circle id="arm-end" r="11" fill="rgba(192,57,43,0.2)" stroke="#c0392b" stroke-width="3" style="cursor:grab"/>
          <text id="arm-end-lbl" class="arm-lbl" fill="#c0392b" font-weight="bold" font-size="12">末端</text>
          <!-- 投影虚线 -->
          <line id="arm-proj-x" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line id="arm-proj-y" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4,3"/>
        </svg>`;
      const svg = el.querySelector('#arm-svg');
      const l1 = el.querySelector('#arm-l1'), l2 = el.querySelector('#arm-l2');
      const arc1 = el.querySelector('#arm-arc1'), arc2 = el.querySelector('#arm-arc2');
      const arc1lbl = el.querySelector('#arm-arc1-lbl'), arc2lbl = el.querySelector('#arm-arc2-lbl');
      const l1lbl = el.querySelector('#arm-l1-lbl'), l2lbl = el.querySelector('#arm-l2-lbl');
      const j2 = el.querySelector('#arm-j2'), end = el.querySelector('#arm-end');
      const endLbl = el.querySelector('#arm-end-lbl');
      const projX = el.querySelector('#arm-proj-x'), projY = el.querySelector('#arm-proj-y');
      const th1El = el.querySelector('#arm-th1'), th2El = el.querySelector('#arm-th2');
      const xEl = el.querySelector('#arm-x'), yEl = el.querySelector('#arm-y');

      let th1 = 0.7, th2 = 0.6;   // 初始角度(弧度)

      function fk() {
        const j2x = OX + L1 * Math.cos(th1);
        const j2y = OY - L1 * Math.sin(th1);
        const ex = j2x + L2 * Math.cos(th1 + th2);
        const ey = j2y - L2 * Math.sin(th1 + th2);
        return { j2x, j2y, ex, ey };
      }

      function render() {
        const p = fk();
        // 连杆
        l1.setAttribute('x2', p.j2x); l1.setAttribute('y2', p.j2y);
        l2.setAttribute('x1', p.j2x); l2.setAttribute('y1', p.j2y);
        l2.setAttribute('x2', p.ex);  l2.setAttribute('y2', p.ey);
        // 连杆标签（放连杆中点偏上）
        l1lbl.setAttribute('x', (OX + p.j2x)/2 - 8); l1lbl.setAttribute('y', (OY + p.j2y)/2 - 8);
        l2lbl.setAttribute('x', (p.j2x + p.ex)/2 + 4); l2lbl.setAttribute('y', (p.j2y + p.ey)/2 - 8);
        // 关节2、末端
        j2.setAttribute('cx', p.j2x); j2.setAttribute('cy', p.j2y);
        end.setAttribute('cx', p.ex); end.setAttribute('cy', p.ey);
        endLbl.setAttribute('x', p.ex + 12); endLbl.setAttribute('y', p.ey - 8);
        // θ1 角度弧：从x轴正方向到L1方向
        const r1 = 30;
        arc1.setAttribute('d', `M ${OX+r1} ${OY} A ${r1} ${r1} 0 0 0 ${OX+r1*Math.cos(th1)} ${OY-r1*Math.sin(th1)}`);
        // θ1 标注位置（弧的中点外侧）
        const a1mid = th1 / 2;
        arc1lbl.setAttribute('x', OX + (r1+14)*Math.cos(a1mid) - 8);
        arc1lbl.setAttribute('y', OY - (r1+14)*Math.sin(a1mid) + 4);
        // θ2 角度弧：在关节2处，从L1延长线到L2方向
        const r2 = 24;
        const a1ext = th1;  // L1方向角
        const a2ext = th1 + th2;  // L2方向角
        arc2.setAttribute('d', `M ${p.j2x+r2*Math.cos(a1ext)} ${p.j2y-r2*Math.sin(a1ext)} A ${r2} ${r2} 0 0 0 ${p.j2x+r2*Math.cos(a2ext)} ${p.j2y-r2*Math.sin(a2ext)}`);
        // θ2 标注位置
        const a2mid = th1 + th2/2;
        arc2lbl.setAttribute('x', p.j2x + (r2+14)*Math.cos(a2mid) - 8);
        arc2lbl.setAttribute('y', p.j2y - (r2+14)*Math.sin(a2mid) + 4);
        // 投影线
        projX.setAttribute('x1', p.ex); projX.setAttribute('y1', p.ey);
        projX.setAttribute('x2', p.ex); projX.setAttribute('y2', OY);
        projY.setAttribute('x1', p.ex); projY.setAttribute('y1', p.ey);
        projY.setAttribute('x2', OX); projY.setAttribute('y2', p.ey);
        // 数值
        th1El.textContent = (th1 * 180 / Math.PI).toFixed(1) + '°';
        th2El.textContent = (th2 * 180 / Math.PI).toFixed(1) + '°';
        xEl.textContent = (p.ex - OX).toFixed(0);
        yEl.textContent = (OY - p.ey).toFixed(0);
      }

      let dragging = false;
      function getSVGPoint(evt) {
        const pt = svg.createSVGPoint();
        pt.x = evt.clientX; pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }
      function ikUpdate(evt) {
        const pt = getSVGPoint(evt);
        const x = pt.x - OX, y = OY - pt.y;
        const r = Math.sqrt(x*x + y*y);
        const rMax = L1 + L2 - 5, rMin = Math.abs(L1 - L2) + 5;
        const rr = Math.min(rMax, Math.max(rMin, r));
        const sx = x * rr / r, sy = y * rr / r;
        const c2 = (sx*sx + sy*sy - L1*L1 - L2*L2) / (2 * L1 * L2);
        th2 = Math.acos(Math.max(-1, Math.min(1, c2)));
        th1 = Math.atan2(sy, sx) - Math.atan2(L2 * Math.sin(th2), L1 + L2 * Math.cos(th2));
        render();
      }
      end.addEventListener('pointerdown', e => { dragging = true; end.style.cursor = 'grabbing'; e.preventDefault(); });
      window.addEventListener('pointermove', e => { if (dragging) ikUpdate(e); });
      window.addEventListener('pointerup', () => { dragging = false; end.style.cursor = 'grab'; });
      svg.addEventListener('click', e => { if (!dragging) ikUpdate(e); });

      render();
    },

    // Python 在线仿真沙盒（基于 Pyodide，浏览器内跑 Python+scipy 控制仿真）
    'python-sim'(el) {
      const DEFAULT_CODE = `# ========================================
# Matlab vs Python 对照（沙盒跑Python）:
#   tf(num,den)   → signal.TransferFunction(num,den)
#   step(G)       → signal.step(G, T=t)
#   feedback(G,1) → 见下方的多项式闭环算法
#   conv(a,b)     → np.polymul(a,b)
# ========================================

import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

# 电机参数
R, L, K, J, b = 1.0, 0.5e-3, 0.01, 0.01, 0.1

# 传递函数 G(s)
num_G = [K]
den_G = [L*J, L*b + R*J, R*b + K*K]

# === 改这里调参 ===
Kp, Ki, Kd = 5.0, 10.0, 0.0
# =================

# PID: C(s)
num_C = [Kd, Kp, Ki]
den_C = [1, 0]

# 开环 OL = C * G
num_OL = np.polymul(num_C, num_G)
den_OL = np.polymul(den_C, den_G)

# 闭环 T = OL/(1+OL)
num_T = num_OL
den_T = np.polyadd(den_OL, num_OL)
T = signal.TransferFunction(num_T, den_T)

# 阶跃响应
t = np.linspace(0, 0.5, 1000)
t_out, y_out = signal.step(T, T=t)

plt.figure(figsize=(7, 3.5))
plt.plot(t_out, y_out, 'b-', linewidth=2)
plt.axhline(1.0, color='r', linestyle='--', alpha=0.4)
plt.title(f'Step Response (Kp={Kp}, Ki={Ki}, Kd={Kd})')
plt.xlabel('Time (s)'); plt.ylabel('Output')
plt.legend(['Response','Target']); plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('/tmp/sim_out.png', dpi=100)

peak = max(y_out); ss = y_out[-1]
ov = (peak-ss)/ss*100 if ss != 0 else 0
print(f'Done: steady={ss:.3f} peak={peak:.3f} overshoot={ov:.1f}%')
print('Try: Kp=1(slow) Kp=10(fast) Kp=50(oscillate)')`;
      el.innerHTML = `
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap">
          <button id="psim-run" style="padding:6px 18px;background:var(--primary);color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-weight:600">▶ 运行</button>
          <button id="psim-reset" style="padding:6px 14px;background:var(--bg-card);color:var(--text-secondary);border:1px solid var(--border);border-radius:6px;font-size:13px;cursor:pointer">重置代码</button>
          <span id="psim-status" style="font-size:12px;color:var(--text-secondary)">点击运行加载Python环境(首次约10秒)</span>
        </div>
        <div class="psim-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Python 代码（可编辑）：</div>
            <textarea id="psim-code" style="width:100%;height:340px;font-family:Consolas,monospace;font-size:12px;padding:8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);resize:vertical;line-height:1.5"></textarea>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">输出（图表 + 日志）：</div>
            <div id="psim-output" style="width:100%;height:340px;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);overflow:auto;padding:4px"></div>
          </div>
        </div>`;
      const codeEl = el.querySelector('#psim-code');
      const outEl = el.querySelector('#psim-output');
      const statusEl = el.querySelector('#psim-status');
      codeEl.value = DEFAULT_CODE;

      let pyodideReady = null;
      async function getPyodide() {
        if (pyodideReady) return pyodideReady;
        statusEl.textContent = 'Loading Python runtime...(~10s first time)';
        statusEl.style.color = 'var(--warning)';
        // 动态加载 Pyodide
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            s.onload = resolve; s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        pyodideReady = window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
        const py = await pyodideReady;
        statusEl.textContent = 'Loading scipy/matplotlib...';
        await py.loadPackage(['matplotlib', 'scipy']);
        // 确保 /tmp 目录存在 + 配置 matplotlib Agg 后端
        py.runPython(`
import os
os.makedirs('/tmp', exist_ok=True)
import matplotlib
matplotlib.use('Agg')
matplotlib.rcParams['font.family'] = 'DejaVu Sans'
`);
        return py;
      }

      async function runCode() {
        const btn = el.querySelector('#psim-run');
        btn.disabled = true;
        outEl.innerHTML = '<div style="padding:12px;color:var(--text-secondary);font-size:13px">Running...</div>';
        try {
          const py = await getPyodide();
          outEl.innerHTML = '';
          // 用 Python 侧 io.StringIO 捕获 print 输出
          py.setStdout({ batched: (s) => {
            outEl.innerHTML += '<div style="font-family:Consolas;font-size:12px;padding:2px 4px;color:var(--text-secondary)">' + s.replace(/</g,'&lt;').replace(/\n/g,'<br>') + '</div>';
          }});
          // 先删除旧图片（防止上次失败残留）
          try { py.FS.unlink('/tmp/sim_out.png'); } catch(e) {}
          // 执行用户代码
          await py.runPythonAsync(codeEl.value);
          // 尝试读取图片
          let hasImg = false;
          try {
            const bytes = py.FS.readFile('/tmp/sim_out.png');
            let binStr = '';
            for (let i = 0; i < bytes.length; i += 0x8000) {
              binStr += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + 0x8000, bytes.length)));
            }
            const imgB64 = btoa(binStr);
            outEl.innerHTML += '<img src="data:image/png;base64,' + imgB64 + '" style="max-width:100%;display:block;margin:8px auto;border-radius:6px">';
            hasImg = true;
          } catch(e) {
            // 没有图片（代码可能只 print 不画图）
          }
          if (!hasImg) outEl.innerHTML += '<div style="padding:8px;font-size:12px;color:var(--text-secondary)">No image output (code ran but did not save a plot)</div>';
          statusEl.textContent = 'Done ✓';
          statusEl.style.color = 'var(--success)';
        } catch (err) {
          const msg = String(err).replace(/</g,'&lt;');
          outEl.innerHTML += '<div style="color:var(--danger);font-family:Consolas;font-size:12px;padding:8px;border:1px solid var(--danger);border-radius:6px;margin:4px">Error: ' + msg + '</div>';
          statusEl.textContent = 'Error - check output';
          statusEl.style.color = 'var(--danger)';
        } finally {
          btn.disabled = false;
        }
      }

      el.querySelector('#psim-run').addEventListener('click', runCode);
      el.querySelector('#psim-reset').addEventListener('click', () => { codeEl.value = DEFAULT_CODE; });
    },
  },
};

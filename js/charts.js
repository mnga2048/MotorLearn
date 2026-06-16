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

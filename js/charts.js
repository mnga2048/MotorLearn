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
          { name: 'Ha', type: 'line', data: hallWave(0), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#c2883e' } },
          { name: 'Hb', type: 'line', data: hallWave(120), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#4a8c5c' } },
          { name: 'Hc', type: 'line', data: hallWave(240), symbol: 'none', step: 'end', lineStyle: { width: 2.5 }, itemStyle: { color: '#b8860b' } },
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
  },
};

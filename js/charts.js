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
};

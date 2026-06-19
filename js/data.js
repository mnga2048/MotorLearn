// 电机学习平台 - 内容数据层
const MotorData = {
  // 导航结构
  nav: [
    { id: 'home', label: '首页', icon: 'home' },
    {
      id: 'beginner', label: '入门篇', icon: 'book-open', badge: '入门', badgeClass: 'badge-beginner',
      children: [
        { id: 'beginner-em', label: '电磁学基础' },
        { id: 'beginner-classify', label: '电机分类总览' },
        { id: 'beginner-params', label: '基本参数' },
        { id: 'beginner-drive', label: '驱动基础' },
      ]
    },
    {
      id: 'advanced', label: '进阶篇', icon: 'rocket', badge: '进阶', badgeClass: 'badge-advanced',
      children: [
        { id: 'advanced-pid', label: 'PID控制理论' },
        { id: 'advanced-pid-impl', label: 'PID的C语言实现' },
        { id: 'encoder', label: '编码器与位置反馈' },
        { id: 'bldc-commutation', label: 'BLDC六步换向实现' },
        { id: 'advanced-foc', label: 'FOC磁场定向控制' },
        { id: 'foc-impl', label: 'FOC的C语言实现' },
        { id: 'advanced-coord', label: '坐标变换' },
        { id: 'advanced-sensorless', label: '无感控制' },
        { id: 'advanced-multiloop', label: '多环控制' },
        { id: 'servo-control', label: '伺服控制与通信' },
        { id: 'engineering-validation', label: '工程验证方法论' },
        { id: 'current-sense', label: '电流采样硬件' },
        { id: 'advanced-comm', label: '通讯协议(Modbus/CAN)' },
        { id: 'advanced-protection', label: '驱动器保护机制' },
      ]
    },
    {
      id: 'motors', label: '电机分类', icon: 'cpu',
      children: [
        { id: 'brushed-dc', label: '有刷直流电机' },
        { id: 'bldc', label: '无刷直流电机 (BLDC)' },
        { id: 'stepper', label: '步进电机' },
        { id: 'servo', label: '伺服电机' },
        { id: 'hobby-servo', label: '舵机' },
      ]
    },
    {
      id: 'robotics', label: '机器人应用', icon: 'rocket', badge: '进阶', badgeClass: 'badge-advanced',
      children: [
        { id: 'kinematics', label: '运动学入门' },
        { id: 'trajectory', label: '轨迹规划与多轴协调' },
        { id: 's-curve', label: 'S曲线加减速专题' },
        { id: 'mcu-ros', label: 'MCU与Linux/ROS桥接' },
        { id: 'matlab-sim', label: 'Matlab电机仿真入门' },
      ]
    },
    { id: 'industry', label: '电机行业', icon: 'briefcase', badge: '行业', badgeClass: 'badge-tool' },
    { id: 'roadmap', label: '学习路径', icon: 'map', badge: '导航', badgeClass: 'badge-tool' },
    { id: 'tools', label: '工具箱', icon: 'wrench', badge: '工具', badgeClass: 'badge-tool' },
  ],

  // SVG图标映射
  icons: {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>',
    'book-open': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2zM9 12H2l3.5-2L9 12z"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M2 13h20"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  },

  // ========== 首页数据 ==========
  home: {
    title: '电机知识学习平台（制作完善中）',
    subtitle: '面向小白的系统化电机控制学习指南，从入门到进阶，目标是一站式掌握电机知识 owo',
    intro: '从单片机+C的视角出发，系统化讲解电机控制——电磁原理→PWM调速→编码器反馈→PID闭环→FOC→运动学→ROS桥接。每篇都有可运行的C代码示例，配合交互图表和在线仿真沙盒，帮你从"只会调PWM占空比"成长为"能设计完整电机控制系统"。',
    features: [
      { icon: '📖', label: '系统化知识', desc: '入门→进阶→机器人应用，17个知识点按学习路径递进' },
      { icon: '💻', label: '可运行代码', desc: '30+段纯C算法+实战示例，不绑定平台，可直接移植' },
      { icon: '🎮', label: '交互图表', desc: '6个可交互原理图/波形图（拖拽机械臂、点击H桥切换状态）' },
      { icon: '🧪', label: '在线沙盒', desc: 'Python仿真沙盒，浏览器里改参数看阶跃响应，零成本验证算法' },
    ],
    stats: [
      { label: '知识章节', value: '17', color: 'blue' },
      { label: '电机类型', value: '5', color: 'green' },
      { label: '代码示例', value: '30+', color: 'purple' },
      { label: '交互图表', value: '6', color: 'orange' },
    ],
    quickStart: [
      { id: 'beginner-em', title: '电磁学基础', desc: '从安培力、法拉第定律开始，建立电磁学知识框架', icon: '⚡', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600', level: '入门' },
      { id: 'beginner-classify', title: '电机分类总览', desc: '了解直流电机、交流电机、步进电机等分类方法', icon: '📋', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', level: '入门' },
      { id: 'brushed-dc', title: '有刷直流电机', desc: '最基础的电机类型，理解电机原理的最佳起点', icon: '🔋', color: 'bg-green-100 dark:bg-green-900/30 text-green-600', level: '入门' },
      { id: 'bldc', title: '无刷直流电机', desc: '现代电机控制的核心，FOC算法的典型应用', icon: '🌀', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', level: '进阶' },
      { id: 'stepper', title: '步进电机', desc: '精确位置控制的首选，3D打印机和CNC的核心', icon: '🎯', color: 'bg-red-100 dark:bg-red-900/30 text-red-600', level: '入门' },
      { id: 'servo', title: '伺服电机', desc: '工业级精密控制，闭环反馈实现高性能运动', icon: '🔄', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600', level: '进阶' },
    ],
  },

  // ========== 入门篇 ==========
  beginner: {
    title: '入门篇',
    subtitle: '掌握电机学基础知识，建立电磁学和电机驱动的基本概念',
    sections: [
      {
        id: 'beginner-em',
        title: '电磁学基础',
        desc: '理解电机运转的物理原理',
        icon: '⚡',
        tags: ['基础理论', '必学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">电机运转的物理本质</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            所有电机的核心原理都基于两个基本物理定律：<strong>安培力定律</strong>（通电导体在磁场中受力）和<strong>法拉第电磁感应定律</strong>（变化的磁通产生感应电动势）。
          </p>

          <div class="info-box info">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>核心公式</strong>：F = BIL（安培力 = 磁感应强度 × 电流 × 导体长度）</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">关键概念</h4>
          <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>磁场（B）</strong>：磁体或电流周围的空间中存在的特殊物质，用磁感应强度B表示，单位特斯拉(T)</li>
            <li><strong>安培力（F）</strong>：载流导体在磁场中受到的力，F = BIL sin(θ)，方向由左手定则确定</li>
            <li><strong>电磁感应（EMF）</strong>：导体在变化的磁场中产生电动势，E = -dΦ/dt（法拉第定律）</li>
            <li><strong>磁路</strong>：磁通量通过的路径，类似于电路，有磁阻、磁通势等概念</li>
            <li><strong>洛伦兹力</strong>：运动电荷在磁场中受的力，F = qv × B，是安培力的微观本质</li>
          </ul>

          <h4 class="font-medium mt-6 mb-2">左手定则</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            伸开左手，让磁感线穿入手心（磁场B指向手心），四指指向电流I的方向，
            那么大拇指所指的方向就是导体所受安培力F的方向。这就是电动机的基本工作原理。
          </p>

          <div class="formula-block">
            $$F = BIL \\sin\\theta$$
            <div class="text-sm text-gray-500 mt-2">F: 力(N) | B: 磁感应强度(T) | I: 电流(A) | L: 导体长度(m) | θ: B与I的夹角</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">右手定则（发电机原理）</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            伸开右手，磁感线穿入手心，大拇指指向导体运动方向，四指所指方向就是感应电动势（电流）方向。
            电动机和发电机本质上是同一装置的两种工作模式。
          </p>
        `,
      },
      {
        id: 'beginner-classify',
        title: '电机分类总览',
        desc: '了解电机的分类体系和各类型特点',
        icon: '📋',
        tags: ['基础理论', '必学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">电机的分类体系</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            电机按不同标准有多种分类方法。最基本的是按<strong>供电类型</strong>和<strong>工作原理</strong>分类。
          </p>

          <div class="overflow-x-auto">
            <table class="compare-table mb-6">
              <thead>
                <tr><th>分类维度</th><th>类型</th><th>典型代表</th></tr>
              </thead>
              <tbody>
                <tr><td rowspan="2"><strong>按电流类型</strong></td><td>直流电机</td><td>有刷直流、无刷直流(BLDC)</td></tr>
                <tr><td>交流电机</td><td>异步电机、同步电机(PMSM)</td></tr>
                <tr><td rowspan="3"><strong>按控制方式</strong></td><td>步进电机</td><td>开环位置控制，混合式步进</td></tr>
                <tr><td>伺服电机</td><td>闭环精密控制，交流/直流伺服</td></tr>
                <tr><td>舵机</td><td>位置反馈的简化伺服</td></tr>
                <tr><td rowspan="2"><strong>按换向方式</strong></td><td>有刷电机</td><td>机械换向器+电刷</td></tr>
                <tr><td>无刷电机</td><td>电子换向(BLDC/PMSM)</td></tr>
              </tbody>
            </table>
          </div>

          <h4 class="font-medium mt-4 mb-2">本平台涵盖的电机类型</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">⚡ 有刷直流电机</div>
              <div class="text-sm text-gray-500">结构简单、成本低，适合入门学习</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🌀 无刷直流电机 (BLDC)</div>
              <div class="text-sm text-gray-500">效率高、寿命长，现代应用最广</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🎯 步进电机</div>
              <div class="text-sm text-gray-500">精确位置控制，无需反馈</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🔄 伺服电机</div>
              <div class="text-sm text-gray-500">闭环精密控制，工业级性能</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:col-span-2">
              <div class="font-medium mb-1">📡 舵机 (Hobby Servo)</div>
              <div class="text-sm text-gray-500">内置控制电路的位置执行器，RC模型和机器人常用</div>
            </div>
          </div>

          <h4 class="font-medium mt-6 mb-2">选型决策表：该用哪种电机？</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            根据应用场景的关键需求（精度、速度、成本、是否需反馈），对照下表快速选型：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>需求场景</th><th>关键指标</th><th>推荐</th><th>理由</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">玩具/风扇/简易驱动</td><td>低成本、无需精确定位</td><td>有刷直流</td><td>最便宜，PWM直接调速</td></tr>
              <tr><td class="font-medium">3D打印机/CNC</td><td>开环精确位置、低成本</td><td>步进电机</td><td>脉冲即位置，无需编码器</td></tr>
              <tr><td class="font-medium">机器人关节(小型)</td><td>角度控制、简单接口</td><td>舵机</td><td>一根PWM线控角度，内置反馈</td></tr>
              <tr><td class="font-medium">无人机/云台/电单车</td><td>高效率、高转速、长寿命</td><td>无刷(BLDC)</td><td>效率90%+、无磨损、FOC可精密控</td></tr>
              <tr><td class="font-medium">工业机械臂/CNC主轴</td><td>高速高精、大扭矩、闭环</td><td>伺服</td><td>编码器闭环，高速不丢步</td></tr>
              <tr><td class="font-medium">低成本大扭矩定位</td><td>堵转力矩大、定位准</td><td>步进(配减速)</td><td>低速扭矩大，价格远低于伺服</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>三条经验法则</strong>：① 精度要求 &lt; 1° 且预算紧 → 步进；精度 &lt; 0.1° 或需高速 → 伺服。② 需要长时间连续高速旋转 → 优先无刷（有刷电刷会磨损）。③ 不确定时，先从<strong>步进+舵机</strong>入门（最简单），再进阶无刷和伺服。</div>
          </div>
        `,
      },
      {
        id: 'beginner-params',
        title: '电机基本参数',
        desc: '理解描述电机性能的核心参数',
        icon: '📊',
        tags: ['基础理论', '必学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">核心性能参数</h3>
          <div class="overflow-x-auto">
            <table class="compare-table mb-6">
              <thead>
                <tr><th>参数</th><th>符号</th><th>单位</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>额定电压</strong></td><td>V</td><td>V（伏特）</td><td>电机正常工作的供电电压</td></tr>
                <tr><td><strong>额定电流</strong></td><td>I</td><td>A（安培）</td><td>电机持续运行时的电流</td></tr>
                <tr><td><strong>转矩</strong></td><td>T</td><td>N·m（牛·米）</td><td>电机输出的旋转力矩</td></tr>
                <tr><td><strong>转速</strong></td><td>n</td><td>RPM</td><td>每分钟转数</td></tr>
                <tr><td><strong>功率</strong></td><td>P</td><td>W（瓦特）</td><td>机械输出功率 P = T × ω</td></tr>
                <tr><td><strong>效率</strong></td><td>η</td><td>%</td><td>输出功率/输入功率 × 100%</td></tr>
                <tr><td><strong>KV值</strong></td><td>KV</td><td>RPM/V</td><td>每伏特电压对应的空载转速（无刷电机专用）</td></tr>
                <tr><td><strong>极对数</strong></td><td>p</td><td>-</td><td>磁极的对数，影响转速和扭矩特性</td></tr>
              </tbody>
            </table>
          </div>

          <div class="formula-block">
            $$P = T \\times \\omega = T \\times \\frac{2\\pi n}{60}$$
            <div class="text-sm text-gray-500 mt-2">P: 功率(W) | T: 转矩(N·m) | n: 转速(RPM)</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">关键关系</h4>
          <div class="info-box tip">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <div><strong>转矩-转速特性</strong>：对于直流电机，转速与转矩近似成反比关系。转矩越大，转速越低。理想空载转速 n₀ = V/(K·Φ)，堵转转矩 T_stall = K·Φ·I。</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">实操：如何测量这些参数</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            买来的二手电机往往没数据手册，或手册参数不全。下面是常用的<strong>实测方法</strong>，只需要万用表、示波器、电源：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>参数</th><th>测量工具</th><th>方法</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">相电阻 R</td><td>万用表(电阻档)</td><td>测电机两相端电阻。多次旋转转子取平均（消除换向器接触差异）</td></tr>
              <tr><td class="font-medium">空载转速</td><td>示波器+霍尔，或转速计</td><td>加额定电压空载，测霍尔信号频率 → n = 60×f/(极对数×换向模式)</td></tr>
              <tr><td class="font-medium">KV值(无刷)</td><td>电源+转速计</td><td>空载下测转速 n，KV = n / V。例：10V下12000RPM → KV=1200</td></tr>
              <tr><td class="font-medium">堵转电流</td><td>电源(限流)+电流表</td><td>卡死转子，缓慢升压到额定电流，读数。注意每次&lt;3秒防烧毁</td></tr>
              <tr><td class="font-medium">反电动势常数 Ke</td><td>示波器+示波器探头</td><td>用手匀速转动电机，测两相开路电压峰值，除以转速(RPM)</td></tr>
              <tr><td class="font-medium">转矩常数 Kt</td><td>计算</td><td>Kt ≈ 9.55 × Ke（国际单位下两者数值相等，单位不同）</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>堵转测量的风险</strong>：堵转时电机无反电动势抵消，电流 = V/R，可达额定电流的 5~20 倍。必须用<strong>限流电源</strong>（设上限为额定电流），且每次测试不超过 3 秒，否则烧绕组。有刷电机堵转还会烧电刷。</div>
          </div>
        `,
      },
      {
        id: 'beginner-drive',
        title: '驱动基础',
        desc: 'H桥原理、PWM调制等电机驱动基础知识',
        icon: '🔧',
        tags: ['基础理论', '驱动'],
        content: `
          <h3 class="text-lg font-semibold mb-3">如何让电机转起来</h3>

          <h4 class="font-medium mt-4 mb-2">H桥驱动电路</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            H桥是最基本的电机驱动电路，由4个开关管（MOSFET或三极管）组成"H"形状。
            通过控制对角线上的开关管导通/关断，实现电机的<strong>正转、反转、制动、自由滑行</strong>四种状态。
          </p>

          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>状态</th></tr></thead>
              <tbody>
                <tr><td>ON</td><td>OFF</td><td>OFF</td><td>ON</td><td>正转</td></tr>
                <tr><td>OFF</td><td>ON</td><td>ON</td><td>OFF</td><td>反转</td></tr>
                <tr><td>OFF</td><td>ON</td><td>OFF</td><td>ON</td><td>制动（短路制动）</td></tr>
                <tr><td>OFF</td><td>OFF</td><td>OFF</td><td>OFF</td><td>自由滑行</td></tr>
              </tbody>
            </table>
          </div>

          <div class="svg-figure">
            <div data-chart="hbridge" class="chart-container" style="min-height:420px;padding:8px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：H桥电路——点击上方按钮切换4种状态，观察导通MOS管和电流路径的变化</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">PWM调速原理</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            PWM（Pulse Width Modulation，脉宽调制）通过快速开关的占空比来控制电机两端的平均电压。
            占空比越大，平均电压越高，电机转速越快。
          </p>

          <div class="formula-block">
            $V_{avg} = D \\times V_{cc}$
            <div class="text-sm text-gray-500 mt-2">V_avg: 平均电压 | D: 占空比(0~1) | V_cc: 电源电压</div>
          </div>

          <div class="svg-figure">
            <div data-chart="pwm" class="chart-container" style="height:300px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：PWM调速——占空比越大，电机两端平均电压越高，转速越快（鼠标悬停看数值）</div>
          </div>

          <div class="info-box info">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>PWM频率选择</strong>：一般建议PWM频率在 10kHz~20kHz 以上（人耳听觉范围之外），避免电机发出刺耳噪音。常用频率：Arduino约490Hz/980Hz（可调），STM32可配置到数十kHz。</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">实战：STM32 HAL 配置 PWM 驱动电机</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            以 STM32 + L298N 驱动有刷直流电机为例。关键计算：<strong>PWM 频率 = 定时器时钟 / ((PSC+1) × (ARR+1))</strong>。
          </p>
          <div class="code-block"><span class="code-comment">/* 目标：在 PA8 (TIM1_CH1) 输出 20kHz PWM 控制电机转速
 * STM32F103 主频 72MHz
 * 选 PSC=0, ARR=3599 → 72MHz/3600 = 20kHz ✓
 * CCR 决定占空比：CCR=1800 → 50%；CCR=3600 → 100% */</span>

<span class="code-comment">// 1. CubeMX 配置：TIM1 → CH1 设为 PWM Generation CH1
//    PSC=0, ARR=3599, Pulse(初始 CCR)=0 */</span>

TIM_HandleTypeDef htim1;

<span class="code-keyword">void</span> <span class="code-func">Motor_PWM_Init</span>(<span class="code-keyword">void</span>) {
  <span class="code-comment">// 启动PWM输出（HAL已自动配置GPIO复用）*/</span>
  HAL_TIM_PWM_Start(&amp;htim1, TIM_CHANNEL_1);
}

<span class="code-comment">/**
 * 设置电机转速（占空比 0~1000 映射到 CCR 0~ARR）
 * @param speed 0=停, 1000=全速, 负值由方向引脚单独处理
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Motor_SetSpeed</span>(<span class="code-keyword">int16_t</span> speed) {
  <span class="code-keyword">if</span> (speed &lt; <span class="code-number">0</span>) speed = <span class="code-number">0</span>;
  <span class="code-keyword">if</span> (speed &gt; <span class="code-number">1000</span>) speed = <span class="code-number">1000</span>;
  <span class="code-comment">// speed(0~1000) → CCR(0~3599)</span>
  <span class="code-keyword">uint32_t</span> ccr = (<span class="code-keyword">uint32_t</span>)speed * <span class="code-number">3599</span> / <span class="code-number">1000</span>;
  __HAL_TIM_SET_COMPARE(&amp;htim1, TIM_CHANNEL_1, ccr);
}

<span class="code-comment">/* 使用：让电机以 60% 速度运转 */</span>
<span class="code-func">Motor_PWM_Init</span>();
<span class="code-func">Motor_SetSpeed</span>(<span class="code-number">600</span>);   <span class="code-comment">// 60% 占空比 */</span></div>
          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>调试技巧</strong>：先用万用表测电机两端电压——50%占空比时应该约等于电源电压的一半。如果不对，检查 PWM 引脚复用配置、L298N 使能脚(ENA)、共地。STM32 用 <code>__HAL_TIM_SET_COMPARE</code> 改占空比是零开销的（直接写寄存器），可在中断里高频调用。</div>
          </div>
        `,
      },
    ],
  },

  // ========== 进阶篇 ==========
  advanced: {
    title: '进阶篇',
    subtitle: '深入电机控制算法，掌握FOC、PID等核心技术',
    sections: [
      {
        id: 'advanced-pid',
        title: 'PID控制理论',
        desc: '电机控制中最基础也最重要的控制算法',
        icon: '🎚️',
        tags: ['控制理论', '核心算法'],
        content: `
          <h3 class="text-lg font-semibold mb-3">PID控制器</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            PID是Proportional（比例）、Integral（积分）、Derivative（微分）的缩写。
            它是工业控制中应用最广泛的反馈控制算法，在电机控制中几乎无处不在。
          </p>

          <div class="formula-block">
            $$u(t) = K_p e(t) + K_i \\int_0^t e(\\tau)d\\tau + K_d \\frac{de(t)}{dt}$$
            <div class="text-sm text-gray-500 mt-2">e(t): 误差（目标值 - 实际值）| Kp: 比例系数 | Ki: 积分系数 | Kd: 微分系数</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">三项的作用</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div class="font-medium text-blue-700 dark:text-blue-300 mb-1">P - 比例</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">误差越大，输出越大。响应快但可能超调和振荡。类似"弹簧"。</div>
            </div>
            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="font-medium text-green-700 dark:text-green-300 mb-1">I - 积分</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">消除稳态误差。累积历史误差，但可能导致积分饱和。类似"记忆"。</div>
            </div>
            <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div class="font-medium text-purple-700 dark:text-purple-300 mb-1">D - 微分</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">预测误差变化趋势，抑制超调。对噪声敏感。类似"阻尼器"。</div>
            </div>
          </div>

          <div class="info-box warning mt-4">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>电机控制中常用PI而非PID</strong>：在电流环控制中，由于电流采样噪声较大，微分项(D)通常会放大噪声，因此电机控制中的电流环几乎都只使用PI控制。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">位置式 vs 增量式：两种PID的根本区别</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            这两个概念是<strong>从理论到代码的关键分水岭</strong>。完整C代码实现见 <a href="#" onclick="navigateTo('advanced-pid-impl');return false;" style="color:var(--primary)">PID的C语言实现</a>，这里先理解本质：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>特性</th><th>位置式PID</th><th>增量式PID</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">输出含义</td><td>绝对值（如PWM占空比）</td><td>变化量Δu（如步进脉冲增量）</td></tr>
              <tr><td class="font-medium">积分项</td><td>需要累加历史误差</td><td>无显式积分（天然无累积）</td></tr>
              <tr><td class="font-medium">积分饱和</td><td>需额外抗饱和处理</td><td>天然不饱和</td></tr>
              <tr><td class="font-medium">掉电影响</td><td>需保存integral</td><td>无累积，重启无冲击</td></tr>
              <tr><td class="font-medium">典型应用</td><td>电流环、温度、舵机角度</td><td>步进电机、伺服位置环</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">积分饱和（Windup）：为什么PID会"失控"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            <strong>现象</strong>：当输出到达限幅（如PWM满量程）后，误差仍然存在，积分项持续累加。等误差反向时，巨大的积分值需要很久才能"卸"下来，导致<strong>严重超调</strong>。
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>钳位法（Clamping）</strong>：输出饱和时停止积分累加。实现最简单、效果稳定，工业首选。</div></div>
            <div class="step-item"><div><strong>反算法（Back-calculation）</strong>：把饱和量按系数反馈回积分项。更平滑但需调额外参数。</div></div>
            <div class="step-item"><div><strong>条件积分</strong>：误差大时禁用积分，仅小误差时启用。避免大偏差时积分失控。</div></div>
          </div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>最实用的判断</strong>：如果系统超调严重且恢复极慢，几乎都是积分饱和。加钳位法通常立竿见影。完整C代码见 <a href="#" onclick="navigateTo('advanced-pid-impl');return false;" style="color:var(--primary)">PID实现篇第四节</a>。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">PID调参方法：从"乱试"到"有章法"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            参数选择是PID的核心难点。下面三种方法从简单到专业递进，配合 <a href="#" onclick="navigateTo('engineering-validation');return false;" style="color:var(--primary)">工程验证方法论</a> 的阶跃响应验证：
          </p>

          <h4 class="font-medium mt-4 mb-2">方法一：手动试凑法（最常用）</h4>
          <div class="step-list">
            <div class="step-item"><div><strong>先P后I再D</strong>：Kp从0开始增大，直到系统开始<strong>等幅振荡</strong>，然后回退到振荡消失的60%。</div></div>
            <div class="step-item"><div><strong>加Ki</strong>：Ki从小值开始增大，直到<strong>稳态误差消除</strong>且不超调。Ki过大会振荡。</div></div>
            <div class="step-item"><div><strong>加Kd</strong>（可选）：Kd从0增大，直到<strong>超调减小</strong>。Kd过大会引入噪声抖动。电机电流环通常Kd=0。</div></div>
          </div>

          <h4 class="font-medium mt-4 mb-2">方法二：Ziegler-Nichols 法（半自动）</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            先只加P，找出系统的<strong>临界增益Ku</strong>（刚出现等幅振荡的Kp）和<strong>临界周期Tu</strong>（振荡周期），然后按公式算PID参数：
          </p>
          <div class="formula-block">
            $K_p = 0.6 K_u, \\quad K_i = \\frac{1.2 K_u}{T_u}, \\quad K_d = \\frac{0.075 K_u T_u}{1}$
            <div class="text-sm text-gray-500 mt-2">PI版：Kp=0.45Ku, Ki=0.54Ku/Tu</div>
          </div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>Z-N法注意</strong>：它给出的是<strong>起点</strong>不是终点，通常超调偏大（25%），实际还要微调。安全敏感系统（如伺服位置环）慎用，因为它要求系统<strong>到达临界振荡</strong>。</div></div>

          <h4 class="font-medium mt-4 mb-2">方法三：仿真/Matlab自动调参</h4>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div>用 <a href="#" onclick="navigateTo('matlab-sim');return false;" style="color:var(--primary)">Matlab仿真</a> 里的 <code>pidtune</code> 一行命令自动算出最优参数；或在仿真里用 <code>for</code> 循环画多条阶跃响应对比选最佳。这是<strong>最科学</strong>的方式，也是工业界标配。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">参数偏大偏小的现象速查</h3>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>参数</th><th>偏小</th><th>偏大</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">Kp</td><td>响应慢、稳态误差大</td><td>超调、振荡</td></tr>
              <tr><td class="font-medium">Ki</td><td>稳态误差消不掉</td><td>超调、积分饱和、恢复慢</td></tr>
              <tr><td class="font-medium">Kd</td><td>超调大</td><td>噪声放大、高频抖动</td></tr>
            </tbody>
          </table></div>
        `,
      },
      {
        id: 'advanced-pid-impl',
        title: 'PID的C语言实现',
        desc: '从理论到工程：位置式/增量式PID、抗饱和、定点、微分滤波、串级多环',
        icon: '💻',
        tags: ['核心算法', '工程实现'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么需要"工程化"的PID</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            上一篇讲了PID的数学原理，但把它直接搬到单片机上跑，会立刻遇到三个现实问题：
            <strong>积分饱和</strong>（误差长时间存在时积分项失控）、<strong>定点溢出</strong>（无FPU芯片上浮点太慢）、
            <strong>微分噪声</strong>（ADC采样毛刺被微分放大）。本节给出经过工程验证的C语言实现，可直接抄进你的驱动工程。
          </p>

          <div class="info-box tip mb-6">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>以下代码均为<strong>纯算法实现</strong>，不依赖任何MCU外设。移植时只需提供 <code>set_output()</code> 和 <code>read_feedback()</code> 两个函数即可。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、PID控制器数据结构</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            先定义一个通用的PID结构体，把所有状态变量打包在一起，方便管理多个控制环：
          </p>
          <div class="code-block"><span class="code-keyword">typedef struct</span> {
  <span class="code-comment">/* 设定参数 */</span>
  <span class="code-keyword">float</span> Kp;           <span class="code-comment">// 比例系数</span>
  <span class="code-keyword">float</span> Ki;           <span class="code-comment">// 积分系数</span>
  <span class="code-keyword">float</span> Kd;           <span class="code-comment">// 微分系数</span>
  <span class="code-keyword">float</span> out_min;      <span class="code-comment">// 输出下限（如 PWM 占空比 0）</span>
  <span class="code-keyword">float</span> out_max;      <span class="code-comment">// 输出上限（如 PWM 占空比 1000）</span>
  <span class="code-keyword">float</span> alpha;        <span class="code-comment">// 微分低通滤波系数（0~1，越小越平滑），用于滤波版</span>

  <span class="code-comment">/* 运行状态（每次更新会变化）*/</span>
  <span class="code-keyword">float</span> integral;     <span class="code-comment">// 积分累积量</span>
  <span class="code-keyword">float</span> last_error;   <span class="code-comment">// 上一次误差（位置式/增量式微分用）</span>
  <span class="code-keyword">float</span> prev_error;   <span class="code-comment">// 上上次误差（增量式专用）</span>
  <span class="code-keyword">float</span> last_meas;    <span class="code-comment">// 上一次测量值（测量微分法用）</span>
  <span class="code-keyword">float</span> d_filter_out; <span class="code-comment">// 微分项滤波输出（滤波版专用）</span>
} PID_t;

<span class="code-comment">/* 初始化：清零状态，设置参数和限幅 */</span>
<span class="code-keyword">void</span> <span class="code-func">PID_Init</span>(PID_t *pid, <span class="code-keyword">float</span> kp, <span class="code-keyword">float</span> ki, <span class="code-keyword">float</span> kd,
                <span class="code-keyword">float</span> min, <span class="code-keyword">float</span> max) {
  pid->Kp = kp;  pid->Ki = ki;  pid->Kd = kd;
  pid->out_min = min;  pid->out_max = max;
  pid->integral = <span class="code-number">0.0f</span>;
  pid->last_error = <span class="code-number">0.0f</span>;
  pid->last_meas  = <span class="code-number">0.0f</span>;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、位置式PID（最常用）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            位置式PID直接输出控制量的绝对值（如PWM占空比、阀门开度），公式：
          </p>
          <div class="formula-block">
            $u = K_p \\cdot e + K_i \\cdot \\sum e + K_d \\cdot \\frac{e - e_{last}}{\\Delta t}$
          </div>
          <div class="code-block"><span class="code-comment">/**
 * 位置式PID更新（每个控制周期调用一次）
 * @param setpoint  目标值
 * @param measured  实际测量值（编码器速度、ADC电流等）
 * @return          控制输出（已限幅到 [out_min, out_max]）
 */</span>
<span class="code-keyword">float</span> <span class="code-func">PID_Position_Update</span>(PID_t *pid, <span class="code-keyword">float</span> setpoint, <span class="code-keyword">float</span> measured) {
  <span class="code-keyword">float</span> error = setpoint - measured;

  <span class="code-comment">// 积分项（累加误差）</span>
  pid->integral += error;

  <span class="code-comment">// 微分项（用"误差变化"写法，简单但易受噪声影响）</span>
  <span class="code-keyword">float</span> derivative = error - pid->last_error;

  <span class="code-comment">// 合成输出</span>
  <span class="code-keyword">float</span> output = pid->Kp * error
                + pid->Ki * pid->integral
                + pid->Kd * derivative;

  <span class="code-comment">// 输出限幅</span>
  <span class="code-keyword">if</span> (output &gt; pid->out_max) output = pid->out_max;
  <span class="code-keyword">else if</span> (output &lt; pid->out_min) output = pid->out_min;

  pid->last_error = error;
  <span class="code-keyword">return</span> output;
}</div>
          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>这段代码有个致命缺陷</strong>：当输出到达限幅值后，<code>integral</code> 仍在持续累加（积分饱和）。等误差反向时，积分项需要很久才能"卸"下来，导致严重超调。下一节"抗饱和"专门解决这个问题。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、增量式PID（适合步进电机/伺服）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            增量式PID输出的是<strong>控制量的变化量</strong>（Δu），而不是绝对值。它天然避免了积分饱和问题，特别适合步进电机（每次加几个脉冲）、增量型执行机构。
          </p>
          <div class="code-block"><span class="code-comment">/**
 * 增量式PID：输出本次相对上次的增量 Δu
 * Δu = Kp(e_k - e_{k-1}) + Ki·e_k + Kd(e_k - 2e_{k-1} + e_{k-2})
 * 调用方需要自己累加：output += PID_Incremental_Update(...)
 */</span>
<span class="code-keyword">float</span> <span class="code-func">PID_Incremental_Update</span>(PID_t *pid, <span class="code-keyword">float</span> setpoint, <span class="code-keyword">float</span> measured) {
  <span class="code-keyword">float</span> error  = setpoint - measured;
  <span class="code-keyword">float</span> delta = pid->Kp * (error - pid->last_error)
                + pid->Ki * error
                + pid->Kd * (error - <span class="code-number">2</span>*pid->last_error + pid->prev_error);
  <span class="code-comment">// 用到 prev_error（上上次误差），已在 PID_t 中定义</span>
  pid->prev_error  = pid->last_error;
  pid->last_error  = error;
  <span class="code-keyword">return</span> delta;   <span class="code-comment">// 调用方：output += delta; 再对 output 限幅</span>
}</div>

          <h4 class="font-medium mt-4 mb-2">位置式 vs 增量式 选型对比</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>特性</th><th>位置式PID</th><th>增量式PID</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">输出含义</td><td>绝对值（PWM、电压）</td><td>变化量（步进脉冲、Δ）</td></tr>
              <tr><td class="font-medium">积分饱和</td><td>需额外抗饱和处理</td><td>天然无饱和</td></tr>
              <tr><td class="font-medium">掉电冲击</td><td>需保存 integral</td><td>无累积，无冲击</td></tr>
              <tr><td class="font-medium">故障影响</td><td>累积误差大</td><td>只影响一拍</td></tr>
              <tr><td class="font-medium">典型应用</td><td>电流环、温度、舵机角度</td><td>步进电机、伺服位置</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、抗积分饱和（钳位法）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            最实用的抗饱和方法是<strong>钳位法（Clamping）</strong>：只有当输出未饱和，或误差在帮助积分"回退"时，才允许积分累加。
          </p>
          <div class="code-block"><span class="code-keyword">float</span> <span class="code-func">PID_Position_Update_AW</span>(PID_t *pid, <span class="code-keyword">float</span> sp, <span class="code-keyword">float</span> meas) {
  <span class="code-keyword">float</span> error = sp - meas;

  <span class="code-comment">// 先不算积分，算出 P 和 D 项</span>
  <span class="code-keyword">float</span> p_term = pid->Kp * error;
  <span class="code-keyword">float</span> d_term = pid->Kd * (error - pid->last_error);

  <span class="code-comment">// 试探性加上积分，看是否会导致饱和</span>
  <span class="code-keyword">float</span> output_no_i = p_term + d_term;
  <span class="code-keyword">float</span> i_candidate = pid->integral + error;

  <span class="code-keyword">float</span> trial = output_no_i + pid->Ki * i_candidate;
  <span class="code-keyword">int</span> saturated = (trial &gt; pid->out_max) || (trial &lt; pid->out_min);

  <span class="code-comment">// 关键：仅在"未饱和"或"误差反向（能帮助脱离饱和）"时累积积分</span>
  <span class="code-keyword">if</span> (!saturated || (error &gt; <span class="code-number">0</span> &amp;&amp; trial &lt; pid->out_min)
                 || (error &lt; <span class="code-number">0</span> &amp;&amp; trial &gt; pid->out_max)) {
    pid->integral = i_candidate;
  }

  <span class="code-keyword">float</span> output = p_term + pid->Ki * pid->integral + d_term;
  <span class="code-keyword">if</span> (output &gt; pid->out_max) output = pid->out_max;
  <span class="code-keyword">else if</span> (output &lt; pid->out_min) output = pid->out_min;

  pid->last_error = error;
  <span class="code-keyword">return</span> output;
}</div>
          <div class="info-box info mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>其它抗饱和方法：<strong>反算法（Back-calculation）</strong>把饱和量按系数反馈回积分项；<strong>跟踪法（Tracking）</strong>用独立时间常数让积分跟踪实际输出。钳位法实现简单、效果稳定，是工业首选。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、微分项低通滤波（抑制噪声）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            微分项对高频噪声极度敏感（ADC毛刺会被放大成控制输出的剧烈跳变）。两个工程技巧：<strong>测量微分法</strong>（对测量值微分而非误差，避免设定值突变冲击）+ <strong>一阶低通滤波</strong>。
          </p>
          <div class="code-block"><span class="code-comment">/* 用到 PID_t 的 alpha、d_filter_out、last_meas 字段 */</span>

<span class="code-keyword">float</span> <span class="code-func">PID_Update_Filtered</span>(PID_t *pid, <span class="code-keyword">float</span> sp, <span class="code-keyword">float</span> meas) {
  <span class="code-keyword">float</span> error = sp - meas;
  pid->integral += error;

  <span class="code-comment">// 【关键】对"测量值"微分，而不是误差 —— 设定值跳变时不会冲击D项</span>
  <span class="code-keyword">float</span> d_raw = -(meas - pid->last_meas);   <span class="code-comment">// 注意负号</span>

  <span class="code-comment">// 一阶低通：alpha 越小滤波越强（典型 0.1~0.3）</span>
  <span class="code-comment">// y[k] = alpha·x[k] + (1-alpha)·y[k-1]</span>
  pid->d_filter_out = pid->alpha * d_raw
                    + (<span class="code-number">1.0f</span> - pid->alpha) * pid->d_filter_out;

  <span class="code-keyword">float</span> output = pid->Kp * error
                + pid->Ki * pid->integral
                + pid->Kd * pid->d_filter_out;

  <span class="code-keyword">if</span> (output &gt; pid->out_max) output = pid->out_max;
  <span class="code-keyword">else if</span> (output &lt; pid->out_min) output = pid->out_min;

  pid->last_meas  = meas;
  pid->last_error = error;
  <span class="code-keyword">return</span> output;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、定点PID（无FPU平台专用）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Cortex-M0/M0+/M3 没有硬件浮点单元，<code>float</code> 运算靠软件模拟，一次乘法要几十个时钟周期。用<strong>Q15定点数</strong>（用 int16_t 表示 -1~0.9999）可以提速 5-10 倍。
          </p>
          <div class="code-block"><span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">int16_t</span> Kp, Ki, Kd;       <span class="code-comment">// Q15 格式参数（-32768~32767 表示 -1.0~0.99997）</span>
  <span class="code-keyword">int32_t</span> integral;        <span class="code-comment">// Q30 累积，避免溢出</span>
  <span class="code-keyword">int16_t</span> last_error;      <span class="code-comment">// Q15 误差</span>
  <span class="code-keyword">int16_t</span> out_max;         <span class="code-comment">// Q15 输出限幅</span>
} PID_Q15_t;

<span class="code-comment">/* Q15 乘法：两个 Q15 相乘得 Q30，右移15位回到 Q15 */</span>
<span class="code-keyword">static inline int16_t</span> <span class="code-func">q15_mul</span>(<span class="code-keyword">int16_t</span> a, <span class="code-keyword">int16_t</span> b) {
  <span class="code-keyword">return</span> (<span class="code-keyword">int16_t</span>)((<span class="code-keyword">int32_t</span>)a * b &gt;&gt; <span class="code-number">15</span>);
}

<span class="code-comment">/* 定点PID更新：所有运算用整数，零浮点开销 */</span>
<span class="code-keyword">int16_t</span> <span class="code-func">PID_Q15_Update</span>(PID_Q15_t *pid, <span class="code-keyword">int16_t</span> sp, <span class="code-keyword">int16_t</span> meas) {
  <span class="code-keyword">int16_t</span> error = sp - meas;          <span class="code-comment">// Q15 误差</span>
  pid->integral += (<span class="code-keyword">int32_t</span>)error &lt;&lt; <span class="code-number">15</span>;   <span class="code-comment">// 累积到 Q30</span>

  <span class="code-keyword">int16_t</span> p_term = <span class="code-func">q15_mul</span>(pid->Kp, error);
  <span class="code-keyword">int16_t</span> i_term = <span class="code-func">q15_mul</span>(pid->Ki, (<span class="code-keyword">int16_t</span>)(pid->integral &gt;&gt; <span class="code-number">15</span>));
  <span class="code-keyword">int16_t</span> d_term = <span class="code-func">q15_mul</span>(pid->Kd, (<span class="code-keyword">int16_t</span>)(error - pid->last_error));

  <span class="code-keyword">int32_t</span> out = (<span class="code-keyword">int32_t</span>)p_term + i_term + d_term;
  <span class="code-keyword">if</span> (out &gt; pid->out_max) out = pid->out_max;
  <span class="code-keyword">if</span> (out &lt; -pid->out_max) out = -pid->out_max;

  pid->last_error = error;
  <span class="code-keyword">return</span> (<span class="code-keyword">int16_t</span>)out;
}</div>
          <div class="info-box info mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>定点数转换：<code>Kp_Q15 = (int16_t)(Kp_float × 32768)</code>。CMSIS-DSP 库已提供 <code>arm_pid_q15</code> 现成实现，原理相同。Cortex-M4F/M7 有硬件FPU，直接用浮点版即可。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">七、串级PID（机械臂/伺服的核心架构）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            高性能运动控制用<strong>三个PID嵌套</strong>：外环的输出是内环的设定值。机械臂、伺服、无人机姿态控制都是这套结构。
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>位置环（外环，最慢）</strong>：输入目标位置，输出目标速度。带宽 10~100Hz。</div></div>
            <div class="step-item"><div><strong>速度环（中环）</strong>：输入目标速度，输出目标电流（力矩）。带宽 100~500Hz。</div></div>
            <div class="step-item"><div><strong>电流环（内环，最快）</strong>：输入目标电流，输出PWM占空比。带宽 1~10kHz。</div></div>
          </div>
          <div class="code-block"><span class="code-keyword">PID_t</span> pid_pos, pid_vel, pid_cur;   <span class="code-comment">// 三个独立的PID实例</span>

<span class="code-comment">/**
 * 串级控制：在主中断里依次调用三个环
 * @note 电流环频率最高（如10kHz），速度环/位置环可以降频（如1kHz）
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Cascade_Control</span>(<span class="code-keyword">float</span> target_pos, <span class="code-keyword">float</span> cur_pos,
                     <span class="code-keyword">float</span> cur_vel, <span class="code-keyword">float</span> cur_cur) {
  <span class="code-comment">// 1. 位置环：算出目标速度（外环输出 = 内环设定值）</span>
  <span class="code-keyword">float</span> target_vel = <span class="code-func">PID_Position_Update_AW</span>(&amp;pid_pos, target_pos, cur_pos);

  <span class="code-comment">// 2. 速度环：算出目标电流</span>
  <span class="code-keyword">float</span> target_cur = <span class="code-func">PID_Position_Update_AW</span>(&amp;pid_vel, target_vel, cur_vel);

  <span class="code-comment">// 3. 电流环：算出PWM占空比，输出到定时器</span>
  <span class="code-keyword">float</span> pwm = <span class="code-func">PID_Position_Update_AW</span>(&amp;pid_cur, target_cur, cur_cur);
  <span class="code-func">Set_PWM_Duty</span>((<span class="code-keyword">uint16_t</span>)pwm);
}</div>
          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>调试顺序：从内到外</strong>。先把电流环（内环）调到又快又稳，再调速度环，最后调位置环。内环带宽约为外环的5~10倍，否则外环变化太快内环跟不上。</div>
          </div>

          <h4 class="font-medium mt-6 mb-2">参数整定速查（电机场景）</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>参数</th><th>偏小</th><th>偏大</th><th>经验起始值</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">Kp</td><td>响应慢、稳态误差大</td><td>超调、振荡</td><td>从0.1起，倍增至振荡后回退60%</td></tr>
              <tr><td class="font-medium">Ki</td><td>稳态误差消不掉</td><td>超调、积分饱和</td><td>Ki = Kp / (控制周期×10)</td></tr>
              <tr><td class="font-medium">Kd</td><td>超调大</td><td>噪声放大、高频抖动</td><td>电机电流环通常设0（用PI）</td></tr>
            </tbody>
          </table></div>
        `,
      },
      {
        id: 'encoder',
        title: '编码器与位置反馈',
        desc: '增量/绝对编码器原理、AB正交解码、M法T法测速、AS5600 SPI读取',
        icon: '🎯',
        tags: ['位置反馈', '传感器'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么编码器是闭环控制的"眼睛"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            开环控制（步进电机发脉冲）假设"我发多少脉冲，电机就走多少角度"。但现实中有负载、有丢步、有机械间隙。
            <strong>编码器</strong>把电机的实际位置/速度反馈给MCU，构成闭环，是实现精确定位（机械臂、CNC、伺服）的前提。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、编码器分类与选型</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            按输出信号和原理，编码器主要分三类：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>类型</th><th>输出</th><th>断电记忆</th><th>典型分辨率</th><th>常见型号</th><th>适用场景</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">增量式<br>(AB正交)</td><td>两路方波脉冲</td><td>❌ 需找零</td><td>100-10000线/转</td><td>霍尔、光电A/B相</td><td>速度测量、BLDC换向</td></tr>
              <tr><td class="font-medium">绝对式<br>(数字接口)</td><td>角度绝对值</td><td>✅ 上电即知位置</td><td>12-23位</td><td>AS5047/AS5600</td><td>机械臂关节、伺服</td></tr>
              <tr><td class="font-medium">单相<br>(仅计数)</td><td>一路脉冲</td><td>❌</td><td>低</td><td>简易光电/霍尔</td><td>测速、简单计数</td></tr>
            </tbody>
          </table></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🔦 光电编码器</div>
              <div class="text-sm text-gray-500">精度高、分辨率高，但怕灰尘油污。工业伺服主流。</div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🧲 磁编码器</div>
              <div class="text-sm text-gray-500">抗油污抗振动，体积小。AS5600/AS5047 是代表，机械臂DIY首选。</div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">📡 霍尔传感器</div>
              <div class="text-sm text-gray-500">分辨率低（仅几个状态），用于BLDC换向，不适合精确定位。</div>
            </div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、增量式AB正交解码原理</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            增量式编码器输出 A、B 两路相位差 90° 的方波。通过比较 A、B 的相位前后，可判断<strong>转向</strong>；通过计数脉冲，可知<strong>位移</strong>。
          </p>
          <div class="formula-block">
            $\\text{分辨率} = \\frac{360°}{\\text{PPR} \\times 4}$
            <div class="text-sm text-gray-500 mt-2">PPR = 每转脉冲数。×4 是因为A、B的上升下降沿都被计数（4倍频）</div>
          </div>

          <div class="svg-figure">
            <div data-chart="encoder" class="chart-container" style="height:300px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：A/B两路方波相位差90°，红点为4倍频计数边沿（A、B的上升下降沿各算一次）</div>
          </div>

          <div class="info-box tip mt-3 mb-4">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>转向判断</strong>：A 相超前 B 相 90° → 正转；B 相超前 A 相 90° → 反转。<strong>4倍频</strong>：同时检测 A、B 的上升沿和下降沿，分辨率提升 4 倍。1000 PPR 编码器 4 倍频后等效 4000 脉冲/转。</div>
          </div>

          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            软件 GPIO 中断解码会占用大量 CPU。STM32 等MCU内置了<strong>硬件正交解码器</strong>，把 A、B 直接接到定时器通道，硬件自动完成计数和方向判断：
          </p>
          <div class="code-block"><span class="code-comment">/* STM32 HAL：定时器编码器模式配置（纯算法+寄存器对照）*/</span>
<span class="code-comment">// 核心寄存器：TIMx->SMCR 的 SMS 位决定编码器模式</span>
<span class="code-comment">// SMS=011: 双通道4倍频（同时检测A、B的上升下降沿）</span>
<span class="code-comment">// SMS=010: 仅B相边沿（2倍频）  SMS=001: 仅A相边沿（2倍频）</span>

<span class="code-comment">/* 等价的纯软件解码算法（理解原理用，实际用硬件）*/</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">uint8_t</span> last_state;     <span class="code-comment">// 上一次 A,B 状态（bit0=A, bit1=B）*/</span>
  <span class="code-keyword">int32_t</span> count;          <span class="code-comment">// 累计计数（带方向）*/</span>
} Quadrature_t;

<span class="code-comment">// 状态转移表：根据 (旧状态, 新状态) 决定 +1 / -1 / 0
// 这是硬件解码器内部做的事，列出帮助理解 */</span>
<span class="code-keyword">static const int8_t</span> TRANS[16] = {
   <span class="code-number">0</span>, -<span class="code-number">1</span>,  <span class="code-number">1</span>,  <span class="code-number">0</span>,   <span class="code-comment">// 旧状态 00 → 新状态 00/01/10/11 */</span>
   <span class="code-number">1</span>,  <span class="code-number">0</span>,  <span class="code-number">0</span>, -<span class="code-number">1</span>,   <span class="code-comment">// 旧状态 01 */</span>
  -<span class="code-number">1</span>,  <span class="code-number">0</span>,  <span class="code-number">0</span>,  <span class="code-number">1</span>,   <span class="code-comment">// 旧状态 10 */</span>
   <span class="code-number">0</span>,  <span class="code-number">1</span>, -<span class="code-number">1</span>,  <span class="code-number">0</span>    <span class="code-comment">// 旧状态 11 */</span>
};

<span class="code-keyword">void</span> <span class="code-func">Quad_Update</span>(Quadrature_t *q, <span class="code-keyword">uint8_t</span> ab) {
  <span class="code-keyword">uint8_t</span> idx = (q->last_state &lt;&lt; <span class="code-number">2</span>) | (ab & <span class="code-number">0x03</span>);
  q->count += TRANS[idx];
  q->last_state = ab & <span class="code-number">0x03</span>;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、STM32定时器编码器模式（硬件4倍频）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            实际工程中用硬件解码器，MCU几乎零开销。配置好后，直接读 <code>TIMx-&gt;CNT</code> 就是当前累计位置：
          </p>
          <div class="code-block"><span class="code-keyword">#define</span> ENC_PPR       <span class="code-number">1000</span>     <span class="code-comment">// 编码器每转脉冲数</span>
<span class="code-keyword">#define</span> ENC_CPR       (ENC_PPR * <span class="code-number">4</span>)  <span class="code-comment">// 4倍频后计数：4000</span>

<span class="code-keyword">int32_t</span> enc_count_prev = <span class="code-number">0</span>;       <span class="code-comment">// 用于溢出累加（16位CNT会回卷）*/</span>
<span class="code-keyword">int32_t</span> enc_total = <span class="code-number">0</span>;            <span class="code-comment">// 32位总位置，永不溢出 */</span>

<span class="code-comment">/**
 * 读取累计位置（解决16位回卷问题）
 * 在固定周期（如1ms）调用，把本次CNT增量累加到32位总位置
 */</span>
<span class="code-keyword">int32_t</span> <span class="code-func">Encoder_ReadTotal</span>(TIM_TypeDef *TIMx) {
  <span class="code-keyword">int16_t</span> cnt_now = (<span class="code-keyword">int16_t</span>)TIMx->CNT;    <span class="code-comment">// 硬件计数值（带符号）*/</span>
  <span class="code-keyword">int16_t</span> delta  = cnt_now - (<span class="code-keyword">int16_t</span>)enc_count_prev;
  enc_total     += delta;                  <span class="code-comment">// 累加到32位</span>
  enc_count_prev = cnt_now;
  <span class="code-keyword">return</span> enc_total;
}

<span class="code-comment">/* 总位置 → 角度（度）*/</span>
<span class="code-keyword">float</span> <span class="code-func">Encoder_ToAngle</span>(<span class="code-keyword">int32_t</span> total) {
  <span class="code-keyword">return</span> (<span class="code-keyword">float</span>)total * <span class="code-number">360.0f</span> / ENC_CPR;
}</div>

          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>16位回卷是必踩的坑</strong>：定时器 CNT 是 16 位（0~65535），电机连续转超过一圈就会溢出。必须在固定周期频繁采样 + 累加（如上），才能得到连续的 32 位位置。否则位置会突变几万。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、M法与T法测速</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            有了位置，还要算<strong>速度</strong>。两种经典方法各有适用范围：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>方法</th><th>原理</th><th>适用转速</th><th>优缺点</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">M法<br>(测频法)</td><td>固定时间T内数脉冲数M<br>v = M / (T × CPR)</td><td>中高速</td><td>高速准；低速时脉冲少，误差大</td></tr>
              <tr><td class="font-medium">T法<br>(测周法)</td><td>测一个脉冲的周期t<br>v = 1 / (t × CPR)</td><td>低速</td><td>低速准；高速时脉冲太密，测不准</td></tr>
              <tr><td class="font-medium">M/T法</td><td>两者结合</td><td>全速段</td><td>最准，实现复杂</td></tr>
            </tbody>
          </table></div>

          <div class="code-block"><span class="code-comment">/**
 * M法测速：在控制周期 T_ctrl 内，根据位置增量算速度
 * @param total_now  当前32位总位置
 * @param total_prev 上一周期的总位置
 * @param T_ctrl     控制周期(秒)，如 0.001 = 1ms
 * @return           转速 RPM
 */</span>
<span class="code-keyword">float</span> <span class="code-func">Speed_M_Method</span>(<span class="code-keyword">int32_t</span> total_now, <span class="code-keyword">int32_t</span> total_prev, <span class="code-keyword">float</span> T_ctrl) {
  <span class="code-keyword">int32_t</span> delta = total_now - total_prev;   <span class="code-comment">// 一个周期内的脉冲增量</span>
  <span class="code-keyword">float</span> rev = (<span class="code-keyword">float</span>)delta / ENC_CPR;     <span class="code-comment">// 转数</span>
  <span class="code-keyword">float</span> rps = rev / T_ctrl;                   <span class="code-comment">// 每秒转数</span>
  <span class="code-keyword">return</span> rps * <span class="code-number">60.0f</span>;                          <span class="code-comment">// 转 RPM</span>
}

<span class="code-comment">/**
 * T法测速：用高频时钟测一个编码器脉冲的宽度
 * @param timer_ticks  一个脉冲内的MCU时钟周期数
 * @param timer_freq   MCU定时器频率(Hz)
 * @return             转速 RPM
 */</span>
<span class="code-keyword">float</span> <span class="code-func">Speed_T_Method</span>(<span class="code-keyword">uint32_t</span> timer_ticks, <span class="code-keyword">uint32_t</span> timer_freq) {
  <span class="code-keyword">if</span> (timer_ticks == <span class="code-number">0</span>) <span class="code-keyword">return</span> <span class="code-number">0</span>;
  <span class="code-keyword">float</span> pulse_period = (<span class="code-keyword">float</span>)timer_ticks / timer_freq;  <span class="code-comment">// 一个脉冲的秒数</span>
  <span class="code-keyword">float</span> rps = <span class="code-number">1.0f</span> / (pulse_period * ENC_CPR);       <span class="code-comment">// 每秒转数</span>
  <span class="code-keyword">return</span> rps * <span class="code-number">60.0f</span>;
}</div>

          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>实用技巧</strong>：M法算出的速度噪声大时，可对结果做一阶低通滤波：<code>v_out = α·v_new + (1-α)·v_last</code>。α 越小越平滑但延迟越大。或者直接用<strong>卡尔曼滤波</strong>融合位置和速度估计。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、绝对编码器SPI读取（AS5600/AS5047）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            绝对编码器<strong>上电即知位置</strong>，无需找零，是机械臂关节的首选。AS5600（12位，I²C）、AS5047（14位，SPI）最常见。下面是通用的 SPI 读取骨架（纯算法）：
          </p>
          <div class="code-block"><span class="code-comment">/* AS5047 14位磁绝对编码器 SPI 读取
 * 寄存器 0x3FFE = 角度值（14位，0~16383 对应 0~360°）*/</span>
<span class="code-keyword">#define</span> AS5047_ANGLE_REG   <span class="code-number">0x3FFE</span>
<span class="code-keyword">#define</span> AS5047_RESOLUTION  <span class="code-number">16384</span>    <span class="code-comment">// 2^14</span>

<span class="code-comment">/* 平台相关：由调用方实现 SPI 收发（HAL/寄存器/软SPI均可）*/</span>
<span class="code-keyword">extern uint16_t</span> <span class="code-func">SPI_Transfer16</span>(<span class="code-keyword">uint16_t</span> cmd);

<span class="code-comment">/**
 * 读取角度（0~360度，浮点）
 * 注意：AS5047 命令字最高位=1表示读，bit14=0
 */</span>
<span class="code-keyword">float</span> <span class="code-func">AS5047_ReadAngle</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">uint16_t</span> raw = <span class="code-func">SPI_Transfer16</span>(AS5047_ANGLE_REG | <span class="code-number">0x4000</span>);
  raw &= <span class="code-number">0x3FFF</span>;                          <span class="code-comment">// 取低14位有效数据</span>
  <span class="code-keyword">return</span> (<span class="code-keyword">float</span>)raw * <span class="code-number">360.0f</span> / AS5047_RESOLUTION;
}

<span class="code-comment">/**
 * 角度差计算（处理跨越0°/360°边界）
 * 例：350° 到 10°，实际走了 +20°，而不是 -340°
 */</span>
<span class="code-keyword">float</span> <span class="code-func">Angle_Diff</span>(<span class="code-keyword">float</span> a, <span class="code-keyword">float</span> b) {
  <span class="code-keyword">float</span> d = a - b;
  <span class="code-keyword">while</span> (d &gt;  <span class="code-number">180.0f</span>) d -= <span class="code-number">360.0f</span>;
  <span class="code-keyword">while</span> (d &lt; -<span class="code-number">180.0f</span>) d += <span class="code-number">360.0f</span>;
  <span class="code-keyword">return</span> d;
}</div>

          <div class="info-box info mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>选型建议</strong>：预算有限选 AS5600（I²C，几块钱，12位精度够 DIY）；工业级选 AS5047（SPI，14位，带宽高）；超高速场景选旋转变压器（Resolver，模拟量，抗干扰极强但需专用解码芯片如 AD2S1210）。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、编码器在电机控制中的三种用法</h3>
          <div class="step-list">
            <div class="step-item"><div><strong>速度反馈</strong>：M法算出转速 → 喂给速度环 PID → 稳速控制。直流电机闭环调速的基础。</div></div>
            <div class="step-item"><div><strong>位置反馈</strong>：累计位置 → 喂给位置环 PID → 精确定位。机械臂关节、CNC、3D打印机。</div></div>
            <div class="step-item"><div><strong>换向信号（BLDC）</strong>：霍尔或高分辨率编码器提供转子位置 → 决定哪两相通电。FOC 的电角度 θ 就来自这里。</div></div>
          </div>

          <h4 class="font-medium mt-6 mb-2">分辨率选择速查</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>应用</th><th>建议分辨率</th><th>理由</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">BLDC换向</td><td>霍尔（60°电角度）</td><td>六步换向只需6个状态，够用</td></tr>
              <tr><td class="font-medium">直流电机调速</td><td>100-1000 PPR</td><td>速度环对分辨率要求不高</td></tr>
              <tr><td class="font-medium">机械臂关节</td><td>12-14位绝对编码器</td><td>定位精度 0.02-0.08°，断电不丢位</td></tr>
              <tr><td class="font-medium">CNC/伺服</td><td>17-23位绝对</td><td>微米级定位，需高精度+高带宽</td></tr>
            </tbody>
          </table></div>
        `,
      },
      {
        id: 'bldc-commutation',
        title: 'BLDC六步换向实现',
        desc: '霍尔读取、换向查表、互补PWM与死区——无刷电机控制的第一步',
        icon: '🔄',
        tags: ['核心算法', 'BLDC'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么无刷电机需要"换向"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            有刷电机靠<strong>机械换向器+电刷</strong>自动切换电流方向，转子转着转着就能持续受力。
            无刷电机（BLDC）去掉了电刷，必须由<strong>MCU根据转子位置主动切换三相绕组的通电顺序</strong>——这就是"换向"（Commutation）。
            六步换向（Six-Step / 梯形波控制）是最基础的无刷控制方式，理解了它才能进阶到 FOC。
          </p>

          <div class="info-box tip mb-6">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>六步换向的本质</strong>：转子每转一圈（电角度360°），按 60° 划分成 6 个区间。每个区间内，<strong>两相通电、一相悬空</strong>，通过 6 种开关组合让转子持续受力旋转。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、霍尔传感器：告诉MCU转子在哪</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            BLDC 通常内置 3 个霍尔传感器（Ha、Hb、Hc），相位互相错开 120°电角度。3 个霍尔的高低电平组合出 <strong>8 种状态</strong>，其中 6 种有效（对应 6 个换向区间），2 种无效（全 0 或全 1，表示故障）。
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>Ha Hb Hc</th><th>电角度</th><th>通电相</th><th>电流路径</th></tr></thead>
            <tbody>
              <tr><td class="font-mono">1 0 1</td><td>0°</td><td>A→B</td><td>A相进、B相出、C悬空</td></tr>
              <tr><td class="font-mono">1 0 0</td><td>60°</td><td>A→C</td><td>A相进、C相出、B悬空</td></tr>
              <tr><td class="font-mono">1 1 0</td><td>120°</td><td>B→C</td><td>B相进、C相出、A悬空</td></tr>
              <tr><td class="font-mono">0 1 0</td><td>180°</td><td>B→A</td><td>B相进、A相出、C悬空</td></tr>
              <tr><td class="font-mono">0 1 1</td><td>240°</td><td>C→A</td><td>C相进、A相出、B悬空</td></tr>
              <tr><td class="font-mono">0 0 1</td><td>300°</td><td>C→B</td><td>C相进、B相出、A悬空</td></tr>
            </tbody>
          </table></div>

          <div class="svg-figure">
            <div data-chart="hall" class="chart-container" style="height:300px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：3路霍尔信号互错120°电角度，6次跳变划分6个换向区间（鼠标悬停看电平）</div>
          </div>

          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>这张表是核心</strong>！不同电机/霍尔安装位置不同，表的顺序可能不一样。实际调试时<strong>必须用示波器抓霍尔波形+相电压</strong>，对照确认你这张表是否正确，否则电机会反转、抖动甚至堵转。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、读取霍尔状态</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            霍尔信号接 MCU 的 3 个 GPIO（或定时器输入捕获引脚）。两种读取方式：
          </p>
          <div class="code-block"><span class="code-comment">/* 方式1：主循环轮询读取（简单，适合低速）*/</span>
<span class="code-keyword">#define</span> HALL_A_PIN  GPIO_PIN_0
<span class="code-keyword">#define</span> HALL_B_PIN  GPIO_PIN_1
<span class="code-keyword">#define</span> HALL_C_PIN  GPIO_PIN_2
<span class="code-keyword">#define</span> HALL_PORT  GPIOA

<span class="code-comment">/* 读3个霍尔引脚，拼成 0bHHH 的值（0~7）*/</span>
<span class="code-keyword">uint8_t</span> <span class="code-func">Hall_Read</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">uint8_t</span> h = <span class="code-number">0</span>;
  <span class="code-keyword">if</span> (HAL_GPIO_ReadPin(HALL_PORT, HALL_A_PIN)) h |= <span class="code-number">0x04</span>;  <span class="code-comment">// bit2 = A</span>
  <span class="code-keyword">if</span> (HAL_GPIO_ReadPin(HALL_PORT, HALL_B_PIN)) h |= <span class="code-number">0x02</span>;  <span class="code-comment">// bit1 = B</span>
  <span class="code-keyword">if</span> (HAL_GPIO_ReadPin(HALL_PORT, HALL_C_PIN)) h |= <span class="code-number">0x01</span>;  <span class="code-comment">// bit0 = C</span>
  <span class="code-keyword">return</span> h;   <span class="code-comment">// 返回 0bABC，范围 0~7</span>
}

<span class="code-comment">/* 方式2：外部中断（高效，霍尔每次跳变触发换向）
 * 把3个霍尔引脚配置为 EXTI 上升/下降沿触发
 * 任何一根霍尔变化 → 立即进中断 → 读取并换向 */</span>
<span class="code-keyword">void</span> <span class="code-func">HAL_GPIO_EXTI_Callback</span>(<span class="code-keyword">uint16_t</span> pin) {
  <span class="code-keyword">if</span> (pin == HALL_A_PIN || pin == HALL_B_PIN || pin == HALL_C_PIN) {
    <span class="code-func">BLDC_Commutate</span>();    <span class="code-comment">// 霍尔变了，立即换向</span>
  }
}</div>

          <div class="info-box info mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>STM32 还有更高级的<strong>定时器霍尔接口模式</strong>（TIMx_SMCR.TS=Hall Sensor），把3个霍尔接到 TI1~TI3，硬件自动异或后触发中断，响应最快。本质和 EXTI 一样，只是硬件加速。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、换向查表（核心代码）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把霍尔状态 → 三相桥臂开关状态的映射做成<strong>查找表</strong>，换向就是查一次表+改定时器输出。三相桥每相由上桥（H）和下桥（L）两个 MOS 管组成，"ON"=导通、"OFF"=关断、"PWM"=脉宽调制（调速）。
          </p>
          <div class="code-block"><span class="code-comment">/* 每相桥臂的三种状态：
 *   PHASE_HIGH = 上桥臂 PWM（电流流入该相，"入口"）
 *   PHASE_LOW  = 下桥臂常通（电流流出该相，"出口"）
 *   PHASE_OFF  = 上下都关（该相悬空，不参与本区间） */</span>
<span class="code-keyword">typedef enum</span> { PHASE_OFF = <span class="code-number">0</span>, PHASE_LOW = <span class="code-number">1</span>, PHASE_HIGH = <span class="code-number">2</span> } PhaseState;

<span class="code-comment">/* 换向表：8种霍尔状态 → {A相, B相, C相} 的桥臂状态
 * 索引 0~7 对应 HaHbHc 的 0bABC 值
 * 注释里的 "入口→出口" 描述电流方向，HIGH=入口、LOW=出口
 * ⚠ 此表为典型示例，不同电机相序/霍尔安装可能不同，调试时需用示波器确认 */</span>
<span class="code-keyword">static const</span> PhaseState COMMUTATION_TABLE[<span class="code-number">8</span>][<span class="code-number">3</span>] = {
  <span class="code-comment">/*  Ha Hb Hc     A           B           C          电流方向 */</span>
  { PHASE_OFF,  PHASE_OFF,  PHASE_OFF  }, <span class="code-comment">// 000 非法</span>
  { PHASE_OFF,  PHASE_HIGH, PHASE_LOW  }, <span class="code-comment">// 001 入口B→出口C</span>
  { PHASE_HIGH, PHASE_OFF,  PHASE_LOW  }, <span class="code-comment">// 010 入口A→出口C</span>
  { PHASE_HIGH, PHASE_LOW,  PHASE_OFF  }, <span class="code-comment">// 011 入口A→出口B</span>
  { PHASE_LOW,  PHASE_OFF,  PHASE_HIGH }, <span class="code-comment">// 100 入口C→出口A</span>
  { PHASE_LOW,  PHASE_HIGH, PHASE_OFF  }, <span class="code-comment">// 101 入口B→出口A</span>
  { PHASE_OFF,  PHASE_LOW,  PHASE_HIGH }, <span class="code-comment">// 110 入口C→出口B</span>
  { PHASE_OFF,  PHASE_OFF,  PHASE_OFF  }, <span class="code-comment">// 111 非法</span>
};

<span class="code-comment">/**
 * 执行换向：读霍尔 → 查表 → 配置三相PWM输出
 * 在霍尔变化的中断里调用，或主循环周期性调用
 */</span>
<span class="code-keyword">void</span> <span class="code-func">BLDC_Commutate</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">uint8_t</span> hall = <span class="code-func">Hall_Read</span>();              <span class="code-comment">// 0~7</span>
  <span class="code-keyword">const</span> PhaseState *phase = COMMUTATION_TABLE[hall];

  <span class="code-comment">// 根据查表结果配置每一相</span>
  <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; <span class="code-number">3</span>; i++) {
    <span class="code-keyword">switch</span> (phase[i]) {
      <span class="code-keyword">case</span> PHASE_HIGH: <span class="code-comment">// 上桥PWM，下桥关</span>
        <span class="code-func">SetPhasePWM</span>(i, g_duty);     <span class="code-comment">// 输出PWM（占空比决定力矩）*/</span>
        <span class="code-keyword">break</span>;
      <span class="code-keyword">case</span> PHASE_LOW:  <span class="code-comment">// 下桥常通（或也PWM）</span>
        <span class="code-func">SetPhaseLow</span>(i);
        <span class="code-keyword">break</span>;
      <span class="code-keyword">default</span>:           <span class="code-comment">// OFF 悬空</span>
        <span class="code-func">SetPhaseFloat</span>(i);
        <span class="code-keyword">break</span>;
    }
  }
}</div>

          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>这张表几乎肯定要改</strong>。不同电机的霍尔安装角度、相序（UVW vs UWV）不同，照搬代码电机可能反转或不转。调试方法见下节——<strong>先用手转电机+抓霍尔，再对照示波器波形确认表的正确性</strong>。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、互补PWM与死区（必须懂）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            三相桥每相的上下两个 MOS 管<strong>绝不能同时导通</strong>，否则电源直接短路（"直通"，瞬间烧管）。用<strong>互补PWM</strong>+<strong>死区时间</strong>解决：上桥开则下桥关，且切换的瞬间两者都关一小段时间（死区，约 500ns~2μs）。
          </p>
          <div class="code-block"><span class="code-comment">/* STM32 高级定时器（TIM1/TIM8）支持硬件互补PWM + 死区
 * 配置一次即可，硬件自动插入死区，无需软件干预 */</span>

<span class="code-comment">// 死区时间配置：不同MCU寄存器不同，但原理一致——
// 在上下桥切换的瞬间，强制两管都关断一小段时间(几百ns~几us)
// 例如 STM32 高级定时器的 BDTR.DTG[7:0] 字段（参考公式见下方注释）
//   72MHz主频下：DTG=0x40→0.89us, DTG=0x80→3.56us, DTG=0xA0→4.45us
//   公式(DTG[7:5]=10x段)：t_DTG = (32 + DTG[4:0]) × 8 × tDTS */</span>

<span class="code-comment">/* 平台无关的抽象：由调用方实现底层PWM配置 */</span>
<span class="code-keyword">extern void</span> <span class="code-func">PWM_Init_3Phase_Complementary</span>(<span class="code-keyword">uint16_t</span> dead_time_ns);  <span class="code-comment">// 启动3对互补PWM+死区</span>
<span class="code-keyword">extern void</span> <span class="code-func">PWM_SetDuty</span>(<span class="code-keyword">uint8_t</span> phase, <span class="code-keyword">uint16_t</span> duty);     <span class="code-comment">// 设置某相占空比</span>
<span class="code-keyword">extern void</span> <span class="code-func">PWM_SetFloat</span>(<span class="code-keyword">uint8_t</span> phase);                  <span class="code-comment">// 某相悬空</span>

<span class="code-comment">/* 初始化：配置死区时间(典型1~2us) + 启动PWM */</span>
<span class="code-keyword">void</span> <span class="code-func">BLDC_PWM_Init</span>(<span class="code-keyword">void</span>) {
  <span class="code-func">PWM_Init_3Phase_Complementary</span>(<span class="code-number">1780</span>);   <span class="code-comment">// 死区1.78us，按MOS管开关特性选</span>
}

<span class="code-comment">/* 调速 = 改变占空比。g_duty: 0~period */</span>
<span class="code-keyword">void</span> <span class="code-func">BLDC_SetDuty</span>(<span class="code-keyword">uint16_t</span> duty) {
  g_duty = duty;
  <span class="code-comment">// 实际CCR在换向时按查表结果更新到对应相 */</span>
}</div>

          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>死区时间必须根据你的MOS管调整</strong>：太小→开关未完全关断就开对管→直通烧管；太大→低次谐波多、力矩脉动大。经验：先设保守值（2μs），用示波器看实际开关波形，再缩小到不直通的最小值。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、完整运行流程</h3>
          <div class="step-list">
            <div class="step-item"><div><strong>初始化</strong>：配置三相PWM（互补+死区）、霍尔GPIO（或中断）、ADC（测电流保护）。</div></div>
            <div class="step-item"><div><strong>启动预定位</strong>：强制给某两相通电，把转子"拉"到已知位置（六步换向启动的难点，因为零速时霍尔不动）。</div></div>
            <div class="step-item"><div><strong>正常运行</strong>：电机转起来后，霍尔每次跳变 → 触发换向 → 查表更新PWM。占空比=速度/力矩控制。</div></div>
            <div class="step-item"><div><strong>闭环（可选）</strong>：加测速（编码器或霍尔估算）+ PI 速度环，实现稳速。</div></div>
          </div>

          <h4 class="font-medium mt-6 mb-2">六步换向的调试要点</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>现象</th><th>原因</th><th>排查</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">电机不转、抖动</td><td>换向表错误、相序接反</td><td>用示波器抓3路霍尔+相电压，对照确认表</td></tr>
              <tr><td class="font-medium">反转</td><td>任意两相（或两霍尔）互换</td><td>交换换向表里两列，或对调两根相线</td></tr>
              <tr><td class="font-medium">堵转电流大、发烫</td><td>死区太小直通，或换向提前/滞后</td><td>示波器看死区波形；调换向时机</td></tr>
              <tr><td class="font-medium">高速丢步、异响</td><td>霍尔响应慢、换向中断延迟</td><td>用硬件定时器霍尔接口；降低中断里工作量</td></tr>
              <tr><td class="font-medium">启动失败</td><td>预定位不准</td><td>增大启动电流；用"三段式启动"（预定位→强拖→切闭环）</td></tr>
            </tbody>
          </table></div>

          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>六步换向 vs FOC</strong>：六步换向简单、力矩有脉动（梯形波，每60°跳变一次，电机有"哒哒"感）；FOC 是正弦波，力矩平滑、效率高，但算法复杂得多。<strong>建议学习路线</strong>：先用六步把电机转起来、搞懂换向本质，再进阶 FOC。</div>
          </div>
        `,
      },
      {
        id: 'advanced-foc',
        title: 'FOC磁场定向控制',
        desc: '无刷电机和伺服电机的核心控制算法',
        icon: '🌀',
        tags: ['核心算法', 'BLDC/伺服'],
        content: `
          <h3 class="text-lg font-semibold mb-3">什么是FOC</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            FOC（Field Oriented Control，磁场定向控制）将电机的三相交流电流通过数学坐标变换，
            转换为类似于直流电机的两个独立直流分量进行控制，实现<strong>转矩和磁场的解耦控制</strong>。
          </p>

          <h4 class="font-medium mt-4 mb-2">FOC控制流程</h4>
          <div class="step-list">
            <div class="step-item">
              <div><strong>电流采样</strong>：通过ADC采集电机三相电流 Ia, Ib, Ic（实际只需采两相，第三相由Ia+Ib+Ic=0计算）</div>
            </div>
            <div class="step-item">
              <div><strong>Clarke变换</strong>：三相(a,b,c) → 两相静止坐标系(α,β)。将三维电流投影到二维平面。</div>
            </div>
            <div class="step-item">
              <div><strong>Park变换</strong>：两相静止(α,β) → 两相旋转(d,q)。跟随转子磁场旋转，将交流量变为直流量。</div>
            </div>
            <div class="step-item">
              <div><strong>PI电流环</strong>：分别对Id和Iq进行PI控制。通常设Id=0（最大转矩/电流比），Iq决定输出力矩。</div>
            </div>
            <div class="step-item">
              <div><strong>反Park变换</strong>：控制输出从(d,q) → (α,β)</div>
            </div>
            <div class="step-item">
              <div><strong>SVPWM</strong>：将(α,β)电压转换为三相PWM信号驱动逆变器</div>
            </div>
          </div>

          <div class="formula-block mt-4">
            $$\\text{Clarke: } \\begin{cases} I_\\alpha = I_a \\\\ I_\\beta = \\frac{1}{\\sqrt{3}}(I_a + 2I_b) \\end{cases}$$
            <div class="text-sm text-gray-500 mt-2">三相电流→两相静止坐标系</div>
          </div>

          <div class="formula-block">
            $$\\text{Park: } \\begin{cases} I_d = I_\\alpha \\cos\\theta + I_\\beta \\sin\\theta \\\\ I_q = -I_\\alpha \\sin\\theta + I_\\beta \\cos\\theta \\end{cases}$$
            <div class="text-sm text-gray-500 mt-2">两相静止→两相旋转坐标系（θ为转子电角度）</div>
          </div>

          <div class="info-box tip mt-4">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <div><strong>SVPWM vs SPWM</strong>：SVPWM（空间矢量PWM）比传统SPWM的直流母线电压利用率高约15.5%，是FOC控制的标准调制方式。</div>
          </div>
        `,
      },
      {
        id: 'foc-impl',
        title: 'FOC的C语言实现',
        desc: 'Clarke/Park变换、SVPWM、相电流ADC采样的可运行C代码',
        icon: '🌀',
        tags: ['核心算法', 'FOC'],
        content: `
          <h3 class="text-lg font-semibold mb-3">把FOC公式变成可跑的C代码</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            上一篇讲了 FOC 的理论（Clarke→Park→PI→反Park→SVPWM）。本节给出每一步的 C 函数实现，组合起来就是一个最小可运行的 FOC 电流环。代码用 <code>float</code>，Cortex-M4F/M7 可直接跑；M3 需用定点版或 CMSIS-DSP。
          </p>

          <div class="info-box tip mb-6">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>FOC 的<strong>计算量集中在电流环</strong>，每个 PWM 周期（如 10kHz）跑一遍完整流程。函数都用 <code>inline</code> 和 <code>float</code>，避免除法和三角函数库调用（用查表或近似）。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、相电流采样（FOC的输入）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            FOC 需要三相电流 Ia、Ib、Ic。实际只需采<strong>两相</strong>（Ia、Ib），第三相由基尔霍夫定律算出：<code>Ic = -(Ia+Ib)</code>。<strong>采样时机极其关键</strong>：必须在 PWM 下桥臂导通的中点采样（此时电流稳定），否则采到的是开关噪声。
          </p>
          <div class="code-block"><span class="code-comment">/* ADC 由 PWM 中心事件触发（TIM1 TRGO → ADC 注入组）
 * 在每个PWM周期中点采样两相电流 */</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">float</span> ia, ib;          <span class="code-comment">// 实采两相电流(A)</span>
  <span class="code-keyword">float</span> offset_a, offset_b;  <span class="code-comment">// 零电流偏置(上电校准)</span>
} CurrentSense_t;

<span class="code-comment">/**
 * 从ADC原始值换算实际电流
 * @param raw   ADC读数(0~4095, 12位)
 * @param vref  参考电压(V)，通常3.3
 * @param gain  电流放大电路增益(A/V)，由采样电阻和运放决定
 * @param offset 零电流时的ADC偏置(上电短接电机测得)
 */</span>
<span class="code-keyword">static inline float</span> <span class="code-func">ADC_ToCurrent</span>(<span class="code-keyword">uint16_t</span> raw, <span class="code-keyword">float</span> vref,
                                  <span class="code-keyword">float</span> gain, <span class="code-keyword">float</span> offset) {
  <span class="code-keyword">float</span> v = (<span class="code-keyword">float</span>)raw * vref / <span class="code-number">4095.0f</span>;   <span class="code-comment">// ADC → 电压</span>
  <span class="code-keyword">return</span> (v - offset) * gain;                  <span class="code-comment">// 电压 → 电流(去偏置)</span>
}

<span class="code-comment">/* 读取三相电流(只需两相) */</span>
<span class="code-keyword">void</span> <span class="code-func">FOC_ReadCurrents</span>(CurrentSense_t *cs,
                       <span class="code-keyword">uint16_t</span> raw_a, <span class="code-keyword">uint16_t</span> raw_b) {
  cs->ia = <span class="code-func">ADC_ToCurrent</span>(raw_a, <span class="code-number">3.3f</span>, <span class="code-number">20.0f</span>, cs->offset_a);
  cs->ib = <span class="code-func">ADC_ToCurrent</span>(raw_b, <span class="code-number">3.3f</span>, <span class="code-number">20.0f</span>, cs->offset_b);
}</div>

          <div class="info-box warning mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>零电流偏置校准是必做步骤</strong>：上电后先把电机三相短接（无电流），读1000次ADC取平均，存为 offset。否则偏置漂移会让电流读数带直流分量，FOC 永远调不准。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、Clarke变换（三相→两相静止）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把三相电流 (Ia, Ib, Ic) 投影到两相静止坐标系 (Iα, Iβ)，减少一维：
          </p>
          <div class="formula-block">
            $I_\\alpha = I_a, \\quad I_\\beta = \\frac{1}{\\sqrt{3}}(I_a + 2I_b)$
          </div>
          <div class="code-block"><span class="code-comment">/* Clarke变换：三相 → 两相静止 αβ
 * 输入: ia, ib (ic 由 ia+ib+ic=0 隐含)
 * 输出: ialpha, ibeta */</span>
<span class="code-keyword">static inline void</span> <span class="code-func">Clarke</span>(<span class="code-keyword">float</span> ia, <span class="code-keyword">float</span> ib,
                         <span class="code-keyword">float</span> *ialpha, <span class="code-keyword">float</span> *ibeta) {
  <span class="code-keyword">const float</span> ONE_BY_SQRT3 = <span class="code-number">0.57735026919f</span>;
  *ialpha = ia;
  *ibeta  = (ia + <span class="code-number">2.0f</span> * ib) * ONE_BY_SQRT3;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、Park变换（静止→旋转dq）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把 (Iα, Iβ) 旋转到跟随转子的坐标系 (Id, Iq)。关键是电角度 θ（来自编码器或霍尔）：
          </p>
          <div class="formula-block">
            $I_d = I_\\alpha \\cos\\theta + I_\\beta \\sin\\theta, \\quad I_q = -I_\\alpha \\sin\\theta + I_\\beta \\cos\\theta$
          </div>
          <div class="code-block"><span class="code-comment">/* Park变换：两相静止 αβ → 两相旋转 dq
 * sin/cos 提前用查表或硬件算，避免每次调用 math.h */</span>
<span class="code-keyword">static inline void</span> <span class="code-func">Park</span>(<span class="code-keyword">float</span> ialpha, <span class="code-keyword">float</span> ibeta,
                       <span class="code-keyword">float</span> sin_theta, <span class="code-keyword">float</span> cos_theta,
                       <span class="code-keyword">float</span> *id, <span class="code-keyword">float</span> *iq) {
  *id = ialpha * cos_theta + ibeta * sin_theta;
  *iq = -ialpha * sin_theta + ibeta * cos_theta;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、PI电流环（控制Id、Iq）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            通常设 <code>Id_ref = 0</code>（不产生励磁，最大转矩/电流比），<code>Iq_ref</code> = 期望力矩。两个独立 PI 控制器分别跟踪。直接复用上一篇的 PID 代码即可：
          </p>
          <div class="code-block"><span class="code-comment">/* d轴和q轴各一个PI控制器(复用PID_t，Kd=0) */</span>
<span class="code-keyword">static</span> PID_t pid_id, pid_iq;

<span class="code-comment">/* 电流环：输入参考值和实测值，输出控制电压 Vd、Vq */</span>
<span class="code-keyword">void</span> <span class="code-func">FOC_CurrentLoop</span>(<span class="code-keyword">float</span> id_ref, <span class="code-keyword">float</span> iq_ref,
                       <span class="code-keyword">float</span> id_meas, <span class="code-keyword">float</span> iq_meas,
                       <span class="code-keyword">float</span> *vd, <span class="code-keyword">float</span> *vq) {
  *vd = <span class="code-func">PID_Position_Update</span>(&amp;pid_id, id_ref, id_meas);
  *vq = <span class="code-func">PID_Position_Update</span>(&amp;pid_iq, iq_ref, iq_meas);
  <span class="code-comment">// 注意：实际要加抗饱和，见 PID 实现篇</span>
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、反Park变换（dq→αβ）</h3>
          <div class="code-block"><span class="code-comment">/* 反Park：把控制电压从 dq 旋回 αβ 坐标系
 * 用于下一步 SVPWM 生成三相PWM */</span>
<span class="code-keyword">static inline void</span> <span class="code-func">InvPark</span>(<span class="code-keyword">float</span> vd, <span class="code-keyword">float</span> vq,
                           <span class="code-keyword">float</span> sin_theta, <span class="code-keyword">float</span> cos_theta,
                           <span class="code-keyword">float</span> *valpha, <span class="code-keyword">float</span> *vbeta) {
  *valpha = vd * cos_theta - vq * sin_theta;
  *vbeta  = vd * sin_theta + vq * cos_theta;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、SVPWM（αβ电压→三相PWM占空比）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            SVPWM 的完整实现要算扇区、T1/T2 时间，比较复杂。工程上常用<strong>简化版</strong>（基于 αβ 直接算占空比），精度够用、代码短：
          </p>
          <div class="code-block"><span class="code-comment">/* SVPWM 简化实现（又称"反Clarke + 注入中点"法）
 * 输入: valpha, vbeta, Vbus(母线电压), pwm_period(PWM周期计数)
 * 输出: 三相占空比 ccr_a, ccr_b, ccr_c (0~pwm_period) */</span>
<span class="code-keyword">static inline void</span> <span class="code-func">SVPWM</span>(<span class="code-keyword">float</span> valpha, <span class="code-keyword">float</span> vbeta,
                          <span class="code-keyword">float</span> vbus, <span class="code-keyword">uint16_t</span> pwm_period,
                          <span class="code-keyword">uint16_t</span> *ccr_a, <span class="code-keyword">uint16_t</span> *ccr_b, <span class="code-keyword">uint16_t</span> *ccr_c) {
  <span class="code-keyword">const float</span> ONE_BY_SQRT3 = <span class="code-number">0.57735026919f</span>;
  <span class="code-keyword">const float</span> TWO_BY_SQRT3 = <span class="code-number">1.15470053838f</span>;

  <span class="code-comment">// 1. αβ → 三相电压归一化(-1~1)</span>
  <span class="code-keyword">float</span> va = valpha;
  <span class="code-keyword">float</span> vb = -<span class="code-number">0.5f</span> * valpha + vbeta * ONE_BY_SQRT3;
  <span class="code-keyword">float</span> vc = -<span class="code-number">0.5f</span> * valpha - vbeta * ONE_BY_SQRT3;

  <span class="code-comment">// 2. 注入零序分量(中点)，使三相占空比都落入 0~period 范围</span>
  <span class="code-keyword">float</span> vmin = va; <span class="code-keyword">if</span> (vb &lt; vmin) vmin = vb; <span class="code-keyword">if</span> (vc &lt; vmin) vmin = vc;
  va -= vmin; vb -= vmin; vc -= vmin;   <span class="code-comment">// 平移到 ≥0</span>

  <span class="comment" style="color:#64748b">// 3. 限幅并转成CCR值</span>
  <span class="code-keyword">float</span> vmax = va; <span class="code-keyword">if</span> (vb &gt; vmax) vmax = vb; <span class="code-keyword">if</span> (vc &gt; vmax) vmax = vc;
  <span class="code-keyword">float</span> scale = (vmax &gt; <span class="code-number">1.0f</span>) ? (<span class="code-number">1.0f</span> / vmax) : <span class="code-number">1.0f</span>;

  *ccr_a = (<span class="code-keyword">uint16_t</span>)(va * scale * pwm_period);
  *ccr_b = (<span class="code-keyword">uint16_t</span>)(vb * scale * pwm_period);
  *ccr_c = (<span class="code-keyword">uint16_t</span>)(vc * scale * pwm_period);
}</div>

          <div class="info-box info mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>完整 SVPWM 要算 6 个扇区、相邻矢量作用时间 T1/T2、零矢量分配。简化版用"反Clarke + 中点注入"达到 ~87% 的电压利用率（接近完整 SVPWM 的 90.6%），代码量少一半，DIY FOC 首选。</div>
          </div>

          <h4 class="font-medium mt-5 mb-2">进阶：标准七段式 SVPWM（完整推导）</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            上面简化版够用，但要榨干母线电压（达 90.6%）或满足严格波形对称性，需用<strong>标准七段式 SVPWM</strong>。核心思路：逆变器 8 个基本电压矢量（6 个非零 + 2 个零矢量），把任意目标电压矢量分解成<strong>所在扇区的两个相邻非零矢量 + 零矢量</strong>的时间组合。
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            <strong>第一步：扇区判断（N 值法）</strong>。由 αβ 算 3 个中间量，再合成 N（bit2/1/0），N 直接对应扇区号 1~6：
          </p>
          <div class="code-block"><span class="code-comment">/* 标准七段式 SVPWM 第一步：判断扇区（输入 αβ，输出扇区号 1~6）*/</span>
<span class="code-keyword">uint8_t</span> <span class="code-func">SVPWM_Sector</span>(<span class="code-keyword">float</span> valpha, <span class="code-keyword">float</span> vbeta) {
  <span class="code-keyword">float</span> vref = <span class="code-func">fabsf</span>(valpha);   <span class="code-comment">// 占位，实际用下方公式</span>
  <span class="code-comment">// 三个判断量</span>
  <span class="code-keyword">float</span> a = vbeta;
  <span class="code-keyword">float</span> b = (-vbeta + <span class="code-number">1.7320508f</span> * valpha) * <span class="code-number">0.5f</span>;  <span class="code-comment">// √3/2·α - 1/2·β</span>
  <span class="code-keyword">float</span> c = (-vbeta - <span class="code-number">1.7320508f</span> * valpha) * <span class="code-number">0.5f</span>;
  <span class="code-comment">// N = sign(a)<<2 | sign(b)<<1 | sign(c)；再映射成扇区</span>
  <span class="code-keyword">uint8_t</span> N = <span class="code-number">0</span>;
  <span class="code-keyword">if</span> (a &gt; <span class="code-number">0</span>) N |= <span class="code-number">4</span>;
  <span class="code-keyword">if</span> (b &gt; <span class="code-number">0</span>) N |= <span class="code-number">2</span>;
  <span class="code-keyword">if</span> (c &gt; <span class="code-number">0</span>) N |= <span class="code-number">1</span>;
  <span class="code-comment">// N 值(1~6)与扇区的查表映射</span>
  <span class="code-keyword">static const uint8_t</span> SEC_MAP[<span class="code-number">7</span>] = {<span class="code-number">0</span>,<span class="code-number">2</span>,<span class="code-number">6</span>,<span class="code-number">1</span>,<span class="code-number">4</span>,<span class="code-number">3</span>,<span class="code-number">5</span>};
  <span class="code-keyword">return</span> SEC_MAP[N];   <span class="code-comment">// 返回 1~6</span>
}</div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-3">
            <strong>第二步：相邻矢量作用时间 T1/T2</strong>。由扇区号查表得该扇区的两个相邻矢量（如扇区1用 V4、V6），再按下式算作用时间，最后做<strong>过调制判断</strong>（T1+T2&gt;Ts 时按比例缩小）：
          </p>
          <div class="code-block"><span class="code-comment">/* 第二步：算 T1/T2（Ts=PWM周期，X/Y/Z 为 αβ 的线性组合）*/</span>
<span class="code-keyword">float</span> X = (<span class="code-number">1.7320508f</span> * Ts / Vdc) * vbeta;
<span class="code-keyword">float</span> Y = (Ts / Vdc) * (<span class="code-number">0.866f</span> * vbeta + <span class="code-number">1.5f</span> * valpha);
<span class="code-keyword">float</span> Z = (Ts / Vdc) * (<span class="code-number">0.866f</span> * vbeta - <span class="code-number">1.5f</span> * valpha);
<span class="code-comment">// 不同扇区取 (T1,T2) = 不同的 (-Z,X) / (Z,-X) / ... 查表</span>
<span class="code-comment">// 过调制处理：if(T1+T2>Ts){T1*=Ts/(T1+T2); T2*=Ts/(T1+T2);}</span>
<span class="code-comment">// T0 = Ts - T1 - T2 为零矢量时间，平均分给 V0 和 V7</span></div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-3">
            <strong>第三步：七段式对称分配</strong>。把一个 PWM 周期 Ts 切成 7 段，按 <strong>V0→V4→V6→V7→V6→V4→V0</strong>（扇区1为例）的顺序对称排列，零矢量 V0/V7 各占一半并放在两端和中点。这样得到三相的<strong>比较值 Tcmp1/2/3</strong>，写入定时器 CCR 即生成对称 PWM，谐波最小：
          </p>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>简化版 vs 标准版的取舍</strong>：简化版（中点注入）代码 20 行、利用率 87%；标准七段式代码 100+ 行、利用率 90.6%、波形更对称（谐波小）。DIY/学习阶段用简化版完全够；量产高精度伺服才上标准版。STM32 MC SDK、VESC 都提供了标准 SVPWM 的参考实现，建议先读懂简化版再看标准版。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">七、FOC电流环主循环</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把上面所有步骤串起来，在 PWM 定时器中断里高频调用（如 10kHz）：
          </p>
          <div class="code-block"><span class="code-comment">/* FOC 电流环：在 TIM1 中断里调用(由ADC采样完成触发) */</span>
<span class="code-keyword">void</span> <span class="code-func">FOC_Loop</span>(<span class="code-keyword">float</span> iq_ref) {     <span class="code-comment">// iq_ref = 期望力矩电流</span>
  <span class="code-comment">// 1. 读电流(ADC已在中断里转换好)</span>
  CurrentSense_t cs;
  <span class="code-func">FOC_ReadCurrents</span>(&amp;cs, g_adc_ia, g_adc_ib);

  <span class="code-comment">// 2. 获取电角度 θ(来自编码器)</span>
  <span class="code-keyword">float</span> theta = <span class="code-func">Encoder_GetElecAngle</span>();
  <span class="code-keyword">float</span> sin_t = <span class="code-func">sin</span>(theta), cos_t = <span class="code-func">cos</span>(theta);

  <span class="code-comment">// 3. Clarke → Park</span>
  <span class="code-keyword">float</span> ialpha, ibeta;
  <span class="code-func">Clarke</span>(cs.ia, cs.ib, &amp;ialpha, &amp;ibeta);
  <span class="code-keyword">float</span> id, iq;
  <span class="code-func">Park</span>(ialpha, ibeta, sin_t, cos_t, &amp;id, &amp;iq);

  <span class="code-comment">// 4. PI 电流环 (Id_ref = 0)</span>
  <span class="code-keyword">float</span> vd, vq;
  <span class="code-func">FOC_CurrentLoop</span>(<span class="code-number">0.0f</span>, iq_ref, id, iq, &amp;vd, &amp;vq);

  <span class="code-comment">// 5. 反Park</span>
  <span class="code-keyword">float</span> valpha, vbeta;
  <span class="code-func">InvPark</span>(vd, vq, sin_t, cos_t, &amp;valpha, &amp;vbeta);

  <span class="code-comment">// 6. SVPWM → 写入定时器CCR</span>
  <span class="code-keyword">uint16_t</span> ca, cb, cc;
  <span class="code-func">SVPWM</span>(valpha, vbeta, g_vbus, PWM_PERIOD, &amp;ca, &amp;cb, &amp;cc);
  <span class="code-func">PWM_SetDuty</span>(<span class="code-number">0</span>, ca);  <span class="code-comment">// 写A相占空比（平台相关：写定时器CCR）*/</span>
  <span class="code-func">PWM_SetDuty</span>(<span class="code-number">1</span>, cb);  <span class="code-comment">// B相</span>
  <span class="code-func">PWM_SetDuty</span>(<span class="code-number">2</span>, cc);  <span class="code-comment">// C相</span>
}</div>

          <div class="info-box tip mt-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>调试顺序</strong>：① 先开环（固定θ递增）确认SVPWM能让电机平稳转；② 闭环Id（设Iq=0），看Id能否跟踪到0；③ 最后闭环Iq，逐步加负载验证力矩响应。每一步都用串口输出波形观察。<strong>开源参考</strong>：SimpleFOC、VESC、STM32 MC SDK 的代码都值得对照阅读。</div>
          </div>
        `,
      },
      {
        id: 'advanced-coord',
        title: '坐标变换',
        desc: 'Clarke变换、Park变换的数学推导',
        icon: '📐',
        tags: ['数学基础', 'FOC'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么需要坐标变换</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            交流电机的三相电流是随时间正弦变化的，直接控制非常困难。
            坐标变换的目的就是将这些"动的量"变成"不动的量"（直流），
            这样就可以用简单的PI控制器来控制，就像控制直流电机一样。
          </p>

          <h4 class="font-medium mt-4 mb-2">变换链路</h4>
          <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center mb-4">
            <span class="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded text-sm font-medium">三相 abc</span>
            <span class="mx-3 text-gray-400">→ Clarke →</span>
            <span class="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded text-sm font-medium">两相 αβ</span>
            <span class="mx-3 text-gray-400">→ Park →</span>
            <span class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-sm font-medium">旋转 dq</span>
          </div>

          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>Clarke变换</strong>将三相静止坐标系映射到两相静止坐标系（减少一维）。
            <strong>Park变换</strong>将两相静止坐标系旋转到与转子磁场同步的参考坐标系，将交流变为直流。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、Clarke变换（三相 → 两相静止）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把空间互差120°的三相 (a,b,c) 投影到正交的 (α,β) 轴。几何上就是把三个120°向量合成两个90°向量。注意 <strong>a+b+c=0</strong>（三相平衡时），所以只需两相就能完整表达。
          </p>
          <div class="formula-block">
            <div class="text-left">
              <strong>幅值不变版</strong>（FOC常用，系数2/3）：<br>
              $\\begin{bmatrix} v_\\alpha \\\\ v_\\beta \\end{bmatrix} = \\frac{2}{3}\\begin{bmatrix} 1 & -\\frac{1}{2} & -\\frac{1}{2} \\\\ 0 & \\frac{\\sqrt{3}}{2} & -\\frac{\\sqrt{3}}{2} \\end{bmatrix}\\begin{bmatrix} v_a \\\\ v_b \\\\ v_c \\end{bmatrix}$
            </div>
            <div class="text-sm text-gray-500 mt-2">简化式（已知a+b+c=0时）：v_α = v_a，v_β = (v_a + 2v_b)/√3</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、Park变换（静止 → 旋转 dq）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            把 (α,β) 绕原点旋转 θ 角（θ = 转子电角度），得到跟随转子旋转的 (d,q) 坐标系。关键效果：<strong>原来随时间正弦变化的量，在 dq 坐标系下变成了直流量</strong>——这正是能用 PI 控制的条件。
          </p>
          <div class="formula-block">
            $\\begin{bmatrix} v_d \\\\ v_q \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\begin{bmatrix} v_\\alpha \\\\ v_\\beta \\end{bmatrix}$
            <div class="text-sm text-gray-500 mt-2">d轴与转子磁极方向对齐（励磁分量），q轴超前90°（转矩分量）</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、反变换（dq → αβ → abc）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            PI 控制器输出 (vd, vq) 后，需要反变换回三相才能驱动逆变器。反Park 用 -θ，反Clarke 用 Clarke 矩阵的伪逆：
          </p>
          <div class="formula-block">
            <div class="text-left">
              <strong>反Park</strong>：<br>
              $\\begin{bmatrix} v_\\alpha \\\\ v_\\beta \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\begin{bmatrix} v_d \\\\ v_q \\end{bmatrix}$
              <strong>反Clarke</strong>（αβ → abc，幅值不变版）：<br>
              $v_a = v_\\alpha, \\quad v_b = -\\frac{1}{2}v_\\alpha + \\frac{\\sqrt{3}}{2}v_\\beta, \\quad v_c = -\\frac{1}{2}v_\\alpha - \\frac{\\sqrt{3}}{2}v_\\beta$
            </div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、两种归一化版本的对比</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Clarke 变换有<strong>幅值不变</strong>和<strong>功率不变</strong>两种系数，不同教材/库用的不同，调试时务必统一：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>版本</th><th>Clarke系数</th><th>特点</th><th>常见出处</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">幅值不变</td><td>2/3</td><td>变换前后相电压幅值相等，直观</td><td>多数FOC教程、STM32 MC SDK</td></tr>
              <tr><td class="font-medium">功率不变</td><td>√(2/3)</td><td>变换前后功率守恒，理论严格</td><td>电机学教材、MATLAB</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>混用是大坑</strong>：如果你的 Clarke 用 2/3（幅值不变），但参考代码用 √(2/3)（功率不变），PID 参数会差 √2 倍，调出来的电机力矩完全不对。移植代码时第一件事就是确认对方的变换系数。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、坐标变换的 C 实现（纯算法）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            下面是幅值不变版（2/3）的完整实现。注意 <strong>sin/cos 用查表或硬件近似</strong>避免在每个 PWM 周期调用昂贵的库函数。三个函数 Clarke/Park/InvPark 加起来不到 20 行，是 FOC 的数学核心：
          </p>
          <div class="code-block"><span class="code-comment">/* 坐标变换：幅值不变版（2/3）。输入电流/电压均可 */</span>
<span class="code-comment">// 1/√3 ≈ 0.57735，避免实时开方</span>
<span class="code-keyword">#define</span> ONE_BY_SQRT3  <span class="code-number">0.57735026919f</span>

<span class="code-comment">/* Clarke 变换：三相 ia,ib → 两相静止 ialpha,ibeta
 * (利用 ia+ib+ic=0，只需两相输入即可) */</span>
<span class="code-keyword">static inline void</span> <span class="code-func">Clarke</span>(<span class="code-keyword">float</span> ia, <span class="code-keyword">float</span> ib,
                         <span class="code-keyword">float</span> *ialpha, <span class="code-keyword">float</span> *ibeta) {
  *ialpha = ia;
  *ibeta  = (ia + <span class="code-number">2.0f</span> * ib) * ONE_BY_SQRT3;
}

<span class="code-comment">/* Park 变换：静止 αβ → 旋转 dq（θ 为转子电角度，弧度）*/</span>
<span class="code-keyword">static inline void</span> <span class="code-func">Park</span>(<span class="code-keyword">float</span> ialpha, <span class="code-keyword">float</span> ibeta,
                        <span class="code-keyword">float</span> sin_t, <span class="code-keyword">float</span> cos_t,
                        <span class="code-keyword">float</span> *id, <span class="code-keyword">float</span> *iq) {
  *id = ialpha * cos_t + ibeta * sin_t;
  *iq = -ialpha * sin_t + ibeta * cos_t;
}

<span class="code-comment">/* 反 Park 变换：旋转 dq → 静止 αβ（PI 输出后用）*/</span>
<span class="code-keyword">static inline void</span> <span class="code-func">InvPark</span>(<span class="code-keyword">float</span> vd, <span class="code-keyword">float</span> vq,
                           <span class="code-keyword">float</span> sin_t, <span class="code-keyword">float</span> cos_t,
                           <span class="code-keyword">float</span> *valpha, <span class="code-keyword">float</span> *vbeta) {
  *valpha = vd * cos_t - vq * sin_t;
  *vbeta  = vd * sin_t + vq * cos_t;
}

<span class="code-comment">/* sin/cos 同时计算：用一次 sin 即可，cos = sin(θ+π/2)，
 * 或用硬件近似(SVPWM查表)。这里示意：*/</span>
<span class="code-keyword">extern float</span> <span class="code-func">fast_sin</span>(<span class="code-keyword">float</span> rad);  <span class="code-comment">// 查表或泰勒展开，平台相关</span></div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>定点化优化</strong>：在无 FPU 的 MCU（如 STM32F1）上，把 float 换成 Q15/Q16 定点数，sin/cos 查 512 点表，整个变换链可在 &lt;1μs 完成。SimpleFOC 库就提供了定点版本。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、交互演示：拖动 θ 观察变换过程</h3>
          <div class="svg-figure">
            <div data-chart="foc" class="chart-container" style="min-height:380px"></div>
          </div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>关键观察</strong>：拖动 θ，左图三相向量 a/b/c 一直在旋转（交流），数值正负变化；但右图 dq 里的 <strong>Iq 始终≈1.0、Id≈0</strong>（直流常量）。这就是 Park 变换"把交流变直流"的几何真相——坐标系跟着转子一起转，相对运动消失。点"自动旋转"可看连续动画。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">七、几何直观：从旋转到静止</h3>
          <div class="step-list">
            <div class="step-item"><div><strong>abc 三相</strong>：三个互差120°的旋转向量，合成一个旋转磁场。难以直接控制（三个量都在变）。</div></div>
            <div class="step-item"><div><strong>αβ 两相</strong>：Clarke 把三个向量合成为两个正交向量，仍在旋转，但少了一个维度。</div></div>
            <div class="step-item"><div><strong>dq 旋转</strong>：Park 把坐标系"跟着转子转"，于是原本旋转的向量在 dq 里变成<strong>静止的常量</strong>。这就是"交流变直流"的真相。</div></div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>记忆诀窍</strong>：Clarke 是"3变2"（减维），Park 是"动变静"（旋转坐标系）。FOC 的所有控制都在 dq 里做，最后反变换回 abc 才能驱动电机。完整 C 代码见 <a href="#" onclick="navigateTo('foc-impl');return false;" style="color:var(--primary)">FOC的C语言实现</a>。</div></div>
        `,
      },
      {
        id: 'advanced-sensorless',
        title: '无感控制',
        desc: '无需编码器/霍尔传感器的电机控制技术',
        icon: '👻',
        tags: ['进阶算法', 'BLDC'],
        content: `
          <h3 class="text-lg font-semibold mb-3">什么是无感控制</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            无感控制（Sensorless Control）指不需要物理位置传感器（编码器、霍尔传感器），
            通过算法估算转子位置来实现FOC控制。可降低成本、减少线缆、提高可靠性。
          </p>

          <h4 class="font-medium mt-4 mb-2">主要方法</h4>
          <div class="space-y-3">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium">滑模观测器 (SMO)</div>
              <div class="text-sm text-gray-500 mt-1">基于滑模控制理论，通过比较实际电流和估算电流来追踪反电动势，进而推算转子角度。适合中高速运行区间。</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium">高频注入 (HFI)</div>
              <div class="text-sm text-gray-500 mt-1">向电机注入高频电压信号，利用凸极效应检测转子位置。适合低速和零速启动，常用于IPM（内置式永磁）电机。</div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium">反电动势观测器</div>
              <div class="text-sm text-gray-500 mt-1">通过扩展卡尔曼滤波(EKF)或龙伯格观测器估算反电动势。精度高但计算量大，适合高性能MCU。</div>
            </div>
          </div>

          <div class="info-box warning mt-4">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div><strong>零速启动问题</strong>：无感控制在零速和极低速时无法工作（无反电动势可测），通常需要先使用开环启动或高频注入，达到一定转速后切换到SMO/EKF。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、反电动势过零检测（最基础的无感方式）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            用于六步换向的最简单无感方案。原理：未通电的那一相绕组上会感应出反电动势（BEMF），当 BEMF <strong>过零</strong>（穿过零点）时，再过 30°电角度就该换向了。只需一个比较器或 ADC 检测悬空相电压：
          </p>
          <div class="formula-block">
            $V_{BEMF} = V_{phase} - \\frac{V_a + V_b + V_c}{3}$
            <div class="text-sm text-gray-500 mt-2">悬空相电压减去中点电压 = 反电动势。过零点后延时30°换向。</div>
          </div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>为什么是30°</strong>：相邻两次换向间隔60°电角度，而过零点恰好在两次换向的中间（每段60°的中点），所以过零后再走30°就是下一次换向点。实际代码里用<strong>定时器延时</strong>实现这30°（延时随转速变化，转速越高延时越短）。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、滑模观测器 SMO（FOC无感的主流方案）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            SMO 构造一个<strong>电流观测模型</strong>，用估算的反电动势驱动模型，让观测电流逼近真实电流。当两者差值趋零时，估算反电动势就接近真实值，进而算出转子角度。核心方程（αβ坐标系）：
          </p>
          <div class="formula-block">
            <div class="text-left">
              观测器模型（模仿电机电气方程）：<br>
              $\\hat{\\dot I}_\\alpha = -\\frac{R}{L}\\hat I_\\alpha - \\frac{1}{L}\\hat E_\\alpha + \\frac{1}{L}V_\\alpha$
              滑模面（电流误差）：$s = \\hat I_\\alpha - I_\\alpha$<br>
              反电动势估算（符号函数驱动）：<br>
              $\\hat E_\\alpha = K \\cdot \\text{sign}(s), \\quad \\hat E_\\beta = K \\cdot \\text{sign}(s_\\beta)$
            </div>
            <div class="text-sm text-gray-500 mt-2">ℕ表示估算值。sign函数让观测电流"滑"向真实电流，此时估算的反电动势 ≋ 真实值</div>
          </div>
          <div class="code-block"><span class="code-comment">/* SMO 观测器核心（简化版纯C，每个PWM周期调用一次）
 * 输入：实际电压Vα/Vβ、实际电流Iα/Iβ、电机参数R/L
 * 输出：估算反电动势Eα/Eβ → 后续用atan2求角度 */</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">float</span> R, L;              <span class="code-comment">// 相电阻、相电感</span>
  <span class="code-keyword">float</span> K_slide;          <span class="code-comment">// 滑模增益（调试参数）*/</span>
  <span class="code-keyword">float</span> I_hat_alpha;      <span class="code-comment">// 观测电流α</span>
  <span class="code-keyword">float</span> I_hat_beta;       <span class="code-comment">// 观测电流β</span>
  <span class="code-keyword">float</span> E_hat_alpha;      <span class="code-comment">// 估算反电动势α</span>
  <span class="code-keyword">float</span> E_hat_beta;       <span class="code-comment">// 估算反电动势β</span>
} SMO_t;

<span class="code-keyword">void</span> <span class="code-func">SMO_Update</span>(SMO_t *o, <span class="code-keyword">float</span> Va, <span class="code-keyword">float</span> Vb,
                   <span class="code-keyword">float</span> Ia, <span class="code-keyword">float</span> Ib, <span class="code-keyword">float</span> dt) {
  <span class="code-comment">// 1. 电流误差（滑模面）*/</span>
  <span class="code-keyword">float</span> err_a = o->I_hat_alpha - Ia;
  <span class="code-keyword">float</span> err_b = o->I_hat_beta  - Ib;

  <span class="code-comment">// 2. 用符号函数估算反电动势（滑模切换）*/</span>
  o->E_hat_alpha = (err_a &gt; <span class="code-number">0</span> ? -o->K_slide : o->K_slide);
  o->E_hat_beta  = (err_b &gt; <span class="code-number">0</span> ? -o->K_slide : o->K_slide);

  <span class="code-comment">// 3. 更新观测电流（前向欧拉积分）*/</span>
  o->I_hat_alpha += dt * (-o->R/o->L * o->I_hat_alpha - o->E_hat_alpha/o->L + Va/o->L);
  o->I_hat_beta  += dt * (-o->R/o->L * o->I_hat_beta  - o->E_hat_beta /o->L + Vb/o->L);
}

<span class="code-comment">/* 从反电动势求转子电角度
 * Eα、Eβ 是正交的反电动势分量，atan2直接得角度 */</span>
<span class="code-keyword">float</span> <span class="code-func">SMO_GetAngle</span>(<span class="code-keyword">const</span> SMO_t *o) {
  <span class="code-comment">// 注意：E_hat需先经低通滤波去除sign函数的高频抖动（颤振）*/</span>
  <span class="code-keyword">return</span> <span class="code-func">atan2f</span>(-o->E_hat_beta, -o->E_hat_alpha);
}</div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>SMO的两大难点</strong>：① <strong>颤振(chattering)</strong>——sign函数在零点附近高频切换，导致估算角度抖动，必须加低通滤波；② <strong>K_slide难调</strong>——太小收敛慢，太大会振荡。工程上常把 sign 换成 sat(饱和函数)或 sigmoid 来软化切换。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、三段式启动流程（解决零速问题）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            所有基于反电动势的无感方案都<strong>无法在零速工作</strong>（转速为零时反电动势为零）。工业上用"三段式启动"过渡：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>阶段1：预定位</strong>（0速）— 给某两相通入固定电流，把转子"拉"到已知电角度位置（如0°）。持续数百ms确保转子到位。</div></div>
            <div class="step-item"><div><strong>阶段2：强拖开环</strong>（低速）— 按固定斜率递增电角度θ，强制输出对应PWM，电机被动跟随。此阶段转速低、反电动势弱，无法闭环。</div></div>
            <div class="step-item"><div><strong>阶段3：切闭环</strong>（达到阈值转速）— 当转速足够高（反电动势可测），切换到SMO/EKF估算角度，进入闭环FOC。切换瞬间要平滑过渡，否则会抖动。</div></div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>零速且需要大扭矩的场景</strong>（如电动车起步、机械臂关节）必须用<strong>高频注入(HFI)</strong>而非反电动势法。HFI 利用 IPM 电机的凸极效应，注入高频电压脉冲，从电流响应中提取转子位置，可工作在真正的零速。代价是仅适用于凸极电机，且会引入额外噪声。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、各方法适用速段对比</h3>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>方法</th><th>零速</th><th>低速</th><th>中高速</th><th>计算量</th><th>适用电机</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">BEMF过零</td><td>❌</td><td>❌</td><td>✅</td><td>极低</td><td>BLDC六步换向</td></tr>
              <tr><td class="font-medium">SMO观测器</td><td>❌</td><td>⚠️(需启动)</td><td>✅</td><td>中</td><td>SPM/IPM的FOC</td></tr>
              <tr><td class="font-medium">高频注入HFI</td><td>✅</td><td>✅</td><td>❌</td><td>高</td><td>仅IPM(凸极)</td></tr>
              <tr><td class="font-medium">卡尔曼EKF</td><td>⚠️</td><td>✅</td><td>✅</td><td>极高</td><td>所有类型(需精确模型)</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>工程建议</strong>：低成本BLDC(风扇/水泵)用 BEMF过零即可；高性能FOC(无人机/云台)用 SMO + 三段式启动；伺服级精度用编码器放弃无感。无感省的是传感器成本，但调试难度数倍增加，<strong>学习阶段建议先用编码器把FOC跑通，再尝试无感</strong>。</div></div>
        `,
      },
      {
        id: 'advanced-multiloop',
        title: '多环控制',
        desc: '位置/速度/电流三环串级、前馈补偿、弱磁控制突破额定转速',
        icon: '🔄',
        tags: ['控制理论', '伺服', '弱磁'],
        content: `
          <h3 class="text-lg font-semibold mb-3">三环串级控制</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            精密运动控制通常采用三环串级结构：位置环→速度环→电流环。
            每一环的输出作为下一环的输入，内环响应最快，外环响应最慢。
          </p>

          <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
            <div class="text-center space-y-2">
              <div class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg font-medium">位置环（最外环）<br><span class="text-xs text-gray-500">带宽 ~10-100Hz</span></div>
              <div class="text-gray-400">↓</div>
              <div class="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg font-medium">速度环（中间环）<br><span class="text-xs text-gray-500">带宽 ~100-500Hz</span></div>
              <div class="text-gray-400">↓</div>
              <div class="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg font-medium">电流环（最内环）<br><span class="text-xs text-gray-500">带宽 ~1-10kHz</span></div>
              <div class="text-gray-400">↓</div>
              <div class="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg font-medium">电机 / 逆变器</div>
            </div>
          </div>

          <div class="info-box info">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>调试顺序</strong>：先调电流环（最内环），再调速度环，最后调位置环。由内到外逐级调试，确保内环稳定后再调外环。</div>
          </div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、带宽设计原则（内环要比外环快5~10倍）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            串级控制能成立的前提：<strong>内环带宽远高于外环</strong>。这样外环变化时，内环能"瞬间"跟上，对外环而言内环近似为 1:1 跟随。工程经验法则：
          </p>
          <div class="formula-block">
            $f_{\\text{内环}} \\geq (5\\sim10) \\times f_{\\text{外环}}$
            <div class="text-sm text-gray-500 mt-2">若内环不够快，外环会"等待"内环响应，导致整体相位滞后、振荡甚至失稳</div>
          </div>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>环路</th><th>典型带宽</th><th>采样周期</th><th>主要扰动来源</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">电流环</td><td>1~10 kHz</td><td>50~100 μs</td><td>母线电压波动、反电动势</td></tr>
              <tr><td class="font-medium">速度环</td><td>100~500 Hz</td><td>1~2 ms</td><td>负载突变、摩擦</td></tr>
              <tr><td class="font-medium">位置环</td><td>10~100 Hz</td><td>5~10 ms</td><td>轨迹加减速、外部冲击</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、前馈补偿（提升跟踪精度，不增加振荡风险）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            纯反馈控制（PID）总有滞后——目标变了，误差先出现，控制器才动作。<strong>前馈</strong>把已知的"未来指令"直接叠加到输出，提前补偿，把误差消灭在发生前。典型应用：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>速度前馈</strong>：轨迹规划算出的目标速度，直接加到速度环输出。电机不需要等位置误差累积就能动。</div></div>
            <div class="step-item"><div><strong>加速度前馈</strong>：把目标加速度×转动惯量=所需力矩，直接加到电流环。消除加减速段的"跟随误差"。</div></div>
            <div class="step-item"><div><strong>重力前馈</strong>（机械臂）：根据关节角度算出自重力矩，前馈补偿。让 PID 只处理动态部分，静态保持零误差。</div></div>
          </div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>前馈 vs 加大PID</strong>：想减小跟随误差，新手本能是加大Kp，但这会引发超调振荡。前馈是更优解——它<strong>不进入反馈回路</strong>，不会影响稳定性，纯粹叠加补偿量。这是专业伺服比业余方案跟踪精度高数倍的关键。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、各环的科学调试方法（避免"乱改参数看现象"）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            下面是<strong>可量化的调试流程</strong>，每一步都有明确的验证标准，而非凭感觉：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>环路</th><th>激励信号</th><th>看什么</th><th>判定标准</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">电流环</td><td>电流阶跃（0→额定）</td><td>电流波形上升时间</td><td>上升时间&lt;1ms，超调&lt;10%，无振荡</td></tr>
              <tr><td class="font-medium">速度环</td><td>速度阶跃（0→额定RPM）</td><td>速度响应曲线</td><td>上升时间 50~100ms，超调&lt;20%</td></tr>
              <tr><td class="font-medium">位置环</td><td>位置阶跃（走一段距离）</td><td>位置跟随误差</td><td>稳态误差≈0，无超调（位置环一般不加D）</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>阶跃响应是金标准</strong>：给一个突变的指令（如电流瞬间从0跳到额定），用串口输出实际值画波形。看<strong>上升时间、超调量、是否振荡</strong>三个指标。这比"看电机转得顺不顺"客观100倍。具体方法见 <a href="#" onclick="navigateTo('engineering-validation');return false;" style="color:var(--primary)">工程验证方法论</a>。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、弱磁控制（Field Weakening）——突破额定转速</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            电机的<strong>反电动势随转速线性升高</strong>（E = Ke·n）。当转速高到反电动势接近母线电压时，逆变器输出电压"顶到天花板"，再也无法驱动更多电流，转速达到上限。<strong>弱磁控制</strong>通过<strong>给 d 轴注入负向电流（Id &lt; 0）</strong>，产生与永磁体相反的磁场，削弱气隙合成磁通，从而降低反电动势，让电机突破额定转速继续加速。电动车超车、电动工具高速档、主轴电机都靠它。
          </p>
          <div class="formula-block">
            <div class="text-left">
              电压约束：$V = \\sqrt{V_d^2 + V_q^2} \\leq V_{max}$<br>
              稳态时 $V_d \\approx -\\omega L_q I_q$，$V_q \\approx R I_q + \\omega(L_d I_d + \\psi_f)$<br>
              注入 $I_d &lt; 0$ → $\\omega(L_d I_d + \\psi_f)$ 减小 → $V_q$ 下降 → 释放电压裕量 → 可继续升速
            </div>
            <div class="text-sm text-gray-500 mt-2">ψf 为永磁体磁链，ω 为电角速度。弱磁区电流轨迹从 Id=0 沿椭圆向 Id 负方向移动</div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-3">
            工程实现常用<strong>电压反馈法</strong>：实时监测电压利用率，超过阈值（如 90%）就用 PI 控制器逐步把 Id 拉负；退出高速区时再缓慢释放。关键：<strong>弱磁电流不能突变</strong>（否则磁链剧烈变化引起电流尖峰），必须限速率。框架如下：
          </p>
          <div class="code-block"><span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">float</span> vutil_thresh;   <span class="code-comment">// 电压利用率阈值(如0.9)，超过即启动弱磁</span>
  <span class="code-keyword">float</span> id_fw_min;      <span class="code-comment">// Id 下限(负值，防过弱磁退磁)</span>
  <span class="code-keyword">float</span> integ;          <span class="code-comment">// PI积分项</span>
  <span class="code-keyword">float</span> kp, ki;         <span class="code-comment">// 弱磁PI参数(整定要慢、稳)</span>
} FieldWeakening_t;

<span class="code-comment">/* 弱磁环：输入当前电压利用率 vutil 和 Id 反馈，输出弱磁 Id 指令
 * 与正常 Id_ref=0 取小(更负者)，保证弱磁优先 */</span>
<span class="code-keyword">float</span> <span class="code-func">FW_Update</span>(FieldWeakening_t *fw, <span class="code-keyword">float</span> vutil, <span class="code-keyword">float</span> dt) {
  <span class="code-keyword">float</span> err = vutil - fw->vutil_thresh;   <span class="code-comment">// &gt;0 说明电压不够，需弱磁</span>
  fw->integ += fw->ki * err * dt;
  <span class="code-keyword">float</span> id_fw = fw->kp * err + fw->integ;
  <span class="code-comment">// Id 只能往负走(弱磁)，且不能低于退磁极限</span>
  <span class="code-keyword">if</span> (id_fw &gt; <span class="code-number">0</span>) { id_fw = <span class="code-number">0</span>; fw->integ = <span class="code-number">0</span>; }     <span class="code-comment">// 正常区不弱磁</span>
  <span class="code-keyword">if</span> (id_fw &lt; fw->id_fw_min) id_fw = fw->id_fw_min;
  <span class="code-keyword">return</span> id_fw;   <span class="code-comment">// 最终 Id_ref = min(0, id_fw)</span>
}</div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>弱磁的代价与风险</strong>：① <strong>扭矩下降</strong>——磁通减弱，同样电流产生的力矩变小，进入"恒功率区"（高速低扭）；② <strong>退磁风险</strong>——Id 过负可能永久退磁永磁体，必须严格限幅；③ <strong>失步风险</strong>——弱磁区瞬态响应变差，负载突变易失步。这些是高级话题，<strong>建议在普通 FOC 玩熟后再尝试</strong>，且务必有<strong>过压/过流硬件保护</strong>（见 <a href="#" onclick="navigateTo('advanced-protection');return false;" style="color:var(--primary)">驱动器保护机制</a>）兜底。</div></div>
        `,
      },
      {
        id: 'servo-control',
        title: '伺服控制与通信',
        desc: '脉冲/方向控制、CANopen DS402协议、工业伺服的命令接口',
        icon: '📡',
        tags: ['伺服', '通信协议'],
        content: `
          <h3 class="text-lg font-semibold mb-3">工业伺服怎么"听命令"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            你写的 PID/FOC 是<strong>驱动器内部</strong>的控制算法。但在实际工程里，伺服电机通常是一体化产品（电机+驱动器+编码器），MCU 不直接控 PWM，而是<strong>发命令给驱动器</strong>。这就涉及"上位机如何控制伺服"的通信方式。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、脉冲/方向控制（最简单）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            和步进电机一模一样的接口：发脉冲走位置，DIR 决定方向。伺服驱动器内部用编码器闭环，保证不丢步。这是<strong>国产伺服最通用的方式</strong>（松下、汇川、台达都支持）。
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>信号</th><th>含义</th><th>典型接法</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">PULSE</td><td>脉冲（每个脉冲走固定角度）</td><td>差分输出，接驱动器 PUL+/PUL-</td></tr>
              <tr><td class="font-medium">DIR</td><td>方向电平</td><td>接 DIR+/DIR-</td></tr>
              <tr><td class="font-medium">ENABLE</td><td>伺服使能</td><td>接 ENA，低电平有效</td></tr>
              <tr><td class="font-medium">ALARM</td><td>故障输出</td><td>接 MCU 输入，触发即停</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mb-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>电子齿轮比</strong>：驱动器里设的一个比例，决定"1个脉冲走多少角度"。例如编码器 10000 线，设齿轮比让 10000 脉冲=1圈，则1脉冲=0.036°。MCU 端只管发脉冲数，不用关心编码器分辨率。</div></div>

          <div class="code-block"><span class="code-comment">/* 脉冲/方向控制伺服走位置（STM32定时器PWM脉冲模式）
 * 用定时器输出固定数量的脉冲，硬件自动完成 */</span>
<span class="code-keyword">void</span> <span class="code-func">Servo_MovePulse</span>(<span class="code-keyword">int32_t</span> pulses, <span class="code-keyword">uint32_t</span> freq_hz) {
  <span class="code-comment">// 1. 设置方向</span>
  <span class="code-keyword">if</span> (pulses &gt;= <span class="code-number">0</span>) HAL_GPIO_WritePin(DIR_PORT, DIR_PIN, GPIO_PIN_SET);
  <span class="code-keyword">else</span>        HAL_GPIO_WritePin(DIR_PORT, DIR_PIN, GPIO_PIN_RESET);
  <span class="code-keyword">uint32_t</span> count = (pulses &gt;= <span class="code-number">0</span>) ? pulses : -pulses;

  <span class="code-comment">// 2. 配置定时器：频率 = freq_hz, 脉冲数 = count
  //    STM32用 TIM PWM + 重复计数器/单脉冲模式 */</span>
  htim2.Instance->ARR = SystemCoreClock / freq_hz - <span class="code-number">1</span>;  <span class="code-comment">// 自动重装载值</span>
  htim2.Instance->CCR1 = (htim2.Instance->ARR + <span class="code-number">1</span>) / <span class="code-number">2</span>;  <span class="code-comment">// 50%占空比</span>
  <span class="code-comment">// 用DMA或中断递减计数，到0停止PWM</span>
  g_pulse_remaining = count;
  HAL_TIM_PWM_Start(&amp;htim2, TIM_CHANNEL_1);
}

<span class="code-comment">/* 在定时器更新中断里递减，到0关PWM */</span>
<span class="code-keyword">void</span> <span class="code-func">HAL_TIM_PeriodElapsedCallback</span>(TIM_HandleTypeDef *htim) {
  <span class="code-keyword">if</span> (htim == &amp;htim2 &amp;&amp; g_pulse_remaining &gt; <span class="code-number">0</span>) {
    <span class="code-keyword">if</span> (--g_pulse_remaining == <span class="code-number">0</span>)
      HAL_TIM_PWM_Stop(&amp;htim2, TIM_CHANNEL_1);
  }
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、模拟量控制（速度/转矩模式）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            用 DAC 或 PWM 滤波输出 0~10V（或 -10~+10V）模拟电压，电压值对应转速或转矩。<strong>简单但精度低</strong>（受温漂、线损影响），逐渐被数字通信淘汰。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、CANopen DS402（工业标准）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            现代伺服（机械臂、自动化产线）的标配。基于 CAN 总线，遵循 <strong>CiA 402</strong>（旧称 DSP402）设备协议。MCU 发标准化的对象字典命令，所有品牌伺服通用。
          </p>

          <div class="info-box info mb-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>CANopen 的分层</strong>：物理层(CAN总线) → 数据链路层(CAN帧) → 应用层(CANopen SDO/PDO/NMT) → 设备协议(DS402运动控制)。学 DS402 前要先懂 CANopen 基础（对象字典、PDO/SDO）。</div></div>

          <h4 class="font-medium mt-4 mb-2">DS402 关键对象（对象字典 OD）</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>索引</th><th>名称</th><th>类型</th><th>用途</th></tr></thead>
            <tbody>
              <tr><td class="font-mono">6040h</td><td>控制字 controlword</td><td>uint16</td><td>启停、模式切换、故障复位</td></tr>
              <tr><td class="font-mono">6041h</td><td>状态字 statusword</td><td>uint16</td><td>伺服当前状态（就绪/使能/故障）</td></tr>
              <tr><td class="font-mono">6060h</td><td>运行模式</td><td>int8</td><td>PP/PT/PV/PQ/CSP/CSV 等</td></tr>
              <tr><td class="font-mono">607Ah</td><td>目标位置</td><td>int32</td><td>CSP模式下设置目标位置</td></tr>
              <tr><td class="font-mono">60FFh</td><td>目标速度</td><td>uint32</td><td>PV模式下设置目标转速</td></tr>
              <tr><td class="font-mono">6064h</td><td>实际位置</td><td>int32</td><td>读编码器实际位置</td></tr>
            </tbody>
          </table></div>

          <div class="code-block"><span class="code-comment">/* DS402 状态机：通过 controlword 切换伺服状态
 * 典型启动流程：初始化 → 使能 → 运行
 * 每一步要读 statusword 确认上一状态完成 */</span>

<span class="code-comment">// 控制字的常用位组合</span>
<span class="code-keyword">#define</span> CW_SHUTDOWN       <span class="code-number">0x0006</span>   <span class="code-comment">// 准备使能</span>
<span class="code-keyword">#define</span> CW_SWITCH_ON      <span class="code-number">0x0007</span>   <span class="code-comment">// 使能</span>
<span class="code-keyword">#define</span> CW_ENABLE_OP      <span class="code-number">0x000F</span>   <span class="code-comment">// 使能运行</span>
<span class="code-keyword">#define</span> CW_FAULT_RESET    <span class="code-number">0x0080</span>   <span class="code-comment">// 故障复位</span>

<span class="code-comment">// 状态字的位</span>
<span class="code-keyword">#define</span> SW_READY_TO_SWITCH_ON  <span class="code-number">0x0001</span>
<span class="code-keyword">#define</span> SW_SWITCHED_ON         <span class="code-number">0x0002</span>
<span class="code-keyword">#define</span> SW_OPERATION_ENABLED   <span class="code-number">0x0004</span>
<span class="code-keyword">#define</span> SW_FAULT                <span class="code-number">0x0008</span>

<span class="code-comment">/**
 * DS402 使能流程（阻塞式，实际应用加超时）
 * 通过 PDO 写 controlword，读 statusword
 */</span>
<span class="code-keyword">int</span> <span class="code-func">DS402_Enable</span>(<span class="code-keyword">void</span>) {
  <span class="code-comment">// 1. 发 SHUTDOWN，等状态字出现 READY_TO_SWITCH_ON</span>
  <span class="code-func">WriteControlWord</span>(CW_SHUTDOWN);
  <span class="code-keyword">while</span> (!(<span class="code-func">ReadStatusWord</span>() & SW_READY_TO_SWITCH_ON));

  <span class="code-comment">// 2. 发 SWITCH_ON，等 SWITCHED_ON</span>
  <span class="code-func">WriteControlWord</span>(CW_SWITCH_ON);
  <span class="code-keyword">while</span> (!(<span class="code-func">ReadStatusWord</span>() & SW_SWITCHED_ON));

  <span class="code-comment">// 3. 发 ENABLE_OP，等 OPERATION_ENABLED</span>
  <span class="code-func">WriteControlWord</span>(CW_ENABLE_OP);
  <span class="code-keyword">while</span> (!(<span class="code-func">ReadStatusWord</span>() & SW_OPERATION_ENABLED));

  <span class="code-keyword">return</span> <span class="code-number">0</span>;   <span class="code-comment">// 使能成功</span>
}

<span class="code-comment">/* CSP(周期同步位置)模式：周期性发目标位置
 * 这就是机械臂上位机的典型用法 */</span>
<span class="code-keyword">void</span> <span class="code-func">DS402_CSP_Move</span>(<span class="code-keyword">int32_t</span> target_pos) {
  <span class="code-func">WriteOD</span>(<span class="code-number">0x607A</span>, target_pos);     <span class="code-comment">// 写目标位置</span>
  <span class="code-func">WriteControlWord</span>(CW_ENABLE_OP | <span class="code-number">0x10</span>); <span class="code-comment">// setpoint有效</span>
}</div>

          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>CANopen 的调试门槛较高</strong>。需要 CAN 分析仪（如 PCAN-USB、CANalyst-II）+ 上位机软件（如 CANopen Magic、ZLT CAN）。先用 SDO 配好对象字典，再跑 PDO 实时通信。建议先用脉冲方向控伺服熟悉，再上 CANopen。</div></div>

          <h4 class="font-medium mt-4 mb-2">通信方式选型</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>方式</th><th>成本</th><th>精度</th><th>多轴同步</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">脉冲/方向</td><td>低</td><td>中</td><td>差（每轴占资源）</td><td>单轴/简单设备、国产伺服</td></tr>
              <tr><td class="font-medium">模拟量</td><td>低</td><td>低</td><td>差</td><td>老设备、调速场景</td></tr>
              <tr><td class="font-medium">CANopen</td><td>中</td><td>高</td><td>好</td><td>工业机械臂、AGV、多轴设备</td></tr>
              <tr><td class="font-medium">EtherCAT</td><td>高</td><td>极高</td><td>极好(μs级同步)</td><td>高端机械臂、数控机床</td></tr>
            </tbody>
          </table></div>
        `,
      },
      {
        id: 'engineering-validation',
        title: '工程验证方法论',
        desc: '从"乱改参数看现象"到"科学调试"——电机控制研发的系统化测试与验证流程',
        icon: '🔬',
        tags: ['工程方法', '调试', '必读'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么需要这套方法论</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            新手调电机的典型困境：<strong>改了一堆参数，凭"感觉"判断好坏，说不清哪里对了哪里错了</strong>。改了A参数电机好像稳了，改了B参数又抖了，却不知道为什么。这种"试错法"效率极低，且无法复现、无法传承经验。
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            工程界的标准做法是：<strong>把"调参"变成"可量化的测试"</strong>——定义明确的激励信号、采集响应数据、对照客观指标判定、记录每次改动的效果。本节把这套方法落地到电机控制的每个环节。
          </p>
          <div class="info-box tip mb-6"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>核心原则</strong>：看得见的才能调。<strong>所有关键变量必须实时输出到上位机画波形</strong>——目标值、实际值、误差、PWM占空比、电流。靠肉眼观察电机动作，只能发现"明显故障"，永远调不出高性能。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、研发的五个阶段（V模型）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            专业的电机控制研发遵循<strong>V字型流程</strong>，左侧自顶向下设计，右侧自底向上验证。每个阶段都有明确的输入输出和验证手段：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>① 需求定义</strong>：明确性能指标——最大转速、定位精度(±多少)、阶跃响应时间、超调量上限。没有量化指标就无法判定"调好了"。</div></div>
            <div class="step-item"><div><strong>② 算法仿真</strong>（Matlab/Simulink 或 Python）：先在仿真里验证算法逻辑、初估参数范围。仿真里能随意改参数看响应，零成本试错。</div></div>
            <div class="step-item"><div><strong>③ 硬件在环</strong>：算法移植到MCU，先用<strong>开环/极低参数</strong>验证硬件（PWM、ADC、编码器）正常，再逐步切入闭环。</div></div>
            <div class="step-item"><div><strong>④ 单元调试</strong>：逐个环路调试（电流环→速度环→位置环），每环用标准激励测响应，达标后再进下一环。</div></div>
            <div class="step-item"><div><strong>⑤ 系统验证</strong>：整体性能测试、边界条件测试（堵转、过载、急停）、长时间稳定性测试。对照①的需求逐项验收。</div></div>
          </div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>新手最常跳过的是②和④</strong>：直接上硬件乱试，不仿真、不逐环验证。结果问题混在一起——明明是电流环没调好，却在改位置环参数，永远调不对。V模型的价值就是<strong>隔离问题</strong>。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、激励信号：用标准输入测试系统</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            不要用"随便给个目标"测试。用控制理论里的<strong>标准激励信号</strong>，每种揭示系统不同特性：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>激励类型</th><th>波形</th><th>揭示什么</th><th>典型用法</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">阶跃信号</td><td>瞬间从0跳到目标值</td><td>动态响应：上升时间、超调、稳态误差</td><td>调PID最常用，看响应曲线</td></tr>
              <tr><td class="font-medium">斜坡信号</td><td>匀速增长</td><td>跟随误差（稳态误差与速度成正比）</td><td>测跟踪精度，验证前馈效果</td></tr>
              <tr><td class="font-medium">正弦扫频</td><td>频率从低到高的正弦波</td><td>频率响应、带宽、相位裕度</td><td>专业频域分析，需FFT</td></tr>
              <tr><td class="font-medium">脉冲信号</td><td>短时冲击</td><td>冲击响应、系统阻尼</td><td>模拟负载突变</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>阶跃响应的三要素</strong>：①<strong>上升时间</strong>(从10%到90%的时间，越短响应越快)；②<strong>超调量</strong>(超过目标值的百分比，越小越稳但可能越慢)；③<strong>稳态误差</strong>(稳定后的残余偏差，应为0或极小)。这三个数字就是评判"调好了没"的客观标准。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、数据采集：让看不见的变量变成波形</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            这是整个方法论的基础设施。每个控制周期把关键变量通过串口/USB发出来，上位机实时画图：
          </p>
          <div class="code-block"><span class="code-comment">/* 调试数据采集框架（每个控制周期调用一次）
 * 用环形缓冲区暂存，满一批再发，避免高频串口阻塞控制环 */</span>
<span class="code-keyword">#define</span> DBG_BUF_SIZE  <span class="code-number">64</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">uint32_t</span> tick;         <span class="code-comment">// 时间戳(控制周期计数)</span>
  <span class="code-keyword">float</span> target;          <span class="code-comment">// 目标值(目标位置/速度/电流)</span>
  <span class="code-keyword">float</span> actual;          <span class="code-comment">// 实际值(传感器读数)</span>
  <span class="code-keyword">float</span> error;           <span class="code-comment">// 误差 = target - actual</span>
  <span class="code-keyword">float</span> output;          <span class="code-comment">// 控制器输出(PWM占空比等)</span>
} Debug_Sample_t;

Debug_Sample_t g_dbg_buf[DBG_BUF_SIZE];
<span class="code-keyword">volatile uint16_t</span> g_dbg_idx = <span class="code-number">0</span>;

<span class="code-comment">/* 在控制环里调用，记录一帧数据 */</span>
<span class="code-keyword">void</span> <span class="code-func">DBG_Capture</span>(<span class="code-keyword">float</span> tgt, <span class="code-keyword">float</span> act, <span class="code-keyword">float</span> out) {
  <span class="code-keyword">uint16_t</span> i = g_dbg_idx;
  g_dbg_buf[i].tick   = g_tick++;
  g_dbg_buf[i].target = tgt;
  g_dbg_buf[i].actual = act;
  g_dbg_buf[i].error  = tgt - act;
  g_dbg_buf[i].output = out;
  <span class="code-keyword">if</span> (++g_dbg_idx &gt;= DBG_BUF_SIZE) {
    g_dbg_idx = <span class="code-number">0</span>;
    <span class="code-func">DBG_Flush</span>();   <span class="code-comment">// 缓冲满，批量发送(DMA或中断)</span>
  }
}

<span class="code-comment">/* 批量发送：CSV格式，上位机直接画图
 * 格式：tick,target,actual,error,output */</span>
<span class="code-keyword">void</span> <span class="code-func">DBG_Flush</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">for</span> (<span class="code-keyword">uint16_t</span> i = <span class="code-number">0</span>; i &lt; DBG_BUF_SIZE; i++) {
    <span class="code-func">printf</span>(<span class="code-string">"%lu,%.3f,%.3f,%.3f,%.3f\\n"</span>,
           g_dbg_buf[i].tick, g_dbg_buf[i].target,
           g_dbg_buf[i].actual, g_dbg_buf[i].error, g_dbg_buf[i].output);
  }
}</div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>上位机工具选择</strong>：① <strong>Serial Studio</strong>(开源，接CSV自动画图，最推荐)；② <strong>VOFA+</strong>(国产，VOF协议拖拽控件)；③ <strong>自己写Python脚本</strong>(pyserial+matplotlib，最灵活)。数据格式用CSV最通用。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、各环节的具体验证清单</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            下面把方法论落地到电机控制的每个环节，每项都是<strong>可执行的测试步骤 + 通过标准</strong>：
          </p>

          <h4 class="font-medium mt-4 mb-2">① 硬件验证（写代码前先确认硬件正常）</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>测试项</th><th>方法</th><th>通过标准</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">PWM输出</td><td>示波器测PWM引脚</td><td>频率正确、占空比可调、互补管有死区</td></tr>
              <tr><td class="font-medium">ADC采样</td><td>短接ADC输入到GND/VCC，读1000次</td><td>读数稳定，噪声&lt;5 LSB</td></tr>
              <tr><td class="font-medium">编码器</td><td>手动转一圈，读CNT变化</td><td>变化数 = PPR×4，正反向计数正确</td></tr>
              <tr><td class="font-medium">电流零点</td><td>电机断电，读相电流ADC</td><td>三相应接近VCC/2(零电流偏置)</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">② 电流环验证（最内环，先调）</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>测试项</th><th>激励</th><th>看什么</th><th>通过标准</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">电流阶跃响应</td><td>Iq_ref 从0阶跃到50%额定</td><td>实际电流曲线</td><td>上升时间&lt;1ms，超调&lt;10%</td></tr>
              <tr><td class="font-medium">电流跟踪</td><td>Iq_ref 给正弦波(如200Hz)</td><td>实际电流 vs 目标</td><td>幅值无衰减，相位滞后&lt;10°</td></tr>
              <tr><td class="font-medium">噪声水平</td><td>稳态(固定Iq)</td><td>电流纹波峰峰值</td><td>&lt;额定电流的5%</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">③ 速度环验证</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>测试项</th><th>激励</th><th>看什么</th><th>通过标准</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">速度阶跃响应</td><td>0→额定RPM阶跃</td><td>速度曲线</td><td>上升时间50~100ms，超调&lt;20%</td></tr>
              <tr><td class="font-medium">负载扰动</td><td>稳速运行时突加负载</td><td>速度跌落与恢复时间</td><td>跌落&lt;10%，恢复&lt;200ms</td></tr>
              <tr><td class="font-medium">低速平稳性</td><td>极低目标速度(如1RPM)</td><td>速度波动</td><td>无明显爬行/抖动</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">④ 位置环验证（加减速/S曲线在这里验证）</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>测试项</th><th>激励</th><th>看什么</th><th>通过标准</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">位置阶跃</td><td>走一段固定距离</td><td>位置+速度曲线</td><td>到达后稳态误差≈0，无超调</td></tr>
              <tr><td class="font-medium">跟随误差</td><td>匀速运动(斜坡)</td><td>目标-实际位置差</td><td>误差恒定且小(加前馈后趋近0)</td></tr>
              <tr><td class="font-medium">S曲线平滑度</td><td>带加减速的运动</td><td>加速度是否连续</td><td>无突变冲击，速度曲线S形</td></tr>
              <tr><td class="font-medium">重复定位精度</td><td>同一目标走10次</td><td>每次停止位置</td><td>偏差&lt;1个最小分辨率</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、S曲线参数的科学调法（解决你的具体痛点）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            你提到"乱改S曲线参数看电机现象"——这里给出系统化的流程。S曲线的核心参数是<strong>最大速度、最大加速度、加加速(jerk)</strong>。调参顺序：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>第1步：确定最大速度</strong>。单独测——发固定速度指令，逐步增大直到电机出现丢步(步进)或电流饱和(无刷)。最大可用速度 = 出现异常前速度的 80%。</div></div>
            <div class="step-item"><div><strong>第2步：确定最大加速度</strong>。固定速度，逐步增大加速度，观察起步/停止时是否丢步或过冲。最大可用加速度 = 异常前的 60~70%（留余量应对负载变化）。</div></div>
            <div class="step-item"><div><strong>第3步：调加加速(jerk)</strong>。这是S曲线区别于梯形的关键。从大值开始减小，同时<strong>串口输出加速度波形</strong>，直到加速度曲线从"突变"变成"S形平滑"。</div></div>
            <div class="step-item"><div><strong>第4步：验证</strong>。用<strong>编码器读实际位置</strong>，和目标位置对比。理想情况：实际位置曲线紧贴目标，停止时误差≈0。这就是判定S曲线参数是否合适的客观标准。</div></div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>关键转变</strong>：从"看电机转得顺不顺"→<strong>"看目标位置和实际位置的误差曲线"</strong>。前者主观且只能发现严重问题；后者客观，能发现微小的跟随误差、过冲、抖动。配合<strong>重复定位精度测试</strong>(同目标走10次看离散度)，能全面评估S曲线质量。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、参数调优记录表（必备工程习惯）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            每次改参数都要记录<strong>改动前后的响应指标</strong>，否则调着调着就忘了哪个参数起作用。推荐用表格或版本控制：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>版本</th><th>Kp</th><th>Ki</th><th>Kd</th><th>上升时间</th><th>超调</th><th>备注</th></tr></thead>
            <tbody>
              <tr><td class="font-mono">v1</td><td>0.5</td><td>0.01</td><td>0</td><td>120ms</td><td>35%</td><td>太慢，超调大</td></tr>
              <tr><td class="font-mono">v2</td><td>1.0</td><td>0.01</td><td>0</td><td>60ms</td><td>15%</td><td>更快，超调减小</td></tr>
              <tr><td class="font-mono">v3</td><td>1.0</td><td>0.02</td><td>0</td><td>58ms</td><td>8%</td><td>加Ki消稳态误差</td></tr>
              <tr><td class="font-mono">v4</td><td>1.2</td><td>0.02</td><td>0</td><td>45ms</td><td>12%</td><td>再加Kp，略超调可接受</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>进阶：用阶跃响应拟合传递函数</strong>。把阶跃响应数据导入 MATLAB 的 System Identification 工具箱，能反推出电机的传递函数模型。有了模型，就能用理论方法(如极点配置)直接算出最优PID参数，而不是试错。这是从"调参"到"设计参数"的跨越。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">七、工具链总览</h3>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>环节</th><th>工具</th><th>用途</th><th>成本</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">仿真</td><td>MATLAB/Simulink, Python控制库</td><td>算法验证、参数初估</td><td>免费(Python)/付费(MATLAB)</td></tr>
              <tr><td class="font-medium">数据采集</td><td>Serial Studio, VOFA+, 自写Python</td><td>实时波形可视化</td><td>免费</td></tr>
              <tr><td class="font-medium">硬件调试</td><td>逻辑分析仪, 示波器, 万用表</td><td>PWM/ADC/通信波形验证</td><td>50~500元</td></tr>
              <tr><td class="font-medium">参数辨识</td><td>MATLAB Ident工具箱</td><td>从响应反推电机模型</td><td>付费(学生版可)</td></tr>
              <tr><td class="font-medium">版本管理</td><td>Git + 参数记录表</td><td>追踪每次改动效果</td><td>免费</td></tr>
            </tbody>
          </table></div>

          <div class="info-box tip mt-6"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>一句话总结</strong>：把"调电机"变成"做实验"——定义激励、采集数据、对照指标、记录过程。这套方法前期投入(搭数据采集)看似麻烦，但一旦建立，调试效率提升10倍，且经验可复现可传承。这也是工程师和爱好者的本质区别。</div></div>
        `,
      },
      {
        id: 'current-sense',
        title: '电流采样硬件',
        desc: 'FOC/过流保护的基础——shunt+运放、INA240、ACS712选型与电路设计',
        icon: '🔌',
        tags: ['硬件', 'FOC'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么电流采样是FOC的命脉</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            FOC 的所有计算（Clarke/Park/PID）都建立在<strong>实时相电流</strong>之上。电流采不准，后面全错。同时电流采样也是<strong>过流保护</strong>的硬件基础。本节讲清楚几种采样方案的原理、选型、电路要点。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、采样电阻法（Shunt + 运放，FOC主流）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            在电机回路里串一个<strong>小阻值精密电阻(shunt)</strong>，电流流过时产生压降，经运放放大后送 ADC。三种安装位置各有特点：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>位置</th><th>原理</th><th>优点</th><th>缺点</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">下桥臂采样</td><td>shunt串在每个下桥MOS的源极到地</td><td>运放输入共地，简单；MOS关断时无电流</td><td>只能在PWM特定时刻采样</td><td>FOC最常用</td></tr>
              <tr><td class="font-medium">相线采样</td><td>shunt串在电机相线上</td><td>任意时刻都能采</td><td>需高共模运放，成本高</td><td>高精度伺服</td></tr>
              <tr><td class="font-medium">直流母线采样</td><td>shunt串在母线</td><td>只需一个电阻</td><td>无法区分三相电流</td><td>过流保护、BEMF检测</td></tr>
            </tbody>
          </table></div>
          <div class="formula-block">
            $I = \\frac{V_{shunt} \\times G_{opamp}}{R_{shunt}}, \\quad V_{shunt} = I \\times R_{shunt}$
            <div class="text-sm text-gray-500 mt-2">例：10A电流 × 5mΩ电阻 = 50mV压降，经20倍运放 = 1V → ADC读数对应10A</div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>Shunt选型</strong>：阻值越小压降越小(发热少)，但信号弱需更大运放增益。典型 1~10mΩ，功率 = I²R。10A用5mΩ电阻，功耗=0.5W，选<strong>1W以上的精密(1%)金属膜电阻</strong>。专用的4端子开尔文接法电阻精度更高。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、运放选型（关键：带宽 + 共模范围）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            电流采样运放不是随便选的，核心指标是<strong>共模抑制比(CMR)</strong>和<strong>带宽</strong>。下桥臂采样时，MOS开关瞬间会产生共模电压跳变，运放必须抑制它：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>器件</th><th>类型</th><th>带宽</th><th>特点</th><th>典型用途</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">INA240</td><td>专用电流检测运放</td><td>400kHz</td><td>高CMR(>100dB)、内置固定增益、抗PWM共模</td><td>FOC三相采样首选</td></tr>
              <tr><td class="font-medium">INA181</td><td>通用低成本</td><td>260kHz</td><td>便宜、增益可选(20~500)</td><td>低成本FOC</td></tr>
              <tr><td class="font-medium">OPA2376</td><td>精密运放(自搭电路)</td><td>5.5MHz</td><td>灵活，但要自己设计差分电路</td><td>高精度定制</td></tr>
              <tr><td class="font-medium">STM32内部运放</td><td>MCU内置(PGA)</td><td>几MHz</td><td>省外部元件，STM32G4/F334有</td><td>集成度高的方案</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>带宽不能太低</strong>：FOC电流采样在PWM周期中点，信号含高频成分。运放带宽若低于PWM频率的5倍，信号会失真。20kHz PWM至少需100kHz带宽运放，INA240的400kHz绰绰有余。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、霍尔电流传感器（隔离采样）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            利用霍尔效应测磁场，电流越大磁场越强。最大优势是<strong>电气隔离</strong>（被测电路和测量电路无电气连接），适合高压大电流：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>器件</th><th>量程</th><th>隔离</th><th>带宽</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">ACS712</td><td>±5/20/30A</td><td>2.1kV</td><td>80kHz</td><td>低压过流保护、教学</td></tr>
              <tr><td class="font-medium">ACS724/ACS37002</td><td>±50~100A</td><td>5kV</td><td>120kHz</td><td>电动工具、e-bike</td></tr>
              <tr><td class="font-medium">闭环霍尔(LEM系列)</td><td>数百~千A</td><td>极高</td><td>高</td><td>工业伺服、变频器</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>ACS712用于FOC的局限</strong>：带宽80kHz看似够，但<strong>零点漂移大、噪声大、带宽实际更低</strong>，不适合FOC的精密相电流采样。它更适合<strong>过流保护</strong>（慢速监测母线电流，超阈值即停机）。FOC采样还是选INA240+shunt。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、采样时序（FOC采准电流的关键）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            下桥臂采样必须在<strong>下桥MOS导通期间</strong>采（此时电流流过shunt）。在PWM周期中点采样，避免开关瞬间的噪声。用定时器联动ADC实现：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>硬件联动</strong>：PWM定时器的"更新事件"(周期中点)触发ADC注入组转换。STM32配置 TIM TRGO → ADC Inject。</div></div>
            <div class="step-item"><div><strong>双通道同步</strong>：同时采两相电流(Ia, Ib)，用ADC的双通道同步模式，保证时间一致。</div></div>
            <div class="step-item"><div><strong>ADC完成后中断</strong>：ADC转换完成中断里立即跑FOC算法(读电流→Clarke→Park→PI→反变换→写PWM)，一气呵成。</div></div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>采样时刻错误的后果</strong>：若在MOS开关瞬间采样，会采到巨大的尖峰噪声（开关毛刺），电流波形全是毛刺，FOC完全没法用。用示波器看ADC触发点和PWM的对应关系是调试第一步。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、零电流校准（上电必做）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            运放和ADC都有<strong>零点偏移(offset)</strong>，零电流时ADC读数不是理想的VCC/2。这个偏移会被当成直流电流，污染整个FOC。校准方法：
          </p>
          <div class="code-block"><span class="code-comment">/* 零电流校准：上电时电机不通电，采N次取平均作为偏置 */</span>
<span class="code-keyword">#define</span> CALIB_SAMPLES  <span class="code-number">1024</span>

<span class="code-keyword">void</span> <span class="code-func">CurrentSense_Calibrate</span>(<span class="code-keyword">void</span>) {
  <span class="code-comment">// 确保电机断电(PWM占空比为0)</span>
  <span class="code-func">PWM_SetAllDutyZero</span>();
  <span class="code-func">Delay_ms</span>(<span class="code-number">100</span>);  <span class="code-comment">// 等电流衰减</span>

  <span class="code-keyword">uint32_t</span> sum_a = <span class="code-number">0</span>, sum_b = <span class="code-number">0</span>;
  <span class="code-keyword">for</span> (<span class="code-keyword">uint16_t</span> i = <span class="code-number">0</span>; i &lt; CALIB_SAMPLES; i++) {
    sum_a += <span class="code-func">ADC_Read</span>(CH_CURRENT_A);
    sum_b += <span class="code-func">ADC_Read</span>(CH_CURRENT_B);
  }
  g_offset_a = sum_a / CALIB_SAMPLES;   <span class="code-comment">// 存零点偏置</span>
  g_offset_b = sum_b / CALIB_SAMPLES;
}

<span class="code-comment">/* 正式采样时减去偏置 */</span>
<span class="code-keyword">float</span> <span class="code-func">CurrentSense_Read</span>(<span class="code-keyword">uint8_t</span> ch) {
  <span class="code-keyword">uint16_t</span> raw = <span class="code-func">ADC_Read</span>(ch);
  <span class="code-keyword">uint16_t</span> offset = (ch == CH_CURRENT_A) ? g_offset_a : g_offset_b;
  <span class="code-keyword">int32_t</span> signed_raw = (<span class="code-keyword">int32_t</span>)raw - offset;  <span class="code-comment">// 去偏置，可正可负</span>
  <span class="code-keyword">return</span> (<span class="code-keyword">float</span>)signed_raw * ADC_TO_AMP;     <span class="code-comment">// 转安培</span>
}</div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>温度漂移</strong>：offset会随温度变化。精密场合需<strong>周期性重新校准</strong>（如电机静止时），或用温补运放。否则长时间运行后零点漂移会让电流读数带直流分量。</div></div>
        `,
      },
      {
        id: 'advanced-comm',
        title: '通讯协议：Modbus RTU 与 CAN',
        desc: 'RS485物理层、Modbus RTU帧结构、常用功能码03/06/10、CAN帧与CANopen入门',
        icon: '📡',
        tags: ['通讯', 'Modbus', 'CAN', 'RS485'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么电机驱动器离不开通讯协议</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            单台电机用 PWM/脉冲就能转。但工业现场一台控制器要管几十台伺服/变频器，MCU 的 GPIO 根本不够用。
            <strong>通讯总线</strong>用一根双绞线串接所有设备，靠"地址+报文"区分。电机控制领域两大主流：
            <strong>Modbus RTU</strong>（简单、普及、低速）和 <strong>CAN/CANopen</strong>（可靠、实时、多主）。
            本节的 CRC 校验可配合 <a href="#" onclick="navigateTo('tools');return false;" style="color:var(--primary)">工具箱→校验工具</a> 实操。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、RS485：Modbus 的物理层</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Modbus RTU 几乎都跑在 <strong>RS485</strong> 串行总线上。理解物理层是排故的关键：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>特性</th><th>RS485（差分）</th><th>RS232（单端）</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">传输方式</td><td>两线差分（A/B线电压差）</td><td>单线对地电压</td></tr>
              <tr><td class="font-medium">抗干扰</td><td>强（共模噪声被抵消）</td><td>弱</td></tr>
              <tr><td class="font-medium">传输距离</td><td>可达1200m</td><td>约15m</td></tr>
              <tr><td class="font-medium">节点数</td><td>最多32（或128/256个收发器）</td><td>1对1</td></tr>
              <tr><td class="font-medium">拓扑</td><td>菊花链（手拉手）</td><td>点对点</td></tr>
            </tbody>
          </table></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🔧 终端电阻 120Ω</div>
              <div class="text-sm text-gray-500">总线<strong>两端</strong>各并一个120Ω电阻，匹配双绞线特性阻抗，防止信号反射。中间节点不接。漏接会导致波形畸变、通信丢帧。</div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🔗 菊花链拓扑</div>
              <div class="text-sm text-gray-500">设备一个接一个串联，<strong>严禁星形/分支</strong>。分支会产生反射节点。布线时从主站拉到设备1，再到设备2……最后到末端设备。</div>
            </div>
          </div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>A/B 接反是最常见故障</strong>：通信完全不通或乱码。怀疑时直接对调 A、B 两线。另外 Modbus RTU 帧间必须留 <strong>3.5 个字符时间</strong>的静默（9600bps 下约 4ms）作为帧边界，无起始/结束标志字节。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、Modbus RTU 帧结构</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            一帧 RTU 报文由 4 部分组成，没有起始结束标志，靠帧间静默分隔：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>字节</th><th>字段</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">1</td><td>从站地址</td><td>1~247，0为广播(所有从站响应)</td></tr>
              <tr><td class="font-medium">1</td><td>功能码</td><td>03读/06写单/10写多/04读输入...</td></tr>
              <tr><td class="font-medium">N</td><td>数据区</td><td>因功能码而异(寄存器地址+数量/数据)</td></tr>
              <tr><td class="font-medium">2</td><td>CRC-16</td><td>低字节在前(Modbus字节序)，校验全帧</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">常用功能码与报文示例</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            以"主站读从站01的保持寄存器，起始地址0x0000，数量10个"为例（功能码 0x03）：
          </p>
          <div class="code-block"><span class="code-comment">/* 请求帧：主站 → 从站01 */</span>
从站地址 功能码  起始地址  寄存器数   CRC
  01      03    00 00    00 0A    CD C5

<span class="code-comment">/* 响应帧：从站01 → 主站（返回20字节=10寄存器×2字节）*/</span>
  01  03  14  [00 00 00 01 ... 共20字节数据]  XX XX
  ↑   ↑   ↑   ↑                                ↑
 地址 功能 字节数 数据区                         CRC

<span class="code-comment">/* 异常响应：从站无法执行时，功能码最高位置1（0x83）*/</span>
  01  83  02  C0 F1        <span class="code-comment">// 0x02 = 非法地址</span></div>
          <div class="overflow-x-auto"><table class="compare-table mt-3">
            <thead><tr><th>功能码</th><th>操作</th><th>数据区（请求）</th><th>典型用途</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">0x03</td><td>读保持寄存器</td><td>起始地址+数量</td><td>读电机转速、电流、位置</td></tr>
              <tr><td class="font-medium">0x06</td><td>写单个寄存器</td><td>地址+数据(2字节)</td><td>设定目标位置/速度</td></tr>
              <tr><td class="font-medium">0x10</td><td>写多个寄存器</td><td>地址+数量+字节数+数据</td><td>批量写参数表</td></tr>
              <tr><td class="font-medium">0x04</td><td>读输入寄存器</td><td>起始地址+数量</td><td>读只读采样值（ADC等）</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、CRC-16 与帧组装（纯 C 实现）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Modbus CRC-16 采用多项式 0x8005（反转 0xA001），输入输出均反转，初值 0xFFFF。CRC 附在帧尾，<strong>低字节在前</strong>：
          </p>
          <div class="code-block"><span class="code-comment">/* Modbus CRC-16（查表法，平台无关）*/</span>
<span class="code-keyword">static const uint16_t</span> crc_table[<span class="code-number">256</span>] = { <span class="code-comment">/* 预计算，省略 */</span> };

<span class="code-keyword">uint16_t</span> <span class="code-func">Modbus_CRC16</span>(<span class="code-keyword">const uint8_t</span> *data, <span class="code-keyword">uint16_t</span> len) {
  <span class="code-keyword">uint16_t</span> crc = <span class="code-number">0xFFFF</span>;
  <span class="code-keyword">for</span> (<span class="code-keyword">uint16_t</span> i = <span class="code-number">0</span>; i &lt; len; i++)
    crc = crc_table[(crc ^ data[i]) & <span class="code-number">0xFF</span>] ^ (crc &gt;&gt; <span class="code-number">8</span>);
  <span class="code-keyword">return</span> crc;   <span class="code-comment">// 注意：发送时先发低字节(crc & 0xFF)，再发高字节</span>
}

<span class="code-comment">/* 组装一帧"读保持寄存器"请求：返回帧总长 */</span>
<span class="code-keyword">uint16_t</span> <span class="code-func">Modbus_BuildRead</span>(<span class="code-keyword">uint8_t</span> *buf, <span class="code-keyword">uint8_t</span> slave,
                           <span class="code-keyword">uint16_t</span> reg, <span class="code-keyword">uint16_t</span> qty) {
  buf[<span class="code-number">0</span>] = slave;          <span class="code-comment">// 从站地址</span>
  buf[<span class="code-number">1</span>] = <span class="code-number">0x03</span>;            <span class="code-comment">// 功能码：读保持寄存器</span>
  buf[<span class="code-number">2</span>] = reg &gt;&gt; <span class="code-number">8</span>;        <span class="code-comment">// 起始地址高字节</span>
  buf[<span class="code-number">3</span>] = reg & <span class="code-number">0xFF</span>;       <span class="code-comment">// 起始地址低字节</span>
  buf[<span class="code-number">4</span>] = qty &gt;&gt; <span class="code-number">8</span>;        <span class="code-comment">// 数量高字节</span>
  buf[<span class="code-number">5</span>] = qty & <span class="code-number">0xFF</span>;       <span class="code-comment">// 数量低字节</span>
  <span class="code-keyword">uint16_t</span> crc = <span class="code-func">Modbus_CRC16</span>(buf, <span class="code-number">6</span>);
  buf[<span class="code-number">6</span>] = crc & <span class="code-number">0xFF</span>;       <span class="code-comment">// CRC低字节在前</span>
  buf[<span class="code-number">7</span>] = crc &gt;&gt; <span class="code-number">8</span>;        <span class="code-comment">// CRC高字节</span>
  <span class="code-keyword">return</span> <span class="code-number">8</span>;              <span class="code-comment">// 总长8字节</span>
}</div>
          <div class="info-box tip mt-3 mb-4"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>动手验证</strong>：把上面那帧 <code>01 03 00 00 00 0A CD C5</code> 粘进 <a href="#" onclick="navigateTo('tools');return false;" style="color:var(--primary)">工具箱→校验工具</a> 选 Modbus CRC-16，输入前6字节应算出 <code>CD C5</code>（低字节在前），与帧尾一致即校验通过。或直接用"Modbus RTU 解析"标签页一键拆解全帧。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、CAN 总线与 CANopen</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            CAN（Controller Area Network）是汽车/工业领域的高可靠总线，<strong>多主架构</strong>、带硬件仲裁和非破坏性冲突解决，抗干扰和实时性远超 RS485。高端伺服（如倍福、汇川 EtherCAT 之下层）多用 CANopen。
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>对比项</th><th>Modbus RTU (RS485)</th><th>CAN / CANopen</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">架构</td><td>单主轮询</td><td>多主，带仲裁</td></tr>
              <tr><td class="font-medium">错误处理</td><td>仅CRC校验，无重传机制</td><td>硬件CRC15+错误帧+自动重传</td></tr>
              <tr><td class="font-medium">实时性</td><td>从站多时延迟累积</td><td>高优先级ID优先发送，确定性好</td></tr>
              <tr><td class="font-medium">速率</td><td>≤115200 bps</td><td>1 Mbps（40m内）/ CAN-FD 5Mbps+</td></tr>
              <tr><td class="font-medium">典型应用</td><td>变频器、简单伺服、仪表</td><td>高端伺服、机器人、汽车</td></tr>
            </tbody>
          </table></div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-3">
            CAN 帧分<strong>标准帧（11位ID）</strong>和<strong>扩展帧（29位ID）</strong>，一帧最多 8 字节数据（CAN-FD 64字节）。CANopen 在 CAN 之上定义了<strong>对象字典（OD）</strong>和 DS402 驱动协议：用对象 0x6040（控制字）启动、0x6060（模式选择）设模式、0x607A（目标位置）下指令——详见 <a href="#" onclick="navigateTo('servo-control');return false;" style="color:var(--primary)">伺服控制与通信</a>。
          </p>
          <div class="code-block"><span class="code-comment">/* CAN 标准帧结构（MCU CAN控制器通常硬件处理ID/仲裁/CRC）*/</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">uint32_t</span> id;          <span class="code-comment">// 11位标准ID 或 29位扩展ID</span>
  <span class="code-keyword">uint8_t</span>  dlc;         <span class="code-comment">// 数据长度 0~8</span>
  <span class="code-keyword">uint8_t</span>  data[<span class="code-number">8</span>];      <span class="code-comment">// 数据场</span>
  <span class="code-keyword">uint8_t</span>  ide;         <span class="code-comment">// 0=标准帧 1=扩展帧</span>
  <span class="code-keyword">uint8_t</span>  rtr;         <span class="code-comment">// 0=数据帧 1=远程帧(请求数据)</span>
} CanFrame_t;

<span class="code-comment">/* 发送一帧（extern: 硬件相关，由具体CAN驱动实现）*/</span>
<span class="code-keyword">extern int</span>  <span class="code-func">CAN_Send</span>(CanFrame_t *f);
<span class="code-keyword">extern int</span>  <span class="code-func">CAN_Recv</span>(CanFrame_t *f, <span class="code-keyword">uint32_t</span> timeout_ms);

<span class="code-comment">/* CANopen 伺服：启动到运转的最小序列（DS402状态机）*/</span>
<span class="code-comment">// 1. 写 0x6040=0x0006  → Ready to Switch On</span>
<span class="code-comment">// 2. 写 0x6040=0x0007  → Switched On</span>
<span class="code-comment">// 3. 写 0x6040=0x000F  → Operation Enabled（电机使能）</span>
<span class="code-comment">// 4. 写 0x6060=8       → 模式=CSP(周期同步位置)</span>
<span class="code-comment">// 5. 周期写 0x607A=目标位置 → 电机运转</span></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、调试实战</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">📋 Modbus 调试</div>
              <div class="text-sm text-gray-500">PC 端用 <strong>Modbus Poll</strong>（主站模拟）/ <strong>Modbus Slave</strong>（从站模拟）软件，配合 USB转RS485，无需写代码即可读写寄存器验证设备。抓包用串口助手看原始十六进制帧。</div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">🚌 CAN 调试</div>
              <div class="text-sm text-gray-500">用 <strong>PCAN-View</strong> / <strong>CANalsyt</strong> + USB-CAN 适配器。重点看<strong>波特率匹配</strong>（常用 250kbps/500kbps/1Mbps，主从必须一致）和<strong>终端电阻</strong>（CAN-H/CAN-L 间接60Ω=两个120Ω并联）。</div>
            </div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>排故三步法</strong>：① 物理层（接线/终端电阻/波特率）→ ② 链路层（帧格式/CRC，用本站校验工具）→ ③ 应用层（功能码/寄存器映射）。从下往上逐层排除，90%的通信故障在前两层。</div></div>
        `,
      },
      {
        id: 'advanced-protection',
        title: '驱动器保护机制',
        desc: '过流/过压/欠压/过温/堵转保护，软件阈值与硬件比较器截断，STM32 BRK刹车输入',
        icon: '🛡️',
        tags: ['保护', '可靠性', '安全'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么保护电路比控制算法还重要</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            控制算法调不好，电机顶多转得不顺；保护没做好，<strong>一个过流就能烧毁 MOS 管、烧电池、甚至起火</strong>。
            工业驱动器的可靠性 80% 体现在保护设计上。保护分两层：<strong>软件保护</strong>（ADC 采样→阈值判断→软件停机，响应几十微秒到毫秒）和<strong>硬件保护</strong>（比较器/专用芯片直接关断 PWM，响应纳秒到微秒级）。关键回路必须有硬件保护兜底。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、过流保护（最关键）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            过流来源：负载突变堵转、MOS 短路、换向错误、PWM 死区设置过小导致上下桥直通（shoot-through）。三种方案各有响应速度：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>方案</th><th>响应时间</th><th>原理</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">软件 ADC 阈值</td><td>10μs~1ms</td><td>ADC采样电流&gt;阈值→软件清PWM使能</td><td>普通过载、堵转</td></tr>
              <tr><td class="font-medium">硬件比较器截断</td><td>100ns~1μs</td><td>电流→比较器→直接接PWM EN引脚</td><td>短路、直通（必须）</td></tr>
              <tr><td class="font-medium">专用驱动器内置</td><td>μs级</td><td>DRV830x/EG2104内置过流比较+SD脚</td><td>省外围、量产首选</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>直通(shoot-through)必须在硬件层截断</strong>：上下桥同导通时电源经两个MOS直接短路，电流可在微秒内达到几百安培。软件 ADC 采样根本来不及。STM32 高级定时器的 <strong>BDTR 寄存器</strong>可配 BRK 输入——外部比较器拉低 BRK，硬件立即在下一个时钟周期强制所有 PWM 输出无效，这是硬件兜底的标准做法（参考 <a href="#" onclick="navigateTo('bldc-commutation');return false;" style="color:var(--primary)">BLDC六步换向</a>）。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、过压与欠压保护</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            <strong>过压</strong>：电机减速时变成发电机，反电动势可能超过电源电压（泵升），击穿MOS或让电解电容爆裂。<strong>欠压</strong>：电池电压过低时驱动器工作异常，MOS导通不彻底发热剧增。两者都通过电阻分压采样母线电压：
          </p>
          <div class="code-block"><span class="code-comment">/* 母线电压监测（纯算法，ADC读取由硬件完成）*/</span>
<span class="code-keyword">#define</span> VBUS_MAX_MV   <span class="code-number">26000</span>   <span class="code-comment">// 过压阈值 26V</span>
<span class="code-keyword">#define</span> VBUS_MIN_MV   <span class="code-number">10000</span>   <span class="code-comment">// 欠压阈值 10V</span>
<span class="code-keyword">#define</span> REGEN_BRAKE_MV <span class="code-number">24500</span>  <span class="code-comment">// 泵升保护：超此启动制动电阻泄放</span>

<span class="code-comment">/* 分压电阻将母线电压缩放到ADC量程，系数由硬件分压比决定 */</span>
<span class="code-keyword">extern uint32_t</span> <span class="code-func">ADC_ReadBus</span>(<span class="code-keyword">void</span>);   <span class="code-comment">// 返回毫伏</span>

<span class="code-keyword">typedef enum</span> { BUS_OK, BUS_OVER, BUS_UNDER } BusState_t;

BusState_t <span class="code-func">Bus_Check</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">uint32_t</span> v = <span class="code-func">ADC_ReadBus</span>();
  <span class="code-keyword">if</span> (v &gt; VBUS_MAX_MV)  <span class="code-keyword">return</span> BUS_OVER;     <span class="code-comment">// 立即停机</span>
  <span class="code-keyword">if</span> (v &lt; VBUS_MIN_MV)  <span class="code-keyword">return</span> BUS_UNDER;   <span class="code-comment">// 报警停机</span>
  <span class="code-keyword">if</span> (v &gt; REGEN_BRAKE_MV) <span class="code-func">Regen_DumpEnable</span>(<span class="code-number">1</span>); <span class="code-comment">// 开制动电阻</span>
  <span class="code-keyword">return</span> BUS_OK;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、过温保护</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            MOS 管和电机绕组的温度需监测。<strong>NTC 热敏电阻</strong>阻值随温度上升而下降，分压后 ADC 采样，查表换算成温度。MOS 通常 85°C 报警降额、105°C 停机；电机绕组 F 级绝缘上限 155°C。
          </p>
          <div class="code-block"><span class="code-comment">/* NTC 查表法：ADC原始值→温度(0.1℃)。表由标定生成，省略B值计算 */</span>
<span class="code-keyword">static const int16_t</span> ntc_table[<span class="code-number">1024</span>] = { <span class="code-comment">/* ADC值 0~1023 → 温度×10 */</span> };

<span class="code-keyword">int16_t</span> <span class="code-func">Temp_Read</span>(<span class="code-keyword">void</span>) {
  <span class="code-keyword">uint16_t</span> adc = <span class="code-func">ADC_ReadTemp</span>();
  <span class="code-keyword">return</span> ntc_table[adc & <span class="code-number">0x3FF</span>];   <span class="code-comment">// 单位 0.1℃</span>
}

<span class="code-comment">/* 温度保护策略：分级降额而非直接停机，避免突然断电造成危险 */</span>
<span class="code-keyword">void</span> <span class="code-func">Temp_Protect</span>(<span class="code-keyword">int16_t</span> t_x10) {
  <span class="code-keyword">if</span> (t_x10 &gt; <span class="code-number">1050</span>)      <span class="code-func">Motor_Disable</span>();      <span class="code-comment">// 105℃停机</span>
  <span class="code-keyword">else if</span> (t_x10 &gt; <span class="code-number">850</span>) <span class="code-func">Current_Limit</span>(<span class="code-number">50</span>);  <span class="code-comment">// 85℃限流50%</span>
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、堵转保护</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            电机被机械卡死但持续通电，电流剧增、温度飙升，是烧电机的常见原因。检测逻辑：<strong>有电流指令但转速≈0持续超过阈值时间</strong>即判定堵转。
          </p>
          <div class="code-block"><span class="code-comment">/* 堵转检测（周期调用，如1ms）*/</span>
<span class="code-keyword">#define</span> STALL_I_THRESH   <span class="code-number">2.0f</span>   <span class="code-comment">// 电流&gt;2A</span>
<span class="code-keyword">#define</span> STALL_W_THRESH   <span class="code-number">5.0f</span>   <span class="code-comment">// 转速&lt;5RPM视为停转</span>
<span class="code-keyword">#define</span> STALL_TICKS      <span class="code-number">500</span>   <span class="code-comment">// 持续500ms</span>

<span class="code-keyword">uint32_t</span> stall_cnt = <span class="code-number">0</span>;
<span class="code-keyword">bool</span> <span class="code-func">Stall_Detect</span>(<span class="code-keyword">float</span> i_q, <span class="code-keyword">float</span> w_rpm) {
  <span class="code-keyword">if</span> (i_q &gt; STALL_I_THRESH && <span class="code-func">fabsf</span>(w_rpm) &lt; STALL_W_THRESH) {
    <span class="code-keyword">if</span> (++stall_cnt &gt; STALL_TICKS) <span class="code-keyword">return true</span>;   <span class="code-comment">// 堵转确认</span>
  } <span class="code-keyword">else</span> {
    stall_cnt = <span class="code-number">0</span>;   <span class="code-comment">// 恢复则清零</span>
  }
  <span class="code-keyword">return false</span>;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、保护优先级与综合状态机</h3>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>保护项</th><th>响应方式</th><th>优先级</th><th>失效后果</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">硬件过流(BRK)</td><td>纳秒级硬件截断</td><td>最高</td><td>无→MOS炸裂</td></tr>
              <tr><td class="font-medium">过压/泵升</td><td>停机+制动电阻</td><td>高</td><td>无→电容爆/管击穿</td></tr>
              <tr><td class="font-medium">软件过流</td><td>软件停PWM</td><td>高</td><td>无→过热烧管</td></tr>
              <tr><td class="font-medium">过温</td><td>分级降额→停机</td><td>中</td><td>无→绝缘老化</td></tr>
              <tr><td class="font-medium">堵转</td><td>延时后停机</td><td>中</td><td>无→烧绕组</td></tr>
              <tr><td class="font-medium">欠压</td><td>报警停机</td><td>低</td><td>无→工作异常发热</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>设计原则</strong>：① 致命故障（过流/过压）必须有<strong>独立硬件通路</strong>兜底，不能只靠软件；② 保护动作要有<strong>锁定+手动复位</strong>，避免反复触发；③ 记录故障码便于排查（哪个保护触发的、触发时的电流/电压/温度值）。这套思路同样适用于 <a href="#" onclick="navigateTo('engineering-validation');return false;" style="color:var(--primary)">工程验证</a> 的可靠性测试。</div></div>
        `,
      },
    ],
  },

  // ========== 机器人应用篇 ==========
  robotics: {
    title: '机器人应用',
    subtitle: '从单电机控制到机械臂运动学、轨迹规划与上位机协同',
    sections: [
      {
        id: 'kinematics',
        title: '运动学入门',
        desc: '正运动学/逆运动学：从关节角度到末端位置（2-DOF平面臂实例）',
        icon: '🦾',
        tags: ['机器人', '数学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么机械臂需要"运动学"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            你已经能让单个电机转到指定角度了。但机械臂的任务是<strong>"把末端（夹爪）移到xyz坐标"</strong>——这需要把"末端位置"翻译成"各关节角度"。这就是<strong>运动学</strong>（Kinematics）。
          </p>
          <div class="info-box tip mb-6"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>两个方向</strong>：<strong>正运动学(FK)</strong>：已知关节角 → 算末端位置（简单，矩阵乘法）。<strong>逆运动学(IK)</strong>：已知末端位置 → 算关节角（难，可能多解、无解）。机械臂控制的核心是 IK。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">实例：2-DOF平面机械臂</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            两段连杆（长度 L1、L2），两个旋转关节（角度 θ1、θ2）。末端坐标 (x, y) 与关节角的关系用三角函数推导：
          </p>

          <div class="svg-figure">
            <div data-chart="arm" class="chart-container" style="min-height:400px;padding:8px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：2-DOF平面机械臂——拖动红色末端节点（或点击图内任意位置），实时显示θ₁/θ₂/末端坐标，体会正逆运动学</div>
          </div>

          <div class="formula-block">
            <div class="text-left">
              <strong>正运动学 FK</strong>（关节角→末端）：<br>
              $x = L_1 \\cos\\theta_1 + L_2 \\cos(\\theta_1+\\theta_2)$
              $y = L_1 \\sin\\theta_1 + L_2 \\sin(\\theta_1+\\theta_2)$
            </div>
          </div>

          <div class="formula-block">
            <div class="text-left">
              <strong>逆运动学 IK</strong>（末端→关节角）：用余弦定理<br>
              $\\theta_2 = \\pm\\arccos\\frac{x^2+y^2-L_1^2-L_2^2}{2 L_1 L_2}$
              $\\theta_1 = \\arctan2(y,x) - \\arctan2(L_2\\sin\\theta_2,\\, L_1+L_2\\cos\\theta_2)$
            </div>
            <div class="text-sm text-gray-500 mt-2">±号对应"肘上/肘下"两种姿态</div>
          </div>

          <div class="code-block"><span class="code-comment">/* 2-DOF平面臂 正运动学 */</span>
<span class="code-keyword">typedef struct</span> { <span class="code-keyword">float</span> x, y; } Vec2;

<span class="code-keyword">Vec2</span> <span class="code-func">ForwardKinematics</span>(<span class="code-keyword">float</span> L1, <span class="code-keyword">float</span> L2,
                          <span class="code-keyword">float</span> th1, <span class="code-keyword">float</span> th2) {
  <span class="code-keyword">float</span> c1 = <span class="code-func">cosf</span>(th1), s1 = <span class="code-func">sinf</span>(th1);
  <span class="code-keyword">float</span> c12 = <span class="code-func">cosf</span>(th1 + th2), s12 = <span class="code-func">sinf</span>(th1 + th2);
  <span class="code-keyword">Vec2</span> p;
  p.x = L1 * c1 + L2 * c12;
  p.y = L1 * s1 + L2 * s12;
  <span class="code-keyword">return</span> p;
}

<span class="code-comment">/* 2-DOF平面臂 逆运动学
 * elbow_up: 1=肘上姿态, 0=肘下姿态
 * 返回 0=成功, -1=目标不可达(超出工作半径) */</span>
<span class="code-keyword">int</span> <span class="code-func">InverseKinematics</span>(<span class="code-keyword">float</span> L1, <span class="code-keyword">float</span> L2,
                         <span class="code-keyword">float</span> x, <span class="code-keyword">float</span> y, <span class="code-keyword">int</span> elbow_up,
                         <span class="code-keyword">float</span> *th1, <span class="code-keyword">float</span> *th2) {
  <span class="code-keyword">float</span> r2 = x*x + y*y;
  <span class="code-keyword">float</span> r  = <span class="code-func">sqrtf</span>(r2);

  <span class="code-comment">// 可达性检查：目标不能比 L1+L2 远，也不能比 |L1-L2| 近</span>
  <span class="code-keyword">if</span> (r &gt; L1 + L2 || r &lt; <span class="code-func">fabsf</span>(L1 - L2)) <span class="code-keyword">return</span> -<span class="code-number">1</span>;

  <span class="code-comment">// θ2 = ±arccos((x²+y²-L1²-L2²)/(2·L1·L2))</span>
  <span class="code-keyword">float</span> c2 = (r2 - L1*L1 - L2*L2) / (<span class="code-number">2.0f</span> * L1 * L2);
  <span class="code-keyword">if</span> (c2 &gt; <span class="code-number">1.0f</span>) c2 = <span class="code-number">1.0f</span>;   <span class="code-comment">// 防浮点误差越界</span>
  <span class="code-keyword">if</span> (c2 &lt; -<span class="code-number">1.0f</span>) c2 = -<span class="code-number">1.0f</span>;
  *th2 = <span class="code-func">acosf</span>(c2);
  <span class="code-keyword">if</span> (!elbow_up) *th2 = -*th2;

  <span class="code-comment">// θ1 = atan2(y,x) - atan2(L2·sinθ2, L1+L2·cosθ2)</span>
  *th1 = <span class="code-func">atan2f</span>(y, x) - <span class="code-func">atan2f</span>(L2 * <span class="code-func">sinf</span>(*th2), L1 + L2 * <span class="code-func">cosf</span>(*th2));
  <span class="code-keyword">return</span> <span class="code-number">0</span>;
}</div>

          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>多解与奇异性</strong>：IK 可能有多个解（2-DOF 有"肘上/肘下"两种），实际机械臂还要考虑关节限位、避障选最优解。当末端伸到工作半径边缘时（r 接近 L1+L2），雅可比矩阵奇异，小位移需要关节大角度变化——这就是<strong>奇异点</strong>，运动会卡顿。</div></div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>从2-DOF到6-DOF</strong>：实际机械臂通常是 6 自由度（6个关节）。2-DOF 的解析解好推导，6-DOF 解析解非常复杂（依赖具体构型，如"球形手腕"可分解）。工程上常用<strong>数值解</strong>（雅可比迭代）或调用库（KDL、TRAC-IK、IKFast）。MCU 端通常只做单关节位置控制，IK 在上位机算好再下发。</div></div>
        `,
      },
      {
        id: 'trajectory',
        title: '轨迹规划与多轴协调',
        desc: '让多个电机平滑同步运动：线性插补、梯形速度规划、笛卡尔空间轨迹',
        icon: '📈',
        tags: ['机器人', '运动规划'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么需要"轨迹规划"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            知道起点和终点角度后，如果直接命令电机"立刻到目标"——电机会猛冲（冲击机械）或超调（PID跟不上）。<strong>轨迹规划</strong>就是生成一条从起点到终点的平滑曲线，让电机<strong>按时间一点点跟踪</strong>。
          </p>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、关节空间：梯形速度轨迹</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            最常用。把运动分成<strong>加速-匀速-减速</strong>三段（和步进电机加减速同理）。给定起点、终点、最大速度、加速度，生成每个时刻的目标位置。
          </p>

          <div class="svg-figure">
            <div data-chart="trajectory" class="chart-container" style="height:320px"></div>
            <div class="text-center text-xs mt-1" style="color:var(--text-secondary)">图：梯形曲线在拐角处加速度突变（机械冲击）；S曲线平滑过渡（无冲击）</div>
          </div>

          <div class="code-block"><span class="code-comment">/* 梯形速度轨迹生成器（关节空间）
 * 在控制周期里周期性调用 Traj_Update，输出当前目标位置 */</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">float</span> q0, q1;         <span class="code-comment">// 起点、终点位置</span>
  <span class="code-keyword">float</span> v_max, a_max;   <span class="code-comment">// 最大速度、最大加速度</span>
  <span class="code-keyword">float</span> t_a, t_v, t_total; <span class="code-comment">// 加速时间、匀速时间、总时间</span>
  <span class="code-keyword">float</span> t;              <span class="code-comment">// 当前时间</span>
  <span class="code-keyword">float</span> dt;            <span class="code-comment">// 控制周期(秒)</span>
} Traj_t;

<span class="code-keyword">void</span> <span class="code-func">Traj_Init</span>(Traj_t *t, <span class="code-keyword">float</span> q0, <span class="code-keyword">float</span> q1,
                  <span class="code-keyword">float</span> v_max, <span class="code-keyword">float</span> a_max, <span class="code-keyword">float</span> dt) {
  t->q0 = q0; t->q1 = q1;
  t->v_max = v_max; t->a_max = a_max;
  t->dt = dt; t->t = <span class="code-number">0</span>;

  <span class="code-keyword">float</span> dist = <span class="code-func">fabsf</span>(q1 - q0);
  <span class="code-comment">// 加速距离 = v²/(2a)。若总距离不够走完整梯形，用三角轨迹（无匀速段）*/</span>
  <span class="code-keyword">float</span> d_accel = v_max * v_max / (<span class="code-number">2.0f</span> * a_max);
  <span class="code-keyword">if</span> (dist &gt;= <span class="code-number">2</span> * d_accel) {
    t->t_a = v_max / a_max;                 <span class="code-comment">// 有匀速段</span>
    t->t_v = (dist - <span class="code-number">2</span> * d_accel) / v_max;
    t->t_total = <span class="code-number">2</span> * t->t_a + t->t_v;
  } <span class="code-keyword">else</span> {
    t->t_a = <span class="code-func">sqrtf</span>(dist / a_max);      <span class="code-comment">// 三角轨迹</span>
    t->t_v = <span class="code-number">0</span>;
    t->t_total = <span class="code-number">2</span> * t->t_a;
  }
}

<span class="code-comment">/* 返回当前目标位置，运动结束返回 1 */</span>
<span class="code-keyword">int</span> <span class="code-func">Traj_Update</span>(Traj_t *t, <span class="code-keyword">float</span> *q_out) {
  <span class="code-keyword">float</span> dir = (t->q1 &gt; t->q0) ? <span class="code-number">1.0f</span> : -<span class="code-number">1.0f</span>;
  <span class="code-keyword">float</span> ta = t->t_a, tv = t->t_v;

  <span class="code-keyword">if</span> (t->t &gt;= t->t_total) { *q_out = t->q1; <span class="code-keyword">return</span> <span class="code-number">1</span>; }

  <span class="code-keyword">float</span> pos;
  <span class="code-keyword">if</span> (t->t &lt; ta) {
    pos = t->q0 + dir * <span class="code-number">0.5f</span> * t->a_max * t->t * t->t;   <span class="code-comment">// 加速段</span>
  } <span class="code-keyword">else if</span> (t->t &lt; ta + tv) {
    <span class="code-keyword">float</span> v = t->a_max * ta;
    pos = t->q0 + dir * (<span class="code-number">0.5f</span> * t->a_max * ta * ta + v * (t->t - ta));  <span class="code-comment">// 匀速段</span>
  } <span class="code-keyword">else</span> {
    <span class="code-comment">// 减速段：距终点剩余时间 ×² ×½a，从q1回退</span>
    <span class="code-keyword">float</span> t_remain = t->t_total - t->t;   <span class="code-comment">// 距运动结束的剩余时间</span>
    pos = t->q1 - dir * (<span class="code-number">0.5f</span> * t->a_max * t_remain * t_remain);
  }
  *q_out = pos;
  t->t += t->dt;
  <span class="code-keyword">return</span> <span class="code-number">0</span>;
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、多轴同步：同时启动同时结束</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            机械臂多个关节要<strong>同步运动</strong>——起点和终点不同，但要同时到达（否则末端走出来的不是直线）。方法：找出运动距离最长的轴，算它的总时间，其它轴用相同总时间（更小的速度）运动。
          </p>
          <div class="code-block"><span class="code-comment">/* N轴同步：所有轴用同一个总时间，自动按各自距离缩放速度 */</span>
<span class="code-keyword">typedef struct</span> {
  Traj_t traj[<span class="code-number">6</span>];   <span class="code-comment">// 假设最多6轴</span>
  <span class="code-keyword">int</span> n_axis;
} MultiTraj_t;

<span class="code-keyword">void</span> <span class="code-func">MultiTraj_Init</span>(MultiTraj_t *m, <span class="code-keyword">float</span> *q0, <span class="code-keyword">float</span> *q1,
                         <span class="code-keyword">int</span> n, <span class="code-keyword">float</span> v_max, <span class="code-keyword">float</span> a_max, <span class="code-keyword">float</span> dt) {
  m->n_axis = n;
  <span class="code-comment">// 找最大位移，据此算"组时间"</span>
  <span class="code-keyword">float</span> max_dist = <span class="code-number">0</span>;
  <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; n; i++) {
    <span class="code-keyword">float</span> d = <span class="code-func">fabsf</span>(q1[i] - q0[i]);
    <span class="code-keyword">if</span> (d &gt; max_dist) max_dist = d;
  }
  <span class="code-comment">// 用最大位移算总时间，所有轴共用</span>
  <span class="code-keyword">float</span> group_t_total = <span class="code-func">sqrtf</span>(max_dist / a_max) * <span class="code-number">2.0f</span>;
  <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; n; i++) {
    <span class="code-comment">// 每轴按自己的距离反推 v_max_i，保证总时间一致</span>
    <span class="code-keyword">float</span> v_i = <span class="code-func">fabsf</span>(q1[i] - q0[i]) / (group_t_total * <span class="code-number">0.5f</span>);
    <span class="code-func">Traj_Init</span>(&amp;m->traj[i], q0[i], q1[i], v_i, a_max, dt);
  }
}

<span class="code-comment">/* 同步更新所有轴，返回当前各轴目标位置 */</span>
<span class="code-keyword">void</span> <span class="code-func">MultiTraj_Update</span>(MultiTraj_t *m, <span class="code-keyword">float</span> *q_out) {
  <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; m->n_axis; i++)
    <span class="code-func">Traj_Update</span>(&amp;m->traj[i], &amp;q_out[i]);
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、笛卡尔空间：直线/圆弧插补</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            上面是<strong>关节空间</strong>规划（各关节独立）。但很多时候要末端<strong>走直线或圆弧</strong>（焊接、画图、装配）。方法：在<strong>笛卡尔空间</strong>对末端位置做插值，每一步用逆运动学换算回关节角。
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>1. 路径插值</strong>：在起点终点间生成一系列中间点 (x_i, y_i)，按直线或圆弧。</div></div>
            <div class="step-item"><div><strong>2. 速度规划</strong>：对这些点沿路径做梯形速度规划（控制弧长进度）。</div></div>
            <div class="step-item"><div><strong>3. 逆运动学</strong>：每个 (x_i, y_i) 算出关节角 (θ1_i, θ2_i)。</div></div>
            <div class="step-item"><div><strong>4. 下发关节角</strong>：把 (θ1_i, θ2_i) 喂给各轴位置环。</div></div>
          </div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>插补周期 vs 控制周期</strong>：插补周期（如 10ms，生成路径点）通常比位置控制周期（如 1ms）慢。控制环里对插补点做<strong>线性内插</strong>得到当前目标，避免目标跳变。<strong>开源参考</strong>：LinuxCNC、MoveIt、ROS2 control 的轨迹生成器都是这套思路。</div></div>
        `,
      },
      {
        id: 's-curve',
        title: 'S曲线加减速专题',
        desc: 'S曲线原理、参数设置、科学验证方法、适用场景——从"乱改参数"到"精确控制"',
        icon: '〰️',
        tags: ['运动控制', '加减速', '必学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">什么是S曲线，和梯形曲线有什么区别</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            运动控制里，电机从静止到目标位置不能瞬间跳变（会丢步/过冲），需要一条<strong>速度-时间曲线</strong>来规划加速和减速过程。两种主流方案：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>对比</th><th>梯形曲线</th><th>S曲线</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">速度形状</td><td>梯形（加速→匀速→减速）</td><td>S形（加加速→匀加速→减加速→匀速→…）</td></tr>
              <tr><td class="font-medium">加速度</td><td>突变（瞬间从0跳到a_max）</td><td>连续变化（jerk有限，无突变）</td></tr>
              <tr><td class="font-medium">加加速度 jerk</td><td>无穷大（理论上的冲击）</td><td>有限值（可控的"柔和度"）</td></tr>
              <tr><td class="font-medium">机械冲击</td><td>有"咯噔"感</td><td>平滑无冲击</td></tr>
              <tr><td class="font-medium">实现复杂度</td><td>简单（分段线性）</td><td>复杂（7段式分段）</td></tr>
              <tr><td class="font-medium">典型应用</td><td>普通3D打印机、简单定位</td><td>机械臂、CNC、高速SCARA</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>S曲线的核心是"jerk可控"</strong>：梯形曲线的加速度瞬间从0跳到最大值，这个"加速度的加速度"（jerk=加加速度）理论上是无穷大，对机械产生冲击。S曲线通过限制 jerk，让加速度本身也平滑过渡——就像开车时缓缓踩油门而不是一脚到底。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">S曲线的三个核心参数怎么设置</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            S曲线由<strong>三个参数</strong>完全决定，理解它们才能正确配置：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>① 最大速度 v_max</strong>：电机运动过程中的最高速度。设太高会丢步（步进）或过流（无刷），设太低运动太慢。<strong>设置方法</strong>：从低速开始，逐步增大直到出现异常（丢步/啸叫/过流），取异常前速度的 70-80% 作为 v_max。</div></div>
            <div class="step-item"><div><strong>② 最大加速度 a_max</strong>：加速/减速阶段的最大加速度。决定"冲劲"大小。设太大启动顿挫、设太小响应慢。<strong>设置方法</strong>：从 a_max = v_max / 0.1s 起步（即0.1秒加速到最高速），逐步调整直到启停平滑且不丢步。</div></div>
            <div class="step-item"><div><strong>③ 加加速度 jerk（j）</strong>：加速度的变化率。这是<strong>S曲线区别于梯形的唯一参数</strong>。jerk 越小→曲线越"S"（柔和）；jerk 越大→越接近梯形（生硬）。<strong>典型值</strong>：jerk = a_max × (5~20)，即用 0.05~0.2 秒完成加速度从0到a_max的过渡。</div></div>
          </div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>jerk=无穷大就退化成梯形</strong>：如果你的 jerk 设得非常大，加速度瞬间到位，S曲线就变回了梯形。所以<strong>调S曲线本质就是调 jerk</strong>：从大值开始减小，直到肉眼/波形看不到加速度突变。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">怎么验证S曲线生效了（不是嘴上说"看起来平滑"）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            回顾 <a href="#" onclick="navigateTo('engineering-validation');return false;" style="color:var(--primary)">工程验证方法论</a>的核心原则：<strong>看得见的才能调</strong>。验证S曲线需要三个层次的数据：
          </p>

          <h4 class="font-medium mt-4 mb-2">验证1：速度曲线是否真的是"S"形</h4>
          <div class="code-block"><span class="code-comment">/* 每个控制周期输出当前目标速度，上位机画图 */</span>
<span class="code-comment">// 在轨迹更新函数里加一行串口输出</span>
<span class="code-keyword">void</span> <span class="code-func">Traj_Update</span>(...) {
  <span class="code-comment">// ... 原有轨迹计算 ...</span>
  <span class="code-keyword">float</span> v_now = <span class="code-func">GetCurrentVelocity</span>();   <span class="code-comment">// 当前目标速度</span>
  <span class="code-func">printf</span>(<span class="code-string">"%.3f,%.3f\\n"</span>, g_time, v_now);   <span class="code-comment">// CSV输出到上位机</span>
}
<span class="code-comment">// 上位机用 Serial Studio 接串口，自动画速度-时间曲线
// 理想S曲线：加速段是S形（先弯后直再弯），不是直线
// 如果画出来是直线加速 → jerk设太大 = 退化成梯形了 */</span></div>

          <h4 class="font-medium mt-4 mb-2">验证2：加速度是否连续（无突变）</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            输出加速度（速度的差分），看它是否从0平滑上升到a_max再平滑下降。如果是梯形，加速度图是方波（突变）；S曲线应该是<strong>梯形或钟形</strong>（连续）。
          </p>
          <div class="code-block"><span class="code-comment">/* 计算并输出加速度（速度的数值微分） */</span>
<span class="code-keyword">float</span> v_prev = <span class="code-number">0</span>;
<span class="code-keyword">void</span> <span class="code-func">Traj_Update</span>(...) {
  <span class="code-keyword">float</span> v_now = <span class="code-func">GetCurrentVelocity</span>();
  <span class="code-keyword">float</span> accel = (v_now - v_prev) / dt;     <span class="code-comment">// 加速度 = Δv/Δt</span>
  <span class="code-func">printf</span>(<span class="code-string">"%.3f,%.3f,%.3f\\n"</span>, g_time, v_now, accel);
  v_prev = v_now;
}
<span class="code-comment">// 上位机看加速度曲线：
// 梯形 → 加速度是方波(瞬间跳变)
// S曲线 → 加速度是梯形或钟形(连续变化) ← 这才是对的 */</span></div>

          <h4 class="font-medium mt-4 mb-2">验证3：实际位置是否紧贴目标位置</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            这是最根本的验证——不管曲线长什么样，最终要看<strong>实际走了多少</strong>。用编码器读实际位置，和目标位置画在同一张图上：
          </p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>看什么</th><th>正常</th><th>异常（参数不对）</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">目标vs实际位置</td><td>两条线几乎重合</td><td>实际落后目标很多 = 加速度太大/丢步</td></tr>
              <tr><td class="font-medium">停止时位置</td><td>精准停在目标，误差≈0</td><td>超过目标 = 减速段不够；不到目标 = 丢步</td></tr>
              <tr><td class="font-medium">重复精度</td><td>走10次同一目标，偏差&lt;1个最小步</td><td>每次停的位置不同 = 有随机丢步</td></tr>
              <tr><td class="font-medium">加速度曲线</td><td>连续无突变（S形）</td><td>有方波跳变 = jerk太大，退化成梯形</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">S曲线的科学测试流程（4步法）</h3>
          <div class="step-list">
            <div class="step-item"><div><strong>第1步：测最大速度 v_max</strong>。发固定速度指令，逐步增大直到丢步/过流。v_max = 异常前速度 × 0.7。</div></div>
            <div class="step-item"><div><strong>第2步：测最大加速度 a_max</strong>。固定 v_max，逐步增大 a_max。观察启动/停止时是否丢步或过冲。a_max = 异常前 × 0.6。</div></div>
            <div class="step-item"><div><strong>第3步：调 jerk</strong>。从 jerk = a_max × 100（接近梯形）开始减小。同时<strong>串口输出加速度波形</strong>，直到加速度从方波变成连续曲线。</div></div>
            <div class="step-item"><div><strong>第4步：综合验证</strong>。用编码器读实际位置 vs 目标位置，确认无丢步、无过冲、加速度连续。重复走10次测重复精度。</div></div>
          </div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>改一个参数就够了</strong>：v_max 和 a_max 确定后，真正需要反复调的只有 <strong>jerk</strong>。从大到小减，每减一次跑一次测试，看加速度波形。 jerk 太小运动会很"肉"（加速极慢），太大退化成梯形。找到"加速度连续且运动不过慢"的平衡点即可。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">什么时候该用S曲线，什么时候梯形就够了</h3>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>场景</th><th>推荐</th><th>理由</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">3D打印机/雕刻机</td><td>梯形够用</td><td>速度不高，少量冲击可接受，CPU算力有限</td></tr>
              <tr><td class="font-medium">步进电机低速定位</td><td>梯形够用</td><td>低速冲击小，梯形实现简单</td></tr>
              <tr><td class="font-medium">机械臂关节运动</td><td><strong>必须S曲线</strong></td><td>关节惯性大，梯形冲击会损坏减速器/产生振动</td></tr>
              <tr><td class="font-medium">CNC高速加工</td><td><strong>必须S曲线</strong></td><td>加工表面质量要求高，冲击会留刀痕</td></tr>
              <tr><td class="font-medium">高速SCARA/Delta</td><td><strong>必须S曲线</strong></td><td>急停急起频繁，梯形会激发机械共振</td></tr>
              <tr><td class="font-medium">伺服位置环</td><td><strong>建议S曲线</strong></td><td>伺服响应快，梯形突变易激发高频振荡</td></tr>
              <tr><td class="font-medium">简单传送带/风扇</td><td>不需要加减速</td><td>无精确定位需求，直接恒速</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>判断口诀</strong>：① 有机械臂/减速器/连杆？→ S曲线（保护机械）。② 运动速度&gt;1000RPM或加减速频繁？→ S曲线（避免共振）。③ 只是慢慢转个角度、不在意冲击？→ 梯形够用。④ 不确定？先上梯形跑通，再换S曲线优化——梯形是S曲线的退化特例(jerk=∞)，切换成本低。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">S曲线的7段式结构（进阶理解）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            完整的S曲线运动分<strong>7段</strong>（加速3段+匀速1段+减速3段）。不是每次都走满7段——短行程时匀速段可能为0（三角S曲线）：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>段1-3（加速）</strong>：加加速段(jerk>0，a从0增到a_max) → 匀加速段(a=a_max) → 减加速段(jerk<0，a从a_max减到0)。速度曲线呈S形。</div></div>
            <div class="step-item"><div><strong>段4（匀速）</strong>：v=v_max 恒速运动。短行程时此段为0。</div></div>
            <div class="step-item"><div><strong>段5-7（减速）</strong>：和加速对称，速度从v_max平滑减到0。</div></div>
          </div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>短行程陷阱</strong>：如果总距离不够走完7段（v_max还没到就要减速），曲线退化为"三角S曲线"（无匀速段），甚至"双S曲线"（a_max也没到）。代码里必须处理这些边界情况，否则位置算错。<strong>开源库AccelStepper、GRBL的motion control都处理了这个</strong>，建议参考。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">S曲线代码实现要点</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            完整的7段S曲线代码较长（~200行C）。这里给核心思路，完整实现参考开源项目：
          </p>
          <div class="code-block"><span class="code-comment">/* S曲线核心：给定时间t，求当前速度v
 * 7段判断 → 每段用不同的积分公式
 * 这里只展示加速段（段1-3）的核心逻辑 */</span>

<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">float</span> v_max, a_max, jerk;   <span class="code-comment">// 三个参数</span>
  <span class="code-keyword">float</span> t_jerk;               <span class="code-comment">// jerk段时长 = a_max / jerk</span>
  <span class="code-keyword">float</span> t_accel;              <span class="code-comment">// 匀加速段时长</span>
  <span class="code-keyword">float</span> t_total;              <span class="code-comment">// 加速总时长</span>
} SCurve_t;

<span class="code-comment">/* 初始化：根据v_max/a_max/jerk预计算各段时长 */</span>
<span class="code-keyword">void</span> <span class="code-func">SCurve_Init</span>(SCurve_t *s, <span class="code-keyword">float</span> vmax, <span class="code-keyword">float</span> amax, <span class="code-keyword">float</span> j) {
  s->v_max = vmax; s->a_max = amax; s->jerk = j;
  s->t_jerk = amax / j;                        <span class="code-comment">// 加加速段时长</span>
  <span class="code-comment">// 段1+段3的加速量 = 2 × (½ × jerk × t_jerk²) = jerk × t_jerk²</span>
  <span class="code-keyword">float</span> v_mid = j * s->t_jerk * s->t_jerk;    <span class="code-comment">// 段1+3达到的速度</span>
  <span class="code-keyword">if</span> (v_mid &lt; vmax) {
    s->t_accel = (vmax - v_mid) / amax;        <span class="code-comment">// 有匀加速段</span>
  } <span class="code-keyword">else</span> {
    s->t_accel = <span class="code-number">0</span>;                            <span class="code-comment">// 三角S曲线，无匀加速段</span>
  }
  s->t_total = <span class="code-number">2</span> * s->t_jerk + s->t_accel;       <span class="code-comment">// 加速总时长</span>
}

<span class="code-comment">/* 给定加速段内的时间t，返回当前速度 */</span>
<span class="code-keyword">float</span> <span class="code-func">SCurve_VelocityAt</span>(<span class="code-keyword">const</span> SCurve_t *s, <span class="code-keyword">float</span> t) {
  <span class="code-keyword">float</span> tj = s->t_jerk;
  <span class="code-keyword">if</span> (t &lt; tj)
    <span class="code-keyword">return</span> <span class="code-number">0.5f</span> * s->jerk * t * t;              <span class="code-comment">// 段1: 加加速</span>
  <span class="code-keyword">else if</span> (t &lt; tj + s->t_accel) {
    <span class="code-keyword">float</span> v1 = <span class="code-number">0.5f</span> * s->jerk * tj * tj;
    <span class="code-keyword">return</span> v1 + s->a_max * (t - tj);          <span class="code-comment">// 段2: 匀加速</span>
  } <span class="code-keyword">else</span> {
    <span class="code-keyword">float</span> v1 = <span class="code-number">0.5f</span> * s->jerk * tj * tj;
    <span class="code-keyword">float</span> v2 = v1 + s->a_max * s->t_accel;
    <span class="code-keyword">float</span> t3 = t - tj - s->t_accel;
    <span class="code-keyword">return</span> v2 + s->a_max * t3 - <span class="code-number">0.5f</span> * s->jerk * t3 * t3;  <span class="code-comment">// 段3: 减加速</span>
  }
}
<span class="code-comment">// 减速段对称镜像即可。匀速段直接返回v_max。
// 完整实现参考：GRBL的mc_line()、LinuxCNC的tp.c、AccelStepper的computeNewSpeed() */</span></div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>别从零写</strong>：7段S曲线的边界处理（短行程、三角退化、7段切换）非常容易出bug。强烈建议直接用成熟开源库：① <strong>GRBL</strong>（CNC标准，C语言，可直接移植MCU）；② <strong>AccelStepper</strong>（Arduino，支持S曲线）；③ <strong>TrajectoryPlanner</strong>（ROS2/LinuxCNC）。自己实现的核心价值是理解原理，工程上用现成的。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">动手实验：在线对比梯形vs S曲线</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            去轨迹规划章节的速度对比图（<a href="#" onclick="navigateTo('trajectory');return false;" style="color:var(--primary)">轨迹规划与多轴协调</a>），你能看到梯形和S曲线在同一张图上的对比。注意<strong>梯形曲线在拐角处有尖角（加速度突变），S曲线是圆滑过渡</strong>——这就是冲击来源。
          </p>
        `,
      },
      {
        id: 'mcu-ros',
        title: 'MCU与Linux/ROS桥接',
        desc: '单片机做实时控制，Linux做高层规划——机器人系统的经典分工',
        icon: '🔗',
        tags: ['机器人', '架构'],
        content: `
          <h3 class="text-lg font-semibold mb-3">为什么机器人要"双脑"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            单片机擅长<strong>实时</strong>（μs级中断、PWM、ADC），但不擅长复杂计算和生态。Linux/ROS 擅长<strong>规划、感知、生态</strong>（视觉、SLAM、运动规划），但实时性差（ms级抖动）。机器人系统几乎都用<strong>双脑架构</strong>：各取所长。
          </p>

          <div class="overflow-x-auto mb-6"><table class="compare-table">
            <thead><tr><th>职责</th><th>MCU端（实时）</th><th>Linux/ROS端（高层）</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">频率</td><td>1~20 kHz（电流/速度环）</td><td>10~100 Hz（规划/感知）</td></tr>
              <tr><td class="font-medium">任务</td><td>PID、FOC、PWM、ADC、编码器</td><td>运动学、轨迹规划、视觉、SLAM</td></tr>
              <tr><td class="font-medium">通信</td><td>从机：应答命令、上报状态</td><td>主机：下发目标、读状态</td></tr>
              <tr><td class="font-medium">实时性</td><td>硬实时（中断保证）</td><td>软实时（够用即可）</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、通信协议选择</h3>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>协议</th><th>带宽</th><th>实时性</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">UART/串口</td><td>低(115200~3M bps)</td><td>中</td><td>简单原型、调试</td></tr>
              <tr><td class="font-medium">USB CDC</td><td>高(12Mbps+)</td><td>中</td><td>上位机调试、数据采集</td></tr>
              <tr><td class="font-medium">CAN/CANopen</td><td>中(1Mbps)</td><td>好(确定性)</td><td>多关节机械臂、AGV</td></tr>
              <tr><td class="font-medium">EtherCAT</td><td>极高(100Mbps)</td><td>极好(μs级)</td><td>工业机械臂、高端系统</td></tr>
              <tr><td class="font-medium">SPI/I²C</td><td>中</td><td>好</td><td>板内短距离（同一PCB上）</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mb-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>入门推荐</strong>：UART（最简单）或 USB CDC（带宽够、即插即用）。多轴/工业级再上 CAN。强烈不建议用网络socket做实时控制（TCP抖动几十ms，控制环会震荡）。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、自定义串口协议（最简方案）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            一个带帧头、长度、命令、CRC 的二进制协议。MCU 端解析命令、执行、上报。这是绝大多数 DIY 机械臂的起步方案。
          </p>
          <div class="code-block"><span class="code-comment">/* 通用串口协议帧格式
 * | 帧头(2) | 长度(1) | 命令(1) | 数据(N) | CRC16(2) |
 * 帧头固定 0xAA 0x55，长度 = 命令+数据 字节数 */</span>

<span class="code-keyword">#define</span> FRAME_HEAD0  <span class="code-number">0xAA</span>
<span class="code-keyword">#define</span> FRAME_HEAD1  <span class="code-number">0x55</span>

<span class="code-comment">// 命令定义</span>
<span class="code-keyword">enum</span> {
  CMD_SET_TARGET = <span class="code-number">0x01</span>,    <span class="code-comment">// 设目标位置(6轴int32)</span>
  CMD_GET_STATE  = <span class="code-number">0x02</span>,    <span class="code-comment">// 读当前状态</span>
  CMD_ENABLE     = <span class="code-number">0x03</span>,    <span class="code-comment">// 使能/失能</span>
  CMD_SET_PID    = <span class="code-number">0x04</span>,    <span class="code-comment">// 在线调PID</span>
};

<span class="code-comment">/* CRC16-MODBUS 校验(防数据错乱) */</span>
<span class="code-keyword">uint16_t</span> <span class="code-func">CRC16</span>(<span class="code-keyword">const uint8_t</span> *p, <span class="code-keyword">uint16_t</span> len) {
  <span class="code-keyword">uint16_t</span> crc = <span class="code-number">0xFFFF</span>;
  <span class="code-keyword">while</span> (len--) {
    crc ^= *p++;
    <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; <span class="code-number">8</span>; i++)
      crc = (crc & <span class="code-number">1</span>) ? ((crc &gt;&gt; <span class="code-number">1</span>) ^ <span class="code-number">0xA001</span>) : (crc &gt;&gt; <span class="code-number">1</span>);
  }
  <span class="code-keyword">return</span> crc;
}

<span class="code-comment">/* 发送一帧(响应或主动上报) */</span>
<span class="code-keyword">void</span> <span class="code-func">Frame_Send</span>(<span class="code-keyword">uint8_t</span> cmd, <span class="code-keyword">const uint8_t</span> *data, <span class="code-keyword">uint8_t</span> len) {
  <span class="code-keyword">uint8_t</span> buf[<span class="code-number">64</span>];
  buf[<span class="code-number">0</span>] = FRAME_HEAD0; buf[<span class="code-number">1</span>] = FRAME_HEAD1;
  buf[<span class="code-number">2</span>] = len + <span class="code-number">1</span>;             <span class="code-comment">// 长度=数据+命令字节</span>
  buf[<span class="code-number">3</span>] = cmd;
  <span class="code-keyword">for</span> (<span class="code-keyword">int</span> i = <span class="code-number">0</span>; i &lt; len; i++) buf[<span class="code-number">4</span> + i] = data[i];
  <span class="code-keyword">uint16_t</span> crc = <span class="code-func">CRC16</span>(&amp;buf[<span class="code-number">2</span>], len + <span class="code-number">2</span>);
  buf[<span class="code-number">4</span> + len] = crc & <span class="code-number">0xFF</span>;
  buf[<span class="code-number">5</span> + len] = (crc &gt;&gt; <span class="code-number">8</span>) & <span class="code-number">0xFF</span>;
  <span class="code-func">UART_Send</span>(buf, <span class="code-number">6</span> + len);
}</div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、ROS端的对接（rosserial / micro-ROS）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            ROS 不能直接读你的串口协议。两种方案：
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">rosserial（ROS1）</div>
              <div class="text-sm text-gray-500">在MCU上跑一个精简的ROS节点，直接发布/订阅话题。简单但有延迟、对MCU资源占用大。</div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="font-medium mb-1">micro-ROS（ROS2，推荐）</div>
              <div class="text-sm text-gray-500">基于DDS-XRCE，支持ROS2话题/服务/动作。实时性好，官方主推。STM32/ESP32 都有移植。</div>
            </div>
          </div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>典型数据流</strong>：ROS节点(MoveIt规划) → 发布 <code>/joint_commands</code> 话题 → micro-ROS转发到MCU → MCU解析为各轴目标 → 位置环跟踪。MCU反向把编码器位置发布到 <code>/joint_states</code>，供ROS做TF和可视化。</div></div>

          <h4 class="font-medium mt-6 mb-2">从单片机工程师到机器人开发的进阶路径</h4>
          <div class="step-list">
            <div class="step-item"><div><strong>第1步</strong>：单关节位置控制（你现在的水平）—— 用串口发角度，电机转到指定位置。</div></div>
            <div class="step-item"><div><strong>第2步</strong>：多关节协调 —— 几个电机同时控，加梯形轨迹，让运动平滑。</div></div>
            <div class="step-item"><div><strong>第3步</strong>：上位机轨迹下发 —— PC（Python/C++）算好路径点，串口逐点下发。</div></div>
            <div class="step-item"><div><strong>第4步</strong>：加正逆运动学 —— 上位机给末端xyz，MCU转关节角。</div></div>
            <div class="step-item"><div><strong>第5步</strong>：上 ROS2 + micro-ROS —— 接入生态，用 MoveIt 做规划、rviz 做可视化。</div></div>
            <div class="step-item"><div><strong>第6步</strong>：加感知 —— 摄像头/激光雷达，闭环定位，实现自主抓取。</div></div>
          </div>

          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>关键认知</strong>：单片机技能在机器人时代不仅没过时，反而更稀缺。会写FOC/PID/编码器驱动的嵌入式工程师，懂一点ROS就能做出完整的机械臂——这正是市场最缺的"软硬结合"人才。</div></div>
        `,
      },
      {
        id: 'matlab-sim',
        title: 'Matlab电机仿真入门',
        desc: '用 Matlab/Simulink 建电机模型、仿真PID、看阶跃响应——上硬件前的零成本验证',
        icon: '📐',
        tags: ['仿真', 'Matlab', '必学'],
        content: `
          <h3 class="text-lg font-semibold mb-3">Matlab 是什么：工科生的"科学计算器"</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            <strong>MATLAB</strong> = Matrix Laboratory（矩阵实验室），是工科领域（自动化、电气、机械、通信）最通用的<strong>科学计算软件</strong>。你可以把它理解成一个"超级计算器+画图工具+仿真平台"——输入公式立即出结果，画图只需一行命令，搭控制框图像拼积木。
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            对学电机控制的你来说，Matlab 的核心价值是<strong>"仿真"</strong>：在电脑上虚拟一个电机+控制器，改参数立即看响应，<strong>不用碰硬件就能验证算法对不对</strong>。这是从"凭感觉调参"到"科学设计"的关键工具。
          </p>
          <div class="info-box info mb-6"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>没钱买正版怎么办</strong>：① 学校通常有正版授权（问实验室或信息中心）；② <strong>GNU Octave</strong>（免费开源，语法95%兼容Matlab，控制仿真能用）；③ 本节末尾的<strong>Python沙盒</strong>（scipy语法接近Matlab，浏览器直接跑）。先用免费方案学概念，工作后再用正版。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">一、Matlab 界面与基本操作（5分钟上手）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            打开 Matlab，你会看到几个核心窗口：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>窗口</th><th>位置</th><th>作用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">命令窗口(Command Window)</td><td>中间</td><td>输入命令立即执行，像高级计算器。输 <code>2+3</code> 回车得 5</td></tr>
              <tr><td class="font-medium">工作区(Workspace)</td><td>右侧</td><td>显示当前所有变量及其值，鼠标可查看</td></tr>
              <tr><td class="font-medium">当前文件夹</td><td>左侧</td><td>文件管理，.m 脚本文件在这里</td></tr>
              <tr><td class="font-medium">编辑器(Editor)</td><td>新标签</td><td>写多行脚本(.m文件)的地方，类似代码编辑器</td></tr>
              <tr><td class="font-medium">图像窗口(Figure)</td><td>弹窗</td><td>plot 命令画的图在这里显示</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mb-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>最简单的入门</strong>：在命令窗口直接敲 <code>a = [1 2 3]</code>（定义数组）、<code>a * 2</code>（每个元素乘2）、<code>plot(a)</code>（画图）。不需要写完整程序，<strong>交互式逐行执行</strong>是 Matlab 的特点。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">二、基础语法速览（对照C语言）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            如果你学过 C，Matlab 语法很简单。核心区别：<strong>变量默认是矩阵/数组</strong>，运算天然支持向量。
          </p>
          <div class="code-block"><span class="code-comment">%% Matlab 基础语法（对比C）</span>

<span class="code-comment">% 1. 变量与数组（无需声明类型，分号结尾=不显示结果）</span>
x = <span class="code-number">5</span>;            <span class="code-comment">% 标量（C: int x=5;）</span>
v = [<span class="code-number">1</span> <span class="code-number">2</span> <span class="code-number">3</span> <span class="code-number">4</span>];   <span class="code-comment">% 行向量（C: int v[]={1,2,3,4};）</span>
A = [<span class="code-number">1</span> <span class="code-number">2</span>; <span class="code-number">3</span> <span class="code-number">4</span>];   <span class="code-comment">% 2x2矩阵（分号换行）</span>
t = <span class="code-number">0</span>:<span class="code-number">0.01</span>:<span class="code-number">1</span>;       <span class="code-comment">% 0到1，步长0.01 → [0 0.01 0.02 ... 1]</span>

<span class="code-comment">% 2. 运算（点乘.* 是逐元素，* 是矩阵乘）</span>
y = v * <span class="code-number">2</span>;         <span class="code-comment">% 标量乘：每个元素×2</span>
z = v .* v;         <span class="code-comment">% 逐元素平方：[1 4 9 16]</span>
w = sin(t);         <span class="code-comment">% 函数自动作用于整个数组（向量化）</span>

<span class="code-comment">% 3. 画图（一行搞定）</span>
plot(t, w);         <span class="code-comment">% 画 sin 波形</span>
xlabel(<span class="code-string">'时间(s)'</span>); ylabel(<span class="code-string">'幅值'</span>);
title(<span class="code-string">'正弦波'</span>); grid on;

<span class="code-comment">% 4. 控制流（和C几乎一样）</span>
<span class="code-keyword">for</span> i = <span class="code-number">1</span>:<span class="code-number">10</span>        <span class="code-comment">% for循环（注意Matlab从1开始！）</span>
    <span class="code-keyword">if</span> i &gt; <span class="code-number">5</span>
        disp(i);   <span class="code-comment">% 打印</span>
    <span class="code-end">end</span>
<span class="code-end">end</span>

<span class="code-comment">% 5. 自定义函数（单独存为 .m 文件，文件名=函数名）</span>
<span class="code-keyword">function</span> y = myPID(err, Kp)
    y = Kp * err;
<span class="code-end">end</span></div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>最大坑：Matlab索引从1开始</strong>，不是C/Python的从0！<code>v(1)</code>是第一个元素。<strong>注释用 %</strong>（不是 //）。<strong>语句结尾分号 ; 表示"执行但不显示"，无分号会打印结果</strong>。</div></div>

          <h4 class="font-medium mt-4 mb-2">矩阵/数组进阶操作（电机仿真天天用）</h4>
          <div class="code-block"><span class="code-comment">%% 矩阵操作基础</span>
A = [<span class="code-number">1</span> <span class="code-number">2</span> <span class="code-number">3</span>; <span class="code-number">4</span> <span class="code-number">5</span> <span class="code-number">6</span>];   <span class="code-comment">% 2x3矩阵</span>
A(2,3)        <span class="code-comment">% 取第2行第3列 = 6</span>
A(1, :)       <span class="code-comment">% 第1行全部列 = [1 2 3]（冒号=全部）</span>
A'            <span class="code-comment">% 转置（行变列）</span>
size(A)       <span class="code-comment">% 返回[行数 列数]</span>

<span class="code-comment">% 点乘 .* vs 矩阵乘 *（新手最易混淆）</span>
a = [<span class="code-number">1</span> <span class="code-number">2</span>]; b = [<span class="code-number">3</span> <span class="code-number">4</span>];
a .* b        <span class="code-comment">% 逐元素乘 = [3 8]</span>
a * b'        <span class="code-comment">% 矩阵乘 = 11（内积）</span>
<span class="code-comment">% 常用：sum(v) mean(v) max(v) min(v)</span></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>记住</strong>：前面加点(<code>.* ./ .^</code>)是逐元素运算；<strong>不点</strong>是矩阵运算。画波形基本都用点乘。</div></div>

          <h4 class="font-medium mt-4 mb-2">画图进阶（一图画多条曲线）</h4>
          <div class="code-block"><span class="code-comment">%% hold on画多条、subplot子图、样式与保存</span>
t = <span class="code-number">0</span>:<span class="code-number">0.01</span>:<span class="code-number">2</span>*pi;
figure; hold on;
plot(t, sin(t), <span class="code-string">'b-'</span>, <span class="code-string">'LineWidth'</span>,<span class="code-number">2</span>);
plot(t, cos(t), <span class="code-string">'r--'</span>, <span class="code-string">'LineWidth'</span>,<span class="code-number">2</span>);
legend(<span class="code-string">'sin'</span>,<span class="code-string">'cos'</span>); grid on; hold off;

subplot(<span class="code-number">2</span>,<span class="code-number">1</span>,<span class="code-number">1</span>); plot(t,sin(t)); title(<span class="code-string">'上半'</span>);
subplot(<span class="code-number">2</span>,<span class="code-number">1</span>,<span class="code-number">2</span>); plot(t,cos(t)); title(<span class="code-string">'下半'</span>);

<span class="code-comment">% 样式速查：b蓝r红g绿 | -实线--虚线 | .o*x</span>
saveas(gcf, <span class="code-string">'result.png'</span>);  <span class="code-comment">% 保存图片</span></div>

          <h4 class="font-medium mt-4 mb-2">脚本(.m) vs 函数(.m) vs 调试技巧</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>特性</th><th>脚本</th><th>函数</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">开头</td><td>直接命令</td><td><code>function ... end</code></td></tr>
              <tr><td class="font-medium">变量</td><td>共享工作区</td><td>独立(参数进、返回值出)</td></tr>
              <tr><td class="font-medium">用途</td><td>一次性仿真</td><td>可复用的模块</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>调试三招</strong>：① 编辑器点行号左侧设断点，F10逐行；② <code>disp(x)</code> 或去掉分号看变量值；③ 右侧工作区面板双击看矩阵内容。常见错误：索引越界、矩阵维度不匹配、中文标点。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">三、控制仿真三板斧：tf、step、feedback</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            电机控制仿真90%的工作用这三个函数完成。记住它们，就能做大部分仿真：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>函数</th><th>作用</th><th>示例</th><th>Python等效(scipy)</th></tr></thead>
            <tbody>
              <tr><td class="font-mono">tf(num,den)</td><td>建立传递函数</td><td>G = tf([1],[1 2 5])</td><td>signal.TransferFunction([1],[1,2,5])</td></tr>
              <tr><td class="font-mono">step(G)</td><td>画阶跃响应</td><td>step(G); grid on</td><td>signal.step(G)</td></tr>
              <tr><td class="font-mono">feedback(G,H)</td><td>求闭环传函 G/(1+GH)</td><td>T = feedback(G,1)</td><td>手动算(见沙盒)</td></tr>
              <tr><td class="font-mono">bode(G)</td><td>画频率响应(波特图)</td><td>bode(G)</td><td>signal.bode(G)</td></tr>
              <tr><td class="font-mono">pole(G)</td><td>求极点(判稳定性)</td><td>pole(G)</td><td>np.roots(den)</td></tr>
            </tbody>
          </table></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">四、实用案例：阶跃响应看电机响应速度</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            <strong>为什么学这个</strong>：上硬件前，你不知道"给电机5V电压，它要多久才能达到目标转速"。用 step 仿真一眼看出来——这就是<strong>零成本预判硬件行为</strong>。
          </p>
          <div class="code-block"><span class="code-comment">%% 案例1：电机阶跃响应（给5V，看转速怎么爬升）</span>
R = <span class="code-number">1.0</span>; L = <span class="code-number">0.5e-3</span>; K = <span class="code-number">0.01</span>; J = <span class="code-number">0.01</span>; b = <span class="code-number">0.1</span>;

<span class="code-comment">% 分母：(Ls+R)(Js+b) + K²</span>
num = K;
den = conv([L R], [J b]) + [<span class="code-number">0 0 K*K</span>];
G = tf(num, den);

figure;
step(G * <span class="code-number">5</span>);          <span class="code-comment">% 5V输入的阶跃响应</span>
title(<span class="code-string">'电机阶跃响应：给5V电压，转速爬升曲线'</span>);
xlabel(<span class="code-string">'时间(s)'</span>); ylabel(<span class="code-string">'转速(rad/s)'</span>); grid on;
<span class="code-comment">% 从图上能读出：上升时间约XXms、稳态转速XX rad/s</span></div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>解读阶跃响应图</strong>：X轴时间，Y轴转速。曲线<strong>陡峭=响应快</strong>，<strong>平缓=响应慢</strong>。如果有<strong>凸起超过稳态值=超调</strong>（电机冲过头了）。理想曲线是快速上升、平滑到达、无超调。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">五、实用案例：PID参数对比（一次画多条曲线）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            <strong>为什么学这个</strong>：这就是 <a href="#" onclick="navigateTo('engineering-validation');return false;" style="color:var(--primary)">工程验证方法论</a> 强调的"仿真里零成本试错"。改 Kp/Ki/Kd 看曲线，<strong>选定最佳参数再上硬件</strong>。
          </p>
          <div class="code-block"><span class="code-comment">%% 案例2：对比不同Kp的PID闭环响应</span>
s = tf(<span class="code-string">'s'</span>);                      <span class="code-comment">% 用符号s定义传函</span>
G = K / (L*J*s^<span class="code-number">2</span> + (L*b+R*J)*s + R*b + K*K);

figure; hold on;
<span class="code-keyword">for</span> kp = [<span class="code-number">1</span> <span class="code-number">3</span> <span class="code-number">5</span> <span class="code-number">10</span> <span class="code-number">20</span>]      <span class="code-comment">% 5组Kp</span>
    C = kp + <span class="code-number">10</span>/s;              <span class="code-comment">% PI控制器</span>
    T = feedback(C*G, <span class="code-number">1</span>);        <span class="code-comment">% 闭环</span>
    step(T);                   <span class="code-comment">% 画阶跃响应</span>
<span class="code-end">end</span>
legend(<span class="code-string">'Kp=1'</span>,<span class="code-string">'Kp=3'</span>,<span class="code-string">'Kp=5'</span>,<span class="code-string">'Kp=10'</span>,<span class="code-string">'Kp=20'</span>);
title(<span class="code-string">'不同Kp下的转速响应——一眼看出哪个最好'</span>);
grid on; hold off;
<span class="code-comment">% 结论：Kp=1太慢，Kp=20超调振荡，Kp=5~10平衡最佳</span></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>这就是科学调参</strong>：仿真里5行代码同时画5条曲线，<strong>哪个Kp上升快、哪个超调大、哪个振荡一目了然</strong>。选定后移植到MCU，比在硬件上一次次试快100倍。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">六、频域分析：bode 图看系统稳定性</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            阶跃响应只看到"时间域"的表现。<strong>bode 图</strong>从频率角度分析：在哪些频率下系统稳定、哪些频率会振荡或失稳。工程上通过<strong>相位裕度(PM)&gt;45°和增益裕度(GM)&gt;6dB</strong>判断稳定性。
          </p>
          <div class="code-block"><span class="code-comment">%% 电机+PI控制器的频域分析</span>
G = tf(num_G, den_G);               <span class="code-comment">% 电机开环</span>
C = Kp + Ki/s;                       <span class="code-comment">% PI控制器</span>
L = C * G;                           <span class="code-comment">% 开环传函</span>

figure;
subplot(<span class="code-number">2</span>,<span class="code-number">1</span>,<span class="code-number">1</span>); bode(L); grid on;          <span class="code-comment">% 幅频+相频</span>
subplot(<span class="code-number">2</span>,<span class="code-number">1</span>,<span class="code-number">2</span>); nyquist(L); grid on;        <span class="code-comment">% Nyquist图</span>

<span class="code-comment">% 数值方式读稳定裕度</span>
[Gm, Pm, Wcg, Wcp] = margin(L);     <span class="code-comment">% Gm=增益裕度(dB), Pm=相位裕度(°)</span>
disp([<span class="code-string">'相位裕度='</span> num2str(Pm) <span class="code-string">'°  增益裕度='</span> num2str(Gm) <span class="code-string">'dB'</span>]);</div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>怎么读bode图</strong>：相位裕度越小→越接近振荡（一般为正数，&lt;30°危险）；增益裕度越小→越接近不稳（&gt;3dB算安全）。加大Kp通常降低相位裕度（更快但更易振荡），加大Kd提升相位裕度（增强阻尼）。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">七、PID Tuner：Matlab自动调参（不用手算）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Matlab Control System Toolbox 内置了<strong>自动PID调参工具</strong>。给定传函和性能需求（快/稳），它自动算出最优Kp/Ki/Kd——比手工试快得多，且更科学：
          </p>
          <div class="code-block"><span class="code-comment">%% pidtune 自动调参（先建传函，一句搞定）</span>
G = tf(num_G, den_G);                    <span class="code-comment">% 被控对象传函</span>
C = pidtune(G, <span class="code-string">'PI'</span>);                      <span class="code-comment">% 自动调PI参数！</span>

<span class="code-comment">% 看结果</span>
C              <span class="code-comment">% 命令窗口打印 Kp=? Ki=?  </span>
step(feedback(C*G,<span class="code-number">1</span>)); grid on;  <span class="code-comment">% 画闭环阶跃响应验证</span>
<span class="code-comment">% 也可指定目标带宽(rad/s)：C = pidtune(G,'PI',100);</span></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div>也可用<strong>图形界面版 pidTuner</strong>：命令窗口输 <code>pidTuner(G,'PI')</code> 打开交互窗口，<strong>拖动滑块实时看阶跃响应</strong>——Kp偏左变慢、偏右变快振，直观到不想手调。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">八、从Simulink自动生成C代码（MBD工作流）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            这是工业界"基于模型设计(MBD)"的核心：在 Simulink 里仿好控制算法后，<strong>一行代码都不用手写</strong>——用 Embedded Coder 直接生成可部署到 MCU 的 C 代码：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>Step1</strong>：在 Simulink 搭好控制框图（PID+SVPWM+电机模型），仿真验证通过。</div></div>
            <div class="step-item"><div><strong>Step2</strong>：把"控制器"部分单独包成原子子系统，右键→ C/C++ Code → Build This Subsystem。</div></div>
            <div class="step-item"><div><strong>Step3</strong>：自动生成干净的 .c/.h 文件，包含完整 PID 算法和数据结构。复制到 STM32 CubeIDE 里直接用。</div></div>
          </div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>需要额外的工具箱</strong>：Embedded Coder + 目标MCU支持包（STM32/TI C2000等）。学生版有折扣。即使不用代码生成功能，<strong>Simulink仿真的PID参数</strong>也可手动抄到MCU代码里——模型帮你"算"，代码帮你"跑"。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">九、Simulink：拖拽搭框图（复杂系统利器）</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            对于<strong>多模块系统</strong>（FOC = 坐标变换+PID+SVPWM+电机），用 m 脚本写传函繁琐。Simulink 用<strong>拖拽框图</strong>搭建，像拼积木：
          </p>
          <div class="step-list">
            <div class="step-item"><div><strong>建模方式</strong>：从模块库拖入"PID控制器""传递函数""求和点""示波器"，用线连成闭环。每个模块对应一个物理单元。</div></div>
            <div class="step-item"><div><strong>调试优势</strong>：双击任意模块看/改参数；仿真时用"示波器"模块实时看任意中间信号（如Id/Iq/误差）。</div></div>
            <div class="step-item"><div><strong>Simscape Electrical</strong>：电气专用库，有现成 MOSFET/电机/编码器模型，能仿真到电路级（含开关纹波）。</div></div>
          </div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>仿真≠现实</strong>：仿真模型忽略了非线性(死区、饱和、摩擦静段)，结果偏理想。实测通常比仿真差(超调更大)。所以仿真参数只是<strong>起点</strong>，上硬件后仍需微调。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">十、从仿真到MCU代码：离散化</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            仿真用连续时间(s域)，MCU是离散时间(每个控制周期采一次)。连续PI <code>C(s)=Kp+Ki/s</code> 离散化：
          </p>
          <div class="formula-block">
            $u[k] = u[k-1] + K_p(e[k]-e[k-1]) + K_i \\cdot T_s \\cdot e[k]$
            <div class="text-sm text-gray-500 mt-2">增量式PID。这就是 PID实现篇里代码的数学来源</div>
          </div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>离散化工具</strong>：<code>C_d = c2d(C, Ts, 'tustin')</code> 自动转换。Ts=控制周期(如0.001s)。转完用 <code>dstep(C_d)</code> 看离散响应，确认离散化没引入过大误差。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">十一、推荐学习路径与优质资源</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            上面讲了 Matlab 怎么用，下面给出一条<strong>从零到能仿真电机的系统化学习路线</strong>，每阶段配推荐资源：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>阶段</th><th>学习内容</th><th>推荐资源</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">① 入门基础</td><td>Matlab界面、变量、矩阵、画图</td><td>MathWorks官方"入门之旅"(免费2h在线课)；福州大学MOOC</td></tr>
              <tr><td class="font-medium">② 控制理论</td><td>tf/step/feedback/bode、PID</td><td>MathWorks"控制系统设计基础"视频；华东师大PDF教材</td></tr>
              <tr><td class="font-medium">③ 电机建模</td><td>直流/BLDC传函、Simscape电气模型</td><td>MathWorks"电机建模与仿真"专题；CSDN直流电机仿真教程</td></tr>
              <tr><td class="font-medium">④ 电机控制</td><td>BLDC/FOC Simulink仿真、参数整定</td><td>B站"FOC矢量控制Simulink仿真"系列；官方加速开发视频</td></tr>
              <tr><td class="font-medium">⑤ 系统实战</td><td>代码生成、HIL、完整电驱动系统</td><td>TI C2000快速原型课程；MathWorks"基于模型的设计"文档</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">必备资源直通车</h4>
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm">
            <li><strong>官方快速入门</strong>（免费2小时在线课）: matlabacademy.mathworks.com → MATLAB Onramp</li>
            <li><strong>知乎电力电子学习路径</strong>（系统整合文档+视频+示例）: zhuanlan.zhihu.com → 搜"MATLAB 学习路径 电力电子"</li>
            <li><strong>B站Simulink电机控制视频</strong>（FOC全套仿真，跟着做）: 搜"BV1By4y1V7rF"或"Simulink FOC仿真"</li>
            <li><strong>福州大学MOOC</strong>（系统课程，从零教你）: icourse163.org → 搜"MATLAB及机电系统仿真"</li>
            <li><strong>GNU Octave</strong>（免费Matlab替代，控制仿真够用）: octave.org 免费下载</li>
            <li><strong>File Exchange</strong>（社区共享的电机模型和工具）: mathworks.com/matlabcentral → 搜"motor control"</li>
          </ul>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>学习建议</strong>：不要试图"学完所有内容再动手"。<strong>先看2小时入门课，立刻打开Matlab/Octave跟着敲</strong>——这节课教的变量、矩阵、画图，看完就能跑。然后按上面的5阶段，每阶段只学你当前需要的部分。本节的沙盒也能帮你快速验证代码。</div></div>

          <h3 class="text-lg font-semibold mb-3 mt-6">十二、动手实验：在线Python沙盒</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            没装 Matlab/Octave？用下面的<strong>在线沙盒</strong>直接跑控制仿真。它用 Python 的 scipy 控制库（<code>tf</code>、<code>step</code> 语法和 Matlab 几乎一样），改参数点"运行"立即看阶跃响应曲线——验证你刚学的概念。
          </p>
          <div data-chart="python-sim" class="chart-container" style="min-height:480px;padding:8px"></div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>⚠ 语法差异注意</strong>：此沙盒运行 <strong>Python（非Matlab）</strong>。默认代码已是最简Python版，左侧也标注了 Matlab→Python 对照。上面教程的 Matlab 示例不能直接复制！对照表：<code>tf(num,den)</code>→<code>signal.TransferFunction</code>、<code>step(G)</code>→<code>signal.step(G,T=t)</code>、<code>feedback(G,1)</code>→多项式闭环运算。改 <code>Kp/Ki/Kd</code> 的数字 → 点"▶ 运行"看曲线变化。首次加载约10秒。</div></div>
        `,
      },
    ],
  },

  // ========== 电机分类数据 ==========
  motorTypes: {
    'brushed-dc': {
      title: '有刷直流电机',
      subtitle: '最基础的电机类型，理解电机原理的起点',
      icon: '⚡',
      color: 'green',
      overview: '有刷直流电机（Brushed DC Motor）是最古老也最简单的电机类型。它通过机械换向器和电刷实现电流的自动换向，使转子能够持续旋转。虽然效率较低、电刷会磨损，但因结构简单、控制容易、成本低廉，至今仍广泛用于玩具、电动工具、汽车启动器等场景。',
      specs: { voltage: '3-48V', speed: '1000-10000 RPM', torque: '低-中', efficiency: '60-75%', control: '简单(PWM)', life: '2000-5000h（电刷磨损）' },
      sections: [
        { title: '工作原理与结构', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">有刷直流电机由<strong>定子</strong>（永磁体或电磁铁产生固定磁场）和<strong>转子</strong>（绕有线圈的电枢）组成。转子上的线圈通过<strong>换向器</strong>和<strong>电刷</strong>与外部电源连接。</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">当电流通过转子线圈时，在定子磁场中产生安培力（洛伦兹力），驱动转子旋转。换向器在转子旋转时自动切换电流方向，保证转子始终受到同一方向的力矩。</p>
        `},
        { title: '驱动方式', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">有刷直流电机的控制非常简单：</p>
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>调速</strong>：调节PWM占空比即可改变转速</li>
            <li><strong>换向</strong>：改变电流方向即可反转（H桥电路）</li>
            <li><strong>制动</strong>：短路电机端子（短路制动）</li>
          </ul>
        `},
        { title: '常用驱动模块', content: `
          <div class="overflow-x-auto">
            <table class="compare-table">
              <thead><tr><th>模块</th><th>电压范围</th><th>电流</th><th>特点</th></tr></thead>
              <tbody>
<tr><td>L298N</td><td>5-46V</td><td>2A(持续)/3A(峰值)</td><td>最经典入门级，双H桥</td></tr>
<tr><td>TB6612FNG</td><td>2.5-13.5V</td><td>1.2A(持续)/3.2A(峰值)</td><td>效率更高、体积更小</td></tr>
<tr><td>DRV8833</td><td>2.7-10.8V</td><td>1.5A(持续)/2A(峰值)</td><td>TI出品、低功耗</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>结构简单、成本低</li><li>控制容易（PWM直接调速）</li><li>启动转矩大</li><li>无需驱动器（小功率）</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>电刷磨损、需维护</li><li>效率较低（60-75%）</li><li>有火花干扰（EMI）</li><li>转速上限较低</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>电动玩具、遥控小车</li><li>汽车启动电机、雨刷电机</li><li>小型电动工具</li><li>家电（吹风机、搅拌机）</li>
          </ul>
        `},
        { title: '实战：Arduino驱动', content: `
          <div class="code-block"><span class="code-comment">// Arduino + L298N 驱动有刷直流电机</span>
<span class="code-keyword">const int</span> ENA = 9;  <span class="code-comment">// PWM引脚</span>
<span class="code-keyword">const int</span> IN1 = 8;
<span class="code-keyword">const int</span> IN2 = 7;

<span class="code-keyword">void</span> <span class="code-func">setup</span>() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

<span class="code-keyword">void</span> <span class="code-func">loop</span>() {
  <span class="code-comment">// 正转，50%占空比</span>
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 128);
  delay(2000);

          <span class="code-comment">// 反转，50%占空比</span>
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, 128);
  delay(2000);
}</div>
        `},
        { title: '实战：STM32 HAL 完整驱动', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            工业级实现需要：方向控制(GPIO) + 调速(PWM) + 过流保护(ADC)。下面是基于 H桥驱动芯片(如 TB6612)的完整框架：
          </p>
          <div class="code-block"><span class="code-comment">/* STM32 + TB6612 有刷直流电机完整驱动
 * 接线：PWMA=TIM2_CH1, AIN1=PB0, AIN2=PB1, STBY=PB2(高电平使能)
 *      电流采样：ACS712 输出接 ADC1_CH3，过流阈值对应 1.5A */</span>

<span class="code-keyword">#define</span> MOTOR_PWM_MAX  <span class="code-number">3599</span>     <span class="code-comment">// ARR值，对应100%占空比</span>
<span class="code-keyword">#define</span> CURRENT_LIMIT_ADC  <span class="code-number">2480</span>   <span class="code-comment">// ACS712在1.5A时的ADC读数(需校准)</span>

<span class="code-keyword">typedef enum</span> { DIR_STOP, DIR_FWD, DIR_REV } MotorDir;

<span class="code-comment">/* 设置方向：AIN1/AIN2 控制H桥导通组合 */</span>
<span class="code-keyword">static void</span> <span class="code-func">Motor_SetDir</span>(MotorDir dir) {
  <span class="code-keyword">switch</span> (dir) {
    <span class="code-keyword">case</span> DIR_FWD:  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_0, GPIO_PIN_SET);
                  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_1, GPIO_PIN_RESET); <span class="code-keyword">break</span>;
    <span class="code-keyword">case</span> DIR_REV:  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_0, GPIO_PIN_RESET);
                  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_1, GPIO_PIN_SET);   <span class="code-keyword">break</span>;
    <span class="code-keyword">default</span>:       HAL_GPIO_WritePin(GPIOB, GPIO_PIN_0, GPIO_PIN_RESET);
                  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_1, GPIO_PIN_RESET); <span class="code-comment">// 滑行</span>
  }
}

<span class="code-comment">/**
 * 设置电机运转：方向 + 速度
 * @param dir   方向(DIR_STOP/FWD/REV)
 * @param speed 0~1000，映射到占空比 0~100%
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Motor_Run</span>(MotorDir dir, <span class="code-keyword">uint16_t</span> speed) {
  <span class="code-keyword">if</span> (speed &gt; <span class="code-number">1000</span>) speed = <span class="code-number">1000</span>;
  <span class="code-func">Motor_SetDir</span>(dir);
  <span class="code-keyword">uint32_t</span> ccr = (<span class="code-keyword">uint32_t</span>)speed * MOTOR_PWM_MAX / <span class="code-number">1000</span>;
  __HAL_TIM_SET_COMPARE(&amp;htim2, TIM_CHANNEL_1, ccr);
}

<span class="code-comment">/* 过流保护：在ADC采样完成中断里检查
 * 超过阈值立即停机，防止堵转烧绕组 */</span>
<span class="code-keyword">void</span> <span class="code-func">HAL_ADC_ConvCpltCallback</span>(ADC_HandleTypeDef *hadc) {
  <span class="code-keyword">uint16_t</span> cur = HAL_ADC_GetValue(hadc);
  <span class="code-keyword">if</span> (cur &gt; CURRENT_LIMIT_ADC) {
    <span class="code-func">Motor_Run</span>(DIR_STOP, <span class="code-number">0</span>);     <span class="code-comment">// 立即停机</span>
    g_overcurrent_flag = <span class="code-number">1</span>;       <span class="code-comment">// 置故障标志</span>
  }
}

<span class="code-comment">/* 使用：正转60%速度 */</span>
HAL_TIM_PWM_Start(&amp;htim2, TIM_CHANNEL_1);
<span class="code-func">Motor_Run</span>(DIR_FWD, <span class="code-number">600</span>);</div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>过流保护是必备</strong>：有刷电机堵转电流可达额定的5-10倍，没有保护几秒就烧。最简单的是<strong>保险丝</strong>(硬件)，进阶用<strong>ACS712/INA240 电流采样 + ADC DMA + 软件比较</strong>(如上代码)。MCU检测到过流后必须在 ms 级切断PWM。</div></div>
        `},
      ],
    },
    'bldc': {
      title: '无刷直流电机 (BLDC)',
      subtitle: '现代电机控制的核心，高效、可靠、寿命长',
      icon: '🌀',
      color: 'purple',
      overview: '无刷直流电机（BLDC）去掉了机械电刷和换向器，用电子电路实现换向。具有效率高（85-95%）、寿命长、噪音低、扭矩特性好等优点。是无人机、电动工具、电动自行车、云台等现代产品的主流选择。控制方式主要有六步换相法和FOC（磁场定向控制）两种。',
      specs: { voltage: '7-48V(常见)', speed: '1000-50000+ RPM', torque: '中-高', efficiency: '85-95%', control: '六步/FOC', life: '10000h+（无磨损件）' },
      sections: [
        { title: '工作原理与结构', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">BLDC的定子上有三相绕组（A/B/C），转子使用永磁体。与有刷电机相反：<strong>定子产生旋转磁场，转子跟随旋转</strong>。</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">控制器根据转子位置（通过霍尔传感器或无感检测）按顺序给定子三相通电，产生旋转磁场"拉着"转子旋转。由于没有电刷接触，不存在磨损和火花问题。</p>
        `},
        { title: '六步换相法', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">最简单的BLDC驱动方式。根据3个霍尔传感器的6种组合状态，按固定顺序切换三相的上桥臂/下桥臂导通。</p>
          <p class="text-gray-600 dark:text-gray-400">每60°电角度切换一次（一个电周期共6步），产生120°方波驱动。控制简单但转矩脉动较大。</p>
        `},
        { title: 'FOC控制', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">FOC通过Clarke/Park坐标变换和SVPWM，使电机产生平滑的正弦波电流，转矩脉动小、效率高、噪音低。是高性能BLDC控制的标准方法。</p>
          <div class="info-box tip">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <div><strong>推荐入门方案</strong>：Arduino UNO + SimpleFOC Shield + 云台电机，全套成本约200元，SimpleFOC库提供完善的开环/闭环FOC控制。</div>
          </div>
        `},
        { title: '常用驱动方案', content: `
          <div class="overflow-x-auto">
            <table class="compare-table">
              <thead><tr><th>方案</th><th>特点</th><th>适用场景</th></tr></thead>
              <tbody>
                <tr><td>SimpleFOC</td><td>Arduino生态、全开源、中文文档完善</td><td>入门学习、云台</td></tr>
                <tr><td>VESC</td><td>产品级、无感FOC、生态成熟</td><td>电动滑板、e-bike</td></tr>
                <tr><td>ODrive</td><td>双路高性能、闭环位置控制</td><td>机器人关节、机械臂</td></tr>
                <tr><td>灯哥DengFOC</td><td>ESP32、双路240W、GPL开源</td><td>低成本入门</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>效率高（85-95%）</li><li>寿命长（无磨损件）</li><li>扭矩特性平坦</li><li>噪音低、无火花</li><li>转速范围宽</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>需要电子控制器</li><li>控制算法复杂</li><li>成本较高（有刷对比）</li><li>需要位置传感器（有感型）</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>无人机电机</li><li>电动自行车、电动滑板</li><li>云台稳定器</li><li>电动工具（电钻、角磨机）</li><li>硬盘主轴电机</li><li>工业风扇、水泵</li>
          </ul>
        `},
        { title: '星形(Y)与三角形(△)接法', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            BLDC 三相绕组有两种连接方式，直接影响<strong>电压/电流特性和扭矩转速曲线</strong>。选哪种取决于应用：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>特性</th><th>星形 Y (Wye)</th><th>三角形 △ (Delta)</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">接线</td><td>三端接一起，另三端引出</td><td>首尾相接成环，三个节点引出</td></tr>
              <tr><td class="font-medium">相电压</td><td>= 线电压 / √3（每相承压低）</td><td>= 线电压（每相承压高）</td></tr>
              <tr><td class="font-medium">相电流</td><td>= 线电流（每相承流大）</td><td>= 线电流 / √3</td></tr>
              <tr><td class="font-medium">低速扭矩</td><td>较高（适合启动/负载）</td><td>较低</td></tr>
              <tr><td class="font-medium">高速性能</td><td>一般</td><td>较好（适合高转速）</td></tr>
              <tr><td class="font-medium">典型应用</td><td>无人机、云台、多极对数电机</td><td>电动工具、硬盘主轴(高速)</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>选型口诀</strong>：要低速大扭矩(机器人、云台)选<strong>星形</strong>；要高转速(无人机KV很高那种、电钻)选<strong>三角形</strong>。多数 DIY 用 BLDC 内部已固定接好，无法改接，购买时注意规格书的标注。</div></div>
        `},
        { title: 'KV值、极对数与转速的关系', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            KV 和极对数是 BLDC 选型的两个关键参数，它们决定了电机的<strong>速度-扭矩特性</strong>：
          </p>
          <div class="formula-block">
            $n = \\frac{60 \\times f}{p}$
            <div class="text-sm text-gray-500 mt-2">n: 机械转速(RPM) | f: 电频率(换向频率) | p: 极对数</div>
          </div>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>KV值</th><th>极对数(典型)</th><th>特点</th><th>典型应用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">超高 KV (3000+)</td><td>2-7对</td><td>高转速低扭矩</td><td>无人机竞速、涵道</td></tr>
              <tr><td class="font-medium">高 KV (1000-3000)</td><td>5-10对</td><td>中速中扭矩</td><td>穿越机、电踏板</td></tr>
              <tr><td class="font-medium">低 KV (100-1000)</td><td>7-14对</td><td>低转速高扭矩</td><td>云台、机械臂、e-bike</td></tr>
              <tr><td class="font-medium">极低 KV (&lt;100)</td><td>14+对</td><td>大扭矩直驱</td><td>直驱舵机、机器人关节</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>换向频率别忘了除以极对数</strong>：极对数越多，同样机械转速下所需的电换向频率越高。例如 14 极对(7对)电机跑 1000RPM，换向频率 = 1000×7/60 ≈ 117Hz，MCU 中断和 PWM 必须跟得上。极对数也影响 <strong>FOC 的电角度 = 机械角度 × 极对数</strong>。</div></div>
        `},
      ],
    },
    'stepper': {
      title: '步进电机 (Stepper Motor)',
      subtitle: '精确位置控制的核心执行器，3D打印和CNC的标准选择',
      icon: '🎯',
      color: 'red',
      overview: '步进电机（Stepper Motor）将电脉冲信号转换为精确角位移。每输入一个脉冲，电机转动一个固定角度（步距角），无需编码器即可实现开环精确定位。是3D打印机、CNC数控机床、自动化设备中使用量最大的电机类型。对于单片机开发者来说，步进电机的控制最为简单——只需输出方波脉冲和方向电平。',
      specs: { voltage: '5-48V(常用12/24V)', speed: '0-1000+ RPM', stepAngle: '1.8°(200步/转)', holdingTorque: '0.4-4.5 N·m', control: '脉冲+方向', positioning: '开环精确' },
      sections: [
        { title: '工作原理与分类', content: `
          <p>步进电机通过依次给定子绕组通电，产生"步进式"旋转。其核心特征是：<strong>每步转过的角度固定</strong>，通过计算脉冲数量即可精确控制位置。</p>
          <h4 class="font-medium mt-4 mb-2">三大类型</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>类型</th><th>步距角</th><th>扭矩</th><th>成本</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td><strong>反应式(VR)</strong></td><td>7.5°~15°</td><td>低</td><td>最低</td><td>钟表、仪表</td></tr>
              <tr><td><strong>永磁式(PM)</strong></td><td>7.5°~15°</td><td>中</td><td>低</td><td>玩具风扇</td></tr>
              <tr><td><strong>混合式(HB)</strong></td><td><strong>1.8°</strong>/0.9°</td><td><strong>高</strong></td><td>中</td><td><strong>3D打印/CNC（主流）</strong></td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><div>混合式步进电机(Hybrid)结合了永磁体的高扭矩和磁阻式的高精度，<strong>1.8°步距角（200步/转）</strong>是行业标准，NEMA17(42mm法兰)是最通用的规格。</div></div>
        `},
        { title: '驱动方式与细分', content: `
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>模式</th><th>等效步距角</th><th>精度</th><th>定位力矩</th><th>噪音</th></tr></thead>
            <tbody>
              <tr><td>整步(Full Step)</td><td>1.8°</td><td>低</td><td>100%</td><td>大</td></tr>
              <tr><td>半步(Half Step)</td><td>0.9°</td><td>中</td><td>~70%</td><td>中</td></tr>
              <tr><td>1/4细分</td><td>0.45°</td><td>中高</td><td>~40%</td><td>小</td></tr>
              <tr><td>1/16细分</td><td>0.1125°</td><td>高</td><td>~10%</td><td>很小</td></tr>
              <tr><td>1/256细分</td><td>0.007°</td><td>极高</td><td>~1%</td><td><strong>极小</strong></td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>常见误解澄清</strong>：细分<strong>不改变电机的额定保持转矩（holding torque）</strong>——堵转时该多大还是多大。上表的"定位力矩"指的是<strong>单步微动时的位置刚度</strong>（microstep stiffness），细分越高，单个微步能产生的回复力矩越小（开环快速微步切换时尤其明显）。所以"细分越高电机越没劲"是片面的——额定负载能力不变，变的只是微步精度和低速平稳性。</div></div>
        `},
        { title: '选型参数详解', content: `
          <p>选型步进电机，以下参数是关键决策依据：</p>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>参数</th><th>说明</th><th>选型经验</th></tr></thead>
            <tbody>
              <tr><td><strong>保持转矩</strong></td><td>通电静止时的最大转矩(N·m)</td><td>≥负载转矩的 1.5~2 倍</td></tr>
              <tr><td><strong>额定电流</strong></td><td>每相额定工作电流(A)</td><td>需与驱动器限流匹配</td></tr>
              <tr><td><strong>相电阻/相电感</strong></td><td>每相绕组的R和L</td><td>R越小铜损低效率高</td></tr>
              <tr><td><strong>引出线</strong></td><td>4线(串联)/6线/8线</td><td>4线最常用，接法简单</td></tr>
              <tr><td><strong>法兰尺寸</strong></td><td>NEMA标准安装孔位</td><td>42mm(NEMA17)最通用</td></tr>
            </tbody>
          </table></div>
        `},
        { title: '常用驱动模块选型', content: `
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>模块</th><th>最大细分</th><th>电流</th><th>特点</th><th>价格</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td><strong>A4988</strong></td><td>1/16</td><td>2A</td><td>最常用、3D打印标配</td><td>~5元</td><td>入门学习</td></tr>
              <tr><td>DRV8825</td><td>1/32</td><td>2.5A</td><td>更大电流、更细细分</td><td>~8元</td><td>中型设备</td></tr>
              <tr><td><strong>TMC2209</strong></td><td>1/256</td><td>2A</td><td>静音首选，StallGuard堵转检测</td><td>~15元</td><td>静音应用</td></tr>
              <tr><td>TMC5160</td><td>1/256</td><td>3A</td><td>高性能，CoolStep节能</td><td>~40元</td><td>高端设备</td></tr>
              <tr><td>TB6600</td><td>1/16</td><td>4A</td><td>大功率，拨码开关</td><td>~30元</td><td>NEMA23大电机</td></tr>
            </tbody>
          </table></div>
          <div class="info-box info mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>A4988 Vref调节</strong>：驱动板上的Vref电位器控制电流上限。Vref = 额定电流 × 0.8。例如42电机1.2A额定，则Vref调至约0.96V。</div></div>
        `},
        { title: '选型流程（工程实践）', content: `
          <div class="step-list">
            <div><strong>1. 计算负载转矩</strong>：直线运动 T=F×r，旋转运动 T=J×α</div>
            <div><strong>2. 选择保持转矩</strong>：T_motor ≥ 1.5~2 × T_load</div>
            <div><strong>3. 确认矩频特性</strong>：在目标转速下扭矩仍满足要求</div>
            <div><strong>4. 匹配驱动电压</strong>：电压越高高速扭矩越大（24V > 12V）</div>
            <div><strong>5. 选择细分数</strong>：精度要求高选高细分，但注意扭矩衰减</div>
            <div><strong>6. 确认安装尺寸</strong>：NEMA标准法兰匹配</div>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h5 class="font-medium mb-2" style="color:var(--success)">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1" style="color:var(--text-secondary)">
                <li>无需编码器即可精确定位（开环）</li><li>控制最简单——只需脉冲+方向两个GPIO</li><li>低速扭矩大</li><li>成本低（电机本体5-50元）</li>
              </ul></div>
            <div><h5 class="font-medium mb-2" style="color:var(--danger)">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1" style="color:var(--text-secondary)">
                <li>高速时扭矩急剧下降（矩频特性）</li><li>过载会丢步（无法检测，可能毁坏工件）</li><li>效率较低(50-80%)、发热大</li><li>有共振频率（避开该速度区域运行）</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>应用</th><th>常用电机</th><th>典型驱动</th></tr></thead>
            <tbody>
              <tr><td>3D打印机(X/Y/Z轴)</td><td>42mm(NEMA17), 0.4-0.55N·m</td><td>A4988 / TMC2209</td></tr>
              <tr><td>CNC雕刻机</td><td>42mm/57mm(NEMA23), 1.2-2.8N·m</td<td>TB6600 / TMC5160</td></tr>
              <tr><td>自动窗帘/门</td><td>42mm, 0.4N·m</td><td>ULN2003</td></tr>
              <tr><td>医疗注射泵</td><td>专用微型步进</td><td>TMC2209(静音)</td></tr>
              <tr><td>纺织/包装机械</td><td>57mm/86mm</td><td>TB6600</td></tr>
            </tbody>
          </table></div>
        `},
        { title: '实战：STM32 HAL库 C语言控制', content: `
          <p>MCU控制步进电机是最基础也最常用的场景。下面是<strong>STM32 HAL库</strong>驱动42步进电机 + A4988驱动板的完整代码。</p>
          <h4 class="font-medium mt-3 mb-2">硬件接线</h4>
          <div class="code-block">STM32          A4988
PA0 (GPIO) --> STEP  (步进脉冲)
PA1 (GPIO) --> DIR   (方向控制)
PA2 (GPIO) --> EN    (使能，低电平有效，可接地常使能)
VMOT --> 12V+    (电机电源)
GND  --> GND     (STM32与A4988必须共地!)</div>
          <h4 class="font-medium mt-3 mb-2">驱动代码（完整可编译）</h4>
          <div class="code-block"><span class="code-comment">/* 步进电机参数定义 */</span>
<span class="code-keyword">#define</span> STEPS_PER_REV     200
<span class="code-keyword">#define</span> MICROSTEPPING     16    <span class="code-comment">/* A4988 MS1=MS2=MS3=HIGH = 1/16细分 */</span>
<span class="code-keyword">#define</span> TOTAL_STEPS_REV   (STEPS_PER_REV * MICROSTEPPING)  <span class="code-comment">/* 3200步/转 */</span>

<span class="code-keyword">typedef struct</span> {
    GPIO_TypeDef *step_port; uint16_t step_pin;
    GPIO_TypeDef *dir_port;  uint16_t dir_pin;
    uint8_t  direction;
    int32_t  current_pos;
    uint32_t step_delay;  <span class="code-comment">/* us/步, 控制速度 */</span>
} StepperMotor_t;

<span class="code-comment">/* 初始化 */</span>
<span class="code-keyword">void</span> <span class="code-func">Stepper_Init</span>(StepperMotor_t *m,
    GPIO_TypeDef *s_port, uint16_t s_pin,
    GPIO_TypeDef *d_port, uint16_t d_pin)
{
    m->step_port = s_port; m->step_pin = s_pin;
    m->dir_port  = d_port; m->dir_pin  = d_pin;
    m->direction = 0; m->current_pos = 0;
    m->step_delay = 500; <span class="code-comment">/* 默认500us/步 */</span>
    <span class="code-comment">/* 使能驱动(低电平有效) */</span>
    HAL_GPIO_WritePin(EN_PORT, EN_PIN, GPIO_PIN_RESET);
}

<span class="code-comment">/* 设置速度(RPM) */</span>
<span class="code-keyword">void</span> <span class="code-func">Stepper_SetSpeed</span>(StepperMotor_t *m, <span class="code-keyword">float</span> rpm)
{
    <span class="code-keyword">if</span> (rpm <= 0) rpm = 1;
    <span class="code-keyword">float</span> steps_per_sec = rpm * TOTAL_STEPS_REV / 60.0f;
    m->step_delay = (uint32_t)(1000000.0f / steps_per_sec / 2.0f);
    <span class="code-keyword">if</span> (m->step_delay < 5) m->step_delay = 5;
}

<span class="code-comment">/* 发送一个脉冲 */</span>
<span class="code-keyword">static void</span> <span class="code-func">StepPulse</span>(StepperMotor_t *m)
{
    HAL_GPIO_WritePin(m->step_port, m->step_pin, GPIO_PIN_SET);
    delay_us(m->step_delay);
    HAL_GPIO_WritePin(m->step_port, m->step_pin, GPIO_PIN_RESET);
    delay_us(m->step_delay);
}

<span class="code-comment">/* 按步数运动 */</span>
<span class="code-keyword">void</span> <span class="code-func">Stepper_MoveSteps</span>(StepperMotor_t *m, int32_t steps)
{
    <span class="code-keyword">uint32_t</span> abs_steps = (steps >= 0) ? steps : (-steps);
    HAL_GPIO_WritePin(m->dir_port, m->dir_pin,
        (steps >= 0) ? GPIO_PIN_RESET : GPIO_PIN_SET);
    <span class="code-keyword">for</span> (<span class="code-keyword">uint32_t</span> i = 0; i < abs_steps; i++) {
        StepPulse(m);
    }
}

<span class="code-comment">/* 按角度运动 */</span>
<span class="code-keyword">void</span> <span class="code-func">Stepper_MoveDegrees</span>(StepperMotor_t *m, <span class="code-keyword">float</span> deg)
{
    int32_t steps = (int32_t)(deg * TOTAL_STEPS_REV / 360.0f);
    Stepper_MoveSteps(m, steps);
}</div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><div><strong>注意事项</strong>：① STM32 GND与A4988 GND必须连接（共地）。② A4988上MS1/MS2/MS3全拉高=1/16细分。③ Vref电位器用万用表调至0.96V（对应1.2A限制）。④ 高速启动可能丢步，应做加减速。</div></div>
        `},
        { title: '加减速曲线（梯形与S曲线）', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            上面的代码用固定 <code>step_delay</code> 匀速运行，这在<strong>启动瞬间</strong>会有大问题：
            电机从静止突然要求高速旋转，转子惯性跟不上磁场切换 → <strong>丢步</strong>（实际走的步数少于发出的脉冲数，位置出错）。
            停止时同理，会<strong>过冲</strong>。解决办法是<strong>加减速曲线</strong>：起步慢、中间快、结尾慢。
          </p>

          <h4 class="font-medium mt-4 mb-2">两种主流曲线</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>曲线</th><th>速度形状</th><th>加速度</th><th>适用场景</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">梯形</td><td>梯形（加速-匀速-减速）</td><td>突变（有冲击）</td><td>简单场景、低负载</td></tr>
              <tr><td class="font-medium">S曲线</td><td>S形平滑过渡</td><td>连续变化（无冲击）</td><td>高精度、机械臂、CNC</td></tr>
            </tbody>
          </table></div>

          <div class="formula-block">
            $\\text{步间延时} = \\frac{1}{\\text{当前速度(步/秒)}} \\times 10^6 \\,(\\mu s)$
            <div class="text-sm text-gray-500 mt-2">关键：每个脉冲的间隔随当前位置变化，而非固定</div>
          </div>

          <div class="code-block"><span class="code-comment">/* 梯形加减速：离散化实现
 * 思路：把总步数分成加速段、匀速段、减速段
 *       每一步的延时按当前速度重新计算 */</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">uint32_t</span> total_steps;    <span class="code-comment">// 总步数</span>
  <span class="code-keyword">uint32_t</span> accel_steps;     <span class="code-comment">// 加速段步数（通常 = 减速段）</span>
  <span class="code-keyword">uint32_t</span> cruise_steps;    <span class="code-comment">// 匀速段步数 = total - 2×accel</span>
  <span class="code-keyword">uint32_t</span> min_delay;       <span class="code-comment">// 最高速对应的最小延时(us)，如100</span>
  <span class="code-keyword">uint32_t</span> max_delay;       <span class="code-comment">// 起步最大延时(us)，如2000</span>
} Trapezoid_t;

<span class="code-comment">/* 计算第 n 步的延时（梯形曲线）
 * n: 当前已走的步数(0起) */</span>
<span class="code-keyword">uint32_t</span> <span class="code-func">Trap_StepDelay</span>(<span class="code-keyword">const</span> Trapezoid_t *t, <span class="code-keyword">uint32_t</span> n) {
  <span class="code-keyword">uint32_t</span> decel_start = t->total_steps - t->accel_steps;
  <span class="code-keyword">if</span> (n &lt; t->accel_steps) {
    <span class="code-comment">// 加速段：线性从 max_delay 减到 min_delay</span>
    <span class="code-keyword">return</span> t->max_delay
         - (t->max_delay - t->min_delay) * n / t->accel_steps;
  } <span class="code-keyword">else if</span> (n &lt; decel_start) {
    <span class="code-comment">// 匀速段</span>
    <span class="code-keyword">return</span> t->min_delay;
  } <span class="code-keyword">else</span> {
    <span class="code-comment">// 减速段：线性从 min_delay 增到 max_delay</span>
    <span class="code-keyword">uint32_t</span> d = n - decel_start;
    <span class="code-keyword">return</span> t->min_delay
         + (t->max_delay - t->min_delay) * d / t->accel_steps;
  }
}

<span class="code-comment">/* 带加减速的运动：替代上面的 Stepper_MoveSteps */</span>
<span class="code-keyword">void</span> <span class="code-func">Stepper_MoveRamped</span>(StepperMotor_t *m, <span class="code-keyword">int32_t</span> steps,
                          <span class="code-keyword">uint32_t</span> accel_steps) {
  Trapezoid_t t;
  t.total_steps  = (steps &gt;= <span class="code-number">0</span>) ? steps : -steps;
  t.accel_steps  = accel_steps;
  t.cruise_steps = (t.total_steps &gt; <span class="code-number">2</span>*accel_steps)
                 ? t.total_steps - <span class="code-number">2</span>*accel_steps : <span class="code-number">0</span>;
  t.min_delay = <span class="code-number">100</span>;     <span class="code-comment">// 最高速</span>
  t.max_delay = <span class="code-number">2000</span>;    <span class="code-comment">// 起步速</span>

  <span class="code-keyword">for</span> (<span class="code-keyword">uint32_t</span> n = <span class="code-number">0</span>; n &lt; t.total_steps; n++) {
    m->step_delay = <span class="code-func">Trap_StepDelay</span>(&amp;t, n);
    <span class="code-func">StepPulse</span>(m);     <span class="code-comment">// 发一个脉冲</span>
  }
}</div>

          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>梯形曲线的局限</strong>：加速段和匀速段交界处加速度突变，对机械有冲击（会"咯噔"一下）。高精度场合用<strong>S曲线</strong>：在梯形基础上，加速段本身再分成"加加速-匀加速-减加速"三段，使速度二阶导连续。实现复杂但运动极平滑。开源项目 <code>AccelStepper</code> 和 GRBL 的加减速模块都用了这个原理。</div></div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><div><strong>工程选择</strong>：① 短行程（总步数 &lt; 2×加速步数）时无法走完梯形，要做特殊处理（三角曲线，没有匀速段）。② 加速段步数经验值 = 总步数的 1/4 到 1/3。③ 真正的高性能实现用<strong>定时器中断</strong>替代 <code>delay_us</code>，每个中断发一个脉冲并更新下次的 ARR，CPU 几乎不阻塞。</div></div>
        `},
        { title: '调试与验证：如何确认算法真的起作用', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            电机控制最大的坑：代码"看起来对"，但电机实际行为不对。光靠肉眼观察不够，必须用<strong>可量化的验证手段</strong>。下面是一套从简单到专业的调试流程。
          </p>

          <h4 class="font-medium mt-4 mb-2">第一步：硬件级验证（不写代码也能做）</h4>
          <div class="step-list">
            <div class="step-item"><div><strong>听声音</strong>：正常运行的步进电机是平稳的"嗡嗡"声。听到"咔哒咔哒"或"咯噔"= 丢步或加减速冲击。听到刺耳啸叫= 电流过大或共振。</div></div>
            <div class="step-item"><div><strong>测电流</strong>：万用表串联在电机一相，匀速时电流应稳定在设定值（如1.2A）。加速段电流瞬间冲高正常，但不应超过驱动器上限。</div></div>
            <div class="step-item"><div><strong>摸温度</strong>：连续运行10分钟后电机外壳 50-60°C 正常，烫手（&gt;70°C）说明电流设置过高或细分不当。</div></div>
          </div>

          <h4 class="font-medium mt-4 mb-2">第二步：软件级验证（证明算法逻辑正确）</h4>
          <div class="info-box info mb-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>核心原则</strong>：把关键变量<strong>实时输出到上位机</strong>，用波形软件看。看不见的量，就没法调试。</div></div>

          <div class="code-block"><span class="code-comment">/* 调试输出框架：每个控制周期把数据通过串口/USB发出去
 * 上位机用 VO(eventName) 或 Serial Studio 接收画图 */</span>
<span class="code-keyword">typedef struct</span> {
  <span class="code-keyword">uint32_t</span> tick;          <span class="code-comment">// 时间戳</span>
  <span class="code-keyword">int32_t</span>  target_pos;     <span class="code-comment">// 目标位置</span>
  <span class="code-keyword">int32_t</span>  actual_pos;     <span class="code-comment">// 实际位置(编码器读)</span>
  <span class="code-keyword">uint32_t</span> step_delay;     <span class="code-comment">// 当前步间延时</span>
  <span class="code-keyword">float</span>    speed_rpm;      <span class="code-comment">// 当前转速</span>
} Debug_Frame_t;

<span class="code-keyword">void</span> <span class="code-func">Debug_Log</span>(<span class="code-keyword">const</span> Debug_Frame_t *f) {
  <span class="code-comment">// 格式: ,,,...  (CSV，方便上位机解析)</span>
  <span class="code-func">printf</span>(<span class="code-string">"%lu,%ld,%ld,%lu,%.2f\\n"</span>,
         f->tick, f->target_pos, f->actual_pos,
         f->step_delay, f->speed_rpm);
}

<span class="code-comment">/* 更高级：用 "VOF(name,value)" 协议，Serial Studio 自动识别 */</span>
<span class="code-comment">// printf("VOF(step_delay,%lu)\\n", m->step_delay);
// printf("VOF(speed,%.2f)\\n", speed_rpm);</span>
</div>

          <h4 class="font-medium mt-4 mb-2">第三步：用波形验证加减速是否生效</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            运行一次带加减速的运动，同时输出 <code>step_delay</code>，理想波形应该长这样：
          </p>
          <div class="formula-block">
            <div class="text-left text-sm font-mono" style="color:var(--text-secondary)">
              step_delay(μs)<br>
              2000 ┤●<br>
                   │  ╲<br>
                   │    ╲<br>
               100 ┤      ●─────────●<br>
                   │                 ╲<br>
                   │                   ╲<br>
              2000 ┤                     ●<br>
                   └───────────────────────── 步数<br>
                   &nbsp;&nbsp;加速&nbsp;&nbsp;匀速&nbsp;&nbsp;减速
            </div>
            <div class="text-sm text-gray-500 mt-2">如果波形是平的一条线 = 加减速没生效；如果是锯齿状抖动 = 算法或定时器有问题</div>
          </div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><div><strong>验证丢步的方法</strong>：让电机走固定步数（如1转=6400步@16细分），结束后<strong>用编码器读实际位置</strong>。理论值6400，实测若5980= 丢了420步。这是判断加减速参数是否足够的金标准。</div></div>

          <h4 class="font-medium mt-4 mb-2">第四步：参数调优的实操流程</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>现象</th><th>原因</th><th>调整方向</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">启动就丢步</td><td>起步速度过高</td><td>增大 <code>max_delay</code>（降低起步速度）</td></tr>
              <tr><td class="font-medium">高速段丢步</td><td>电流不足或负载过大</td><td>调高 Vref（不超过电机额定）；加减速段步数</td></tr>
              <tr><td class="font-medium">停止时过冲</td><td>减速段不够</td><td>增大 <code>accel_steps</code>，延长减速</td></tr>
              <tr><td class="font-medium">运动有冲击声</td><td>梯形曲线突变</td><td>换 S 曲线；或减小加速度</td></tr>
              <tr><td class="font-medium">低速共振振动</td><td>步进电机固有特性</td><td>提高细分（1/16或1/32）；开启 TMC2209 的 StealthChop</td></tr>
              <tr><td class="font-medium">电机发烫</td><td>电流过大</td><td>降低 Vref；或开启驱动器的空闲降流</td></tr>
            </tbody>
          </table></div>

          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>调参顺序很关键</strong>：① 先用<strong>极低速度</strong>（min_delay=2000）验证位置精度——能走对再说；② 再逐步提高速度，每次提升后用编码器复核位置；③ 最后调加减速曲线形状。一上来就追求高速是新手最常见的错误。</div></div>

          <h4 class="font-medium mt-4 mb-2">第五步：常用调试工具</h4>
          <div class="overflow-x-auto"><table class="compare-table">
            <thead><tr><th>工具</th><th>用途</th><th>价格</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">Serial Studio</td><td>开源，接串口CSV自动画实时波形，验证加减速/PID曲线</td><td>免费</td></tr>
              <tr><td class="font-medium">VOFA+ / FireTool</td><td>国产上位机，支持VOF协议，拖拽控件</td><td>免费</td></tr>
              <tr><td class="font-medium">逻辑分析仪</td><td>抓STEP/DIR实际波形，看脉冲间隔是否符合加减速</td><td>10-50元(24M/8CH够用)</td></tr>
              <tr><td class="font-medium">示波器</td><td>看相电流波形、PWM死区，调试BLDC必备</td><td>200元+(手持)</td></tr>
              <tr><td class="font-medium">万用表</td><td>测Vref、电机电流、供电电压</td><td>必备</td></tr>
            </tbody>
          </table></div>

          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><div><strong>一个值得养成的习惯</strong>：每次改算法，先想"<strong>我怎么证明它生效了</strong>"，再写代码。把验证用的串口输出和测试用例一起写进去。这样调试时才不会陷入"改了一堆却不知道哪个起作用"的困境。</div></div>
        `},
      ],
    },
    'servo': {
      title: '伺服电机',
      subtitle: '工业级闭环精密运动控制',
      icon: '🔄',
      color: 'cyan',
      overview: '伺服电机（Servo Motor）是配备了编码器反馈的高性能电机系统。通过闭环控制实现精确的位置、速度和转矩控制。与步进电机不同，伺服电机不会丢步，在高速和高负载下仍能保持精度。广泛应用于工业机器人、CNC机床、自动化产线等场景。',
      specs: { voltage: '24-380V(交流伺服)', speed: '0-6000 RPM', torque: '高', precision: '编码器分辨率(17bit+)', control: '闭环PID/FOC' },
      sections: [
        { title: '工作原理与结构', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">伺服系统由<strong>伺服电机</strong>、<strong>编码器</strong>（位置反馈）、<strong>伺服驱动器</strong>三部分组成。</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">编码器实时检测电机转子位置，驱动器根据目标位置与实际位置的偏差，通过PID/FOC算法计算出控制信号，驱动电机精确运动到目标位置。这就是<strong>闭环控制</strong>。</p>
        `},
        { title: '控制模式', content: `
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>位置模式（PT）</strong>：精确控制位置，最常用模式</li>
            <li><strong>速度模式（PV）</strong>：精确控制转速，用于传送带、卷绕</li>
            <li><strong>转矩模式（PQ）</strong>：精确控制输出扭矩，用于压延、拧紧</li>
            <li><strong>混合模式</strong>：位置限制+速度限制+转矩限制的组合</li>
          </ul>
        `},
        { title: '通信协议', content: `
          <div class="overflow-x-auto">
            <table class="compare-table">
              <thead><tr><th>协议</th><th>带宽</th><th>特点</th></tr></thead>
              <tbody>
                <tr><td>PWM</td><td>低</td><td>简单，适用于小型舵机</td></tr>
                <tr><td>CAN/CANopen</td><td>中</td><td>工业标准，多轴联动</td></tr>
                <tr><td>EtherCAT</td><td>高</td><td>高速实时以太网，高端应用</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>闭环控制、不会丢步</li><li>高速高精度</li><li>过载能力强</li><li>响应速度快</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>成本高</li><li>需要编码器和驱动器</li><li>控制复杂</li><li>体积和重量较大</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>工业机器人关节</li><li>CNC机床进给轴</li><li>自动化产线传送、抓取</li><li>半导体制造设备</li><li>包装、印刷机械</li>
          </ul>
        `},
        { title: '伺服 vs 步进：怎么选？', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            这是新手最常见的纠结。核心区别：伺服是<strong>闭环</strong>（有反馈，不丢步），步进通常<strong>开环</strong>（发脉冲即假设走到位）。下表帮你决策：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>对比项</th><th>步进电机</th><th>伺服电机</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">控制方式</td><td>开环(脉冲即位置)</td><td>闭环(编码器反馈)</td></tr>
              <tr><td class="font-medium">高速性能</td><td>差(高速丢步)</td><td>好(额定扭矩保持)</td></tr>
              <tr><td class="font-medium">低速扭矩</td><td><strong>大</strong>(堵转扭矩大)</td><td>中</td></tr>
              <tr><td class="font-medium">精度</td><td>步距角决定(典型1.8°)</td><td>编码器决定(典型0.01°)</td></tr>
              <tr><td class="font-medium">过载能力</td><td>弱(过载即丢步)</td><td><strong>强</strong>(3倍过载数秒)</td></tr>
              <tr><td class="font-medium">响应速度</td><td>慢(加减速曲线限制)</td><td><strong>快</strong>(ms级)</td></tr>
              <tr><td class="font-medium">价格</td><td><strong>低</strong>(NEMA17约¥50)</td><td>高(750W约¥1500+)</td></tr>
              <tr><td class="font-medium">发热</td><td>大(静止也满电流)</td><td>小(静止零电流)</td></tr>
            </tbody>
          </table></div>
          <div class="info-box tip"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>决策三问</strong>：① 预算 &lt; ¥500/轴？→ 步进。② 需要高速(&gt;2000RPM)或高精度(&lt;0.1°)？→ 伺服。③ 低速大扭矩且不差钱？→ 伺服(或步进配减速机)。DIY机械臂优先步进+闭环模块(如TMC5160带编码器)，性价比最高。</div></div>
        `},
        { title: '驱动器接线实例（脉冲方向）', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            国产伺服(汇川/台达/松下)最通用的接口。MCU 用定时器发脉冲、GPIO 控方向：
          </p>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>MCU 端</th><th>驱动器端子</th><th>信号</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">TIM CH1 (脉冲)</td><td>PUL+ / PUL-</td><td>PULSE</td><td>每个脉冲走一个最小位移(由电子齿轮比定)</td></tr>
              <tr><td class="font-medium">GPIO (方向)</td><td>DIR+ / DIR-</td><td>DIR</td><td>高/低电平决定正反转</td></tr>
              <tr><td class="font-medium">GPIO (使能)</td><td>ENA+ / ENA-</td><td>ENABLE</td><td>低电平使能(伺服上电后需拉低才能动)</td></tr>
              <tr><td class="font-medium">GPIO 输入</td><td>ALM+</td><td>ALARM</td><td>驱动器故障输出，触发即停MCU</td></tr>
              <tr><td class="font-medium">GND</td><td>各-端共地</td><td>GND</td><td>必须共地，否则信号错乱</td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>差分信号是关键</strong>：脉冲/方向信号线在干扰大的工业环境必须用<strong>双绞屏蔽差分</strong>(PUL+/PUL-一对)，单端信号超过1米就容易丢脉冲。MCU端用SN65HVD3082或MAX485转差分，或直接用带差分输出的驱动器型号。共地也常被新手忽略，导致电机乱跑。</div></div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>首次上电流程</strong>：① 接线核对三遍(尤其电源相序)。② 驱动器设电子齿轮比(让脉冲数与编码器分辨率匹配)。③ <strong>先空载</strong>测试：低速发少量脉冲，看电机转向是否正确。④ 再带负载调位置环增益。跳步直接带载上电是烧驱动器的常见原因。</div></div>
        `},
      ],
    },
    'hobby-servo': {
      title: '舵机 (Hobby Servo)',
      subtitle: 'PWM驱动的位置控制执行器',
      icon: '📡',
      color: 'orange',
      overview: '舵机（RC Servo）是集成了直流电机、减速齿轮组、位置反馈电位器和控制电路的一体化位置执行器。通过单根PWM信号线即可控制旋转角度，是机器人关节、遥控模型中最常用的定位元件。STM32单片机通过定时器输出50Hz PWM波即可精确控制舵机角度。',
      specs: { voltage: '4.8-7.2V', speed: '0.05-0.3s/60°', torque: '1.2-25 kg·cm', range: '0-180°(标准)/360°(连续)', control: 'PWM(50Hz, 0.5-2.5ms)', weight: '9-60g(常见)' },
      sections: [
        { title: '系统组成与工作原理', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">舵机内部是一个完整的<strong>闭环位置控制系统</strong>，由以下四个核心部件组成：</p>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>部件</th><th>功能</th><th>说明</th></tr></thead>
              <tbody>
                <tr><td><strong>直流电机</strong></td><td>提供动力</td><td>小型永磁直流电机，5-6V供电</td></tr>
                <tr><td><strong>减速齿轮组</strong></td><td>降速增扭</td><td>3-6级齿轮减速，减速比50:1~300:1</td></tr>
                <tr><td><strong>电位器</strong></td><td>位置反馈</td><td>与输出轴同轴，输出0-VCC的模拟电压</td></tr>
                <tr><td><strong>控制电路</strong></td><td>误差比较</td><td>比较PWM目标值与电位器实际值，驱动电机</td></tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
            <p class="text-sm font-medium mb-2">控制原理（内部闭环）：</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">PWM信号 → 控制电路读取脉冲宽度（目标角度） → 与电位器电压比较（实际角度） → 差值驱动H桥正反转 → 电机转动带动齿轮组 → 电位器同步转动 → 差值为零时停止</p>
          </div>
        `},
        { title: 'PWM时序详解', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">舵机使用<strong>50Hz PWM信号</strong>（周期20ms），通过脉冲宽度来编码目标角度。这是RC遥控领域的标准协议。</p>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>脉冲宽度 (ms)</th><th>对应角度</th><th>占空比</th><th>STM32 CCR值(ARR=999)</th></tr></thead>
              <tbody>
                <tr><td>0.5</td><td>0°</td><td>2.5%</td><td>25</td></tr>
                <tr><td>1.0</td><td>45°</td><td>5.0%</td><td>50</td></tr>
                <tr><td>1.5</td><td>90°（中位）</td><td>7.5%</td><td>75</td></tr>
                <tr><td>2.0</td><td>135°</td><td>10.0%</td><td>100</td></tr>
                <tr><td>2.5</td><td>180°</td><td>12.5%</td><td>125</td></tr>
              </tbody>
            </table>
          </div>
          <div class="p-3 rounded-lg mb-3" style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3)">
            <p class="text-sm"><strong>工程要点：</strong>CCR值计算公式：<code>CCR = (脉冲宽度ms / 20ms) × ARR</code>。例如1.5ms → (1.5/20) × 999 = 74.9 ≈ 75</p>
          </div>
          <div class="p-3 rounded-lg" style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.3)">
            <p class="text-sm"><strong>注意：</strong>部分舵机实际响应范围为0.5-2.5ms（大角度舵机可达270°），传统1.0-2.0ms范围仅有90°左右可用角度。使用前务必查阅数据手册确认实际脉宽范围。</p>
          </div>
        `},
        { title: '舵机分类详解', content: `
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>类型</th><th>旋转范围</th><th>控制方式</th><th>反馈</th><th>代表型号</th><th>适用场景</th></tr></thead>
              <tbody>
                <tr><td><strong>标准模拟舵机</strong></td><td>0-180°</td><td>PWM脉宽</td><td>无（内部）</td><td>SG90, MG996R</td><td>遥控模型、简单关节</td></tr>
                <tr><td><strong>数字舵机</strong></td><td>0-180°/270°</td><td>PWM脉宽</td><td>无（内部）</td><td>DS3218, S3305</td><td>机械臂、高精度场景</td></tr>
                <tr><td><strong>连续旋转舵机</strong></td><td>360°连续</td><td>PWM控制转向+转速</td><td>无</td><td>FEETECH FS90R</td><td>小车驱动轮</td></tr>
                <tr><td><strong>总线舵机</strong></td><td>0-360°</td><td>串行协议(半双工UART)</td><td>位置/速度/温度</td><td>Dynamixel AX-12A</td><td>仿生机器人、多自由度</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-2"><strong>模拟 vs 数字舵机核心区别：</strong></p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
            <li>模拟舵机：控制电路用模拟比较器，PWM仅在脉冲期间有效，响应速度和精度一般</li>
            <li>数字舵机：内部MCU以300Hz（6倍）频率刷新驱动，死区更小、响应更快、定位精度更高、静止力更大</li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 text-sm"><strong>总线舵机优势：</strong>单线串联最多254个（Dynamixel），可读取位置/速度/负载/温度反馈，支持PID参数调节，通信协议支持指令式位置/速度/扭矩控制。</p>
        `},
        { title: '选型参数详解', content: `
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>参数</th><th>含义</th><th>选型建议</th></tr></thead>
              <tbody>
                <tr><td><strong>扭矩 (kg·cm)</strong></td><td>在力臂1cm处能承受的最大力</td><td>留2倍余量；机械臂选≥15kg·cm，简单转向选2-6kg·cm</td></tr>
                <tr><td><strong>速度 (s/60°)</strong></td><td>转到60°所需时间</td><td>越小越快；实时场景要求≤0.15s/60°</td></tr>
                <tr><td><strong>工作电压 (V)</strong></td><td>额定供电电压</td><td>4.8V/6.0V/7.2V三档；电压高→扭矩大、速度快</td></tr>
                <tr><td><strong>旋转角度 (°)</strong></td><td>最大旋转范围</td><td>标准180°，大角度270°，连续旋转360°</td></tr>
                <tr><td><strong>齿轮材质</strong></td><td>减速齿轮的材料</td><td>塑料→轻但易断；金属→耐用但重且贵</td></tr>
                <tr><td><strong>轴承类型</strong></td><td>输出轴支撑方式</td><td>铜套→便宜；滚珠轴承→寿命长、摩擦小</td></tr>
                <tr><td><strong>死区宽度</strong></td><td>能响应的最小PWM变化</td><td>数字舵机死区＜1μs，模拟舵机约5-10μs</td></tr>
              </tbody>
            </table>
          </div>
          <div class="p-3 rounded-lg" style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3)">
            <p class="text-sm"><strong>扭矩与力臂的关系：</strong>实际可用扭矩 = 额定扭矩 / 力臂(cm)。例如MG996R额定11kg·cm，当力臂为5cm时仅能承受 11/5 = 2.2kg 的负载。设计机械臂时务必计算最不利工况。</p>
          </div>
        `},
        { title: '常见型号对比', content: `
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>型号</th><th>重量</th><th>扭矩(6V)</th><th>速度</th><th>角度</th><th>齿轮</th><th>价格</th><th>推荐场景</th></tr></thead>
              <tbody>
                <tr><td><strong>SG90</strong></td><td>9g</td><td>1.8 kg·cm</td><td>0.1s/60°</td><td>180°</td><td>塑料</td><td>~¥5</td><td>验证原型、微型项目</td></tr>
                <tr><td><strong>MG90S</strong></td><td>13g</td><td>2.5 kg·cm</td><td>0.11s/60°</td><td>180°</td><td>金属</td><td>~¥10</td><td>小型机械臂</td></tr>
                <tr><td><strong>MG996R</strong></td><td>55g</td><td>11 kg·cm</td><td>0.19s/60°</td><td>180°</td><td>金属(铜)</td><td>~¥18</td><td>六足机器人、机械臂</td></tr>
                <tr><td><strong>DS3218</strong></td><td>60g</td><td>20 kg·cm</td><td>0.16s/60°</td><td>270°</td><td>金属</td><td>~¥22</td><td>高精度机械臂</td></tr>
                <tr><td><strong>S3305</strong></td><td>60g</td><td>15 kg·cm</td><td>0.13s/60°</td><td>180°</td><td>金属+滚珠</td><td>~¥45</td><td>竞赛级机器人</td></tr>
                <tr><td><strong>AX-12A</strong></td><td>54g</td><td>15 kg·cm</td><td>0.15s/60°</td><td>300°</td><td>金属+总线</td><td>~¥250</td><td>仿生机器人(总线)</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">提示：扭矩标注通常基于6V供电和4.8V测试电压两个标准，选型时注意区分。7.2V供电扭矩可提升约30%。</p>
        `},
        { title: '优缺点分析', content: `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>单线控制，接口极简（GND/VCC/SIG）</li><li>内置闭环，无需外部反馈</li><li>体积紧凑、功耗低</li><li>价格低廉，入门友好</li><li>减速齿轮提供大扭矩输出</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>角度受限（标准180°，难以做完整旋转）</li><li>电位器磨损导致精度漂移</li><li>无位置反馈输出（无法读取实际角度）</li><li>塑料齿轮过载易断裂</li><li>堵转电流大，需独立供电</li>
              </ul></div>
          </div>
        `},
        { title: '实战：STM32 HAL C语言驱动', content: `
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">以下代码使用 STM32F4 的 TIM4 通道1 输出 50Hz PWM 控制舵机。MCU时钟84MHz，预分频后定时器频率 = 84MHz/(83+1) = 1MHz，ARR=19999 产生 50Hz 周期。CCR范围500-2500对应0.5-2.5ms脉宽。</p>
          <div class="code-block"><span class="code-comment">/* ============================================
 * 舵机驱动模块 - STM32 HAL库
 * 定时器: TIM4 CH1 (PA0)
 * PWM: 50Hz, 脉宽 0.5-2.5ms → 角度 0-180°
 * ============================================ */</span>

<span class="code-keyword">#include</span> "stm32f4xx_hal.h"

<span class="code-comment">// 舵机参数宏定义</span>
<span class="code-keyword">#define</span> SERVO_TIM         TIM4
<span class="code-keyword">#define</span> SERVO_TIM_CH      TIM_CHANNEL_1
<span class="code-keyword">#define</span> SERVO_TIM_FREQ    <span class="code-number">50</span>           <span class="code-comment">// Hz</span>
<span class="code-keyword">#define</span> SERVO_PWM_MIN     <span class="code-number">500</span>          <span class="code-comment">// 0.5ms → 0°</span>
<span class="code-keyword">#define</span> SERVO_PWM_MAX     <span class="code-number">2500</span>         <span class="code-comment">// 2.5ms → 180°</span>

<span class="code-keyword">typedef struct</span> {
  TIM_HandleTypeDef *htim;
  <span class="code-keyword">uint32_t</span> channel;
  <span class="code-keyword">float</span> current_angle;
} Servo_t;

<span class="code-comment">/**
 * @brief 初始化舵机PWM定时器
 * TIM4: PSC=83, ARR=19999 → 1MHz/20000 = 50Hz
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Servo_Init</span>(Servo_t *servo, TIM_HandleTypeDef *htim, <span class="code-keyword">uint32_t</span> ch)
{
  servo->htim = htim;
  servo->channel = ch;
  servo->current_angle = <span class="code-number">90.0f</span>;

  TIM_OC_InitTypeDef sConfigOC = {<span class="code-number">0</span>};
  sConfigOC.OCMode     = TIM_OCMODE_PWM1;
  sConfigOC.Pulse      = <span class="code-number">1500</span>;          <span class="code-comment">// 中位 1.5ms</span>
  sConfigOC.OCPolarity  = TIM_OCPOLARITY_HIGH;
  sConfigOC.OCFastMode   = TIM_OCFAST_DISABLE;
  HAL_TIM_PWM_ConfigChannel(htim, &amp;sConfigOC, ch);

  HAL_TIM_PWM_Start(htim, ch);
}

<span class="code-comment">/**
 * @brief 角度 → CCR值映射
 * 0° → 500, 90° → 1500, 180° → 2500
 */</span>
<span class="code-keyword">static uint32_t</span> <span class="code-func">Servo_AngleToCCR</span>(<span class="code-keyword">float</span> angle)
{
  <span class="code-keyword">if</span> (angle &lt; <span class="code-number">0</span>) angle = <span class="code-number">0</span>;
  <span class="code-keyword">if</span> (angle &gt; <span class="code-number">180</span>) angle = <span class="code-number">180</span>;
  <span class="code-keyword">return</span> (<span class="code-keyword">uint32_t</span>)(SERVO_PWM_MIN + angle * (SERVO_PWM_MAX - SERVO_PWM_MIN) / <span class="code-number">180.0f</span>);
}

<span class="code-comment">/**
 * @brief 设置舵机角度 (0-180°)
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Servo_SetAngle</span>(Servo_t *servo, <span class="code-keyword">float</span> angle)
{
  <span class="code-keyword">uint32_t</span> ccr = Servo_AngleToCCR(angle);
  __HAL_TIM_SET_COMPARE(servo->htim, servo->channel, ccr);
  servo->current_angle = angle;
}

<span class="code-comment">/**
 * @brief 带平滑过渡的舵机控制
 * @param step_ms 每步间隔(毫秒)
 * @param step_deg 每步角度增量
 */</span>
<span class="code-keyword">void</span> <span class="code-func">Servo_Sweep</span>(Servo_t *servo, <span class="code-keyword">float</span> target, <span class="code-keyword">uint32_t</span> step_ms, <span class="code-keyword">float</span> step_deg)
{
  <span class="code-keyword">float</span> dir = (target &gt; servo->current_angle) ? <span class="code-number">1.0f</span> : <span class="code-number">-1.0f</span>;
  <span class="code-keyword">while</span> (fabsf(target - servo->current_angle) &gt; <span class="code-number">0.5f</span>) {
    servo->current_angle += dir * step_deg;
    Servo_SetAngle(servo, servo->current_angle);
    HAL_Delay(step_ms);
  }
  Servo_SetAngle(servo, target);
}

<span class="code-comment">/* ====== main.c 使用示例 ======
TIM_HandleTypeDef htim4;

int main(void) {
  HAL_Init();
  SystemClock_Config();

  // TIM4: 84MHz / (83+1) = 1MHz, ARR=19999 → 50Hz
  htim4.Instance = TIM4;
  htim4.Init.Prescaler = 83;
  htim4.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim4.Init.Period = 19999;
  htim4.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
  HAL_TIM_PWM_Init(&htim4);

  Servo_t myServo;
  Servo_Init(&myServo, &htim4, TIM_CHANNEL_1);

  // 扫描运动: 0° → 180° → 0°
  while (1) {
    Servo_Sweep(&myServo, 180.0f, 20, 2.0f);  // 每20ms走2°
    HAL_Delay(500);
    Servo_Sweep(&myServo, 0.0f, 20, 2.0f);
    HAL_Delay(500);
  }
}
====== */</span></div>
        `},
        { title: '多舵机控制（机械臂应用）', content: `
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">一个定时器可通过不同通道控制多路舵机，但需要注意<strong>刷新率限制</strong>。TIM4有4个通道，可同时驱动4个舵机。</p>
          <div class="code-block"><span class="code-comment">/* 多舵机控制示例 - 机械臂3关节 */</span>

Servo_t joint_base, joint_arm, joint_hand;

<span class="code-keyword">void</span> <span class="code-func">RobotArm_Init</span>(<span class="code-keyword">void</span>)
{
  <span class="code-comment">// 同一个TIM4, 不同通道</span>
  Servo_Init(&amp;joint_base, &amp;htim4, TIM_CHANNEL_1); <span class="code-comment">// PA0 - 底座旋转</span>
  Servo_Init(&amp;joint_arm,  &amp;htim4, TIM_CHANNEL_2); <span class="code-comment">// PA1 - 大臂俯仰</span>
  Servo_Init(&amp;joint_hand, &amp;htim4, TIM_CHANNEL_3); <span class="code-comment">// PA2 - 夹爪开合</span>
}

<span class="code-comment">/**
 * @brief 同步设置所有关节角度
 * 注意: 每个PWM周期的各通道CCR在下一个周期生效
 * 所以"同时"设置CCR即可实现近似同步
 */</span>
<span class="code-keyword">void</span> <span class="code-func">RobotArm_SetPose</span>(<span class="code-keyword">float</span> base, <span class="code-keyword">float</span> arm, <span class="code-keyword">float</span> hand)
{
  Servo_SetAngle(&amp;joint_base, base);
  Servo_SetAngle(&amp;joint_arm, arm);
  Servo_SetAngle(&amp;joint_hand, hand);
}</div>
          <div class="mt-3 p-3 rounded-lg" style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.3)">
            <p class="text-sm"><strong>多舵机供电警告：</strong>每路舵机堵转电流可达0.5-1.5A。4路舵机同时堵转可能需要6A。务必使用独立5-6V电源（如LM2596降压模块），<strong>绝对不要从STM32的3.3V引脚取电</strong>，否则MCU会复位或烧毁。</p>
          </div>
        `},
        { title: '工程注意事项', content: `
          <div class="space-y-3">
            <div class="p-3 rounded-lg" style="background:var(--bg-secondary)">
              <p class="font-medium text-sm mb-1">1. 供电隔离</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">舵机GND必须与MCU共地，但VCC必须独立供电。多个舵机并联时需大功率电源。建议在舵机电源线上并联100μF电解电容 + 0.1μF陶瓷电容，吸收PWM切换产生的电压尖峰。</p>
            </div>
            <div class="p-3 rounded-lg" style="background:var(--bg-secondary)">
              <p class="font-medium text-sm mb-1">2. 堵转保护</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">堵转时电流可达正常工作电流的5-10倍（SG90: 100mA→1A, MG996R: 500mA→2.5A）。程序中应限制连续运行时间，机械设计上加限位防止超行程。</p>
            </div>
            <div class="p-3 rounded-lg" style="background:var(--bg-secondary)">
              <p class="font-medium text-sm mb-1">3. 齿轮材质选择</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">塑料齿轮（尼龙/POM）：轻、静音、便宜，但冲击负载易碎。金属齿轮（黄铜/铝合金）：坚固，但有齿隙（backlash）约1-3°，影响定位精度。高精度场景建议选金属齿轮+滚珠轴承型号。</p>
            </div>
            <div class="p-3 rounded-lg" style="background:var(--bg-secondary)">
              <p class="font-medium text-sm mb-1">4. PWM信号质量</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">舵机信号线较长时（>50cm），PWM波形会因寄生电容变形。建议在信号线末端并联10kΩ上拉电阻，或使用PCA9685等专用舵机驱动板通过I2C隔离控制。</p>
            </div>
          </div>
        `},
      ],
    },
  },

  // ========== 电机行业科普 ==========
  industry: {
    title: '电机行业',
    subtitle: '市场、选型、应用与职业全景',
    sections: [
      {
        title: '全球电机市场概况',
        icon: '🌍',
        desc: '了解电机行业的市场规模和主要玩家',
        tags: ['市场', '行业'],
        content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">电机是现代工业的"心脏"，是将电能转换为机械能的核心装置。据统计，<strong>全球工业用电中约70%被各类电机消耗</strong>。</p>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>指标</th><th>数据</th><th>说明</th></tr></thead>
              <tbody>
                <tr><td><strong>全球市场规模</strong></td><td>约1500亿美元(2025)</td><td>预计2030年突破2000亿美元，CAGR约5%</td></tr>
                <tr><td><strong>中国市场</strong></td><td>约4000亿人民币</td><td>全球最大的电机生产与消费国</td></tr>
                <tr><td><strong>主要企业</strong></td><td>西门子、ABB、安川、三菱、汇川</td><td>工业伺服市场被外资品牌占据主流</td></tr>
                <tr><td><strong>增长驱动</strong></td><td>新能源汽车、工业自动化、机器人</td><td>新能源车用电机增长最快（年增25%+）</td></tr>
                <tr><td><strong>能效趋势</strong></td><td>IE3/IE4高能效标准推广</td><td>各国政策推动高效电机替代低效电机</td></tr>
              </tbody>
            </table>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">按应用领域分布</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>工业驱动：35%（机床、传送带、泵、风机）</li>
                <li>汽车（含新能源）：25%</li>
                <li>家电：20%（空调压缩机、洗衣机、风扇）</li>
                <li>消费电子：10%（手机振动马达、硬盘主轴）</li>
                <li>机器人与自动化：10%</li>
              </ul>
            </div>
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">按电机类型分布</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>异步电机（感应电机）：最大份额，工业主力</li>
                <li>永磁同步电机（PMSM）：增长最快，新能源车标配</li>
                <li>直流有刷电机：消费电子和低成本应用</li>
                <li>步进电机：自动化控制和精密定位</li>
                <li>伺服电机：高端运动控制</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        title: '电机选型实战指南',
        icon: '📋',
        desc: '从需求到选型的完整决策流程',
        tags: ['选型', '工程'],
        content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">选型是电机应用的第一步。选错了不仅浪费成本，更可能导致项目失败。下面是从需求分析到最终选型的完整流程。</p>
          <div class="p-4 rounded-lg mb-4" style="background:rgba(194,136,62,0.08);border:1px solid rgba(194,136,62,0.2)">
            <h4 class="font-medium mb-2" style="color:var(--primary)">选型六步法</h4>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Step 1 — 明确负载需求</strong>：需要多大的扭矩(T)？需要多快的转速(n)？负载惯量(J_load)是多少？运动模式是连续旋转还是点到点定位？</p>
              <p><strong>Step 2 — 计算功率需求</strong>：P = T × n / 9550（kW），其中T单位N·m，n单位RPM。留20-30%的余量。</p>
              <p><strong>Step 3 — 确定控制精度要求</strong>：需要开环控制即可？还是需要位置反馈闭环？精度要求是多少（度/脉冲数）？</p>
              <p><strong>Step 4 — 环境与供电约束</strong>：供电电压(DC 12V/24V/48V 还是 AC 220V/380V)？工作温度范围？防护等级(IP20/IP54/IP67)？</p>
              <p><strong>Step 5 — 成本与交付周期</strong>：预算范围？是否需要备货？是否有国产替代方案？</p>
              <p><strong>Step 6 — 样机验证</strong>：先买1-2台样机实测，确认扭矩裕量、温升、噪音满足要求后再批量采购。</p>
            </div>
          </div>
          <h4 class="font-medium mb-3">常见应用场景选型速查</h4>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>应用场景</th><th>推荐电机类型</th><th>关键参数</th><th>推荐型号/方案</th></tr></thead>
              <tbody>
                <tr><td>3D打印机挤出头</td><td>步进电机(Nema17)</td><td>1.8°步距角, 0.4A</td><td>42步进 + A4988/TMC2209</td></tr>
                <tr><td>3D打印机运动轴</td><td>步进电机(Nema17)</td><td>1.8°, 1.0-1.5A</td><td>42步进 + TMC2209(静音)</td></tr>
                <tr><td>CNC雕刻机</td><td>步进电机(Nema23)</td><td>高扭矩, 2-3A</td><td>57步进 + DM542驱动</td></tr>
                <tr><td>机械臂关节</td><td>舵机/总线舵机</td><td>15-20 kg·cm</td><td>MG996R / Dynamixel</td></tr>
                <tr><td>智能小车驱动</td><td>直流减速电机</td><td>3-12V, 100-300RPM</td><td>TT马达 / N20减速电机</td></tr>
                <tr><td>无人机动力</td><td>无刷外转子(BLDC)</td><td>KV 1000-2300</td><td>2212/2216 + 电调(ESC)</td></tr>
                <tr><td>AGV搬运车</td><td>直流伺服/BLDC</td><td>200-500W, 带编码器</td><td>松下/安川伺服</td></tr>
                <tr><td>云台/摄像头转向</td><td>舵机</td><td>1.8-11 kg·cm</td><td>SG90/MG90S</td></tr>
                <tr><td>六足机器人</td><td>总线舵机</td><td>多自由度, 需反馈</td><td>Dynamixel AX-12A</td></tr>
                <tr><td>电动自行车</td><td>无刷中置/轮毂电机</td><td>250-500W</td><td>36V/48V BLDC + 控制器</td></tr>
                <tr><td>工业机械臂</td><td>交流伺服</td><td>400W-5kW, 绝对编码器</td><td>汇川/安川/安川伺服</td></tr>
                <tr><td>电梯/升降</td><td>交流异步/永磁同步</td><td>5-30kW</td><td>变频器 + 三相异步电机</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        title: '各类型电机优缺点对比',
        icon: '⚖️',
        desc: '全面对比各类型电机的性能与适用场景',
        tags: ['对比', '选型'],
        content: `
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>电机类型</th><th>优点</th><th>缺点</th><th>最适合场景</th><th>价格区间</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>有刷直流电机</strong></td>
                  <td>控制最简单、成本低、启动扭矩大</td>
                  <td>电刷磨损、寿命短、有火花干扰、效率低</td>
                  <td>玩具、小家电、教育实验</td>
                  <td>¥1-50</td>
                </tr>
                <tr>
                  <td><strong>无刷BLDC</strong></td>
                  <td>效率高、寿命长、功率密度大、噪声小</td>
                  <td>需电子驱动器、控制复杂、成本高</td>
                  <td>无人机、电动工具、电动车</td>
                  <td>¥50-500+</td>
                </tr>
                <tr>
                  <td><strong>步进电机</strong></td>
                  <td>开环定位精确、控制简单、低速扭矩大</td>
                  <td>高速扭矩下降、可能丢步、效率较低</td>
                  <td>3D打印、CNC、自动化设备</td>
                  <td>¥10-200</td>
                </tr>
                <tr>
                  <td><strong>伺服电机</strong></td>
                  <td>精度极高、响应快、力矩控制好、不丢步</td>
                  <td>价格高、需要编码器+驱动器、调试复杂</td>
                  <td>工业机器人、CNC机床、AGV</td>
                  <td>¥500-50000+</td>
                </tr>
                <tr>
                  <td><strong>舵机</strong></td>
                  <td>即插即用、内置闭环、体积小价格低</td>
                  <td>角度受限、扭矩小、电位器会磨损</td>
                  <td>RC模型、机器人关节、云台</td>
                  <td>¥5-250</td>
                </tr>
                <tr>
                  <td><strong>交流异步电机</strong></td>
                  <td>结构简单坚固、成本低、维护方便</td>
                  <td>速度控制难、功率因数低、效率中等</td>
                  <td>风机水泵、压缩机、传送带</td>
                  <td>¥100-10000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2)">
            <h4 class="font-medium mb-2" style="color:var(--primary)">选型决策树</h4>
            <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>需要精确定位？</strong> → 是 → 预算充足？ → 是 → <strong>伺服电机</strong> / 否 → <strong>步进电机</strong></li>
              <li><strong>需要精确定位？</strong> → 否 → 需要连续旋转控制？ → 是 → 功率大？ → 是 → <strong>BLDC/伺服</strong> / 否 → <strong>有刷直流</strong></li>
              <li><strong>需要角度控制(≤180°)？</strong> → <strong>舵机</strong></li>
              <li><strong>工业级大功率？</strong> → <strong>交流异步/永磁同步 + 变频器/伺服驱动器</strong></li>
            </ul>
          </div>
        `
      },
      {
        title: '电机驱动芯片与开发平台',
        icon: '🔧',
        desc: '常用电机驱动IC和开源平台',
        tags: ['硬件', '开发'],
        content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">电机驱动是连接MCU和电机的桥梁。选择合适的驱动方案，直接影响控制效果和开发效率。</p>
          <h4 class="font-medium mb-2">常用驱动芯片/模块</h4>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>芯片/模块</th><th>适用电机</th><th>电压</th><th>电流</th><th>接口</th><th>价格</th></tr></thead>
              <tbody>
                <tr><td>L298N</td><td>有刷直流(2路)</td><td>5-46V</td><td>2A/路</td><td>GPIO(方向)+PWM</td><td>~¥8</td></tr>
                <tr><td>TB6612FNG</td><td>有刷直流(2路)</td><td>2.5-13.5V</td><td>1.2A/路</td><td>GPIO+PWM</td><td>~¥5</td></tr>
                <tr><td>DRV8825</td><td>步进(1路)</td><td>8.2-45V</td><td>1.5A</td><td>STEP/DIR</td><td>~¥6</td></tr>
                <tr><td>A4988</td><td>步进(1路)</td><td>8-35V</td><td>1A(2A峰值)</td><td>STEP/DIR</td><td>~¥5</td></tr>
                <tr><td>TMC2209</td><td>步进(1路,静音)</td><td>5.5-29V</td><td>1.2A</td><td>UART/STEP_DIR</td><td>~¥12</td></tr>
                <tr><td>DRV8302</td><td>BLDC/PMSM(3路)</td><td>6-60V</td><td>2.5A</td><td>6路PWM(PWM+INA/INB)</td><td>~¥15</td></tr>
                <tr><td>IR2136</td><td>BLDC三相栅驱</td><td>12-600V</td><td>200mA栅驱</td><td>6路PWM</td><td>~¥8</td></tr>
                <tr><td>PCA9685</td><td>舵机(16路)</td><td>-</td><td>-</td><td>I2C</td><td>~¥10</td></tr>
              </tbody>
            </table>
          </div>
          <h4 class="font-medium mb-2">开源FOC开发平台</h4>
          <div class="overflow-x-auto mb-4">
            <table class="compare-table">
              <thead><tr><th>平台</th><th>MCU</th><th>特点</th><th>适合阶段</th></tr></thead>
              <tbody>
                <tr><td><strong>SimpleFOC</strong></td><td>Arduino/STM32/ESP32</td><td>开源、C++库、FOC完整实现、社区活跃</td><td>FOC入门首选</td></tr>
                <tr><td><strong>ODrive</strong></td><td>STM32F405</td><td>高性能双通道、闭环支持、Python工具链</td><td>机器人关节/云台</td></tr>
                <tr><td><strong>VESC</strong></td><td>STM32F405</td><td>电调级性能、BLDC+FOC、参数丰富</td><td>电动车/高性能驱动</td></tr>
                <tr><td><strong>DengFOC</strong></td><td>STM32G4</td><td>国产开源、硬件便宜、中文文档好</td><td>国内FOC入门推荐</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        title: '电机行业职业路径',
        icon: '👨‍💻',
        desc: '电机控制领域的职业方向和发展路径',
        tags: ['职业', '发展'],
        content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">电机控制是嵌入式系统与电力电子的交叉领域，就业面广、需求稳定。以下是从入门到专家的职业发展路径。</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">1. 电机驱动工程师（嵌入式）</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>做什么：</strong>编写电机驱动固件，调试FOC/PID控制算法，实现通信协议(CAN/Modbus)。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>技能要求：</strong>C语言、STM32/ARM、PWM/GPIO/ADC操作、PID调试、FOC算法基础。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400"><strong>薪资范围：</strong>应届8-15K → 3年经验15-25K → 资深25-40K+</p>
            </div>
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">2. 算法工程师（运动控制）</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>做什么：</strong>设计控制算法（FOC、无感控制、自适应PID）、系统建模与仿真。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>技能要求：</strong>控制理论（状态空间/频域）、MATLAB/Simulink、C/C++、电机建模。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400"><strong>薪资范围：</strong>应届12-20K → 3年经验20-35K → 资深35-60K+</p>
            </div>
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">3. 电力电子硬件工程师</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>做什么：</strong>设计逆变器/驱动板硬件（功率MOSFET/IGBT选型、栅极驱动、PCB Layout、EMC设计）。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>技能要求：</strong>电路原理、功率器件选型、PCB设计(Altium/AD)、EMC/EMI设计。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400"><strong>薪资范围：</strong>应届8-15K → 3年经验15-30K → 资深30-50K+</p>
            </div>
            <div class="p-4 rounded-lg" style="background:var(--bg-secondary)">
              <h4 class="font-medium mb-2">4. 机器人/自动化工程师</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>做什么：</strong>使用伺服/步进/舵机搭建运动系统，实现轨迹规划、多轴联动。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>技能要求：</strong>运动学建模、ROS/ROS2、多轴协调控制、电机选型与集成。</p>
              <p class="text-sm text-gray-600 dark:text-gray-400"><strong>薪资范围：</strong>应届10-18K → 3年经验18-30K → 资深30-50K+</p>
            </div>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2)">
            <h4 class="font-medium mb-2">学习建议（给新手）</h4>
            <ol class="text-sm space-y-1 text-gray-600 dark:text-gray-400 list-decimal pl-5">
              <li><strong>基础阶段</strong>（1-3月）：C语言扎实 → 51单片机/Arduino点亮LED → GPIO/PWM/Timer基础</li>
              <li><strong>电机入门</strong>（1-2月）：有刷直流电机 + L298N → 理解PWM调速 → 加编码器测速</li>
              <li><strong>进阶控制</strong>（2-3月）：STM32 HAL开发 → 步进电机 + A4988 → 舵机PWM控制</li>
              <li><strong>FOC专精</strong>（3-6月）：学习Clarke/Park变换 → SimpleFOC/ODrive实操 → FOC调试</li>
              <li><strong>项目实战</strong>：做一个完整项目（如自平衡小车、机械臂、云台），这是简历加分项</li>
            </ol>
          </div>
        `
      },
      {
        title: '国产 vs 进口品牌对比与选型避坑',
        icon: '🏭',
        desc: '主流电机/驱动器品牌对比、产业链格局、选型避坑经验',
        tags: ['选型', '行业'],
        content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">选电机和驱动器时，品牌选择直接影响性能、价格和售后。下面按品类梳理主流品牌格局和实战避坑经验。</p>

          <h4 class="font-medium mt-4 mb-2">伺服电机及驱动器（工业级）</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>阵营</th><th>代表品牌</th><th>价位(400W)</th><th>特点</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">日系高端</td><td>安川、松下、三菱</td><td>3000~6000元</td><td>精度极高、稳定性强、调试软件完善</td></tr>
              <tr><td class="font-medium">欧系</td><td>西门子、倍福、伦茨</td><td>4000~8000元</td><td>总线生态(EtherCAT)强、适合产线集成</td></tr>
              <tr><td class="font-medium">台系</td><td>台达、东元</td><td>2000~3500元</td><td>性价比高、中文文档好</td></tr>
              <tr><td class="font-medium">国产主流</td><td>汇川、埃斯顿、禾川</td><td>1200~2500元</td><td>性价比极高、国产替代主力、售后快</td></tr>
              <tr><td class="font-medium">国产入门</td><td>步科、德马克、鸣志</td><td>600~1500元</td><td>DIY/小型设备够用，参数手册可能粗糙</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">步进电机及驱动（DIY/小型设备）</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>品类</th><th>代表品牌</th><th>特点</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">步进电机</td><td>雷赛、鸣志、美莱特</td><td>国产质量已成熟，NEMA17(42)约30~80元</td></tr>
              <tr><td class="font-medium">步进驱动</td><td>TMC2209/5160(德纳普)、雷赛DM系列</td><td>TMC系列静音+细分好；雷赛稳定可靠</td></tr>
              <tr><td class="font-medium">闭环步进</td><td>鸣志、雷赛闭环系列</td><td>加编码器防丢步，介于步进和伺服之间</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">无刷电机及ESC（航模/机器人）</h4>
          <div class="overflow-x-auto mb-3"><table class="compare-table">
            <thead><tr><th>品类</th><th>代表品牌</th><th>适用</th></tr></thead>
            <tbody>
              <tr><td class="font-medium">云台/机械臂BLDC</td><td>GBM、Buke、ODrive官方</td><td>低KV大扭矩，配SimpleFOC/ODrive</td></tr>
              <tr><td class="font-medium">穿越机电机</td><td>T-Motor、iFlight、HGLRC</td><td>高KV高转速，配Betaflight ESC</td></tr>
              <tr><td class="font-medium">开源驱动器</td><td>ODrive、VESC、SimpleFOC、DengFOC</td><td>学习/原型首选，文档社区完善</td></tr>
            </tbody>
          </table></div>

          <h4 class="font-medium mt-4 mb-2">选型避坑十条（实战经验）</h4>
          <div class="info-box warning"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div>
            <strong>① 标称参数水分</strong>：部分国产小厂参数虚标（如扭矩标的是峰值而非额定），要求卖家提供<strong>额定工况下的扭矩-转速曲线</strong>。<br>
            <strong>② 编码器分辨率陷阱</strong>：伺服标"17位编码器"可能指增量而非绝对，绝对比增量贵30%+，机械臂必须绝对。<br>
            <strong>③ 驱动器兼容性</strong>：国产伺服的CANopen实现可能与标准有偏差，跨品牌混用前先问技术支持。<br>
            <strong>④ 步进电机标称电流</strong>：是相电流，不是总线电流。两相串联总电流 = 相电流，并联 = 2×相电流。<br>
            <strong>⑤ KV值不等于速度</strong>：同KV电机，电压不同转速差很多。比的是"每伏空载转速"，实际带载转速更低。<br>
            <strong>⑥ 散热被忽略</strong>：步进电机静止时满电流发热大，连续工作需配散热片或选<strong>空闲降流型驱动</strong>。<br>
            <strong>⑦ 电源功率余量</strong>：驱动器瞬间电流(加速/堵转)可达额定的3~5倍，电源要按2倍额定功率选。<br>
            <strong>⑧ 线缆质量</strong>：编码器线、霍尔线要<strong>双绞屏蔽</strong>，劣质线在电机旁会被干扰导致乱跳。<br>
            <strong>⑨ 售后与文档</strong>：选有<strong>中文手册+技术支持QQ/微信群</strong>的品牌，出问题能找到人。<br>
            <strong>⑩ 先买样品再批量</strong>：任何新品牌先买1~2个样品实测（扭矩、温升、精度），达标再批量采购。
          </div></div>

          <h4 class="font-medium mt-4 mb-2">产业链格局（电机控制相关）</h4>
          <div class="step-list">
            <div class="step-item"><div><strong>上游芯片</strong>：MOS管(英飞凌/安森美/士兰微)、MCU(ST/GD/兆易)、电流检测运放(TI INA系列)、驱动IC(IR/TI)。国产替代在加速。</div></div>
            <div class="step-item"><div><strong>中游模组</strong>：电机厂(汇川/鸣志/雷赛)、驱动器厂、编码器厂(多摩川/海德汉/国产瑞普)。</div></div>
            <div class="step-item"><div><strong>下游集成</strong>：机器人(埃斯顿/新松)、数控(大连机床/北京精雕)、新能源(汇川在电动车电控份额很高)。</div></div>
          </div>
          <div class="info-box tip mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><strong>国产替代趋势</strong>：伺服领域汇川/埃斯顿已能替代安川/松下80%场景，价格是进口的一半。BLDC驱动ODrive/VESC开源生态让DIY门槛大降。学习阶段建议<strong>用开源(ODrive/SimpleFOC)+国产电机</strong>，成本最低且社区支持好。</div></div>
        `
      },
    ],
  },

  // ========== 电机对比数据 ==========
  compareTable: {
    headers: ['参数', '有刷直流', '无刷BLDC', '步进电机', '伺服电机', '舵机'],
    rows: [
      ['控制方式', '开环(PWM)', '闭环(FOC/六步)', '开环(脉冲)', '闭环(PID/FOC)', '内置闭环'],
      ['反馈类型', '无', '霍尔/编码器', '无(开环)', '高精度编码器', '电位器'],
      ['定位精度', '低', '中-高', '高(可能丢步)', '极高', '中'],
      ['效率', '60-75%', '85-95%', '30-50%', '80-92%', '30-50%'],
      ['转速范围', '低-中', '宽', '低', '宽', 'N/A(角度)'],
      ['扭矩特性', '中', '高且平坦', '低速高', '高', '中'],
      ['典型驱动芯片', 'L298N/TB6612', 'ESC/ODrive/VESC', 'A4988/TMC2209', '专用伺服驱动器', 'PWM信号线'],
      ['价格范围', '¥5-30', '¥30-200', '¥20-80', '¥500-5000', '¥5-30'],
      ['寿命', '短(电刷磨损)', '长', '长', '长', '中(电位器磨损)'],
      ['控制复杂度', '简单', '复杂', '简单', '复杂', '极简'],
      ['典型应用', '玩具、家电', '无人机、电动工具', '3D打印、CNC', '工业机器人', 'RC模型、机器人关节'],
    ],
  },

  // ========== 学习路径 ==========
  roadmap: {
    phases: [
      {
        title: '第一阶段：理论基础',
        duration: '1-3个月',
        items: [
          '电路基础（欧姆定律、基尔霍夫定律）',
          '电磁学基础（安培力、法拉第定律）',
          '电机学（各类电机结构与原理）',
          '推荐教材：《电机与拖动》刘锦波',
        ],
        exercises: [
          '用万用表测量一个旧电机的电阻、空载电流，估算其额定参数',
          '手转电机+示波器看反电动势波形，判断是有刷还是无刷',
        ],
        links: ['beginner-em', 'beginner-params', 'beginner-classify'],
      },
      {
        title: '第二阶段：控制理论 + 单片机入门',
        duration: '2-4个月',
        items: [
          '经典控制理论（PID、传递函数、阶跃响应）',
          'PWM驱动 + H桥电路',
          '编码器/霍尔反馈原理',
          '推荐资源：SimpleFOC中文官网 + B站视频',
        ],
        exercises: [
          'STM32+L298N让有刷电机匀速转，PWM调4档速度',
          '接编码器，串口输出实时RPM，验证M法测速',
          '用Matlab沙盒或本地仿真验证PID参数，再移植到MCU',
        ],
        links: ['beginner-drive', 'advanced-pid', 'advanced-pid-impl', 'encoder', 'matlab-sim'],
      },
      {
        title: '第三阶段：电机控制实战',
        duration: '3-6个月',
        items: [
          'SimpleFOC + 云台电机 实现FOC闭环',
          'Arduino + A4988 控制步进电机（含加减速）',
          'BLDC六步换向 + 霍尔传感器',
          '推荐平台：Arduino → STM32G4',
        ],
        exercises: [
          '步进电机走固定步数，用编码器验证是否丢步（量化精度）',
          'FOC开环让电机平滑转→闭环Id=0→加力矩控制，逐级验证',
          '用串口输出Id/Iq波形，对照工程验证方法论的指标判定',
        ],
        links: ['bldc-commutation', 'foc-impl', 'current-sense', 'engineering-validation'],
      },
      {
        title: '第四阶段：机器人与系统集成',
        duration: '持续学习',
        items: [
          '运动学（正逆解）+ 轨迹规划',
          '多轴协调 + ROS/micro-ROS 桥接',
          '无感控制（SMO、HFI）',
          '模型预测控制（MPC）/ 新能源汽车电驱',
        ],
        exercises: [
          '搭建2-3自由度机械臂，用逆运动学控制末端走直线',
          'MCU做实时位置环 + 上位机Python做轨迹规划，串口通信',
          '尝试无感启动：预定位→强拖→切SMO闭环',
        ],
        links: ['kinematics', 'trajectory', 'mcu-ros', 'matlab-sim', 'advanced-sensorless'],
      },
    ],
    books: [
      { title: '《电机与拖动》', author: '刘锦波', level: '入门', desc: '清华版经典教材，适合入门' },
      { title: '《电力拖动自动控制系统》', author: '陈伯时', level: '进阶', desc: '运动控制系统经典教材' },
      { title: '《现代永磁同步电机控制原理及MATLAB仿真》', author: '袁雷', level: '进阶', desc: 'FOC实战必读' },
      { title: '《电机学》', author: '各高校通用', level: '基础', desc: '电磁理论基础' },
    ],
    devboards: [
      { name: 'Arduino UNO + L298N', price: '~¥80', use: '有刷电机入门' },
      { name: 'Arduino + SimpleFOC Shield', price: '~¥200', use: 'BLDC FOC入门' },
      { name: 'ESP32 + DengFOC', price: '~¥150', use: '双路FOC、WiFi' },
      { name: 'STM32G4 Nucleo', price: '~¥100', use: '专业电机控制MCU' },
      { name: 'TI C2000 LaunchPad', price: '~¥200', use: '工业级方案' },
    ],
  },

  // ========== 计算器公式 ==========
  calculators: [
    {
      id: 'power',
      title: '功率计算',
      fields: [
        { id: 'torque', label: '转矩 (N·m)', default: '0.5' },
        { id: 'speed', label: '转速 (RPM)', default: '3000' },
      ],
      formula: 'P = T × 2πn/60',
      calc: (v) => (v.torque * 2 * Math.PI * v.speed / 60).toFixed(2),
      unit: 'W',
    },
    {
      id: 'kv-speed',
      title: 'KV值转速计算',
      fields: [
        { id: 'kv', label: 'KV值 (RPM/V)', default: '1000' },
        { id: 'voltage', label: '电压 (V)', default: '11.1' },
      ],
      formula: 'n = KV × V',
      calc: (v) => (v.kv * v.voltage).toFixed(0),
      unit: 'RPM',
    },
    {
      id: 'steps-per-mm',
      title: '3D打印机步进电机设置',
      fields: [
        { id: 'steps_rev', label: '每转步数', default: '200' },
        { id: 'microstep', label: '细分倍数', default: '16' },
        { id: 'pitch', label: '丝杆导程 (mm)', default: '8' },
      ],
      formula: 'Steps/mm = (steps_per_rev × microstep) / pitch',
      calc: (v) => (v.steps_rev * v.microstep / v.pitch).toFixed(2),
      unit: 'steps/mm',
    },
    {
      id: 'duty-cycle',
      title: 'PWM平均电压计算',
      fields: [
        { id: 'vcc', label: '电源电压 (V)', default: '12' },
        { id: 'duty', label: '占空比 (%)', default: '50' },
      ],
      formula: 'V_avg = V_cc × Duty',
      calc: (v) => (v.vcc * v.duty / 100).toFixed(2),
      unit: 'V',
    },
    {
      id: 'kt-ke',
      title: '转矩常数 Kt / 反电动势常数 Ke 换算',
      fields: [
        { id: 'ke', label: '反电动势常数 Ke (V·s/rad)', default: '0.01' },
      ],
      formula: 'Kt = 9.549 × Ke  (SI单位下 Kt ≈ Ke)',
      calc: (v) => (v.ke * 9.549).toFixed(4),
      unit: 'N·m/A',
    },
    {
      id: 'encoder-rpm',
      title: '编码器脉冲→转速 (M法)',
      fields: [
        { id: 'ppr', label: '编码器PPR (脉冲/转)', default: '1000' },
        { id: 'mult', label: '倍频数', default: '4' },
        { id: 'pulses', label: '采样周期内脉冲数', default: '800' },
        { id: 'period', label: '采样周期 (秒)', default: '0.01' },
      ],
      formula: 'RPM = (脉冲数 / (PPR×倍频)) / 周期 × 60',
      calc: (v) => (v.pulses / (v.ppr * v.mult) / v.period * 60).toFixed(1),
      unit: 'RPM',
    },
    {
      id: 'gear-ratio',
      title: '减速比 → 输出扭矩/转速',
      fields: [
        { id: 'ratio', label: '减速比 (如10=10:1)', default: '10' },
        { id: 'eff', label: '减速机效率 (%)', default: '90' },
        { id: 'in_torque', label: '输入扭矩 (N·m)', default: '0.5' },
      ],
      formula: 'T_out = T_in × ratio × η ;  n_out = n_in / ratio',
      calc: (v) => (v.in_torque * v.ratio * v.eff / 100).toFixed(2),
      unit: 'N·m (输出扭矩)',
    },
    {
      id: 'servo-ccr',
      title: '舵机角度→PWM CCR值',
      fields: [
        { id: 'arr', label: '定时器ARR值', default: '20000' },
        { id: 'min_us', label: '0°脉宽 (μs)', default: '500' },
        { id: 'max_us', label: '180°脉宽 (μs)', default: '2500' },
        { id: 'angle', label: '目标角度 (°)', default: '90' },
      ],
      formula: 'CCR = (min + (max-min) × angle/180) / 20000 × ARR',
      calc: (v) => ((v.min_us + (v.max_us - v.min_us) * v.angle / 180) / 20000 * v.arr).toFixed(0),
      unit: 'CCR值',
    },
  ],
};

// 自测题目数据
const QuizData = {
  'beginner-em': [
    { question: '通电导体在磁场中受到的力称为？', options: ['安培力（电磁力）', '法拉第力', '洛伦兹电动力', '库仑力'], answer: 0, explanation: '安培力公式 F = BIL sin(θ)，方向由左手定则确定。这就是电动机的基本工作原理。' },
    { question: '安培力公式 F = BIL sin(θ) 中，θ 代表什么？', options: ['电流方向与磁场的夹角', '导体长度与磁场的夹角', '温度', '时间'], answer: 0, explanation: 'θ 是电流方向与磁场方向（B）之间的夹角。当电流与磁场垂直时（θ=90°），安培力最大。' },
    { question: '法拉第电磁感应定律的数学表达式是？', options: ['F = BIL', 'E = -dΦ/dt', 'P = UI', 'V = IR'], answer: 1, explanation: 'E = -dΦ/dt，感应电动势等于磁通量变化率的负值。负号体现楞次定律——感应电动势的方向阻碍磁通量变化。' },
    { question: '左手定则用于判断什么？', options: ['感应电动势方向', '通电导体受力方向（电动机）', '磁力线方向', '电流大小'], answer: 1, explanation: '左手定则（安培定则）用于电动机——磁感线穿入手心，四指指向电流方向，大拇指指向受力方向。右手定则用于发电机。' },
  ],
  'beginner-classify': [
    { question: '无刷直流电机（BLDC）的核心特点是什么？', options: ['使用机械换向器', '用电子电路实现换向', '只能单向旋转', '效率低于有刷电机'], answer: 1, explanation: 'BLDC 去掉了机械电刷和换向器，通过电子控制器（如FOC驱动器）实现电流换向，因此效率高、寿命长。' },
    { question: '步进电机最适合的应用场景是？', options: ['高速连续旋转', '精确位置控制', '大功率输出', '宽调速范围'], answer: 1, explanation: '步进电机通过脉冲信号精确控制角位移，无需位置反馈即可实现精确定位。是3D打印机和CNC的首选。' },
    { question: '以下哪种电机属于闭环控制？', options: ['步进电机', '有刷直流电机', '伺服电机', '开关磁阻电机'], answer: 2, explanation: '伺服电机配备编码器进行位置反馈，驱动器根据偏差进行闭环PID控制，不会出现丢步问题。' },
  ],
  'beginner-params': [
    { question: '功率 P = T × ω 中，ω 的单位是？', options: ['RPM', 'rad/s（弧度/秒）', 'N·m', 'W'], answer: 1, explanation: 'ω 是角速度，单位 rad/s。当转速用 RPM 表示时，转换公式为 ω = 2πn/60。' },
    { question: 'KV值在哪种电机中最常用？', options: ['有刷直流电机', '无刷直流电机（BLDC）', '步进电机', '伺服电机'], answer: 1, explanation: 'KV值（RPM/V）是无刷电机的重要参数，表示每增加1V电压，空载转速增加多少RPM。KV=1000的电机在11.1V下空载约11100RPM。' },
    { question: '电机效率的定义是？', options: ['输入电压/输出电压', '输出功率/输入功率 × 100%', '转矩/转速', '电流/电压'], answer: 1, explanation: '效率 η = P_输出 / P_输入 × 100%。有刷电机效率60-75%，无刷电机效率85-95%。' },
  ],
  'beginner-drive': [
    { question: 'H桥电路由几个开关管组成？', options: ['2个', '3个', '4个', '6个'], answer: 2, explanation: 'H桥由4个开关管（MOSFET或三极管）组成"H"形状，通过控制对角线开关管实现正转、反转、制动。' },
    { question: 'PWM占空比为25%时，电机两端平均电压为电源电压的多少？', options: ['25%', '50%', '75%', '100%'], answer: 0, explanation: 'V_avg = D × V_cc = 0.25 × V_cc。占空比直接等于平均电压占电源电压的比例。' },
  ],
  'advanced-pid': [
    { question: 'PID中"I"（积分）项的主要作用是？', options: ['加快响应速度', '消除稳态误差', '抑制超调', '预测误差变化'], answer: 1, explanation: '积分项累积历史误差，当存在持续的稳态误差时，积分不断增大直到消除偏差。但可能导致积分饱和。' },
    { question: '电机电流环控制通常使用什么控制器？', options: ['PID', 'PI', 'PD', 'P'], answer: 1, explanation: '由于电流采样噪声较大，微分项(D)会放大噪声，因此电机电流环几乎都只使用PI控制。' },
  ],
  'advanced-pid-impl': [
    { question: '相比位置式PID，增量式PID的主要优势是？', options: ['响应速度更快', '天然无积分饱和问题、掉电无冲击', '计算量更小', '不需要微分项'], answer: 1, explanation: '增量式输出的是Δu而非累积绝对值，没有 integral 累加器，因此不会积分饱和；掉电重启也不会有累积值冲击，特别适合步进电机。代价是调用方要自己累加输出。' },
    { question: '积分饱和（Windup）会导致什么现象？', options: ['稳态误差变大', '执行机构饱和时积分持续累积，误差反向后需要很久才能"卸下来"，导致严重超调', '系统完全失控振荡', '微分项被放大'], answer: 1, explanation: '当输出到达限幅（如PWM满量程）后，若积分仍在累加，误差反向时积分项已变得很大，需要长时间才能减下来，表现为"超调大、恢复慢"。钳位法通过停止饱和时的积分累加来解决。' },
    { question: 'Q15定点PID最适合用在哪种平台？', options: ['STM32F4 (Cortex-M4F，有FPU)', 'STM32F103 (Cortex-M3，无FPU)', 'ESP32 (双核，有FPU)', '树莓派 (Linux)', ], answer: 1, explanation: 'Cortex-M0/M0+/M3 没有硬件浮点单元，float 运算靠软件模拟（几十个时钟周期）。Q15用int16运算可提速5-10倍。有FPU的M4F/M7直接用浮点版即可。' },
    { question: '三环串级PID（位置-速度-电流）的正确调试顺序是？', options: ['从位置环到电流环（外到内）', '从电流环到位置环（内到外）', '三环同时调试', '随机顺序都行'], answer: 1, explanation: '必须先调内环（电流环），保证它又快又稳后，外环（速度环）才有可靠的"执行器"；再调速度环；最后调最外的位置环。内环带宽约为外环的5~10倍。' },
  ],
  'encoder': [
    { question: '一个1000 PPR的增量编码器，4倍频后的实际分辨率是多少？', options: ['1000 脉冲/转', '2000 脉冲/转', '4000 脉冲/转', '8000 脉冲/转'], answer: 2, explanation: '4倍频同时检测A、B两相的上升沿和下降沿，每个PPR产生4个计数。1000 PPR × 4 = 4000 脉冲/转，分辨率 = 360°/4000 = 0.09°。' },
    { question: 'STM32读取编码器CNT时，为什么要在固定周期累加到32位变量？', options: ['提高精度', '解决16位CNT连续转动会溢出回卷的问题，否则位置会突变几万', '加快读取速度', '节省内存'], answer: 1, explanation: 'TIM的CNT是16位（最大65535），电机转超过一圈就会回卷。必须在1ms等固定周期频繁采样，把每次的16位增量累加到32位总位置，才能得到连续不突变的位置值。' },
    { question: 'M法测速适合什么场景？', options: ['极低速', '中高速', '只能用于绝对编码器', '只能测角度不能测速度'], answer: 1, explanation: 'M法是"固定时间数脉冲"，高速时一个周期内脉冲多，统计误差小；低速时脉冲稀少（可能一个周期0个脉冲），误差极大。低速应用T法（测一个脉冲的周期）。' },
    { question: '机械臂关节为什么优先选绝对编码器而非增量编码器？', options: ['绝对编码器更便宜', '上电即知位置、无需找零，断电不丢位', '绝对编码器分辨率更低', '增量编码器不能测角度'], answer: 1, explanation: '绝对编码器每个位置对应唯一的数字码，上电直接读出角度，无需"回零"动作。机械臂断电后关节位置保持，增量编码器会丢失参考点。代价是绝对编码器更贵、接口更复杂。' },
  ],
  'bldc-commutation': [
    { question: '六步换向中，一个电角度周期（360°）被划分成几个区间？', options: ['3个（120°）', '6个（60°）', '12个（30°）', '360个（1°）'], answer: 1, explanation: '六步换向把360°电角度按60°分成6个区间，每个区间内两相通电、一相悬空。3个霍尔传感器（相位错开120°）的组合正好产生6个有效状态，对应这6个区间。' },
    { question: '三相桥的上下两个MOS管为什么绝不能同时导通？', options: ['会降低效率', '会导致电源直通短路，瞬间烧毁MOS管', '会让电机反转', '会产生电磁干扰'], answer: 1, explanation: '同相上下管同时导通=电源经两个管子直接短路（"直通"），电流只受管子内阻限制，可达几十上百安培，瞬间烧管。用互补PWM+死区时间（切换瞬间两管都关一小段时间）防止。' },
    { question: 'BLDC换向表调试时，电机反转，最可能的原因是？', options: ['死区时间太短', '任意两相（或两个霍尔）接反/顺序错误', 'PWM频率太低', '电流设置过小'], answer: 1, explanation: '三相相序（UVW vs UWV）或霍尔顺序决定了旋转方向。交换换向表里两列、或对调两根相线/两个霍尔，旋转方向就会反转。这是最常见的调试问题。' },
    { question: '六步换向相比FOC的主要缺点是？', options: ['算法太复杂', '力矩有脉动（每60°跳变一次，电机有哒哒感）', '不能调速', '必须用绝对编码器'], answer: 1, explanation: '六步换向是梯形波控制，每60°电流方向突变一次，力矩不连续，低速时尤其明显。FOC用正弦波连续控制，力矩平滑。但六步实现简单、对硬件要求低，是入门无刷控制的首选。' },
  ],
  'foc-impl': [
    { question: 'FOC电流环中，Id参考值通常设为0的目的是？', options: ['节省电能', '实现最大转矩/电流比（MTPA），因为永磁体已提供磁场', '降低电机温度', '提高PWM频率'], answer: 1, explanation: '在表贴式永磁电机(SPM)中，永磁体已建立磁场，Id=0意味着不产生额外励磁（不削弱也不增强磁场），此时单位电流产生的转矩最大，即最大转矩/电流比(MTPA)。Iq则决定实际输出转矩。' },
    { question: 'FOC采样相电流时，为什么必须在PWM下桥臂导通的中点采样？', options: ['中点电压最稳定', '此时电流值最稳定，避免采到开关噪声', '中点ADC精度高', '减少CPU占用'], answer: 1, explanation: 'PWM开关瞬间电流剧烈跳变（开关噪声）。下桥臂导通期间电流通过下管形成回路，值最稳定。在PWM周期中点采样，避开了开关边沿，能采到真实的相电流平均值。STM32用TIM TRGO触发ADC实现自动同步。' },
    { question: 'Clarke变换和Park变换的作用分别是？', options: ['Clarke把三相变两相，Park把交流变直流', '两者都是降低电压', 'Clarke调速，Park换向', '两者顺序可以互换'], answer: 0, explanation: 'Clarke变换把三相静止(abc)→两相静止(αβ)，减少维度；Park变换把两相静止(αβ)→两相旋转(dq)，通过跟随转子旋转把交流量变成直流量，这样才能用PI控制器(PI只擅长控直流量)。' },
    { question: 'SVPWM相比传统SPWM的主要优势是？', options: ['代码更短', '直流母线电压利用率高约15.5%', '不需要死区', '采样更简单'], answer: 1, explanation: 'SVPWM通过合理分配零矢量时间，让三相电压矢量的合成幅值比SPWM大15.5%。意味着同样的母线电压下，SVPWM能让电机达到更高转速或输出更大转矩，是FOC的标准调制方式。' },
  ],
  'servo-control': [
    { question: '脉冲/方向控制伺服时，"电子齿轮比"的作用是？', options: ['调节电机转速', '决定1个脉冲对应多少角度（位置分辨率）', '降低电机噪音', '限制最大电流'], answer: 1, explanation: '电子齿轮比把MCU发的脉冲数映射到编码器分辨率。例如编码器10000线，设齿轮比让10000脉冲=1圈，则1脉冲=0.036°。MCU端只管发脉冲数，不用关心伺服内部编码器分辨率，灵活适配不同伺服。' },
    { question: 'CANopen DS402协议中，controlword(6040h)的作用是？', options: ['设置目标位置', '控制伺服启停、模式切换、故障复位', '读取编码器位置', '设置PWM占空比'], answer: 1, explanation: 'controlword是16位命令字，通过位组合实现伺服的使能/失能、运行模式切换、故障复位等。statusword(6041h)则是伺服反馈的状态。两者配合实现DS402状态机控制。' },
    { question: 'DS402伺服的标准使能流程顺序是？', options: ['直接使能运行', 'SHUTDOWN→SWITCH_ON→ENABLE_OP，逐步等待状态字确认', '发一个使能命令即可', '通过模拟电压使能'], answer: 1, explanation: 'DS402状态机要求逐步切换：先发SHUTDOWN等"准备就绪"，再发SWITCH_ON等"已接通"，最后发ENABLE_OP进入"运行使能"。每一步都要读statusword确认到位，跳步会导致使能失败。' },
    { question: '多轴机械臂要实现μs级同步运动，应选哪种通信？', options: ['脉冲/方向', '模拟量', 'CANopen', 'EtherCAT'], answer: 3, explanation: 'EtherCAT用"飞读"机制，一帧数据依次穿过所有从站，同步精度可达μs级甚至亚μs，是多轴机械臂、数控机床的高端标配。CANopen同步在ms级，够用但不如EtherCAT。脉冲方向每轴占独立资源，不适合多轴。' },
  ],
  'kinematics': [
    { question: '正运动学(FK)和逆运动学(IK)分别解决什么问题？', options: ['FK:关节角→末端位置；IK:末端位置→关节角', 'FK:末端→关节；IK:关节→末端', '两者都是求速度', '两者完全等价'], answer: 0, explanation: 'FK已知各关节角度，算末端执行器在笛卡尔空间的坐标(正向推演，简单)。IK是反过来：给定目标xyz坐标，求各关节该转多少度。IK更难，因为可能多解(肘上/肘下)、无解(超出工作半径)或奇异(边缘卡顿)。' },
    { question: '2-DOF平面臂逆运动学中，"肘上/肘下"两种解对应什么？', options: ['电机的转向', 'arccos的±号，对应连杆两种弯曲姿态', '编码器的零点', 'PID的正反作用'], answer: 1, explanation: 'θ2 = ±arccos(...)的±号产生两种解：连杆向"上"弯或向"下"弯。对应机械臂的两种物理姿态。实际应用中要根据关节限位、避障、最短路径等约束选最优解。' },
    { question: '逆运动学返回"目标不可达"的原因通常是？', options: ['电机故障', '目标点超出工作半径(L1+L2)或太近(<|L1-L2|)', 'PID参数错误', '通信故障'], answer: 1, explanation: '两连杆长度L1、L2，末端能到达的最远距离是L1+L2(完全伸直)，最近是|L1-L2|(完全折叠)。超出这个环形的区域，物理上连杆够不到，IK返回不可达。设计机械臂时要根据工作空间选连杆长度。' },
  ],
  'trajectory': [
    { question: '机械臂为什么要做轨迹规划，而不是直接命令电机到目标位置？', options: ['省电', '避免冲击和超调，让运动平滑可控', '降低成本', '简化代码'], answer: 1, explanation: '直接给目标位置，电机会猛冲(机械冲击)或PID跟不上导致超调震荡。轨迹规划生成从起点到终点的平滑曲线(如梯形速度)，电机按时间逐点跟踪，运动平稳。本质是给位置环一个"可跟随"的目标序列。' },
    { question: '多轴机械臂要"同时启动同时结束"，工程上怎么做？', options: ['每个轴用不同的加速度', '找出位移最大的轴算总时间，其它轴缩放速度共用同一总时间', '所有轴用相同速度', '逐轴依次运动'], answer: 1, explanation: '各轴位移不同，但必须同步到达(否则末端走偏)。方法：以位移最大的轴为基准算总时间，其它轴降低速度用相同的总时间运动。这样所有轴同时启动同时结束，末端走出预期轨迹。' },
    { question: '笛卡尔空间直线插补的完整流程是？', options: ['直接发关节角', '路径插值→速度规划→逆运动学换算→下发关节角', '只规划起点终点', '靠电机自己走直线'], answer: 1, explanation: '要让末端走直线：①在起终点间插值生成中间xyz点；②沿路径做梯形速度规划；③每个xyz点用逆运动学算关节角；④关节角下发各轴位置环。关节空间规划末端走的是曲线，只有笛卡尔规划才能走直线/圆弧。' },
  ],
  'mcu-ros': [
    { question: '机器人系统为什么普遍采用"MCU+Linux"双脑架构？', options: ['降低成本', 'MCU擅长硬实时(PWM/ADC)，Linux擅长规划感知，各取所长', '为了 redundancy 冗余', '法律要求'], answer: 1, explanation: 'MCU有硬实时(μs级中断)，适合电流环/编码器/PWM，但不擅长复杂计算。Linux算力强、生态丰富(视觉/SLAM/MoveIt)，但实时性差(ms级抖动)。双脑分工：MCU做实时控制，Linux做高层规划，是机器人系统的标准架构。' },
    { question: '在自定义串口协议里，为什么必须加CRC校验？', options: ['加快传输', '防止数据错乱导致电机误动作(丢字节/位翻转)', '节省带宽', '加密数据'], answer: 1, explanation: '串口传输可能丢字节、位翻转(电磁干扰)。若命令数据错了，电机会转到错误位置甚至撞限位。CRC16能检测绝大多数错误，校验失败的帧直接丢弃，保证只有完整正确的命令被执行。安全相关的控制协议必须有校验。' },
    { question: '从单片机工程师进阶到机器人开发，推荐的第一步是？', options: ['直接学ROS2', '把现有的单关节位置控制做扎实，用串口能稳定控一个电机', '买现成机械臂', '学机器学习'], answer: 1, explanation: '机器人是单关节控制的扩展。先把一个电机的位置控制做扎实(串口发角度→稳定转动→编码器反馈)，再扩展到多轴协调、轨迹规划、运动学，最后才上ROS。跳过基础直接上ROS会"空中楼阁"，调不动任何东西。' },
  ],
  'advanced-foc': [
    { question: 'FOC控制中，通常将Id设为多少？', options: ['最大值', '0', '与Iq相等', '负值'], answer: 1, explanation: '在表贴式永磁电机（SPM）中，设Id=0可以实现最大转矩/电流比（MTPA），因为磁场已由永磁体提供。' },
    { question: 'FOC的第一步坐标变换是什么？', options: ['Park变换', 'Clarke变换', '傅里叶变换', '拉普拉斯变换'], answer: 1, explanation: 'FOC流程：三相电流采样 → Clarke变换(abc→αβ) → Park变换(αβ→dq) → PI控制 → 反Park → SVPWM。' },
  ],
  'advanced-coord': [
    { question: 'Clarke变换的目的是？', options: ['将直流变为交流', '将三相变为两相', '将电压变为电流', '将转矩变为速度'], answer: 1, explanation: 'Clarke变换将三相静止坐标系(a,b,c)映射到两相静止坐标系(α,β)，减少一个维度，便于后续的Park变换。' },
    { question: 'Park变换后，原本随时间正弦变化的三相电流在dq坐标系下变成什么？', options: ['仍是正弦交流', '变为恒定的直流量', '变成零', '变得更大'], answer: 1, explanation: 'Park变换让坐标系跟随转子一起旋转，相对运动消失，原本旋转的交流量在dq里变成恒定直流量。这是FOC能用PI控制器的根本前提(PI擅长控直流量)。拖动本节交互图的θ，可看到右图Iq始终是常量。' },
  ],
  'advanced-sensorless': [
    { question: '无感控制在零速时为什么无法工作？', options: ['电机无法启动', '没有反电动势可检测', '编码器故障', '电流过大'], answer: 1, explanation: 'SMO等无感方法依赖反电动势来估算转子位置，而零速时反电动势为零。通常需要开环启动或高频注入（HFI）来启动。' },
  ],
  'advanced-multiloop': [
    { question: '三环串级控制中，应该最先调试哪个环？', options: ['位置环', '速度环', '电流环', '同时调试'], answer: 2, explanation: '调试顺序由内到外：先调电流环（响应最快）→ 再调速度环 → 最后调位置环。内环稳定后再调外环。' },
    { question: '电流环的带宽通常为？', options: ['10-100Hz', '100-500Hz', '1-10kHz', '10-100kHz'], answer: 2, explanation: '电流环（最内环）带宽最高，约1-10kHz。速度环约100-500Hz，位置环约10-100Hz。内环频率约为外环的10倍。' },
    { question: '弱磁控制(Field Weakening)通过什么方式让电机突破额定转速？', options: ['提高母线电压', '给d轴注入负向电流削弱气隙磁通，降低反电动势', '加大Iq电流', '降低PWM频率'], answer: 1, explanation: '转速升高时反电动势接近母线电压，电压"顶到天花板"。弱磁通过Id<0产生与永磁体相反的磁场，削弱合成磁通→降低反电动势→释放电压裕量→继续升速。代价是扭矩下降(恒功率区)且有退磁风险。' },
  ],
  'motor-stepper': [
    { question: '步进电机最常见的步距角是多少？', options: ['0.9°', '1.8°', '3.6°', '7.5°'], answer: 1, explanation: '混合式步进电机（最常用）的标准步距角为1.8°，即每转200步。这由转子50个齿和定子4相绕组决定。' },
    { question: 'A4988驱动模块的Vref电位器用于设置什么？', options: ['步距角', '电流限制', '细分模式', '脉冲频率'], answer: 1, explanation: 'Vref用于设定步进电机的电流上限。关系式：I_max = Vref / (8 × Rsense)。A4988的Rsense=0.1Ω，所以I_max = Vref/0.8。' },
    { question: '16细分模式下，每转需要的脉冲数为？', options: ['200', '800', '1600', '3200'], answer: 3, explanation: '细分 = 16，基础步数 = 200，总脉冲 = 200 × 16 = 3200。细分越高，运动越平滑，但高频脉冲对MCU要求更高。' },
    { question: '步进电机在高速时容易丢步的原因是？', options: ['电压太低', '转矩随转速下降到不足以克服负载', 'PWM频率不够', '编码器精度不足'], answer: 1, explanation: '步进电机的转矩-转速特性呈严重下降曲线。转速越高，反电动势越大，绕组电流来不及建立，导致转矩急剧下降，无法跟随脉冲而"丢步"。' },
    { question: 'TMC2209相比A4988的最大优势是？', options: ['支持更高电压', '静音模式(SpreadCycle/StealthChop)', '更大的驱动电流', '更小的体积'], answer: 1, explanation: 'TMC2209的StealthChop模式通过斩波算法大幅降低步进电机的噪声，几乎静音运行。同时支持UART配置和更精确的电流控制。' },
    { question: '为什么步进电机启动时需要加减速曲线？', options: ['省电', '转子有惯性，突然高速会导致磁场切换跟不上而丢步', '降低电机噪音', '延长电机寿命'], answer: 1, explanation: '电机从静止突然要求高速，转子机械惯性跟不上定子磁场的快速切换，导致"失步"（实际位置落后于指令）。加减速让速度平缓过渡，给转子时间跟上。停止时同理需要减速防止过冲。' },
    { question: '梯形加减速曲线的主要缺点是？', options: ['实现太复杂', '加速段和匀速段交界处加速度突变，对机械有冲击', '不能用于高速', '必须配合编码器'], answer: 1, explanation: '梯形曲线在"加速→匀速"和"匀速→减速"的拐点，加速度瞬间突变（二阶导不连续），机械会"咯噔"一下。S曲线通过让加速度本身也连续变化（加加速-匀加速-减加速）解决此问题，运动更平滑。' },
    { question: '调试步进电机时，判断是否丢步最可靠的方法是？', options: ['听电机声音', '用手感受振动', '走固定步数后用编码器读实际位置，与理论值对比', '看电机是否发烫'], answer: 2, explanation: '听觉和触觉只能粗判。金标准是闭环验证：指令走6400步（=1转@16细分），用编码器读实际走了多少步，差额就是丢步数。这能把"开环走对没"变成可量化的数字。' },
    { question: '调试时第一步应该做什么？', options: ['直接调到最高速度测试', '用极低速度验证位置精度，能走对再提速', '关闭加减速', '把电流调到最大'], answer: 1, explanation: '调参顺序：先慢速验证逻辑正确性（位置准、方向对），再逐步提速并每次用编码器复核。一上来追求高速是最常见的新手错误——连基础逻辑都没验证，高速问题会掩盖真正的bug。' },
  ],
  'motor-hobby-servo': [
    { question: '舵机控制信号的频率是多少？', options: ['20Hz', '50Hz', '100Hz', '200Hz'], answer: 1, explanation: '标准舵机使用50Hz PWM信号（周期20ms）。脉冲宽度0.5-2.5ms对应0-180°角度范围。' },
    { question: 'STM32 TIM4输出50Hz PWM，PSC=83，ARR=19999，对应的CCR值范围（0.5-2.5ms）是？', options: ['500-1500', '500-2500', '1000-2000', '250-750'], answer: 1, explanation: '定时器时钟 = 84MHz/(83+1) = 1MHz，每个计数值 = 1us。0.5ms = 500个计数，2.5ms = 2500个计数。所以 CCR 范围是 500-2500（占 ARR=19999 的 2.5%-12.5%）。' },
    { question: '数字舵机相比模拟舵机的主要改进是？', options: ['更大的角度范围', '更高的刷新频率和更小的死区', '更低的供电电压', '不需要PWM信号'], answer: 1, explanation: '数字舵机内部MCU以约300Hz频率（模拟舵机仅50Hz）刷新驱动信号，死区更小、响应更快、定位更精确、静止力矩更大。' },
    { question: '舵机内部的位置反馈元件是什么？', options: ['光学编码器', '霍尔传感器', '电位器(可变电阻)', '旋转变压器'], answer: 2, explanation: '标准舵机使用与输出轴同轴连接的电位器（可变电阻），输出0-VCC的模拟电压代表当前角度。电位器磨损是舵机失效的常见原因。' },
    { question: '多舵机并联使用时，最重要的注意事项是？', options: ['使用更细的信号线', '独立供电，避免从MCU取电', '所有舵机接同一路PWM', '不需要共地'], answer: 1, explanation: '舵机堵转电流可达正常电流的5-10倍。多舵机同时动作时总电流可能远超MCU供电能力，必须使用独立5-6V大电流电源，但GND必须共地。' },
  ],
  'motor-brushed-dc': [
    { question: '有刷直流电机靠什么实现电流换向？', options: ['MCU的电子开关', '机械换向器和电刷', '霍尔传感器', 'PWM信号'], answer: 1, explanation: '有刷电机通过转子上的机械换向器（换向片）和固定电刷接触，转子转动时自动切换绕组电流方向，保证转子持续受同向力矩。这也是它"有刷"名称的来源——优点是控制极简单，缺点是电刷会磨损、产生火花。' },
    { question: 'H桥电路如何让直流电机反转？', options: ['增大PWM占空比', '交换对角线开关管的导通组合，使电流反向流过电机', '降低电压', '改变PWM频率'], answer: 1, explanation: 'H桥由4个开关管组成H形。导通左上+右下时电流从左到右流过电机（正转）；导通右上+左下时电流反向（反转）。同时关断可让电机滑行，对角短接可能耗制动。' },
    { question: 'PWM调速的本质是什么？', options: ['改变电压幅值', '改变平均电压（占空比×电源电压），电机惯性起低通滤波作用', '改变电流方向', '改变电机极对数'], answer: 1, explanation: 'PWM是高频开关，电机绕组有电感，对高频相当于低通滤波，最终感受到的是平均电压 Vavg = D × Vcc（D=占空比）。所以调占空比就等于调平均电压，从而调转速。' },
  ],
  'motor-bldc': [
    { question: '无刷直流电机(BLDC)相比有刷电机的主要优势是？', options: ['价格更低', '效率高、寿命长、无电刷磨损和维护', '控制更简单', '只能低速旋转'], answer: 1, explanation: 'BLDC用电子换向取代机械电刷，没有电刷磨损（寿命仅由轴承决定）、无火花（防爆）、效率85-95%（有刷60-75%）。代价是需要驱动电路和换向算法，控制复杂得多。' },
    { question: 'BLDC的"极对数"如何影响转速？', options: ['极对数越多转速越快', '极对数越多，同样电频率下机械转速越慢（n = 60×f / p）', '极对数不影响转速', '极对数只影响扭矩不影响转速'], answer: 1, explanation: '转速公式 n = 60f/p（f=电频率，p=极对数）。极对数p越大，同样电频率下机械转速越低，但扭矩越大。这是"高速小极对数、大扭矩多极对数"选型原则的依据。' },
    { question: 'BLDC两种主流控制方式是？', options: ['开环和闭环', '六步换向（梯形波）和FOC（正弦波）', '电压控制和电流控制', 'PWM和模拟'], answer: 1, explanation: '六步换向简单、有转矩脉动（每60°跳变）；FOC用正弦波连续控制、转矩平滑、效率高但算法复杂。DIY和入门首选六步，高性能场合（云台、机械臂）用FOC。' },
  ],
  'motor-servo': [
    { question: '伺服电机与步进电机最本质的区别是？', options: ['伺服更贵', '伺服有编码器反馈构成闭环，步进通常开环', '伺服不能定位', '伺服功率更大'], answer: 1, explanation: '伺服电机自带编码器实时反馈位置，驱动器根据偏差闭环修正，所以不会"丢步"，高速高负载下仍保持精度。步进电机通常开环（发多少脉冲假设走多少），过载会丢步。代价是伺服系统更贵更复杂。' },
    { question: '伺服系统的三大组成是？', options: ['电机+减速器+负载', '伺服电机+编码器+伺服驱动器', '电源+MCU+电机', '电机+传感器+显示器'], answer: 1, explanation: '伺服电机（执行）+ 编码器（位置反馈）+ 伺服驱动器（运行PID/FOC算法、驱动电机）。三者构成闭环。MCU通常通过脉冲/CANopen给驱动器下命令，不直接驱动电机。' },
    { question: '伺服的三种基本控制模式是？', options: ['手动/自动/远程', '位置模式(PT)、速度模式(PV)、转矩模式(PQ)', '正向/反向/停止', '高压/低压/断电'], answer: 1, explanation: 'PT(位置)精确控制走到哪；PV(速度)精确控制转多快（传送带、卷绕）；PQ(转矩)精确控制输出多大扭矩（拧紧、压延）。机械臂关节通常用位置模式CSP(周期同步位置)。' },
  ],
  'engineering-validation': [
    { question: '串级PID调试时，为什么要从内环(电流环)开始调？', options: ['内环最简单', '内环是外环的"执行器"，内环稳定后外环才有可靠基础', '内环参数最少', '外环无法单独测试'], answer: 1, explanation: '串级控制中内环输出驱动外环。若内环(电流环)未调好，速度环看到的"执行器"就不可靠，调速度环等于在错误基础上调。所以必须由内到外：电流环→速度环→位置环，每环达标后再调外环。' },
    { question: '评判PID阶跃响应好坏的三个客观指标是？', options: ['电压、电流、功率', '上升时间、超调量、稳态误差', '频率、相位、幅值', '温度、噪音、振动'], answer: 1, explanation: '上升时间(响应快慢)、超调量(稳定性)、稳态误差(精度)。这三个数字量化了"调好了没"——比"看电机转得顺不顺"客观100倍。目标是上升快、超调小、稳态误差≈0。' },
    { question: '想减小跟随误差又不想引发超调，应该用什么方法？', options: ['加大Kp', '加大Kd', '加前馈补偿', '降低目标速度'], answer: 2, explanation: '加大Kp会提升响应但也增加超调风险。前馈把已知指令直接叠加到输出，不进入反馈回路，不影响稳定性——这是专业伺服跟踪精度高的关键。速度前馈、加速度前馈、重力前馈是常见类型。' },
    { question: '调试S曲线参数时，判定好坏的最客观标准是？', options: ['电机声音是否平稳', '手动触摸感觉振动', '编码器读实际位置，与目标位置对比看误差', '电机温度是否升高'], answer: 2, explanation: '主观感觉只能发现严重问题。正确做法：输出目标位置和实际位置(编码器)的曲线，看实际是否紧贴目标、停止误差≈0、加减速无冲击。再配合重复定位精度(同目标走10次的离散度)全面评估。' },
    { question: '为什么强烈建议先在仿真里验证算法再上硬件？', options: ['仿真更准确', '仿真里能零成本随意改参数试错，隔离算法问题与硬件问题', '硬件测试不安全', '仿真不需要写代码'], answer: 1, explanation: '仿真隔离了变量——算法逻辑对不对，在仿真里一目了然，不受硬件噪声、接线、电源等干扰。直接上硬件，问题混在一起(算法错？硬件坏？参数差？)，排查极难。V模型要求先仿真验证算法。' },
  ],
  'current-sense': [
    { question: 'FOC三相电流采样最常用的方案是？', options: ['霍尔电流传感器ACS712', '下桥臂shunt电阻+专用电流检测运放(如INA240)', '测电源电压反推', '测电机温度反推'], answer: 1, explanation: '下桥臂采样：每个下桥MOS源极串一个mΩ级精密电阻，电流流过产生压降，经INA240放大送ADC。运放共地接法简单、成本低、带宽够，是FOC的主流方案。ACS712适合过流保护不适合精密FOC。' },
    { question: '下桥臂采样时，为什么必须在PWM周期中点采样？', options: ['中点电压最稳定', '此时下桥MOS导通电流稳定，避开开关瞬间的噪声尖峰', '中点ADC精度高', '减少CPU占用'], answer: 1, explanation: '下桥MOS导通期间电流才流过shunt，PWM开关瞬间会产生巨大共模跳变和毛刺。在周期中点采样既保证MOS导通(有电流)，又避开开关边沿(无噪声)。STM32用TIM TRGO触发ADC实现自动同步。' },
    { question: '电流采样系统上电后必须做的第一步是？', options: ['直接启动电机', '零电流校准——电机断电采多次取平均作为ADC偏置', '调PID参数', '测PWM频率'], answer: 1, explanation: '运放和ADC有零点偏移(offset)，零电流时读数不是理想VCC/2。这个偏移若不去除，会被当成直流电流污染整个FOC。校准：电机断电→采1024次取平均→存为offset→正式采样时减去。温度漂移大时需周期重校。' },
  ],
  'advanced-comm': [
    { question: 'Modbus RTU帧是如何界定起止的（它没有起始/结束标志字节）？', options: ['靠固定长度', '靠帧间3.5个字符时间的静默', '靠特殊的0xAA标志', '靠CRC结尾自动识别'], answer: 1, explanation: 'RTU模式无起始/结束字节，靠帧间至少3.5个字符的静默时间分隔（9600bps下约4ms）。这也是为什么波特率越高帧间隔要求越短。如果主站发帧后没有足够间隔，从站会把两帧误判成一帧导致CRC错误。' },
    { question: 'RS485总线两端的120Ω终端电阻作用是？', options: ['限流保护芯片', '匹配双绞线特性阻抗，防止信号反射', '提高传输电压', '减少功耗'], answer: 1, explanation: '长线传输时，信号到达线末端若阻抗不匹配会反射，叠加原信号造成畸变。120Ω终端电阻与双绞线特性阻抗匹配，吸收信号消除反射。只在总线物理两端各接一个，中间节点不接，多接反而劣化。' },
    { question: 'Modbus功能码0x83表示什么？', options: ['读保持寄存器的响应', '读保持寄存器的异常响应（0x03的最高位置1）', '写多个寄存器', '广播命令'], answer: 1, explanation: 'Modbus异常响应的规则：把原功能码最高位置1。0x03→0x83表示"读保持寄存器出错"，后跟一个异常码（如0x02非法地址、0x03非法数据值）。主站收到异常响应就知道从站执行失败及原因。' },
    { question: '相比Modbus RTU，CAN总线的核心优势是？', options: ['接线更简单', '多主架构+硬件仲裁+自动重传，实时性和可靠性更高', '速率更低更稳定', '成本更低'], answer: 1, explanation: 'CAN是多主总线，靠ID优先级仲裁（非破坏性），高优先级报文优先发送且延迟确定；硬件CRC15+错误帧+自动重传保证可靠性。RS485是单主轮询，从站多时延迟累积。CAN更适合高实时多节点场景（汽车、机器人）。' },
  ],
  'advanced-protection': [
    { question: '为什么上下桥直通(shoot-through)保护必须用硬件比较器而不是软件ADC？', options: ['软件更复杂', '直通电流微秒级达数百安培，软件采样响应来不及', 'ADC精度不够', '软件不能关PWM'], answer: 1, explanation: '直通时电源经两个MOS直接短路，电流上升极快（di/dt），几微秒内可达数百安培。软件ADC采样+判断+关断最快也要十几微秒，MOS早炸了。硬件比较器直接接PWM使能脚或STM32的BRK输入，纳秒到微秒级截断，是唯一来得及的方案。' },
    { question: '电机减速时母线电压升高（泵升）的危害和保护措施是？', options: ['无危害，正常现象', '可能击穿MOS/爆电容，用制动电阻泄能或过压停机', '提高效率，应鼓励', '加更大电机'], answer: 1, explanation: '减速时电机变发电机，反电动势给母线电容充电导致电压升高（泵升）。超压会击穿MOS、让电解电容爆裂。保护：①制动电阻(mos+功率电阻)消耗回馈能量；②过压阈值硬件比较器立即停机。变频器/伺服都有泵升保护电路。' },
    { question: 'STM32高级定时器的BRK输入在保护中起什么作用？', options: ['产生PWM', '外部信号触发时硬件立即强制所有PWM输出无效', '测量电流', '配置波特率'], answer: 1, explanation: 'BRK(Break)是硬件刹车输入。当外部比较器检测到过流拉低BRK引脚时，STM32硬件在下一个时钟周期立即把所有PWM通道强制为安全电平（无效），无需软件介入。这是实现纳秒级硬件过流保护的标配机制，配合BDTR寄存器配置。' },
    { question: '堵转保护的核心判据是？', options: ['电流为零', '电流大于阈值且转速接近零持续一定时间', '温度低', '电压高'], answer: 1, explanation: '堵转=电机被卡但持续通电。特征：电流指令大（有电流流过）但转速≈0（没转）。为避免启动瞬间误判，需持续超过阈值时间（如500ms）才确认。堵转不保护会因持续大电流迅速过热烧毁绕组。' },
  ],
  'matlab-sim': [
    { question: 'Matlab中建立传递函数的核心函数是？', options: ['plot()', 'tf(num, den)', 'matrix()', 'sim()'], answer: 1, explanation: 'tf(num, den) 用分子分母多项式系数建立传递函数。num/den 是降幂排列的系数向量，如 tf([1],[1 2 5]) 表示 G(s)=1/(s²+2s+5)。配合 step(G) 画阶跃响应、feedback(G,1) 求闭环，是控制仿真三板斧。' },
    { question: '仿真调PID时，想同时对比多组Kp的响应，最有效的做法是？', options: ['手动改参数运行多次截图对比', '用for循环画多条step曲线在同一张图上', '每次只改一个参数', '用Excel记录'], answer: 1, explanation: 'for kp=[1 5 10 20] 循环里依次 feedback(C*G,1) + step，hold on 叠加画线。一次运行5条曲线对比，零成本看出哪个Kp响应快/超调大/振荡——这正是工程验证方法论强调的"仿真里零成本试错"。' },
    { question: 'Matlab索引从几开始？', options: ['0', '1', '-1', '任意'], answer: 1, explanation: 'Matlab索引从1开始（与C/Python的从0不同），这是新手最常踩的坑。v(1)是第一个元素。另外注释用%（不是//），语句末分号表示不显示结果。' },
  ],
  's-curve': [
    { question: 'S曲线相比梯形曲线的根本优势是什么？', options: ['运动速度更快', '加速度连续无突变，消除机械冲击', '代码更简单', '不需要编码器'], answer: 1, explanation: '梯形曲线的加速度瞬间从0跳到最大值（jerk=无穷大），对机械产生"咯噔"冲击。S曲线限制jerk，让加速度本身也平滑过渡，运动无冲击。代价是实现更复杂（7段分段）。' },
    { question: 'S曲线的核心参数jerk（加加速度）设得非常大时会怎样？', options: ['运动更平滑', '退化成梯形曲线（加速度瞬间到位）', '电机会反转', '系统报错'], answer: 1, explanation: 'jerk=无穷大意味着加速度瞬间从0到a_max，这正是梯形曲线的定义。所以调S曲线本质就是调jerk：从大值开始减小，直到加速度波形从方波（突变）变成连续曲线。jerk越小越平滑但加速越慢。' },
    { question: '验证S曲线是否生效，最可靠的方法是？', options: ['听电机声音', '用手摸振动', '串口输出加速度波形，看是否从方波变成连续曲线', '看电机温度'], answer: 2, explanation: '加速度=速度的微分。梯形曲线的加速度是方波（突变）；S曲线的加速度是连续曲线。用串口输出加速度值到上位机画图，方波→连续曲线的转变一目了然。配合编码器读实际位置验证无丢步，是最科学的验证方法。' },
    { question: '以下哪个场景最适合用S曲线？', options: ['家用电风扇调速', '机械臂关节运动', 'LED呼吸灯', '电动牙刷'], answer: 1, explanation: '机械臂关节有连杆惯性+减速器，梯形曲线的加速度突变会激发振动、损坏减速器。S曲线让加速度平滑过渡，保护机械。CNC高速加工、SCARA机器人同理。简单场景（风扇/LED）不需要加减速。' },
  ],
};

// 收集所有知识点ID（用于进度追踪）
const AllKnowledgeIds = (() => {
  const ids = [];
  if (MotorData.beginner?.sections) MotorData.beginner.sections.forEach(s => ids.push(s.id));
  if (MotorData.advanced?.sections) MotorData.advanced.sections.forEach(s => ids.push(s.id));
  if (MotorData.robotics?.sections) MotorData.robotics.sections.forEach(s => ids.push(s.id));
  Object.keys(MotorData.motorTypes).forEach(key => {
    const m = MotorData.motorTypes[key];
    ids.push('motor-' + key);
  });
  return ids;
})();

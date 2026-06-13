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
        { id: 'advanced-foc', label: 'FOC磁场定向控制' },
        { id: 'advanced-coord', label: '坐标变换' },
        { id: 'advanced-sensorless', label: '无感控制' },
        { id: 'advanced-multiloop', label: '多环控制' },
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
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  },

  // ========== 首页数据 ==========
  home: {
    title: '电机知识学习平台',
    subtitle: '面向自动化专业学生的系统化电机控制学习指南，从入门到进阶，一站式掌握电机知识',
    stats: [
      { label: '知识章节', value: '30+', color: 'blue' },
      { label: '电机类型', value: '5', color: 'green' },
      { label: '实战项目', value: '6', color: 'purple' },
      { label: '计算工具', value: '4', color: 'orange' },
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

          <h4 class="font-medium mt-6 mb-2">PWM调速原理</h4>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            PWM（Pulse Width Modulation，脉宽调制）通过快速开关的占空比来控制电机两端的平均电压。
            占空比越大，平均电压越高，电机转速越快。
          </p>

          <div class="formula-block">
            $$V_{avg} = D \\times V_{cc}$$
            <div class="text-sm text-gray-500 mt-2">V_avg: 平均电压 | D: 占空比(0~1) | V_cc: 电源电压</div>
          </div>

          <div class="info-box info">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>PWM频率选择</strong>：一般建议PWM频率在 10kHz~20kHz 以上（人耳听觉范围之外），避免电机发出刺耳噪音。常用频率：Arduino约490Hz/980Hz（可调），STM32可配置到数十kHz。</div>
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
        `,
      },
      {
        id: 'advanced-multiloop',
        title: '多环控制',
        desc: '位置环、速度环、电流环的串级控制结构',
        icon: '🔄',
        tags: ['控制理论', '伺服'],
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
                <tr><td>L298N</td><td>5-35V</td><td>2A</td><td>最经典入门级，双H桥</td></tr>
                <tr><td>TB6612FNG</td><td>2.25-13.5V</td><td>1.2A</td><td>效率更高、体积更小</td></tr>
                <tr><td>DRV8833</td><td>2.7-10.8V</td><td>1.5A</td><td>TI出品、低功耗</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-2 gap-4">
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
          <div class="grid grid-cols-2 gap-4">
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
      ],
    },
    'stepper': {
      title: '步进电机',
      subtitle: '精确位置控制的开环之选',
      icon: '🎯',
      color: 'red',
      overview: '步进电机（Stepper Motor）是一种将电脉冲信号转换为精确角位移的执行器。每输入一个脉冲，电机就转动一个固定的角度（步距角）。无需位置反馈即可实现精确位置控制，是3D打印机、CNC数控机床、自动化设备的标准执行元件。',
      specs: { voltage: '5-48V', speed: '0-1000+ RPM', stepAngle: '1.8°(常见)', control: '脉冲/方向', positioning: '开环精确' },
      sections: [
        { title: '工作原理与分类', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">步进电机通过依次给定子绕组通电，使转子一步一步地旋转到对应位置。</p>
          <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>反应式（VR）</strong>：转子为软磁材料，成本低但扭矩小</li>
            <li><strong>永磁式（PM）</strong>：转子为永磁体，步距角大（7.5°/15°）</li>
            <li><strong>混合式（HB）</strong>：结合前两者优点，步距角小（1.8°/0.9°）、扭矩大，应用最广</li>
          </ul>
        `},
        { title: '驱动方式', content: `
          <div class="overflow-x-auto mb-3">
            <table class="compare-table">
              <thead><tr><th>模式</th><th>步距角</th><th>精度</th><th>说明</th></tr></thead>
              <tbody>
                <tr><td>整步（Full Step）</td><td>1.8°</td><td>低</td><td>最简单，一相或两相同时通电</td></tr>
                <tr><td>半步（Half Step）</td><td>0.9°</td><td>中</td><td>整步和半步交替，精度翻倍</td></tr>
                <tr><td>细分（Microstepping）</td><td>可编程</td><td>高</td><td>用正弦电流驱动，最高1/256细分</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '常用驱动模块', content: `
          <div class="overflow-x-auto">
            <table class="compare-table">
              <thead><tr><th>模块</th><th>细分</th><th>特点</th></tr></thead>
              <tbody>
                <tr><td>A4988</td><td>1/16</td><td>最常用步进驱动，3D打印机标配</td></tr>
                <tr><td>DRV8825</td><td>1/32</td><td>电流更大，细分更细</td></tr>
                <tr><td>TMC2209</td><td>1/256</td><td>静音驱动首选，StallGuard堵转检测</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>无需反馈即可精确定位</li><li>开环控制、成本低</li><li>低速扭矩大</li><li>控制简单（脉冲信号）</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>高速扭矩下降快</li><li>可能丢步（过载）</li><li>效率较低、发热大</li><li>噪音明显（未细分时）</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>3D打印机（X/Y/Z轴、挤出机）</li><li>CNC数控机床</li><li>自动窗帘、自动门</li><li>纺织机械、包装机械</li><li>医疗设备（注射泵、分析仪）</li>
          </ul>
        `},
        { title: '实战：Arduino控制', content: `
          <div class="code-block"><span class="code-comment">// Arduino + A4988 驱动步进电机</span>
<span class="code-keyword">const int</span> DIR = 2;   <span class="code-comment">// 方向引脚</span>
<span class="code-keyword">const int</span> STEP = 3; <span class="code-comment">// 步进脉冲引脚</span>
<span class="code-keyword">const int</span> STEPS_REV = 200; <span class="code-comment">// 1.8°步距角 = 200步/转</span>

<span class="code-keyword">void</span> <span class="code-func">setup</span>() {
  pinMode(DIR, OUTPUT);
  pinMode(STEP, OUTPUT);
}

<span class="code-keyword">void</span> <span class="code-func">loop</span>() {
  <span class="code-comment">// 正转一圈</span>
  digitalWrite(DIR, HIGH);
  <span class="code-keyword">for</span>(<span class="code-keyword">int</span> i = 0; i < STEPS_REV; i++) {
    digitalWrite(STEP, HIGH);
    delayMicroseconds(1000); <span class="code-comment">// 脉冲宽度</span>
    digitalWrite(STEP, LOW);
    delayMicroseconds(1000);
  }
  delay(1000);
}</div>
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
          <div class="grid grid-cols-2 gap-4">
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
      ],
    },
    'hobby-servo': {
      title: '舵机 (Hobby Servo)',
      subtitle: '内置控制电路的位置执行器',
      icon: '📡',
      color: 'orange',
      overview: '舵机是简化版的伺服系统，内置了控制电路、直流电机、减速齿轮组和位置反馈电位器。通过PWM信号控制旋转角度，通常在0°-180°范围内精确定位。是遥控模型、小型机器人最常用的执行元件。',
      specs: { voltage: '4.8-7.2V', speed: '0.1-0.3s/60°', torque: '1.2-25 kg·cm(常见)', range: '0-180°(标准)', control: 'PWM(50Hz)', weight: '9-55g(常见)' },
      sections: [
        { title: '工作原理', content: `
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">舵机内部包含：<strong>直流电机</strong>、<strong>减速齿轮组</strong>、<strong>位置反馈电位器</strong>、<strong>控制电路</strong>。</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">接收50Hz的PWM信号（周期20ms），脉冲宽度1ms-2ms对应0°-180°。内部控制电路比较目标位置（PWM信号）和实际位置（电位器），通过内部闭环驱动电机转到目标角度。</p>
        `},
        { title: '分类', content: `
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>标准舵机</strong>：0°-180°旋转，如SG90(9g)、MG996R(55g)</li>
            <li><strong>连续旋转舵机</strong>：可360°连续旋转，PWM控制转速和方向</li>
            <li><strong>总线舵机</strong>：串行总线通信，可级联多个，支持反馈读取</li>
          </ul>
        `},
        { title: '常见型号', content: `
          <div class="overflow-x-auto">
            <table class="compare-table">
              <thead><tr><th>型号</th><th>重量</th><th>扭矩</th><th>速度</th><th>价格</th></tr></thead>
              <tbody>
                <tr><td>SG90</td><td>9g</td><td>1.6 kg·cm</td><td>0.1s/60°</td><td>~¥5</td></tr>
                <tr><td>MG90S</td><td>13g</td><td>2.2 kg·cm</td><td>0.1s/60°</td><td>~¥10</td></tr>
                <tr><td>MG996R</td><td>55g</td><td>11 kg·cm</td><td>0.2s/60°</td><td>~¥15</td></tr>
                <tr><td>DS3218</td><td>60g</td><td>20 kg·cm</td><td>0.16s/60°</td><td>~¥20</td></tr>
              </tbody>
            </table>
          </div>
        `},
        { title: '优缺点', content: `
          <div class="grid grid-cols-2 gap-4">
            <div><h5 class="font-medium text-green-600 mb-2">优点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>即插即用、控制极简</li><li>内置闭环、定位精确</li><li>体积小、价格低</li><li>减速齿轮增扭</li>
              </ul></div>
            <div><h5 class="font-medium text-red-600 mb-2">缺点</h5>
              <ul class="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>角度有限（通常180°）</li><li>扭矩较小</li><li>精度有限（电位器反馈）</li><li>塑料齿轮可能断裂</li>
              </ul></div>
          </div>
        `},
        { title: '应用场景', content: `
          <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>遥控模型（遥控车舵轮、飞机舵面）</li><li>机器人关节（六足机器人、机械臂）</li>
            <li>遥控云台（摄像头转向）</li><li>智能小车转向</li>
          </ul>
        `},
        { title: '实战：Arduino控制', content: `
          <div class="code-block"><span class="code-comment">// Arduino 控制标准舵机（使用Servo库）</span>
<span class="code-keyword">#include</span> &lt;Servo.h&gt;

Servo myServo;

<span class="code-keyword">void</span> <span class="code-func">setup</span>() {
  myServo.attach(9);  <span class="code-comment">// 舵机信号线接D9</span>
}

<span class="code-keyword">void</span> <span class="code-func">loop</span>() {
  myServo.write(0);     <span class="code-comment">// 转到0°</span>
  delay(1000);
  myServo.write(90);    <span class="code-comment">// 转到90°（中位）</span>
  delay(1000);
  myServo.write(180);   <span class="code-comment">// 转到180°</span>
  delay(1000);
}</div>
        `},
      ],
    },
  },

  // ========== 电机对比数据 ==========
  compareTable: {
    headers: ['参数', '有刷直流', '无刷BLDC', '步进电机', '伺服电机', '舵机'],
    rows: [
      ['控制方式', '开环(PWM)', '闭环(FOC/六步)', '开环(脉冲)', '闭环(PID/FOC)', '内置闭环'],
      ['定位精度', '低', '中-高', '高(可能丢步)', '极高', '中'],
      ['效率', '60-75%', '85-95%', '50-80%', '80-92%', '50-60%'],
      ['转速范围', '低-中', '宽', '低', '宽', 'N/A(角度)'],
      ['扭矩特性', '中', '高且平坦', '低速高', '高', '中'],
      ['寿命', '短(电刷磨损)', '长', '长', '长', '中(电位器磨损)'],
      ['成本', '低', '中-高', '中', '高', '低'],
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
      },
      {
        title: '第二阶段：控制理论',
        duration: '2-4个月',
        items: [
          '经典控制理论（PID、传递函数）',
          'FOC原理（Clarke/Park/SVPWM）',
          '推荐资源：SimpleFOC中文官网 + B站视频',
        ],
      },
      {
        title: '第三阶段：嵌入式实战',
        duration: '3-6个月',
        items: [
          'Arduino + L298N 驱动有刷电机',
          'SimpleFOC + 云台电机 实现FOC闭环',
          'Arduino + A4988 控制步进电机',
          '推荐平台：Arduino → STM32G4',
        ],
      },
      {
        title: '第四阶段：进阶方向',
        duration: '持续学习',
        items: [
          '无感控制（SMO、HFI）',
          '模型预测控制（MPC）',
          'MATLAB/Simulink 仿真',
          '机器人关节控制 / 新能源汽车电驱',
        ],
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
  'advanced-foc': [
    { question: 'FOC控制中，通常将Id设为多少？', options: ['最大值', '0', '与Iq相等', '负值'], answer: 1, explanation: '在表贴式永磁电机（SPM）中，设Id=0可以实现最大转矩/电流比（MTPA），因为磁场已由永磁体提供。' },
    { question: 'FOC的第一步坐标变换是什么？', options: ['Park变换', 'Clarke变换', '傅里叶变换', '拉普拉斯变换'], answer: 1, explanation: 'FOC流程：三相电流采样 → Clarke变换(abc→αβ) → Park变换(αβ→dq) → PI控制 → 反Park → SVPWM。' },
  ],
  'advanced-coord': [
    { question: 'Clarke变换的目的是？', options: ['将直流变为交流', '将三相变为两相', '将电压变为电流', '将转矩变为速度'], answer: 1, explanation: 'Clarke变换将三相静止坐标系(a,b,c)映射到两相静止坐标系(α,β)，减少一个维度，便于后续的Park变换。' },
  ],
  'advanced-sensorless': [
    { question: '无感控制在零速时为什么无法工作？', options: ['电机无法启动', '没有反电动势可检测', '编码器故障', '电流过大'], answer: 1, explanation: 'SMO等无感方法依赖反电动势来估算转子位置，而零速时反电动势为零。通常需要开环启动或高频注入（HFI）来启动。' },
  ],
  'advanced-multiloop': [
    { question: '三环串级控制中，应该最先调试哪个环？', options: ['位置环', '速度环', '电流环', '同时调试'], answer: 2, explanation: '调试顺序由内到外：先调电流环（响应最快）→ 再调速度环 → 最后调位置环。内环稳定后再调外环。' },
    { question: '电流环的带宽通常为？', options: ['10-100Hz', '100-500Hz', '1-10kHz', '10-100kHz'], answer: 2, explanation: '电流环（最内环）带宽最高，约1-10kHz。速度环约100-500Hz，位置环约10-100Hz。内环频率约为外环的10倍。' },
  ],
};

// 收集所有知识点ID（用于进度追踪）
const AllKnowledgeIds = (() => {
  const ids = [];
  if (MotorData.beginner?.sections) MotorData.beginner.sections.forEach(s => ids.push(s.id));
  if (MotorData.advanced?.sections) MotorData.advanced.sections.forEach(s => ids.push(s.id));
  Object.keys(MotorData.motorTypes).forEach(key => {
    const m = MotorData.motorTypes[key];
    ids.push('motor-' + key);
  });
  return ids;
})();

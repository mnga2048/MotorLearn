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

  <span class="code-comment">/* 运行状态（每次更新会变化）*/</span>
  <span class="code-keyword">float</span> integral;     <span class="code-comment">// 积分累积量</span>
  <span class="code-keyword">float</span> last_error;   <span class="code-comment">// 上一次误差（用于微分）*/</span>
  <span class="code-keyword">float</span> last_meas;    <span class="code-comment">// 上一次测量值（用于微分测量法）*/</span>
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
  <span class="code-comment">// 注意：这里需要第三个历史误差 prev_error，结构体里要加一个字段</span>
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
          <div class="code-block"><span class="code-comment">/* 结构体增加字段：float d_filter_out; float alpha; */</span>

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
            <thead><tr><th>模式</th><th>等效步距角</th><th>精度</th><th>扭矩</th><th>噪音</th></tr></thead>
            <tbody>
              <tr><td>整步(Full Step)</td><td>1.8°</td><td>低</td><td>100%</td><td>大</td></tr>
              <tr><td>半步(Half Step)</td><td>0.9°</td><td>中</td><td>~70%</td><td>中</td></tr>
              <tr><td>1/4细分(Micro-16)</td><td>0.1125°</td><td>高</td><td>~50%</td><td>小</td></tr>
              <tr><td>1/16细分(Micro-256)</td><td>0.007°</td><td>极高</td><td>~40%</td><td><strong>极小</strong></td></tr>
            </tbody>
          </table></div>
          <div class="info-box warning mt-3"><svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div><strong>细分不是免费的</strong>：细分越高，扭矩越小（约按1/√细分成比例衰减）。1/16细分后扭矩约为整步的50%。选细分时需要在<strong>精度</strong>和<strong>扭矩</strong>之间权衡。</div></div>
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
          <div class="grid grid-cols-2 gap-4">
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
          <div class="grid grid-cols-2 gap-4">
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
    ],
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
  'motor-stepper': [
    { question: '步进电机最常见的步距角是多少？', options: ['0.9°', '1.8°', '3.6°', '7.5°'], answer: 1, explanation: '混合式步进电机（最常用）的标准步距角为1.8°，即每转200步。这由转子50个齿和定子4相绕组决定。' },
    { question: 'A4988驱动模块的Vref电位器用于设置什么？', options: ['步距角', '电流限制', '细分模式', '脉冲频率'], answer: 1, explanation: 'Vref用于设定步进电机的电流上限。关系式：I_max = Vref / (8 × Rsense)。A4988的Rsense=0.1Ω，所以I_max = Vref/0.8。' },
    { question: '16细分模式下，每转需要的脉冲数为？', options: ['200', '800', '1600', '3200'], answer: 3, explanation: '细分 = 16，基础步数 = 200，总脉冲 = 200 × 16 = 3200。细分越高，运动越平滑，但高频脉冲对MCU要求更高。' },
    { question: '步进电机在高速时容易丢步的原因是？', options: ['电压太低', '转矩随转速下降到不足以克服负载', 'PWM频率不够', '编码器精度不足'], answer: 1, explanation: '步进电机的转矩-转速特性呈严重下降曲线。转速越高，反电动势越大，绕组电流来不及建立，导致转矩急剧下降，无法跟随脉冲而"丢步"。' },
    { question: 'TMC2209相比A4988的最大优势是？', options: ['支持更高电压', '静音模式(SpreadCycle/StealthChop)', '更大的驱动电流', '更小的体积'], answer: 1, explanation: 'TMC2209的StealthChop模式通过斩波算法大幅降低步进电机的噪声，几乎静音运行。同时支持UART配置和更精确的电流控制。' },
  ],
  'motor-hobby-servo': [
    { question: '舵机控制信号的频率是多少？', options: ['20Hz', '50Hz', '100Hz', '200Hz'], answer: 1, explanation: '标准舵机使用50Hz PWM信号（周期20ms）。脉冲宽度0.5-2.5ms对应0-180°角度范围。' },
    { question: 'STM32 TIM4输出50Hz PWM，PSC=83，ARR=19999，对应的CCR值范围（0.5-2.5ms）是？', options: ['25-125', '50-150', '100-200', '250-750'], answer: 0, explanation: 'CCR = (脉冲宽度ms / 20ms) × 20000。0.5ms→500, 1.5ms→1500, 2.5ms→2500。注意ARR=19999，所以范围是500-2500。' },
    { question: '数字舵机相比模拟舵机的主要改进是？', options: ['更大的角度范围', '更高的刷新频率和更小的死区', '更低的供电电压', '不需要PWM信号'], answer: 1, explanation: '数字舵机内部MCU以约300Hz频率（模拟舵机仅50Hz）刷新驱动信号，死区更小、响应更快、定位更精确、静止力矩更大。' },
    { question: '舵机内部的位置反馈元件是什么？', options: ['光学编码器', '霍尔传感器', '电位器(可变电阻)', '旋转变压器'], answer: 2, explanation: '标准舵机使用与输出轴同轴连接的电位器（可变电阻），输出0-VCC的模拟电压代表当前角度。电位器磨损是舵机失效的常见原因。' },
    { question: '多舵机并联使用时，最重要的注意事项是？', options: ['使用更细的信号线', '独立供电，避免从MCU取电', '所有舵机接同一路PWM', '不需要共地'], answer: 1, explanation: '舵机堵转电流可达正常电流的5-10倍。多舵机同时动作时总电流可能远超MCU供电能力，必须使用独立5-6V大电流电源，但GND必须共地。' },
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

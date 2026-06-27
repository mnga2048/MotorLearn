// 电机学习平台 - 主应用逻辑
(function () {
  'use strict';
  let currentPage = 'home';

  // ========== 侧边栏渲染 ==========
  // 容错解析：sessionStorage 若被写入损坏 JSON，回退到空对象避免整站白屏
  let collapsedGroups = {};
  try { collapsedGroups = JSON.parse(sessionStorage.getItem('ml_collapsed') || '{}'); } catch { collapsedGroups = {}; }

  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    let html = '';
    MotorData.nav.forEach(item => {
      if (item.children) {
        const isCollapsed = !!collapsedGroups[item.id];
        html += `<div class="nav-section-title nav-group-toggle" onclick="toggleNavGroup('${item.id}')">
          <span class="flex items-center gap-1">${MotorData.icons[item.icon] || ''} ${item.label}</span>
          <svg class="w-3.5 h-3.5 transition-transform ${isCollapsed ? '' : 'rotate-90'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>`;
        html += `<div class="nav-children ${isCollapsed ? 'hidden' : ''}">`;
        item.children.forEach(child => {
          html += `<a class="nav-item" data-page="${child.id}" onclick="navigateTo('${child.id}')">
            <span>${child.label}</span></a>`;
        });
        html += `</div>`;
      } else {
        html += `<a class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">
          <span class="nav-icon">${MotorData.icons[item.icon] || ''}</span><span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge ${item.badgeClass}">${item.badge}</span>` : ''}</a>`;
      }
    });

    // 收藏分区
    const favs = Favorites.getAll();
    if (favs.length > 0) {
      html += `<div class="sidebar-section-title">★ 我的收藏</div>`;
      favs.forEach(id => {
        const info = Favorites.getInfo(id);
        html += `<a class="nav-item" data-page="${id}" onclick="navigateTo('${id}')">
          <span class="nav-icon">${info.icon || '📄'}</span><span>${info.title}</span></a>`;
      });
    }

    // 最近浏览分区
    const history = History.getAll();
    if (history.length > 0) {
      html += `<div class="sidebar-section-title">⏱ 最近浏览</div>`;
      history.forEach(h => {
        html += `<a class="nav-item" data-page="${h.id}" onclick="navigateTo('${h.id}')">
          <span class="nav-icon">${h.icon || '📄'}</span><span style="font-size:0.8rem">${h.title}</span></a>`;
      });
    }
    nav.innerHTML = html;
  }

  window.toggleNavGroup = function(groupId) {
    collapsedGroups[groupId] = !collapsedGroups[groupId];
    sessionStorage.setItem('ml_collapsed', JSON.stringify(collapsedGroups));
    renderSidebar();
  };

  function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
  }

  // ========== 页面渲染 ==========
  // 切换页面前清理上一页的资源：销毁ECharts实例，避免内存泄漏与resize监听器叠加
  function cleanupPageResources() {
    const container = document.getElementById('page-container');
    if (!container) return;
    // 销毁容器内所有 ECharts 实例（pwm/hall/encoder/trajectory/pid-response/knowledge-graph/progress）
    if (typeof echarts !== 'undefined') {
      // echarts 给每个实例DOM打上 _echarts_instance_ 属性，遍历所有子元素销毁
      container.querySelectorAll('*').forEach(el => {
        if (el.getAttribute && el.getAttribute('_echarts_instance_')) {
          const inst = echarts.getInstanceByDom(el);
          if (inst) inst.dispose();
        }
      });
    }
    // 通知 Charts 模块停止所有自动动画（RAF/setInterval）
    if (typeof Charts !== 'undefined' && Charts.stopAll) Charts.stopAll();
  }

  function renderPage(pageId) {
    const container = document.getElementById('page-container');
    if (!container) return;

    // 切页前清理上一页资源（ECharts dispose + 停止动画定时器）
    cleanupPageResources();

    // 保存滚动位置
    if (currentPage) {
      sessionStorage.setItem('ml_scroll_' + currentPage, window.scrollY);
    }

    // 记录浏览历史
    History.add(pageId);

    currentPage = pageId;

    // 淡出过渡
    container.style.opacity = '0';
    container.style.transform = 'translateY(6px)';

    setTimeout(() => {
      let html = '';
      switch (pageId) {
        case 'home': html = renderHomePage(); break;
        case 'beginner': html = renderSectionPage(MotorData.beginner); break;
        case 'advanced': html = renderSectionPage(MotorData.advanced); break;
        case 'robotics': html = renderSectionPage(MotorData.robotics); break;
        case 'industry': html = renderIndustryPage(); break;
        case 'motors': html = renderMotorsPage(); break;
        case 'roadmap': html = renderRoadmapPage(); break;
        case 'tools': html = renderToolsPage(); break;
        default:
          if (MotorData.motorTypes[pageId]) { html = renderMotorPage(pageId); }
          else {
            const section = findSection(pageId);
            if (section) html = renderDetailPage(section);
            else html = renderHomePage();
          }
      }
      container.innerHTML = html;

      // 淡入
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });

      updateActiveNav(pageId);
      Progress.updateGlobalBar();
      renderSidebar();

      // KaTeX
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(container, {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
          throwOnError: false,
        });
      }

      // 恢复滚动位置
      const savedY = sessionStorage.getItem('ml_scroll_' + pageId);
      if (savedY && !isNaN(parseInt(savedY))) {
        requestAnimationFrame(() => window.scrollTo(0, parseInt(savedY)));
      } else {
        window.scrollTo(0, 0);
      }

      // 搜索高亮
      if (window._lastSearchKeyword) {
        Search.highlightContent(window._lastSearchKeyword);
      }

      // 图表初始化
      requestAnimationFrame(() => {
        if (pageId === 'roadmap') {
          const el = document.getElementById('knowledge-graph');
          if (el) Charts.renderKnowledgeGraph('knowledge-graph');
        }
        if (pageId === 'tools') {
          const progressEl = document.getElementById('progress-chart');
          if (progressEl) Charts.renderProgressChart('progress-chart');
          Calculator.render('calculators-container');
        }
        // 波形图：扫描详情页内所有 [data-chart] 元素自动渲染
        Charts.renderAll('page-container');
        // 首页计数动画
        if (pageId === 'home') animateCounters();
      });
    }, 150);
  }

  function findSection(id) {
    let found = MotorData.beginner?.sections?.find(s => s.id === id);
    if (found) return { ...found, parent: 'beginner', parentTitle: '入门篇' };
    found = MotorData.advanced?.sections?.find(s => s.id === id);
    if (found) return { ...found, parent: 'advanced', parentTitle: '进阶篇' };
    found = MotorData.robotics?.sections?.find(s => s.id === id);
    if (found) return { ...found, parent: 'robotics', parentTitle: '机器人应用' };
    return null;
  }

  // ========== 首页 ==========
  function renderHomePage() {
    const d = MotorData.home;
    return `<div>
      <div class="page-hero"><h1>${d.title}</h1><p>${d.subtitle}</p></div>

      <!-- 网站介绍 -->
      <div class="home-intro">
        <p style="font-size:1.05rem;line-height:1.85;color:var(--text);max-width:50rem;margin-bottom:1.5rem">${d.intro}</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          ${d.features.map(f => `<div class="home-feature-card">
            <div class="feature-icon">${f.icon}</div>
            <div class="feature-label">${f.label}</div>
            <div class="feature-desc">${f.desc}</div>
          </div>`).join('')}
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${d.stats.map(s => `<div class="text-center p-4 rounded-xl border" style="background:var(--bg-card);border-color:var(--border)">
          <div class="text-2xl font-bold stat-number" data-target="${s.value}" style="color:var(--primary)">0</div>
          <div class="text-sm mt-1" style="color:var(--text-secondary)">${s.label}</div>
        </div>`).join('')}
      </div>
      <h2 class="text-xl font-semibold mb-4">快速开始</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        ${d.quickStart.map(q => `<div class="home-card" onclick="navigateTo('${q.id}')">
          <div class="card-icon" style="background:${q.level === '入门' ? 'rgba(74,140,92,0.1)' : 'rgba(194,136,62,0.1)'};font-size:1.5rem">${q.icon}</div>
          <h3 class="font-semibold mb-1">${q.title}</h3>
          <p class="text-sm" style="color:var(--text-secondary)">${q.desc}</p>
          <span class="inline-block mt-3 px-2 py-0.5 text-xs rounded-full" style="background:${q.level === '入门' ? 'rgba(74,140,92,0.12);color:var(--success)' : 'rgba(194,136,62,0.12);color:var(--primary)'}">${q.level}</span>
        </div>`).join('')}
      </div>
      <h2 class="text-xl font-semibold mb-4">电机类型速览</h2>
      <div class="overflow-x-auto mb-6">${renderCompareTable()}</div>
    </div>`;
  }

  // 数字计数动画
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const raw = el.dataset.target;
      const num = parseInt(raw);
      if (isNaN(num)) { el.textContent = raw; return; }
      const suffix = raw.replace(/\d+/g, '');
      let current = 0;
      const step = Math.max(1, Math.ceil(num / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= num) { current = num; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 30);
    });
  }

  // ========== 章节/分类页 ==========
  function renderSectionPage(sectionData) {
    if (!sectionData) return '<p>内容加载中...</p>';
    return `<div>
      <div class="page-hero"><h1>${sectionData.title}</h1><p>${sectionData.subtitle}</p></div>
      <div class="space-y-1">
        ${sectionData.sections.map(s => {
          const status = Progress.get(s.id);
          const statusClass = status === 'completed' ? 'completed' : status === 'learning' ? 'learning' : '';
          const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
          const statusText = status === 'completed' ? '已完成' : status === 'learning' ? '学习中' : '标记学习';
          const statusIcon = status === 'completed' ? '✓' : status === 'learning' ? '◐' : '○';
          const isFav = Favorites.has(s.id);
          const hasQuiz = QuizData[s.id]?.length > 0;
          return `<div class="knowledge-card ${statusClass}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <h3><span>${s.icon}</span>
                  <a href="#" onclick="navigateTo('${s.id}');return false;" style="color:var(--primary)">${s.title}</a>
                  ${hasQuiz ? '<span class="text-xs px-1.5 py-0.5 rounded ml-1" style="background:rgba(194,136,62,0.1);color:var(--primary)">测验</span>' : ''}
                </h3>
                <p class="card-desc">${s.desc}</p>
                ${s.tags?.length ? `<div class="card-tags">${s.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>` : ''}
              </div>
              <div class="flex items-center gap-1">
                <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${s.id}')">${isFav ? '★' : '☆'}</button>
                <button class="status-btn ${statusBtnClass}" onclick="toggleProgress('${s.id}',this)">
                  <span>${statusIcon}</span><span class="hidden sm:inline">${statusText}</span>
                </button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  // ========== 知识点详情页 ==========
  function renderDetailPage(section) {
    const isFav = Favorites.has(section.id);
    const quiz = QuizData[section.id];
    return `<div>
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm mb-2" style="color:var(--text-secondary)">
          <a href="#" onclick="navigateTo('${section.parent}');return false;" style="color:var(--primary)">${section.parentTitle}</a><span>/</span><span>${section.title}</span>
        </div>
        <h1>${section.title}</h1><p>${section.desc}</p>
      </div>
      <div class="prose max-w-none">${section.content}</div>
      ${quiz ? Quiz.render(section.id, quiz) : ''}
      <div class="mt-8 pt-6 border-t flex items-center justify-between" style="border-color:var(--border)">
        <div class="flex items-center gap-2 text-sm" style="color:var(--text-secondary)">
          <span>学习状态：</span>
          ${['pending', 'learning', 'completed'].map(s => {
            const cur = Progress.get(section.id);
            const label = { pending: '未开始', learning: '学习中', completed: '已完成' }[s];
            const cls = cur === s ? (s === 'completed' ? 'status-completed' : s === 'learning' ? 'status-learning' : '') : '';
            return `<button class="status-btn ${cls}" onclick="setProgress('${section.id}','${s}',this)">${label}</button>`;
          }).join('')}
          <span class="mx-1">|</span>
          <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${section.id}')">${isFav ? '★ 已收藏' : '☆ 收藏'}</button>
        </div>
        <button class="text-sm hover:underline" style="color:var(--primary)" onclick="navigateTo('${section.parent}')">← 返回${section.parentTitle}</button>
      </div>
    </div>`;
  }

  // ========== 电机详情页 ==========
  function renderMotorPage(motorId) {
    const motor = MotorData.motorTypes[motorId];
    if (!motor) return '<p>内容加载中...</p>';
    const status = Progress.get('motor-' + motorId);
    const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
    const isFav = Favorites.has(motorId);
    return `<div>
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm mb-2" style="color:var(--text-secondary)">
          <a href="#" onclick="navigateTo('home');return false;" style="color:var(--primary)">首页</a><span>/</span><span>电机分类</span><span>/</span><span>${motor.title}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-3xl">${motor.icon}</span>
          <div><h1>${motor.title}</h1><p>${motor.subtitle}</p></div>
          <div class="ml-auto flex items-center gap-1">
            <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${motorId}')">${isFav ? '★' : '☆'}</button>
            <button class="status-btn ${statusBtnClass}" onclick="toggleProgress('motor-${motorId}',this)">
              ${status === 'completed' ? '✓ 已完成' : status === 'learning' ? '◐ 学习中' : '○ 标记学习'}
            </button>
          </div>
        </div>
      </div>
      <div class="info-box info mb-6">
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>${motor.overview}</div>
      </div>
      <div class="knowledge-card mb-6"><h3>主要参数</h3>
        <div class="overflow-x-auto mt-2"><table class="compare-table">
          ${Object.entries(motor.specs).map(([k, v]) => `<tr><td class="font-medium">${k}</td><td>${v}</td></tr>`).join('')}
        </table></div>
      </div>
      <div class="space-y-1">
        ${motor.sections.map(s => `<div class="accordion-item">
          <button class="accordion-header" onclick="toggleAccordion(this)">
            <span>${s.title}</span>
            <svg class="w-5 h-5" style="color:var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-body"><div class="accordion-body-inner">${s.content}</div></div>
        </div>`).join('')}
      </div>
      ${(() => { const quiz = QuizData['motor-' + motorId]; return quiz ? Quiz.render('motor-' + motorId, quiz) : ''; })()}
    </div>`;
  }

  // ========== 学习路径页 ==========
  function renderRoadmapPage() {
    const r = MotorData.roadmap;
    return `<div>
      <div class="page-hero"><h1>学习路径</h1><p>从零开始系统化学习电机控制，推荐的学习路线和资源</p></div>
      <div class="knowledge-card mb-6"><h3>知识图谱</h3><p class="card-desc mb-2">展示各知识点之间的前后依赖关系，可拖拽节点进行交互</p>
        <div id="knowledge-graph" class="chart-container chart-container-lg"></div></div>
      <h2 class="text-xl font-semibold mb-4">推荐学习路线</h2>
      <div class="space-y-4 mb-8">
        ${r.phases.map((phase, i) => `<div class="knowledge-card">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white" style="background:var(--primary)">${i + 1}</div>
            <div><h3 class="text-base">${phase.title}</h3><span class="text-xs" style="color:var(--text-secondary)">${phase.duration}</span></div>
          </div>
          <div class="step-list">${phase.items.map(item => `<div class="step-item"><div>${item}</div></div>`).join('')}</div>
          ${phase.exercises ? `<div class="mt-3 pt-3" style="border-top:1px solid var(--border)">
            <div class="text-sm font-medium mb-2" style="color:var(--primary)">🔧 动手作业</div>
            <div class="step-list">${phase.exercises.map(ex => `<div class="step-item"><div class="text-sm">${ex}</div></div>`).join('')}</div>
          </div>` : ''}
          ${phase.links ? `<div class="mt-3 pt-3 flex flex-wrap gap-2" style="border-top:1px solid var(--border)">
            <span class="text-xs" style="color:var(--text-secondary)">本站相关：</span>
            ${phase.links.map(id => { const s = findSection(id); return s ? `<button class="text-xs px-2 py-1 rounded-full transition-colors" style="background:rgba(194,136,62,0.1);color:var(--primary)" onclick="navigateTo('${id}')">${s.title}</button>` : ''; }).join('')}
          </div>` : ''}
        </div>`).join('')}
      </div>
      <h2 class="text-xl font-semibold mb-4">推荐书单</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        ${r.books.map(b => `<div class="knowledge-card"><h3>${b.title}</h3><p class="text-sm" style="color:var(--text-secondary)">${b.author}</p>
          <p class="card-desc mt-1">${b.desc}</p>
          <span class="inline-block mt-2 px-2 py-0.5 text-xs rounded-full" style="background:${b.level === '入门' ? 'rgba(74,140,92,0.12);color:var(--success)' : 'rgba(194,136,62,0.12);color:var(--primary)'}">${b.level}</span>
        </div>`).join('')}
      </div>
      <h2 class="text-xl font-semibold mb-4">开发板选型</h2>
      <div class="overflow-x-auto"><table class="compare-table">
        <thead><tr><th>方案</th><th>价格</th><th>适用场景</th></tr></thead>
        <tbody>${r.devboards.map(d => `<tr><td class="font-medium">${d.name}</td><td>${d.price}</td><td>${d.use}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>`;
  }

  // ========== 工具箱页 ==========
  function renderToolsPage() {
    return `<div>
      <div class="page-hero"><h1>工具箱</h1><p>电机选型对比、公式计算、学习进度追踪等实用工具</p></div>
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab('tab-compare',this)">电机对比</button>
        <button class="tab-btn" onclick="switchTab('tab-calculators',this)">公式计算器</button>
        <button class="tab-btn" onclick="switchTab('tab-validator',this)">协议校验</button>
        <button class="tab-btn" onclick="switchTab('tab-progress',this)">学习进度</button>
      </div>
      <div id="tab-compare" class="tab-panel active"><div class="overflow-x-auto">${renderCompareTable()}</div></div>
      <div id="tab-calculators" class="tab-panel"><div id="calculators-container"></div></div>
      <div id="tab-validator" class="tab-panel"><div id="validator-container"></div></div>
      <div id="tab-progress" class="tab-panel">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="knowledge-card"><h3>进度概览</h3><div id="progress-chart" class="chart-container"></div></div>
          <div class="knowledge-card"><h3>详细进度</h3><div class="space-y-2 mt-3" id="progress-detail">${renderProgressDetail()}</div>
            <div class="mt-4 pt-3 border-t" style="border-color:var(--border)">
              <button class="text-sm hover:underline" style="color:var(--danger)" onclick="if(confirm('确定重置所有进度？')){localStorage.removeItem('motorlearn_progress');navigateTo('tools');}">重置所有进度</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderProgressDetail() {
    const items = [];
    MotorData.beginner?.sections?.forEach(s => items.push({ id: s.id, title: s.title, icon: s.icon }));
    MotorData.advanced?.sections?.forEach(s => items.push({ id: s.id, title: s.title, icon: s.icon }));
    MotorData.robotics?.sections?.forEach(s => items.push({ id: s.id, title: s.title, icon: s.icon }));
    Object.entries(MotorData.motorTypes).forEach(([k, m]) => items.push({ id: 'motor-' + k, title: m.title, icon: m.icon }));
    return items.map(item => {
      const s = Progress.get(item.id);
      const dot = s === 'completed' ? 'var(--success)' : s === 'learning' ? 'var(--warning)' : 'var(--border)';
      const label = s === 'completed' ? '已完成' : s === 'learning' ? '学习中' : '未开始';
      return `<div class="flex items-center gap-3 py-1">
        <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:${dot}"></span>
        <span class="text-sm flex-1">${item.icon} ${item.title}</span>
        <button class="text-xs hover:underline" style="color:var(--primary)" onclick="toggleProgress('${item.id}',null)">${label}</button>
      </div>`;
    }).join('');
  }

  // ========== 电机分类列表页 ==========
  function renderMotorsPage() {
    return `<div>
      <div class="page-hero"><h1>电机分类</h1><p>了解各类电机的结构、原理、优缺点和典型应用</p></div>
      <div class="space-y-1">
        ${Object.entries(MotorData.motorTypes).map(([id, m]) => {
          const status = Progress.get('motor-' + id);
          const statusClass = status === 'completed' ? 'completed' : status === 'learning' ? 'learning' : '';
          const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
          const statusText = status === 'completed' ? '已完成' : status === 'learning' ? '学习中' : '标记学习';
          const statusIcon = status === 'completed' ? '✓' : status === 'learning' ? '◐' : '○';
          const isFav = Favorites.has(id);
          const hasQuiz = QuizData['motor-' + id]?.length > 0;
          return `<div class="knowledge-card ${statusClass}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <h3><span>${m.icon}</span>
                  <a href="#" onclick="navigateTo('${id}');return false;" style="color:var(--primary)">${m.title}</a>
                  ${hasQuiz ? '<span class="text-xs px-1.5 py-0.5 rounded ml-1" style="background:rgba(194,136,62,0.1);color:var(--primary)">测验</span>' : ''}
                </h3>
                <p class="card-desc">${m.subtitle}</p>
                <div class="card-tags">${Object.entries(m.specs).slice(0, 3).map(([k, v]) => `<span class="card-tag">${k}: ${v}</span>`).join('')}</div>
              </div>
              <div class="flex items-center gap-1">
                <button class="star-btn ${isFav ? 'starred' : ''}" onclick="toggleFav('${id}')">${isFav ? '★' : '☆'}</button>
                <button class="status-btn ${statusBtnClass}" onclick="toggleProgress('motor-${id}',this)">
                  <span>${statusIcon}</span><span class="hidden sm:inline">${statusText}</span>
                </button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="mt-6"><h2 class="text-xl font-semibold mb-4">电机类型速览</h2><div class="overflow-x-auto">${renderCompareTable()}</div></div>
    </div>`;
  }

  // ========== 电机行业页 ==========
  function renderIndustryPage() {
    const d = MotorData.industry;
    if (!d) return '<p>内容加载中...</p>';
    return `<div>
      <div class="page-hero"><h1>${d.title}</h1><p>${d.subtitle}</p></div>
      <div class="space-y-1">
        ${d.sections.map(s => `<div class="accordion-item">
          <button class="accordion-header" onclick="toggleAccordion(this)">
            <span>${s.icon} ${s.title}</span>
            <svg class="w-5 h-5" style="color:var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-body"><div class="accordion-body-inner">${s.content}${s.id && typeof Quiz !== 'undefined' && QuizData[s.id] ? Quiz.render(s.id, QuizData[s.id]) : ''}</div></div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ========== 对比表格 ==========
  function renderCompareTable() {
    const ct = MotorData.compareTable;
    return `<table class="compare-table"><thead><tr>${ct.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${ct.rows.map(row => `<tr>${row.map((c, i) => `<td${i === 0 ? ' class="font-medium"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  // ========== 交互功能 ==========
  // 手风琴（精确高度动画）
  window.toggleAccordion = function (btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // 关闭同级
    btn.parentElement.parentElement.querySelectorAll('.accordion-body.open').forEach(el => {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.offsetHeight; // force reflow
      el.style.maxHeight = '0';
      el.classList.remove('open');
      el.previousElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      body.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.classList.add('open');
      body.addEventListener('transitionend', () => { if (body.classList.contains('open')) body.style.maxHeight = 'none'; }, { once: true });
      // KaTeX
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(body, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
      }
    }
  };

  window.switchTab = function (tabId, btn) {
    const parent = btn.closest('.tab-nav').parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (tabId === 'tab-calculators') Calculator.render('calculators-container');
    if (tabId === 'tab-validator') Validator.render('validator-container');
    if (tabId === 'tab-progress') {
      const el = document.getElementById('progress-chart');
      if (el && !el.dataset.init) { el.dataset.init = '1'; Charts.renderProgressChart('progress-chart'); }
    }
  };

  // 进度切换
  window.toggleProgress = function (id, btn) {
    const s = Progress.toggleStatus(id);
    Progress.updateGlobalBar();
    if (btn) {
      const labels = { pending: ['○', '标记学习', ''], learning: ['◐', '学习中', 'status-learning'], completed: ['✓', '已完成', 'status-completed'] };
      const [icon, text, cls] = labels[s];
      btn.innerHTML = `<span>${icon}</span><span class="hidden sm:inline">${text}</span>`;
      btn.className = 'status-btn ' + cls;
      const card = btn.closest('.knowledge-card');
      if (card) { card.classList.remove('completed', 'learning'); if (s === 'completed') card.classList.add('completed'); else if (s === 'learning') card.classList.add('learning'); }
    }
  };

  window.setProgress = function (id, status, btn) {
    Progress.set(id, status);
    Progress.updateGlobalBar();
    if (btn) {
      btn.parentElement.querySelectorAll('.status-btn').forEach(b => b.classList.remove('status-completed', 'status-learning'));
      btn.classList.add(status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '');
    }
  };

  // 收藏切换
  window.toggleFav = function (id) {
    const isFav = Favorites.toggle(id);
    renderSidebar();
    // 刷新当前页面（更新星标状态）
    renderPage(currentPage);
  };

  // 导航
  window.navigateTo = function (pageId) {
    renderPage(pageId);
    // 移动端关闭侧边栏，桌面端不影响折叠状态
    if (window.innerWidth < 1024) closeSidebar();
    return false;
  };

  // 侧边栏
  let sidebarCollapsed = localStorage.getItem('ml_sidebar_collapsed') === 'true';
  let mobileSidebarOpen = false;   // 移动端抽屉式侧边栏的开合状态

  // 判断是否桌面端（≥1024px）：手机/平板上侧边栏按抽屉模式，不占布局空间
  function isDesktop() { return window.innerWidth >= 1024; }

  function applySidebarState() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main-content');
    const toggle = document.getElementById('sidebar-toggle');
    if (!sidebar || !main) return;
    if (!isDesktop()) {
      // 移动端：主内容占满宽度，侧边栏脱离布局做抽屉
      main.style.marginLeft = '0';
      if (toggle) toggle.style.display = 'none';
      if (!mobileSidebarOpen) sidebar.style.transform = 'translateX(-100%)';
      return;
    }
    // 桌面端：用 inline style 控制折叠
    if (toggle) toggle.style.display = '';
    if (sidebarCollapsed) {
      sidebar.style.transform = 'translateX(-100%)';
      main.style.marginLeft = '0';
      if (toggle) { toggle.style.left = '0'; toggle.classList.add('sidebar-collapsed'); }
    } else {
      sidebar.style.transform = '';
      main.style.marginLeft = '16rem';
      if (toggle) { toggle.style.left = '16rem'; toggle.classList.remove('sidebar-collapsed'); }
    }
  }

  window.closeSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    mobileSidebarOpen = false;
    if (sidebar) sidebar.style.transform = 'translateX(-100%)';
    overlay?.classList.add('hidden');
  };
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar) return;
    mobileSidebarOpen = !mobileSidebarOpen;
    sidebar.style.transform = mobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
    overlay?.classList.toggle('hidden', !mobileSidebarOpen);
  });

  // 桌面端侧边栏折叠按钮
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem('ml_sidebar_collapsed', sidebarCollapsed);
    applySidebarState();
  });

  // 初始化侧边栏状态（必须在 DOM 就绪后执行）
  // applySidebarState 内部已根据屏幕宽度区分桌面/移动端处理 margin
  applySidebarState();

  // 窗口尺寸变化时重新应用（横竖屏切换、缩放窗口）
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applySidebarState();
      // 切到桌面端时若移动抽屉开着，收起它
      if (isDesktop() && mobileSidebarOpen) {
        mobileSidebarOpen = false;
        document.getElementById('sidebar-overlay')?.classList.add('hidden');
      }
    }, 150);
  });

  // 主题切换
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('motorlearn_theme', dark ? 'dark' : 'light');
  }
  const savedTheme = localStorage.getItem('motorlearn_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) applyTheme(true);
  document.getElementById('theme-toggle')?.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));

  // 帮助面板
  document.getElementById('help-btn')?.addEventListener('click', () => {
    const p = document.getElementById('help-panel');
    p.classList.toggle('hidden');
    p.classList.toggle('flex');
  });

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (e.key === 'Escape') { e.target.blur(); document.getElementById('search-results')?.classList.add('hidden'); }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('search-input');
      if (input) { input.focus(); input.select(); }
    }
    if (e.key === 't' || e.key === 'T') applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
    if (e.key === '?') {
      const p = document.getElementById('help-panel');
      p.classList.toggle('hidden');
      p.classList.toggle('flex');
    }
    if (e.key === 'Escape') {
      document.getElementById('search-results')?.classList.add('hidden');
      const hp = document.getElementById('help-panel');
      if (!hp.classList.contains('hidden')) { hp.classList.add('hidden'); hp.classList.remove('flex'); }
      closeSidebar();
    }
  });

  // 回到顶部
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { backToTop?.classList.remove('opacity-0', 'pointer-events-none'); backToTop?.classList.add('opacity-100'); }
    else { backToTop?.classList.add('opacity-0', 'pointer-events-none'); backToTop?.classList.remove('opacity-100'); }
    // 阅读进度条
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    const bar = document.getElementById('reading-bar-inner');
    if (bar) bar.style.width = Math.min(100, pct) + '%';
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ========== 初始化 ==========
  renderSidebar();
  Progress.updateGlobalBar();
  Search.init();
  renderPage('home');
})();

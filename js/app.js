// 电机学习平台 - 主应用逻辑
(function () {
  'use strict';

  let currentPage = 'home';

  // ========== 导航系统 ==========
  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    let html = '';
    MotorData.nav.forEach(item => {
      if (item.children) {
        html += `<div class="nav-section-title">${item.label}</div>`;
        item.children.forEach(child => {
          html += `<a class="nav-item" data-page="${child.id}" onclick="navigateTo('${child.id}')">
            <span class="nav-icon">${MotorData.icons[item.icon] || ''}</span>
            <span>${child.label}</span>
          </a>`;
        });
      } else {
        html += `<a class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">
          <span class="nav-icon">${MotorData.icons[item.icon] || ''}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge ${item.badgeClass}">${item.badge}</span>` : ''}
        </a>`;
      }
    });
    nav.innerHTML = html;
  }

  function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
  }

  // ========== 页面渲染 ==========
  function renderPage(pageId) {
    const container = document.getElementById('page-container');
    if (!container) return;
    currentPage = pageId;

    let html = '';
    switch (pageId) {
      case 'home': html = renderHomePage(); break;
      case 'beginner': html = renderSectionPage(MotorData.beginner); break;
      case 'advanced': html = renderSectionPage(MotorData.advanced); break;
      case 'roadmap': html = renderRoadmapPage(); break;
      case 'tools': html = renderToolsPage(); break;
      default:
        if (MotorData.motorTypes[pageId]) {
          html = renderMotorPage(pageId);
        } else {
          // 检查是否是子知识点
          const section = findSection(pageId);
          if (section) {
            html = renderDetailPage(section);
          } else {
            html = renderHomePage();
          }
        }
    }
    container.innerHTML = html;
    container.scrollTop = 0;
    window.scrollTo(0, 0);
    updateActiveNav(pageId);
    Progress.updateGlobalBar();

    // 渲染KaTeX公式
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    }

    // 初始化图表（延迟确保DOM渲染完成）
    requestAnimationFrame(() => {
      if (pageId === 'roadmap') {
        const graphEl = document.getElementById('knowledge-graph');
        if (graphEl) Charts.renderKnowledgeGraph('knowledge-graph');
      }
      if (pageId === 'tools') {
        const progressEl = document.getElementById('progress-chart');
        if (progressEl) Charts.renderProgressChart('progress-chart');
      }
      if (pageId === 'tools') {
        Calculator.render('calculators-container');
      }
    });
  }

  function findSection(id) {
    let found = MotorData.beginner?.sections?.find(s => s.id === id);
    if (found) return { ...found, parent: 'beginner', parentTitle: '入门篇' };
    found = MotorData.advanced?.sections?.find(s => s.id === id);
    if (found) return { ...found, parent: 'advanced', parentTitle: '进阶篇' };
    return null;
  }

  // ========== 首页 ==========
  function renderHomePage() {
    const d = MotorData.home;
    return `
    <div class="fade-in">
      <div class="page-hero">
        <h1>${d.title}</h1>
        <p>${d.subtitle}</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${d.stats.map(s => `
          <div class="text-center p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="text-2xl font-bold text-${s.color}-600 dark:text-${s.color}-400">${s.value}</div>
            <div class="text-sm text-gray-500 mt-1">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <h2 class="text-xl font-semibold mb-4">快速开始</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        ${d.quickStart.map(q => `
          <div class="home-card" onclick="navigateTo('${q.id}')">
            <div class="card-icon ${q.color} text-2xl">${q.icon}</div>
            <h3 class="font-semibold mb-1">${q.title}</h3>
            <p class="text-sm text-gray-500">${q.desc}</p>
            <div class="mt-3 inline-block px-2 py-0.5 text-xs rounded-full ${q.level === '入门' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}">${q.level}</div>
          </div>
        `).join('')}
      </div>

      <h2 class="text-xl font-semibold mb-4">电机类型速览</h2>
      <div class="overflow-x-auto mb-6">
        ${renderCompareTable()}
      </div>
    </div>`;
  }

  // ========== 章节/分类页 ==========
  function renderSectionPage(sectionData) {
    if (!sectionData) return '<p>内容加载中...</p>';
    return `
    <div class="fade-in">
      <div class="page-hero">
        <h1>${sectionData.title}</h1>
        <p>${sectionData.subtitle}</p>
      </div>
      <div class="space-y-1">
        ${sectionData.sections.map(s => {
          const status = Progress.get(s.id);
          const statusClass = status === 'completed' ? 'completed' : status === 'learning' ? 'learning' : '';
          const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
          const statusText = status === 'completed' ? '已完成' : status === 'learning' ? '学习中' : '标记学习';
          const statusIcon = status === 'completed' ? '✓' : status === 'learning' ? '◐' : '○';
          return `
          <div class="knowledge-card ${statusClass}">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h3>
                  <span>${s.icon}</span>
                  <a href="#" onclick="navigateTo('${s.id}');return false;" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">${s.title}</a>
                </h3>
                <p class="card-desc">${s.desc}</p>
                ${s.tags?.length ? `<div class="card-tags">${s.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>` : ''}
              </div>
              <button class="status-btn ${statusBtnClass}" onclick="toggleProgress('${s.id}', this)" title="点击切换状态">
                <span>${statusIcon}</span>
                <span class="hidden sm:inline">${statusText}</span>
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  // ========== 知识点详情页 ==========
  function renderDetailPage(section) {
    return `
    <div class="fade-in">
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <a href="#" onclick="navigateTo('${section.parent}');return false;" class="hover:text-blue-600">${section.parentTitle}</a>
          <span>/</span>
          <span>${section.title}</span>
        </div>
        <h1>${section.title}</h1>
        <p>${section.desc}</p>
      </div>
      <div class="prose max-w-none">
        ${section.content}
      </div>
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>学习状态：</span>
          ${['pending', 'learning', 'completed'].map(s => {
            const current = Progress.get(section.id);
            const active = current === s;
            const label = { pending: '未开始', learning: '学习中', completed: '已完成' }[s];
            const cls = active ? (s === 'completed' ? 'status-completed' : s === 'learning' ? 'status-learning' : '') : '';
            return `<button class="status-btn ${cls}" onclick="setProgress('${section.id}', '${s}', this)">${label}</button>`;
          }).join('')}
        </div>
        <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline" onclick="navigateTo('${section.parent}')">← 返回${section.parentTitle}</button>
      </div>
    </div>`;
  }

  // ========== 电机详情页 ==========
  function renderMotorPage(motorId) {
    const motor = MotorData.motorTypes[motorId];
    if (!motor) return '<p>内容加载中...</p>';
    const colorMap = { green: 'green', purple: 'purple', red: 'red', cyan: 'cyan', orange: 'orange' };
    const c = colorMap[motor.color] || 'blue';
    const status = Progress.get('motor-' + motorId);
    const statusBtnClass = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';

    return `
    <div class="fade-in">
      <div class="page-hero">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <a href="#" onclick="navigateTo('home');return false;" class="hover:text-blue-600">首页</a>
          <span>/</span>
          <span>电机分类</span>
          <span>/</span>
          <span>${motor.title}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-3xl">${motor.icon}</span>
          <div>
            <h1>${motor.title}</h1>
            <p>${motor.subtitle}</p>
          </div>
          <button class="status-btn ${statusBtnClass} ml-auto" onclick="toggleProgress('motor-${motorId}', this)">
            ${status === 'completed' ? '✓ 已完成' : status === 'learning' ? '◐ 学习中' : '○ 标记学习'}
          </button>
        </div>
      </div>

      <!-- 概述 -->
      <div class="info-box info mb-6">
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>${motor.overview}</div>
      </div>

      <!-- 主要参数 -->
      <div class="knowledge-card mb-6">
        <h3>主要参数</h3>
        <div class="overflow-x-auto mt-2">
          <table class="compare-table">
            ${Object.entries(motor.specs).map(([k, v]) => `<tr><td class="font-medium">${k}</td><td>${v}</td></tr>`).join('')}
          </table>
        </div>
      </div>

      <!-- 手风琴章节 -->
      <div class="space-y-1">
        ${motor.sections.map((s, i) => `
          <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>${s.title}</span>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-body">
              <div class="accordion-body-inner">${s.content}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  // ========== 学习路径页 ==========
  function renderRoadmapPage() {
    const r = MotorData.roadmap;
    return `
    <div class="fade-in">
      <div class="page-hero">
        <h1>学习路径</h1>
        <p>从零开始系统化学习电机控制，推荐的学习路线和资源</p>
      </div>

      <!-- 知识图谱 -->
      <div class="knowledge-card mb-6">
        <h3>知识图谱</h3>
        <p class="card-desc mb-2">展示各知识点之间的前后依赖关系，可拖拽节点进行交互</p>
        <div id="knowledge-graph" class="chart-container chart-container-lg"></div>
      </div>

      <!-- 学习阶段 -->
      <h2 class="text-xl font-semibold mb-4">推荐学习路线</h2>
      <div class="space-y-4 mb-8">
        ${r.phases.map((phase, i) => `
          <div class="knowledge-card">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">${i + 1}</div>
              <div>
                <h3 class="text-base">${phase.title}</h3>
                <span class="text-xs text-gray-500">${phase.duration}</span>
              </div>
            </div>
            <div class="step-list">
              ${phase.items.map(item => `<div class="step-item"><div>${item}</div></div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 推荐书单 -->
      <h2 class="text-xl font-semibold mb-4">推荐书单</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        ${r.books.map(b => `
          <div class="knowledge-card">
            <h3>${b.title}</h3>
            <p class="text-sm text-gray-500">${b.author}</p>
            <p class="card-desc mt-1">${b.desc}</p>
            <span class="inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${b.level === '入门' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}">${b.level}</span>
          </div>
        `).join('')}
      </div>

      <!-- 开发板选型 -->
      <h2 class="text-xl font-semibold mb-4">开发板选型</h2>
      <div class="overflow-x-auto">
        <table class="compare-table">
          <thead><tr><th>方案</th><th>价格</th><th>适用场景</th></tr></thead>
          <tbody>
            ${r.devboards.map(d => `<tr><td class="font-medium">${d.name}</td><td>${d.price}</td><td>${d.use}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  // ========== 工具箱页 ==========
  function renderToolsPage() {
    return `
    <div class="fade-in">
      <div class="page-hero">
        <h1>工具箱</h1>
        <p>电机选型对比、公式计算、学习进度追踪等实用工具</p>
      </div>

      <!-- 标签页 -->
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab('tab-compare', this)">电机对比</button>
        <button class="tab-btn" onclick="switchTab('tab-calculators', this)">公式计算器</button>
        <button class="tab-btn" onclick="switchTab('tab-progress', this)">学习进度</button>
      </div>

      <!-- 电机对比 -->
      <div id="tab-compare" class="tab-panel active">
        <div class="overflow-x-auto">
          ${renderCompareTable()}
        </div>
      </div>

      <!-- 计算器 -->
      <div id="tab-calculators" class="tab-panel">
        <div id="calculators-container"></div>
      </div>

      <!-- 学习进度 -->
      <div id="tab-progress" class="tab-panel">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="knowledge-card">
            <h3>进度概览</h3>
            <div id="progress-chart" class="chart-container"></div>
          </div>
          <div class="knowledge-card">
            <h3>详细进度</h3>
            <div class="space-y-2 mt-3" id="progress-detail">
              ${renderProgressDetail()}
            </div>
            <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button class="text-sm text-red-500 hover:text-red-600" onclick="if(confirm('确定要重置所有学习进度吗？')){localStorage.removeItem('motorlearn_progress');navigateTo('tools');}">重置所有进度</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderProgressDetail() {
    const items = [];
    MotorData.beginner?.sections?.forEach(s => items.push({ id: s.id, title: s.title, icon: s.icon, group: '入门篇' }));
    MotorData.advanced?.sections?.forEach(s => items.push({ id: s.id, title: s.title, icon: s.icon, group: '进阶篇' }));
    Object.entries(MotorData.motorTypes).forEach(([k, m]) => items.push({ id: 'motor-' + k, title: m.title, icon: m.icon, group: '电机' }));

    return items.map(item => {
      const status = Progress.get(item.id);
      const dotColor = status === 'completed' ? 'bg-green-500' : status === 'learning' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600';
      const label = status === 'completed' ? '已完成' : status === 'learning' ? '学习中' : '未开始';
      return `
        <div class="flex items-center gap-3 py-1">
          <span class="w-2 h-2 rounded-full ${dotColor} flex-shrink-0"></span>
          <span class="text-sm flex-1">${item.icon} ${item.title}</span>
          <button class="text-xs text-gray-400 hover:text-blue-500" onclick="toggleProgress('${item.id}', null)">${label}</button>
        </div>`;
    }).join('');
  }

  // ========== 对比表格 ==========
  function renderCompareTable() {
    const ct = MotorData.compareTable;
    return `
      <table class="compare-table">
        <thead><tr>${ct.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${ct.rows.map(row => `<tr>${row.map((cell, i) => `<td${i === 0 ? ' class="font-medium"' : ''}>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>`;
  }

  // ========== 交互功能 ==========
  // 手风琴切换
  window.toggleAccordion = function (btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // 关闭同级
    btn.parentElement.parentElement.querySelectorAll('.accordion-body.open').forEach(el => {
      el.classList.remove('open');
      el.previousElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      body.classList.add('open');
      btn.classList.add('open');
      // 渲染KaTeX
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(body, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
      }
    }
  };

  // 标签页切换
  window.switchTab = function (tabId, btn) {
    const parent = btn.closest('.tab-nav').parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');

    // 初始化计算器和图表
    if (tabId === 'tab-calculators') Calculator.render('calculators-container');
    if (tabId === 'tab-progress') {
      const chartEl = document.getElementById('progress-chart');
      if (chartEl && !chartEl.dataset.init) {
        chartEl.dataset.init = '1';
        Charts.renderProgressChart('progress-chart');
      }
    }
  };

  // 进度切换
  window.toggleProgress = function (id, btn) {
    const newStatus = Progress.toggleStatus(id);
    Progress.updateGlobalBar();
    // 更新按钮UI
    if (btn) {
      const labels = { pending: ['○', '标记学习', ''], learning: ['◐', '学习中', 'status-learning'], completed: ['✓', '已完成', 'status-completed'] };
      const [icon, text, cls] = labels[newStatus];
      btn.innerHTML = `<span>${icon}</span><span class="hidden sm:inline">${text}</span>`;
      btn.className = 'status-btn ' + cls;
      // 更新卡片状态
      const card = btn.closest('.knowledge-card');
      if (card) {
        card.classList.remove('completed', 'learning');
        if (newStatus === 'completed') card.classList.add('completed');
        else if (newStatus === 'learning') card.classList.add('learning');
      }
    }
  };

  window.setProgress = function (id, status, btn) {
    Progress.set(id, status);
    Progress.updateGlobalBar();
    // 刷新按钮
    if (btn) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.status-btn').forEach(b => {
        b.classList.remove('status-completed', 'status-learning');
      });
      const cls = status === 'completed' ? 'status-completed' : status === 'learning' ? 'status-learning' : '';
      btn.classList.add(cls);
    }
  };

  // 导航
  window.navigateTo = function (pageId) {
    renderPage(pageId);
    closeSidebar();
    return false;
  };

  // 侧边栏开关
  window.closeSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar?.classList.remove('translate-x-0');
    sidebar?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
  };

  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar?.classList.toggle('-translate-x-full');
    sidebar?.classList.toggle('translate-x-0');
    overlay?.classList.toggle('hidden');
  });

  // 主题切换
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('motorlearn_theme', dark ? 'dark' : 'light');
  }
  // 读取主题
  const savedTheme = localStorage.getItem('motorlearn_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    applyTheme(true);
  }
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
  });

  // 回到顶部
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop?.classList.remove('opacity-0', 'pointer-events-none');
      backToTop?.classList.add('opacity-100');
    } else {
      backToTop?.classList.add('opacity-0', 'pointer-events-none');
      backToTop?.classList.remove('opacity-100');
    }
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ========== 初始化 ==========
  renderSidebar();
  Progress.updateGlobalBar();
  Search.init();
  renderPage('home');

})();

// 搜索功能模块（含 debounce + 内容高亮）
const Search = {
  index: [],
  _timer: null,

  buildIndex() {
    this.index = [];
    MotorData.beginner?.sections?.forEach(s => {
      // 入门篇知识点：详情页就是 section.id 本身
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], target: s.id });
    });
    MotorData.advanced?.sections?.forEach(s => {
      // 进阶篇知识点：详情页就是 section.id 本身
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], target: s.id });
    });
    MotorData.robotics?.sections?.forEach(s => {
      // 机器人应用篇：详情页就是 section.id 本身
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], target: s.id });
    });
    Object.entries(MotorData.motorTypes || {}).forEach(([key, m]) => {
      // 电机概览：详情页是电机 key
      this.index.push({ id: key, title: m.title, desc: m.overview.substring(0, 80) + '...', tags: [key], target: key });
      m.sections?.forEach(s => {
        // 电机子章节：进入电机详情页后展开对应手风琴
        this.index.push({ id: key, title: m.title + ' - ' + s.title, desc: s.content?.replace(/<[^>]*>/g, '').substring(0, 100) || '', tags: [], target: key, scrollTo: s.title });
      });
    });
    MotorData.industry?.sections?.forEach(s => {
      // 行业科普：进入行业页后展开对应手风琴
      this.index.push({ id: 'industry', title: s.title, desc: s.desc, tags: s.tags || [], target: 'industry', scrollTo: s.title });
    });
  },

  query(keyword) {
    if (!keyword.trim()) return [];
    const kw = keyword.toLowerCase();
    return this.index.filter(item => {
      return item.title.toLowerCase().includes(kw) ||
        item.desc.toLowerCase().includes(kw) ||
        item.tags.some(t => t.toLowerCase().includes(kw));
    }).slice(0, 10);
  },

  init() {
    this.buildIndex();
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    input.addEventListener('input', () => {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        const kw = input.value;
        if (!kw.trim()) { results.classList.add('hidden'); return; }
        const matches = this.query(kw);
        if (matches.length === 0) {
          results.innerHTML = '<div class="p-3 text-sm" style="color:var(--text-secondary)">未找到匹配结果</div>';
          results.classList.remove('hidden');
          return;
        }
        window._lastSearchKeyword = kw;
        results.innerHTML = matches.map(m => `
          <button class="w-full text-left px-3 py-2 border-b transition-colors" style="border-color:var(--border)" onclick="Search.jumpTo(${JSON.stringify({ target: m.target, scrollTo: m.scrollTo }).replace(/"/g, '&quot;')})">
            <div class="text-sm font-medium" style="color:var(--text)">${this.highlight(m.title, kw)}</div>
            <div class="text-xs truncate" style="color:var(--text-secondary)">${this.highlight(m.desc, kw)}</div>
          </button>
        `).join('');
        results.classList.remove('hidden');
      }, 300);
    });

    input.addEventListener('focus', () => { if (input.value.trim()) results.classList.remove('hidden'); });
    document.addEventListener('click', (e) => { if (!input.contains(e.target) && !results.contains(e.target)) results.classList.add('hidden'); });
  },

  highlight(text, kw) {
    const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  },

  // 搜索结果点击跳转：导航到目标页，并展开/滚动到指定手风琴
  jumpTo({ target, scrollTo } = {}) {
    // 关闭搜索面板并清空输入
    document.getElementById('search-results')?.classList.add('hidden');
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    // 清除高亮关键词，避免后续访问的每个页面都被持续高亮（搜索行为应仅影响本次跳转）
    window._lastSearchKeyword = '';
    if (!target) return;
    navigateTo(target);
    if (scrollTo) {
      // 等页面渲染完成（renderPage 内有 150ms 淡出延迟）
      setTimeout(() => {
        const container = document.getElementById('page-container');
        if (!container) return;
        // 找到标题文本匹配的手风琴头部
        const headers = container.querySelectorAll('.accordion-header');
        let matched = null;
        headers.forEach(h => {
          if (h.textContent.trim().includes(scrollTo)) matched = h;
        });
        if (matched) {
          // 展开手风琴（若已折叠）
          if (!matched.classList.contains('open') && typeof toggleAccordion === 'function') {
            toggleAccordion(matched);
          }
          matched.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 260);
    }
  },

  // 在页面内容中高亮搜索关键词
  highlightContent(keyword) {
    if (!keyword || !keyword.trim()) return;
    const container = document.getElementById('page-container');
    if (!container) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (['PRE', 'CODE', 'SCRIPT', 'STYLE', 'MARK'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!regex.test(node.textContent)) return;
      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      const text = node.textContent;
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = match[1];
        frag.appendChild(mark);
        lastIdx = regex.lastIndex;
      }
      if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      node.parentNode.replaceChild(frag, node);
    });
  },
};

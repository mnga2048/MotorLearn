// 搜索功能模块（含 debounce + 内容高亮）
const Search = {
  index: [],
  _timer: null,

  buildIndex() {
    this.index = [];
    MotorData.beginner?.sections?.forEach(s => {
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], page: 'beginner' });
    });
    MotorData.advanced?.sections?.forEach(s => {
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], page: 'advanced' });
    });
    Object.entries(MotorData.motorTypes || {}).forEach(([key, m]) => {
      this.index.push({ id: 'motor-' + key, title: m.title, desc: m.overview.substring(0, 80) + '...', tags: [key], page: key });
      m.sections?.forEach(s => {
        this.index.push({ id: 'motor-' + key, title: m.title + ' - ' + s.title, desc: s.content?.replace(/<[^>]*>/g, '').substring(0, 100) || '', tags: [], page: key, scrollTo: s.title });
      });
    });
    MotorData.industry?.sections?.forEach(s => {
      this.index.push({ id: 'industry', title: s.title, desc: s.desc, tags: s.tags || [], page: 'industry' });
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
          <button class="w-full text-left px-3 py-2 border-b transition-colors" style="border-color:var(--border)" onclick="navigateTo('${m.page}');document.getElementById('search-results').classList.add('hidden');document.getElementById('search-input').value='';">
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

// 搜索功能模块
const Search = {
  index: [],

  buildIndex() {
    this.index = [];
    // 入门篇
    MotorData.beginner?.sections?.forEach(s => {
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], page: 'beginner' });
    });
    // 进阶篇
    MotorData.advanced?.sections?.forEach(s => {
      this.index.push({ id: s.id, title: s.title, desc: s.desc, tags: s.tags || [], page: 'advanced' });
    });
    // 电机类型
    Object.entries(MotorData.motorTypes || {}).forEach(([key, m]) => {
      this.index.push({ id: 'motor-' + key, title: m.title, desc: m.overview.substring(0, 80) + '...', tags: [key], page: key });
      m.sections?.forEach(s => {
        this.index.push({ id: 'motor-' + key, title: m.title + ' - ' + s.title, desc: s.content?.replace(/<[^>]*>/g, '').substring(0, 100) || '', tags: [], page: key, scrollTo: s.title });
      });
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
      const kw = input.value;
      if (!kw.trim()) { results.classList.add('hidden'); return; }
      const matches = this.query(kw);
      if (matches.length === 0) {
        results.innerHTML = '<div class="p-3 text-sm text-gray-500">未找到匹配结果</div>';
        results.classList.remove('hidden');
        return;
      }
      results.innerHTML = matches.map(m => `
        <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors" onclick="navigateTo('${m.page}');document.getElementById('search-results').classList.add('hidden');document.getElementById('search-input').value='';">
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">${this.highlight(m.title, kw)}</div>
          <div class="text-xs text-gray-500 truncate">${this.highlight(m.desc, kw)}</div>
        </button>
      `).join('');
      results.classList.remove('hidden');
    });

    input.addEventListener('focus', () => { if (input.value.trim()) results.classList.remove('hidden'); });
    document.addEventListener('click', (e) => { if (!input.contains(e.target) && !results.contains(e.target)) results.classList.add('hidden'); });
  },

  highlight(text, kw) {
    const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">$1</mark>');
  },
};

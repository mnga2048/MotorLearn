// 学习进度管理模块
const Progress = {
  STORAGE_KEY: 'motorlearn_progress',

  get(key) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      return data[key] || null;
    } catch { return null; }
  },

  set(key, status) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      data[key] = status;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.warn('localStorage write failed:', e); }
  },

  remove(key) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      delete data[key];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch {}
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'); } catch { return {}; }
  },

  getStats() {
    const data = this.getAll();
    const total = AllKnowledgeIds.length;
    let completed = 0, learning = 0;
    AllKnowledgeIds.forEach(id => {
      if (data[id] === 'completed') completed++;
      else if (data[id] === 'learning') learning++;
    });
    return { total, completed, learning, pending: total - completed - learning };
  },

  toggleStatus(key) {
    const current = this.get(key);
    if (!current || current === 'pending') { this.set(key, 'learning'); return 'learning'; }
    if (current === 'learning') { this.set(key, 'completed'); return 'completed'; }
    this.remove(key); return 'pending';
  },

  updateGlobalBar() {
    const stats = this.getStats();
    const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    const bar = document.getElementById('global-progress-bar');
    const text = document.getElementById('global-progress-text');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  },
};

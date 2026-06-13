// 收藏/书签模块
const Favorites = {
  STORAGE_KEY: 'motorlearn_favorites',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); } catch { return []; }
  },

  toggle(id) {
    const list = this.getAll();
    const idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    return idx > -1 ? false : true;
  },

  has(id) { return this.getAll().includes(id); },

  getInfo(id) {
    // 查找标题和图标
    let section = MotorData.beginner?.sections?.find(s => s.id === id);
    if (section) return { id, title: section.title, icon: section.icon, page: 'beginner' };
    section = MotorData.advanced?.sections?.find(s => s.id === id);
    if (section) return { id, title: section.title, icon: section.icon, page: 'advanced' };
    const motor = MotorData.motorTypes?.[id];
    if (motor) return { id, title: motor.title, icon: motor.icon, page: id };
    return { id, title: id, icon: '📄', page: 'home' };
  },
};

// 浏览历史模块
const History = {
  STORAGE_KEY: 'motorlearn_history',
  MAX_ITEMS: 5,

  add(id) {
    let list = this.getAll().filter(h => h.id !== id);
    const info = Favorites.getInfo(id);
    list.unshift({ ...info, timestamp: Date.now() });
    if (list.length > this.MAX_ITEMS) list = list.slice(0, this.MAX_ITEMS);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); } catch { return []; }
  },
};

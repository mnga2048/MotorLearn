// 协议校验工具模块
const Validator = (() => {
  'use strict';

  // ========== 校验算法定义 ==========
  const algorithms = [
    { id: 'crc16', label: 'Modbus CRC-16', info: '多项式 <b>0x8005</b>（反转 0xA001）| 初始值 <b>0xFFFF</b> | 输入/输出反转: 是', bytes: 2 },
    { id: 'crc8', label: 'CRC-8', info: '多项式 <b>0x31</b> | 初始值 <b>0x00</b> | 常用于 1-Wire / DS18B20 等传感器协议', bytes: 1 },
    { id: 'crc32', label: 'CRC-32', info: '多项式 <b>0x04C11DB7</b> | 初始值 <b>0xFFFFFFFF</b> | 结果异或 <b>0xFFFFFFFF</b>，通用数据校验', bytes: 4 },
    { id: 'xor', label: 'XOR 校验', info: '所有字节逐位异或（BCC），最简单的校验方式', bytes: 1 },
    { id: 'sum', label: '累加和', info: '所有字节求和后 <b>& 0xFF</b>，常用于简单串口协议', bytes: 1 },
    { id: 'negate', label: '取反校验', info: '帧格式：<b>FF FF</b> 帧头 + 数据 + 校验字节。校验 = <b>~(数据求和) & 0xFF</b>', bytes: 1 },
  ];

  // ========== CRC 查找表 ==========
  const crc16Table = (() => {
    const t = new Uint16Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >> 1) ^ 0xA001) : (c >> 1);
      t[i] = c;
    }
    return t;
  })();

  const crc8Table = (() => {
    const t = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >> 1) ^ 0x8C) : (c >> 1); // 0x31 reversed = 0x8C
      t[i] = c;
    }
    return t;
  })();

  const crc32Table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1); // 0x04C11DB7 reversed
      t[i] = c;
    }
    return t;
  })();

  // ========== 校验计算函数 ==========
  function compute(id, data) {
    switch (id) {
      case 'crc16': {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) crc = crc16Table[(crc ^ data[i]) & 0xFF] ^ (crc >> 8);
        return crc & 0xFFFF;
      }
      case 'crc8': {
        let crc = 0x00;
        for (let i = 0; i < data.length; i++) crc = crc8Table[(crc ^ data[i]) & 0xFF];
        return crc & 0xFF;
      }
      case 'crc32': {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) crc = crc32Table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
      }
      case 'xor': {
        let r = 0;
        for (let i = 0; i < data.length; i++) r ^= data[i];
        return r & 0xFF;
      }
      case 'sum': {
        let s = 0;
        for (let i = 0; i < data.length; i++) s += data[i];
        return s & 0xFF;
      }
      case 'negate': {
        let s = 0;
        for (let i = 0; i < data.length; i++) s += data[i];
        return (~s) & 0xFF;
      }
    }
    return 0;
  }

  // ========== 格式化 ==========
  function hex2(v) { return (v & 0xFF).toString(16).toUpperCase().padStart(2, '0'); }
  function hexN(v, n) {
    const s = (v >>> 0).toString(16).toUpperCase().padStart(n * 2, '0');
    return s.match(/.{2}/g).join(' ');
  }
  function dataStr(data) { return data.map(hex2).join(' '); }

  // ========== 解析十六进制 ==========
  function parseHex(str) {
    str = str.trim().replace(/0x/gi, '').replace(/[,;，；\n\r]+/g, ' ');
    if (!str) return null;
    const parts = str.split(/\s+/);
    const bytes = [];
    for (const p of parts) {
      if (!p) continue;
      if (p.length > 2) {
        for (let i = 0; i < p.length; i += 2) {
          const b = p.substr(i, 2);
          if (/^[0-9a-fA-F]{1,2}$/.test(b)) bytes.push(parseInt(b, 16));
          else return null;
        }
      } else if (/^[0-9a-fA-F]{1,2}$/.test(p)) {
        bytes.push(parseInt(p, 16));
      } else return null;
    }
    return bytes.length > 0 ? bytes : null;
  }

  // ========== 历史记录 ==========
  const histories = {};
  function addHistory(algoId, entry) {
    if (!histories[algoId]) histories[algoId] = [];
    histories[algoId].unshift(entry);
    if (histories[algoId].length > 15) histories[algoId].length = 15;
    renderHistory(algoId);
  }
  function renderHistory(algoId) {
    const list = document.getElementById('val-history-' + algoId);
    const sec = document.getElementById('val-history-sec-' + algoId);
    const arr = histories[algoId] || [];
    if (!list || !sec) return;
    if (arr.length === 0) { sec.style.display = 'none'; return; }
    sec.style.display = 'block';
    list.innerHTML = arr.map((h, i) => {
      const status = h.mode === 'verify'
        ? (h.ok ? '<span style="color:var(--success);font-size:11px">PASS</span>' : '<span style="color:var(--danger);font-size:11px">FAIL</span>')
        : '';
      return `<div class="val-history-item" onclick="Validator.loadHistory('${algoId}',${i})">
        <span style="color:var(--text-secondary)">${h.data}</span>
        <span><span style="color:var(--success)">${h.chk}</span> ${status}</span>
      </div>`;
    }).join('');
  }

  // ========== 核心 UI ==========
  let currentAlgo = 'crc16';

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="val-tabs">
        ${algorithms.map(a => `<button class="val-tab-btn${a.id === currentAlgo ? ' active' : ''}" onclick="Validator.switchAlgo('${a.id}')">${a.label}</button>`).join('')}
      </div>
      <div id="val-panel">${renderAlgoPanel(currentAlgo)}</div>
    `;
  }

  function renderAlgoPanel(algoId) {
    const algo = algorithms.find(a => a.id === algoId);
    if (!algo) return '';
    return `
      <div class="formula-block text-sm mb-4">
        <div style="text-align:left">${algo.info}</div>
      </div>
      <div class="val-mode-row">
        <label><input type="radio" name="valMode" value="calc" checked> 计算</label>
        <label><input type="radio" name="valMode" value="verify"> 校验</label>
      </div>
      <label style="display:block;font-size:0.8125rem;font-weight:500;color:var(--text-secondary);margin-bottom:6px">
        输入十六进制数据${algoId === 'negate' ? '（不含帧头 FF FF）' : ''}
      </label>
      <textarea id="val-input" class="val-textarea" placeholder="示例：01 03 00 00 00 0A" rows="3"></textarea>
      <div class="val-btn-row">
        <button class="val-btn-primary" onclick="Validator.calculate()">计算 / 校验</button>
        <button class="val-btn-secondary" onclick="Validator.clear()">清空</button>
      </div>
      <div id="val-result" class="val-result-area">
        <div class="calc-result">
          <div class="val-result-row">
            <span class="val-result-title">校验值</span>
            <span class="val-result-value" id="val-chk"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-chk')">复制</button>
          </div>
          ${algo.bytes > 1 ? `<div class="val-result-row">
            <span class="val-result-title">字节序（高前低后）</span>
            <span class="val-result-value" id="val-hl"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-hl')">复制</button>
          </div>` : ''}
          ${algo.bytes === 2 ? `<div class="val-result-row">
            <span class="val-result-title">字节序（低前高后）Modbus</span>
            <span class="val-result-value" id="val-lh"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-lh')">复制</button>
          </div>` : ''}
          <div class="val-result-row">
            <span class="val-result-title">完整帧</span>
            <span class="val-result-value" id="val-frame"></span>
            <button class="val-copy-btn" onclick="Validator.copy('val-frame')">复制</button>
          </div>
          ${algoId === 'negate' ? '<div class="val-result-row"><span class="val-result-title">完整帧（含帧头 FF FF）</span><span class="val-result-value" id="val-frame-hdr"></span><button class="val-copy-btn" onclick="Validator.copy(\'val-frame-hdr\')">复制</button></div>' : ''}
          <div id="val-verify-row" class="val-result-row" style="display:none">
            <span class="val-result-title">校验结果</span>
            <span class="val-result-value" id="val-verify"></span>
          </div>
        </div>
      </div>
      <div id="val-history-sec-${algoId}" class="val-history-sec" style="display:none">
        <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:1rem;margin-bottom:0.5rem">历史记录</div>
        <div class="val-history-list" id="val-history-${algoId}"></div>
      </div>
    `;
    renderHistory(algoId);
  }

  function calculate() {
    const data = parseHex(document.getElementById('val-input')?.value || '');
    if (!data) { alert('请输入有效的十六进制数据'); return; }

    const mode = document.querySelector('input[name="valMode"]:checked')?.value || 'calc';
    const algo = algorithms.find(a => a.id === currentAlgo);
    const algoId = currentAlgo;
    const ds = dataStr(data);

    // 取反校验的特殊处理
    if (algoId === 'negate') {
      if (mode === 'calc') {
        const chk = compute('negate', data);
        const sum = data.reduce((a, b) => a + b, 0);
        document.getElementById('val-chk').textContent = '0x' + hex2(chk);
        document.getElementById('val-frame').textContent = ds + ' ' + hex2(chk);
        document.getElementById('val-frame-hdr').textContent = 'FF FF ' + ds + ' ' + hex2(chk);
        document.getElementById('val-verify-row').style.display = 'none';
        addHistory(algoId, { data: ds, chk: hex2(chk), ok: true, mode: 'calc' });
      } else {
        let frame;
        if (data[0] === 0xFF && data[1] === 0xFF) {
          frame = data;
        } else {
          frame = [0xFF, 0xFF, ...data];
        }
        if (frame.length < 4) { alert('帧太短，至少需要 FF FF + 1字节数据 + 1字节校验'); return; }
        const payload = frame.slice(2, -1);
        const recvChk = frame[frame.length - 1];
        const calcChk = compute('negate', payload);
        const sum = payload.reduce((a, b) => a + b, 0);
        const vr = document.getElementById('val-verify');
        document.getElementById('val-chk').textContent = '0x' + hex2(calcChk);
        document.getElementById('val-frame').textContent = dataStr(payload);
        document.getElementById('val-frame-hdr').textContent = dataStr(frame);
        const vrRow = document.getElementById('val-verify-row');
        vrRow.style.display = 'flex';
        if (recvChk === calcChk) {
          vr.textContent = '通过  接收 0x' + hex2(recvChk) + ' = 计算 0x' + hex2(calcChk);
          vr.style.color = 'var(--success)';
        } else {
          vr.textContent = '失败  接收 0x' + hex2(recvChk) + ' != 计算 0x' + hex2(calcChk);
          vr.style.color = 'var(--danger)';
        }
        addHistory(algoId, { data: dataStr(payload), chk: hex2(recvChk), ok: recvChk === calcChk, mode: 'verify' });
      }
      document.getElementById('val-result').style.display = 'block';
      return;
    }

    // 通用校验逻辑（CRC-16, CRC-8, CRC-32, XOR, SUM）
    if (mode === 'calc') {
      const chk = compute(algoId, data);
      document.getElementById('val-chk').textContent = '0x' + (algo.bytes === 1 ? hex2(chk) : hexN(chk, algo.bytes));
      if (algo.bytes >= 2) {
        const hi = (chk >> 8) & 0xFF, lo = chk & 0xFF;
        document.getElementById('val-hl').textContent = hex2(hi) + ' ' + hex2(lo);
        if (algo.bytes === 2) {
          document.getElementById('val-lh').textContent = hex2(lo) + ' ' + hex2(hi);
          document.getElementById('val-frame').textContent = ds + ' ' + hex2(lo) + ' ' + hex2(hi);
        } else {
          const bytes = [];
          for (let i = algo.bytes - 1; i >= 0; i--) bytes.push((chk >> (i * 8)) & 0xFF);
          document.getElementById('val-frame').textContent = ds + ' ' + bytes.map(hex2).join(' ');
        }
      } else {
        document.getElementById('val-frame').textContent = ds + ' ' + hex2(chk);
      }
      document.getElementById('val-verify-row').style.display = 'none';
      const chkDisplay = algo.bytes === 1 ? hex2(chk) : hexN(chk, algo.bytes);
      addHistory(algoId, { data: ds, chk: chkDisplay, ok: true, mode: 'calc' });
    } else {
      if (data.length < algo.bytes + 1) { alert('数据太短，无法校验'); return; }
      const payload = data.slice(0, -algo.bytes);
      const recvBytes = data.slice(-algo.bytes);
      let recvVal = 0;
      for (let i = 0; i < algo.bytes; i++) recvVal |= recvBytes[i] << (i * 8); // 低字节在前
      const calcVal = compute(algoId, payload);
      const vr = document.getElementById('val-verify');
      document.getElementById('val-chk').textContent = '0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
      if (algo.bytes >= 2) {
        const hi = (calcVal >> 8) & 0xFF, lo = calcVal & 0xFF;
        document.getElementById('val-hl').textContent = hex2(hi) + ' ' + hex2(lo);
        if (algo.bytes === 2) {
          document.getElementById('val-lh').textContent = hex2(lo) + ' ' + hex2(hi);
          document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + hex2(lo) + ' ' + hex2(hi);
        } else {
          const bytes = [];
          for (let i = algo.bytes - 1; i >= 0; i--) bytes.push((calcVal >> (i * 8)) & 0xFF);
          document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + bytes.map(hex2).join(' ');
        }
      } else {
        document.getElementById('val-frame').textContent = dataStr(payload) + ' ' + hex2(calcVal);
      }
      const vrRow = document.getElementById('val-verify-row');
      vrRow.style.display = 'flex';
      if (recvVal === calcVal) {
        vr.textContent = '通过  接收 0x' + (algo.bytes === 1 ? hex2(recvVal) : hexN(recvVal, algo.bytes)) + ' = 计算 0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
        vr.style.color = 'var(--success)';
      } else {
        vr.textContent = '失败  接收 0x' + (algo.bytes === 1 ? hex2(recvVal) : hexN(recvVal, algo.bytes)) + ' != 计算 0x' + (algo.bytes === 1 ? hex2(calcVal) : hexN(calcVal, algo.bytes));
        vr.style.color = 'var(--danger)';
      }
      const chkDisplay = algo.bytes === 1 ? hexN(recvVal, 1) : hexN(recvVal, algo.bytes);
      addHistory(algoId, { data: dataStr(payload), chk: chkDisplay, ok: recvVal === calcVal, mode: 'verify' });
    }
    document.getElementById('val-result').style.display = 'block';
  }

  function clear() {
    const input = document.getElementById('val-input');
    if (input) input.value = '';
    const result = document.getElementById('val-result');
    if (result) result.style.display = 'none';
  }

  function copy(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent.replace(/\s+/g, ' ');
    navigator.clipboard.writeText(text).then(() => {
      const btn = el.parentElement.querySelector('.val-copy-btn');
      if (btn) { btn.textContent = '已复制'; setTimeout(() => { btn.textContent = '复制'; }, 1200); }
    });
  }

  function switchAlgo(algoId) {
    currentAlgo = algoId;
    document.querySelectorAll('.val-tab-btn').forEach(b => b.classList.toggle('active', b.textContent === algorithms.find(a => a.id === algoId)?.label));
    const panel = document.getElementById('val-panel');
    if (panel) panel.innerHTML = renderAlgoPanel(algoId);
  }

  function loadHistory(algoId, idx) {
    const h = histories[algoId]?.[idx];
    if (!h) return;
    const input = document.getElementById('val-input');
    if (input) input.value = h.data;
    const calcRadio = document.querySelector('input[name="valMode"][value="calc"]');
    if (calcRadio) calcRadio.checked = true;
    calculate();
  }

  return { render, calculate, clear, copy, switchAlgo, loadHistory };
})();

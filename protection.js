/* ============================================================
   YOUR LIBRARY — protection.js
   Blocks DevTools, Right-Click, Keyboard Shortcuts
   WhatsApp links work normally
   ============================================================ */

(function () {

  // ── 1. DISABLE RIGHT-CLICK ──────────────────────────────
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // ── 2. BLOCK DEVTOOLS KEYBOARD SHORTCUTS ───────────────
  document.addEventListener('keydown', function (e) {
    var key = e.key ? e.key.toUpperCase() : '';

    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && key === 'I') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && key === 'J') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+C (Element Picker)
    if (e.ctrlKey && e.shiftKey && key === 'C') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && key === 'U') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && key === 'S') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+P (Print)
    if (e.ctrlKey && key === 'P') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+A (Select All)
    if (e.ctrlKey && key === 'A') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // ── 3. DEVTOOLS OPEN DETECTOR (window size method) ─────
  var devToolsOpen = false;

  function showBlockScreen() {
    if (devToolsOpen) return;
    devToolsOpen = true;
    document.body.style.overflow = 'hidden';

    var block = document.createElement('div');
    block.id = 'devtools-block';
    block.style.cssText = [
      'position:fixed',
      'top:0', 'left:0', 'right:0', 'bottom:0',
      'z-index:999999',
      'background:#080810',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'font-family:sans-serif',
      'text-align:center',
      'padding:40px'
    ].join(';');

    block.innerHTML =
      '<div style="background:#17171f;border:1px solid rgba(0,212,255,0.3);' +
      'border-radius:16px;padding:48px 40px;max-width:400px;">' +
      '<div style="font-size:3rem;margin-bottom:16px;">🔒</div>' +
      '<h2 style="color:#00d4ff;font-size:1.5rem;margin-bottom:12px;">' +
      'Access Restricted</h2>' +
      '<p style="color:#a0a0c0;line-height:1.7;margin-bottom:24px;">' +
      'Developer Tools are not allowed on this website.<br>' +
      'Please close DevTools to continue.</p>' +
      '<a href="https://wa.me/918287735448" target="_blank" ' +
      'style="display:inline-flex;align-items:center;gap:8px;' +
      'background:#25D366;color:#fff;padding:12px 24px;' +
      'border-radius:50px;font-weight:700;text-decoration:none;">' +
      '💬 WhatsApp Us</a>' +
      '</div>';

    document.body.appendChild(block);
  }

  function hideBlockScreen() {
    devToolsOpen = false;
    document.body.style.overflow = '';
    var block = document.getElementById('devtools-block');
    if (block) block.remove();
  }

  // Check every 800ms
  setInterval(function () {
    var widthGap  = window.outerWidth  - window.innerWidth;
    var heightGap = window.outerHeight - window.innerHeight;

    if (widthGap > 160 || heightGap > 160) {
      showBlockScreen();
    } else {
      if (devToolsOpen) hideBlockScreen();
    }
  }, 800);

  // ── 4. DISABLE TEXT SELECTION ──────────────────────────
  document.addEventListener('selectstart', function (e) {
    // Allow selection inside input/textarea fields
    var tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return true;
    e.preventDefault();
    return false;
  });

  // ── 5. DISABLE DRAG ────────────────────────────────────
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });

  // ── 6. DISABLE COPY (optional — inputs still work) ─────
  document.addEventListener('copy', function (e) {
    var tag = document.activeElement
      ? document.activeElement.tagName.toLowerCase()
      : '';
    if (tag === 'input' || tag === 'textarea') return true;
    e.preventDefault();
    return false;
  });

  console.clear();
  Object.defineProperty(console, '_commandLineAPI', { get: function () { throw 'Nope!'; } });

})();

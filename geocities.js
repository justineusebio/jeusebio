/* ═══════════════════════════════════════════
   GeoCities mode — Konami Code easter egg
   ↑ ↑ ↓ ↓ ← → ← → B A  (enter it again to return to 2026)
   Styles live in the GEOCITIES MODE section of style.css
═══════════════════════════════════════════ */
(function () {
  var SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
             'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var pos = 0;

  document.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === SEQ[pos]) ? pos + 1 : (k === SEQ[0] ? 1 : 0);
    if (pos === SEQ.length) { pos = 0; toggle(); }
  });

  // survives page-to-page navigation for the rest of the visit
  try { if (sessionStorage.getItem('geocities') === 'on') ready(enable); } catch (e) {}

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function toggle() {
    var turningOff = document.documentElement.classList.contains('geocities');
    if (turningOff) document.documentElement.classList.remove('geocities');
    else enable();
    try { sessionStorage.setItem('geocities', turningOff ? 'off' : 'on'); } catch (e) {}
  }

  function enable() {
    document.documentElement.classList.add('geocities');
    if (!document.getElementById('gc-banner')) buildChrome();
  }

  function buildChrome() {
    var wrap = document.querySelector('.wrap') || document.body;

    var banner = document.createElement('div');
    banner.id = 'gc-banner';
    banner.innerHTML =
      '<div class="gc-marquee"><span>🚧 wElCoMe 2 eUsEb.iO!!! 🚧 ~*~ U FOUND THE SECRET CODE ~*~ ' +
      '💾 bEsT vIeWeD iN nEtScApE nAvIgAtOr @ 800×600 💾 ~*~ nO rIgHt-ClIcKiNg!!! ~*~ ' +
      '🚧 uNdEr CoNsTrUcTiOn SiNcE 1999 🚧</span></div>';
    wrap.insertBefore(banner, wrap.firstChild);

    var footer = document.createElement('div');
    footer.id = 'gc-footer';
    footer.innerHTML =
      '<p>♫ Now Playing: All Star — Smash Mouth 🎵</p>' +
      '<p>You are visitor <span class="gc-counter">' + counter() + '</span></p>' +
      '<p>[ <a href="mailto:justin.eusebio@gmail.com">Sign my Guestbook!</a> ] · ' +
      '[ <a href="https://congeecreativecollective.com" target="_blank" rel="noopener">Web Ring →</a> ]</p>' +
      '<p>🚧 enter the code again to return to 2026 🚧</p>';
    wrap.appendChild(footer);

    document.addEventListener('mousemove', sparkle);
  }

  function counter() {
    return '00' + String(Math.floor(10000 + Math.random() * 89999));
  }

  var last = 0;
  function sparkle(e) {
    if (!document.documentElement.classList.contains('geocities')) return;
    var now = Date.now();
    if (now - last < 60) return;
    last = now;
    var s = document.createElement('span');
    s.className = 'gc-sparkle';
    s.textContent = '✨';
    s.style.left = (e.pageX + 6) + 'px';
    s.style.top = (e.pageY + 6) + 'px';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 800);
  }
})();

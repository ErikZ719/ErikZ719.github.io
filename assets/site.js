// Theme toggle. The initial theme is set by the inline script in <head>
// (saved choice -> system preference) so the page never flashes.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Publication filter: each <li class="pub" data-topics="..."> is shown when
// its topics include the selected filter; empty year groups are hidden.
(function () {
  var bar = document.querySelector('.filters');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button');
  var pubs = document.querySelectorAll('.pub');
  var years = document.querySelectorAll('.pub-year');

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var f = btn.getAttribute('data-filter');
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    pubs.forEach(function (p) {
      var topics = (p.getAttribute('data-topics') || '').split(' ');
      p.hidden = f !== 'all' && topics.indexOf(f) === -1;
    });
    years.forEach(function (y) {
      y.hidden = !y.querySelector('.pub:not([hidden])');
    });
  });
})();

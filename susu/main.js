const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const ghs = n => 'GH₵ ' + Math.round(n).toLocaleString('en-GH');

/* ---------- App mock: balance count-up, goal ring, transactions ---------- */
const TX = [
  ['💼', 'Auto-save', 'Payday · today', '+200.00', true],
  ['👥', 'Office Susu', 'Contribution · Nov 1', '−500.00', false],
  ['📈', 'Interest', 'Fixed Goal · Oct 31', '+38.40', true],
  ['📱', 'MoMo top-up', 'MTN · Oct 28', '+1,000.00', true],
];
$('#tx').innerHTML = TX.map(([i, n, s, a, inc], k) => `<li style="animation-delay:${0.6 + k * 0.15}s"><i>${i}</i><span>${n}<small>${s}</small></span><b class="${inc ? 'in' : ''}">${a}</b></li>`).join('');
(function countUp() {
  const end = 18426.5, t0 = performance.now(), dur = 1800;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = now => {
    const p = reduce ? 1 : Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
    $('#bal').textContent = (end * e).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  requestAnimationFrame(() => ($('#ring').style.strokeDashoffset = 113.1 * (1 - 0.725)));
})();

/* ---------- Savings calculator ---------- */
let rate = 14;
const amt = $('#amt'), mon = $('#mon');
function calc() {
  const a = +amt.value, n = +mon.value, r = rate / 100 / 12;
  let bal = 0; const series = [];
  for (let i = 1; i <= n; i++) { bal = (bal + a) * (1 + r); series.push({ bal, saved: a * i }); }
  const saved = a * n, earned = bal - saved;
  $('#oAmt').textContent = ghs(a);
  $('#oMon').textContent = `${n} month${n > 1 ? 's' : ''}`;
  $('#total').textContent = ghs(bal);
  $('#saved').textContent = ghs(saved);
  $('#earned').textContent = ghs(earned);
  const max = series[series.length - 1].bal;
  $('#chart').innerHTML = series.map(s => `<i style="height:${(s.bal / max) * 100}%;--s:${(s.saved / s.bal) * 100}%" title="${ghs(s.bal)}"></i>`).join('');
}
[amt, mon].forEach(i => i.addEventListener('input', calc));
$$('[data-rate]').forEach(b => b.addEventListener('click', () => { rate = +b.dataset.rate; $$('[data-rate]').forEach(x => x.setAttribute('aria-checked', x === b)); calc(); }));

/* ---------- FAQ ---------- */
const FAQ = [
  ['Is my money safe?', 'Savings are held with licensed partner banks and protected by bank-grade encryption and biometric login. (In a real product, name your regulator and partner banks here.)'],
  ['How does a susu circle work?', 'Everyone contributes the same amount on the same day. Each cycle, one member receives the full pot, in an order you agree up front. Susu collects automatically from each member’s MoMo, so nobody has to chase anyone.'],
  ['Can I withdraw anytime?', 'Flexi savings can be withdrawn instantly to MoMo. Fixed Goals earn a higher rate and unlock on the date you choose.'],
  ['Are there any fees?', 'Opening an account, topping up and saving are free. Withdrawals to MoMo cost the standard network fee.'],
  ['Do I need a smartphone?', 'No. Dial *000*00# on any phone to save, check your balance and pay into your circle.'],
];
$('#faqList').innerHTML = FAQ.map(([q, a], i) => `<div class="q"><button aria-expanded="false" aria-controls="a${i}" id="q${i}">${q}<i aria-hidden="true">+</i></button><div class="q__a" id="a${i}" role="region" aria-labelledby="q${i}"><div><p>${a}</p></div></div></div>`).join('');
$('#faqList').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const item = b.parentElement, open = !item.classList.contains('is-open');
  item.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
});

/* ---------- Decorative QR ---------- */
(function qr() {
  const N = 21, cells = [];
  const finder = (r, c) => { for (const [fr, fc] of [[0, 0], [0, N - 7], [N - 7, 0]]) { if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) { const y = r - fr, x = c - fc; return (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)) ? 1 : 0; } } return -1; };
  let seed = 7;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const f = finder(r, c);
    seed = (seed * 9301 + 49297) % 233280;
    const on = f === -1 ? seed / 233280 > .52 : f === 1;
    cells.push(`<i class="${on ? '' : 'o'}"></i>`);
  }
  $('#qr').innerHTML = cells.join('');
})();

calc();

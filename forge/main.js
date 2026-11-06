const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');

/* ---------- Live capacity (simulated from time of day) ---------- */
(function capacity() {
  const h = new Date().getHours() + new Date().getMinutes() / 60;
  const open = h >= 6 && h < 22;
  const curve = Math.max(0, Math.exp(-((h - 7) ** 2) / 2) * .75 + Math.exp(-((h - 18.5) ** 2) / 3) + .12);
  const n = open ? Math.round(curve * 72) : 0;
  const pct = Math.min(100, Math.round((n / 90) * 100));
  $('#capNum').textContent = n;
  requestAnimationFrame(() => ($('#capBar').style.width = pct + '%'));
  $('#capLbl').textContent = !open ? 'Closed · opens 06:00' : pct < 35 ? 'Quiet' : pct < 70 ? 'Steady' : 'Busy';
})();

/* ---------- Timetable ---------- */
const TYPES = ['All', 'Strength', 'HIIT', 'Boxing', 'Spin', 'Mobility'];
const COACH = { Strength: 'Coach Kofi', HIIT: 'Coach Adjoa', Boxing: 'Coach Nii', Spin: 'Coach Esi', Mobility: 'Coach Yaa' };
const BASE = [
  ['06:00', 'HIIT', 'Sunrise Burn', 45, 16], ['07:00', 'Strength', 'Barbell Basics', 60, 12], ['12:15', 'Spin', 'Lunch Ride', 40, 20],
  ['17:30', 'Boxing', 'Pads & Footwork', 50, 14], ['18:30', 'Strength', 'Powerbuilding', 60, 12], ['19:30', 'Mobility', 'Stretch & Reset', 45, 18],
];
function seeded(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }
const days = []; for (let i = 0; i < 7; i++) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); days.push(d); }
let dayIdx = 0, type = 'All';
let booked = new Set();
try { booked = new Set(JSON.parse(localStorage.getItem('forge-booked') || '[]')); } catch {}

function classesFor(d) {
  const wk = d.getDay();
  return BASE.filter((c, i) => !(wk === 0 && i > 3) && !(wk === 6 && i === 2)).map(([t, ty, name, min, cap], i) => {
    const key = `${d.toDateString()}-${t}`;
    const taken = Math.floor(seeded(key) * (cap + 3));
    return { key, t, ty, name, min, cap, left: Math.max(0, cap - taken), coach: COACH[ty] };
  });
}
$('#types').innerHTML = TYPES.map(t => `<button aria-pressed="${t === type}" data-type="${t}">${t}</button>`).join('');
$('#days').innerHTML = days.map((d, i) => `<button role="tab" aria-selected="${i === 0}" data-day="${i}">${i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' })}<small>${d.getDate()} ${d.toLocaleDateString('en-GB', { month: 'short' })}</small></button>`).join('');

function renderSched() {
  const d = days[dayIdx], now = new Date();
  const list = classesFor(d).filter(c => type === 'All' || c.ty === type);
  $('#sched').innerHTML = list.length ? list.map((c, i) => {
    const [hh, mm] = c.t.split(':').map(Number);
    const past = dayIdx === 0 && (hh * 60 + mm) <= now.getHours() * 60 + now.getMinutes();
    const mine = booked.has(c.key);
    const left = c.left - (mine ? 1 : 0);
    const full = left <= 0 && !mine;
    return `<li class="cls" style="animation-delay:${i * 40}ms">
      <span class="cls__time">${c.t}<small>${c.min} min</small></span>
      <span class="cls__name">${c.name}<small>${c.ty}</small></span>
      <span class="cls__coach">${c.coach}</span>
      <span class="spots${full ? ' full' : ''}" style="--w:${Math.round(((c.cap - Math.max(left, 0)) / c.cap) * 100)}%">${full ? 'Full · join waitlist' : `${Math.max(left, 0)} of ${c.cap} spots left`}<i></i></span>
      <button class="btn ${mine ? 'btn--blue is-booked' : 'btn--blue'}" data-book="${c.key}" data-name="${c.name}" ${past ? 'disabled' : ''}>${past ? 'Finished' : mine ? 'Booked ✓' : full ? 'Waitlist' : 'Reserve'}</button>
    </li>`;
  }).join('') : `<li class="empty">No ${type.toLowerCase()} classes on this day. Try another day.</li>`;
}
$('#types').addEventListener('click', e => { const b = e.target.closest('[data-type]'); if (!b) return; type = b.dataset.type; $$('#types button').forEach(x => x.setAttribute('aria-pressed', x === b)); renderSched(); });
$('#days').addEventListener('click', e => { const b = e.target.closest('[data-day]'); if (!b) return; dayIdx = +b.dataset.day; $$('#days button').forEach(x => x.setAttribute('aria-selected', x === b)); renderSched(); });
$('#sched').addEventListener('click', e => {
  const b = e.target.closest('[data-book]'); if (!b || b.disabled) return;
  const k = b.dataset.book;
  if (booked.has(k)) { booked.delete(k); toast(`Cancelled ${b.dataset.name}`); }
  else { booked.add(k); toast(b.textContent === 'Waitlist' ? `You’re on the waitlist for ${b.dataset.name}` : `Booked: ${b.dataset.name}. See you there!`); }
  try { localStorage.setItem('forge-booked', JSON.stringify([...booked])); } catch {}
  renderSched();
});

/* ---------- Plans ---------- */
const PLANS = [
  { name: 'Off-Peak', desc: 'Train 09:00–16:00', m: 350, perks: ['Open gym, off-peak hours', '2 classes a month', 'Locker & towel'] },
  { name: 'Unlimited', desc: 'Everything, any time', m: 600, hot: true, perks: ['Open gym 06:00–22:00', 'Unlimited classes', 'Monthly body scan', 'Bring a friend on Fridays'] },
  { name: 'Coached', desc: 'Unlimited + 1:1 coaching', m: 1400, perks: ['Everything in Unlimited', '4 personal sessions / month', 'Custom program', 'Nutrition check-ins'] },
];
let bill = 'm';
function renderPlans() {
  $('#planGrid').innerHTML = PLANS.map(p => {
    const yearly = p.m * 10;
    return `<article class="plan${p.hot ? ' plan--hot' : ''}">${p.hot ? '<span class="plan__tag">Most popular</span>' : ''}
      <h3>${p.name}</h3><p class="plan__desc">${p.desc}</p>
      <p class="plan__price">GH₵ ${(bill === 'm' ? p.m : Math.round(yearly / 12)).toLocaleString()}<small> /month</small></p>
      <p class="plan__save">${bill === 'y' ? `Billed GH₵ ${yearly.toLocaleString()} yearly · save GH₵ ${(p.m * 2).toLocaleString()}` : ''}</p>
      <ul>${p.perks.map(x => `<li>${x}</li>`).join('')}</ul>
      <button class="btn ${p.hot ? 'btn--blue' : 'btn--line'} btn--block" data-plan="${p.name}">Join ${p.name}</button></article>`;
  }).join('');
}
$$('[data-bill]').forEach(b => b.addEventListener('click', () => { bill = b.dataset.bill; $$('[data-bill]').forEach(x => x.setAttribute('aria-checked', x === b)); renderPlans(); }));
$('#planGrid').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) toast(`Great choice! Connect checkout here to start ${b.dataset.plan}.`); });

/* ---------- BMI ---------- */
let units = 'metric';
const h = $('#h'), w = $('#w');
function bmi() {
  const cm = +h.value, kg = +w.value;
  const val = kg / (cm / 100) ** 2;
  if (units === 'metric') { $('#hOut').textContent = `${cm} cm`; $('#wOut').textContent = `${kg} kg`; }
  else { const inch = cm / 2.54; $('#hOut').textContent = `${Math.floor(inch / 12)}′${Math.round(inch % 12)}″`; $('#wOut').textContent = `${Math.round(kg * 2.2046)} lb`; }
  $('#bmiVal').textContent = val.toFixed(1);
  const [cat, color, tip] = val < 18.5 ? ['Underweight', '#f2a516', 'Strength work and a calorie surplus will help you build.'] : val < 25 ? ['Healthy', '#18c964', 'Great base. Let’s build strength and conditioning on top.'] : val < 30 ? ['Overweight', '#f2a516', 'HIIT plus strength three times a week is a proven combo.'] : ['Obese', '#ff5b4a', 'Start with our Coached plan for a safe, supported program.'];
  $('#bmiCat').textContent = cat; $('#bmiTip').textContent = tip;
  const pct = Math.min(1, Math.max(0, (val - 14) / 26));
  $('#arc').style.strokeDashoffset = 251.3 * (1 - pct); $('#arc').style.stroke = color;
}
[h, w].forEach(i => i.addEventListener('input', bmi));
$$('[data-u]').forEach(b => b.addEventListener('click', () => { units = b.dataset.u; $$('[data-u]').forEach(x => x.setAttribute('aria-checked', x === b)); bmi(); }));

let tt;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('is-on'), 2600); }

renderSched(); renderPlans(); bmi();

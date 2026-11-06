const SERVICES = [
  { id: 'fade', name: 'Skin Fade', desc: 'Bald or low fade, scissor top, sharp line-up.', min: 45, price: 120, img: 'razor' },
  { id: 'classic', name: 'Classic Scissor Cut', desc: 'Tapered back and sides, textured top.', min: 40, price: 100, img: 'scissors' },
  { id: 'beard', name: 'Beard Sculpt', desc: 'Shape, line and hot towel with beard oil.', min: 30, price: 80, img: 'beard' },
  { id: 'combo', name: 'Cut + Beard Combo', desc: 'Any cut plus a full beard sculpt.', min: 70, price: 180, img: 'blow' },
  { id: 'locs', name: 'Locs Retwist', desc: 'Palm-roll retwist, scalp treatment, styling.', min: 90, price: 220, img: 'stylist' },
  { id: 'kids', name: 'Kids Cut (under 12)', desc: 'Patient barbers, sweets included.', min: 30, price: 70, img: 'scissors' },
];
const ADDONS = [{ id: 'towel', name: 'Hot towel shave', price: 40, min: 15 }, { id: 'design', name: 'Hair design / part', price: 30, min: 10 }, { id: 'black', name: 'Black mask facial', price: 50, min: 15 }, { id: 'dye', name: 'Beard dye', price: 60, min: 20 }];
const BARBERS = [
  { id: 'kojo', name: 'Kojo', role: 'Head barber', skills: ['Skin fades', 'Designs'], img: 'razor', rating: 4.9, years: 11, off: [0] },
  { id: 'abena', name: 'Abena', role: 'Locs specialist', skills: ['Locs', 'Twists'], img: 'stylist', rating: 5.0, years: 8, off: [1] },
  { id: 'selasi', name: 'Selasi', role: 'Beard expert', skills: ['Beards', 'Shaves'], img: 'beard', rating: 4.8, years: 6, off: [2] },
  { id: 'eli', name: 'Eli', role: 'Classic cuts', skills: ['Scissor cuts', 'Kids'], img: 'scissors', rating: 4.9, years: 9, off: [3] },
];
const OPEN = { 0: [12, 18], 1: [8, 21], 2: [8, 21], 3: [8, 21], 4: [8, 21], 5: [8, 21], 6: [7, 22] };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const cedi = n => 'GH₵ ' + n;
const pad = n => String(n).padStart(2, '0');
const fmtT = m => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/* Deterministic "taken" slots so the demo looks real and stays consistent */
function taken(dateKey, barber, minute) {
  let h = 2166136261;
  for (const c of `${dateKey}|${barber}|${minute}`) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0) % 100 < 38;
}
const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const nowMin = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };

/* ---------- Render static lists ---------- */
$('#svcList').innerHTML = SERVICES.map(s => `<li data-img="${s.img}"><div><h3>${s.name}</h3><p>${s.desc}</p></div><span class="dur">${s.min} min</span><span class="price">${cedi(s.price)}</span></li>`).join('');
$('#team').innerHTML = BARBERS.map(b => `<article class="barber"><img src="img/${b.img}.webp" alt="${b.name} at work" loading="lazy"><div class="barber__body"><h3>${b.name}</h3><p>${b.role} · ${b.years} yrs · ★ ${b.rating.toFixed(1)}</p><div class="tags">${b.skills.map(s => `<span>${s}</span>`).join('')}</div><button class="btn btn--line btn--sm" data-with="${b.id}">Book with ${b.name}</button></div></article>`).join('');

/* Hover image peek on services */
const peek = $('#peek');
if (matchMedia('(hover: hover)').matches) {
  $('#svcList').addEventListener('mousemove', e => {
    const li = e.target.closest('li'); if (!li) return;
    const src = `img/${li.dataset.img}.webp`;
    if (!peek.src.endsWith(src)) peek.src = src;
    peek.style.left = e.clientX + 'px'; peek.style.top = e.clientY + 'px';
    peek.classList.add('is-on');
  });
  $('#svcList').addEventListener('mouseleave', () => peek.classList.remove('is-on'));
}

/* ---------- Wizard state ---------- */
const st = { step: 0, svc: null, add: new Set(), barber: null, day: null, time: null };
const days = [];
for (let i = 0; i < 14; i++) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); days.push(d); }

$('#optSvc').innerHTML = SERVICES.map(s => `<button type="button" class="opt" data-svc="${s.id}" aria-pressed="false"><b>${s.name}</b><span>${cedi(s.price)}</span><small>${s.min} min</small></button>`).join('');
$('#optAdd').innerHTML = ADDONS.map(a => `<button type="button" class="addon" data-add="${a.id}" aria-pressed="false">+ ${a.name} · ${cedi(a.price)}</button>`).join('');
$('#optBarber').innerHTML = `<button type="button" class="opt" data-barber="any" aria-pressed="false"><i class="any">★</i><b>Any barber</b><small>Soonest available slot</small></button>` +
  BARBERS.map(b => `<button type="button" class="opt" data-barber="${b.id}" aria-pressed="false"><img src="img/${b.img}.webp" alt=""><b>${b.name}</b><small>${b.role} · ★ ${b.rating.toFixed(1)}</small></button>`).join('');

function duration() { const s = SERVICES.find(x => x.id === st.svc); return (s ? s.min : 0) + [...st.add].reduce((a, id) => a + ADDONS.find(x => x.id === id).min, 0); }
function total() { const s = SERVICES.find(x => x.id === st.svc); return (s ? s.price : 0) + [...st.add].reduce((a, id) => a + ADDONS.find(x => x.id === id).price, 0); }
function barberName() { return st.barber === 'any' ? 'Any barber' : BARBERS.find(b => b.id === st.barber)?.name; }

function slotsFor(d, barber) {
  const [o, c] = OPEN[d.getDay()];
  const out = [];
  const isToday = +d === +days[0];
  for (let m = o * 60; m + 30 <= c * 60; m += 30) {
    if (isToday && m <= nowMin() + 30) { out.push({ m, free: false }); continue; }
    const pool = barber === 'any' ? BARBERS.filter(b => !b.off.includes(d.getDay())).map(b => b.id) : [barber];
    const offDay = barber !== 'any' && BARBERS.find(b => b.id === barber).off.includes(d.getDay());
    const free = !offDay && pool.some(b => !taken(dayKey(d), b, m));
    out.push({ m, free });
  }
  return out;
}
function renderDays() {
  $('#days').innerHTML = days.map((d, i) => {
    const off = st.barber && st.barber !== 'any' && BARBERS.find(b => b.id === st.barber).off.includes(d.getDay());
    const none = !slotsFor(d, st.barber || 'any').some(s => s.free);
    return `<button type="button" class="dayb" data-day="${i}" aria-pressed="${st.day === i}" ${off || none ? 'disabled' : ''}><small>${i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-GB', { month: 'short' })}</small></button>`;
  }).join('');
}
function renderSlots() {
  if (st.day === null) { $('#slots').innerHTML = ''; $('#slotHint').textContent = 'Choose a day to see open times.'; return; }
  const list = slotsFor(days[st.day], st.barber);
  $('#slots').innerHTML = list.map(s => `<button type="button" class="slot" data-time="${s.m}" aria-pressed="${st.time === s.m}" ${s.free ? '' : 'disabled'}>${fmtT(s.m)}</button>`).join('');
  const n = list.filter(s => s.free).length;
  $('#slotHint').textContent = `${n} open slot${n === 1 ? '' : 's'} · your appointment takes about ${duration()} min`;
}
function renderSummary() {
  const s = SERVICES.find(x => x.id === st.svc);
  const rows = [
    ['Service', s ? s.name : '—'],
    ['Add-ons', st.add.size ? [...st.add].map(id => ADDONS.find(a => a.id === id).name).join(', ') : '—'],
    ['Barber', st.barber ? barberName() : '—'],
    ['When', st.day !== null && st.time !== null ? `${days[st.day].toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}, ${fmtT(st.time)}` : '—'],
    ['Duration', st.svc ? `${duration()} min` : '—'],
  ];
  $('#sum').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#total').textContent = cedi(total());
}
function canNext() {
  return [st.svc, st.barber, st.day !== null && st.time !== null, true][st.step];
}
function go(step) {
  st.step = step;
  $$('.pane').forEach(p => (p.hidden = +p.dataset.pane !== step));
  $$('#steps li').forEach((li, i) => { li.classList.toggle('is-on', i === step); li.classList.toggle('is-done', i < step); });
  $('#navRow').hidden = step === 4;
  $('#back').disabled = step === 0;
  $('#next').textContent = step === 3 ? 'Confirm booking' : 'Continue →';
  $('#next').disabled = !canNext();
  if (step === 2) { renderDays(); renderSlots(); }
}
function refresh() { renderSummary(); $('#next').disabled = !canNext(); }

document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.svc) { st.svc = t.dataset.svc; $$('[data-svc]').forEach(b => b.setAttribute('aria-pressed', b === t)); refresh(); }
  else if (t.dataset.add) { st.add.has(t.dataset.add) ? st.add.delete(t.dataset.add) : st.add.add(t.dataset.add); t.setAttribute('aria-pressed', st.add.has(t.dataset.add)); refresh(); }
  else if (t.dataset.barber) { st.barber = t.dataset.barber; st.day = null; st.time = null; $$('[data-barber]').forEach(b => b.setAttribute('aria-pressed', b === t)); refresh(); }
  else if (t.dataset.day !== undefined && t.classList.contains('dayb')) { st.day = +t.dataset.day; st.time = null; renderDays(); renderSlots(); refresh(); }
  else if (t.dataset.time) { st.time = +t.dataset.time; $$('.slot').forEach(b => b.setAttribute('aria-pressed', b === t)); refresh(); }
  else if (t.dataset.with) {
    st.barber = t.dataset.with; st.day = null; st.time = null;
    $$('[data-barber]').forEach(b => b.setAttribute('aria-pressed', b.dataset.barber === st.barber));
    refresh(); go(st.svc ? 2 : 0);
    $('#book').scrollIntoView({ behavior: 'smooth' });
  }
});
$('#back').addEventListener('click', () => go(Math.max(0, st.step - 1)));
$('#next').addEventListener('click', () => {
  if (st.step < 3) { go(st.step + 1); return; }
  const f = $('#details'), errs = [];
  $$('.bad').forEach(x => x.classList.remove('bad'));
  if (f.name.value.trim().length < 2) { f.name.classList.add('bad'); errs.push('your name'); }
  if (!/^(0\d{9}|233\d{9})$/.test(f.phone.value.replace(/\D/g, ''))) { f.phone.classList.add('bad'); errs.push('a valid phone number'); }
  if (errs.length) { $('#err').textContent = 'Please add ' + errs.join(' and ') + '.'; return; }
  $('#err').textContent = '';
  const d = days[st.day], s = SERVICES.find(x => x.id === st.svc);
  $('#doneTitle').textContent = `See you, ${f.name.value.trim().split(' ')[0]}`;
  $('#doneTxt').textContent = `${s.name} with ${barberName() === 'Any barber' ? 'the first free barber' : barberName()} on ${d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at ${fmtT(st.time)}. ${f.remind.checked ? 'We’ll WhatsApp you a reminder two hours before.' : ''}`;
  const start = new Date(d); start.setMinutes(st.time);
  const end = new Date(start.getTime() + duration() * 60000);
  const ics = x => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fade Room//EN', 'BEGIN:VEVENT', `UID:${Date.now()}@faderoom`, `DTSTART:${ics(start)}`, `DTEND:${ics(end)}`, `SUMMARY:${s.name} at Fade Room`, 'LOCATION:22 Cantonments Road\\, Osu\\, Accra', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  $('#ics').href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
  go(4);
});
$('#restart').addEventListener('click', () => {
  Object.assign(st, { svc: null, barber: null, day: null, time: null }); st.add.clear();
  $$('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  $('#details').reset(); refresh(); go(0);
});

/* ---------- Next free chair ---------- */
(function nextFree() {
  for (let i = 0; i < days.length; i++) {
    let best = null;
    for (const b of BARBERS) {
      if (b.off.includes(days[i].getDay())) continue;
      const s = slotsFor(days[i], b.id).find(x => x.free);
      if (s && (!best || s.m < best.m)) best = { m: s.m, name: b.name };
    }
    if (best) {
      const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : days[i].toLocaleDateString('en-GB', { weekday: 'long' });
      $('#nextSlot').innerHTML = `<i></i>Next free chair: <b>${when} ${fmtT(best.m)}</b> with ${best.name}`;
      return;
    }
  }
})();

renderSummary();
go(0);

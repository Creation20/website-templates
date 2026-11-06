const MENU = {
  'Small plates': [
    { n: 'Kelewele', d: 'Spiced ripe plantain, ginger, grains of selim, roasted groundnuts.', p: 45, t: ['V', 'GF'], s: 2 },
    { n: 'Bofrot Sliders', d: 'Puff-puff buns, pulled suya beef, pickled onions.', p: 70, t: [], s: 2 },
    { n: 'Chichinga Skewers', d: 'Charred beef, yaji crust, raw onion and tomato.', p: 65, t: ['GF'], s: 3 },
    { n: 'Garden Egg Dip', d: 'Smoked garden egg, palm oil, crispy shallots, toasted tatale.', p: 50, t: ['V'], s: 1 },
    { n: 'Fried Yam & Shito', d: 'Crisp yam fingers, house black shito, lime salt.', p: 40, t: ['V'], s: 2 },
  ],
  'Mains': [
    { n: 'Smoky Party Jollof', d: 'Firewood jollof, grilled tilapia, fried plantain, shito.', p: 165, t: ['GF'], s: 2 },
    { n: 'Waakye Bowl', d: 'Rice and beans, wele, boiled egg, gari, spaghetti, stew, avocado.', p: 110, t: [], s: 2 },
    { n: 'Banku & Tilapia', d: 'Whole grilled tilapia, fresh pepper, banku, onions.', p: 150, t: ['GF'], s: 3 },
    { n: 'Red Red', d: 'Black-eyed bean stew in palm oil, fried plantain, gari.', p: 85, t: ['V', 'GF'], s: 1 },
    { n: 'Kontomire & Ampesi', d: 'Cocoyam-leaf stew, egg, smoked mackerel, yam and plantain.', p: 120, t: ['GF'], s: 1 },
    { n: 'Garden Waakye', d: 'Our waakye with mushroom stew and grilled halloumi.', p: 105, t: ['V'], s: 1 },
  ],
  'Soups & swallows': [
    { n: 'Light Soup & Fufu', d: 'Goat light soup with garden eggs, hand-pounded fufu.', p: 140, t: ['GF'], s: 3 },
    { n: 'Groundnut Soup', d: 'Chicken in slow-cooked groundnut soup with omo tuo.', p: 135, t: ['GF'], s: 2 },
    { n: 'Egusi & Assorted', d: 'Melon-seed stew, goat, tripe and wele, pounded yam.', p: 180, t: ['GF'], s: 2 },
    { n: 'Palm Nut Soup', d: 'Abenkwan with crab, snail and smoked fish. Weekends only.', p: 190, t: ['GF'], s: 3 },
    { n: 'Okro Stew', d: 'Okro with spinach, mushroom and banku.', p: 95, t: ['V', 'GF'], s: 2 },
  ],
  'From the grill': [
    { n: 'Chale Grill Board', d: 'Beef, chicken and gizzard skewers for two, yaji, onions.', p: 320, t: ['GF'], s: 3 },
    { n: 'Half Chicken', d: 'Ginger-garlic marinade, charred over coconut husk.', p: 140, t: ['GF'], s: 2 },
    { n: 'Lamb Chops', d: 'Suya rub, grilled plantain, green pepper sauce.', p: 260, t: ['GF'], s: 2 },
    { n: 'Grilled Corn & Coconut', d: 'Street-style corn with a slice of fresh coconut.', p: 35, t: ['V', 'GF'], s: 0 },
  ],
  'Sweets': [
    { n: 'Bofrot & Dip', d: 'Warm nutmeg doughnuts, salted palm-sugar caramel.', p: 55, t: ['V'], s: 0 },
    { n: 'Pineapple Upside-Down', d: 'Ghana sugarloaf pineapple, rum syrup, coconut cream.', p: 60, t: ['V'], s: 0 },
    { n: 'Sobolo Granita', d: 'Hibiscus, ginger and clove ice. Very cold, very red.', p: 40, t: ['V', 'GF'], s: 0 },
  ],
  'Drinks': [
    { n: 'Palm Wine Spritz', d: 'Fresh palm wine, Aperol, soda, orange.', p: 75, t: ['V', 'GF'], s: 0 },
    { n: 'Sobolo', d: 'Hibiscus, ginger, pineapple skin, cloves.', p: 30, t: ['V', 'GF'], s: 1 },
    { n: 'Asaana', d: 'Caramelised corn drink, served over ice.', p: 30, t: ['V'], s: 0 },
    { n: 'Akpeteshie Sour', d: 'Local cane spirit, lime, egg white, bitters.', p: 85, t: ['V', 'GF'], s: 0 },
    { n: 'Club Lager', d: 'Ice cold, 625ml.', p: 35, t: ['V'], s: 0 },
  ],
};
const HOURS = [ // Sun..Sat  [open, close] in 24h
  [12, 22], [null, null], [17, 23], [17, 23], [17, 23], [12, 24], [12, 24],
];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const accraNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Accra' }));
const hh = h => (h === 24 ? '00:00' : String(h).padStart(2, '0') + ':00');

/* Nav */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 60);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Open status + hours */
(function hours() {
  const now = accraNow(), d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const [o, c] = HOURS[d];
  const open = o !== null && h >= o && h < c;
  const st = $('#status');
  st.classList.toggle('is-closed', !open);
  if (open) st.querySelector('b').textContent = `Open now · until ${hh(c)}`;
  else {
    let k = 0, nd = d;
    do { k++; nd = (d + k) % 7; } while (HOURS[nd][0] === null && k < 7);
    const today = o !== null && h < o;
    st.querySelector('b').textContent = today ? `Closed · opens ${hh(o)}` : `Closed · opens ${DAYS[nd].slice(0, 3)} ${hh(HOURS[nd][0])}`;
  }
  const order = [1, 2, 3, 4, 5, 6, 0];
  $('#hours').innerHTML = order.map(i => `<tr class="${i === d ? 'today' : ''}"><td>${DAYS[i]}</td><td>${HOURS[i][0] === null ? 'Closed' : hh(HOURS[i][0]) + ' – ' + hh(HOURS[i][1])}</td></tr>`).join('');
})();

/* Menu */
const sections = Object.keys(MENU);
let active = sections[1];
$('#tabs').innerHTML = sections.map(s => `<button class="tab" role="tab" aria-selected="${s === active}" data-tab="${s}">${s}</button>`).join('');
function renderMenu() {
  const veg = $('#vegOnly').checked;
  const items = MENU[active].filter(i => !veg || i.t.includes('V'));
  $('#menuList').innerHTML = items.length ? items.map((i, k) => `
    <div class="item" style="animation-delay:${k * 50}ms">
      <div class="item__top"><h3 class="item__name">${i.n}</h3><span class="item__dots"></span><span class="item__price">GH₵ ${i.p}</span></div>
      <p class="item__desc">${i.d}
        <span class="item__tags">${i.t.map(t => `<span class="tagv">${t}</span>`).join('')}</span>
        ${i.s ? `<span class="chili" aria-label="Spice level ${i.s} of 3">${'●'.repeat(i.s)}<span class="chili off">${'●'.repeat(3 - i.s)}</span></span>` : ''}
      </p>
    </div>`).join('') : `<p class="menu__empty">No vegetarian dishes in this section, but try Small plates or Mains.</p>`;
}
$('#tabs').addEventListener('click', e => {
  const t = e.target.closest('[data-tab]'); if (!t) return;
  active = t.dataset.tab;
  $$('.tab').forEach(b => b.setAttribute('aria-selected', b === t));
  renderMenu();
});
$('#tabs').addEventListener('keydown', e => {
  if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
  const tabs = $$('.tab'), i = tabs.findIndex(t => t.dataset.tab === active);
  const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
  n.focus(); n.click();
});
$('#vegOnly').addEventListener('change', renderMenu);
renderMenu();

/* Booking */
const dateEl = $('#date'), timeEl = $('#time');
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = accraNow();
dateEl.min = iso(today);
const max = new Date(today); max.setDate(max.getDate() + 60); dateEl.max = iso(max);
dateEl.value = iso(today);
function fillTimes() {
  const d = new Date(dateEl.value + 'T00:00:00');
  const [o, c] = HOURS[d.getDay()] || [null, null];
  if (o === null || isNaN(d)) { timeEl.innerHTML = '<option value="">Closed this day</option>'; return; }
  const now = accraNow(), isToday = dateEl.value === iso(now);
  const slots = [];
  for (let t = o; t <= c - 1.5; t += .5) {
    if (isToday && t <= now.getHours() + now.getMinutes() / 60 + .5) continue;
    slots.push(`${String(Math.floor(t)).padStart(2, '0')}:${t % 1 ? '30' : '00'}`);
  }
  timeEl.innerHTML = slots.length ? slots.map(s => `<option>${s}</option>`).join('') : '<option value="">No more tables today</option>';
  const pref = slots.find(s => s >= '19:00'); if (pref) timeEl.value = pref;
}
dateEl.addEventListener('change', fillTimes); fillTimes();

let guests = 2;
$$('[data-step]').forEach(b => b.addEventListener('click', () => {
  guests = Math.min(12, Math.max(1, guests + +b.dataset.step));
  $('#guests').textContent = guests;
}));

$('#bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, err = [];
  $$('.is-bad').forEach(x => x.classList.remove('is-bad'));
  const bad = (el, msg) => { el.classList.add('is-bad'); err.push(msg); };
  if (f.name.value.trim().length < 2) bad(f.name, 'your name');
  const phone = f.phone.value.replace(/\D/g, '');
  if (!/^(0\d{9}|233\d{9})$/.test(phone)) bad(f.phone, 'a valid Ghana phone number');
  if (!dateEl.value) bad(dateEl, 'a date');
  if (!timeEl.value) bad(timeEl, 'an available time');
  if (err.length) { $('#formErr').textContent = 'Please add ' + err.join(', ') + '.'; return; }
  $('#formErr').textContent = '';
  const d = new Date(dateEl.value + 'T00:00:00');
  $('#tName').textContent = `Table for ${f.name.value.trim().split(' ')[0]}`;
  $('#tDate').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  $('#tTime').textContent = timeEl.value;
  $('#tGuests').textContent = guests;
  $('#tRef').textContent = 'PP-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  f.hidden = true; $('#ticket').hidden = false;
  $('#ticket').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
$('#again').addEventListener('click', () => { $('#ticket').hidden = true; $('#bookForm').hidden = false; $('#bookForm').reset(); guests = 2; $('#guests').textContent = 2; dateEl.value = iso(accraNow()); fillTimes(); });

/* Reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.sig__head, .dish, .story__media, .story__copy, .menu__head, .gallery > *, .book__copy, .visit__map, .visit__info').forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = (i % 5) * 70 + 'ms'; io.observe(el); });

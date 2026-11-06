const STAYS = [
  { id: 1, title: 'Lagoon Villa with Plunge Pool', place: 'Ada Foah', price: 1850, rating: 4.97, reviews: 128, tags: ['pool', 'lagoon', 'family'], imgs: ['twilight', 'bedroom', 'sunsetpool'], badge: 'Guest favourite', host: 'Akosua', beds: '4 bedrooms · 5 beds · 3 baths', guests: 8, pets: true, desc: 'A thatched villa where the Volta meets the sea. Take the canoe to the sandbar at sunrise, then nap by the plunge pool. A cook is available on request.', amen: ['🏊 Private plunge pool', '🛶 Canoe & life jackets', '📶 Fibre Wi-Fi', '❄️ Air conditioning', '🍳 Cook on request', '⚡ Solar backup power'] },
  { id: 2, title: 'Busua Surf House', place: 'Busua', price: 950, rating: 4.91, reviews: 211, tags: ['surf', 'beachfront', 'workation'], imgs: ['whitehouse', 'woodroom', 'deck'], badge: 'Superhost', host: 'Kojo', beds: '3 bedrooms · 3 beds · 2 baths', guests: 6, pets: false, desc: 'Fifty steps from the best beginner break in Ghana. Boards and lessons are on the house, and the desk faces the water if you have to work.', amen: ['🏄🏾 Two surfboards', '🏖️ Beachfront', '📶 Starlink Wi-Fi', '🖥️ Dedicated workspace', '🚿 Outdoor shower', '🅿️ Free parking'] },
  { id: 3, title: 'Castle View Sunset Deck', place: 'Cape Coast', price: 1200, rating: 4.88, reviews: 96, tags: ['beachfront', 'family'], imgs: ['sunsetdeck', 'window', 'living'], host: 'Esi', beds: '3 bedrooms · 4 beds · 2 baths', guests: 7, pets: false, desc: 'Watch the fishing canoes come home from a wide deck facing the Atlantic. It is a ten-minute walk to the castle and Kakum is a short drive away.', amen: ['🌅 Sunset deck', '🏖️ Beach access', '📶 Wi-Fi', '❄️ Air conditioning', '🧺 Washer', '👶🏾 Cot available'] },
  { id: 4, title: 'Garden Cabin & Plunge Pool', place: 'Kokrobite', price: 480, rating: 4.79, reviews: 302, tags: ['beachfront'], imgs: ['hut', 'curtains', 'deck'], badge: 'Great value', host: 'Yaw', beds: '1 bedroom · 1 bed · 1 bath', guests: 2, pets: true, desc: 'A timber cabin with its own plunge pool, five minutes from the sand and 40 minutes from Accra. There are drum circles on Saturday nights and fresh coconut every morning.', amen: ['🏊 Private plunge pool', '🥥 Breakfast included', '🌀 Fan cooled', '🎶 Weekend live music', '🔒 Safe box', '🐕 Pets allowed'] },
  { id: 5, title: 'Infinity Suite over the Bay', place: 'Elmina', price: 2400, rating: 5.0, reviews: 54, tags: ['pool', 'workation'], imgs: ['infinity', 'living', 'window'], badge: 'Rare find', host: 'Nana', beds: '2 bedrooms · 2 beds · 2 baths', guests: 4, pets: false, desc: 'An infinity pool that runs straight into the horizon over Elmina Bay. Includes a private chef breakfast and a sunset boat trip.', amen: ['♾️ Infinity pool', '👨🏾‍🍳 Chef breakfast', '⛵ Sunset boat ride', '📶 Fibre Wi-Fi', '❄️ Air conditioning', '🛁 Soaking tub'] },
  { id: 6, title: 'Palm Lawn Family Cottage', place: 'Axim', price: 700, rating: 4.86, reviews: 77, tags: ['family', 'beachfront'], imgs: ['lawn', 'bedroom', 'woodroom'], host: 'Adwoa', beds: '3 bedrooms · 5 beds · 2 baths', guests: 8, pets: true, desc: 'Big lawn, tall palms and a quiet beach for the kids. It is close to Fort San Antonio and the Nzulezu stilt village.', amen: ['🌴 Private garden', '👨🏾‍👩🏾‍👧🏾 Family friendly', '🍖 BBQ grill', '📶 Wi-Fi', '🧸 Toys & games', '🐕 Pets allowed'] },
  { id: 7, title: 'Overwater Lagoon Chalets', place: 'Ada Foah', price: 2100, rating: 4.94, reviews: 143, tags: ['lagoon', 'pool'], imgs: ['overwater', 'window', 'bedroom'], badge: 'Guest favourite', host: 'Selorm', beds: '2 bedrooms · 2 beds · 2 baths', guests: 4, pets: false, desc: 'Chalets on stilts above clear lagoon water. Jump in from your deck, then kayak out to the island bar.', amen: ['🛶 Kayaks', '🌊 Water access from deck', '📶 Wi-Fi', '❄️ Air conditioning', '🍹 Island bar', '⚡ Solar power'] },
  { id: 8, title: 'The Stone House', place: 'Anomabo', price: 1600, rating: 4.9, reviews: 68, tags: ['family', 'workation'], imgs: ['curvy', 'living', 'curtains'], host: 'Kwesi', beds: '4 bedrooms · 4 beds · 4 baths', guests: 8, pets: false, desc: 'A stone-and-glass house with a long pool, designed by an Accra architect. It has a fast connection, a long dining table and sea views from every room.', amen: ['🏛️ Architect designed', '🖥️ Two workspaces', '📶 Fibre Wi-Fi', '❄️ Air conditioning', '🍽️ Seats 12', '🅿️ Free parking'] },
  { id: 9, title: 'Deckside Bungalow', place: 'Busua', price: 820, rating: 4.83, reviews: 119, tags: ['surf', 'beachfront'], imgs: ['deck', 'woodroom', 'hut'], host: 'Ama', beds: '2 bedrooms · 2 beds · 1 bath', guests: 4, pets: true, desc: 'A breezy timber bungalow with hammocks, a lobster grill night on Fridays, and the surf right in front.', amen: ['🏄🏾 Surf in front', '🦞 Friday lobster grill', '🌀 Fan cooled', '📶 Wi-Fi', '🛏️ Hammocks', '🐕 Pets allowed'] },
  { id: 10, title: 'Palm Pool Resort Room', place: 'Elmina', price: 1350, rating: 4.81, reviews: 260, tags: ['pool', 'family'], imgs: ['sunsetpool', 'bedroom', 'living'], host: 'Elmina Bay Hotel', beds: '1 bedroom · 2 beds · 1 bath', guests: 4, pets: false, desc: 'Resort comforts with lagoon views, a long palm-lined pool, kids’ club and an excellent seafood restaurant.', amen: ['🏊 Resort pool', '🧒🏾 Kids club', '🍤 Restaurant', '📶 Wi-Fi', '❄️ Air conditioning', '🏋🏾 Gym'] },
];
const PLACES = [['Ada Foah', 'overwater'], ['Kokrobite', 'hut'], ['Anomabo', 'curvy'], ['Cape Coast', 'sunsetdeck'], ['Elmina', 'infinity'], ['Busua', 'whitehouse'], ['Axim', 'lawn']];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const fmt = n => 'GH₵ ' + Math.round(n).toLocaleString('en-GH');
const day0 = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const TODAY = day0(new Date());
const nightsBetween = (a, b) => Math.round((b - a) / 864e5);
const short = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const state = { where: '', tag: '', max: 2500, sort: 'rec', start: null, end: null, adults: 2, kids: 0, pets: 0 };
let wish = new Set();
try { wish = new Set(JSON.parse(localStorage.getItem('coastline-wish') || '[]')); } catch {}
const saveWish = () => { try { localStorage.setItem('coastline-wish', JSON.stringify([...wish])); } catch {} };

/* ---------- Results ---------- */
function results() {
  const g = state.adults + state.kids;
  let list = STAYS.filter(s => (!state.where || s.place === state.where) && (!state.tag || s.tags.includes(state.tag)) && s.price <= state.max && s.guests >= g && (!state.pets || s.pets));
  if (state.sort === 'low') list.sort((a, b) => a.price - b.price);
  if (state.sort === 'high') list.sort((a, b) => b.price - a.price);
  if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  return list;
}
function render() {
  const list = results();
  const n = state.start && state.end ? nightsBetween(state.start, state.end) : 0;
  $('#count').innerHTML = `<b>${list.length} stay${list.length === 1 ? '' : 's'}</b> ${state.where ? 'in ' + state.where : 'along the coast'}${n ? ` · ${short(state.start)} – ${short(state.end)} · prices for ${n} night${n > 1 ? 's' : ''}` : ''}`;
  $('#grid').innerHTML = list.length ? list.map((s, i) => `
    <article class="card" data-id="${s.id}" style="animation-delay:${i * 50}ms" tabindex="0" aria-label="${s.title}, ${s.place}, ${fmt(s.price)} per night">
      <div class="card__img">
        <img src="img/${s.imgs[0]}.webp" alt="" loading="lazy"><img src="img/${s.imgs[1]}.webp" alt="" loading="lazy">
        ${s.badge ? `<span class="card__badge">${s.badge}</span>` : ''}
        <button class="heart${wish.has(s.id) ? ' is-on' : ''}" data-heart="${s.id}" aria-label="Save ${s.title}" aria-pressed="${wish.has(s.id)}"><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.8 4.4 7.2C19.5 16.4 12 21 12 21z"/></svg></button>
      </div>
      <div class="card__row"><h3 class="card__title">${s.place}, Ghana</h3><span class="card__rating">★ ${s.rating.toFixed(2)}</span></div>
      <p class="card__sub">${s.title}</p>
      <p class="card__sub">${s.beds.split(' · ')[0]} · up to ${s.guests} guests</p>
      <p class="card__price">${n ? `<b>${fmt(s.price * n)}</b> total` : `<b>${fmt(s.price)}</b> night`}</p>
    </article>`).join('') : `<div class="empty"><b>No exact matches</b><p>Try another place, fewer filters or a higher budget.</p><button class="btn btn--dark btn--sm" id="reset">Reset filters</button></div>`;
  $('#wishCount').textContent = wish.size;
}
$('#grid').addEventListener('click', e => {
  const h = e.target.closest('[data-heart]');
  if (h) {
    e.stopPropagation();
    const id = +h.dataset.heart;
    wish.has(id) ? wish.delete(id) : wish.add(id);
    h.classList.toggle('is-on', wish.has(id)); h.setAttribute('aria-pressed', wish.has(id));
    $('#wishCount').textContent = wish.size; saveWish();
    toast(wish.has(id) ? 'Saved to your wishlist' : 'Removed from your wishlist');
    return;
  }
  if (e.target.id === 'reset') { Object.assign(state, { where: '', tag: '', max: 2500, pets: 0 }); $('#where').value = ''; $('#price').value = 2500; $('#priceVal').textContent = fmt(2500); $$('.chip').forEach(c => c.classList.toggle('is-on', !c.dataset.tag)); setGuests(); render(); return; }
  const c = e.target.closest('.card'); if (c) openDetail(+c.dataset.id);
});
$('#grid').addEventListener('keydown', e => { const c = e.target.closest('.card'); if (c && e.key === 'Enter') openDetail(+c.dataset.id); });
$('#chips').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if (!c) return;
  state.tag = c.dataset.tag; $$('.chip').forEach(x => x.classList.toggle('is-on', x === c)); render();
});
$('#price').addEventListener('input', e => { state.max = +e.target.value; $('#priceVal').textContent = fmt(state.max); render(); });
$('#sortBy').addEventListener('change', e => { state.sort = e.target.value; render(); });
$('#where').addEventListener('change', e => { state.where = e.target.value; e.target.closest('.search__cell').classList.toggle('has-val', !!state.where); });
$('#search').addEventListener('submit', e => { e.preventDefault(); closePops(); render(); $('#stays').scrollIntoView({ behavior: 'smooth' }); });
$('#wishBtn').addEventListener('click', () => toast(wish.size ? `You have ${wish.size} saved stay${wish.size > 1 ? 's' : ''}` : 'Tap ♡ on a stay to save it'));

/* ---------- Places ---------- */
$('#placesRow').innerHTML = PLACES.map(([p, img]) => {
  const c = STAYS.filter(s => s.place === p).length;
  return `<button class="place" data-place="${p}"><img src="img/${img}.webp" alt="" loading="lazy"><span><b>${p}</b><small>${c} stay${c > 1 ? 's' : ''}</small></span></button>`;
}).join('');
$('#placesRow').addEventListener('click', e => {
  const b = e.target.closest('[data-place]'); if (!b) return;
  state.where = b.dataset.place; $('#where').value = state.where; $('#where').closest('.search__cell').classList.add('has-val');
  render(); $('#stays').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- Calendar ---------- */
let viewMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
const MAX_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth() + 11, 1);
function monthHTML(m) {
  const first = new Date(m.getFullYear(), m.getMonth(), 1);
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7;
  let h = `<div class="cal__m"><h4>${first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h4><div class="cal__g">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<span class="dow">${d}</span>`).join('')}`;
  h += '<span></span>'.repeat(lead);
  for (let d = 1; d <= days; d++) {
    const dt = new Date(m.getFullYear(), m.getMonth(), d), t = +dt;
    const cls = ['day'];
    if (t === +TODAY) cls.push('is-today');
    if (state.start && t === +state.start) cls.push('is-start', state.end ? 'has-end' : '');
    if (state.end && t === +state.end) cls.push('is-end');
    if (state.start && state.end && t > +state.start && t < +state.end) cls.push('in-range');
    h += `<button type="button" class="${cls.join(' ')}" data-t="${t}" ${dt < TODAY ? 'disabled' : ''} aria-label="${dt.toDateString()}">${d}</button>`;
  }
  return h + '</div></div>';
}
function renderCal() {
  const next = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
  $('#calMonths').innerHTML = monthHTML(viewMonth) + monthHTML(next);
  $('[data-cal="-1"]').disabled = +viewMonth <= +new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  $('[data-cal="1"]').disabled = +viewMonth >= +MAX_MONTH;
  const n = state.start && state.end ? nightsBetween(state.start, state.end) : 0;
  $('#calHint').textContent = !state.start ? 'Select your check-in date' : !state.end ? 'Now select check-out' : `${n} night${n > 1 ? 's' : ''} · ${short(state.start)} – ${short(state.end)}`;
  syncDates();
}
function syncDates() {
  $('#inTxt').textContent = state.start ? short(state.start) : 'Add date';
  $('#outTxt').textContent = state.end ? short(state.end) : 'Add date';
  $('#inBtn').classList.toggle('has-val', !!state.start); $('#outBtn').classList.toggle('has-val', !!state.end);
  if (current) renderPanel();
}
$('#calMonths').addEventListener('click', e => {
  const b = e.target.closest('.day'); if (!b || b.disabled) return;
  const t = new Date(+b.dataset.t);
  if (!state.start || state.end || t <= state.start) { state.start = t; state.end = null; }
  else state.end = t;
  renderCal();
  if (state.start && state.end) setTimeout(() => closePops(), 450);
});
$$('[data-cal]').forEach(b => b.addEventListener('click', () => { viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + +b.dataset.cal, 1); renderCal(); }));
$('#calClear').addEventListener('click', () => { state.start = state.end = null; renderCal(); render(); });
$('#calDone').addEventListener('click', () => { closePops(); render(); });

/* ---------- Guests ---------- */
const LIMIT = { adults: [1, 16], kids: [0, 10], pets: [0, 3] };
function setGuests() {
  ['adults', 'kids', 'pets'].forEach(k => { $('#' + k).textContent = state[k]; });
  $$('[data-g]').forEach(b => { const k = b.dataset.g, d = +b.dataset.d; b.disabled = d < 0 ? state[k] <= LIMIT[k][0] : state[k] >= LIMIT[k][1]; });
  const g = state.adults + state.kids;
  const txt = `${g} guest${g > 1 ? 's' : ''}${state.pets ? `, ${state.pets} pet${state.pets > 1 ? 's' : ''}` : ''}`;
  $('#guestTxt').textContent = txt; $('[data-pop="guests"]').classList.add('has-val');
  if (current) renderPanel();
}
$('#popGuests').addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (!b) return; state[b.dataset.g] += +b.dataset.d; setGuests(); });

/* ---------- Popovers ---------- */
function closePops() { $('#popCal').hidden = true; $('#popGuests').hidden = true; $$('.search__cell').forEach(c => c.classList.remove('is-active')); }
$$('[data-pop]').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation();
  const cal = b.dataset.pop === 'cal';
  const target = cal ? $('#popCal') : $('#popGuests');
  const wasOpen = !target.hidden;
  closePops();
  if (!wasOpen) { target.hidden = false; b.classList.add('is-active'); if (cal) renderCal(); }
}));
document.addEventListener('click', e => {
  const inside = e.composedPath().some(el => el instanceof Element && (el.classList.contains('pop') || el.hasAttribute('data-pop') || el.hasAttribute('data-pop2')));
  if (!inside) closePops();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePops(); });

/* ---------- Detail ---------- */
let current = null;
const dlg = $('#detail');
function openDetail(id) {
  current = STAYS.find(s => s.id === id);
  $('#dGallery').innerHTML = current.imgs.map((im, i) => `<img src="img/${im}.webp" alt="${i ? 'Room' : current.title}">`).join('');
  $('#dPlace').textContent = `${current.place}, Ghana`;
  $('#dTitle').textContent = current.title;
  $('#dMeta').textContent = `★ ${current.rating.toFixed(2)} · ${current.reviews} reviews · ${current.beds}`;
  $('#dHost').innerHTML = `<i>${current.host[0]}</i><div><b>Hosted by ${current.host}</b><small>${current.badge === 'Superhost' ? 'Superhost · ' : ''}Verified ID · responds within an hour</small></div>`;
  $('#dDesc').textContent = current.desc;
  $('#dAmen').innerHTML = current.amen.map(a => `<li>${a}</li>`).join('');
  $('#panel').hidden = false; $('#done').hidden = true;
  renderPanel();
  dlg.showModal(); dlg.scrollTop = 0;
}
function renderPanel() {
  if (!current) return;
  $('#pPrice').textContent = fmt(current.price);
  $('#pIn').textContent = state.start ? short(state.start) : 'Add date';
  $('#pOut').textContent = state.end ? short(state.end) : 'Add date';
  const g = state.adults + state.kids;
  $('#pGuests').textContent = `${g} guest${g > 1 ? 's' : ''}${g > current.guests ? ` (max ${current.guests})` : ''}`;
  const n = state.start && state.end ? nightsBetween(state.start, state.end) : 0;
  if (!n) { $('#pCalc').innerHTML = '<p>Add your dates to see the total price.</p>'; $('#reserve').textContent = 'Check availability'; return; }
  const base = current.price * n, clean = Math.round(current.price * .18), fee = Math.round((base + clean) * .1), disc = n >= 7 ? Math.round(base * .1) : 0;
  $('#pCalc').innerHTML = `<div><u>${fmt(current.price)} × ${n} night${n > 1 ? 's' : ''}</u><span>${fmt(base)}</span></div>
    ${disc ? `<div><u>Weekly discount (10%)</u><span style="color:var(--sea)">−${fmt(disc)}</span></div>` : ''}
    <div><u>Cleaning fee</u><span>${fmt(clean)}</span></div>
    <div><u>Coastline service fee</u><span>${fmt(fee)}</span></div>
    <div class="tot"><span>Total</span><span>${fmt(base - disc + clean + fee)}</span></div>`;
  $('#reserve').textContent = 'Reserve';
}
$$('[data-pop2]').forEach(b => b.addEventListener('click', () => {
  dlg.close();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { $('#inBtn').click(); }, 350);
}));
$('#reserve').addEventListener('click', () => {
  const n = state.start && state.end ? nightsBetween(state.start, state.end) : 0;
  if (!n) { $$('[data-pop2]')[0].click(); toast('Pick your dates, then open the stay again'); return; }
  const g = state.adults + state.kids;
  if (g > current.guests) { toast(`This stay sleeps up to ${current.guests} guests`); return; }
  $('#panel').hidden = true; $('#done').hidden = false;
  $('#doneTxt').textContent = `${current.host} has 24 hours to confirm your ${n}-night stay in ${current.place} (${short(state.start)} – ${short(state.end)}). You’ll pay with MoMo or card once it’s accepted.`;
});
dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
dlg.addEventListener('close', () => { current = null; });

let tt;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-on'), 2600); }

setGuests();
render();

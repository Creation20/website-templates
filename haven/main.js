const HOMES = [
  { id: 1, title: 'Pool villa with red feature wall', area: 'East Legon Hills', type: 'House', beds: 5, baths: 6, sqm: 520, buy: 685000, rent: 6500, f: ['pool', 'gated', 'new'], imgs: ['hero', 'i2', 'i4'], agent: 'Efua Mensah', desc: 'A brand-new five-bedroom villa in a gated estate with 24-hour security, a 12-metre pool, a boys’ quarters and solar backup. It is five minutes from several international schools.', feat: ['Swimming pool', 'Boys’ quarters', 'Solar + inverter', '2,000 L water reservoir', 'Fitted kitchen', '24/7 security'] },
  { id: 2, title: 'Stone-front family home', area: 'Airport Residential', type: 'House', beds: 4, baths: 5, sqm: 410, buy: 920000, rent: 8500, f: ['gated', 'furnished'], imgs: ['h1', 'i1', 'i3'], agent: 'Kwame Owusu', desc: 'A quiet, leafy street ten minutes from Kotoka. The house has a carport for three cars, a balcony off every bedroom and a separate study.', feat: ['Furnished', 'Carport for 3', 'Study', 'Balconies', 'Standby generator', 'Gated'] },
  { id: 3, title: 'Timber & stone contemporary', area: 'Trasacco Valley', type: 'House', beds: 5, baths: 6, sqm: 600, buy: 1250000, rent: 11000, f: ['pool', 'gated', 'new'], imgs: ['h2', 'i5', 'i8'], agent: 'Efua Mensah', desc: 'An architect-designed home in one of Accra’s most private estates. It has double-height living, a floating staircase and a pool terrace lined with palms.', feat: ['Double-height living', 'Pool terrace', 'Home cinema', 'Smart home', 'Staff quarters', 'Estate gym'] },
  { id: 4, title: 'Two-bed with wraparound balcony', area: 'Cantonments', type: 'Apartment', beds: 2, baths: 2, sqm: 140, buy: 265000, rent: 2600, f: ['furnished', 'new'], imgs: ['h3', 'i6', 'i7'], agent: 'Abena Darko', desc: 'A corner apartment in a boutique block near the embassies. There is a rooftop lounge, fibre internet and backup power for the whole building.', feat: ['Furnished', 'Rooftop lounge', 'Fibre internet', 'Lift', 'Backup power', 'Parking for 1'] },
  { id: 5, title: 'Glass-balcony penthouse', area: 'Labone', type: 'Apartment', beds: 3, baths: 3, sqm: 210, buy: 410000, rent: 3800, f: ['gated', 'furnished'], imgs: ['h4', 'i1', 'i4'], agent: 'Kwame Owusu', desc: 'The top floor of a quiet block with planted terraces and sea breezes. You can walk to Labone’s cafés and the Ghana–India Kofi Annan Centre.', feat: ['Private terrace', 'Furnished', 'Lift', 'Gym', 'Backup power', '2 parking bays'] },
  { id: 6, title: 'Forest retreat with tiled roof', area: 'Aburi Hills', type: 'House', beds: 3, baths: 3, sqm: 260, buy: 340000, rent: 2900, f: ['new'], imgs: ['h5', 'i7', 'i3'], agent: 'Abena Darko', desc: 'A weekend home 40 minutes from Accra, wrapped in forest with views down to the coast. It is cooler air, with the city close enough for Monday.', feat: ['Forest views', 'Borehole', 'Solar', 'Fire pit', 'Garden', 'Caretaker cottage'] },
  { id: 7, title: 'Garden house with pergola', area: 'East Legon', type: 'Townhouse', beds: 4, baths: 4, sqm: 330, buy: 540000, rent: 4800, f: ['pool', 'gated'], imgs: ['h6', 'i6', 'i2'], agent: 'Efua Mensah', desc: 'A large lawn for the kids, a covered pergola for weekend barbecues, and a short drive to A&C Mall.', feat: ['Shared pool', 'Big lawn', 'Pergola', 'Gated community', 'Water treatment', 'Boys’ quarters'] },
  { id: 8, title: 'Minimalist one-bed studio flat', area: 'Osu', type: 'Apartment', beds: 1, baths: 1, sqm: 72, buy: 135000, rent: 1400, f: ['furnished', 'new'], imgs: ['i4', 'i7', 'i6'], agent: 'Abena Darko', desc: 'A compact, beautifully finished flat in Osu. It is close to Oxford Street, with a good Airbnb track record.', feat: ['Furnished', 'Airbnb-ready', 'Backup power', 'Security', 'Fibre internet', 'Parking'] },
];
const AREAS = [
  ['East Legon', 'Schools, malls and new estates · 20 min to airport', 'From $210k'],
  ['Cantonments', 'Embassies, leafy streets, cafés · 10 min to airport', 'From $240k'],
  ['Airport Residential', 'Quiet, central, business district on your doorstep', 'From $380k'],
  ['Labone', 'Walkable, coastal breeze, restaurants', 'From $190k'],
  ['Trasacco Valley', 'Gated, private, top-end homes', 'From $900k'],
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const usd = n => '$' + Math.round(n).toLocaleString('en-US');
const st = { mode: 'buy', area: '', type: '', beds: 0, max: Infinity, f: new Set(), sort: 'new' };
let saved = new Set();
try { saved = new Set(JSON.parse(localStorage.getItem('haven-saved') || '[]')); } catch {}

/* Finder options */
const areas = [...new Set(HOMES.map(h => h.area))].sort();
$('#fArea').innerHTML += areas.map(a => `<option>${a}</option>`).join('');
function fillMax() {
  const opts = st.mode === 'buy' ? [200000, 400000, 600000, 1000000, 1500000] : [1500, 3000, 5000, 8000, 12000];
  $('#fMax').innerHTML = `<option value="">No limit</option>` + opts.map(o => `<option value="${o}">${usd(o)}${st.mode === 'rent' ? '/mo' : ''}</option>`).join('');
  st.max = Infinity;
}
function setMode(m) {
  st.mode = m;
  $$('[data-mode]').forEach(b => { const on = b.dataset.mode === m; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
  $('#modeLabel').textContent = m === 'buy' ? 'For sale' : 'For rent';
  fillMax(); render();
}
$$('[data-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
$$('[data-mode-link]').forEach(a => a.addEventListener('click', () => setMode(a.dataset.modeLink)));
$('#finder').addEventListener('submit', e => {
  e.preventDefault();
  st.area = $('#fArea').value; st.type = $('#fType').value; st.beds = +$('#fBeds').value; st.max = +$('#fMax').value || Infinity;
  render(); $('#listings').scrollIntoView({ behavior: 'smooth' });
});
$('#chips').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if (!c) return;
  st.f.has(c.dataset.f) ? st.f.delete(c.dataset.f) : st.f.add(c.dataset.f);
  c.setAttribute('aria-pressed', st.f.has(c.dataset.f)); render();
});
$('#sort').addEventListener('change', e => { st.sort = e.target.value; render(); });

const price = h => st.mode === 'buy' ? h.buy : h.rent;
const priceTxt = h => st.mode === 'buy' ? usd(h.buy) : `${usd(h.rent)}<small> /month</small>`;
const ghs = n => 'GH₵ ' + Math.round(n * 11.4).toLocaleString('en-GH');

function render() {
  let list = HOMES.filter(h => (!st.area || h.area === st.area) && (!st.type || h.type === st.type) && h.beds >= st.beds && price(h) <= st.max && [...st.f].every(f => h.f.includes(f)));
  if (st.sort === 'low') list.sort((a, b) => price(a) - price(b));
  if (st.sort === 'high') list.sort((a, b) => price(b) - price(a));
  if (st.sort === 'size') list.sort((a, b) => b.sqm - a.sqm);
  $('#count').textContent = `${list.length} home${list.length === 1 ? '' : 's'} ${st.mode === 'buy' ? 'for sale' : 'to rent'}${st.area ? ' in ' + st.area : ' across Accra'}`;
  $('#grid').innerHTML = list.length ? list.map((h, i) => `
    <article class="card" data-id="${h.id}" tabindex="0" style="animation-delay:${i * 50}ms">
      <div class="card__img"><img src="img/${h.imgs[0]}.webp" alt="${h.title}" loading="lazy">
        ${h.f.includes('new') ? '<span class="badge">New build</span>' : ''}<span class="badge badge--v">✓ Verified</span>
        <button class="heart${saved.has(h.id) ? ' is-on' : ''}" data-save="${h.id}" aria-label="Save ${h.title}" aria-pressed="${saved.has(h.id)}">${saved.has(h.id) ? '♥' : '♡'}</button></div>
      <p class="card__price">${priceTxt(h)}</p>
      <h3 class="card__title">${h.title}</h3>
      <p class="card__area">${h.area} · ${h.type}</p>
      <div class="card__specs"><span><b>${h.beds}</b> beds</span><span><b>${h.baths}</b> baths</span><span><b>${h.sqm}</b> m²</span></div>
    </article>`).join('') : `<div class="empty"><b>No homes match yet.</b><p>Try another area or remove a filter.</p></div>`;
  $('#savedCount').textContent = saved.size;
}
$('#grid').addEventListener('click', e => {
  const s = e.target.closest('[data-save]');
  if (s) {
    e.stopPropagation(); const id = +s.dataset.save;
    saved.has(id) ? saved.delete(id) : saved.add(id);
    try { localStorage.setItem('haven-saved', JSON.stringify([...saved])); } catch {}
    s.classList.toggle('is-on', saved.has(id)); s.textContent = saved.has(id) ? '♥' : '♡'; s.setAttribute('aria-pressed', saved.has(id));
    $('#savedCount').textContent = saved.size; toast(saved.has(id) ? 'Saved to your shortlist' : 'Removed from shortlist'); return;
  }
  const c = e.target.closest('.card'); if (c) open(+c.dataset.id);
});
$('#grid').addEventListener('keydown', e => { const c = e.target.closest('.card'); if (c && e.key === 'Enter') open(+c.dataset.id); });
$('#savedBtn').addEventListener('click', () => toast(saved.size ? `${saved.size} home${saved.size > 1 ? 's' : ''} on your shortlist` : 'Tap ♡ on any home to shortlist it'));

/* Areas */
$('#areaList').innerHTML = AREAS.map(([n, d, p]) => `<button class="area" data-area="${n}"><b>${n}</b><em>${p}</em><span>${d}</span></button>`).join('');
$('#areaList').addEventListener('click', e => {
  const a = e.target.closest('[data-area]'); if (!a) return;
  const match = areas.find(x => x.startsWith(a.dataset.area)) || '';
  st.area = match; $('#fArea').value = match; render(); $('#listings').scrollIntoView({ behavior: 'smooth' });
});

/* Detail */
const dlg = $('#home');
let cur = null, vDay = null, vTime = null;
function open(id) {
  cur = HOMES.find(h => h.id === id); vDay = vTime = null;
  $('#hMain').src = `img/${cur.imgs[0]}.webp`; $('#hMain').alt = cur.title;
  $('#hThumbs').innerHTML = cur.imgs.map((im, i) => `<button data-img="${im}" aria-pressed="${i === 0}" aria-label="Photo ${i + 1}"><img src="img/${im}.webp" alt=""></button>`).join('');
  $('#hArea').textContent = `${cur.area}, Accra · ${cur.type}`;
  $('#hTitle').textContent = cur.title;
  $('#hPrice').innerHTML = st.mode === 'buy' ? `${usd(cur.buy)} <small style="font-size:16px;color:var(--mute)">≈ ${ghs(cur.buy)}</small>` : `${usd(cur.rent)} / month <small style="font-size:16px;color:var(--mute)">≈ ${ghs(cur.rent)}</small>`;
  $('#hSpecs').innerHTML = `<li><b>${cur.beds}</b>bedrooms</li><li><b>${cur.baths}</b>bathrooms</li><li><b>${cur.sqm}</b>m²</li>${st.mode === 'buy' ? '<li><b>Title</b>verified</li>' : '<li><b>1 yr</b>advance</li>'}`;
  $('#hDesc').textContent = cur.desc;
  $('#hFeat').innerHTML = cur.feat.map(f => `<li>${f}</li>`).join('');
  $('#hAgent').textContent = cur.agent; $('#hAgentI').textContent = cur.agent.split(' ').map(w => w[0]).join('');
  $('#viewForm').hidden = false; $('#vDone').hidden = true; $('#vErr').textContent = '';
  const days = []; for (let i = 1; i <= 7; i++) { const d = new Date(); d.setDate(d.getDate() + i); if (d.getDay() !== 0) days.push(d); }
  $('#vDays').innerHTML = days.map((d, i) => `<button type="button" data-d="${d.toDateString()}" aria-pressed="false">${d.toLocaleDateString('en-GB', { weekday: 'short' })}<small>${d.getDate()} ${d.toLocaleDateString('en-GB', { month: 'short' })}</small></button>`).join('');
  $('#vTimes').innerHTML = ['09:00', '11:00', '14:00', '16:00', '17:30'].map(t => `<button type="button" data-t="${t}" aria-pressed="false">${t}</button>`).join('');
  dlg.showModal(); dlg.scrollTop = 0;
}
$('#hThumbs').addEventListener('click', e => { const b = e.target.closest('[data-img]'); if (!b) return; $('#hMain').src = `img/${b.dataset.img}.webp`; $$('#hThumbs button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
$('#vDays').addEventListener('click', e => { const b = e.target.closest('[data-d]'); if (!b) return; vDay = b.dataset.d; $$('#vDays button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
$('#vTimes').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (!b) return; vTime = b.dataset.t; $$('#vTimes button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
$('#vBook').addEventListener('click', () => {
  const n = $('#vName'), p = $('#vPhone'), errs = [];
  [n, p].forEach(x => x.classList.remove('bad'));
  if (!vDay || !vTime) errs.push('a day and time');
  if (n.value.trim().length < 2) { n.classList.add('bad'); errs.push('your name'); }
  if (!/^(0\d{9}|233\d{9})$/.test(p.value.replace(/\D/g, ''))) { p.classList.add('bad'); errs.push('a valid phone number'); }
  if (errs.length) { $('#vErr').textContent = 'Please choose ' + errs.join(', ') + '.'; return; }
  $('#viewForm').hidden = true; $('#vDone').hidden = false;
  $('#vDoneTxt').textContent = `${cur.agent} will meet you at ${cur.title.toLowerCase()} on ${new Date(vDay).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at ${vTime}. We’ll text the exact location.`;
});
dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });

/* Mortgage */
const m = { price: $('#mPrice'), dep: $('#mDep'), rate: $('#mRate'), years: $('#mYears') };
function calc() {
  const P = +m.price.value * (1 - m.dep.value / 100), r = m.rate.value / 100 / 12, n = m.years.value * 12;
  const pay = r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;
  const totalInt = pay * n - P;
  $('#oPrice').textContent = usd(+m.price.value);
  $('#oDep').textContent = `${m.dep.value}% · ${usd(m.price.value * m.dep.value / 100)}`;
  $('#oRate').textContent = `${(+m.rate.value).toFixed(1)}%`;
  $('#oYears').textContent = `${m.years.value} years`;
  $('#monthly').textContent = usd(pay);
  const pShare = P / (P + totalInt) * 100;
  $('#barP').style.width = pShare + '%'; $('#barI').style.width = (100 - pShare) + '%';
  $('#lp').textContent = usd(P); $('#li').textContent = usd(totalInt);
}
Object.values(m).forEach(i => i.addEventListener('input', calc));

let tt;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('is-on'), 2600); }

fillMax(); render(); calc();

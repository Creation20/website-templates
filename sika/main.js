const PRODUCTS = [
  { id: 'ama-kente', name: 'Ama Kente Dress', cat: 'women', sub: 'Hand-woven kente panels', price: 890, img: 'kente', badge: 'Bestseller', colors: ['#e6b422', '#1f6f4a', '#b5462b'], sizes: ['XS', 'S', 'M', 'L', 'XL'], soldOut: ['XS'], desc: 'A fitted midi dress built from Bonwire kente strips, with a cotton lining and a hidden side zip.' },
  { id: 'esi-set', name: 'The Esi Set', cat: 'women', sub: 'Ruched sleeves, wide trousers', price: 760, img: 'hero', badge: 'New', colors: ['#d39a1c', '#244d3a'], sizes: ['XS', 'S', 'M', 'L', 'XL'], soldOut: [], desc: 'Mustard poplin top with dramatic ruched sleeves, paired with high-waisted forest-green trousers.' },
  { id: 'abena-wrap', name: 'Abena Wrap Dress', cat: 'women', sub: 'Wax print, adjustable wrap', price: 640, img: 'red', colors: ['#b5462b', '#f3ede3'], sizes: ['S', 'M', 'L', 'XL'], soldOut: [], desc: 'A true wrap dress in red-and-cream wax print. Ties at the waist and works for every size on the label.' },
  { id: 'kofi-blazer', name: 'Kofi Floral Blazer', cat: 'men', sub: 'Single-breasted, unlined', price: 980, img: 'pink', badge: 'New', colors: ['#d98fa0', '#16130f'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], soldOut: ['S'], desc: 'An unlined summer blazer in a pink-and-black floral print. Light enough for an Accra afternoon.' },
  { id: 'adjoa-vest', name: 'Adjoa Statement Vest', cat: 'women', sub: 'Layer over shirts or bare', price: 420, img: 'vest', colors: ['#4b3f8f', '#f3ede3'], sizes: ['XS', 'S', 'M', 'L'], soldOut: [], desc: 'A boxy, cropped vest in indigo print with contrast piping. Wear it open over a crisp white shirt.' },
  { id: 'kwame-suit', name: 'Kwame Corduroy Jacket', cat: 'men', sub: 'Tobacco corduroy', price: 1450, img: 'suit', colors: ['#7a4a2a'], sizes: ['M', 'L', 'XL', 'XXL'], soldOut: [], desc: 'A soft-shouldered corduroy jacket in deep tobacco, cut in Osu and finished with horn buttons.' },
  { id: 'dzifa-top', name: 'Dzifa Sleeve Top', cat: 'women', sub: 'Statement sleeve', price: 520, img: 'fan', colors: ['#d39a1c'], sizes: ['XS', 'S', 'M', 'L', 'XL'], soldOut: ['XL'], desc: 'The hero sleeve from the Esi Set, now as a standalone top. Tuck it into anything.' },
  { id: 'akua-shirt', name: 'Akua Sky Shirt', cat: 'women', sub: 'Oversized, cotton', price: 380, img: 'blue', colors: ['#9cc0e8', '#f3ede3'], sizes: ['XS', 'S', 'M', 'L', 'XL'], soldOut: [], desc: 'An oversized cotton shirt in a pale sky blue, with dropped shoulders and long cuffs.' },
  { id: 'yaa-blazer', name: 'Yaa Tuxedo Blazer', cat: 'women', sub: 'Satin lapel', price: 1100, img: 'blazer', badge: 'Limited', colors: ['#16130f'], sizes: ['XS', 'S', 'M', 'L'], soldOut: ['L'], desc: 'A sharp black tuxedo blazer with satin lapels. Only 30 made this season.' },
  { id: 'headwrap', name: 'Duku Headwrap Set', cat: 'accessories', sub: 'Three wraps, one bag', price: 180, img: 'wraps', colors: ['#b5462b', '#2b4c8c', '#d39a1c'], sizes: ['One size'], soldOut: [], desc: 'Three headwraps cut from our offcuts, with a step-by-step tying card. Nothing goes to waste.' },
];
const FREE_SHIP = 800;
const fmt = n => 'GH₵ ' + n.toLocaleString('en-GH');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- Storage ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('sika-cart') || '[]'); } catch { cart = []; }
const save = () => { try { localStorage.setItem('sika-cart', JSON.stringify(cart)); } catch {} };

/* ---------- Grid ---------- */
let filter = 'all', sort = 'new';
function renderGrid() {
  let list = PRODUCTS.filter(p => filter === 'all' || p.cat === filter);
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  $('#grid').innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <div class="card__media">
        <img src="img/${p.img}.webp" alt="${p.name}" loading="lazy" width="900" height="1200">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ''}
        <button class="card__add" data-quick="${p.id}">Quick add</button>
      </div>
      <div class="card__info">
        <div>
          <h3 class="card__name">${p.name}</h3>
          <p class="card__sub">${p.sub}</p>
          <div class="swatches">${p.colors.map(c => `<i style="background:${c}"></i>`).join('')}</div>
        </div>
        <span class="card__price">${fmt(p.price)}</span>
      </div>
    </article>`).join('');
}
function setFilter(f) {
  filter = f;
  $$('.chip').forEach(c => { const on = c.dataset.filter === f; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
  renderGrid();
}
$$('.chip').forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter)));
$$('[data-filter-link]').forEach(a => a.addEventListener('click', () => setFilter(a.dataset.filterLink)));
$('#sort').addEventListener('change', e => { sort = e.target.value; renderGrid(); });

/* ---------- Quick add ---------- */
const quick = $('#quick');
let current = null, size = null;
function openQuick(id) {
  current = PRODUCTS.find(p => p.id === id);
  if (!current) return;
  size = current.sizes.length === 1 ? current.sizes[0] : null;
  $('#quickImg').src = `img/${current.img}.webp`;
  $('#quickImg').alt = current.name;
  $('#quickCat').textContent = current.cat;
  $('#quickName').textContent = current.name;
  $('#quickPrice').textContent = fmt(current.price);
  $('#quickDesc').textContent = current.desc;
  $('#quickErr').textContent = '';
  $('#sizes').innerHTML = current.sizes.map(s => {
    const out = current.soldOut.includes(s);
    return `<button type="button" class="size${s === size ? ' is-on' : ''}" data-size="${s}" ${out ? 'disabled aria-label="' + s + ', sold out"' : ''}>${s}</button>`;
  }).join('');
  quick.showModal();
}
document.addEventListener('click', e => {
  const q = e.target.closest('[data-quick]');
  if (q) { e.preventDefault(); openQuick(q.dataset.quick); }
});
$('#sizes').addEventListener('click', e => {
  const b = e.target.closest('.size');
  if (!b || b.disabled) return;
  size = b.dataset.size;
  $$('.size').forEach(x => x.classList.toggle('is-on', x === b));
  $('#quickErr').textContent = '';
});
quick.addEventListener('click', e => { if (e.target === quick || e.target.closest('[data-close]')) quick.close(); });
$('#addToBag').addEventListener('click', () => {
  if (!size) { $('#quickErr').textContent = 'Please choose a size.'; return; }
  const line = cart.find(l => l.id === current.id && l.size === size);
  line ? line.qty++ : cart.push({ id: current.id, size, qty: 1 });
  save(); renderCart(); quick.close();
  const c = $('#bagCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  setTimeout(() => c.classList.remove('bump'), 450);
  toast(`${current.name} (${size}) added to your bag`);
  setTimeout(openCart, 350);
});

/* ---------- Cart ---------- */
const cartEl = $('#cart'), scrim = $('#scrim');
function openCart() { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-on')); cartEl.classList.add('is-open'); cartEl.setAttribute('aria-hidden', 'false'); }
function closeCart() { scrim.classList.remove('is-on'); cartEl.classList.remove('is-open'); cartEl.setAttribute('aria-hidden', 'true'); setTimeout(() => (scrim.hidden = true), 400); }
$('#openCart').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
scrim.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

function renderCart() {
  const count = cart.reduce((a, l) => a + l.qty, 0);
  const total = cart.reduce((a, l) => a + l.qty * PRODUCTS.find(p => p.id === l.id).price, 0);
  $('#bagCount').textContent = count;
  $('#cartCount').textContent = count ? `(${count})` : '';
  $('#subtotal').textContent = fmt(total);
  const left = FREE_SHIP - total;
  $('#shipMsg').innerHTML = left > 0 ? `You're <b>${fmt(left)}</b> away from free delivery in Accra &amp; Kumasi.` : '🎉 You\'ve unlocked <b>free delivery</b>.';
  $('#shipBar').style.width = Math.min(100, (total / FREE_SHIP) * 100) + '%';
  $('#checkout').disabled = !count;
  $('#checkout').style.opacity = count ? 1 : .4;
  $('#cartItems').innerHTML = count ? cart.map((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `<li class="cart__item">
      <img src="img/${p.img}.webp" alt="">
      <div><h3>${p.name}</h3><p>Size ${l.size} · ${fmt(p.price)}</p>
        <div class="qty"><button data-dec="${i}" aria-label="Decrease quantity">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="Increase quantity">+</button></div>
      </div>
      <div class="cart__right"><span>${fmt(p.price * l.qty)}</span><button data-rm="${i}">Remove</button></div>
    </li>`;
  }).join('') : `<li class="cart__empty"><b>Your bag is empty</b>Pieces you add will appear here.</li>`;
}
$('#cartItems').addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.inc) cart[t.dataset.inc].qty++;
  else if (t.dataset.dec) { const l = cart[t.dataset.dec]; l.qty--; if (!l.qty) cart.splice(t.dataset.dec, 1); }
  else if (t.dataset.rm) cart.splice(t.dataset.rm, 1);
  else return;
  save(); renderCart();
});
$('#checkout').addEventListener('click', () => toast('This is a template: connect Paystack or Hubtel here to take MoMo and card payments.'));

/* ---------- Misc ---------- */
let tt;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-on'), 3200); }

const menuBtn = $('.header__menu'), nav = $('.header__nav');
menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('is-open'); menuBtn.setAttribute('aria-expanded', o); });
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('is-open'); });

$$('[data-look]').forEach(b => b.addEventListener('click', () => {
  const rail = $('#lookRail'); const w = rail.querySelector('figure').offsetWidth + 16;
  rail.scrollBy({ left: w * +b.dataset.look, behavior: 'smooth' });
}));

$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#newsEmail').value.trim();
  $('#newsMsg').textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'You’re on the list. Medaase!' : 'Please enter a valid email address.';
});

renderGrid();
renderCart();

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');

/* Ceremony start: 12 Dec 2026, 14:00 Accra time (GMT) */
const WEDDING = Date.UTC(2026, 11, 12, 14, 0, 0);

const EVENTS = [
  { day: 'Friday 11 December', name: 'Engagement', time: '10:00 – 15:00', desc: 'The traditional knocking and engagement with both families. Expect drumming, kente and plenty of food.', place: 'The Mensah Family House', addr: 'Dzorwulu, Accra', dress: 'Kente or traditional wear', start: Date.UTC(2026, 11, 11, 10), end: Date.UTC(2026, 11, 11, 15) },
  { day: 'Saturday 12 December', name: 'Wedding', time: '14:00 – 15:30', desc: 'The white wedding ceremony. Please be seated by 13:45, because Ama is never late (Kojo insists this is new).', place: 'The Garden Chapel', addr: 'Cantonments, Accra', dress: 'Formal · wine & gold', start: Date.UTC(2026, 11, 12, 14), end: Date.UTC(2026, 11, 12, 15, 30) },
  { day: 'Saturday 12 December', name: 'Reception', time: '17:00 – late', desc: 'Dinner by the sea, speeches, then dancing until the DJ gives up. Bring comfortable shoes.', place: 'Palm Court Beach Gardens', addr: 'Labadi, Accra', dress: 'Formal · dancing shoes', start: Date.UTC(2026, 11, 12, 17), end: Date.UTC(2026, 11, 12, 23, 30) },
];

/* Nav */
const nav = $('.nav');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > innerHeight * .6);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Countdown */
function tick() {
  let d = Math.max(0, WEDDING - Date.now()) / 1000;
  const days = Math.floor(d / 86400); d -= days * 86400;
  const h = Math.floor(d / 3600); d -= h * 3600;
  const m = Math.floor(d / 60), s = Math.floor(d - m * 60);
  $('#cd').textContent = days; $('#ch').textContent = pad(h); $('#cm').textContent = pad(m); $('#cs').textContent = pad(s);
  if (WEDDING - Date.now() <= 0) $('#count').innerHTML = '<p style="font-family:var(--serif);font-size:32px;margin:0">We’re married! Thank you for celebrating with us.</p>';
}
tick(); setInterval(tick, 1000);

/* ICS helper */
const icsStamp = t => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
function icsFor(ev) {
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ama & Kojo//EN', 'BEGIN:VEVENT', `UID:${ev.start}-amakojo`, `DTSTART:${icsStamp(ev.start)}`, `DTEND:${icsStamp(ev.end)}`, `SUMMARY:Ama & Kojo · ${ev.name}`, `LOCATION:${ev.place}\\, ${ev.addr.replace(',', '\\,')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
}

/* Events */
$('#evGrid').innerHTML = EVENTS.map((e, i) => `
  <article class="ev reveal">
    <span class="ev__day">${e.day}</span>
    <h3>${e.name}</h3>
    <p class="ev__when">${e.time}</p>
    <p>${e.desc}</p>
    <p class="ev__where"><b>${e.place}</b>${e.addr} · ${e.dress}</p>
    <a href="${icsFor(e)}" download="ama-kojo-${e.name.toLowerCase()}.ics">Add to calendar</a>
    <a href="https://maps.google.com/?q=${encodeURIComponent(e.addr)}" target="_blank" rel="noopener">Directions ↗</a>
  </article>`).join('');

/* RSVP */
const form = $('#rsvpForm');
form.addEventListener('change', e => { if (e.target.name === 'att') $('#ifYes').hidden = e.target.value !== 'yes'; });
form.addEventListener('submit', e => {
  e.preventDefault();
  $$('.bad').forEach(x => x.classList.remove('bad'));
  const name = form.name.value.trim(), att = form.att.value;
  const errs = [];
  if (name.length < 2) { form.name.classList.add('bad'); errs.push('your name'); }
  if (!att) errs.push('whether you can attend');
  const evs = $$('input[name=ev]:checked').map(x => x.value);
  if (att === 'yes' && !evs.length) errs.push('at least one event');
  if (errs.length) { $('#err').textContent = 'Please let us know ' + errs.join(' and ') + '.'; return; }
  $('#err').textContent = '';
  const first = name.split(' ')[0];
  form.hidden = true; $('#thanks').hidden = false;
  if (att === 'yes') {
    $('#thanksTitle').textContent = `Medaase, ${first}!`;
    const g = +form.guests.value;
    $('#thanksTxt').textContent = `We’ve saved ${g === 1 ? 'a seat' : 'two seats'} for you at the ${evs.join(', ').replace(/, ([^,]*)$/, ' and $1')}. Meal: ${form.meal.value.toLowerCase()}. We can’t wait to dance with you.`;
    $('#cal').href = icsFor(EVENTS[1]); $('#cal').hidden = false;
  } else {
    $('#thanksTitle').textContent = `We’ll miss you, ${first}`;
    $('#thanksTxt').textContent = 'Thank you for letting us know. We’ll share photos and the live stream link closer to the day.';
    $('#cal').hidden = true;
  }
  $('#thanks').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* Copy gift details */
$$('.copy').forEach(b => b.addEventListener('click', async () => {
  const label = b.textContent;
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied ✓'; toast('Copied. Thank you for your kindness!'); }
  catch { b.textContent = b.dataset.copy; }
  b.classList.add('done'); setTimeout(() => { b.textContent = label; b.classList.remove('done'); }, 2200);
}));

/* FAQ */
const FAQ = [
  ['Can I bring a plus-one?', 'Your invitation lists everyone we’ve reserved seats for. If you have any questions, message Kojo’s sister Abena on 024 000 0001.'],
  ['Are children welcome?', 'Children are welcome at the engagement. The wedding and reception are adults-only, except for our little flower girls and page boys.'],
  ['Is there parking?', 'Yes. There is free parking at all three venues, and attendants will direct you on arrival.'],
  ['I’m travelling from abroad. Any tips?', 'December in Accra is warm and busy. Book flights and hotels early. We’ve reserved a block of rooms at a hotel near Labadi; ask us for the code.'],
  ['Will the ceremony be streamed?', 'Yes. We’ll share a live stream link a week before for anyone who can’t make it home.'],
];
$('#faqList').innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

/* Reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.timeline li, .ev, .gift, .rsvp__card').forEach(el => { el.classList.add('reveal'); io.observe(el); });

let tt;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('is-on'), 2600); }

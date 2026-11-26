// header: transparent over the hero, solid after it
const header = document.getElementById('header');
if (header && !header.classList.contains('on-light')) {
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.6);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// mobile menu
const toggle = document.getElementById('menuToggle');
if (toggle) {
  const close = () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#gnav a').forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// fade-in on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// works filter
const filter = document.querySelector('.filter');
if (filter) {
  const apply = cat => {
    filter.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
    document.querySelectorAll('.work[data-cat]').forEach(w => { w.hidden = cat !== 'all' && w.dataset.cat !== cat; });
  };
  filter.addEventListener('click', e => { const b = e.target.closest('button'); if (b) apply(b.dataset.cat); });
  const initial = new URLSearchParams(location.search).get('cat');
  if (initial && filter.querySelector(`[data-cat="${initial}"]`)) apply(initial);
}

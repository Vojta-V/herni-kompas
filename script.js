'use strict';
const filters = document.querySelector('.filters');
if (filters) {
  const games = [...document.querySelectorAll('.library-game')];
  const status = document.querySelector('#filter-status');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    games.forEach(game => { game.hidden = selected !== 'all' && game.dataset.style !== selected; });
    status.textContent = `Zobrazené hry: ${games.filter(game => !game.hidden).length} ze ${games.length}.`;
  });
  // A deep link always exposes its target, including after a filter was used.
  window.addEventListener('hashchange', () => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target && games.includes(target) && target.hidden) {
      filters.querySelector('[data-filter="all"]').click();
      target.scrollIntoView();
    }
  });
}

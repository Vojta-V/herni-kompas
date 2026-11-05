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

const moodForm = document.querySelector('#mood-form');
if (moodForm) {
  const choices = {
    minecraft: {name: 'Minecraft', text: 'Tvůj směr je tvoření. Podívej se, jak Minecraft spojuje stavění s průzkumem světa.', image: 'staveni.svg'},
    stardew: {name: 'Stardew Valley', text: 'Tvůj směr je vlastní tempo. Seznam se s farmařením, rybařením a životem v městečku.', image: 'farma.svg'},
    hollow: {name: 'Hollow Knight', text: 'Tvůj směr je objevování. Čeká propojený svět, nové schopnosti a náročnější souboje.', image: 'jeskyne.svg'}
  };
  moodForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = new FormData(moodForm).get('mood');
    const choice = choices[value];
    if (!choice) return;
    const result = document.querySelector('#mood-result');
    // Only values from the fixed choices above are inserted.
    result.innerHTML = `<img src="${choice.image}" alt="Ilustrace vybraného herního směru" width="800" height="600"><div><p class="eyebrow">KOMPAS UKAZUJE NA</p><h2>${choice.name}</h2><p>${choice.text}</p><a class="text-link" href="hry.html#${value}">Prohlédnout hru v knihovně →</a></div>`;
    result.hidden = false;
  });
}

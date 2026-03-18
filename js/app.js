import { detectInitialLocale, getVoterKey, setLocale, storageKeys, uiText } from './i18n.js';
import { containsBlockedContent, normalizeText } from './moderation.js';
import { createSupabase, fetchFlags, insertFlag, castVote } from './supabase.js';
import { renderCookieBanner, renderHome, renderSiteShell, renderStaticPage } from './ui.js';

const page = document.body.dataset.page || 'home';
const state = {
  locale: detectInitialLocale(),
  client: null,
  flags: [],
  filterType: 'all',
  filterLanguage: 'all',
  sortMode: 'trending',
  query: '',
  visibleCount: 18,
  syncMode: 'fallback'
};

const demoFlags = [
  { id: 'demo-1', text: 'They listen without turning everything back to themselves.', slug: 'listen-without-centering-themselves', type: 'green', language: 'en', votes: 31, upvotes: 34, downvotes: 3, created_at: new Date(Date.now() - 3600e3).toISOString() },
  { id: 'demo-2', text: 'Il ou elle respecte ton temps et annonce les changements tôt.', slug: 'respecte-ton-temps', type: 'green', language: 'fr', votes: 18, upvotes: 20, downvotes: 2, created_at: new Date(Date.now() - 7200e3).toISOString() },
  { id: 'demo-3', text: 'They disappear, then come back only when it benefits them.', slug: 'disappear-when-convenient', type: 'red', language: 'en', votes: 24, upvotes: 26, downvotes: 2, created_at: new Date(Date.now() - 1800e3).toISOString() },
  { id: 'demo-4', text: 'Il ou elle rabaisse toujours les autres pour paraître supérieur.', slug: 'rabaisse-les-autres', type: 'red', language: 'fr', votes: 16, upvotes: 17, downvotes: 1, created_at: new Date(Date.now() - 5400e3).toISOString() }
];

boot();

async function boot() {
  document.documentElement.lang = state.locale;
  document.querySelector('#site').innerHTML = renderSiteShell(page, state.locale);
  bindShellEvents();
  if (page === 'home') {
    renderHomePage();
    await initDynamicContent();
  } else {
    document.querySelector('#main').innerHTML = renderStaticPage(page, state.locale);
  }
  renderConsentBanner();
}

function renderHomePage() {
  document.querySelector('#main').innerHTML = renderHome(state.locale, renderStats([]));
  document.querySelector('#flag-text')?.addEventListener('input', (event) => {
    document.querySelector('#text-count').textContent = `${event.target.value.trim().length} / 140`;
  });
  document.querySelector('#flag-form')?.addEventListener('submit', submitFlagHandler);
  document.querySelector('#random-flag')?.addEventListener('click', scrollToRandomFlag);
  document.querySelector('#search-input')?.addEventListener('input', (event) => {
    state.query = event.target.value.trim();
    state.visibleCount = 18;
    renderFlagViews();
  });
  document.querySelector('#type-filter')?.addEventListener('click', handleTypeFilter);
  document.querySelector('#sort-filter')?.addEventListener('click', handleSortFilter);
  document.querySelector('#language-filter')?.addEventListener('change', (event) => {
    state.filterLanguage = event.target.value;
    state.visibleCount = 18;
    renderFlagViews();
  });
  document.querySelector('#feed')?.addEventListener('click', handleFeedClick);
}

async function initDynamicContent() {
  state.client = createSupabase();
  await reloadFlags();
  if (state.client) {
    subscribeRealtime();
    setInterval(reloadFlags, 45000);
  }
}

async function reloadFlags() {
  try {
    state.flags = state.client ? await fetchFlags(state.client) : demoFlags;
    renderFlagViews();
    showFormMessage(state.client ? '' : uiText[state.locale].configWarning, !state.client);
  } catch (error) {
    console.error(error);
    state.flags = demoFlags;
    renderFlagViews();
    showFormMessage(uiText[state.locale].genericError, true);
  }
}

function subscribeRealtime() {
  state.client
    .channel('public-flags')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'flags' }, reloadFlags)
    .subscribe((status) => {
      state.syncMode = status === 'SUBSCRIBED' ? 'live' : 'fallback';
      const label = document.querySelector('#sync-status');
      if (label) label.textContent = status === 'SUBSCRIBED' ? uiText[state.locale].statusLive : uiText[state.locale].statusFallback;
    });
}

function bindShellEvents() {
  document.addEventListener('click', (event) => {
    const localeButton = event.target.closest('.lang-btn');
    if (localeButton) {
      state.locale = setLocale(localeButton.dataset.locale);
      boot();
      return;
    }
    const consentButton = event.target.closest('[data-consent]');
    if (consentButton) {
      localStorage.setItem(storageKeys.consent, consentButton.dataset.consent);
      renderConsentBanner();
    }
  });
}

function renderConsentBanner() {
  const banner = document.querySelector('#cookie-banner');
  if (!banner) return;
  const consent = localStorage.getItem(storageKeys.consent);
  if (consent) {
    banner.classList.add('hidden');
    return;
  }
  banner.innerHTML = renderCookieBanner(state.locale);
  banner.classList.remove('hidden');
}

function renderFlagViews() {
  const t = uiText[state.locale];
  const flags = getVisibleFlags();
  document.querySelector('#stats-grid').innerHTML = renderStats(state.flags);
  document.querySelector('#top-green-list').innerHTML = renderMiniList(state.flags.filter((flag) => flag.type === 'green').sort(sortTop).slice(0, 5));
  document.querySelector('#top-red-list').innerHTML = renderMiniList(state.flags.filter((flag) => flag.type === 'red').sort(sortTop).slice(0, 5));
  document.querySelector('#trending-list').innerHTML = renderMiniList([...state.flags].sort(sortTrending).slice(0, 5));
  document.querySelector('#latest-list').innerHTML = renderMiniList([...state.flags].sort(sortNew).slice(0, 5));

  const feed = document.querySelector('#feed');
  const controls = document.querySelector('#feed-controls');
  if (!flags.length) {
    feed.innerHTML = `<div class="card-surface empty-state">${t.empty}</div>`;
    controls.innerHTML = '';
    return;
  }
  const slice = flags.slice(0, state.visibleCount);
  feed.innerHTML = slice.map(renderCard).join('');
  controls.innerHTML = state.visibleCount < flags.length ? `<button id="load-more" class="button secondary">${t.loadMore}</button>` : `<p class="feed-end">${t.endReached}</p>`;
  document.querySelector('#load-more')?.addEventListener('click', () => {
    state.visibleCount += 18;
    renderFlagViews();
  });
}

function renderStats(flags) {
  const t = uiText[state.locale];
  const today = flags.filter((flag) => Date.now() - new Date(flag.created_at).getTime() < 86400000).length;
  const totalVotes = flags.reduce((sum, flag) => sum + Number(flag.upvotes || 0) + Number(flag.downvotes || 0), 0);
  return `
    <article><strong>${flags.length}</strong><span>${t.statsFlags}</span></article>
    <article><strong>${totalVotes}</strong><span>${t.statsVotes}</span></article>
    <article><strong>${today}</strong><span>${t.statsToday}</span></article>
  `;
}

function renderMiniList(items) {
  return items.map((item) => `<div class="mini-item"><span>${escapeHtml(item.text)}</span><strong>${item.votes}</strong></div>`).join('');
}

function renderCard(flag) {
  const t = uiText[state.locale];
  return `
    <article class="card-surface flag-card" id="flag-${flag.id}">
      <div class="flag-head">
        <div class="badges"><span class="badge ${flag.type}">${flag.type === 'green' ? t.typeGreen : t.typeRed}</span><span class="badge neutral">${flag.language.toUpperCase()}</span></div>
        <div class="card-actions"><button class="text-btn" data-copy="${flag.id}">${t.copy}</button><button class="text-btn" data-share="${flag.id}">${t.share}</button></div>
      </div>
      <h3>${escapeHtml(flag.text)}</h3>
      <p class="meta">${timeAgo(flag.created_at, state.locale)} · ${t.score}: ${flag.votes} · ${t.upvotes}: ${flag.upvotes || 0} · ${t.downvotes}: ${flag.downvotes || 0}</p>
      <div class="vote-row">
        <button class="button vote positive" data-vote="up" data-id="${flag.id}">▲ ${t.voteUp}</button>
        <button class="button vote negative" data-vote="down" data-id="${flag.id}">▼ ${t.voteDown}</button>
      </div>
    </article>
  `;
}

async function submitFlagHandler(event) {
  event.preventDefault();
  const t = uiText[state.locale];
  const text = document.querySelector('#flag-text').value.trim().replace(/\s+/g, ' ');
  const type = document.querySelector('#flag-type').value;
  const selectedLanguage = document.querySelector('#flag-language').value;
  const language = selectedLanguage === 'auto' ? detectLanguage(text) : selectedLanguage;

  if (text.length < 8) return showFormMessage(t.shortError, true);
  if (text.length > 140) return showFormMessage(t.longError, true);
  if (containsBlockedContent(text)) return showFormMessage(t.blockedSubmit, true);
  if (state.flags.some((flag) => normalizeText(flag.text) === normalizeText(text))) return showFormMessage(t.duplicateSubmit, true);
  if (!state.client) return showFormMessage(t.configWarning, true);

  const payload = {
    text,
    slug: slugify(text),
    type: type === 'red' ? 'red' : 'green',
    language: language === 'fr' ? 'fr' : 'en',
    status: 'approved'
  };

  try {
    await insertFlag(state.client, payload);
    event.target.reset();
    document.querySelector('#text-count').textContent = '0 / 140';
    showFormMessage(t.successSubmit, false);
    await reloadFlags();
  } catch (error) {
    console.error(error);
    showFormMessage(t.genericError, true);
  }
}

async function handleFeedClick(event) {
  const voteButton = event.target.closest('[data-vote]');
  if (voteButton) {
    const voteType = voteButton.dataset.vote;
    if (!state.client) return showToast(uiText[state.locale].configWarning);
    try {
      await castVote(state.client, voteButton.dataset.id, getVoterKey(), voteType);
      showToast(uiText[state.locale].voteSaved);
      await reloadFlags();
    } catch (error) {
      console.error(error);
      showToast(uiText[state.locale].genericError);
    }
    return;
  }

  const copyButton = event.target.closest('[data-copy]');
  if (copyButton) {
    const flag = state.flags.find((item) => item.id === copyButton.dataset.copy);
    if (!flag) return;
    await navigator.clipboard.writeText(flag.text);
    showToast(uiText[state.locale].copySaved);
    return;
  }

  const shareButton = event.target.closest('[data-share]');
  if (shareButton) {
    const url = `${location.origin}${location.pathname}#flag-${shareButton.dataset.share}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: uiText[state.locale].brand, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast(uiText[state.locale].shareSaved);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function handleTypeFilter(event) {
  const button = event.target.closest('[data-type]');
  if (!button) return;
  state.filterType = button.dataset.type;
  document.querySelectorAll('#type-filter button').forEach((item) => item.classList.toggle('active', item === button));
  renderFlagViews();
}

function handleSortFilter(event) {
  const button = event.target.closest('[data-sort]');
  if (!button) return;
  state.sortMode = button.dataset.sort;
  document.querySelectorAll('#sort-filter button').forEach((item) => item.classList.toggle('active', item === button));
  renderFlagViews();
}

function getVisibleFlags() {
  return [...state.flags]
    .filter((flag) => state.filterType === 'all' || flag.type === state.filterType)
    .filter((flag) => state.filterLanguage === 'all' || flag.language === state.filterLanguage)
    .filter((flag) => !state.query || normalizeText(flag.text).includes(normalizeText(state.query)))
    .sort(state.sortMode === 'top' ? sortTop : state.sortMode === 'new' ? sortNew : sortTrending);
}

function sortTop(a, b) { return Number(b.votes || 0) - Number(a.votes || 0); }
function sortNew(a, b) { return new Date(b.created_at) - new Date(a.created_at); }
function sortTrending(a, b) { return trendingValue(b) - trendingValue(a); }
function trendingValue(flag) {
  const ageHours = Math.max(1, (Date.now() - new Date(flag.created_at).getTime()) / 36e5);
  return Number(flag.upvotes || 0) * 3 - Number(flag.downvotes || 0) * 1.5 + 36 / ageHours;
}

function detectLanguage(value) {
  const normalized = ` ${normalizeText(value)} `;
  const frenchSignals = [' le ', ' la ', ' les ', ' un ', ' une ', ' des ', ' avec ', ' pour ', ' pas ', ' mais ', ' quand ', ' parce ', ' ton ', ' ta ', ' tes ', ' vous ', ' il ', ' elle '];
  return frenchSignals.some((token) => normalized.includes(token)) ? 'fr' : 'en';
}

function scrollToRandomFlag() {
  const visible = getVisibleFlags();
  if (!visible.length) return;
  const pick = visible[Math.floor(Math.random() * visible.length)];
  document.querySelector(`#flag-${CSS.escape(pick.id)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showFormMessage(message, isError) {
  const box = document.querySelector('#form-message');
  if (!box) return;
  if (!message) {
    box.className = 'inline-message hidden';
    box.textContent = '';
    return;
  }
  box.className = `inline-message ${isError ? 'error' : 'success'}`;
  box.textContent = message;
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), 2500);
}

function slugify(value) {
  return normalizeText(value).replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80);
}

function timeAgo(date, locale) {
  const diff = new Date(date).getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  const hours = Math.round(diff / 3600000);
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  return rtf.format(Math.round(diff / 86400000), 'day');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const MAX_LENGTH = 120;
const STORAGE_KEYS = {
  locale: 'redgreen_locale',
  votes: 'redgreen_votes',
  userId: 'redgreen_user_id'
};

const translations = {
  en: {
    appName: 'RedGreen Flags',
    appTagline: 'Vote on red flags and green flags in seconds.',
    heroTitle: 'Fast, bilingual, endlessly scrollable flag voting.',
    heroBody: 'Built for GitHub Pages, powered by Supabase, and optimized for short user-generated posts, live updates, moderation, and mobile-first browsing.',
    heroBullets: ['Submit short flags up to 120 characters.', 'One local vote per user per flag.', 'Automatic English/French detection + filtering.'],
    addFlag: 'Add a new flag',
    sentence: 'Sentence',
    sentencePlaceholder: 'Example: They ask how your day was and actually listen.',
    type: 'Type',
    green: 'Green Flag',
    red: 'Red Flag',
    language: 'Language',
    auto: 'Auto detect',
    submit: 'Submit flag',
    recent: 'Recent',
    top: 'Top votes',
    trending: 'Trending',
    all: 'All',
    topGreen: 'Top Green Flags',
    topRed: 'Top Red Flags',
    liveFeed: 'Live feed',
    feedBody: 'Realtime submissions and votes update here.',
    random: 'Random flag',
    share: 'Share',
    upvote: 'Upvote',
    downvote: 'Downvote',
    votes: 'votes',
    loading: 'Loading flags…',
    empty: 'No flags yet. Be the first to post one.',
    filtersLabel: 'Browse',
    moderationTitle: 'Moderation rules',
    moderationBody: 'Insults, sexual terms, and offensive content in English or French are blocked before submission.',
    trendsTitle: 'Trending now',
    formSuccess: 'Your flag was submitted successfully.',
    formNeedsSetup: 'Connect Supabase to persist data and realtime sync.',
    badWordError: 'Submission rejected: offensive or sexual language detected.',
    shortError: 'Please write at least 8 characters.',
    longError: 'Please keep it under 120 characters.',
    duplicateError: 'This sentence already exists.',
    genericError: 'Something went wrong. Please try again.',
    voteSaved: 'Vote saved.',
    voteExists: 'You already voted on this flag.',
    setupCta: 'Setup guide in README',
    statsLive: 'live flags',
    statsToday: 'new today',
    statsVotes: 'total score',
    detectionAuto: 'Auto',
    detectionEn: 'English',
    detectionFr: 'French'
  },
  fr: {
    appName: 'RedGreen Flags',
    appTagline: 'Votez sur les green flags et red flags en quelques secondes.',
    heroTitle: 'Une app bilingue, rapide et conçue pour le scroll.',
    heroBody: 'Compatible GitHub Pages, connectée à Supabase, et pensée pour les contenus courts, le temps réel, la modération et le mobile-first.',
    heroBullets: ['Publiez des phrases courtes jusqu’à 120 caractères.', 'Un vote local maximum par utilisateur et par flag.', 'Détection automatique anglais/français + filtrage.'],
    addFlag: 'Ajouter un flag',
    sentence: 'Phrase',
    sentencePlaceholder: 'Exemple : Ils demandent comment s’est passée ta journée et écoutent vraiment.',
    type: 'Type',
    green: 'Green Flag',
    red: 'Red Flag',
    language: 'Langue',
    auto: 'Détection auto',
    submit: 'Publier le flag',
    recent: 'Récents',
    top: 'Top votes',
    trending: 'Tendance',
    all: 'Tous',
    topGreen: 'Top Green Flags',
    topRed: 'Top Red Flags',
    liveFeed: 'Flux en direct',
    feedBody: 'Les nouvelles publications et les votes se mettent à jour ici.',
    random: 'Flag aléatoire',
    share: 'Partager',
    upvote: 'Vote +',
    downvote: 'Vote -',
    votes: 'votes',
    loading: 'Chargement des flags…',
    empty: 'Aucun flag pour le moment. Soyez le premier.',
    filtersLabel: 'Parcourir',
    moderationTitle: 'Règles de modération',
    moderationBody: 'Les insultes, termes sexuels et contenus offensants en anglais ou en français sont bloqués avant publication.',
    trendsTitle: 'Tendances',
    formSuccess: 'Votre flag a bien été publié.',
    formNeedsSetup: 'Connectez Supabase pour la persistance et le temps réel.',
    badWordError: 'Publication refusée : langage offensant ou sexuel détecté.',
    shortError: 'Merci d’écrire au moins 8 caractères.',
    longError: 'Merci de rester sous 120 caractères.',
    duplicateError: 'Cette phrase existe déjà.',
    genericError: 'Une erreur est survenue. Merci de réessayer.',
    voteSaved: 'Vote enregistré.',
    voteExists: 'Vous avez déjà voté pour ce flag.',
    setupCta: 'Guide dans le README',
    statsLive: 'flags en ligne',
    statsToday: 'nouveaux aujourd’hui',
    statsVotes: 'score total',
    detectionAuto: 'Auto',
    detectionEn: 'Anglais',
    detectionFr: 'Français'
  }
};

const sampleFlags = [
  { id: 'demo-1', text: 'They celebrate your wins without making it about themselves.', type: 'green', language: 'en', votes: 18, created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
  { id: 'demo-2', text: 'Ils lisent vos messages mais ne répondent que quand ils ont besoin de quelque chose.', type: 'red', language: 'fr', votes: 14, created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 'demo-3', text: 'They respect your boundaries the first time you say them.', type: 'green', language: 'en', votes: 27, created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
  { id: 'demo-4', text: 'Il critique vos amis à chaque sortie pour vous isoler.', type: 'red', language: 'fr', votes: 22, created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() }
];

const badWords = {
  en: ['fuck', 'fucking', 'bitch', 'bastard', 'slut', 'whore', 'asshole', 'dick', 'cock', 'pussy', 'cum', 'rape', 'rapist', 'nigger', 'retard'],
  fr: ['pute', 'salope', 'encule', 'enculé', 'connard', 'connasse', 'bite', 'chatte', 'sexe', 'baiser', 'nique', 'niquer', 'viol', 'violeur', 'pd']
};

const state = {
  locale: detectInitialLocale(),
  filterType: 'all',
  sortMode: 'trending',
  flags: [],
  supabase: null,
  realtimeEnabled: false,
  setupReady: false,
  busy: false
};

const app = document.querySelector('#app');
renderShell();
bootstrap();

async function bootstrap() {
  setLanguage(state.locale);
  initSupabase();
  bindStaticEvents();
  await loadFlags();
  subscribeRealtime();
}

function initSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  state.supabase = createClient(url, key, { auth: { persistSession: false } });
  state.setupReady = true;
}

async function loadFlags() {
  renderStatus(text('loading'));
  if (!state.supabase) {
    state.flags = [...sampleFlags];
    renderAll();
    renderStatus(text('formNeedsSetup'), 'success');
    return;
  }

  const { data, error } = await state.supabase
    .from('flags')
    .select('id, text, type, language, votes, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    console.error(error);
    state.flags = [...sampleFlags];
    renderAll();
    renderStatus(text('genericError'), 'error');
    return;
  }

  state.flags = data ?? [];
  renderAll();
}

function subscribeRealtime() {
  if (!state.supabase) return;
  state.supabase
    .channel('flags-feed')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'flags' }, () => loadFlags())
    .subscribe((status) => {
      state.realtimeEnabled = status === 'SUBSCRIBED';
      renderMeta();
    });
}

function bindStaticEvents() {
  app.addEventListener('click', async (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;

    if (action === 'set-locale') {
      setLanguage(target.dataset.locale);
    }
    if (action === 'set-type') {
      state.filterType = target.dataset.type;
      renderAll();
    }
    if (action === 'set-sort') {
      state.sortMode = target.dataset.sort;
      renderAll();
    }
    if (action === 'random-flag') {
      focusRandomFlag();
    }
    if (action === 'share-flag') {
      await shareFlag(target.dataset.id);
    }
    if (action === 'vote') {
      await handleVote(target.dataset.id, Number(target.dataset.delta));
    }
  });

  app.addEventListener('submit', async (event) => {
    if (!(event.target instanceof HTMLFormElement) || event.target.id !== 'flag-form') return;
    event.preventDefault();
    await submitFlag(event.target);
  });
}

function renderShell() {
  app.innerHTML = `
    <header class="header">
      <div class="header-inner">
        <a class="brand" href="#top">
          <div class="brand-mark">RG</div>
          <div class="brand-copy"><strong></strong><span></span></div>
        </a>
        <div class="header-actions">
          <div class="segmented" id="locale-switcher">
            <button class="lang-btn" data-action="set-locale" data-locale="en">EN</button>
            <button class="lang-btn" data-action="set-locale" data-locale="fr">FR</button>
          </div>
          <button class="btn secondary" data-action="random-flag"></button>
        </div>
      </div>
    </header>
    <main id="main" class="app-shell">
      <section class="hero">
        <article class="hero-panel">
          <span class="kicker"><span class="dot"></span><span id="hero-kicker"></span></span>
          <h1 id="hero-title"></h1>
          <p id="hero-body"></p>
          <ul class="hero-list" id="hero-list"></ul>
          <div class="stats" id="stats"></div>
        </article>
        <aside class="hero-side">
          <section class="story">
            <div class="section-head"><h2 id="live-title"></h2><span class="pill" id="live-pill"></span></div>
            <p class="muted" id="live-body"></p>
            <div class="story-list" id="top-lists"></div>
          </section>
          <section class="story">
            <h2 id="moderation-title"></h2>
            <p id="moderation-body" class="muted"></p>
            <p class="help">Supabase + GitHub Pages friendly. No custom server required.</p>
          </section>
        </aside>
      </section>

      <section class="toolbar">
        <div class="filters">
          <div class="filter-group">
            <strong id="browse-label"></strong>
            <div class="segmented" id="type-filters">
              <button data-action="set-type" data-type="all"></button>
              <button data-action="set-type" data-type="green"></button>
              <button data-action="set-type" data-type="red"></button>
            </div>
          </div>
          <div class="filter-group">
            <div class="segmented" id="sort-filters">
              <button class="sort-btn" data-action="set-sort" data-sort="trending"></button>
              <button class="sort-btn" data-action="set-sort" data-sort="top"></button>
              <button class="sort-btn" data-action="set-sort" data-sort="recent"></button>
            </div>
          </div>
        </div>
      </section>

      <section class="grid">
        <section>
          <div class="feed" id="feed"></div>
        </section>
        <aside class="panel">
          <div>
            <h2 id="form-title"></h2>
            <p class="muted" id="form-subtitle"></p>
          </div>
          <form id="flag-form">
            <div class="form-row">
              <button type="button" class="btn green" data-type-value="green"></button>
              <button type="button" class="btn red" data-type-value="red"></button>
            </div>
            <input type="hidden" name="type" value="green" />
            <label>
              <span class="help" id="sentence-label"></span>
              <textarea class="textarea" name="text" maxlength="120" required></textarea>
            </label>
            <div class="form-row">
              <label style="flex:1; min-width: 180px;">
                <span class="help" id="language-label"></span>
                <select class="select" name="language">
                  <option value="auto"></option>
                  <option value="en"></option>
                  <option value="fr"></option>
                </select>
              </label>
              <div style="display:grid; align-content:end; flex:1; min-width:180px;">
                <span class="counter" id="counter">0 / 120</span>
              </div>
            </div>
            <button class="btn" id="submit-btn" type="submit"></button>
          </form>
          <div id="form-alert" class="inline-alert hide"></div>
          <a class="help" href="./README.md" target="_blank" rel="noreferrer" id="setup-link"></a>
        </aside>
      </section>

      <footer class="footer-inner">
        <div class="story">
          <strong>SEO + static deployment ready</strong>
          <p class="footer-note">This app renders meaningful HTML, ships static assets only, and works on GitHub Pages with Supabase as the external backend.</p>
        </div>
      </footer>
    </main>
    <div id="toast" class="toast hide"></div>
  `;

  const form = app.querySelector('#flag-form');
  const textarea = form.querySelector('textarea[name="text"]');
  const typeButtons = [...form.querySelectorAll('[data-type-value]')];
  textarea.addEventListener('input', () => {
    app.querySelector('#counter').textContent = `${textarea.value.length} / ${MAX_LENGTH}`;
  });
  typeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      form.type.value = button.dataset.typeValue;
      typeButtons.forEach((btn) => btn.classList.toggle('secondary', btn !== button));
    });
  });
}

function renderAll() {
  renderCopy();
  renderMeta();
  renderFeed();
  renderStories();
}

function renderCopy() {
  document.documentElement.lang = state.locale;
  const copy = translations[state.locale];
  app.querySelector('.brand-copy strong').textContent = copy.appName;
  app.querySelector('.brand-copy span').textContent = copy.appTagline;
  app.querySelector('[data-action="random-flag"]').textContent = copy.random;
  app.querySelector('#hero-kicker').textContent = state.realtimeEnabled ? 'Realtime on' : 'Static frontend';
  app.querySelector('#hero-title').textContent = copy.heroTitle;
  app.querySelector('#hero-body').textContent = copy.heroBody;
  app.querySelector('#hero-list').innerHTML = copy.heroBullets.map((item) => `<li>${item}</li>`).join('');
  app.querySelector('#live-title').textContent = copy.liveFeed;
  app.querySelector('#live-body').textContent = copy.feedBody;
  app.querySelector('#browse-label').textContent = copy.filtersLabel;
  app.querySelector('#moderation-title').textContent = copy.moderationTitle;
  app.querySelector('#moderation-body').textContent = copy.moderationBody;
  app.querySelector('#form-title').textContent = copy.addFlag;
  app.querySelector('#form-subtitle').textContent = copy.heroBullets[0];
  app.querySelector('#sentence-label').textContent = copy.sentence;
  app.querySelector('textarea[name="text"]').placeholder = copy.sentencePlaceholder;
  app.querySelector('#language-label').textContent = copy.language;
  app.querySelector('#submit-btn').textContent = copy.submit;
  app.querySelector('#setup-link').textContent = copy.setupCta;
  app.querySelector('#type-filters [data-type="all"]').textContent = copy.all;
  app.querySelector('#type-filters [data-type="green"]').textContent = copy.green;
  app.querySelector('#type-filters [data-type="red"]').textContent = copy.red;
  app.querySelector('#sort-filters [data-sort="trending"]').textContent = copy.trending;
  app.querySelector('#sort-filters [data-sort="top"]').textContent = copy.top;
  app.querySelector('#sort-filters [data-sort="recent"]').textContent = copy.recent;
  app.querySelector('button[data-type-value="green"]').textContent = copy.green;
  app.querySelector('button[data-type-value="red"]').textContent = copy.red;
  app.querySelector('select[name="language"] option[value="auto"]').textContent = copy.detectionAuto;
  app.querySelector('select[name="language"] option[value="en"]').textContent = copy.detectionEn;
  app.querySelector('select[name="language"] option[value="fr"]').textContent = copy.detectionFr;
  [...app.querySelectorAll('.lang-btn')].forEach((button) => button.classList.toggle('active', button.dataset.locale === state.locale));
  [...app.querySelectorAll('#type-filters button')].forEach((button) => button.classList.toggle('active', button.dataset.type === state.filterType));
  [...app.querySelectorAll('#sort-filters button')].forEach((button) => button.classList.toggle('active', button.dataset.sort === state.sortMode));
}

function renderMeta() {
  const liveFlags = state.flags.length;
  const todayCount = state.flags.filter((flag) => Date.now() - new Date(flag.created_at).getTime() < 86400000).length;
  const totalVotes = state.flags.reduce((sum, flag) => sum + (flag.votes ?? 0), 0);
  const copy = translations[state.locale];
  app.querySelector('#live-pill').textContent = state.realtimeEnabled ? 'Realtime' : 'Demo / setup mode';
  app.querySelector('#stats').innerHTML = `
    <div class="stat"><strong>${liveFlags}</strong><span>${copy.statsLive}</span></div>
    <div class="stat"><strong>${todayCount}</strong><span>${copy.statsToday}</span></div>
    <div class="stat"><strong>${totalVotes}</strong><span>${copy.statsVotes}</span></div>
  `;
}

function renderStories() {
  const copy = translations[state.locale];
  const greenTop = state.flags.filter((flag) => flag.type === 'green').sort(sorters.top).slice(0, 3);
  const redTop = state.flags.filter((flag) => flag.type === 'red').sort(sorters.top).slice(0, 3);
  app.querySelector('#top-lists').innerHTML = `
    <div class="story-item">
      <strong>${copy.topGreen}</strong>
      ${greenTop.length ? greenTop.map((flag) => `<div>${escapeHtml(flag.text)} · ${flag.votes}</div>`).join('') : `<div>${copy.empty}</div>`}
    </div>
    <div class="story-item">
      <strong>${copy.topRed}</strong>
      ${redTop.length ? redTop.map((flag) => `<div>${escapeHtml(flag.text)} · ${flag.votes}</div>`).join('') : `<div>${copy.empty}</div>`}
    </div>
  `;
}

function renderFeed() {
  const copy = translations[state.locale];
  const feed = app.querySelector('#feed');
  const items = getVisibleFlags();
  if (!items.length) {
    feed.innerHTML = `<div class="empty">${copy.empty}</div>`;
    return;
  }
  feed.innerHTML = items.map((flag) => renderCard(flag, copy)).join('');
}

function renderCard(flag, copy) {
  const voteState = getVotes();
  const userVote = voteState[flag.id] ?? 0;
  const shareUrl = `${location.origin}${location.pathname}#flag-${flag.id}`;
  const percent = Math.max(8, Math.min(100, 50 + (flag.votes || 0) * 4));
  return `
    <article class="card" id="flag-${flag.id}" data-type="${flag.type}">
      <div class="card-head">
        <div>
          <span class="badge ${flag.type}">${flag.type === 'green' ? copy.green : copy.red}</span>
          <span class="badge language">${flag.language.toUpperCase()}</span>
        </div>
        <button class="icon-btn" data-action="share-flag" data-id="${flag.id}" aria-label="${copy.share}">${copy.share}</button>
      </div>
      <h3>${escapeHtml(flag.text)}</h3>
      <div class="card-meta">
        <span>${timeAgo(flag.created_at, state.locale)}</span>
        <span>•</span>
        <span>${flag.votes} ${copy.votes}</span>
        <span>•</span>
        <span>${shareUrl}</span>
      </div>
      <div class="vote-row">
        <div class="vote-meter" aria-hidden="true"><span class="fill ${flag.type}" style="width:${percent}%"></span></div>
        <div class="vote-actions">
          <button class="vote-btn ${userVote === 1 ? 'active up' : ''}" data-action="vote" data-id="${flag.id}" data-delta="1">👍 ${copy.upvote}</button>
          <button class="vote-btn ${userVote === -1 ? 'active down' : ''}" data-action="vote" data-id="${flag.id}" data-delta="-1">👎 ${copy.downvote}</button>
        </div>
      </div>
    </article>
  `;
}

async function submitFlag(form) {
  if (state.busy) return;
  const formData = new FormData(form);
  const textValue = String(formData.get('text') || '').trim();
  const type = String(formData.get('type') || 'green');
  const forcedLanguage = String(formData.get('language') || 'auto');
  const language = forcedLanguage === 'auto' ? detectLanguage(textValue) : forcedLanguage;

  if (textValue.length < 8) return renderStatus(text('shortError'), 'error');
  if (textValue.length > MAX_LENGTH) return renderStatus(text('longError'), 'error');
  if (containsBadWords(textValue)) return renderStatus(text('badWordError'), 'error');
  if (state.flags.some((flag) => flag.text.toLowerCase() === textValue.toLowerCase())) return renderStatus(text('duplicateError'), 'error');

  state.busy = true;
  const payload = { text: textValue, type, language, votes: 0 };

  try {
    if (!state.supabase) {
      state.flags.unshift({ ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() });
      form.reset();
      form.type.value = 'green';
      app.querySelector('#counter').textContent = '0 / 120';
      renderAll();
      renderStatus(text('formNeedsSetup'), 'success');
      return;
    }

    const { error } = await state.supabase.from('flags').insert(payload);
    if (error) throw error;
    form.reset();
    form.type.value = 'green';
    app.querySelector('#counter').textContent = '0 / 120';
    renderStatus(text('formSuccess'), 'success');
    await loadFlags();
  } catch (error) {
    console.error(error);
    renderStatus(text('genericError'), 'error');
  } finally {
    state.busy = false;
  }
}

async function handleVote(id, delta) {
  const votes = getVotes();
  if (votes[id]) {
    showToast(text('voteExists'));
    return;
  }

  const flag = state.flags.find((item) => item.id === id);
  if (!flag) return;

  votes[id] = delta;
  localStorage.setItem(STORAGE_KEYS.votes, JSON.stringify(votes));
  flag.votes += delta;
  renderAll();
  showToast(text('voteSaved'));

  if (!state.supabase || String(id).startsWith('demo-')) return;
  const { error } = await state.supabase.from('flags').update({ votes: flag.votes }).eq('id', id);
  if (error) console.error(error);
}

async function shareFlag(id) {
  const url = `${location.origin}${location.pathname}#flag-${id}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: text('appName'), url });
    } else {
      await navigator.clipboard.writeText(url);
      showToast('Link copied.');
    }
  } catch (error) {
    console.error(error);
  }
}

function focusRandomFlag() {
  const visible = getVisibleFlags();
  if (!visible.length) return;
  const random = visible[Math.floor(Math.random() * visible.length)];
  document.querySelector(`#flag-${CSS.escape(random.id)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getVisibleFlags() {
  return [...state.flags]
    .filter((flag) => state.filterType === 'all' || flag.type === state.filterType)
    .sort(sorters[state.sortMode]);
}

const sorters = {
  recent: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  top: (a, b) => (b.votes || 0) - (a.votes || 0),
  trending: (a, b) => trendingScore(b) - trendingScore(a)
};

function trendingScore(flag) {
  const ageHours = Math.max(1, (Date.now() - new Date(flag.created_at).getTime()) / 36e5);
  return (flag.votes || 0) + 12 / ageHours;
}

function detectLanguage(value) {
  const lower = normalize(value);
  const frenchSignals = [' le ', ' la ', ' les ', ' des ', ' une ', ' un ', ' vous ', ' avec ', ' pas ', ' pour ', ' ils ', ' elles ', ' tu ', ' est ', ' être ', 'ça', 'qui'];
  return frenchSignals.some((token) => lower.includes(token.trim()) || lower.includes(token)) ? 'fr' : 'en';
}

function containsBadWords(value) {
  const normalized = normalize(value);
  return [...badWords.en, ...badWords.fr].some((word) => normalized.includes(normalize(word)));
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function detectInitialLocale() {
  const stored = localStorage.getItem(STORAGE_KEYS.locale);
  if (stored === 'fr' || stored === 'en') return stored;
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function setLanguage(locale) {
  state.locale = locale === 'fr' ? 'fr' : 'en';
  localStorage.setItem(STORAGE_KEYS.locale, state.locale);
  renderAll();
}

function getVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.votes) || '{}');
  } catch {
    return {};
  }
}

function renderStatus(message, type = 'error') {
  const alert = app.querySelector('#form-alert');
  alert.textContent = message;
  alert.className = `inline-alert ${type}`;
}

function showToast(message) {
  const toast = app.querySelector('#toast');
  toast.textContent = message;
  toast.classList.remove('hide');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hide'), 2200);
}

function text(key) {
  return translations[state.locale][key];
}

function timeAgo(dateString, locale) {
  const diff = Date.now() - new Date(dateString).getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const mins = Math.round(diff / 60000);
  if (mins < 60) return rtf.format(-mins, 'minute');
  const hours = Math.round(mins / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  const days = Math.round(hours / 24);
  return rtf.format(-days, 'day');
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

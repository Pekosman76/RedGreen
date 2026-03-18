import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const MAX_LENGTH = 120;
const MIN_LENGTH = 8;
const PAGE_SIZE = 12;
const DEMO_PREFIX = 'demo-';
const STORAGE_KEYS = {
  locale: 'redgreen_locale',
  votes: 'redgreen_votes',
  sessionId: 'redgreen_session_id'
};

const translations = {
  en: {
    appName: 'RedGreen Flags',
    appTagline: 'Post, vote, and discover the most viral green and red flags.',
    heroTitle: 'The realtime red flag / green flag app built for viral takes.',
    heroBody:
      'Pure HTML, CSS, and vanilla JavaScript on GitHub Pages. Supabase handles storage and realtime events. No custom server required.',
    heroBullets: [
      'User-generated content with 120-character validation.',
      'One local vote per user per flag to reduce spam.',
      'Automatic French / English detection with bad-word filtering.'
    ],
    liveFeed: 'Live feed',
    liveReady: 'Realtime connected',
    liveDemo: 'Demo mode',
    liveBody: 'New flags and vote changes appear instantly when Supabase realtime is enabled.',
    moderationTitle: 'Moderation guardrails',
    moderationBody: 'Submissions are blocked if they contain insults, offensive terms, or sexual content in English or French.',
    addFlag: 'Add a flag',
    addSubtitle: 'Keep it short, clear, and safe for public sharing.',
    sentence: 'Flag text',
    sentencePlaceholder: 'Example: They ask follow-up questions and actually listen.',
    type: 'Type',
    green: 'Green Flag',
    red: 'Red Flag',
    language: 'Language',
    auto: 'Auto detect',
    detectionEn: 'English',
    detectionFr: 'French',
    submit: 'Submit flag',
    submitHint: 'Public posting is anonymous. Don’t share personal data.',
    browseLabel: 'Browse',
    all: 'All',
    trending: 'Trending',
    top: 'Top votes',
    recent: 'Recent',
    topGreen: 'Top Green Flags',
    topRed: 'Top Red Flags',
    random: 'Random flag',
    share: 'Share',
    upvote: 'Upvote',
    downvote: 'Downvote',
    votes: 'votes',
    score: 'score',
    empty: 'No flags yet. Be the first to post one.',
    loadMore: 'Load more',
    endReached: 'You reached the end of the feed.',
    loading: 'Loading flags…',
    setupLink: 'Setup guide',
    formSuccess: 'Your flag was submitted successfully.',
    formDemo: 'Saved locally in demo mode. Add Supabase config for persistence.',
    voteSaved: 'Your vote was saved.',
    voteExists: 'You already voted on this flag.',
    shareCopied: 'Share link copied.',
    badWordError: 'Submission rejected: offensive or sexual language detected.',
    shortError: `Please write at least ${MIN_LENGTH} characters.`,
    longError: `Please keep it under ${MAX_LENGTH} characters.`,
    duplicateError: 'This flag already exists.',
    genericError: 'Something went wrong. Please try again.',
    statsLive: 'live flags',
    statsToday: 'new today',
    statsVotes: 'total score',
    topListEmpty: 'No items yet',
    seoFooter: 'Static frontend, SEO-friendly markup, realtime backend.',
    filterHelp: 'Sort by trending, top score, or newest posts.',
    configWarning: 'Supabase is not configured yet. The app is running with demo data only.'
  },
  fr: {
    appName: 'RedGreen Flags',
    appTagline: 'Publiez, votez et découvrez les green flags et red flags les plus viraux.',
    heroTitle: 'L’app de red flags / green flags en temps réel pensée pour devenir virale.',
    heroBody:
      'Pur HTML, CSS et JavaScript vanilla sur GitHub Pages. Supabase gère les données et le temps réel. Aucun serveur custom nécessaire.',
    heroBullets: [
      'Contenu généré par les utilisateurs avec validation à 120 caractères.',
      'Un vote local maximum par utilisateur et par flag pour limiter le spam.',
      'Détection automatique français / anglais avec filtrage des mots interdits.'
    ],
    liveFeed: 'Flux en direct',
    liveReady: 'Temps réel connecté',
    liveDemo: 'Mode démo',
    liveBody: 'Les nouveaux flags et les votes apparaissent instantanément quand le temps réel Supabase est activé.',
    moderationTitle: 'Garde-fous de modération',
    moderationBody: 'Les publications sont bloquées si elles contiennent des insultes, termes offensants ou contenu sexuel en anglais ou en français.',
    addFlag: 'Ajouter un flag',
    addSubtitle: 'Restez court, clair et sûr pour un partage public.',
    sentence: 'Texte du flag',
    sentencePlaceholder: 'Exemple : Ils posent des questions et écoutent vraiment.',
    type: 'Type',
    green: 'Green Flag',
    red: 'Red Flag',
    language: 'Langue',
    auto: 'Détection auto',
    detectionEn: 'Anglais',
    detectionFr: 'Français',
    submit: 'Publier le flag',
    submitHint: 'La publication publique est anonyme. Ne partagez pas de données personnelles.',
    browseLabel: 'Parcourir',
    all: 'Tous',
    trending: 'Tendance',
    top: 'Top votes',
    recent: 'Récents',
    topGreen: 'Top Green Flags',
    topRed: 'Top Red Flags',
    random: 'Flag aléatoire',
    share: 'Partager',
    upvote: 'Vote +',
    downvote: 'Vote -',
    votes: 'votes',
    score: 'score',
    empty: 'Aucun flag pour le moment. Soyez le premier à publier.',
    loadMore: 'Voir plus',
    endReached: 'Vous êtes arrivé à la fin du flux.',
    loading: 'Chargement des flags…',
    setupLink: 'Guide de configuration',
    formSuccess: 'Votre flag a bien été publié.',
    formDemo: 'Sauvegardé localement en mode démo. Ajoutez la config Supabase pour la persistance.',
    voteSaved: 'Votre vote a été enregistré.',
    voteExists: 'Vous avez déjà voté pour ce flag.',
    shareCopied: 'Lien copié.',
    badWordError: 'Publication refusée : langage offensant ou sexuel détecté.',
    shortError: `Merci d’écrire au moins ${MIN_LENGTH} caractères.`,
    longError: `Merci de rester sous ${MAX_LENGTH} caractères.`,
    duplicateError: 'Ce flag existe déjà.',
    genericError: 'Une erreur est survenue. Merci de réessayer.',
    statsLive: 'flags en ligne',
    statsToday: 'nouveaux aujourd’hui',
    statsVotes: 'score total',
    topListEmpty: 'Aucun élément',
    seoFooter: 'Frontend statique, balisage SEO, backend temps réel.',
    filterHelp: 'Triez par tendance, meilleur score ou nouveautés.',
    configWarning: 'Supabase n’est pas encore configuré. L’application tourne uniquement avec des données démo.'
  }
};

const sampleFlags = [
  {
    id: `${DEMO_PREFIX}1`,
    text: 'They celebrate your wins without making it about themselves.',
    type: 'green',
    language: 'en',
    votes: 18,
    created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString()
  },
  {
    id: `${DEMO_PREFIX}2`,
    text: 'Ils ne répondent que lorsqu’ils ont besoin de quelque chose.',
    type: 'red',
    language: 'fr',
    votes: 14,
    created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString()
  },
  {
    id: `${DEMO_PREFIX}3`,
    text: 'They respect your boundaries the first time you say them.',
    type: 'green',
    language: 'en',
    votes: 26,
    created_at: new Date(Date.now() - 1000 * 60 * 210).toISOString()
  },
  {
    id: `${DEMO_PREFIX}4`,
    text: 'Il critique vos amis à chaque sortie pour vous isoler.',
    type: 'red',
    language: 'fr',
    votes: 22,
    created_at: new Date(Date.now() - 1000 * 60 * 17).toISOString()
  }
];

const blockedPatterns = [
  /\b(fuck|fucking|bitch|bastard|slut|whore|asshole|motherfucker|dick|cock|pussy|cum|rape|rapist|nigger|retard)\b/i,
  /\b(pute|salope|encule|enculé|enculee|enculée|connard|connasse|bite|chatte|sexe|baiser|nique|niquer|viol|violeur|pd)\b/i,
  /\b(porn|porno|nude|nudes|nsfw|xxx|anal|blowjob|branlette|fellation)\b/i
];

const state = {
  locale: detectInitialLocale(),
  flags: [],
  visibleCount: PAGE_SIZE,
  filterType: 'all',
  sortMode: 'trending',
  busy: false,
  realtimeEnabled: false,
  setupReady: false,
  supabase: null,
  channel: null
};

const app = document.querySelector('#app');
renderShell();
bindStaticEvents();
bootstrap();

async function bootstrap() {
  applyLocale(state.locale);
  initSupabase();
  await loadFlags();
  subscribeRealtime();
}

function initSupabase() {
  const config = window.REDGREEN_CONFIG || {};
  const url = typeof config.SUPABASE_URL === 'string' ? config.SUPABASE_URL.trim() : '';
  const key = typeof config.SUPABASE_ANON_KEY === 'string' ? config.SUPABASE_ANON_KEY.trim() : '';

  if (!url || !key) return;

  state.supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  state.setupReady = true;
}

async function loadFlags() {
  renderStatus(t('loading'), 'success');

  if (!state.supabase) {
    state.flags = [...sampleFlags];
    renderAll();
    renderStatus(t('configWarning'), 'error');
    return;
  }

  const { data, error } = await state.supabase
    .from('flags')
    .select('id, text, type, language, votes, created_at')
    .order('created_at', { ascending: false })
    .limit(250);

  if (error) {
    console.error(error);
    state.flags = [...sampleFlags];
    renderAll();
    renderStatus(t('genericError'), 'error');
    return;
  }

  state.flags = Array.isArray(data) ? data : [];
  renderAll();
  renderStatus('', 'success', true);
}

function subscribeRealtime() {
  if (!state.supabase) return;

  state.channel = state.supabase
    .channel('flags-feed')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'flags' }, async () => {
      await loadFlags();
    })
    .subscribe((status) => {
      state.realtimeEnabled = status === 'SUBSCRIBED';
      renderMeta();
    });
}

function bindStaticEvents() {
  app.addEventListener('click', async (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const { action } = target.dataset;

    if (action === 'set-locale') applyLocale(target.dataset.locale);
    if (action === 'set-type') {
      state.filterType = target.dataset.type || 'all';
      state.visibleCount = PAGE_SIZE;
      renderAll();
    }
    if (action === 'set-sort') {
      state.sortMode = target.dataset.sort || 'trending';
      state.visibleCount = PAGE_SIZE;
      renderAll();
    }
    if (action === 'random-flag') focusRandomFlag();
    if (action === 'share-flag') await shareFlag(target.dataset.id);
    if (action === 'vote') await handleVote(target.dataset.id, Number(target.dataset.delta));
    if (action === 'load-more') {
      state.visibleCount += PAGE_SIZE;
      renderFeed();
    }
  });

  app.addEventListener('submit', async (event) => {
    if (!(event.target instanceof HTMLFormElement) || event.target.id !== 'flag-form') return;
    event.preventDefault();
    await submitFlag(event.target);
  });

  const form = app.querySelector('#flag-form');
  const textarea = form.querySelector('textarea[name="text"]');
  const typeButtons = [...form.querySelectorAll('[data-type-value]')];

  textarea.addEventListener('input', () => {
    app.querySelector('#counter').textContent = `${textarea.value.trim().length} / ${MAX_LENGTH}`;
  });

  typeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      form.elements.type.value = button.dataset.typeValue;
      syncTypeButtons();
    });
  });

  const sentinel = app.querySelector('#feed-sentinel');
  if ('IntersectionObserver' in window && sentinel) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && state.visibleCount < getVisibleFlags().length) {
          state.visibleCount += PAGE_SIZE;
          renderFeed();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(sentinel);
  }
}

function renderShell() {
  app.innerHTML = `
    <header class="header">
      <div class="header-inner">
        <a class="brand" href="#top" aria-label="RedGreen Flags home">
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
            <div class="section-head">
              <h2 id="live-title"></h2>
              <span class="pill" id="live-pill"></span>
            </div>
            <p class="muted" id="live-body"></p>
            <div class="story-list" id="top-lists"></div>
          </section>

          <section class="story">
            <h2 id="moderation-title"></h2>
            <p class="muted" id="moderation-body"></p>
            <p class="help" id="filter-help"></p>
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
          <div id="feed-controls" class="feed-controls"></div>
          <div id="feed-sentinel" aria-hidden="true"></div>
        </section>

        <aside class="panel">
          <div>
            <h2 id="form-title"></h2>
            <p class="muted" id="form-subtitle"></p>
          </div>

          <form id="flag-form">
            <div class="form-row">
              <button type="button" class="btn green" data-type-value="green"></button>
              <button type="button" class="btn red secondary" data-type-value="red"></button>
            </div>
            <input type="hidden" name="type" value="green" />

            <label>
              <span class="help" id="sentence-label"></span>
              <textarea class="textarea" name="text" maxlength="120" required></textarea>
            </label>

            <div class="form-row compact">
              <label class="input-wrap grow">
                <span class="help" id="language-label"></span>
                <select class="select" name="language">
                  <option value="auto"></option>
                  <option value="en"></option>
                  <option value="fr"></option>
                </select>
              </label>
              <div class="counter-wrap">
                <span class="counter" id="counter">0 / 120</span>
              </div>
            </div>

            <p class="help" id="submit-hint"></p>
            <button class="btn" id="submit-btn" type="submit"></button>
          </form>

          <div id="form-alert" class="inline-alert hide"></div>
          <a class="help" href="./README.md" target="_blank" rel="noreferrer" id="setup-link"></a>
        </aside>
      </section>

      <footer class="footer-inner">
        <div class="story">
          <strong id="footer-title">SEO + static deployment ready</strong>
          <p class="footer-note" id="footer-note"></p>
        </div>
      </footer>
    </main>

    <div id="toast" class="toast hide"></div>
  `;
}

function renderAll() {
  renderCopy();
  renderMeta();
  renderStories();
  renderFeed();
  syncTypeButtons();
}

function renderCopy() {
  document.documentElement.lang = state.locale;
  const copy = translations[state.locale];

  app.querySelector('.brand-copy strong').textContent = copy.appName;
  app.querySelector('.brand-copy span').textContent = copy.appTagline;
  app.querySelector('[data-action="random-flag"]').textContent = copy.random;
  app.querySelector('#hero-kicker').textContent = state.realtimeEnabled ? copy.liveReady : copy.liveDemo;
  app.querySelector('#hero-title').textContent = copy.heroTitle;
  app.querySelector('#hero-body').textContent = copy.heroBody;
  app.querySelector('#hero-list').innerHTML = copy.heroBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  app.querySelector('#live-title').textContent = copy.liveFeed;
  app.querySelector('#live-body').textContent = copy.liveBody;
  app.querySelector('#moderation-title').textContent = copy.moderationTitle;
  app.querySelector('#moderation-body').textContent = copy.moderationBody;
  app.querySelector('#filter-help').textContent = copy.filterHelp;
  app.querySelector('#browse-label').textContent = copy.browseLabel;
  app.querySelector('#form-title').textContent = copy.addFlag;
  app.querySelector('#form-subtitle').textContent = copy.addSubtitle;
  app.querySelector('#sentence-label').textContent = copy.sentence;
  app.querySelector('textarea[name="text"]').placeholder = copy.sentencePlaceholder;
  app.querySelector('#language-label').textContent = copy.language;
  app.querySelector('#submit-hint').textContent = copy.submitHint;
  app.querySelector('#submit-btn').textContent = copy.submit;
  app.querySelector('#setup-link').textContent = copy.setupLink;
  app.querySelector('#footer-note').textContent = copy.seoFooter;
  app.querySelector('#type-filters [data-type="all"]').textContent = copy.all;
  app.querySelector('#type-filters [data-type="green"]').textContent = copy.green;
  app.querySelector('#type-filters [data-type="red"]').textContent = copy.red;
  app.querySelector('#sort-filters [data-sort="trending"]').textContent = copy.trending;
  app.querySelector('#sort-filters [data-sort="top"]').textContent = copy.top;
  app.querySelector('#sort-filters [data-sort="recent"]').textContent = copy.recent;
  app.querySelector('button[data-type-value="green"]').textContent = copy.green;
  app.querySelector('button[data-type-value="red"]').textContent = copy.red;
  app.querySelector('select[name="language"] option[value="auto"]').textContent = copy.auto;
  app.querySelector('select[name="language"] option[value="en"]').textContent = copy.detectionEn;
  app.querySelector('select[name="language"] option[value="fr"]').textContent = copy.detectionFr;

  [...app.querySelectorAll('.lang-btn')].forEach((button) => {
    button.classList.toggle('active', button.dataset.locale === state.locale);
  });
  [...app.querySelectorAll('#type-filters button')].forEach((button) => {
    button.classList.toggle('active', button.dataset.type === state.filterType);
  });
  [...app.querySelectorAll('#sort-filters button')].forEach((button) => {
    button.classList.toggle('active', button.dataset.sort === state.sortMode);
  });
}

function renderMeta() {
  const copy = translations[state.locale];
  const todayCount = state.flags.filter((flag) => Date.now() - new Date(flag.created_at).getTime() < 86400000).length;
  const totalVotes = state.flags.reduce((sum, flag) => sum + Number(flag.votes || 0), 0);

  app.querySelector('#live-pill').textContent = state.realtimeEnabled ? copy.liveReady : copy.liveDemo;
  app.querySelector('#stats').innerHTML = `
    <div class="stat"><strong>${state.flags.length}</strong><span>${copy.statsLive}</span></div>
    <div class="stat"><strong>${todayCount}</strong><span>${copy.statsToday}</span></div>
    <div class="stat"><strong>${totalVotes}</strong><span>${copy.statsVotes}</span></div>
  `;
}

function renderStories() {
  const copy = translations[state.locale];
  const topGreen = state.flags.filter((flag) => flag.type === 'green').sort(sorters.top).slice(0, 3);
  const topRed = state.flags.filter((flag) => flag.type === 'red').sort(sorters.top).slice(0, 3);

  app.querySelector('#top-lists').innerHTML = `
    <div class="story-item">
      <strong>${copy.topGreen}</strong>
      ${renderStoryRows(topGreen, copy)}
    </div>
    <div class="story-item">
      <strong>${copy.topRed}</strong>
      ${renderStoryRows(topRed, copy)}
    </div>
  `;
}

function renderStoryRows(items, copy) {
  if (!items.length) return `<div>${copy.topListEmpty}</div>`;
  return items
    .map((item) => `<div class="story-row"><span>${escapeHtml(item.text)}</span><b>${item.votes}</b></div>`)
    .join('');
}

function renderFeed() {
  const copy = translations[state.locale];
  const feed = app.querySelector('#feed');
  const controls = app.querySelector('#feed-controls');
  const visible = getVisibleFlags();
  const items = visible.slice(0, state.visibleCount);

  if (!visible.length) {
    feed.innerHTML = `<div class="empty">${copy.empty}</div>`;
    controls.innerHTML = '';
    return;
  }

  feed.innerHTML = items.map((flag) => renderCard(flag, copy)).join('');

  if (state.visibleCount < visible.length) {
    controls.innerHTML = `<button class="btn secondary load-more" data-action="load-more">${copy.loadMore}</button>`;
  } else {
    controls.innerHTML = `<p class="muted end-copy">${copy.endReached}</p>`;
  }
}

function renderCard(flag, copy) {
  const voteState = getVotes();
  const myVote = voteState[flag.id] ?? 0;
  const score = Number(flag.votes || 0);
  const shareUrl = `${location.origin}${location.pathname}#flag-${flag.id}`;
  const scoreWidth = Math.max(6, Math.min(100, 50 + score * 3));

  return `
    <article class="card reveal" id="flag-${flag.id}" data-type="${flag.type}">
      <div class="card-head">
        <div class="badge-group">
          <span class="badge ${flag.type}">${flag.type === 'green' ? copy.green : copy.red}</span>
          <span class="badge language">${flag.language.toUpperCase()}</span>
        </div>
        <button class="icon-btn" data-action="share-flag" data-id="${flag.id}">${copy.share}</button>
      </div>

      <h3>${escapeHtml(flag.text)}</h3>

      <div class="card-meta">
        <span>${timeAgo(flag.created_at, state.locale)}</span>
        <span>•</span>
        <span>${score} ${copy.votes}</span>
        <span>•</span>
        <span class="share-url">${escapeHtml(shareUrl)}</span>
      </div>

      <div class="vote-row">
        <div class="vote-summary">
          <div class="vote-meter" aria-hidden="true">
            <span class="fill ${flag.type}" style="width:${scoreWidth}%"></span>
          </div>
          <small>${copy.score}: ${score}</small>
        </div>
        <div class="vote-actions">
          <button class="vote-btn ${myVote === 1 ? 'active up' : ''}" data-action="vote" data-id="${flag.id}" data-delta="1">👍 ${copy.upvote}</button>
          <button class="vote-btn ${myVote === -1 ? 'active down' : ''}" data-action="vote" data-id="${flag.id}" data-delta="-1">👎 ${copy.downvote}</button>
        </div>
      </div>
    </article>
  `;
}

async function submitFlag(form) {
  if (state.busy) return;

  const formData = new FormData(form);
  const text = String(formData.get('text') || '').trim().replace(/\s+/g, ' ');
  const type = String(formData.get('type') || 'green');
  const forcedLanguage = String(formData.get('language') || 'auto');
  const language = forcedLanguage === 'auto' ? detectLanguage(text) : forcedLanguage;

  if (text.length < MIN_LENGTH) return renderStatus(t('shortError'), 'error');
  if (text.length > MAX_LENGTH) return renderStatus(t('longError'), 'error');
  if (containsBadWords(text)) return renderStatus(t('badWordError'), 'error');
  if (state.flags.some((flag) => normalize(flag.text) === normalize(text))) return renderStatus(t('duplicateError'), 'error');

  state.busy = true;
  toggleSubmit(true);

  const payload = {
    text,
    type: type === 'red' ? 'red' : 'green',
    language: language === 'fr' ? 'fr' : 'en',
    votes: 0
  };

  try {
    if (!state.supabase) {
      state.flags.unshift({ ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() });
      afterSuccessfulSubmit(form);
      renderStatus(t('formDemo'), 'success');
      return;
    }

    const { error } = await state.supabase.from('flags').insert(payload);
    if (error) throw error;

    afterSuccessfulSubmit(form);
    renderStatus(t('formSuccess'), 'success');
    await loadFlags();
  } catch (error) {
    console.error(error);
    renderStatus(t('genericError'), 'error');
  } finally {
    state.busy = false;
    toggleSubmit(false);
  }
}

function afterSuccessfulSubmit(form) {
  form.reset();
  form.elements.type.value = 'green';
  state.visibleCount = PAGE_SIZE;
  app.querySelector('#counter').textContent = `0 / ${MAX_LENGTH}`;
  renderAll();
}

async function handleVote(id, delta) {
  const voteMap = getVotes();
  if (voteMap[id]) {
    showToast(t('voteExists'));
    return;
  }

  const flag = state.flags.find((item) => item.id === id);
  if (!flag) return;

  voteMap[id] = delta;
  localStorage.setItem(STORAGE_KEYS.votes, JSON.stringify(voteMap));

  const nextVotes = Number(flag.votes || 0) + delta;
  flag.votes = nextVotes;
  renderAll();
  showToast(t('voteSaved'));

  if (!state.supabase || String(id).startsWith(DEMO_PREFIX)) return;

  const { error } = await state.supabase.from('flags').update({ votes: nextVotes }).eq('id', id);
  if (error) console.error(error);
}

async function shareFlag(id) {
  const url = `${location.origin}${location.pathname}#flag-${id}`;

  try {
    if (navigator.share) {
      await navigator.share({ title: t('appName'), url });
      return;
    }

    await navigator.clipboard.writeText(url);
    showToast(t('shareCopied'));
  } catch (error) {
    console.error(error);
  }
}

function focusRandomFlag() {
  const visible = getVisibleFlags();
  if (!visible.length) return;

  const target = visible[Math.floor(Math.random() * visible.length)];
  document.querySelector(`#flag-${CSS.escape(target.id)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getVisibleFlags() {
  return [...state.flags]
    .filter((flag) => state.filterType === 'all' || flag.type === state.filterType)
    .sort(sorters[state.sortMode]);
}

const sorters = {
  recent: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  top: (a, b) => Number(b.votes || 0) - Number(a.votes || 0),
  trending: (a, b) => trendingScore(b) - trendingScore(a)
};

function trendingScore(flag) {
  const votes = Number(flag.votes || 0);
  const ageHours = Math.max(1, (Date.now() - new Date(flag.created_at).getTime()) / 36e5);
  return votes * 3 + 24 / ageHours;
}

function detectLanguage(value) {
  const normalized = normalize(` ${value} `);
  const frenchSignals = [' le ', ' la ', ' les ', ' une ', ' un ', ' avec ', ' vous ', ' pas ', ' ils ', ' elles ', ' est ', ' pour ', ' que ', ' qui ', ' nous ', ' votre '];
  return frenchSignals.some((token) => normalized.includes(token)) ? 'fr' : 'en';
}

function containsBadWords(value) {
  const normalized = normalize(value);
  return blockedPatterns.some((pattern) => pattern.test(normalized));
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function detectInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEYS.locale);
  if (saved === 'fr' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function applyLocale(locale) {
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

function toggleSubmit(disabled) {
  const button = app.querySelector('#submit-btn');
  if (button) button.disabled = disabled;
}

function syncTypeButtons() {
  const form = app.querySelector('#flag-form');
  if (!form) return;
  const currentType = form.elements.type.value;
  [...form.querySelectorAll('[data-type-value]')].forEach((button) => {
    button.classList.toggle('secondary', button.dataset.typeValue !== currentType);
  });
}

function renderStatus(message, type = 'error', hidden = false) {
  const alert = app.querySelector('#form-alert');
  if (!alert) return;

  if (hidden || !message) {
    alert.className = 'inline-alert hide';
    alert.textContent = '';
    return;
  }

  alert.className = `inline-alert ${type}`;
  alert.textContent = message;
}

function showToast(message) {
  const toast = app.querySelector('#toast');
  toast.textContent = message;
  toast.classList.remove('hide');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hide'), 2400);
}

function t(key) {
  return translations[state.locale][key];
}

function timeAgo(dateString, locale) {
  const diffMs = new Date(dateString).getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const minutes = Math.round(diffMs / 60000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  const hours = Math.round(diffMs / 3600000);
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  const days = Math.round(diffMs / 86400000);
  return rtf.format(days, 'day');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

if (!localStorage.getItem(STORAGE_KEYS.sessionId)) {
  localStorage.setItem(STORAGE_KEYS.sessionId, crypto.randomUUID());
}

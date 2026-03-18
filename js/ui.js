import { uiText } from './i18n.js';
import { pageContent } from './content.js';

const routes = [
  { key: 'home', href: './index.html', label: 'navHome' },
  { key: 'about', href: './about.html', label: 'navAbout' },
  { key: 'green', href: './green-flag.html', label: 'navGreen' },
  { key: 'red', href: './red-flag.html', label: 'navRed' },
  { key: 'examples-green', href: './green-flag-examples.html', label: 'pageGreenExamplesTitle' },
  { key: 'examples-red', href: './red-flag-examples.html', label: 'pageRedExamplesTitle' },
  { key: 'faq', href: './faq.html', label: 'navFaq' },
  { key: 'privacy', href: './privacy.html', label: 'navPrivacy' },
  { key: 'contact', href: './contact.html', label: 'navContact' }
];

export function renderSiteShell(page, locale) {
  const t = uiText[locale];
  const nav = routes.map((item) => `<a class="nav-link ${item.key === page ? 'active' : ''}" href="${item.href}">${t[item.label]}</a>`).join('');
  return `
    <header class="site-header">
      <div class="container header-row">
        <a class="brand" href="./index.html"><span class="brand-mark">RG</span><span>${t.brand}</span></a>
        <nav class="nav" aria-label="Primary">${nav}</nav>
        <div class="header-actions">
          <div class="lang-switcher" role="group" aria-label="Language switcher">
            <button class="lang-btn" data-locale="en">EN</button>
            <button class="lang-btn" data-locale="fr">FR</button>
          </div>
        </div>
      </div>
    </header>
    <main id="main"></main>
    <footer class="site-footer">
      <div class="container footer-grid">
        <section>
          <h2>${t.brand}</h2>
          <p>${t.footerBlurb}</p>
          <p class="fineprint">${t.entertainment}</p>
          <p class="fineprint">${t.moderation}</p>
        </section>
        <section>
          <h2>${t.legalTitle}</h2>
          <p>${t.legalBody}</p>
          <ul class="footer-links">
            <li><a href="./privacy.html">${t.navPrivacy}</a></li>
            <li><a href="./contact.html">${t.navContact}</a></li>
            <li><a href="./faq.html">${t.navFaq}</a></li>
            <li><a href="./about.html">${t.navAbout}</a></li>
          </ul>
        </section>
      </div>
    </footer>
    <div id="toast" class="toast hidden"></div>
    <aside id="cookie-banner" class="cookie-banner hidden" aria-live="polite"></aside>
  `;
}

export function renderStaticPage(page, locale) {
  const t = uiText[locale];
  const map = {
    about: pageContent.about,
    privacy: pageContent.privacy,
    contact: pageContent.contact,
    'green-flag': pageContent.green,
    'red-flag': pageContent.red,
    'green-flag-examples': pageContent.greenExamples,
    'red-flag-examples': pageContent.redExamples,
    faq: pageContent.faq
  };
  const content = map[page]?.[locale];
  if (!content) return `<section class="container prose"><h1>${t.brand}</h1></section>`;
  const sections = content.sections.map((section) => `
    <section class="prose-section card-surface">
      <h2>${section.heading}</h2>
      <p>${section.body}</p>
      ${section.faq ? `<ul>${section.faq.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
    </section>
  `).join('');
  return `
    <section class="page-hero container prose-hero">
      <p class="eyebrow">${t[pageLabel(page)] || t.pageAboutTitle}</p>
      <h1>${content.title}</h1>
      <p class="lead">${content.intro}</p>
    </section>
    <section class="container prose-grid">${sections}</section>
  `;
}

function pageLabel(page) {
  return {
    about: 'pageAboutTitle',
    privacy: 'pagePrivacyTitle',
    contact: 'pageContactTitle',
    'green-flag': 'pageGreenTitle',
    'red-flag': 'pageRedTitle',
    'green-flag-examples': 'pageGreenExamplesTitle',
    'red-flag-examples': 'pageRedExamplesTitle',
    faq: 'pageFaqTitle'
  }[page];
}

export function renderHome(locale, statsMarkup) {
  const t = uiText[locale];
  return `
    <section class="hero container">
      <div class="hero-copy card-surface">
        <p class="eyebrow">${t.heroKicker}</p>
        <h1>${t.heroTitle}</h1>
        <p class="lead">${t.heroBody}</p>
        <ul class="hero-list">${t.heroPoints.map((item) => `<li>${item}</li>`).join('')}</ul>
        <div class="hero-actions">
          <a class="button primary" href="#rankings">${t.ctaPrimary}</a>
          <a class="button secondary" href="#submit-card">${t.ctaSecondary}</a>
        </div>
      </div>
      <aside class="hero-side card-surface">
        <div class="status-row"><span class="status-dot"></span><strong id="sync-status">${t.statusFallback}</strong></div>
        <div id="stats-grid" class="stats-grid">${statsMarkup}</div>
        <div class="mini-links">
          <a href="./green-flag.html">${t.navGreen}</a>
          <a href="./red-flag.html">${t.navRed}</a>
          <a href="./faq.html">${t.navFaq}</a>
        </div>
      </aside>
    </section>

    <section id="rankings" class="container content-grid">
      <section class="main-column">
        <div class="toolbar card-surface">
          <div class="toolbar-row">
            <h2>${t.browseTitle}</h2>
            <button id="random-flag" class="button secondary">${t.random}</button>
          </div>
          <div class="toolbar-row wrap">
            <input id="search-input" class="search-input" type="search" placeholder="${t.searchPlaceholder}" aria-label="${t.searchPlaceholder}" />
            <div class="segmented" id="type-filter">
              <button data-type="all" class="active">${t.filterAll}</button>
              <button data-type="green">${t.typeGreen}</button>
              <button data-type="red">${t.typeRed}</button>
            </div>
            <div class="segmented" id="sort-filter">
              <button data-sort="trending" class="active">${t.sortTrending}</button>
              <button data-sort="top">${t.sortTop}</button>
              <button data-sort="new">${t.sortNew}</button>
            </div>
            <select id="language-filter" class="select" aria-label="${t.fieldLanguage}">
              <option value="all">${t.filterLanguageAll}</option>
              <option value="en">${t.langEn}</option>
              <option value="fr">${t.langFr}</option>
            </select>
          </div>
        </div>
        <div class="featured-grid">
          <article class="card-surface"><h3>${t.topGreen}</h3><div id="top-green-list" class="mini-feed"></div></article>
          <article class="card-surface"><h3>${t.topRed}</h3><div id="top-red-list" class="mini-feed"></div></article>
          <article class="card-surface"><h3>${t.trendingFlags}</h3><div id="trending-list" class="mini-feed"></div></article>
          <article class="card-surface"><h3>${t.latestFlags}</h3><div id="latest-list" class="mini-feed"></div></article>
        </div>
        <div id="feed" class="feed"></div>
        <div id="feed-controls" class="feed-controls"></div>
      </section>
      <aside class="side-column">
        <section id="submit-card" class="card-surface form-card">
          <h2>${t.addFlag}</h2>
          <p>${t.addBody}</p>
          <form id="flag-form">
            <label><span>${t.fieldText}</span><textarea id="flag-text" maxlength="140" required></textarea></label>
            <div class="form-grid">
              <label><span>${t.fieldType}</span><select id="flag-type" class="select"><option value="green">${t.typeGreen}</option><option value="red">${t.typeRed}</option></select></label>
              <label><span>${t.fieldLanguage}</span><select id="flag-language" class="select"><option value="auto">${t.langAuto}</option><option value="en">${t.langEn}</option><option value="fr">${t.langFr}</option></select></label>
            </div>
            <div class="form-meta"><small id="text-count">0 / 140</small><small>${t.submitHint}</small></div>
            <button class="button primary" id="submit-button" type="submit">${t.submit}</button>
          </form>
          <div id="form-message" class="inline-message hidden"></div>
        </section>
      </aside>
    </section>
  `;
}

export function renderCookieBanner(locale) {
  const t = uiText[locale];
  return `<p>${t.cookieBody}</p><div class="cookie-actions"><button class="button primary small" data-consent="accepted">${t.cookieAccept}</button><button class="button secondary small" data-consent="refused">${t.cookieRefuse}</button></div>`;
}

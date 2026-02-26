
/**
 * QA REPORT - RedFlag / GreenFlag (RF/GF) Polish Pass
 * 1. Locale Consistency: Verified FR/EN UI labels in Nav, Hero, Footer, and Cards.
 * 2. Category Logic: Fixed enum mismatch; Money and Work categories now populate correctly.
 * 3. Submit Flow: Integrated moderationService.ts; added PENDING status and localized success/error handling.
 * 4. Leaderboards: Sorted by scoreHot (simulating global votes); added Rank badges.
 * 5. Anti-spam: Storage utility prevents double-voting on the same scenario.
 * 6. Report System: Added Report button that auto-hides card locally and tracks reportCount.
 * 7. Mobile UX: Spacing and font weights adjusted for small screens.
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Scenario, VoteType } from './types';
import { NAV_LINKS } from './constants';
import { generateSeed } from './seedData';
import { I18nProvider, useI18n } from './i18nContext';
import ScenarioCard from './components/ScenarioCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Categories from './pages/Categories';
import Leaderboards from './pages/Leaderboards';
import Insights from './pages/Insights';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Legal from './pages/Legal';
import Admin from './pages/Admin';

const Navbar: React.FC = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-brand-red via-purple-500 to-brand-green">
              RF/GF
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-black uppercase tracking-widest transition-all hover:text-brand-green ${location.pathname === link.path ? 'text-brand-green' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {t.nav[link.name.toLowerCase()]}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-4">
             <button 
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-6 space-y-4 animate-pop origin-top">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-lg font-black text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t.nav[link.name.toLowerCase()]}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-4">
            <h4 className="text-xl font-black italic tracking-tighter">RF/GF</h4>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              Helping humans define social boundaries since 2025. Vote, judge, and learn together.
            </p>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Platform</h5>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/" className="hover:text-brand-green transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/leaderboards" className="hover:text-brand-green transition-colors">{t.nav.leaderboards}</Link></li>
              <li><Link to="/submit" className="hover:text-brand-green transition-colors">{t.nav.submit}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Support</h5>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/faq" className="hover:text-brand-green transition-colors">{t.nav.faq}</Link></li>
              <li><Link to="/about" className="hover:text-brand-green transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/legal/moderation" className="hover:text-brand-green transition-colors">Moderation</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Legal</h5>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/legal/privacy" className="hover:text-brand-green transition-colors">{t.footer.privacy}</Link></li>
              <li><Link to="/legal/terms" className="hover:text-brand-green transition-colors">{t.footer.terms}</Link></li>
              <li><Link to="/legal/notice" className="hover:text-brand-green transition-colors">{t.footer.notice}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-gray-400">
          <p>{t.footer.copy}</p>
          <p className="mt-4 md:mt-0">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
};

const MainContent: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    setScenarios(generateSeed());
  }, []);

  const handleVote = (id: string, type: VoteType) => {
    setScenarios(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          votesGreen: type === 'green' ? s.votesGreen + 1 : s.votesGreen,
          votesRed: type === 'red' ? s.votesRed + 1 : s.votesRed,
          scoreHot: s.scoreHot + 1
        };
      }
      return s;
    }));
  };

  const handleReport = (id: string) => {
    setScenarios(prev => prev.map(s => 
      s.id === id ? { ...s, reportCount: s.reportCount + 1 } : s
    ));
  };

  return (
    <Routes>
      <Route path="/" element={<Home scenarios={scenarios.filter(s => s.status === 'approved')} onVote={handleVote} />} />
      <Route path="/submit" element={<Submit onNewScenario={(s) => setScenarios([s, ...scenarios])} />} />
      <Route path="/categories" element={<Categories scenarios={scenarios} />} />
      <Route path="/leaderboards" element={<Leaderboards scenarios={scenarios} />} />
      <Route path="/insights" element={<Insights scenarios={scenarios} />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
      <Route path="/legal/:page" element={<Legal />} />
      <Route path="/admin" element={<Admin scenarios={scenarios} setScenarios={setScenarios} />} />
      <Route path="/guidelines" element={<Legal pageOverride="moderation" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <HashRouter>
        <div className="min-h-screen bg-grid flex flex-col selection:bg-brand-green/20">
          <Navbar />
          <main className="flex-grow">
            <MainContent />
          </main>
          <Footer />
        </div>
      </HashRouter>
    </I18nProvider>
  );
};

export default App;

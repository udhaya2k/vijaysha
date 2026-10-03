import { useState } from 'react';
import BirthdayCard from './components/BirthdayCard';
import ButterflyField from './components/ButterflyField';
import Footer from './components/Footer';
import MemoryCard from './components/MemoryCard';
import MessageCard from './components/MessageCard';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import SongCard from './components/SongCard';
import { navItems, siteConfig } from './data/config';
import { memories } from './data/memories';
import { messages } from './data/messages';
import { songs } from './data/songs';

const hasMeaningfulLink = (value) => typeof value === 'string' && value.trim().length > 0;

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [butterflyClicks, setButterflyClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [burstSeed, setBurstSeed] = useState(0);

  const handlePrimaryAction = () => {
    setActiveTab('Home');
    setIsCardOpen(true);
    setBurstSeed((seed) => seed + 1);
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCardToggle = () => {
    if (!isCardOpen) setBurstSeed((seed) => seed + 1);
    setIsCardOpen(!isCardOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButterflyClick = () => {
    const next = butterflyClicks + 1;

    if (next >= 5) {
      setShowEasterEgg(true);
      setButterflyClicks(0);
      return;
    }

    setButterflyClicks(next);
  };

  return (
    <div className="page-shell">
      <ButterflyField burstSeed={burstSeed} />
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      <header className="topbar">
        <button type="button" className="brand" onClick={handleButterflyClick} aria-label="Butterfly logo">
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M30 28C23 10 5 7 7 23c1 9 11 12 22 13-10 2-16 8-12 15 5 8 14-2 16-15Z" />
            <path d="M34 28c7-18 25-21 23-5-1 9-11 12-22 13 10 2 16 8 12 15-5 8-14-2-16-15Z" />
            <path className="brand-butterfly-body" d="M32 27c-3 6-3 13 0 20 3-7 3-14 0-20Zm-1-2-6-7m7 7 6-7" />
          </svg>
          <span className="brand-text">Vijaysha</span>
        </button>

        <Navbar items={navItems} activeTab={activeTab} onChange={handleTabChange} />
      </header>

      <main className="page-content">
        {activeTab === 'Home' && (
          <>
            <section className="hero panel" id="home">
              <div className="hero-copy">
                <p className="eyebrow">A little late, but sincerely</p>
                <h1>{siteConfig.title}</h1>
                <p className="subtitle">{siteConfig.subtitle}</p>

                <div className="cta-row">
                  <button type="button" className="primary-button" onClick={handlePrimaryAction}>
                    Open your little surprise 🦋
                  </button>
                </div>
              </div>

              <BirthdayCard isOpen={isCardOpen} onToggle={handleCardToggle} message={siteConfig.birthdayMessage} />
            </section>

            <section className="info-grid section">
              <article className="glass-card about-card">
                <p className="eyebrow">About this little website</p>
                <h2>Just a small corner of the internet, made from a feeling I never really planned.</h2>
                <p>
                  Some feelings arrive quietly, without being planned. I remember the good moments from that chapter with
                  warmth, and wanted to make this small corner of the internet to wish you well. No big message—just a
                  little birthday kindness, freely given. 🦋
                </p>
                <p className="dlf-note">And I still smile at the little nickname you gave me — DLF. 😂</p>
              </article>

              <article className="glass-card dev-card">
                <p className="tiny-code">if (birthdayWishDelivered) {'{'}</p>
                <p className="tiny-code">  status = "Happy";</p>
                <p className="tiny-code">{'}'}</p>

                <div className="person-card">
                  <div className="avatar">U</div>
                  <div>
                    <h3>Udhayaprakash S (yours DLF)</h3>
                    <span>SAP ABAP Consultant</span>
                  </div>
                </div>

                <p>Software engineer by profession, occasional overthinker by habit 😂.</p>
                <a
                  className="portfolio-link"
                  href={siteConfig.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="About me: open Udhaya Prakash's portfolio in a new tab"
                >
                  About me <span aria-hidden="true">↗</span>
                </a>
              </article>
            </section>

            <NoteForm />
          </>
        )}

        {activeTab === 'Little Messages' && (
          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">Little Messages</p>
              <h2>Warm thoughts, softly spoken.</h2>
            </div>
            <div className="card-grid message-grid">
              {messages.map((message) => (
                <MessageCard key={message.title} title={message.title} body={message.body} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Songs' && (
          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">Songs</p>
              <h2>Songs that remind me of you 🎧</h2>
            </div>
            <div className="card-grid songs-grid">
              {songs.map((song) => (
                <SongCard key={song.title} title={song.title} artist={song.artist} note={song.note} youtubeUrl={song.youtubeUrl} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Memories' && (
          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">Little Memories</p>
              <h2>Some soft little fragments worth keeping.</h2>
            </div>
            <div className="card-grid memory-grid">
              {memories.map((memory) => (
                <MemoryCard key={memory.title} title={memory.title} description={memory.description} image={memory.image} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'About' && (
          <section className="section about-page">
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2>Built with React, a few gentle thoughts, and a little night-garden magic.</h2>
            </div>

            <div className="text-block glass-card">
              <p>
                This is not a grand gesture. It is simply a tiny corner of the internet made with some time, a few memories,
                and a little appreciation for the good moments that stayed with me. It was designed as a thoughtful birthday
                surprise, with the butterfly theme as a gentle reminder of calm, softness, and good memories.
              </p>
              <p>
                Built with React, designed personally, and created as a birthday surprise with a warm and respectful tone.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'Contact' && (
          <section className="section contact-page">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>If you ever feel like saying hi 👋</h2>
              <p className="muted-copy">No pressure. This is just here.</p>
            </div>

            <div className="contact-grid">
              {hasMeaningfulLink(siteConfig.contactLinks.instagram) && (
                <a className="contact-card glass-card" href={siteConfig.contactLinks.instagram} target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                  <strong>↗</strong>
                </a>
              )}

              {hasMeaningfulLink(siteConfig.contactLinks.threads) && (
                <a className="contact-card glass-card" href={siteConfig.contactLinks.threads} target="_blank" rel="noreferrer">
                  <span>Threads</span>
                  <strong>↗</strong>
                </a>
              )}

              {hasMeaningfulLink(siteConfig.contactLinks.email) && (
                <a className="contact-card glass-card" href={`mailto:${siteConfig.contactLinks.email}`}>
                  <span>Email</span>
                  <strong>✉</strong>
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      {showEasterEgg && (
        <div className="easter-egg" role="status" aria-live="polite">
          <p>Okay okay… enough butterflies 😂🦋</p>
          <button type="button" onClick={() => setShowEasterEgg(false)}>
            Reset
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;

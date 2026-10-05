import { useRef, useState } from 'react';
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
  const [audioError, setAudioError] = useState('');
  const audioRef = useRef(null);
  const playbackRequestRef = useRef(0);

  const playAudio = (src) => {
    const audio = audioRef.current;
    if (!audio) return;

    const playbackRequest = ++playbackRequestRef.current;
    setAudioError('');
    if (audio.getAttribute('src') !== src) {
      audio.src = src;
    } else {
      audio.pause();
      if (audio.readyState > 0) {
        audio.currentTime = 0;
      }
    }
    audio.play().catch((error) => {
      console.error('Audio playback failed.', error);
      if (playbackRequest === playbackRequestRef.current) {
        setAudioError(
          error?.name === 'NotSupportedError'
            ? 'This browser cannot decode the audio file. In Supabase Storage, set its Content-Type to audio/mp4 or replace it with a browser-supported audio file.'
            : 'This audio could not be played. Check your connection and try again.',
        );
      }
    });
  };

  const stopAudio = () => {
    playbackRequestRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.readyState > 0) {
        audioRef.current.currentTime = 0;
      }
    }
    setAudioError('');
  };

  const handlePrimaryAction = () => {
    setActiveTab('Home');
    setIsCardOpen(true);
    setBurstSeed((seed) => seed + 1);
    playAudio(siteConfig.surpriseAudioUrl);
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCardToggle = () => {
    if (!isCardOpen) {
      setBurstSeed((seed) => seed + 1);
      playAudio(siteConfig.surpriseAudioUrl);
    } else {
      stopAudio();
    }
    setIsCardOpen(!isCardOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Little Messages') {
      setIsCardOpen(false);
      stopAudio();
      playAudio(siteConfig.littleMessagesAudioUrl);
    } else {
      stopAudio();
    }
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
      <audio ref={audioRef} preload="none" />
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
                {audioError && <p className="audio-error" role="status">{audioError}</p>}
              </div>

              <BirthdayCard isOpen={isCardOpen} onToggle={handleCardToggle} message={siteConfig.birthdayMessage} />
            </section>

            <section className="info-grid section">
              <article className="glass-card about-card">
                <p className="eyebrow">About this website, Vijaysha 🦋</p>

                <h4>I don't really know how to explain this... so I made this instead.</h4>

                <p>
                  I had this idea for a long time. I wanted to make something for you,
                  but I didn't know what exactly. Then I thought, why not just make a
                  little website and put all the random things I wanted to say here.
                </p>

                <p>
                  There are some things I never said properly, some things I probably
                  explained badly, and some things I just kept inside. You'll find a
                  little bit of all of that here.
                </p>

                <p>
                  Don't take everything here too seriously though 😂. Some parts are
                  emotional, some are silly, and some are just me being me.
                </p>

                <p>
                  I don't expect anything from you after seeing this except love. I just wanted to
                  make something once, from my side, and leave it here for you.
                </p>

                <p>
                  If you smile somewhere while going through this, then
                  that's enough for me. 🦋
                </p>

                <p>
                  And yes, I used AI to help me with some of the words and the coding 😅.
                  But the thoughts behind all of this are mine.
                </p>
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
              {audioError && <p className="audio-error" role="status">{audioError}</p>}
            </div>
            <div className="card-grid message-grid">
              {messages.map((message) => (
                <MessageCard
                  key={message.title}
                  title={message.title}
                  body={message.body}
                  highlighted={message.highlighted}
                />
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
                <MemoryCard
                  key={memory.title}
                  title={memory.title}
                  description={memory.description}
                  images={memory.images}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'About' && (
          <section className="section about-page">
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2>Why I made this 🦋</h2>
            </div>

            <div className="text-block glass-card">
              <p>
                Honestly, I could have just sent you a normal birthday message. But I wanted to do something a little
                different this time.
              </p>
              <p>
                I had so many random thoughts, memories, songs and little things that reminded me of you. Putting all of
                that into one normal message would have been way too much 😂, so I thought I&apos;d make a small website
                instead.
              </p>
              <p>
                I also wanted to make something myself rather than just send something I found online. So I spent some time
                designing it, writing the content, adding the little animations and putting everything together.
              </p>
              <p>
                It&apos;s not meant to be anything big or serious. I just wanted to make something that feels like me and give
                you a small surprise for your birthday.
              </p>
              <p>
                And yes, I used AI for some help with the coding and arranging a few words 😅. But the idea, memories and
                feelings behind this website are mine.
              </p>
              <p>That&apos;s basically why I made it. 🤍🦋</p>
            </div>
          </section>
        )}

        {activeTab === 'Contact' && (
          <section className="section contact-page">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>How to contact me 🦋</h2>
            </div>

            <div className="text-block glass-card">
              <p>You already know how to reach me through the portfolio and contact options on this site.</p>
              <p>
                If you ever feel like talking, you know where to find me. I’ll always be happy to hear from you, whether
                it’s just a random “hey” or a proper conversation after a long time. 😅
              </p>
              <p>
                I’m not going anywhere with this message—I just wanted you to know that if you ever want to talk, I’ll be
                here. 🤍🦋
              </p>
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

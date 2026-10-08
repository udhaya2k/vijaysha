import { useEffect, useRef, useState } from 'react';
import BirthdayCard from './components/BirthdayCard';
import ButterflyField from './components/ButterflyField';
import Footer from './components/Footer';
import MemoriesSlider from './components/MemoriesSlider';
import MessageList from './components/MessageList';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import PortfolioInvite from './components/PortfolioInvite';
import SongCard from './components/SongCard';
import { navItems, siteConfig } from './data/config';
import { memories } from './data/memories';
import { messages } from './data/messages';
import { songs } from './data/songs';

const hasMeaningfulLink = (value) => typeof value === 'string' && value.trim().length > 0;

const getBurstOrigin = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX || bounds.left + bounds.width / 2;
  const y = event.clientY || bounds.top + bounds.height / 2;

  return {
    x: `${(x / window.innerWidth) * 100}%`,
    y: `${(y / window.innerHeight) * 100}%`,
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [butterflyClicks, setButterflyClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showPortfolioInvite, setShowPortfolioInvite] = useState(false);
  const [showHeadphoneNotice, setShowHeadphoneNotice] = useState(true);
  const [headphoneNoticeCountdown, setHeadphoneNoticeCountdown] = useState(5);
  const [isDesktopViewport, setIsDesktopViewport] = useState(
    () => window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches,
  );
  const [burstSeed, setBurstSeed] = useState(0);
  const [burstOrigin, setBurstOrigin] = useState({
    x: '50%',
    y: '43%',
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [audioError, setAudioError] = useState('');
  const [audioStatus, setAudioStatus] = useState('');
  const audioRef = useRef(null);
  const playbackRequestRef = useRef(0);

  useEffect(() => {
    const dismissTimeoutId = window.setTimeout(() => setShowHeadphoneNotice(false), 5000);
    const countdownIntervalId = window.setInterval(() => {
      setHeadphoneNoticeCountdown((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(dismissTimeoutId);
      window.clearInterval(countdownIntervalId);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const updateViewportEligibility = (event) => setIsDesktopViewport(event.matches);

    desktopQuery.addEventListener('change', updateViewportEligibility);
    return () => desktopQuery.removeEventListener('change', updateViewportEligibility);
  }, []);

  const playAudio = (src) => {
    const audio = audioRef.current;
    if (!audio) return;

    const playbackRequest = ++playbackRequestRef.current;
    setAudioError('');
    setAudioStatus('Starting audio…');
    if (audio.getAttribute('src') !== src) {
      audio.src = src;
      audio.load();
    } else {
      audio.pause();
      if (audio.readyState > 0) {
        audio.currentTime = 0;
      }
    }
    audio.play()
      .then(() => {
        if (playbackRequest === playbackRequestRef.current) {
          setAudioStatus('');
        }
      })
      .catch((error) => {
        console.error('Audio playback failed.', error);
        if (playbackRequest === playbackRequestRef.current) {
          setAudioStatus('');
          setAudioError(
            error?.name === 'NotSupportedError'
              ? 'This browser cannot play this audio format.'
              : 'This audio could not be played. Check your connection and try again.',
          );
        }
      });
  };

  const stopAudio = () => {
    playbackRequestRef.current += 1;
    setAudioStatus('');
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.readyState > 0) {
        audioRef.current.currentTime = 0;
      }
    }
    setAudioError('');
  };

  const handlePrimaryAction = (event) => {
    setActiveTab('Home');
    setIsCardOpen(true);
    setBurstOrigin(getBurstOrigin(event));
    setBurstSeed((seed) => seed + 1);
    playAudio(siteConfig.surpriseAudioUrl);
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCardToggle = (event) => {
    if (!isCardOpen) {
      setBurstOrigin(getBurstOrigin(event));
      setBurstSeed((seed) => seed + 1);
      playAudio(siteConfig.surpriseAudioUrl);
    } else {
      stopAudio();
    }
    setIsCardOpen(!isCardOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Messages for you') {
      setIsCardOpen(false);
      stopAudio();
      playAudio(siteConfig.littleMessagesAudioUrl);
    } else if (tab === 'Memories for you') {
      stopAudio();
      playAudio(siteConfig.memoriesAudioUrl);
    } else if (tab === 'Contact') {
      stopAudio();
      playAudio(siteConfig.contactAudioUrl);
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
      <audio
        ref={audioRef}
        preload="metadata"
        onWaiting={() => setAudioStatus('Buffering audio…')}
        onPlaying={() => setAudioStatus('')}
      />
      <ButterflyField burstSeed={burstSeed} burstOrigin={burstOrigin} />
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
        {showHeadphoneNotice && (
          <aside className="headphone-notice" role="note">
            <span aria-hidden="true">🎧</span>
            <p>
              Headphones are recommended for a better experience while browsing and reading the messages. (
              {headphoneNoticeCountdown}s)
            </p>
            <button
              type="button"
              className="headphone-notice-dismiss"
              onClick={() => setShowHeadphoneNotice(false)}
              aria-label="Dismiss headphone recommendation"
            >
              ×
            </button>
          </aside>
        )}
        {audioStatus && <p className="audio-status" role="status">{audioStatus}</p>}
        {audioError && <p className="audio-error" role="alert">{audioError}</p>}
        {activeTab === 'Home' && (
          <>
            <section className="hero panel" id="home">
              <div className="hero-copy">
                <p className="eyebrow">Pre planned by DLF. A bit late, but it was my plan to surprise you by my wishes</p>
                <h1>{siteConfig.title}</h1>
                <p className="subtitle">{siteConfig.subtitle}</p>

                <div className="cta-row">
                  <button type="button" className="primary-button" onClick={handlePrimaryAction}>
                    <span>Tap to open your surprise 🦋</span>
                    <span className="primary-button-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="mobile-explore-hint">
                  <span aria-hidden="true">✨</span>
                  On Android Devices or IPhone Devices, tap <strong>More</strong> in the menu above to discover your messages,
                  memories, and more little surprises!
                </p>
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
                  Don't take everything here too seriously though. Some parts are
                  emotional, some are silly, and some are just me being me (But Real, Babe).
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
                  And yes, I used AI to help me with some of the words and the coding.
                  But the thoughts behind all of this are completely mine.
                </p>
              </article>

              <article className="glass-card dev-card">
                <p className="tiny-code">if (birthdayWishDelivered) {'{'}</p>
                <p className="tiny-code">  status = "Happy";</p>
                <p className="tiny-code">{'}'}</p>

                <div className="person-card">
                  <div className="avatar">U</div>
                  <div>
                    <h3>Udhayaprakash S</h3> 
                      <h5>(DLF Buddy)</h5>
                    <span>Associate SAP ABAP Consultant</span>
                  </div>
                </div>

                <p>Software Developer by profession, occasional overthinker by habit 😂.</p>
                <button
                  className="portfolio-link"
                  type="button"
                  onClick={() => setShowPortfolioInvite(true)}
                  aria-haspopup="dialog"
                >
                  About me <span aria-hidden="true">↗</span>
                </button>
              </article>
            </section>

            <NoteForm />
          </>
        )}

        {activeTab === 'Messages for you' && (
          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">Little Messages</p>
              <h2>Warm thoughts, softly spoken.</h2>
            </div>
            <aside className="message-featured-thought">
              <p className="eyebrow">A thought to remember</p>
              <h2>Someone taught me: Proper communication is important</h2>
            </aside>
            <MessageList messages={messages} />
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

        {activeTab === 'Memories for you' && (
          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">Little Memories</p>
              <h2>Some soft moments worth keeping.</h2>
            </div>
            <MemoriesSlider memories={memories} />
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
                I could have just sent you a normal birthday message. But I wanted to do something a little
                different this time.
              </p>
              <p>
                I had so many random thoughts, memories, songs and little things that reminded me of you. Putting all of
                that into one normal message would have been way too much, so I thought I&apos;d make a small website
                instead.
              </p>
              <p>
                Messages la sonnaa un brain dha CPU mathiri Heat aagirum.
              </p>
              <p>
                I also wanted to make something myself rather than just send something I found online. So I spent some time
                designing my emotions, feelings and putting everything together.
              </p>
              <p>
                It&apos;s not meant to be anything big or serious. I just wanted to make something that feels like me and give
                you a small surprise for your birthday.
              </p>
              <p>
                The idea, memories, and feelings behind this website are my own.
              </p>
              <p>That&apos;s basically why I made it. 🤍🦋</p>
              <p>Think I hope you like this Dear ❤️! 😊</p>
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
                it’s just a random “hey” or a proper conversation after a long time 💌. 
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
          <p>Okay okay… enough butterflies 🦋</p>
          <button type="button" onClick={() => setShowEasterEgg(false)}>
            Reset
          </button>
        </div>
      )}

      {showPortfolioInvite && (
        <PortfolioInvite
          isDesktopViewport={isDesktopViewport}
          portfolioUrl={siteConfig.portfolioUrl}
          onClose={() => setShowPortfolioInvite(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;

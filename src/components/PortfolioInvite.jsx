import { useEffect, useRef, useState } from 'react';

const noPositions = [
  { left: 64, top: 24 },
  { left: 82, top: 24 },
  { left: 64, top: 76 },
  { left: 82, top: 76 },
  { left: 82, top: 50 },
];

export default function PortfolioInvite({ isDesktopViewport, portfolioUrl, onClose }) {
  const dialogRef = useRef(null);
  const [noPosition, setNoPosition] = useState({ left: 70, top: 50 });
  const [openError, setOpenError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    dialog.showModal();
    return () => dialog.close();
  }, []);

  const closeInvite = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    onClose();
  };

  const moveNoButton = (event) => {
    const actions = event.currentTarget.parentElement;
    if (!actions) return;
    const bounds = actions.getBoundingClientRect();
    const hasPointerPosition = Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
    const cursorX = hasPointerPosition ? event.clientX - bounds.left : bounds.width / 2;
    const cursorY = hasPointerPosition ? event.clientY - bounds.top : bounds.height / 2;
    const nextPositions = noPositions.filter((position) => (
      position.left !== noPosition.left || position.top !== noPosition.top
    ));
    const farthestPosition = nextPositions.reduce((farthest, position) => {
      const distance = Math.hypot(
        (position.left / 100) * bounds.width - cursorX,
        (position.top / 100) * bounds.height - cursorY,
      );

      return !farthest || distance > farthest.distance
        ? { position, distance }
        : farthest;
    }, null);

    setNoPosition(farthestPosition.position);
  };

  const dodgeNoButton = (event) => {
    if (event.pointerType !== 'mouse') return;
    moveNoButton(event);
  };

  const handleNoKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    moveNoButton(event);
  };

  const handleNoClick = (event) => {
    event.preventDefault();
    moveNoButton(event);
  };

  const openPortfolio = () => {
    if (!isDesktopViewport) return;

    const portfolioWindow = window.open(portfolioUrl, '_blank');
    if (!portfolioWindow) {
      setOpenError('Your browser blocked the new tab. Allow pop-ups for this site, then choose Yes again.');
      return;
    }

    portfolioWindow.opener = null;
    onClose();
  };

  return (
    <dialog
      className="portfolio-dialog"
      ref={dialogRef}
      aria-labelledby="portfolio-invite-title"
      aria-describedby="portfolio-invite-description"
      onCancel={closeInvite}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeInvite();
      }}
    >
      <div className="portfolio-invite">
        <button className="portfolio-dialog-close" type="button" onClick={closeInvite} aria-label="Close invitation">
          ×
        </button>
        <span className="portfolio-invite-butterfly" aria-hidden="true">🦋</span>
        <p className="eyebrow">A little question</p>
        <h2 id="portfolio-invite-title">Will you like to talk to me?</h2>
        <p id="portfolio-invite-description">
          {isDesktopViewport
            ? 'I’d be happy to hear from you. Would you like to visit my portfolio?'
            : 'My portfolio is available from a laptop or desktop with a screen at least 1024px wide and a mouse or trackpad.'}
        </p>

        <div className="portfolio-invite-actions">
          <button
            className="portfolio-answer portfolio-answer-yes"
            type="button"
            onClick={openPortfolio}
            disabled={!isDesktopViewport}
          >
            Yes
          </button>
          <button
            className="portfolio-answer portfolio-answer-no"
            type="button"
            onPointerEnter={dodgeNoButton}
            onPointerDown={dodgeNoButton}
            onKeyDown={handleNoKeyDown}
            onClick={handleNoClick}
            style={{
              '--no-left': `${noPosition.left}%`,
              '--no-top': `${noPosition.top}%`,
            }}
          >
            No
          </button>
        </div>

        {!isDesktopViewport && (
          <p className="portfolio-device-notice" role="status">
            Please open this page on a laptop or desktop to continue.
          </p>
        )}
        {openError && (
          <p className="portfolio-device-notice" role="alert">
            {openError}
          </p>
        )}
      </div>
    </dialog>
  );
}

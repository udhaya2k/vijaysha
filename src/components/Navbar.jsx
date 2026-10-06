import { useState } from 'react';

export default function Navbar({ items, activeTab, onChange }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const mobileItems = items.filter((item) => item !== 'Home' && item !== activeTab);

  const handleSelect = (item) => {
    onChange(item);
    setIsMoreOpen(false);
  };

  return (
    <nav className="topbar-nav" aria-label="Main navigation">
      <ul className="nav-list desktop-nav-list">
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              className={item === activeTab ? 'nav-link active' : 'nav-link'}
              onClick={() => handleSelect(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="mobile-nav">
        <button
          type="button"
          className={activeTab === 'Home' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleSelect('Home')}
        >
          Home
        </button>
        {activeTab !== 'Home' && (
          <button type="button" className="nav-link active current-nav-link" aria-current="page">
            {activeTab}
          </button>
        )}
        <div className="more-nav">
          <button
            type="button"
            className={isMoreOpen ? 'more-nav-trigger active' : 'more-nav-trigger'}
            aria-expanded={isMoreOpen}
            aria-controls="more-nav-list"
            aria-label={isMoreOpen ? 'Hide more pages' : 'Show more pages'}
            onClick={() => setIsMoreOpen((open) => !open)}
          >
            <svg className="more-butterfly" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M30 28C23 10 5 7 7 23c1 9 11 12 22 13-10 2-16 8-12 15 5 8 14-2 16-15Z" />
              <path d="M34 28c7-18 25-21 23-5-1 9-11 12-22 13 10 2 16 8 12 15-5 8-14-2-16-15Z" />
              <path className="more-butterfly-body" d="M32 27c-3 6-3 13 0 20 3-7 3-14 0-20Z" />
            </svg>
            <span>More</span>
            <svg className="more-chevron" viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3 6 5 5 5-5" />
            </svg>
          </button>
          {isMoreOpen && (
            <ul className="more-nav-list" id="more-nav-list" aria-label="More pages">
              {mobileItems.map((item) => (
                <li key={item}>
                  <button type="button" className="nav-link" onClick={() => handleSelect(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

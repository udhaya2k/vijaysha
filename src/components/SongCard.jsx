function getYoutubeEmbedUrl(value) {
  if (!value) return '';

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    let videoId = '';

    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] ?? '';
    } else if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const path = parsed.pathname.split('/').filter(Boolean);
      videoId =
        parsed.searchParams.get('v') ??
        (['embed', 'shorts', 'live'].includes(path[0]) ? path[1] : '');
    }

    return /^[\w-]{11}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : '';
  } catch {
    return '';
  }
}

export default function SongCard({ title, artist, note, youtubeUrl }) {
  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

  return (
    <article className="song-card glass-card">
      <div className="song-header">
        <div>
          <p className="song-label" aria-hidden="true">♫</p>
          <h3>{title}</h3>
        </div>
        <span className="song-artist">{artist}</span>
      </div>

      <p className="song-note">{note}</p>

      {embedUrl ? (
        <div className="youtube-frame">
          <iframe
            src={embedUrl}
            title={`YouTube video player for ${title}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="song-placeholder">
          {youtubeUrl ? 'Add a valid YouTube video URL' : 'Add YouTube link in songs.js'}
        </div>
      )}
    </article>
  );
}

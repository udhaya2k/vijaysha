import { getYoutubeEmbedUrl } from '../utils/youtube';

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
        <>
          <div className="youtube-frame">
            <iframe
              src={embedUrl}
              title={`YouTube video player for ${title}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <a className="youtube-link" href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            Watch on YouTube <span aria-hidden="true">↗</span>
          </a>
        </>
      ) : (
        <div className="song-placeholder">
          {youtubeUrl ? 'Add a valid YouTube video URL' : 'Add YouTube link in songs.js'}
        </div>
      )}
    </article>
  );
}

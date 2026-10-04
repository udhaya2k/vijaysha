function getStartTime(value) {
  if (!value) return 0;

  if (/^\d+$/.test(value)) {
    return Number(value);
  }

  if (/^\d+(?::\d{1,2}){1,2}$/.test(value)) {
    return value
      .split(':')
      .reduce((seconds, part) => seconds * 60 + Number(part), 0);
  }

  const match = value.match(
    /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/
  );

  if (!match || !match[0]) return 0;

  const [, hours = '0', minutes = '0', seconds = '0'] = match;

  return (
    Number(hours) * 3600 +
    Number(minutes) * 60 +
    Number(seconds)
  );
}

export function getYoutubeEmbedUrl(value) {
  if (!value) return '';

  try {
    const parsed = new URL(value);

    const host = parsed.hostname
      .toLowerCase()
      .replace(/^www\./, '');

    let videoId = '';

    if (host === 'youtu.be') {
      videoId =
        parsed.pathname.split('/').filter(Boolean)[0] ?? '';
    } else if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const path = parsed.pathname.split('/').filter(Boolean);

      videoId =
        parsed.searchParams.get('v') ??
        (['embed', 'shorts', 'live'].includes(path[0])
          ? path[1]
          : '');
    }

    // YouTube video IDs are exactly 11 characters
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      return '';
    }

    const start = getStartTime(
      parsed.searchParams.get('t') ||
      parsed.searchParams.get('start') ||
      ''
    );

    const embedParams = new URLSearchParams({
      playsinline: '1',
      rel: '0',
    });

    if (Number.isFinite(start) && start > 0) {
      embedParams.set('start', String(start));
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?${embedParams.toString()}`;
  } catch {
    return '';
  }
}
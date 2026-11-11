export function playbackUrls(provider, id) {
  if (provider === 'youtube' && /^[\w-]{11}$/.test(id)) {
    return { embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`, external: `https://www.youtube.com/watch?v=${id}`, label: 'YouTube' };
  }
  if (provider === 'vimeo' && /^\d+$/.test(id)) {
    return { embed: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`, external: `https://vimeo.com/${id}`, label: 'Vimeo' };
  }
  if (provider === 'drive' && /^[\w-]{20,}$/.test(id)) {
    return { embed: `https://drive.google.com/file/d/${id}/preview`, external: `https://drive.google.com/file/d/${id}/view`, label: 'Google Drive' };
  }
  throw new Error('Proveedor o identificador de vídeo no válido.');
}

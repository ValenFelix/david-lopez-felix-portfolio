export interface Video {
  provider: 'youtube' | 'vimeo' | 'drive';
  id: string;
}

export interface Project {
  slug: string;
  title: string;
  titleConfirmed: boolean;
  poster: string | null;
  posterAlt: string | null;
  role: string | null;
  year: number | null;
  duration: string | null;
  synopsis: string | null;
  video: Video | null;
}

export const profile = {
  name: 'David López Félix',
  biography: 'David López Félix es estudiante de cine.',
  email: null as string | null,
  socialLinks: [] as { label: string; url: string }[],
};

// Public editorial content only. Source inventories remain outside this repository.
// Set video only after the owner supplies a public playback URL.
export const projects: Project[] = [
  { slug: 'pieza-audiovisual', title: 'Pieza audiovisual', titleConfirmed: false, poster: 'images/pieza-1920.webp', posterAlt: 'Radiografía de un tórax superpuesta a un paisaje urbano, fotograma de la pieza audiovisual.', role: null, year: null, duration: '00:55', synopsis: null, video: null },
  { slug: 'azul', title: 'Azul', titleConfirmed: false, poster: null, posterAlt: null, role: null, year: null, duration: null, synopsis: null, video: null },
  { slug: 'comezon', title: 'Comezón', titleConfirmed: false, poster: null, posterAlt: null, role: null, year: null, duration: null, synopsis: null, video: null },
  { slug: 'mujer-muneca', title: 'Mujer muñeca', titleConfirmed: false, poster: null, posterAlt: null, role: null, year: null, duration: null, synopsis: null, video: null },
  { slug: 'doble', title: 'Doble', titleConfirmed: false, poster: null, posterAlt: null, role: null, year: null, duration: null, synopsis: null, video: null },
  { slug: 'tallas', title: 'Tallas', titleConfirmed: false, poster: null, posterAlt: null, role: null, year: null, duration: null, synopsis: null, video: null },
];

export const featured = projects[0];

export function localPath(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

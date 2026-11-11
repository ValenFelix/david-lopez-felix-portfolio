export type Video =
  | {
      provider: "local";
      src: string;
      kind: "full" | "preview";
      width: number;
      height: number;
      format?: "mp4" | "hls";
      fallbackPreview?: string;
    }
  | {
      provider: "youtube" | "vimeo" | "drive";
      id: string;
      kind: "full" | "preview";
    };

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
  preview?: string;
  gallery?: string[];
  focalPoint?: string;
}

export const profile = {
  name: "David López Félix",
  biography: "David López Félix es estudiante de cine.",
  email: "david@contacto.com",
  emailProvisional: true,
  socialLinks: [
    { label: "@david.lf12", url: "https://www.instagram.com/david.lf12/" },
  ],
};

// Public editorial content only. Source inventories remain outside this repository.
// Paths refer only to approved web derivatives, never the original movie files.
export const projects: Project[] = [
  {
    slug: "pieza-audiovisual",
    title: "Pieza audiovisual",
    titleConfirmed: false,
    poster: "images/rework/pieza-audiovisual-1280.webp",
    posterAlt:
      "Radiografía de un tórax superpuesta a un paisaje urbano, fotograma de la pieza audiovisual.",
    role: null,
    year: null,
    duration: "00:55",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/pieza-audiovisual-full.mp4",
      kind: "full",
      width: 1280,
      height: 720,
    },
    preview: "media/pieza-audiovisual-preview.mp4",
    gallery: [
      "images/rework/pieza-audiovisual-detail-1-1280.webp",
      "images/rework/pieza-audiovisual-detail-2-1280.webp",
    ],
  },
  {
    slug: "azul",
    title: "Azul",
    titleConfirmed: false,
    poster: "images/rework/azul-1280.webp",
    posterAlt: "Primer plano de un hombre ante una pared de tonos cálidos.",
    role: "Dirección de fotografía",
    year: null,
    duration: "06:38",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/azul-full.mp4",
      kind: "full",
      width: 1280,
      height: 720,
    },
    preview: "media/azul-preview.mp4",
    gallery: [
      "images/rework/azul-detail-1-1280.webp",
      "images/rework/azul-detail-2-1280.webp",
    ],
  },
  {
    slug: "comezon",
    title: "Comezón",
    titleConfirmed: false,
    poster: "images/rework/comezon-1280.webp",
    posterAlt: "Un hombre sentado en una cama frente a la luz de una ventana.",
    role: "Guion y dirección",
    year: null,
    duration: "06:52",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/comezon-full.mp4",
      kind: "full",
      width: 1280,
      height: 720,
    },
    preview: "media/comezon-preview.mp4",
    gallery: [
      "images/rework/comezon-detail-1-1280.webp",
      "images/rework/comezon-detail-2-1280.webp",
    ],
  },
  {
    slug: "mujer-muneca",
    title: "Mujer muñeca",
    titleConfirmed: true,
    poster: "images/rework/mujer-muneca-1280.webp",
    posterAlt: "Una mujer de vestido frente a un tocador con espejo.",
    role: null,
    year: null,
    duration: "05:59",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/mujer-muneca-full.mp4",
      kind: "full",
      width: 1280,
      height: 720,
    },
    preview: "media/mujer-muneca-preview.mp4",
    gallery: [
      "images/rework/mujer-muneca-detail-1-1280.webp",
      "images/rework/mujer-muneca-detail-2-1280.webp",
    ],
  },
  {
    slug: "doble",
    title: "Doble",
    titleConfirmed: false,
    poster: "images/rework/doble-1280.webp",
    posterAlt: "Un teclista con chaqueta azul bajo las luces de un escenario.",
    role: "Codirección de arte · Jefatura de producción",
    year: null,
    duration: "30:41",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/doble-fragment.mp4",
      kind: "preview",
      width: 1280,
      height: 720,
    },
    preview: "media/doble-preview.mp4",
    gallery: [
      "images/rework/doble-detail-1-1280.webp",
      "images/rework/doble-detail-2-1280.webp",
    ],
  },
  {
    slug: "tallas",
    title: "Tallas",
    titleConfirmed: false,
    poster: "images/rework/tallas-1280.webp",
    posterAlt: "Dos hombres sentados en una habitación iluminada tenuemente.",
    role: null,
    year: null,
    duration: "03:13",
    synopsis: null,
    video: {
      provider: "local",
      src: "media/tallas-full.mp4",
      kind: "full",
      width: 1280,
      height: 720,
    },
    preview: "media/tallas-preview.mp4",
    gallery: [
      "images/rework/tallas-detail-1-1280.webp",
      "images/rework/tallas-detail-2-1280.webp",
    ],
  },
];

// Editorial sequence chosen from the inspected imagery, independently of source order.
const editorialOrder = [
  "comezon",
  "azul",
  "mujer-muneca",
  "doble",
  "tallas",
  "pieza-audiovisual",
];
projects.sort(
  (a, b) => editorialOrder.indexOf(a.slug) - editorialOrder.indexOf(b.slug),
);

export function localPath(path = "") {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

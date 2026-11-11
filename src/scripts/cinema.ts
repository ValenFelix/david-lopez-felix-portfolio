import { playbackUrls } from '../lib/video.mjs';

const dialog = document.querySelector<HTMLDialogElement>('.cinema');
const screen = document.querySelector<HTMLDivElement>('.cinema-screen');
const title = document.getElementById('cinema-title');
const status = document.getElementById('cinema-status');
const external = document.querySelector<HTMLAnchorElement>('#cinema-external');
let trigger: HTMLElement | null = null;

if (dialog && screen && title && status && external) {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-film]')) {
    button.addEventListener('click', () => {
      const urls = playbackUrls(button.dataset.provider, button.dataset.video);
      trigger = button;
      screen.replaceChildren();
      title.textContent = button.dataset.title ?? 'Película';
      status.textContent = 'Cargando reproductor…';
      external.href = urls.external;
      external.textContent = `Abrir en ${urls.label} ↗`;
      const iframe = document.createElement('iframe');
      iframe.title = `${button.dataset.title} — ${urls.label}`;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.addEventListener('load', () => {
        status.textContent = 'Si el vídeo no se reproduce, puedes abrirlo en el proveedor.';
      });
      iframe.addEventListener('error', () => {
        status.textContent = 'No se pudo cargar el reproductor. Prueba el enlace al proveedor.';
      });
      iframe.src = urls.embed;
      screen.append(iframe);
      dialog.showModal();
      document.body.classList.add('cinema-open');
      document.getElementById('cinema-close')?.focus();
    });
  }

  document.getElementById('cinema-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    screen.replaceChildren();
    document.body.classList.remove('cinema-open');
    if (document.fullscreenElement === dialog) void document.exitFullscreen();
    trigger?.focus();
  });
  document.getElementById('cinema-fullscreen')?.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await dialog.requestFullscreen();
    } catch {
      status.textContent = 'Usa el botón de pantalla completa del reproductor.';
    }
  });
}

import { playbackUrls } from "../lib/video.mjs";
import type Hls from "hls.js";

const dialog = document.querySelector<HTMLDialogElement>(".cinema");
const screen = document.querySelector<HTMLDivElement>(".cinema-screen");
const title = document.getElementById("cinema-title");
const status = document.getElementById("cinema-status");
const external = document.querySelector<HTMLAnchorElement>("#cinema-external");
let trigger: HTMLButtonElement | null = null;
let activeHls: Hls | null = null;

if (dialog && screen && title && status && external) {
  const clearPlayer = () => {
    activeHls?.destroy();
    activeHls = null;
    const video = screen.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    screen.replaceChildren();
  };

  const setNotice = (media: HTMLElement, message: string) => {
    if (screen.contains(media)) status.textContent = message;
  };

  const playVideo = (video: HTMLVideoElement) => {
    void video.play().catch(() => {
      if (!video.error)
        setNotice(video, "Pulsa reproducir en los controles del vídeo.");
    });
  };

  const showHlsFailure = (
    video: HTMLVideoElement,
    fallbackPreview: string | undefined,
  ) => {
    if (!screen.contains(video)) return;
    status.textContent =
      "La película completa no se pudo reproducir en este navegador.";
    if (fallbackPreview) {
      external.href = fallbackPreview;
      external.textContent = "Ver fragmento en otra pestaña ↗";
      external.hidden = false;
    }
  };

  const loadHls = async (
    video: HTMLVideoElement,
    source: string,
    fallbackPreview: string | undefined,
  ) => {
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      playVideo(video);
      return;
    }
    try {
      const { default: HlsPlayer } = await import("hls.js");
      if (!screen.contains(video)) return;
      if (!HlsPlayer.isSupported()) {
        showHlsFailure(video, fallbackPreview);
        return;
      }
      const hls = new HlsPlayer({
        maxBufferLength: 20,
        maxMaxBufferLength: 30,
        maxBufferSize: 12 * 1024 * 1024,
        backBufferLength: 10,
        startFragPrefetch: false,
      });
      activeHls = hls;
      hls.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
        if (screen.contains(video)) playVideo(video);
      });
      hls.on(HlsPlayer.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        showHlsFailure(video, fallbackPreview);
        hls.destroy();
        if (activeHls === hls) activeHls = null;
      });
      hls.loadSource(source);
      hls.attachMedia(video);
    } catch {
      showHlsFailure(video, fallbackPreview);
    }
  };

  for (const button of document.querySelectorAll<HTMLButtonElement>(
    "[data-film]",
  )) {
    button.hidden = false;
    button.addEventListener("click", () => {
      clearPlayer();
      for (const video of document.querySelectorAll("video")) video.pause();
      trigger = button;
      title.textContent = button.dataset.title ?? "Película";
      status.textContent = "Cargando reproductor…";
      external.hidden = true;
      external.removeAttribute("href");
      dialog.showModal();
      document.body.classList.add("cinema-open");
      document.dispatchEvent(new CustomEvent("cinema:open"));
      document.getElementById("cinema-close")?.focus();

      if (button.dataset.provider === "local") {
        const source = button.dataset.src;
        if (!source) {
          status.textContent = "No hay un archivo de reproducción configurado.";
          return;
        }
        const video = document.createElement("video");
        const isHls = button.dataset.format === "hls";
        video.controls = true;
        video.playsInline = true;
        video.preload = "none";
        video.setAttribute("aria-label", button.dataset.title ?? "Película");
        video.poster = button.dataset.poster ?? "";
        video.width = Number(button.dataset.width) || 1920;
        video.height = Number(button.dataset.height) || 1080;
        video.addEventListener("loadedmetadata", () =>
          setNotice(
            video,
            "Usa los controles para reproducir, avanzar o ajustar el volumen.",
          ),
        );
        video.addEventListener("playing", () =>
          setNotice(
            video,
            button.dataset.kind === "preview"
              ? "Reproduciendo fragmento."
              : "Reproduciendo película.",
          ),
        );
        video.addEventListener("waiting", () =>
          setNotice(video, "Cargando vídeo…"),
        );
        video.addEventListener("error", () => {
          if (isHls) showHlsFailure(video, button.dataset.fallbackPreview);
          else
            setNotice(
              video,
              "No se pudo reproducir el vídeo. Puedes probar el enlace para abrirlo en otra pestaña.",
            );
        });
        screen.append(video);
        if (isHls) {
          void loadHls(video, source, button.dataset.fallbackPreview);
          return;
        }
        video.src = source;
        external.href = source;
        external.textContent = "Abrir vídeo en otra pestaña ↗";
        external.hidden = false;
        playVideo(video);
        return;
      }

      try {
        const urls = playbackUrls(
          button.dataset.provider,
          button.dataset.video,
        );
        const iframe = document.createElement("iframe");
        iframe.title = `${button.dataset.title} — ${urls.label}`;
        iframe.allow =
          "autoplay; fullscreen; picture-in-picture; encrypted-media";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.addEventListener("load", () =>
          setNotice(
            iframe,
            "Si el vídeo no se reproduce, puedes abrirlo en el proveedor.",
          ),
        );
        iframe.addEventListener("error", () =>
          setNotice(
            iframe,
            "No se pudo cargar el reproductor. Prueba el enlace al proveedor.",
          ),
        );
        iframe.src = urls.embed;
        screen.append(iframe);
        external.href = urls.external;
        external.textContent = `Abrir en ${urls.label} ↗`;
        external.hidden = false;
      } catch {
        status.textContent =
          "La configuración de este reproductor no está disponible.";
      }
    });
  }

  document
    .getElementById("cinema-close")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    clearPlayer();
    document.body.classList.remove("cinema-open");
    document.dispatchEvent(new CustomEvent("cinema:close"));
    if (document.fullscreenElement)
      void document.exitFullscreen().catch(() => {});
    trigger?.focus();
  });
  document
    .getElementById("cinema-fullscreen")
    ?.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await dialog.requestFullscreen();
      } catch {
        status.textContent =
          "Usa el botón de pantalla completa del reproductor.";
      }
    });

  window.addEventListener("pagehide", () => {
    clearPlayer();
    if (dialog.open) dialog.close();
    document.body.classList.remove("cinema-open");
  });
}

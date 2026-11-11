const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const connection = (
  navigator as Navigator & { connection?: { saveData?: boolean } }
).connection;
const allowMotion = () => !reduced.matches && !connection?.saveData;

const gate = document.querySelector<HTMLElement>(".projection-gate");
if (gate) {
  const leave = () =>
    document.documentElement.classList.remove("projection-intro");
  gate.querySelector("button")?.addEventListener("click", leave);
  try {
    sessionStorage.setItem("dlf-entered", "1");
  } catch {}
  const image = document.querySelector<HTMLImageElement>(".hero-poster");
  const ready = image?.decode().catch(() => {}) ?? Promise.resolve();
  void ready.then(() => {
    gate.classList.add("gate-opening");
    setTimeout(leave, 900);
  });
  setTimeout(leave, 1800);
}

const menu = document.querySelector<HTMLDialogElement>("#mobile-menu");
const menuTrigger = document.querySelector<HTMLButtonElement>(".menu-toggle");
if (menu && menuTrigger) {
  menuTrigger.addEventListener("click", () => {
    menu.showModal();
    document.body.classList.add("menu-open");
  });
  document
    .getElementById("menu-close")
    ?.addEventListener("click", () => menu.close());
  menu.addEventListener("close", () => {
    document.body.classList.remove("menu-open");
    menuTrigger.focus();
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => menu.close()));
}

const hero = document.querySelector<HTMLVideoElement>(".hero-loop");
const pause = document.querySelector<HTMLButtonElement>(".hero-pause");
let heroInView = true;
let userPaused = false;
if (hero && pause) {
  const play = async () => {
    if (
      !allowMotion() ||
      userPaused ||
      !heroInView ||
      document.hidden ||
      document.querySelector("dialog[open]")
    )
      return;
    if (!hero.src)
      hero.src =
        (matchMedia("(max-width: 700px)").matches
          ? hero.dataset.mobile
          : hero.dataset.desktop) ?? "";
    try {
      await hero.play();
    } catch {
      pause.textContent = "Reproducir imagen ▷";
    }
  };
  hero.addEventListener("playing", () => {
    hero.classList.add("is-playing");
    pause.textContent = "Pausar imagen Ⅱ";
  });
  hero.addEventListener("pause", () => {
    pause.textContent = "Reanudar imagen ▷";
  });
  hero.addEventListener("error", () => {
    hero.classList.remove("is-playing");
    pause.hidden = true;
  });
  pause.hidden = !allowMotion();
  pause.addEventListener("click", () => {
    userPaused = !hero.paused;
    if (userPaused) hero.pause();
    else void play();
  });
  const visibility = new IntersectionObserver(
    (entries) => {
      heroInView = entries[0].isIntersecting;
      if (heroInView) void play();
      else hero.pause();
    },
    { threshold: 0.1 },
  );
  visibility.observe(hero);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hero.pause();
    else void play();
  });
  document.addEventListener("cinema:close", () => {
    void play();
  });
  window.addEventListener("pageshow", () => {
    void play();
  });
  reduced.addEventListener("change", () => {
    pause.hidden = !allowMotion();
    if (!allowMotion()) hero.pause();
    else void play();
  });
  window.addEventListener(
    "load",
    () => {
      void play();
    },
    { once: true },
  );
}

let activePreview: HTMLVideoElement | null = null;
for (const entry of document.querySelectorAll<HTMLElement>(
  "[data-preview-entry]",
)) {
  const video = entry.querySelector<HTMLVideoElement>("video");
  if (!video) continue;
  const start = async () => {
    if (!allowMotion()) return;
    if (activePreview && activePreview !== video) {
      activePreview.pause();
      activePreview.classList.remove("is-playing");
    }
    activePreview = video;
    if (!video.src) video.src = video.dataset.src ?? "";
    try {
      await video.play();
      video.classList.add("is-playing");
    } catch {
      video.classList.remove("is-playing");
    }
  };
  const stop = () => {
    video.pause();
    video.classList.remove("is-playing");
  };
  entry.addEventListener("mouseenter", () => {
    if (matchMedia("(hover: hover)").matches) void start();
  });
  entry.addEventListener("mouseleave", stop);
  entry.addEventListener("focusin", () => {
    void start();
  });
  entry.addEventListener("focusout", stop);
  video.addEventListener("error", stop);
}

if (!reduced.matches && "IntersectionObserver" in window) {
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.animate(
          [
            { opacity: 0.45, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 550, easing: "cubic-bezier(.2,.7,.3,1)" },
        );
        reveal.unobserve(entry.target);
      }
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((element) => reveal.observe(element));
  window.addEventListener("pagehide", () => reveal.disconnect());
}
const pauseAll = () =>
  document.querySelectorAll("video").forEach((video) => video.pause());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseAll();
});
window.addEventListener("pagehide", () => {
  pauseAll();
  menu?.close();
  document.body.classList.remove("menu-open", "cinema-open");
});

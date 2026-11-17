const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const connection = (
  navigator as Navigator & { connection?: { saveData?: boolean } }
).connection;
const allowMotion = () => !reduced.matches && !connection?.saveData;

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
const pauseButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-hero-pause]",
);
const motionSettings = document.querySelectorAll<HTMLElement>(
  "[data-motion-settings]",
);
let heroInView = true;
let userPaused = false;
if (hero && pauseButtons.length) {
  let heroFailed = false;
  const syncControls = () => {
    for (const settings of motionSettings)
      settings.hidden = !allowMotion() || heroFailed;
    for (const button of pauseButtons) {
      button.textContent = userPaused ? "Reanudar movimiento" : "Pausar movimiento";
      button.setAttribute("aria-pressed", String(userPaused));
    }
  };
  const play = async () => {
    if (
      !allowMotion() ||
      heroFailed ||
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
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError")
        userPaused = true;
      syncControls();
    }
  };
  hero.addEventListener("playing", () => {
    hero.classList.add("is-playing");
    syncControls();
  });
  hero.addEventListener("error", () => {
    hero.classList.remove("is-playing");
    heroFailed = true;
    syncControls();
  });
  syncControls();
  for (const button of pauseButtons) {
    button.addEventListener("click", () => {
      userPaused = !userPaused;
      if (menu?.open) menu.close();
      const options = button.closest("details");
      if (options) {
        options.open = false;
        options.querySelector("summary")?.focus();
      }
      if (userPaused) hero.pause();
      else void play();
      syncControls();
    });
  }
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
    syncControls();
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
const previewVisibility = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) continue;
    const video = entry.target.querySelector("video");
    video?.pause();
    video?.classList.remove("is-playing");
  }
});
for (const entry of document.querySelectorAll<HTMLElement>(
  "[data-preview-entry]",
)) {
  const video = entry.querySelector<HTMLVideoElement>("video");
  if (!video) continue;
  const start = async () => {
    if (!allowMotion() || document.hidden) return;
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
  previewVisibility.observe(entry);
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

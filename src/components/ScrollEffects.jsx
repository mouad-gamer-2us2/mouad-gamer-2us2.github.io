import { useEffect, useState } from "react";

/** Native scrolling: no wheel interception or scroll-position manipulation. */
export function useHeroScroll(ref) {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const pin = element.querySelector(".hero-pin");
      const inset = parseFloat(getComputedStyle(pin).top) || 0;
      const range = element.offsetHeight - pin.offsetHeight;
      const progress = query.matches
        ? 0
        : Math.max(
            0,
            Math.min(
              1,
              (inset - element.getBoundingClientRect().top) /
                Math.max(1, range),
            ),
          );
      element.style.setProperty("--hero-progress", progress);
      element.style.setProperty("--hero-shrink", Math.min(1, progress / 0.72));
      element.dataset.compact = progress > 0.25 ? "true" : "false";
      setSmall(progress >= 0.72);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    query.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", schedule);
    };
  }, [ref]);
  return small;
}

export default function ScrollEffects() {
  useEffect(() => {
    const chapters = [...document.querySelectorAll("main > section")].filter(
      (e) => !["accueil", "moments", "facettes"].includes(e.id),
    );
    const palette = [
      [11, 17, 27],
      [15, 27, 31],
      [17, 25, 38],
      [13, 29, 30],
      [16, 23, 36],
      [12, 29, 27],
      [11, 17, 27],
    ];
    let frame = 0;
    function update() {
      frame = 0;
      let color = palette[0];
      chapters.forEach((section, i) => {
        const progress = Math.max(
          0,
          Math.min(
            1,
            (innerHeight - section.getBoundingClientRect().top) / innerHeight,
          ),
        );
        const next = palette[i % palette.length];
        color = color.map(
          (value, channel) => value + (next[channel] - value) * progress,
        );
      });
      document.body.style.backgroundColor = `rgb(${color.join(",")})`;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      document.body.style.removeProperty("background-color");
    };
  }, []);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const selector =
      ".section-heading, .intro-layout, .timeline-item, .skill-card, .project-card, .certificate-card, .contact-panel";
    function register() {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.dataset.scrollReveal) return;
        const siblings = [...element.parentElement.children];
        element.style.setProperty(
          "--reveal-delay",
          `${Math.max(0, siblings.indexOf(element) % 3) * 70}ms`,
        );
        element.dataset.scrollReveal = "pending";
        observer.observe(element);
      });
    }
    function setup() {
      observer?.disconnect();
      document
        .querySelectorAll("[data-scroll-reveal]")
        .forEach((element) => element.removeAttribute("data-scroll-reveal"));
      if (query.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
              target.dataset.scrollReveal = "visible";
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -25px 0px" },
      );
      register();
    }
    setup();
    const mutations = new MutationObserver(() => {
      if (!query.matches && observer) register();
    });
    mutations.observe(document.querySelector("main"), {
      childList: true,
      subtree: true,
    });
    query.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      query.removeEventListener("change", setup);
      document
        .querySelectorAll("[data-scroll-reveal]")
        .forEach((element) => element.removeAttribute("data-scroll-reveal"));
    };
  }, []);
  return null;
}

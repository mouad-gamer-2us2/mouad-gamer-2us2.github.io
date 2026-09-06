import { useEffect } from "react";

/** Native scrolling: no wheel interception or scroll-position manipulation. */
export function useHeroScroll(ref) {
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
}

export default function ScrollEffects() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const selector =
      ".section-heading, .intro-layout, .timeline-item, .skill-card, .project-card, .certificate-card";
    function register() {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.dataset.scrollReveal) return;
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

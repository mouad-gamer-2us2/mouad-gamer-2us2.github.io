import { useT } from "../i18n/Language";
import { useEffect, useRef, useState } from "react";
import { ScanFace, LockKeyhole, Pause, Play } from "lucide-react";
import { profile } from "../data/profile";
import { asset } from "./UI";
import { createPortraitRenderer } from "./portraitRenderer";

/** Local organic reveal with keyboard/touch controls and a non-WebGL fallback. */
export default function PortraitReveal({ suspended = false }) {
  const t = useT();

  const canvasRef = useRef(null);
  const engine = useRef({
    x: 0.5,
    y: 0.45,
    active: false,
    pinned: false,
    full: false,
    draw: () => {},
  });
  const [pinned, setPinned] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const renderer = createPortraitRenderer(
      canvasRef.current,
      [asset(profile.photo), asset(profile.photoAlternative)],
      () => setFallback(true),
    );
    if (!renderer) return;
    engine.current = {
      ...renderer.state,
      draw: () => {
        Object.assign(renderer.state, engine.current);
        renderer.draw();
      },
    };
    return () => renderer.dispose();
  }, []);
  useEffect(() => {
    engine.current.suspended = suspended;
    engine.current.active = false;
    engine.current.lastInput = performance.now();
    engine.current.draw();
  }, [suspended]);
  function move(event) {
    const state = engine.current;
    if (suspended || event.pointerType === "touch" || state.pinned) return;
    state.lastInput = performance.now();
    const bounds = event.currentTarget.getBoundingClientRect();
    state.x = (event.clientX - bounds.left) / bounds.width;
    state.y = (event.clientY - bounds.top) / bounds.height;
    state.active = true;
    state.full = false;
    state.draw();
  }
  function toggle(event) {
    const state = engine.current;
    state.lastInput = performance.now();
    state.pinned = !state.pinned;
    state.full =
      event.detail === 0 ||
      event.nativeEvent.pointerType === "touch" ||
      matchMedia("(hover: none)").matches;
    if (state.full) {
      state.x = 0.5;
      state.y = 0.5;
    }
    state.active = state.pinned;
    setPinned(state.pinned);
    state.draw();
  }
  return (
    <>
      <button
        type="button"
        disabled={suspended}
        className="portrait-stage"
        data-fallback={fallback}
        data-pinned={pinned}
        aria-label={t(
          `Portrait interactif de ${profile.name} : figer la révélation cybersécurité`,
        )}
        aria-pressed={pinned}
        aria-describedby="portrait-instructions"
        onPointerEnter={move}
        onPointerMove={move}
        onPointerLeave={() => {
          engine.current.active = false;
          engine.current.draw();
        }}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            Object.assign(engine.current, {
              lastInput: performance.now(),
              pinned: false,
              active: false,
              full: false,
            });
            setPinned(false);
            engine.current.draw();
          }
        }}
      >
        <img
          className="portrait-fallback"
          src={asset(profile.photo)}
          width="1086"
          height="1448"
          alt={t(`Portrait de ${profile.name}`)}
          fetchPriority="high"
        />
        {fallback && (
          <img
            className="portrait-fallback alternative-fallback"
            src={asset(profile.photoAlternative)}
            width="1086"
            height="1448"
            alt={""}
            aria-hidden="true"
          />
        )}
        <canvas ref={canvasRef} aria-hidden="true" />
      </button>
      {!fallback && !suspended && (
        <button
          type="button"
          className="scene-auto-toggle"
          aria-label={t(
            paused
              ? "Activer l’animation automatique"
              : "Mettre en pause l’animation automatique",
          )}
          onClick={() => {
            engine.current.paused = !paused;
            engine.current.lastInput = performance.now();
            engine.current.active = false;
            setPaused(!paused);
            engine.current.draw();
          }}
        >
          {paused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          <span>
            {t(paused ? "Animation en pause" : "Animation automatique")}
          </span>
        </button>
      )}
      <div className="scene-interaction" id="portrait-instructions">
        {pinned ? (
          <LockKeyhole size={16} aria-hidden="true" />
        ) : (
          <ScanFace size={16} aria-hidden="true" />
        )}
        <span className="hover-instructions">
          {t(
            pinned
              ? "Révélation figée · Cliquez pour libérer"
              : "Déplacez la souris · Cliquez pour figer",
          )}
        </span>
        <span className="touch-instructions">
          {t("Touchez pour changer de facette")}
        </span>
        <span className="sr-only">
          {t(
            "Entrée ou Espace change de version. Échap rétablit le portrait original.",
          )}
        </span>
      </div>
    </>
  );
}

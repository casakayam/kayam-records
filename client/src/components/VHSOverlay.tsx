import { useEffect, useRef, useCallback, useState } from "react";

/*
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  VHS OVERLAY — Kayam Project                                ║
 * ║  Composant React reproduisant fidèlement le rendu visuel    ║
 * ║  d'une bande VHS sur écran cathodique.                      ║
 * ║                                                             ║
 * ║  Usage : envelopper le contenu à "salir"                    ║
 * ║  <VHSOverlay><MonContenu /></VHSOverlay>                    ║
 * ║                                                             ║
 * ║  Props optionnelles :                                       ║
 * ║  - intensity (0-1) : intensité globale, défaut 0.6          ║
 * ║  - scanlines (bool) : lignes de balayage, défaut true       ║
 * ║  - snow (bool) : bruit lumineux, défaut true                ║
 * ║  - jitter (bool) : tremblement vertical, défaut true        ║
 * ║  - colorBleed (bool) : saignement chromatique, défaut true  ║
 * ║  - tracking (bool) : barre de tracking, défaut true         ║
 * ║  - dropouts (bool) : décrochages aléatoires, défaut true    ║
 * ║  - rgbShift (bool) : décalage RGB, défaut true              ║
 * ║  - vignette (bool) : assombrissement bords, défaut true     ║
 * ║  - flickering (bool) : scintillement luminosité, défaut true║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface VHSOverlayProps {
  children: React.ReactNode;
  intensity?: number;
  scanlines?: boolean;
  snow?: boolean;
  jitter?: boolean;
  colorBleed?: boolean;
  tracking?: boolean;
  dropouts?: boolean;
  rgbShift?: boolean;
  vignette?: boolean;
  flickering?: boolean;
}

const DEFAULT_PROPS = {
  intensity: 0.3,
  scanlines: true,
  snow: true,
  jitter: true,
  colorBleed: true,
  tracking: true,
  dropouts: true,
  rgbShift: true,
  vignette: true,
  flickering: true,
};

export default function VHSOverlay(props: VHSOverlayProps) {
  const config = { ...DEFAULT_PROPS, ...props };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const trackingOffsetRef = useRef(0);
  const dropoutRef = useRef({ active: false, y: 0, h: 0, timer: 0 });
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);
  const triggerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // ── Snow / grain canvas ──
  const drawSnow = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, intensity: number) => {
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    const density = 0.08 * intensity;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < density) {
        const brightness = Math.random() * 255;
        data[i] = brightness;
        data[i + 1] = brightness * (0.8 + Math.random() * 0.4);
        data[i + 2] = brightness * (0.7 + Math.random() * 0.6);
        data[i + 3] = Math.random() * 180 * intensity;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  // ── Tracking bar ──
  const drawTrackingBar = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, frame: number, intensity: number) => {
    trackingOffsetRef.current += 0.4 + Math.random() * 0.8;
    if (trackingOffsetRef.current > h + 100) trackingOffsetRef.current = -100;

    const renderBar = (offset: number, height: number, alpha: number) => {
      const wobble = Math.sin(frame * 0.1 + offset) * 8;
      ctx.save();
      ctx.globalAlpha = alpha * intensity;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.3})`;
      ctx.fillRect(0, offset + wobble, w, height);
      for (let i = 0; i < 8; i++) {
        const ly = offset + wobble + Math.random() * height;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
        ctx.fillRect(0, ly, w, Math.random() * 2 + 1);
      }
      ctx.restore();
    };

    const barY = trackingOffsetRef.current;
    renderBar(barY, 15 + Math.random() * 20, 0.6);
    if (Math.random() > 0.85) renderBar(Math.random() * h, 2, 0.8);
  }, []);

  // ── Dropout glitch ──
  const drawDropout = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, intensity: number) => {
    const d = dropoutRef.current;
    d.timer--;

    if (!d.active && Math.random() < 0.017) {
      d.active = true;
      d.y = Math.random() * h;
      d.h = 3 + Math.random() * 10;
      d.timer = 4 + Math.floor(Math.random() * 10);
    }

    if (d.active && d.timer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.6 * intensity;
      const shift = (Math.random() - 0.5) * 30;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`;
      ctx.fillRect(shift, d.y, w, d.h);
      for (let x = 0; x < w; x += 2) {
        if (Math.random() < 0.3) {
          ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${0.3 * intensity})`;
          ctx.fillRect(x, d.y + Math.random() * d.h, 2, 1);
        }
      }
      ctx.restore();
    } else {
      d.active = false;
    }
  }, []);

  // ── Unified rAF loop ──
  // Canvas throttled to ~12fps (every 5 frames) — snow grain is imperceptible above 12fps.
  // Jitter/flicker written directly to DOM via ref — zero React re-renders.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const CANVAS_INTERVAL = 5;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      frameRef.current++;
      const frame = frameRef.current;
      const i = config.intensity;

      // Canvas redraws at ~12fps
      if (frame % CANVAS_INTERVAL === 0) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        if (config.snow) drawSnow(ctx, w, h, i);
        if (config.tracking && isScrollingRef.current) drawTrackingBar(ctx, w, h, frame, i);
        if (config.dropouts) drawDropout(ctx, w, h, i);
        if (Math.random() < 0.02 * i) {
          ctx.save();
          ctx.globalAlpha = 0.25 * i;
          ctx.fillStyle = "white";
          ctx.fillRect(0, Math.random() * h, w, 1 + Math.random() * 3);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [config.intensity, config.snow, config.tracking, config.dropouts, config.jitter, config.flickering, drawSnow, drawTrackingBar, drawDropout]);

  // ── Video playing listener — disables all effects during video playback ──
  useEffect(() => {
    const handler = (e: Event) => setVideoPlaying((e as CustomEvent).detail.playing);
    window.addEventListener('kayam-video', handler);
    return () => window.removeEventListener('kayam-video', handler);
  }, []);

  // ── Scroll listener ──
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      accumulatedDelta += delta;
      lastScrollY = currentScrollY;

      // Only trigger if we've scrolled more than 180px (ignores micro-movements)
      if (accumulatedDelta > 180) {
        if (!hasTriggeredRef.current) {
          isScrollingRef.current = true;
          hasTriggeredRef.current = true;
          if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
          triggerTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        }
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        hasTriggeredRef.current = false;
        isScrollingRef.current = false;
        accumulatedDelta = 0; // Reset when scrolling completely stops
      }, 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  // ── Keyframe injection ──
  // vhs-filter-shift replaces JS Math.random() drop-shadow — runs on GPU compositor thread.
  useEffect(() => {
    const styleId = "vhs-overlay-keyframes";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes vhs-scanline-scroll {
        0% { background-position: 0 0; }
        100% { background-position: 0 4px; }
      }
      @keyframes vhs-rgbshift {
        0%, 100% { text-shadow: -0.5px 0 rgba(255,0,0,0.075), 0.5px 0 rgba(0,255,255,0.075); }
        25% { text-shadow: -1px 0 rgba(255,0,0,0.1), 1px 0 rgba(0,255,255,0.1); }
        50% { text-shadow: -0.5px 0 rgba(255,0,0,0.05), 0.5px 0 rgba(0,255,255,0.05); }
        75% { text-shadow: -1.5px 0 rgba(255,0,0,0.125), 1px 0 rgba(0,255,255,0.125); }
      }
      @keyframes vhs-filter-shift {
        0%   { filter: drop-shadow(-0.5px 0 rgba(255,0,0,0.1)) drop-shadow(0.5px 0 rgba(0,255,255,0.1)); }
        25%  { filter: drop-shadow(-1px 0 rgba(255,0,0,0.1)) drop-shadow(0px 0 rgba(0,255,255,0.1)); }
        50%  { filter: drop-shadow(0px 0 rgba(255,0,0,0.05)) drop-shadow(1px 0 rgba(0,255,255,0.1)); }
        75%  { filter: drop-shadow(0.5px 0 rgba(255,0,0,0.1)) drop-shadow(-0.5px 0 rgba(0,255,255,0.075)); }
        100% { filter: drop-shadow(-0.5px 0 rgba(255,0,0,0.1)) drop-shadow(0.5px 0 rgba(0,255,255,0.1)); }
      }
      @keyframes vhs-jitter {
        0% { transform: translateY(0px); opacity: 1; }
        20% { transform: translateY(-0.25px); opacity: 0.995; }
        40% { transform: translateY(0.25px); opacity: 0.99; }
        60% { transform: translateY(-0.1px); opacity: 0.995; }
        80% { transform: translateY(0.1px); opacity: 0.985; }
        100% { transform: translateY(0px); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  const i = config.intensity;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* rgbShift & jitter via CSS animation (GPU compositor) */}
      <div
        id="vhs-content-wrapper"
        style={{
          position: "relative",
          willChange: "transform, opacity, filter",
          animation: [
            config.rgbShift && !videoPlaying ? "vhs-filter-shift 0.4s steps(4) infinite" : "",
            (config.jitter || config.flickering) && !videoPlaying ? "vhs-jitter 0.15s linear infinite" : ""
          ].filter(Boolean).join(", ") || undefined,
        }}
      >
        {props.children}
      </div>

      {/* ── Fixed Overlays (Scanlines, Snow, Tracking) — hidden during video playback ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: videoPlaying ? 0 : 1, transition: "opacity 0.3s ease" }}>
        {config.scanlines && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 5px,
                rgba(0, 0, 0, ${0.018 * i}) 5px,
                rgba(0, 0, 0, ${0.018 * i}) 6px
              )`,
              animation: "vhs-scanline-scroll 0.2s linear infinite",
            }}
          />
        )}

        {config.colorBleed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: `inset ${3 * i}px 0 ${6 * i}px rgba(255, 0, 0, ${0.1 * i}),
                           inset ${-3 * i}px 0 ${6 * i}px rgba(0, 255, 255, ${0.1 * i})`,
              mixBlendMode: "screen",
            }}
          />
        )}

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            mixBlendMode: "screen",
          }}
        />

        {config.vignette && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center,
                transparent 40%,
                rgba(0, 0, 0, ${0.2 * i}) 60%,
                rgba(0, 0, 0, ${0.4 * i}) 80%,
                rgba(0, 0, 0, ${0.8 * i}) 100%)`,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: `inset 0 0 ${120 * i}px rgba(0, 0, 0, ${0.25 * i})`,
          }}
        />
      </div>
    </div>
  );
}

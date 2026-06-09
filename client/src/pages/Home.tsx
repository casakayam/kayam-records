/*
  KAYAM RECORDS - Landing Page
  Hero + Header are eagerly loaded (above fold, critical for FCP).
  All below-fold sections are lazy-loaded via React.lazy + Suspense
  to reduce the initial JS bundle parsed before first paint.
*/

import { useRef, lazy, Suspense, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScroll, useTransform, motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useLanguage } from "@/contexts/LanguageContext";
import { KP } from "@/components/Hero";

// Below-fold sections — split into separate chunks, loaded on demand
const WhyChoosingKayam = lazy(() => import("@/components/WhyChooseKayamSection"));
const Services         = lazy(() => import("@/components/Services"));
const Accommodation    = lazy(() => import("@/components/Accommodation"));
const Testimonials     = lazy(() => import("@/components/Testimonials"));
const BuildPackage     = lazy(() => import("@/components/BuildPackage"));

const VIDEO_ID = 'JyD7IEUQ-dE';
const VIDEO_THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/sddefault.jpg`;
const VIDEO_EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;

function ParallaxWatermark({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 250]);

  return (
    <div ref={wrapperRef} className="relative" style={{ backgroundColor: '#fbf9f4' }}>
      <motion.div style={{ y: watermarkY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%] opacity-[0.06]"
          style={{
            backgroundImage: `url('/assets/guatape-watermark_84fabcb5.png')`,
            backgroundSize: '100% auto',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>
      {children}
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = () => {
    setVideoOpen(true);
    window.dispatchEvent(new CustomEvent('kayam-video', { detail: { playing: true } }));
  };

  const closeVideo = () => {
    setVideoOpen(false);
    window.dispatchEvent(new CustomEvent('kayam-video', { detail: { playing: false } }));
  };

  useEffect(() => {
    const handler = () => openVideo();
    window.addEventListener('kayam-video-open', handler);
    return () => window.removeEventListener('kayam-video-open', handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e4e2dd' }}>
      <Header />

      <main>
        {/* Above fold — eager */}
        <ParallaxWatermark><Hero /></ParallaxWatermark>

        {/* Video bridge — straddles Hero and WhyChoosingKayam */}
        <div style={{ position: 'relative', zIndex: 10, marginTop: -72, marginBottom: -72, padding: '0 calc(clamp(24px, 4vw, 56px) + 150px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={openVideo}
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: 10,
              overflow: 'hidden',
              aspectRatio: '16/9',
              boxShadow: '0 40px 100px rgba(10,10,10,0.45)',
              maxWidth: 1320,
              margin: '0 auto',
            }}
          >
            <img
              src={VIDEO_THUMB}
              alt="Kayam Records studio tour video in Guatapé, Colombia"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none" style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
                <rect width="80" height="56" rx="12" fill="#FF0000"/>
                <path d="M54 28L32 16V40L54 28Z" fill="white"/>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Below fold — lazy, null fallback: sections invisible until scrolled to */}
        <Suspense fallback={null}>
          <div className="relative" style={{ backgroundColor: '#e4e2dd', paddingTop: 72 }}>
            <WhyChoosingKayam />
          </div>
        </Suspense>

        <Suspense fallback={null}>
          <ParallaxWatermark><Services /></ParallaxWatermark>
        </Suspense>

        <Suspense fallback={null}>
          <div style={{ backgroundColor: '#e4e2dd' }}>
            <Accommodation />
          </div>
        </Suspense>

        <Suspense fallback={null}>
          <div style={{ backgroundColor: '#e4e2dd', paddingTop: 80 }}>
            <Testimonials />
          </div>
        </Suspense>

        <Suspense fallback={null}>
          <BuildPackage />
        </Suspense>
      </main>

      {/* Video modal — portal to document.body bypasses VHSOverlay CSS filter stacking context */}
      {videoOpen && createPortal(
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={closeVideo}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeVideo(); }}
            style={{ position: 'absolute', top: 20, right: 24, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: "'Akshar', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 30, background: 'transparent' }}
          >
            Close ✕
          </button>
          <div
            style={{ width: '100%', maxWidth: 960, aspectRatio: '16/9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={VIDEO_EMBED}
              title="Kayam Records Studio"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>,
        document.body
      )}

      {/* Footer — inline, no separate chunk needed */}
      <footer style={{ background: '#1a1a1a', padding: '48px 0 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <img
              src="/assets/logo-kayam-new.png"
              loading="lazy"
              style={{ height: 40, width: 40, objectFit: 'contain' }}
              alt="Kayam Records logo"
            />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, letterSpacing: '0.14em', color: '#e4e2dd' }}>KAYAM</div>
              <div style={{ fontFamily: "'Allura', cursive", color: '#e63f0a', marginTop: -2, lineHeight: 1, fontSize: 18 }}>records</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
            {(language === 'en' ? ['Services', 'Accommodation', 'Booking'] : ['Servicios', 'Alojamiento', 'Reservar']).map((item, idx) => {
              const ids = ['services', 'accommodation', 'booking'];
              return (
                <a
                  key={item}
                  href={`#${ids[idx]}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(ids[idx])?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ fontFamily: "'Akshar', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(228,226,221,0.6)', textDecoration: 'none', transition: 'color 220ms' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e63f0a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(228,226,221,0.6)'; }}
                >{item}</a>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid rgba(228,226,221,0.12)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(228,226,221,0.4)' }}>
              © 2024 Kayam Records · Guatapé, Antioquia
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(228,226,221,0.4)' }}>
              06°13'N · 75°09'W
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

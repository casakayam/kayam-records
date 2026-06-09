/*
  KAYAM RECORDS — Header (from archive)
  Fixed header with logo, nav, booking pill, lang toggle, CTA
*/

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const KP = {
  orange: '#e63f0a',
  orangeWarm: '#e6740a',
  beige: '#e4e2dd',
  cream: '#f1efe9',
  forest: '#074242',
  ink: '#1a1a1a',
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const lang = language === 'en' ? 'EN' : 'ES';

  const items: [string, string][] = language === 'en' ? [
    ['services', 'Services'],
    ['accommodation', 'Accommodation'],
    ['testimonials', 'Testimonials'],
    ['booking', 'Contact'],
  ] : [
    ['services', 'Servicios'],
    ['accommodation', 'Alojamiento'],
    ['testimonials', 'Testimonios'],
    ['booking', 'Contacto'],
  ];

  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      const diff = y - lastY;
      // Ignore sub-pixel jitter from momentum scroll / mobile URL-bar shifts.
      if (Math.abs(diff) >= 4) {
        if (y < 80 || diff < 0) setIsVisible(true);
        else setIsVisible(false);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string, highlightJerome = false) => {
    const targetId = highlightJerome ? 'booking' : id;
    
    // Close the menu immediately
    setMobileOpen(false);

    // Defer the scroll calculation and execution so the browser doesn't interrupt the smooth scroll
    // during the menu's closing animation (common bug on Android Chrome).
    setTimeout(() => {
      const el = document.getElementById(targetId);
      
      if (el) {
        const headerHeight = 84; 
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;

        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } catch (e) {
          window.scrollTo(0, offsetPosition);
        }

        window.history.pushState(null, '', '#' + targetId);
        
        // Dispatch event with specific detail to trigger highlight only if requested
        window.dispatchEvent(new CustomEvent('sectionChange', { 
          detail: highlightJerome ? 'call-jerome' : targetId 
        }));
      } else {
        // Fallback if component is still lazy loading
        window.location.hash = targetId;
      }
    }, 300); // 300ms is enough for the menu exit animation to mostly finish
  };

  return createPortal(
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0, right: 0,
      zIndex: 50,
      padding: '18px clamp(20px, 3.2vw, 48px)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(16px, 2.4vw, 32px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      background: scrolled ? 'rgba(228,226,221,0.92)' : 'rgba(228,226,221,0.85)',
      backdropFilter: 'blur(12px)',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms',
      willChange: 'transform',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
        <img src="/assets/logo-kayam-new-small.png"
          width={96} height={96}
          style={{ height: 48, width: 48, objectFit: 'contain' }} alt="Kayam Records logo" />
        <div style={{ lineHeight: 1 }}>
          <div style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 15, letterSpacing: '0.14em',
            color: KP.ink,
          }}>KAYAM</div>
          <div style={{
            fontFamily: "'Allura', cursive",
            color: KP.orange,
            marginTop: -2, lineHeight: 1, fontSize: 17,
          }}>records</div>
        </div>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex" style={{ gap: 24, marginLeft: 8 }}>
        {items.map(([k, label]) => (
          <a key={k}
            href={`#${k}`}
            onClick={(e) => { 
              e.preventDefault(); 
              scrollTo(k, k === 'booking'); // Highlight only for 'Contact' (which is 'booking' in items)
            }}
            onMouseEnter={() => setHovered(k)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontFamily: "'Akshar', sans-serif",
              fontWeight: 600, fontSize: 12,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: hovered === k ? KP.orange : KP.ink,
              textDecoration: 'none',
              transition: 'color 220ms cubic-bezier(0.2,0.7,0.2,1)',
              position: 'relative',
              paddingBottom: 2,
            }}>
            {label}
            <span style={{
              position: 'absolute', left: 0, right: 0, bottom: -2, height: 1,
              background: KP.orange,
              transform: hovered === k ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 280ms cubic-bezier(0.2,0.7,0.2,1)',
            }} />
          </a>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, alignItems: 'center' }}>
        {/* Booking pill — hidden below xl */}
        <div className="hidden xl:flex" style={{
          alignItems: 'center', gap: 8,
          padding: '7px 12px 7px 10px',
          border: '1px solid rgba(0,0,0,0.14)',
          borderRadius: 999,
          background: 'rgba(241,239,233,0.6)',
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
        }}>
          <span className="animate-pulse" style={{
            width: 7, height: 7, borderRadius: 999,
            background: KP.orange,
            boxShadow: '0 0 0 3px rgba(230,63,10,0.18)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#8a857a',
          }}>Next</span>
          <span style={{
            fontFamily: "'Akshar', sans-serif", fontSize: 12, fontWeight: 600,
            color: KP.ink, letterSpacing: '0.02em',
          }}>Feb 15 · 10:00</span>
        </div>

        {/* Language toggle */}
        <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="hidden sm:flex"
          style={{
            alignItems: 'center', gap: 4,
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            letterSpacing: '0.18em', color: KP.ink,
            padding: '8px 4px',
          }}>
          <span style={{ color: lang === 'EN' ? KP.orange : KP.ink }}>EN</span>
          <span style={{ color: 'rgba(0,0,0,0.3)' }}>/</span>
          <span style={{ color: lang === 'ES' ? KP.orange : KP.ink }}>ES</span>
        </button>

        {/* CTA */}
        <button
          className="hidden lg:inline-flex"
          onClick={() => scrollTo('booking', false)} // NO highlight for 'Book a session'
          style={{
            fontFamily: "'Akshar', sans-serif",
            fontWeight: 600, fontSize: 13,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '14px 24px', borderRadius: 4, border: 'none',
            background: KP.orange, color: KP.beige,
            cursor: 'pointer', alignItems: 'center', gap: 10,
            boxShadow: '0 2px 6px rgba(10,10,10,0.10)',
            transition: 'background 220ms, box-shadow 220ms',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = KP.orangeWarm;
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(230,63,10,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = KP.orange;
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(10,10,10,0.10)';
          }}
        >{language === 'en' ? 'Book a session' : 'Reservar sesión'}</button>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'transparent', border: 'none', padding: 8, color: KP.ink }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: KP.beige, overflow: 'hidden',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '16px 24px 24px' }}>
              {items.map(([k, label]) => (
                <a key={k} href={`#${k}`}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollTo(k, k === 'booking'); 
                  }}
                  style={{
                    display: 'block', padding: '12px 0',
                    fontFamily: "'Akshar', sans-serif", fontWeight: 600,
                    fontSize: 16, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: KP.ink, textDecoration: 'none', cursor: 'pointer',
                  }}
                >{label}</a>
              ))}
              <button
                onClick={() => scrollTo('booking', false)}
                style={{
                  marginTop: 16, width: '100%',
                  fontFamily: "'Akshar', sans-serif", fontWeight: 600, fontSize: 13,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '14px 24px', borderRadius: 4, border: 'none',
                  background: KP.orange, color: KP.beige, cursor: 'pointer',
                }}
              >{language === 'en' ? 'Book a session' : 'Reservar sesión'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>,
    document.body,
  );
}

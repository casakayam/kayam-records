/*
  KAYAM RECORDS — Hero Section (from archive hero.jsx)
  Split layout: left copy + right studio photo
  Colors: beige bg, orange #e63f0a, forest #074242, ink #1a1a1a
  Typography: Anton display, Allura script, Akshar body, DM Mono details
*/

import { useState } from "react";
import { motion } from "framer-motion";
import StudioPhoto from "./StudioPhoto";
import { useLanguage } from "@/contexts/LanguageContext";

export const KP = {
  orange: '#e63f0a',
  orangeWarm: '#e6740a',
  terracotta: '#ad410c',
  beige: '#e4e2dd',
  cream: '#f1efe9',
  taupe: '#bbb3a0',
  forest: '#074242',
  teal: '#0d6969',
  tealLight: '#0c8686',
  ink: '#1a1a1a',
  magenta: '#8a1e3c',
};

/* Shared primitives */
export function Eyebrow({ children, color = '#f1efe9', style }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}>{children}</span>
  );
}

export function Display({ children, size = 96, color = KP.ink, style, as = 'h1', className }: {
  children: React.ReactNode; size?: number | string; color?: string; style?: React.CSSProperties; as?: React.ElementType; className?: string;
}) {
  const Tag = as;
  return (
    <Tag className={className} style={{
      fontFamily: "'Anton', sans-serif",
      fontSize: size,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color,
      lineHeight: 0.92,
      margin: 0,
      fontWeight: 400,
      ...style,
    } as React.CSSProperties}>{children}</Tag>
  );
}

export function Script({ children, color = '#0a0a0a', size = 53, style }: {
  children: React.ReactNode; color?: string; size?: number | string; style?: React.CSSProperties;
}) {
  return (
    <span style={{
      fontFamily: "'Allura', 'Brittany', cursive",
      fontSize: size,
      color,
      lineHeight: 1,
      fontWeight: 500,
      display: 'inline-block',
      padding: '2px 0px 0px',
      ...style,
    }}>{children}</span>
  );
}

export function Dots({ color = KP.orange, style }: { color?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      height: 4,
      backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.8px)`,
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'left center',
      ...style,
    }} />
  );
}

function ArrowRight({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="square">
      <path d="M2 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </svg>
  );
}

export function Btn({ children, variant = 'primary', onClick, style, iconRight }: {
  children: React.ReactNode; variant?: 'primary' | 'ghost' | 'secondary'; onClick?: () => void; style?: React.CSSProperties; iconRight?: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const base: React.CSSProperties = {
    fontFamily: "'Akshar', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '14px 24px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    transition: 'background 220ms cubic-bezier(0.2,0.7,0.2,1), color 220ms cubic-bezier(0.2,0.7,0.2,1), border-color 220ms',
    whiteSpace: 'nowrap',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: press ? KP.terracotta : hover ? KP.orangeWarm : KP.orange,
      color: KP.beige,
      boxShadow: hover ? '0 8px 20px rgba(230,63,10,0.25)' : '0 2px 6px rgba(10,10,10,0.10)',
    },
    ghost: {
      background: 'transparent',
      color: KP.ink,
      padding: '14px 4px',
      borderRadius: 0,
    },
    secondary: {
      background: hover ? KP.ink : 'transparent',
      color: hover ? KP.beige : KP.ink,
      border: `1.5px solid ${KP.ink}`,
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onClick={onClick}
    >
      {variant === 'ghost' ? (
        <span style={{ position: 'relative', display: 'inline-block' }}>
          {children}
          <span style={{
            position: 'absolute', left: 0, right: 0, bottom: -4, height: 1.5,
            background: hover ? KP.orange : KP.ink,
            transform: hover ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 320ms cubic-bezier(0.2,0.7,0.2,1), background 220ms',
          }} />
        </span>
      ) : children}
      {iconRight}
    </button>
  );
}

/* Floating tags on photo */
function FloatingTag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      padding: '6px 14px',
      borderRadius: 4,
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: KP.beige,
      zIndex: 4,
      backdropFilter: 'blur(4px)',
      ...style,
    }}>{children}</div>
  );
}

/* Photo carousel dots */
function CarouselDots({ current = 0, total = 4 }: { current?: number; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11,
        letterSpacing: '0.14em', color: KP.beige,
      }}>
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        {/* Left arrow */}
        <button style={{
          width: 32, height: 32, borderRadius: 999,
          border: '1px solid rgba(228,226,221,0.4)',
          background: 'rgba(0,0,0,0.3)', color: KP.beige,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(4px)',
          transform: 'scaleX(-1)',
        }}>
          <ArrowRight size={12} color={KP.beige} />
        </button>
        {/* Right arrow */}
        <button style={{
          width: 32, height: 32, borderRadius: 999,
          border: '1px solid rgba(228,226,221,0.4)',
          background: 'rgba(0,0,0,0.3)', color: KP.beige,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(4px)',
        }}>
          <ArrowRight size={12} color={KP.beige} />
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  const { language } = useLanguage();

  const openVideo = () => {
    window.dispatchEvent(new CustomEvent('kayam-video-open'));
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="hero" style={{
        position: 'relative',
        background: '#fbf9f4', // Standard lightest beige for alternation
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        paddingBottom: 80,
        overflow: 'hidden',
      }}>
        {/* Paint splash decorations */}
        <img src="/assets/tache-orange.webp" alt="" loading="lazy" style={{
          position: 'absolute',
          top: -80, left: -120,
          width: 500, height: 500,
          opacity: 0.12,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }} />

        <img src="/assets/tache-forest.webp" alt="" loading="lazy" style={{
          position: 'absolute',
          bottom: -100, right: -150,
          width: 600, height: 600,
          opacity: 0.08,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          transform: 'rotate(45deg)',
        }} />

        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 56px)',
        }}>
          {/* Main grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'stretch',
          }} className="hero-grid">
            {/* Left column — Copy */}
            <div style={{ paddingTop: 26, paddingBottom: 8, marginTop: 2 }}>
              {/* Section number + eyebrow */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
                <span style={{
                  fontFamily: "'Allura', cursive",
                  fontSize: 'clamp(48px, 5vw, 72px)',
                  color: KP.orange,
                  lineHeight: 0.8,
                  WebkitTextStroke: `1px ${KP.forest}`,
                }}>01</span>
                <div style={{ paddingTop: 4 }}>
                  <Eyebrow color={KP.forest}>{language === 'en' ? 'Residency · Studio · Academy' : 'Residencia · Estudio · Academia'}</Eyebrow>
                  <br />
                  <Eyebrow color="#8a857a" style={{ marginTop: 4, display: 'inline-block' }}>
                    Guatapé, Antioquia · Colombia
                  </Eyebrow>
                </div>
              </div>

              {/* Headline */}
              <Display size={'clamp(52px, 7vw, 104px)'} style={{ fontWeight: 500, whiteSpace: 'nowrap' }} className="hero-title-mobile">
                Kayam Records
              </Display>

              {/* Subtitle */}
              <div style={{
                fontFamily: "'Akshar', sans-serif",
                fontSize: 'clamp(14px, 1.4vw, 22px)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#000000',
                marginTop: 12,
              }}>
                {language === 'en' ? 'Residency · Music studio in Guatapé' : 'Residencia · Estudio musical en Guatapé'}
              </div>

              {/* Script tagline */}
              <div style={{ position: 'relative', zIndex: 10, marginTop: 16, transform: 'rotate(-3deg)', transformOrigin: 'left center', display: 'inline-block' }}>
                <motion.div
                  initial={{ clipPath: "inset(-100px 100% -100px -100px)" }}
                  animate={{ clipPath: "inset(-100px -100px -100px -100px)" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  <Script color={KP.forest} size={language === 'en' ? 'clamp(36px, 4.2vw, 64px)' : 'clamp(30px, 3.8vw, 54px)'}>
                    {language === 'en' ? 'Come to record in Paradise' : 'Ven a grabar en el Paraíso'}
                  </Script>
                </motion.div>
              </div>

              {/* Dot rules */}
              <div style={{ display: 'flex', gap: 12, marginTop: 44 }}>
                <Dots color={KP.orange} style={{ width: 120 }} />
                <Dots color={KP.forest} style={{ width: 60 }} />
              </div>

              {/* Description */}
              <p style={{
                fontFamily: "'Akshar', sans-serif",
                fontSize: 'clamp(16px, 1.1vw, 20px)',
                lineHeight: 1.65,
                color: '#333',
                marginTop: 24,
                maxWidth: 600,
              }} className="hero-description">
                {language === 'en'
                  ? <>
                    A professional recording studio inside an artist residency in Guatapé, Colombia.
                    Run by Jérôme Filippi, sound engineer with 15+ years of experience (SAE Institute Paris). <span style={{ color: KP.forest }}>Designed acoustics, professional gear, on-site accommodation.</span> Arrive on Monday with your project, <strong style={{ fontWeight: 500 }}>leave on Friday with a finished EP</strong>
                  </>
                  : <>
                    Un estudio de grabación profesional dentro de una residencia artística en Guatapé, Colombia.
                    Dirigido por Jérôme Filippi, ingeniero de sonido con más de 15 años de experiencia (SAE Institute París). <span style={{ color: KP.forest }}>Acústica diseñada, equipo profesional, alojamiento en el sitio.</span> Llega el lunes con tu proyecto, <strong style={{ fontWeight: 500 }}>sal el viernes con un EP terminado</strong>
                  </>
                }
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 32, flexWrap: 'wrap' }}>
                <motion.div
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                >
                  <Btn variant="primary" onClick={() => {
                    const el = document.getElementById('booking');
                    if (el) {
                      const headerHeight = 84;
                      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - headerHeight - 20;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }} style={{ borderRadius: 4, borderStyle: 'none', background: '#f04517' }}>{language === 'en' ? 'Book a session' : 'Reservar sesión'}</Btn>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                >
                  <Btn variant="ghost" onClick={openVideo}
                    iconRight={
                      <span style={{
                        width: 28, height: 28, borderRadius: 999,
                        border: `1.5px solid ${KP.ink}`,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        marginLeft: 4,
                      }}>
                        <svg width="10" height="12" viewBox="0 0 10 12" fill={KP.ink}>
                          <polygon points="0,0 10,6 0,12" />
                        </svg>
                      </span>
                    }>
                    {language === 'en' ? 'See the studio in 70 seconds' : 'Ver el estudio en 70 segundos'}
                  </Btn>
                </motion.div>
              </div>

            </div>

            {/* Right column — Photo */}
            <div style={{
              position: 'relative',
            }} className="hero-photo">
              <div style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                height: '100%',
                minHeight: 400,
                boxShadow: '0 24px 60px rgba(10,10,10,0.25)',
              }}>
                <StudioPhoto />

                {/* Floating tags */}
                <FloatingTag style={{
                  top: 16, right: 16,
                  background: KP.orange,
                  fontWeight: 700,
                  fontSize: 11,
                }}>Now booking 2026</FloatingTag>

                <FloatingTag style={{
                  top: 56, right: 16,
                  background: KP.forest,
                }}>06°13'N · 75°09'W</FloatingTag>

                {/* Bottom strip */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '14px 20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                  <Eyebrow color="rgba(228,226,221,0.7)" style={{ fontSize: 9 }}>
                    Finca Kayam · Guatapé, Antioquia
                  </Eyebrow>
                  <CarouselDots current={0} total={4} />
                </div>
              </div>

              {/* Floating quote card */}
              <div style={{
                position: 'absolute',
                bottom: -24, left: -32,
                width: 'clamp(220px, 50%, 280px)',
                background: KP.cream,
                borderRadius: 8,
                padding: '20px 20px 16px',
                boxShadow: '0 12px 32px rgba(10,10,10,0.12)',
                zIndex: 5,
              }}>
                {/* Dots */}
                <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                  {[KP.orange, KP.orange, KP.orange, KP.forest, KP.forest].map((c, i) => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: 999, background: c,
                    }} />
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Akshar', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: '#333',
                  fontStyle: 'italic',
                  margin: '0 0 12px',
                }}>
                  {language === 'en'
                    ? '"Recording at Kayam was a transformative experience. The natural surroundings and professional setup created the perfect environment for creativity."'
                    : '"Grabar en Kayam fue una experiencia transformadora. El entorno natural y la configuración profesional crearon el ambiente perfecto para la creatividad."'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{
                    fontFamily: "'Akshar', sans-serif",
                    fontWeight: 700, fontSize: 13,
                    color: KP.ink, textTransform: 'uppercase',
                  }}>Oscar</div>
                  <Eyebrow color="#8a857a">{language === 'en' ? 'Singer-Songwriter' : 'Cantautor'}</Eyebrow>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}

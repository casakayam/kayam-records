/*
  KAYAM RECORDS — Services Section (from archive services-section.jsx)
  3 service cards: Studio, Production, Academy
  illus-records.png bottom-right with parallax
  Dot grid texture top-right
*/

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { KP, Eyebrow, Display, Script, Btn } from "./Hero";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const services = [
  {
    id: 'studio',
    num: '01',
    icon: '/assets/btn-records.webp',
    title: { en: 'Studio Services', es: 'Servicios de Estudio' },
    tagline: { en: 'from tracking to mastering', es: 'de la grabación a la masterización' },
    description: { en: 'Full-service recording, mixing, and mastering. Track in our live room with top notch microphones, mix with experienced engineer, and master for all formats.', es: 'Grabación, mezcla y masterización completa. Graba en nuestra sala con micrófonos de primer nivel, mezcla con ingeniero experimentado y masteriza para todos los formatos.' },
    features: {
      en: [
        'Track — Live room 32m² · vocal booth · condenser & ribbon mics',
        'Mix — Your resident engineer from first take to final balance',
        'Master — Streaming · vinyl · broadcast · all formats',
        'Grow — Production coaching and arrangement sessions available during your stay',
      ],
      es: [
        'Grabación — Sala de 32m² · cabina vocal · micrófonos de condensador y cinta',
        'Mezcla — Tu ingeniero residente desde la primera toma hasta el balance final',
        'Master — Streaming · vinilo · broadcast · todos los formatos',
        'Crecer — Coaching de producción y sesiones de arreglo disponibles durante tu estadía',
      ],
    },
    pricing: { en: 'From $25 USD/hour', es: 'Desde $25 USD/hora' },
    color: KP.orange,
  },
  {
    id: 'production',
    num: '02',
    icon: '/assets/btn-enjoy.webp',
    title: { en: 'Production & Arrangement', es: 'Producción y Arreglos' },
    tagline: { en: 'from idea to album', es: 'de la idea al álbum' },
    description: { en: 'Full production services — songwriting support, arrangement, session musicians, and creative direction. We help shape your vision into a finished record.', es: 'Servicios completos de producción — apoyo en composición, arreglos, músicos de sesión y dirección creativa. Damos forma a tu visión en un disco terminado.' },
    features: {
      en: [
        'Pre-production & arrangement',
        'Session musician network',
        'Creative direction & songwriting',
        'Album sequencing & flow',
      ],
      es: [
        'Preproducción y arreglos',
        'Red de músicos de sesión',
        'Dirección creativa y composición',
        'Secuenciación y flujo del álbum',
      ],
    },
    pricing: { en: 'Custom quote', es: 'Cotización personalizada' },
    color: KP.forest,
  },
  {
    id: 'academy',
    num: '03',
    icon: '/assets/btn-learn.webp',
    title: { en: 'Kayam Academy', es: 'Kayam Academy' },
    tagline: { en: 'learn from the person who mixes your record', es: 'aprende de quien mezcla tu disco' },
    description: { en: 'Not a classroom — a working studio where you learn by doing. Private sessions with our resident engineer, tailored to your project and your level.', es: 'No es un salón de clases — es un estudio profesional donde aprendes haciendo. Sesiones privadas con nuestro ingeniero residente, adaptadas a tu proyecto y nivel.' },
    features: {
      en: [
        'Production — Ableton, arrangement, sound design',
        'Vocal coaching — Find your voice in the studio',
        'Mixing — Learn by doing with the engineer',
        'DJ — From first mix to live set',
      ],
      es: [
        'Producción — Ableton, arreglos, diseño sonoro',
        'Coaching vocal — Encuentra tu voz en el estudio',
        'Mezcla — Aprende junto al ingeniero',
        'DJ — De tu primera mezcla a un set en vivo',
      ],
    },
    pricing: { en: 'From $20 USD/hour', es: 'Desde $20 USD/hora' },
    color: KP.teal,
  },
];

function ServiceCard({ service, onBook }: { service: typeof services[0]; onBook: () => void }) {
  const [hover, setHover] = useState(false);
  const { language } = useLanguage();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: '#ffffff',
        border: `1px solid ${hover ? service.color : 'rgba(0,0,0,0.12)'}`,
        borderRadius: 8,
        padding: 'clamp(24px, 2vw, 32px)',
        transition: 'border-color 280ms cubic-bezier(0.2,0.7,0.2,1), transform 280ms, box-shadow 280ms',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 18px 40px rgba(10,10,10,0.12)' : '0 2px 6px rgba(10,10,10,0.06)',
        willChange: hover ? 'transform' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Icon badge */}
      <div style={{
        position: 'absolute',
        top: -20, right: 16,
        width: 80, height: 80,
      }}>
        <img
          src={service.icon}
          alt={service.title[language]}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Anton', sans-serif",
        fontSize: 28,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#000000',
        margin: '0 0 8px',
      }}>
        {service.title[language]}
      </h3>

      {/* Tagline */}
      <div style={{ marginBottom: 20, filter: 'brightness(0.88)', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        <Script color={KP.forest} size={30}>
          {service.tagline[language]}
        </Script>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Akshar', sans-serif",
        fontSize: 15,
        lineHeight: 1.6,
        color: '#333',
        margin: '0 0 24px',
      }}>
        {service.description[language]}
      </p>

      {/* Features */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {service.features[language].map((feat, i) => (
          <li key={i} style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 14,
            color: KP.ink,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}>
            <span style={{
              width: 5, height: 5,
              borderRadius: 999,
              background: service.color,
              flexShrink: 0,
              marginTop: 7,
            }} />
            {feat}
          </li>
        ))}
      </ul>

      {/* Pricing + CTA */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 24,
        borderTop: `1px solid ${KP.forest}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: "'Akshar', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: KP.orange,
        }}>
          {service.pricing[language]}
        </div>
        <Btn variant="ghost" onClick={onBook}
          style={{ color: KP.orange }}>
          {language === 'en' ? 'Book now →' : 'Reservar →'}
        </Btn>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  useScrollPosition((y) => {
    if (!sectionRef.current) return;
    const offset = y - (sectionRef.current.offsetTop - window.innerHeight);
    sectionRef.current.style.setProperty('--scroll', String(offset));
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [language]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="services" style={{
      position: 'relative',
      background: '#fbf9f4', // Standard lightest beige for alternation
      paddingTop: 120,
      paddingBottom: 120,
      overflow: 'hidden',
    }}>
      {/* Background dot texture */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: 480, height: 480,
        backgroundImage: 'radial-gradient(circle, rgba(7,66,66,0.08) 1px, transparent 1.4px)',
        backgroundSize: '16px 16px',
        opacity: 0.5,
        maskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Paint splash decoration */}
      <img src="/assets/tache-teal.webp" alt="" loading="lazy" style={{
        position: 'absolute',
        bottom: '5%', left: -80,
        width: 500, height: 500,
        opacity: 0.12,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        transform: 'rotate(20deg)',
      }} />



      <div style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 56px)',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 720, margin: '0 auto 80px' }}>
          <Eyebrow color={KP.forest} style={{ marginBottom: 16, display: 'block' }}>{language === 'en' ? 'What we offer' : 'Lo que ofrecemos'}</Eyebrow>
          <Display size={'clamp(48px, 5.6vw, 72px)'} as="h2">
            {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
          </Display>
          <div style={{ marginTop: 20, marginBottom: 24 }}>
            <Script color={KP.orange} size={'clamp(32px, 3.2vw, 48px)'}>
              {language === 'en' ? 'for creators, by creators' : 'para creadores, por creadores'}
            </Script>
          </div>
          <p style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            color: '#333',
          }}>
            {language === 'en'
              ? 'From tracking to mastering, from one-day sessions to month-long residencies — Kayam Records supports every stage of your creative process. All packages include engineer support, equipment, and the space to focus on what matters: your music.'
              : 'De la grabación a la masterización, de sesiones de un día a residencias de un mes — Kayam Records apoya cada etapa de tu proceso creativo. Todos los paquetes incluyen soporte de ingeniero, equipo y el espacio para concentrarte en lo que importa: tu música.'}
          </p>
        </div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: 40,
        }}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={() => scrollTo('booking')} />
          ))}

          {/* Video card — thumbnail only.
              The expanded modal is rendered via createPortal into document.body,
              bypassing VHSOverlay's filter/transform CSS stacking context which
              would break position:fixed if placed inside it. */}
          <motion.div
            onClick={() => setIsVideoExpanded(true)}
            whileHover={{ translateY: -4, boxShadow: '0 14px 32px rgba(10,10,10,0.08)', borderColor: KP.orange }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 8,
              position: 'relative',
              boxShadow: '0 2px 4px rgba(10,10,10,0.04)',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '100%',
              minHeight: 300,
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: `url('/assets/trumpet_thumbnail.webp') center/cover no-repeat`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', color: KP.orange, paddingLeft: 4 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portal — rendered directly in document.body, outside VHSOverlay stacking context.
            position:fixed inside an ancestor with filter or transform is broken by CSS spec:
            the fixed element is anchored to the transformed ancestor, not the viewport. */}
        {isVideoExpanded && createPortal(
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setIsVideoExpanded(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setIsVideoExpanded(false); }}
              style={{ position: 'absolute', top: 24, right: 24, color: '#ffffff', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: "'Akshar', sans-serif", padding: '8px 16px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 30, background: 'transparent', textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {language === 'en' ? 'Close ✕' : 'Cerrar ✕'}
            </button>
            <div
              style={{ width: '100%', maxWidth: 540, padding: '0 16px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.instagram.com/reel/DU3fjdsEYsb/embed/"
                style={{ width: '100%', height: 700, border: 'none', borderRadius: 8 }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          </div>,
          document.body
        )}

        {/* Bottom CTA */}
        <div style={{
          marginTop: 96,
          padding: '48px 56px',
          background: KP.forest,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: KP.beige,
              margin: '0 0 12px',
            }}>{language === 'en' ? 'Not sure where to start?' : '¿No sabes por dónde empezar?'}</h3>
            <p style={{
              fontFamily: "'Akshar', sans-serif",
              fontSize: 15,
              lineHeight: 1.5,
              color: 'rgba(228,226,221,0.85)',
              margin: 0,
              maxWidth: 520,
            }}>
              {language === 'en'
                ? 'Book a free 30-minute consultation call. We\'ll discuss your project, timeline, and budget — and recommend the best path forward.'
                : 'Reserva una llamada de consulta gratuita de 30 minutos. Hablaremos de tu proyecto, plazos y presupuesto — y te recomendaremos el mejor camino.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <Btn variant="primary" onClick={() => scrollTo('booking')}
              style={{ background: KP.orange }}>
              {language === 'en' ? 'Build your package' : 'Crea tu paquete'}
            </Btn>
            <Btn variant="primary" onClick={() => window.open('tel:+1234567890')}
              style={{ background: '#000000', color: '#ffffff' }}>
              {language === 'en' ? 'Call Jérome' : 'Llamar a Jérome'}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

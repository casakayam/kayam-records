import React from 'react';
import { motion } from 'framer-motion';
import { KP, Script } from './Hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/useMobile';

// Reusable scroll-reveal wrapper — disabled on mobile for performance
function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const isMobile = useIsMobile(640);
  if (isMobile) {
    return <div style={{ height: '100%', ...style }}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ height: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}

const WhyChoosingKayam: React.FC = () => {
  const isMobile = useIsMobile(640);
  const { language } = useLanguage();
  return (
    <section
      id="why-choosing-kayam"
      style={{
        paddingTop: isMobile ? 64 : 128,
        paddingBottom: isMobile ? 64 : 128,
        paddingLeft: isMobile ? 16 : 32,
        paddingRight: isMobile ? 16 : 32,
        backgroundColor: '#e4e2dd', // Standard darker beige for alternation
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Paper Texture Overlay (Global grain is now in App.tsx) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.4,
          pointerEvents: 'none',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`, // Subtle fiber texture
        }}
      />

      {/* Background Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: '30rem',
            color: '#eae8e3',
            opacity: 0.3,
            userSelect: 'none',
            filter: 'blur(2px)', // Soften background text
          }}
        >
          BEYOND
        </span>
      </div>

      {/* Paint splash decorations */}
      <img src="/assets/tache-taupe.png" alt="" style={{
        position: 'absolute',
        top: '10%', right: -100,
        width: 450, height: 450,
        opacity: 0.12,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        transform: 'rotate(-15deg)',
        zIndex: 3,
      }} />

      <img src="/assets/tache-orange.png" alt="" style={{
        position: 'absolute',
        top: 'calc(5% - 120px)', left: 'calc(15% + 40px)',
        width: 1520, height: 1520,
        opacity: 0.05,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        transform: 'rotate(10deg)',
        zIndex: 3,
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <Reveal delay={0} style={{ marginBottom: isMobile ? 48 : 96, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'Akshar', sans-serif",
              color: KP.forest,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 16,
              display: 'block',
              opacity: 0.8,
            }}
          >
            {language === 'en' ? 'Distinctive Edge' : 'Ventaja Distintiva'}
          </span>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#2a2a27', // Slightly softer black/brown
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              fontWeight: 400,
              marginBottom: 20,
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              // Text texture effect
              textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.2), -0.5px -0.5px 0px rgba(0,0,0,0.1)',
              filter: 'contrast(1.1) brightness(0.95)',
            }}
          >
            {language === 'en' ? 'WHY CHOOSE KAYAM OVER MEDELLÍN?' : '¿POR QUÉ ELEGIR KAYAM EN VEZ DE MEDELLÍN?'}
          </h2>
          
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <Script color={KP.orange} size={'clamp(28px, 3.2vw, 42px)'}>
              {language === 'en' 
                ? 'Medellín gives you a studio. Kayam gives you a reason to stay.' 
                : 'Medellín te da un estudio. Kayam te da una razón para quedarte.'}
            </Script>
          </div>

          <p style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 'clamp(16px, 1.2vw, 18px)',
            lineHeight: 1.6,
            color: '#1a1a1a',
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto',
          }}>
            {language === 'en'
              ? 'In Medellín, you rent hours. Here, you inhabit a process. The lake, the finca, the resident engineer — everything is designed to keep you inside the creative state, not outside of it.'
              : 'En Medellín, alquilas horas. Aquí, habitas un proceso. El lago, la finca, el ingeniero residente — todo está diseñado para mantenerte dentro del estado creativo, no fuera de él.'}
          </p>
        </Reveal>

        {/* Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gridAutoRows: isMobile ? 'auto' : '1fr',
            gap: 32,
            alignItems: 'stretch',
          }}
        >
          {/* Block 1: Resident Engineer - Spans 2 columns on desktop */}
          <Reveal delay={0.1} style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <div
              style={{
                backgroundColor: '#f6f3ee',
                padding: isMobile ? 24 : 48,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 24 : 32,
                alignItems: isMobile ? 'flex-start' : 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#e4e2dd';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f6f3ee';
              }}
            >
              <div style={{ width: isMobile ? '100%' : '50%', zIndex: 2 }}>
                <img
                  src="/assets/Rec_clase_cropped_89772ebe.webp"
                  alt="Recording engineer"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) contrast(1.1)',
                  }}
                />
              </div>
              <div style={{ width: isMobile ? '100%' : '50%', zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "'Akshar', sans-serif",
                    fontWeight: 600,
                    color: KP.orange,
                    letterSpacing: '0.2em',
                    fontSize: 12,
                    marginBottom: 16,
                    display: 'block',
                    textTransform: 'uppercase',
                  }}
                >
                  {language === 'en' ? 'Expert Guidance' : 'Guía Experta'}
                </span>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 32,
                    marginBottom: 16,
                    color: '#1b1c19',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    filter: 'contrast(1.1)',
                  }}
                >
                  Jérôme Filippi
                </h3>
                <p
                  style={{
                    fontFamily: "'Akshar', sans-serif",
                    color: KP.taupe,
                    fontSize: 18,
                    marginBottom: 24,
                    lineHeight: 1.6,
                  }}
                >
                  {language === 'en'
                    ? 'Not a freelance technician. A dedicated resident engineer with 15 years experience, SAE Paris certified. Your sound is refined by permanent expertise.'
                    : 'No es un técnico freelance. Un ingeniero residente dedicado con 15 años de experiencia, certificado SAE París. Tu sonido es refinado por experiencia permanente.'}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Block 2: Professional Acoustics */}
          <Reveal delay={0.2}>
            <div
              style={{
                backgroundColor: KP.orange,
                padding: 48,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#d63b09'; // Darker orange
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = KP.orange;
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 64,
                    lineHeight: 1,
                    marginBottom: 16,
                    fontWeight: 400,
                    display: 'block',
                  }}
                >
                  RT60 0.2-0.3s
                </span>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 24,
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    fontWeight: 400,
                  }}
                >
                  {language === 'en' ? 'Professional Acoustics' : 'Acústica Profesional'}
                </h3>
                <p
                  style={{
                    fontFamily: "'Akshar', sans-serif",
                    fontSize: 18,
                    opacity: 0.95,
                    marginBottom: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {language === 'en'
                    ? <><strong style={{ fontWeight: 600, color: '#000000' }}>Control room</strong> — where your mix is built. Precision monitoring, professional-grade signal chain, zero flattery.<br /><strong style={{ fontWeight: 600, color: '#000000' }}>Live room</strong> — where your sound is captured. Acoustically treated, isolated vocal booth. What you record is exactly what you hear.</>
                    : <><strong style={{ fontWeight: 600, color: '#000000' }}>Sala de control</strong> — donde se construye tu mezcla. Monitoreo de precisión, cadena de señal profesional, cero adulación.<br /><strong style={{ fontWeight: 600, color: '#000000' }}>Sala de grabación</strong> — donde se captura tu sonido. Tratada acústicamente, cabina vocal aislada. Lo que grabas es exactamente lo que escuchas.</>}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Block 3: Everything in One Place */}
          <Reveal delay={0.3}>
            <div
              style={{
                backgroundColor: KP.forest,
                padding: 48,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#053232'; // Darker forest
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = KP.forest;
              }}
            >
              <div style={{ marginBottom: 32, overflow: 'hidden', borderRadius: 8, width: '100%', zIndex: 2 }}>
                <img
                  src="/assets/ecosystem-wide_a1734187.webp"
                  alt="Creative community at Kayam Records"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: 'sepia(20%) contrast(1.1)',
                  }}
                />
              </div>
              <div style={{ zIndex: 2 }}>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 32,
                    marginBottom: 16,
                    textTransform: 'uppercase',
                    fontWeight: 400,
                  }}
                >
                  {language === 'en' ? 'All-in-One Ecosystem' : 'Ecosistema Todo en Uno'}
                </h3>
                <p
                  style={{
                    fontFamily: "'Akshar', sans-serif",
                    fontSize: 18,
                    opacity: 0.9,
                    marginBottom: 24,
                  }}
                >
                  {language === 'en'
                    ? 'Studio + Accommodation + Kitchen + Nature. Your creative energy isn\'t wasted on logistics or city traffic.'
                    : 'Estudio + Alojamiento + Cocina + Naturaleza. Tu energía creativa no se desperdicia en logística o tráfico urbano.'}
                </p>
                <span
                  style={{
                    fontFamily: "'Allura', cursive",
                    fontSize: 32,
                    color: KP.orange,
                  }}
                >
                  {language === 'en' ? 'Pure Focus' : 'Enfoque Puro'}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Block 4: Active Community - Spans 2 columns */}
          <Reveal delay={0.2} style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <div
              style={{
                backgroundColor: '#f6f3ee',
                padding: isMobile ? 24 : 48,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 24 : 48,
                alignItems: 'center',
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#e4e2dd';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f6f3ee';
              }}
            >
              <div style={{ width: isMobile ? '100%' : '50%', display: 'flex', flexDirection: 'column', zIndex: 2 }}>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 32,
                    marginBottom: 16,
                    color: '#f6f3ee',
                    backgroundColor: '#004242',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    borderRadius: '9px',
                    padding: '8px 16px',
                  }}
                >
                  {language === 'en' ? 'Active Community' : 'Comunidad Activa'}
                </h3>
                <p
                  style={{
                    fontFamily: "'Akshar', sans-serif",
                    color: '#1a1a1a',
                    fontSize: 18,
                    marginBottom: 16,
                  }}
                >
                  {language === 'en'
                    ? 'Resident artists, jam sessions, and wandering musicians. You aren\'t recording alone; you\'re entering a living frequency.'
                    : 'Artistas residentes, jam sessions y músicos itinerantes. No grabas solo; entras en una frecuencia viva.'}
                </p>
              </div>
              <div
                style={{
                  width: isMobile ? '100%' : '50%',
                  position: 'relative',
                  height: isMobile ? 200 : 256,
                  zIndex: 2,
                }}
              >
                <img
                  src="/assets/community-gathering-new_1871feb6.webp"
                  alt="Creative community gathering at Casa Mirador"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 200,
                    height: 112,
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.2)',
                    transform: 'rotate(-6deg)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 20,
                  }}
                />
                <img
                  src="/assets/community-workshop_1bcbecfd.webp"
                  alt="Music workshop"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 16,
                    width: 220,
                    height: 124,
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.2)',
                    transform: 'rotate(3deg)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhyChoosingKayam;

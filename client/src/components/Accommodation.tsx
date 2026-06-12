/*
  KAYAM RECORDS — Accommodation Section (from archive accommodation-section.jsx)
  3 room cards + residency details grid
  Cream background, forest green accents
*/

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KP, Eyebrow, Display, Script, Btn } from "./Hero";
import { useLanguage } from "@/contexts/LanguageContext";

const rooms = [
  {
    id: 'private',
    image: '/assets/room-private.webp',
    title: { en: 'Private Room', es: 'Habitación Privada' },
    subtitle: { en: 'solo creators', es: 'creadores individuales' },
    description: { en: 'Individual bedroom with queen bed, workspace, and private bathroom. Lake view, natural light, and quiet space to compose between sessions.', es: 'Habitación individual con cama doble, espacio de trabajo y baño privado. Vista al lago, luz natural y espacio tranquilo para componer entre sesiones.' },
    features: {
      en: ['Queen bed + workspace', 'Private bathroom', 'Lake view balcony', 'WiFi + desk'],
      es: ['Cama doble + escritorio', 'Baño privado', 'Balcón con vista al lago', 'WiFi + escritorio'],
    },
    pricing: '$45/night',
    pricingEs: '$45/noche',
  },
  {
    id: 'shared',
    image: '/assets/room-shared.webp',
    title: { en: 'Shared Room', es: 'Habitación Compartida' },
    subtitle: { en: 'collaborative stay', es: 'estadía colaborativa' },
    description: { en: 'Dormitory-style rooms with 4–6 beds. Shared bathrooms, communal living areas, and kitchen access. Perfect for bands and collaborative projects.', es: 'Habitaciones estilo dormitorio con 4–6 camas. Baños compartidos, áreas comunes y acceso a cocina. Perfecto para bandas y proyectos colaborativos.' },
    features: {
      en: ['4–6 bunk beds', 'Shared bathrooms', 'Communal kitchen', 'Lounge access'],
      es: ['4–6 literas', 'Baños compartidos', 'Cocina comunitaria', 'Acceso al salón'],
    },
    pricing: '$22/night',
    pricingEs: '$22/noche',
  },
  {
    id: 'cabin',
    image: '/assets/room-cabin.webp',
    title: { en: 'Forest Cabin', es: 'Cabaña del Bosque' },
    subtitle: { en: 'deep focus retreat', es: 'retiro de enfoque profundo' },
    description: { en: 'Standalone cabin in the forest, 5 minutes from the main house. Total isolation, wood stove, outdoor shower. For artists seeking solitude and immersion.', es: 'Cabaña independiente en el bosque, a 5 minutos de la casa principal. Aislamiento total, estufa de leña, ducha al aire libre. Para artistas que buscan soledad e inmersión.' },
    features: {
      en: ['Standalone cabin', 'Wood-burning stove', 'Outdoor shower', 'No WiFi (intentional)'],
      es: ['Cabaña independiente', 'Estufa de leña', 'Ducha al aire libre', 'Sin WiFi (intencional)'],
    },
    pricing: '$65/night',
    pricingEs: '$65/noche',
  },
];

function RoomCard({ room }: { room: typeof rooms[0] }) {
  const [hover, setHover] = useState(false);
  const { language } = useLanguage();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#ffffff',
        border: `1px solid ${hover ? KP.forest : 'rgba(0,0,0,0.12)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'border-color 280ms cubic-bezier(0.2,0.7,0.2,1), transform 280ms, box-shadow 280ms',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 12px 28px rgba(10,10,10,0.12)' : '0 2px 6px rgba(10,10,10,0.06)',
        willChange: hover ? 'transform' : 'auto',
      }}
    >
      {/* Room photo */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '66.67%', overflow: 'hidden' }}>
        <img
          src={room.image}
          alt={room.title[language]}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '28px 24px' }}>
        <h3 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 24,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: KP.ink,
          margin: '0 0 4px',
        }}>
          {room.title[language]}
        </h3>
        <div style={{ marginBottom: 16 }}>
          <Script color={KP.forest} size={22}>
            {room.subtitle[language]}
          </Script>
        </div>

        <p style={{
          fontFamily: "'Akshar', sans-serif",
          fontSize: 14,
          lineHeight: 1.6,
          color: '#333',
          margin: '0 0 20px',
        }}>
          {room.description[language]}
        </p>

        {/* Features */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {room.features[language].map((feat, i) => (
            <li key={i} style={{
              fontFamily: "'Akshar', sans-serif",
              fontSize: 13,
              color: KP.ink,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}>
              <span style={{
                width: 4, height: 4,
                borderRadius: 999,
                background: KP.forest,
                flexShrink: 0,
                marginTop: 6,
              }} />
              {feat}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div style={{
          paddingTop: 16,
          borderTop: `1px solid ${KP.forest}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
          <Eyebrow color="#8a857a">{language === 'en' ? 'Per night' : 'Por noche'}</Eyebrow>
          <div style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: KP.forest,
          }}>
            {language === 'en' ? room.pricing : room.pricingEs}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accommodation() {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="accommodation" style={{
      position: 'relative',
      background: '#e4e2dd', // Standard darker beige for alternation
      paddingTop: 120,
      paddingBottom: 120,
      overflow: 'hidden',
    }}>
      {/* Paint splash decoration */}
      <img src="/assets/tache-forest.webp" alt="" style={{
        position: 'absolute',
        right: -120, bottom: -180,
        width: 600, height: 600,
        opacity: 0.12,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        transform: 'rotate(45deg)',
      }} />

      {/* Section header */}
      <div style={{ padding: '0 clamp(24px, 4vw, 56px)', marginBottom: 80, zIndex: 1, position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Eyebrow color={KP.forest} style={{ marginBottom: 16, display: 'block' }}>{language === 'en' ? "Where you'll stay" : 'Dónde te alojarás'}</Eyebrow>
          <Display size={'clamp(48px, 5.6vw, 72px)'} as="h2">
            {language === 'en' ? 'Accommodation' : 'Alojamiento'}
          </Display>
          <div style={{ marginTop: 20, marginBottom: 24 }}>
            <Script color={KP.orange} size={'clamp(32px, 3.2vw, 48px)'}>
              {language === 'en' ? 'Artist Residency' : 'Residencia Artística'}
            </Script>
          </div>
          <p style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            color: '#333',
          }}>
            {language === 'en'
              ? 'Seven to thirty days on-site with unlimited studio access and integration into our creative community. Stay longer, stay different — accommodation designed for focus, rest, and connection.'
              : 'De siete a treinta días en el sitio con acceso ilimitado al estudio e integración en nuestra comunidad creativa. Quédate más, quédate diferente — alojamiento diseñado para el enfoque, el descanso y la conexión.'}
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 56px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Rooms grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 32,
          marginBottom: 64,
        }}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}

          {/* 
            Instagram Post — Wide Layout (vidéo + sidebar)
            ──────────────────────────────────────────────
            Technique : Le conteneur parent (overflow-hidden) sert de masque.
            - max-w-[935px] permet de déclencher le layout "Desktop" d'Instagram (vidéo à gauche, sidebar à droite).
            - h-[580px] est ajusté pour afficher le média et la sidebar tout en coupant le bandeau de connexion.
            - L'iframe dépasse légèrement en bas (h-[108%]) pour masquer la barre de login.
          */}
          <div style={{
            gridColumn: '1 / -1',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 48,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden w-full max-w-[935px] h-[580px] rounded-xl border border-[#dbdbdb] shadow-xl bg-white"
            >
              <iframe
                src="https://www.instagram.com/reel/DSDFFLFDAuW/embed"
                className="absolute top-0 left-0 w-full h-[108%] border-none"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title="Instagram Post — Kayam Records"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

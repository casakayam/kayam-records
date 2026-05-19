type TranslationMap = Record<string, { en: string; es: string }>;

export const translations: TranslationMap = {
  // Navigation
  'nav.services':      { en: 'Services',      es: 'Servicios' },
  'nav.accommodation': { en: 'Accommodation', es: 'Alojamiento' },
  'nav.booking':       { en: 'Booking',       es: 'Reservar' },
  'nav.testimonials':  { en: 'Testimonials',  es: 'Testimonios' },
  'nav.contact':       { en: 'Contact',       es: 'Contacto' },

  // Hero
  'hero.tagline': { en: 'Kayam Records Music Studio in Guatapé', es: 'Kayam Records Estudio Musical en Guatapé' },
  'hero.subtitle': {
    en: 'Discover our state-of-the-art studio nestled in a tropical haven. Elevate your sound with professional equipment and inspiring surroundings.',
    es: 'Descubre nuestro estudio de última generación en un refugio tropical. Eleva tu sonido con equipos profesionales y un entorno inspirador.',
  },
  'hero.cta':          { en: 'Book a Session',           es: 'Reservar Sesión' },
  'hero.nextSession':  { en: 'Next available session',   es: 'Próxima sesión disponible' },

  // Services
  'services.title':    { en: 'Our Services',                           es: 'Nuestros Servicios' },
  'services.subtitle': { en: 'Everything you need to bring your music to life', es: 'Todo lo que necesitas para dar vida a tu música' },
  'services.recording.title': { en: 'Recording Session',    es: 'Sesión de Grabación' },
  'services.recording.desc': {
    en: 'Professional recording with top-tier equipment in our acoustically treated studio. Includes engineer assistance.',
    es: 'Grabación profesional con equipos de primera en nuestro estudio tratado acústicamente. Incluye asistencia de ingeniero.',
  },
  'services.fullday.title': { en: 'Full Day Recording', es: 'Grabación Día Completo' },
  'services.fullday.desc': {
    en: '8 hours of studio time with full access to all equipment and dedicated engineer support.',
    es: '8 horas de estudio con acceso completo a todo el equipo y soporte de ingeniero dedicado.',
  },
  'services.production.title': { en: 'Music Production', es: 'Producción Musical' },
  'services.production.desc': {
    en: "Complete production services from arrangement to final mix. Bring your ideas, we'll make them shine.",
    es: 'Servicios completos de producción desde arreglos hasta mezcla final. Trae tus ideas, las haremos brillar.',
  },
  'services.mixing.title': { en: 'Mixing', es: 'Mezcla' },
  'services.mixing.desc': {
    en: 'Professional mixing to balance and enhance your tracks with clarity and punch.',
    es: 'Mezcla profesional para equilibrar y realzar tus pistas con claridad y potencia.',
  },
  'services.mastering.title': { en: 'Mastering', es: 'Masterización' },
  'services.mastering.desc': {
    en: 'Final polish for your music. Ready for streaming, vinyl, or any distribution format.',
    es: 'Pulido final para tu música. Lista para streaming, vinilo o cualquier formato de distribución.',
  },
  'services.rehearsal.title': { en: 'Rehearsal Room', es: 'Sala de Ensayo' },
  'services.rehearsal.desc': {
    en: 'Fully equipped rehearsal space for bands and solo artists. Perfect your performance.',
    es: 'Espacio de ensayo completamente equipado para bandas y solistas. Perfecciona tu presentación.',
  },
  'services.classes.title': { en: 'Music Classes', es: 'Clases de Música' },
  'services.classes.desc': {
    en: 'Learn from experienced professionals. Production, mixing, and instrument lessons available.',
    es: 'Aprende de profesionales experimentados. Clases de producción, mezcla e instrumentos disponibles.',
  },
  'services.podcast.title': { en: 'Podcast Recording', es: 'Grabación de Podcast' },
  'services.podcast.desc': {
    en: 'Professional podcast setup with quality microphones and post-production services.',
    es: 'Configuración profesional de podcast con micrófonos de calidad y servicios de postproducción.',
  },
  'services.perHour':   { en: '/hour',    es: '/hora' },
  'services.perDay':    { en: '/day',     es: '/día' },
  'services.perTrack':  { en: '/track',   es: '/pista' },
  'services.perSession':{ en: '/session', es: '/sesión' },

  // Video
  'video.title':    { en: 'Experience the Studio',          es: 'Vive la Experiencia del Estudio' },
  'video.subtitle': { en: 'Take a glimpse into our creative space', es: 'Echa un vistazo a nuestro espacio creativo' },

  // Accommodation
  'accommodation.title':    { en: 'Stay With Us',                        es: 'Quédate Con Nosotros' },
  'accommodation.subtitle': { en: 'Immerse yourself in creativity. Live where you record.', es: 'Sumérgete en la creatividad. Vive donde grabas.' },
  'accommodation.dorm.title':    { en: 'Shared Dormitory', es: 'Dormitorio Compartido' },
  'accommodation.dorm.desc':     { en: 'Comfortable shared space perfect for solo travelers and budget-conscious artists.', es: 'Espacio compartido cómodo, perfecto para viajeros solos y artistas con presupuesto ajustado.' },
  'accommodation.private.title': { en: 'Private Room', es: 'Habitación Privada' },
  'accommodation.private.desc':  { en: 'Your own space with stunning views of the surrounding nature.', es: 'Tu propio espacio con vistas impresionantes de la naturaleza circundante.' },
  'accommodation.cabin.title':   { en: 'Bamboo Cabin', es: 'Cabaña de Bambú' },
  'accommodation.cabin.desc':    { en: 'Unique bamboo cabin experience. Connect with nature while creating your art.', es: 'Experiencia única en cabaña de bambú. Conéctate con la naturaleza mientras creas tu arte.' },
  'accommodation.perNight':  { en: '/night',            es: '/noche' },
  'accommodation.amenities': { en: 'Amenities included', es: 'Servicios incluidos' },
  'accommodation.wifi':      { en: 'High-speed WiFi',   es: 'WiFi de alta velocidad' },
  'accommodation.breakfast': { en: 'Breakfast included', es: 'Desayuno incluido' },
  'accommodation.nature':    { en: 'Nature surroundings', es: 'Entorno natural' },

  // Booking
  'booking.title':    { en: 'Book Your Session',                es: 'Reserva Tu Sesión' },
  'booking.subtitle': { en: "Ready to create? Let's find the perfect time for you.", es: '¿Listo para crear? Encontremos el momento perfecto para ti.' },
  'booking.name':     { en: 'Your Name',                 es: 'Tu Nombre' },
  'booking.email':    { en: 'Email Address',             es: 'Correo Electrónico' },
  'booking.service':  { en: 'Select Service',            es: 'Seleccionar Servicio' },
  'booking.date':     { en: 'Preferred Date',            es: 'Fecha Preferida' },
  'booking.message':  { en: 'Tell us about your project', es: 'Cuéntanos sobre tu proyecto' },
  'booking.submit':   { en: 'Send Request',              es: 'Enviar Solicitud' },
  'booking.success':  { en: "Request sent! We'll contact you soon.", es: '¡Solicitud enviada! Te contactaremos pronto.' },

  // Testimonials
  'testimonials.title':    { en: 'What Artists Say',           es: 'Lo Que Dicen Los Artistas' },
  'testimonials.subtitle': { en: 'Stories from our creative community', es: 'Historias de nuestra comunidad creativa' },

  // Footer
  'footer.location':  { en: 'Location',           es: 'Ubicación' },
  'footer.address':   { en: 'Guatapé, Antioquia, Colombia', es: 'Guatapé, Antioquia, Colombia' },
  'footer.contact':   { en: 'Contact',             es: 'Contacto' },
  'footer.followUs':  { en: 'Follow Us',           es: 'Síguenos' },
  'footer.faq':       { en: 'FAQ',                 es: 'Preguntas Frecuentes' },
  'footer.rights':    { en: 'All rights reserved', es: 'Todos los derechos reservados' },

  // FAQ
  'faq.title': { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
  'faq.q1': { en: 'How do I get to the studio?', es: '¿Cómo llego al estudio?' },
  'faq.a1': { en: "We're located in Guatapé, about 2 hours from Medellín. We can arrange transportation from the city.", es: 'Estamos ubicados en Guatapé, a unas 2 horas de Medellín. Podemos organizar transporte desde la ciudad.' },
  'faq.q2': { en: 'What equipment do you have?', es: '¿Qué equipo tienen?' },
  'faq.a2': { en: 'Professional-grade microphones, preamps, instruments, and a fully treated recording room. Contact us for a detailed equipment list.', es: 'Micrófonos, preamplificadores e instrumentos de grado profesional, y una sala de grabación completamente tratada. Contáctanos para una lista detallada.' },
  'faq.q3': { en: 'Can I stay overnight?', es: '¿Puedo quedarme a dormir?' },
  'faq.a3': { en: 'Yes! We offer various accommodation options from shared dorms to private bamboo cabins.', es: '¡Sí! Ofrecemos varias opciones de alojamiento desde dormitorios compartidos hasta cabañas privadas de bambú.' },
  'faq.q4': { en: 'Do you offer packages?', es: '¿Ofrecen paquetes?' },
  'faq.a4': { en: 'Absolutely. We have 7, 15, and 30-day artistic residency packages that include studio time and accommodation.', es: 'Por supuesto. Tenemos paquetes de residencia artística de 7, 15 y 30 días que incluyen tiempo de estudio y alojamiento.' },
  'faq.q5': { en: 'What genres do you specialize in?', es: '¿En qué géneros se especializan?' },
  'faq.a5': { en: 'We work with all genres! From Latin music and reggaeton to rock, electronic, and classical. Our team adapts to your style.', es: '¡Trabajamos con todos los géneros! Desde música latina y reggaetón hasta rock, electrónica y clásica. Nuestro equipo se adapta a tu estilo.' },
  'faq.q6': { en: 'Can I bring my own producer or engineer?', es: '¿Puedo traer mi propio productor o ingeniero?' },
  'faq.a6': { en: "Of course! You can bring your own team or work with our in-house professionals. We're flexible to your needs.", es: '¡Por supuesto! Puedes traer tu propio equipo o trabajar con nuestros profesionales internos. Somos flexibles a tus necesidades.' },
  'faq.q7': { en: 'What is the cancellation policy?', es: '¿Cuál es la política de cancelación?' },
  'faq.a7': { en: 'Full refund if cancelled 7+ days before. 50% refund for 3-7 days notice. No refund for less than 3 days notice.', es: 'Reembolso completo si cancelas con 7+ días de anticipación. 50% de reembolso con 3-7 días. Sin reembolso con menos de 3 días.' },
  'faq.q8': { en: 'Do you offer music lessons?', es: '¿Ofrecen clases de música?' },
  'faq.a8': { en: 'Yes! Through Kayam Academy we offer production, mixing, mastering, and instrument classes with experienced professionals.', es: '¡Sí! A través de Kayam Academy ofrecemos clases de producción, mezcla, masterización e instrumentos con profesionales experimentados.' },
};

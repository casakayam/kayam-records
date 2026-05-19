/*
 * KAYAM BRAND: Testimonials Section
 * - Carousel layout overlapping section boundaries
 * - Stitch-inspired design
 */
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Oscar',
    role: 'Singer-Songwriter',
    quote: {
      en: 'Recording at Kayam was a transformative experience. The natural surroundings and professional setup created the perfect environment for creativity.',
      es: 'Grabar en Kayam fue una experiencia transformadora. El entorno natural y la configuración profesional crearon el ambiente perfecto para la creatividad.',
    },
    image: '/assets/Actividades_Guatape_OascarQuatrocrop_da619796.webp',
    logId: 'VOICE_LOG.01'
  },
  {
    id: 2,
    name: 'Eebbaa',
    role: 'Music Student',
    quote: {
      en: 'Such a peaceful and calm space where you can really live at your own pace surrounded by beautiful nature and wonderful people. I also highly recommend the music production classes I took with Jerome. He is an incredibly knowledgeable and engaging teacher who provided excellent advice and feedback. I was a complete beginner when i started but I now feel very confident thanks to his classes. I cant wait to go back!!',
      es: 'Un espacio tan pacífico y tranquilo donde realmente puedes vivir a tu propio ritmo rodeado de hermosa naturaleza y gente maravillosa. También recomiendo mucho las clases de producción musical que tomé con Jerome. Es un profesor increíblemente conocedor y motivador que brindó excelentes consejos y comentarios. Era una principiante total cuando empecé, pero ahora me siento muy segura gracias a sus clases. ¡No puedo esperar para volver!',
    },
    image: '/assets/jeromeCR_d43e555b.webp',
    logId: 'VOICE_LOG.02'
  },
  {
    id: 3,
    name: 'Sebastian Ricardo',
    role: 'Traveling Artist',
    quote: {
      en: 'Recording at Kayam Records was a wholesome experience, being from Ecuador and recording in Colombia with Jerome’s profesional direction on such great studio acoustics gave me a new look over the technical performance I should have as a performer. I’m thankful for the experience which helped me to document my time in beautiful Guatape and immortalized a great song I wrote at Kayam! Highly recommended for traveling artists. Truly worthy.',
      es: 'Grabar en Kayam Records fue una experiencia íntegra. Siendo de Ecuador y grabando en Colombia bajo la dirección profesional de Jerome en un estudio con tan buena acústica, me dio una nueva perspectiva sobre el desempeño técnico que debo tener como intérprete. ¡Estoy agradecido por la experiencia que me ayudó a documentar mi tiempo en el hermoso Guatapé e inmortalizó una gran canción que escribí en Kayam! Muy recomendado para artistas viajeros. Verdaderamente vale la pena.',
    },
    image: '/assets/sebastian_ricardo.webp',
    logId: 'VOICE_LOG.03'
  },
  {
    id: 4,
    name: 'Nora',
    role: 'Music Producer',
    quote: {
      en: 'Staying in Casa Kayam was a really great experience! It’s a place to connect to nature and to your creative energy. During my time there I was able to attend some music production classes, which was really awesome! Jerome is an amazing teacher and I could even produce my first song ever in Casa Kayam. Thanks a lot for everything!',
      es: '¡Quedarme en Casa Kayam fue una experiencia realmente genial! Es un lugar para conectar con la naturaleza y con tu energía creativa. Durante mi tiempo allí pude asistir a algunas clases de producción musical, ¡lo cual fue realmente asombroso! Jerome es un maestro increíble e incluso pude producir mi primera canción en Casa Kayam. ¡Muchas gracias por todo!',
    },
    image: '/assets/Rec_Podcast_47a04dba.webp',
    logId: 'VOICE_LOG.04'
  },
];

export default function Testimonials() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative z-30 w-full pointer-events-none"
      style={{
        marginTop: -180,
        marginBottom: -140,
        overflow: 'hidden',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pointer-events-auto">
        {/* Paint splash decoration */}
        <img src="/assets/tache-teal-deep.webp" alt="" style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 800, height: 800,
          opacity: 0.1,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) rotate(-10deg)',
          zIndex: -1,
        }} />
        <div className="relative">

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-40">
            <button
              onClick={prev}
              className="bg-[#1a1a1a] text-white p-3 hover:bg-[#e63f0a] transition-colors border-2 border-[#1a1a1a] shadow-[4px_4px_0px_rgba(230,63,10,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-40">
            <button
              onClick={next}
              className="bg-[#1a1a1a] text-white p-3 hover:bg-[#e63f0a] transition-colors border-2 border-[#1a1a1a] shadow-[4px_4px_0px_rgba(230,63,10,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative h-[650px] md:h-[500px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-12"
              >

                {/* Desktop Version */}
                <div className="w-full relative h-full items-center justify-center hidden md:flex">
                  {/* Deep Green Background Block */}
                  <div
                    className="absolute inset-y-8 right-0 left-32 border-2 border-[#1a1a1a] z-0 shadow-[8px_8px_0px_#1a1a1a]"
                    style={{ backgroundColor: '#074242' }}
                  >
                    <div className="absolute top-4 left-4 border border-white/30 px-2 py-1 font-mono text-white text-xs opacity-70 tracking-widest">
                      SYS_ID: 084_TESTIMONIAL
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-[#e63f0a] animate-pulse"></div>
                      <span className="font-mono text-white text-xs opacity-70">REC</span>
                    </div>
                  </div>

                  {/* Overlapping White Content Panel */}
                  <div className="absolute top-0 bottom-0 left-0 right-48 bg-white border-2 border-[#1a1a1a] z-10 p-10 flex flex-col justify-between shadow-[-4px_4px_0px_#1a1a1a]">
                    <div className="flex items-center gap-4 mb-4">
                      <Activity className="text-[#e63f0a] w-6 h-6" />
                      <span className="font-mono text-[#333333]/60 uppercase tracking-[0.2em] border-b border-[#e4e2dd] pb-1">
                        {testimonials[currentIndex].logId}
                      </span>
                    </div>

                    <div className="flex-grow flex items-center relative pr-28 lg:pr-32">
                      <Quote className="absolute -top-6 -left-6 text-[#e4e2dd] opacity-50 -z-10 w-20 h-20" />
                      <blockquote className="font-akshar font-semibold text-[clamp(14px,1.2vw,18px)] text-[#1a1a1a] max-w-[90%] leading-tight tracking-wide">
                        "{testimonials[currentIndex].quote[language as 'en' | 'es']}"
                      </blockquote>
                    </div>

                    <div className="mt-8 flex items-end justify-between border-t border-[#e4e2dd] pt-6">
                      <div className="flex flex-col gap-1">
                        <cite className="font-mono text-[#1a1a1a] uppercase font-bold not-italic tracking-wider text-lg">
                          {testimonials[currentIndex].name}
                        </cite>
                        <span className="font-akshar text-xl text-[#333333]/80">
                          {testimonials[currentIndex].role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Monochrome Image Layer */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-12 w-64 h-80 z-20 border-2 border-[#1a1a1a] overflow-hidden shadow-[4px_4px_0px_#e63f0a]"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <img
                      alt={testimonials[currentIndex].name}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 mix-blend-luminosity"
                      src={testimonials[currentIndex].image}
                    />
                    <div className="absolute inset-0 border border-white/20 m-2 pointer-events-none"></div>
                  </div>
                </div>

                {/* Mobile Version (Stitch "Compact Creative Testimonial") */}
                <div className="md:hidden relative w-full max-w-sm h-[380px] mx-auto -mt-[24px] mb-8">
                  {/* Large Rotated Forest Green Block */}
                  <div className="absolute inset-0 bg-[#074242] rounded rotate-[-3deg] transform origin-bottom-left shadow-sm border border-[#1a1a1a]/20"></div>

                  {/* Overlapping Monochrome Studio Photo */}
                  <div className="absolute -top-6 -right-2 w-28 h-36 border-2 border-[#1a1a1a] bg-[#fbf9f4] shadow-[4px_4px_0px_#1a1a1a] overflow-hidden rotate-[4deg] z-10">
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover grayscale contrast-125"
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                    />
                  </div>

                  {/* Content Canvas */}
                  <div className="absolute inset-2 bg-white border-2 border-[#1a1a1a] p-5 flex flex-col justify-between rotate-[1deg] z-20 shadow-[2px_2px_0px_#1a1a1a]">

                    {/* Technical Label */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[#333333]/60 uppercase tracking-widest border border-[#333333]/20 px-2 py-0.5 text-[10px]">
                        {testimonials[currentIndex].logId}
                      </span>
                      <span className="w-8 border-b border-dashed border-[#333333]/30"></span>
                    </div>

                    {/* Artist Quote */}
                    <div className="flex-grow flex items-center pr-6 mt-4">
                      <p className="font-akshar font-semibold text-[13px] text-[#1a1a1a] leading-tight">
                        "{testimonials[currentIndex].quote[language as 'en' | 'es']}"
                      </p>
                    </div>

                    {/* Signature & Footer */}
                    <div className="mt-4 flex items-end justify-between border-t border-[#e4e2dd] pt-4">
                      <div>
                        <p className="font-anton text-sm uppercase tracking-widest text-[#1a1a1a]">{testimonials[currentIndex].name}</p>
                        <p className="font-mono text-xs text-[#333333]/60 mt-1">{testimonials[currentIndex].role}</p>
                      </div>
                      <Quote className="text-[#e63f0a] w-5 h-5" />
                    </div>
                  </div>

                  {/* Floating Decorative Element */}
                  <div className="absolute -bottom-4 left-6 z-30">
                    <div className="bg-[#e63f0a] text-white font-mono text-[10px] px-3 py-1 uppercase tracking-widest border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] -rotate-2">
                      Verified
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

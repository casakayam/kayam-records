/*
  VIDEO SECTION COMPONENT - Kayam Records
  Style: Clean embed area with section numbering
  Vibe: Alternative, Street Art, Nature-integrated with Guatapé watermark
  Background: Grey/White gradients
*/

import { useT } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function VideoSection() {
  const t = useT();
  const [isExpanded, setIsExpanded] = useState(false);

  const videoId = 'JyD7IEUQ-dE';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const openVideo = () => {
    setIsExpanded(true);
    window.dispatchEvent(new CustomEvent('kayam-video', { detail: { playing: true } }));
  };

  const closeVideo = () => {
    setIsExpanded(false);
    window.dispatchEvent(new CustomEvent('kayam-video', { detail: { playing: false } }));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Grey gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
      
      {/* Guatapé watermark */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/assets/guatape-watermark_84fabcb5.png)' }}
      />
      
      {/* Street art color accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#8B2942] rounded-full blur-[160px] opacity-[0.03]" />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-[#E85A3C] rounded-full blur-[140px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Section Number */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <span className="section-number text-5xl lg:text-7xl">02</span>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-11">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="headline-massive text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
                {t('video.title')}
              </h2>
              <p className="body-text text-lg text-[#1A1A1A]/60 max-w-xl">
                {t('video.subtitle')}
              </p>
            </motion.div>

            {/* Video Container — thumbnail only, iframe rendered via portal to bypass VHSOverlay CSS filter stacking context */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div
                className="kayam-card aspect-video relative overflow-hidden bg-[#1A1A1A] cursor-pointer"
                onClick={openVideo}
              >
                <img
                  src={thumbnailUrl}
                  alt={t('video.title')}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1A1A1A]/30 flex items-center justify-center">
                  <button
                    className="w-20 h-20 rounded-full bg-[#E85A3C] flex items-center justify-center hover:bg-[#d14a2e] transition-all hover:scale-110 group shadow-lg"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decorative elements - Street art style */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 -z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E85A3C" strokeWidth="2" opacity="0.4" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#2D9B9B" strokeWidth="1.5" opacity="0.3" />
                  <circle cx="50" cy="50" r="15" fill="#8B2942" opacity="0.2" />
                </svg>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 -z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="35" fill="#2D9B9B" opacity="0.15" />
                  <circle cx="30" cy="70" r="15" fill="#E85A3C" opacity="0.2" />
                </svg>
              </div>
            </motion.div>


          </div>
        </div>
      </div>

      {isExpanded && createPortal(
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={closeVideo}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeVideo(); }}
            style={{ position: 'absolute', top: 24, right: 24, color: '#ffffff', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: "'Akshar', sans-serif", padding: '8px 16px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 30, background: 'transparent', textTransform: 'uppercase', letterSpacing: 1 }}
          >
            Close ✕
          </button>
          <div
            style={{ width: '100%', maxWidth: 900, padding: '0 16px', aspectRatio: '16/9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
              title={t('video.title')}
              allowFullScreen
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

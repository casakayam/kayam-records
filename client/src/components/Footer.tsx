/*
 * KAYAM BRAND: Footer Section with FAQ
 * - Dark #1a1a1a background
 * - Anton headings, Akshar body, DM Mono details
 * - Orange #e63f0a accents
 * - Enso circle decoration
 */
import { useT } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';

const faqs = [
  { key: 'q1', answerKey: 'a1' },
  { key: 'q2', answerKey: 'a2' },
  { key: 'q3', answerKey: 'a3' },
  { key: 'q4', answerKey: 'a4' },
  { key: 'q5', answerKey: 'a5' },
  { key: 'q6', answerKey: 'a6' },
  { key: 'q7', answerKey: 'a7' },
  { key: 'q8', answerKey: 'a8' },
];

export default function Footer() {
  const t = useT();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#e63f0a] rounded-full blur-[250px] opacity-[0.05]" />
      </div>

      {/* Enso decoration */}
      <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#fff" strokeWidth="5"
            strokeLinecap="round" strokeDasharray="700 300" transform="rotate(200 200 200)" />
        </svg>
      </div>

      {/* FAQ Section */}
      <div className="py-20 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Section Number */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="shrink-0"
            >
              <span className="section-number text-white/20">05</span>
            </motion.div>

            {/* FAQ Content */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-anton text-4xl sm:text-5xl text-white mb-12"
              >
                {t('faq.title').toUpperCase()}
              </motion.h2>

              <div className="space-y-0 max-w-3xl">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-white/10"
                  >
                    <button
                      onClick={() => toggleFaq(faq.key)}
                      className="w-full py-5 flex items-center justify-between text-left group"
                    >
                      <span className="font-akshar font-bold text-lg text-white group-hover:text-[#e63f0a] transition-colors">
                        {t(`faq.${faq.key}`)}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#e63f0a] transition-transform ${
                          openFaq === faq.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === faq.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-5"
                      >
                        <p className="font-akshar text-white/60 leading-relaxed">
                          {t(`faq.${faq.answerKey}`)}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Links */}
      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-1">
              <img
                src="/assets/logo-kayam-new.png"
                alt="Kayam Records"
                className="h-16 w-auto mb-6 brightness-0 invert"
              />
              <p className="font-akshar text-white/50 text-sm leading-relaxed">
                Professional recording studio in the heart of Colombian paradise.
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-anton text-white mb-4">{t('footer.location').toUpperCase()}</h4>
              <div className="flex items-start gap-3 font-akshar text-white/50">
                <MapPin className="w-5 h-5 text-[#e63f0a] mt-0.5 flex-shrink-0" />
                <div>
                  <p>Casa Kayam</p>
                  <p>{t('footer.address')}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-anton text-white mb-4">{t('footer.contact').toUpperCase()}</h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@casakayam.com"
                  className="flex items-center gap-3 font-akshar text-white/50 hover:text-[#e63f0a] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@casakayam.com</span>
                </a>
                <a
                  href="https://wa.me/573215764541"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-akshar text-white/50 hover:text-[#e63f0a] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+57 321 576 4541</span>
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-anton text-white mb-4">{t('footer.followUs').toUpperCase()}</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/kayamproject/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-[#e63f0a] hover:border-[#e63f0a] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/kayamproject/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-[#e63f0a] hover:border-[#e63f0a] transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@kayamproject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-[#e63f0a] hover:border-[#e63f0a] transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono-brand text-white/30">
            <p>© 2026 Kayam Records. {t('footer.rights')}.</p>
            <p>
              Part of{" "}
              <a
                href="https://casakayam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e63f0a] hover:underline"
              >
                Casa Kayam Project
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

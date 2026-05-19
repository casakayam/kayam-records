/*
 * KAYAM BRAND: Booking Section
 * - Dark #1a1a1a background (contrast section)
 * - Anton headings, Akshar body, DM Mono prices
 * - Orange #e63f0a accents and CTA
 * - 2-column: Studio Services | Accommodation
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Send, CheckCircle, Minus, Plus, Calculator, Home, Mic, Music, Sliders, Disc } from 'lucide-react';
import { toast } from 'sonner';

interface PackageItem {
  id: string;
  nameEN: string;
  nameES: string;
  price: number;
  unit: string;
  unitES: string;
  icon: React.ElementType;
  category: 'accommodation' | 'studio';
}

const packageItems: PackageItem[] = [
  { id: 'recording_hour', nameEN: 'Recording Hour', nameES: 'Hora de Grabación', price: 25, unit: 'hour', unitES: 'hora', icon: Mic, category: 'studio' },
  { id: 'recording_day', nameEN: 'Recording Day (8h)', nameES: 'Día de Grabación (8h)', price: 180, unit: 'day', unitES: 'día', icon: Mic, category: 'studio' },
  { id: 'production', nameEN: 'Music Production', nameES: 'Producción Musical', price: 350, unit: 'track', unitES: 'pista', icon: Music, category: 'studio' },
  { id: 'mixing', nameEN: 'Mixing', nameES: 'Mezcla', price: 180, unit: 'track', unitES: 'pista', icon: Sliders, category: 'studio' },
  { id: 'mastering', nameEN: 'Mastering', nameES: 'Mastering', price: 70, unit: 'track', unitES: 'pista', icon: Disc, category: 'studio' },
  { id: 'rehearsal', nameEN: 'Rehearsal', nameES: 'Ensayo', price: 10, unit: 'hour', unitES: 'hora', icon: Music, category: 'studio' },
  { id: 'class', nameEN: 'Production Class', nameES: 'Clase de Producción', price: 20, unit: 'hour', unitES: 'hora', icon: Music, category: 'studio' },
  { id: 'glamping', nameEN: 'Glamping', nameES: 'Glamping', price: 65, unit: 'night/2pers', unitES: 'noche/2pers', icon: Home, category: 'accommodation' },
  { id: 'private', nameEN: 'Private Room', nameES: 'Habitación Privada', price: 45, unit: 'night/2pers', unitES: 'noche/2pers', icon: Home, category: 'accommodation' },
  { id: 'dorm', nameEN: 'Dormitory Bed', nameES: 'Cama en Dormitorio', price: 22, unit: 'night', unitES: 'noche', icon: Home, category: 'accommodation' },
];

export default function Booking() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(packageItems.map(item => [item.id, 0]))
  );
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', message: '' });

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  };

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = packageItems.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
    const discount = subtotal * 0.15;
    return { subtotal, discount, total: subtotal - discount };
  }, [quantities]);

  const hasSelection = Object.values(quantities).some(q => q > 0);

  const formatUSD = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSelection) {
      toast.error(language === 'en' ? 'Please select at least one service' : 'Por favor selecciona al menos un servicio');
      return;
    }
    setIsSubmitting(true);

    try {
      const package_details = packageItems
        .filter(item => quantities[item.id] > 0)
        .map(item => `${item.nameEN} (x${quantities[item.id]})`)
        .join('\n');

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bbeafa7a-3cea-460f-9c11-281542adf91c",
          subject: "New Booking Request from Kayam Records",
          from_name: contactInfo.name,
          email: contactInfo.email,
          message: contactInfo.message,
          package_details: package_details,
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success(language === 'en' ? 'Request sent successfully!' : '¡Solicitud enviada con éxito!');
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(language === 'en' ? 'Failed to send request. Please try again.' : 'Error al enviar la solicitud. Inténtalo de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <CheckCircle className="w-20 h-20 text-[#e63f0a] mx-auto mb-6" />
            <h2 className="font-anton text-4xl sm:text-5xl text-white mb-4">
              {language === 'en' ? 'REQUEST SENT!' : '¡SOLICITUD ENVIADA!'}
            </h2>
            <p className="font-akshar text-white/60 text-lg">
              {language === 'en' ? "We'll get back to you within 24 hours." : 'Te responderemos en las próximas 24 horas.'}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const studioItems = packageItems.filter(item => item.category === 'studio');
  const accommodationItems = packageItems.filter(item => item.category === 'accommodation');

  const renderServiceItem = (item: PackageItem) => {
    const Icon = item.icon;
    return (
      <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-white/30" />
          <div>
            <p className="font-akshar font-bold text-white text-sm">{language === 'en' ? item.nameEN : item.nameES}</p>
            <p className="font-mono-brand text-white/40">{formatUSD(item.price)} / {language === 'en' ? item.unit : item.unitES}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Minus className="w-4 h-4 text-white" />
          </button>
          <span className="w-8 text-center font-akshar font-bold text-lg text-white">{quantities[item.id]}</span>
          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-[#e63f0a] flex items-center justify-center hover:bg-[#c53508] transition-colors">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="booking" className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Subtle glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#e63f0a] rounded-full blur-[200px] opacity-[0.06]" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#2D9B9B] rounded-full blur-[160px] opacity-[0.04]" />
      </div>

      {/* Enso decoration */}
      <div className="absolute top-[-50px] right-[-100px] w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#fff" strokeWidth="5"
            strokeLinecap="round" strokeDasharray="600 400" transform="rotate(120 200 200)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Section Number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <span className="section-number text-white/20">03</span>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] mb-4">
                {language === 'en' ? 'BUILD YOUR PACKAGE' : 'CREA TU PAQUETE'}
              </h2>
              <p className="font-akshar text-lg text-white/50 max-w-xl">
                {language === 'en'
                  ? 'Customize your experience. Select services and accommodation to get an instant quote with 15% discount.'
                  : 'Personaliza tu experiencia. Selecciona servicios y alojamiento para obtener un presupuesto instantáneo con 15% de descuento.'}
              </p>
            </motion.div>

            {/* 2-Column: Studio | Accommodation */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 p-6 order-1"
              >
                <h3 className="font-anton text-xl text-white mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-[#e63f0a]" />
                  {language === 'en' ? 'STUDIO SERVICES' : 'SERVICIOS DE ESTUDIO'}
                </h3>
                <div className="space-y-1">{studioItems.map(renderServiceItem)}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 border border-white/10 p-6 order-2"
              >
                <h3 className="font-anton text-xl text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#e63f0a]" />
                  {language === 'en' ? 'ACCOMMODATION' : 'ALOJAMIENTO'}
                </h3>
                <div className="space-y-1">{accommodationItems.map(renderServiceItem)}</div>
              </motion.div>
            </div>

            {/* Summary & Contact */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border border-white/10 p-6"
              >
                <h3 className="font-anton text-xl text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#e63f0a]" />
                  {language === 'en' ? 'YOUR QUOTE' : 'TU PRESUPUESTO'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between font-akshar text-white/60">
                    <span>Subtotal</span>
                    <span className="font-mono-brand">{formatUSD(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-akshar text-[#2D9B9B]">
                    <span>{language === 'en' ? 'Discount (15%)' : 'Descuento (15%)'}</span>
                    <span className="font-mono-brand">-{formatUSD(discount)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="font-anton text-xl text-white">TOTAL</span>
                    <span className="font-mono-brand text-xl text-[#e63f0a] font-bold">{formatUSD(total)}</span>
                  </div>
                </div>
                {hasSelection && (
                  <p className="font-mono-brand text-white/30 mt-4">
                    {language === 'en' ? '* Prices valid until Dec 31, 2025' : '* Precios vigentes hasta el 31/12/2025'}
                  </p>
                )}
              </motion.div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-white/10 p-6 space-y-4"
              >
                <h3 className="font-anton text-lg text-white mb-2">
                  {language === 'en' ? 'CONTACT INFO' : 'INFORMACIÓN DE CONTACTO'}
                </h3>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 font-akshar text-white placeholder-white/30 focus:border-[#e63f0a] focus:outline-none transition-colors text-sm"
                  placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
                />
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 font-akshar text-white placeholder-white/30 focus:border-[#e63f0a] focus:outline-none transition-colors text-sm"
                  placeholder={language === 'en' ? 'Your email' : 'Tu email'}
                />
                <textarea
                  value={contactInfo.message}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 py-2 font-akshar text-white placeholder-white/30 focus:border-[#e63f0a] focus:outline-none transition-colors resize-none text-sm"
                  placeholder={language === 'en' ? 'Tell us about your project...' : 'Cuéntanos sobre tu proyecto...'}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !hasSelection}
                  className="w-full kayam-cta py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting ? (
                    <span className="font-akshar">{language === 'en' ? 'Sending...' : 'Enviando...'}</span>
                  ) : (
                    <>
                      <span className="font-akshar">{language === 'en' ? 'SEND REQUEST' : 'ENVIAR SOLICITUD'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

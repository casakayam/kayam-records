/*
  KAYAM RECORDS — Build Your Package Section
  Interactive package builder with studio services + accommodation.
  Component tree:
    BuildPackage
    ├── PackageHeader      (memo — re-renders on isOpen/jeromeActive/language)
    ├── ServiceCategoryCard × 2  (memo — re-renders on selection change)
    ├── PackageSummary     (memo — re-renders on selection change)
    └── ContactForm        (memo — local state, never triggers parent re-renders)
*/

import { useState, useMemo, useEffect, useReducer, memo } from "react";
import { KP, Eyebrow, Display, Script, Dots } from "./Hero";
import { Minus, Plus, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  type PackageItem,
  PACKAGE_ITEMS,
  PACKAGE_BY_ID,
  STUDIO_ITEMS,
  ACCOM_ITEMS,
  BUNDLE_DISCOUNT,
} from "@/data/catalog";

// ── Types ──────────────────────────────────────────────────────────────────

type ContactInfo = { name: string; email: string; message: string };

type State = {
  selection: Map<string, number>;
  isOpen: boolean;
  isHoveringJerome: boolean;
  isAutoHighlight: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
};

type Action =
  | { type: 'SET_QTY'; id: string; value: number }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_JEROME_HOVER'; value: boolean }
  | { type: 'SET_AUTO_HIGHLIGHT'; value: boolean }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL' };

// ── Reducer ────────────────────────────────────────────────────────────────

const initialState: State = {
  selection: new Map(),
  isOpen: false,
  isHoveringJerome: false,
  isAutoHighlight: false,
  isSubmitting: false,
  isSubmitted: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_QTY': {
      const next = new Map(state.selection);
      if (action.value <= 0) next.delete(action.id);
      else next.set(action.id, action.value);
      return { ...state, selection: next };
    }
    case 'TOGGLE_OPEN':       return { ...state, isOpen: !state.isOpen };
    case 'SET_JEROME_HOVER':  return { ...state, isHoveringJerome: action.value };
    case 'SET_AUTO_HIGHLIGHT':return { ...state, isAutoHighlight: action.value };
    case 'SUBMIT_START':      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':    return { ...state, isSubmitting: false, isSubmitted: true };
    case 'SUBMIT_FAIL':       return { ...state, isSubmitting: false };
    default:                  return state;
  }
}

// ── Static styles ──────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  inputField: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 4,
    padding: '12px 16px',
    color: '#ffffff',
    fontFamily: "'Akshar', sans-serif",
  },
  serviceCard: {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 8,
    padding: 'clamp(20px, 2.5vw, 32px)',
  },
  cardTitleBase: {
    fontFamily: "'Anton', sans-serif",
    fontSize: 18,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: 0,
  },
};

const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

// ── QtyControl ─────────────────────────────────────────────────────────────

function QtyControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        style={{ width: 32, height: 32, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', borderRight: 'none', color: KP.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 180ms' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.10)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
      ><Minus size={14} /></button>
      <div style={{ width: 40, height: 32, background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Akshar', sans-serif", fontWeight: 700, fontSize: 15, color: value > 0 ? KP.orange : 'rgba(0,0,0,0.3)' }}>
        {value}
      </div>
      <button
        onClick={() => onChange(value + 1)}
        style={{ width: 32, height: 32, background: KP.orange, border: `1px solid ${KP.orange}`, borderLeft: 'none', color: KP.beige, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 180ms' }}
        onMouseEnter={e => { e.currentTarget.style.background = KP.orangeWarm; }}
        onMouseLeave={e => { e.currentTarget.style.background = KP.orange; }}
      ><Plus size={14} /></button>
    </div>
  );
}

// ── ServiceRow — memo: only re-renders when qty changes for this item ───────
// dispatch (stable by useReducer guarantee) replaces inline onChange callback,
// preventing referential inequality from breaking memo.

const ServiceRow = memo(function ServiceRow({
  item,
  qty,
  dispatch,
}: {
  item: PackageItem;
  qty: number;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', gap: 16 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Akshar', sans-serif", fontWeight: 600, fontSize: 14, color: qty > 0 ? KP.ink : 'rgba(0,0,0,0.6)', transition: 'color 180ms' }}>
          {item.name}
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>
          {formatUSD(item.price)} {item.unit}
        </div>
      </div>
      <QtyControl
        value={qty}
        onChange={v => dispatch({ type: 'SET_QTY', id: item.id, value: v })}
      />
    </div>
  );
});

// ── ServiceCategoryCard — memo: re-renders only when selection changes ──────

const ServiceCategoryCard = memo(function ServiceCategoryCard({
  title,
  icon,
  items,
  selection,
  dispatch,
  style,
}: {
  title: string;
  icon: React.ReactNode;
  items: ReadonlyArray<PackageItem>;
  selection: Map<string, number>;
  dispatch: React.Dispatch<Action>;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ ...S.serviceCard, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${KP.forest}` }}>
        {icon}
        <h3 style={{ ...S.cardTitleBase, color: KP.ink }}>{title}</h3>
      </div>
      {items.map(item => (
        <ServiceRow
          key={item.id}
          item={item}
          qty={selection.get(item.id) ?? 0}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
});

// ── PackageSummary — memo: re-renders only when selection changes ────────────

const PackageSummary = memo(function PackageSummary({
  selection,
  language,
}: {
  selection: Map<string, number>;
  language: string;
}) {
  const { subtotal, discount, total, selectedItems } = useMemo(() => {
    let sub = 0;
    for (const [id, qty] of selection) {
      sub += (PACKAGE_BY_ID.get(id)?.price ?? 0) * qty;
    }
    const disc = sub * BUNDLE_DISCOUNT;
    const selectedItems = PACKAGE_ITEMS.filter(item => selection.has(item.id));
    return { subtotal: sub, discount: disc, total: sub - disc, selectedItems };
  }, [selection]);

  const hasSelection = selection.size > 0;

  return (
    <div style={{ ...S.serviceCard, marginBottom: 24 }}>
      <h3 style={{ ...S.cardTitleBase, color: KP.ink, margin: '0 0 20px', paddingBottom: 16, borderBottom: `2px solid ${KP.forest}` }}>
        {language === 'en' ? 'Your Quote' : 'Tu Cotización'}
      </h3>

      <AnimatePresence>
        {selectedItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          >
            <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.7)' }}>
              {item.name} × {selection.get(item.id)}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>
              {formatUSD(item.price * (selection.get(item.id) ?? 0))}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {!hasSelection && (
        <p style={{ fontFamily: "'Akshar', sans-serif", fontSize: 14, color: 'rgba(0,0,0,0.3)', textAlign: 'center', padding: '24px 0' }}>
          {language === 'en' ? 'Select services to see your quote' : 'Selecciona servicios para ver tu cotización'}
        </p>
      )}

      {hasSelection && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>Subtotal</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>{formatUSD(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 14, color: KP.forest }}>
              {language === 'en' ? 'Bundle discount (15%)' : 'Descuento paquete (15%)'}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: KP.forest }}>−{formatUSD(discount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0 0', borderTop: `2px solid ${KP.forest}`, marginTop: 8 }}>
            <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 16, fontWeight: 600, color: KP.ink }}>
              {language === 'en' ? 'Total Quote' : 'Cotización Total'}
            </span>
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, color: KP.ink }}>{formatUSD(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
});

// ── ContactForm — memo: local state, typing never triggers parent re-renders ─

const ContactForm = memo(function ContactForm({
  isSubmitting,
  onSubmit,
  language,
}: {
  isSubmitting: boolean;
  onSubmit: (info: ContactInfo) => void;
  language: string;
}) {
  const [info, setInfo] = useState<ContactInfo>({ name: '', email: '', message: '' });
  const set = (field: keyof ContactInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setInfo(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div style={{ background: KP.forest, borderRadius: 8, padding: 'clamp(20px, 2.5vw, 32px)', color: KP.beige }}>
      <h3 style={{ ...S.cardTitleBase, margin: '0 0 20px', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        {language === 'en' ? 'Ready to Book?' : '¿Listo para Reservar?'}
      </h3>
      <form onSubmit={e => { e.preventDefault(); onSubmit(info); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="text" placeholder={language === 'en' ? 'Your Name' : 'Tu Nombre'} required value={info.name} onChange={set('name')} style={S.inputField} />
        <input type="email" placeholder={language === 'en' ? 'Email Address' : 'Correo Electrónico'} required value={info.email} onChange={set('email')} style={S.inputField} />
        <textarea placeholder={language === 'en' ? 'Project details (dates, vibe, etc.)' : 'Detalles del proyecto (fechas, estilo, etc.)'} rows={4} value={info.message} onChange={set('message')} style={{ ...S.inputField, resize: 'none' }} />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ background: KP.orange, color: KP.beige, border: 'none', borderRadius: 4, padding: '14px', fontFamily: "'Akshar', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', marginTop: 8, transition: 'background 200ms' }}
          onMouseEnter={e => e.currentTarget.style.background = KP.orangeWarm}
          onMouseLeave={e => e.currentTarget.style.background = KP.orange}
        >
          {isSubmitting ? (language === 'en' ? 'Sending...' : 'Enviando...') : (language === 'en' ? 'Request Booking' : 'Solicitar Reserva')}
        </button>
      </form>
    </div>
  );
});

// ── PackageHeader — memo: re-renders on isOpen / jeromeActive / language ────
// dispatch is stable (useReducer guarantee) — safe to pass as prop to memo.

const PackageHeader = memo(function PackageHeader({
  isOpen,
  jeromeActive,
  language,
  dispatch,
}: {
  isOpen: boolean;
  jeromeActive: boolean;
  language: string;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Eyebrow color="rgba(26,26,26,0.5)" style={{ display: 'block', marginBottom: 8 }}>
          {language === 'en' ? 'Customize your experience' : 'Personaliza tu experiencia'}
        </Eyebrow>
        <Eyebrow color="rgba(26,26,26,0.3)">Guatapé, Antioquia · Colombia</Eyebrow>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 8 }}>
        <Display size={'clamp(48px, 5.6vw, 80px)'} color={KP.ink} as="h2">
          {language === 'en' ? 'Build Your Package' : 'Crea Tu Paquete'}
        </Display>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_OPEN' })}
          style={{ display: 'flex', alignItems: 'center', gap: 8, transform: 'translateY(-4px)', background: KP.orange, border: 'none', borderRadius: 4, padding: '10px 18px', color: KP.beige, cursor: 'pointer', fontFamily: "'Akshar', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'background 200ms', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = KP.orangeWarm; }}
          onMouseLeave={e => { e.currentTarget.style.background = KP.orange; }}
        >
          {isOpen ? (language === 'en' ? 'Collapse' : 'Cerrar') : (language === 'en' ? 'Expand' : 'Expandir')}
          <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 300ms cubic-bezier(0.2,0.7,0.2,1)' }} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(16px, 3vw, 32px)', marginTop: 12, marginBottom: 24 }}>
        <Script color={KP.orange} size={'clamp(28px, 3vw, 40px)'}>studio + stay</Script>

        {/* WhatsApp CTA */}
        <div
          id="call-jerome"
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => dispatch({ type: 'SET_JEROME_HOVER', value: true })}
          onMouseLeave={() => dispatch({ type: 'SET_JEROME_HOVER', value: false })}
        >
          <a
            href="https://wa.me/573215764841"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: jeromeActive ? '#25D366' : KP.forest, cursor: 'pointer', transform: jeromeActive ? 'scale(1.05)' : 'scale(1)', transition: 'all 300ms cubic-bezier(0.2, 0.7, 0.2, 1)', filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.05))' }}
          >
            <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 600, lineHeight: 1.2 }}>
              {language === 'en' ? 'Call Jerome to talk about your project' : 'Llama a Jerome para hablar de tu proyecto'}
            </span>
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 300ms', color: jeromeActive ? '#25D366' : 'currentColor' }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>

          <AnimatePresence>
            {jeromeActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0, rotate: 4 }}
                exit={{ opacity: 0, scale: 0.8, x: -20, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ position: 'absolute', left: '100%', marginLeft: 24, width: 160, background: '#ffffff', borderRadius: 4, padding: 16, boxShadow: '6px 6px 0 rgba(0,0,0,0.8)', border: '2px solid #1a1a1a', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}
              >
                <div style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: 12, border: '2px solid #1a1a1a', overflow: 'hidden', background: '#e4e2dd' }}>
                  <img src="/assets/jerome_avatar.jpg" alt="Jérôme Filippi, sound engineer at Kayam Records" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.4)', transformOrigin: 'center 20%' }} />
                </div>
                <Script color={KP.ink} size={32} style={{ lineHeight: 0.8 }}>Jerome</Script>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#1a1a1a', marginTop: 8, textTransform: 'uppercase', fontWeight: 'bold', background: '#25D366', padding: '4px 8px', borderRadius: 12 }}>Online</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Dots color={KP.orange} style={{ width: 100, opacity: 0.5 }} />
        <Dots color={KP.forest} style={{ width: 50, opacity: 0.3 }} />
      </div>

      <p style={{ fontFamily: "'Akshar', sans-serif", fontSize: 16, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', maxWidth: 560, marginTop: 24 }}>
        {language === 'en'
          ? <>Select services and accommodation to get an instant quote. All packages include a <strong style={{ color: KP.orange }}>15% bundle discount</strong>.</>
          : <>Selecciona servicios y alojamiento para obtener una cotización instantánea. Todos los paquetes incluyen un <strong style={{ color: KP.orange }}>15% de descuento</strong>.</>}
      </p>
    </>
  );
});

// ── BuildPackage ───────────────────────────────────────────────────────────

export default function BuildPackage() {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selection, isOpen, isHoveringJerome, isAutoHighlight, isSubmitting, isSubmitted } = state;

  const hasSelection = selection.size > 0;
  const jeromeActive = isHoveringJerome || isAutoHighlight;

  useEffect(() => {
    const handle = (id: string) => {
      if (id !== 'call-jerome') return;
      dispatch({ type: 'SET_AUTO_HIGHLIGHT', value: true });
      setTimeout(() => dispatch({ type: 'SET_AUTO_HIGHLIGHT', value: false }), 3000);
    };
    const onHash   = () => handle(window.location.hash.replace('#', ''));
    const onCustom = (e: any) => handle(e.detail);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('sectionChange', onCustom);
    handle(window.location.hash.replace('#', ''));
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('sectionChange', onCustom);
    };
  }, []);

  const handleFormSubmit = async (info: ContactInfo) => {
    if (!hasSelection) {
      toast.error(language === 'en' ? 'Please select at least one service' : 'Por favor selecciona al menos un servicio');
      return;
    }
    dispatch({ type: 'SUBMIT_START' });

    try {
      const package_details = Array.from(selection.entries()).map(([id, qty]) => {
        const item = PACKAGE_BY_ID.get(id);
        return `${item?.name || id} (x${qty})`;
      }).join('\n');

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bbeafa7a-3cea-460f-9c11-281542adf91c",
          subject: "New Package Request from Kayam Records",
          from_name: info.name,
          email: info.email,
          message: info.message,
          package_details: package_details,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'SUBMIT_SUCCESS' });
        toast.success(language === 'en' ? 'Request sent successfully!' : '¡Solicitud enviada con éxito!');
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      dispatch({ type: 'SUBMIT_FAIL' });
      toast.error(language === 'en' ? 'Failed to send request. Please try again.' : 'Error al enviar la solicitud. Inténtalo de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" style={{ position: 'relative', background: '#fbf9f4', paddingTop: 120, paddingBottom: 120, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '80px 0' }}>
            <CheckCircle size={64} color={KP.orange} style={{ margin: '0 auto 24px' }} />
            <Display size={'clamp(36px, 4vw, 56px)'} color={KP.ink} as="h2">Request Sent!</Display>
            <p style={{ fontFamily: "'Akshar', sans-serif", fontSize: 16, color: 'rgba(26,26,26,0.6)', marginTop: 16 }}>We'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" style={{ position: 'relative', background: '#fbf9f4', paddingTop: 180, paddingBottom: 120, overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04, zIndex: 1, background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: 'absolute', top: 80, left: -60, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${KP.orange}08, transparent 70%)`, pointerEvents: 'none' }} />
      <svg width="300" height="60" viewBox="0 0 300 60" style={{ position: 'absolute', top: '10%', right: '8%', opacity: 0.08, color: KP.forest, pointerEvents: 'none', transform: 'rotate(-5deg)' }}>
        <path d="M0 30 Q 15 10, 30 30 T 60 30 T 90 30 T 120 30 T 150 30 T 180 30 T 210 30 T 240 30 T 270 30 T 300 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0 40 Q 20 15, 40 40 T 80 40 T 120 40 T 160 40 T 200 40 T 240 40 T 280 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
      <svg width="200" height="40" viewBox="0 0 200 40" style={{ position: 'absolute', bottom: '5%', left: '5%', opacity: 0.06, color: KP.orange, pointerEvents: 'none', transform: 'rotate(12deg)' }}>
        <path d="M0 20 L 10 20 L 15 5 L 25 35 L 30 20 L 50 20 L 55 10 L 65 30 L 70 20 L 100 20 L 105 0 L 115 40 L 120 20 L 150 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <img src="/assets/tache-orange-warm.png" alt="" loading="lazy" style={{ position: 'absolute', top: -100, right: -80, width: 500, height: 500, opacity: 0.08, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      <img src="/assets/tache-ink.png" alt="" loading="lazy" style={{ position: 'absolute', bottom: -50, left: -100, width: 400, height: 400, opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', transform: 'rotate(-30deg)' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)' }}>
        <motion.div
          whileHover={{ scale: 1.012, boxShadow: '0 24px 60px rgba(7, 66, 66, 0.18)', backgroundColor: 'rgba(7, 66, 66, 0.08)', borderColor: KP.forest }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          style={{ marginTop: -120, marginBottom: 64, border: `1.5px solid ${KP.forest}`, padding: 'clamp(24px, 4vw, 48px)', borderRadius: 12, position: 'relative', zIndex: 1, backgroundColor: 'rgba(7, 66, 66, 0.03)', boxShadow: 'none', transformOrigin: 'center center' }}
        >
          <PackageHeader
            isOpen={isOpen}
            jeromeActive={jeromeActive}
            language={language}
            dispatch={dispatch}
          />

          {/* Collapsible service grid */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="package-content"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ height: '2px', background: `repeating-linear-gradient(to right, ${KP.forest} 0, ${KP.forest} 4px, transparent 4px, transparent 8px)`, opacity: 0.2, marginBottom: 48 }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(32px, 4vw, 56px)', alignItems: 'start' }}>
                  {/* Left: service selectors */}
                  <div>
                    <ServiceCategoryCard
                      title="Studio Services"
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={KP.orange} strokeWidth="2" strokeLinecap="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                      }
                      items={STUDIO_ITEMS}
                      selection={selection}
                      dispatch={dispatch}
                      style={{ marginBottom: 24 }}
                    />
                    <ServiceCategoryCard
                      title={language === 'en' ? 'Accommodation' : 'Alojamiento'}
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={KP.orange} strokeWidth="2" strokeLinecap="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      }
                      items={ACCOM_ITEMS}
                      selection={selection}
                      dispatch={dispatch}
                    />
                  </div>

                  {/* Right: quote + contact */}
                  <div>
                    <PackageSummary selection={selection} language={language} />
                    <ContactForm isSubmitting={isSubmitting} onSubmit={handleFormSubmit} language={language} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

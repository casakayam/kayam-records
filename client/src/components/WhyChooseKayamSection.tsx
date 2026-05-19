/*
 * WhyChooseKayamSection — isometric cursor-tilt scene.
 *
 * Interaction model
 * -----------------
 * 1. mousemove on the section gives normalized cursor offset n ∈ [-1, 1].
 * 2. The whole 2×2 grid is wrapped in a `.scene` whose transform is:
 *        rotateX(-n.y * MAX_TILT) rotateY(n.x * MAX_TILT)
 *    producing a soft isometric tilt that follows the pointer.
 * 3. Each card has its own translateZ depth, so parallax happens "for free":
 *    cards closer to the camera shift more during the tilt.
 * 4. On pointerleave the scene eases back to flat (0/0) via a CSS transition.
 *
 * Mouse-move handler stores values directly on a ref'd element via
 * style.setProperty to avoid React re-renders on every frame.
 */

import { useEffect, useRef, useState } from "react";

const MAX_TILT = 4; // degrees

export default function WhyChooseKayamSection() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      scene.style.transform = `rotateX(${(-ty * MAX_TILT).toFixed(2)}deg) rotateY(${(tx * MAX_TILT).toFixed(2)}deg)`;
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32 px-6 md:px-12 antialiased"
      style={{ backgroundColor: "#e4e2dd" }}
    >
      {/* Header */}
      <header className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
        <div
          className="flex items-center justify-center gap-4 mb-6 text-[#1a5f5a]"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span className="h-px w-10 bg-[#1a5f5a]" />
          <span className="text-xs tracking-[0.35em] uppercase">
            Distinctive Edge
          </span>
          <span className="h-px w-10 bg-[#1a5f5a]" />
        </div>

        <h2
          className="text-5xl md:text-7xl uppercase leading-[0.95] text-black"
          style={{ fontFamily: "Anton, sans-serif", letterSpacing: "-0.01em" }}
        >
          Why Choose <span style={{ color: "#e63f0a" }}>Kayam</span>
          <br />
          Over Medellín?
        </h2>

        <p
          className="mt-6 text-2xl md:text-3xl"
          style={{ fontFamily: "'Allura', cursive", color: "#e63f0a" }}
        >
          Medellín gives you a studio. Kayam gives you a reason to stay.
        </p>

        <p
          className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-black/70 leading-relaxed"
          style={{ fontFamily: "Akshar, sans-serif" }}
        >
          In Medellín, you rent hours. Here, you inhabit a process. The lake,
          the finca, the resident engineer — everything is designed to keep you
          inside the creative state, not outside of it.
        </p>
      </header>

      {/* Stage: cursor-tracked 3D grid */}
      <div
        ref={stageRef}
        className="max-w-6xl mx-auto"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      >
        <div
          ref={sceneRef}
          className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-[1fr] gap-6 md:gap-8 transition-transform duration-[600ms] ease-out"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Card 1 — Jérôme portrait (cream w/ teal corner accents) */}
          <Card3D depth={30}>
            <div className="relative h-full">
              <div
                className="relative h-full bg-[#f1efe9] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Polaroid Stack */}
                <div className="relative w-[95%] md:w-[55%] flex-shrink-0 aspect-[4/5] -ml-2 md:-ml-24 mt-4 md:mt-0" style={{ transformStyle: "preserve-3d" }}>
                  {/* Layer 1: Light Beige frame (Back) */}
                  <div
                    className="absolute inset-0 bg-[#e4e2dd] shadow-lg border border-black/5"
                    style={{
                      transform: "translateZ(5px) rotate(4deg) scale(1.02) translate(8px, 12px)",
                    }}
                  />

                  {/* Layer 2: Teal frame (Middle) */}
                  <div
                    className="absolute inset-0 bg-[#134e48] shadow-lg"
                    style={{
                      transform: "translateZ(10px) rotate(-3deg) scale(1.02) translate(-6px, -4px)",
                    }}
                  />

                  {/* Layer 3: Polaroid frame (Front) */}
                  <div
                    className="absolute inset-0 bg-[#fdfcfaf0] p-3 pb-12 shadow-2xl"
                    style={{
                      transform: "translateZ(25px) rotate(1deg)",
                    }}
                  >
                    <div
                      className="w-full h-full bg-neutral-800"
                      style={{
                        filter: "grayscale(1) contrast(1.05)",
                        backgroundImage: "url('/assets/Rec_clase_cropped_89772ebe.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center" style={{ transform: "translateZ(15px)" }}>
                  <div
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-3"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#e63f0a" }}
                  >
                    <span className="h-px w-6 bg-[#e63f0a]" />
                    Expert Guidance
                  </div>
                  <h3
                    className="text-3xl md:text-4xl uppercase leading-[0.95] text-black mb-3"
                    style={{ fontFamily: "Anton, sans-serif" }}
                  >
                    Jérôme
                    <br />
                    Filippi
                  </h3>
                  <p
                    className="text-sm text-black/90 leading-relaxed mb-5"
                    style={{ fontFamily: "Akshar, sans-serif" }}
                  >
                    A dedicated resident engineer. 15 years of expertise. SAE Paris certified. No rotating freelancers—just uncompromising technical precision for your sound.
                  </p>
                  <div
                    className="flex flex-wrap gap-2 text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    <span className="px-3 py-1.5 bg-[#e63f0a] text-white">
                      15 yrs
                    </span>
                    <span className="px-3 py-1.5 border border-black/40 text-black/90">
                      SAE Paris
                    </span>
                    <span className="px-3 py-1.5 border border-black/40 text-black/90">
                      Resident
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Card 2 — Orange RT60 */}
          <Card3D depth={55}>
            <div
              className="h-full p-8 md:p-10 text-white flex flex-col justify-center"
              style={{ backgroundColor: "#e63f0a" }}
            >
              <h3
                className="uppercase leading-[0.9] mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                }}
              >
                RT60
                <br />
                0.2–0.3<span className="text-3xl md:text-5xl">s</span>
              </h3>
              <p
                className="text-sm md:text-base uppercase tracking-[0.2em] mb-6 text-white/90"
                style={{ fontFamily: "Anton, sans-serif", letterSpacing: "0.15em" }}
              >
                Professional Acoustics
              </p>

              <p
                className="text-sm md:text-base leading-relaxed mb-4 font-light"
                style={{ fontFamily: "Akshar, sans-serif" }}
              >
                <strong className="font-medium text-black">Control room</strong> — precision
                monitoring, professional signal chain, zero flattery.
              </p>
              <p
                className="text-sm md:text-base leading-relaxed font-light"
                style={{ fontFamily: "Akshar, sans-serif" }}
              >
                <strong className="font-medium text-black">Live room</strong> — acoustically
                treated, isolated vocal booth. What you record is exactly what
                you hear.
              </p>
            </div>
          </Card3D>

          {/* Card 3 — Teal Ecosystem */}
          <Card3D depth={45}>
            <div
              className="h-full relative flex flex-col justify-end text-[#e4e2dd] p-6 md:p-10 overflow-hidden"
              style={{
                backgroundImage: "url('/assets/ecosystem-wide_a1734187.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2724]/95 via-[#0b2724]/60 to-transparent" />

              {/* Text content */}
              <div className="relative z-10 w-full mt-auto">
                <h3
                  className="text-3xl md:text-5xl uppercase leading-[0.95] mb-6 drop-shadow-lg"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  All-in-One<br />Ecosystem
                </h3>

                <ul
                  className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 text-sm md:text-base tracking-[0.2em] uppercase font-medium drop-shadow-md"
                  style={{ fontFamily: "'DM Mono', monospace", color: "white" }}
                >
                  {["Record", "Sleep", "Eat", "Breathe"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(230,63,10,0.8)]"
                        style={{ backgroundColor: "#e63f0a" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p
                  className="text-base md:text-lg leading-relaxed mb-6 text-white drop-shadow-md font-light"
                  style={{ fontFamily: "Akshar, sans-serif" }}
                >
                  Your creative energy isn't wasted on logistics or city traffic.
                </p>

                <p
                  className="text-4xl md:text-5xl drop-shadow-md"
                  style={{
                    fontFamily: "'Allura', cursive",
                    color: "#e63f0a",
                  }}
                >
                  Pure focus
                </p>
              </div>
            </div>
          </Card3D>

          {/* Card 4 — Active Community */}
          <Card3D depth={35}>
            <div className="h-full bg-[#f1efe9] p-5 md:p-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col justify-center" style={{ transform: "translateZ(15px)" }}>
                <div
                  className="inline-block self-start px-3 py-1.5 mb-3 text-white uppercase tracking-[0.15em]"
                  style={{
                    backgroundColor: "#134e48",
                    fontFamily: "Anton, sans-serif",
                    fontSize: "1.4rem",
                  }}
                >
                  Active Community
                </div>
                <p
                  className="text-sm md:text-base text-black/90 leading-relaxed mb-4"
                  style={{ fontFamily: "Akshar, sans-serif" }}
                >
                  Resident artists. Spontaneous jam sessions. Wandering musicians. You are not just renting a room—you are plugging into a thriving creative ecosystem.
                </p>
                <p
                  className="text-2xl md:text-3xl font-medium"
                  style={{
                    fontFamily: "'Allura', cursive",
                    color: "#e63f0a",
                  }}
                >
                  stay longer, stay different
                </p>
              </div>

              {/* Polaroid cluster — overlapping closer */}
              <div className="relative w-full md:w-[48%] self-stretch min-h-[170px]" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="absolute top-1 left-0 w-[72%] aspect-[4/3] bg-white p-1.5 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.45)]"
                  style={{
                    transform: "translateZ(40px) rotate(-4deg)",
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      filter: "grayscale(1) contrast(1.05)",
                      backgroundImage:
                        "url('/assets/community-gathering-new_1871feb6.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <div
                  className="absolute top-[38%] right-0 w-[72%] aspect-[4/3] bg-white p-1.5 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.45)]"
                  style={{
                    transform: "translateZ(60px) rotate(5deg)",
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      filter: "grayscale(1) contrast(1.05)",
                      backgroundImage:
                        "url('/assets/community-workshop_1bcbecfd.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}

function Card3D({
  depth,
  className = "",
  children,
}: {
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`h-full transition-all duration-300 ease-out cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${isHovered ? depth + 15 : depth}px) translateY(${isHovered ? "-8px" : "0px"})`,
        boxShadow: isHovered
          ? `0 ${depth / 2 + 20}px ${depth + 30}px -${depth / 3}px rgba(0,0,0,0.3)`
          : `0 ${depth / 2 + 10}px ${depth + 20}px -${depth / 3}px rgba(0,0,0,0.18)`,
      }}
    >
      {children}
    </div>
  );
}

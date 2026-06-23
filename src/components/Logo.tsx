/**
 * Brand wordmark "Elizabeth" as a clean, vector-style circuit logo:
 *  - "E" and "abeth." in pure white, sharp typography
 *  - "Liz" set in an IC-chip badge with a Microsoft-style purple→blue gradient
 *    (#8B5CF6 → #6366F1) and a subtle glow — the focal logo
 *  - minimal decorative circuitry (pins, a top antenna via, a couple of branch
 *    traces) — roughly half the density of the source art
 * Fully transparent (no raster background) and resolution-independent, so it
 * works for headers, banners, favicons, and business cards alike.
 */

const liz: React.CSSProperties = {
  backgroundImage: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 0 6px rgba(139,92,246,0.55))",
};

export default function Logo() {
  return (
    <span
      role="img"
      aria-label="Elizabeth"
      className="relative inline-flex items-center select-none font-display text-2xl font-bold tracking-tight"
    >
      {/* E */}
      <span className="text-white">E</span>

      {/* left lead-in traces into the chip (reduced circuitry) */}
      <svg viewBox="0 0 12 28" fill="none" aria-hidden="true" className="h-7 w-3 overflow-visible">
        <line x1="0" y1="14" x2="12" y2="14" stroke="rgba(255,255,255,0.45)" strokeWidth={1.1} strokeLinecap="round" />
        <line x1="5" y1="20" x2="12" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth={1.1} strokeLinecap="round" />
        <circle cx="0" cy="14" r="1.5" fill="#c4b5fd" />
      </svg>

      {/* chip badge: "Liz" */}
      <span className="relative rounded-lg border border-white/30 px-2 py-0.5 shadow-[0_0_18px_rgba(139,92,246,0.3)]">
        <span style={liz}>Liz</span>

        {/* top antenna via */}
        <svg viewBox="0 0 8 14" fill="none" aria-hidden="true" className="absolute -top-3 left-1/2 h-3 w-2 -translate-x-1/2 overflow-visible">
          <line x1="4" y1="14" x2="4" y2="4" stroke="rgba(255,255,255,0.4)" strokeWidth={1.1} strokeLinecap="round" />
          <circle cx="4" cy="2" r="1.6" fill="#a78bfa" />
        </svg>

        {/* bottom pins */}
        <svg viewBox="0 0 28 8" fill="none" aria-hidden="true" className="absolute -bottom-2 left-1/2 h-2 w-7 -translate-x-1/2 overflow-visible">
          {[7, 14, 21].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth={1.1} strokeLinecap="round" />
          ))}
        </svg>

        {/* corner vias */}
        <span className="absolute top-1 left-1 h-1 w-1 rounded-full bg-white/50" />
        <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-violet-400/80" />
      </span>

      {/* right lead-out trace + branch via (reduced circuitry) */}
      <svg viewBox="0 0 16 28" fill="none" aria-hidden="true" className="h-7 w-4 overflow-visible">
        <line x1="0" y1="14" x2="16" y2="14" stroke="rgba(255,255,255,0.45)" strokeWidth={1.1} strokeLinecap="round" />
        <path d="M0 9 H8 L11 6 H16" stroke="rgba(255,255,255,0.28)" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="6" r="1.4" fill="#c4b5fd" />
      </svg>

      {/* abeth. */}
      <span className="text-white">abeth.</span>
    </span>
  );
}

/**
 * Brand wordmark "Elizabeth" — clean, type-led, in the spirit of Linear /
 * Stripe / Notion. White typography with the nickname "liz" in a subtle
 * purple→blue gradient, and a single tiny circuit hint: a small via node in
 * place of the trailing dot. No chip, no motherboard.
 */
export default function Logo() {
  return (
    <span
      role="img"
      aria-label="Elizabeth"
      className="inline-flex items-baseline font-display text-2xl font-semibold tracking-tight text-white select-none"
    >
      E
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #6366F1)" }}
      >
        liz
      </span>
      abeth
      {/* tiny circuit hint — a glowing via node as the period */}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[5px] w-[5px] translate-y-[1px] rounded-full bg-[#8B5CF6] shadow-[0_0_6px_rgba(139,92,246,0.7)]"
      />
    </span>
  );
}

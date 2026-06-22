"use client";

/**
 * Living aurora backdrop + film grain. Sits behind all content.
 * Purely decorative; respects reduced-motion via globals.css.
 */
export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="aurora absolute -inset-[20%]" />
      <div className="grain absolute inset-0" />
      {/* subtle vignette to focus the eye */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(0,0,0,0.5))]" />
    </div>
  );
}

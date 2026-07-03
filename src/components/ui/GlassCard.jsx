// src/components/ui/GlassCard.jsx
import React from "react";

/**
 * GlassCard – a reusable container with premium glass‑morphism styling.
 *
 * Props:
 *   - children: React nodes to render inside the card.
 *   - className?: additional Tailwind classes (optional).
 *   - style?: inline style object (optional).
 *   - title?: optional header text; if provided a header bar is rendered.
 *   - footer?: optional footer node rendered at the bottom.
 */
export default function GlassCard({
  children,
  className = "",
  style = {},
  title,
  footer,
}) {
  return (
    <div
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.12)] 
        flex flex-col overflow-hidden 
        ${className}
      `}
      style={style}
    >
      {title && (
        <div className="px-4 py-2 bg-white/10 border-b border-white/15 text-sm font-medium text-white/80">
          {title}
        </div>
      )}
      <div className="p-4 flex-1 text-white/90">
        {children}
      </div>
      {footer && <div className="px-4 py-2 border-t border-white/15 bg-white/5">{footer}</div>}
    </div>
  );
}

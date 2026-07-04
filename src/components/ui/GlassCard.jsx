// src/components/ui/GlassCard.jsx
import React from "react";

/**
 * GlassCard – a reusable container with premium glass‑morphism styling.
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
        card-glass flex flex-col overflow-hidden 
        ${className}
      `}
      style={style}
    >
      {title && (
        <div className="px-5 py-3.5 bg-white/3 border-b border-white/5 text-sm font-bold text-white uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="p-5 flex-1 text-slate-200">
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3 border-t border-white/5 bg-white/1">
          {footer}
        </div>
      )}
    </div>
  );
}

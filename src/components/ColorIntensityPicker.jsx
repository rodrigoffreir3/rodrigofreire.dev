import React, { useState, useEffect } from "react";

// Converte string rgba() ou hex em objeto { hex, alpha (0-1) }
export function parseColor(colorStr) {
  if (!colorStr) return { hex: "#2563eb", alpha: 1 };
  
  const str = colorStr.trim();
  
  // Tenta extrair rgba(r, g, b, a) ou rgb(r, g, b)
  const rgbaMatch = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    
    const hex = "#" + [r, g, b].map(x => {
      const hexPart = x.toString(16);
      return hexPart.length === 1 ? "0" + hexPart : hexPart;
    }).join("");
    
    return { hex, alpha: Math.min(1, Math.max(0, a)) };
  }
  
  // Tenta hex #rrggbb ou #rgb
  if (str.startsWith("#")) {
    let hex = str;
    if (hex.length === 4) {
      hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    return { hex, alpha: 1 };
  }
  
  return { hex: "#2563eb", alpha: 1 };
}

// Converte hex (#rrggbb) e opacidade (0-1) para rgba()
export function toRgbaString(hex, alpha) {
  const parsed = parseColor(hex);
  const cleanHex = parsed.hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  
  const cleanAlpha = Math.round(alpha * 100) / 100;
  return `rgba(${r}, ${g}, ${b}, ${cleanAlpha})`;
}

const PRESET_COLORS = [
  { name: "Vidro Apple (62%)", value: "rgba(17, 24, 39, 0.62)" },
  { name: "Vidro Escuro (85%)", value: "rgba(11, 15, 25, 0.85)" },
  { name: "Azul Royal", value: "rgba(37, 99, 235, 1)" },
  { name: "Azul Safira Glow", value: "rgba(59, 130, 246, 0.5)" },
  { name: "Ciano Técnico", value: "rgba(14, 165, 233, 0.85)" },
  { name: "Verde Esmeralda", value: "rgba(16, 185, 129, 0.85)" },
  { name: "Borda Cristal (12%)", value: "rgba(255, 255, 255, 0.12)" },
  { name: "Overlay Noturno (75%)", value: "rgba(9, 13, 22, 0.75)" },
  { name: "Totalmente Transparente", value: "rgba(0, 0, 0, 0)" }
];

export default function ColorIntensityPicker({ label, value, onChange }) {
  const { hex, alpha } = parseColor(value);
  const [currentHex, setCurrentHex] = useState(hex);
  const [currentAlpha, setCurrentAlpha] = useState(alpha);

  useEffect(() => {
    const parsed = parseColor(value);
    setCurrentHex(parsed.hex);
    setCurrentAlpha(parsed.alpha);
  }, [value]);

  const handleHexChange = (newHex) => {
    setCurrentHex(newHex);
    const newRgba = toRgbaString(newHex, currentAlpha);
    onChange(newRgba);
  };

  const handleAlphaChange = (newAlphaPercent) => {
    const newAlpha = Math.min(1, Math.max(0, newAlphaPercent / 100));
    setCurrentAlpha(newAlpha);
    const newRgba = toRgbaString(currentHex, newAlpha);
    onChange(newRgba);
  };

  const handlePresetSelect = (presetValue) => {
    const parsed = parseColor(presetValue);
    setCurrentHex(parsed.hex);
    setCurrentAlpha(parsed.alpha);
    onChange(presetValue);
  };

  const alphaPercent = Math.round(currentAlpha * 100);
  const rgbaDisplay = toRgbaString(currentHex, currentAlpha);

  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "16px",
      padding: "1.25rem",
      marginBottom: "1.25rem",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)"
    }}>
      {label && (
        <label style={{ display: "block", marginBottom: "0.85rem", fontWeight: "700", color: "#f8fafc", fontSize: "0.95rem" }}>
          {label}
        </label>
      )}

      {/* Painel Principal de Seleção Visual */}
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        
        {/* 1. Botão da Paleta de Cor com Seletor Nativo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" }}>Paleta / Matiz</span>
          <div style={{
            position: "relative",
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            cursor: "pointer"
          }}>
            <input
              type="color"
              value={currentHex}
              onChange={(e) => handleHexChange(e.target.value)}
              style={{
                position: "absolute",
                top: "-12px",
                left: "-12px",
                width: "80px",
                height: "80px",
                border: "none",
                cursor: "pointer",
                background: "transparent"
              }}
              title="Clique para abrir a paleta de cores"
            />
          </div>
          <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#f8fafc" }}>{currentHex.toUpperCase()}</span>
        </div>

        {/* 2. Barra de Intensidade / Opacidade (Slider) */}
        <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "500" }}>Intensidade / Opacidade:</span>
            <span style={{ fontWeight: "700", color: "#60a5fa", fontSize: "0.95rem" }}>{alphaPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={alphaPercent}
            onChange={(e) => handleAlphaChange(Number(e.target.value))}
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "4px",
              accentColor: "#3b82f6",
              cursor: "pointer"
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b" }}>
            <span>Translúcido (0%)</span>
            <span>Sólido (100%)</span>
          </div>
        </div>

        {/* 3. Amostra do Resultado Final (Preview com Fundo Xadrez para transparência) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" }}>Preview</span>
          <div style={{
            width: "60px",
            height: "56px",
            borderRadius: "12px",
            border: "2px solid rgba(255,255,255,0.4)",
            backgroundImage: "linear-gradient(45deg, #334155 25%, transparent 25%), linear-gradient(-45deg, #334155 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #334155 75%), linear-gradient(-45deg, transparent 75%, #334155 75%)",
            backgroundSize: "12px 12px",
            backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              backgroundColor: rgbaDisplay
            }} />
          </div>
          <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Camada</span>
        </div>

      </div>

      {/* 4. Campo de Código RGBA Técnico */}
      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Código RGBA:</span>
        <input
          type="text"
          value={rgbaDisplay}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: "0.45rem 0.85rem",
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "8px",
            color: "#60a5fa",
            fontFamily: "monospace",
            fontSize: "0.85rem"
          }}
        />
      </div>

      {/* 5. Atalhos Práticos de Cores Pré-definidas */}
      <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.8rem" }}>
        <span style={{ display: "block", fontSize: "0.78rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
          Paletas Rápidas & Liquid Glass:
        </span>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {PRESET_COLORS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(preset.value)}
              style={{
                padding: "0.3rem 0.65rem",
                fontSize: "0.75rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.05)",
                color: "#e2e8f0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                transition: "all 0.15s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: preset.value,
                border: "1px solid rgba(255,255,255,0.6)",
                display: "inline-block"
              }} />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

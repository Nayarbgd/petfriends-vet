import React from "react";

export const BG      = "#111111";
export const ORANGE  = "#FF9800";
export const PURPLE  = "#A65E12";
export const GOLDEN  = "#D9A441";
export const BROWN   = "#7A4A17";
export const CREAM   = "#F7E7C6";

export const HERO_BG =
  "radial-gradient(circle at top left, rgba(255,152,0,0.18) 0%, transparent 40%), " +
  "radial-gradient(circle at bottom right, rgba(166,94,18,0.15) 0%, transparent 45%), " +
  "#111111";

export const HEADER_BG =
  "linear-gradient(90deg, rgba(255,152,0,0.10), rgba(166,94,18,0.10)), #111111";

export const CARD_BG =
  "rgba(20,20,20,0.85)";

export const CARD_BORDER = "1px solid rgba(255,152,0,0.12)";

export const primaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF9800, #D9A441)",
  color: "#111111",
  fontWeight: 700,
  border: "none",
  boxShadow: "0 4px 28px rgba(255,152,0,0.45)",
  cursor: "pointer",
};

export const secondaryBtn: React.CSSProperties = {
  background: "rgba(166,94,18,0.15)",
  border: "1px solid rgba(255,152,0,0.35)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

export const iconOrange: React.CSSProperties = {
  background: "rgba(255,152,0,0.18)",
  color: ORANGE,
  boxShadow: "0 0 12px rgba(255,152,0,0.20)",
};

export const iconPurple: React.CSSProperties = {
  background: "rgba(166,94,18,0.18)",
  color: PURPLE,
  boxShadow: "0 0 12px rgba(166,94,18,0.20)",
};

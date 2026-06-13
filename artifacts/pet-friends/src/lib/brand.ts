import React from "react";

export const BG     = "#0F1018";
export const ORANGE = "#FF8A00";
export const PURPLE = "#7B4AE2";

export const HERO_BG =
  "radial-gradient(circle at 15% 25%, rgba(255,138,0,0.22), transparent 45%), " +
  "radial-gradient(circle at 85% 70%, rgba(123,74,226,0.22), transparent 45%), " +
  "#0F1018";

export const HEADER_BG =
  "linear-gradient(90deg, rgba(255,138,0,0.12), rgba(123,74,226,0.12)), #0F1018";

export const CARD_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(123,74,226,0.05))";

export const CARD_BORDER = "1px solid rgba(255,138,0,0.12)";

export const primaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF8A00, #FFB347)",
  color: "#111111",
  fontWeight: 700,
  border: "none",
  boxShadow: "0 4px 28px rgba(255,138,0,0.50)",
  cursor: "pointer",
};

export const secondaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(123,74,226,0.25), rgba(255,138,0,0.15))",
  border: "1px solid rgba(123,74,226,0.40)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

export const iconOrange: React.CSSProperties = {
  background: "rgba(255,138,0,0.18)",
  color: ORANGE,
  boxShadow: "0 0 12px rgba(255,138,0,0.20)",
};

export const iconPurple: React.CSSProperties = {
  background: "rgba(123,74,226,0.18)",
  color: PURPLE,
  boxShadow: "0 0 12px rgba(123,74,226,0.20)",
};

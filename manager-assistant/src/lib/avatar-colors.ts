/**
 * Consistent avatar background colors across the entire app.
 * Palette: #A0247B, #8724A0, #4924A0, #065f46, #4d7c0f, #A05A24
 */
const AVATAR_MAP: Record<string, string> = {
  "Sarah Chen":     "#A0247B",
  "Dorthe Hansen":  "#4d7c0f",  // new hire — senior engineer
  "Theo Nakamura":  "#8724A0",
  "Anna Lindqvist": "#4924A0",
  "Marcus Lee":     "#065f46",
  "Priya Sharma":   "#A05A24",
  "Jonas Eriksson": "#A0247B",
  "Camille Dupont": "#4d7c0f",
  "Liam Brennan":   "#4924A0",
  "Sofia Andersen": "#065f46",
};

const PALETTE = ["#A0247B", "#8724A0", "#4924A0", "#065f46", "#4d7c0f", "#A05A24"];

/** Returns a deterministic color for any name, falling back to palette hash. */
export function avatarColor(name: string): string {
  if (AVATAR_MAP[name]) return AVATAR_MAP[name];
  // Deterministic fallback: hash the name to a palette index
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

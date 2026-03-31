/**
 * Accessible category tag colors — WCAG AA compliant (4.5:1+) against their tinted backgrounds.
 *
 * Workflow     #4338CA text / #ECEDFB bg / #C7D2FE border  — indigo-700 / indigo-50-ish
 * Team Health  #A21CAF text / #FAE5FE bg / #F0ABFC border  — fuchsia-700 / fuchsia-50-ish
 * Schedule     #0F766E text / #DEF5F3 bg / #99E6E0 border  — teal-700   / teal-50-ish
 */

interface CategoryStyle {
  text: string;
  bg: string;
  border: string;
}

export const CATEGORY_COLORS: Record<string, CategoryStyle> = {
  Workflow:      { text: "#4338CA", bg: "#ECEDFB", border: "#C7D2FE" },
  "Team Health": { text: "#A21CAF", bg: "#FAE5FE", border: "#F0ABFC" },
  Schedule:      { text: "#0F766E", bg: "#DEF5F3", border: "#99E6E0" },
};

/** Returns the color style for a category, with a safe brand-blue fallback. */
export function categoryColor(category: string): CategoryStyle {
  return CATEGORY_COLORS[category] ?? { text: "#247BA0", bg: "#EAF5F9", border: "#B3DAEA" };
}

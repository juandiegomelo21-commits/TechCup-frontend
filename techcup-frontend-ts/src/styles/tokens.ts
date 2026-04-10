export const colors = {
  primary: {
    emerald:      "#00674F",
    emeraldLight: "#008F6B",
    emeraldDark:  "#004D3A",
  },
  accent: {
    amber:     "#FFBF00",
    amberDark: "#D9A200",
  },
  neutral: {
    white:      "#FFFFFF",
    carbon:     "#4A4A4A",
    carbonLight:"#6B6B6B",
    background: "#F5F5F5",
    border:     "#E0E0E0",
  },
  semantic: {
    success: "#00674F",
    warning: "#FFBF00",
    error:   "#D32F2F",
    info:    "#1565C0",
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "'Montserrat', sans-serif",
    body:    "'Inter', sans-serif",
  },
  fontWeight: { regular: 400, medium: 500, bold: 700 },
  fontSize: {
    xs: "0.75rem", sm: "0.875rem", md: "1rem",
    lg: "1.25rem", xl: "1.5rem", "2xl": "2rem", "3xl": "2.5rem",
  },
} as const;

export const spacing = {
  1: "0.25rem", 2: "0.5rem",  3: "0.75rem", 4: "1rem",
  5: "1.25rem", 6: "1.5rem",  8: "2rem",    10: "2.5rem",
  12: "3rem",   16: "4rem",
} as const;

export const borderRadius = {
  sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 4px rgba(0,0,0,0.12)",
  md: "0 2px 8px rgba(0,0,0,0.15)",
  lg: "0 4px 16px rgba(0,0,0,0.18)",
} as const;

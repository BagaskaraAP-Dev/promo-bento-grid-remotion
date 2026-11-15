export const COLORS = {
  bg: "#090D16",
  bgCard: "rgba(15, 23, 42, 0.72)",
  bgCardHover: "rgba(30, 41, 59, 0.8)",
  border: "#1E293B",
  borderLight: "rgba(148, 163, 184, 0.18)",
  cyan: "#38BDF8",
  cyanGlow: "rgba(56, 189, 248, 0.35)",
  emerald: "#10B981",
  emeraldGlow: "rgba(16, 185, 129, 0.35)",
  coral: "#F43F5E",
  coralGlow: "rgba(244, 63, 94, 0.35)",
  amber: "#F59E0B",
  amberGlow: "rgba(245, 158, 11, 0.35)",
  purple: "#A855F7",
  white: "#F8FAFC",
  muted: "#94A3B8",
};

export const BENTO_CARD_STYLE: React.CSSProperties = {
  backgroundColor: COLORS.bgCard,
  borderRadius: 28,
  border: `1px solid ${COLORS.borderLight}`,
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  position: "relative",
};

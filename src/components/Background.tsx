import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../styles/theme";
import { monoFont, titleFont } from "../styles/fonts";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Subtle ambient glow movement
  const glow1X = 30 + Math.sin(frame * 0.015) * 15;
  const glow1Y = 25 + Math.cos(frame * 0.012) * 10;
  const glow2X = 70 + Math.cos(frame * 0.018) * 15;
  const glow2Y = 65 + Math.sin(frame * 0.015) * 12;

  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Dynamic ambient color glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glow1X}% ${glow1Y}%, rgba(56, 189, 248, 0.16) 0%, transparent 55%), radial-gradient(circle at ${glow2X}% ${glow2Y}%, rgba(16, 185, 129, 0.14) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Modern Tech Dot Grid */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern
            id="bento-dots"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0, ${(frame * 0.5) % 60})`}
          >
            <circle cx="30" cy="30" r="1.5" fill="#38BDF8" opacity="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-dots)" />
      </svg>

      {/* Top System Pill Header (9:16 safe area) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: monoFont,
          fontSize: 18,
          color: COLORS.muted,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 999,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: `1px solid ${COLORS.borderLight}`,
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.emerald,
              boxShadow: `0 0 10px ${COLORS.emerald}`,
            }}
          />
          <span style={{ color: COLORS.white, fontFamily: titleFont, fontWeight: 700, fontSize: 16 }}>
            PREMIUM DIGITAL HUB
          </span>
        </div>

        <div
          style={{
            padding: "6px 16px",
            borderRadius: 12,
            backgroundColor: "rgba(56, 189, 248, 0.12)",
            border: `1px solid ${COLORS.cyan}`,
            color: COLORS.cyan,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          PROMO 2026
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.emerald}, ${COLORS.purple})`,
            boxShadow: `0 0 16px ${COLORS.cyan}`,
          }}
        />
      </div>
    </div>
  );
};

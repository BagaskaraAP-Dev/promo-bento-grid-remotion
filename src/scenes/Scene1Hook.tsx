import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { COLORS } from "../styles/theme";
import { titleFont, monoFont } from "../styles/fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance & Exit transitions
  const opacity = interpolate(frame, [0, 20, 275, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 30, 275, 300], [0.94, 1, 1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typography springs
  const line1Spring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const line2Spring = spring({ frame: frame - 35, fps, config: { damping: 14, stiffness: 90 } });

  // Convergence animation of the chaotic bills (frame 130 to 190)
  const convergeProgress = interpolate(frame, [130, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hub reveal spring
  const hubSpring = spring({ frame: frame - 170, fps, config: { damping: 12, stiffness: 95 } });

  const bills = [
    { name: "Streaming Film 4K", price: "-Rp 189.000/bln", x: -280, y: -220, rot: -8 },
    { name: "Music Streaming Family", price: "-Rp 65.000/bln", x: 260, y: -190, rot: 7 },
    { name: "Cloud Storage 2TB", price: "-Rp 135.000/bln", x: -260, y: 190, rot: 6 },
    { name: "Creative Design Suite", price: "-Rp 320.000/bln", x: 270, y: 220, rot: -6 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Audio elements */}
      <Audio src={staticFile("assets/sfx_whoosh.wav")} volume={0.8} />
      <Audio src={staticFile("assets/vo_1.mp3")} volume={1.0} from={8} />

      {/* Main Kinetic Question */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
          zIndex: 5,
          marginBottom: 60,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontFamily: titleFont,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.coral,
              letterSpacing: 2,
              textTransform: "uppercase",
              transform: `translateY(${(1 - Math.max(0, line1Spring)) * 50}px)`,
              opacity: Math.max(0, line1Spring),
            }}
          >
            MASALAH LANGGANAN BULANAN
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: titleFont,
              fontSize: 66,
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: 1,
              transform: `translateY(${(1 - Math.max(0, line2Spring)) * 70}px)`,
              opacity: Math.max(0, line2Spring),
            }}
          >
            LANGGANAN DIGITAL <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.coral}, #FDA4AF)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MAHAL & RIBET?
            </span>
          </h1>
        </div>
      </div>

      {/* Chaotic Floating Bills vs Concentrated Hub Center */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Floating Bills (Collapse on convergence) */}
        {bills.map((bill, idx) => {
          const currentX = bill.x * (1 - convergeProgress);
          const currentY = bill.y * (1 - convergeProgress);
          const billOpacity = Math.max(0, 1 - convergeProgress * 1.2);
          const floatOffset = Math.sin((frame + idx * 25) * 0.08) * 12;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                transform: `translate(${currentX}px, ${currentY + floatOffset}px) rotate(${bill.rot}deg) scale(${1 - convergeProgress * 0.5})`,
                opacity: billOpacity,
                backgroundColor: "rgba(30, 20, 25, 0.85)",
                border: `1.5px solid ${COLORS.coral}66`,
                borderRadius: 20,
                padding: "18px 26px",
                boxShadow: `0 15px 35px rgba(244, 63, 94, 0.25)`,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 260,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: titleFont,
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.white,
                }}
              >
                {bill.name}
              </div>
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.coral,
                }}
              >
                {bill.price}
              </div>
            </div>
          );
        })}

        {/* Converged Glowing Digital Hub Icon */}
        <div
          style={{
            position: "absolute",
            transform: `scale(${Math.max(0, hubSpring)})`,
            opacity: Math.max(0, hubSpring),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 40,
              background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 60px ${COLORS.cyanGlow}, 0 20px 40px rgba(0,0,0,0.6)`,
            }}
          >
            <svg width="84" height="84" viewBox="0 0 24 24" fill={COLORS.white}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={COLORS.white} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: `1.5px solid ${COLORS.emerald}`,
              padding: "10px 28px",
              borderRadius: 999,
              fontFamily: titleFont,
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.white,
              boxShadow: `0 0 25px ${COLORS.emeraldGlow}`,
              letterSpacing: 1,
            }}
          >
            SOLUSI ALL-IN-ONE
          </div>
        </div>
      </div>

      {/* Bottom Subtitle */}
      <div
        style={{
          fontFamily: titleFont,
          fontSize: 22,
          color: COLORS.muted,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.5,
          marginTop: 20,
          opacity: interpolate(frame, [40, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Hentikan pengeluaran boros. Akses semua layanan premium favoritmu dalam satu portal terpusat.
      </div>
    </div>
  );
};

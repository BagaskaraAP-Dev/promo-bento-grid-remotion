import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { COLORS, BENTO_CARD_STYLE } from "../styles/theme";
import { titleFont, monoFont } from "../styles/fonts";

export const Scene5SocialProofCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance & Final Fade-out in last 30 frames (300 to 330)
  const opacity = interpolate(frame, [0, 20, 300, 330], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 25, 300, 330], [40, 0, 0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered springs for elements
  const starsSpring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const reviewsSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 90 } });
  const ctaSpring = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 95 } });

  // Pulsing animation for the CTA button
  const pulseScale = 1 + Math.sin(frame * 0.14) * 0.035;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 64px",
      }}
    >
      {/* Audio VO and Sound Effects */}
      <Audio src={staticFile("assets/sfx_whoosh.wav")} volume={0.8} />
      <Audio src={staticFile("assets/vo_5.mp3")} volume={1.0} from={8} />

      {/* Social Proof Rating Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 32,
          transform: `scale(${0.9 + 0.1 * Math.max(0, starsSpring)})`,
          opacity: Math.max(0, starsSpring),
        }}
      >
        {/* 5 Golden Stars */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} width="32" height="32" viewBox="0 0 24 24" fill={COLORS.amber} style={{ filter: `drop-shadow(0 0 10px ${COLORS.amberGlow})` }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        <div
          style={{
            fontFamily: monoFont,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: 1,
          }}
        >
          4.9 / 5.0 RATING KEPUASAN
        </div>
        <div style={{ fontFamily: titleFont, fontSize: 16, color: COLORS.muted, marginTop: 4 }}>
          Terbukti & Dipercaya oleh 10.000+ Pengguna Aktif
        </div>
      </div>

      {/* Customer Review Bento Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 950,
          marginBottom: 44,
          transform: `translateY(${(1 - Math.max(0, reviewsSpring)) * 30}px)`,
          opacity: Math.max(0, reviewsSpring),
        }}
      >
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: "24px 32px",
            background: "rgba(15, 23, 42, 0.8)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: titleFont, fontSize: 18, fontWeight: 700, color: COLORS.white }}>
              Kevin Darmawan
            </span>
            <span style={{ fontFamily: monoFont, fontSize: 13, color: COLORS.emerald, fontWeight: 700 }}>
              PEMBELI TERVERIFIKASI
            </span>
          </div>
          <p style={{ fontFamily: titleFont, fontSize: 16, color: COLORS.muted, margin: 0, lineHeight: 1.5 }}>
            "Hemat banget! Biasanya bayar 400 ribuan per bulan untuk berbagai streaming dan cloud, sekarang cuma puluhan ribu. Pelayanan super kilat!"
          </p>
        </div>

        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: "24px 32px",
            background: "rgba(15, 23, 42, 0.8)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: titleFont, fontSize: 18, fontWeight: 700, color: COLORS.white }}>
              Sarah Natasya
            </span>
            <span style={{ fontFamily: monoFont, fontSize: 13, color: COLORS.emerald, fontWeight: 700 }}>
              PEMBELI TERVERIFIKASI
            </span>
          </div>
          <p style={{ fontFamily: titleFont, fontSize: 16, color: COLORS.muted, margin: 0, lineHeight: 1.5 }}>
            "Sudah langganan lebih dari 8 bulan, akun tidak pernah kena suspend dan garansinya beneran aman. Recommended banget buat kreator!"
          </p>
        </div>
      </div>

      {/* Grand Call to Action Pulsing Button */}
      <div
        style={{
          width: "100%",
          maxWidth: 950,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          transform: `scale(${Math.max(0, ctaSpring) * pulseScale})`,
          opacity: Math.max(0, ctaSpring),
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "24px 0",
            borderRadius: 24,
            background: `linear-gradient(90deg, ${COLORS.emerald}, #059669)`,
            boxShadow: `0 0 50px ${COLORS.emeraldGlow}, 0 20px 40px rgba(0, 0, 0, 0.6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: titleFont,
              fontSize: 30,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            AMANKAN PROMO SEKARANG
          </span>
          <svg width="32" height="32" viewBox="0 0 24 24" fill={COLORS.white}>
            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: monoFont,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 1,
          }}
        >
          <span>KLIK LINK PADA BIO SEBELUM KUOTA HABIS</span>
        </div>
      </div>
    </div>
  );
};

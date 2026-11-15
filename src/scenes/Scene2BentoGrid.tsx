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

export const Scene2BentoGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transition
  const opacity = interpolate(frame, [0, 20, 395, 420], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 25, 395, 420], [40, 0, 0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4 Bento Cards Spring reveals (staggered by 12 frames)
  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 90 } });
  const card2Spring = spring({ frame: frame - 28, fps, config: { damping: 14, stiffness: 90 } });
  const card3Spring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 90 } });
  const card4Spring = spring({ frame: frame - 52, fps, config: { damping: 14, stiffness: 90 } });

  // Instant timer animation in Card 1 (counting 1 to 60 seconds)
  const instantSeconds = Math.round(
    interpolate(frame, [30, 90], [60, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

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
      <Audio src={staticFile("assets/vo_2.mp3")} volume={1.0} from={12} />
      <Audio src={staticFile("assets/sfx_pop.wav")} volume={0.7} from={15} />
      <Audio src={staticFile("assets/sfx_pop.wav")} volume={0.7} from={28} />
      <Audio src={staticFile("assets/sfx_pop.wav")} volume={0.7} from={40} />
      <Audio src={staticFile("assets/sfx_pop.wav")} volume={0.7} from={52} />

      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            fontFamily: monoFont,
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          STANDAR LAYANAN TERBAIK
        </div>
        <h2
          style={{
            fontFamily: titleFont,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.white,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          KEUNGGULAN EKOSISTEM KAMI
        </h2>
      </div>

      {/* 4-Item Bento Grid Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          maxWidth: 950,
        }}
      >
        {/* Card 1: Top Hero Card (Proses Instan 1 Menit) */}
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: 36,
            border: `1.5px solid ${COLORS.cyan}44`,
            transform: `scale(${0.9 + 0.1 * Math.max(0, card1Spring)})`,
            opacity: Math.max(0, card1Spring),
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.cyan,
                  letterSpacing: 2,
                }}
              >
                AUTOMATION SYSTEM
              </span>
              <h3
                style={{
                  fontFamily: titleFont,
                  fontSize: 34,
                  fontWeight: 800,
                  color: COLORS.white,
                  margin: "6px 0 10px 0",
                }}
              >
                Proses Instan 1 Menit
              </h3>
              <p
                style={{
                  fontFamily: titleFont,
                  fontSize: 18,
                  color: COLORS.muted,
                  margin: 0,
                  maxWidth: 580,
                  lineHeight: 1.4,
                }}
              >
                Aktivasi otomatis langsung ke WhatsApp & email tanpa harus menunggu berjam-jam.
              </p>
            </div>

            {/* Live Timer Counter Widget */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: `1.5px solid ${COLORS.cyan}`,
                borderRadius: 20,
                padding: "16px 24px",
                textAlign: "center",
                boxShadow: `0 0 25px ${COLORS.cyanGlow}`,
              }}
            >
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 42,
                  fontWeight: 800,
                  color: COLORS.cyan,
                  lineHeight: 1,
                }}
              >
                00:{instantSeconds < 10 ? `0${instantSeconds}` : instantSeconds}
              </div>
              <div style={{ fontFamily: titleFont, fontSize: 12, fontWeight: 700, color: COLORS.white, marginTop: 4 }}>
                RATA-RATA AKTIF
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: 2 Modular Cards Side-by-Side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Card 2: 100% Legal & Bergaransi */}
          <div
            style={{
              ...BENTO_CARD_STYLE,
              padding: 30,
              border: `1.5px solid ${COLORS.emerald}44`,
              transform: `scale(${0.9 + 0.1 * Math.max(0, card2Spring)})`,
              opacity: Math.max(0, card2Spring),
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)",
            }}
          >
            <div style={{ width: 36, height: 36, marginBottom: 12, display: "flex", alignItems: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: titleFont,
                fontSize: 24,
                fontWeight: 800,
                color: COLORS.white,
                margin: "0 0 8px 0",
              }}
            >
              100% Legal & Garansi
            </h4>
            <p
              style={{
                fontFamily: titleFont,
                fontSize: 16,
                color: COLORS.muted,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Akun resmi legal bebas suspend. Garansi ganti akun baru jika terjadi kendala.
            </p>
          </div>

          {/* Card 3: Harga Hemat Diskon 70% */}
          <div
            style={{
              ...BENTO_CARD_STYLE,
              padding: 30,
              border: `1.5px solid ${COLORS.amber}44`,
              transform: `scale(${0.9 + 0.1 * Math.max(0, card3Spring)})`,
              opacity: Math.max(0, card3Spring),
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)",
            }}
          >
            <div style={{ width: 36, height: 36, marginBottom: 12, display: "flex", alignItems: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: titleFont,
                fontSize: 24,
                fontWeight: 800,
                color: COLORS.white,
                margin: "0 0 8px 0",
              }}
            >
              Harga Hemat 70%
            </h4>
            <p
              style={{
                fontFamily: titleFont,
                fontSize: 16,
                color: COLORS.muted,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Tarif paket grup & enterprise langsung ke tanganmu dengan harga paling terjangkau.
            </p>
          </div>
        </div>

        {/* Card 4: Bottom Wide Card (Support 24/7) */}
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: 32,
            border: `1.5px solid ${COLORS.purple}44`,
            transform: `scale(${0.9 + 0.1 * Math.max(0, card4Spring)})`,
            opacity: Math.max(0, card4Spring),
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: COLORS.emerald,
                    boxShadow: `0 0 10px ${COLORS.emerald}`,
                  }}
                />
                <span style={{ fontFamily: monoFont, fontSize: 13, fontWeight: 700, color: COLORS.emerald }}>
                  CUSTOMER CARE LIVE
                </span>
              </div>
              <h4
                style={{
                  fontFamily: titleFont,
                  fontSize: 26,
                  fontWeight: 800,
                  color: COLORS.white,
                  margin: "0 0 6px 0",
                }}
              >
                Support Responsif 24/7
              </h4>
              <p
                style={{
                  fontFamily: titleFont,
                  fontSize: 16,
                  color: COLORS.muted,
                  margin: 0,
                }}
              >
                Tim bantuan siap membantu kapan saja via WhatsApp & Telegram.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(168, 85, 247, 0.15)",
                border: `1px solid ${COLORS.purple}`,
                padding: "10px 20px",
                borderRadius: 16,
                color: COLORS.white,
                fontFamily: monoFont,
                fontSize: 15,
                fontWeight: 700,
                textAlign: "right",
              }}
            >
              RESPON &lt; 2 MENIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

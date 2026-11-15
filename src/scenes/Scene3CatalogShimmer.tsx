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

export const Scene3CatalogShimmer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transitions
  const opacity = interpolate(frame, [0, 20, 365, 390], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 25, 365, 390], [40, 0, 0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered springs for 3 tiers
  const tier1Spring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const tier2Spring = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 90 } });
  const tier3Spring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 90 } });

  // Rotating animated discount counter for Tier 2 (counting 0 to 70%)
  const discountCounter = Math.round(
    interpolate(frame, [30, 85], [10, 70], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Linear shimmer sweep position (cycles every 60 frames / 2 seconds)
  const shimmerCycle = (frame % 60) / 60;
  const shimmerTranslateX = interpolate(shimmerCycle, [0, 1], [-100, 200]);

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
      <Audio src={staticFile("assets/vo_3.mp3")} volume={1.0} from={12} />
      <Audio src={staticFile("assets/sfx_chime.wav")} volume={0.8} from={60} />
      <Audio src={staticFile("assets/sfx_chime.wav")} volume={0.8} from={180} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            display: "inline-block",
            fontFamily: monoFont,
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.emerald,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          HARGA SPESIAL TERBAIK
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
          PILIHAN PAKET LANGGANAN
        </h2>
      </div>

      {/* 3 Tier Cards Stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          maxWidth: 950,
        }}
      >
        {/* Tier 1: Entertainment Pass */}
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: "24px 32px",
            transform: `scale(${0.9 + 0.1 * Math.max(0, tier1Spring)})`,
            opacity: Math.max(0, tier1Spring),
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h3 style={{ fontFamily: titleFont, fontSize: 26, fontWeight: 800, color: COLORS.white, margin: 0 }}>
                  Entertainment Pass
                </h3>
                <span
                  style={{
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    border: `1px solid ${COLORS.cyan}`,
                    color: COLORS.cyan,
                    fontFamily: monoFont,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: 999,
                  }}
                >
                  HEMAT 50%
                </span>
              </div>
              <p style={{ fontFamily: titleFont, fontSize: 16, color: COLORS.muted, margin: "6px 0 0 0" }}>
                Akses Film 4K UHD, Serial Populer, & Musik Bebas Iklan.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: monoFont, fontSize: 15, color: COLORS.coral, textDecoration: "line-through" }}>
                Rp 180.000
              </div>
              <div style={{ fontFamily: monoFont, fontSize: 32, fontWeight: 800, color: COLORS.cyan }}>
                Rp 45.000<span style={{ fontSize: 16, color: COLORS.muted }}>/bln</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: All-Access Pro (BEST SELLER HERO with SHIMMER) */}
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: "32px 36px",
            border: `2px solid ${COLORS.emerald}`,
            boxShadow: `0 0 45px ${COLORS.emeraldGlow}, 0 20px 50px rgba(0,0,0,0.6)`,
            transform: `scale(${0.92 + 0.08 * Math.max(0, tier2Spring)})`,
            opacity: Math.max(0, tier2Spring),
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer Light Sweep Effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)",
              transform: `translateX(${shimmerTranslateX}%) skewX(-25deg)`,
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.amber}, #F97316)`,
                    color: COLORS.white,
                    fontFamily: titleFont,
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "4px 14px",
                    borderRadius: 999,
                    letterSpacing: 1,
                  }}
                >
                  BEST SELLER
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    border: `1.5px solid ${COLORS.emerald}`,
                    color: COLORS.emerald,
                    fontFamily: monoFont,
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: 999,
                  }}
                >
                  HEMAT {discountCounter}%
                </span>
              </div>
              <h3
                style={{
                  fontFamily: titleFont,
                  fontSize: 34,
                  fontWeight: 800,
                  color: COLORS.white,
                  margin: "12px 0 6px 0",
                }}
              >
                All-Access VIP Pro
              </h3>
              <p style={{ fontFamily: titleFont, fontSize: 18, color: COLORS.white, margin: 0 }}>
                Semua Streaming, Cloud Storage 2TB, VPN Cepat, & Tool AI.
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: monoFont, fontSize: 18, color: COLORS.coral, textDecoration: "line-through" }}>
                Rp 350.000
              </div>
              <div style={{ fontFamily: monoFont, fontSize: 44, fontWeight: 800, color: COLORS.emerald }}>
                Rp 89.000<span style={{ fontSize: 18, color: COLORS.muted }}>/bln</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Creative & AI Suite */}
        <div
          style={{
            ...BENTO_CARD_STYLE,
            padding: "24px 32px",
            transform: `scale(${0.9 + 0.1 * Math.max(0, tier3Spring)})`,
            opacity: Math.max(0, tier3Spring),
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h3 style={{ fontFamily: titleFont, fontSize: 26, fontWeight: 800, color: COLORS.white, margin: 0 }}>
                  Creative & AI Suite
                </h3>
                <span
                  style={{
                    backgroundColor: "rgba(168, 85, 247, 0.15)",
                    border: `1px solid ${COLORS.purple}`,
                    color: COLORS.purple,
                    fontFamily: monoFont,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: 999,
                  }}
                >
                  HEMAT 65%
                </span>
              </div>
              <p style={{ fontFamily: titleFont, fontSize: 16, color: COLORS.muted, margin: "6px 0 0 0" }}>
                Akses Template Desain Premium & Asisten AI Pintar.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: monoFont, fontSize: 15, color: COLORS.coral, textDecoration: "line-through" }}>
                Rp 280.000
              </div>
              <div style={{ fontFamily: monoFont, fontSize: 32, fontWeight: 800, color: COLORS.purple }}>
                Rp 79.000<span style={{ fontSize: 16, color: COLORS.muted }}>/bln</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

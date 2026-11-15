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

export const Scene4Checkout25D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transitions
  const opacity = interpolate(frame, [0, 20, 335, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 25, 335, 360], [40, 0, 0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mouse cursor path: moves from (180, 260) to (0, 70) between frame 15 and 68
  const cursorX = interpolate(frame, [15, 68], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [15, 68], [260, 70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button click state (frames 68 to 85)
  const isClicked = frame >= 68;
  const buttonScale = interpolate(frame, [68, 73, 85], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ripple effect on click
  const rippleProgress = interpolate(frame, [70, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition from checkout screen to success modal (frame 85 to 110)
  const modalTransition = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spring for success checkmark
  const checkSpring = spring({ frame: frame - 105, fps, config: { damping: 12, stiffness: 100 } });

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
      <Audio src={staticFile("assets/vo_4.mp3")} volume={1.0} from={8} />
      <Audio src={staticFile("assets/sfx_click.wav")} volume={0.9} from={70} />
      <Audio src={staticFile("assets/sfx_success.wav")} volume={0.9} from={105} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
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
          SIMULASI PEMESANAN PRAKTIS
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
          KLIK & AKTIF DALAM 1 DETIK
        </h2>
      </div>

      {/* Central Interactive Card Frame */}
      <div
        style={{
          ...BENTO_CARD_STYLE,
          width: "100%",
          maxWidth: 950,
          minHeight: 580,
          padding: 44,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          perspective: 1000,
        }}
      >
        {/* State 1: Order Confirmation Interface (fades out at frame 85-110) */}
        {modalTransition < 1 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              opacity: 1 - modalTransition,
              transform: `scale(${1 - modalTransition * 0.1})`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: monoFont, fontSize: 14, color: COLORS.cyan, fontWeight: 700 }}>
                  PAKET TERPILIH
                </span>
                <h3 style={{ fontFamily: titleFont, fontSize: 32, fontWeight: 800, color: COLORS.white, margin: "4px 0" }}>
                  All-Access VIP Pro
                </h3>
              </div>
              <div style={{ fontFamily: monoFont, fontSize: 36, fontWeight: 800, color: COLORS.emerald }}>
                Rp 89.000
              </div>
            </div>

            {/* Simulated Payment Bar */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: `1px solid ${COLORS.borderLight}`,
                borderRadius: 18,
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 28, height: 28, display: "flex", alignItems: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: titleFont, fontSize: 16, fontWeight: 700, color: COLORS.white }}>
                    Metode Pembayaran Instan
                  </div>
                  <div style={{ fontFamily: monoFont, fontSize: 13, color: COLORS.muted }}>
                    QRIS • GoPay • OVO • Transfer Bank
                  </div>
                </div>
              </div>
              <span style={{ color: COLORS.emerald, fontFamily: monoFont, fontSize: 14, fontWeight: 700 }}>
                TERVERIFIKASI
              </span>
            </div>

            {/* The Clickable Button with Ripple and Cursor Target */}
            <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", marginTop: 12 }}>
              <div
                style={{
                  width: "100%",
                  padding: "22px 0",
                  borderRadius: 20,
                  background: isClicked
                    ? `linear-gradient(90deg, ${COLORS.emerald}, #059669)`
                    : `linear-gradient(90deg, ${COLORS.cyan}, #0284C7)`,
                  color: COLORS.white,
                  fontFamily: titleFont,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textAlign: "center",
                  boxShadow: `0 0 35px ${isClicked ? COLORS.emeraldGlow : COLORS.cyanGlow}`,
                  transform: `scale(${buttonScale})`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isClicked ? "MEMPROSES SECARA INSTAN..." : "PESAN SEKARANG →"}

                {/* Animated Ripple Wave */}
                {isClicked && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      transform: `translate(-50%, -50%) scale(${rippleProgress * 5})`,
                      opacity: 1 - rippleProgress,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* State 2: Success Modal Card (appears at frame 85+) */}
        {modalTransition > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 44,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 20,
              opacity: modalTransition,
              transform: `scale(${0.9 + 0.1 * modalTransition})`,
            }}
          >
            {/* Animated Glowing Checkmark SVG */}
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.emerald}, #059669)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 45px ${COLORS.emeraldGlow}`,
                transform: `scale(${Math.max(0, checkSpring)})`,
              }}
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke={COLORS.white}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.emerald,
                  letterSpacing: 2,
                  marginBottom: 6,
                }}
              >
                TRANSAKSI SELESAI DALAM 0.8 DETIK
              </div>
              <h3
                style={{
                  fontFamily: titleFont,
                  fontSize: 38,
                  fontWeight: 800,
                  color: COLORS.white,
                  margin: 0,
                }}
              >
                Akun Berhasil Aktif!
              </h3>
            </div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: `1px solid ${COLORS.emerald}55`,
                borderRadius: 16,
                padding: "16px 28px",
                fontFamily: monoFont,
                fontSize: 15,
                color: COLORS.white,
                lineHeight: 1.6,
              }}
            >
              ID: <span style={{ color: COLORS.cyan }}>#BENTO-99420</span> • Status: <span style={{ color: COLORS.emerald }}>ACTIVE (GARANSI RESMI)</span>
              <br />
              Kredensial dan panduan login telah terkirim via WhatsApp.
            </div>
          </div>
        )}

        {/* 2.5D Animated Mouse Cursor (Visible before click and during transition) */}
        {frame < 120 && (
          <div
            style={{
              position: "absolute",
              transform: `translate(${cursorX}px, ${cursorY}px) ${isClicked ? "scale(0.85)" : "scale(1)"}`,
              transition: "transform 0.05s ease-out",
              pointerEvents: "none",
              zIndex: 30,
              filter: `drop-shadow(0 10px 15px rgba(0, 0, 0, 0.6))`,
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3l7 18 3-7 7-3L3 3z"
                fill={COLORS.white}
                stroke={COLORS.bg}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

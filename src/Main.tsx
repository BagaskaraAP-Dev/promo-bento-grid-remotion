import React from "react";
import { AbsoluteFill, Series, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { Background } from "./components/Background";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2BentoGrid } from "./scenes/Scene2BentoGrid";
import { Scene3CatalogShimmer } from "./scenes/Scene3CatalogShimmer";
import { Scene4Checkout25D } from "./scenes/Scene4Checkout25D";
import { Scene5SocialProofCTA } from "./scenes/Scene5SocialProofCTA";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // BGM volume: 0.14 with fade-in (30 frames) and fade-out in last 30 frames (1770-1800)
  const bgmVolume = interpolate(frame, [0, 30, 1770, 1800], [0, 0.14, 0.14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#090D16" }}>
      {/* Global Background Layer */}
      <Background />

      {/* Global Background Beat Music (60s loop / full duration) */}
      <Audio src={staticFile("assets/bgm_beat.wav")} volume={bgmVolume} />

      {/* 5 Modular Scenes in Series (Total 1800 frames / 60 seconds) */}
      <Series>
        {/* Scene 1: Hook Masalah (00:00 - 00:10 | Frame 0 - 300) */}
        <Series.Sequence durationInFrames={300} name="Scene 1: Hook Masalah">
          <Scene1Hook />
        </Series.Sequence>

        {/* Scene 2: Bento Grid Keunggulan (00:10 - 00:24 | Frame 300 - 720) */}
        <Series.Sequence durationInFrames={420} name="Scene 2: Bento Grid Keunggulan">
          <Scene2BentoGrid />
        </Series.Sequence>

        {/* Scene 3: Katalog & Kartu Promo Berkilau (00:24 - 00:37 | Frame 720 - 1110) */}
        <Series.Sequence durationInFrames={390} name="Scene 3: Katalog Promo Shimmer">
          <Scene3CatalogShimmer />
        </Series.Sequence>

        {/* Scene 4: Simulasi 2.5D Checkout (00:37 - 00:49 | Frame 1110 - 1470) */}
        <Series.Sequence durationInFrames={360} name="Scene 4: Simulasi 2.5D Checkout">
          <Scene4Checkout25D />
        </Series.Sequence>

        {/* Scene 5: Bukti Sosial & Call to Action (00:49 - 01:00 | Frame 1470 - 1800) */}
        <Series.Sequence durationInFrames={330} name="Scene 5: Bukti Sosial & CTA">
          <Scene5SocialProofCTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

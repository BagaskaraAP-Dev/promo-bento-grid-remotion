import fs from "fs";
import path from "path";

const SAMPLE_RATE = 44100;

function createWavHeader(numSamples, numChannels = 1, sampleRate = SAMPLE_RATE) {
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

function saveWav(filename, samples, numChannels = 1) {
  const header = createWavHeader(samples.length / numChannels, numChannels);
  const data = Buffer.alloc(samples.length * 2);

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 32768 : s * 32767;
    data.writeInt16LE(Math.floor(val), i * 2);
  }

  const fullBuffer = Buffer.concat([header, data]);
  fs.writeFileSync(filename, fullBuffer);
  console.log(`Saved: ${filename} (${(fullBuffer.length / 1024).toFixed(1)} KB)`);
}

// 1. Whoosh SFX (0.4s)
function genWhoosh() {
  const dur = 0.4;
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    const t = i / total;
    const env = Math.sin(t * Math.PI);
    const noise = Math.random() * 2 - 1;
    // frequency modulation
    const freq = 400 + Math.sin(t * Math.PI) * 1200;
    const tone = Math.sin((2 * Math.PI * freq * i) / SAMPLE_RATE);
    samples[i] = (noise * 0.7 + tone * 0.3) * env * 0.75;
  }
  return samples;
}

// 2. Pop SFX (0.12s)
function genPop() {
  const dur = 0.12;
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    const t = i / total;
    const env = Math.exp(-t * 24);
    const freq = 550 * Math.exp(-t * 18) + 80;
    samples[i] = Math.sin((2 * Math.PI * freq * i) / SAMPLE_RATE) * env * 0.8;
  }
  return samples;
}

// 3. Chime SFX (0.8s)
function genChime() {
  const dur = 0.8;
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  const notes = [1318.51, 1661.22, 1975.53, 2637.02]; // E6, G#6, B6, E7
  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 4.5);
    let val = 0;
    notes.forEach((freq, idx) => {
      const delay = idx * 0.04;
      if (t >= delay) {
        const subT = t - delay;
        const subEnv = Math.exp(-subT * 4.5);
        val += Math.sin(2 * Math.PI * freq * subT) * subEnv * 0.25;
      }
    });
    samples[i] = val * 0.8;
  }
  return samples;
}

// 4. Click SFX (0.04s)
function genClick() {
  const dur = 0.04;
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    const t = i / total;
    const env = Math.exp(-t * 50);
    const noise = Math.random() * 2 - 1;
    const tone = Math.sin((2 * Math.PI * 1800 * i) / SAMPLE_RATE);
    samples[i] = (noise * 0.6 + tone * 0.4) * env * 0.9;
  }
  return samples;
}

// 5. Success Chime SFX (0.6s)
function genSuccess() {
  const dur = 0.6;
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;
    notes.forEach((freq, idx) => {
      const delay = idx * 0.08;
      if (t >= delay) {
        const subT = t - delay;
        const subEnv = Math.exp(-subT * 6);
        val += Math.sin(2 * Math.PI * freq * subT) * subEnv * 0.3;
      }
    });
    samples[i] = val * 0.85;
  }
  return samples;
}

// 6. 60-Second BGM Lo-Fi Tech Beat
function genBgmBeat() {
  const dur = 60.0; // 60 seconds
  const total = Math.floor(SAMPLE_RATE * dur);
  const samples = new Float32Array(total);
  const bpm = 112;
  const beatSec = 60 / bpm; // ~0.535s
  const barSec = beatSec * 4;

  // Chord notes (frequencies): Am, F, C, G
  const chordFreqs = [
    [220.0, 261.63, 329.63], // A minor (A3, C4, E4)
    [174.61, 220.0, 261.63], // F major (F3, A3, C4)
    [261.63, 329.63, 392.0], // C major (C4, E4, G4)
    [196.0, 246.94, 293.66], // G major (G3, B3, D4)
  ];
  const bassFreqs = [110.0, 87.31, 130.81, 98.0]; // A2, F2, C3, G2

  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    const beatPos = (t % beatSec) / beatSec;
    const currentBeat = Math.floor(t / beatSec) % 4;
    const barIndex = Math.floor(t / barSec) % chordFreqs.length;

    let sample = 0;

    // 1. Kick on beat 0 and beat 2.5
    if (currentBeat === 0 || (currentBeat === 2 && beatPos > 0.5)) {
      const kickT = (t % beatSec);
      if (kickT < 0.18) {
        const kickFreq = 120 * Math.exp(-kickT * 22) + 45;
        const kickEnv = Math.exp(-kickT * 14);
        sample += Math.sin(2 * Math.PI * kickFreq * kickT) * kickEnv * 0.35;
      }
    }

    // 2. Snare / Clack on beat 1 and beat 3
    if (currentBeat === 1 || currentBeat === 3) {
      const snareT = (t % beatSec);
      if (snareT < 0.15) {
        const snareEnv = Math.exp(-snareT * 20);
        const noise = (Math.random() * 2 - 1) * 0.18;
        const tone = Math.sin(2 * Math.PI * 220 * snareT) * 0.12;
        sample += (noise + tone) * snareEnv;
      }
    }

    // 3. Hi-Hat every 1/2 beat
    const hatT = (t % (beatSec / 2));
    if (hatT < 0.05) {
      const hatEnv = Math.exp(-hatT * 60);
      sample += (Math.random() * 2 - 1) * hatEnv * 0.08;
    }

    // 4. Bassline (smooth sub synth)
    const bFreq = bassFreqs[barIndex];
    const bassEnv = 0.5 + 0.3 * Math.sin(beatPos * Math.PI * 2);
    const bassTone = Math.sin(2 * Math.PI * bFreq * t) + 0.3 * Math.sin(4 * Math.PI * bFreq * t);
    sample += bassTone * bassEnv * 0.22;

    // 5. Electric Piano / Synth Pad chords
    const chord = chordFreqs[barIndex];
    let chordTone = 0;
    chord.forEach((freq) => {
      chordTone += Math.sin(2 * Math.PI * freq * t) * 0.06;
    });
    // subtle pulsing tremolo
    const tremolo = 0.7 + 0.3 * Math.sin(t * 3.5);
    sample += chordTone * tremolo;

    // Overall master envelope (fade-in 1s, fade-out last 1.5s)
    let masterEnv = 1;
    if (t < 1.0) masterEnv = t;
    if (t > dur - 1.5) masterEnv = Math.max(0, (dur - t) / 1.5);

    samples[i] = sample * masterEnv * 0.85;
  }
  return samples;
}

// Generate all files
const outDir = path.join(process.cwd(), "public", "assets");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

saveWav(path.join(outDir, "sfx_whoosh.wav"), genWhoosh());
saveWav(path.join(outDir, "sfx_pop.wav"), genPop());
saveWav(path.join(outDir, "sfx_chime.wav"), genChime());
saveWav(path.join(outDir, "sfx_click.wav"), genClick());
saveWav(path.join(outDir, "sfx_success.wav"), genSuccess());
saveWav(path.join(outDir, "bgm_beat.wav"), genBgmBeat());

console.log("All SFX and 60s BGM beat successfully generated!");

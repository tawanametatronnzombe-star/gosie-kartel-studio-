import * as Tone from "tone";

/**
 * 🎧 METATRON AUDIO ENGINE
 * Synth + Drum + Transport Core
 */

export class MetatronAudioEngine {
  constructor() {
    this.synth = null;
    this.ready = false;
  }

  async init() {
    await Tone.start();

    // 🎹 Poly Synth
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();

    this.ready = true;
  }

  // 🎼 Play Note
  playNote(note, duration = "8n") {
    if (!this.synth) return;
    this.synth.triggerAttackRelease(note, duration);
  }

  // 🥁 Drum Sounds (simple tone-based)
  playDrum(type) {
    const freqs = {
      kick: 60,
      snare: 180,
      hihat: 300,
      clap: 400
    };

    const freq = freqs[type];
    if (!freq) return;

    const osc = new Tone.Oscillator(freq, "square").toDestination();
    osc.start();
    osc.stop("+0.15");
  }

  // 🎚️ BPM Control
  setBpm(bpm) {
    Tone.Transport.bpm.value = bpm;
  }

  play() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }
}

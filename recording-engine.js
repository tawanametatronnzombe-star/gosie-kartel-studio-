export class MetatronRecordingEngine {
  constructor() {
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
    this.audioURL = null;
  }

  // 🎙️ Start Recording
  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.recorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    this.recorder.start();
  }

  // ⏹️ Stop Recording
  stop() {
    return new Promise((resolve) => {
      this.recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: "audio/webm" });
        this.audioURL = URL.createObjectURL(blob);

        this.stream.getTracks().forEach((t) => t.stop());

        resolve(this.audioURL);
      };

      this.recorder.stop();
    });
  }

  // 🔊 Get recorded audio
  getAudio() {
    return this.audioURL;
  }
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class BeepService {
  private context: AudioContext | null = null;

  play() {
    try {
      if (!this.context) {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.context.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, this.context.currentTime); // A5 note

      gainNode.gain.setValueAtTime(0, this.context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

      oscillator.start();
      oscillator.stop(this.context.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  }
}

export const beepService = new BeepService();

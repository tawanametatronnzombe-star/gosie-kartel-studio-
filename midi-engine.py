import random
from midiutil.MidiFile import MIDIFile

"""
🎼 METATRON MIDI ENGINE
AI-style music generator (chords + melody + export)
"""

class MetatronMidiEngine:

    def __init__(self, key="C", tempo=120):
        self.key = key
        self.tempo = tempo

        self.scale = ["C", "D", "E", "F", "G", "A", "B"]
        self.chords = []
        self.melody = []

    # 🎹 Generate chord progression
    def generate_chords(self):
        progressions = [
            ["C", "Am", "F", "G"],
            ["Am", "F", "C", "G"],
            ["F", "G", "Em", "Am"],
            ["C", "G", "Am", "F"]
        ]

        self.chords = random.choice(progressions)
        return self.chords

    # 🎵 Generate melody line
    def generate_melody(self, length=16):
        self.melody = [
            random.choice(self.scale) for _ in range(length)
        ]
        return self.melody

    # 💾 Export MIDI file
    def export_midi(self, filename="metatron_song.mid"):
        midi = MIDIFile(1)
        track = 0
        time = 0

        midi.addTrackName(track, time, "Metatron Studio Track")
        midi.addTempo(track, time, self.tempo)

        note_map = {
            "C": 60, "D": 62, "E": 64,
            "F": 65, "G": 67, "A": 69, "B": 71
        }

        for note in self.melody:
            midi.addNote(track, 0, note_map[note], time, 1, 100)
            time += 1

        with open(filename, "wb") as f:
            midi.writeFile(f)

        return filename

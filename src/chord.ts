import * as Chord from '@tonaljs/chord';
import * as Note from '@tonaljs/note';
import { Fretboard, STANDARD_TUNING, MAX_FRETS } from './fretboard';
import { ChordNote } from './types';

/**
 * Get chord information including notes, scale degrees, and fretboard positions
 * @param chordType - Chord type (e.g., "m7", "maj7", "7")
 * @param tonic - Root note of the chord (e.g., "C", "D#")
 * @param tuning - Optional custom tuning (defaults to standard tuning)
 * @param maxFrets - Optional maximum fret number (defaults to 24)
 * @returns Array of chord notes with their degrees and positions
 */
export function getChordInfo(
  chordType: string,
  tonic: string,
  tuning: string[] = STANDARD_TUNING,
  maxFrets: number = MAX_FRETS
): ChordNote[] {
  // Build the full chord symbol
  const chordSymbol = `${tonic}${chordType}`;
  
  // Get chord information from tonal
  const chord = Chord.get(chordSymbol);
  
  if (!chord.notes || chord.notes.length === 0) {
    throw new Error(`Invalid chord: ${chordSymbol}`);
  }

  // Create fretboard instance
  const fretboard = new Fretboard(tuning, maxFrets);

  // Map notes to chord information
  const chordNotes: ChordNote[] = chord.notes.map((note, index) => {
    const pitchClassName = Note.pitchClass(note);
    const positions = fretboard.findPositions(pitchClassName);
    
    return {
      note: pitchClassName,
      degree: index + 1, // 1-based degree
      positions,
    };
  });

  return chordNotes;
}

/**
 * Get a function that returns the note at a given degree for a chord
 * @param chordType - Chord type (e.g., "m7", "maj7", "7")
 * @param tonic - Root note of the chord (e.g., "C", "D#")
 * @returns Function that takes a degree (1-based) and returns the note name
 */
export function getChordDegree(chordType: string, tonic: string): (degree: number) => string {
  const chordSymbol = `${tonic}${chordType}`;
  const chord = Chord.get(chordSymbol);
  
  if (!chord.notes || chord.notes.length === 0) {
    throw new Error(`Invalid chord: ${chordSymbol}`);
  }

  const notes = chord.notes.map(n => Note.pitchClass(n));

  return (degree: number): string => {
    if (degree < 1 || degree > notes.length) {
      throw new Error(`Degree ${degree} is out of range for chord ${chordSymbol} (1-${notes.length})`);
    }
    return notes[degree - 1] as string;
  };
}

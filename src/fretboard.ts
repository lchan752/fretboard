import * as Note from '@tonaljs/note';
import * as Interval from '@tonaljs/interval';
import { Position } from './types';

/**
 * Standard guitar tuning (from string 1 to 6: E-B-G-D-A-E)
 * String 1 is the highest (thinnest) string, String 6 is the lowest (thickest)
 */
export const STANDARD_TUNING = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

/**
 * Number of frets on a standard guitar
 */
export const MAX_FRETS = 24;

/**
 * Fretboard class to manage string-fret-note relationships
 */
export class Fretboard {
  private tuning: string[];
  private maxFrets: number;

  /**
   * Create a new fretboard
   * @param tuning - Array of note names for each string (1-6)
   * @param maxFrets - Maximum number of frets
   */
  constructor(tuning: string[] = STANDARD_TUNING, maxFrets: number = MAX_FRETS) {
    this.tuning = tuning;
    this.maxFrets = maxFrets;
  }

  /**
   * Get the note at a specific string and fret
   * @param string - String number (1-6, where 1 is high E)
   * @param fret - Fret number (0 for open string)
   * @returns The note name at that position
   */
  getNote(string: number, fret: number): string {
    if (string < 1 || string > 6) {
      throw new Error('String must be between 1 and 6');
    }
    if (fret < 0 || fret > this.maxFrets) {
      throw new Error(`Fret must be between 0 and ${this.maxFrets}`);
    }

    const openStringNote = this.tuning[string - 1];
    if (!openStringNote) {
      throw new Error(`No tuning defined for string ${string}`);
    }

    // For fret 0, return the open string note pitch class
    if (fret === 0) {
      return Note.pitchClass(openStringNote);
    }

    // Transpose the open string note by the number of semitones (frets)
    const transposed = Note.transpose(openStringNote, Interval.fromSemitones(fret));
    return Note.pitchClass(transposed);
  }

  /**
   * Find all positions where a specific note can be played on a given string
   * @param note - Note name to find
   * @param string - String number (1-6)
   * @returns Array of fret numbers where the note can be played
   */
  getFrets(note: string, string: number): number[] {
    if (string < 1 || string > 6) {
      throw new Error('String must be between 1 and 6');
    }

    const frets: number[] = [];
    const simplifiedNote = Note.simplify(note);

    for (let fret = 0; fret <= this.maxFrets; fret++) {
      const fretNote = this.getNote(string, fret);
      // Compare pitch class only (ignoring octave)
      if (Note.pitchClass(fretNote) === Note.pitchClass(simplifiedNote)) {
        frets.push(fret);
      }
    }

    return frets;
  }

  /**
   * Find all positions where a specific note can be played on the entire fretboard
   * @param note - Note name to find
   * @returns Array of positions where the note can be played
   */
  findPositions(note: string): Position[] {
    const positions: Position[] = [];

    for (let string = 1; string <= 6; string++) {
      const frets = this.getFrets(note, string);
      for (const fret of frets) {
        positions.push({ string, fret });
      }
    }

    return positions;
  }
}

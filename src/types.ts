/**
 * Position on the guitar fretboard
 */
export interface Position {
  /** String number (1-6, where 1 is high E and 6 is low E) */
  string: number;
  /** Fret number (0 for open string) */
  fret: number;
}

/**
 * Chord note with scale degree and fretboard positions
 */
export interface ChordNote {
  /** Musical note name (e.g., "C", "D#", "Eb") */
  note: string;
  /** Scale degree (1-based) */
  degree: number;
  /** Array of positions where this note can be played */
  positions: Position[];
}

import { Fretboard, STANDARD_TUNING } from './fretboard';

describe('Fretboard', () => {
  let fretboard: Fretboard;

  beforeEach(() => {
    fretboard = new Fretboard();
  });

  describe('getNote', () => {
    test('should return correct note for open strings', () => {
      expect(fretboard.getNote(1, 0)).toBe('E');
      expect(fretboard.getNote(2, 0)).toBe('B');
      expect(fretboard.getNote(3, 0)).toBe('G');
      expect(fretboard.getNote(4, 0)).toBe('D');
      expect(fretboard.getNote(5, 0)).toBe('A');
      expect(fretboard.getNote(6, 0)).toBe('E');
    });

    test('should return correct note for fretted positions', () => {
      // String 1, fret 1 should be F (E + 1 semitone)
      expect(fretboard.getNote(1, 1)).toBe('F');
      // String 1, fret 3 should be G (E + 3 semitones)
      expect(fretboard.getNote(1, 3)).toBe('G');
      // String 6, fret 5 should be A (E + 5 semitones)
      expect(fretboard.getNote(6, 5)).toBe('A');
      // String 3, fret 2 should be A (G + 2 semitones)
      expect(fretboard.getNote(3, 2)).toBe('A');
    });

    test('should throw error for invalid string number', () => {
      expect(() => fretboard.getNote(0, 0)).toThrow('String must be between 1 and 6');
      expect(() => fretboard.getNote(7, 0)).toThrow('String must be between 1 and 6');
    });

    test('should throw error for invalid fret number', () => {
      expect(() => fretboard.getNote(1, -1)).toThrow('Fret must be between 0 and 24');
      expect(() => fretboard.getNote(1, 25)).toThrow('Fret must be between 0 and 24');
    });
  });

  describe('getFrets', () => {
    test('should find all frets for a note on a string', () => {
      // E on string 1 (high E string)
      const eFrets = fretboard.getFrets('E', 1);
      expect(eFrets).toContain(0);  // Open string
      expect(eFrets).toContain(12); // 12th fret
      expect(eFrets.length).toBeGreaterThan(1);
    });

    test('should find C on string 2', () => {
      // C on string 2 (B string)
      const cFrets = fretboard.getFrets('C', 2);
      expect(cFrets).toContain(1);  // B string, 1st fret
      expect(cFrets).toContain(13); // B string, 13th fret
    });

    test('should throw error for invalid string number', () => {
      expect(() => fretboard.getFrets('E', 0)).toThrow('String must be between 1 and 6');
      expect(() => fretboard.getFrets('E', 7)).toThrow('String must be between 1 and 6');
    });
  });

  describe('findPositions', () => {
    test('should find all positions for a note', () => {
      const positions = fretboard.findPositions('E');
      expect(positions.length).toBeGreaterThan(0);
      
      // Should include open strings
      const openE = positions.filter(p => p.fret === 0);
      expect(openE.length).toBe(2); // Strings 1 and 6 are both E
    });

    test('should find positions for C note', () => {
      const positions = fretboard.findPositions('C');
      expect(positions.length).toBeGreaterThan(0);
      
      // Some known C positions
      const hasString2Fret1 = positions.some(p => p.string === 2 && p.fret === 1);
      expect(hasString2Fret1).toBe(true);
    });
  });

  describe('custom tuning', () => {
    test('should work with custom tuning', () => {
      // Drop D tuning (low E string tuned down to D)
      const dropD = ['E4', 'B3', 'G3', 'D3', 'A2', 'D2'];
      const customFretboard = new Fretboard(dropD);
      
      expect(customFretboard.getNote(6, 0)).toBe('D');
    });
  });
});

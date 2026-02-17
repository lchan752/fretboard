import { getChordInfo, getChordDegree } from './chord';

describe('Chord', () => {
  describe('getChordInfo', () => {
    test('should return chord notes for Cm7', () => {
      const cm7 = getChordInfo('m7', 'C');
      
      expect(cm7.length).toBe(4); // m7 chords have 4 notes
      
      // Check that all notes are present
      const notes = cm7.map(n => n.note);
      expect(notes).toContain('C');  // Root
      expect(notes).toContain('Eb'); // Minor third
      expect(notes).toContain('G');  // Fifth
      expect(notes).toContain('Bb'); // Minor seventh
      
      // Check degrees
      expect(cm7[0]?.degree).toBe(1);
      expect(cm7[1]?.degree).toBe(2);
      expect(cm7[2]?.degree).toBe(3);
      expect(cm7[3]?.degree).toBe(4);
      
      // Check that each note has positions
      cm7.forEach(chordNote => {
        expect(chordNote.positions.length).toBeGreaterThan(0);
        expect(chordNote.positions[0]).toHaveProperty('string');
        expect(chordNote.positions[0]).toHaveProperty('fret');
      });
    });

    test('should return chord notes for Gmaj7', () => {
      const gmaj7 = getChordInfo('maj7', 'G');
      
      expect(gmaj7.length).toBe(4); // maj7 chords have 4 notes
      
      const notes = gmaj7.map(n => n.note);
      expect(notes).toContain('G');  // Root
      expect(notes).toContain('B');  // Major third
      expect(notes).toContain('D');  // Fifth
      expect(notes).toContain('F#'); // Major seventh
    });

    test('should return chord notes for D7', () => {
      const d7 = getChordInfo('7', 'D');
      
      expect(d7.length).toBe(4); // 7 chords have 4 notes
      
      const notes = d7.map(n => n.note);
      expect(notes).toContain('D');  // Root
      expect(notes).toContain('F#'); // Major third
      expect(notes).toContain('A');  // Fifth
      expect(notes).toContain('C');  // Minor seventh
    });

    test('should throw error for invalid chord', () => {
      expect(() => getChordInfo('invalid', 'C')).toThrow('Invalid chord');
    });
  });

  describe('getChordDegree', () => {
    test('should return correct note for each degree', () => {
      const cm7Degree = getChordDegree('m7', 'C');
      
      expect(cm7Degree(1)).toBe('C');  // Root
      expect(cm7Degree(2)).toBe('Eb'); // Minor third
      expect(cm7Degree(3)).toBe('G');  // Fifth
      expect(cm7Degree(4)).toBe('Bb'); // Minor seventh
    });

    test('should work for major chords', () => {
      const cmajDegree = getChordDegree('maj', 'C');
      
      expect(cmajDegree(1)).toBe('C'); // Root
      expect(cmajDegree(2)).toBe('E'); // Major third
      expect(cmajDegree(3)).toBe('G'); // Fifth
    });

    test('should throw error for invalid degree', () => {
      const cm7Degree = getChordDegree('m7', 'C');
      
      expect(() => cm7Degree(0)).toThrow('out of range');
      expect(() => cm7Degree(5)).toThrow('out of range');
    });

    test('should throw error for invalid chord', () => {
      expect(() => getChordDegree('invalid', 'C')).toThrow('Invalid chord');
    });
  });

  describe('integration test', () => {
    test('should provide complete chord information matching the problem statement', () => {
      // Example from problem statement: Cm7
      const cm7Info = getChordInfo('m7', 'C');
      const cm7Degree = getChordDegree('m7', 'C');
      
      // Build result in the format from problem statement
      const result = cm7Info.map(info => ({
        note: cm7Degree(info.degree),
        degree: info.degree,
        positions: info.positions
      }));
      
      expect(result.length).toBe(4);
      expect(result[0]?.note).toBe('C');
      expect(result[0]?.degree).toBe(1);
      expect(result[0]?.positions).toBeDefined();
      expect(result[0]?.positions.length).toBeGreaterThan(0);
    });
  });
});

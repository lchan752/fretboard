import { getChordInfo, getChordDegree } from './chord';

/**
 * This test verifies the implementation matches the exact format 
 * specified in the problem statement:
 * 
 * type Position = {string, fret}
 * const Cm7 = Chord.degrees("m7", "C");
 * return [{ note: Cm7(1), degree: 1, positions: [...]}, {note: Cm7(2), degree: 2, positions: [...]}, ...]
 */
describe('Problem Statement Compliance', () => {
  test('should match the exact format from problem statement', () => {
    // Get chord degree function (equivalent to Chord.degrees)
    const Cm7 = getChordDegree('m7', 'C');
    
    // Get chord information
    const cm7Info = getChordInfo('m7', 'C');
    
    // Build result in the exact format from problem statement
    const result = cm7Info.map(info => ({
      note: Cm7(info.degree),
      degree: info.degree,
      positions: info.positions
    }));
    
    // Verify structure
    expect(result.length).toBe(4);
    
    // Verify each element has the required properties
    result.forEach((item) => {
      expect(item).toHaveProperty('note');
      expect(item).toHaveProperty('degree');
      expect(item).toHaveProperty('positions');
      expect(Array.isArray(item.positions)).toBe(true);
      
      // Verify positions have correct structure
      item.positions.forEach((position) => {
        expect(position).toHaveProperty('string');
        expect(position).toHaveProperty('fret');
        expect(typeof position.string).toBe('number');
        expect(typeof position.fret).toBe('number');
      });
    });
    
    // Verify specific values
    expect(result[0]?.note).toBe('C');
    expect(result[0]?.degree).toBe(1);
    expect(result[1]?.note).toBe('Eb');
    expect(result[1]?.degree).toBe(2);
    expect(result[2]?.note).toBe('G');
    expect(result[2]?.degree).toBe(3);
    expect(result[3]?.note).toBe('Bb');
    expect(result[3]?.degree).toBe(4);
  });
});

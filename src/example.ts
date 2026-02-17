import { Fretboard, getChordInfo, getChordDegree } from './index';

console.log('=== Fretboard Examples ===\n');

// Create a fretboard instance
const fretboard = new Fretboard();

// Example 1: Get note at specific position
console.log('1. Get note at position:');
console.log(`String 1, Fret 0: ${fretboard.getNote(1, 0)}`); // E
console.log(`String 1, Fret 3: ${fretboard.getNote(1, 3)}`); // G
console.log(`String 3, Fret 2: ${fretboard.getNote(3, 2)}`); // A
console.log();

// Example 2: Find frets for a note on a string
console.log('2. Find frets for C on string 2 (B string):');
const cFrets = fretboard.getFrets('C', 2);
console.log(`Frets: ${cFrets.join(', ')}`);
console.log();

// Example 3: Find all positions for a note
console.log('3. Find all positions for note E:');
const ePositions = fretboard.findPositions('E');
console.log(`Found ${ePositions.length} positions`);
console.log('First 5 positions:', ePositions.slice(0, 5));
console.log();

// Example 4: Chord information (as per problem statement)
console.log('4. Chord Information (Cm7):');
const cm7Info = getChordInfo('m7', 'C');
const Cm7 = getChordDegree('m7', 'C');

// Build result in the format from problem statement
const result = cm7Info.map(info => ({
  note: Cm7(info.degree),
  degree: info.degree,
  positions: info.positions.slice(0, 3) // Show first 3 positions for readability
}));

console.log(JSON.stringify(result, null, 2));
console.log();

// Example 5: Different chord types
console.log('5. Other chord examples:');
const gmaj7 = getChordInfo('maj7', 'G');
console.log(`Gmaj7 notes: ${gmaj7.map(n => n.note).join(', ')}`);

const d7 = getChordInfo('7', 'D');
console.log(`D7 notes: ${d7.map(n => n.note).join(', ')}`);
console.log();

// Example 6: Using chord degree function
console.log('6. Using chord degree function:');
const Gmaj7 = getChordDegree('maj7', 'G');
console.log(`Gmaj7 - Degree 1: ${Gmaj7(1)}`); // G
console.log(`Gmaj7 - Degree 2: ${Gmaj7(2)}`); // B
console.log(`Gmaj7 - Degree 3: ${Gmaj7(3)}`); // D
console.log(`Gmaj7 - Degree 4: ${Gmaj7(4)}`); // F#

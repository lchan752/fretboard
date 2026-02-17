# Fretboard Utility Library

A TypeScript utility library for guitar fretboard operations using [Tonal.js](https://github.com/tonaljs/tonal).

## Features

- Dictionary tracking string → fret → note
- Given string and fret, return note
- Given note and string, return fret
- Given chord type and tonic, return notes, scale degrees, and fretboard positions

## Installation

```bash
npm install fretboard
```

## Usage

### Basic Fretboard Operations

```typescript
import { Fretboard } from 'fretboard';

const fretboard = new Fretboard();

// Get note at a specific position
const note = fretboard.getNote(1, 3); // Returns "G" (string 1, fret 3)

// Find frets for a note on a specific string
const frets = fretboard.getFrets('C', 2); // Returns [1, 13, ...] (C on B string)

// Find all positions for a note on the entire fretboard
const positions = fretboard.findPositions('E');
// Returns [{ string: 1, fret: 0 }, { string: 6, fret: 0 }, ...]
```

### Chord Information

```typescript
import { getChordInfo, getChordDegree } from 'fretboard';

// Get complete chord information
const cm7 = getChordInfo('m7', 'C');
// Returns:
// [
//   { note: 'C', degree: 1, positions: [...] },
//   { note: 'Eb', degree: 2, positions: [...] },
//   { note: 'G', degree: 3, positions: [...] },
//   { note: 'Bb', degree: 4, positions: [...] }
// ]

// Get chord degree function
const Cm7 = getChordDegree('m7', 'C');
Cm7(1); // Returns "C"
Cm7(2); // Returns "Eb"
Cm7(3); // Returns "G"
Cm7(4); // Returns "Bb"
```

### Custom Tuning

```typescript
import { Fretboard } from 'fretboard';

// Drop D tuning
const dropD = ['E4', 'B3', 'G3', 'D3', 'A2', 'D2'];
const fretboard = new Fretboard(dropD);

fretboard.getNote(6, 0); // Returns "D"
```

## API Reference

### Types

#### `Position`
```typescript
interface Position {
  string: number; // 1-6, where 1 is high E and 6 is low E
  fret: number;   // 0 for open string
}
```

#### `ChordNote`
```typescript
interface ChordNote {
  note: string;        // Musical note name (e.g., "C", "D#", "Eb")
  degree: number;      // Scale degree (1-based)
  positions: Position[]; // Array of positions where this note can be played
}
```

### `Fretboard` Class

#### `constructor(tuning?: string[], maxFrets?: number)`
- `tuning`: Array of note names for each string (default: standard tuning)
- `maxFrets`: Maximum number of frets (default: 24)

#### `getNote(string: number, fret: number): string`
Get the note at a specific string and fret position.

#### `getFrets(note: string, string: number): number[]`
Find all frets where a specific note can be played on a given string.

#### `findPositions(note: string): Position[]`
Find all positions where a specific note can be played on the entire fretboard.

### Functions

#### `getChordInfo(chordType: string, tonic: string, tuning?: string[], maxFrets?: number): ChordNote[]`
Get chord information including notes, scale degrees, and fretboard positions.

#### `getChordDegree(chordType: string, tonic: string): (degree: number) => string`
Get a function that returns the note at a given degree for a chord.

## Chord Types

Supports all chord types from Tonal.js, including:
- `maj`, `min`, `m`
- `7`, `maj7`, `m7`, `mM7`
- `dim`, `aug`
- `sus2`, `sus4`
- And many more...

## License

ISC


# Publishing Guide

## For Package Maintainers

### Publishing a New Release

This package is automatically published to GitHub Packages when a new release is created.

1. **Update the version** in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. **Create a new release** on GitHub:
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v1.0.0`)
   - Fill in the release title and description
   - Click "Publish release"

3. **The GitHub Actions workflow will automatically**:
   - Run tests
   - Build the package
   - Publish to GitHub Packages

### Manual Publishing

If you need to publish manually:

```bash
# Ensure you're authenticated with GitHub Packages
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > ~/.npmrc

# Build the package
npm run build

# Publish
npm publish
```

## For Package Users

### Installing the Package

1. **Configure npm** to use GitHub Packages for the `@lchan752` scope by adding to your project's `.npmrc`:
   ```
   @lchan752:registry=https://npm.pkg.github.com
   ```

2. **Authenticate** with GitHub Packages by adding your GitHub Personal Access Token:
   ```
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```
   
   To create a token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with `read:packages` permission
   - Copy the token and add it to your `.npmrc`

3. **Install the package**:
   ```bash
   npm install @lchan752/fretboard
   ```

### Using the Package

```typescript
import { Fretboard, getChordInfo } from '@lchan752/fretboard';

const fretboard = new Fretboard();
const note = fretboard.getNote(1, 0); // "E"

const chordInfo = getChordInfo('maj7', 'C');
console.log(chordInfo);
```

## CI/CD Workflows

### CI Workflow (ci.yml)

Runs on every push and pull request to the main branch:
- Runs tests on Node.js 18.x and 20.x
- Builds the package
- Uploads build artifacts

### Publish Workflow (publish.yml)

Runs when a new release is created:
- Runs tests
- Builds the package
- Publishes to GitHub Packages

## Package Structure

```
@lchan752/fretboard/
├── dist/              # Compiled JavaScript and TypeScript definitions
│   ├── index.js       # Main entry point
│   ├── index.d.ts     # Type definitions
│   └── ...
├── README.md          # Package documentation
├── LICENSE            # ISC License
└── package.json       # Package metadata
```

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Pack (test packaging)

```bash
npm pack --dry-run
```

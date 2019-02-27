import React from 'react';
import { renderChordDiagram } from 'markdown-it-music/renderers/chord_diagram';

function renderEsus4Svg() {
  return renderChordDiagram({
    fretOffset: 2,
    mutes: [
      { string: 1 },
      { string: 2 }
    ],
    notes: [
      { string: 3, fret: 4 },
      { string: 4, fret: 5 }
    ],
    barres: [
      { first: 5, last: 6, fret: 6 }
    ]
  }, 200, 200);
}

const sandbox = () => (
  <div>
    <h1>Music Markdown Sandbox</h1>
    <p>
      This page exercises various subcomponents of music-markdown and
      markdown-it-music.
    </p>
    <h2>Chord Diagram Renderer</h2>
    <p>
      This section exercises the Chord Diagram Renderer.
    </p>
    <h3>Esus4 (200x200)</h3>
    <span dangerouslySetInnerHTML={{ __html: renderEsus4Svg() }} />
  </div>
);

export default sandbox;

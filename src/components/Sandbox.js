import React from 'react';
import { renderChordDiagram } from 'markdown-it-music/renderers/chord_diagram';
import { guitarChordLibrary } from 'markdown-it-music/renderers/chord_library';

const Sandbox = () => (
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
    <div dangerouslySetInnerHTML={
      { __html: renderChordDiagram('o2 m1 m2 n3,2 n4,4 b5,6,5', 200, 200) }
    } />

    <h2>Entire Chord Library</h2>
    <AllChords/>
  </div>
);

const AllChords = () => (
  Array.from(guitarChordLibrary.keys()).map((chord, index) => (
    <div key={index} align="center" style={{ display: 'inline-block' }}>
      {guitarChordLibrary.get(chord).map((value, index) => (
        <span key={index} dangerouslySetInnerHTML={
          { __html: renderChordDiagram(value) }
        } />
      ))}
      <h5>{chord}</h5>
    </div>
  ))
);

export default Sandbox;

import React from 'react';
import MarkdownMusic from './MarkdownMusic';
import { parseVoicing } from 'markdown-it-music/lib/voicing';
import { renderChordDiagram } from 'markdown-it-music/renderers/chord_diagram';
import { guitarChordLibrary } from 'markdown-it-music/renderers/chord_library';
import Toolbar from './Toolbar';

const Sandbox = () => (
  <div>
    <Toolbar></Toolbar>

    <h1>Music Markdown Sandbox</h1>
    <p>
      This page exercises various subcomponents of music-markdown and
      markdown-it-music.
    </p>

    <h2>Markdown Editor</h2>
    <MarkdownEditor/>

    <h2>Chord Diagram Renderer</h2>
    <p>
      This section exercises the Chord Diagram Renderer.
    </p>
    <h3>Esus4 (200x200)</h3>
    <div dangerouslySetInnerHTML={
      { __html: renderChordDiagram(parseVoicing('o2 m1 m2 n3,2 n4,4 b5,6,5'), 200, 200) }
    } />

    <h2>Entire Chord Library</h2>
    <AllChords/>
  </div>
);

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    const value = '```chords\n' +
      'c1:                    Am     G  F          G      Esus4  E\n' +
      'v1: All the leaves are brown        and the sky is gray\n\n' +
      'c1: F               C     E  Am       F        Esus4  E\n' +
      'v1: I\'ve been for a walk         on a winter\'s day\n\n' +
      'c1:                 Am    G  F       G      Esus4  E\n' +
      'v1: I\'d be safe and warm        if I was in L.A.\n\n' +
      'c1:            Am        G  F     G               Esus4  E\n' +
      'v1: California dreamin\'        on such a winter\'s day\n' +
      '```';

    this.state = {
      value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const styles = { display: 'flex', width: '100%' };
    const editorStyles = {
      minHeight: '500px', width: '50%', marginRight: '20px',
      fontFamily: 'monospace', whiteSpace: 'pre'
    };

    return <div style={styles}>
      <textarea value={this.state.value} onChange={this.handleChange} style={editorStyles}></textarea>
      <div style={editorStyles}>
        <MarkdownMusic source={this.state.value}></MarkdownMusic>
      </div>
    </div>;
  }
}

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

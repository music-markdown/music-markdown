import { Link, Route } from 'react-router-dom';
import MusicMarkdown from './MusicMarkdown';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { guitarChordLibrary } from 'markdown-it-music/renderers/chord_library';
import { renderChordDiagram } from 'markdown-it-music/renderers/chord_diagram';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
});

const Sandbox = ({ classes, match }) => (
  <div className={classes.root}>
    <Typography variant='h2'>Sandbox</Typography>

    <ul>
      <li><Link to={`${match.url}/california-dreamin`}>California Dreamin' - The Mamas and the Papas</Link></li>
      <li><Link to={`${match.url}/the-giving-tree`}>The Giving Tree - Plain White T's</Link></li>
      <li><Link to={`${match.url}/chord-library`}>Chord Library</Link></li>
    </ul>

    <Route path={`${match.path}/california-dreamin`}
      component={() => <MusicMarkdown source={californiaDreaminSource} />} />
    <Route path={`${match.path}/the-giving-tree`}
      component={() => <MusicMarkdown source={theGivingTreeSource} />} />
    <Route path={`${match.path}/chord-library`} component={AllChords} />
  </div>
);

const AllChords = () => (
  <>
    <Typography variant='h3'>Chord Library</Typography>
    {
      Array.from(guitarChordLibrary.keys()).map((chord, index) => (
        <div key={index} align="center" style={{ display: 'inline-block' }}>
          {guitarChordLibrary.get(chord).map((value, index) => (
            <span key={index} dangerouslySetInnerHTML={{ __html: renderChordDiagram(value) }} />
          ))}
          <h5>{chord}</h5>
        </div>
      ))
    }
  </>
);


const theGivingTreeSource = `---
---

# The Giving Tree - Plain White T's

Capo 1st Fret

Am - intro and verse (577555) (except for bridge where a regular Am is played)


## Intro

Em (pickie 3rd) G Am G Bm7


## Verse

c1: Em                                     G
l1: All the leaves on the Giving Tree have fallen

c1:             D        G        Bm7
l1: No shade to crawl in underneath

c1: Em
l1: I've got scars from a pocket knife

c1:       G               Am         G    D
l1: Where you carved your heart into me

## Chorus

c1:            C          G
l1: If all you wanted was love

c1:               D      G
l1: Why would you use me up

c1:        C     D                      G    G7
l1: Cut me down, build a boat, and sail away

c1:            C         G      B           Em
l1: When all I wanted to be was your giving tree

c1: Em7    C             D                  G
l1: Settle down, build a home, and make you happy?

## Verse 2

c1: Em                               G
l1: I lie in the dead of night and I wonder

c1:       D              G      Bm7
l1: Whose covers you're between

c1: Em
l1: And it's sad laying in his bed

c1:          G              Am                  G    D
l1: You feel hollow, so you crawl home back to me

## Chorus

c1:            C          G
l1: If all you wanted was love

c1:               D      G
l1: Why would you use me up

c1:        C     D                      G        G7
l1: Cut me down, build a boat, and sail away

c1:            C         G      B           Em
l1: When all I wanted to be was your giving tree

c1: Em7    C             D                  G
l1: Settle down, build a home, and make you happy?

## Bridge

c1: Am
l1: Well, I see a trail that starts

c1: C                         G
l1: A line of broken hearts behind you

c1:               D
l1: That lead you back to me

c1: Am
l1: The once sad and lonely fool

c1: C                              D     Dsus4 D
l1: With nothing left but roots to show, oh oh

## Chorus

(Single strum per chord)

c1:            C          G
l1: If all you wanted was love

c1:               D      G
l1: Why would you use me up
(Resume regular strumming)

c1:        C     D                      G     G7
l1: Cut me down, build a boat, and sail away

c1:            C         G      B           Em
l1: When all I wanted to be was your giving tree

c1: Em7    C             D                  G
l1: Settle down, build a home, and make you happy?
(Single Strum per chord)

c1:        C             D                  G
l1: Settle down, build a home, and make you happy?
`;

const californiaDreaminSource = `---
youTubeId: dN3GbF9Bx6E
---

# California Dreamin - Mama's and the Papa's

## Verse 1
c1:                    Am     G  F          G      Esus4  E
v1: All the leaves are brown        and the sky is gray

c1: F               C     E  Am       F        Esus4  E
v1: I've been for a walk         on a winter's day

c1:                 Am    G  F       G      Esus4  E
v1: I'd be safe and warm        if I was in L.A.

c1:            Am        G  F     G               Esus4  E
v1: California dreamin'        on such a winter's day

## Verse 2
c1:                 Am      G  F            G        Esus4  E
v1: Stopped in to a church        I passed along the way

c1:        F              C      E  Am        F          Esus4  E
v1: Well I got down on my knees         and I pretend to pray

c1:                                 Am    G  F
v1: You know the preacher liked the cold

c1:          G         Esus4  E
v1: He knows I'm gonna stay

c1:            Am        G  F     G               Esus4  E
v1: California dreamin'        on such a winter's day

## Violin Solo
\`\`\`abc
X: 1
M: 4/4
L: 1/16
K: Amin
"Am" (C16 | C4) B,2C2 D6 CB, | (C16 | C4) B,2C2 "F" D6 CA, |
"C" G,8 "E" _A,8 | "Am" =A,8 "F" (3F4 F4 F4 | "E" F2 (E6 E8) | z6 ^A2 B4 e4 |
"Am" e2d2c2(d2 "G" d4) .=A4 | "F" e2d2c2(d2 "G" d4) .A4 |
"Esus4" e4 e4 e2d2B2d2 | "E" e4 e4 e2g2e2d2 |
"Am" .e4 c2 "G" .d4 c2 e4 | "F" z2 c2 e2 "G" d6 c2d2 |
"Esus4" e2e2e2d2 d2B2B2_A2 | "E" _A2F2F2E2 =A2B2A2G2 |
\`\`\`

## Verse 3
c1:                    Am     G  F          G      Esus4  E
v1: All the leaves are brown        and the sky is gray

c1: F               C     E  Am       F        Esus4  E
v1: I've been for a walk         on a winter's day

c1:             Am        G  F          G     Esus4  E
v1: If I didn't tell her        I could leave today

c1:             Am        G  F     G               Am
v1: California  dreamin'        on such a winter's day

c1:             Am        G  F     G               Am
v1:                             on such a winter's day

c1:             Am        G  F     G               E    Am
v1:                             on such a winter's day
`;

export default withStyles(styles, { withTheme: true })(Sandbox);

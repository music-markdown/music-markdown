import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from '../lib/constants';
import { Link, Route } from 'react-router-dom';
import MusicMarkdown from './MusicMarkdown';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { guitarChordbook } from 'markdown-it-music/lib/chordbook';
import queryString from 'query-string';
import { renderChordDiagram } from 'markdown-it-music/renderers/chord_diagram';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 8,
  },
  chordSourcePaper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  chordCategoryPaper: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
  chordCategoryTypography: {
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  chordVariantPaper: {
    display: 'inline-block',
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
  chordVariantTypography: {
    color: theme.palette.text.secondary,
  },
  chordDiagram: {
    filter: theme.palette.type === 'dark' ? 'invert(100%)' : '',
  }
});

const Sandbox = ({ classes, location, match }) => (
  <div className={classes.root}>
    <Typography variant='h2'>Sandbox</Typography>

    <ul>
      <li><Link to={`${match.url}/california-dreamin`}>California Dreamin' - The Mamas and the Papas</Link></li>
      <li><Link to={`${match.url}/the-giving-tree`}>The Giving Tree - Plain White T's</Link></li>
      <li><Link to={`${match.url}/riptide-coolkids-mashup`}>Riptide / Coolkids Mashup</Link></li>
      <li><Link to={`${match.url}/guitar-chordbook`}>Guitar Chordbook</Link></li>
    </ul>

    <Route path={`${match.path}/california-dreamin`}
      component={() => <MarkdownViewer location={location} source={californiaDreaminSource} />} />
    <Route path={`${match.path}/the-giving-tree`}
      component={() => <MarkdownViewer location={location} source={theGivingTreeSource} />} />
    <Route path={`${match.path}/riptide-coolkids-mashup`}
      component={() => <MarkdownViewer location={location} source={riptideCoolkidsMashupSource} />} />
    <Route path={`${match.path}/guitar-chordbook`} component={AllGuitarChords} />
  </div>
);

const MarkdownViewer = ({ source, location }) => {
  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || '1';
  const transposeAmount = Number(params[TRANSPOSE_QUERY_KEY]) || 0;

  return <MusicMarkdown source={source} columnCount={columnCount} transposeAmount={transposeAmount} />;
};

const roots = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

const qualities = [
  '', 'm', '6', 'm6', '7', 'maj7', 'm7', '9', 'dim', 'aug', 'sus2', '7sus2', 'sus4', '7sus4', '5', 'dim5', 'dim7',
  '7b5', 'm7b5', '7#5', '7b9', '7#9', '7b9#5', '7/6', '9b5', '9#5', 'maj9', 'm9', '9/6', 'm9/6', 'add9', '11', 'm11',
  '11aug', '13', '13b9', '13b9b5'
];

const AllGuitarChords = withStyles(styles, { withTheme: true })(({ classes, location }) => (
  <>
    <Typography variant='h3'>Guitar Chordbook</Typography>
    <Paper className={classes.chordSourcePaper}>
      <MarkdownViewer source={allChordsSource} location={location} />
    </Paper>
    {roots.map((category, index) => (
      <Paper key={`category-${index}`} className={classes.chordCategoryPaper}>
        <Typography className={classes.chordCategoryTypography} variant='h4'>{category} Chords</Typography>
        <ChordCategory category={category} />
      </Paper>
    ))}
  </>
));

const ChordCategory = withStyles(styles, { withTheme: true })(({ classes, category }) => (
  Array.from(guitarChordbook.keys())
    .filter((chord) => chord.match(/^[CDEFGAB](?:#|b)?|N\.C\./)[0] === category)
    .map((chord, index) => (
      <Paper key={`chord-${index}`} className={classes.chordVariantPaper}>
        {guitarChordbook.get(chord)
          .map((variant, index) => (
            <span className={classes.chordDiagram} key={`variant-${index}`}
              dangerouslySetInnerHTML={{ __html: renderChordDiagram(variant) }} />
          ))}
        <Typography className={classes.chordVariantTypography} variant='h5'>{chord}</Typography>
      </Paper>
    ))
));

const allChordsSource = `---
---
${roots.map((root) => `## ${root} Chords
c1: ${qualities.map((quality) => root + quality).join(' ')}`).join('\n\n')}
`;


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
:::abc
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
:::

:::vextab
options space=20

tabstave
  notation=true
  key=A time=4/4

  notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
  notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4
  text :w, |#segno, ,|, :hd, , #tr


options space=25

tabstave
  notation=true

  notes :q (5/4.5/5) (7/4.7/5)s(5/4.5/5) ^3^
  notes :8 7-5/4 $.a./b.$ (5/4.5/5)h(7/5) =:|
  notes :8 (12/5.12/4)ds(5/5.5/4)u 3b4/5
  notes :h (5V/6.5/4.6/3.7/2) $.italic.let ring$ =|=

  text :h, ,.font=Times-12-italic, D.S. al coda, |#coda
  text :h, ,.-1, .font=Arial-14-bold,A13
  text ++, .23, #f
:::

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

const riptideCoolkidsMashupSource = `---
youTubeId: JtBwyzURqzs
---

# Riptide Coolkids Mashup

Capo on 2

## Chorus
c1: Em    C                   G
l1: Lady, running down to the riptide,

c1:                   Em
l1: taken away to the dark side,

c1: C                    G
l1: I wanna be your left hand man.

## Verse 1
c1:               Em                                     C          G
l1: She sees them walking in a straight line, that's not really her style

c1:              Em                     C                      G
l1: And they all got the same heartbeat, but hers is falling behind

c1: Em                         C                G
l1: Nothing in this world could ever bring them down

c1: Em                      C                         G
l1: Yeah they're invincible and she's just in the background

## Pre-chorus
c1: Em   C   G
l1: Ooh, ooh ooh

c1: Em  C         N.C.
l1: Ooh, and they come unstuck

## Chorus
c1: Em    C                   G
l1: Lady, running down to the riptide,

c1:                   Em
l1: taken away to the dark side,

c1: C                    G
l1: I wanna be your left hand man.

c1: Em           C                      G
l1: I love you when you're singing that song and,

c1:                    Em
l1: I got a lump in my throat 'cause

c1: C                           G
l1: you're gonna sing the words wrong

## Verse 2
c1: Em              C                G
l1: I was scared of dentists and the dark,

c1: Em              C                G
l1: I was scared of pretty girls and starting conversations,

c1:    Em     C                   G
l1: Oh all my friends are turning green,

c1:            Em        C                  N.C.
l1: You're the magicians assistant in their dreams.

## Chorus x2

c1: Em                C
l1: I wish that I could be like the cool kids

c1: G                          
l1: 'Cause all the cool kids, they seem to fit in

c1: Em                  C
l1: I wish that I could be like the cool kids
l2: Can't read my,      can't read my

c1: G
l1: Like the cool kids
l2: Poker face....`;

export default withStyles(styles, { withTheme: true })(Sandbox);

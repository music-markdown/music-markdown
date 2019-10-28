import { COLUMN_COUNT_QUERY_KEY, TRANSPOSE_QUERY_KEY } from "../lib/constants";
import { Link, Route } from "react-router-dom";
import MusicMarkdown from "./MusicMarkdown";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { guitarChordbook } from "markdown-it-music/lib/chordbook";
import queryString from "query-string";
import { renderChordDiagram } from "markdown-it-music/renderers/chord_diagram";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  chordSourcePaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  chordCategoryPaper: {
    margin: theme.spacing(1),
    textAlign: "center"
  },
  chordCategoryTypography: {
    color: theme.palette.text.primary,
    textAlign: "center"
  },
  chordVariantPaper: {
    display: "inline-block",
    margin: theme.spacing(1),
    textAlign: "center"
  },
  chordVariantTypography: {
    color: theme.palette.text.secondary
  },
  chordDiagram: {
    filter: theme.palette.type === "dark" ? "invert(100%)" : ""
  }
});

const Sandbox = ({ classes, location, match }) => (
  <div className={classes.root}>
    <Typography variant="h2">Sandbox</Typography>

    <ul>
      <li>
        <Link to={`${match.url}/all-features-in-one-place`}>
          All the Features in One Place
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/guitar-chordbook`}>Guitar Chordbook</Link>
      </li>
    </ul>

    <Route
      path={`${match.path}/all-features-in-one-place`}
      component={() => (
        <MarkdownViewer location={location} source={allFeaturesSource} />
      )}
    />
    <Route
      path={`${match.path}/guitar-chordbook`}
      component={AllGuitarChords}
    />
  </div>
);

const MarkdownViewer = ({ source, location }) => {
  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";
  const transposeAmount = Number(params[TRANSPOSE_QUERY_KEY]) || 0;

  return (
    <MusicMarkdown
      source={source}
      columnCount={columnCount}
      transposeAmount={transposeAmount}
    />
  );
};

const roots = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B"
];

const qualities = [
  "",
  "m",
  "6",
  "m6",
  "7",
  "maj7",
  "m7",
  "9",
  "dim",
  "aug",
  "sus2",
  "7sus2",
  "sus4",
  "7sus4",
  "5",
  "dim5",
  "dim7",
  "7b5",
  "m7b5",
  "7#5",
  "7b9",
  "7#9",
  "7b9#5",
  "7/6",
  "9b5",
  "9#5",
  "maj9",
  "m9",
  "9/6",
  "m9/6",
  "add9",
  "11",
  "m11",
  "11aug",
  "13",
  "13b9",
  "13b9b5"
];

const AllGuitarChords = withStyles(styles, { withTheme: true })(
  ({ classes, location }) => (
    <>
      <Typography variant="h3">Guitar Chordbook</Typography>
      <Paper className={classes.chordSourcePaper}>
        <MarkdownViewer source={allChordsSource} location={location} />
      </Paper>
      {roots.map((category, index) => (
        <Paper key={`category-${index}`} className={classes.chordCategoryPaper}>
          <Typography className={classes.chordCategoryTypography} variant="h4">
            {category} Chords
          </Typography>
          <ChordCategory category={category} />
        </Paper>
      ))}
    </>
  )
);

const ChordCategory = withStyles(styles, { withTheme: true })(
  ({ classes, category }) =>
    Array.from(guitarChordbook.keys())
      .filter(chord => chord.match(/^[CDEFGAB](?:#|b)?|N\.C\./)[0] === category)
      .map((chord, index) => (
        <Paper key={`chord-${index}`} className={classes.chordVariantPaper}>
          {guitarChordbook.get(chord).map((variant, index) => (
            <span
              className={classes.chordDiagram}
              key={`variant-${index}`}
              dangerouslySetInnerHTML={{ __html: renderChordDiagram(variant) }}
            />
          ))}
          <Typography className={classes.chordVariantTypography} variant="h5">
            {chord}
          </Typography>
        </Paper>
      ))
);

const allChordsSource = `---
---
${roots
  .map(
    root => `## ${root} Chords
c1: ${qualities.map(quality => root + quality).join(" ")}`
  )
  .join("\n\n")}
`;

const allFeaturesSource = `---
youTubeId: dN3GbF9Bx6E
---

# All the Features in One Place

## Chord and Lyrics
c1: Em               D           Em
l1: Are you goin' to Scarborough Fair?

c1: G        Em        G A       Em
l1: Parsley, sage, rosemary, and thyme

c1: Em       G                   D
l1: Remember me to one who lives there

c1: Em       D                  Em
l1: She once was a true love of mine

## Multiple Overlapping Voices
c1: Em                         D         Em
l1: Tell her to make me a      cambric   shirt
l2:                     On the side of a hill in the deep forest green

c1: G        Em        G A       Em
l1: Parsley, sage, rosemary, and thyme
l2:                              Tracing a sparrow on snow-crested ground

c1: Em         G               D
l1: Without no seams nor needlework
l2:                      Blankets and bedclothes the child of the mountain

c1: Em          D                 Em
l1: Then she'll be a true love of mine
l2:                               Sleeps unaware of the clarion call

## VexTab

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

## ABC

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

`;

export default withStyles(styles, { withTheme: true })(Sandbox);

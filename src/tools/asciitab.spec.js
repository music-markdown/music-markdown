import asciiTabConvert from '../tools/asciitab';

describe('ASCII Tab Converter transforms', () => {
  test('two phrase verse', () => {
    const actual = asciiTabConvert([
      '                   Am     G  F          G      Esus4  E',
      'All the leaves are brown        and the sky is gray',
      'F               C     E  Am       F        Esus4  E',
      `I've been for a walk         on a winter's day`
    ].join('\n'));

    const expected = [
      'c1:                    Am     G  F          G      Esus4  E',
      'l1: All the leaves are brown        and the sky is gray',
      '',
      'c1: F               C     E  Am       F        Esus4  E',
      `l1: I've been for a walk         on a winter's day`,
    ].join('\n');

    expect(actual).toEqual(expected);
  });

  test('single phrase verse with two voices', () => {
    const actual = asciiTabConvert([
      'Am                    G       Am',
      'Tell her to make me a cambric shirt',
      '                    On the side of a hill in the deep forest green'
    ].join('\n'));

    const expected = [
      'c1: Am                    G       Am',
      'l1: Tell her to make me a cambric shirt',
      'l2:                     On the side of a hill in the deep forest green',
    ].join('\n');

    expect(actual).toEqual(expected);
  });

  test('fenced section is untouched', () => {
    const expected = [
      ':::abc',
      '[header fake]',
      'header fake 2:',
      'some abc notation',
      ':::'
    ].join('\n');
    const actual = asciiTabConvert(expected);
    expect(actual).toEqual(expected);
  });

  test('headers ending with :', () => {
    const actual = asciiTabConvert('Verse 1:');
    expect(actual).toEqual('## Verse 1');
  });

  test('headers contained in []', () => {
    const actual = asciiTabConvert('[Verse 1]');
    expect(actual).toEqual('## Verse 1');
  });

  test('header following a verse', () => {
    const actual = asciiTabConvert([
      '                   Am     G  F          G      Esus4  E',
      'All the leaves are brown        and the sky is gray',
      '',
      'Verse 2:'
    ].join('\n'));

    const expected = [
      'c1:                    Am     G  F          G      Esus4  E',
      'l1: All the leaves are brown        and the sky is gray',
      '',
      '## Verse 2'
    ].join('\n');

    expect(actual).toEqual(expected);
  });
});

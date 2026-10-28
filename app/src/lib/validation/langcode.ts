import * as v from 'valibot';

// source: https://stackoverflow.com/a/60899733
export const fullBCP47RegExp = new RegExp(
  '^(' +
    '(' + // grandfathered
    /* irregular */ '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)' +
    '|' +
    /* regular */ '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)' +
    ')' +
    '|' + // langtag
    '(' +
    '(' +
    //language
    ('([A-Za-z]{2,3}(-' +
      //extlang
      '([A-Za-z]{3}(-[A-Za-z]{3}){0,2})' +
      ')?)|[A-Za-z]{4}|[A-Za-z]{5,8})') +
    '(-' +
    '([A-Za-z]{4})' +
    ')?' + //script
    '(-' +
    '([A-Za-z]{2}|[0-9]{3})' +
    ')?' + //region
    '(-' +
    '([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})' +
    ')*' + //variant
    //extension
    '(-' +
    '(' +
    /* singleton */ ('[0-9A-WY-Za-wy-z]' + '(-[A-Za-z0-9]{2,8})+)') +
    ')*' +
    '(-' +
    '(x(-[A-Za-z0-9]{1,8})+)' +
    ')?' + //private use
    ')' +
    '|' +
    '(x(-[A-Za-z0-9]{1,8})+)' +
    ')$'
);

export const artBCP47RegExp = /^art-x(-[A-Za-z0-9]{1,8})+$/;

export const BCP47Schema = v.pipe(v.string(), v.regex(fullBCP47RegExp), v.brand('BCP47'));
export type BCP47Code = v.InferOutput<typeof BCP47Schema>;

export const artLangCodeSchema = v.pipe(v.string(), v.regex(artBCP47RegExp), v.brand('ArtLang'));
export type ArtLangCode = v.InferOutput<typeof artLangCodeSchema>;

export function autoCorrectLanguageCode(value: string) {
  // auto-correct language code
  if (!value.startsWith('art-x-') && !value.match(/^a?r?t?-?x?$/)) {
    value = 'art-x-' + value;
  }
  value = value.replace(/--+/g, '-');
  value = value.replace(/[^A-Za-z0-9-]/g, '');
  return value
    .split('-')
    .flatMap((p) => {
      if (p.length > 8) {
        const ret: string[] = [];
        for (let i = 0; i < Math.ceil(p.length / 8); i++) {
          ret.push(p.substring(i * 8, (i + 1) * 8));
        }
        return ret;
      } else {
        return p;
      }
    })
    .join('-');
}

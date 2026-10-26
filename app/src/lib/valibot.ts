import * as v from 'valibot';

// 36 chars (32 digits)
const uuidv7RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const base64URLRegExp = /^[A-Za-z0-9\-_]{22}$/;

// source: https://stackoverflow.com/a/78178053
// source: https://www.slingacademy.com/article/javascript-convert-string-to-hex-and-vice-versa/
export function base64Url2UUIDv7(b64: string) {
  const base64Encoded = b64.replace(/-/g, '+').replace(/_/g, '/');
  const padding = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const base64WithPadding = base64Encoded + padding;
  const str = atob(base64WithPadding)
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0)))
    .join('');
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const hexValue = charCode.toString(16);

    // Pad with zeros to ensure two-digit representation
    hex += hexValue.padStart(2, '0');
  }
  return hex.replace(
    /^([0-9a-f]{8})([0-9a-f]{4})(7[0-9a-f]{3})([89ab][0-9a-f]{3})([0-9a-f]{12})$/,
    '$1-$2-$3-$4-$5'
  );
}

export function UUIDv72Base64Url(uuid: string) {
  const hex = uuid.replace(/-/g, '');
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexValue = hex.substr(i, 2);
    const decimalValue = parseInt(hexValue, 16);
    str += String.fromCharCode(decimalValue);
  }
  const b64 = btoa(str);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const uuidSchema = v.pipe(
  v.union([
    v.pipe(v.string(), v.regex(uuidv7RegExp)),
    v.pipe(v.string(), v.regex(base64URLRegExp), v.transform(base64Url2UUIDv7))
  ]),
  v.brand('UUID')
);
export type UUID = v.InferOutput<typeof uuidSchema>;

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

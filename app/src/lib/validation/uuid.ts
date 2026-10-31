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

export const uuidOrb64Schema = v.pipe(
  v.union([
    v.pipe(v.string(), v.regex(uuidv7RegExp)),
    v.pipe(v.string(), v.regex(base64URLRegExp), v.transform(base64Url2UUIDv7))
  ])
);

export const uuidSchema = v.pipe(v.string(), v.regex(uuidv7RegExp), v.maxLength(36));

import * as v from 'valibot';

export const langCodeRegExp = /^art-x(-[A-Za-z0-9]{1,8})+$/;

export const langCodeSchema = v.pipe(v.string(), v.regex(langCodeRegExp));

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

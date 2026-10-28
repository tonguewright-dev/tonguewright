export const Icons = {
  Ancestor: 'carbon:parent-child',
  CreateLanguage: 'fluent:globe-add-20-regular',
  Discord: 'lineicons:discord',
  GitHub: 'lineicons:github',
  Name: 'bx:label',
  LangCode: 'material-symbols-light:language',
  Save: 'material-symbols:save-outline'
} as const;

export type IconType = (typeof Icons)[keyof typeof Icons] | '';

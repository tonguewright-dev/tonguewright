export const Icons = {
  Ancestor: 'carbon:parent-child',
  CreateLanguage: 'fluent:globe-add-20-regular',
  Discord: 'lineicons:discord',
  Edit: 'mdi:pencil-outline',
  EditStop: 'mdi:pencil-off-outline',
  GitHub: 'lineicons:github',
  Name: 'bx:label',
  LangCode: 'material-symbols-light:language',
  Save: 'material-symbols:save-outline',
  ViewGrid: 'clarity:grid-view-line',
  ViewList: 'clarity:view-list-line'
} as const;

export type IconType = (typeof Icons)[keyof typeof Icons] | '';

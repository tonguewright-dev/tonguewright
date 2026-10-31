export const Icons = {
  Ancestor: 'carbon:parent-child',
  BackupRestore: 'mdi:file-arrow-up-down-outline',
  Cancel: 'icon-park-outline:return',
  Cloud: 'akar-icons:cloud',
  CreateLanguage: 'fluent:globe-add-20-regular',
  Discord: 'lineicons:discord',
  Edit: 'mdi:pencil-outline',
  EditStop: 'mdi:pencil-off-outline',
  GitHub: 'lineicons:github',
  Grammar: 'mdi:graph',
  Home: 'ant-design:home-outlined',
  LangCode: 'material-symbols-light:language',
  Lexicon: 'fluent-mdl2:dictionary',
  Name: 'bx:label',
  Phonology: 'andrsrxn:alphabet',
  Save: 'material-symbols:save-outline',
  SideClose: 'flowbite:close-sidebar-alt-outline',
  SideOpen: 'flowbite:open-sidebar-alt-outline',
  Texts: 'andrsrxn:file-text',
  ViewGrid: 'clarity:grid-view-line',
  ViewList: 'clarity:view-list-line'
} as const;

export type IconType = (typeof Icons)[keyof typeof Icons] | '';

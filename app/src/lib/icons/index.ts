export const Icons = {
  Discord: 'lineicons:discord',
  GitHub: 'lineicons:github'
} as const;

export type IconType = (typeof Icons)[keyof typeof Icons];

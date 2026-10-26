import type { RxDatabase } from 'rxdb';
import type { Languages } from './language';

export type Collections = {
  languages: Languages;
};

export type DB = RxDatabase<Collections>;

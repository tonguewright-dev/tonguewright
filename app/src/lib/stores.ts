import { derived, type Readable } from 'svelte/store';
import { db } from './db';
import type { Language } from './db/model/language';

export const languages = derived(
  db.languages.find().$ as unknown as Readable<Language[] | undefined>,
  (languages) => languages ?? []
);

import { derived, type Readable } from 'svelte/store';
import { db } from './db';
import type { Language } from './db/model/language';

export const languages = derived(
  db.languages.find().$ as unknown as Readable<Language[] | undefined>,
  (languages) => new Map<string, Language>(languages?.map((l) => [l.id, l]))
);

export const langTree = derived(languages, ($languages) => {
  const map = new Map<string, { direct: Set<string>; all: Set<string> }>(
    $languages.keys().map((l) => [l, { direct: new Set(), all: new Set() }])
  );
  function traverse(descendant: string, parent: string) {
    map.get(parent)?.all.add(descendant);
    const hyper = $languages.get(parent)?.ancestorId;
    if (hyper) {
      traverse(descendant, hyper);
    }
  }
  $languages.values().forEach((l) => {
    if (l.ancestorId) {
      map.get(l.ancestorId)?.direct.add(l.id);
      traverse(l.id, l.ancestorId);
    }
  });
  return map;
});

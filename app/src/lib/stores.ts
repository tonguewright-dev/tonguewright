import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { db } from './db';
import type { Language } from './db/model/language';
import { browser } from '$app/env';
import * as v from 'valibot';

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

/**
 * A Svelte store that persists its value in localStorage.
 *
 * @param key The localStorage key
 * @param initial Initial value to use if nothing is stored
 */
export function persistedLocal<T, S extends v.BaseSchema<unknown, T, v.BaseIssue<unknown>>>(
  key: string,
  schema: S
): Writable<v.InferOutput<S> | v.InferDefaults<S>> {
  // Start with initial value
  const start = writable<v.InferOutput<S> | v.InferDefaults<S>>(v.getDefaults(schema));

  if (browser) {
    // If there’s already something stored, load it
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      const parsed = v.safeParse(v.pipe(v.string(), v.parseJson(), schema), stored);
      if (parsed.success) {
        start.set(parsed.output);
      }
    }

    // Keep localStorage in sync
    start.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return start;
}

export const preferences = persistedLocal(
  'preferences',
  v.object({
    languageView: v.optional(v.picklist(['list', 'grid']), 'list')
  })
);

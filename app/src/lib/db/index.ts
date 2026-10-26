import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb/plugins/core';
import type { Collections, DB } from './model';
import { type Language, languageDBSchema, type Languages } from './model/language';
import { uuidv7 } from 'uuidv7';

/**
 * create database and collections
 */
export const db: DB = await createRxDatabase<Collections>({
  name: 'tonguewright-db',
  storage: getRxStorageDexie()
});

await db.addCollections({
  languages: {
    schema: languageDBSchema
  }
});

db.languages.preInsert(function addGeneratedFields(data) {
  data.id ||= uuidv7();
  const ts = new Date().toISOString();
  data.created = ts;
  data.updated = ts;
}, true);

db.languages.postInsert(function logInsert(this: Languages, _methods: unknown, lang: Language) {
  console.log(`insert to ${this.name}: ${lang.name}`);
}, false);

db.languages.preSave(function addGeneratedFields(data) {
  data.updated = new Date().toISOString();
}, true);

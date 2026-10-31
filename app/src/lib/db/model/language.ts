import { langCodeSchema } from '#lib/validation/langcode.ts';
import { uuidSchema } from '#lib/validation/uuid.ts';
import { type RxCollection, type RxJsonSchema } from 'rxdb';
import * as v from 'valibot';
import { toJsonSchema } from '@valibot/to-json-schema';

export const languageFormSchema = v.object({
  id: uuidSchema,
  name: v.pipe(v.string(), v.minLength(1)),
  code: v.optional(langCodeSchema),
  description: v.optional(v.pipe(v.string(), v.maxLength(5000))),
  ancestorId: v.optional(uuidSchema),
  created: v.optional(v.pipe(v.string(), v.isoTimestamp(), v.maxLength(30))),
  updated: v.optional(v.pipe(v.string(), v.isoTimestamp(), v.maxLength(30))),
  preset: v.optional(v.boolean())
});

const languageSchemaLiteral = {
  ...toJsonSchema(languageFormSchema),
  title: 'language schema',
  description: 'describes a language',
  version: 0,
  primaryKey: 'id'
} as const;

export type Language = v.InferOutput<typeof languageFormSchema>;

export type Languages = RxCollection<Language, unknown, unknown>;

export const languageDBSchema = languageSchemaLiteral as RxJsonSchema<Language>;

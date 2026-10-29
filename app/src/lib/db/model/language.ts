import { artLangCodeSchema } from '#lib/validation/langcode.ts';
import { uuidSchema } from '#lib/validation/uuid.ts';
import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  type RxJsonSchema,
  toTypedRxJsonSchema
} from 'rxdb';
import * as v from 'valibot';

const languageSchemaLiteral = {
  title: 'language schema',
  description: 'describes a language',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 36 // UUIDv7 is 36 chars
    },
    name: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    ancestorId: {
      type: 'string',
      maxLength: 36,
      ref: 'languages'
    },
    created: {
      type: 'string',
      format: 'date-time',
      maxLength: 30
    },
    updated: {
      type: 'string',
      format: 'date-time',
      maxLength: 30
    },
    preset: {
      type: 'boolean',
      default: false
    }
  },
  required: ['id', 'name']
} as const satisfies RxJsonSchema<never>;

const _schemaTyped = toTypedRxJsonSchema(languageSchemaLiteral);

export type Language = ExtractDocumentTypeFromTypedRxJsonSchema<typeof _schemaTyped>;

export type Languages = RxCollection<Language, unknown, unknown>;

export const languageDBSchema: RxJsonSchema<Language> = languageSchemaLiteral;

export const languageFormSchema = v.object({
  id: v.optional(uuidSchema),
  name: v.pipe(v.string(), v.minLength(1)),
  code: v.optional(artLangCodeSchema),
  description: v.optional(v.pipe(v.string(), v.maxLength(5000))),
  ancestorId: v.optional(uuidSchema)
});

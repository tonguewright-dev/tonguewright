import { BCP47Schema } from '#lib/validation/langcode.ts';
import { uuidSchema } from '#lib/validation/uuid.ts';
import { defineParams } from '@sveltejs/kit/params';
import { safeParse } from 'valibot';

export const params = defineParams({
  uuid(value: string) {
    if (safeParse(uuidSchema, value).success) {
      return value;
    }
  },
  code(value: string) {
    if (safeParse(uuidSchema, value).success || safeParse(BCP47Schema, value).success) {
      return value;
    }
  }
});

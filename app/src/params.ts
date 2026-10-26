import { BCP47Schema, uuidSchema } from '#lib/valibot.ts';
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

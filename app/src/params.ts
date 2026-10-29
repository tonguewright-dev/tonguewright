import { uuidSchema } from '#lib/validation/uuid.ts';
import { defineParams } from '@sveltejs/kit/params';
import { safeParse } from 'valibot';

export const params = defineParams({
  uuid(value: string) {
    const parsed = safeParse(uuidSchema, value);
    if (parsed.success) {
      return parsed.output as string;
    }
  }
});

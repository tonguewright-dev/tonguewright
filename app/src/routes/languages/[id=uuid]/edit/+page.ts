import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageLoad } from './$types';
import { languageFormSchema } from '#lib/db/model/language.js';
import { db } from '#lib/db/index.ts';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const language = (
    await db.languages
      .find({
        selector: { id: params.id }
      })
      .exec()
  )[0]?._data;
  if (!language) {
    throw error(404);
  }

  return { form: await superValidate(language, valibot(languageFormSchema)) };
};

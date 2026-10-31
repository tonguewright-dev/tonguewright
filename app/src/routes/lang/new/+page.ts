import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageLoad } from './$types';
import { languageFormSchema } from '#lib/db/model/language.js';

export const load: PageLoad = async () => {
  return { form: await superValidate(valibot(languageFormSchema)) };
};

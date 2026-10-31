import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
  ENV_SUFFIX: {
    public: true,
    static: true,
    description: 'Suffix to go after version string in display',
    schema: v.optional(v.picklist(['dev', 'alpha', 'beta', 'release']))
  }
});

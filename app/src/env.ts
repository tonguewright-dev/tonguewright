import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  ENV_SUFFIX: {
    public: true,
    static: true,
    description: 'Suffix to go after version string in display'
  }
});

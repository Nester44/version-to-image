import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv';
import z from 'zod';

config();

export const env = createEnv({
  server: {
    PORT: z.string().transform(Number).default('8080'),
    APPLICATION_SHORT_NAMES: z
      .string()
      .min(1)
      .refine((s) => s.split(',').every((code) => code.length === 4), {
        message:
          'APPLICATION_SHORT_NAMES must be a comma-separated list of 4-letter codes',
      })
      .transform((s) => s.split(',')),
    BITBUCKET_REPOS_URL: z.string().url().min(1),
    BITBUCKET_API_TOKEN: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

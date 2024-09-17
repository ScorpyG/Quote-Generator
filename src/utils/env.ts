// https://creatures.sh/blog/env-type-safety-and-validation/

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]).default('development'),
  JWT_SECRET: z.string({
    message: 'JWT_SECRET is required.',
    required_error: 'JWT_SECRET is required.',
  }), // ! Zod v3.23.8 does not support JWT verification, wait till v4
  MONGODB_URI: z
    .string({
      description: 'MongoDB connection string.',
      required_error: 'MONGODB_URI connection is required.',
    })
    .url(),
  MONGODB_USER: z.string({
    description: 'MongoDB username.',
    required_error: 'MONGODB username is required.',
  }),
  MONGODB_PW: z.string({
    description: 'MongoDB password.',
    required_error: 'MONGODB password is required.',
  }),
  MONGODB_NAME: z
    .string({
      description: 'MongoDB database name.',
    })
    .default('quoteGen'),
  UPLOADTHING_SECRET: z.string({
    description: 'UPLOADTHING  for uploading files.',
    required_error: 'UPLOADTHING secret key is required.',
  }),
  UPLOADTHING_APP_ID: z.string({
    description: 'UPLOADTHING app ID.',
    required_error: 'UPLOADTHING app ID is required.',
  }),
});

const env = envSchema.parse(process.env);

export default env;

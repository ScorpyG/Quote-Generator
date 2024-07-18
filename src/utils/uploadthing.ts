import type { CustomFileRouter } from '@/server/uploadthing';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing } = generateReactHelpers<CustomFileRouter>();

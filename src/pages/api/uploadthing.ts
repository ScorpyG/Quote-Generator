import { uploadRouter } from '@/server/uploadthing';
import { createRouteHandler } from 'uploadthing/next-legacy';

const handler = createRouteHandler({
  router: uploadRouter,
});

export default handler;

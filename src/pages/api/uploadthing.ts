import { customFileRouter } from '@/server/uploadthing';
import { createRouteHandler } from 'uploadthing/next-legacy';

const handler = createRouteHandler({
  router: customFileRouter,
});

export default handler;

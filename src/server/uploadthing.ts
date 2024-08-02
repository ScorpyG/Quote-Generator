import { AuthUser } from '@/types/auth';
import jwt from 'jsonwebtoken';
import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';
import { UploadThingError } from 'uploadthing/server';
import { updateProfilePic } from './mongodb';

const f = createUploadthing();

// Set permissions and file types for this FileRoute
export const customFileRouter = {
  profileImage: f({
    image: {
      maxFileSize: '4MB',
      minFileCount: 1,
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UploadThingError('Unauthorized');
      }

      try {
        const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
        return {
          userId: user.id,
        };
      } catch (error) {
        throw new UploadThingError('Error unable to retrieve user');
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const fileUrl = file.url;

      const updatedUser = await updateProfilePic(metadata.userId, fileUrl);

      if (!updatedUser) {
        return {
          message: 'Error updating user profile picture',
          success: false,
        };
      } else {
        return {
          message: 'Image uploaded successfully',
          success: true,
          uploadedBy: metadata,
        };
      }
    }),

  blogImage: f({
    image: {
      maxFileSize: '4MB',
      minFileCount: 1,
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UploadThingError('Unauthorized');
      }

      try {
        const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
        return {
          userId: user.id,
        };
      } catch (error) {
        throw new UploadThingError('Error unable to retrieve user');
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const fileUrl = file.url;

      // TODO: implement the endpoint
      return {
        message: 'Image uploaded successfully',
        success: true,
        uploadedBy: metadata,
        fileUrl,
      };
    }),
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;

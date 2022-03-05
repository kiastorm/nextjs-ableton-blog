import {
  mediaHandlerConfig,
  createMediaHandler,
} from "next-tinacms-cloudinary/dist/handlers";

import { isAuthorized } from "@tinacms/auth";

export const config = mediaHandlerConfig;

export default createMediaHandler({
  // @ts-ignore
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  // @ts-ignore
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  // @ts-ignore
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // @ts-ignore
  authorized: async (req, _res) => {
    try {
      if (process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT) {
        return true;
      }

      const user = await isAuthorized(req);

      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

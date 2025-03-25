import config from "../utils/config.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});


export const advertImageUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "digital-deals-hub/advert-image",
      // format: async (req, file) => "png", // supports promises as well
      public_id: (req, file) => file.originalname,
    },
  }),
});

import { Router } from "express";
import {
  addAdvert,
  deleteVendorAdvert,
  getAdvertById,
  getAllAdverts,
  getVendorAdvertById,
  getVendorAdverts,
  updateAdvertImage,
  updateVendorAdvert,
} from "../controllers/adverts.js";
import { isAuthorized, isAuthuenticated } from "../middlewares/auth.js";
import { advertImageUpload } from "../middlewares/upload.js";

const advertRouter = Router();

advertRouter.get(
  "/adverts",
  isAuthuenticated,
  isAuthorized(["user", "superadmin"]),
  getAllAdverts
);

advertRouter.get(
  "/adverts/vendor",
  isAuthuenticated,
  isAuthorized(["vendor", "superadmin"]),
  getVendorAdverts
);

advertRouter.get(
  '/adverts/vendor/:id',
  isAuthuenticated,
  isAuthorized(['vendor', 'superadmin']),
  getVendorAdvertById
);

advertRouter.get(
  '/adverts/:id',
  isAuthuenticated,
  isAuthorized(['user', 'superadmin']),
  getAdvertById
);

advertRouter.post(
  "/adverts",
  isAuthuenticated,
  isAuthorized(["vendor", "superadmin"]),
  advertImageUpload.single("image"),
  addAdvert
);

advertRouter.put(
  '/adverts/vendor/:id',
  isAuthuenticated,
  isAuthorized(['vendor', 'superadmin']),
  updateVendorAdvert
);

advertRouter.patch(
  "/adverts/vendor/:id",
  isAuthuenticated,
  isAuthorized(["vendor", "superadmin"]),
  advertImageUpload.single("image"),
  updateAdvertImage
);

advertRouter.delete(
  "/adverts/vendor/:id",
  isAuthuenticated,
  isAuthorized(["vendor", "superadmin"]),
  deleteVendorAdvert
);

export default advertRouter;

import { Router } from "express";
import { addStore, getStores, getStoresById } from "../controllers/storeController.js";
import { generateResponsive } from "../controllers/responsiveController.js";
import { addPermissionStore, removePermission } from "../controllers/permissionStoreController.js";

const router = Router();

router.get("/", getStores);
router.get('/:id', getStoresById);
router.post("/responsive", generateResponsive);
router.post("/permission", addPermissionStore);
router.post("/permission/:id", removePermission);
router.post("/", addStore);

export default router;
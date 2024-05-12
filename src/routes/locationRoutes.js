import { Router } from "express";
import { addLocation, getLocations } from "../controllers/locationController.js";
import { addPermission, removePermissionLocation } from "../controllers/permissionLocationController.js";
const router = Router();

router.get("/", getLocations);
router.post("/", addLocation);
router.delete("/permission", removePermissionLocation);
router.post("/permission", addPermission);

export default router;
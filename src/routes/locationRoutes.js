import { Router } from "express";
import { addLocation, getLocations } from "../controllers/locationController.js";

const router = Router();

router.get("/", getLocations);
router.post("/", addLocation);

export default router;
import { Router } from "express";
import { getStatesPendingByUser, resetState, updateState } from "../controllers/stateMovementController.js";

const router = Router();

router.patch('/', updateState);
router.patch('/reset', resetState);
router.get("/pending", getStatesPendingByUser);

export default router;
import { Router, request, response } from "express";
import { getUsers, addUser, getUsersByPermissionLocation } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/permission/locations/:id", getUsersByPermissionLocation);
router.post("/", addUser);


export default router;
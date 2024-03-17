import { Router, request, response } from "express";
import { getCountries, addCountry } from "../controllers/countriesController.js";

const router = Router();

router.get("/", getCountries);

router.post("/", addCountry);

export default router;
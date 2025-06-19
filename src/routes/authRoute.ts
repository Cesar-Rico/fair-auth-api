import { Router } from "express";
import { createUser, generateToken, listUsers, loginUser, validateToken } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
router.get("/token", generateToken);
router.get("/validateToken", validateToken);
export default router;
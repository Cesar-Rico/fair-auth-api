import { Router } from "express";
import { createUser, generateToken, listUsers, loginUser } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
router.get("/token", generateToken);
export default router;
import { Router } from "express";
import { createUser, listUsers, loginUser } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
export default router;
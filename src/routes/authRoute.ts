import { Router } from "express";
import { createUser, listUsers, loginUser } from "../controllers/authController";

const router = Router();

router.post('/', createUser);
router.get("/login", loginUser)
router.get("/listAll", listUsers)
export default router;
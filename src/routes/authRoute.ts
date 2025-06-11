import { Router } from "express";
import { createUser, loginUser, listUsers } from "../controllers/authController";

const router = Router();

router.post('/', createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
export default router;
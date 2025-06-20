import { Router } from "express";
import { createUser, generateHasher, generateToken, listUsers, loginUser, validateToken, verifyUsernameAvailability } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
router.get("/token", generateToken);
router.get("/validateToken", validateToken);
router.get("/hash", generateHasher);
router.get("/verifyUser", verifyUsernameAvailability);
export default router;
import { Router } from "express";
import { createUser, generateHasher, generateToken, listUsers, loginUser, validateToken, verifyUsernameAvailability, validatePasswordController } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
router.get("/token", generateToken);
router.get("/validateToken", validateToken);
router.get("/hash", generateHasher);
router.get("/verifyUser", verifyUsernameAvailability);
router.get("/validatePassword", validatePasswordController);
export default router;
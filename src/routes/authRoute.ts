import { Router } from "express";
import { createUser, generateHasher, generateToken, listUsers, loginUser, validateToken, verifyUsernameAvailability, validatePasswordController, statusTokenController } from "../controllers/authController";
import { validateUserInput } from "../middleware/validateUserInput";
import { seedUsers } from "../services/seedUserService";
import { isDevModeEnabled } from "../config/config";

const router = Router();

router.post('/', validateUserInput, createUser);
router.post("/login", loginUser)
router.get("/listAll", listUsers)
router.get("/token", generateToken);
router.get("/validateToken", validateToken);
router.get("/hash", generateHasher);
router.get("/verifyUser", verifyUsernameAvailability);
router.get("/validatePassword", validatePasswordController);
router.get("/statusToken", statusTokenController);
/* if (process.env.NODE_ENV !== 'production' && isDevModeEnabled()) {
  router.post('/seed', async (req, res) => {
    await seedUsers(req.body.count); // O usar req.body si quieres personalizar
    res.status(200).json({ message: 'Usuarios de prueba creados' });
  });
} */

export default router;
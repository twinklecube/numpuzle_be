import {Router} from "express";
import {initGame} from "../controllers/initController";
import {steps} from "../controllers/assitModeController";

const router = Router();

router.get("/init-game", initGame);
router.get("/next-steps", steps);

export default router;
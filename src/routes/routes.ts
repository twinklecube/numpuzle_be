import {Router} from "express";
import {initGame} from "../controllers/initController";

const router = Router();

router.get("/init-game", initGame)

export default router;
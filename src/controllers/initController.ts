import {Request, Response, NextFunction} from "express";

const initGame = ((req: Request, res: Response, next: NextFunction) => {
    res.send("game initialized")
});

export {initGame};
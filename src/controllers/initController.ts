import {Request, Response, NextFunction} from "express";

const initGame = ((req: Request, res: Response, next: NextFunction) => {
    const size = 3;
    const numTiles = size * size;
    const targetArr = createTargetArr(numTiles);
    const initialArr = createInitArray(numTiles);
    res.send(initialArr)
});

const createInitArray = (num:number) => {
    const arr = Array.from(Array(num).keys());
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }

    return arr;
}

const createTargetArr = (num: number): Array<number> => {
    const targetArr = []
    for (let i = 0; i < num; i++) {
        if(i < num-1) {
            targetArr.push(i+1);
        } else {
            targetArr.push(0);
        }
    }
    return targetArr;
}

export {initGame};
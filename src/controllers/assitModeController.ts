import {NextFunction, Request, Response} from "express";

let finalArr: Array<number>;
let initArray: Array<number>;
let boardLength: number;
let iteration = 1;
let curArrs: Array<Array<number>> = [];
const evaluatedArrs: Array<Array<number>> = [];
let costArr: Array<{cost: number, potentialArr: Array<number>}> = [];
const steps = ((req: Request, res: Response, next: NextFunction) => {

    finalArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    initArray = [1,2,3,4,5,6,7,8,9,0,11,12,13,10,14,15];
    curArrs.push(initArray);
    evaluatedArrs.push(initArray);
    boardLength = 4;
    const boardVerticalLeftIndexes: Array<number> = [];
    const boardVerticalRightIndexes: Array<number> = [];
    for(let i = 1; i < boardLength; i++) {
        boardVerticalLeftIndexes.push(i * boardLength);
        boardVerticalRightIndexes.push((i * boardLength)-1);
    }

    while (JSON.stringify(finalArr) !== JSON.stringify(initArray)) {
        costArr = [];
        curArrs.forEach(curArr => {
            const zeroIndex = curArr.indexOf(0);
            switch (true) {
                case zeroIndex === 0:
                    swapZero(curArr, zeroIndex, 1);
                    swapZero(curArr, zeroIndex, boardLength);
                    break;
                case zeroIndex === boardLength-1:
                    swapZero(curArr, zeroIndex, boardLength-2);
                    swapZero(curArr, zeroIndex, (boardLength*2)-1);
                    break;
                case zeroIndex === (boardLength*boardLength)-1:
                    swapZero(curArr, zeroIndex, (boardLength*boardLength)-2);
                    swapZero(curArr, zeroIndex, (boardLength*(boardLength-1))-1);
                    break;
                case zeroIndex === boardLength * (boardLength-1):
                    swapZero(curArr, zeroIndex, (boardLength * (boardLength-1))+1);
                    swapZero(curArr, zeroIndex, (boardLength*(boardLength-2)));
                    break;
                case zeroIndex > 0 && zeroIndex < boardLength-1:
                    swapZero(curArr, zeroIndex, zeroIndex-1);
                    swapZero(curArr, zeroIndex, zeroIndex+1);
                    swapZero(curArr, zeroIndex, zeroIndex+boardLength);
                    break;
                case zeroIndex > boardLength*(boardLength-1) && zeroIndex < (boardLength * boardLength)-1:
                    swapZero(curArr, zeroIndex, zeroIndex-1);
                    swapZero(curArr, zeroIndex, zeroIndex+1);
                    swapZero(curArr, zeroIndex, zeroIndex-boardLength);
                    break;
                case boardVerticalLeftIndexes.includes(zeroIndex):
                    swapZero(curArr, zeroIndex, zeroIndex+1);
                    swapZero(curArr, zeroIndex, zeroIndex-boardLength);
                    swapZero(curArr, zeroIndex, zeroIndex+boardLength);
                    break;
                case boardVerticalRightIndexes.includes(zeroIndex):
                    swapZero(curArr, zeroIndex, zeroIndex-1);
                    swapZero(curArr, zeroIndex, zeroIndex-boardLength);
                    swapZero(curArr, zeroIndex, zeroIndex+boardLength);
                    break;
                default:
                    swapZero(curArr, zeroIndex, zeroIndex+1);
                    swapZero(curArr, zeroIndex, zeroIndex-1);
                    swapZero(curArr, zeroIndex, zeroIndex-boardLength);
                    swapZero(curArr, zeroIndex, zeroIndex+boardLength);
                    break;
            }
        });

        const minCost = Math.min(...costArr.map(arr => arr.cost));
        const minCostArrs = costArr.filter(arr => arr.cost === minCost);

        curArrs = [];
        minCostArrs.forEach(minCostArr => {
            curArrs.push(minCostArr.potentialArr);
        })

        curArrs.forEach(curArr => {
            if (JSON.stringify(curArr) === JSON.stringify(finalArr)) {
                initArray = [...curArr];
                console.log(iteration, "SOLVED", initArray)
            }
        })

        if (iteration === 100) initArray = [1,2,3,4,5,6,7,8,0]
        iteration++;
    }

    res.send(`solved, ${iteration-1} moves, ${initArray}`)
});

const swapZero = (
    curArr: Array<number>,
    zeroIndex: number,
    swapIndex: number
) => {
    const tempArr = [...curArr];
    tempArr[zeroIndex] = curArr[swapIndex];
    tempArr[swapIndex] = 0;

    let isEvaluated: boolean = false;
    evaluatedArrs.forEach(evaluatedArr => {
        if (JSON.stringify(evaluatedArr) === JSON.stringify(tempArr)) {
            isEvaluated = true;
        }
    });

    if (!isEvaluated) {
        evaluatedArrs.push(tempArr);
        let noOfMismatches: number = 0;

        for (let i = 0; i < finalArr.length; i++) {
            if (tempArr[i] !== 0 && tempArr[i] !== finalArr[i]) {
                noOfMismatches++;
            }
        }

        const cost = iteration + noOfMismatches;

        costArr.push({cost: cost, potentialArr: tempArr});
    }
}

export {steps};

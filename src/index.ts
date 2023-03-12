import express, {Express, Request, Response, ErrorRequestHandler, NextFunction} from 'express';
import dotenv from "dotenv";
import router from "./routes/routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(router);


app.use((req: Request, res: Response, next: NextFunction) => {
   next({
       status: 404,
       message: 'Not Found'
   });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).send('Page Not Found');
    } else {
        res.status(500).send('Internal Server Error');
    }
}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});

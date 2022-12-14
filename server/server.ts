import express, { Express, Request, Response, NextFunction } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const app: Express = express();
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT


// use express to parse json objects sent from client
app.use(express.json());
// parse cookies
app.use(cookieParser());


// require in authRouter
const authRouter = require('./routes/authRouter')

// use the authRouter for specified endpoint
app.use('/', authRouter)


app.get('/', (req: Request, res: Response) => {
  // serve file
  res.send('Express + TypeScript Server');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  type ErrorObj = {
    log: string,
    status: number,
    message: {err: string}
  }
  const defaultErr: ErrorObj = {
    log: "Express error handler caught unknown middleware error",  
    status: 500,
    message: {err: "Global error handler invoked"},
  }
  const error = Object.assign({}, defaultErr, err);
  console.log(`${error.log}: ${error.message.err}`);
  return res.status(error.status).json(error.message);
})

// check to see if our server is listening on given port
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
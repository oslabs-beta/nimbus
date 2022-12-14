// import express from express and extract out built-in Express, Request and NexFunction types from express
import express, { Express, Request, Response, NextFunction } from 'express';
// require in dotenv to store sensitive data that need to be stored and accessed securely 
const dotenv = require('dotenv');
// load any environment variables from a .env file 
dotenv.config();
// create an instance of an express application (allow us to set up routes, middleware etc.)
const app = express();
// assign server to port declared in secure file
const { PORT } = process.env

// use express to parse json objects sent from client
app.use(express.json());
// require our authRouter
const authRouter = require('./routes/authRouter')

// handle any request sent to / endpoint 
app.use('/', authRouter)

app.get('/', (req: Request, res: Response) => {
  // serve file
  res.send('Express + TypeScript Server');
});

// Handle all remaining endpoints that are not captured in the server/routers.
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json('Not Found');
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
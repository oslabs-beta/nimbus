import express, { Express, Request, Response, NextFunction } from 'express';
import { ErrorObj } from './types';
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const path = require("path");
dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../build')));


app.get('/', function(req, res) {
  return res.sendFile(path.resolve(__dirname, '../build/index.html'));
});


app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);

// Handle all remaining endpoints that are not defined in the server/routers
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json('Not Found');
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ErrorObj = {
    log: "Express error handler caught unknown middleware error",  
    status: 500,
    message: {err: "Global error handler invoked"},
  }
  const error = Object.assign({}, defaultErr, err);
  console.log(`${error.log}: ${error.message.err}`);
  return res.status(error.status).json(error.message);
})

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

module.exports = app;
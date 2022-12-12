import express, { Express, Request, Response } from 'express';
// const dotenv = require('dotenv');

// dotenv.config();

const app: Express = express();
const port = 3000//process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
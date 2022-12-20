"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
dotenv.config();
const app = (0, express_1.default)();
const { PORT } = process.env;
app.use(express_1.default.json());
const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');
app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);
// Handle all remaining endpoints that are not defined in the server/routers
app.use('*', (req, res) => {
    return res.status(404).json('Not Found');
});
// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: "Express error handler caught unknown middleware error",
        status: 500,
        message: { err: "Global error handler invoked" },
    };
    const error = Object.assign({}, defaultErr, err);
    console.log(`${error.log}: ${error.message.err}`);
    return res.status(error.status).json(error.message);
});
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

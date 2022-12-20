"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const logsController = {
    //req: Request, res: Response, next: NextFunction
    getAllLogs() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cwLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                region: 'us-east-1',
                credentials: {
                    accessKeyId: 'ASIAYSDN4ZO5KOVCVOPP',
                    secretAccessKey: '87f6ZOSmP7xGTxSj3sUuFqR5vOSk9yE2nEx0rlPL',
                    sessionToken: 'IQoJb3JpZ2luX2VjEBsaCXVzLWVhc3QtMSJIMEYCIQCCFd0arRUhVjhD+sTGP9vsge8RS+0dja3tFF1HdP4DPAIhAIr0bHHsLhOav3WYIKFHMxZMXjVA7QFAwCKmcjEqn4G9KpoCCFQQABoMNTg4NjQwOTk2MjgyIgyQa193a2eYzXl14m0q9wGgwrLT5pZ9xl0qRuDI3+s/sRS/eeIZ2B0WwbtoXrLV9qUXfdkNWJoL16n564DR3WBtu2805W513+SDOZJZbCo+/U7j4XMim9dwAf4S0Rsw+CkjFO1bviXFsvoMFetBOexLhKcWdQKUt7+VR6BhMzR3yL+jOOG2N+Ok5zEZjKZ3W8Qc2lX0brpofdVcdyx0CZm6edlXdv9EQvmQUoa2zE3sOc2ndsR8UEG1CStgu/IPUyLGF1ny+pwKR4W7510oxgUpsKlUm8iNo3T3Q2uiHPzC2pnySanZ0Wol49mcA47raJ1nK31Aez9QQAArw+KcAArREMjpM29GMMCk/5wGOpwBtGj6t2aWqy4ll2Nv8skrhcubo32QPg1JlrpUoFjZ2yLpH+ffCdGRVOsT98Dw78543EgGc2s/ORaF1Z4PbGnjoR7u0+ZgVzexBZ9cudXBj/RBfcKSmOwUc/504Mp0oszECju9FqNQy7uPIiyqLLJNGGtPHjv4lKhIZNV9xHfOmWTevtdXTVbM/bBrCK9jqcmGEfvHTBeE9U0uY1Cy',
                } //req.locals.credentials,
            });
            const functionName = 'myNewFunc2'; //req.body.functionName
            const streamsCommandInputs = {
                logGroupName: "/aws/lambda/" + functionName,
            };
            const getStreamsCommand = new client_cloudwatch_logs_1.DescribeLogStreamsCommand(streamsCommandInputs);
            const getStreamsCommandResults = yield cwLogsClient.send(getStreamsCommand);
            console.log(getStreamsCommandResults);
            const streams = getStreamsCommandResults.logStreams;
            const logEvents = [];
            if (streams !== undefined) {
                for (const stream of streams) {
                    const logsCommandInputs = {
                        logGroupName: "/aws/lambda/" + functionName,
                        logStreamName: stream.logStreamName
                        //startTime
                        //endTime
                    };
                    const getLogsCommand = new client_cloudwatch_logs_1.GetLogEventsCommand(logsCommandInputs);
                    const getLogsCommandResults = yield cwLogsClient.send(getLogsCommand);
                    (_a = getLogsCommandResults.events) === null || _a === void 0 ? void 0 : _a.forEach(e => logEvents.push(e));
                }
            }
            console.log(logEvents);
        });
    },
    //req: Request, res: Response, next: NextFunction
    getFilteredLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            // let StartTime;
            // if (req.body.timePeriod === '30min') {
            //   StartTime = new Date(
            //     new Date().setMinutes(new Date().getMinutes() - 30)
            //   ).valueOf();
            // } else if (req.body.timePeriod === '1hr') {
            //   StartTime = new Date(
            //     new Date().setMinutes(new Date().getMinutes() - 60)
            //   ).valueOf();
            // } else if (req.body.timePeriod === '24hr') {
            //   StartTime = new Date(
            //     new Date().setDate(new Date().getDate() - 1)
            //   ).valueOf();
            // } else if (req.body.timePeriod === '7d') {
            //   StartTime = new Date(
            //     new Date().setDate(new Date().getDate() - 7)
            //   ).valueOf();
            // } else if (req.body.timePeriod === '14d') {
            //   StartTime = new Date(
            //     new Date().setDate(new Date().getDate() - 14)
            //   ).valueOf();
            // } else if (req.body.timePeriod === '30d') {
            //   StartTime = new Date(
            //     new Date().setDate(new Date().getDate() - 30)
            //   ).valueOf();
            // }
            const filterPattern = '1.26 ms'; //req.body.filterPattern
            const cwLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                region: 'us-east-1',
                credentials: {
                    accessKeyId: 'ASIAYSDN4ZO5K6WCUXXX',
                    secretAccessKey: 'kqD2uRFJM7y+MgxnYif8c9mbOzqpA5jutFpZwPwH',
                    sessionToken: 'IQoJb3JpZ2luX2VjEBwaCXVzLWVhc3QtMSJGMEQCIHVNNcKZuU3ZPh1utP6aEjjMk4IDXRTKX5J9SRiAm/BQAiB0mQRfahiFYuKrk7RvaMYf+RexEi5/cw6qCoDiMN9BPCqaAghUEAAaDDU4ODY0MDk5NjI4MiIMhm7pKqUMjeHAmgYdKvcBq/RgEV354bd21YEXeOcxDSEIv6C0iWVnJbhCKXx+h7Bl4a6wDh7EA3KhGl03kUXZbsNWPZ7P2lP4EMGbj0HDZYrlXxqWcA7Ymt31ISVZ3gcelW6uW2cabeIQNcqmxzKK7yrWIjS8TZ4PdgRPTqjFaK0aOH3is1jkSFGm+XA2KcYBcxPMpEbv/n8gQULqkIXZX0Ny8V5Ei5Ga5qW42OLA6W+8ryj5uNqSpFuOWMiPNco9pahz/HtQuDwgF4+O8VEsSweXHfkR00AG4tdyyuv77UH40/H+VAsKgNFAQpot+EaDxicI7cx+1m/brGUiZd5F862kr01RFDDbrf+cBjqeAdNBMvM+Xi36prVeVFIkpPBBQNwxMj2N3cMtnSPqqncpFWbrLmzpun9H9KnbG1ssqwsE/8sa7z1PY+vTNmwtU9zPePw9p0a2qoMOboykdd4uGGMNfCt5j8f2lPhkYy8bOWWyqvCXJrJt/SfDxfriVfx5lSlQ7hbpHeUiF7vU6rXlAE8HsXR+JpJICa1tE+7aN/Xh39JMGviIxNYlL3qd',
                } //req.locals.credentials,
            });
            const functionName = 'myNewFunc2'; //req.locals.functionName
            const filterCommandInputs = {
                logGroupName: "/aws/lambda/" + functionName,
                startTime: new Date(new Date().setDate(new Date().getDate() - 7)).valueOf(),
                endTime: new Date().valueOf(),
                filterPattern: filterPattern
            };
            const filterLogsCommand = new client_cloudwatch_logs_1.FilterLogEventsCommand(filterCommandInputs);
            const filterLogsCommandResults = yield cwLogsClient.send(filterLogsCommand);
            console.log(filterLogsCommandResults.events);
        });
    }
};
logsController.getFilteredLogs();
// Change to export default syntaix
exports.default = logsController;

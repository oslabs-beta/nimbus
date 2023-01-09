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
    getAllLogs(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Start a new CloudWatchLogsClient connection with provided region and credentials
                const cwLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                    region: res.locals.region,
                    credentials: res.locals.credentials,
                });
                const functionName = req.body.functionName;
                // Create inputs for DescribeLogStreamsCommand
                const streamsCommandInputs = {
                    logGroupName: "/aws/lambda/" + functionName,
                };
                const getStreamsCommand = new client_cloudwatch_logs_1.DescribeLogStreamsCommand(streamsCommandInputs);
                const getStreamsCommandResults = yield cwLogsClient.send(getStreamsCommand);
                const streams = getStreamsCommandResults.logStreams;
                const logEvents = [];
                if (streams !== undefined) {
                    // Get logs for each stream
                    for (const stream of streams) {
                        const logsCommandInputs = {
                            logGroupName: "/aws/lambda/" + functionName,
                            logStreamName: stream.logStreamName
                        };
                        const getLogsCommand = new client_cloudwatch_logs_1.GetLogEventsCommand(logsCommandInputs);
                        const getLogsCommandResults = yield cwLogsClient.send(getLogsCommand);
                        (_a = getLogsCommandResults.events) === null || _a === void 0 ? void 0 : _a.forEach(e => logEvents.push(e));
                    }
                }
                res.locals.logs = logEvents.map(e => e.message);
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in logsController.getAllLogs middleware function",
                    status: 500,
                    message: { errMessage: `Error getting logs for this function`, errors: err }
                });
            }
        });
    },
    // Get filtered logs for a given func and store in res.locals.filteredLogs
    getFilteredLogs(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // StartTime and EndTime for CloudWatchLogsClient need to be in millisecond
            try {
                let StartTime;
                if (req.body.period === '1hr') {
                    StartTime = new Date(new Date().setMinutes(new Date().getMinutes() - 60)).valueOf();
                }
                else if (req.body.period === '1d') {
                    StartTime = new Date(new Date().setDate(new Date().getDate() - 1)).valueOf();
                }
                else if (req.body.period === '7d' || req.body.period === '') {
                    StartTime = new Date(new Date().setDate(new Date().getDate() - 7)).valueOf();
                }
                else if (req.body.period === '14d') {
                    StartTime = new Date(new Date().setDate(new Date().getDate() - 14)).valueOf();
                }
                else if (req.body.period === '30d') {
                    StartTime = new Date(new Date().setDate(new Date().getDate() - 30)).valueOf();
                }
                const filterPattern = req.body.filterPattern;
                // Start a new CloudWatchLogsClient connection with provided region and credentials
                const cwLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                    region: res.locals.region,
                    credentials: res.locals.credentials, //credentials
                });
                const functionName = req.body.functionName;
                // Create input for FilterLogEventsCommand
                const filterCommandInputs = {
                    logGroupName: "/aws/lambda/" + functionName,
                    startTime: StartTime,
                    endTime: new Date().valueOf(),
                    filterPattern: filterPattern
                };
                // Get filtered logs and store in res.locals.filteredLogs
                const filterLogsCommand = new client_cloudwatch_logs_1.FilterLogEventsCommand(filterCommandInputs);
                const filterLogsCommandResults = yield cwLogsClient.send(filterLogsCommand);
                res.locals.filteredLogs = (_a = filterLogsCommandResults.events) === null || _a === void 0 ? void 0 : _a.map(e => e.message);
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in logsController.getFilteredLogs middleware function",
                    status: 500,
                    message: { errMessage: `Error getting filtered logs for this function`, err: err }
                });
            }
        });
    }
};
exports.default = logsController;

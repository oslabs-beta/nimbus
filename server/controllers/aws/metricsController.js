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
const client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
require('dotenv').config();
// Grab the Invocation, Error, Duration, and Throttle metrics for all functions
const metricsController = {
    getAllMetrics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new client_cloudwatch_1.CloudWatchClient({
                    region: res.locals.region,
                    credentials: res.locals.credentials
                });
                const metricInvocationData = {
                    Id: "i1",
                    MetricStat: {
                        Metric: {
                            MetricName: "Invocations",
                            Namespace: "AWS/Lambda",
                        },
                        Period: 60,
                        Stat: "Sum",
                    },
                    Label: "Total Invocations of Lambda Functions"
                };
                const metricErrorData = {
                    Id: "e1",
                    MetricStat: {
                        Metric: {
                            MetricName: "Errors",
                            Namespace: "AWS/Lambda"
                        },
                        Period: 60,
                        Stat: "Sum",
                    },
                    Label: "Total Errors of Lambda Functions"
                };
                const metricThrottlesData = {
                    Id: "t1",
                    MetricStat: {
                        Metric: {
                            MetricName: "Throttles",
                            Namespace: "AWS/Lambda"
                        },
                        Period: 60,
                        Stat: "Sum",
                    },
                    Label: "Total Throttles of Lambda Functions"
                };
                const metricDurationData = {
                    Id: "d1",
                    MetricStat: {
                        Metric: {
                            MetricName: "Duration",
                            Namespace: "AWS/Lambda"
                        },
                        Period: 60,
                        Stat: "Sum",
                    },
                    Label: "Total Duration of Lambda Functions"
                };
                const input = {
                    // Update StartTime and EndTime to be more dynamic from user
                    "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
                    "EndTime": new Date(),
                    "MetricDataQueries": [metricInvocationData, metricErrorData, metricThrottlesData, metricDurationData],
                };
                const command = new client_cloudwatch_1.GetMetricDataCommand(input);
                const response = yield client.send(command);
                // Create a metrics object to store the values and timestamps of each metric
                if (response.MetricDataResults) {
                    const metrics = {
                        invocations: {
                            values: response.MetricDataResults[0].Values,
                            timestamp: response.MetricDataResults[0].Timestamps
                        },
                        errors: {
                            values: response.MetricDataResults[1].Values,
                            timestamp: response.MetricDataResults[1].Timestamps
                        },
                        throttles: {
                            values: response.MetricDataResults[2].Values,
                            timestamp: response.MetricDataResults[2].Timestamps
                        },
                        duration: {
                            values: response.MetricDataResults[3].Values,
                            timestamp: response.MetricDataResults[3].Timestamps
                        }
                    };
                    res.locals.metrics = metrics;
                }
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in metricsController.getAllMetrics middleware function",
                    status: 500,
                    message: { err: "Error grabbing metrics for all Lambda Functions" }
                });
            }
        });
    },
    // Grab specific metrics from cloudwatch depending on user input (seleted func)
    getMetricsByFunc(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Initiate client with credentials
                const client = new client_cloudwatch_1.CloudWatchClient({
                    region: res.locals.region,
                    credentials: res.locals.credentials
                });
                const metricData = [];
                // functions from lamda controller 
                res.locals.functions.forEach((functionName, i) => {
                    // get metrics for specific function
                    const metricInvocationData = {
                        Id: `i${i}`,
                        MetricStat: {
                            Metric: {
                                MetricName: "Invocations",
                                Namespace: "AWS/Lambda",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: `${functionName}`
                                    },
                                ],
                            },
                            Period: 60,
                            Stat: "Sum",
                        },
                        Label: `${functionName} Total invocations of Lambda Function`
                    };
                    metricData.push(metricInvocationData);
                    // get error data for specific function
                    const metricErrorData = {
                        Id: `e${i}`,
                        MetricStat: {
                            Metric: {
                                MetricName: "Errors",
                                Namespace: "AWS/Lambda",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: `${functionName}`
                                    },
                                ],
                            },
                            Period: 60,
                            Stat: "Sum",
                        },
                        Label: `${functionName} Total errors of Lambda Function`
                    };
                    metricData.push(metricErrorData);
                    const metricThrottlesData = {
                        Id: `t${i}`,
                        MetricStat: {
                            Metric: {
                                MetricName: "Throttles",
                                Namespace: "AWS/Lambda",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: `${functionName}`
                                    },
                                ],
                            },
                            Period: 60,
                            Stat: "Sum",
                        },
                        Label: `${functionName} Total throttles of Lambda Function`
                    };
                    metricData.push(metricThrottlesData);
                    const metricDurationData = {
                        Id: `d${i}`,
                        MetricStat: {
                            Metric: {
                                MetricName: "Duration",
                                Namespace: "AWS/Lambda",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: `${functionName}`
                                    },
                                ],
                            },
                            Period: 60,
                            Stat: "Sum",
                        },
                        Label: `${functionName} Total duration of Lambda Function`
                    };
                    metricData.push(metricDurationData);
                });
                // input to get metric data command 
                const input = {
                    // Update StartTime and EndTime to be more dynamic from user
                    "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
                    "EndTime": new Date(),
                    "MetricDataQueries": metricData
                };
                const command = new client_cloudwatch_1.GetMetricDataCommand(input);
                const testInput = {
                    Id: 'd213421',
                    MetricStat: {
                        Metric: {
                            MetricName: "Duration",
                            Namespace: "AWS/Lambda",
                            Dimensions: [
                                {
                                    Name: 'FunctionName',
                                    Value: `hello-world-python`
                                },
                            ],
                        },
                        Period: 60,
                        Stat: "Sum",
                    },
                    Label: `hello-world-python Total duration of Lambda Function`
                };
                const response = yield client.send(command);
                // Create a metrics object to store the values and timestamps of specific metric
                if (response.MetricDataResults) {
                    console.log(response.MetricDataResults, "METRIC DATA RESULTS");
                    const parseData = (arr) => {
                        // declare an output object
                        const allFuncMetrics = {};
                        // loop over elements in arr in chunks of 4
                        for (let i = 0; i < arr.length; i += 4) {
                            // get function name
                            const funcName = arr[i].Label.split(' ')[0];
                            // declare func object
                            const metricsByFunc = {};
                            // populate allMetricsObj
                            // loop over number of metrics
                            for (let j = 0; j < 4; j++) {
                                const metricName = arr[i + j].Label.split(' ')[2];
                                // declare func object
                                const singleMetric = {
                                    values: arr[i + j].Values,
                                    timestamp: arr[i + j].Timestamps
                                };
                                // add metric name and stats to obj
                                metricsByFunc[metricName] = singleMetric;
                            }
                            // add func name and metrics to obj
                            allFuncMetrics[funcName] = metricsByFunc;
                        }
                        return allFuncMetrics;
                    };
                    // metrics data for the functions page
                    res.locals.metrics = parseData(response.MetricDataResults);
                }
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in metricsController.getMetricsByFunc middleware function",
                    status: 500,
                    message: { err: "Error grabbing metrics for Lambda Function" }
                });
            }
        });
    }
};
// Change to export default syntaix
exports.default = metricsController;

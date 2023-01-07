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
// Controller for getting metrics for all APIs
const apiMetricsController = {
    // Gets metrics for each API in res.locals.apiList (from apiController.getAPIList)
    getAPIMetrics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new CloudWatch client with provided credentials and region
        const cwClient = new client_cloudwatch_1.CloudWatchClient({
            region: res.locals.region,
            credentials: res.locals.credentials,
        });
        // Declare output object
        const allApiMetrics = {};
        const metrics = ['Latency', 'Count', '5XXError', '4XXError'];
        // For each API in res.locals.apiList, get metrics and store in allApiMetrics
        for (let apiObj of res.locals.apiList) {
            const { apiName } = apiObj;
            // Declare obj to store all the metrics of the current API
            const currApiMetrics = {};
            for (let metric of metrics) {
                // Obtain input for GetMetricDataCommand using helper function: getCommandInput
                const metricParams = getCommandInput(apiName, metric);
                try {
                    // Obtain the data for curr API and curr metric
                    const currMetricData = yield cwClient.send(new client_cloudwatch_1.GetMetricDataCommand(metricParams));
                    // Declare an object to store the timestamps and values
                    const timeValObj = {};
                    const results = currMetricData === null || currMetricData === void 0 ? void 0 : currMetricData.MetricDataResults;
                    if (results) {
                        timeValObj.timestamps = results[0].Timestamps;
                        timeValObj.values = results[0].Values;
                    }
                    currApiMetrics[metric] = timeValObj;
                }
                // If error, invoke next middleware function
                catch (err) {
                    next({
                        log: "Error caught in apiMetricsController.getAPIMetrics middleware function",
                        status: 500,
                        message: { errMessage: `Error getting all API metrics`, err: err }
                    });
                }
            }
            allApiMetrics[apiName] = currApiMetrics;
        }
        res.locals.allApiMetrics = allApiMetrics;
        return next();
    })
};
// Helper function to obtain input for GetMetricDataCommand
const getCommandInput = (apiName, metricName, stat = 'Sum') => {
    if (metricName === 'Count') {
        stat = 'SampleCount';
    }
    const metricParamsBaseAllFunc = {
        StartTime: new Date(new Date().setDate(new Date().getDate() - 7)),
        EndTime: new Date(),
        LabelOptions: {
            Timezone: '-0400',
        },
    };
    const metricDataQueryAllfunc = [
        {
            Id: `m_API_Gateway_${metricName}`,
            Label: `${apiName} API ${metricName}`,
            MetricStat: {
                Metric: {
                    Namespace: 'AWS/ApiGateway',
                    MetricName: metricName,
                    Dimensions: [{ Name: 'ApiName', Value: apiName }],
                },
                Period: 300,
                Stat: stat,
            },
        },
    ];
    const metricParamsAllfunc = Object.assign(Object.assign({}, metricParamsBaseAllFunc), { MetricDataQueries: metricDataQueryAllfunc });
    return metricParamsAllfunc;
};
exports.default = apiMetricsController;

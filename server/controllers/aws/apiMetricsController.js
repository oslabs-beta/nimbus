"use strict";
// GOAL: get the metrics for each API and store in object
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
// "apiList": [
//   {
//       "apiName": "nimbusTest2",
//       "apiId": "37cyh4ft82",
//       "paths": [
//           "/"
//       ]
//   }]
// 1. iterate over the API List  (array of objects, and access APIName)
// 2. for each apiName we want to push it to an array 
// make instance of CloudWatch client passing in config
// make instance of GetMetricDataCommand passing in input which is 
const client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
require('dotenv').config();
const apiMetricsController = {
    getAPIMetrics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('getAPIMetrics INVOKED');
        // start a new CloudWatch client with provided credentials and region
        const cwClient = new client_cloudwatch_1.CloudWatchClient({
            region: res.locals.region,
            credentials: res.locals.credentials,
        });
        const allApiMetrics = {};
        const metrics = ['Latency', 'Count', '5XXError', '4XXError'];
        for (let apiObj of res.locals.apiList) {
            const { apiName } = apiObj;
            //const getCurrApiMetrics = async () => {
            const currApiMetrics = {};
            for (let metric of metrics) {
                const metricParams = getCommandInput(apiName, metric);
                try {
                    const currMetricData = yield cwClient.send(new client_cloudwatch_1.GetMetricDataCommand(metricParams));
                    const timeValObj = {};
                    const results = currMetricData === null || currMetricData === void 0 ? void 0 : currMetricData.MetricDataResults;
                    if (results) {
                        timeValObj.timestamps = results[0].Timestamps;
                        timeValObj.values = results[0].Values;
                    }
                    currApiMetrics[metric] = timeValObj;
                }
                catch (err) {
                    console.log(err);
                }
            }
            // return currApiMetrics;
            //}
            // allApiMetrics[apiName] = await getCurrApiMetrics();
            allApiMetrics[apiName] = currApiMetrics;
        }
        console.log("allApiMetrics", allApiMetrics);
        // res.locals.allApiMetrics = allApiMetrics
        return next();
    })
};
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
                Period: 60,
                Stat: stat,
            },
        },
    ];
    const metricParamsAllfunc = Object.assign(Object.assign({}, metricParamsBaseAllFunc), { MetricDataQueries: metricDataQueryAllfunc });
    return metricParamsAllfunc;
};
exports.default = apiMetricsController;

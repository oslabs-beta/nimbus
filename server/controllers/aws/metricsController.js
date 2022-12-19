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
// NOTE: LOOK TO SEE IF THE GETMETRIC HAS AN INPUT TYPE IN THE LIBRARY
// GetMetricStatistics only retrieves data for a single metric
// GetMetricData allows you to retrieve data for multiple metrics at the same time
// GetMetricData is more flexible and powerful than GetMetricStatistics as it allows you to retrieve data for multiple metrics at the same time, but more complex to use, as it requires you to specify more information in the request
const metricsController = {
    getAllMetrics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("metricsController.getMetricsAll was invoked");
            // Intiate client with credentials
            const client = new client_cloudwatch_1.CloudWatchClient({
                // Grab region and credentials of client
                region: 'us-east-2',
                // Credentials we use to authenticate the service call. If not specified, the SDK will look for the credentials through env, shared credential files, and EC2 instance profile
                credentials: {
                    accessKeyId: 'ASIAY7AHXQVCMU3GAPX3',
                    secretAccessKey: 'k6RjhrgHg7KuRowqW0kjiubxjE3Ssx9Vyn8CuqTf',
                    sessionToken: 'IQoJb3JpZ2luX2VjECoaCXVzLWVhc3QtMSJIMEYCIQCag/uPU/EIO746bI6bWw3t1gWOgBhZa8yNJYIldXbJmQIhAL66ZHsZDrN905QU3x2QYxRLtAvzz15C3HZa/0KoFh1EKpoCCGIQABoMNjE2MzQ0MDI4NDg0IgwsEF1SaxdzC8JwjY4q9wGjoyEGe9rDuiR7TbnvYrCSwM5ilkt09jTLUceFrxC2S8RunPDX1IE0+tKrR7/lndFDWTixoDnBFKiHd8H+/wq1q2UrQJgP3zTVkPeQT9MW06jwL5Z8y06jgv8sSb5w5dSrcPlBA5iyZAyQJaCfoejSw1dBx/AFDde1hfx5W5XL5OObXfFXejsDeWhsPpfy5DXmvuor/713tW7sS7t63ir9a6pwOoFytkyxVXidVKIbOcj2qU1rjRWGo1wpEDh2ZFghhuusnAkJHGmwyC74j/dlYgo3nsWJyAJfs58EKeI952Oyu/t4eJ1jKj3A7nmK/vbwaD9xgewNMLe2gp0GOpwBiNeH1yq/uCLB6EeZcH+M9jnLlQzgsFSQrudgRgN74Lv3NaZ4FEVhS7GG7GLcsxtNSeh73jJ7C2Y5p+KuaTmvSRuKRnx0sp6+nRndB8bbWxrPbXOTo6hX6Rba2rLy+53IUrE7285aAYrhKHP0jgGYxqBpNX6iDyHGksLSB2IdpSFyBgKEAFCY2XQDp6ir1MzBX1fcHaHbDX7ohguz'
                } // req.body.credentials
                // sessionToken
                // maxRetries: (Max number of retries that the client should attempt when retrying a service call)
            });
            console.log(client, "CLIENT FROM NEW CLOUTWATCH");
            // Input for getMetricStatisticsCommand
            const input = {
                // Dimensions: An object that is a category of the specific characteristics of each metric
                // Allows you to filter the results that CloudWatch returns
                // "Dimensions": [
                //   {
                //     "Name": "FunctionName",
                //     "Value": req.body.functionName
                //   },
                //   {
                //     "Name": "Resource",
                //     "Value": req.body.functionName
                //   }
                // ],
                // StartTime: First data point to return 
                "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
                // new Date(convertToUnix(req.body.startTime)), // Test this out
                // EndTime: Last data point to return 
                "EndTime": new Date(),
                // ExtendedStatistics: Percentile statistics that takes in a value between p0.0 and p100. Either use ExtendedStatistics or Statistics
                // Statistics: Metric statistics. Either use ExtendedStatistics of Statistics. Probably going to just use Statistics.
                "Statistics": ['Average'],
                // MetricName: The name of the metric you're trying to pull look below for different metrics
                // Invocations, Duration, Errors, Throttles, DeadLetterErrors, IteratorAge, ConcurrentExecutions, UnreservedConcurrentExecutions
                "MetricName": "Invocations",
                // Namespace: A container for CloudWatch metrics to isolate metrics from each other so they're not aggregated into the same statistics
                // We have to create our own namespace for each datapoint we publish on CloudWatch 
                // Ex: AWS/service (AWS/EC2) convention
                "Namespace": "AWS/Lambda",
                // Period: Granularity, in seconds, of the returned data points. If the StartTime is: 
                // between 3 hours and 15 days ago - Use a multiple of 60 seconds (1 minute).
                // between 15 and 63 days ago - Use a multiple of 300 seconds (5 minutes).
                // greater than 63 days ago - Use a multiple of 3600 seconds (1 hour).
                "Period": 3600 * 24,
                // Unit: Specify the unit for a given metric. If you omit, CW sends the unit for that specific data. So we can probably leave this out
            };
            const command = new client_cloudwatch_1.GetMetricStatisticsCommand(input);
            const response = yield client.send(command);
            console.log(response, "response");
        });
    },
    getMetricsByFunc(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("metricsController.getMetricsAll was invoked");
            // Intiate client with credentials
            const client = new client_cloudwatch_1.CloudWatchClient({
                // Grab region and credentials of client
                region: 'us-east-2',
                // Credentials we use to authenticate the service call. If not specified, the SDK will look for the credentials through env, shared credential files, and EC2 instance profile
                credentials: {
                    accessKeyId: 'ASIAY7AHXQVCHGMPFDZ7',
                    secretAccessKey: 'itsQkGYvSo8Afc7PTEHoKaK0Xsfxlq2io/JPRa09',
                    sessionToken: 'IQoJb3JpZ2luX2VjECsaCXVzLWVhc3QtMSJIMEYCIQC0iuCBgdeeVc5qKNn4cxEsnpjgUVD5JJRegkWkwxTzfAIhAPPzmcU6e3/gKF2yaygqLv/0HCx6lVk+7lmwlm5cBrdIKpoCCGQQABoMNjE2MzQ0MDI4NDg0IgwcHubXse8Kz1k5X9Uq9wHVVCwv/xy5Q8QRccgAPvbOs1Phi/L5vwaUnGb4d2mz371P5qZw4zEseWIIIvsg3rCKpDw5Ue4RBPCH3P3/KzV9tqJMruuTdQwOGGZIu298+0us6wO7I1XWg5SlggO355Tb9+FusijtkaK04j7kJiGOYp/SplOkLUiAyoxmUB8DwtlArP34Y5VJ9ytr/2xWvFGqWgEmAAv+FTIs1YKv2VbwZezMdc5JNjXLwEQKJNQgdeAjjQbiFhPkvOH8ZSy6yTH5g5GtHrvvYFYK1lJsZpQ6kdKbVtI4hdoD4afE+LlOP0sdG7DarmlRL0DAR1csKQRSP4UdaDZuML/ggp0GOpwBin8qFyipuZHOMueSCtR37tInXUxkOh4UvXduvDBjRK8TdfgWSzH+wSSnegfJ9PqDYp/2rCQIwi22/1WaWpy9IH+wYYbOBFalBDCJIgk+IuJpnqxCu5sysYQhwi4/UDBtUf4m0fWI3vvo7VVT4U4nlZkQ/Api/ZmWKu6ICFlF3ZhDzUlEuw1WG3KoQckvt+yPHK71dmNAB38Ky48f'
                } // req.body.credentials
            });
            console.log(client);
            // Input for getMetricStatisticsCommand
            const metricDataQuery = {
                Id: "m1",
                MetricStat: {
                    Metric: {
                        MetricName: "CPUUtilization",
                        Namespace: "AWS/EC2"
                    },
                    Period: 3600 * 24,
                    Stat: "Average",
                },
                Label: "Total Invocations of Lambda Function"
            };
            const input = {
                "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
                "EndTime": new Date(),
                "MetricDataQueries": [metricDataQuery],
            };
            const command = new client_cloudwatch_1.GetMetricDataCommand(input);
            const response = yield client.send(command);
            console.log(response, "response");
        });
    }
};
// https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDataQuery.html
// Sample Request input for getMetricData 
// Metric names list for getMetric
// https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html
// async getMetricsByFunc(req: Request, res: Response, next: NextFunction) {
//   const input: GetMetricDataCommandInput {
//       "StartTime": new Date(convertToUnix(req.body.startTime)), // Test this out
//       "EndTime": new Date(convertToUnix(req.body.endTime)), // Test this out
// "MetricDataQueries": [
//   {
//     "Expression": "SELECT AVG(CPUUtilization) FROM SCHEMA(\"AWS/EC2\", InstanceId)",
//     https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-metrics-insights-querylanguage.html
//     Docs for expressions similar to SQL
//     "Id": "q1",
//     "Period": 300,
//     "Label": "Cluster CpuUtilization"
//   },
//   {
//     "Id": "m1",
//     "Label": "Unhealthy Behind Load Balancer",
//     "MetricStat": {
//       "Metric": {
//         "Namespace": "AWS/ApplicationELB",
//         "MetricName": "UnHealthyHostCount",
//         "Dimensions": [
//           {
//             "Name": "TargetGroup",
//             "Value": "targetgroup/EC2Co-Defau-EXAMPLEWNAD/89cc68152b367e5f"
//           },
//           {
//             "Name": "LoadBalancer",
//             "Value": "app/EC2Co-EcsEl-EXAMPLE69Q/fdd2210e799e4376"
//           }
//         ]
//       },
//       "Period": 300,
//       "Stat": "Average"
//     }
//   }
// ]
//   }
//   const command = new GetMetricDataCommand(input);
// }  
// Change to export default syntaix
exports.default = metricsController;

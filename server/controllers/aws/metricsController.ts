import { CloudWatchClient, GetMetricDataCommand, GetMetricDataCommandInput, MetricDataResult} from "@aws-sdk/client-cloudwatch";
import { Request, Response, NextFunction } from "express";
require('dotenv').config();

interface subMetrics {
  values: number[] | undefined
  timestamp: Date[] | undefined
}

interface Metrics {
  invocations: subMetrics,
  errors: subMetrics,
  throttles: subMetrics,
  duration: subMetrics
}

// Grab the Invocation, Error, Duration, and Throttle metrics
const metricsController = {
  async getAllMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const client = new CloudWatchClient({
        region: res.locals.region,
        credentials: res.locals.credentials
      })
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
      }
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
      }
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
      }
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
      }
      const input: GetMetricDataCommandInput = {
        // Update StartTime and EndTime to be more dynamic from user
        "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
        "EndTime": new Date(),
        "MetricDataQueries": [metricInvocationData, metricErrorData, metricThrottlesData, metricDurationData],
      }
      const command = new GetMetricDataCommand(input)
      const response = await client.send(command);
      // Create a metrics object to store the values and timestamps of each metric
      if (response.MetricDataResults) {
        const metrics: Metrics = {
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
    } catch (err) {
      return next({
        log: "Error caught in metricsController.getAllMetrics middleware function",
        status: 500,
        message: { err: "Error grabbing metrics for all Lambda Functions" }
      })
    } 
  },
  // Grab specific metrics from cloudwatch depending on user input 
  async getMetricsByFunc (req: Request, res: Response, next: NextFunction) {
    try {
      // Intiate client with credentials
      const client = new CloudWatchClient({
        region: res.locals.region,
        credentials: res.locals.credentials
      })
      const { id, metricName, stat, functionName } = req.body
      const metricData = {
        Id: `${id}`, 
        MetricStat: {
          Metric: {
            MetricName: `${metricName}`, // Invocation/Throttles/Errors/Duration
            Namespace: "AWS/Lambda"
          },
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: `${functionName}`
            },           
          ],
          Period: 60,
          Stat: `${stat}`, //Sum/Average/Minimum/Maximum
        },
        Label: `Total ${metricName} of Lambda Functions`
      }
      
      const input: GetMetricDataCommandInput = {
        // Update StartTime and EndTime to be more dynamic from user
        "StartTime": new Date(new Date().setDate(new Date().getDate() - 7)),
        "EndTime": new Date(),
        "MetricDataQueries": [metricData],
      }
      const command = new GetMetricDataCommand(input)
      const response = await client.send(command);
      // Create a metrics object to store the values and timestamps of specific metric
      if (response.MetricDataResults) {
        const metric: subMetrics = {
          values: response.MetricDataResults[0].Values,
          timestamp: response.MetricDataResults[0].Timestamps
        }
        res.locals.metric = metric;
      }
      return next();
    } catch (err) {
      return next({
        log: "Error caught in metricsController.getMetricsByFunc middleware function",
        status: 500,
        message: { err: "Error grabbing metrics for Lambda Function" }
      })
    }
  }
}
    
// Change to export default syntaix
export default metricsController;
    
    
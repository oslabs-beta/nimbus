import { CloudWatchClient, GetMetricDataCommand, GetMetricDataCommandInput} from "@aws-sdk/client-cloudwatch";
import { Request, Response, NextFunction } from "express";
require('dotenv').config();

// GetMetricStatistics only retrieves data for a single metric
// GetMetricData allows you to retrieve data for multiple metrics at the same time
// GetMetricData is more flexible and powerful than GetMetricStatistics as it allows you to retrieve data for multiple metrics at the same time, but more complex to use, as it requires you to specify more information in the request

const metricsController = {
  async getAllMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const client = new CloudWatchClient({
        // Grab region and credentials of client
        region: 'us-east-1', // req.body.region,
        credentials: {
          accessKeyId: 'ASIAY7AHXQVCOORQMEEU',
          secretAccessKey: '7NEDipGjrW9m3gsS9KdZ8wMEh2ZOmbfXvyHVnhFI',
          sessionToken: 'IQoJb3JpZ2luX2VjEC0aCXVzLWVhc3QtMSJGMEQCIDUkIDzJHnOQGKMPAuOxf0PNfyQm/RURFR+z+vl9M32DAiA79o2vUjFDBR28A59Gwl5YaE1PQuNHIzeT15dkrqh97CqaAghmEAAaDDYxNjM0NDAyODQ4NCIMTJPRNq2sFl+ckHc0KvcBEHWP7+VeIaoEYautMwl4mimY4fD9awpB60nWiuBTT4GHfbMtJRSpHXuKaazNtGNID8rsBTlkqGMRK6BmMhON+Par6GoOrWY8pWrMTy7FXWcGceBxbO1oIXtpkYk0ABx1Po08Y7ZgjVlSJN4A2RiDiLLnDs4xQywiyKySVNjfd6Fk5vNrFXvd6vZC73F4OPCgRLJgCAV5YPqOE7/wO7dcuAGvS+DACKYrhbVdSbHp5FnWiVipxG+rz3bvx6eqOdE/AdX8+1en0c7+PrQKItzSYFghsknwXRfP4PQ25nyIFtB+riFge4aeeYzvJmeZGBN0ac/vCFkCSjCxmoOdBjqeAVVCF22GHXekLgeTCf6I4HfUBGsoSIKRWUjyt65rt2x15/Vko3fd90IZh8zB1TeJyfStw0+pMqOccSiQGwE8ATU23DDSa8l/D6KZTKr1LNlWVHq/H5oKcVM1VkwvJw1BMTYFh0f3Bkp7rUDTy7dcaXvXQasufbq1dQuOkOvvHuiTf+ZzGA4ayZL85/qfNN/IE/hvfuMcSKJZYvL4upm/',
        } // req.body.credentials
      })
      // Input for getMetricDataCommand
      // Metrics: Errors, ConcurrentExecutions, Invocations, UnreservedConcurrentExecutions, Duration, Throttles, DeadLetterErrors, DestinationDeliveryFailures, IteratorAge, PostRunTimeExtensionsDuration, ProvisionedConcurrencyInvocations, ProvisionedConcurrencySpilloverInvocations, ProvsionedConcurrencyUtilization, ProvisionedConcurrentExecutions
      const metricInvocationData = {
        Id: "i1", // Change
        MetricStat: {
          Metric: {
            MetricName: "Invocations",
            Namespace: "AWS/Lambda",
          },
          Period: 60,
          Stat: "Sum", //Sum/Average/Minimum/Maximum
        },
        Label: "Total Invocations of Lambda Functions"
      }
      const metricErrorData = {
        Id: "e1", // Change
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
        Id: "t1", // Change
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
        Id: "d1", // Change
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
        "MetricDataQueries": [metricInvocationData, metricDurationData, metricThrottlesData, metricErrorData],
      }
      const command = new GetMetricDataCommand(input)
      const response = await client.send(command);
      res.locals.response = response.MetricDataResults;
      console.log(res.locals.response);
      return next();
    } catch (err) {
      return next({
        log: "Error caught in metricsController.getAllMetrics middleware function",
        status: 500,
        message: { err: "Error grabbing metrics for all Lambda Functions" }
      })
    } 
  },

  async getMetricsByFunc (req: Request, res: Response, next: NextFunction) {
    try {
      // Intiate client with credentials
      const client = new CloudWatchClient({
        region: 'us-east-1', // req.body.region,
        credentials: {
          accessKeyId: 'ASIAY7AHXQVCOORQMEEU',
          secretAccessKey: '7NEDipGjrW9m3gsS9KdZ8wMEh2ZOmbfXvyHVnhFI',
          sessionToken: 'IQoJb3JpZ2luX2VjEC0aCXVzLWVhc3QtMSJGMEQCIDUkIDzJHnOQGKMPAuOxf0PNfyQm/RURFR+z+vl9M32DAiA79o2vUjFDBR28A59Gwl5YaE1PQuNHIzeT15dkrqh97CqaAghmEAAaDDYxNjM0NDAyODQ4NCIMTJPRNq2sFl+ckHc0KvcBEHWP7+VeIaoEYautMwl4mimY4fD9awpB60nWiuBTT4GHfbMtJRSpHXuKaazNtGNID8rsBTlkqGMRK6BmMhON+Par6GoOrWY8pWrMTy7FXWcGceBxbO1oIXtpkYk0ABx1Po08Y7ZgjVlSJN4A2RiDiLLnDs4xQywiyKySVNjfd6Fk5vNrFXvd6vZC73F4OPCgRLJgCAV5YPqOE7/wO7dcuAGvS+DACKYrhbVdSbHp5FnWiVipxG+rz3bvx6eqOdE/AdX8+1en0c7+PrQKItzSYFghsknwXRfP4PQ25nyIFtB+riFge4aeeYzvJmeZGBN0ac/vCFkCSjCxmoOdBjqeAVVCF22GHXekLgeTCf6I4HfUBGsoSIKRWUjyt65rt2x15/Vko3fd90IZh8zB1TeJyfStw0+pMqOccSiQGwE8ATU23DDSa8l/D6KZTKr1LNlWVHq/H5oKcVM1VkwvJw1BMTYFh0f3Bkp7rUDTy7dcaXvXQasufbq1dQuOkOvvHuiTf+ZzGA4ayZL85/qfNN/IE/hvfuMcSKJZYvL4upm/',
        } // req.body.credentials
      })
      const { id, metricName, stat, functionName } = req.body
      const metricData = {
        Id: `${id}`,
        MetricStat: {
          Metric: {
            MetricName: `{$metricName}`, // Invocation/Throttles/Errors/Duration
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
      res.locals.response = response;
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
    
    
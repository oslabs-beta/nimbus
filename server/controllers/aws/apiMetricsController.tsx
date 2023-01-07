import { CloudWatchClient, 
         GetMetricDataCommand, 
         ListDashboardsCommand, 
         GetMetricDataCommandInput, 
         GetMetricDataCommandOutput,
         MetricDataQuery, 
         MetricDataResult
        } from "@aws-sdk/client-cloudwatch";


import { Request, Response, NextFunction } from "express";
require('dotenv').config();

// Controller for getting metrics for all APIs
const apiMetricsController = {
  // Gets metrics for each API in res.locals.apiList (from apiController.getAPIList)
  getAPIMetrics: async (req: Request, res: Response, next: NextFunction) => {
    
    // Create a new CloudWatch client with provided credentials and region
    const cwClient = new CloudWatchClient({
      region: res.locals.region,
      credentials: res.locals.credentials,
    });

    // Declare output object
    const allApiMetrics:any = {};

    const metrics = ['Latency', 'Count', '5XXError', '4XXError']

    // For each API in res.locals.apiList, get metrics and store in allApiMetrics
    for (let apiObj of res.locals.apiList) {
        const { apiName } = apiObj;
        // Declare obj to store all the metrics of the current API
        const currApiMetrics = {};
   
      
        for (let metric of metrics) {
          // Obtain input for GetMetricDataCommand using helper function: getCommandInput
          const metricParams: GetMetricDataCommandInput = getCommandInput(
            apiName,
            metric
          );

          try {
            // Obtain the data for curr API and curr metric
            const currMetricData: GetMetricDataCommandOutput = await cwClient.send(
              new GetMetricDataCommand(metricParams)
            );
            
            interface TimeValObj {
              timestamps?: any;
              values?: any;
            }

            // Declare an object to store the timestamps and values
            const timeValObj: TimeValObj = {}
            const results = currMetricData?.MetricDataResults;
            if (results) {
              timeValObj.timestamps = results[0].Timestamps;
              timeValObj.values = results[0].Values; 
            }
            (currApiMetrics as any)[metric] = timeValObj;
          }
          // If error, invoke next middleware function
          catch (err) {
            next({
              log: "Error caught in apiMetricsController.getAPIMetrics middleware function",
              status: 500,
              message: {errMessage: `Error getting all API metrics`, err: err}
          });
          }
        }
        allApiMetrics[apiName] = currApiMetrics;
    }
    
    res.locals.allApiMetrics = allApiMetrics
    return next();
  }
}

// Helper function to obtain input for GetMetricDataCommand
const getCommandInput = (apiName:string, metricName:string, stat='Sum') => {

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
        Period: 60 * 60 * 24,
        Stat: stat,
      },
    },
  ];

  const metricParamsAllfunc = {
    ...metricParamsBaseAllFunc,
    MetricDataQueries: metricDataQueryAllfunc,
  };

  return metricParamsAllfunc;

}


export default apiMetricsController;




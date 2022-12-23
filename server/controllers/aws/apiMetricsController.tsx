// GOAL: get the metrics for each API and store in object

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


const apiMetricsController = {

  getAPIMetrics: async (req: Request, res: Response, next: NextFunction) => {
    console.log('getAPIMetrics INVOKED')
    // start a new CloudWatch client with provided credentials and region
    const cwClient = new CloudWatchClient({
      region: res.locals.region,
      credentials: res.locals.credentials,
    });

    const allApiMetrics:any = {};

    const metrics = ['Latency', 'Count', '5XXError', '4XXError']

    for (let apiObj of res.locals.apiList) {
        const { apiName } = apiObj;
        const currApiMetrics = {};
   
        for (let metric of metrics) {
          const metricParams: GetMetricDataCommandInput = getCommandInput(
            apiName,
            metric
          );

          try {
            const currMetricData: GetMetricDataCommandOutput = await cwClient.send(
              new GetMetricDataCommand(metricParams)
            );
            
            interface TimeValObj {
              timestamps?: any;
              values?: any;
            }

            const timeValObj: TimeValObj = {}
            const results = currMetricData?.MetricDataResults;
            if (results) {
              timeValObj.timestamps = results[0].Timestamps;
              timeValObj.values = results[0].Values; 
            }
            (currApiMetrics as any)[metric] = timeValObj;
          }
          catch (err) {
            console.log(err)
          }
        }

        allApiMetrics[apiName] = currApiMetrics;
    }

    console.log("allApiMetrics", allApiMetrics);
    
    res.locals.allApiMetrics = allApiMetrics
    return next();
  }
}


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
        Period: 60,
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




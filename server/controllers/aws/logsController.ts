import { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand, OutputLogEvent, FilterLogEventsCommand, FilterLogEventsCommandInput, GetLogEventsCommandInput, DescribeLogStreamsCommandInput } from "@aws-sdk/client-cloudwatch-logs";
import { Request, Response, NextFunction } from "express";

const logsController = {
  //req: Request, res: Response, next: NextFunction
  async getAllLogs(req: Request, res: Response, next: NextFunction) {

    try {
      const cwLogsClient = new CloudWatchLogsClient({
        region: res.locals.region, //'us-east-1'
        credentials: res.locals.credentials, 
        /* {
          accessKeyId: 'ASIAYSDN4ZO5KOVCVOPP',
          secretAccessKey: '87f6ZOSmP7xGTxSj3sUuFqR5vOSk9yE2nEx0rlPL',
          sessionToken: 'IQoJb3JpZ2luX2VjEBsaCXVzLWVhc3QtMSJIMEYCIQCCFd0arRUhVjhD+sTGP9vsge8RS+0dja3tFF1HdP4DPAIhAIr0bHHsLhOav3WYIKFHMxZMXjVA7QFAwCKmcjEqn4G9KpoCCFQQABoMNTg4NjQwOTk2MjgyIgyQa193a2eYzXl14m0q9wGgwrLT5pZ9xl0qRuDI3+s/sRS/eeIZ2B0WwbtoXrLV9qUXfdkNWJoL16n564DR3WBtu2805W513+SDOZJZbCo+/U7j4XMim9dwAf4S0Rsw+CkjFO1bviXFsvoMFetBOexLhKcWdQKUt7+VR6BhMzR3yL+jOOG2N+Ok5zEZjKZ3W8Qc2lX0brpofdVcdyx0CZm6edlXdv9EQvmQUoa2zE3sOc2ndsR8UEG1CStgu/IPUyLGF1ny+pwKR4W7510oxgUpsKlUm8iNo3T3Q2uiHPzC2pnySanZ0Wol49mcA47raJ1nK31Aez9QQAArw+KcAArREMjpM29GMMCk/5wGOpwBtGj6t2aWqy4ll2Nv8skrhcubo32QPg1JlrpUoFjZ2yLpH+ffCdGRVOsT98Dw78543EgGc2s/ORaF1Z4PbGnjoR7u0+ZgVzexBZ9cudXBj/RBfcKSmOwUc/504Mp0oszECju9FqNQy7uPIiyqLLJNGGtPHjv4lKhIZNV9xHfOmWTevtdXTVbM/bBrCK9jqcmGEfvHTBeE9U0uY1Cy',
        } */
      });
  
      const functionName = req.body.functionName;
  
      const streamsCommandInputs: DescribeLogStreamsCommandInput = {
        logGroupName: "/aws/lambda/" + functionName,
      }
  
      const getStreamsCommand = new DescribeLogStreamsCommand(streamsCommandInputs);
  
      const getStreamsCommandResults = await cwLogsClient.send(getStreamsCommand);
  
      const streams = getStreamsCommandResults.logStreams;
  
      const logEvents: OutputLogEvent[] = [];
  
      if (streams !== undefined) {
        for (const stream of streams) {
          const logsCommandInputs: GetLogEventsCommandInput = {
            logGroupName: "/aws/lambda/" + functionName,
            logStreamName: stream.logStreamName
            //startTime
            //endTime
          }
    
          const getLogsCommand = new GetLogEventsCommand(logsCommandInputs);
    
          const getLogsCommandResults = await cwLogsClient.send(getLogsCommand);
    
          getLogsCommandResults.events?.forEach(e => logEvents.push(e));
        }
      }
  
      res.locals.logs = logEvents.map(e => e.message);
      return next();
    } catch (err) {
      return next({
        log: "Error caught in logsController.getAllLogs middleware function",
        status: 500,
        message: {errMessage: `Error getting logs for this function`, errors: err}
      })
    }
    
  },

  //req: Request, res: Response, next: NextFunction
  async getFilteredLogs(req: Request, res: Response, next: NextFunction) {

    try {
      let StartTime;
      if (req.body.period === '1hr') {
        StartTime = new Date(
          new Date().setMinutes(new Date().getMinutes() - 60)
        ).valueOf();
      } else if (req.body.period === '1d') {
        StartTime = new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).valueOf();
      } else if (req.body.period === '7d' || req.body.period === '' ) {
        StartTime = new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).valueOf();
      } else if (req.body.period === '14d') {
        StartTime = new Date(
          new Date().setDate(new Date().getDate() - 14)
        ).valueOf();
      } else if (req.body.period === '30d') {
        StartTime = new Date(
          new Date().setDate(new Date().getDate() - 30)
        ).valueOf();
      }

      const filterPattern: string = req.body.filterPattern;

      const cwLogsClient = new CloudWatchLogsClient({
        region: res.locals.region, //'us-east-1'
        credentials: res.locals.credentials, //credentials
      });

      const functionName = req.body.functionName

      const filterCommandInputs: FilterLogEventsCommandInput = {
        logGroupName: "/aws/lambda/" + functionName,
        startTime: StartTime,
        endTime: new Date().valueOf(),
        filterPattern: filterPattern
      }

      const filterLogsCommand = new FilterLogEventsCommand(filterCommandInputs);

      const filterLogsCommandResults = await cwLogsClient.send(filterLogsCommand);

      res.locals.filteredLogs = filterLogsCommandResults.events?.map(e => e.message);

      return next();
    } catch(err) {
      return next({
        log: "Error caught in logsController.getFilteredLogs middleware function",
        status: 500,
        message: {errMessage: `Error getting filtered logs for this function`, err: err}
      })
    }
  }
}

// Change to export default syntaix
export default logsController;
import { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand, OutputLogEvent, FilterLogEventsCommand, FilterLogEventsCommandInput, GetLogEventsCommandInput, DescribeLogStreamsCommandInput } from "@aws-sdk/client-cloudwatch-logs";
import { Request, Response, NextFunction } from "express";


const logsController = {
  async getAllLogs(req: Request, res: Response, next: NextFunction) {
    try {
      // Start a new CloudWatchLogsClient connection with provided region and credentials
      const cwLogsClient = new CloudWatchLogsClient({
        region: res.locals.region, //'us-east-1'
        credentials: res.locals.credentials, 
      });
  
      const functionName = req.body.functionName;
  
      // Create inputs for DescribeLogStreamsCommand
      const streamsCommandInputs: DescribeLogStreamsCommandInput = {
        logGroupName: "/aws/lambda/" + functionName,
      }
  
      const getStreamsCommand = new DescribeLogStreamsCommand(streamsCommandInputs);
      const getStreamsCommandResults = await cwLogsClient.send(getStreamsCommand);
      const streams = getStreamsCommandResults.logStreams;
      const logEvents: OutputLogEvent[] = [];
  
      if (streams !== undefined) {
        // Get logs for each stream
        for (const stream of streams) {
          const logsCommandInputs: GetLogEventsCommandInput = {
            logGroupName: "/aws/lambda/" + functionName,
            logStreamName: stream.logStreamName
          }
    
          const getLogsCommand = new GetLogEventsCommand(logsCommandInputs);
          const getLogsCommandResults = await cwLogsClient.send(getLogsCommand);
          getLogsCommandResults.events?.forEach(e => logEvents.push(e));
        }
      }
  
      res.locals.logs = logEvents.map(e => e.message);
      return next();
    } 
    catch (err) {
      return next({
        log: "Error caught in logsController.getAllLogs middleware function",
        status: 500,
        message: {errMessage: `Error getting logs for this function`, errors: err}
      })
    }
    
  },

  // Get filtered logs for a given func and store in res.locals.filteredLogs
  async getFilteredLogs(req: Request, res: Response, next: NextFunction) {

    // StartTime and EndTime for CloudWatchLogsClient need to be in millisecond
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

      // Start a new CloudWatchLogsClient connection with provided region and credentials
      const cwLogsClient = new CloudWatchLogsClient({
        region: res.locals.region, //'us-east-1'
        credentials: res.locals.credentials, //credentials
      });

      const functionName = req.body.functionName

      // Create input for FilterLogEventsCommand
      const filterCommandInputs: FilterLogEventsCommandInput = {
        logGroupName: "/aws/lambda/" + functionName,
        startTime: StartTime,
        endTime: new Date().valueOf(),
        filterPattern: filterPattern
      }

      // Get filtered logs and store in res.locals.filteredLogs
      const filterLogsCommand = new FilterLogEventsCommand(filterCommandInputs);
      const filterLogsCommandResults = await cwLogsClient.send(filterLogsCommand);
      res.locals.filteredLogs = filterLogsCommandResults.events?.map(e => e.message);
      return next();
    } 
    catch(err) {
      return next({
        log: "Error caught in logsController.getFilteredLogs middleware function",
        status: 500,
        message: {errMessage: `Error getting filtered logs for this function`, err: err}
      })
    }
  }
}

export default logsController;
import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";
import { Request, Response, NextFunction } from "express";

const logsController = {
  async getLogs(req: Request, res: Response, next: NextFunction) {
    const cwLogsClient = new CloudWatchLogsClient({
      region: req.body.region,
      credentials: req.body.credentials,
    });
  }
}

module.exports = logsController;
const { CloudWatchLogsClient } = require("@aws-sdk/client-cloudwatch-logs");

const getLogs = async (req, req, next) => {
    const cwLogsClient = new CloudWatchLogsClient({
        region: req.body.region,
        credentials: req.body.credentials,
      });
}
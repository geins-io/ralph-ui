export default function ({ app }) {
  // Filters out requests against certain file endings
  const requestFilterTelemetryProcessor = (envelope, context) => {
    const excludeFileEndings =
      app.$appInsights?.config.excludedFileEndings || [];

    if (
      envelope.data.baseType === 'RequestData' &&
      envelope.data.baseData.success === true &&
      envelope.data.baseData.url != null &&
      excludeFileEndings.some((s) => envelope.data.baseData.url.endsWith(s))
    ) {
      return false;
    }

    return true;
  };

  // Adds ApiKey to all logged items
  const apiKeyTelemetryProcessor = (envelope, context) => {
    const data = envelope.data.baseData;
    data.properties = data.properties || {};
    data.properties.apikey = process.env.API_KEY;

    return true;
  };

  const telemetryProcessors = [
    requestFilterTelemetryProcessor,
    apiKeyTelemetryProcessor,
  ];

  if (
    !app.$appInsights?._telemetryProcessors.some((_t) =>
      telemetryProcessors.some((t) => t.name === _t.name),
    )
  ) {
    telemetryProcessors.forEach((t) =>
      app.$appInsights?.addTelemetryProcessor(t),
    );
  }
}

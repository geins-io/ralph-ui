export default function ({ app }) {
  // Adds ApiKey to all logged items
  const apiKeyTelemetryInitializer = (envelope) => {
    const data = envelope.baseData;
    data.properties = data.properties || {};
    data.properties.apiKey = app.$config.apiKey;
  };

  const telemetryInitializers = [apiKeyTelemetryInitializer];

  if (
    !app.$appInsights?.appInsights._telemetryInitializers.some((_t) =>
      telemetryInitializers.some((t) => t.name === _t.name),
    )
  ) {
    telemetryInitializers.forEach((t) =>
      app.$appInsights?.addTelemetryInitializer(t),
    );
  }
}

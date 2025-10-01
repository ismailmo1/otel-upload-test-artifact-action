import {
  BasicTracerProvider,
  SimpleSpanProcessor,
  SpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { FileTraceExporter } from "opentelemetry-exporter-trace-otlp-file";
import { Resource } from "@opentelemetry/resources";

export type CreateTracerProviderParams = {
  traceLogFilePath: string;
  serviceName: string;
  serviceInstanceId: string;
  serviceNamespace: string;
  serviceVersion: string;
};

export function createTracerProvider({
  traceLogFilePath,
  serviceName,
  serviceInstanceId,
  serviceNamespace,
  serviceVersion,
}: CreateTracerProviderParams) {
  const exporter = new FileTraceExporter({ filePath: traceLogFilePath });
  const tracerProvider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: serviceInstanceId,
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: serviceNamespace,
      [SemanticResourceAttributes.SERVICE_VERSION]: serviceVersion,
    }),
  });
  tracerProvider.addSpanProcessor(
    new SimpleSpanProcessor(exporter as SpanExporter)
  );

  tracerProvider.register();

  return tracerProvider;
}

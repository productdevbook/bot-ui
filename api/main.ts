import 'source-map-support/register';
import 'reflect-metadata';
import { AppConfig, ApiLambdaApp, ApiRequest } from 'ts-lambda-api';
import { Container } from 'inversify';
import { bind } from '../lambda-api/inversify/bindings';
import { APIErrorInterceptor } from '../lambda-api/error';

const container = new Container({ autoBindInjectable: false });
bind(container);
const appConfig = new AppConfig();

const app = new ApiLambdaApp(undefined, appConfig, container);
app.middlewareRegistry.addErrorInterceptor(new APIErrorInterceptor());

export default async function (event: ApiRequest, context: any) {
  return await app.run(event as ApiRequest, context);
}

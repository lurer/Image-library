import {TechnicalBriefApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import MultipartFormDataBodyParser from './controllers/MultipartFormDataBodyParser';

export {TechnicalBriefApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TechnicalBriefApplication(options);
  app.bodyParser(MultipartFormDataBodyParser);
  await app.boot();
  await app.migrateSchema(); //Create schema if not exists.
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

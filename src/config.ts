import { RestServerConfig } from './adapter/rest_server';

export type MongoConfiguration = {
  uri: string;
}

export const getRestServerConfig = (): RestServerConfig => {
  const {
    HTTP_PORT = '3000',
    HTTP_HOST = '0.0.0.0',
  } = process.env;

  const httpPort = parseInt(HTTP_PORT, 10);

  if (Number.isNaN(httpPort)) {
    throw new Error(`ENV "HTTP_PORT" must define a portnumber but is set to ${HTTP_PORT}`);
  }

  return {
    port: httpPort,
    host: HTTP_HOST,
  };
};

export interface RestClientConfig {
  baseURL: string;
}

export const getMongoConfig = (): MongoConfiguration => ({
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cars',
});

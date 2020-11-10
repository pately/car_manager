import * as bodyParser from 'body-parser';
import * as Express from 'express';
import { readFileSync } from 'fs';
// ignoring because no types are available
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as oasTools from 'oas-tools';
import { join } from 'path';
import { safeLoad } from 'js-yaml';
import { Server } from 'http';
import { logger } from '../logger';
import { getRestServerConfig as getConfig } from '../config';

export interface RestServerConfig {
  port: number;
  host: string;
}

export class RestServer {
  private initialized = false;

  private server?: Server | undefined;

  public app: Express.Application = Express();

  private config: RestServerConfig;

  private specPath = './dist/commonjs/adapter/oas-doc.yaml';

  private oasDoc: unknown;

  public options_object = {
    controllers: join(__dirname, './controllers'),
    customLogger: logger,
    strict: true,
  };

  constructor(config?: RestServerConfig) {
    this.config = config === undefined ? getConfig() : config;
    this.initialized = false;
    this.initializeRestServer();
  }

  private initializeRestServer(): void {
    this.app.use(bodyParser.json({ strict: false }));
  }

  public async init(specPath?: string): Promise<void> {
    if (!this.initialized) {
      this.oasDoc = await safeLoad(readFileSync(specPath || this.specPath, 'utf8'));
      oasTools.configure(this.options_object);
      oasTools.initialize(this.oasDoc, this.app, (err: Error): void => {
        if (err) throw err;
      });
      this.initialized = true;
    }
    return undefined;
  }

  public async start(): Promise<void> {
    if (!this.server) {
      await new Promise((resolve, reject) => {
        logger.info(`Try listen to http requests on ${this.config.host}:${this.config.port}`);
        this.server = this.app.listen(this.config.port, this.config.host, (error?: Error): void => {
          if (error !== null && error !== undefined) {
            reject(error);
          } else {
            logger.info(`API docs (Swagger UI) available on http://${this.config.host}:${this.config.port}/docs`);
            logger.info(`Server listens on ${this.config.host}:${this.config.port}`);
            resolve();
          }
        });
      });
    }
    return undefined;
  }

  public async close(): Promise<void> {
    await new Promise((resolve, reject) => {
      if (this.server) {
        logger.info(`Try stop listening to http requests on ${this.config.host}:${this.config.port}`);
        const cb = (error?: Error): void => {
          if (error) {
            reject(error);
          } else {
            logger.info(`Server stopped listening on ${this.config.host}:${this.config.port}`);
            resolve();
          }
        };

        this.server = this.server.close(cb);
      }
    });
  }
}

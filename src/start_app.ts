import { RestServer } from './adapter/rest_server';
import { logger } from './logger';
import { CarsServiceInterface } from './cars/contracts';
import { CarsService } from './cars/cars_service';

export const restServer = new RestServer();

/**
 * Initialize the needed service for this Cam Manager API instance.
 * @return Current CarsService Interface to send the calls to.
 */
const createCarsService = (): CarsServiceInterface => {
  return new CarsService();
};

/**
 * Get the current configured CarsService.
 * @return The current cars Service.
 */
export const carsService = (): CarsServiceInterface => createCarsService();

/**
 * @function exit
 * @param {Number} exitCode a number from 1 to 512
 */
const exit = (exitCode: number): void => {
  setTimeout(async () => {
    await restServer.close();
    process.exit(exitCode);
  }, 500);
};

process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('\n\nunhandledRejection\n\n');
  // eslint-disable-next-line no-console
  console.error(reason);
  exit(1);
});

process.on('uncaughtException', (reason: Error) => {
  // eslint-disable-next-line no-console
  console.error('\n\nuncaughtException\n\n');
  logger.error('uncaughtException', reason);
  exit(2);
});

/**
 * starts the service and returns a reference to the rest server
 */
export const startApp = async (): Promise<RestServer> => {
  await restServer.init();
  await restServer.start();
  return restServer;
};

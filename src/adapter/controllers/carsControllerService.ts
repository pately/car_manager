import { Response } from 'express';
import { carsService } from '../../start_app';
import { logger } from '../../logger';
import { GetCarsResponse } from '../../cars/contracts';
import {
  BadServiceRequestError,
  AccessRightError,
  NotFoundError
} from '../../errors'

export const getCars = async (req: {
  'x-api-key': { value: string };
}, res: Response): Promise<void> => {
  try {
    const response: GetCarsResponse[] = await carsService().getCars(req['x-api-key'].value);
    res.send(response);
  } catch (err) {
    if (err instanceof BadServiceRequestError) {
      logger.error(`BadServiceRequestError in postCar route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(400).send({ message: err.message });
    } else if (err instanceof AccessRightError) {
      logger.error(`AccessRightError in postCar route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(403).send({ message: err.message });
    } else if (err instanceof NotFoundError) {
      logger.error(`NotFoundError in postCar route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(404).send({ message: err.message });
    } else {
      logger.error(`Error in postCar route:\n${err.message}`);
      res.status(500).send();
    }
  }
};

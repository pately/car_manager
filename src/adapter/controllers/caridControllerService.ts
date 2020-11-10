import { Response } from 'express';
import { carsService } from '../../start_app';
import { logger } from '../../logger';
import {
  BadServiceRequestError,
  AccessRightError,
  NotFoundError
} from '../../errors'

export const getCarById = async (req: {
  'x-api-key': { value: string };
  id: {
    value: number;
  };
}, res: Response): Promise<void> => {
  try {
    const response = await carsService().getCarById(
      req['x-api-key'].value,
      req.id.value);

    res.send(response);
  } catch (err) {
    if (err instanceof BadServiceRequestError) {
      logger.error(`BadServiceRequestError in getCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(400).send({ message: err.message });
    } else if (err instanceof AccessRightError) {
      logger.error(`AccessRightError in getCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(403).send({ message: err.message });
    } else if (err instanceof NotFoundError) {
      logger.error(`NotFoundError in getCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(404).send({ message: err.message });
    } else {
      logger.error(`Error in getCarById route:\n${err.message}`);
      res.status(500).send();
    }
  }
};

export const updateCarById = async (req: {
  'x-api-key': { value: string };
  id: {
    value: number;
  };
  property_name: {
    value: string;
  };
  property_value: {
    value: string;
  };
}, res: Response): Promise<void> => {
  try {
    const response = await carsService().updateCarById(
      req['x-api-key'].value,
      req.id.value,
      req.property_name.value,
      req.property_value.value,
    );

    res.status(204).send(response);
  } catch (err) {
    if (err instanceof BadServiceRequestError) {
      logger.error(`BadServiceRequestError in updateCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(400).send({ message: err.message });
    } else if (err instanceof AccessRightError) {
      logger.error(`AccessRightError in updateCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(403).send({ message: err.message });
    } else if (err instanceof NotFoundError) {
      logger.error(`NotFoundError in updateCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(404).send({ message: err.message });
    } else {
      logger.error(`Error in updateCarById route:\n${err.message}`);
      res.status(500).send();
    }
  }
};

export const deleteCarById = async (req: {
  'x-api-key': { value: string };
  id: {
    value: number;
  };
}, res: Response): Promise<void> => {
  try {
    const response = await carsService().deleteCarById(
      req['x-api-key'].value,
      req.id.value);
    res.status(204).send(response);
  } catch (err) {
    if (err instanceof BadServiceRequestError) {
      logger.error(`BadServiceRequestError in deleteCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(400).send({ message: err.message });
    } else if (err instanceof AccessRightError) {
      logger.error(`AccessRightError in deleteCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(403).send({ message: err.message });
    } else if (err instanceof NotFoundError) {
      logger.error(`NotFoundError in deleteCarById route:\n${err.message}`);
      if (err instanceof Error) {
        logger.error(err.stack);
      }
      res.status(404).send({ message: err.message });
    } else {
      logger.error(`Error in deleteCarById route:\n${err.message}`);
      res.status(500).send();
    }
  }
};

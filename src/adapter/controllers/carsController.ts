import { Response } from 'express';
import { getCars as getCarsService } from './carsControllerService';

export const getCars =async (req: Request & {
  swagger: {
    params: {
      'x-api-key': { value: string };
    };
  };
}, res: Response): Promise<void> => {
  await getCarsService({
    ...req.swagger.params,
  }, res);
};

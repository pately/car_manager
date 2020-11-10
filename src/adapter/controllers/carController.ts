import { Response } from 'express';
import { postCar as postCarService } from './carControllerService';
import { Car } from '../../cars/contracts';


export const postCar =async (req: Request & {
  swagger: {
    params: {
      'x-api-key': { value: string };
      body: {
        value: Car;
      };
    };
  };
}, res: Response): Promise<void> => {
  await postCarService({
    ...req.swagger.params,
  }, res);
};

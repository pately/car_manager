import { Response } from 'express';
import { 
  updateCarById as updateCarByIdService,
  getCarById as getCarByIdService,
  deleteCarById as deleteCarByIdService,
} from './caridControllerService';

export const getCarById =async (req: Request & {
  swagger: {
    params: {
      'x-api-key': { value: string };
      id: {
        value: number;
      };
    };
  };
}, res: Response): Promise<void> => {
  await getCarByIdService({
    ...req.swagger.params,
  }, res);
};

export const updateCarById =async (req: Request & {
  swagger: {
    params: {
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
    };
  };
}, res: Response): Promise<void> => {
  await updateCarByIdService({
    ...req.swagger.params,
  }, res);
};

export const deleteCarById =async (req: Request & {
  swagger: {
    params: {
      'x-api-key': { value: string };
      id: {
        value: number;
      };
    };
  };
}, res: Response): Promise<void> => {
  await deleteCarByIdService({
    ...req.swagger.params,
  }, res);
};


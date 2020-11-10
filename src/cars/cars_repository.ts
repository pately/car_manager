import { CarsRepositoryInterface, Car, GetCarsResponse } from './contracts';
import CarModel from "../models/car";
import { NotFoundError } from '../errors'

const carProjection = {
  __v: false,
  _id: false
};

export class CarsRepository implements CarsRepositoryInterface {
 
  public async postCar(carPayload: Car): Promise<void> {
    const car = new CarModel({
      id: new Date().getTime(),
      ...carPayload
    });
    const result = await car.save();
    console.log(result);
  }

  public async getCars(): Promise<GetCarsResponse[]> {
    const cars = await CarModel.find({}, carProjection).exec();
    console.log(cars);
    if (!cars || !cars[0]) throw new NotFoundError(`Not found`);
    return cars;
  }

  public async updateCarById(id: number, propertyName: string, propertyValue: string): Promise<void> {
    const car = await CarModel.findOneAndUpdate({ id }, {
      [propertyName]: propertyValue
    }).exec();
    if (!car) throw new NotFoundError(`id ${id} not found`);
  }

  public async deleteCarById(id: number): Promise<void> {
    const car = await CarModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) throw new NotFoundError(`id ${id} not found`);
  }

  public async getCarById(id: number): Promise<GetCarsResponse | null> {
    const car = await CarModel.findOne({ id }, carProjection).exec();
    if (!car) throw new NotFoundError(`id ${id} not found`);
    return car;
  }
}

import { CarsRepository } from './cars_repository';
import {
  CarsServiceInterface,
  Car,
  GetCarsResponse,
} from './contracts';
import { AccessRightError } from '../errors'


export class CarsService implements CarsServiceInterface {
  private repository: CarsRepository;

  public constructor() {
    this.repository = new CarsRepository();
  }

  public async postCar(apiKey: string, car: Car): Promise<void> {
    this.verifyApiKey(apiKey);
    return this.repository.postCar(car);
  }

  public async getCars(apiKey: string): Promise<GetCarsResponse[]> {
    this.verifyApiKey(apiKey);
    return this.repository.getCars();
  }

  public async updateCarById(apiKey: string, id: number, propertyName: string, propertyValue: string): Promise<void> {
    this.verifyApiKey(apiKey);
    return this.repository.updateCarById(id, propertyName, propertyValue);
  }

  public async deleteCarById(apiKey: string, id: number): Promise<void> {
    this.verifyApiKey(apiKey);
    return this.repository.deleteCarById(id);
  }

  public async getCarById(apiKey: string, id: number): Promise<GetCarsResponse | null> {
    this.verifyApiKey(apiKey);
    return this.repository.getCarById(id);
  }

  private verifyApiKey(apiKey: string): void {
    if (!apiKey || !apiKey.length) {
      throw new AccessRightError('api key not valid');
    }
  }

}

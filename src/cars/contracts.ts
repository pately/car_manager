export interface CarsServiceInterface {
  postCar(apiKey: string, car: Car): Promise<void>;
  getCars(apiKey: string): Promise<GetCarsResponse[]>;
  updateCarById(apiKey: string, id: number, propertyName: string, propertyValue: string): PromiseLike<void>;
  deleteCarById(apiKey: string, id: number): PromiseLike<void>;
  getCarById(apiKey: string, id: number): PromiseLike<GetCarsResponse | null>;
}

export interface CarsRepositoryInterface {
  postCar(car: Car): Promise<void>;
  getCars(): Promise<GetCarsResponse[]>;
  updateCarById(id: number, propertyName: string, propertyValue: string): PromiseLike<void>;
  deleteCarById(id: number): PromiseLike<void>;
  getCarById(id: number): PromiseLike<GetCarsResponse | null>;
}

export type Car = {
  brand: string;
  color: string;
  model: string;
}

export type PostCarRequest = {
  apiKey: string;
  brand: string;
  color: string;
  model: string;
}

export type GetCarsResponse = {
  id: number;
  brand: string;
  color: string;
  model: string;
}




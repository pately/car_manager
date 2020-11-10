/* eslint-disable @typescript-eslint/camelcase */
import { CarsService } from '../../src/cars/cars_service';
import { CarsRepository } from '../../src/cars/cars_repository';

jest.mock('../../src/cars/cars_repository');

/* eslint-disable @typescript-eslint/no-explicit-any */
describe.only('CarsService', () => {
  let service: CarsService;
  let repositoryMock: {
    postCar: jest.Mock<any, any>;
    getCars: jest.Mock<any, any>;
    updateCarById: jest.Mock<any, any>;
    deleteCarById: jest.Mock<any, any>;
    getCarById: jest.Mock<any, any>;
  };

  beforeEach(async () => {
    repositoryMock = {
      postCar: jest.fn(),
      getCars: jest.fn(),
      updateCarById: jest.fn(),
      deleteCarById: jest.fn(),
      getCarById: jest.fn(),
    };
    (CarsRepository as jest.Mock).mockImplementation(() => repositoryMock);
    (CarsRepository as jest.Mock).mockClear();

    service = new CarsService();
  });

  it('handles the postCar successfully', async () => {
    const apiKey = 'fakeapikey';
    const carPayload = {
      brand: 'BMW',
      color: 'gold',
      model: 'BMW X5',
    };

    await service.postCar(apiKey, carPayload);
    expect(repositoryMock.postCar).toHaveBeenCalledWith(carPayload);
  });

  it('postCar with invalid apiKey should thow error', async () => {
    const apiKey = '';
    const carPayload = {
      brand: 'BMW',
      color: 'gold',
      model: 'BMW X5',
    };
    await expect(service.postCar(apiKey, carPayload))
      .rejects
      .toThrow('api key not valid');
  });

  it('handles the getCars successfully', async () => {
    const apiKey = 'fakeapikey';
    const car = [
      {
        id: 123,
        brand: 'BMW',
        color: 'gold',
        model: 'BMW X5',
      }
    ]

    repositoryMock.getCars.mockImplementation(async () => (car));
    const result = await service.getCars(apiKey);
    expect(repositoryMock.getCars).toHaveBeenCalled();
    expect(result).toStrictEqual(car);

  });

  it('getCars with invalid apiKey should thow error', async () => {
    const apiKey = '';
    await expect(service.getCars(apiKey))
      .rejects
      .toThrow('api key not valid');
  });

  it('handles the updateCarById successfully', async () => {
    const apiKey = 'fakeapikey';
    const id = 123;
    const propertyName = 'brand';
    const propertyValue = 'BMW';

    await service.updateCarById(apiKey, id, propertyName, propertyValue);
    expect(repositoryMock.updateCarById).toHaveBeenCalledWith(id, propertyName, propertyValue);
  });

  it('updateCarById with invalid apiKey should thow error', async () => {
    const apiKey = '';
    const id = 123;
    const propertyName = 'brand';
    const propertyValue = 'BMW';
    await expect(service.updateCarById(apiKey, id, propertyName, propertyValue))
      .rejects
      .toThrow('api key not valid');
  });


  it('handles the deleteCarById successfully', async () => {
    const apiKey = 'fakeapikey';
    const id = 123;

    await service.deleteCarById(apiKey, id);
    expect(repositoryMock.deleteCarById).toHaveBeenCalledWith(id);
  });

  it('deleteCarById with invalid apiKey should thow error', async () => {
    const apiKey = '';
    const id = 123;
    await expect(service.deleteCarById(apiKey, id))
      .rejects
      .toThrow('api key not valid');
  });


  it('handles the getCarById successfully', async () => {
    const apiKey = 'fakeapikey';
    const id = 123;

    await service.getCarById(apiKey, id);
    expect(repositoryMock.getCarById).toHaveBeenCalledWith(id);
  });

  it('getCarById with invalid apiKey should thow error', async () => {
    const apiKey = '';
    const id = 123;
    await expect(service.getCarById(apiKey, id))
      .rejects
      .toThrow('api key not valid');
  });

});

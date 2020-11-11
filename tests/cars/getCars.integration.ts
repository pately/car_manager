import * as supertest from 'supertest';
import { RestServer } from '../../src/adapter/rest_server';
import { GetCarsResponse } from '../../src/cars/contracts';

describe('the getCars route', () => {
  let restRequest: supertest.SuperTest<supertest.Test>;
  const restServer = new RestServer();

  beforeAll(async () => {
    await restServer.init();
    restRequest = supertest(restServer.app);

    const apiKey = 'fakeapikey';
    const carPayload = {
      brand: 'BMW',
      color: 'gold',
      model: 'BMW X5',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
    };
    await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);
  });

  it('successful getCars request', async () => {
    const apiKey = 'fakeapikey';

    const carsResponse: supertest.Response = await restRequest
      .get('/cars')
      .set('x-api-key', apiKey);

    const cars: GetCarsResponse[] = JSON.parse(carsResponse.text);
    expect(carsResponse.status).toBe(200);

    for (const car of cars) {
      expect(car.brand.length > 0).toEqual(true);
      expect(car.color.length > 0).toEqual(true);
      expect(car.model.length > 0).toEqual(true);

    }
  });

  it('should fail getCars request with invalid x-api-key', async () => {
    const apiKey = '';
    const response: supertest.Response = await restRequest
      .get('/cars')
      .set('x-api-key', apiKey);

    expect(response.status).toBe(403);
  });

});

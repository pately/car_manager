import * as supertest from 'supertest';
import { RestServer } from '../../src/adapter/rest_server';
import { GetCarsResponse } from '../../src/cars/contracts';

describe('the getCarById route', () => {
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

  it('successful getCarById request', async () => {
    const apiKey = 'fakeapikey';

    const carsResponse: supertest.Response = await restRequest
      .get('/cars')
      .set('x-api-key', apiKey);

    const cars: GetCarsResponse[] = JSON.parse(carsResponse.text);

    for (const car of cars) {
      const response: supertest.Response = await restRequest
        .get(`/car/${car.id}`)
        .set('x-api-key', apiKey);

      const carBody: GetCarsResponse = JSON.parse(response.text);
      expect(carBody.brand.length > 0).toEqual(true);
      expect(carBody.color.length > 0).toEqual(true);
      expect(carBody.model.length > 0).toEqual(true);

      expect(response.status).toBe(200);
    }
  });

  it('should fail getCarById request with invalid x-api-key', async () => {
    const apiKey = '';
    const response: supertest.Response = await restRequest
      .get('/car/12345')
      .set('x-api-key', apiKey);

    expect(response.status).toBe(403);
  });

  it('should fail getCarById request with empty id', async () => {
    const id = '';
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .get(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });

  it('should fail getCarById request with invalid id', async () => {
    const id = 'DDDDD'; // invalid id only number allowed
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .get(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });

  it('should fail getCarById request with unknown id', async () => {
    const id = 123;
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .get(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });
});

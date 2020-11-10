import * as supertest from 'supertest';
import { RestServer } from '../../src/adapter/rest_server';
import { GetCarsResponse } from '../../src/cars/contracts';

describe('the deleteCarById route', () => {
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
    };
    await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);
  });

  it('successful deleteCarById request', async () => {
    const apiKey = 'fakeapikey';

    const carsResponse: supertest.Response = await restRequest
      .get('/cars')
      .set('x-api-key', apiKey);

    const cars: GetCarsResponse[] = JSON.parse(carsResponse.text);

    for (const car of cars) {
      const response: supertest.Response = await restRequest
        .delete(`/car/${car.id}`)
        .set('x-api-key', apiKey);

      expect(response.status).toBe(204);
    }
  });

  it('should fail deleteCarById request with invalid x-api-key', async () => {
    const apiKey = '';
    const response: supertest.Response = await restRequest
      .delete('/car/12345')
      .set('x-api-key', apiKey);

    expect(response.status).toBe(403);
  });

  it('should fail deleteCarById request with empty id', async () => {
    const id = '';
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .delete(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });

  it('should fail deleteCarById request with invalid id', async () => {
    const id = 'DDDDD'; // invalid id only number allowed
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .delete(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });

  it('should fail deleteCarById request with unknown id', async () => {
    const id = 123;
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .delete(`/car/${id}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });
});

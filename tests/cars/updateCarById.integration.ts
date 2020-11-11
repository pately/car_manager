import * as supertest from 'supertest';
import { RestServer } from '../../src/adapter/rest_server';
import { GetCarsResponse } from '../../src/cars/contracts';

describe('the updateCarById route', () => {
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

  it('successful updateCarById request', async () => {
    jest.setTimeout(2000);

    const apiKey = 'fakeapikey';
    const carsResponse: supertest.Response = await restRequest
      .get('/cars')
      .set('x-api-key', apiKey);

    const cars: GetCarsResponse[] = JSON.parse(carsResponse.text);
    expect(carsResponse.status).toBe(200);
    for (const car of cars) {
      const response: supertest.Response = await restRequest
        .put(`/car/${car.id}?property_name=${'brand'}&property_value=${'VW'}`)
        .set('x-api-key', apiKey);

      expect(response.status).toBe(204);
    }

  });

  it('should fail updateCarById request with invalid x-api-key', async () => {
    const apiKey = '';
    const response: supertest.Response = await restRequest
      .put(`/car/12345?property_name=${'brand'}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(403);
  });

  it('should fail updateCarById request with empty id', async () => {
    const id = '';
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${'brand'}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });

  it('should fail updateCarById request with invalid id', async () => {
    const id = 'DDDDD'; // invalid id only number allowed
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${'brand'}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });

  it('should fail updateCarById request with unknown id', async () => {
    const id = 123;
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${'brand'}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(404);
  });

  it('should fail updateCarById request with invalid property_name', async () => {
    const id = 12345; 
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${'FAKE'}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });

  it('should fail updateCarById request with empty property_name', async () => {
    const id = 12345; 
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${''}&property_value=${'VW'}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });

  it('should fail updateCarById request with invalid property_value', async () => {
    const id = 12345; 
    const apiKey = 'fakeapikey';
    const response: supertest.Response = await restRequest
      .put(`/car/${id}?property_name=${'brand'}&property_value=${''}`)
      .set('x-api-key', apiKey);

    expect(response.status).toBe(400);
  });


});

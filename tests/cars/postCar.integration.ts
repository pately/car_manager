import * as supertest from 'supertest';
import { RestServer } from '../../src/adapter/rest_server';

describe('the postCar route', () => {
  let restRequest: supertest.SuperTest<supertest.Test>;
  const restServer = new RestServer();

  beforeAll(async () => {
    await restServer.init();
    restRequest = supertest(restServer.app);
  });

  it('successful postCar request', async () => {
    const apiKey = 'fakeapikey';
    const carPayload = {
      brand: 'BMW',
      color: 'gold',
      model: 'BMW X5',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
    };
    const response: supertest.Response = await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);

    expect(response.status).toBe(201);
    expect(response.header['content-type']).toBe('application/json;charset=utf-8');
  });

  it('should fail postCar request with invalid x-api-key', async () => {
    const apiKey = '';
    const carPayload = {
      brand: 'BMW',
      color: 'gold',
      model: 'BMW X5',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
    };
    const response: supertest.Response = await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);

    expect(response.status).toBe(403);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('should fail postCar request with invalid in body', async () => {
    const apiKey = '';
    const carPayload = {  // model is removed from body
      brand: 'BMW',
      color: 'gold',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
    };
    const response: supertest.Response = await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);

    expect(response.status).toBe(400);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('should fail postCar request with invalid values in body', async () => {
    const apiKey = '';
    const carPayload = { 
      brand: 'BMW',
      color: '', // empty values not allowed
      model: 'BMW X5',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
    };
    const response: supertest.Response = await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);

    expect(response.status).toBe(400);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('should fail postCar request with extra properties in body', async () => {
    const apiKey = '';
    const carPayload = { 
      brand: 'BMW',
      color: 'red', 
      model: 'BMW X5',
      license: 'BLE 231',
      vin: '5GZCZ43D13S812715',
      extra: 'BWE 231', // extra properties not allowed
    };
    const response: supertest.Response = await restRequest
      .post('/car')
      .set('x-api-key', apiKey)
      .send(carPayload);

    expect(response.status).toBe(400);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });
});

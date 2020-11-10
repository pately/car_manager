# car_manager
---
## Purpose of the Car Manager API

### This RESTful API allows perform following functions:
   * **POST /car** - Create a new car.
   * **GET /cars** - Read meta-data of all cars in the system. This endpoint only return meta-data - there is no pagination required.
   * **GET /car/:id** - Read the full data of an individual car.
   * **DELETE /car/:id** - Delete an individual car.
   * **PUT /car/:id?property_name={name}&property_value={value}** - Update single properties of a single car (not a full replace operation!). property_name can be any one value from the enum *[brand, color, model]*


    GET /cars
    POST /car
    GET /car/:id
    PUT /car/:id?property_name={name}&property_value={value}
    DELETE /car/:id
    
---    
#### Github Actions

![Build](https://github.com/pately/car_manager/workflows/Build/badge.svg)

## Requirements
  * Node.js >= 12.x.x

## configuration

Configuration is done via environment variables:

```
HTTP_HOST: server hostname (default: 'localhost')
HTTP_PORT: server port (default: '3000')
MONGODB_URI: mongodb connection uri (default: 'mongodb://127.0.0.1:27017/cars')
```

## manual start

First compile the application:

```
./setup.sh
```

Then the application can be started:

```
npm start
```

## Running the tests

Tests includes unit and integration tests. 
**Prerequisite for testing** - Running MongoDB connection
The tests can be run with:

```
npm test
```

# How to build/run swarger docs server
Run the following commands:
```
./setup.sh
npm start
```
API docs (Swagger UI) available on http://0.0.0.0:3000/docs

## Docker Compose

prepare:

```
docker-compose build
```
Then the application can be started:

```
docker-compose up
```

The tests can be run with:

```
docker-compose run car_manager_api npm test
```
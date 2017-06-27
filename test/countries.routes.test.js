'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('countries routes', addDatabaseHooks(() => {
  test('GET /countries', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/countries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 2,
          name: 'Ethiopia',
          lat: 9.145,
          long: 40.489673,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
        id: 1,
        name: 'United States',
        lat: 37.09024,
        long: -95.712891,
        createdAt: '2017-06-23T14:56:16.000Z',
        updatedAt: '2017-06-23T14:56:16.000Z'
      }
    ], done);
    /* eslint-enable max-len */
});

  test('GET /countries/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/countries/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        "countryName": "Ethiopia",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "lat": 6.16205,
        "long": 38.2058,
        "name": "Three Africas",
        "producerId": 1,
        "regionName": "Yirgacheffe",
        "varieties": "Heirloom"
      }], done);
          /* eslint-enable max-len */
  });

}));
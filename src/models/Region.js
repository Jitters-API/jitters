// 'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');
const express = require('express');


class Region {

  getRegions() {
    return knex('regions')
      .orderBy('name')
      .then((result) => camelizeKeys(result));
  }

  getCoffeeByRegionId(id) {
    return knex('coffee')
      .select('coffee.id', 'coffee.name', 'coffee.description', 'coffee.varieties', 'coffee.producer_id', 'regions.id', 'coffee.flavor_profile', 'regions.lat', 'regions.long', 'countries.name as country_name', 'regions.name as region_name')
      .innerJoin('coffee_regions', 'coffee.id', 'coffee_regions.coffee_id')
      .innerJoin('regions', 'coffee_regions.region_id', 'regions.id')
      .innerJoin('countries', 'regions.country_id', 'countries.id')
      .where('regions.id', id)
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  addRegion(region) {
    return knex('regions')
      .insert(region,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateRegion(region) {
    return knex('regions')
      .where('id', region.id)
      .update({
        countryId: region.countryId,
        name: region.name,
        lat: region.lat,
        long: region.long}, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

}

module.exports = Region;

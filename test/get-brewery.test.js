'use strict';

const got = require('got');
const endpoint = "https://api.openbrewerydb.org/breweries";

let response;
let data;

beforeAll( async () => {
  response = await got(`${endpoint}/5494`);
  data = JSON.parse(response.body);
});

test('/breweries/5494 should return one result with an id of 5494', () => {
  expect(data.id).toBe(5494);
});

test('/breweries/5494 should return one result with a name of "MadTree Brewing"', () => {
  expect(data.name).toBe("MadTree Brewing");
});


test('/breweries/5494 should return one result with a street of "3301 Madison Rd"', () => {
  expect(data.street).toBe("3301 Madison Rd");
});



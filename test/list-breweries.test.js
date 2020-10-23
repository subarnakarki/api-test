'use strict';

const got = require('got');
const endpoint = "https://api.openbrewerydb.org/breweries";


test('searching /breweries should return results', async () => {
  const response = await got(`${endpoint}`);
  const data = JSON.parse(response.body);
  expect(data.length).toBeGreaterThan(0);
});

test('searching /breweries by_city=san_diego should return 20 results', async() => {
  const response = await got(`${endpoint}?by_city=san_diego`);
  const data = JSON.parse(response.body);
  expect(data.length).toBe(20);
});

test('searching /breweries by_name=dog should only return results with a name containing "dog"', async() => {
  const response = await got(`${endpoint}?by_name=dog`);
  const data = JSON.parse(response.body);
  data.forEach(result => {
    expect(result.name.toLowerCase()).toMatch(/dog/i);
  });
});

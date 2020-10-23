'use strict';

const got = require('got');
const endpoint = "https://api.openbrewerydb.org/breweries";

let response;
let data;

beforeAll( async () => {
  response = await got(`${endpoint}/autocomplete?query=dog`);
  data = JSON.parse(response.body);
});

test('/breweries/search with query=dog should return 49 results', async () => {
  expect(data.length).toBe(15);
});

test('/breweries/autocomplete with query=dog should return results with a name that includes "dog"', async () => {
  data.forEach(result => {
    expect(result.name).toMatch(/dog/i);
  });
});

test('/breweries/autocomplete with query=dog should return results with valid id', async () => {
  data.forEach(result => {
    const id = parseInt(result.id);
    expect(id).toBeGreaterThan(0);
  });
});

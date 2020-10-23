'use strict';

const got = require('got');
const endpoint = "https://api.openbrewerydb.org/breweries";

let response;
let data;

beforeAll( async () => {
  response = await got(`${endpoint}/search?query=dog`);
  data = JSON.parse(response.body);
});

test('/breweries/search with query=dog should return 49 results', async () => {
  expect(data.length).toBe(49);
});

test('/breweries/search with query=dog should return a name that includes "dog"', async () => {
  expect(data[1].name).toMatch(/dog/i);
});


test('/breweries/search with search?query=Expel%20awesome%20Breweries should NOT return any results', async () => {
  const response = await got(`${endpoint}/search?query=Expel%20awesome%20Breweries`);
  const data = JSON.parse(response.body);
  expect(data.length).toBe(0);
});


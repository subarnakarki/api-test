'use strict';

const got = require('got');
const endpoint = "https://api.openbrewerydb.org/breweries";


test('searching /breweries should return results', async () => {
  const response = await got(`${endpoint}`);
  const data = JSON.parse(response.body);
  
  expect(data.length).toBeGreaterThan(0);
});

test('/breweries by_city=san_diego should return 20 results', async() => {
  const response = await got(`${endpoint}?by_city=san_diego`);
  const data = JSON.parse(response.body);

  expect(data.length).toBe(20);
});

test('/breweries by_city=san_diego should return results with city as "San Diego"', async() => {
  const response = await got(`${endpoint}?by_city=san_diego`);
  const data = JSON.parse(response.body);

  data.forEach(result => {
    expect(result.city).toBe("San Diego");
  });
  
});

test('/breweries by_name=dog should only return results with a name containing "dog"', async() => {
  const response = await got(`${endpoint}?by_name=dog`);
  const data = JSON.parse(response.body);

  data.forEach(result => {
    expect(result.name.toLowerCase()).toMatch(/dog/i);
  });
});


test('/breweries by_state=virginia should return results with state as "Virginia"', async() => {
  const response = await got(`${endpoint}?by_state=virginia`);
  const data = JSON.parse(response.body);

  data.forEach(result => {
    expect(result.state).toBe("Virginia");
  });
});


test('/breweries by_postal=20111 should return result(s) with postal_code as "20111"', async() => {
  const response = await got(`${endpoint}?by_postal=20111`);
  const data = JSON.parse(response.body);

  data.forEach(result => {
    expect(result.postal_code).toBe("20111");
  });
});

test('/breweries by_type=micro should return result(s) with brewery_type as "micro"', async() => {
  const response = await got(`${endpoint}?by_type=micro`);
  const data = JSON.parse(response.body);

  data.forEach(result => {
    expect(result.brewery_type).toBe("micro");
  });
});

test('/breweries with ?page=1&per_page=50 should return 50 results', async() => {
  const response = await got(`${endpoint}?page=1&per_page=50`);
  const data = JSON.parse(response.body);
  expect(data.length).toBe(50);
});

test('/breweries with ?page=15&per_page=200 should return 50 results', async() => {
  const response = await got(`${endpoint}?page=15&per_page=200`);
  const data = JSON.parse(response.body);

  expect(data.length).toBeLessThanOrEqual(50);
});

test('/breweries with ?page=1&sort=id should return results in ascending order by Id', async() => {
  const response = await got(`${endpoint}?sort=id`);
  const data = JSON.parse(response.body);

  data.forEach((result, i) => {
    let expectedId = i+ 1;
    expect(result.id).toBe(expectedId);
  });
});

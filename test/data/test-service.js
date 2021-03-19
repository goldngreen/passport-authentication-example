
const assert = require('assert');

const userTestData = require('./service').user;

describe('data-service', function() {
    it('get mocks from mockaroo', async function()  {
        const response = await userTestData.samples(10);
        assert(response.length == 10);
    });
});

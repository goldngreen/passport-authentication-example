
if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

const assert = require('assert');

const userTestData = require(process.env.PROJECT_ROOT+'/test/services/test-data').user;

describe('data-service', function() {
    it('get mocks from mock data service', async function()  {
        const response = await userTestData.samples(10);
        assert(response.length == 10);
    });
});

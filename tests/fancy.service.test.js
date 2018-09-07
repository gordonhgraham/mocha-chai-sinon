const { expect } = require('chai');
const sinon = require('sinon');

const fancyService = require('../services/fancy.service');

describe('FancyService', () => {
  let subject;
  let httpClient;

  beforeEach(() => {
    httpClient = 'httpClient';
    subject = new fancyService(httpClient);
  });

  afterEach(() => {});

  it('constructs correctly', () => {
    expect(subject.networkClient).to.equal(httpClient);
  })

  describe('handling network requests', () => {
    beforeEach(() => {
      subject = new fancyService();
    });
    afterEach(() => {});

    it('has makeRequest method', () => {
      expect(subject.makeRequest).to.be.a('function');
    });
  });
});






/*
const qs = require('qs');
const axios = require('axios');
const ExhError = require('../errors/ExhError');

module.exports = class ClientLoginService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getUserAuthToken(body) {
    const data = qs.stringify(body);
    const promise = this.getUserAuthTokenAPI(data);
    return promise.then(
      (response) => {
        // console.log(response.data);
        this.httpClient.get('/v1/registertoken', {
          headers: {
            Authorization: response.data.access_token
          }
        }).then((res) => {
          console.log(res.data);
        }).catch((err) => {
          console.log(err);
        });
        return response.data;
      }
      // onAuthToken(response)
    ).catch((e) => {
      const errorObj = e.response.data;
      throw new ExhError(errorObj.error, errorObj.error_description, e.response.status,
        e.response.statusCode);
    });
  }

  getUserAuthTokenAPI(data) {
    const options = {
      method: 'POST',
      url: 'https://exh-api-endpoint-dev.cps-core.com/insightauth/oauth2/token',
      headers: {
        'x-api-key': '6zXrjTczMmfTYnmNznfL47I29eaaEfC28LENyXya',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'allow',
      },
      data,
    };

    return axios(options);
  }
};

*/
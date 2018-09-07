const { expect } = require('chai');
const sinon = require('sinon');

const loginController = require('../controllers/login.controller');

describe.only('LoginController', () => {
  let subject;
  let serviceStub;
  let fakeService;
  
  beforeEach(() => {
    fakeService = {
      post: data => {},
      get: () => {},
    };
    serviceStub = sinon.stub(fakeService);
    subject = new loginController(serviceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Initializing routes', () => {
    let router;

    beforeEach(() => {
      router = {
        post: sinon.spy(),
      };
      subject.initRoutes(router);
    });

    it('calls router.post method with "/clientLogin" route', ()=> {
      expect(router.post.args[0][0]).to.equal('/clientLogin');
    });

    // not sure how to test & check for a bound function
    it('calls router.post method with getLogin');
  });

  describe('logging in', () => {
    let getLoginSpy;
    let loginData;

    beforeEach(() => {
      getLoginSpy = sinon.spy(subject, 'getLogin');
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('with successful credentials', () => {
      beforeEach(() => {
        loginData = 'this right here, is a string';
        serviceStub.post.returns('success!!');
        subject.getLogin(loginData);
      });

      afterEach(() => {
        sinon.restore();
        loginData = null;
      });

      it('makes a post request to the loginService with loginData', () => {
        expect(serviceStub.post.args[0][0]).to.equal(loginData);
      });

      it('returns a string that says "success!!"', () => {
        expect(getLoginSpy.returnValues[0]).to.equal('success!!');
      });
    });

    describe('with bogus credentials', () => {
      beforeEach(() => {
        loginData = 666;
        serviceStub.post.returns('Bummer Man!');
        subject.getLogin(loginData);
      });

      afterEach(() => {
        sinon.restore();
        loginData = null;
      });

      it('makes a post request to the loginService with loginData', () => {
        expect(serviceStub.post.args[0][0]).to.equal(loginData);
      });

      it('returns a string that says "Bummer Man!!"', () => {
        expect(getLoginSpy.returnValues[0]).to.equal('Bummer Man!');
      });
    });
  });

  describe('get dogs', () => {
    let getDogsSpy;

    beforeEach(() => {
      getDogsSpy = sinon.spy(subject, 'getDogs');
    });
    
    afterEach(() => {
      sinon.restore();
    });

    it('makes a get request to the service', () => {
      subject.getDogs();
      expect(serviceStub.get.callCount).to.equal(1);
    });
  });
});

// console.log('====================');
// console.log('XXXXXXXXX', XXXXXXXXX);
// console.log('====================');

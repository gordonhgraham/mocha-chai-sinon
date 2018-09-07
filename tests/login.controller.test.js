const { expect } = require('chai')
const sinon = require('sinon')

const loginController = require('../controllers/login.controller')

describe.only('LoginController', () => {
  let subject
  let serviceStub;
  let fakeService;
  
  beforeEach(() => {
    fakeService = {
      post: data => {},
    }
    serviceStub = sinon.stub(fakeService);
    subject = new loginController(serviceStub)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('Initializing routes', () => {
    let router

    beforeEach(() => {
      router = {
        post: sinon.spy()
      }
      subject.initRoutes(router)
    })

    it('calls router.post method with "/clientLogin" route', ()=> {
      expect(router.post.args[0][0]).to.equal('/clientLogin')
    })

    // not sure how to test & check for a bound function
    it('calls router.post method with getLogin')
  })

  describe('logging in', () => {
    let getLoginSpy;
    let loginData;

    beforeEach(() => {
      getLoginSpy = sinon.spy(subject, 'getLogin');
    })
    afterEach(() => {
      sinon.restore();
    })
    
    describe('with successful credentials', () => {
      beforeEach(() => {
        loginData = 'this right here, is a string'
        serviceStub.post.returns('success!!')
        subject.getLogin(loginData);
      })

      afterEach(() => {
        sinon.restore();
        loginData = null;
      })

      it('makes a post request to the loginService with loginData', () => {
        expect(serviceStub.post.args[0][0]).to.equal(loginData);
      })

      it('returns a string that says "success!!"', () => {
        expect(getLoginSpy.returnValues[0]).to.equal('success!!')
      })
    })

    describe('with bogus credentials', () => {
      beforeEach(() => {
        loginData = 666
        serviceStub.post.returns('Bummer Man!')
        subject.getLogin(loginData)
      })

      afterEach(() => {
        sinon.restore();
        loginData = null
      })

      it('makes a post request to the loginService with loginData', () => {
        expect(serviceStub.post.args[0][0]).to.equal(loginData);
      })

      it('returns a string that says "Bummer Man!!"', () => {
        expect(getLoginSpy.returnValues[0]).to.equal('Bummer Man!');
      })
    })
  })

  describe('getting data', () => {
    let getDataSpy;

    beforeEach(() => {
      getDataSpy = sinon.spy(subject, 'getData');
    })
    afterEach(() => {
      sinon.restore();
    })

    it('returns argument passed', () => {
      const data = 'Arya the dog'
      subject.getData(data);
      expect(getDataSpy.returnValues[0]).to.equal('Arya the dog')
    })
  })
})

// console.log('====================');
// console.log('getLoginSpy.returnValues', getLoginSpy.returnValues);
// console.log('====================');

/* 

describe('The constructor', () => {
  it('constructs correctly', () => {
    subject = new ClientLoginController('service')
    expect(subject.clientLoginService).to.equal('service')
  })
})

describe('initializing the routes', () => {
  beforeEach(() => {
    subject.initRoutes(router)
  })

  it('initializes the router post method with clientlogin endpoint', () => {
    expect(routerPostSpy.calledOnce).to.equal(true)
    expect(routerPostSpy.args[0][0]).to.equal('/clientlogin')
  })

  it('initializes the router post method with getLogin', () => {
    expect(routerPostSpy.calledOnce).to.equal(true)

    console.log('====================')
    console.log('arguments passed to router.post: ', routerPostSpy.args[0][1])
    console.log('getLoginStub: ', getLoginStub)
    console.log('====================')

    expect(routerPostSpy.args[0][1]).to.equal(
      getLoginStub.bind(this)
    )
  })
})
})

*/

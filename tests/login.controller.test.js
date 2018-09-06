const { expect } = require('chai')
const sinon = require('sinon')

const loginController = require('../controllers/login.controller')

describe.only('LoginController', () => {
  let subject
  let serviceStub;
  
  beforeEach(() => {
    serviceStub = sinon.stub();
    subject = new loginController(serviceStub)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('constructor', () => {
    it('constructs with service', () => {
      expect(subject.service).to.equal(serviceStub);
    })
  })

  describe('Initializing routes', () => {
    let router

    beforeEach(() => {
      router = {
        post: sinon.spy()
      }
      subject.initRoutes(router)
    })

    it('calls router.post method with /clientLogin route', ()=> {
      expect(router.post.args[0][0]).to.equal('/clientLogin')
    })

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
      })
      afterEach(() => {
        sinon.restore();
        loginData = null;
      })
      it('makes a request to the loginService with loginData', () => {
        subject.getLogin(loginData);
        expect(serviceStub.args[0][0]).to.equal(loginData);
        expect(serviceStub.calledOnce).to.be.true
      })

      it('returns string that says excellent data', () => {
        subject.getLogin(loginData);
        expect(getLoginSpy.returnValues[0]).to.equal('success!!')
      })

    })

    describe('with bogus credentials', () => {
      beforeEach(() => {
        loginData = 666
      })
      afterEach(() => {
        sinon.restore();
        loginData = null
      })

      it('makes a request to the loginService with loginData', () => {
        subject.getLogin(loginData);
        expect(serviceStub.args[0][0]).to.equal(loginData);
        expect(serviceStub.calledOnce).to.be.true
      })

      it('returns "Bummer Man!!" if integers are passed', () => {
        subject.getLogin(loginData)
        expect(getLoginSpy.returnValues[0]).to.equal('Bummer Man!');
      })
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

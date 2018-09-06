const expect = require('chai').expect;
const sinon = require('sinon');

const indexPage = require('../../controllers/app.controller');

describe('app Controller', function () {
  let user;
  let isLoggedInStub;
  let req;
  let res;
  beforeEach(() => {
    user = {
      addUser: name => {
        this.name = name
      },
      isLoggedIn: function () {}
    }
    req = { user }
    res = { send: sinon.spy() }
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('get Index Page', function () {
    
    describe('when a user is logged in', function () {
      it('should send Hey if a user is logged in', function () {
        isLoggedInStub = sinon.stub(user, 'isLoggedIn').returns(true)
        indexPage.getIndexPage(req, res)
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.equal('Hey')
        expect(isLoggedInStub.calledOnce).to.be.true;
      })
    })

    describe('when a user is not logged in', function () {
      it('should send error message', function () {
        isLoggedInStub = sinon.stub(user, 'isLoggedIn').returns(false)
        indexPage.getIndexPage(req, res)
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.equal('error message: oops, not logged in')
      })
    })
  
    describe('User', function () {
      describe('addUser', function () {
        it('should add a user', function () {
          sinon.spy(user, 'addUser')
  
          user.addUser('Arya the great')
  
          expect(user.addUser.calledOnce).to.be.true
          
        })
      })    
    })
  })
})
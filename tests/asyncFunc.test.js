const expect = require('chai').expect;

function asyncFunc(boolValue, cb) {
  setTimeout(function () {
    cb(boolValue ? 'Le true' : 'Le false')
  }, 1000)
}

describe('Async Test', function () {
  it('should return true if true', function () {
    asyncFunc(true, function (check) {
      expect(check).to.equal('Le true')
    })
  })

  it('should return Le false if false', function () {
    asyncFunc(false, function (check) {
      expect(check).to.equal('Le true')
    })
  })
})
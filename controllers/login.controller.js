const axios = require('axios');

module.exports = class LoginController {
  constructor(service) {
    this.service = service
  }

  initRoutes(router) {
    // router.post('/clientLogin', this.getLogin.bind(this));
    router.post('/clientLogin');
  }

  getLogin(data) {
    this.service(data);

    if (typeof data === 'string') {
      return 'success!!'
    } else {
      return 'Bummer Man!'
    }
  }
}
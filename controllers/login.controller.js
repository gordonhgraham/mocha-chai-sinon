const axios = require('axios');

module.exports = class LoginController {
  constructor(service) {
    this.service = service
  }

  initRoutes(router) {
    router.post('/clientLogin', function(data) {
      service.post()
      if (typeof data === 'string') {
        return 'success!!'
      } else {
        return 'Bummer Man!'
      }  
    });
  }
  
  // initRoutes(router) {
  //   router.post('/clientLogin', this.getLogin.bind(this));
  // }

  // getLogin(data) {
  //   this.service.post(data);

  //   if (typeof data === 'string') {
  //     return 'success!!'
  //   } else {
  //     return 'Bummer Man!'
  //   }
  // }
}
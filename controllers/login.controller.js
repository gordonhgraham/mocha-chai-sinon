module.exports = class LoginController {
  constructor(service) {
    this.service = service;
  }

  initRoutes(router) {
    router.post('/clientLogin', this.getLogin.bind(this));
  }

  getLogin(data) {
    return this.service.post(data);
  }

  getDogs() {
    return this.service.get();
  }
}
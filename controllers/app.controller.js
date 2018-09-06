module.exports = {
  getIndexPage: (req, res) => {
    if (req.user.isLoggedIn()) {
      return res.send('Hey')
    } else {
      res.send('error message: oops, not logged in')
    }
  }
}
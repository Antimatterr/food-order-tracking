const Menu = require('../../models/menu')

function homeController() {
  // factory functions
  // programming patter present in languages specially javascript as we use closures in javascript
  // object creation pattern (factory function return object )
  return {
    async index(req, res) {
      const pizzas = await Menu.find()
      return res.render('home', { pizzas: pizzas })
    }
  }
}


module.exports = homeController;
import EmberRouter from "@ember/routing/router"
import config from "./config/environment"

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('dashboard', {path: '/'})

  // Login, register and forgot password handling
  this.route('login')
  this.route('forgotpw')
  this.route('register');
})

export default Router

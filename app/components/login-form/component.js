import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @service authenticate
  @service router

  @tracked loginFailureMessage

  @action
  async login (e) {
    // Stop the form submitting itself
    e.preventDefault()

    const { email: {value: email}, password: {value: password} } = e.currentTarget

    // Clear any existing login failure message
    this.loginFailureMessage = null
    try {
      await this.authenticate.login.perform(email, password)
      this.router.transitionTo('dashboard')
    } catch (error) {
      this.loginFailureMessage = error.message
    }
  }
}

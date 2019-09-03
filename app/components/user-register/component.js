import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { getStartOfDay } from '../../utils/date-funcs'
import Changeset from 'ember-changeset'


export default class Task extends Component {
  @service authenticate
  @tracked error

  /**
   * Tests to see if the password supplied by the user is valid
   * @param password: String
   * @param altPassword: String
   * @return [success: Boolean, reason: null || String]: Array
  **/
  testPassword (password, altPassword) {
    if (password !== altPassword) {
      return [false, `Password's do not match`]
    }
  }

  @action
  registerUser(e) {
    e.preventDefault()
    this.error = null
    const {email: {value: email}, password: {value: password}, altPassword: {value: altPassword}} = e.target

    const [valid, reason] = this.testPassword(password, altPassword)
    if (!valid) {
      this.error = reason
      return
    }


  }
}

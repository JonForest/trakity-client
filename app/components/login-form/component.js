import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  @action
  login() {
    alert('logging in')
  }
}

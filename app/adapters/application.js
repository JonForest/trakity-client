import DS from 'ember-data';
import { tracked } from '@glimmer/tracking';

export default class ApplicationAdapter extends DS.JSONAPIAdapter {
  // todo: user authorisation service to fetch access token
  @tracked headers

  constructor() {
    super(...arguments)
    // mock
    this.authorisation = {
      accessToken: 123
    }
    this.headers = {
      Authorization: `Bearer ${this.authorisation.accessToken}`
    }
  }

  // handleResponse(status, headers, payload, requestData) {
  //   //todo: what happens when the access token has expired goes here
  //   super.handleResponse(...arguments)
  // }
}

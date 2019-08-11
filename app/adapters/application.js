import DS from 'ember-data';
import { tracked } from '@glimmer/tracking'
import { inject as service } from '@ember/service';
import config from '../config/environment'

export default class ApplicationAdapter extends DS.JSONAPIAdapter {
  // todo: user authorisation service to fetch access token
  @tracked headers
  @service router


  constructor() {
    super(...arguments)
    // mock
    this.host = config.apiHost
    this.authorisation = {
      accessToken: 123
    }
    this.headers = {
      Authorization: `Bearer ${this.authorisation.accessToken}`
    }
  }

  handleResponse(status, headers, payload, requestData) {
    //todo: what happens when the access token has expired goes here
    debugger
    if (status === 401) {
      // User is unauthenticated, redirect to the login page
      this.router.transitionTo('login')
    }
    return super.handleResponse(...arguments)
  }
}

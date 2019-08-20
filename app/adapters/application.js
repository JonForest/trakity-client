// import DS from 'ember-data';
// import { tracked } from '@glimmer/tracking'
// import { inject as service } from '@ember/service';
// import config from '../config/environment'
//
// export default class ApplicationAdapter extends DS.JSONAPIAdapter {
//   // todo: user authorisation service to fetch access token
//   @service router
//   @service authenticate
//
//   // @tracked authenticate.accessToken
//   @tracked headers
//
//
//   constructor() {
//     super(...arguments)
//     this.host = config.apiHost
//   }
//
//   get headers() {
//     console.log('headers called')
//     return {
//       Authorization: `Bearer ${this.authenticate.accessToken}`
//     }
//   }
//
//   handleResponse(status, headers, payload, requestData) {
//     //todo: what happens when the access token has expired goes here
//     debugger
//     if (status === 401) {
//       // User is unauthenticated, redirect to the login page
//       this.router.transitionTo('login')
//     }
//     return super.handleResponse(...arguments)
//   }
// }

// todo: Switch back to class syntax at some point when it might work. For now, this does a job
import DS from 'ember-data'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import config from '../config/environment'

export default DS.JSONAPIAdapter.extend({
  authenticate: service(),
  router: service(),

  init() {
    this._super(...arguments);
    this.set('host', config.apiHost)
  },

  headers: computed(function() {
    return {
      'Authorization': `Bearer ${this.authenticate.getAccessToken()}`
    }
  }).volatile(),

  handleResponse(status, headers, payload, requestData) {
    if (status === 401) {
      // User is unauthenticated, redirect to the login page
      this.router.transitionTo('login')
    }
    return this._super(...arguments)
  }
});

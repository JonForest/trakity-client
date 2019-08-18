import Service from '@ember/service'
import fetch from 'fetch'
import config  from '../config/environment'
import { restartableTask } from 'ember-concurrency-decorators'
import { tracked } from '@glimmer/tracking'
/**
 * This is not a valid OAuth2 implementation.
 * For that, we would need to head off to another service to auth and receive an access token and a session cookie
 * Before timing out, the site would need to redirect to the auth service and receive another access token
 * The web should not hold refresh tokens.
 * The method of handling this Silent Auth (https://auth0.com/docs/api-auth/tutorials/silent-authentication) within
 * PWAs is generally with an iframe
 *
 * Note: think this process will take a few more iterations as I figure out how to integrate with Google and an
 * owned centralised service
 */
export default class AuthenticateService extends Service {
  @tracked accessToken

  @restartableTask
  login = function * (email, password) {
    const response = yield fetch(`${config.apiHost}/auth/token`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status >= 200 && response.status < 300) {
      const result = yield response.json()
      this.accessToken = result.data.access
      // Write to the local storage
      window.localStorage.setItem('accessToken', this.accessToken)
    } else {
      // Login failed
      window.localStorage.removeItem('accessToken')
      throw new Error(`Login failed for reason: ${response.statusText}`)
    }
  }

  getAccessToken() {
    if (!this.accessToken) this.accessToken = window.localStorage.getItem('accessToken')
    return this.accessToken
  }
}

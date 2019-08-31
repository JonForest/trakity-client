/* global gapi */
/* https://developers.google.com/identity/protocols/OAuth2UserAgent */
import Service from '@ember/service';
import { getEndOfDay, getStartOfDay } from '../utils/date-funcs'


export default class GapiInterfaceService extends Service {
  ERROR_STATES = {
    "NO_GAPI": "gapi not present",
    "LOAD_FAILED": "Failed to load client library",
    "CLIENT_INIT_FAILED": "Failed to initialise the client"
  }

  _SCOPE = 'https://www.googleapis.com/auth/calendar.events'
  _GoogleAuth = null

  _isUserLoggedIn() {
    const user = this._GoogleAuth.currentUser.get()
    return user.hasGrantedScopes(this._SCOPE)
  }

  initGapi(completeCb, failureCb) {
    if (typeof gapi === 'undefined' || !gapi) return failureCb(this.ERROR_STATES.NO_GAPI)

    gapi.load('client', {
      callback: this.initGapiClient.bind(this, completeCb, failureCb),
      onError: (err) => {
        // eslint-disable-next-line no-console
        console.error(err)
        failureCb(this.ERROR_STATES.LOAD_FAILED)
      }
    })
  }

  initGapiClient(completeCb, failureCb) {
    if (typeof gapi === 'undefined' || !gapi) return failureCb(this.ERROR_STATES.NO_GAPI)

    gapi.client.init({
      'apiKey': 'AIzaSyCaPHpTlncnW2InRJDRRz8OrdpyFIhr3-A',
      'clientId': '736957908143-q5c3ci3gmrr6j47cq0a0us4l4of5m740.apps.googleusercontent.com',
      'scope': this._SCOPE,
      'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    }).then(() => {
      this._GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      this._GoogleAuth.isSignedIn.listen(this.updateSigninStatus.bind(this, completeCb));

      completeCb(this._isUserLoggedIn())
    }).catch(() => {
      failureCb(this.ERROR_STATES.CLIENT_INIT_FAILED)
    });
  }

  login(completeCb, failiureCb) {
    if (!this._GoogleAuth) {
      failiureCb(new Error('No Google Auth process initiated before calling login'))
    }
    if (this._GoogleAuth.isSignedIn.get()) {
      // eslint-disable-next-line no-console
      console.log('Signing out')
      this._GoogleAuth.signOut()
    } else {
      // eslint-disable-next-line no-console
      console.log('Signing in')
      this._GoogleAuth.signIn()
    }
    completeCb()
  }

  updateSigninStatus(notifyChangeCb, signedIn) {
    notifyChangeCb(signedIn)
  }

  async fetchEvents(dayDate = new Date()) {
    try {
      // https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.events.list
      // or the less good https://developers.google.com/calendar/v3/reference/
      const { result: { items } } = await gapi.client.calendar.events.list({
        'calendarId': 'primary', // can use user's email
        'timeMin': getStartOfDay(dayDate).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        // 'maxResults': 10,
        'timeMax': getEndOfDay(dayDate).toISOString(),
        'orderBy': 'startTime'
      })
      return items
    } catch (e) {
      // For now, just propagate up the error
      throw e
    }

  }
}

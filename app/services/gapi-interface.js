/* global gapi */
/* https://developers.google.com/identity/protocols/OAuth2UserAgent */
import Service from '@ember/service';

export default class GapiInterfaceService extends Service {
  ERROR_STATES = {
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
    gapi.load('client', {
      callback: this.initGapiClient.bind(this, completeCb, failureCb),
      onError: (err) => {
        debugger
        failureCb(this.ERROR_STATES.LOAD_FAILED)
      }
    })
  }

  initGapiClient(completeCb, failureCb) {
    gapi.client.init({
      'apiKey': 'AIzaSyCaPHpTlncnW2InRJDRRz8OrdpyFIhr3-A',
      'clientId': '736957908143-q5c3ci3gmrr6j47cq0a0us4l4of5m740.apps.googleusercontent.com',
      'scope': this._SCOPE,
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
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
      alert('How did you get here with no google Auth')
    }
    if (this._GoogleAuth.isSignedIn.get()) {
      console.log('Signing out')
      this._GoogleAuth.signOut()
    } else {
      console.log('Signing in')
      this._GoogleAuth.signIn()
    }
  }

  updateSigninStatus(notifyChangeCb, signedIn) {
    console.log('signed in status changed')
    notifyChangeCb(signedIn)
  }
}

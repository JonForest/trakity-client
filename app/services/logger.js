import Service from '@ember/service';


export default class Logger extends Service {
  error(errMessage) {
    console.error(errMessage)
  }
}

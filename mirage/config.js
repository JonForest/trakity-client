import config from '../config/environment'

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */

  this.urlPrefix = config.apiHost

  // todo: use the ENV vars here, or something
  this.get('/tasks', (schema, request) => {
    checkHeaders(request)
    return schema.tasks.all()
  })


  this.patch('/tasks/:id');

  this.post('/tasks');

  this.delete('/tasks/:id')

  this.post('/auth/token', (schema, request) => {
    return {data: {accessToken: '12345'}}
  })

  this.passthrough();
}


function checkHeaders(request) {
  if (!(request.requestHeaders && request.requestHeaders.authorization)) {
    throw new Error('Missing Authorization header')
  }
}


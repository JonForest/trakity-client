import Route from '@ember/routing/route';


export default class DashboardRoute extends Route {

  model () {
    return this.store.findAll('task').then(tasks => tasks.toArray())
  }
}

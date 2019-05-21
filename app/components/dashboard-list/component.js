import Component from '@glimmer/component';

export default class TaskComponent extends Component {

  get completedTasks() {
    return this.args.tasks.filter(task => task.completedAt != null)
  }

  get uncompletedTasks() {
    return this.args.tasks.filter(task => task.completedAt == null)
  }
}

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TasksManagerComponent extends Component {
  @service store
  @tracked tasks


  constructor() {
    super(...arguments)
    // Only create a task in the primary list
    this.tasks = this.args.tasks.slice(0)
    this._addNewTask()
  }

  _addNewTask() {
    if (this.tasks.filter(task => !task.id).length === 0) {
      this.tasks.push(this.store.createRecord('task'))
    }
  }

  /**
   * @param task {Object} - Ember Data Model _or_ an Ember ChangeSet. Both have the same `save` API
   * @returns {Promise<void>}
   */
  @action
  async saveTask(task) {
    try {
      await task.save();
      this._addNewTask()
    } catch (e) {
      task.rollbackAttributes()
    }
    this.tasks = this.tasks
  }

  @action removeTask(task) {
    let taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
    this._addNewTask()
    this.tasks = this.tasks
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { inject as service } from '@ember/service';

export default class TaskList extends Component {
  @service store

  constructor() {
    super(...arguments)
    // Only create a task in the primary list
    if (this.args.primary) this.args.tasks.push(this.store.createRecord('task'))
  }

  get completedTasks() {
    return this.args.tasks.filter(task => task.completedAt != null)
  }

  get uncompletedTasks() {
    return this.args.tasks.filter(task => task.completedAt == null)
  }

  get uncompletedTaskCount() {
    return this.uncompletedTasks.filter(task => !!task.id).length
  }

  _addNewTask() {
    if (this.uncompletedTasks.filter(task => !task.id).length === 0) {
      this.args.tasks.push(this.store.createRecord('task'))
    }
  }

  @action
  async completeTask(task, isComplete) {
    // Need .set as an Ember Data model
    const rollbackSetting = task.completedAt
    task.set('completedAt', isComplete ? new Date() :  null)

    try {
      await this.saveTask(task)
    } catch (e) {
      console.error(e)
      // Save failed. Reset the value and reverse the animation
      task.set('completedAt', rollbackSetting)
    }
  }

  /**
   * @param task {Object} - Ember Data Model _or_ an Ember ChangeSet. Both have the same `save` API
   * @returns {Promise<void>}
   */
  @action
  async saveTask(task) {

    await task.save();
    this._addNewTask()
  }

  @action removeTask(task) {
    let taskIndex = this.args.tasks.indexOf(task);
    this.args.tasks.splice(taskIndex, 1);
    this._addNewTask()
  }


  //eslint-disable-next-line require-yield
  * transition({ insertedSprites, removedSprites, keptSprites, sentSprites, receivedSprites }) {
    /**
     * The transition function for handling adding, removing, completing and uncompleting tasks
     * Completed/uncompleted - animate between the lists
     * New - Fade in
     * Deleted - Fade out
     */

      // // If a task is added
      // for (let sprite of insertedSprites) {
      //   fadeIn(sprite);
      // }

    for (let sprite of removedSprites) {
      //todo: want to yield this, but need to control the animations in the other list somehow
      fadeOut(sprite)
    }

    keptSprites.forEach(sprite => {
      move(sprite);
    });

    for (let sprite of sentSprites) {
      move(sprite);
    }

    for (let sprite of sentSprites) {
      sprite.moveToFinalPosition();
    }
  }

}

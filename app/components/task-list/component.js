import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { parallel } from 'ember-animated';
import compensateForScale from 'ember-animated/motions/compensate-for-scale';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';

export default class TaskList extends Component {
  @tracked tasks

  constructor() {
    super(...arguments)
    this.tasks = [...this.args.tasks]
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completedAt != null)
  }

  get uncompletedTasks() {
    return this.tasks.filter(task => task.completedAt == null)
  }

  @action
  async completeTask(task, isComplete) {
    // Need .set as an Ember Data model
    const rollbackSetting = task.completedAt
    task.set('completedAt', isComplete ? new Date() :  null)

    // Need to set back to itself to trigger the setter and the animation
    // Note, triggering this before the save so there is no delay on the animation while the save happens.
    this.tasks = this.tasks

    try {
      await task.save()
    } catch (e) {
      console.error(e)
      // Save failed. Reset the value and reverse the animation
      task.set('completedAt', rollbackSetting)
      this.tasks = this.tasks
    }

  }


  * transition({ insertedSprites, removedSprites, keptSprites, sentSprites, receivedSprites }) {
    /**
     * The transition function for handling adding, removing, completing and uncompleting tasks
     * Completed/uncompleted - animate between the lists
     * New - Fade in
     * Deleted - Fade out
     */

      // If a task is simply deleted
      // for (let sprite of removedSprites) {
      //   fadeOut(sprite);
      // }
      //
      // // If a task is added
      // for (let sprite of insertedSprites) {
      //   fadeIn(sprite);
      // }


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

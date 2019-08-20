import Component from '@glimmer/component';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import { fadeOut } from 'ember-animated/motions/opacity';
import { inject as service } from '@ember/service';
// import { wait } from 'ember-animated';

export default class TaskList extends Component {
  @service store

  get completedTasks() {
    return this.args.tasks.filter(task => task.completedAt != null)
  }

  get uncompletedTasks() {
    return this.args.tasks.filter(task => task.completedAt == null)
  }

  get uncompletedTaskCount() {
    return this.uncompletedTasks.filter(task => !!task.id).length
  }

  @action
  async completeTask(task, isComplete) {
    // todo: why does this need a separate rollback setting?
    // Need .set as an Ember Data model
    const rollbackSetting = task.completedAt
    task.set('completedAt', isComplete ? new Date() :  null)

    try {
      await this.args.saveTask(task)
    } catch (e) {
      console.error(e)
      // Save failed. Reset the value and reverse the animation
      task.set('completedAt', rollbackSetting)
    }
  }

  //eslint-disable-next-line require-yield
  * transition({ duration, removedSprites, keptSprites, sentSprites/*, insertedSprites, receivedSprites */}) {
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
      fadeOut(sprite, { duration: duration / 4})
    }

    for (let sprite of keptSprites) {
      move(sprite, { duration: duration * (3/4)});
      // todo: Want to yield this also, but need to control animations in the other list
      // yield wait(75);
    }

    for (let sprite of sentSprites) {
      move(sprite);
    }

    for (let sprite of sentSprites) {
      sprite.moveToFinalPosition();
    }
  }

}

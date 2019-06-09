import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default class Task extends Component {
  @service store

  @tracked isEditingTask = false
  @tracked showDetail = false
  @tracked editTask
  @tracked minimalEdit
  detailTextArea

  constructor() {
    super(...arguments)
    this.isEditingTask = this.minimalEdit = !this.args.task.id
  }

  @action
  async saveTask() {
    await this.args.saveTask()
    this.isEditingTask = false;
    this.minimalEdit = false;
  }


  @action
  toggleShowDetail() {
    this.showDetail = !this.showDetail
  }

  @action
  toggleEditTask() {
    if (this.isEditingTask) {
      // If editing a task and toggling to not editing, rollback any unsaved attributes
      this.args.task.rollbackAttributes()
      if (this.args.task.isDeleted) {
        this.args.removeTask();
        return;
      }
    }


    this.isEditingTask = !this.isEditingTask
  }

  @action
  async onKeyDown(e) {
    if (e.key === 'Enter') {
      this.updateTask('description', e)
      await this.saveTask();
    } else if (e.key === 'Tab') {
      e.preventDefault()
      this.updateTask('description', e)
      this.minimalEdit = false;

      next(this, () => {
        this.detailTextArea.focus()
      })
    }
  }

  @action
  updateTask(taskProperty, e) {
    this.args.task[taskProperty] = e.target.value
  }

   *resize ({ insertedSprites, removedSprites, keptSprites }) {
    insertedSprites.forEach(sprite => {
      resize(sprite, { fromHeight: 0 });
    });
    removedSprites.forEach(sprite => {
      resize(sprite, { toHeight: 0 });
    });
    keptSprites.forEach(sprite => {
       // this one needs no args because it already has a natural
       // initial and final size. This case comes up if you interrupt
       // a running animation.
       resize(sprite);
    });
  }


}

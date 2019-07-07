import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { getStartOfDay } from '../../utils/date-funcs'
import Changeset from 'ember-changeset'


export default class Task extends Component {
  @service store

  @tracked isEditingTask = false
  @tracked showDetail = false
  @tracked editTask
  @tracked minDate = getStartOfDay(new Date())
  detailTextArea

  constructor() {
    super(...arguments)
    this.isEditingTask = !this.args.task.id
    if (this.isEditingTask) {
      this.editTask = new Changeset(this.args.task)
    }
    if (this.args.task.id == null) {
      // Delay this, as animations need to take place for this new element to be ready
      later(this, () => {
        this.descriptionInput.focus()
      }, 300)
    }
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

  @action
  async saveTask() {
    await this.args.saveTask(this.editTask)
    this.toggleEditTask()
  }


  @action
  toggleShowDetail() {
    this.showDetail = !this.showDetail
  }

  @action
  toggleEditTask() {
    // When this is a new task, clicking on the edit icon collapses between description only or showing all properties
    if (!this.args.task.id) {
      this.showDetail = !this.showDetail
      return
    }

    if (this.isEditingTask) {
      // If editing a task and toggling to not editing, rollback any unsaved attributes
      // this.args.task.rollbackAttributes()
      // if (this.args.task.isDeleted) {
      //   this.args.removeTask();
      //   return;
      // }
      this.editTask = null
    } else {
      // Moving from non-editing to editing, create a working copy of the task
      this.editTask = new Changeset(this.args.task)
    }

    this.isEditingTask = this.showDetail = !this.isEditingTask
  }


  @action
  async onKeyDown(e) {
    if (e.key === 'Enter') {
      this.updateTask('description', e)
      await this.saveTask();
    } else if (e.key === 'Tab') {
      e.preventDefault()
      this.updateTask('description', e)
      this.showDetail = true

      // Once the text area is drawn, add the focus
      later(this, () => {
        this.detailTextArea.focus()
      }, 50) // Need some repainting to have finished
    }
  }

  @action
  updateTask(taskProperty, e) {
    this.args.task[taskProperty] = e.target.value
  }

  @action
  async deleteTask() {
    await this.args.task.destroyRecord()
    // todo: thing this would be better to explicitly pass in the task rather than curry it earlier
    this.args.removeTask();
  }

  @action
  selectDate([date]) {
    this.editTask.set('startDate', date)
    // this.editTask.startDate = date
  }

  @action
  selectCalendar() {
    debugger
  }
}

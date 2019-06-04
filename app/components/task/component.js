import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';

export default class Task extends Component {
  @tracked isEditingTask = false
  @tracked showDetail = false

  constructor() {
    super(...arguments)
    // todo: keep this in for when I can get animated-if working
    // this.resize = resize
  }

  @action
  toggleShowTask() {
    this.taskExpanded = !this.taskExpanded
  }

  @action
  toggleEditTask() {
    this.isEditingTask = !this.isEditingTask
    if (!this.isEditingTask) this.temporaryTask = {}
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

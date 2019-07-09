import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { inject as service } from '@ember/service';


function convertModelToEvent(taskModel) {
  const { id, description: title, startDate: start, endDate: end } = taskModel
  const classNames = taskModel.completedAt ? 'bg-grey' : 'bg-blue'
  return { id, title, start, end, classNames }
}

export default class CalendarDayComponent extends Component {
  @service store
  //As the next action, really need to think through this workflow
  // - How can we drag tasks onto the calendar?
  // - Do we really want to render _all_ tasks in the calendar (might be okay tbh
  //    - especially as the default is to _not_ display on the calendar)
  // - What happens if we click on a task in the calendar and want to edit it, how does the UI behave?

  get calendarEvents() {
    return this.args.tasks.filter(task => task.onCalendar).map(convertModelToEvent)
  }

  _renderEvents(info, successCb) {
    successCb(this.calendarEvents)
  }

  /**
   * Callback function of the drag and resize events from the calendar
   * @param event - the post-action event object model
   */
  _saveTask({ event } ) {
    const { id, start, end } = event
    const task = this.store.peekRecord('task', id)
    task.startDate = start
    task.endDate = end
    this.args.saveTask(task)
  }

  @action
  addCalendar(element) {
    this.calendar = new Calendar(element, {
      plugins: [ timeGridPlugin, interactionPlugin ],
      defaultView: 'timeGridDay',
      events: this._renderEvents.bind(this),
      editable: true,
      startEditable: true,
      durationEditable: true,
      snapDuration: { minutes: 10 },
      eventDrop: this._saveTask.bind(this),
      eventResize: this._saveTask.bind(this)
    })

    this.calendar.render();
  }

  @action
  updateEvents() {
    this.calendar.refetchEvents()
  }
}

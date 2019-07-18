import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { inject as service } from '@ember/service';


function convertModelToEvent(taskModel) {
  const { id, description: title, startDate: start, endDate: end } = taskModel
  const classNames = taskModel.completedAt ? 'bg-grey' : 'bg-blue'
  return { id, title, start, end, classNames }
}

function convertGoogleEventToEvent(gEvent) {
  const { id, summary: title, start: {dateTime: start}, end: {dateTime: end}} = gEvent
  const classNames = 'bg-red-darker border-red-darker'
  return { id, title, start, end, classNames }
}

export default class CalendarDayComponent extends Component {
  @service store
  @service gapiInterface

  @tracked initialiseGapi = false
  @tracked isGoogleAuthorised = false
  _googleCalendarEvents = []
  //As the next action, really need to think through this workflow
  // - How can we drag tasks onto the calendar?
  // - Do we really want to render _all_ tasks in the calendar (might be okay tbh
  //    - especially as the default is to _not_ display on the calendar)
  // - What happens if we click on a task in the calendar and want to edit it, how does the UI behave?


  constructor() {
    super(...arguments)
    this.gapiInterface.initGapi(this.initialiseGapiComplete.bind(this), this.showErrors.bind(this))

  }

  async initialiseGapiComplete(isAuthorised) {
    this.initialiseGapi = true;
    this.isGoogleAuthorised = isAuthorised
    if (isAuthorised) {
      this._googleCalendarEvents = await this.gapiInterface.fetchEvents()
      this.calendar.refetchEvents()
    }
  }

  showErrors(message) {
    alert(message)
  }

  get calendarEvents() {
    return this.args.tasks.filter(task => task.onCalendar).map(convertModelToEvent)
  }

  get googleCalendarEvents() {
    const events =  this._googleCalendarEvents.reduce((acc, event) => {
      // Note: All day events may cause a problem?
      acc.push(convertGoogleEventToEvent(event))
      return acc
    }, [])
    return events
  }

  _renderEvents(info, successCb) {
    successCb(this.calendarEvents.concat(this.googleCalendarEvents))
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
      height: () => window.innerHeight - 100,
      events: this._renderEvents.bind(this),
      editable: true,
      startEditable: true,
      durationEditable: true,
      snapDuration: { minutes: 10 },
      eventDrop: this._saveTask.bind(this),
      eventResize: this._saveTask.bind(this),
      datesRender: async ({ view }) => {
        // On first render, this will run before the google account is initialised and authorised
        if (this.initialiseGapi && this.isGoogleAuthorised) {
          this._googleCalendarEvents = await this.gapiInterface.fetchEvents(view.activeStart)
          this.calendar.refetchEvents()
        }
      }
    })

    this.calendar.render();
  }

  @action
  updateEvents() {
    this.calendar.refetchEvents()
  }

  @action
  googleLogin() {
    this.gapiInterface.login(() => alert('success'), () => alert('failure'))
  }
}

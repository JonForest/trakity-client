import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { tracked } from '@glimmer/tracking';


function convertModelToEvent(taskModel) {
  const { id, description: title, startDate: start, endDate: end } = taskModel
  return { id, title, start, end }
}

export default class CalendarDayComponent extends Component {
  //As the next action, really need to think through this workflow
  // - How can we drag tasks onto the calendar?
  // - Do we really want to render _all_ tasks in the calendar (might be okay tbh
  //    - especially as the default is to _not_ display on the calendar)
  // - What happens if we click on a task in the calendar and want to edit it, how does the UI behave?

  @tracked calendarEvents

  constructor() {
    super(...arguments)
    this.calendarEvents = this.args.tasks.filter(task => task.onCalendar).map(convertModelToEvent)
  }

  @action
  addCalendar(element) {
    this.calendar = new Calendar(element, {
      plugins: [ timeGridPlugin ],
      defaultView: 'timeGridDay',
      events: this.calendarEvents
    })

    this.calendar.render();
  }
}

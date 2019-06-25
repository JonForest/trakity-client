import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

export default class CalendarDayComponent extends Component {

  @action
  addCalendar(element) {
    this.calendar = new Calendar(element, {
      plugins: [ timeGridPlugin ],
      defaultView: 'timeGridDay'
    })

    this.calendar.render();
  }
}

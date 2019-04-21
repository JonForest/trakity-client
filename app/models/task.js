import DS from 'ember-data';
const { Model, attr } = DS;

export default class TaskModel extends Model {
  @attr description;
  @attr detail;
  @attr targetDate;
  @attr completedAt;
  @attr onCalendar;
}

// export default DS.Model.extend({
//   description: DS.attr(),
//   detail: DS.attr(),
//   targetDate: DS.attr(),
//   completedAt: DS.attr(),
//   onCalendar: DS.attr()
// });

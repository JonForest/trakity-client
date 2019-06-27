import DS from 'ember-data';
import { getStartOfDay } from '../utils/date-funcs'
const { Model, attr } = DS;

export default class TaskModel extends Model {
  @attr('string') description;
  @attr('string') detail;
  @attr('date', {defaultValue: () => getStartOfDay(new Date())}) startDate;
  @attr('date', {defaultValue: null}) endDate;
  @attr('date') completedAt;
  @attr('number') priority;
  @attr('boolean', {defaultValue: false}) onCalendar;
}

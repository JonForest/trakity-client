import DS from 'ember-data';
import { getStartOfDay } from '../utils/date-funcs'
const { Model, attr } = DS;

export default class TaskModel extends Model {
  @attr('string') description;
  @attr('string') detail;
  @attr('date', {defaultValue: () => getStartOfDay(new Date())}) targetDate;
  @attr('string') duration;
  @attr('date') completedAt;
  @attr('number') priority;
  @attr('boolean', {defaultValue: false}) onCalendar;
}

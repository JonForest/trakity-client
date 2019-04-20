import DS from 'ember-data';
const { Model, attr } = DS;

export default class TaskModel extends Model {
  @attr description;
  @attr detail;
  @attr targetDate;
  @attr targetTime;
  @attr completedAt;
}

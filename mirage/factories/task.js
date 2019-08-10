import { Factory } from 'ember-cli-mirage'
import faker from 'faker'

export default Factory.extend({
  description() {
    return faker.lorem.words(5)
  },
  detail() {
    return Math.random() <= 0.5
      ? faker.lorem.paragraph()
      : null
  },
  startDate() {
    const today = new Date()
    const plusDate = Math.floor(Math.random() * 7)
    return new Date(today.setDate(today.getDate() + plusDate))
  },
  priority() {
    // Return half as null, and half with a random numeric priority between 1 - 100
    return Math.random() <= 0.5
      ? Math.floor(Math.random() * 100) + 1
      : null
  },
  completedAt() {
    return Math.random() <= 0.75
      ? null
      : new Date()
  },
  onCalendar() {
    return true //Math.random() >= .5
  },
  endDate () {
    return this.onCalendar && this.startDate ? new Date(this.startDate.getTime() + 30*60000) : null
  }
});

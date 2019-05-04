import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  description() {
    return faker.lorem.words(5)
  },
  detail() {
    return faker.lorem.paragraph()
  },
  targetDate() {
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
  completedAt: null,
  onCalendar: false
});

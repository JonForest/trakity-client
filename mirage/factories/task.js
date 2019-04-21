import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  description() {
    return faker.lorem.words(5)
  },
  detail() {
    return faker.lorem.paragraph()
  },
  targetDate() {
    return new Date()
  },
  completedAt: null,
  onCalendar: false
});

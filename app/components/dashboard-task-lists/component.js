import Component from '@glimmer/component';
import {filterTasksByQueryKey} from '../../utils/filter-tasks'

export default class DashboardTaskLists extends Component {
  get today() {
    return filterTasksByQueryKey(this.args.tasks, 'TODAY')
  }

  get tomorrow () {
    return filterTasksByQueryKey(this.args.tasks, 'TOMORROW')
  }

  get restOfWeek() {
    return filterTasksByQueryKey(this.args.tasks, 'REST_OF_WEEK')
  }

  get nextWeek() {
    return filterTasksByQueryKey(this.args.tasks, 'NEXT_WEEK')
  }
}

import Component from '@glimmer/component';
import { filterTasksByQueryKey } from '../../utils/filter-tasks'

export default class DashboardTaskListsComponent extends Component {

  get todaysTasks() {
    return filterTasksByQueryKey(this.args.tasks, 'TODAY')
  }
}

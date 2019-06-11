import { helper } from '@ember/component/helper';
import paths from '../utils/icon-paths'

export default helper(function getIcon([key]/*, hash*/) {
  return paths[key]
});

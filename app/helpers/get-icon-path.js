import { helper } from '@ember/component/helper';
import iconPaths from '../utils/icon-paths'

export default helper(function getIconPath([key]/*, hash*/) {
  return iconPaths[key]
});

import { useRoute, useRouter } from 'vue-router'

import goToRegion from './goto-region.js'

import branches from 'config/branches.js'


export default () => {
  const branch = useRoute().params.branch
  const defaultRegion = Object.keys(branches[branch].regions)[0]
  goToRegion(defaultRegion)
}

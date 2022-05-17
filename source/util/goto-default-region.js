import { useRoute, useRouter } from 'vue-router'

import branches from 'config/branches.js'


export default () => {
  const branch = useRoute().params.branch
  const defaultRegion = Object.keys(branches[branch].regions)[0]

  useRouter().push({
    name: useRoute().name,
    params: {
      branch,
      region: defaultRegion
    }
  })
}

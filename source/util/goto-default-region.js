import { useRoute, useRouter } from 'vue-router'

import macrobranches from 'config/branches.js'


export default () => {
  const macrobranch = useRoute().params.macrobranch
  
  const branches = macrobranches[macrobranch].branches
  const defaultBranch = Object.keys(branches)[0]

  useRouter().push({
    name: useRoute().name,
    params: {
      macrobranch: macrobranch,
      region: defaultBranch
    }
  })
}

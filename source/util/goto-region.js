import { useRoute, useRouter } from 'vue-router'


export default async (region) =>
    await useRouter().push({
      name: useRoute().name,
      params: {
        branch: useRoute().params.branch,
        region
      }
    })

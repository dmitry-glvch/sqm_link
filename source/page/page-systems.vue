<template>
  <div class="container">

    <h2>Инфосистемы</h2>

    <div class="system-list-card">
      <system-link
          path="https://vk.com"
          label="Лол"
          hint="Мамку ебал"
          info="https://google.com"
          :details="[ 'kek' ]"/>
      <system-link
          path="https://vk.com"
          label="BWP"
          :details="[
            { type: 'login', value: 'sz-otpkk' },
            { type: 'password', value: 'Vavbyun2' }
          ]"/>
      <system-link
          path="https://vk.com"
          label="MRTG"
          info="https://google.com"
          hint="dibun edition"/>
      <system-link path="https://vk.com" label="Аргус"/>
      <system-link path="https://vk.com" label="ЕСУЗ"/>
      <system-link path="https://vk.com" label="Гермес"/>
      <system-link path="https://vk.com" label="Axiros SBA"/>
    </div>

  </div>
</template>


<script setup>
import SystemLink from 'component/systems/system-link.vue'

import gotoToDefaultRegion from 'util/goto-default-region.js'


const props = defineProps({
  macrobranch: String,
  region: String
})

!(props.region?.length > 0) && gotoToDefaultRegion()


</script>


<style scoped lang="scss">
.system-list-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: start;
}
</style>

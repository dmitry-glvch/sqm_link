<template>
  <div class="container">

    <h2>Конфигуратор</h2>
    <region-navbar
        class="region-navbar"
        :regions="navbarRegions"/>

    <div class="selected-config">
      <info-card
          v-for="(equipment, group) in selectedCredentials"
          :key="group"
          :title="group"
          :equipment="equipment"/>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import RegionNavbar from 'component/region-navbar/region-navbar.vue'
import InfoCard from 'component/configurator/info-card.vue'

import gotoToDefaultRegion from 'util/goto-default-region.js'

import credentials from 'config/configurator/configurator.js'


const branch = computed(() => useRoute().params.branch)
const region = computed(() => useRoute().params.region)

const branchCredentials = computed(() =>
    credentials[branch.value])

!(region.value?.length > 0) && gotoToDefaultRegion()


const navbarRegions = computed(() =>
    Object.fromEntries(
        Object.entries(branchCredentials.value ?? {})
            .map(([ region, { label } ]) => [ region, label ])) )

const selectedCredentials = computed(
    () => branchCredentials.value?.[region.value]?.credentials)

console.log('selected', selectedCredentials.value)
</script>


<style lang="scss" scoped>
@use 'style/colors.scss';
@use 'style/fonts.scss';


.region-navbar {
  margin-bottom: 20px;
}

.selected-config {
  background: colors.$card-bg;
  border-radius: 4px;

  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

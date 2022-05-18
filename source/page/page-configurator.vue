<template>
  <div class="container">

    <h2>Конфигуратор</h2>
    <region-navbar class="region-navbar" :regions="regions"/>

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

import regions from 'config/configurator/regions.js'
import spb from 'config/configurator/spb.js'
import arkhangelsk from 'config/configurator/arkhangelsk.js'
import vologda from 'config/configurator/vologda.js'
import kaliningrad from 'config/configurator/kaliningrad.js'


const region = computed(() => useRoute().params.region)

!(region.value?.length > 0) && gotoToDefaultRegion()


const regionCredentials = {
  spb,
  arkhangelsk,
  vologda,
  kaliningrad
}

const selectedCredentials = computed(
    () => regionCredentials[region.value])
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

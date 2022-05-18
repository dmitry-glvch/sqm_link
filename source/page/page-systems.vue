<template>
  <div class="container">

    <h2>Инфосистемы</h2>
    <region-navbar class="navbar" :regions="navbarRegions"/>

    <div class="system-list">
      <system-link
          v-for="system in links"
          :key="system.path"
          :path="system.path"
          :label="system.label"
          :hint="system.hint"
          :info="system.info"
          :details="system.details"/>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import RegionNavbar from 'component/region-navbar/region-navbar.vue'
import SystemLink from 'component/systems/system-link.vue'

import gotoRegion from 'util/goto-region.js'

import northWest from 'config/systems/north-west.js'
import volga from 'config/systems/volga.js'


const systems = {
  'north-west': northWest,
  volga
}

const branch = computed(() => useRoute().params.branch)
const region = computed(() => useRoute().params.region)

const currentSystems = computed(() =>
    systems[branch.value])

!region.value && gotoRegion(Object.keys(currentSystems.value)[0])


const navbarRegions = computed(() =>
    Object.fromEntries(
        Object.entries(currentSystems.value)
            .map(([ region, { label } ]) => [ region, label ])) )

const links = computed(() =>
    currentSystems.value[region.value]?.links)
</script>


<style scoped lang="scss">
.container {
  .navbar {
    margin-bottom: 20px;
  }
  .system-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    align-items: start;
  }
}

</style>

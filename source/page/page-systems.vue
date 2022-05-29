<template>
  <div class="container" ref="container">

    <h2>Инфосистемы</h2>
    <region-navbar class="navbar" :regions="navbarRegions"/>

    <column-layout
        :column-count="columnCount"
        :items="links ?? []">
      <template v-slot:default="{item}">

      <system-link
          :path="item.path"
          :label="item.label"
          :hint="item.hint"
          :info="item.info"
          :details="item.details"/>

      </template>
    </column-layout>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { onMounted, onUpdated, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

import RegionNavbar from 'component/region-navbar/region-navbar.vue'
import ColumnLayout from 'layout/column-layout.vue'
import SystemLink from 'component/systems/system-link.vue'

import gotoRegion from 'util/goto-region.js'

import systems from 'config/systems/systems.js'


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


const container = ref(null)
const columnCount = ref(4)
const resizeListener = () =>
    columnCount.value =
        (container.value.clientWidth >= 1050) ? 4 :
        (container.value.clientWidth >= 700)  ? 3 : 2

onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
})
onUpdated(resizeListener)
onBeforeUnmount(() =>
    window.removeEventListener('resize', resizeListener))
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

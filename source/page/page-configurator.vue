<template>
  <div class="container">

    <h2>Конфигуратор</h2>
    <region-navbar
        class="region-navbar"
        :regions="navbarRegions"/>

    <div class="selected-config">
      <column-layout
          :column-count="2"
          :items="Object.entries(selectedCredentials ?? {})">
        <template v-slot:default="{item}">

        <info-card
            :key="item[0]"
            :title="item[0]"
            :equipment="item[1]"/>

        </template>
      </column-layout>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import RegionNavbar from 'component/region-navbar/region-navbar.vue'
import ColumnLayout from 'layout/column-layout.vue'
import InfoCard from 'component/configurator/info-card.vue'

import gotoDefaultRegion from 'util/goto-default-region.js'

import credentials from 'config/configurator/configurator.js'


const branch = computed(() => useRoute().params.branch)
const region = computed(() => useRoute().params.region)

const branchCredentials = computed(() =>
    credentials[branch.value])

!(region.value?.length > 0) && gotoDefaultRegion()


const navbarRegions = computed(() =>
    Object.fromEntries(
        Object.entries(branchCredentials.value ?? {})
            .map(([ region, { label } ]) => [ region, label ])) )

const selectedCredentials = computed(
    () => branchCredentials.value?.[region.value]?.credentials)
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
  grid-template-columns: 1fr 1fr;
}
</style>

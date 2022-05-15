<template>
  <div class="container">

    <h2>Конфигуратор</h2>

    <div class="config-selector">
      <nav>

        <router-link
            v-for="region in Object.entries(regions)"
            :to="`/configurator/${region[0]}`">
          {{ typo(region[1]) }}
        </router-link>

      </nav>
      <div class="config-selected-container">

        <info-card
            v-for="group in Object.keys(selectedCredentials)"
            :title="group"
            :equipment="selectedCredentials[group]"/>

      </div>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import InfoCard from 'component/configurator/info-card.vue'

import typo from 'util/typo.js'

import regions from 'config/configurator/regions.js'
import spb from 'config/configurator/spb.js'
import arkhangelsk from 'config/configurator/arkhangelsk.js'
import vologda from 'config/configurator/vologda.js'
import kaliningrad from 'config/configurator/kaliningrad.js'


const regionCredentials = {
  spb,
  arkhangelsk,
  vologda,
  kaliningrad
}

const selectedCredentials = computed(
    () => regionCredentials[useRoute().params.region])
</script>


<style lang="scss" scoped>
@use 'style/colors.scss';
@use 'style/fonts.scss';


.config-selector {
  background: colors.$card-bg;
  border-radius: 4px;

  nav {
    display: flex;
  }

  .config-selected-container {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .router-link-active {
    background-color: darken(colors.$config-select-tab-bg, 5);
    cursor: default;
  }

  a {
    text-decoration: none;
    display: inline-block;
    padding: 20px;
    flex: 1;
    text-align: center;
    background-color: colors.$config-select-tab-bg;
    transition: background-color 0.25s ease-out;
    color: colors.$config-select-tab-fg;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: darken(colors.$config-select-tab-bg, 5);
    }
    &:first-child {
      border-top-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
    }
  }
}
</style>


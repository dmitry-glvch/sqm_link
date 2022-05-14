<template>
  <div class="container">

    <h2>Конфигуратор</h2>

    <div class="config-selector">
      <nav>
        <a>СПБ и ЛО</a>
        <a class="config-tab-selected">Архангельск</a>
        <a>Вологда</a>
        <a>Калининград</a>
        <a>Карелия</a>
        <a>Коми</a>
        <a>Мурманск</a>
        <a>Новгород</a>
        <a>Псков</a>
      </nav>
      <div class="config-selected-container">

        <info-card
            v-for="group in Object.keys(arkhangelsk)"
            :title="group"
            :equipment="arkhangelsk[group]"/>

      </div>
    </div>

  </div>
</template>


<script setup>
import InfoCard from 'component/configurator/info-card.vue'

import arkhangelsk from 'config/configurator/arkhangelsk.js'
</script>


<style lang="scss">
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

  a {
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
    &.config-tab-selected {
      background-color: darken(colors.$config-select-tab-bg, 5);
      cursor: default;
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


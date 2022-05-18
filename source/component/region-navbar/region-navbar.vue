<template>
  <nav class="nav">

    <router-link
        v-for="(title, code) in regions"
        :key="code"
        class="region-link"
        :to="{
          name: useRoute().name,
          params: {
            branch: currentBranch,
            region: code
          }
        }">

      {{ typo(title) }}

    </router-link>

  </nav>
</template>


<script setup>
import { computed} from 'vue'
import { useRoute } from 'vue-router'

import typo from 'util/typo.js'


defineProps({
  regions: {
    type: Object,
    required: true
  }
})

const currentBranch = computed(
    () => useRoute().params.branch)
</script>


<style scoped lang="scss">
@use 'style/colors.scss';
@use 'style/sizes.scss';

.nav {

  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: baseline;

  .region-link {

    display: inline-block;
    box-sizing: border-box;
    border-radius: sizes.$default-border-radius;
    padding: 6px 10px;

    background-color: colors.$region-nav-link-bg;
    color: colors.$region-nav-link-fg;

    text-decoration: none;
    font-size: 1.05em;

    transition: background-color 0.4s ease-out;

    &:hover {
      background-color: colors.$region-nav-link-hover-bg
    }

    &.router-link-active {
      background-color: colors.$region-nav-link-active-bg;
      color: colors.$region-nav-link-active-fg;
      border: 2px solid colors.$region-nav-link-active-border;
      cursor: default;
      padding: 4px 8px;
    }

  }

}
</style>

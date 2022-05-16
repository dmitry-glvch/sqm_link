<template>
  <div class="system-link">

    <div class="top-row">
      <a class="hlink" :href="href">{{ typo(label) }}</a>
      <span v-if="hasContent" class="fa-solid fa-angle-down"></span>
    </div>
    
    <slot/>

  </div>
</template>


<script setup>
import { useSlots, Comment } from 'vue'
import typo from 'util/typo.js'

defineProps({
  href: String,
  label: String,
  collapsed: Boolean
})

const hasContent =
    useSlots().default?.()
        ?.find(({ type }) => type !== Comment) !== undefined
</script>


<style scoped lang="scss">
@use 'style/colors.scss';
@use 'style/fonts.scss';

.system-link {
  background: colors.$card-bg;
  border-radius: 4px;
  padding: 10px 14px;
  width: 20%;

  .top-row {
    display: flex;
    justify-content: space-between;
    .hlink {
      font-weight: fonts.$semibold-weight;
      text-decoration: none;
      flex-grow: 1;
    }
  }
}
</style>

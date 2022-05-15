<template>

  <button
      class="rectangle-input button"
      @click.prevent="action()">
    {{ typo(caption) }}
  </button>

</template>


<script setup>
import typo from 'util/typo.js'

defineProps({
  action: Function,
  caption: String
})
</script>


<style lang="scss" scoped>
@use 'style/sizes.scss';
@import './rectangle-input.scss';

.button {
  width: fit-content;
  min-width: sizes.$form-button-min-width;
  height: sizes.$form-button-height;
}
</style>

<template>

  <label class="label" :for="target">
    {{ typo(text) }}
  </label>

</template>


<script setup>
import typo from 'util/typo.js'

defineProps({
  target: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>


<style lang="scss">
@use 'style/colors.scss';
@use 'style/fonts.scss';

.label {
  color: colors.$form-input-label-fg;
  font-weight: fonts.$semibold-weight;
  box-sizing: border-box;
}

.label ~ * {
  margin-top: 4px;
}
</style>

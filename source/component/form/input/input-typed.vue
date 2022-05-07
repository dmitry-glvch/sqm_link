<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <input
      class="rectangle-input"
      ref="input"
      :name="requisite.id"
      :type="requisite.type"
      :placeholder="placeholderText"/>

</template>


<script setup>
import { ref } from 'vue'

import typo from '../typo.js'
import inputLabel from './input-label.vue'

const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const placeholderText = typo(props.requisite.hint ?? '')

const input = ref(null)

defineExpose({
  clear: () => input.value.value = '',
  value: () => input.value.value
})
</script>


<style lang="scss" scoped>
@import './rectangle-input.scss';
</style>

<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <select
      class="rectangle-input select"
      :name="requisite.id"
      :placeholder="requisite.hint ?? '' ">

    <option v-if="!hasDefault()"
        ref="defaultOption"
        hidden selected disabled/>

    <option
        v-for="option in normalizedOptions"
        :ref="option.default ? 'defaultOption' : null"
        :selected="option.default">
      {{ typo(option.display) }}
    </option>

  </select>

</template>


<script setup>
import { onMounted, ref } from 'vue'

import normalizeOption from '../normalize-option.js'
import typo from '../typo.js'
import inputLabel from './input-label.vue'


const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const hasDefault = () =>
    props.requisite.options.find(o => o.default)

const normalizedOptions = 
    props.requisite.options.map(normalizeOption)

const defaultOption = ref(null)

onMounted(() => {
  console.log(props.requisite.label, defaultOption)
})

defineExpose({
  clear: () => {
    if (Array.isArray(defaultOption.value)) {
      defaultOption.value[0].selected = true
    } else {
      defaultOption.value.selected = true
    }
  }
})
</script>


<style lang="scss" scoped>
@use 'style/colors.scss';
@import './rectangle-input.scss';

.select {
  border-right: 10px solid transparent;
  option {
    color: colors.$form-input-fg;
    background: colors.$form-input-bg;
  }
}
</style>

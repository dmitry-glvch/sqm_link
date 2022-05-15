<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <select
      class="rectangle-input select"
      ref="select"
      :name="requisite.id">

    <option v-if="!hasDefault()"
        ref="defaultOption"
        hidden selected disabled/>

    <option
        v-for="option in normalizedOptions"
        :ref="option.default ? 'defaultOption' : null"
        :data-templated-value="option.template"
        :selected="option.default">
      {{ typo(option.display) }}
    </option>

  </select>

</template>


<script setup>
import { ref } from 'vue'

import normalizeOption from '../normalize-option.js'
import typo from 'util/typo.js'
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
const select = ref(null)


defineExpose({
  clear: () => {
    if (Array.isArray(defaultOption.value))
      defaultOption.value[0].selected = true
    else
      defaultOption.value.selected = true
  },
  value: () => select.value
      .selectedOptions[0]
      .getAttribute('data-templated-value')
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

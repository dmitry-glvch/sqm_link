<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <select
      class="rectangle-input select"
      :name="requisite.id"
      :placeholder="requisite.hint ?? '' ">

    <option v-if="!hasDefault()"
        hidden selected disabled :data-default="true"/>

    <option
        v-for="option in normalizedOptions"
        :selected="option.default"
        :data-default="option.default">
      {{ typo(option.display) }}
    </option>

  </select>

</template>


<script setup>
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

<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <input
      class="rectangle-input"
      :name="requisite.id"
      :type="requisite.type"
      :placeholder="placeholderText"/>

</template>


<script setup>
import typo from '../typo.js'
import inputLabel from './input-label.vue'

const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const placeholderText = 
    props.requisite.hint ? typo(props.requisite.hint) : ''
</script>


<style lang="scss" scoped>
@import './rectangle-input.scss';
</style>

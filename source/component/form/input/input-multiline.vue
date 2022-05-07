<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <textarea
      class="rectangle-input multiline-input"
      :name="requisite.id"
      :placeholder="placeholderText"
      wrap="soft"/>

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

.multiline-input {
  min-height: 30px;
  resize: vertical;
}
</style>

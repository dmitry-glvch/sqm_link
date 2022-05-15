<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <textarea
      class="rectangle-input multiline-input"
      ref="input"
      :name="requisite.id"
      :placeholder="placeholderText"
      wrap="soft"
      v-bind="requisite.attrs"/>

</template>


<script setup>
import { ref } from 'vue'

import typo from 'util/typo.js'
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

.multiline-input {
  min-height: 30px;
  resize: vertical;
}
</style>

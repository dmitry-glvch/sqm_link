<template>
  <div
      :class="`input-${type} input-id-${inputId}`"
      :style="{ 'grid-area': inputId }">

    <component
        ref="input"
        :is="inputComponent"
        v-bind="{requisite}"/>

  </div>
</template>


<script setup>
import { ref } from 'vue'

import inputTyped from './input-typed.vue'
import inputMultiline from './input-multiline.vue'
import inputSelect from './input-select.vue'
import inputRadio from './input-radio.vue'
import inputCheckbox from './input-checkbox.vue'


const factories = {
  typed:     inputTyped,
  multiline: inputMultiline,
  select:    inputSelect,
  radio:     inputRadio,
  checkbox:  inputCheckbox
}

const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const type = props.requisite.input
const inputId = props.requisite.id
const inputComponent = factories[type]

const input = ref(null)

defineExpose({
  clear: () => input.value.clear(),
  value: () => input.value.value(),
  id:    () => inputId
})
</script>

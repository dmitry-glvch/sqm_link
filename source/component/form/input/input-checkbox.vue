<template>

  <label
      :for="requisite.id"
      data-for-checkbox
      @click.stop="toggle">
    
    <input
        type="checkbox"
        :name="requisite.id"
        :checked="checked"
        :data-default-state="requisite.state === 'checked' "
        :value="requisite.checked"
        @click.stop=""/>

    <div>{{ typo(requisite.label) }}</div>

  </label>

</template>


<script setup>
import { ref } from 'vue'

import typo from '../typo.js'


const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const checked = ref(props.requisite.state === 'checked')

const toggle = () => checked = !checked
</script>

<template>

  <label :for="requisite.id">
    {{ typo(requisite.label) }}
  </label>
  <br/>

  <label
      v-for="(option, i) in normalizedOptions"
      :for="`${requisite.id}_${i}`">

    <input
        :id="`${requisite.id}_${i}`"
        :name="requisite.id"
        type="radio"
        :value="option.template"
        :checked="option.default"
        :data-default="option.default"/>

    <div>{{ typo(option.display) }}</div>

  </label>

</template>


<script setup>
import normalizeOption from '../normalize-option.js'
import typo from '../typo.js'


const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const normalizedOptions = 
    props.requisite.options.map(normalizeOption)
</script>

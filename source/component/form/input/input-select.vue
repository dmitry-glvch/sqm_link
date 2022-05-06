<template>

  <label :for="requisite.id">
    {{ typo(requisite.label) }}
  </label>
  <br/>
  
  <select
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

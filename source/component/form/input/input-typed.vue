<template>

  <label :for="requisite.id">
    {{ typo(requisite.label) }}
  </label>
  <br/>
  <input
      :name="requisite.id"
      :type="requisite.type"
      :placeholder="requisite.hint ? typo(requisite.hint) : '' "/>

</template>


<script setup>
import typo from '../typo.js'

defineProps({
  requisite: {
    type: Object,
    required: true
  }
})
</script>

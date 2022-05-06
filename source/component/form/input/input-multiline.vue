<template>

  <label :for="requisite.id">
    {{ typo(requisite.label) }}
  </label>
  <br/>
  
  <textarea
      :name="requisite.id"
      :placeholder="requisite.hint ? typo(requisite.hint) : '' "
      wrap="soft"/>

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

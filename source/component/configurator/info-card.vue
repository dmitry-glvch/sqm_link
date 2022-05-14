<template>
  <div class="nfo-card">

    <p class="title">{{ title }}</p>
    <div class="entries">

      <card-entry
          v-for="equipmentName in Object.keys(equipment)"
          :label="equipmentName"
          :options="equipment[equipmentName]"/>

    </div>

  </div>
</template>


<script setup>
import CardEntry from 'component/configurator/card-entry.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  equipment: {
    type: Object,
    required: true
  }
})
</script>


<style scoped lang="scss">
@use 'style/colors.scss';
@use 'style/fonts.scss';


.nfo-card {
  padding: 10px;
  .title {
    display: block;
    color: colors.$form-input-label-fg;
    font-weight: fonts.$important-weight;
    text-align: center;
    margin-bottom: 12px;
    width: 100%;
  }
  .entries {
    display: flex;
    flex-direction: column;
  }
}
</style>
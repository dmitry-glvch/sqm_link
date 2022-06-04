<template>

  <label
      class="checkbox-label"
      :for="requisite.id"
      @click.stop="toggle">
    
    <input
        class="checkbox-input"
        type="checkbox"
        :name="requisite.id"
        :checked="checked"
        :value="requisite.checked"
        @click.stop="toggle"/>

    <div class="checkbox-caption">
      {{ typo(requisite.label) }}
    </div>

  </label>

</template>


<script setup>
import { ref } from 'vue'
import typo from 'util/typo.js'

const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const defaultState = props.requisite.state === 'checked'
const checked = ref(defaultState)
const toggle = () => checked.value = !checked.value

defineExpose({
  clear: () => checked.value = defaultState,
  value: () => checked.value ?
      props.requisite.checked :
      props.requisite.unchecked
})
</script>


<style lang="scss" scoped>
@use 'style/colors.scss';

.checkbox-label {
  user-select: none;
  display: flex;
  height: 100%;
  vertical-align: middle;
}

.checkbox-input {
  accent-color: colors.$form-input-accent;

  transform: scale(1.35);
  margin-left: 3px;
  margin-right: 10px;
  
  vertical-align: middle;
  align-self: center;
}

.checkbox-caption {
  display: inline-flex;
  align-items: center;
}
</style>

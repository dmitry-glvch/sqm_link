<template>

  <input-label
      :target="requisite.id"
      :text="requisite.label"/>

  <label
      v-for="(option, i) in normalizedOptions"
      class="radio-label"
      ref="radioContainer"
      :for="`${requisite.id}_${i}`">

    <input
        class="radio-input"
        :ref="option.default ? 'defaultRadio' : null"
        :id="`${requisite.id}_${i}`"
        :name="requisite.id"
        type="radio"
        :value="option.template"
        :checked="option.default"/>

    <div class="radio-caption">
      {{ typo(option.display) }}
    </div>

  </label>

</template>


<script setup>
import { ref } from 'vue'

import normalizeOption from '../normalize-option.js'
import typo from 'util/typo.js'
import inputLabel from './input-label.vue'

const props = defineProps({
  requisite: {
    type: Object,
    required: true
  }
})

const normalizedOptions = 
    props.requisite.options.map(normalizeOption)

const defaultRadio = ref(null)
const radioContainer = ref(null)

defineExpose({
  clear: () => defaultRadio.value[0].checked = true,
  value: () => radioContainer.value
      .map((container) => container.firstChild)
      .find((radio) => radio.checked)
      .value
})
</script>


<style lang="scss" scoped>
@use 'style/colors.scss';

label {
  user-select: none;
}

.radio-input {
  accent-color: colors.$form-input-accent;

  transform: scale(1.35);
  margin-left: 3px;
  margin-right: 10px;

  vertical-align: middle;
  align-self: center;
}
.radio-label {
  display: flex;
  vertical-align: middle;
  margin-bottom: 6px;
}

.radio-caption {
  display: inline-block;
  vertical-align: middle;
}
</style>
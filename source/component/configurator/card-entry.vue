<template>
  <div class="entry">

    <p v-if="label.length > 0" class="label">{{ label }}</p>
    <div class="options">

      <p v-for="option in options" :key="option" class="option">
        <span
            v-for="value in option"
            :key="value"
            class="value"
            ref="value"
            @click="copyValue">
          {{ value }}
        </span>
      </p>

    </div>

  </div>
</template>


<script setup>
import { onMounted } from 'vue'

import copyValue from 'util/copy-value.js'
import createCopyTooltips from 'util/create-copy-tooltips.js'


defineProps({
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

onMounted(() => createCopyTooltips('span.value'))
</script>


<style scoped lang="scss">
@use 'sass:color';
@use 'style/colors.scss';
@use 'style/fonts.scss';

@import 'tippy.js/dist/tippy.css';


.entry{
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 0;
  .label {
    margin: 0;
    width: max-content;
    font-weight: fonts.$semibold-weight;
    &::after {
      content: ':';
      padding-right: 6px;
    }
  }
  .options {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 0;
    .option {
      width: 100%;
      font-family: fonts.$mono-font;
      margin: 0;
      padding-bottom: 4px;
      .value {
        display: inline;
        cursor: pointer;
        &:not(:last-of-type)::after {
          content: '|';
          padding-left: 4px;
          padding-right: 4px;
          background-color: colors.$form-input-bg;
          color: color.adjust(colors.$primary-fg, $alpha: -0.5);
          font-weight: fonts.$important-weight;
        }
      }
      
    }
  }
}
</style>
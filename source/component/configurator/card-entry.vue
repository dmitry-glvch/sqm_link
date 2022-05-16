<template>
  <div class="entry">

    <p v-if="label.length > 0" class="label">{{ label }}</p>
    <div class="options">

      <p v-for="option in options" class="option">
          <span
              v-for="value in option"
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
import { ref, onMounted } from 'vue'
import tippy from 'tippy.js'
import copyToClipboard from 'copy-to-clipboard'


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

let tooltip

onMounted(() => tooltip = tippy('span.value', {
  content: 'Скопировано',
  trigger: 'click',
  onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 500);
  }
}))

const copyValue = (event) => {
  copyToClipboard(event.target.textContent)
}
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
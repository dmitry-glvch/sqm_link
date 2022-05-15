<template>
  <div class="entry">

    <p v-if="label.length > 0" class="label">{{ label }}</p>
    <div class="options">

      <p v-for="option in options" class="option">
        <template v-for="(value, i) in option">
          <div class="tooltip" ref="tooltip">Скопировано</div>
          <span class="value" ref="value" @click="(_) => copyValue(i)">
            {{ value }}
          </span>
        </template>
      </p>

    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import copyToClipboard from 'copy-to-clipboard'
import { createPopper } from '@popperjs/core';


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

const tooltip = ref(null)
const value = ref(null)

onMounted(() =>
    value.value.forEach((v, i) =>
        createPopper(v, tooltip.value[i], {
          placement: 'top'
        })))

const copyValue = (valueIndex) => {
  copyToClipboard(value.value[valueIndex].textContent)

  const tt = tooltip.value[valueIndex]
  tt.style.opacity = 1
  tt.style.zIndex = 1
  setTimeout(() => {
    tt.style.opacity = 0
    setTimeout(() => tt.style.zIndex = -1, 200)
  }, 400)
}
</script>


<style scoped lang="scss">
@use 'sass:color';
@use 'style/colors.scss';
@use 'style/fonts.scss';


.entry{
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 0;
  .label {
    margin: 0;
    font-weight: fonts.$semibold-weight;
    &::after {
      content: ':';
      padding-right: 6px;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    margin: 0;
    .option {
      font-family: fonts.$mono-font;
      margin: 0;
      padding-bottom: 4px;
      .value {
        &:not(:last-child)::after {
          content: '|';
          padding-left: 4px;
          padding-right: 4px;
          color: color.adjust(colors.$primary-fg, $alpha: -0.5);
          font-weight: fonts.$important-weight;
        }
      }
      
    }
  }
}

.tooltip {
  z-index: -1;
  visibility: none;
  opacity: 0;
  background-color: colors.$primary-fg;
  color: colors.$primary-bg;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  transition: opacity 0.2s ease-in-out;
}
</style>
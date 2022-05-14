<template>
  <div class="entry">

    <p class="label">{{ label }}</p>
    <div class="options">

      <p v-for="option in options" class="option">
        <span v-for="value in option" class="value">
          {{value}}
        </span>
      </p>

    </div>

  </div>
</template>


<script setup>
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
</script>


<style scoped lang="scss">
@use 'sass:color';
@use 'style/colors.scss';
@use 'style/fonts.scss';


.entry{
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
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
</style>
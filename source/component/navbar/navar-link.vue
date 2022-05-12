<template>
  <router-link
      :to="path"
      class="link"
      :class="{ 'active': isActive }">

    <span
        v-if="isPresent(icon)"
        :class="[
          'icon',
          icon,
          { 'labelPadding': isPresent(label) }
        ]"
    ></span>

    <span class="label" v-if="isPresent(label)">
      {{ label }}
    </span>

  </router-link>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'


const props = defineProps({
  path: {
    type: String,
    required: true
  },
  label: String,
  icon: String,
  active: Boolean
})

const isPresent = (stringPropValue) =>
    typeof stringPropValue === 'string' &&
    stringPropValue.length > 0

const isActive = computed(
    () => useRoute().path.startsWith(props.path))
</script>


<style scoped lang="scss">
@use 'style/colors.scss';

.link {

  $horizontal-padding: 20px;
  display: inline-block;
  text-decoration: none;
  padding: 16px $horizontal-padding;
  width: calc(100% - 2 * $horizontal-padding);

  font-size: 1.1rem;

  transition: color 0.2s ease;
  transition: background-color 0.5s ease;

  .label {
    color: colors.$link-fg;
  }

  .icon::before {
    color: colors.$navigation-icon;
  }
  &.active {
    .label {
      color: colors.$link-active-fg;
    }
  }

  &:hover {
    background-color: colors.$link-hover-bg;
    cursor: pointer;
    .label, .icon::before {
      color: colors.$link-hover-fg;
    }
  }

  .icon.labelPadding::before {
    padding-right: 8px;
  }

}
</style>

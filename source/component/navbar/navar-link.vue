<template>
  <router-link
      :to="destination"
      class="link"
      :class="{ 'active': isActive }">

    <span
        v-if="icon?.length > 0"
        :class="[
          'icon',
          icon,
          { 'labelPadding': label?.length > 0 }
        ]"
    ></span>

    <span class="label" v-if="label?.length > 0">
      {{ label }}
    </span>

  </router-link>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'


const props = defineProps({
  destination: {
    required: true
  },
  label: String,
  icon: String
})

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
    color: colors.$header-link-fg;
  }

  .icon::before {
    color: colors.$navigation-icon;
  }
  &.active {
    .label {
      color: colors.$header-link-active-fg;
    }
  }

  &:hover {
    background-color: colors.$header-link-hover-bg;
    cursor: pointer;
    .label, .icon::before {
      color: colors.$header-link-hover-fg;
    }
  }

  .icon.labelPadding::before {
    padding-right: 8px;
  }

}
</style>

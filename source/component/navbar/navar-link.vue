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

  --horizontal-padding: 20px;
  --icons-display: inline;

  @media screen and (max-width: 1100px) {
    --horizontal-padding: 10px;
    --icons-display: none;
  }

  display: block;
  text-decoration: none;
  padding: 16px var(--horizontal-padding);
  width: var(--link-width);

  font-size: 1rem;

  transition: color 0.2s ease;
  transition: background-color 0.5s ease;

  .label {
    color: colors.$header-link-fg;
  }

  .icon::before {
    display: var(--icons-display);
    color: colors.$navigation-icon;
  }
  &.router-link-active {
    cursor: default;
    .label {
      color: colors.$header-link-active-fg;
    }
  }

  &:not(.router-link-active):hover {
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

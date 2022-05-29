<template>
  <div class="navbar-item" ref="container">

    <div class="row">
      <router-link
          class="link"
          :to="destination"
          @mouseover="handleHover"
          @mouseleave="handleLeave">

        <span class="icon" :class="icon"></span>
        <span class="label" v-if="hasLabel">{{ label }}</span>

      </router-link>

      <span
          class="dropdown-icon fa-solid fa-plus"
          v-if="hasDropdown"
          @click="toggleDropdown">
      </span>
    </div>

    <div
        class="dropdown"
        v-if="hasDropdown"
        :class="{ 'visible': dropdownVisible }"
        :style="{ [dropdownAlign]: 0 }"
        @mouseover="handleHover"
        @mouseleave="handleLeave">
      <slot></slot>
    </div>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useSlots, Comment } from 'vue'
import { onMounted, onBeforeUnmount, watch } from 'vue'


const props = defineProps({
  destination: {
    required: false,
    default: '#'
  },
  label: String,
  icon: String
})


const hasLabel = props.label?.trim().length > 0
const hasDropdown =
    useSlots().default?.()
        ?.filter(({ type }) => type !== Comment)
        .length > 0

const container = ref(null)
const dropdownAlign = computed(() => {
  const left = container.value?.getBoundingClientRect().left
  return (left < window.innerWidth / 2) ? 'left' : 'right'
})

const mode = ref('')
const dropdownVisible = ref(false)


const toggleDropdown = () =>
    dropdownVisible.value = !dropdownVisible.value

const handleHover = () =>
    mode.value === 'horizontal' && (dropdownVisible.value = true)
const handleLeave = () =>
    mode.value === 'horizontal' && (dropdownVisible.value = false)


const resizeListener = () =>
    mode.value =
        (window.innerWidth > 900) ? 'horizontal' : 'vertical'

onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
})
onBeforeUnmount(() =>
    window.removeEventListener('resize', resizeListener))

watch(mode, () => dropdownVisible.value = false)
</script>


<style scoped lang="scss">
@use 'style/colors.scss';

.navbar-item {

  --horizontal-padding: 10px;

  --icon-display: inline;
  --dropdown-icon-display: none;

  --dropdown-hidden-display: block;
  --dropdown-position: absolute;

  @media screen and (max-width: 1200px) {
    --icon-display: none;
  }

  @media screen and (max-width: 900px) {
    --horizontal-padding: 0;
    --dropdown-icon-display: inline;
    --dropdown-hidden-display: none;
    --dropdown-position: static;
  }
}

.navbar-item {
  position: relative;
}

.row {
  display: flex;
  align-items: baseline;
}

.link, .dropdown-icon {
  color: inherit;
  transition: color 0.25s ease-out;
  &:not(.router-link-active):hover {
    color: colors.$link-hover-fg;
  }
}

.link {
  display: flex;
  align-items: baseline;
  padding: 10px var(--horizontal-padding);
  text-decoration: none;
}

.router-link-active {
  cursor: default;
  opacity: 0.8;
}

.label {
  color: inherit;
}

.icon, .dropdown-icon {
  font-size: 0.88em;
  opacity: 0.85;
  margin: 0 6px;
}

.icon {
  display: var(--icon-display);
}

.dropdown-icon {
  display: var(--dropdown-icon-display);
  flex-grow: 1;
  cursor: pointer;
}

.dropdown {
  display: var(--dropdown-hidden-display);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease-out;

  position: var(--dropdown-position);
  z-index: 3;

  box-shadow: 0px 2px 10px colors.$form-input-outline;
  background-color: colors.$form-input-bg;
  border-radius: 6px;

  &.visible {
    display: block;
    visibility: visible;
    opacity: 1;
  }
}
</style>

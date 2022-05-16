<template>
  <div class="system-link" @click.self="cardClickListener">

    <div class="top-row">
      <a ref="link" class="hlink" :href="href">
        {{ typo(label) }}
      </a>
      <span
          v-if="hasContent"
          :class="[ 'fa-solid', 'button', buttonIcon ]"
          @click="toggle">
      </span>
    </div>

    <div
        v-if="hasContent"
        class="content-box"
        ref="content"
        :style="{ maxHeight: contentMaxHeight }">

        <div>
          <slot/>
        </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed, useSlots, Comment } from 'vue'
import typo from 'util/typo.js'


defineProps({
  href: String,
  label: String,
  collapsed: Boolean
})

const link = ref(null)
const content = ref(null)

const hasContent =
    useSlots().default?.()
        ?.find(({ type }) => type !== Comment) !== undefined

const cardClickListener = !hasContent ?
    () => link.value.click() :
    () => toggle()

let expanded = ref(false)

const contentMaxHeight = computed(() =>
    expanded.value ? `${content.value.scrollHeight}px` : 0)

const buttonIcon = computed(() =>
    expanded.value ? 'fa-angle-up' : 'fa-angle-down')

const toggle = () => expanded.value = !expanded.value
</script>


<style scoped lang="scss">
@use 'style/colors.scss';
@use 'style/fonts.scss';

.system-link {
  background: colors.$card-bg;
  border-radius: 4px;
  cursor: pointer;
  font-family: fonts.$sans-font;

  .top-row {
    display: flex;
    justify-content: space-between;
    .hlink {
      padding: 10px 14px;
      font-weight: fonts.$semibold-weight;
      text-decoration: none;
      font-size: 1.07em;
      flex-grow: 1;
      color: colors.$link-fg;
      transition: color 0.15s ease-out;
      &:hover {
        color: colors.$link-hover-fg;
      }
    }
    .button {
      padding: 10px 14px;
    }
  }

  .content-box {
    overflow: hidden;
    transition: max-height 0.15s ease-out;
    div {
      padding: 0px 14px 8px;
    }
  }
}
</style>

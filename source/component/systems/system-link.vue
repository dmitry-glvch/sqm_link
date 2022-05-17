<template>
  <div class="system-link" @click.self="cardClickListener">

    <div class="top-row" @click.self="cardClickListener">

      <a ref="link" class="hlink" :href="path">
        {{ typo(label) }}
      </a>

      <div>
        <a v-if="hasInfo"
            ref="info"
            class="info"
            :href="info">
          <span class="fa-solid fa-book"></span>
        </a>

        <span
            v-if="hasContent"
            :class="[ 'fa-solid', 'button', buttonIcon ]"
            @click="toggle">
        </span>
      </div>

    </div>

    <div
        v-if="hasContent"
        class="content-box"
        ref="content"
        :style="{ maxHeight: contentMaxHeight }">
      <div>

        <system-link-detail
            v-for="detail in normalizedDetails"
            :key="detail"
            :type="detail.type"
            :value="detail.value"/>

      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

import tippy from 'tippy.js'

import SystemLinkDetail from './system-link-detail.vue'
import normalizeDetails from './normalize-detail.js'

import typo from 'util/typo.js'


const props = defineProps({
  path: String,
  label: String,
  hint: String,
  info: String,
  collapsed: {
    type: Boolean,
    default: true
  },
  details: Array
})

const hasContent = Boolean(props.details?.length > 0)
const hasInfo = props.info !== undefined

const normalizedDetails = props.details?.map(normalizeDetails)


const link = ref(null)
const content = ref(null)
const info = ref(null)

const expanded = ref(!props.collapsed)

const toggle = () => expanded.value = !expanded.value

const buttonIcon = computed(() =>
    expanded.value ? 'fa-angle-up' : 'fa-angle-down')

const contentMaxHeight = computed(() =>
    expanded.value ? `${content.value.scrollHeight}px` : 0)

const cardClickListener = !hasContent ?
    () => link.value.click() :
    () => toggle()

onMounted(() => {
  hasInfo && tippy(info.value, {
    content: 'Открыть инструкцию',
    trigger: 'mouseenter',
    delay: 500
  })
  props.hint && tippy(link.value, {
    content: props.hint,
    trigger: 'mouseenter',
    delay: 500
  })
})
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
      color: colors.$link-fg;
      transition: color 0.15s ease-out;

      &:hover {
        color: colors.$link-hover-fg;
      }
    }
    div {
      display: flex;
      align-items: center;
      .button, .info {
        padding: 10px 6px;
        &:last-child {
          padding: 10px 14px;
        }
        color: colors.$link-fg;
        &:hover {
          color: colors.$link-hover-fg;
        }
      }
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

<template>
  <p
      class="system-link-detail"
      :class="{ 'copy': isCopyable }"
      @click="clickHandler">

    <span v-if="isLogin" class="fa-solid fa-user"></span>
    <span v-if="isPassword" class="fa-solid fa-key"></span>

    {{ value }}

  </p>
</template>


<script setup>
import { onMounted } from 'vue'

import copyValue from 'util/copy-value.js'
import createCopyTooltips from 'util/create-copy-tooltips.js'


const props = defineProps({
  type: String,
  value: {
    type: String,
    required: true
  }
})

const isLogin = props.type === 'login'
const isPassword = props.type === 'password'
const isCopyable = isLogin || isPassword

onMounted(() => createCopyTooltips('.system-link-detail.copy'))

const clickHandler = isCopyable? copyValue : () => {}
</script>


<style scoped lang="scss">
.system-link-detail {
  margin: 2px 0;
  span.fa-solid::before {
    font-size: 0.80em;
    padding-right: 6px;
    opacity: 0.5;
  }
}
</style>

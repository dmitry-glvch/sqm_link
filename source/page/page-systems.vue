<template>
  <div class="container">

    <h2>Инфосистемы</h2>

    <div class="system-list-card">
      <system-link href="https://vk.com" label="Лол">
        <p>kek</p>
      </system-link>
      <system-link href="https://vk.com" label="BWP">
        <p><span class="fa-solid fa-user"></span>sz-otpkk</p>
        <p><span class="fa-solid fa-key"></span>Vavbyun2</p>
      </system-link>
      <system-link href="https://vk.com" label="MRTG"/>
      <system-link href="https://vk.com" label="Аргус"/>
      <system-link href="https://vk.com" label="ЕСУЗ"/>
      <system-link href="https://vk.com" label="Гермес"/>
      <system-link href="https://vk.com" label="Axiros SBA"/>
    </div>

  </div>
</template>


<script setup>
import SystemLink from 'component/systems/system-link.vue'
</script>


<style scoped lang="scss">
.system-list-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: start;
  p {
    margin: 0;
    span.fa-solid::before {
      font-size: 0.85em;
      padding-right: 6px;
      opacity: 0.85;
    }
  }
}
</style>

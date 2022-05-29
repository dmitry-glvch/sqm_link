<template>
  <div class="wrapper">

    <header class="header">
      <suspense>
        <top-navbar/>
      </suspense>
    </header>

    <main class="main">
      <suspense>
        <router-view :key="path"/>
      </suspense>
    </main>

    <footer class="footer">
      <sqm-footer/>
    </footer>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TopNavbar from 'component/top-navbar/top-navbar.vue'
import SqmFooter from 'component/sqm-footer.vue'


const path = computed(() => useRoute().path)
</script>


<style lang="scss">
@use 'style/fonts.scss';
@use 'style/colors.scss';
@import 'style/main.scss';

body {
  font-family: fonts.$sans-font;
  font-weight: fonts.$primary-weight;
  background: colors.$primary-bg;
  color: colors.$primary-fg;
}

.wrapper {
  min-width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}

.header {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
}

.main {
  padding-top: 40px;
  min-height: 100vh;
}

.footer {
  margin-top: 40px;
  padding: 60px 0;
  background-color: colors.$footer-bg;
  color: colors.$footer-fg;
}
</style>

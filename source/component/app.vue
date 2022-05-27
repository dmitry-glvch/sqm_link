<template>
  <div class="wrapper">

    <header class="header">
      <suspense>
        <sqm-navbar/>
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

import SqmNavbar from './navbar/sqm-navbar.vue'
import SqmFooter from './sqm-footer.vue'


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
  z-index: 1;
  position: sticky;
  top: 0;

  background-color: colors.$header-bg;
  color: colors.$header-fg;
}

.main {
  padding-top: 20px;
  min-height: 100vh;
}

.footer {
  margin-top: 40px;
  padding: 60px 0;
  background-color: colors.$footer-bg;
  color: colors.$footer-fg;
}
</style>

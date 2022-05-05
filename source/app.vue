<template>
  <div class="wrapper">

    <header class="header">
      <sqm-navbar/>
    </header>

    <main class="main">
      <sqm-configurator/>
    </main>

    <footer class="footer">
      <sqm-footer/>
    </footer>

  </div>
</template>


<script setup>
import SqmNavbar from 'component/sqm-navbar.vue'
import SqmConfigurator from 'component/sqm-configurator.vue';
import SqmFooter from 'component/sqm-footer.vue'
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
  position: sticky;
  top: 0;

  background-color: colors.$header-bg;
  color: colors.$header-fg;
}

.main {
  padding-top: 20px;
  height: 100vh;
}

.footer {
  padding: 60px 0;
  background-color: colors.$footer-bg;
  color: colors.$footer-fg;
}
</style>

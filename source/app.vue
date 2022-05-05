<template>
  <div class="wrapper">

    <header>
      <sqm-navbar/>
    </header>

    <main>
      <sqm-configurator/>
    </main>

    <footer>
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
@import 'style/main.scss';
</style>

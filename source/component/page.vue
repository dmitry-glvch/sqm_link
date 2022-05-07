<template>
  <div class="wrapper">

    <header class="header">
      <sqm-navbar/>
    </header>

    <main class="main">
      <component :is="contentComponent"/>
    </main>

    <footer class="footer">
      <sqm-footer/>
    </footer>

  </div>
</template>


<script setup>
import path from 'path'

import SqmNavbar from 'component/navbar/sqm-navbar.vue'
import SqmFooter from 'component/sqm-footer.vue'

import SqmConfigurator from 'page/sqm-configurator.vue'
import SqmContacts from 'page/sqm-contacts.vue'
import SqmForms from 'page/sqm-forms.vue'
import SqmIndex from 'page/sqm-index.vue'
import SqmInstructuions from 'page/sqm-instructions.vue'
import SqmSystems from 'page/sqm-systems.vue'

import Form3ltp from 'page/forms/form-3ltp.vue'


const content = {
  configurator: SqmConfigurator,
  contacts: SqmContacts,
  forms: SqmForms,
  index: SqmIndex,
  instructions: SqmInstructuions,
  systems: SqmSystems,
  form3ltp: Form3ltp
}

const props = defineProps({
  page: {
    type: String,
    required: true
  }
})

const contentComponentName = path.basename(props.page, '.html')
const contentComponent = content[contentComponentName]
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
}

.footer {
  margin-top: 40px;
  padding: 60px 0;
  background-color: colors.$footer-bg;
  color: colors.$footer-fg;
}
</style>

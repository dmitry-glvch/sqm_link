<template>
  <div class="container navbar-container">

    <h1 class="title">SQM Link</h1>

    <nav>
      <ul class="navbar__link-list">

        <navbar-entry
            v-for="entry in navbarEntries"
            :path="entry.path"
            :icon="entry.icon"
            :label="entry.label"
            :sublinks="entry.sublinks"/>

      </ul>
    </nav>

  </div>
</template>


<script setup>
import NavbarEntry from 'component/navbar/navbar-entry.vue'

import navbarEntries from 'config/navbar-entries'
</script>


<style lang="scss">
@use 'style/fonts.scss';
@use 'style/colors.scss';


:root {
  --display-heading: inline;
}


.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.2rem;
  font-weight: fonts.$semibold-weight;

  user-select: none;
}

.title {
  display: var(--display-heading);
  margin: 0;
  padding-right: 50px;
  font-size: 1.3rem;
}

.navbar__link-list {
  display: inline-flex;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
}
</style>

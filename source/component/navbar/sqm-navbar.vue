<template>
  <div class="container navbar-container">

    <h1 class="title">SQM Link</h1>

    <nav>
      <ul class="navbar-link-list">

        <navbar-entry
            v-for="entry in entries"
            :key="entry"
            :destination="entry.destination"
            :icon="entry.icon"
            :label="entry.label"
            :sublinks="entry.sublinks"/>

        <navbar-entry
            v-if="config.branchNavigation"
            destination="#"
            icon="fa-solid fa-earth-americas"
            :label="branches[currentBranch].title"
            :sublinks="branchNavigationSublinks"/>

      </ul>
    </nav>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import NavbarEntry from 'component/navbar/navbar-entry.vue'

import config from 'source/config.js'
import branches from 'config/branches.js'
import navbarEntries from 'config/navbar-entries.js'


await useRouter().isReady()

const currentBranch = computed(() => useRoute().params.branch)

const entries = computed(() =>
    navbarEntries.map((entry) => ({
      label: entry.label,
      icon: entry.icon,
      destination: {
        name: entry.name,
        params: {
          branch: currentBranch.value
        }
      }
    })))

const branchNavigationSublinks = computed(() =>
    Object.entries(branches)
        .map(([ code, { title } ]) => ({
          icon: 'fa-solid fa-caret-right',
          label: title,
          destination: {
            name: useRoute().name,
            params: {
              branch: code
            }
          }
        })))
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

.navbar-link-list {
  display: inline-flex;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
}

.dropdown a .fa-caret-right::before {
  font-size: 0.8em;
  margin-right: 6px;
} 
</style>

<template>
  <div class="container navbar" ref="navbar">

    <h1 class="title">SQM Link</h1>

    <button class="burger" @click="burgerClick">
      <span class="icon fa-solid fa-bars"></span>
    </button>

    <nav :style="{ display: linkListDisplay ? 'flex' : 'none' }">
      <ul class="link-list">

        <li v-for="entry in entries">
          <navbar-item
              :destination="entry.destination"
              :icon="entry.icon"
              :label="entry.label">

            <ul class="dropdown-list"
                v-if="entry.dropdownLinks?.length > 0">
              <li v-for="link in entry.dropdownLinks">

                <router-link
                    class="link"
                    :to="link.destination ?? link.path">
                  {{ link.label }}
                </router-link>

              </li>
            </ul>

          </navbar-item>
        </li>

        <li v-if="config.branchNavigation">
          <navbar-item
              icon="fa-solid fa-earth-americas"
              :label="branches[currentBranch]?.title">
            <ul class="dropdown-list">

              <li v-for="link in branchesDropdownLinks">
                <router-link
                    class="link"
                    :to="link.destination">
                  {{ link.label }}
                </router-link>
              </li>

            </ul>
          </navbar-item>
        </li>

      </ul>
    </nav>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import config from 'source/config.js'
import navbarItem from './navbar-item.vue'

import navbarEntries from 'config/navbar-entries.js'
import branches from 'config/branches.js'
import NavbarItem from './navbar-item.vue'


await useRouter().isReady()

const currentBranch = computed(() => useRoute().params.branch)

const entries = computed(() => 
    navbarEntries.map((entry) => ({
      label: entry.label,
      icon: entry.icon,
      destination: entry.path ?? {
        name: entry.name,
        params: {
          branch: currentBranch.value
        }
      },
      dropdownLinks: entry.sublinks
    })))

const branchesDropdownLinks = computed(() =>
    Object.entries(branches)
        .map(([ code, { title }]) => ({
          label: title,
          destination: {
            name: useRoute().name,
            params: {
              branch: code
            }
          }
        })))


const linkListDisplay = ref(window.innerWidth > 800)
const burgerClick = () =>
  linkListDisplay.value = !linkListDisplay.value


const navbar = ref(null)
const navbarType = ref('')
const resizeListener = () =>
    navbarType.value = (navbar.value.clientWidth > 900) ?
        'horizontal' :
        'vertical'

onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
})

onBeforeUnmount(() =>
    window.removeEventListener('resize', resizeListener))

watch(navbarType, (newType) =>
    linkListDisplay.value = newType === 'horizontal')
</script>


<style scoped lang="scss">
@use 'style/colors.scss';
@use 'style/fonts.scss';

.navbar {
  --navbar-layout: 'title list';

  --title-display: block;
  --burger-display: none;

  --link-list-direction: row;
  --links-justify: flex-end;

  @media screen and (max-width: 1200px) {
    --navbar-layout: 'list list';
    --title-display: none;
    --links-justify: space-between;
  }

  @media screen and (max-width: 900px) {
    --navbar-layout: 'title burger' 'list list';
    --title-display: block;
    --link-list-direction: column;
    --burger-display: inline-block;
    .link-list {
      padding-bottom: 10px;
    }
  }
}

.navbar {
  display: grid;
  grid-template: var(--navbar-layout);
  grid-template-columns: 1fr auto;

  justify-content: space-between;
  align-items: center;
  column-gap: 50px;

  background-color: colors.$primary-bg;
  color: colors.$header-bg;
  box-shadow: 0px 5px 15px -14px colors.$form-input-outline;

  white-space: nowrap;
  user-select: none;

  nav {
    grid-area: list;
    width: 100%;
  }
}

.title {
  display: var(--title-display);
  grid-area: title;
  margin: 0;

  font-size: 1.2rem;
  font-weight: fonts.$semibold-weight;
}

.link-list {
  display: flex;
  width: 100%;
  flex-direction: var(--link-list-direction);

  flex-wrap: wrap;
  justify-content: var(--links-justify);

  list-style: none;
  margin: 0;
  padding: 0;

  font-size: 1.00rem;
  font-weight: fonts.$semibold-weight;
}

.dropdown-list {
  list-style: none;
  padding: 2px 0 4px;
  margin: 0;

  .link {
    display: block;
    padding: 8px 16px;
    font-size: 0.95em;

    color: inherit;
    transition: color 0.25s ease-out;
    text-decoration-line: none;

    &.router-link-active {
      cursor: default;
      opacity: 0.8;
    }

    &:not(.router-link-active):hover {
      color: colors.$link-hover-fg;
    }
  }
}

.burger {
  display: var(--burger-display);
  grid-area: burger;
  width: fit-content;
  padding: 10px;

  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.25s ease-out;

  .icon {
    display: block;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 0.88em;
    opacity: 0.85;
  }
  
  &:hover {
    color: colors.$link-hover-fg;
  }
}
</style>

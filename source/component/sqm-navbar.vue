<template>
  <div class="container navbar-container">

    <h1 class="title">SQM Link</h1>

    <nav>
      <ul class="navbar__link-list">

        <navbar-entry
            v-for="{ href, icon, label, sublinks } in navbarEntries"
            :href="href"
            :icon="icon"
            :label="label"
            :sublinks="sublinks"/>

      </ul>
    </nav>

  </div>
</template>


<script setup>
import NavbarEntry from 'component/navbar/navbar-entry.vue'

const navbarEntries = [
  {
    href: '#',
    icon: 'fa-solid fa-house',
    label: 'Главная'
  },
  {
    href: '#',
    icon: 'fa-solid fa-circle-nodes',
    label: 'Инфосистемы'
  },
  {
    href: '#',
    icon: 'fa-solid fa-table',
    label: 'Формы',
    sublinks: [
      {
        href: '#',
        icon: 'fa-solid fa-caret-right',
        label: 'Оформление выезда'
      },
      {
        href: '#',
        icon: 'fa-solid fa-caret-right',
        label: 'Передать ПМ'
      }
    ]
  },
  {
    href: '#',
    icon: 'fa-solid fa-gears',
    label: 'Конфигуратор'
  },
  {
    href: '#',
    icon: 'fa-solid fa-file-lines',
    label: 'Инструкции'
  },
  {
    href: '#',
    icon: 'fa-solid fa-address-book',
    label: 'Контакты'
  },
  {
    href: '#',
    icon: 'fa-solid fa-earth-americas'
  }
]
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

<template>
  <li class="navbar-entry">

    <navbar-link
        :destination="destination"
        :label="label"
        :icon="icon"/>

    <div v-if="sublinks?.length > 0" class="dropdown">
      <ul>

        <li
            v-for="link in sublinks"
            :key="link"
            class="navbar-entry">

          <navbar-link
              :destination="link.path ?? link.destination"
              :label="link.label"
              :icon="link.icon"/>

        </li>

      </ul>
    </div>

  </li>
</template>


<script setup>
import NavbarLink from './navar-link.vue'

defineProps({
  destination: {
    required: true
  },
  label:    String,
  icon:     String,
  sublinks: Array
})
</script>


<style lang="scss">
@use 'style/colors.scss';
@use 'style/sizes.scss';


.navbar-entry {

  display: inline-block;
  position: relative;

  &:hover .dropdown,
  &:focus-within .dropdown,
  .dropdown:hover,
  .dropdown:focus {
    display: flex;
    visibility: visible;
    flex-direction: column;
  }

  .dropdown {

    z-index: 1;

    display: none;
    visibility: hidden;

    position: absolute;
    left: 0;
    // left: calc(0 - )
    // position: relative;

    border-bottom-left-radius: sizes.$default-border-radius;
    border-bottom-right-radius: sizes.$default-border-radius;
    box-shadow: 0px 2px 10px #00000088;

    ul {
      padding: 0;
    }

    .navbar-entry {

      clear: both;
      display: block;
      white-space:nowrap;

      .link {
        padding: 10px 20px;
      }

      text-align: left;
      background-color: colors.$header-bg;

      &:last-of-type {
        border-bottom-left-radius: sizes.$default-border-radius;
        border-bottom-right-radius: sizes.$default-border-radius;
        a {
          border-bottom-left-radius: sizes.$default-border-radius;
          border-bottom-right-radius: sizes.$default-border-radius;
        }
      }

    }
  }

}
</style>

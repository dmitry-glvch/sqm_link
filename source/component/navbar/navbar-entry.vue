<template>
<li :class="{ 'navbar__entry': true }">

  <navbar-link
      :path="path"
      :label="label"
      :icon="icon"/>

  <div class="dropdown" v-if="sublinks?.length > 0">
    <ul>

      <li v-for="link in sublinks" class="navbar__entry">
        <navbar-link
            :path="link.path"
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
  path:     String,
  label:    String,
  icon:     String,
  sublinks: Array
})
</script>


<style lang="scss">
@use 'style/colors.scss';
@use 'style/sizes.scss';


.navbar__entry {

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

    ul {
      padding: 0;
    }

    .navbar__entry {

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
      }

    }
  }

}
</style>

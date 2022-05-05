<template>
<li class="navbar__entry">

  <a class="link" :href="href">

    <span :class="[
      'icon',
      icon,
      isPresent(label) ? 'labelPadding' : ''
    ]" v-if="isPresent(icon)"></span>

    <span  class="label" v-if="isPresent(label)">
      {{ label }}
    </span>

  </a>

  <div class="dropdown" v-if="sublinks !== undefined && sublinks.length > 0">
    <ul>

      <li class="navbar__entry" v-for="link in sublinks">
        <a class="link" :href="link.href">

          <span :class="[
            'icon',
            link.icon,
            isPresent(link.label) ? 'labelPadding' : ''
          ]" v-if="isPresent(link.icon)"></span>

          <span class="label"
              v-if="isPresent(link.label)">
            {{ link.label }}
          </span>

        </a>
      </li>

    </ul>
  </div>

</li>
</template>


<script setup>

defineProps({
  href: String,
  label: String,
  icon: String,
  sublinks: Array
})

const isPresent = (stringPropValue) =>
    typeof stringPropValue === 'string' &&
    stringPropValue.length > 0

</script>


<style lang="scss">
@use 'style/colors.scss';


.navbar__entry {

  display: inline-block;
  margin: 0;
  position: relative;
  height: fit-content;

  a {
    color: colors.$header-fg;
    text-decoration: none;
    &:link {
      color: colors.$header-fg;
      text-decoration: none;
    }
  }

  // &.active-link {
  //   color: colors.$active-link;
  //   span::before {
  //     color: colors.$navigation-icon-active;
  //   }
  //   .nav__link-label {
  //     color: inherit;
  //   }
  // }

  .icon::before {
    color: colors.$navigation-icon;
  }
  .icon.labelPadding::before {
    padding-right: 8px;
  }

  padding: 16px 20px;

  text-align: center;
  font-size: 1.1rem;

  transition: color 0.2s ease;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: lighten(colors.$header-bg, 5);
      cursor: pointer;
  }

  &:hover .dropdown,
  &:focus-within .dropdown,
  .dropdown:hover,
  .dropdown:focus {
    visibility: visible;
    opacity: 1;
    display: flex;
    flex-direction: column;
    width: fit-content;
  }

  .dropdown {

    position: absolute;
    margin-top: 1rem;
    left: 0;

    display: none;

    ul {
      padding: 0;
    }

    .navbar__entry {

      clear: both;
      display: block;
      white-space:nowrap;
      padding: 10px 20px;
      text-align: left;
      background-color: colors.$header-bg;
      
      &:hover {
        background-color: lighten(colors.$header-bg, 5);
        cursor: pointer;
      }
      &:last-of-type {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      
    }
  }

}
</style>

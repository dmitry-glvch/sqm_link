<template>
<li :class="{ 'navbar__entry': true, 'active': active }">

  <router-link :to="href" class="link">

    <span :class="[
      'icon',
      icon,
      isPresent(label) ? 'labelPadding' : ''
    ]" v-if="isPresent(icon)"></span>

    <span class="label" v-if="isPresent(label)">
      {{ label }}
    </span>

  </router-link>

  <div class="dropdown" v-if="sublinks !== undefined && sublinks.length > 0">
    <ul>

      <li :class="{
        'navbar__entry': true,
        'active': active
      }" v-for="link in sublinks">
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

const props = defineProps({
  href:     String,
  label:    String,
  icon:     String,
  active:   Boolean,
  sublinks: Array
})

const isPresent = (stringPropValue) =>
    typeof stringPropValue === 'string' &&
    stringPropValue.length > 0
 
</script>


<style lang="scss">
@use 'style/colors.scss';
@use 'style/sizes.scss';


.navbar__entry {

  display: inline-block;
  margin: 0;
  padding: 0;
  position: relative;

  .link {
    display: inline-block;
    text-decoration: none;
    padding: 16px 20px;
  }

  .label, .icon::before {
    color: colors.$link-fg;
  }

  &.active {
    .label, .icon::before {
      color: colors.$link-active-fg;
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

  text-align: center;
  font-size: 1.1rem;

  transition: color 0.2s ease;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: colors.$link-hover-bg;
    cursor: pointer;
    .label, .icon::before {
      color: colors.$link-hover-fg;
    }
  }

  &:hover .dropdown,
  &:focus-within .dropdown,
  .dropdown:hover,
  .dropdown:focus {
    display: flex;
    flex-direction: column;
  }

  .dropdown {
    
    display: none;

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

      .label, .icon::before {
        color: colors.$link-fg;
      }

      &:hover {
        background-color: colors.$link-hover-bg;
        color: colors.$link-hover-fg;
        cursor: pointer;

        .label, .icon::before {
          color: colors.$link-hover-fg;
        }
      }

    }
  }

}
</style>

<template>
  <div class="container">

    <h2>Конфигуратор</h2>

    <div class="config-selector">
      <nav>
        <a>СПБ и ЛО</a>
        <a class="config-tab-selected">Архангельск</a>
        <a>Вологда</a>
        <a>Калининград</a>
        <a>Карелия</a>
        <a>Коми</a>
        <a>Мурманск</a>
        <a>Новгород</a>
        <a>Псков</a>
      </nav>
      <div class="config-selected-container">
        выбранный контент
      </div>
    </div>

  </div>
</template>


<style lang="scss">
@use 'style/colors.scss';


.config-selector {
  background: colors.$card-bg;
  border-radius: 4px;

  nav {
    display: flex;
  }

  .config-selected-container {
    padding: 20px;
  }

  a {
    display: inline-block;
    padding: 20px;
    flex: 1;
    text-align: center;
    background-color: colors.$config-select-tab-bg;
    transition: background-color 0.25s ease-out;
    color: colors.$config-select-tab-fg;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: darken(colors.$config-select-tab-bg, 5);
    }
    &.config-tab-selected {
      background-color: darken(colors.$config-select-tab-bg, 5);
      cursor: default;
    }
    &:first-child {
      border-top-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
    }
  }
}
</style>


<template>
  <div class="container">

    <h1>SQM Link</h1>

    <nav class="nav">
      <ul class="nav__link-list">

        <!-- Главная -->
        <li class="nav__link-container">
          <span class="fa-solid fa-house"></span>
          <a class="nav__link-label" href="page/main.html">Главная</a>
        </li>

        <!-- Инфосистемы -->
        <li class="nav__link-container">
          <span class="fa-solid fa-circle-nodes"></span>
          <a class="nav__link-label">Инфосистемы</a>
        </li>

        <!-- Формы -->
        <li class="nav__link-container">
          <span class="fa-solid fa-table"></span>
          <a class="nav__link-label">Формы</a>

          <div class="nav__dropdown">
            <a href="main.html" class="nav__link-label"><span class="fa-solid fa-caret-right" style="padding-right: 8px;"></span>Оформление выезда</a>
            <a class="nav__link-label"><span class="fa-solid fa-caret-right" style="padding-right: 8px;"></span>Передать ПМ</a>
          </div>
        </li>

        <!-- Конфигуратор -->
        <li class="nav__link-container active-link">
          <span class="fa-solid fa-gears"></span>
          <a class="nav__link-label">Конфигуратор</a>
        </li>

        <!-- Инструкции -->
        <li class="nav__link-container">
          <span class="fa-solid fa-file-lines"></span>
          <a class="nav__link-label">Инструкции</a>
        </li>

        <!-- Контакты -->
        <li class="nav__link-container">
          <span class="fa-solid fa-address-book"></span>
          <a class="nav__link-label">Контакты</a>
        </li>

        <!-- Регион -->
        <li class="nav__link-container">
          <span class="fa fa-earth-americas"></span>
        </li>

      </ul>
    </nav>

  </div>
</template>

export default [

  {
    path: '/main',
    icon: 'fa-solid fa-house',
    label: 'Главная'
  },

  {
    path: '/systems',
    icon: 'fa-solid fa-circle-nodes',
    label: 'Инфосистемы'
  },

  {
    path: '/forms',
    icon: 'fa-solid fa-table',
    label: 'Формы',
    sublinks: [
      {
        path: '/forms/3ltp',
        icon: 'fa-solid fa-caret-right',
        label: 'Оформление выезда'
      },
      {
        path: '#',
        icon: 'fa-solid fa-caret-right',
        label: 'Передать ПМ'
      }
    ]
  },

  {
    path: '/configurator',
    icon: 'fa-solid fa-gears',
    label: 'Конфигуратор'
  },

  {
    path: '/instructions',
    icon: 'fa-solid fa-file-lines',
    label: 'Инструкции'
  },

  {
    path: '/contacts',
    icon: 'fa-solid fa-address-book',
    label: 'Контакты'
  },

  {
    path: '#',
    icon: 'fa-solid fa-earth-americas'
  }

]

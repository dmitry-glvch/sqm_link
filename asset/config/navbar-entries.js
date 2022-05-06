export default [

  {
    href: '/',
    icon: 'fa-solid fa-house',
    label: 'Главная'
  },

  {
    href: '/systems',
    icon: 'fa-solid fa-circle-nodes',
    label: 'Инфосистемы'
  },

  {
    href: '/forms',
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
    href: '/configurator',
    icon: 'fa-solid fa-gears',
    label: 'Конфигуратор'
  },

  {
    href: '/instructions',
    icon: 'fa-solid fa-file-lines',
    label: 'Инструкции'
  },

  {
    href: '/contacts',
    icon: 'fa-solid fa-address-book',
    label: 'Контакты'
  },

  {
    href: '#',
    icon: 'fa-solid fa-earth-americas'
  }

]

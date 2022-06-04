export default [

  {
    name: 'main',
    icon: 'fa-solid fa-house',
    label: 'Главная'
  },

  {
    name: 'systems',
    icon: 'fa-solid fa-circle-nodes',
    label: 'Инфосистемы'
  },

  {
    name: 'forms',
    icon: 'fa-solid fa-paste',
    label: 'Формы',
    sublinks: [
      {
        path: '/north-west/forms/sqm-closing',
        label: 'Закрытие SQM заявки'
      },
      {
        path: '/north-west/forms/3ltp',
        label: 'Оформление выезда'
      }
    ]
  },

  {
    name: 'configurator',
    icon: 'fa-solid fa-gears',
    label: 'Конфигуратор'
  },

  {
    name: 'instructions',
    icon: 'fa-solid fa-file-lines',
    label: 'Инструкции'
  },

  {
    name: 'contacts',
    icon: 'fa-solid fa-id-badge',
    label: 'Контакты'
  }
  
]

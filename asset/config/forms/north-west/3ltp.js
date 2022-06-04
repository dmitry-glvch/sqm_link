export default {
  title: 'Оформление выезда',
  requisites: [
    {
      id: 'issue_type',
      label: 'Тип неисправности',
      input: 'select',
      options: [
        'не работает канал',
        'потери на канале',
        {
          display: 'Кратковременные прерывания',
          template: 'КРП'
        }
      ]
    },
    {
      id: 'performed_diagnostics',
      label: 'Произведённая диагностика',
      input: 'multiline',
      hint: 'Описание произведённой диагностики, обоснование передачи на выезд'
    },
    {
      id: 'equipment_reboot_status',
      label: 'Перезагрузка оборудования',
      input: 'radio',
      options: [
        {
          default: true,
          display: 'Выполнена',
          template: 'да'
        },
        {
          display: 'Не выполнена',
          template: 'нет'
        },
        {
          display: 'Нет возможности выполнить',
          template: 'нет возможности'
        }
      ]
    },
    {
      id: 'electricity_status',
      label: 'Электропитание на объекте',
      input: 'checkbox',
      state: 'checked',
      checked: 'есть',
      unchecked: 'нет'
    },
    {
      id: 'instructions',
      label: 'Указания для ВИ',
      input: 'multiline',
      hint: 'Требуемые от ВИ действия'
    },
    {
      id: 'channel_info',
      label: 'Информация по каналу',
      input: 'multiline',
      hint: 'Скопировать описание канала из NOC',
      attrs: {
        spellcheck: false,
        wrap: 'off'
      }
    },
    {
      id: 'communication_plan',
      label: 'Схема организации связи',
      input: 'radio',
      options: [
        {
          default: true,
          value: 'отсутствует'
        },
        'во вложении'
      ]
    },
    {
      id: 'client_contact',
      label: 'Контакт клиента',
      input: 'typed',
      type: 'tel'
    },
    {
      id: 'visit_time',
      label: 'Время выезда',
      input: 'typed',
      type: 'text',
      hint: 'дд.мм.гггг чч:мм'
    },
    {
      id: 'visit_purpose',
      label: 'Цель выезда',
      input: 'select',
      options: [
        'Замена оборудования',
        'Проверка линии',
        'Настройка оборудования',
        'Демонстрация работы услуги',
        'Другая причина'
      ]
    },
    {
      id: 'cable_check_need',
      label: 'Проверка кабеля (см. подвал)',
      input: 'checkbox',
      state: 'unchecked',
      checked: 'Да',
      unchecked: 'Нет'
    },
    {
      id: 'admittance_type',
      label: 'Тип допуска',
      input: 'select',
      options: [
        {
          default: true,
          value: 'по звонку'
        },
        'паспорт, удостоверение',
        'по согласованию',
        'необходимо заказывать пропуск',
        'свободный'
      ]
    },
    {
      id: 'quarantine_status',
      label: 'Объект не на карантине',
      input: 'checkbox',
      state: 'checked',
      checked: 'не на карантине',
      unchecked: 'на карантине'
    },
    {
      id: 'infected_presence',
      label: 'На объекте нет заболевших',
      input: 'checkbox',
      state: 'checked',
      checked: 'нет заболевших',
      unchecked: 'есть заболевшие'
    },
    {
      id: 'voucher_status',
      label: 'Клиент согласен дать расписку',
      input: 'checkbox',
      state: 'checked',
      checked: 'согласен',
      unchecked: 'не согласен'
    }
  ],
  template: `
Необходимость проверки кабеля: \${cable_check_need}

Заявленная клиентом проблема: \${issue_type}

Произведенная диагностика: \${performed_diagnostics}

Указания по необходимым действиям для ВИ: \${instructions}

Информация по каналу: \${channel_info}

Оборудование перезагружалось: \${equipment_reboot_status}

Наличие Э/П: \${electricity_status}

Контактный телефон представителя клиента на объекте: \${client_contact}

Согласованное с клиентом время выезда: \${visit_time}

Тип допуска на объект: \${admittance_type}

Доступ на объект: \${quarantine_status}

Статус клиента: \${infected_presence}

Согласие дать расписку: \${voucher_status}

Контрольный срок по ТТ: NaN.NaN.NaN NaN:NaN

Схема организации связи \${communication_plan}.

{ \${visit_purpose} }
`,
  layout: `
    'issue_type              visit_purpose'
    'performed_diagnostics   performed_diagnostics '
    'equipment_reboot_status communication_plan'
    'instructions            instructions'
    'channel_info            channel_info'
    'client_contact          visit_time'
    'admittance_type         _'
    'electricity_status      quarantine_status'
    'cable_check_need        infected_presence'
    '-                       voucher_status'
  `
}

export default {
  title: 'Закрытие SQM заявки',
  requisites: [
    {
      id: 'problem_zone',
      label: 'В чьей ЗО проблема',
      input: 'select',
      options: [
        {
          default: true,
          display: 'Проблема отсутствует',
          template: '-'
        },
        {
          display: 'Ростелеком',
          template: 'РТК'
        },
        'Теком'
      ]
    },
    {
      id: 'visit',
      label: 'Оформлен выезд',
      input: 'checkbox',
      state: 'unchecked',
      checked: '1',
      unchecked: '-'
    },
    {
      id: 'client_contact',
      label: 'Контакт клиента',
      input: 'typed',
      type: 'text',
      hint: 'Только цифры',
      attrs: {
        oninput: "this.value = this.value.replace(/[^0-9.]/g, '')",
        maxlength: '12'
      }
    },
    {
      id: 'comment',
      label: 'Комментарий',
      input: 'multiline',
      hint: 'Комментарий'
    }
  ],
  template: 'Закрытие SQM заявки по форме: ' +
      `[ \${problem_zone},\${visit},\${client_contact},\${comment} ]`,
  layout: `
    'problem_zone problem_zone problem_zone problem_zone problem_zone'
    'visit client_contact client_contact client_contact client_contact'
    'comment comment comment comment comment'
  `
}

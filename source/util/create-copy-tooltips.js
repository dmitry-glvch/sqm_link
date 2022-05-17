import tippy from 'tippy.js'


export default (selector) => tippy(selector, {
  content: 'Скопировано',
  trigger: 'click',
  onShow: (instance) =>
      setTimeout(() => instance.hide(), 500)
})

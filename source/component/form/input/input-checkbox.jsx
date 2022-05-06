import typo from '../typo.js'


const toggle = (id) => {
  const checkbox = document.getElementsByName(id)[0]

  if (checkbox !== undefined)
    checkbox.checked = ! checkbox.checked
}

export default ({ id, label, state, checked }) =>
    <label for={id} data-for-checkbox onClick={(e) => {
      e.stopPropagation();
      toggle(id)
    }}>
      <input
          type='checkbox'
          name={id}
          checked={state ==='checked'}
          data-default-state={state ==='checked'}
          value={checked}
          onClick={(e) => e.stopPropagation()} />
      <div>{typo(label)}</div>
    </label>

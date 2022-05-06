import typo from '../typo.js'


export default ({ id, label, type, hint }) => [
  <label for={id}>{typo(label)}</label>,
  <br/>,
  <input name={id} type={type} placeholder={hint ?? ''}/>
]

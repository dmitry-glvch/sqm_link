import typo from "../typo.js"


export default ({ id, label, hint }) => [
  <label for={id}>{typo(label)}</label>,
  <br />,
  <textarea
      name={id}
      placeholder={hint ? typo(hint) : ''}
      wrap='soft' />
]

import typo from '../typo.js'
import normalizeOption from '../normalize-option.js'


export default ({ id, label, options }) => [
  <label for={id}>{typo(label)}</label>,
  <br />,
  options
      .map(normalizeOption)
      .map((option, i) => [
        <label for={`${id}_${i}`}>
          <input
              id={`${id}_${i}`}
              name={id}
              type='radio'
              value={option.template}
              checked={option.default}
              data-default={option.default}/>
          <div>{typo(option.display)}</div>
        </label>,
        <br/>
      ])
]

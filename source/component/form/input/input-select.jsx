import typo from '../typo.js'
import normalizeOption from '../normalize-option.js'

export default ({ id, label, options }) => {

  let hasDefault = false
  const optionNodes = options
      .map(normalizeOption)
      .map((option) => {
        hasDefault = hasDefault || option.default
        return <option
            selected={option.default}
            data-default={option.default}>
          {typo (option.display)}
        </option>
      })

  if (!hasDefault)
    optionNodes.push(
        <option hidden selected disabled data-default={true}/>)

  return [
    <label for={id}>{typo(label)}</label>,
    <br/>,
    <select name={id}>{optionNodes}</select>
  ]
}

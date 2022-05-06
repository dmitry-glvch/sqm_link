export default (option) => {

  const capitalizeFirstLetter = (str) => 
      str.slice(0, 1).toUpperCase() + str.substring(1)

  if (typeof option === 'string')
    return {
      default: false,
      display: capitalizeFirstLetter(option),
      template: option
    }

  const normalizedTemplate = option.template ?? option.value 

  return {
    default: option.default ?? false,
    template: normalizedTemplate,
    display: option.display ??
        capitalizeFirstLetter(normalizedTemplate)
  }
}

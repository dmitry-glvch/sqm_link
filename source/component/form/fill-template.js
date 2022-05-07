export default (inputs, template) =>
    inputs
        .map((i) => ({
          id: i.id(),
          value: i.value() ?? ''
        }))
        .reduce(
            (s, { id, value }) => s.replace(`\${${id}}`, value),
            template
        )

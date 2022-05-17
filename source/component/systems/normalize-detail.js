export default (detail) =>
    typeof detail === 'string' ?
        { type: 'value', value: detail } :
        detail

<script lang='jsx'>
import inputTyped from './input-typed.jsx'
import inputMultiline from './input-multiline.jsx'
import inputSelect from './input-select.jsx'
import inputRadio from './input-radio.jsx'
import inputCheckbox from './input-checkbox.jsx'


const factories = {
  typed:     inputTyped,
  multiline: inputMultiline,
  select:    inputSelect,
  radio:     inputRadio,
  checkbox:  inputCheckbox
}


export default {
  props: {
    requisite: {
      type: Object,
      required: true
    }
  },
  render() {
    const r = this.requisite
    const type = this.requisite.input
    return <div
        class={`input-${type} input-id-${r.id}`}
        style={{'grid-area': r.id}}>
      { factories[type](r) }
    </div>
  }
}
</script>

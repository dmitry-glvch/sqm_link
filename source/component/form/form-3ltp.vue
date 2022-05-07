<template>
  <form class="container">

    <div class="inputContainer">
      <input-factory
          v-for="requisite in form3ltp.requisites"
          ref="inputRefs"
          :key="requisite.id"
          :requisite="requisite"/>
    </div>

    <div class="controls">
      <div class="buttonRow">

        <input-button
            class="main-button"
            caption="Сгенерировать"
            :action="fill"/>
        <input-button
            caption="Очистить"
            :action="clear"/>

      </div>
      <br/>

      <input-factory
          class="control-copy-result"
          ref="controlCopyResult"
          :requisite="copyToClipboardRequisite"/>
    </div>

    <input-factory ref="result" :requisite="resultRequisite"/>

  </form>
</template>


<script setup>
import { onMounted, ref } from 'vue'

import copyToClipboard from 'copy-to-clipboard'

import InputFactory from './input/input-factory.vue'
import InputButton from './input/input-button.vue'
import form3ltp from 'asset/config/form/3ltp'


const inputRefs = ref([])
const controlCopyResult = ref(null)
const result = ref(null)

const fill = () => {
  const filled = inputRefs.value
      .map((i) => ({ id: i.id(), value: i.value() ?? '' }))
      .reduce(
          (s, { id, value }) => s.replace(`\${${id}}`, value),
          form3ltp.template)

  document.querySelector('.input-id-result textarea').value = filled

  if (controlCopyResult.value.value())
    copyToClipboard(result.value.value())
}

const clear = () => {
  inputRefs.value.forEach((i) => i.clear())
  controlCopyResult.value.clear()
  result.value.clear()
}

const copyToClipboardRequisite = {
  id: 'control-copy-result',
  input: 'checkbox',
  state: 'checked',
  label: 'Cкопировать результат в буфер обмена',
  checked: true,
  unchecked: false
}

const resultRequisite = {
  id: 'result',
  input: 'multiline',
  label: ''
}
</script>


<style lang='scss'>
@use 'style/colors.scss';
@use 'style/fonts.scss';
@use 'style/sizes.scss';

@import 'normalize.css';

@import 'style/main.scss';


$layout: 
    'issue_type              visit_purpose'
    'performed_diagnostics   performed_diagnostics '
    'equipment_reboot_status communication_plan'
    'instructions            instructions'
    'channel_info            channel_info'
    'client_contact          visit_time'
    'admittance_type         _'
    'electricity_status      quarantine_status'
    'cable_check_need        infected_presence'
    '-                       voucher_status';

.inputContainer {
  display: grid;
  grid-template-areas: $layout;
  row-gap: sizes.$form-gap-row;
  column-gap: sizes.$form-gap-col;
}

.controls {
  margin-top: 25px;
  text-align: center;
}

.buttonRow button {
  margin: 0 10px;

  &.main-button {
    background-color: colors.$form-button-main-bg;
    color: colors.$form-button-main-fg;
    font-weight: fonts.$semibold-weight;
  }
}

::placeholder {
  color: colors.$form-input-placeholder;
}


.input-id-channel_info textarea {
  font-family: fonts.$mono-font;
}

.input-id-control-copy-result > label {
  display: flex;
  
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  margin-bottom: 12px;
}
</style>

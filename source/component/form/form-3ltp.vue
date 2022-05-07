<template>
  <form class="form container" id="form3ltp">

    <div class="inputContainer">
      <input-factory
          v-for="requisite in form3ltp.requisites"
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
          :requisite="copyToClipboardRequisite"/>
    </div>

    <input-factory :requisite="resultRequisite"/>
    
  </form>
</template>


<script setup lang='jsx'>
import { onMounted } from 'vue'

import copyToClipboard from 'copy-to-clipboard'

import InputFactory from './input/input-factory.vue'
import InputButton from './input/input-button.vue'
import form3ltp from 'asset/config/form/3ltp'


onMounted(() => {
  const channelInfoInput =
      document.querySelector('.input-id-channel_info textarea')
  channelInfoInput.setAttribute('spellcheck', 'false')
  channelInfoInput.setAttribute('wrap', 'off')
})


const fill = () => {
  const formData = new FormData (document.querySelector('#form3ltp'))

  const filled = form3ltp.requisites.reduce((result, requisite) => {
    let value
    if (requisite.input === 'checkbox') {
      const checked = document.getElementsByName(requisite.id)[0].checked
      value = checked ? requisite.checked : requisite.unchecked
    } else {
      value = formData.get(requisite.id)
    }
    return result.replace (`\${${requisite.id}}`, value ?? '')
  }, form3ltp.template)

  document.querySelector('.input-id-result textarea').value = filled

  if (document.querySelector('.control-copy-result input').checked)
    copyToClipboard(document.getElementsByName('result')[0].value)
}

const clear = () => {
  document
      .querySelectorAll('.input-typed input, .input-multiline textarea')
      .forEach(input => input.value = '')
  
  document
      .querySelectorAll('.input-radio input[data-default=true]')
      .forEach(input => input.checked = true)
  
  document
      .querySelectorAll('.input-select select option[data-default=true]')
      .forEach(option => option.selected = true)

  document
      .querySelectorAll('.input-checkbox input[type=checkbox]')
      .forEach(checkbox =>  checkbox.checked = checkbox.getAttribute('data-default-state')  === 'true')
}

const copyToClipboardRequisite = {
  id: 'control-copy-result',
  input: 'checkbox',
  state: 'checked',
  label: 'Cкопировать результат в буфер обмена'
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

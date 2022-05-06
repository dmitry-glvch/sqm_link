<template>
  <form class="form container" id="form3ltp">

    <div class="inputContainer">
      <input-factory
          v-for="r in form3ltp.requisites"
          :key="r.id"
          :requisite="r"/>
    </div>

    <div class="controls">
      <div class="buttonRow">

        <button class="main-button" @click.prevent="fill">
          Сгенерировать
        </button>

        <button @click.prevent="clear">
          Очистить
        </button>

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
@use 'style/fonts.scss';
@import 'normalize.css';


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


$inputs-typed: '.input-typed > input';
$inputs-typed-label: '.input-typed > label';

$inputs-multiline: '.input-multiline > textarea';
$inputs-multiline-label: '.input-multiline > label';

$inputs-select: '.input-select > select';
$inputs-select-label: '.input-select > label';

$inputs-checkbox: '.input-checkbox > label > input';
$inputs-checkbox-container: '.input-checkbox > label';
$inputs-checkbox-label: '.input-checkbox > label > div';

$inputs-radio: '.input-radio input';
$inputs-radio-container: '.input-radio > label:not(:first-of-type)';
$inputs-radio-label: '.input-radio > label > div';
$inputs-radio-group-label: '.input-radio label:first-of-type';


body {
  background: #e3e8ec;
  color: #0a2242;
  font-size: 16px;
  font-family: fonts.$sans-font;
  font-weight: 425;
}

form {
  padding: 20px;
  margin: 0 auto;
  min-width: 350px;
  max-width: 900px;
}

.inputContainer {
  display: grid;
  grid-template-areas: $layout;
  row-gap: 14px;
  column-gap: 20px;
}

@mixin rectangle-input {
  color: #0a2242;
  background: #fffdfc;
  border-radius: 4px;
  border-width: 0px;
}

.controls {
  margin-top: 25px;
  text-align: center;
}

.buttonRow {
  button {

    @include rectangle-input();

    margin: 0 10px;
    min-width: 150px;
    height: 40px;

    &.main-button {
      background-color: #495466;
      color: #fffdfc;
      font-weight: 500;
    }
  }
}


#{$inputs-typed},
#{$inputs-multiline},
#{$inputs-select} {

  @include rectangle-input();

  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  margin-top: 4px;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 16px #9ab5c4aa;
  }
}

#{$inputs-typed-label},
#{$inputs-multiline-label},
#{$inputs-select-label},
#{$inputs-radio-group-label} {
  color: #495466;
  font-weight: 475;
}

::placeholder {
  color: #9ab5c4;
}

#{$inputs-multiline} {
  min-height: 30px;
  resize: vertical;
}

#{$inputs-select} {
  border-right: 10px solid transparent;
  option {
    color: #0a2242;
    background: #fffdfc;
  }
}

.input-checkbox,
.input-radio {
  user-select: none;
}

#{$inputs-checkbox},
#{$inputs-radio} {
  accent-color: #ff4f12;
  vertical-align: middle;
  align-self: center;
  transform: scale(1.35);
  margin-left: 3px;
  margin-right: 10px;
}

#{$inputs-checkbox-container},
#{$inputs-radio-container} {
  display: flex;
  vertical-align: middle;
}

#{$inputs-radio-container} {
  margin-bottom: 4px;
}

#{$inputs-checkbox-label},
#{$inputs-radio-label} {
  display: inline-block;
  vertical-align: middle;
}

#{$inputs-radio-group-label} {
  display: block;
  margin-bottom: -14px;
}

.input-id-channel_info textarea {
  font-family: fonts.$mono-font;
}

.input-id-control-copy-result > label {
  display: flex;
  width: fit-content;
  margin: 0 auto;
}
</style>

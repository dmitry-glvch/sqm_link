<template>
  <form class="container">

    <h2>{{ form.title }}</h2>

    <div class="inputContainer"
        :style="{ gridTemplateAreas: form.layout }">
      <input-factory
          v-for="requisite in form.requisites"
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import copyToClipboard from 'copy-to-clipboard'

import InputFactory from 'component/form/input/input-factory.vue'
import InputButton from 'component/form/input/input-button.vue'

import fillTemplate from 'component/form/fill-template.js'
import clearInputs from 'component/form/clear-inputs.js'

import forms from 'config/forms/forms.js'


const branch = computed(() => useRoute().params.branch)
const formParam = computed(() => useRoute().params.form)

const form = computed(() => forms[branch.value][formParam.value])


const inputRefs = ref([])
const controlCopyResult = ref(null)
const result = ref(null)

const fill = () => {
  const filled = fillTemplate(inputRefs.value, form.value.template)
  document.querySelector('.input-id-result textarea').value = filled
  if (controlCopyResult.value.value())
    copyToClipboard(result.value.value())
}

const clear = () => {
  clearInputs(inputRefs.value)
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


.inputContainer {
  display: grid;
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

.input-id-result {
  margin-top: 30px;
}
</style>

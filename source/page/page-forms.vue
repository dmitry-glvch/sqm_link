<template>
  <div class="container">

    <h2>Формы</h2>

    <column-layout
        :column-count="2"
        :items="Object.entries(branchForms ?? {})">
      <template v-slot:default="{item}">

      <system-link
          :label="item[1].title"
          :path="{
            name: 'form',
            params: {
              branch: branch,
              form: item[0]
            }
          }"/>

      </template>
    </column-layout>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ColumnLayout from 'layout/column-layout.vue'
import SystemLink from 'component/systems/system-link.vue'

import forms from 'config/forms/forms.js'

const branch = computed(() => useRoute().params.branch)
const branchForms = computed(() => forms[branch.value])
</script>

<template>
  <div class="column-layout">

    <div
        v-for="(colIndices, colIndex) in indicesByCol.value"
        :key="colIndex"
        class="column">

      <template
          v-for="itemIndex in colIndices.value" :key="itemIndex">

        <slot :item="items[itemIndex]">
          {{items[itemIndex]}}
        </slot>

      </template>

    </div>

  </div>
</template>


<script setup>
import { reactive, watch } from 'vue'


const props = defineProps({
  columnCount: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

let indicesByCol = reactive({ value: [] })
const redraw = () => {
  indicesByCol.value =
      Array.from({ length: props.columnCount },
          () => reactive({ value: [] }))

  props.items.forEach((_, itemIndex) =>
      indicesByCol.value[itemIndex % props.columnCount]
          .value.push(itemIndex))
}

watch(() => props.columnCount, redraw)

redraw()
</script>


<style scoped lang="scss">
.column-layout {
  display: flex;
  gap: 12px;
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>

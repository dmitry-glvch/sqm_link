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
import { reactive, onMounted, onBeforeUnmount } from 'vue'

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
let colCount = props.columnCount

const calcColCount = () =>
    (window?.innerWidth < 700) ? 2 : props.columnCount

const redraw = () => {

  indicesByCol.value =
      Array.from({ length: colCount },
          () => reactive({ value: [] }))

  props.items.forEach((_, itemIndex) =>
      indicesByCol.value[itemIndex % colCount]
          .value.push(itemIndex))

}

const resizeListener = () => {
  const newColCount = calcColCount()
  if (colCount !== newColCount) {
    colCount = newColCount
    redraw()
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeListener)
  redraw()
})

onBeforeUnmount(() =>
    window.removeEventListener('resize', resizeListener))
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

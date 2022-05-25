<template>
  <div class="column-layout">

    <div
        v-for="(columnIndexes, j) in itemIndexesByColumn"
        :key="j"
        class="column">

      <template
          v-for="itemIndex in columnIndexes" :key="itemIndex">

        <slot :item="items[itemIndex]">
          {{items[itemIndex]}}
        </slot>

      </template>

    </div>

  </div>
</template>


<script setup>
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

const itemIndexesByColumn =
    [...Array(props.columnCount)].map(() => [])

props.items.forEach((_, itemIndex) => 
    itemIndexesByColumn[itemIndex % props.columnCount]
        .push(itemIndex))
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

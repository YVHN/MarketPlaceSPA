<template>
  <div class="progress-bar">
    <div
      class="cell"
      v-for="i in 7"
      :key="i"
      :class="{ active: i <= value }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  gap: 0.37vmin;
}

.cell {
  width: 3.148vmin;
  height: 0.37vmin;
  background: rgba(255, 255, 255, 0.14);
}

.active {
  background-color: white;
}
</style>

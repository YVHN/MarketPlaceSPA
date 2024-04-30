<template>
  <div class="progress-bar" @mousedown="startDrag" ref="progressContainer">
    <div class="progress-bar-fill" :style="{ width: fillWidth }"></div>
    <div class="progress-bar-handle" :style="{ left: handleLeft }"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: false,
    },
    maxProgress: {
      type: Number,
      required: true,
    },
    minProgress: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localProgress: Math.max(this.progress, this.minProgress), // Обновлено для учета минимального значения
      isDragging: false,
      progressBarWidth: 0,
    };
  },
  computed: {
    fillWidth() {
      const clampedProgress = Math.max(this.localProgress, this.minProgress); // Обновлено для учета минимального значения
      const range = this.maxProgress - this.minProgress;
      const clampedValue = clampedProgress - this.minProgress;
      return `${(clampedValue / range) * 100}%`;
    },
    handleLeft() {
      const clampedProgress = Math.max(this.localProgress, this.minProgress); // Обновлено для учета минимального значения
      const range = this.maxProgress - this.minProgress;
      const clampedValue = clampedProgress - this.minProgress;
      return `${(clampedValue / range) * 100 - 1}%`;
    },
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.progressBarWidth = this.$refs.progressContainer.offsetWidth;
      window.addEventListener('mousemove', this.handleDrag);
      window.addEventListener('mouseup', this.endDrag);

      const progressBarRect =
        this.$refs.progressContainer.getBoundingClientRect();
      const cursorOffsetX = event.clientX - progressBarRect.left;

      this.localProgress = Math.round(
        Math.max(
          this.minProgress,
          Math.min(
            this.maxProgress,
            (cursorOffsetX / this.progressBarWidth) * this.maxProgress,
          ),
        ),
      );
      this.pickQuantity();
    },
    handleDrag(event) {
      if (this.isDragging) {
        const progressBarRect =
          this.$refs.progressContainer.getBoundingClientRect();
        const cursorOffsetX = event.clientX - progressBarRect.left;
        const clampedCursorOffsetX = Math.max(
          0,
          Math.min(this.progressBarWidth, cursorOffsetX),
        );
        const progressPercentage = clampedCursorOffsetX / this.progressBarWidth;
        this.localProgress = Math.round(
          this.minProgress +
            progressPercentage * (this.maxProgress - this.minProgress),
        );
        this.pickQuantity();
      }
    },
    endDrag() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.handleDrag);
      window.removeEventListener('mouseup', this.endDrag);
    },
    pickQuantity() {
      this.$emit('pickQuantity', this.localProgress);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  font-size: 12vmin;
  color: white;
  position: relative;
  width: 100%;
  height: 0.37vmin;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.1vmin;
  cursor: pointer;

  &-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #5f9adf;
    border-radius: 0.5vmin;
  }

  &-handle {
    position: absolute;
    left: 0;
    width: 0.926vmin;
    height: 0.926vmin;
    top: -3px;
    cursor: pointer;
    border-radius: 0.5vmin;
    background-color: red;
    background: #d9d9d9;
    border: 0.093vmin solid #9c9c9c;
  }
}
</style>

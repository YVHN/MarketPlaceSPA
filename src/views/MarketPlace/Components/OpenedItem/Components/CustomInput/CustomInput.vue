<template>
  <!-- Инпут -->
  <input
    class="input"
    v-model="inputValue"
    @input="validateInput"
    maxlength="18"
  />
</template>

<script>
export default {
  props: {
    outsideValue: {
      type: [Number, null],
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      inputValue: this.formatInputValue(this.outsideValue),
    };
  },
  methods: {
    validateInput(event) {
      let input = event.target.value.replace(/\D/g, '');
      if (input) {
        this.inputValue = this.formatInputValue(input);
        this.$emit('setValue', +input);
      } else {
        this.$emit('setValue', 0);
        this.inputValue = '';
      }
    },
    formatInputValue(value) {
      if (!value) return '';
      const formattedValue = `$ ${Number(value).toLocaleString('ru-RU')}`;
      return formattedValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  padding: 1.481vmin 1.296vmin;
  background: rgba(255, 255, 255, 0.04);
  font-weight: 700;
  font-size: 1.296vmin;
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.22);
  }
  width: 100%;
  border-radius: 0.278vmin;
}
</style>

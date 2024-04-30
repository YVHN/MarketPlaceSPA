<template>
  <!-- Инпут -->
  <input
    class="input"
    :value="inputValue"
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
      default: null,
    },
  },
  data() {
    return {
      inputValue: this.formatInputValue(this.outsideValue),
    };
  },
  watch: {
    // Слежу за изменениями в пропе outsideValue
    outsideValue(newValue) {
      this.inputValue = this.formatInputValue(newValue);
    },
  },
  methods: {
    // Валидируем ввод
    validateInput(event) {
      let input = event.target.value;
      // Проверка на ввод только чисел
      input = input.replace(/\D/g, '');
      if (+input) {
        // Задаем новое числовое значение
        this.inputValue = this.formatInputValue(input);
        this.$emit('setValue', +input);
      } else {
        this.$emit('setValue', 0);
        this.inputValue = '';
        event.target.value = '';
      }
    },
    // Форматируем значение с символом "$" и пробелами для разделения разрядов
    formatInputValue(value) {
      if (!value) return ''; // Возвращаем пустую строку, если значение не передано
      // Форматирование с добавлением символа "$" и пробелами для разделения разрядов
      const formattedValue = `$ ${Number(value).toLocaleString('ru-RU')}`;
      return formattedValue;
    },
    sendValueOutside(num) {
      this.$emit('setValue', num);
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

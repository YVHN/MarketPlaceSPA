<template>
  <div class="specifications">
    <div
      class="specifications-unit"
      v-for="unit in getSpecification"
      :key="unit.title"
    >
      <div class="specifications-unit-title">
        {{ $store.getters.getLanguageText(unit.title) }}
      </div>
      <div class="specifications-unit-wrapper">
        <img :src="require(`@/views/MarketPlace/Assets/Icons/Items/Transport/${unit.img}.svg`)" />
        <div class="specifications-unit-value">{{ unit.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specifications: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getSpecification() {
      const list = this.specifications;
      const specifications = [
        {
          title: 'Ускорение',
          img: 'acceleration',
          value: list.acceleration,
        },
        {
          title: 'Макс. скорость',
          img: 'acceleration',
          value: list.speed,
        },
        {
          title: 'Тормоза',
          img: 'clutch',
          value: list.clutch,
        },
        {
          title: 'Управляемость',
          img: 'controllability',
          value: list.controllability,
        },
      ];
      return specifications;
    },
  },
};
</script>

<style lang="scss" scoped>
.specifications {
  margin-top: 1.574vmin;
  display: flex;
  gap: 1.481vmin;
  width: 24.074vmin;

  &-unit {
    width: 12.037vmin;
    padding: 1.111vmin;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.185vmin;

    &-title {
      text-wrap: nowrap;
      margin-bottom: 1.019vmin;
      font-weight: 700;
      font-size: 1.111vmin;
      color: #fff;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.111vmin;
      color: #fff;

      & > img {
        margin-right: 0.556vmin;
        width: 1.389vmin;
        height: 1.389vmin;
      }
    }

    &-value {
      font-weight: 700;
      font-size: 1.111vmin;
      color: #5f9adf;
    }
  }
}
</style>

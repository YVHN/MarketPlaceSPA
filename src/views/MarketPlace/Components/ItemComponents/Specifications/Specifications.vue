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
          title: 'Турбонаддув',
          img: 'acceleration',
          value: list.turbine,
        },
        {
          title: 'Двигатель',
          img: 'acceleration',
          value: list.engine,
        },
        {
          title: 'Тормоза',
          img: 'clutch',
          value: list.brake,
        },
        {
          title: 'Подвеска',
          img: 'controllability',
          value: list.suspencion,
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
  width: 100%;
  flex-wrap: wrap;

  &-unit {
    flex-grow: 1;
    width: 12.037vmin;
    padding: 2vmin;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.185vmin;

    &-title {
      text-wrap: nowrap;
      margin-bottom: 1.019vmin;
      font-weight: 700;
      font-size: 1.111vmin;
      color: #fff;
      text-align: center;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.4vmin;
      color: #fff;
      justify-content: center;

      & > img {
        margin-right: 0.556vmin;
        width: 1.6vmin;
        height: 1.6vmin;
      }
    }

    &-value {
      font-weight: 700;
      font-size: 1.4vmin;
      color: #5f9adf;
    }
  }
}
</style>

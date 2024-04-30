<template>
  <div class="aside">
    <div class="aside-sections-list">
      <NavigateButton
        v-for="(section, index) in tradingSections"
        :key="index"
        :data="section"
        :section="'trading'"
      />
    </div>
    <div class="aside-sections-list personal">
      <NavigateButton
        v-for="(section, index) in personalSections"
        :key="index"
        :data="section"
        :section="'personal'"
      />
      <div class="aside-exit">
        <img class="section-img" src="@/views/MarketPlace/Assets/Icons/exit.svg" />
        {{ $store.getters.getLanguageText('Выйти') }}
      </div>
    </div>
  </div>
</template>

<script>
import NavigateButton from './Components/NavigateButton/NavigateButton.vue';

export default {
  data() {
    return {
      tradingSections: [
        {
          title: 'Аукцион',
          img: 'auction',
          path: 'auction',
        },
        {
          title: 'Недвижимость',
          img: 'estate',
          path: 'estate',
        },
        {
          title: 'Транспорт',
          img: 'transport',
          path: 'transport',
        },
        {
          title: 'Предметы',
          img: 'items',
          path: 'items',
        },
        {
          title: 'Аренда транспорта',
          img: 'rent',
          path: 'transportRent',
        },
        {
          title: 'Одежда и аксессуары',
          img: 'clothes',
          path: 'clothes',
        },
        {
          title: 'Услуги и прочее',
          img: 'services',
          path: 'services',
        },
        {
          title: 'Бизнес',
          img: 'business',
          path: 'business',
        },
      ],
      personalSections: [
        {
          title: 'Избранное',
          img: 'favorites',
          path: 'favorites',
        },
        {
          title: 'Склад хранения',
          img: 'storage',
          path: 'storage',
        },
        {
          title: 'Мои обьявления',
          img: 'listings',
          path: 'listings',
        },
        {
          title: 'История покупок',
          img: 'history',
          path: 'history',
        },
      ],
    };
  },
  components: {
    NavigateButton,
  },
};
</script>

<style lang="scss" src="./Navigation.scss" scoped></style>

<template>
  <div class="header">
    <div class="header-actions">
        <div class="header-title" v-if="getSectionTitle" :key="1">
          {{ $store.getters.getLanguageText(getSectionTitle) }}
        </div>
        <ReturnBack v-if="isItemSelected || isCreateListing" :key="2"/>
        <SortSelects :selects="selects" v-else-if="isShowSort" :key="3"/>
    </div>
    <div class="header-content">
      <div class="header-content-create-button" @click="openCreateListing">{{
        $store.getters.getLanguageText('Создать') }}</div>
      <div class="header-content-money">
        <div class="header-content-money-cash">
          {{ `200 300 333 333` }}
          <span>$</span>
          <img src="@/views/MarketPlace/Assets/Icons/Secondary/cash.svg" alt="" />
        </div>
        <div class="header-content-money-bank">
          {{ `200 300 333 333` }}
          <span>$</span>
          <img src="@/views/MarketPlace/Assets/Icons/Secondary/bank.svg" alt="" />
        </div>
      </div>
      <div class="header-content-user">
        Maneskin Benson
        <img class="header-content-user-avatar" src="@/views/MarketPlace/Assets/Icons/Secondary/avatar.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import SortSelects from './Components/SortSelects.vue';
import ReturnBack from './Components/ReturnBack.vue';

export default {
  name: 'Header',
  components: {
    ReturnBack,
    SortSelects
  },
  computed: {
    isCreateListing() {
      return this.$route.path.includes('createListing');
    },
    isShowSort() {
      const result = ['favorites', 'storage', 'listings', 'history'].includes(this.$route.params.section) || this.isCreateListing;
      return !result;
    },
    isItemSelected() {
      const result = this.$store.getters.getSelectedItem;
      return result ? true : false;
    },
    getSectionTitle() {
      const section = this.$route.params?.section || 'createListing';
      const titles = {
        'storage': 'Склад хранения',
        'listings': 'Мои обьявления',
        'history': 'История покупок',
        'favorites': 'Избранное',
        'createListing': 'Создать обьявление',
      }
      const title = titles[section];
      return title ? title : '';
    },
  },
  data() {
    return {
      selects: [
        {
          id: 1,
          title: 'Выбор категории',
          type: 'type',
          options: [
            'Анимации',
            'Транспорт',
            'Одежда',
            'Скины',
            'Стикеры',
            'Предметы',
            'Оружие',
          ],
        },
        {
          id: 2,
          title: 'Сортировать',
          type: 'method',
          options: [
            'Самые популярные',
            'По возрастанию цены',
            'По убыванию цены',
            'По дате размещения',
            'По дате окончания',
          ],
        },
      ],
    }
  },
  methods: {
    openCreateListing() {
      if(!this.$route.path.includes('createListing')) {
        this.$router.push('/market-place/createListing/all');
      }
    }
  },
};
</script>

<style lang="scss" src="./Header.scss"></style>

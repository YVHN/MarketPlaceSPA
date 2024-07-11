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
      <div class="header-content-create-button" :class="{off: getOpeningType === 'InStorage'}" @click="openCreateListing">{{
        $store.getters.getLanguageText('Создать') }}</div>
      <div class="header-content-money">
        <div class="header-content-money-cash">
          {{ formatNumber(getUserInfo?.moneyCash) }}
          <span>$</span>
          <img src="@/views/MarketPlace/Assets/Icons/Secondary/cash.svg" alt="" />
        </div>
        <div class="header-content-money-bank">
          {{ formatNumber(getUserInfo?.moneyBank) }}
          <span>$</span>
          <img src="@/views/MarketPlace/Assets/Icons/Secondary/bank.svg" alt="" />
        </div>
      </div>
      <div class="header-content-user">
        {{ getUserInfo.userName || '' }}
        <img class="header-content-user-avatar" src="@/views/MarketPlace/Assets/Icons/Secondary/avatar.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import SortSelects from './Components/SortSelects.vue';
import ReturnBack from './Components/ReturnBack.vue';
import { formatNumber } from '@/functions/marketplace';
import events from '@/modules/events';

export default {
  name: 'Header',
  components: {
    ReturnBack,
    SortSelects
  },
  data() {
    return {
      selects: [
        // {
        //   id: 1,
        //   title: 'Выбор категории',
        //   type: 'type',
        //   options: [
        //     'Анимации',
        //     'Транспорт',
        //     'Одежда',
        //     'Скины',
        //     'Стикеры',
        //     'Предметы',
        //     'Оружие',
        //   ],
        // },
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
  computed: {
    getOpeningType() {
      return this.$store.getters.getOpeningType;
    },
    isCreateListing() {
      return this.$route.path.includes('createListing');
    },
    isShowSort() {
      const result = ['favorites', 'storage', 'listings', 'history'].includes(this.$route.params.section) || this.isCreateListing;
      return !result;
    },
    isItemSelected() {
      const result = this.$store.getters.getPickedItem
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
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    openCreateListing() {
      if(!this.$route.path.includes('createListing')) {
        this.$store.commit('resetPickedItem');
        events.callServer('MarketPlace:CreateListing:Leave:Server');
        this.$router.push('/market-place/createListing/all');
      }
    },
    formatNumber(num) {
      return formatNumber(num);
    }
  },
};
</script>

<style lang="scss" src="./Header.scss"></style>

<template>
  <div class="header">
    <div class="header-title" v-show="getSectionTitle">
      {{ $store.getters.getLanguageText(getSectionTitle) }}
    </div>
    <div class="header-return-button" v-if="getIsShowReturnButton" @click="returnBack">
      <returnBack class="header-return-button-img" />
      {{ $store.getters.getLanguageText('Вернуться назад') }}
    </div>
    <div class="header-sort" v-else-if="getIsShowSort">
      <div class="header-sort-select" v-for="select in selects" :key="select.id"
        :class="{ 'active-select': activeSelectId === select.id }" @click.stop="openSelect(select.id)">
        {{ $store.getters.getLanguageText(getSelectValue(select)) }}
        <img src="@/views/MarketPlace/Assets/Icons/Secondary/dropdown.svg" />
        <div class="header-sort-select-body">
          <div class="header-sort-select-body-list">
            <div v-show="sortType || sortMethod" class="header-sort-select-body-list-item item-reset"
              @click="resetSortUnit(select.type)">
              {{ $store.getters.getLanguageText('Сбросить фильтр') }}
            </div>
            <div class="header-sort-select-body-list-item" :class="{ picked: sortType === option }"
              v-for="option in select.options" @click.stop="chooseSortType(select.type, option)" :key="option">
              {{ $store.getters.getLanguageText(option) }}
            </div>
          </div>
        </div>
      </div>
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
import returnBack from '@/views/MarketPlace/Assets/Icons/returnBack.vue';
import events from '@/modules/events';

export default {
  components: {
    returnBack,
  },
  computed: {
    getIsShowReturnButton() {
      const path = this.$route.path;
      return path.includes('opened') || path.includes('create');
    },
    getIsShowSort() {
      const path = this.$route.path;
      return !this.getIsShowReturnButton && path.includes('trading');
    },
    getSectionTitle() {
      const path = this.$route.path;
      if (path.includes('storage')) return 'Склад хранения';
      if (path.includes('listings')) return 'Мои обьявления';
      if (path.includes('history')) return 'История покупок';
      if (path.includes('favorites')) return 'Избранное';
      if (path.includes('create-listing')) return 'Создать обьявление';
      return '';
    },
  },
  data() {
    return {
      activeSelectId: 0,
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
      sortType: '',
      sortMethod: '',
    };
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
      this.$store.dispatch('resetPickedItem');
    },
    chooseSortType(type, value) {
      if (type === 'type') {
        this.sortType = value;
      } else if (type === 'method') {
        this.sortMethod = value;
      }
      this.activeSelectId = 0;
    },
    openSelect(id) {
      if (this.activeSelectId === id) {
        this.activeSelectId = 0;
      } else {
        this.activeSelectId = id;
      }
    },
    resetSortUnit(sort) {
      if (sort === 'type') {
        this.sortType = '';
      } else if (sort === 'method') {
        this.sortMethod = '';
      }
    },
    getSelectValue(select) {
      if (select.type === 'type') {
        return this.sortType ? this.sortType : select.title;
      } else if (select.type === 'method') {
        return this.sortMethod ? this.sortMethod : select.title;
      } else {
        return '';
      }
    },
    openCreateListing() {
      if(!this.$route.path.includes('create-listing')) {
        this.$store.dispatch('resetPickedItem');
        this.$router.push('/market-place/create-listing/all');
        events.callServer(
          'MarketPlace:List:GetListData:Server',
          'createListing',
          1
        );
      }
    }
  },
};
</script>

<style lang="scss" src="./HeaderBlock.scss"></style>

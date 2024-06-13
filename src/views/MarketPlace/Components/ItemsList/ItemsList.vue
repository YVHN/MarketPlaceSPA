<template>
  <div class="itemsList">
    <!-- Список предметов -->
    <div class="itemsList-list-wrapper">
      <div class="itemsList-list" v-if="listData.length">
        <Item v-for="item in listData" @click.native="handleItemClick(item)" :item="item"
          :key="item.id" />
        <AddLot :data="itemData" v-if="isAddLot" @toggleIsAddStatus="toggleIsAddStatus" />
      </div>
      <!-- Пустая страница -->
      <div v-else>
        <EmptyPage />
      </div>
      <!-- Пагинация -->
      <Pagination :pages-quantity="getPagesInSection" />
    </div>
  </div>
</template>

<script>
import Item from './Components/Item/Item.vue';
import AddLot from '../OpenedItem/Components/OpenedExchange/Components/AddLot/AddLot.vue';
import EmptyPage from '../EmptyPage/EmptyPage.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';
import itemsFullData from '../../Assets/Data/itemsFullData';

import Pagination from './Components/Pagination/Pagination.vue';
import sectionsData from '../../Assets/Data/sectionsData';

export default {
  components: {
    Item,
    EmptyPage,
    AddLot,
    Pagination,
  },
  props: {
    listData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemData: {},
      isAddLot: false,
    };
  },
  computed: {
    getPagesInSection() {
      return this.$store.getters.getPagesInSection;
    },
    isCreateListing() {
      return this.$route.path.includes('createListing');
    },
    getCurrentSection() {
      return this.$route.params.section;
    }
  },
  mounted() {
    onUnmounted(() => {
      events.remove('MarketPlace:Storage:DeleteItem:Cef');
      events.remove('MarketPlace:Item:SetFullData:Cef');
      events.remove('MarketPLace:Storage:AcceptUnload:Cef')
    });

    events.add('MarketPlace:Storage:DeleteItem:Cef', (id) => {
      this.$store.commit('deleteItemFromStorage', id);
    });
    events.add('MarketPLace:Storage:AcceptUnload:Cef', (id) => {
      this.$store.commit('unloadItem', id);
    })
    // Получение фулл даты предмета
    events.add('MarketPlace:Item:SetFullData:Cef', (json) => {
      const parsedJson = JSON.parse(json);
      if (!parsedJson) return null;
      this.$router.push(`/market-place/viewing/${this.$route.params.section}/opened`);
      console.log('Запрос предмета успешен');
      this.$store.commit('pickItem', parsedJson);
    });
  },
  methods: {
    handleItemClick(item) {
      // Если айтем на продаже, то вызов фулл даты
      if (this.checkPath('viewing') && !item?.storageData) {
        this.viewingAction(item);
        // Если айтем создания обьявления 
      } else if (this.checkPath('createListing')) {
        this.createListingAction(item);
      } else if (item?.storageData) {
        this.storageAction(item);
      }
    },
    storageAction(item) {
      console.log('выгрузка');
      events.callServer('MarketPlace:Storage:Unload:Server', item.id);
    },
    viewingAction(item) {
      // events.callServer('MarketPlace:Item:GetFullData:Server', item.id);
      this.$store.commit('pickItem', itemsFullData.exchange[0]);
      this.$router.push('/market-place/viewing/auction/opened');
    },
    createListingAction(item) {
      // Если это предмет 
      if (item.sellData.type === 'item') {
        this.itemData = item;
        this.toggleIsAddStatus();
        // Если это категория создания обьявления
      } else if (item.sellData?.filter && item.status === 'available') {
        // Фильтр предметов
        if (item.sellData.filter === 'empty') {
          this.$store.commit('pickItem', { sellData: {} });
          this.$router.push('/market-place/createListing/all/empty');
        } else {
          this.$router.push(`/market-place/createListing/${item.sellData.filter}`);
        }
      } else if (item.sellData.type !== 'service') {
        if (this.$route.params.filter) {
          this.$router.push(`/market-place/createListing/${this.$route.params.filter}/create`);
        } else {
          this.$router.push(
            `/market-place/createListing/${item.sellData.type}/create`,
          );
        }
        this.$store.commit('pickItem', item);
      }
    },
    toggleIsAddStatus() {
      this.isAddLot = !this.isAddLot;
    },
    checkPath(path) {
      return this.$route.path.includes(path);
    },
  },
};
</script>

<style lang="scss" src="./ItemsList.scss"></style>
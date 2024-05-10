<template>
  <div class="itemsList">
    <!-- Список предметов -->
    <div class="itemsList-list-wrapper">
      <div class="itemsList-list" v-if="listData.length">
        <Item v-for="item in listData" @click.native="handleItemClick(item)" @unloadItem="unloadItem" :item="item"
          :key="item.id" />
        <AddLot :data="shortItemData" v-if="isAddLot" @toggleIsAddStatus="toggleIsAddStatus" />
      </div>
      <!-- Пустая страница -->
      <div v-else>
        <EmptyPage />
      </div>
      <!-- Пагинация -->
      <div class="itemsList-pagination">
        <TransitionGroup class="itemsList-pagination-transition" tag="div" name="pagination">
          <div class="itemsList-pagination-page" v-for="page in getPagesInSection" :key="page" @click="goToPage(page)"
            :class="{ active: currentPage === page }">
            {{ page }}
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Components/Item/Item.vue';
import AddLot from '../OpenedItem/Components/OpenedExchange/Components/AddLot/AddLot.vue';
import EmptyPage from '../EmptyPage/EmptyPage.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';

export default {
  components: {
    Item,
    EmptyPage,
    AddLot,
  },
  props: {
    listData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      shortItemData: {},
      isAddLot: false,
      currentPage: 1,
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
    });
    if (this.isCreateListing) {
      events.callServer('MarketPlace:List:GetListData:Server', 'createListing', 1);
    }

    events.add('MarketPlace:Storage:DeleteItem:Cef', (id) => {
      this.$store.commit('deleteItemFromStorage', id);
    });
    // Получение фулл даты
    events.add('MarketPlace:Item:SetFullData:Cef', (json) => {
      const parsedJson = JSON.parse(json);
      if (!parsedJson) return null;
      this.$router.push(`/market-place/viewing/${this.$route.params.section}/opened`);
      console.log('айтем пришёл');
      this.$store.commit('pickItem', parsedJson);
    });
  },
  watch: {
    getCurrentSection(newVal) {
      this.$store.commit('resetPickedItem');
      this.$store.commit('resetListData');
      events.callServer('MarketPlace:List:GetListData:Server', newVal, 1);
    }
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
      events.callServer(
        'MarketPlace:List:GetListData:Server',
        this.$route.params.section,
        this.currentPage
      );
    },
    handleItemClick(item) {
      if (this.checkPath('viewing')) {
        events.callServer('MarketPlace:Item:GetFullData:Server', item.id);
      } else if (this.checkPath('storage')) {
        return '';
      } else if (this.checkPath('createListing')) {
        if (item.sellData.type === 'item') {
          this.shortItemData = item.sellData;
          this.toggleIsAddStatus();
        } else if (item.sellData?.filter && item.status === 'available') {
          if (item.sellData.filter === 'none') {
            this.$store.commit('pickItem', { sellData: {} });
            this.$router.push('/market-place/createListing/none/empty');
          } else if (item.sellData.filter === 'transportRent') {
            this.$router.push('/market-place/createListing/transport-rent');
          } else if (item.sellData.filter === 'auction') {
            this.$router.push('/market-place/createListing/auction');
          }
        } else if (this.checkPath('createListing')) {
          if (this.$route.params.filter) {
            this.$router.push(`/market-place/createListing/${this.$route.params.filter}/create`);
          } else {
            this.$router.push(
              `/market-place/createListing/${item.sellData.type}/create`,
            );
          }
          this.$store.commit('pickItem', item);
        } else {
          events.callServer('MarketPlace:Item:GetFullData:Server', item.id);
        }
      }
    },
    unloadItem(id) {
      events.callServer('MarketPlace:Storage:Unload:Server', id);
    },
    toggleIsAddStatus() {
      this.isAddLot = !this.isAddLot;
    },
    checkPath(path) {
      return this.$route.path.includes(path);
    },
    typeIdentify(pickedItem) {
      if (pickedItem?.auctionData !== undefined) return 'auction';
      if (pickedItem?.tradeData !== undefined) return 'exchange';
      if (pickedItem) return 'listings';
    },
  },
};
</script>

<style lang="scss" src="./ItemsList.scss"></style>
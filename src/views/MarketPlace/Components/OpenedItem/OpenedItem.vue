<template>
  <div class="openedItem">
    <!-- Аукцион -->
    <div class="openedItem-opened" v-if="getAction === 'opened'">
      <OpenedAuction
        v-if="getPickedItem?.auctionData"
        :sellItem="getPickedItem.sellData"
        :lotData="getPickedItem"
      />
      <!-- Биржа -->
      <OpenedExchange
        v-else-if="getPickedItem?.tradeData"
        :sellItem="getPickedItem.sellData"
        :item="getPickedItem"
      />
      <!-- Обьявление -->
      <OpenedListing
        v-else-if="getPickedItem?.listingData"
        :itemData="getPickedItem"
      />
    </div>
    <div class="openedItem-create" v-if="getAction === 'create'"></div>
  </div>
</template>

<script>
import events from '@/modules/events';
import OpenedAuction from './Components/OpenedAuction/OpenedAuction.vue';
import OpenedExchange from './Components/OpenedExchange/OpenedExchange.vue';
import OpenedListing from './Components/OpenedListing/OpenedListing.vue';

export default {
  data() {
    return {
      isMakeBet: false,
      pricesData: [90000, 150000, 120000, 180000, 310000, 315000],
      isLiked: false,
      chatInput: '',
      buyItemData: {},
    };
  },
  methods: {
    toLike() {
      this.isLiked = !this.isLiked;
      events.callServer(
        'MarketPlace:Item:Like:Server',
        this.itemData.id,
        this.isLiked,
      );
      // На сервере
      this.$store.dispatch('toLike', {
        id: this.itemData.id,
        likedStatus: this.isLiked,
      });
      events.callServer(
        'MarketPlace:Item:GetItemFullData:Server',
        this.itemData.id,
      );
    },
    handleItemClick(item) {
      // events.callServer(
      //   'MarketPlace:Item:GetItemFullData:Server',
      //   item.id,
      //   item.category,
      // );
      // На сервере
      let result;
      // Если айтем на складе, ничего не делать
      if (this.checkPath('storage')) return '';
      // Если айтем предлагается для создания обьявления
      if (this.checkPath('create-listing')) {
        if (item.type === 'item') {
          this.shortItemData = item;
          this.isAddLot = true;
        }
        if (item?.action === 'empty') {
          this.fullItemData = {};
          this.$store.dispatch('toggleStatus', 'createListing');
        } else if (item?.action === 'sortTransport') {
          this.$emit('sort', 'transport');
        } else {
          result = this.$store.getters.getItemFullData(item.id, 'items');
          if (result) {
            this.fullItemData = result;
            console.log(result);
            this.$store.dispatch('toggleStatus', 'createListing');
          }
        }
      } else if (this.checkPath('trading')) {
        result = this.$store.getters.getItemFullData(
          item.id,
          this.typeIdentify(item),
        );
        if (result) {
          this.fullItemData = result;
          this.$store.dispatch('toggleStatus', 'pickedItem');
        }
      }
    },
    typeIdentify(pickedItem) {
      if (pickedItem?.competitors !== undefined) return 'auction';
      if (pickedItem?.available !== undefined) return 'exchange';
      if (pickedItem) return 'listings';
    },
    checkPath(path) {
      return this.$route.path.includes(path);
    },
  },
  computed: {
    getPickedItem() {
      return this.$store.getters.getPickedItem;
    },
    getAction() {
      return this.$route.params.action;
    },
  },
  components: {
    OpenedAuction,
    OpenedExchange,
    OpenedListing,
  },
};
</script>

<style lang="scss" src="./OpenedItem.scss" scoped></style>

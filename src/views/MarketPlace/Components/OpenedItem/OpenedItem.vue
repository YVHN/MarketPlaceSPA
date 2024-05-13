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
import { onUnmounted } from 'vue';

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
  mounted() {
    onUnmounted(() => {
      if(this.$route.params?.section) {
        events.callServer('MarketPlace:List:GetListData:Server', this.$route.params.section, 1);
      }
    });
  },
  methods: {
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

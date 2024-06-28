<template>
  <div class="openedListing">
    <div class="item">
      <div class="item-img">
        <Img :card-item="getItem" :size="'l'" />
        <FavoriteIndicator :item-id="getItem.id" :size="'big'" :is-favorite="getItem.isFavorite" />
      </div>
      <div class="item-testDrive" @click="handleTestDriveClick" v-if="getItem.sellData.type === 'transport'">
        {{ $store.getters.getLanguageText('Тест драйв') }}
      </div>
      <div class="item-comment">
        <div class="item-comment-title">
          {{ $store.getters.getLanguageText('Комментарий продавца:') }}
        </div>
        <div class="item-comment-text">
          {{ getItem.sellData.description }}
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info-header">
        <div class="info-header-title">
          {{ getItemTitle(getItem) }}
        </div>
        <div class="info-header-container">
          <div class="info-header-price">
            {{ getItemPrice }}
          </div>
          <div class="info-header-statePrice" v-if="getItem.sellData?.statePrice">
            {{ $store.getters.getLanguageText('Гос. цена:') }}
            <span class="info-header-statePrice-value">{{
              `${formatNumber(getItem.sellData.statePrice)} $`
              }}</span>
          </div>
        </div>
      </div>
      <CardItemTips :card-item="getItem" class="info-tips" />
      <ItemMainInfo :card-item="getItem" :type="'column'" class="info-properties"/>
      <div class="info-seller" v-if="getItem?.listingData?.seller">
        <div class="info-seller-unit">
          <div class="info-seller-unit-title">
            {{ $store.getters.getLanguageText('Продавец') }}
          </div>
          <div class="info-seller-unit-value">
            {{ getItem.listingData.seller.username }}
            <span>{{ `#${getItem.listingData.seller.static}` }}</span>
          </div>
        </div>
        <div class="info-seller-unit" v-if="getItem?.listingData?.seller?.phone">
          <div class="info-seller-unit-title">
            {{ $store.getters.getLanguageText('Телефон') }}
          </div>
          <div class="info-seller-unit-value">
            {{ getItem.listingData.seller.phone }}
          </div>
        </div>
      </div>
      <div class="info-actions">
        <div class="info-actions-makeDeal" @click="makeDeal">
          {{ $store.getters.getLanguageText('Начать сделку') }}
        </div>
        <template v-if="getItem?.listingData?.seller?.phone">
          <div class="action">
            <call class="action-img" />
          </div>
          <div class="action">
            <message class="action-img" />
          </div>
        </template>
      </div>
      <Specifications :specifications="getItem.sellData.specifications" v-if="getItem.sellData?.specifications" />
    </div>
    <RentModal v-if="isRent" :item="getItem" @toggleRentStatus="toggleRentStatus" />
  </div>
</template>

<script>
import events from '@/modules/events';
import RentModal from './Components/RentModal/RentModal.vue';
import Img from '../../../ItemComponents/Img/Img.vue';
import Specifications from '../../../ItemComponents/Specifications/Specifications.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import ItemMainInfo from '../../../ItemComponents/ItemMainInfo/ItemMainInfo.vue';
import call from '@/views/MarketPlace/Assets/Icons/Item/call.vue';
import message from '@/views/MarketPlace/Assets/Icons/Item/message.vue';
import CardItemTips from '../../../CardItemTips/CardItemTips.vue';
import { onUnmounted } from 'vue';
import { getItemTitle, formatNumber } from '@/functions/marketplace';

export default {
  components: {
    call,
    message,
    RentModal,
    Img,
    Specifications,
    FavoriteIndicator,
    ItemMainInfo,
    CardItemTips,
  },
  data() {
    return {
      isRent: false,
    };
  },
  mounted() {
    onUnmounted(() => {
      events.remove('MarketPlace:Listing:AcceptDeal:Cef');
    });
    events.add('MarketPlace:Listing:AcceptDeal:Cef', () => {
      this.$router.push('/market-place/viewing/storage');
      this.$store.commit('resetPickedItem');
      this.$store.commit('resetListData');
      events.callServer('MarketPlace:List:GetListData:Server', 'storage', 1);
    });
  },
  methods: {
    handleTestDriveClick() {
      events.callServer('Marketplace:VehicleTestDrive:Server', this.getItem.id);
    },
    getItemTitle(itemCard) {
      return getItemTitle(itemCard);
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    toggleRentStatus() {
      this.isRent = !this.isRent;
    },
    makeDeal() {
      if (this.getItem?.sellData.rentPrice) {
        this.toggleRentStatus();
      } else {
        events.callServer(
          'MarketPlace:Listing:MakeDeal:Server',
          this.getItem.id,
        );
      }
    },
  },
  computed: {
    getItem() {
      return this.$store.getters.getPickedItem;
    },
    getItemPrice() {
      const isRent = this.getItem.sellData?.rentPrice;
      const price = isRent ? this.getItem.sellData.rentPrice : this.getItem.sellData.price;
      return `$ ${this.formatNumber(price)} ${isRent ? '/ч.' : ''}`
    }
  },
};
</script>

<style lang="scss" src="./OpenedListing.scss" scoped></style>

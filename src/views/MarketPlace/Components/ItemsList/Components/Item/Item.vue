<template>
  <div class="item" :class="{ deactivate: getOpeningType === 'InTablet' && item?.storageData }">
    <div class="item-top">
      <div class="item-header">
        <div class="item-header-info">
          <template v-if="item?.auctionData">
            <div class="unit" v-if="isHas('auctionData', 'competitors')">
              <competitors class="unit-icon" />
              {{ formatNumber(item.auctionData.competitors) }}
            </div>
            <div class="unit" v-if="shelfTime">
              <endTime class="unit-icon" />
              {{ shelfTime }}
            </div>
          </template>
          <template v-else>
            <div class="unit" v-if="isHas('sellData', 'parkingCapacity')">
              <parking class="unit-icon" />
              {{ formatNumber(sellData.parkingCapacity) }}
            </div>
            <div class="unit" v-if="isHas('sellData', 'maxTenants')">
              <tenants class="unit-icon" />
              {{ formatNumber(sellData.maxTenants) }}
            </div>
            <div class="unit" v-if="isShowQuantityTip">
              <quantity class="unit-icon" />
              {{
                `${sellData.quantity} ${$store.getters.getLanguageText('шт.')}`
              }}
            </div>
            <div class="unit" v-if="isShowWeightTip">
              <weight class="unit-icon" />
              {{
                `${formatNumber(
                  sellData.weight,
                )} ${$store.getters.getLanguageText('кг.')}`
              }}
            </div>
          </template>
        </div>
        <Img class="item-header-img" :card-item="item" :size="'s'" :isSmall="sellData?.filter ? true : false" />
        <FavoriteIndicator class="item-favorite" :itemId="item.id" :size="'small'"
          :is-favorite="item?.isFavorite ? item.isFavorite : false" v-if="!isHideFavorite" />
      </div>
      <div class="item-title">
        {{ getItemTitle(item) }}
      </div>
      <div class="item-category">
        {{ getItemSubTitle }}
      </div>
    </div>
    <div class="item-footer">
      <div class="item-storage" v-if="item?.storageData">
        <div class="item-storage-time">
          <span>{{ $store.getters.getLanguageText('Время хранения:') }} </span>
          {{ shelfTime }}
        </div>
        <div class="item-storage-button" v-if="!$route.path.includes('createListing')">
          {{ $store.getters.getLanguageText(getOpeningType === 'InTablet' ? 'Выгрузка не доступна с планшета' :
            'Выгрузить
          со склада') }}
        </div>
      </div>
      <div class="item-exchange" v-else-if="item?.tradeData">
        <div class="item-exchange-price">
          <div class="item-exchange-price-title">
            {{ $store.getters.getLanguageText('Цена от:') }}
          </div>
          <div class="item-exchange-price-value">
            {{ `$ ${formatNumber(item.tradeData.startPrice)}` }}
          </div>
        </div>
        <div class="item-exchange-available">
          <div class="item-exchange-available-title">
            {{ $store.getters.getLanguageText('Кол-во товара:') }}
          </div>
          <div class="item-exchange-available-value">
            {{ formatNumber(item.tradeData.available) }}
          </div>
        </div>
      </div>
      <div class="item-transportRent" v-else-if="isHas('sellData', 'rentPrice')">
        <div class="item-default-price">
          {{ `${formatNumber(item.sellData.rentPrice)} $` }}
          <span>{{ $store.getters.getLanguageText('/ч.') }}</span>
        </div>
        <div class="item-default-likesviews">
          <div class="unit" v-if="item?.likes">
            <likes class="unit-img" />{{ item.likes }}
          </div>
          <div class="unit">
            <img class="unit-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
            {{ item.views }}
          </div>
        </div>
      </div>
      <div class="item-status" v-else-if="item?.status">
        <div class="item-status-value" :class="item.status">
          {{ $store.getters.getLanguageText(getItemStatus) }}
        </div>
      </div>
      <div class="item-service" v-else-if="item.sellData.type === 'service'">
        <div class="item-default-likesviews">
          <div class="unit" v-if="item?.likes">
            <likes class="unit-img" />{{ item.likes }}
          </div>
          <div class="unit">
            <img class="unit-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
            {{ item.views }}
          </div>
        </div>
      </div>
      <div class="item-default" v-else>
        <div class="item-default-price" v-if="$store.getters.getPrice(item)">
          {{ `$ ${formatNumber($store.getters.getPrice(item))}` }}
        </div>
        <div class="item-default-likesviews">
          <div class="unit" v-if="item?.likes">
            <likes class="unit-img" />{{ item.likes }}
          </div>
          <div class="unit">
            <img class="unit-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
            {{ item.views }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Img from '../../../ItemComponents/Img/Img.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
// icons
import competitors from '@/views/MarketPlace/Assets/Icons/Item/competitors.vue';
import parking from '@/views/MarketPlace/Assets/Icons/Item/parking.vue';
import quantity from '@/views/MarketPlace/Assets/Icons/Item/quantity.vue';
import tenants from '@/views/MarketPlace/Assets/Icons/Item/tenants.vue';
import likes from '@/views/MarketPlace/Assets/Icons/Item/likes.vue';
import weight from '@/views/MarketPlace/Assets/Icons/Item/weight.vue';
import endTime from '@/views/MarketPlace/Assets/Icons/Item/time.vue';

import events from '@/modules/events';
import { onUnmounted } from 'vue';
import { getEndTime } from '@/functions/marketplace';

import { getItemSubTitle, getItemTitle } from '@/functions/marketplace';

import { getImgPath } from '@/functions/marketplace';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sellData: this.item.sellData,
      timer: null,
      shelfTime: null,
    };
  },
  components: {
    FavoriteIndicator,
    quantity,
    competitors,
    tenants,
    likes,
    parking,
    weight,
    Img,
    endTime,
  },
  computed: {
    getItemAddress() {
      return this.$store.getters.getItemAddress(this.item.sellData.coordinates);
    },
    getItemSubTitle() {
      const item = this.item;
      if (item && item.sellData?.coordinates) {
        // return item.sellData?.address || this.getItemAddress;
        return this.getItemAddress;
      } else {
        return this.$store.getters.getLanguageText(getItemSubTitle(item, this.$route.params.section));
      }
    },
    isShowQuantityTip() {
      return this.isHas('sellData', 'quantity') && (this.$route.params.section === 'storage' || this.$route.path.includes('createListing'));
    },
    isShowWeightTip() {
      return this.isHas('sellData', 'weight') && (this.$route.params.section === 'storage' || this.$route.path.includes('createListing'));
    },
    isHideFavorite() {
      const isStorage = this.item?.storageData;
      const isCreateListing = this.item?.status;
      return isStorage || isCreateListing;
    },
    getIsImgFull() {
      return ['business', 'house', 'apartment'].includes(this.sellData.type);
    },
    getItemStatus() {
      const statuses = {
        available: 'Доступно',
        storage: 'На складе',
        unavailable: 'Не доступно',
        owned: 'В собственности',
      };
      return statuses[this.item.status];
    },
    getItemListingType() {
      if (!this.item) return false;
      if (this.item?.auctionData) {
        return 'auction';
      } else if (this.item?.listingData) {
        return 'listing';
      } else if (this.item?.tradeData) {
        return 'trade';
      }
      return '';
    },
    getOpeningType() {
      return this.$store.getters.getOpeningType;
    }
  },
  mounted() {
    if (this.item?.storageData?.endTime || this.item?.endTime) {
      this.getEndTime();
      this.startTimer();
    }
    onUnmounted(() => {
      this.stopTimer;
    });
    if (this.item.sellData?.coordinates) {
      console.log(this.item.sellData?.coordinates);
      mp.trigger("MarketPlace:Item:GetAddress:Client", this.item.id, this.item.sellData.coordinates.x, this.item.sellData.coordinates.y, this.item.sellData.coordinates.z);
    }
  },
  methods: {
    getImgPath(itemCard) {
      return getImgPath(itemCard);
    },
    getItemTitle(itemCard) {
      return getItemTitle(itemCard);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.getEndTime();
      }, 5000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    formatNumber(num) {
      if (typeof num === 'undefined' && !num) return '';
      return num.toLocaleString('ru-RU');
    },
    handleItemClick() {
      this.$emit('handleItemClick', this.item);
    },
    isHas(section, property) {
      return this.item[section]?.[property] !== undefined;
    },
    getEndTime() {
      this.shelfTime = getEndTime(this.item?.endTime || this.item.storageData?.endTime, 'default');
    }
  },
};
</script>

<style lang="scss" src="./Item.scss" scoped></style>

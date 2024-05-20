<template>
  <div class="item">
    <div class="item-top">
      <div class="item-header">
        <div class="item-header-info">
          <template v-if="item?.auctionData">
            <div class="unit" v-if="isHas('auctionData', 'competitors')">
              <competitors class="unit-icon" />
              {{ formatNumber(item.auctionData.competitors) }}
            </div>
            <div class="unit">
              <endTime class="unit-icon" />
              {{ getShelfTime }}
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
            <div class="unit" v-if="isHas('sellData', 'quantity')">
              <quantity class="unit-icon" />
              {{
                `${sellData.quantity} ${$store.getters.getLanguageText('шт.')}`
              }}
            </div>
            <div class="unit" v-if="isHas('sellData', 'mileage')">
              <mileage class="unit-icon" />
              {{
                `${formatNumber(
                  sellData.mileage,
                )} ${$store.getters.getLanguageText('км.')}`
              }}
            </div>
            <div class="unit" v-if="isHas('sellData', 'weight')">
              <weight class="unit-icon" />
              {{
                `${formatNumber(
                  sellData.weight,
                )} ${$store.getters.getLanguageText('кг.')}`
              }}
            </div>
          </template>
        </div>
        <Img class="item-header-img" :img="'default'" :itemType="sellData.type" :size="'s'"
          :isSmall="sellData?.filter ? true : false" />
        <FavoriteIndicator class="item-favorite" :itemId="item.id" :size="'small'"
          :is-favorite="item?.isFavorite ? item.isFavorite : false" v-if="!isShowFavorite" />
      </div>
      <div class="item-title">
        {{ $store.getters.getTitle(sellData) }}
      </div>
      <div class="item-category">
        {{ $store.getters.getCategory(sellData, getItemListingType) }}
      </div>
    </div>
    <div class="item-footer">
      <div class="item-exchange" v-if="item?.tradeData">
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
            {{ $store.getters.getLanguageText('Кол-во товара') }}
          </div>
          <div class="item-exchange-available-value">
            {{ formatNumber(item.tradeData.available) }}
          </div>
        </div>
      </div>
      <div class="item-transportRent" v-else-if="isHas('sellData', 'rentPrice')">
        <div class="item-default-price">
          {{ `${formatNumber(item.sellData.rentPrice)} $` }}
          <span>{{ $store.getters.getLanguageText('за час') }}</span>
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
      <div class="item-storage" v-else-if="item?.storageData">
        <div class="item-storage-time">
          <span>{{ $store.getters.getLanguageText('Время хранения:') }} </span>
          {{ shelfTime }}
        </div>
        <div class="item-storage-button" :class="{ deactivate: getOpeningType === 'InTablet' }" @click.stop="unloadItem"
          v-if="!$route.path.includes('createListing')">
          {{ $store.getters.getLanguageText(getOpeningType === 'InTablet' ? 'Выгрузка не доступна с планшета' : 'Выгрузить со склада')
          }}
        </div>
      </div>
      <div class="item-status" v-else-if="item?.status">
        <div class="item-status-value" :class="item.status">
          {{ $store.getters.getLanguageText(getItemStatus) }}
        </div>
      </div>
      <div class="item-default" v-else>
        <div class="item-default-price">
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
import mileage from '@/views/MarketPlace/Assets/Icons/Item/mileage.vue';
import competitors from '@/views/MarketPlace/Assets/Icons/Item/competitors.vue';
import parking from '@/views/MarketPlace/Assets/Icons/Item/parking.vue';
import quantity from '@/views/MarketPlace/Assets/Icons/Item/quantity.vue';
import tenants from '@/views/MarketPlace/Assets/Icons/Item/tenants.vue';
import likes from '@/views/MarketPlace/Assets/Icons/Item/likes.vue';
import weight from '@/views/MarketPlace/Assets/Icons/Item/weight.vue';
import endTime from '@/views/MarketPlace/Assets/Icons/Item/time.vue';

import events from '@/modules/events';
import { onUnmounted } from 'vue';

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
    mileage,
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
    isShowFavorite() {
      const regex = new RegExp(`storage|createListing`);
      return regex.test(this.$route.path);
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
      this.getShelfTime();
      this.startTimer();
    }
    onUnmounted(() => {
      this.stopTimer;
    });
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.getShelfTime();
      }, 60000);
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
    unloadItem() {
      events.callServer('MarketPlace:Storage:Unload:Server', this.item.id);
    },
    isHas(section, property) {
      return this.item[section]?.[property] !== undefined;
    },
    getShelfTime() {
      const currentTime = new Date();
      const addedTime = this.$store.getters.getParsedTime(
        this.item?.endTime || this.item.storageData?.endTime,
        'shelfTime',
      );

      if (!isNaN(currentTime.getTime()) && !isNaN(addedTime.getTime())) {
        const differenceInMilliseconds = Math.abs(currentTime - addedTime);

        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        console.log(`дни: ${days}, часы: ${hours}, минуты: ${minutes},`);
          const showDays = days ? `${days} ${this.$store.getters.getLanguageText('д.')} ` : '';
          const showHours = hours ? `${hours} ${this.$store.getters.getLanguageText('ч.')} ` : '';
          const showMinutes = minutes ? `${minutes} ${this.$store.getters.getLanguageText('м.')} ` : '';
          this.shelfTime = `${showDays}${showHours}${showMinutes}`;
      };
    },
  },
};
</script>

<style lang="scss" src="./Item.scss" scoped></style>

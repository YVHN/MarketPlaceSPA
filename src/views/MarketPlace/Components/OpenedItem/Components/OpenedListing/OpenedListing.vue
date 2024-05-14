<template>
  <div class="openedListing">
    <div class="openedListing-preview">
      <div class="openedListing-preview-img">
        <Img :img="'default'" :itemType="getItem.sellData.type" :size="'l'" />
        <FavoriteIndicator
          :item-id="getItem.id"
          :size="'big'"
          :is-favorite="getItem.isFavorite"
        />
      </div>
      <div
        class="openedListing-testDrive"
        v-if="getItem.sellData.type === 'transport'"
      >
        {{ $store.getters.getLanguageText('Тест драйв') }}
      </div>
      <div class="openedListing-preview-comment">
        <div class="openedListing-preview-comment-title">
          {{ $store.getters.getLanguageText('Комментарий продавца:') }}
        </div>
        <div class="openedListing-preview-comment-text">
          {{ getItem.sellData.description }}
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info-item">
        <div class="header">
          <div class="header-item">
            <div class="header-item-title">
              {{ $store.getters.getTitle(getItem.sellData) }}
            </div>
            <div class="short">
              <div
                class="short-unit"
                v-for="(unit, index) in getShortData"
                :key="index"
              >
                <component class="short-unit-img" :is="unit.img"></component>
                {{ `${formatNumber(unit.value)}` }}
              </div>
            </div>
          </div>
          <div class="header-price">
            <div class="header-price-title price">
              {{
                `$ ${formatNumber(
                  getItem.sellData?.rentPrice
                    ? `${getItem.sellData.rentPrice + ' в час'}`
                    : getItem.sellData.price,
                )}`
              }}
            </div>
            <div class="header-info">
              <div
                class="info-item-full-unit"
                v-if="getItem.sellData?.statePrice"
              >
                {{ $store.getters.getLanguageText('Гос. цена:') }}
                <span class="price">{{
                  `${formatNumber(getItem.sellData.statePrice)} $`
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="full">
          <div class="full-wrapper">
            <div
              class="full-unit"
              v-for="(unit, index) in getFullData"
              :key="index"
            >
              {{ `${$store.getters.getLanguageText(unit.title)}:` }}<span>{{ $store.getters.getLanguageText(unit.value) }}</span>
            </div>
          </div>
          <div class="full-views">
            <img class="full-views-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
            <div class="full-views-value">{{ getItem?.views }}</div>
          </div>
        </div>
      </div>
      <div class="info-seller">
        <div class="info-seller-unit">
          <div class="info-seller-unit-title">
            {{ $store.getters.getLanguageText('Продавец') }}
          </div>
          <div class="info-seller-unit-value">
            {{ getItem.listingData.seller.username }}
            <span>{{ `#${getItem.listingData.seller.static}` }}</span>
          </div>
        </div>
        <div class="info-seller-unit">
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
        <template v-if="getItem.listingData.seller.phone !== null">
          <div class="action" @click="test">
            <call class="action-img" />
          </div>
          <div class="action">
            <message class="action-img" />
          </div>
        </template>
      </div>
      <Specifications
        :specifications="getItem.sellData.specifications"
        v-if="getItem.sellData?.specifications"
      />
    </div>
    <RentModal
      v-if="isRent"
      :item="getItem"
      @toggleRentStatus="toggleRentStatus"
    />
  </div>
</template>

<script>
import events from '@/modules/events';
import RentModal from './Components/RentModal/RentModal.vue';
import Img from '../../../ItemComponents/Img/Img.vue';
import Specifications from '../../../ItemComponents/Specifications/Specifications.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import competitors from '@/views/MarketPlace/Assets/Icons/Item/competitors.vue';
import mileage from '@/views/MarketPlace/Assets/Icons/Item/mileage.vue';
import parking from '@/views/MarketPlace/Assets/Icons/Item/parking.vue';
import quantity from '@/views/MarketPlace/Assets/Icons/Item/quantity.vue';
import tenants from '@/views/MarketPlace/Assets/Icons/Item/tenants.vue';
import weight from '@/views/MarketPlace/Assets/Icons/Item/weight.vue';
import call from '@/views/MarketPlace/Assets/Icons/Item/call.vue';
import message from '@/views/MarketPlace/Assets/Icons/Item/message.vue';
import views from '@/views/MarketPlace/Assets/Icons/Item/views.svg';
import { onUnmounted } from 'vue';

export default {
  components: {
    competitors,
    mileage,
    parking,
    quantity,
    tenants,
    weight,
    call,
    message,
    RentModal,
    views,
    Img,
    Specifications,
    FavoriteIndicator,
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
      events.callServer('MarketPlace:List:GetListData:Server', 'storage' ,1);
    });
  },
  methods: {
    formatNumber(num) {
      if (typeof num === undefined && !num) return '';
      return num.toLocaleString('ru-RU');
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
    test() {
      console.log('тест');
      this.$router.push('/market-place/viewing/storage');
      this.$store.commit('resetPickedItem');
      this.$store.commit('resetListData');
      events.callServer('MarketPlace:List:GetListData:Server', 'storage' ,1);
    }
  },
  computed: {
    getItem() {
      return this.$store.getters.getPickedItem;
    },
    getShortData() {
      const item = this.getItem.sellData;
      const list = [];
      if (item?.competitors) {
        list.push({
          img: 'competitors',
          value: item.competitors,
        });
      }
      if (item?.parkingCapacity) {
        list.push({
          img: 'parking',
          value: item.parkingCapacity,
        });
      }
      if (item?.mileage) {
        list.push({
          img: 'mileage',
          value: item.mileage,
        });
      }
      if (item?.maxTenants) {
        list.push({
          img: 'tenants',
          value: item.maxTenants,
        });
      }
      if (item.weight) {
        list.push({
          img: 'weight',
          value: item.weight,
        });
      }
      return list;
    },
    getFullData() {
      const item = this.getItem.sellData;
      let list = [
        {
          title: 'Тип имущества',
          value: this.$store.getters.getType(item),
        },
      ];
      if (['house', 'apartment', 'business'].includes(item.type)) {
        list.push({
          title: 'Адрес',
          value: '',
          // Тут должен быть address
        });
      } else if (item.type === 'transport') {
        list.push(
          {
            title: 'Автосалон',
            value: item.dealerShip,
          },
          {
            title: 'Гос. номер',
            value: item.licensePlate,
          },
        );
      }
      return list;
    },
  },
};
</script>

<style lang="scss" src="./OpenedListing.scss" scoped></style>

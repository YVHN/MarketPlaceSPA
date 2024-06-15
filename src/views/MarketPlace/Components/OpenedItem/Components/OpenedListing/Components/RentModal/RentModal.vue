<template>
  <div class="rentModal">
    <div class="rentModal-body">
      <div class="rentModal-body-title">
        {{ $store.getters.getLanguageText('Аренда транспорта') }}
      </div>
      <div class="rentModal-body-info">
        <div class="rentModal-body-info-unit">
          <div class="rentModal-body-info-unit-title">
            {{ $store.getters.getLanguageText('Название транспорта:') }}
          </div>
          <div class="rentModal-body-info-unit-value">
            {{ item.sellData.vehicleName }}
          </div>
        </div>
        <div class="rentModal-body-info-unit">
          <div class="rentModal-body-info-unit-title">
            {{ $store.getters.getLanguageText('Продавец') }}
          </div>
          <div class="rentModal-body-info-unit-value">
            {{ seller.username }} <span>{{ `#${seller.static}` }}</span>
          </div>
        </div>
        <div class="rentModal-body-info-unit">
          <div class="rentModal-body-info-unit-title">
            {{ $store.getters.getLanguageText('Тип аренды') }}
          </div>
          <div class="rentModal-body-info-unit-value">
            {{ $store.getters.getLanguageText('Почасовой') }}
          </div>
        </div>
        <div class="rentModal-body-info-unit">
          <div class="rentModal-body-info-unit-title">
            {{ $store.getters.getLanguageText('Цена за 1 час:') }}
          </div>
          <div class="rentModal-body-info-unit-value">
            {{ `${item.sellData.rentPrice.toLocaleString('ru-RU')} $` }}
          </div>
        </div>
        <div class="rentModal-body-info-unit">
          <div class="rentModal-body-info-unit-title">
            {{ $store.getters.getLanguageText('Тип обьявления') }}
            <div class="rentModal-body-info-unit-value">
              {{ $store.getters.getLanguageText('Аренда транспорта') }}
            </div>
          </div>
        </div>
        <div class="rentModal-body-price">
          <div class="rentModal-body-info-unit">
            <div class="rentModal-body-info-unit-title">
              {{ $store.getters.getLanguageText('Количество часов') }}
            </div>
            <div class="rentModal-body-info-unit-value">
              {{ `${pickedQuantity} ${$store.getters.getLanguageText('ч.')}` }}
            </div>
          </div>
          <div class="rentModal-body-info-unit right">
            <div class="rentModal-body-info-unit-title">
              {{ $store.getters.getLanguageText('Цена') }}
            </div>
            <div class="rentModal-body-info-unit-value cost">
              {{ `${calculatePrice.toLocaleString('ru-RU')} $` }}
            </div>
          </div>
        </div>
      </div>
      <ProgressBar
        @pickQuantity="pickQuantity"
        :progress="1"
        :max-progress="120"
        :min-progress="1"
      />
      <div class="rentModal-body-payMethod">
        <div
          class="rentModal-body-payMethod-unit"
          v-for="(method, index) in payMethods"
          @click="acceptBuy(method.type)"
          :key="index"
        >
          {{ $store.getters.getLanguageText(method.title) }}
        </div>
      </div>
      <div class="rentModal-body-cancel" @click="toggleRentStatus">
        {{ $store.getters.getLanguageText('Отменить') }}
      </div>
    </div>
  </div>
</template>
<script>
import events from '@/modules/events.js';
import ProgressBar from '@/views/MarketPlace/Components/OpenedItem/Components/ProgressBar/ProgressBar.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProgressBar,
  },
  data() {
    return {
      payMethods: [
        {
          id: 1,
          title: 'Оплата наличными',
          type: 'cash',
        },
        {
          id: 2,
          title: 'Оплата картой',
          type: 'card',
        },
      ],
      payMethodId: null,
      pickedQuantity: 1,
      seller: this.item.listingData.seller,
    };
  },
  computed: {
    calculatePrice() {
      return this.item.sellData.rentPrice * this.pickedQuantity;
    },
  },
  methods: {
    toggleRentStatus() {
      this.$emit('toggleRentStatus');
    },
    acceptBuy(payMethod) {
      const payment = {
        id: this.item.id,
        quantity: this.pickedQuantity,
        method: payMethod,
      };
      const json = JSON.stringify(payment);
      events.callServer('MarketPlace:Listing:RentTransport:Server', json);
    },
    pickQuantity(quantity) {
      this.pickedQuantity = quantity;
    },
  },
};
</script>

<style lang="scss" src="./RentModal.scss" scoped></style>

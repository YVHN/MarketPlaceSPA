<template>
  <div class="buyItem">
    <div class="buyItem-body">
      <div class="buyItem-body-title">
        {{ $store.getters.getLanguageText('Покупка товара') }}
      </div>
      <div class="buyItem-body-info">
        <div class="buyItem-body-info-unit">
          <div class="buyItem-body-info-unit-title">
            {{ $store.getters.getLanguageText('Название товара') }}
          </div>
          <div class="buyItem-body-info-unit-value">{{ offer.name }}</div>
        </div>
        <div class="buyItem-body-info-unit">
          <div class="buyItem-body-info-unit-title">
            {{ $store.getters.getLanguageText('Продавец') }}
          </div>
          <div class="buyItem-body-info-unit-value">
            {{ offer.playerData.username }}
            <span>{{ `#${offer.playerData.static}` }}</span>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="buyItem-body-info-unit" v-if="offer.playerData?.state">
            <div class="buyItem-body-info-unit-title">
              {{ $store.getters.getLanguageText('Состояние') }}
            </div>
            <div class="buyItem-body-info-unit-value">{{ `${offer.state}%` }}</div>
          </div>
          <div class="buyItem-body-info-unit">
            <div class="buyItem-body-info-unit-title">
              {{ `${$store.getters.getLanguageText('Доступно кол-во')}:` }}
            </div>
            <div class="buyItem-body-info-unit-value">
              {{ `${offer.quantity} ${$store.getters.getLanguageText('шт.')}` }}
            </div>
          </div>
          <div class="buyItem-body-info-unit">
            <div class="buyItem-body-info-unit-title">
              {{ $store.getters.getLanguageText('Цена за 1 шт:') }}
            </div>
            <div class="buyItem-body-info-unit-value">
              {{ `${Number(offer.price).toLocaleString('ru-RU')} $` }}
            </div>
          </div>
        </div>
      </div>
      <div class="buyItem-body-price">
        <div class="buyItem-body-info-unit">
          <div class="buyItem-body-info-unit-title">
            {{ $store.getters.getLanguageText('Количество') }}
          </div>
          <div class="buyItem-body-info-unit-value">
            {{ `${pickedQuantity} ${$store.getters.getLanguageText('шт.')}` }}
          </div>
        </div>
        <div class="buyItem-body-info-unit">
          <div class="buyItem-body-info-unit-title">
            {{ $store.getters.getLanguageText('Цена') }}
          </div>
          <div class="buyItem-body-info-unit-value cost">
            {{ `${calculatePrice.toLocaleString('ru-RU')} $` }}
          </div>
        </div>
      </div>
      <ProgressBar
        @pickQuantity="pickQuantity"
        :progress="0"
        :max-progress="offer.quantity"
        :min-progress="1"
      />
      <div class="buyItem-body-payMethod">
        <div
          class="buyItem-body-payMethod-unit"
          v-for="(method, index) in payMethods"
          @click="acceptBuy(method.type)"
          :key="index"
        >
          {{ $store.getters.getLanguageText(method.title) }}
        </div>
      </div>
      <div class="buyItem-body-cancel" @click="toggleIsBuyStatus">
        {{ $store.getters.getLanguageText('Отменить') }}
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from '@/views/MarketPlace/Components/OpenedItem/Components/ProgressBar/ProgressBar.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';

export default {
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProgressBar,
  },
  mounted() {
    onUnmounted(() => {
      events.remove('MarketPlace:Exchange:AcceptBuyItem:Cef');
    });
    events.add('MarketPlace:Exchange:AcceptBuyItem:Cef', () => {
      this.toggleIsBuyStatus();
    });
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
    };
  },
  computed: {
    calculatePrice() {
      return this.offer.price * this.pickedQuantity;
    },
  },
  methods: {
    toggleIsBuyStatus() {
      this.$emit('toggleIsBuyStatus');
    },
    acceptBuy(payMethod) {
      const buyData = {
        id: this.offer.cardItemId,
        offerId: this.offer.offerId,
        method: payMethod,
        quantity: this.pickedQuantity,
      };
      events.callServer(
        'MarketPlace:Exchange:BuyItem:Server',
        JSON.stringify(buyData),
      );
    },
    pickQuantity(quantity) {
      this.pickedQuantity = quantity;
    },
  },
};
</script>

<style lang="scss" src="./BuyItem.scss" scoped></style>

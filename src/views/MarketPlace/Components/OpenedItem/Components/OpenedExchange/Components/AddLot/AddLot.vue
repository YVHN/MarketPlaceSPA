<template>
  <div class="addLot">
    <div class="addLot-body">
      <div class="addLot-body-title">
        {{ $store.getters.getLanguageText('Выставить лот') }}
      </div>
      <div class="addLot-body-info">
        <div class="addLot-body-info-unit">
          <div class="addLot-body-info-unit-title">
            {{ $store.getters.getLanguageText('Название товара:') }}
          </div>
          <div class="addLot-body-info-unit-value">{{ data.sellData.itemName }}</div>
        </div>
        <div class="addLot-body-info-unit">
          <div class="addLot-body-info-unit-title">
            {{ $store.getters.getLanguageText('Состояние') }}
          </div>
          <div class="addLot-body-info-unit-value">{{ data.sellData.state }}</div>
        </div>
        <div class="addLot-body-info-unit">
          <div class="addLot-body-info-unit-title">
            {{ $store.getters.getLanguageText('Доступно кол-во') }}
          </div>
          <div class="addLot-body-info-unit-value">
            {{ `${data.sellData.quantity} ${$store.getters.getLanguageText('шт.')}` }}
          </div>
        </div>
      </div>
      <div class="addLot-body-input">
        <div class="addLot-body-input-title">
          {{ $store.getters.getLanguageText('Стоимость продажи за 1 шт.') }}
        </div>
        <CustomInput @setValue="setInput" :placeholder="$store.getters.getLanguageText('Введите сумму')"
          class="addLot-body-input-field" />
      </div>
      <div class="addLot-body-price">
        <div class="addLot-body-info-unit">
          <div class="addLot-body-info-unit-title">
            {{ $store.getters.getLanguageText('Высталено на продажу') }}
          </div>
          <div class="addLot-body-info-unit-value">
            {{ `${pickedQuantity} ${$store.getters.getLanguageText('шт.')}` }}
          </div>
        </div>
        <div class="addLot-body-info-unit right">
          <div class="addLot-body-info-unit-title">
            {{ $store.getters.getLanguageText('Доступно в продаже') }}
          </div>
          <div class="addLot-body-info-unit-value">
            {{ `${data.sellData.quantity} ${$store.getters.getLanguageText('шт.')}` }}
          </div>
        </div>
      </div>
      <ProgressBar v-if="data.sellData.quantity > 1" @pickQuantity="pickQuantity" :progress="0"
        :max-progress="data.sellData.quantity" :min-progress="1" />
      <div class="addLot-body-actions">
        <div class="button confirm" @click="confirm">
          {{ $store.getters.getLanguageText('Разместить лот') }}
        </div>
        <div class="button cancel" @click="toggleStatus">
          {{ $store.getters.getLanguageText('Отменить') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from '../../../ProgressBar/ProgressBar.vue';
import CustomInput from '../../../CustomInput/CustomInput.vue';
import events from '@/modules/events';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProgressBar,
    CustomInput,
  },
  data() {
    return {
      pickedQuantity: 1,
      pricePerItem: 0,
    };
  },
  methods: {
    toggleStatus() {
      this.$emit('toggleIsAddStatus');
    },
    pickQuantity(quantity) {
      this.pickedQuantity = quantity;
    },
    setInput(value) {
      this.pricePerItem = value;
    },
    confirm() {
      if (this.pricePerItem) {
        const data = {
          cardItemId: this.data.id,
          pricePerItem: this.pricePerItem,
          quantity: this.pickedQuantity,
          itemType: this.data.sellData.itemType,
        };
        events.callServer(
          'MarketPlace:Exchange:AddOffer:Server',
          JSON.stringify(data),
        );
        this.toggleStatus();
        this.$emit('resetSellItem');
        if (this.$route.path.includes('createListing')) {
          this.$store.commit('changeCardItemQuantity', [data.cardItemId, this.data.sellData.quantity - this.pickedQuantity]);
        } else {
          events.callServer(
            'MarketPlace:Exchange:IsCanSell:Server',
            data.itemType,
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" src="./AddLot.scss" scoped></style>

<template>
  <div class="exchange">
    <div class="wrapper">
      <div class="exchange-item">
        <div class="exchange-item-img">
          <img :src="require(`@/views/MarketPlace/Assets/Images/Items/${'default'}.png`)" />
          <FavoriteIndicator
            :itemId="item.id"
            :size="'big'"
            :is-favorite="item.isFavorite"
          />
        </div>
        <div class="wrapper">
          <div class="exchange-item-title">
            {{ sellItem.title }}
          </div>
        </div>
        <div class="exchange-item-info">
          <div
            class="exchange-item-info-unit"
            v-for="(unit, index) in getItemInfo"
            :key="index"
          >
            <div class="exchange-item-info-unit-title">
              {{ `${$store.getters.getLanguageText(unit.title)}:` }}
            </div>
            <div class="exchange-item-info-unit-value">{{ unit.value }}</div>
          </div>
        </div>
        <div class="exchange-item-description">
          <div class="exchange-item-description-title">
            {{ $store.getters.getLanguageText('Описание о предмете:') }}
          </div>
          <div class="exchange-item-description-content">
            {{ sellItem.description }}
          </div>
        </div>
        <div
          class="exchange-item-button bet-button"
          @click="toggleStatus('add')"
        >
          {{ $store.getters.getLanguageText('Добавить лот на продажу') }}
        </div>
        <div class="exchange-item-warning" v-if="haveItem">
          {{
            $store.getters.getLanguageText(
              'Этот предмет отсутсвует у вас на вашем складе. Вы не можете выставитьлот на торговую площадку, приобретите этот товар.',
            )
          }}
        </div>
      </div>
      <ListBlock
        :list="item.tradeData.offers"
        @buyItem="buyItem"
        :showType="'exchange'"
      />
    </div>
    <div class="exchange-graph">
      <div class="exchange-graph-title">
        {{ $store.getters.getLanguageText('График цен') }}
      </div>
      <Graph :graphData="item.tradeData.graphStat" />
    </div>
    <BuyItem
      v-if="isBuy"
      @toggleIsBuyStatus="toggleStatus('buy')"
      :item="buyItemData"
    />
    <AddLot
      v-if="isAdd"
      :data="haveItem"
      @toggleIsAddStatus="toggleStatus('add')"
    />
  </div>
</template>

<script>
import ListBlock from '../ListBlock/ListBlock.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import BuyItem from './Components/BuyItem/BuyItem.vue';
import AddLot from './Components/AddLot/AddLot.vue';
import Graph from '../Graph/Graph.vue';
import events from '@/modules/events';
import Vue, { onUnmounted } from 'vue';
import { getItemSubTitle } from '@/functions/marketplace';

export default {
  components: {
    ListBlock,
    Graph,
    FavoriteIndicator,
    BuyItem,
    AddLot,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    sellItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isBuy: false,
      isAdd: false,
      buyItemData: null,
      haveItem: null,
    };
  },
  mounted() {
    this.checkItemInStorage();
    onUnmounted(() => {
      events.remove('MarketPlace:Exchange:SetItemForSell:Cef');
    });
    events.callServer(
      'MarketPlace:Exchange:GetItemForSell:Server',
      this.sellItem.itemType,
    );
    events.add('MarketPlace:Exchange:SetItemForSell:Cef', (json) => {
      const parsedJson = JSON.parse(json);
      this.haveItem = parsedJson;
    });
  },
  computed: {
    getItemInfo() {
      const item = this.sellItem;
      const list = [
        {
          title: 'Категория',
          value: getItemSubTitle(this.item),
        },
        {
          title: 'Вес',
          value: item.weight,
        },
        {
          title: 'Кол-во',
          value: this.item.tradeData.available,
        },
        {
          title: 'Последняя ставка',
          value: this.formatNumber(this.item.tradeData.startPrice),
        },
      ];
      return list;
    },
  },
  methods: {
    formatNumber(num) {
      return `$${num.toLocaleString('ru-RU')}`;
    },
    toggleStatus(type) {
      if (type === 'add' && this.haveItem) {
        this.isAdd = !this.isAdd;
      } else if (type === 'buy') {
        this.isBuy = !this.isBuy;
      }
    },
    buyItem(offerData) {
      const data = {
        id: this.item.id,
        offerId: offerData.id,
        title: this.sellItem.title,
        playerData: offerData.playerData,
        state: offerData.state,
        quantity: offerData.quantity,
        price: offerData.pricePerItem,
      };
      this.buyItemData = data;
      this.toggleStatus('buy');
    },
    checkItemInStorage() {
      const item = this.$store.getters.getItemFromStorage(this.item.id);
      this.haveItem = item ? item.sellData : null;
      console.log(this.haveItem);
    },
  },
};
</script>

<style lang="scss" src="./OpenedExchange.scss" scoped></style>

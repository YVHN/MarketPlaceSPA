<template>
  <div class="exchange">
    <div class="top">
      <div class="item">
        <div class="item-container">
          <div class="item-img">
            <img :src="getImgPath(getPickedItem)" />
            <FavoriteIndicator :itemId="getPickedItem.id" :size="'big'" :is-favorite="getPickedItem.isFavorite" />
          </div>
          <div class="item-info">
            <div class="item-info-title">
              {{ getPickedItem.sellData.title }}
            </div>
            <ItemMainInfo :card-item="getPickedItem" />
          </div>
        </div>
        <div class="item-addLot">
          <div class="item-button" :class="{ off: !haveItem }" @click="toggleStatus('add')">
            {{ $store.getters.getLanguageText('Добавить лот на продажу') }}
          </div>
          <div class="item-warning" v-if="!haveItem">
            {{
              $store.getters.getLanguageText(
                'Этот предмет отсутсвует у вас на вашем складе. Вы не можете выставить лот на торговую площадку, приобретитеэтот товар.'
              )
            }}
          </div>
        </div>
      </div>
      <ListBlock :list="getPickedItem.tradeData.offers" @buyItem="buyItem" :showType="'exchange'" />
    </div>
    <div class="exchange-graph">
      <div class="exchange-graph-title">
        {{ $store.getters.getLanguageText('График цен') }}
      </div>
      <Graph :graphData="getPickedItem.tradeData?.graphData || {}" />
    </div>
    <BuyItem v-if="isBuy" @toggleIsBuyStatus="toggleStatus('buy')" :offer="buyItemData" />
    <AddLot v-if="isAdd" :data="haveItem" @toggleIsAddStatus="toggleStatus('add')" @resetSellItem="resetSellItem" />
  </div>
</template>

<script>
import ListBlock from '../ListBlock/ListBlock.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import BuyItem from './Components/BuyItem/BuyItem.vue';
import AddLot from './Components/AddLot/AddLot.vue';
import Graph from '../Graph/Graph.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';
import { getItemSubTitle } from '@/functions/marketplace';
import ItemMainInfo from '../../../ItemComponents/ItemMainInfo/ItemMainInfo.vue';
import sectionsData from '@/views/MarketPlace/Assets/Data/sectionsData';
import { getImgPath } from '@/functions/marketplace';

export default {
  components: {
    ListBlock,
    Graph,
    FavoriteIndicator,
    BuyItem,
    AddLot,
    ItemMainInfo,
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
    onUnmounted(() => {
      events.remove('MarketPlace:Exchange:SetItemForSell:Cef');
    });
    events.callServer(
      'MarketPlace:Exchange:IsCanSell:Server',
      this.getPickedItem.sellData.itemType,
    );
    events.add('MarketPlace:Exchange:SetItemForSell:Cef', (json) => {
      const parsedJson = JSON.parse(json);
      this.haveItem = parsedJson;
    });
  },
  computed: {
    getPickedItem() {
      return this.$store.getters.getPickedItem;
    },
  },
  methods: {
    getImgPath(itemCard) {
      return getImgPath(itemCard);
    },
    resetSellItem() {
      this.haveItem = null;
      events.callServer(
        'MarketPlace:Exchange:IsCanSell:Server',
        this.getPickedItem.sellData.itemType,
      );
    },
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
        cardItemId: this.getPickedItem.id,
        offerId: offerData.id,
        name: this.getPickedItem.sellData.title,
        playerData: offerData.playerData,
        state: offerData.state,
        quantity: offerData.quantity,
        price: offerData.pricePerItem,
      };
      this.buyItemData = data;
      this.toggleStatus('buy');
    }
  },
};
</script>

<style lang="scss" src="./OpenedExchange.scss" scoped></style>

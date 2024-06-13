<template>
  <div class="exchange">
    <div class="top">
      <div class="item">
        <div class="item-container">
          <div class="item-img">
            <img :src="require(`@/views/MarketPlace/Assets/Images/Items/${'default'}.png`)" />
            <FavoriteIndicator :itemId="item.id" :size="'big'" :is-favorite="item.isFavorite" />
          </div>
          <div class="item-info">
            <div class="item-info-title">
              {{ sellItem.title }}
            </div>
            <ItemMainInfo :card-item="getPickedItem"/>
            <!-- <div class="exchange-item-description">
              <div class="exchange-item-description-title">
                {{ $store.getters.getLanguageText('Описание о предмете:') }}
              </div>
              <div class="exchange-item-description-content">
                {{ sellItem.description }}
              </div>
            </div> -->
          </div>
        </div>
        <div class="item-addLot">
          <div class="item-button" :class="{off: !haveItem}" @click="toggleStatus('add')">
            {{ $store.getters.getLanguageText('Добавить лот на продажу') }}
          </div>
          <div class="item-warning" >
            {{
              $store.getters.getLanguageText(
                'Этот предмет отсутсвует у вас на вашем складе. Вы не можете выставить лот на торговую площадку, приобретите этот товар.',
              )
            }}
          </div>
        </div>
      </div>
      <ListBlock :list="item.tradeData.offers" @buyItem="buyItem" :showType="'exchange'" />
    </div>
    <div class="exchange-graph">
      <div class="exchange-graph-title">
        {{ $store.getters.getLanguageText('График цен') }}
      </div>
      <Graph :graphData="getGraphData" />
    </div>
    <BuyItem v-if="isBuy" @toggleIsBuyStatus="toggleStatus('buy')" :item="buyItemData" />
    <AddLot v-if="isAdd" :data="haveItem" @toggleIsAddStatus="toggleStatus('add')" />
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

export default {
  components: {
    ListBlock,
    Graph,
    FavoriteIndicator,
    BuyItem,
    AddLot,
    ItemMainInfo,
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
    onUnmounted(() => {
      events.remove('MarketPlace:Exchange:SetItemForSell:Cef');
    });
    events.callServer(
      'MarketPlace:Exchange:IsCanSell:Server',
      this.sellItem.itemType,
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
    getGraphData() {
      if (!this.item.tradeData?.graphData) return [];
      else return this.item.tradeData.graphData;
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
  },
};
</script>

<style lang="scss" src="./OpenedExchange.scss" scoped></style>

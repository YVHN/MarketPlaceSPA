<template>
  <div class="auction">
    <div class="top">
      <div class="item">
        <div class="item-container">
          <div class="item-img">
            <Img :img="'default'" :itemType="getPickedItem.sellData.type" :size="'m'" />
            <FavoriteIndicator :itemId="getPickedItem.id" :size="'big'" :is-favorite="getPickedItem.isFavorite" />
          </div>
          <div class="item-info">
            <div class="item-info-header">
              <div class="item-title">
                {{ getItemTitle(getPickedItem) }}
              </div>
              <div class="item-likesviews">
                <div class="item-likesviews-unit">
                  {{ getPickedItem.likes }}
                  <likes class="item-likesviews-unit-img" />
                </div>
                <div class="item-likesviews-unit">
                  {{ getPickedItem.views }}
                  <img class="item-likesviews-unit-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
                </div>
              </div>
            </div>
            <ItemMainInfo :card-item="getPickedItem" class="item-info-mainInfo" :type="'column'" />
          </div>
        </div>
        <div class="item-buttons">
          <div class="item-button bet-button" @click="toggleStatus">
            {{ $store.getters.getLanguageText('Сделать ставку') }}
          </div>
          <div class="item-button like-button" :class="{ liked: isLiked }" @click="toLike">
            <likes class="like-button-img" />
          </div>
        </div>
      </div>
      <ListBlock :list="getPickedItem.auctionData.offers" :showType="'auction'" />
    </div>
    <div class="auction-graph">
      <div class="auction-graph-title">
        {{ $store.getters.getLanguageText('График ставок') }}
      </div>
      <Graph :graph-data="getPickedItem.auctionData.graphData" />
    </div>
    <MakeBet v-if="isMakeBet" :lotId="getPickedItem.id" :title="getItemTitle(getPickedItem)"
      :startPrice="getPickedItem.auctionData.lastBet" @toggleMakeBetStatus="toggleStatus" />
  </div>
</template>

<script>
import events from '@/modules/events';
import likes from '@/views/MarketPlace/Assets/Icons/Item/likes.vue';
import Img from '../../../ItemComponents/Img/Img.vue';
import ListBlock from '../ListBlock/ListBlock.vue';
import FavoriteIndicator from '@/views//MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import MakeBet from './Components/MakeBet/MakeBet.vue';
import Graph from '../Graph/Graph.vue';
import { parseDate } from '@/functions/marketplace';
import { onUnmounted } from 'vue';

import { getItemTitle } from '@/functions/marketplace';
import ItemMainInfo from '../../../ItemComponents/ItemMainInfo/ItemMainInfo.vue';
export default {
  mounted() {
    this.setIsLiked();
    onUnmounted(() => {
      events.remove('Marketplace:Auction:AppendOffer:Cef');
    });
    events.add('Marketplace:Auction:AppendOffer:Cef', (id, json) => {
      if (this.getPickedItem.id === id) {
        this.$store.commit('appendOfferBet', JSON.parse(json));
      }
    });
  },
  components: {
    likes,
    ListBlock,
    Graph,
    FavoriteIndicator,
    MakeBet,
    Img,
    ItemMainInfo,
  },
  data() {
    return {
      isMakeBet: false,
      isLiked: false,
    };
  },
  computed: {
    getPickedItem() {
      return this.$store.getters.getPickedItem;
    }
  },
  methods: {
    setIsLiked() {
      this.isLiked = this.getPickedItem.isLiked;
    },
    getItemTitle(itemCard) {
      return getItemTitle(itemCard);
    },
    formatNumber(num) {
      if (typeof num === undefined) return '';
      return `$${num.toLocaleString('ru-RU')}`;
    },
    toLike() {
      this.isLiked = !this.isLiked;
      events.callServer(
        'MarketPlace:Auction:Like:Server',
        this.getPickedItem.id,
        this.isLiked,
      );
    },
    toggleStatus() {
      this.isMakeBet = !this.isMakeBet;
    },
  },
};
</script>

<style lang="scss" src="./OpenedAuction.scss" scoped></style>

<template>
  <div class="auction">
    <div class="wrapper">
      <div class="auction-item">
        <div class="auction-item-img">
          <Img :img="'default'" :itemType="sellItem.type" :size="'m'" />
          <FavoriteIndicator
            :itemId="lotData.id"
            :size="'big'"
            :is-favorite="lotData.isFavorite"
          />
        </div>
        <div class="wrapper">
          <div class="auction-item-title">
            {{ $store.getters.getTitle(sellItem) }}
          </div>
          <div class="auction-item-likesviews">
            <div class="auction-item-likesviews-unit">
              {{ lotData.likes }}
              <likes class="auction-item-likesviews-unit-img" />
            </div>
            <div class="auction-item-likesviews-unit">
              {{ lotData.views }}
              <img
                class="auction-item-likesviews-unit-img"
                src="@/views/MarketPlace/Assets/Icons/Item/views.svg"
              />
            </div>
          </div>
        </div>
        <div class="auction-item-info">
          <div
            class="auction-item-info-unit"
            v-for="(unit, index) in getItemInfo"
            :key="index"
          >
            <div class="auction-item-info-unit-title">
              {{ `${$store.getters.getLanguageText(unit.title)}:` }}
            </div>
            <div class="auction-item-info-unit-value">
              {{ $store.getters.getLanguageText(unit.value) }}
            </div>
          </div>
        </div>
        <div class="auction-item-description">
          <div class="auction-item-description-title">
            {{ $store.getters.getLanguageText('Описание лота:') }}
          </div>
          <div class="auction-item-description-content">
            {{ sellItem.description }}
          </div>
        </div>
        <div class="auction-item-buttons">
          <div class="auction-item-button bet-button" @click="toggleStatus">
            {{ $store.getters.getLanguageText('Сделать ставку') }}
          </div>
          <div
            class="auction-item-button like-button"
            :class="{ liked: isLiked }"
            @click="toLike"
          >
            <likes class="like-button-img" />
          </div>
        </div>
      </div>
      <ListBlock :list="lotData.auctionData.offers" :showType="'auction'" />
    </div>
    <div class="auction-graph">
      <div class="auction-graph-title">
        {{ $store.getters.getLanguageText('График ставок') }}
      </div>
      <Graph :graphData="getBetsList" />
    </div>
    <MakeBet
      v-if="isMakeBet"
      :lotId="lotData.id"
      :title="$store.getters.getTitle(sellItem)"
      :startPrice="lotData.auctionData.startPrice"
      @toggleMakeBetStatus="toggleStatus"
    />
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
export default {
  components: {
    likes,
    ListBlock,
    Graph,
    FavoriteIndicator,
    MakeBet,
    Img,
  },
  props: {
    lotData: {
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
      isMakeBet: false,
      isLiked: this.lotData.isLiked,
    };
  },
  computed: {
    getItemInfo() {
      const item = this.sellItem;
      let list = [
        {
          title: 'Категория',
          value: this.$store.getters.getType(item),
        },
        {
          title: 'Последняя ставка',
          value: this.formatNumber(this.lotData.auctionData.startPrice),
        },
      ];
      if (item.type === 'estate') {
        list.push(
          {
            title: 'Кол-во гаражных мест',
            value: item.parkingCapacity,
          },
          {
            title: 'Улица',
            value: item.address,
          },
        );
      } else if (item.type === 'transport') {
        list.push(
          {
            title: 'Пробег',
            value: `${item.mileage} ${this.$store.getters.getLanguageText(
              'км.',
            )}`,
          },
          {
            title: 'Гос. номер',
            value: item.licensePlate,
          },
        );
      }
      return list;
    },
    getBetsList() {
      const list = [];
      this.lotData.auctionData.offers.forEach((offer) => {
        const bet = {
          date: this.$store.getters.getParsedTime(offer.created, 'graph'),
          amount: offer.bet,
        };
        list.push(bet);
      });
      return list;
    },
  },
  methods: {
    formatNumber(num) {
      return `$${num.toLocaleString('ru-RU')}`;
    },
    toLike() {
      this.isLiked = !this.isLiked;
      events.callServer(
        'MarketPlace:Auction:Like:Server',
        this.lotData.id,
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

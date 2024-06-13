<template>
  <div class="listBlock">
    <div class="listBlock-title">
      {{
        $store.getters.getLanguageText(
          showType === 'auction' ? 'История ставок' : 'Список предложений',
        )
      }}
    </div>
    <div class="list">
      <div class="list-headings">
        <div class="list-headings-heading" v-for="heading in getListHeadings" :key="heading">
          {{ heading }}
        </div>
      </div>
      <div class="list-offers" ref="list">
        <OfferItem @buyItem="openBuyItemModal" v-for="(offer, index) in list" :key="index" :offer-data="offer" :type="showType"/>
      </div>
    </div>
  </div>
</template>

<script>
import { parseDate, getEndTime, formatNumber } from '@/functions/marketplace';
import OfferItem from './Components/OfferItem.vue'

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    showType: {
      type: String,
      required: true,
    },
  },
  components: {
    OfferItem,
  },
  methods: {
    openBuyItemModal(offer) {
      this.$emit('buyItem', offer);
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    parseDate(time) {
      return parseDate(time, 'object');
    },
    getEndTime(endTime) {
      return getEndTime(endTime);
    },
    scrollToTop() {
      const listElement = this.$refs.list;
      if (listElement) {
        listElement.scrollTop = -listElement.scrollHeight;
      }
    },
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.scrollToTop();
      });
    }
  },
  mounted() {
    this.scrollToTop();
  },
  computed: {
    getListHeadings() {
      if (this.showType === 'auction') {
        return ['Автор', 'Static', 'Время и дата', 'Ставка']
      } else if (this.showType === 'exchange') {
        return ['Автор', 'Static', 'Состояние', 'Кол-во', 'Цена за 1 шт.', 'Таймер', 'Действие'];
      } else {
        return [];
      }
    },
  }
};
</script>

<style lang="scss" src="./ListBlock.scss" scoped></style>

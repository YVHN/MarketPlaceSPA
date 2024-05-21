<template>
  <div class="listBlock">
    <div class="listBlock-title">
      {{
        $store.getters.getLanguageText(
          showType === 'auction' ? 'История ставок' : 'Список предложений',
        )
      }}
    </div>
    <div class="listBlock-list">
      <div class="listBlock-list-units" v-if="showType === 'exchange'">
        <div class="units-user">
          <div class="listBlock-list-units-unit">
            {{ $store.getters.getLanguageText('Автор') }}
          </div>
        </div>
        <div class="listBlock-list-units-unit">
          {{ 'Static' }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Состояние') }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Кол-во') }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Цена за 1 шт.') }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Таймер') }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Действие') }}
        </div>
      </div>
      <div class="listBlock-list-units" v-else>
        <div class="units-user">
          <div class="listBlock-list-units-unit">
            {{ $store.getters.getLanguageText('Автор') }}
          </div>
        </div>
        <div class="listBlock-list-units-unit">
          {{ 'Static' }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Время и дата') }}
        </div>
        <div class="listBlock-list-units-unit">
          {{ $store.getters.getLanguageText('Ставка') }}
        </div>
      </div>
      <div class="listBlock-list-body">
        <div
          class="listBlock-list-item"
          v-for="(offer, index) in list"
          :key="index"
        >
          <div class="listBlock-list-item-user">
            <img src="@/views/MarketPlace/Assets/Icons/Secondary/avatar.svg" />
            <div>{{ offer.playerData.username }}</div>
          </div>
          <template v-if="showType === 'exchange'">
            <div>{{ offer.playerData.static }}</div>
            <div>{{ offer.state }}</div>
            <div>{{ offer.quantity }}</div>
            <div>{{ `${offer.pricePerItem}$` }}</div>
            <div>
              {{ getEndTime(offer.created) }}
            </div>
            <div
              class="listBlock-list-item-button"
              @click="() => $emit('buyItem', offer)"
            >
              {{ $store.getters.getLanguageText('Купить') }}
            </div>
          </template>
          <template v-else>
            <div>{{ offer.playerData.static }}</div>
            <div class="listBlock-list-item-time">
              {{ parseDate(offer.created).date }}
              <span>{{
                parseDate(offer.created).time
              }}</span>
            </div>
            <div class="listBlock-list-item-bet">
              {{ `${formatNumber(offer.bet)} $` }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseDate, getEndTime } from '@/functions/marketplace';

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
  methods: {
    formatNumber(num) {
      if (num === undefined || !num) return '';
      return num.toLocaleString('ru-RU');
    },
    parseDate(time) {
      return parseDate(time, 'object');
    },
    getEndTime(endTime) {
      return getEndTime(endTime);
    }
  },
};
</script>

<style lang="scss" src="./ListBlock.scss" scoped></style>

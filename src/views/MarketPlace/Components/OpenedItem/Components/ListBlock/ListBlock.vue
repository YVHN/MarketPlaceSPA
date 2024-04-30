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
              {{ getShelfTime(offer.created, 'shelfTime') }}
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
              {{ $store.getters.getParsedTime(offer.created, 'full').date }}
              <span>{{
                $store.getters.getParsedTime(offer.created, 'full').time
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
    getShelfTime(time) {
      // Получаем текущее время и время добавления
      const currentTime = new Date();
      const addedTime = this.$store.getters.getParsedTime(time, 'shelfTime');

      // Прибавляем 7 дней к времени добавления
      addedTime.setDate(addedTime.getDate() + 1);

      console.log(addedTime);
      // Проверяем, корректные ли даты мы получили
      if (!isNaN(currentTime.getTime()) && !isNaN(addedTime.getTime())) {
        // Вычисляем разницу в миллисекундах
        const differenceInMilliseconds = Math.abs(currentTime - addedTime);

        // Вычисляем разницу в днях, часах и минутах
        const days = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24),
        );
        const hours = Math.floor(
          (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
        );

        const showDays = days
          ? `${days} ${this.$store.getters.getLanguageText('д.')} `
          : '';
        const showHours = hours
          ? `${hours} ${this.$store.getters.getLanguageText('ч.')} `
          : '';
        const showMinutes = minutes
          ? `${minutes} ${this.$store.getters.getLanguageText('м.')} `
          : '';

        console.log(`${showDays}${showHours}${showMinutes}`);

        // Возвращаем разницу в формате "дни часы минуты"
        return `${showDays}${showHours}${showMinutes}`;
      }
      return '';
    },
  },
};
</script>

<style lang="scss" src="./ListBlock.scss" scoped></style>

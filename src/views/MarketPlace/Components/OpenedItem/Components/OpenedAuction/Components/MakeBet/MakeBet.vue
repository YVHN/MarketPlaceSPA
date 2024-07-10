<template>
  <div class="makeBet">
    <div class="makeBet-body">
      <div class="makeBet-body-title">
        {{ `${$store.getters.getLanguageText('Сделайте ставку на')} ${title}` }}
      </div>
      <div class="makeBet-body-bets">
        <div class="makeBet-body-bets-bet" :class="{ active: userBet === bet.value }" @click="pickBet(bet.value)"
          v-for="(bet, index) in getDefaultBets" :key="index">
          {{ formatNumber(bet.value) }} <span>$</span>
        </div>
      </div>
      <div class="makeBet-body-my-bet">
        <div class="makeBet-body-my-bet-title">
          {{ $store.getters.getLanguageText('Укажите свою ставку') }}
        </div>
        <CustomInput class="makeBet-body-my-bet-input" :placeholder="`${$store.getters.getLanguageText(
          'Ваша ставка должна быть выше',
        )} ${formatNumber(startPrice)}$`" :outside-value="userBet" @setValue="setUserBet"
          :class="{ wrong: getIsWrong }" />
      </div>
      <div class="makeBet-body-make" @click="makeBet">
        {{ $store.getters.getLanguageText('Сделать ставку') }}
      </div>
      <div class="makeBet-body-cancel" @click="() => this.$emit('toggleMakeBetStatus')">
        {{ $store.getters.getLanguageText('Отменить') }}
      </div>
    </div>
  </div>
</template>

<script>
import events from '@/modules/events';
import CustomInput from '../../../CustomInput/CustomInput.vue';

export default {
  props: {
    lotId: {
      type: Number,
      required: true,
    },
    startPrice: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    CustomInput,
  },
  data() {
    return {
      userBet: null,
      isWrong: false,
    };
  },
  methods: {
    makeBet() {
      if (!this.getIsWrong && this.userBet > this.startPrice) {
        const bet = this.userBet;
        events.callServer(
          'MarketPlace:Auction:MakeBet:Server',
          this.lotId,
          bet,
        );
        this.$emit('toggleMakeBetStatus');
      }
    },
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      return { day: `${day}.${month}.${year}`, time: `${hours}:${minutes}` };
    },
    pickBet(bet) {
      this.userBet = bet;
    },
    formatNumber(num) {
      if (typeof num === undefined) return '';
      return num.toLocaleString('ru-RU');
    },
    setUserBet(num) {
      this.userBet = num;
      console.log(num);
    },
  },
  computed: {
    getDefaultBets() {
      const bets = [];
      const coefficients = [1.25, 1.5, 1.75, 2, 2.25, 2.5];
      for (let i = 0; i < 6; i++) {
        const value = this.startPrice * coefficients[i];
        bets.push({ id: i + 1, value: Math.floor(value) });
      }
      return bets;
    },
    getIsWrong() {
      return this.userBet > 0 ? false : true;
    },
  },
};
</script>

<style lang="scss" src="./MakeBet.scss" scoped></style>

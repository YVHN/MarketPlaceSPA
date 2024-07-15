<template>
  <div class="deployListing">
    <div class="deployListing-body">
      <div class="deployListing-body-title">
        {{
          $store.getters.getLanguageText(
            `${'Разместить'} ${getIsAuction ? 'лот' : 'обьявление'}`,
          )
        }}
      </div>
      <div class="deployListing-body-warning">
        {{ $store.getters.getLanguageText(getDescription) }}
      </div>
      <div class="deployListing-body-hours">
        <img src="@/views/MarketPlace/Assets/Icons/Listing/time.svg" />
        <div class="deployListing-body-hours-content">
          <div class="deployListing-body-hours-content-values">
            <div class="deployListing-body-hours-content-values-value">
              <div class="deployListing-body-hours-content-values-value-title">
                {{ $store.getters.getLanguageText('Часы размещения') }}
              </div>
              <div class="deployListing-body-hours-content-values-value-hours">
                {{ `${pickedHours} ${$store.getters.getLanguageText('ч.')}` }}
              </div>
            </div>
            <div class="deployListing-body-hours-content-values-value">
              <div class="deployListing-body-hours-content-values-value-title">
                {{ $store.getters.getLanguageText('Максимальное значение') }}
              </div>
              <div class="deployListing-body-hours-content-values-value-hours">
                {{ `${maxHours} ${$store.getters.getLanguageText('ч.')}` }}
              </div>
            </div>
          </div>
          <ProgressBar @pickQuantity="pickQuantity" :max-progress="maxHours" :min-progress="1" />
        </div>
      </div>
      <div class="deployListing-body-price">
        <img src="@/views/MarketPlace/Assets/Icons/Listing/money.svg" />
        <div class="deployListing-body-price-content">
          <div class="deployListing-body-price-content-title">
            {{ $store.getters.getLanguageText('Итоговая сумма') }}
          </div>
          <div class="deployListing-body-price-content-value">
            {{ `${getPriceForHours} $` }}
          </div>
        </div>
      </div>
      <div class="deployListing-body-payMethod">
        <div class="deployListing-body-payMethod-method" v-for="method in payMethods" :key="method.id"
          @click="deploy(method.value)">
          {{ $store.getters.getLanguageText(method.title) }}
        </div>
      </div>
      <div class="deployListing-body-cancel" @click="toggleDeployStatus">
        {{ $store.getters.getLanguageText('Отменить') }}
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/views/MarketPlace/Components/OpenedItem/Components/ProgressBar/ProgressBar.vue';
export default {
  props: {
    price: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  components: {
    ProgressBar,
  },
  data() {
    return {
      pickedHours: 1,
      isDragging: false,
      maxHours: 130,
      hoursQuantity: 0,
      payMethods: [
        {
          title: 'Оплата наличными',
          value: 'cash',
        },
        {
          title: 'Оплата картой',
          value: 'card',
        },
      ],
      payMethod: null,
    };
  },
  computed: {
    getDescription() {
      if (!this.getIsAuction) {
        return 'Размещение обьявления является платной услугой. Прежде чем обьявление станет доступно, необходимо указать время действия вашего обьявление, его можно будет продлить позже.';
      } else {
        return 'Размещение лота является платной услугой. Прежде чем лот выставится, необходимо указать время действия вашего лота.';
      }
    },
    getIsAuction() {
      return this.$route.path.includes('auction');
    },
    fillWidth() {
      return `${this.progress}%`;
    },
    handleLeft() {
      return `${this.progress}%`;
    },
    getPriceForHours() {
      let currentPrice = this.$store.getters.getPricePerHour;
      const additionalPrice = 350_000;
      for (let i = 1; i < this.pickedHours; i++) {
        currentPrice += this.$store.getters.getPricePerHour + additionalPrice;
      }
      return this.formatNumber(currentPrice);
    },
  },
  methods: {
    toggleDeployStatus() {
      this.$emit('toggleDeployStatus');
    },
    deploy(method) {
      this.$emit('deploy', { method: method, hours: this.pickedHours });
    },
    pickQuantity(hours) {
      this.pickedHours = hours;
    },
    formatNumber(num) {
      if (!num) return '';
      return num.toLocaleString('ru-RU');
    },
  },
};
</script>

<style lang="scss" src="./DeployListing.scss" scoped></style>

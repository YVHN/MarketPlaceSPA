<template>
  <div class="aside">
    <div class="aside-sections-list trading">
      <NavigateButton
        v-for="(section, index) in tradingSections"
        :key="index"
        :data="section"
        
      />
    </div>
    <div class="aside-sections-list personal">
      <NavigateButton
        v-for="(section, index) in personalSections"
        :key="index"
        :data="section"
      />
      <div class="aside-exit" @click="onClose">
        <img class="section-img" src="@/views/MarketPlace/Assets/Icons/exit.svg" />
        {{ $store.getters.getLanguageText('Выйти') }}
      </div>
    </div>
  </div>
</template>

<script>
import NavigateButton from './Components/NavigateButton/NavigateButton.vue';

export default {
  components: {
    NavigateButton,
  },
  computed: {
    getOpeningType() {
			return this.$store.getters.getOpeningType;
		},
  },
  data() {
    return {
      tradingSections: [
        {
          title: 'Аукцион',
          img: 'auction',
          path: 'auction',
        },
        {
          title: 'Недвижимость',
          img: 'estate',
          path: 'estate',
        },
        {
          title: 'Транспорт',
          img: 'transport',
          path: 'transport',
        },
        {
          title: 'Предметы',
          img: 'items',
          path: 'items',
        },
        {
          title: 'Амуниция',
          img: 'ammunition',
          path: 'ammunition',
        },
        {
          title: 'Аренда транспорта',
          img: 'rent',
          path: 'transportRent',
        },
        {
          title: 'Одежда и аксессуары',
          img: 'clothes',
          path: 'clothes',
        },
        {
          title: 'Услуги и прочее',
          img: 'services',
          path: 'services',
        },
        {
          title: 'Бизнес',
          img: 'business',
          path: 'business',
        },
      ],
      personalSections: [
        {
          title: 'Избранное',
          img: 'favorites',
          path: 'favorites',
        },
        {
          title: 'Склад хранения',
          img: 'storage',
          path: 'storage',
        },
        {
          title: 'Мои обьявления',
          img: 'listings',
          path: 'listings',
        },
        {
          title: 'История покупок',
          img: 'history',
          path: 'history',
        },
      ],
    };
  },
  mounted() {
    if (this.getOpeningType === 'InTablet' && !this.$route.path.includes('auction')) {
      this.$router.push('/market-place/viewing/auction');
    }
  },
  methods: {
    onClose() {
      mp.trigger("MarketPlace:Close:Client");
    },
  },
};
</script>

<style lang="scss" src="./Navigation.scss" scoped></style>

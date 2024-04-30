<template>
  <div class="createListing">
    <RouterView v-if="getItem !== null" />
    <ItemsList v-else :list-data="getListData" @sort="sort" />
  </div>
</template>

<script>
import ItemsList from '../../Components/ItemsList/ItemsList.vue';
import events from '@/modules/events';

export default {
  components: {
    ItemsList,
  },
  mounted() {
    this.checkAuction();
    this.checkRent();
  },
  beforeRouteLeave(to, from, next) {
    events.callServer('MarketPlace:CreateListing:Leave:Server');
    next();
  },
  data() {
    return {
      list: [],
      defaultListings: [
        {
          id: -1,
          sellData: {
            img: 'carKeys',
            title: 'Сдать транспорт в аренду',
            type: 'service',
            filter: 'transportRent',
          },
          status: 'unavailable',
        },
        {
          id: -2,
          sellData: {
            img: 'thunderclap',
            title: 'Создать обьявление',
            category: 'service',
            type: 'service',
            filter: 'none',
          },
          status: 'available',
        },
        {
          id: -3,
          sellData: {
            img: 'thunderclap',
            title: 'Выставить на аукцион',
            category: 'service',
            type: 'service',
            filter: 'auction',
          },
          status: 'unavailable',
        },
      ],
    };
  },
  computed: {
    getListData() {
      const storage = this.$store.getters.getList('createListing');
      let filter = this.$route.params.filter;
      if (filter === 'transport-rent') filter = 'transport';
      const defaultListings = this.defaultListings;
      if (filter === 'auction') {
        return storage.filter((item) => item.sellData.type !== 'item');
      } else if (filter === 'transport') {
        return storage.filter((item) => item.sellData.type === 'transport');
      } else {
        const listingData = [...defaultListings, ...storage];
        return listingData;
      }
    },
    getItem() {
      return this.$store.getters.getPickedItem;
    },
    isCanRent() {
      const rentFiltered = this.getListData.filter(
        (item) => item.sellData.type === 'transport',
      );
      return rentFiltered ? true : false;
    },
    isCanAuction() {
      const auctionFiltered = this.getListData.filter(
        (item) => item.sellData.type !== 'item',
      );
      return auctionFiltered ? true : false;
    },
  },
  watch: {
    // Отслеживаем изменения в computed свойстве getListData
    getListData: {
      handler: function (newValue) {
        const auctionFiltered = newValue.filter(
          (item) => item.sellData.type !== 'item',
        );
        const rentFiltered = newValue.filter(
          (item) => item.sellData.type === 'transport',
        );
        this.defaultListings[2].status = auctionFiltered.length
          ? 'available'
          : 'unavailable';
        this.defaultListings[0].status = rentFiltered.length
          ? 'available'
          : 'unavailable';
      },
      deep: true, // Включаем глубокое наблюдение, если это необходимо
    },
    isCanRent(newValue) {
      console.log('Rent : ' + newValue);
    },
  },

  methods: {
    sort(filter) {
      this.filter = filter;
    },
    checkAuction() {
      const rentFiltered = this.getListData.filter(
        (item) => item.sellData.type === 'transport',
      );
      this.defaultListings[0].status = rentFiltered.length
        ? 'available'
        : 'unavailable';
    },
    checkRent() {
      const auctionFiltered = this.getListData.filter(
        (item) => item.sellData.type !== 'item',
      );
      this.defaultListings[2].status = auctionFiltered.length
        ? 'available'
        : 'unavailable';
    },
  },
};
</script>

<style lang="scss" src="./CreateListing.scss" scoped></style>

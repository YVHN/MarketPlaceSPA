<template>
  <div class="createListing">
    <RouterView v-if="getSelectedItem !== null" />
    <ItemsList v-else :list-data="getListData" @sort="sort" />
  </div>
</template>

<script>
import { onUnmounted } from 'vue';
import ItemsList from '../../Components/ItemsList/ItemsList.vue';
import events from '@/modules/events';
import sectionsData from '../../Assets/Data/sectionsData';

export default {
  components: {
    ItemsList,
  },
  mounted() {
    this.$store.commit('resetListData');
    events.callServer('MarketPlace:List:GetListData:Server', 'createListing', 1);
    onUnmounted(() => {
      events.callServer('MarketPlace:CreateListing:Leave:Server');
      this.$store.commit('resetListData');
    });
  },
  data() {
    return {
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
            filter: 'empty',
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
      // this.$store.getters.getList
      const storage = sectionsData.createListing;
      let filter = this.$route.params.filter;
      if (filter === 'transport-rent') filter = 'transport';
      const defaultListings = this.defaultListings;
      if (filter === 'auction') {
        return storage.filter((item) => item.sellData.type !== 'item');
      } else if (filter === 'transportRent') {
        return storage.filter((item) => item.sellData.type === 'transport');
      } else {
        return [...defaultListings, ...storage];
      }
    },
    getSelectedItem() {
      return this.$store.getters.getPickedItem;
    },
  },
  watch: {
    getListData: {
      handler: function (newValue) {
        const auctionFiltered = newValue.filter(
          (item) => !['item', 'service'].includes(item.sellData.type),
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
      deep: true,
      immediate: true,
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

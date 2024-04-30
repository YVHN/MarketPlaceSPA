<template>
  <div class="navigateButton" :class="{ active: getIsActive }" @click="pickSection">
    <component class="navigateButton-img" :is="data.img" />
    <p class="navigateButton-title">
      {{ $store.getters.getLanguageText(data.title) }}
    </p>
  </div>
</template>

<script>
import events from '@/modules/events';

import auction from '@/views/MarketPlace/Assets/Icons/MarketSections/auction.vue';
import business from '@/views/MarketPlace/Assets/Icons/MarketSections/business.vue';
import clothes from '@/views/MarketPlace/Assets/Icons/MarketSections/clothes.vue';
import items from '@/views/MarketPlace/Assets/Icons/MarketSections/items.vue';
import estate from '@/views/MarketPlace/Assets/Icons/MarketSections/estate.vue';
import rent from '@/views/MarketPlace/Assets/Icons/MarketSections/rent.vue';
import services from '@/views/MarketPlace/Assets/Icons/MarketSections/services.vue';
import transport from '@/views/MarketPlace/Assets/Icons/MarketSections/transport.vue';
import favorites from '@/views/MarketPlace/Assets/Icons/PersonalSections/favorites.vue';
import history from '@/views/MarketPlace/Assets/Icons/PersonalSections/history.vue';
import listings from '@/views/MarketPlace/Assets/Icons/PersonalSections/listings.vue';
import storage from '@/views/MarketPlace/Assets/Icons/PersonalSections/storage.vue';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
  },
  components: {
    //icons
    auction,
    business,
    clothes,
    items,
    estate,
    rent,
    services,
    transport,
    favorites,
    history,
    listings,
    storage,
  },
  computed: {
    getIsActive() {
      if (this.section === 'trading') {
        return this.$route.params.filter === this.data.path;
      } else {
        return this.$route.path.includes(this.data.path);
      }
    },
  },
  methods: {
    pickSection() {
      this.$router.push(`/market-place/${this.$props.section}/${this.$props.data.path}`);
      setTimeout(() => {
        events.callServer(
          'MarketPlace:List:GetListData:Server',
          this.$props.data.path,
          1
        );
        this.$store.dispatch('resetPickedItem');
      }, 30);
    },
  },
};
</script>

<style lang="scss" scoped>
.navigateButton {
  display: flex;
  border-radius: 0.556vmin;
  padding: 0.741vmin 1.759vmin;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    background 0.3s ease;
  position: relative;
  z-index: 5;

  &-img {
    margin-right: 1.759vmin;
    width: 1.481vmin;
    height: 1.481vmin;
    transition: fill-opacity 0.3s ease;
  }

  &-title {
    font-weight: 700;
    font-size: 1.296vmin;
    color: #fff;
  }

  &:hover {
    transform: scale(1.05);
    background: rgba(73, 73, 73, 0.1);
  }

  &:active {
    transform: scale(1.1);
  }
}

.active {
  background: #5f9adf;
  transform: scale(1.05);

  &:hover {
    background: #5f9adf;
  }

  .navigateButton-img {
    fill-opacity: 1;
  }
}
</style>

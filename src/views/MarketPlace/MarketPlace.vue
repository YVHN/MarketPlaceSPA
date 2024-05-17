<template>
  <div class="marketPlace">
    <img class="marketPlace-background-triangles" src="@/views/MarketPlace/Assets/Images/backgroundTriangles.svg" />
    <div class="marketPlace-body">
      <div class="logo">
        <div class="logo-title">Market <span>place</span></div>
        <div class="logo-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      <Header />
      <Navigation />
      <div class="content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Components/Header/Header.vue';
import Navigation from './Components/Navigation/Navigation.vue';

export default {
  name: 'MarketPlace',
  components: {
    Navigation,
    Header,
  },
  mounted() {
    this.$store.commit('start');
    if (!['auction', 'storage'].includes(this.$route.params.section)) {
      if(this.getOpeningType === 'inTablet') this.$router.push('/market-place/viewing/storage');
      else this.$router.push('/market-place/viewing/auction');
    }
  },
  computed: {
    getOpeningType() {
      return this.$store.getters.getOpeningType;
    }
  }
};
</script>

<style lang="scss" src="./MarketPlace.scss"></style>

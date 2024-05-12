<template>
  <div class="marketPlace">
    <img
      class="marketPlace-background-triangles"
      src="@/views/MarketPlace/Assets/Images/backgroundTriangles.svg"
    />
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.$route.params.section !== 'auction') {
        vm.$router.push('/market-place/viewing/auction');
      }
    });
  },
  mounted() {
    this.$store.commit('start');
  },
};
</script>

<style lang="scss" src="./MarketPlace.scss"></style>

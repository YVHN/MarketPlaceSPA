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
      <HeaderBlock />
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
import events from '@/modules/events';
import HeaderBlock from './Components/HeaderBlock/HeaderBlock.vue';
import Navigation from './Components/Navigation/Navigation.vue';

export default {
  beforeRouteEnter(to, from, next) {
    events.callServer('MarketPlace:GetListData:Server', to.params.filter, 1);
    next(vm => {
      if(vm.$route.params.filter !== 'auction') {
        vm.$router.push('/market-place/trading/auction');
      }
    });
  },
  components: {
    Navigation,
    HeaderBlock,
  },
};
</script>

<style lang="scss" src="./MarketPlace.scss" scoped></style>

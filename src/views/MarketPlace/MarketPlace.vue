<template>
  <div class="reset">
    <div class="marketPlace" :class="{ inStorage: isInStorage, inTablet: !isInStorage }">
      <img class="marketPlace-background-triangles" src="@/views/MarketPlace/Assets/Images/backgroundTriangles.svg" />
      <div class="marketPlace-body">
        <div class="logo">
          <div class="logo-title">Market <span>place</span></div>
          <div class="logo-description">
            Уникальная платформа, где вы можете обменять своё имущество на товары других игроков и многое другое!
          </div>
        </div>
        <div class="header">
          <Header v-if="!isInStorage"/>
          <div class="header-storage" v-else>
            {{ $store.getters.getLanguageText("Склад хранения") }}
          </div>
        </div>
        <div class="aside">
          <Navigation v-if="!isInStorage"/>
          <div class="aside-inventory" v-if="false">
            <!-- Тут инвентарь -->
            <!-- <div class="aside-inventory-empty">
              Тут инвентарь будет
            </div> -->
          </div>
        </div>
        <div class="content">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
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
      //if (this.isInStorage) this.$router.push('/market-place/viewing/storage');
      //else this.$router.push('/market-place/viewing/auction');
      this.$router.push('/market-place/viewing/auction');
    }
  },
  computed: {
    getOpeningType() {
      return this.$store.getters.getOpeningType;
    },
    isInStorage() {
      return this.getOpeningType === 'InStorage';
    }
  }
};
</script>

<style lang="scss" src="./MarketPlace.scss"></style>

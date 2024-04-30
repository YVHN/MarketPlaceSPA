<template>
  <div class="trading">
    <ItemsList :list-data="getList" />
  </div>
</template>

<script>
import ItemsList from '../../Components/ItemsList/ItemsList.vue';

export default {
  components: {
    ItemsList,
  },
  computed: {
    getList() {
      return this.$store.getters.getList(this.$route.params.filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.trading {
  width: 100%;
  height: 100%;
}
</style>

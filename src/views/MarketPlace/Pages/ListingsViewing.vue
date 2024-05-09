<template>
  <div class="trading">
    <!-- Открытый айтем -->
    <RouterView v-if="getSelectedItem" />
    <!-- Список айтемов -->
    <ItemsList v-else :list-data="getList" />
  </div>
</template>

<script>
import ItemsList from '../Components/ItemsList/ItemsList.vue';

export default {
  components: {
    ItemsList,
  },
  computed: {
    getList() {
      return this.$store.getters.getList;
    },
    getSelectedItem() {
      return this.$store.getters.getSelectedItem;
    }
  },
};
</script>

<style lang="scss" scoped>
.trading {
  width: 100%;
  height: 100%;
}
</style>

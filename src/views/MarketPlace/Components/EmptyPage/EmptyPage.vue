<template>
  <div class="EmptyPage">
    <img src="@/views/MarketPlace/Assets/Images/emptyImg.png" alt="Empty page" />
    <div>{{ $store.getters.getLanguageText(msg) }}</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPage',
  props: {
    msg: {
      type: String,
      default: 'ТУТ ПОКА ПУСТО',
    },
  },
};
</script>

<style lang="scss" scoped>
.EmptyPage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
  font-size: 1.481vmin;

  & > img {
    width: 47.407vmin;
    height: 47.407vmin;
  }
  * {
    font-family: 'PF DinDisplay Pro';
  }
}
</style>

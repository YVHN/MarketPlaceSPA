<template>
  <div class="img-wrapper" :class="[size, getImgSize]">
    <img :src="require(`@/views/MarketPlace/Assets/Images/Items/${img}.png`)" />
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    isSmall: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    getImgSize() {
      if (
        ['house', 'apartment', 'service', 'business'].includes(this.itemType) &&
        !this.isSmall
      )
        return 'big';
      return 'small';
    },
  },
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  width: 100%;
  border-radius: 0.463vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    height: 100%;
  }
}
.big {
  padding: 0 !important;
  width: 100% !important;
  & > img {
    width: 100%;
  }
}
.m {
  height: 20.37vmin;
  padding: 1.5vmin 6vmin;
  backdrop-filter: blur(2.88vmin);
  background: rgba(255, 255, 255, 0.02);
}
.l {
  height: 40vmin;
  padding: 4vmin 12vmin;
  backdrop-filter: blur(2.88vmin);
  background: rgba(255, 255, 255, 0.02);
}
</style>

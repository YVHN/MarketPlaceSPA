<template>
  <div class="img-wrapper" :class="[size, getImgSize]">
    <img :src="getImgPath(cardItem)" :class="{ 'imgFull': getIsImgFull() }" />
  </div>
</template>

<script>
import { getImgPath } from '@/functions/marketplace';
export default {
  props: {
    cardItem: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    isSmall: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    getImgPath(cardItem) {
      return getImgPath(cardItem);
    },
    getIsImgFull() {
      return ['business', 'house', 'apartment'].includes(this.cardItem.sellData.type);
    },
  },
  computed: {
    getImgSize() {
      if (
        ['house', 'apartment', 'service', 'business'].includes(this.cardItem.sellData.type) &&
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
  overflow: hidden;
  & > img {
    height: 90%;
    max-width: 90%;
    object-fit: contain;
  }
}
.imgFull {
  object-fit: initial !important;
  padding: 0;
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
  backdrop-filter: blur(2.88vmin);
  background: rgba(255, 255, 255, 0.02);
}
.l {
  height: 40vmin;
  padding: 4vmin;
  backdrop-filter: blur(2.88vmin);
  background: rgba(255, 255, 255, 0.02);
}
</style>

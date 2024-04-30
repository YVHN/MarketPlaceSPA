<template>
  <favorite
    class="favorite"
    @click.native="update"
    :class="[{ active: getFavoriteStatus }, size]"
  />
</template>

<script>
import favorite from '@/views/MarketPlace/Assets/Icons/Items/favorite.vue';
import events from '@/modules/events';

export default {
  props: {
    itemId: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      status: this.isFavorite,
    };
  },
  components: {
    favorite,
  },
  methods: {
    update() {
      this.status = !this.status;
      events.callServer(
        'MarketPlace:Item:Favorite:Server',
        this.itemId,
        this.status,
      );
    },
  },
  computed: {
    getFavoriteStatus() {
      return this.status;
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  cursor: pointer;
  position: absolute;
  fill: transparent;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    fill 0.3s ease;
  &:hover {
    transform: scale(1.15);
  }
}
.active {
  transform: scale(1.1);
  fill: rgb(197, 27, 27);
}
.big {
  width: 2.778vmin;
  height: 2.407vmin;
  top: 2.778vmin;
  right: 4.63vmin;
}
.small {
  width: 1.481vmin;
  height: 1.296vmin;
  top: 1.2vmin;
  right: 0.463vmin;
}
</style>

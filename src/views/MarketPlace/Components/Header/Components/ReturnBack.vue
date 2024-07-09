<template>
    <div class="returnButton" @click="returnBack">
        <returnBack class="returnButton-img" />
        {{ $store.getters.getLanguageText('Вернуться назад') }}
    </div>
</template>

<script>
import returnBack from '@/views/MarketPlace/Assets/Icons/returnBack.vue';
import events from '@/modules/events';
// TODO import { getStore } from '@/store2';
import { computed } from 'vue';
export default {
    name: 'ReturnBack',
    components: {
        returnBack
    },
    setup() {
        const { marketPlace } = getStore();
        const activeSortIndex = computed(() => marketPlace.activeSortIndex);
        return {
            activeSortIndex
        };
    },
    methods: {
        returnBack() {
            if (this.$route.path.includes('createListing')) {
                if (this.$route.params?.type || this.$route.params.filter !== 'all') {
                    this.$router.push('/market-place/createListing/all');
                    events.callServer('MarketPlace:List:GetListData:Server', 'createListing', 1, this.activeSortIndex);
                } else {
                    this.$router.push('/market-place/viewing/auction');
                }
            } else {
                this.$router.go(-1);
            }
            this.$store.commit('resetPickedItem');
        }
    }
};
</script>

<style lang="scss" scoped>
.returnButton {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1.481vmin;
    color: rgba(255, 255, 255, 0.28);
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease;

    .returnButton-img {
        margin-right: 1.389vmin;
        width: 1.481vmin;
        height: 1.481vmin;
        transition: fill-opacity 0.3s ease;
    }

    &:hover {
        transform: scale(1.05);
        color: #fff;

        .returnButton-img {
            fill-opacity: 1;
        }
    }
}
</style>

<template>
    <div class="pagination">
        <TransitionGroup class="pagination-transition" tag="div" name="pagination">
            <div class="pagination-page" v-for="page in pagesQuantity" :key="page" @click="selectPage(page)" :class="{ active: getCurrentPage === page }">
                {{ page }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import events from '@/modules/events';
import { getStore } from '@/store2';
import { computed, onUnmounted } from 'vue';
export default {
    props: {
        pagesQuantity: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.$store.commit('selectPage', 1);
        onUnmounted(() => {
            this.$store.commit('selectPage', 1);
        });
    },
    setup() {
        const { marketPlace } = getStore();
        const activeSortIndex = computed(() => marketPlace.activeSortIndex);
        return {
            activeSortIndex
        };
    },
    watch: {
        getCurrentSection: {
            handler(newValue, oldValue) {
                this.$store.commit('selectPage', 1);
            },
            immediate: true
        }
    },
    methods: {
        selectPage(page) {
            this.$store.commit('selectPage', page);
            let requestSectionPath = '';
            if (this.isCreateListing && this.$route.params?.filter !== 'all') {
                requestSectionPath = `createListing/${this.$route.params.filter}`;
            } else if (this.isCreateListing) {
                requestSectionPath = 'createListing';
            } else {
                requestSectionPath = this.$route.params.section;
            }
            events.callServer('MarketPlace:List:GetListData:Server', requestSectionPath, this.getCurrentPage, this.activeSortIndex);
        }
    },
    computed: {
        getCurrentPage() {
            return this.$store.getters.getCurrentPage;
        },
        getCurrentSection() {
            if (this.$route.params?.section) {
                return this.$route.params.section;
            } else return this.$route.params.filter;
        },
        isCreateListing() {
            return this.$route.path.includes('createListing');
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    padding-bottom: 0.278vmin;
    display: flex;
    align-items: center;
    justify-content: center;

    &-transition {
        display: flex;
        gap: 1vmin;
    }

    &-page {
        padding: 1.389vmin 1.667vmin;
        font-weight: 700;
        font-size: 1.019vmin;
        text-align: center;
        border-radius: 0.278vmin;
        background: rgba(255, 255, 255, 0.03);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        user-select: none;

        &:hover {
            transform: scale(1.1);
        }

        &:active {
            transform: scale(1.15);
        }
    }

    .active {
        border: 0.093vmin solid #5f9adf;
        background: radial-gradient(ellipse at center, rgba(95, 154, 223, 0.2) 0%, rgba(229, 229, 229, 0) 100%);
    }
}

.pagination-enter-active,
.pagination-leave-active {
    transition: opacity 0.3s ease;
}

.pagination-enter,
.pagination-leave-to {
    opacity: 0;
}
</style>

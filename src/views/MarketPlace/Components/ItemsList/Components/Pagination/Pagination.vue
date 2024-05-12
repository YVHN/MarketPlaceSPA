<template>
    <div class="pagination">
        <TransitionGroup class="pagination-transition" tag="div" name="pagination">
            <div class="pagination-page" v-for="page in pagesQuantity" :key="page" @click="selectPage(page)"
                :class="{ active: selectedPage === page }">
                {{ page }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import events from '@/modules/events';
import { onUnmounted } from 'vue';
export default {
    props: {
        pagesQuantity: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            selectedPage: 1,
        }
    },
    mounted() {
        this.selectedPage = 1;
        onUnmounted(() => {
            this.selectedPage = 1;
        })
    },
    watch: {
        getCurrentSection: {
            handler(newValue, oldValue) {
                this.selectedPage = 1;
            },
            immediate: true,
        }
    },
    methods: {
        selectPage(page) {
            this.selectedPage = page;
            events.callServer(
                'MarketPlace:List:GetListData:Server',
                this.$route.params.section,
                this.selectedPage
            );
        },
    },
    computed: {
        getCurrentSection() {
            if (this.$route.params?.section) {
                return this.$route.params.section;
            }
            else return this.$route.params.filter;
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
    }

    &-page {
        padding: 1.389vmin 1.667vmin;
        font-weight: 700;
        font-size: 1.019vmin;
        text-align: center;
        border-radius: 0.278vmin;
        background: rgba(98, 98, 98, 0.03);
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
        background: radial-gradient(ellipse at center,
                rgba(95, 154, 223, 0.2) 0%,
                rgba(229, 229, 229, 0) 100%);
    }
}

.pagination-enter-active,
.pagination-leave-active {
    transition: opacity .3s ease;
}

.pagination-enter,
.pagination-leave-to {
    opacity: 0;
}
</style>
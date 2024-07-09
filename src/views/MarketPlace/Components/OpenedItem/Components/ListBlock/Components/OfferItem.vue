<template>
    <div class="offer" :class="{ 'my-offer': offerData.isOwner }">
        <div class="user">
            <img src="@/views/MarketPlace/Assets/Icons/User/avatar1.svg" class="user-icon" />
            <div class="user-userName">{{ offerData.playerData.username }}</div>
        </div>
        <template v-if="type === 'auction'">
            <div class="offer-value">{{ offerData.playerData.static }}</div>
            <div class="offer-value">
                {{ parseDate(offerData.created).date }}
                <span class="date">{{ parseDate(offerData.created).time }}</span>
            </div>
            <div class="offer-value price">{{ `${formatNumber(offerData.bet)} $` }}</div>
        </template>
        <template v-if="type === 'exchange'">
            <div class="offer-value">{{ offerData.playerData.static }}</div>
            <div class="offer-value">{{ offerData.state }}</div>
            <div class="offer-value">{{ offerData.quantity }}</div>
            <div class="offer-value">{{ `${formatNumber(offerData.pricePerItem)} $` }}</div>
            <div class="offer-value">{{ shelfTime }}</div>
            <div class="offer-value button" @click="cancelOffer" v-if="offerData.isOwner">Снять</div>
            <div class="offer-value button" @click="buyItem" v-else>Купить</div>
        </template>
    </div>
</template>

<script>
import { formatNumber, parseDate, getEndTime } from '@/functions/marketplace';
import events from '@/modules/events';
import { onUnmounted } from 'vue';

export default {
    props: {
        offerData: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            shelfTime: null,
            intervalId: null,
        }
    },
    mounted() {
        if (this.offerData?.endTime) {
            this.getEndTime();
            this.startTimer();
        }
        onUnmounted(() => {
            clearInterval(this.getEndTime, 1000);
            this.intervalId = null;
        })
    },
    methods: {
        buyItem() {
            console.log('покупка');
            this.$emit('buyItem', this.offerData)
        },
        cancelOffer() {
            events.callServer('MarketPlace:Exchange:CancelOffer:Server', this.getPickedItem.id, this.offerData.id);
        },
        startTimer() {
            this.intervalId = setInterval(this.getEndTime, 1000);
            if (!this.shelfTime) {
                clearInterval(this.getEndTime, 1000);
                this.intervalId = null;
            }
        },
        formatNumber(num) {
            return formatNumber(num);
        },
        parseDate(time) {
            return parseDate(time, 'object');
        },
        getEndTime() {
            this.shelfTime = getEndTime(this.offerData.endTime, 'default');
        }
    },
    computed: {
        getPickedItem() {
            return this.$store.getters.getPickedItem;
        },
    },
};
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    gap: 1.389vmin;
    align-items: center;
    flex-basis: 8.426vmin;
    flex-grow: 1;
    justify-content: center;

    &-icon {
        width: 2.778vmin;
        height: 2.778vmin;
    }

    &-userName {
        font-weight: 500;
        font-size: 1.111vmin;
        color: #fff;
    }
}

.offer {
    align-items: center;
    display: flex;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.741vmin;
    padding: 0.741vmin 1.019vmin;
    width: calc(100% - 1.852vmin);
    height: 4.815vmin;
    align-items: center;

    &-value {
        display: flex;
        gap: 0.5vmin;
        flex-grow: 1;
        justify-content: center;
        flex-basis: 8.426vmin;
        font-weight: 500;
        font-size: 1.111vmin;
        color: #fff;
    }

    .price {
        color: #0f6;
    }

    .date {
        color: rgba(255, 255, 255, 0.29);
    }
}

.button {
    background: rgba(255, 255, 255, 0.08);
    height: 100%;
    align-items: center;
    border-radius: 0.185vmin;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;

    &:hover {
        transform: scale(1.04);
        background: #5F9ADF;
    }
}

.my-offer {
    box-shadow: 0 0 1vmin rgba(#5F9ADF, 0.8);
}
</style>
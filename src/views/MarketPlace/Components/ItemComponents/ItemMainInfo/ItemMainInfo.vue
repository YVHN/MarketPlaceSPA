<template>
    <div class="mainInfo" :class="type">
        <div class="mainInfo-unit" v-for="(unit, index) in getItemMainInfo" :key="index">
            <div class="mainInfo-unit-title">
                {{ `${$store.getters.getLanguageText(unit.title)}` }}
            </div>
            <div class="mainInfo-unit-value">
                {{ $store.getters.getLanguageText(unit.value) }}
            </div>
        </div>
    </div>
</template>

<script>
import { getCardItemType, formatNumber, getItemSubTitle, parseDate } from '@/functions/marketplace';
export default {
    props: {
        cardItem: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
    },
    mounted() {
        if (this.cardItem.sellData?.coordinates) {
            console.log(this.cardItem.sellData?.coordinates);
            mp.trigger("MarketPlace:Item:GetAddress:Client", this.cardItem.id, this.cardItem.sellData.coordinates.x, this.cardItem.sellData.coordinates.y, this.cardItem.sellData.coordinates.z);
        }
    },
    computed: {
        getItemMainInfo() {
            const info = [];
            if (!['item', 'itemWithData'].includes(this.cardItem.sellData?.type)) {
                info.push(
                    {
                        title: 'Тип:',
                        value: getCardItemType(this.cardItem.sellData.type),
                    }
                )
            } else if (['item', 'itemWithData'].includes(this.cardItem.sellData?.type)) {
                info.push(
                    {
                        title: 'Категория:',
                        value: getItemSubTitle(this.cardItem, 'items'),
                    }
                )
            }
            if (this.cardItem?.auctionData?.lastBet) {
                info.push(
                    {
                        title: 'Последняя ставка:',
                        value: `${formatNumber(this.cardItem?.auctionData?.lastBet)} $`,
                    }
                )
            }
            if (this.cardItem?.auctionData?.parkingCapacity) {
                info.push(
                    {
                        title: 'Кол-во гаражных мест:',
                        value: this.cardItem?.auctionData.parkingCapacity,
                    },
                )
            }
            if (this.cardItem.sellData?.coordinates) {
                info.push(
                    {
                        title: 'Адрес:',
                        value: this.$store.getters.getItemAddress(this.cardItem.sellData?.coordinates),
                    }
                )
            }
            if (this.cardItem.sellData?.licensePlate) {
                info.push(
                    {
                        title: 'Гос. номер:',
                        value: this.cardItem.sellData?.licensePlate,
                    },
                )
            }
            if(this.cardItem.sellData?.serial) {
                info.push({
                    title: 'Сер. номер:',
                    value: this.cardItem.sellData.serial,
                })
            }
            if(this.cardItem.sellData?.spent) {
                info.push({
                    title: 'Осталось использований:',
                    value: this.cardItem.sellData.spent,
                })
            }
            if(this.cardItem.sellData?.state) {
                info.push({
                    title: 'Состояние:',
                    value: `${this.cardItem.sellData.state}%`,
                })
            }
            if (this.cardItem.sellData?.weight) {
                info.push(
                    {
                        title: 'Вес товара:',
                        value: `${this.cardItem.sellData?.weight} ${this.$store.getters.getLanguageText('кг.')}`,
                    }
                )
            }
            if (this.cardItem?.tradeData?.available) {
                info.push(
                    {
                        title: 'Кол-во:',
                        value: this.cardItem.tradeData.available,
                    }
                )
            }
            if (this.cardItem.tradeData?.startPrice) {
                info.push(
                    {
                        title: 'Минимальная цена:',
                        value: `${this.cardItem.tradeData.startPrice} $`,
                    }
                )
            }
            if (this.cardItem.sellData.statePrice && this.getIsShowStatePrice) {
                info.push(
                    {
                        title: 'Гос. цена:',
                        value: `${formatNumber(this.cardItem.sellData.statePrice)} $`,
                    }
                )
            }
            if (this.cardItem.sellData?.gender !== undefined) {
                info.push(
                    {
                        title: 'Пол:',
                        value: this.$store.getters.getLanguageText(this.cardItem.sellData.gender ? 'Мужской' : 'Женский'),
                    }
                )
            }
            if (this.cardItem.sellData?.tuningStatus) {
                info.push(
                    {
                        title: 'Тюнинг:',
                        value: this.cardItem.sellData.tuningStatus,
                    }
                )
            }
            if (this.cardItem?.endTime) {
                info.push(
                    {
                        title: 'Окончание размещения:',
                        value: parseDate(this.cardItem.endTime, 'default'),
                    }
                )
            }
            return info;
        },
        getIsShowStatePrice() {
            return ['auction'].includes(this.$route.params.section) || this.$route.path.includes('createListing');
        }
    },
};
</script>

<style lang="scss" scoped>
.mainInfo {
    display: flex;
    gap: 0.8vmin;
    flex-wrap: wrap;

    .mainInfo-unit {
        display: flex;
        gap: 0.5vmin;
        align-items: center;
        text-wrap: nowrap;
    }

    .mainInfo-unit-title {
        font-weight: 400;
        font-size: 1.296vmin;
        color: rgba(255, 255, 255, 0.17);
    }

    .mainInfo-unit-value {
        font-weight: 500;
        font-size: 1.296vmin;
        color: #fff;
    }
}

.column {
    flex-direction: column;
}
</style>
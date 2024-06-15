<template>
    <div class="itemTips" v-show="getTips.length">
        <div class="itemTips-tip" v-for="(unit, index) in getTips" :key="index">
            <component class="itemTips-tip-icon" :is="unit.img"></component>
            <div class="itemTips-tip-value">{{ `${formatNumber(unit.value)}` }}</div>
        </div>
    </div>
</template>

<script>
import competitors from '@/views/MarketPlace/Assets/Icons/Item/competitors.vue';
import mileage from '@/views/MarketPlace/Assets/Icons/Item/mileage.vue';
import parking from '@/views/MarketPlace/Assets/Icons/Item/parking.vue';
import quantity from '@/views/MarketPlace/Assets/Icons/Item/quantity.vue';
import tenants from '@/views/MarketPlace/Assets/Icons/Item/tenants.vue';
import weight from '@/views/MarketPlace/Assets/Icons/Item/weight.vue';
import { formatNumber } from '@/functions/marketplace';
export default {
    props: {
        cardItem: {
            type: Object,
            required: true,
        }
    },
    components: {
        competitors,
        mileage,
        parking,
        quantity,
        tenants,
        weight,
    },
    data() {
        return {}
    },
    methods: {
        formatNumber(num) {
            return formatNumber(num);
        }
    },
    computed: {
        getTips() {
            const item = this.cardItem.sellData;
            const list = [];
            if (item?.competitors) {
                list.push({
                    img: 'competitors',
                    value: item.competitors,
                });
            }
            if (item?.parkingCapacity) {
                list.push({
                    img: 'parking',
                    value: item.parkingCapacity,
                });
            }
            if (item?.mileage) {
                list.push({
                    img: 'mileage',
                    value: item.mileage,
                });
            }
            if (item?.maxTenants) {
                list.push({
                    img: 'tenants',
                    value: item.maxTenants,
                });
            }
            if (item.weight) {
                list.push({
                    img: 'weight',
                    value: item.weight,
                });
            }
            return list;
        },
    },
};
</script>

<style lang="scss" scoped>
.itemTips {
    display: flex;
    align-items: center;
    gap: 2.037vmin;
    &-tip {
        display: flex;
        align-items: center;
        gap: 0.7vmin;

        &-icon {
            width: 2.222vmin;
            height: 2.222vmin;
            fill: #5f9adf;
        }

        &-value {
            font-weight: 700;
            font-size: 1.296vmin;
            color: #fff;
        }
    }
}
</style>
<template>
    <div class="exchange">
        <div class="top">
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <Img :cardItem="getPickedItem" :size="'big'" />
                        <FavoriteIndicator :itemId="getPickedItem.id" :size="'big'" :is-favorite="getPickedItem.isFavorite" />
                    </div>
                    <div class="item-info">
                        <div class="item-info-title">
                            {{ getPickedItem.sellData.title }}
                        </div>
                        <ItemMainInfo :card-item="getPickedItem" :type="'column'" />
                    </div>
                </div>
                <div class="item-addLot">
                    <div class="btns">
                        <div class="item-button" :class="{ off: !haveItem }" @click="toggleStatus('add')">
                            {{ $store.getters.getLanguageText('Добавить лот на продажу') }}
                        </div>
                        <div class="item-button trash" v-if="getIsAdmin" @click="deleteItem">
                            <trash class="action-img" />
                        </div>
                    </div>
                    <div class="item-warning" v-if="!haveItem">
                        {{
                            $store.getters.getLanguageText(
                                'Этот предмет отсутствует на вашем складе, Вы не можете выставить этот лот на торговую площадку, приобретите этот товар.'
                            )
                        }}
                    </div>
                </div>
            </div>
            <ListBlock :list="getPickedItem.tradeData.offers" @buyItem="buyItem" :showType="'exchange'" />
        </div>
        <div class="exchange-graph">
            <div class="exchange-graph-title">
                {{ $store.getters.getLanguageText('График цен') }}
            </div>
            <Graph :graphData="getPickedItem.tradeData?.graphData || {}" />
        </div>
        <BuyItem v-if="isBuy" @toggleIsBuyStatus="toggleStatus('buy')" :offer="buyItemData" />
        <AddLot v-if="isAdd" :data="haveItem" @toggleIsAddStatus="toggleStatus('add')" @resetSellItem="resetSellItem" />
    </div>
</template>

<script>
import Img from '@/views/MarketPlace/Components/ItemComponents/Img/Img.vue';
import ListBlock from '../ListBlock/ListBlock.vue';
import FavoriteIndicator from '@/views/MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import BuyItem from './Components/BuyItem/BuyItem.vue';
import AddLot from './Components/AddLot/AddLot.vue';
import Graph from '../Graph/Graph.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';
import { getItemSubTitle } from '@/functions/marketplace';
import ItemMainInfo from '../../../ItemComponents/ItemMainInfo/ItemMainInfo.vue';
import sectionsData from '@/views/MarketPlace/Assets/Data/sectionsData';
import { getImgPath } from '@/functions/marketplace';

import trash from '@/views/MarketPlace/Assets/Icons/Item/trash.vue';

export default {
    components: {
        ListBlock,
        Graph,
        FavoriteIndicator,
        BuyItem,
        AddLot,
        ItemMainInfo,
        Img,
        trash
    },
    data() {
        return {
            isBuy: false,
            isAdd: false,
            buyItemData: null,
            haveItem: null
        };
    },
    mounted() {
        onUnmounted(() => {
            events.remove('MarketPlace:Exchange:SetItemForSell:Cef');
        });
        events.callServer('MarketPlace:Exchange:IsCanSell:Server', this.getPickedItem.sellData.itemType);
        events.add('MarketPlace:Exchange:SetItemForSell:Cef', (json) => {
            const parsedJson = JSON.parse(json);
            this.haveItem = parsedJson;
        });
    },
    computed: {
        getPickedItem() {
            return this.$store.getters.getPickedItem;
        },
        getIsAdmin() {
            return this.$store.getters.getIsAdmin;
        }
    },
    methods: {
        deleteItem() {
            const id = this.getPickedItem.id;
            events.callServer('MarketPlace:Admin:RemoveElement:Server', id);
        },
        getImgPath(itemCard) {
            return getImgPath(itemCard);
        },
        resetSellItem() {
            this.haveItem = null;
            setTimeout(() => {
                events.callServer('MarketPlace:Exchange:IsCanSell:Server', this.getPickedItem.sellData.itemType);
            }, 1500);
        },
        formatNumber(num) {
            return `$${num.toLocaleString('ru-RU')}`;
        },
        toggleStatus(type) {
            if (type === 'add' && this.haveItem) {
                this.isAdd = !this.isAdd;
            } else if (type === 'buy') {
                this.isBuy = !this.isBuy;
            }
        },
        buyItem(offerData) {
            const data = {
                cardItemId: this.getPickedItem.id,
                offerId: offerData.id,
                name: this.getPickedItem.sellData.itemName,
                playerData: offerData.playerData,
                state: offerData.state,
                quantity: offerData.quantity,
                price: offerData.pricePerItem
            };
            this.buyItemData = data;
            this.toggleStatus('buy');
        }
    }
};
</script>

<style lang="scss" src="./OpenedExchange.scss" scoped></style>

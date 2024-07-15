<template>
    <div class="auction">
        <div class="top">
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <Img v-if="!images[0]" :card-item="getPickedItem" :size="'m'" />
                        <div class="imgBlock" v-else>
                            <img :src="images[selectedImage]" :alt="images[selectedImage]" />
                        </div>
                        <FavoriteIndicator :itemId="getPickedItem.id" :size="'big'" :is-favorite="getPickedItem.isFavorite" />
                        <div class="leafImages" v-if="images.length > 1">
                            <div class="arrow flip" @click="changeImage(false)">
                                <img src="./imgs/arrow.svg" alt="" />
                            </div>
                            <div class="arrow" @click="changeImage(true)">
                                <img src="./imgs/arrow.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="item-info">
                        <div class="item-info-header">
                            <div class="item-title">
                                {{ getItemTitle(getPickedItem) }}
                            </div>
                            <div class="item-likesviews">
                                <div class="item-likesviews-unit">
                                    {{ getPickedItem.likes }}
                                    <likes class="item-likesviews-unit-img" />
                                </div>
                                <div class="item-likesviews-unit">
                                    {{ getPickedItem.views }}
                                    <img class="item-likesviews-unit-img" src="@/views/MarketPlace/Assets/Icons/Item/views.svg" />
                                </div>
                            </div>
                        </div>
                        <ItemMainInfo :card-item="getPickedItem" class="item-info-mainInfo" :type="'column'" />
                    </div>
                </div>
                <div class="item-buttons">
                    <div class="item-button bet-button" @click="toggleStatus">
                        {{ $store.getters.getLanguageText('Сделать ставку') }}
                    </div>
                    <div class="item-button like-button" :class="{ liked: isLiked }" @click="toLike">
                        <likes class="like-button-img" />
                    </div>
                    <div class="item-button like-button" @click="deleteItem">
                        <trash class="like-button-img" />
                    </div>
                </div>
            </div>
            <ListBlock :list="getPickedItem.auctionData.offers" :showType="'auction'" />
        </div>
        <div class="auction-graph">
            <div class="auction-graph-title">
                {{ $store.getters.getLanguageText('График цен') }}
            </div>
            <Graph :graph-data="getPickedItem.auctionData?.graphData || {}" />
        </div>
        <MakeBet
            v-if="isMakeBet"
            :lotId="getPickedItem.id"
            :title="getItemTitle(getPickedItem)"
            :startPrice="getPickedItem.auctionData.lastBet"
            @toggleMakeBetStatus="toggleStatus"
        />
    </div>
</template>

<script>
import events from '@/modules/events';
import likes from '@/views/MarketPlace/Assets/Icons/Item/likes.vue';
import trash from '@/views/MarketPlace/Assets/Icons/Item/trash.vue';
import Img from '../../../ItemComponents/Img/Img.vue';
import ListBlock from '../ListBlock/ListBlock.vue';
import FavoriteIndicator from '@/views//MarketPlace/Components/ItemComponents/FavoriteIndicator/FavoriteIndicator.vue';
import MakeBet from './Components/MakeBet/MakeBet.vue';
import Graph from '../Graph/Graph.vue';
import { parseDate } from '@/functions/marketplace';
import { onUnmounted } from 'vue';

import { getItemTitle } from '@/functions/marketplace';
import ItemMainInfo from '../../../ItemComponents/ItemMainInfo/ItemMainInfo.vue';
export default {
    mounted() {
        this.loadImages();
        this.setIsLiked();
        onUnmounted(() => {
            events.remove('Marketplace:Auction:AppendOffer:Cef');
        });
        events.add('Marketplace:Auction:AppendOffer:Cef', (id, json) => {
            if (this.getPickedItem.id === id) {
                this.$store.commit('appendOfferBet', JSON.parse(json));
            }
        });
    },
    components: {
        likes,
        ListBlock,
        Graph,
        FavoriteIndicator,
        MakeBet,
        Img,
        ItemMainInfo,
        trash
    },
    data() {
        return {
            isMakeBet: false,
            isLiked: false,
            images: [],
            selectedImage: 0
        };
    },
    computed: {
        getPickedItem() {
            return this.$store.getters.getPickedItem;
        }
    },
    methods: {
        deleteItem(){
            const id = this.getPickedItem.id;
            events.callServer('MarketPlace:Admin:RemoveElement:Server', id);
        },
        changeImage(isNext) {
            switch (isNext) {
                case true:
                    if (!this.images[this.selectedImage + 1]) {
                        this.selectedImage = 0;
                        return;
                    }
                    this.selectedImage++;
                    break;
                case false:
                    if (this.selectedImage === 0) {
                        this.selectedImage = this.images.length - 1;
                        return;
                    }
                    this.selectedImage--;
                    break;
            }
        },
        async loadImages() {
            const id = this.getPickedItem.id;
            console.log(id);
            for (let i = 0; i < 3; i++) {
                const url = `http://146.59.126.149:3001/images/${id}_${i + 1}.png`;
                const response = await fetch(url, { method: 'HEAD' });
                if (response.ok) {
                    new Image().src = url;
                    this.images[i] = url;
                    this.$forceUpdate();
                }
            }
        },
        setIsLiked() {
            this.isLiked = this.getPickedItem.isLiked;
        },
        getItemTitle(itemCard) {
            return getItemTitle(itemCard);
        },
        formatNumber(num) {
            if (typeof num === undefined) return '';
            return `$${num.toLocaleString('ru-RU')}`;
        },
        toLike() {
            this.isLiked = !this.isLiked;
            events.callServer('MarketPlace:Auction:Like:Server', this.getPickedItem.id, this.isLiked);
        },
        toggleStatus() {
            this.isMakeBet = !this.isMakeBet;
        }
    }
};
</script>

<style lang="scss" src="./OpenedAuction.scss" scoped></style>

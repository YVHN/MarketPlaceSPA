<template>
    <div class="listingEditor">
        <div class="listingEditor-listing">
            <div class="listingEditor-cover">
                <div class="listingEditor-cover-title">
                    {{ $store.getters.getLanguageText(`${'Обложка'} ${getIsAuction ? 'лота' : 'обьявления'}`) }}
                </div>
                <div class="listingEditor-cover-images">
                    <div class="listingEditor-cover-images-item">
                        <div class="listingEditor-cover-images-item-title">
                            {{ $store.getters.getLanguageText('Стандартная обложка') }}
                        </div>
                        <div class="listingEditor-cover-images-item-img">
                            <Img :card-item="getItem" v-if="getImgPath(getItem)" />
                            <img v-else :src="require('@/views/MarketPlace/Assets/Images/Items/default.png')" :class="{ full: getIsImgFull }" />
                        </div>
                    </div>
                    <div class="listingEditor-cover-images-custom">
                        <div class="listingEditor-cover-images-custom-title">
                            {{ $store.getters.getLanguageText('Собственная обложка') }}
                        </div>
                        <div class="listingEditor-cover-images-custom-img">
                            <div class="add-img-notice" v-if="!mainImage">
                                <imageIcon class="add-img-notice-img" />
                                <div class="add-img-notice-text">
                                    {{ $store.getters.getLanguageText('Кликните в область чтобы загрузить обложку') }}
                                </div>
                            </div>
                            <div class="trashBlock" v-if="mainImage" @click="deleteImage('main')">
                                <img src="./imgs/trash.svg">
                            </div>
                            <img v-if="mainImage" class="loadedImage" ref="loadedImage" :src="mainImage" />
                            <input class="fileInput" @input="onInput($event, 'main')" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div class="listingEditor-cover-images-notice"></div>
                    <div class="listingEditor-cover-images-notice"></div>
                    <div class="listingEditor-cover-images-custom">
                        <div class="listingEditor-cover-images-custom-title">
                            {{ $store.getters.getLanguageText('Фото №1') }}
                        </div>
                        <div class="listingEditor-cover-images-custom-img">
                            <div class="add-img-notice" v-if="!firstImage">
                                <imageIcon class="add-img-notice-img" />
                                <div class="add-img-notice-text">
                                    {{ $store.getters.getLanguageText('Кликните в область чтобы загрузить фото') }}
                                </div>
                            </div>
                            <div class="trashBlock" v-if="firstImage" @click="deleteImage('first')">
                                <img src="./imgs/trash.svg">
                            </div>
                            <img v-if="firstImage" class="loadedImage" ref="loadedImage" :src="firstImage" />
                            <input class="fileInput" @input="onInput($event, 'first')" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div class="listingEditor-cover-images-custom">
                        <div class="listingEditor-cover-images-custom-title">
                            {{ $store.getters.getLanguageText('Фото №2') }}
                        </div>
                        <div class="listingEditor-cover-images-custom-img">
                            <div class="add-img-notice" v-if="!secondImage">
                                <imageIcon class="add-img-notice-img" />
                                <div class="add-img-notice-text">
                                    {{ $store.getters.getLanguageText('Кликните в область чтобы загрузить фото') }}
                                </div>
                            </div>
                            <div class="trashBlock" v-if="secondImage" @click="deleteImage('second')">
                                <img src="./imgs/trash.svg">
                            </div>
                            <img v-if="secondImage" class="loadedImage" ref="loadedImage" :src="secondImage" />
                            <input class="fileInput" @input="onInput($event, 'second')" type="file" accept="image/*" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="listingEditor-article" v-if="getIsEmpty">
                <div class="listingEditor-article-title">
                    {{ $store.getters.getLanguageText('Заголовок объявления') }}
                </div>
                <input
                    class="listingEditor-article-input input"
                    type="text"
                    placeholder="Введите заголовок"
                    :class="{ empty: !titleInput }"
                    v-model="titleInput"
                />
            </div>
            <div class="listingEditor-description">
                <div class="listingEditor-description-title">
                    {{ $store.getters.getLanguageText(`${'Комментарий к'} ${getIsAuction ? 'лоту' : 'обьявлению'}`) }}
                </div>
                <textarea
                    class="listingEditor-description-text input"
                    :class="{ empty: !descriptionInput }"
                    :placeholder="$store.getters.getLanguageText('Введите комментарий')"
                    v-model="descriptionInput"
                ></textarea>
            </div>
            <div class="listingEditor-deploy">
                <div class="listingEditor-deploy-title" v-if="!getIsEmpty">
                    {{ $store.getters.getLanguageText(getPriceTitle) }}
                </div>
                <div class="listingEditor-deploy-wrapper">
                    <CustomInput
                        :placeholder="$store.getters.getLanguageText('Введите сумму')"
                        class="input"
                        :class="{ empty: !salePrice }"
                        @setValue="setPrice"
                        v-if="!getIsEmpty"
                    />
                    <div class="listingEditor-deploy-button" @click="toggleDeployStatus">
                        {{ $store.getters.getLanguageText(`${'Разместить'} ${getIsAuction ? 'лот' : 'обьявление'}`) }}
                    </div>
                </div>
                <div class="listingEditor-deploy-minPrice" v-if="this.$route.path.includes(getItem.sellData?.type)">
                    {{ `${$store.getters.getLanguageText('Минимальная стоимость по рынку:')} ${formatNumber(123123132)}$` }}
                </div>
            </div>
        </div>
        <div class="listingEditor-info" v-if="!getIsEmpty">
            <div class="transport">
                <div class="info-item">
                    <div class="information">
                        <div class="info-item-title">
                            {{ getItemTitle(getItem) }}
                        </div>
                        <CardItemTips :card-item="getItem" />
                        <ItemMainInfo :card-item="getItem" :type="'column'" />
                    </div>
                    <Specifications v-if="getItem.sellData?.specifications" :specifications="getItem.sellData.specifications" />
                </div>
            </div>
        </div>
        <DeployListing @toggleDeployStatus="toggleDeployStatus" @deploy="deploy" class="listingEditor-deployListing" :price="salePrice" v-if="isDeploy" />
    </div>
</template>
<script>
import Img from '@/views/MarketPlace/Components/ItemComponents/Img/Img.vue';
import imageIcon from '@/views/MarketPlace/Assets/Icons/Listing/image.vue';
import DeployListing from './Components/DeployListing/DeployListing.vue';
import CustomInput from '@/views/MarketPlace/Components/OpenedItem/Components/CustomInput/CustomInput.vue';
import Specifications from '@/views/MarketPlace/Components/ItemComponents/Specifications/Specifications.vue';
import CardItemTips from '@/views/MarketPlace/Components/CardItemTips/CardItemTips.vue';
import ItemMainInfo from '@/views/MarketPlace/Components/ItemComponents/ItemMainInfo/ItemMainInfo.vue';
import events from '@/modules/events';
import { computed, onUnmounted } from 'vue';
import { getItemTitle, getImgPath } from '@/functions/marketplace';
import { getStore } from '@/store2';
import { convertImageToType } from '@/assets/utils';
export default {
    components: {
        imageIcon,
        DeployListing,
        CustomInput,
        Specifications,
        CardItemTips,
        ItemMainInfo,
        Img
    },
    data() {
        return {
            isDeploy: false,
            payTime: null,
            salePrice: null,
            descriptionInput: '',
            titleInput: '',
            mainImage: null,
            firstImage: null,
            secondImage: null
        };
    },
    setup() {
        const { marketPlace } = getStore();
        const activeSortIndex = computed(() => marketPlace.activeSortIndex);
        return {
            activeSortIndex
        };
    },
    mounted() {
        events.add('MarketPlace:CreateListing:PublishAccept:LoadImagesToHost', this.loadImages) 
        onUnmounted(() => {
            events.remove('MarketPlace:CreateListing:PublishAccept:Cef');
            events.remove('MarketPlace:CreateListing:PublishAccept:LoadImagesToHost');
        });
        events.add('MarketPlace:CreateListing:PublishAccept:Cef', () => {
            this.$store.commit('resetListData');
            events.callServer('MarketPlace:List:GetListData:Server', 'createListing', 1, this.activeSortIndex);
            this.toggleDeployStatus();
            this.$store.commit('resetPickedItem');
            this.$router.push('/market-place/createListing/all');
        });
    },
    methods: {
        deleteImage(type) {
            this[type + 'Image'] = null;
        },
        getImgPath(itemCard) {
            return getImgPath(itemCard);
        },
        toggleDeployStatus() {
            if (!this.getIsEmpty) {
                if (this.salePrice && this.descriptionInput) {
                    this.isDeploy = !this.isDeploy;
                }
            } else if (this.descriptionInput && this.titleInput) {
                this.isDeploy = !this.isDeploy;
            }
        },
        deploy(deployData) {
            const listingData = {
                hours: deployData.hours,
                description: this.descriptionInput,
                method: deployData.method
            };
            if (!this.$route.path.includes('empty')) {
                listingData.id = this.getItem.id;
            }
            if (this.$route.path.includes('transportRent')) {
                listingData.rentPrice = this.salePrice;
            } else if (this.$route.path.includes('auction')) {
                listingData.lastBet = this.salePrice;
            } else if (this.$route.path.includes('empty')) {
                listingData.title = this.titleInput;
                listingData.img = 'default';
                listingData.price = this.salePrice;
            } else {
                listingData.price = this.salePrice;
            }
            const json = JSON.stringify(listingData);
            events.callServer('MarketPlace:CreateListing:Publish:Server', this.getListingType, json);
        },
        setPrice(num) {
            this.salePrice = num;
        },
        formatNumber(num) {
            if (!num) return '';
            return num.toLocaleString('ru-RU');
        },
        getItemTitle(itemCard) {
            return getItemTitle(itemCard);
        },
        onInput(e, type) {
            let file = e.target.files[0];
            const size = Number((file.size / 1_048_576).toFixed(2) - 0.01);
            if (size > 5) {
                events.callLocal('HUD.notify.push', 1, this.$getLanguageText('Максимальный размер файла - 5 МБ!'), 3000);
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                convertImageToType(evt.target.result, 'png', (result) => {
                    this[type + 'Image'] = result;
                });
            };
            reader.readAsDataURL(file);
        },
        loadImages(data) {
            if(!this.mainImage && !this.firstImage && !this.secondImage) return;
            const json = {
                mainImage: this.mainImage ? this.mainImage.replace(/^data:image\/[a-z]+;base64,/, "") : null,
                firstImage: this.firstImage ? this.firstImage.replace(/^data:image\/[a-z]+;base64,/, "") : null,
                secondImage: this.secondImage ? this.secondImage.replace(/^data:image\/[a-z]+;base64,/, "") : null,
                data
            };

            const options = {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch('http://146.59.126.149:3001/upload', options);
        }
    },
    computed: {
        getIsImgFull() {
            return ['business', 'house', 'apartment', 'transport'].includes(this.getItem.sellData.type);
        },
        getListingType() {
            const path = this.$route.path;
            if (path.includes('auction')) return 'auction';
            if (path.includes('empty')) return 'service';
            if (path.includes('transportRent')) return 'transportRent';
            return 'listing';
        },
        getPriceTitle() {
            const section = this.$route.params.filter;
            if (section === 'auction') return 'Задайте начальную ставку';
            if (section === 'transportRent') return 'Цена аренды в час';
            return 'Стоимость продажи';
        },
        getIsAuction() {
            return this.$route.path.includes('auction');
        },
        getItem() {
            return this.$store.getters.getPickedItem;
        },
        getIsEmpty() {
            return !Object.keys(this.getItem.sellData).length > 0;
        }
    }
};
</script>

<style lang="scss" src="./ListingEditor.scss" scoped></style>

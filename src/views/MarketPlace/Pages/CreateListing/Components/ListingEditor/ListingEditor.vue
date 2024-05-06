<template>
  <div class="listingEditor">
    <div class="listingEditor-listing">
      <div class="listingEditor-cover">
        <div class="listingEditor-cover-title">
          {{
            $store.getters.getLanguageText(
              `${'Обложка'} ${getIsAuction ? 'лота' : 'обьявления'}`,
            )
          }}
        </div>
        <div class="listingEditor-cover-images">
          <div class="listingEditor-cover-images-item">
            <div class="listingEditor-cover-images-item-title">
              {{ $store.getters.getLanguageText('Стандартная обложка') }}
            </div>
            <div class="listingEditor-cover-images-item-img">
              <img v-if="getItem.sellData?.img" :class="getItem.sellData?.type"
                :src="require(`@/views/MarketPlace/Assets/Images/Items/${getItem.sellData.img}.png`)" />
            </div>
          </div>
          <div class="listingEditor-cover-images-custom">
            <div class="listingEditor-cover-images-custom-title">
              {{ $store.getters.getLanguageText('Собственная обложка') }}
            </div>
            <div class="listingEditor-cover-images-custom-img">
              <div class="add-img-notice">
                <imageIcon class="add-img-notice-img" />
                <div class="add-img-notice-text">
                  {{
                    $store.getters.getLanguageText(
                      'Кликните в область чтобы загрузить обложку',
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="listingEditor-cover-images-notice">
            <div class="listingEditor-cover-images-notice-title">
              {{ $store.getters.getLanguageText('Прикрепите фотографии') }}
            </div>
            <div class="listingEditor-cover-images-notice-warning">
              {{ $store.getters.getLanguageText('Отсуствуют фотографии') }}
            </div>
          </div>
          <div class="listingEditor-cover-images-button">
            <img src="@/views/MarketPlace/Assets/Icons/Listing/download.svg" />
            {{ $store.getters.getLanguageText('Загрузить фото') }}
          </div>
        </div>
      </div>
      <div class="listingEditor-article" v-if="getIsEmpty">
        <div class="listingEditor-article-title">
          {{ $store.getters.getLanguageText('Заголовок объявления') }}
        </div>
        <input class="listingEditor-article-input input" type="text" placeholder="Введите заголовок"
          :class="{ empty: !titleInput }" v-model="titleInput" />
      </div>
      <div class="listingEditor-description">
        <div class="listingEditor-description-title">
          {{
            $store.getters.getLanguageText(
              `${'Комментарий к'} ${getIsAuction ? 'лоту' : 'обьявлению'}`,
            )
          }}
        </div>
        <textarea class="listingEditor-description-text input" :class="{ empty: !descriptionInput }"
          :placeholder="$store.getters.getLanguageText('Введите комментарий')" v-model="descriptionInput"></textarea>
      </div>
      <div class="listingEditor-deploy">
        <div class="listingEditor-deploy-title">
          {{ $store.getters.getLanguageText(getPriceTitle) }}
        </div>
        <div class="listingEditor-deploy-wrapper">
          <CustomInput :placeholder="$store.getters.getLanguageText('Введите сумму')" class="input"
            :class="{ empty: !salePrice }" @setValue="setPrice" />
          <div class="listingEditor-deploy-button" @click="toggleDeployStatus">
            {{
              $store.getters.getLanguageText(
                `${'Разместить'} ${getIsAuction ? 'лот' : 'обьявление'}`,
              )
            }}
          </div>
        </div>
        <div class="listingEditor-deploy-minPrice" v-if="this.$route.path.includes(getItem.sellData?.type)">
          {{
            `${$store.getters.getLanguageText(
              'Минимальная стоимость по рынку:',
            )} ${formatNumber(123123132)}$`
          }}
        </div>
      </div>
    </div>
    <div class="listingEditor-info" v-if="!getIsEmpty">
      <div class="transport">
        <div class="info-item">
          <div class="information">
            <div class="info-item-title">
              {{ $store.getters.getTitle(getItem.sellData) }}
            </div>
            <div class="info-item-short">
              <div class="info-item-short-unit" v-for="(unit, index) in getShortData" :key="index">
                <component class="info-item-short-unit-img" :is="unit.img"></component>
                {{ `${formatNumber(unit.value)}` }}
              </div>
            </div>
            <div class="info-item-full">
              <div class="info-item-full-unit">
                {{ $store.getters.getLanguageText('Тип имущества:') }}
                <span>{{ $store.getters.getType(getItem.sellData) }}</span>
              </div>
              <div class="info-item-full-unit">
                {{ $store.getters.getLanguageText('Гос. цена:') }}
                <span class="price">{{
                  `${formatNumber(getItem.sellData.statePrice)} $`
                  }}</span>
              </div>
              <div class="info-item-full-unit" v-for="(unit, index) in getFullData" :key="index">
                {{ `${$store.getters.getLanguageText(unit.title)}:`
                }}<span>{{ $store.getters.getLanguageText(unit.value) }}</span>
              </div>
            </div>
          </div>
          <Specifications v-if="getItem.sellData?.specifications" :specifications="getItem.sellData.specifications" />
        </div>
      </div>
    </div>
    <DeployListing @toggleDeployStatus="toggleDeployStatus" @deploy="deploy" class="listingEditor-deployListing"
      :price="salePrice" v-if="isDeploy" />
  </div>
</template>
<script>
import imageIcon from '@/views/MarketPlace/Assets/Icons/Listing/image.vue';
import DeployListing from './Components/DeployListing/DeployListing.vue';
import CustomInput from '@/views/MarketPlace/Components/OpenedItem/Components/CustomInput/CustomInput.vue';
import Specifications from '@/views/MarketPlace/Components/ItemComponents/Specifications/Specifications.vue';
import events from '@/modules/events';

import competitors from '@/views/MarketPlace/Assets/Icons/Item/competitors.vue';
import mileage from '@/views/MarketPlace/Assets/Icons/Item/mileage.vue';
import parking from '@/views/MarketPlace/Assets/Icons/Item/parking.vue';
import quantity from '@/views/MarketPlace/Assets/Icons/Item/quantity.vue';
import tenants from '@/views/MarketPlace/Assets/Icons/Item/tenants.vue';
import weight from '@/views/MarketPlace/Assets/Icons/Item/weight.vue';
import { onUnmounted } from 'vue';

export default {
  components: {
    imageIcon,
    DeployListing,
    CustomInput,
    competitors,
    mileage,
    parking,
    quantity,
    tenants,
    weight,
    Specifications,
  },
  data() {
    return {
      isDeploy: false,
      payTime: null,
      salePrice: null,
      descriptionInput: '',
      titleInput: '',
    };
  },
  mounted() {
    onUnmounted(() => {
      events.remove('MarketPlace:CreateListing:PublishAccept:Cef');
    });
    events.add('MarketPlace:CreateListing:PublishAccept:Cef', () => {
      events.callServer('MarketPlace:List:GetListData:Server','createListing',1);
      this.toggleDeployStatus();
      this.$store.dispatch('resetPickedItem');
      this.$router.push('/market-place/create-listing/all');
    });
  },
  methods: {
    toggleDeployStatus() {
      if (!this.getIsEmpty) {
        if (this.salePrice && this.descriptionInput) {
          this.isDeploy = !this.isDeploy;
        }
      } else if (this.salePrice && this.descriptionInput && this.titleInput) {
        this.isDeploy = !this.isDeploy;
      }
    },
    deploy(deployData) {
      const listingData = {
        hours: deployData.hours,
        description: this.descriptionInput,
        method: deployData.method,
      };
      if (!this.$route.path.includes('empty')) {
        listingData.id = this.getItem.id;
      }
      if (this.$route.path.includes('transport-rent')) {
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
      events.callServer(
        'MarketPlace:CreateListing:Publish:Server',
        this.getListingType,
        json,
      );
    },
    setPrice(num) {
      this.salePrice = num;
    },
    formatNumber(num) {
      if (!num) return '';
      return num.toLocaleString('ru-RU');
    },
  },
  computed: {
    getListingType() {
      const path = this.$route.path;
      if (path.includes('auction')) return 'auction';
      if (path.includes('empty')) return 'service';
      if (path.includes('transport-rent')) return 'transportRent';
      return 'listing';
    },
    getPriceTitle() {
      const section = this.$route.params.filter;
      if (section === 'auction') return 'Задайте начальную ставку';
      if (section === 'transport-rent') return 'Цена аренды в час';
      return 'Стоимость продажи';
    },
    getIsAuction() {
      return this.$route.path.includes('auction');
    },
    getItem() {
      return this.$store.getters.getPickedItem;
    },
    getShortData() {
      const item = this.getItem.sellData;
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
      if (item?.weight) {
        list.push({
          img: 'weight',
          value: item.weight,
        });
      }
      return list;
    },
    getIsEmpty() {
      return !Object.keys(this.getItem.sellData).length > 0;
    },
    getFullData() {
      const item = this.getItem.sellData?.type;
      if (!item) return [];
      let list;
      if (item.type === 'estate') {
        list = [
          {
            title: 'Адрес',
            value: item.address,
          },
        ];
      } else if (item.type === 'transport') {
        list = [
          {
            title: 'Автосалон',
            value: item.dealerShip,
          },
          {
            title: 'Тюнинг',
            value: item.tuningStatus,
          },
          {
            title: 'Гос. номер',
            value: item.licensePlate,
          },
        ];
      }
      return list;
    },
  },
};
</script>

<style lang="scss" src="./ListingEditor.scss" scoped></style>
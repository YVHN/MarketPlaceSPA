<template>
    <div class="selectLanguage">
        <div class="flag" @click="showList = !showList">
            <img :src="images[activeLang]">
        </div>
        <div class="list" v-if="showList">
            <div class="header">
                <div class="close" @click="showList = false">
                    <img src="@/views/MarketPlace/Assets/images/closeIcon.svg">
                </div>
                <p>{{ getLanguageText('Выбор языка') }}</p>
            </div>
            <div class="items">
                <div class="item" v-for="i, key in langs" :key="i" @click="selectLang(key)">
                    <div class="logo" :class="{ active: activeLang == key }">
                        <div :class="[key]"></div>
                    </div>
                    <div v-if="activeLang == key" class="markBlock"></div>
                    <p>{{ getLanguageText(i) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Vue } from 'vue-property-decorator';
import events from '@/modules/events';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            langs: {
                'rus': 'Русский',
                'eng': 'Английский',
            },
            images: {
                eng: require('.//images/flags/eng.svg'),
                rus: require('.//images/flags/ru.svg'),
            },
            showList: false,
        }
    },
    computed: {
        ...mapGetters({
            activeLang: 'getCurrentLanguage',
        }),
        getLanguageText() {
            return (text, args) => {
                return Vue.prototype.$getLanguageText(text, args);
            }
        },
    },
    methods: {
        selectLang(lang) {
            events.callClient('MultiLanguage:ChangeLanguageFromCef', lang);
        }
    }
}
</script>
<style lang="scss">
.selectLanguage {
    * {
        font-family: Montserrat;
    }

    display: flex;
    flex-direction: column;
    gap: 16px;

    .flag {
        display: flex;
        align-items: center;
        justify-content: center;

        width: min-content;
        height: min-content;
        padding: 4px;

        border-radius: 2px;
        background: rgba(255, 255, 255, 0.04);

        img {
            width: 3.3vh;
            height: 2.3vh;
        }
    }

    .list {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 10px;

        width: fit-content;
        margin-left: -183px;
        margin-top: 50px;
        padding: 20px 15px;
        border-radius: 1.59356rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%), rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(9.449999809265137px);


        &::before {
            content: '';
            position: absolute;
            width: 27px;
            height: 12px;
            background-image: url('./assets/images/arrowToFlag.svg');

            left: 190px;
            top: -12px;
        }


        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            .close {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;

                left: 20px;

                width: 30px;
                height: 30px;

                border-radius: 3px;
                background: red;

                img {
                    width: 14px;
                    height: 14px;
                }
            }

            p {
                font-size: 12px;
                font-weight: 600;
            }
        }

        .items {
            display: flex;
            flex-wrap: wrap;

            width: 221px;
            gap: 47px;

            .item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: fit-content;

                .logo {
                    width: fit-content;
                    border-radius: 50%;

                    padding: 5px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(0, 0, 0, 0.01);

                    transition: all 0.3s ease;

                    &:hover,
                    &.active {
                        border: 1px solid #0F6;
                    }

                    .rus,
                    .eng,
                    .fr {
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }



                    .rus {
                        background: url('./assets/images/flags/ru.svg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }

                    .eng {
                        background: url('./assets/images/flags/eng.svg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }

                    .fr {
                        background: url('./assets/images/flags/fr.svg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                }

                .markBlock {
                    position: absolute;
                    border: 7px solid #00FF6621;
                    border-radius: 50%;
                    right: -6px;
                    top: -6px;
                    width: 13px;
                    height: 13px;
                    background-image: url('./assets/images/mark.svg');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;

                }

                p {
                    font-size: 9px;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>
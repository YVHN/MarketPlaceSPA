<template>
    <div class="circular-menu">
        <div class="content" :style="{ transform: `rotate(${contentRotate}deg)` }">
            <div v-for="(item, index) in 8" :key="index" class="menu-item" :style="itemStyle(index)">
                <div class="item">
                    <div v-if="animList[index]" :style="dataStyle(index)" class="itemContent"
                        :class="{ active: hoverIndex === index }">
                        <SelectSvg :name="getCategoryByKey(animList[index])" />
                    </div>
                    <div v-else-if="!isSelectAnimationMenu" :style="dataStyle(index)" class="itemContent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 13.3333H0V10H10V0H13.3333V10H23.3333V13.3333H13.3333V23.3333H10V13.3333Z"
                                fill="white" />
                        </svg>

                    </div>
                    <svg class="imageBlock" :data-index="index" v-if="hoverIndex != index" width="222" height="152"
                        viewBox="0 0 222 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_456_442)">
                            <path
                                d="M0.700257 129.888C71.3487 159.277 150.778 159.396 221.514 130.22L168.162 0.866605C131.732 15.8922 90.8257 15.8307 54.4413 0.695652L0.700257 129.888Z" />
                        </g>
                        <defs>
                            <clipPath id="clip0_456_442">
                                <rect width="222" height="152" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg class="imageBlock" :data-index="index" v-else width="222" height="152" viewBox="0 0 222 152"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_418_856)">
                            <path
                                d="M0.700257 129.888C71.3487 159.277 150.778 159.396 221.514 130.22L168.162 0.866605C131.732 15.8922 90.8257 15.8307 54.4413 0.695652L0.700257 129.888Z"
                                fill="white" fill-opacity="0.04" />
                            <path
                                d="M0.700257 129.888C71.3487 159.277 150.778 159.396 221.514 130.22L168.162 0.866605C131.732 15.8922 90.8257 15.8307 54.4413 0.695652L0.700257 129.888Z"
                                fill="#5FD8DF" fill-opacity="0.13" />
                        </g>
                        <defs>
                            <filter id="filter0_i_418_856" x="0.703125" y="0.695312" width="220.812" height="151.32"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="21.0938" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix"
                                    values="0 0 0 0 0.372549 0 0 0 0 0.847059 0 0 0 0 0.87451 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_418_856" />
                            </filter>
                        </defs>
                    </svg>

                </div>
            </div>
            <div class="name" v-if="!this.isSelectAnimationMenu && hoverIndex != -1"
                :style="{ transform: `rotate(${-contentRotate}deg)` }">
                {{ getLanguageText(animList[hoverIndex] ? getNameByKey(animList[hoverIndex]) : 'Добавить') }}
            </div>
            <div class="name" v-else-if="this.isSelectAnimationMenu && hoverIndex != -1 && animList[hoverIndex]"
                :style="{ transform: `rotate(${-contentRotate}deg)` }">
                {{  getLanguageText(getNameByKey(animList[hoverIndex]))}}
            </div>
        </div>
        <div class="helpText" v-if="!isSelectAnimationMenu" v-html="'Нажмите «<span>Правую кнопку мыши</span>» для удаления анимации из слота'"></div>
    </div>
</template>
<script>
import { Vue } from 'vue-property-decorator';
import animations from '../../../configServer/Animations/animations-list.json';
import SelectSvg from '../views/PlayerMenu/Animations/selectSvg.vue';
import { onUnmounted } from 'vue';
import events from '@/modules/events';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            contentRotate: 16,
            hoverIndex: -1
        };
    },
    computed: {
        ...mapGetters({
            animList: 'getCircularAnimations'
        }),
        isSelectAnimationMenu() {
            return this.$router.currentRoute.fullPath == '/circularAnimations';
        },
        getLanguageText() {
            return (text, args) => {
                return Vue.prototype.$getLanguageText(text, args);
            };
        },
    },
    props: {
        setShowAnimList: {
            type: Function,
            required: false
        }
    },
    methods: {
        getCategoryByKey(key) {
            let category = '';
            animations.forEach(e => {
                const item = e.list.find(e => e.key == key);
                if (item) {
                    category = e.svg;
                }
            });
            return category;
        },
        getIndexByKey(key) {
            let index = -1;
            animations.forEach(e => {
                const item = e.list.find(e => e.key == key);
                if (item) {
                    index = e.list.indexOf(item);
                }
            });
            return index;
        },
        getNameByKey(key) {
            let name = '';
            animations.forEach(e => {
                const item = e.list.find(e => e.key == key);
                if (item) {
                    name = item.name;
                }
            });
            return name
        },
        itemStyle(index) {
            const totalItems = 8;
            const angle = ((360 / totalItems) * index);
            return {
                transform: `rotate(${angle}deg)`,
            };
        },
        dataStyle(index) {
            const totalItems = 8;
            const angle = ((360 / totalItems) * index);
            return {
                transform: `rotate(-${angle + this.contentRotate}deg)`,
            };
        },
        handleMouseMove(event) {
            const elements = document.querySelectorAll('.imageBlock');
            let closestItem = null;
            let closestDistance = Number.MAX_VALUE;
            const calculateDistance = (x1, y1, x2, y2) => {
                return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            }
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elLeft = rect.left + rect.width / 2;
                const elTop = rect.top + rect.height / 2;
                const distance = calculateDistance(event.clientX, event.clientY, elLeft, elTop);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = element;
                }
            });

            if (closestItem.dataset.index) {
                if(this.isSelectAnimationMenu){
                    if(!this.animList[closestItem.dataset.index]){
                        this.hoverIndex = -1;
                        return;
                    }
                    this.hoverIndex = parseInt(closestItem.dataset.index);
                    return;
                }
                this.hoverIndex = parseInt(closestItem.dataset.index);
                return;
            }
            this.hoverIndex = -1
        },
        click(e) {
            const allowClasses = ['circular-menu', 'svgWrapper', 'itemContent active', 'itemContent'];
            if (!allowClasses.includes(e.target.className) && !allowClasses.includes(e.target.parentNode.className) && !allowClasses.includes(e.target.parentNode.parentNode.className)) {
                return;
            }
            if (this.hoverIndex == -1) {
                return;
            }
            if (e.which == 1) {
                if (!this.animList[this.hoverIndex]) {
                    if (!this.isSelectAnimationMenu) this.setShowAnimList(this.hoverIndex);
                    return;
                }
                if (this.getCategoryByKey(this.animList[this.hoverIndex]) == 'stylepohod') {
                    events.callClient('client:animation:selectWalkStyle', this.getIndexByKey(this.animList[this.hoverIndex]));
                    return;
                }
                events.callClient('client:animation.selectAnimation', this.getCategoryByKey(this.animList[this.hoverIndex]), this.animList[this.hoverIndex]);
                return;
            }
            if (e.which == 3) {
                events.callClient('animations.removeFromCircularList', this.hoverIndex);
            }
        },
        disableContextMenu(e) {
            e.preventDefault();
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mousedown', this.click);
        window.addEventListener('contextmenu', this.disableContextMenu);
        onUnmounted(() => {
            window.removeEventListener('mousemove', this.handleMouseMove);
            window.removeEventListener('mousedown', this.click);
            window.removeEventListener('contextmenu', this.disableContextMenu);
        })
    },
    components: { SelectSvg }
}
</script>
<style lang="scss">
.circular-menu {
    * {
        font-family: 'PF DinDisplay Pro';
    }

    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 485.5px;
        height: 485.5px;
        border-radius: 50%;

        .name {
            position: absolute;
            text-align: center;
            font-size: 16px;
            font-weight: 500;

            width: 200px;
            background: rgba(95, 216, 223, 0.13);
            border-radius: 10px;
            padding: 15px 0px;


        }

        .menu-item {
            position: absolute;
            border-radius: 50%;
            display: flex;
            width: 100%;
            height: 100%;
            pointer-events: none;

            .item {
                position: absolute;
                width: 222px;
                height: 152px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;

                .itemContent {

                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;

                    pointer-events: all;

                    width: 110px;
                    height: 110px;
                    z-index: 10;
                    opacity: 0.25;

                    transition: opacity 0.2s ease;

                    .svgWrapper {
                        max-width: 100px;
                        max-height: 70px;

                        svg path {
                            transition: fill 0.2s ease;
                            fill: white;
                            fill-opacity: 1;
                        }
                    }

                    &.active {
                        opacity: 1;

                        .svgWrapper {
                            svg path {
                                fill: #5FD8DF;
                            }
                        }
                    }

                    p {

                        font-weight: 500;
                        font-size: 16.331px;
                    }
                }

                .imageBlock {
                    position: absolute;
                    transform: rotate(141.5deg);
                    fill: rgba(255, 255, 255, 0.04);
                    min-width: 222px;
                    min-height: 152px;
                }
            }
        }
    }

    .helpText {
        letter-spacing: 0.05em;
        position: absolute;
        bottom: 9.2593vh;
        max-width: 800px;

        opacity: 0.45;

        span {
            font-weight: 600;
        }
    }
}</style>
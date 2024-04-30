<template>
	<div class="exchangeUnit">
		<img class="exchangeUnit-triangle" src="../../assets/triangle.svg" />
		<div class="exchangeUnit-title">
			<img class="exchangeUnit-title-img" src="../../assets/rightLine.svg" />
			<div class="exchangeUnit-title-text" v-if="personData.role === 'Sender'">
				Обмен<span>Имущества</span>
			</div>
			<div class="exchangeUnit-title-text" v-else-if="personData.role === 'Recipient'">
				ИГРОК<span>{{ `#${recipientId}` }}</span>
			</div>
			<img class="exchangeUnit-title-img" src="../../assets/leftLine.svg" />
		</div>
		<div class="exchangeUnit-warning">
			<div v-if="personData.role === 'Sender'">
				Вы производите обмен с игроком
				<span>{{ `#${recipientId}` }}</span>
			</div>
			<div v-else-if="personData.role === 'Recipient'">
				Не забудьте подвердить обмен с игроком
			</div>
		</div>
		<div class="exchangeUnit-category" :class="{ activeList: isListActive }">
			<div class="exchangeUnit-category-value" @click="toggleListStatus">
				<div class="exchangeUnit-category-value-text">
					{{ getCurrentCategory.title }}
				</div>
				<img src="../../assets/icons/downArrow.svg" v-if="personData.role === 'Sender'" />
			</div>
			<Transition name="list">
				<div class="exchangeUnit-category-list" v-show="isListActive">
					<div class="exchangeUnit-category-list-unit" v-for="(category, index) in availableCategories"
						:key="index" @click="pickCategory" :class="{
				picked: category.enumType === getCurrentCategory.enumType,
			}">
						{{ category?.title }}
					</div>
				</div>
			</Transition>
		</div>
		<div class="exchangeUnit-item">
			<div class="exchangeUnit-item-preview">
				<img src="../../assets/imgBackground.svg" class="exchangeUnit-item-preview-background" />
				<div class="exchangeUnit-item-preview-license" v-if="itemType === 'transport'">
					<img src="../../assets/licensePlate.svg" />
					<div class="exchangeUnit-item-preview-license-value">
						{{ personData.pickedItem.licensePlate }}
					</div>
				</div>
				<div class="exchangeUnit-item-preview-wrapper">
					<div class="wrapper">
						<div class="exchangeUnit-item-preview-title">
							{{ getItemTitle }}
						</div>
						<div class="exchangeUnit-item-preview-category">
							{{ personData.pickedItem?.category }}
						</div>
					</div>
					<div class="exchangeUnit-item-preview-switch" v-if="personData.role === 'Sender'"
						v-show="personData.pickedItem.itemsInCategory > 1">
						<div class="exchangeUnit-item-preview-switch-unit" @click.stop="switchItem('left')">
							<img src="../../assets/icons/arrows/left-arrow.svg" />
						</div>
						<div class="exchangeUnit-item-preview-switch-unit" @click="switchItem('right')">
							<img src="../../assets/icons/arrows/right-arrow.svg" />
						</div>
					</div>
				</div>
				<img v-if="personData.pickedItem?.img" class="exchangeUnit-item-preview-img" :src="getItemImg" />
			</div>
			<div class="exchangeUnit-item-info">
				<div class="exchangeUnit-item-info-title">{{ getItemInfoTitle }}</div>
				<div class="estate" v-if="itemType === 'estate'">
					<div class="info-unit" v-for="(unit, index) in getItemCharacteristics" :key="index">
						<img :src="require(`../../assets/icons/${unit.img}.svg`)" />
						<div class="info-unit-text">
							<div class="info-unit-text-title">{{ unit.title }}</div>
							<div class="info-unit-text-value" :class="{ money: unit.value > 100 }">
								{{
				`${unit.value > 100 ? '$' : ''} ${unit.value.toLocaleString(
					'ru-RU',
				)}`
			}}
							</div>
						</div>
					</div>
				</div>
				<div class="transport" v-else-if="itemType === 'transport'">
					<div class="specifications-unit" v-for="(unit, index) in getItemCharacteristics" :key="index">
						<div class="specifications-unit-info">
							<div class="wrapper">
								<img :src="require(`../../assets/icons/transport/${`${unit.img}`}.svg`)
				" />
								{{ unit.title }}
							</div>
							{{ unit.value }}
						</div>
						<ProgressBar :value="unit.value" />
					</div>
				</div>
			</div>
			<div class="exchangeUnit-item-extraPayment">
				<div class="exchangeUnit-item-extraPayment-title" v-if="personData.role === 'Sender'">
					Доплата с вашей стороны
				</div>
				<div class="exchangeUnit-item-extraPayment-title" v-else-if="personData.role === 'Recipient'">
					Доплата со стороны игрока
				</div>
				<input v-if="personData.role === 'Sender'" class="exchangeUnit-item-extraPayment-input"
					v-model="extraPaymentInput" @input="validateInput" :readonly="personData.isEndorsed" type="text"
					placeholder="Введите сумму..." />
				<div v-if="personData.role === 'Recipient'" class="exchangeUnit-item-extraPayment-field">
					<div class="exchangeUnit-item-extraPayment-field-title">
						{{ `#${personData.id} Доплатит вам` }}
					</div>
					<div class="exchangeUnit-item-extraPayment-field-value">
						{{ `$ ${personData.extraPayment.toLocaleString('ru-RU')}` }}
					</div>
				</div>
			</div>
			<div class="exchangeUnit-item-confirm">
				<div class="exchangeUnit-item-confirm-checkbox" :class="{ checked: personData.isEndorsed }"
					@click="toggleEndorsedStatus">
					<img src="../../assets/icons/tick.svg" />
				</div>
				Подтвердите обмен
			</div>
			<div class="exchangeUnit-item-actions" v-if="personData.role === 'Sender'">
				<div class="wrapper">
					<div class="action blue" v-if="personData.isEndorsed" @click="allowTrade">
						Выполнить
					</div>
					<div class="action">Отклонить</div>
				</div>
				<div class="action blue" v-if="false">Отклонить</div>
			</div>
			<div class="action" :class="{ blue: personData.isEndorsed }" v-else-if="personData.role === 'Recipient'">
				{{ personData.isEndorsed ? 'Подтверждено' : 'Ожидание игрока' }}
			</div>
		</div>
	</div>
</template>

<script>
import ProgressBar from '../ProgressBar/ProgressBar.vue';
import events from '@/modules/events';
import { onUnmounted } from 'vue';
export default {
	components: {
		ProgressBar,
	},
	props: {
		personData: {
			type: Object,
			required: true,
		},
		recipientId: {
			type: Number,
			required: true,
		},
		openedCategories: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			extraPaymentInput: '',
			isListActive: false,
			itemsList: [],
			itemType: '',
			categories: [
				{
					title: 'Дом',
					value: 'Home',
					enumType: 1,
				},
				{
					title: 'Апартаменты',
					value: 'Apart',
					enumType: 2,
				},
				{
					title: 'Бизнес',
					value: 'Business',
					enumType: 3,
				},
				{
					title: 'Транспорт',
					value: 'Vehicle',
					enumType: 0,
				},
				{
					title: 'Водный транспорт',
					value: 'WaterVehicle',
					enumType: 5,
				},
				{
					title: 'Воздушный транспорт',
					value: 'AirVehicle',
					enumType: 4,
				},
			],
			availableCategories: [],
			count: 0,
		};
	},
	computed: {
		getItemInfoTitle() {
			const item = this.personData.pickedItem;
			if (!item) return '';
			const type = item.type;
			if (['Home', 'Apart', 'Business'].includes(type)) {
				this.setItemType('estate');
				return 'Информация';
			} else if (['Vehicle', 'WaterVehicle', 'AirVehicle'].includes(type)) {
				this.setItemType('transport');
				return 'Технический тюнинг';
			} else {
				return '';
			}
		},
		getItemImg() {
			const item = this.personData.pickedItem;
			switch (item.type) {
				case 'Apart':
					return require(`../../assets/items/${item.img}.png`);
				case 'House':
					return `http://146.59.126.149/House/${item.img}.png`;
				case 'Vehicle':
				case 'AirVehicle':
				case 'WaterVehicle':
					return `http://146.59.126.149/vehicles/${item.img}.png`;
				case 'Business':
					return `http://146.59.126.149/bussines/${item.img}.png`;
			}
			return '';
		},
		getItemTitle() {
			const item = this.personData.pickedItem;
			if (!item) return '';
			const titles = {
				Home: 'Дом',
				Apart: 'Апартаменты',
				Business: 'Бизнес',
			};
			if (this.itemType === 'estate') {
				return `${titles[item.type]} #${item.id}`;
			} else if (this.itemType === 'transport') {
				return item.model;
			}
			return '';
		},
		getItemCharacteristics() {
			const item = this.personData.pickedItem;
			const list = item.characteristics;
			if (['Home', 'Apart'].includes(item.type)) {
				const characteristics = [
					{
						title: 'Цена в гос',
						img: 'income',
						value: list.price,
					},
					{
						title: 'Налог в день',
						img: 'income',
						value: list.taxPerDay,
					},
					{
						title: 'Гаражных мест',
						img: 'house',
						value: list.parking,
					},
				];
				return characteristics;
			} else if (
				['Vehicle', 'AirVehicle', 'WaterVehicle'].includes(item.type)
			) {
				const characteristics = [
					{
						title: 'Двигатель',
						img: 'engine',
						value: list.engine,
					},
					{
						title: 'Трансмиссия',
						img: 'turbine',
						value: list.turbine,
					},
					{
						title: 'Тормоза',
						img: 'brake',
						value: list.brake,
					},
					{
						title: 'Подвеска',
						img: 'suspencion',
						value: list.suspencion,
					},
				];
				return characteristics;
			} else if (item.type === 'Business') {
				const characteristics = [
					{
						title: 'Прибыль в день',
						img: 'income',
						value: list.incomePerDay,
					},
					{
						title: 'Прибыль в неделю',
						img: 'income',
						value: list.incomePerWeek,
					},
					{
						title: 'Цена в гос',
						img: 'house',
						value: list.price,
					},
				];
				return characteristics;
			}
			return 12;
		},
		getCurrentCategory() {
			return this.categories.find(
				(category) => category.value === this.personData.pickedItem.type,
			);
		},
	},
	mounted() {
		onUnmounted(() => {
			events.remove('Exchange:SetEndorsedStatus:Cef');
		});
		if (this.personData.role === 'Sender') {
			events.add('Exchange:SetEndorsedStatus:Cef', (type, json) => {
				const parsedJson = JSON.parse(json);
				this.emit('endorsed', this.personData[type], parsedJson.status);
			});
			this.availableCategories = this.categories.filter(
				(category) => this.openedCategories[category.value],
			);
			this.pickCategory(this.availableCategories[0]);
		}
	},
	methods: {
		toggleListStatus() {
			if (this.personData.role === 'Sender' && !this.personData.isEndorsed) {
				this.isListActive = !this.isListActive;
			}
		},
		validateInput() {
			if (this.extraPaymentInput.length > 13) {
				this.extraPaymentInput = this.extraPaymentInput.slice(0, 19);
			}
			this.extraPaymentInput = this.extraPaymentInput.replace(/\D/g, '');
			if (this.extraPaymentInput || this.extraPaymentInput === 0) {
				this.$emit(
					'updatePayment',
					this.personData.role,
					+this.extraPaymentInput,
				);
				this.extraPaymentInput = `$ ${Number(
					this.extraPaymentInput,
				).toLocaleString('ru-RU')}`;
			}
		},
		pickCategory() {
			this.count = 0;
			this.isListActive = false;
			if (this.personData.role === 'Sender') {
				this.pickItem();
			}
		},
		pickItem() {
			if (!this.personData.isEndorsed) {
				events.callServer(
					'ExchangeMenu:SelectItem:Server',
					this.getCurrentCategory.enumType,
					this.count,
				);
			}
			// Локально
			// this.itemsList = this.personData.goods.filter(
			//   (item) => this.pickedCategory.value === item.type,
			// );
			// this.$emit('pickItem', this.personData.role, this.itemsList[this.count]);
		},
		setItemType(type) {
			this.itemType = type;
		},
		toggleEndorsedStatus() {
			if (this.personData.role === 'Sender') {
				// Локально
				this.$emit(
					'endorsed',
					this.personData.role,
					!this.personData.isEndorsed,
				);
				events.callServer(
					'ExchangeMenu:SetTradeStatus:Server',
					this.personData.isEndorsed,
					this.personData.extraPayment,
				);
			}
		},
		switchItem(direction) {
			const lastIndex = this.personData.pickedItem.itemsInCategory - 1;
			const itemIndex = this.personData.pickedItem.itemByCount;
			if (direction === 'left') {
				this.count = itemIndex === 0 ? lastIndex : itemIndex - 1;
			} else if (direction === 'right') {
				this.count = itemIndex === lastIndex ? 0 : itemIndex + 1;
			}
			this.pickItem();
		},
		allowTrade() {
			events.callServer(
				'ExchangeMenu:AllowTrade:Server',
				this.personData.extraPayment,
			);
		},
	},
};
</script>

<style lang="scss" src="./ExchangeUnit.scss" scoped></style>

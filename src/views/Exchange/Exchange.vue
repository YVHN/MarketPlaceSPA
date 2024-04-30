<template>
	<div class="exchange" v-if="active">
		<div class="exchange-content">
			<ExchangeUnit :personData="tradingData.Sender" :recipientId="tradingData.Recipient.id"
				:openedCategories="tradingData.openedCategories" @endorsed="toggleEndorsedStatus"
				@updatePayment="updatePaymentValue" @pickItem="pickItem" class="sender" />
			<ExchangeUnit :personData="tradingData.Recipient" :recipientId="tradingData.Recipient.id"
				class="recipient" />
		</div>
	</div>
</template>

<script>
import ExchangeUnit from './components/ExchangeUnit/ExchangeUnit.vue';
import { onUnmounted } from 'vue';
import events from '@/modules/events';

export default {
	components: {
		ExchangeUnit,
	},
	mounted() {
		onUnmounted(() => {
			events.remove('Exchange:OpenMenu:Cef');
			events.remove(' Exchange:SetPickedItem:Cef');
			events.remove('Exchange:SetExtraPayment:Cef');
		});
		events.add('Exchange:OpenMenu:Cef', (json) => {
			const parsedJson = JSON.parse(json);
			this.tradingData.Sender = parsedJson.sender;
			this.tradingData.Recipient = parsedJson.recipient;
			this.tradingData.openedCategories = parsedJson.openedCategories;
			this.active = true;
		});
		events.add('Exchange:SetPickedItem:Cef', (type, json) => {
			const parsedJson = JSON.parse(json);
			if (parsedJson?.itemsInCategory || parsedJson?.itemByCount) {
				parsedJson.itemsInCategory = 1;
				parsedJson.itemByCount = 0;
			}
			this.tradingData[type].pickedItem = parsedJson;
		});
		events.add('Exchange:SetExtraPayment:Cef', (type, money) => {
			this.tradingData[type].extraPayment = Number(money);
		});
	},
	data() {
		return {
			tradingData: {
				Sender: {
					id: 0,
					role: 'Sender',
					extraPayment: 0,
					isEndorsed: false,
					pickedItem: {
						model: 'cla45sb2',
						itemsInCategory: 17,
						itemByCount: 0,
						img: 'vehicle',
						type: 'Vehicle',
						licensePlate: '',
						category: '',
						characteristics: {
							engine: 0,
							brake: 0,
							suspencion: 0,
							turbine: 0,
						},
					},
				},
				Recipient: {
					id: 1,
					role: 'Recipient',
					isEndorsed: false,
					extraPayment: 0,
					pickedItem: {
						model: 'Mercades-senz c300',
						itemsInCategory: 2,
						itemByCount: 0,
						img: 'vehicle',
						type: 'Vehicle',
						licensePlate: '',
						category: '',
						characteristics: {
							engine: 0,
							brake: 0,
							suspencion: 0,
							turbine: 0,
						},
					},
				},
				openedCategories: {
					Home: true,
					Apart: true,
					Business: true,
					Vehicle: true,
					WaterVehicle: false,
					AirVehicle: false,
				},
			},
			active: true,
		};
	},
	methods: {
		toggleEndorsedStatus(role, status) {
			this.tradingData[role].isEndorsed = status;
		},
		updatePaymentValue(role, value) {
			this.tradingData[role].extraPayment = value;
		},
		pickItem(role, item) {
			this.tradingData[role].pickedItem = item;
		},
	},
};
</script>

<style lang="scss" src="./Exchange.scss" scoped></style>

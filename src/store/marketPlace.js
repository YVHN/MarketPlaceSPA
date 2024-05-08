import events from '@/modules/events';
import Vue from 'vue'

const marketPlace = {
	state: {
		currentLanguage: 'eng',
		pagesInSection: 1,
		listData: [],
		marketPlaceData: {
			auction: [
				{
					id: 1,
					views: 200,
					likes: 100,
					isLiked: false,
					isFavorite: false,
					endTime: '15.04.2024 18:55',
					created: '11.04.2024 13:53',
					sellData: {
						id: 666,
						img: 'House123',
						type: 'house',
						description: '...',
						statePrice: 4300, // ?
						address: 'VineWood, Baker.STR 23',
						parkingCapacity: 30,
						maxTenants: 12,
					},
					auctionData: {
						lastBet: 666666,
						competitors: 6,
					},
				},
				{
					id: 2,
					likes: 74,
					views: 38,
					isLiked: false,
					isFavorite: false,
					created: '11.04.2024 13:53',
					endTime: '15.04.2024 15:53',
					sellData: {
						img: 'image.png',
						vehicleName: 'W4 J82 Contention',
						type: 'transport',
						competitors: 12,
						startPrice: 400000,
						licensePlate: 'XXXXXX',
						dealerShip: 'Ubermacht',
						mileage: 100,
					},
					auctionData: {
						lastBet: 1232,
						competitors: 3,
					},
				},
			],
			estate: [
				{
					id: 20,
					views: 100,
					isFavorite: false,
					listingData: {},
					created: '11.04.2024 13:53',
					sellData: {
						id: 12,
						type: 'house',
						img: 'House123',
						address: 'Хабибовна 33',
						price: 50000,
						parkingCapacity: 4,
						maxTenants: 1,
					},
				},
			],
			transport: [
				{
					id: 31,
					views: 10,
					isFavorite: false,
					listingData: {},
					sellData: {
						id: 54,
						vehicleName: 'Bugattи Roaдster',
						vehicleModel: 'bmistralw16',
						type: 'transportRent',
						img: 'image.png',
						description: '...',
						price: 2000000,
						mileage: 100,
					},
				},
			],
			items: [
				{
					id: 40,
					isFavorite: false,
					sellData: {
						title: 'Хранилище данных - 16 TB',
						img: 'DataStorage16TB',
						type: 'item',
						category: 'different',
					},
					tradeData: {
						startPrice: 5620,
						available: 4321,
					},
				},
			],
			transportRent: [
				{
					id: 51,
					views: 10,
					isFavorite: false,
					listingData: {},
					sellData: {
						id: 54,
						vehicleName: 'Bugattи Roaдster',
						vehicleModel: 'bmistralw16',
						rentPrice: 0,
						mileage: 100,
						type: 'transportRent',
						img: 'image.png',
						description: '...',
					},
				},
			],
			clothes: [],
			services: [],
			business: [],
			storage: [
				{
					id: 11,
					sellData: {
						title: 'Хранилище данных - 16 TB',
						img: 'DataStorage16TB',
						state: 'Отличное',
						type: 'item',
						itemType: 4,
						quantity: 15,
						weight: 12,
					},
					storageData: {
						added: '14.04.2024 18:48',
					},
				},
				{
					id: 40,
					sellData: {
						id: 12,
						img: 'W4J82Contention',
						model: 'W4 J82 Contention',
						type: 'transport',
						dealerShip: 'Ubermacht',
						quantity: 3,
						mileage: 100,
					},
					storageData: {
						added: '12.04.2024 13:55',
					},
				},
				{
					id: 13,
					sellData: {
						id: 3,
						type: 'house',
						img: 'House123',
						address: 'Хабибовна 33',
						parkingCapacity: 6,
						maxTenants: 3,
					},
					storageData: {
						added: '12.04.2024 13:55',
					},
				},
			],
			favorites: [],
			userListings: [],
			history: [],
			createListing: [
				{
					id: 12,
					sellData: {
						id: 10,
						type: 'house',
						img: 'House123',
						parkingCapacity: 6,
						maxTenants: 3,
						address: 'Хабибовна 33',
					},
					status: 'storage',
				},
				{
					id: 5,
					sellData: {
						img: 'W4J82Contention',
						model: 'W4 J82 Contention',
						type: 'transport',
						dealerShip: 'Ubermacht',
						specifications: {
							acceleration: 56,
							clutch: 23,
							controllability: 40,
							speed: 130,
						},
						mileage: 66,
					},
					status: 'storage',
				},
				{
					id: 2,
					sellData: {
						title: 'Хранилище данных - 16 TB',
						img: 'DataStorage16TB',
						state: 'Отличное',
						type: 'item',
						itemType: 4,
						quantity: 3,
					},
					status: 'storage',
				},
			],
		},
		itemsData: {
			auction: [
				{
					"id": 1,
					"sellData": {
						"type": "transport",
						"img": null,
						"description": "test",
						"price": 0,
						"id": 923260,
						"vehicleModel": "daytona",
						"vehicleName": "Ferari Daytona",
						"statePrice": 0,
						"specifications": {}
					},
					"views": 0,
					"isFavorite": false,
					"created": "02.05.2024 16:16:39",
					"endTime": "02.05.2024 21:16:39",
					"likes": 0,
					"isLiked": false,
					"auctionData": {
						"seller": {
							"username": "Cherry_Waves",
							"static": 128683,
							"phone": 233197770
						},
						"lastBet": 1000000,
						"competitors": 0,
						"offers": []
					},
					"sales": []
				},
				{
					id: 2,
					likes: 123,
					views: 321,
					isLiked: false,
					isFavorite: false,
					created: '11.04.2024 13:53',
					endTime: '15.04.2024 15:53',
					sellData: {
						img: 'W4J82Contention',
						model: 'W4 J82 Contention',
						type: 'transport',
						licensePlate: 'XXXXXX',
						dealerShip: 'Ubermacht',
						tuningStatus: 'Отличное',
						mileage: 100,
						weight: 100,
						statePrice: 12312,
						description: 'biba ;ipa',
						specifications: {
							acceleration: 56,
							clutch: 23,
							controllability: 40,
							speed: 130,
						},
					},
					auctionData: {
						competitors: 7,
						lastBet: 50000,
						offers: [
							{
								playerData: {
									username: 'Maneskin Benson',
									static: 123,
								},
								bet: 74300,
								created: '11.04.2024 18:31',
							},
						],
					},
				},
			],
			exchange: [
				{
					id: 40,
					isFavorite: false,
					sellData: {
						itemType: 2,
						img: 'DataStorage16TB',
						title: 'Хранилище данных - 16 TB',
						type: 'item',
						weight: 123,
						description:
							'На этом жестком диске хранятся зашифроманные данные, которые вы можете передать или продать.',
					},
					tradeData: {
						startPrice: 7000,
						available: 100,
						graphStat: [
							{
								date: 'Апрель',
								amount: 1232,
							},
						],
						offers: [
							{
								id: 21,
								playerData: {
									username: 'Maneskin Benson',
									static: '123',
								},
								state: 'Отличное',
								quantity: 123,
								pricePerItem: 7000,
								created: '15.04.2024 16:05',
							},
						],
					},
				},
			],
			items: [
				{
					id: 5,
					img: 'W4J82Contention',
					model: 'W4 J82 Contention',
					type: 'transport',
					licensePlate: 'XXXXXX',
					dealerShip: 'Ubermacht',
					tuningStatus: 'Отличное',
					mileage: 100,
					weight: 100,
					statePrice: 12312,
					specifications: {
						acceleration: 56,
						clutch: 23,
						controllability: 40,
						speed: 130,
					},
				},
				{
					id: 12,
					type: 'house',
					img: 'House123',
					address: 'Хабибовна 33',
					statePrice: 12322,
					parkingCapacity: 4,
					maxTenants: 1,
				},
			],
			listings: [
				{
					id: 20,
					views: 59,
					created: '11.04.2024 13:53',
					sellData: {
						id: 12,
						type: 'house',
						img: 'House123',
						address: 'Хабибовна 33',
						description: 'буба',
						price: 50000,
						statePrice: 30000,
						parkingCapacity: 4,
						maxTenants: 1,
					},
					listingData: {
						seller: {
							username: 'First_Last',
							static: 666666,
							phone: '666-666-666',
						},
					},
				},
				{
					id: 31,
					views: 20,
					isFavorite: false,
					created: '16.04.2024 14:59:25',
					listingData: {
						seller: {
							username: 'First_Last',
							static: 666666,
							phone: null,
						},
					},
					sellData: {
						id: 18,
						vehicleModel: 'Mcлaren Seннa',
						vehicleName: 'senna',
						statePrice: 1000000,
						mileage: 100,
						specifications: {
							acceleration: '56',
							clutch: '23',
							controllability: '40',
							speed: '138',
						},
						type: 'transport',
						img: 'image.png',
						description: '...',
						price: 2000000,
					},
				},
				{
					id: 51,
					views: 10,
					isFavorite: false,
					created: '16.04.2024 14:59:25',
					listingData: {
						seller: {
							username: 'First_Last',
							static: 666666,
							phone: null,
						},
					},
					sellData: {
						id: 54,
						vehicleName: 'Bugattи Roaдster',
						vehicleModel: 'bmistralw16',
						rentPrice: 10,
						specifications: {
							acceleration: '56',
							clutch: '23',
							controllability: '40',
							speed: '138',
						},
						type: 'transportRent',
						img: 'image.png',
						description: '...',
						price: 2000000,
					},
				},
			],
		},
		favoritesIdList: [],
		pickedItem: null,
	},
	getters: {
		getPagesInSection(state) {
			return state.pagesInSection;
		},
		// айтемы
		getType: (state, getters) => (item) => {
			let type = '';
			if (['house', 'apartment'].includes(item.type)) type = 'Недвижимость';
			if (['transportRent', 'transport'].includes(item.type))
				type = 'Транспорт';
			if (item.type === 'business') type = 'Бизнес';
			if (item.type === 'clothes') type = 'Одежда';
			return getters.getLanguageText(type);
		},
		getTitle: (state, getters) => (item) => {
			if (['house', 'apartment'].includes(item.type)) {
				const titles = {
					house: 'Дом',
					apartment: 'Апартаменты',
				};
				return `${getters.getLanguageText(titles[item.type])} #${item.id}`;
			} else if (['transportRent', 'transport'].includes(item.type)) {
				return item.vehicleName;
			} else if (['item', 'service'].includes(item.type)) {
				return getters.getLanguageText(item.title);
			}
			return '';
		},
		getCategory: (state, getters) => (item, itemType) => {
			let category = '';
			if (['house', 'apartment'].includes(item.type)) {
				category = itemType === 'auction' ? 'Недвижимость' : item.address;
			} else if (item.type === 'business') {
				return item.address;
			} else if (['transportRent', 'transport'].includes(item.type)) {
				category = itemType === 'auction' ? 'Транспорт' : item.dealerShip;
			} else if (item.type === 'item') {
				category = 'Разное';
			} else if (item.type === 'service') {
				category = 'Услуги и прочее';
			}
			return getters.getLanguageText(category);
		},
		getPrice: () => (item) => {
			if (item?.auctionData) return item.auctionData.lastBet;
			if (item?.tradeData) return item.tradeData.startPrice;
			if (item.sellData?.rentPrice) return item.sellData.rentPrice;
			return item.sellData.price;
		},
		getParsedTime: () => (dateTimeString, type) => {
			const [dateStr, timeStr] = dateTimeString.split(' ');
			const [day, month, year] = dateStr.split('.');
			const [hours, minutes] = timeStr.split(':');

			const parsedDate = {
				date: '',
				time: timeStr,
			};
			if (type === 'full') parsedDate.date = dateStr;
			if (type === 'graph') return `${day}.${month} ${timeStr}`;
			if (type === 'shelfTime')
				return new Date(year, month - 1, day, hours, minutes);

			return parsedDate;
		},
		//---------------------------------------------------
		getLanguageText(state) {
			return (text, ...args) => {
				return Vue.prototype.$getLanguageText(text, ...args);
			};
		},
		// Возвращает список предметов в данной секции
		getList(state) {
			const list = state.listData;
			if (!list) return [];
			return list;
		},
		// Для теста
		getItemFromStorage: (state) => (itemId) => {
			const item = state.marketPlaceData.storage.find(
				(item) => item.id === itemId,
			);
			return item;
		},
		getIsFavorite: (state) => (itemId) => {
			return state.favoritesIdList.some((item) => item === itemId);
		},
		// Берёт локально предмет и вовзращает его фулл дату
		getItemFullData: (state) => (itemId, category) => {
			console.log(itemId, category);
			const item = state.itemsData[category].find((item) => item.id === itemId);
			if (item) {
				return item;
			}
			return '';
		},
		getPickedItem(state) {
			return state.pickedItem;
		},
	},
	mutations: {
		start(state) {
			console.log('очищен');
			state.listData = [];
			state.pickedItem = null;
			state.pagesInSection = 1;
			console.log(`PickedItem : ${state.pickedItem}`);
		},
		pickItem(state, item) {
			console.log(item);
			state.pickedItem = item;
		},
		deleteItemFromStorage(state, id) {
			const filtered = state.marketPlaceData.storage.filter(
				(item) => item.id !== id,
			);
			state.marketPlaceData.storage = filtered;
		},
		deleteListingFromList(state, [section, id]) {
			const filtered = state.marketPlaceData[section].filter(
				(item) => item.id !== id,
			);
			state.marketPlaceData[section] = filtered;
		},
		appendOfferBet(state, offer) {
			console.log('ставка добавлена');
			state.pickedItem.auctionData.offers.push(offer);
		},
		resetListData(state) {
			console.log('список очищен');
			state.listData = [];
		}
	},
	actions: {
		// На сервере
		updateFavoritesList({ state }, itemId) {
			const list = state.favoritesIdList;
			const result = list.some((id) => id === itemId);
			if (result) {
				const filtered = state.favoritesIdList.filter((id) => id != itemId);
				state.favoritesIdList = filtered;
				events.callServer('MarketPlace:Favorites:GetData:Server', filtered);
			} else {
				marketPlace.state.favoritesIdList.push(itemId);
				events.callServer('MarketPlace:Favorites:GetData:Server', list);
			}
		},
		buyItem({ state }, item) {
			state.storageData.push(item);
		},
		resetPickedItem({ state }) {
			state.pickedItem = null;
		},
	},
};
// Получение списка и перезаписывание
events.add('MarketPlace:List:SetListData:Cef', (json) => {
	const parsedJson = JSON.parse(json);
	marketPlace.state.listData = parsedJson.data;
	console.log(parsedJson.data);
	marketPlace.state.pagesInSection = Math.ceil(parsedJson.totalCount / 15);
});
if (global?.mp) {
	for (const key in marketPlace.state.marketPlaceData) {
		marketPlace.state.marketPlaceData[key] = [];
	}
}
export default marketPlace;
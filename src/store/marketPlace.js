import events from '@/modules/events';
import Vue from 'vue'

import itemsFullData from '@/views/MarketPlace/Assets/Data/itemsFullData';
import sectionsData from '@/views/MarketPlace/Assets/Data/sectionsData';

function setFieldValue(obj, fieldName, value) {
	// Проверяем, существует ли объект
	if (obj && typeof obj === "object") {
		// Проверяем, существует ли поле в текущем объекте
		if (fieldName in obj) {
			// Если поле является объектом, вызываем функцию рекурсивно
			if (typeof obj[fieldName] === "object") {
				setFieldValue(obj[fieldName], fieldName, value);
			} else {
				// Устанавливаем значение поля
				obj[fieldName] = value;
				console.log(`Значение поля ${fieldName} было успешно установлено: ${value}`);
			}
		} else {
			// Если поле отсутствует в текущем объекте, ищем во вложенных объектах
			for (let key in obj) {
				if (typeof obj[key] === "object") {
					setFieldValue(obj[key], fieldName, value);
				}
			}
		}
	} else {
		console.log(`Объект не существует или не является объектом.`);
	}
	console.log(obj);
}

const marketPlace = {
	state: {
		currentLanguage: 'eng',
		pagesInSection: 10,
		listData: sectionsData.clothes,
		favoritesIdList: [],
		pickedItem: null,
		openingType: 'InTablet',
		userInfo: {
			moneyCash: 1233,
			moneyBank: 12,
			userName: 'Maneskin Ben',
		}
	},
	getters: {
		getOpeningType(state) {
			return state.openingType;
		},
		getPagesInSection(state) {
			return state.pagesInSection;
		},
		getUserInfo(state) {
			return state.userInfo;
		},
		// айтемы
		getType: (state, getters) => (item) => {
			let type = '';
			if (['house', 'apartment', 'business'].includes(item.type)) type = 'Недвижимость';
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
			} else if (['business'].includes(item.type)) {
				const titles = {
					1: 'Заправка',
				}
				return `${getters.getLanguageText(titles[item.businessType])} #${item.businessId}`
			} else if (item.type === 'clothes') {
				return getters.getLanguageText(item.itemName);
			}
			return '';
		},
		getCategory: (state, getters) => (item, itemType) => {
			let category = '';
			if (['house', 'apartment'].includes(item.type)) {
				category = itemType === 'auction' ? 'Недвижимость' : '';
				return '';
			} else if (item.type === 'business') {
				return item.address;
			} else if (['transportRent', 'transport'].includes(item.type)) {
				category = itemType === 'auction' ? 'Транспорт' : item.dealerShip;
			} else if (item.type === 'item') {
				category = 'Разное';
			} else if (item.type === 'service') {
				category = 'Услуги и прочее';
			} else if (item.type === 'clothes') {
				const categories = {
					'-1': 'Маска',
					'-3' : 'Перчатки',
					'-4' : 'Штаны',
					'-6' : 'Ботинки',
					'-7' : 'Ювелирка',
					'-8' : 'Рубашка',
					'-9' : 'Бронежилет',
					'-10' : 'хз',
					'-11' : 'Верх',
					'-12' : 'Шляпа',
					'-13' : 'Очки',
					'-14' : 'Аксесcуары'
				}
				category = categories[item.itemType];	
			}
			return getters.getLanguageText(category);
		},
		getPrice: () => (item) => {
			if (item?.auctionData) return item.auctionData.lastBet;
			if (item?.tradeData) return item.tradeData.startPrice;
			if (item.sellData?.rentPrice) return item.sellData.rentPrice;
			return item.sellData.price;
		},
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
			console.log('запуск');
			state.listData = [];
			state.pickedItem = null;
			state.pagesInSection = 1;
		},
		pickItem(state, item) {
			console.log(item);
			state.pickedItem = item;
		},
		unloadItem(state, id) {
			const filtered = state.listData.filter(
				(item) => item.id !== id,
			);
			state.listData = filtered;
		},
		deleteListingFromList(state, [section, id]) {
			const filtered = state.marketPlaceData[section].filter(
				(item) => item.id !== id,
			);
			state.marketPlaceData[section] = filtered;
		},
		appendOfferBet(state, offer) {
			console.log('Cтавка добавлена');
			state.pickedItem.auctionData.offers.push(offer);
		},
		resetListData(state) {
			console.log('Список предметов очищен');
			state.listData = [];
		},
		resetPickedItem(state) {
			if (state.pickedItem) {
				console.log('Выбранный айтем очищен');
				state.pickedItem = null;
			}
		},
		changePropertyValue(state, [id, property, value]) {
			if (state.pickedItem) {
				if (state.pickedItem.id === id) {
					setFieldValue(state.pickedItem, property, value);
				}
			}
			let listItem = state.listData.find((item) => item.id === id);
			if (listItem) {
				setFieldValue(listItem, property, value);
			}
		},
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
	},
};
// Получение списка и перезаписывание
events.add('MarketPlace:List:SetListData:Cef', (json) => {
	const parsedJson = JSON.parse(json);
	marketPlace.state.listData = parsedJson.data;
	console.log(parsedJson.data);
	marketPlace.state.pagesInSection = Math.ceil(parsedJson.totalCount / 15);
});
// Изменяет свойство
events.add('Marketplace:Action:ChangePropertyValue', (id, property, value) => {
	if (marketPlace.state.pickedItem) {
		if (marketPlace.state.pickedItem.id === id) {
			setFieldValue(marketPlace.state.pickedItem, property, value);
		}
	}
	let listItem = marketPlace.state.listData.find((item) => item.id === id);
	if (listItem) {
		setFieldValue(listItem, property, value);
	}
});
events.add('MarketPlace:List:ItemDelete:Cef', (id) => {
	const filtered = marketPlace.state.listData.filter((item) => item.id !== id);
	marketPlace.state.listData = filtered;
	if (id === marketPlace.state.pickedItem?.id) {
		marketPlace.state.pickedItem = null;
	}
});
events.add('MarketPlace:SetData:Cef', (json) => {
	const parsed = JSON.parse(json);
	marketPlace.state.openingType = parsed.openingType;
	marketPlace.state.userInfo = parsed.userInfo;
});
events.add('MarketPlace:User:UpdateMoneyCash:Cef', (num) => {
	marketPlace.state.userInfo.moneyCash = num;
});
events.add('MarketPlace:User:UpdateBankCash:Cef', (num) => {
	marketPlace.state.userInfo.moneyBank = num;
});
export default marketPlace;
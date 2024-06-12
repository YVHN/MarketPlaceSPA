import events from '@/modules/events';
import { setFieldValue } from '@/functions/marketplace';
import Vue from 'vue'

import itemsFullData from '@/views/MarketPlace/Assets/Data/itemsFullData';
import sectionsData from '@/views/MarketPlace/Assets/Data/sectionsData';

const marketPlace = {
	state: {
		currentLanguage: 'eng',
		pagesInSection: 10,
		listData: sectionsData.storage,
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
		changeCardItemQuantity(state, [id, quantity]) {
			const cardItem = state.listData.find((item), item.id === id);
			if(cardItem) {
				cardItem.sellData.quantity = quantity;
			}
		},
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
events.add('MarketPlace:List:ItemAdd:Cef', (item) => {
	if (!item) return;
	marketPlace.state.listData.push(item);
})
events.add('MarketPlace:SetData:Cef', (json) => {
	const parsed = JSON.parse(json);
	marketPlace.state.openingType = parsed.openingType;
	marketPlace.state.userInfo = parsed.userInfo;
});
events.add('MarketPlace:User:UpdateMoneyCash:Cef', (num) => {
	marketPlace.state.userInfo.moneyCash = num;
});
events.add('MarketPlace:User:UpdateMoneyBank:Cef', (num) => {
	marketPlace.state.userInfo.moneyBank = num;
});
events.add('MarketPlace:Exchange:AddOffer:Cef', (id, offer) => {
	if (!offer) return;
	else if (id === marketPlace.state.pickedItem.id) {
		marketPlace.state.pickedItem.tradeData.offers.push(offer);
		console.log('Предложение добавлено');
	}
});
events.add('MarketPlace:Exchange:DeleteOffer:Cef', (id, offerId) => {
	if (marketPlace.state.pickedItem.id === id) {
		const filtered = marketPlace.state.pickedItem.tradeData.offers.filter(offer => offer.id !== offerId);
		marketPlace.state.pickedItem.tradeData.offers = filtered;
	}
})
events.add('MarketPlace:Exchange:EditOffer:Cef', (cardId, offerId, quantity) => {
	if (marketPlace.state.pickedItem.id === cardId) {
		const offer = marketPlace.state.pickedItem.tradeData.offers.find((offer) => offer.id === offerId);
		if (offer) {
			offer.quantity = quantity;
		}
	}
});
export default marketPlace;
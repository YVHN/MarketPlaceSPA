import events from '@/modules/events';
import { setFieldValue } from '@/functions/marketplace';
import Vue from 'vue'

import itemsFullData from '@/views/MarketPlace/Assets/Data/itemsFullData';
import sectionsData from '@/views/MarketPlace/Assets/Data/sectionsData';

const marketPlace = {
	state: {
		currentLanguage: 'eng',
		currentSection: null,
		currentPage: null,
		pagesInSection: 7,
		listData: sectionsData.history,
		favoritesIdList: [],
		pickedItem: null,
		openingType: 'InTablet',
		addressesList: [],
		userInfo: {
			moneyCash: 1233,
			moneyBank: 12,
			userName: 'Maneskin Ben',
		},
		pricePerHour: 50000
	},
	getters: {
		getCurrentPage(state) {
			return state.currentPage;
		},
		getItemAddress: (state) => (coordinates) => {
			const location = `${coordinates?.x},${coordinates?.y},${coordinates?.z}`;
			let locationName = state.addressesList.find(address => address.location === location)?.name || 'Адрес не загружен';
			return locationName;
		},
		getPricePerHour(state) {
			return state.pricePerHour;
		},
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
		changeCardItemQuantity(state, [cardItemId, quantity]) {
			const cardItem = state.listData.find((item) => item.id === cardItemId);
			console.log('кол-во');
			if (cardItem) {
				console.log('меняю кол-во');
				cardItem.sellData.quantity = quantity;
			}
		},
		selectPage(state, page) {
			state.currentPage = page;
		},
		start(state) {
			console.log('запуск');
			state.listData = [];
			state.currentSection = null;
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
			state.currentSection = null;
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
	let itemsInPage = 15;
	// if (parsedJson.section === 'createListing' && marketPlace.state.currentPage === 1) {
	// 	itemsInPage = 12;
	// }
	marketPlace.state.listData = parsedJson.data;
	marketPlace.state.currentSection = parsedJson.section;
	console.log(parsedJson.data);
	marketPlace.state.pagesInSection = Math.ceil(parsedJson.totalCount / itemsInPage);
});
// Изменяет свойство
events.add('Marketplace:Action:ChangePropertyValue', (id, property, value, onlyGoods) => {
	const updateItem = (item) => {
		if (item && item.id === id) {
			setFieldValue(item, property, value);
		}
	};
	if (onlyGoods) {
		if (marketPlace.state.currentSection === "createListing") {
			const listItem = marketPlace.state.listData.find(item => item.id === id);
			updateItem(listItem);
		}
	} else {
		updateItem(marketPlace.state.pickedItem);
		const listItem = marketPlace.state.listData.find(item => item.id === id);
		updateItem(listItem);
	}
});
events.add('MarketPlace:List:ItemDelete:Cef', (id, onlyGoods) => {
	const updateListData = () => {
		marketPlace.state.listData = marketPlace.state.listData.filter(item => item.id !== id);
		if (id === marketPlace.state.pickedItem?.id) {
			marketPlace.state.pickedItem = null;
		}
	};
	if (onlyGoods) {
		if (marketPlace.state.currentSection === "createListing") {
			updateListData();
		}
	} else {
		updateListData();
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
	marketPlace.state.pricePerHour = parsed.pricePerHour;
});
events.add('MarketPlace:User:UpdateMoneyCash:Cef', (num) => {
	marketPlace.state.userInfo.moneyCash = num;
});
events.add('MarketPlace:User:UpdateMoneyBank:Cef', (num) => {
	marketPlace.state.userInfo.moneyBank = num;
});
events.add('MarketPlace:Exchange:AddOffer:Cef', (id, offer) => {
	const parsedOffer = JSON.parse(offer);
	console.log(parsedOffer);
	if (id === marketPlace.state.pickedItem.id && parsedOffer) {
		marketPlace.state.pickedItem.tradeData.offers.unshift(parsedOffer);
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
	console.log('Редактирование предложения');
	if (marketPlace.state.pickedItem.id === cardId) {
		const offer = marketPlace.state.pickedItem.tradeData.offers.find((offer) => offer.id === offerId);
		if (offer) {
			offer.quantity = quantity;
		}
	}
});
events.add('MarketPlace:CardItem:SetAddress:Cef', (id, address) => {
	console.log('добавление адреса');
	if (marketPlace.state.pickedItem) {
		if (marketPlace.state.pickedItem.id === id) {
			marketPlace.state.pickedItem.sellData.address = address;
		}
	}
	let listItem = marketPlace.state.listData.find((item) => item.id === id);
	if (listItem) {
		const location = `${listItem.sellData.coordinates?.x},${listItem.sellData.coordinates?.y},${listItem.sellData.coordinates?.z}`;
		listItem.sellData.address = address;
		marketPlace.state.addressesList.push({
			location: location,
			name: address,
		});
	}
})
export default marketPlace;
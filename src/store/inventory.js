export default {
	namespaced: true,
	state: {
		inventoryType: 'near',
		stuffList: [],
		fastSlots: [],
		walletSlots: [],
		walletSlotsShow: false,
		inventory: {},
		bag: {},
		additionalSlot: {},
		exchangeSlots: {},
		nearSlot: {}
	},
	getters: {
		getInventoryData(state) {
			return state.inventory;
		},
		getBagData(state) {
			return state.bag;
		},
		getStuffList(state) {
			return state.stuffList;
		},
		getFastSlots(state) {
			return state.fastSlots;
		},
		getWalletSlots(state) {
			return state.walletSlots;
		},
		getWalletSlotsShow(state) {
			return state.walletSlotsShow;
		},
		getAdditionalSlot(state) {
			return state.additionalSlot;
		},
		getNearSlot(state) {
			return state.nearSlot;
		},
		getExchangeSlots(state) {
			return state.exchangeSlots;
		},
		getInventoryType(state) {
			return state.inventoryType;
		}
	},
	mutations: {
		setStore(state, payload) {
			Object.assign(state, payload);
		},
		setStuffList(state, payload) {
			state.stuffList = payload;
		},
		setFastSlots(state, payload) {
			state.fastSlots = payload;
		},
		setWalletSlots(state, payload) {
			state.walletSlots = payload;
		},
		setWalletSlotsShow(state, payload) {
			state.walletSlotsShow = payload;
		},
		setInventory(state, payload) {
			state.inventory = payload;
		},
		setBag(state, payload) {
			state.bag = payload;
		},
		setAdditionalSlot(state, payload) {
			state.additionalSlot = payload;
		},
		setNearSlot(state, payload) {
			state.nearSlot = payload;
		},
		setExchangeSlots(state, payload) {
			state.exchangeSlots = payload;
		},
		setInventoryType(state, payload) {
			state.inventoryType = payload;
		}
	},
	actions: {
		setStore({ commit }, payload) {
			commit("setStore", payload);
		},
		setStuffList({ commit }, payload) {
			commit("setStuffList", payload);
		},
		setFastSlots({ commit }, payload) {
			commit("setFastSlots", payload);
		},
		setWalletSlots({ commit }, payload) {
			commit("setWalletSlots", payload);
		},
		setWalletSlotsShow({commit}, payload){
			commit('setWalletSlotsShow', payload);
		},
		setInventory({ commit }, payload) {
			commit("setInventory", payload);
		},
		setBag({ commit }, payload) {
			commit("setBag", payload);
		},
		setAdditionalSlot({ commit }, payload) {
			commit("setAdditionalSlot", payload);
		},
		setExchangeSlots({ commit }, payload) {
			commit("setExchangeSlots", payload);
		},
		setInventoryType({ commit }, payload) {
			commit("setInventoryType", payload);
		}
	},
	modules: {},
};

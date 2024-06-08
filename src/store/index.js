import Vue from 'vue'
import Vuex from 'vuex'
// import PlayerMenu from './PlayerMenu.js'
// import inventory from "./inventory.js";
// import circularAnimations from './circularAnimations.js';
import marketPlace from './marketPlace'

Vue.use(Vuex)


const Tablet = {
    state: {
        type: undefined,
        locked: true,
        mode: "dark",
        orientation: "horizontal",
        clock: "digital",
        brightness: 100,
        theme: "http://146.59.126.149/tabs_oboi/tabsoboi6.png",
        themes: [
            "http://146.59.126.149/tabs_oboi/bg1.png", "http://146.59.126.149/tabs_oboi/bg2.png", "http://146.59.126.149/tabs_oboi/bg3.jpg", 
            "http://146.59.126.149/tabs_oboi/bg4.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi1.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi2.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi3.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi4.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi5.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi6.png", "http://146.59.126.149/tabs_oboi/tabsoboi7.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi8.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi9.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi11.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi12.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi13.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi14.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi15.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi16.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi17.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi18.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi19.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi20.jpg", 
            "http://146.59.126.149/tabs_oboi/tabsoboi21.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi22.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi23.jpg",
            "http://146.59.126.149/tabs_oboi/tabsoboi24.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi25.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi26.jpg",
            "http://146.59.126.149/tabs_oboi/tabsoboi27.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi28.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi29.jpg",
            "http://146.59.126.149/tabs_oboi/tabsoboi30.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi31.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi32.jpg",
            "http://146.59.126.149/tabs_oboi/tabsoboi33.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi34.jpg", "http://146.59.126.149/tabs_oboi/tabsoboi35.jpg",
        ],
        currentFont: "SF Pro Display",
        font: "'SF Pro Display', sans-serif",
        CurrentPage: undefined,
        fonts: [
            {
                name: "SF Pro Display",
                type: "sans-serif",
            },
            {
                name: "Roboto",
                type: "sans-serif",
            },
            {
                name: "Jost",
                type: "sans-serif",
            },
            {
                name: "Icealand",
                type: "cursive",
            },
        ],
        NotePad: {
            ActiveIndex: undefined,
            List: []
        },
        Radio: {
            Volume: 50,
            Music: null,
            Active: false,
        },
        HouseData: {
            "Info": {
                // Price: 1000000,
                // State: false,
                // ID: 10,
                // TypeName: "Premium",
                // MaxRoomates: 10,
                // GarageSlots: 6,
                // MoneyInBank: 10000,
                // NalogInDay: 10,
                // AddressHouse: "Авеню Стрит",
                // Roommates: [ "Randomchik" ]
            },
            "MebelsBuys": [
                // {
                //     ID: 0,
                //     IndexMebel: 1,
                //     State: true,
                // },
                // {
                //     ID: 1,
                //     IndexMebel: 2,
                //     State: false,
                // },
            ]
        },
        BusinessData: {
            "Info": {
                ID: 10,
                AddressBussiness: "Авеню Стрит",
                Nacenka: 10,
                BusinessName: "Автосалон",
                Price: 100000,
                IncomeInDay: 15000000,
                NalogInDay: 10,
                MoneyInBank: 10000,
            },
            "Analytics": {
                // AllIncoming: {
                //     "01.02.2023": 85510000,
                //     "02.02.2023": 85510000,
                //     "03.02.2023": 85510000,
                //     "04.02.2023": 85510000,
                //     "05.02.2023": 85510000,
                //     "06.02.2023": 85510000,
                //     "07.02.2023": 85510000,
                //     "08.02.2023": 85510000,
                //     "09.02.2023": 85510000,
                // }
            }
        },
        Taxi: {
            "Calls": [
                // {
                //     ID: 1,
                //     Time: "0:16:15",
                //     User: "Randomchik",
                //     Address: "Ньюйорк station",
                //     Distance: 2.56,
                // }
            ]
        },
        FractionData: {
            "FirstTab": {
                // Players: [
                //     {
                //         uid: 34588,
                //         name: "Randomchik Bog",
                //         range: "Police Off. 1",
                //         online: 1231,
                //         status: true,
                //     },
                //     {
                //         uid: 34589,
                //         name: "Yulik Yulik",
                //         range: "Police Off. 1",
                //         online: 1221,
                //         status: false,
                //     }
                // ],
                // OnlineFractions: {
                //     OnlinePlayers: 10,
                //     AllPlayers: 20,
                // }
                // Info: {
                //     FractionID: 7,
                // }
            },
            "SecondTabLogs": {
                // Info: {
                //     Money: 100000,
                //     TabsActive: 1,
                //     MaxLogsInPage: 30,
                // },
                // Logs: [
                //     {
                //         PersonUID: 34588,
                //         Name: "Eduard Sovetov",
                //         RangeName: "Police Off. 1",
                //         TypeTransaction: true,
                //         Amount: 100000000,
                //         Time: "13.01 0:16:15",
                //     },
                //     {
                //         PersonUID: 34558,
                //         Name: "Eduard Sovetov",
                //         RangeName: "Police Off. 1",
                //         TypeTransaction: true,
                //         Amount: 100000000,
                //         Time: "13.01 0:16:15",
                //     },
                // ]
            },
            "ThirdTabCalls": {
                // Calls: [
                //     {
                //         ID: 1,
                //         UID: 14213,
                //         Name: "Randomchik Bog",
                //         Type: "Код 0",
                //         Time: "0:16:15",
                //         Address: "Форт-Занкудо-Аппроч-роуд",
                //         Distance: 10.5,
                //     }
                // ]
            },
            "FourTabVehicle": {
                // Vehicles: [
                //     {
                //         VehicleName: "MITSUBISHI LANCER X",
                //         Afuel: 122,
                //     },
                //     {
                //         VehicleName: "MITSUBISHI LANCER X",
                //         Afuel: null,
                //     },
                // ]
            },
            "FiveTabSettingRangs": {
                // Rangs: {
                //     1: {
                //         Name: "Shief",
                //         Payment: 20000,
                //         AcceessInteractions: {
                //             0: true,
                //             1: false,
                //             2: false,
                //             3: true,
                //         }
                //     }
                // }
            },
            "SixTabFracLogs": {
                // Info: {
                //     TabsActive: 1,
                //     MaxLogsInPage: 30,
                // },
                // Logs: [
                //     {
                //         PersonUID: 34588,
                //         Name: "Eduard Sovetov",
                //         RangeName: "Police Off. 1",
                //         Action: "Взял со склада М4",
                //         Amount: 4,
                //         Time: "2023-01-30T20:24:12.5532825+03:00",
                //     }
                // ]
            },
            "Info": {
                // FractionID: 7,
            }
        }
    },
    getters: {
        TabletMenu_GetRangs(state) {
            return state.FractionData["FiveTabSettingRangs"].Rangs;
        },
        getMode(state) {
            return state.mode == "dark" ? "dark" : "";
        },
        getStyles(state) {
            return {
                "--font": state.font,
                background: "url(" + state.theme + ") center/cover no-repeat",
                filter: "brightness(" + state.brightness + "%)",
            };
        },
        getActiveStateForClient(state) {
            return {
                Mode: state.mode,
                Clock: state.clock,
                Brightness: state.brightness,
                Theme: state.theme,
                CurrentFont: state.currentFont,
                Font: state.font,
                Orientation: state.orientation,
            }
        } 
    },
    mutations: {
        setTaxiData(state, json) {
            state.Taxi[json.Type] = JSON.parse(json.Data);
        },
        saveNotePadList(state) {
            mp.trigger("TabletMenu:SaveNotePadList:Client", JSON.stringify(state.NotePad.List));
        },
        editCreatedNotePad(state, obj) {
            state.NotePad.List[obj.Index] = obj.Object;
			this.commit("saveNotePadList");
        },
        createNewNotePad(state, object) {
            state.NotePad.List.unshift(object);
			this.commit("saveNotePadList");
        },
        setFractionData(state, json) {
            state.FractionData[json.Type] = JSON.parse(json.Data);
        },
        setBusinessData(state, json) {
            state.BusinessData[json.Type] = JSON.parse(json.Data);
        },
        setHouseData(state, json) {
            state.HouseData[json.Type] = JSON.parse(json.Data);
        },
        saveClientUpdateData() {
            if (typeof mp != 'undefined') {
                mp.trigger("SaveSettingTablet:Client", JSON.stringify(this.getters.getActiveStateForClient));
            }
        },
        setClientData(state, clientData) {
            clientData = JSON.parse(clientData);
            const settings = clientData.Settings;
            state.NotePad.List = clientData.NotePadList;
            state.mode = settings.Mode;
            state.clock = settings.Clock;
            state.brightness = settings.Brightness;
            state.theme = settings.Theme;
            state.currentFont = settings.CurrentFont;
            state.font = settings.Font;
            state.orientation = settings.Orientation;
        },
        setType(state, type) {
            state.type = type;
        },
        getSettings(state, db) {
            state.mode = db.mode;
            state.clock = db.clock;
            state.brightness = db.brightness;
            state.theme = db.theme;
            state.currentFont = db.currentFont;
            state.font = db.font;
        },
        unLock(state, val) {
            state.locked = val;
        },
        changeMode(state, mode) {
            state.mode = mode;
            if (mode == "dark") {
                state.theme = BackGroundTablet;
            } else {
                state.theme = BackGroundTablet2;
            }
            this.commit("saveClientUpdateData");
        },
        changeOrientation(state, orientation) {
            state.orientation = orientation;
            this.commit("saveClientUpdateData");
        },
        changeBrightness(state, brightness) {
            state.brightness = brightness;
            this.commit("saveClientUpdateData");
        },
        changeFont(state, font) {
            state.currentFont = font.name;
            state.font = font.name + "," + font.type;
            this.commit("saveClientUpdateData");
        },
        changeTheme(state, theme) {
            state.theme = theme;
            this.commit("saveClientUpdateData");
        },
        changeClock(state, clock) {
            state.clock = clock;
            this.commit("saveClientUpdateData");
        },
    },
    actions: {
        getSettings(ctx) {
            ctx.commit("setType", "desktop");
            ctx.commit("changeOrientation", ctx.state.orientation == "vertical" ? "vertical" : "horizontal");
        },
    },
}

const animations = {
    namespaced: true,
    state: {
        bindsList: [
            { key: '1' },
            { key: '2' },
            { key: '3' },
            { key: '4' },
            { key: '5' },
            { key: '6' },
            { key: '7' },
            { key: '8' },
            { key: '9' },
            { key: '10' },
        ],
    },
    getters: {
        getBindsList(state) {
            return state.bindsList
        }
    },
    mutations: {
        setBindsList(state, bindsList) {
            state.bindsList = bindsList;
        },
    },
};

export default new Vuex.Store({
	state: {
        currentLanguage: 'eng',
	},
	getters: {
        getCurrentLanguage(state) {
            return state.currentLanguage;
        }
	},
	mutations: {
        App_setCurrentLanguage(state, languageNewType) {
            state.currentLanguage = languageNewType;
        }
	},
	actions: {
	},
	modules: {
        // animations,
        // Tablet,
        // PlayerMenu,
        // inventory,
        // circularAnimations
        marketPlace
	}
})
import MiniGamesInfo from "../../../configServer/PlayerMenu/MiniGames/config.json";
import BattlePassItemsList from "../../../configServer/BattlePass/itemsList.json";
import events from "@/modules/events";
const PlayerMenu = {
	state: {
		playerInfo: {
			account: {
				login: "Randomchik",
				crystalCoins: 1551550,
				rubles: 0,
				socialClub: "RandomchikTOP",
				ticketDrawCount: 0,
				vipStatus: {
					vipName: "",
					vipUntil: 1,
				}
			},
			parkingData: {
				AdditionalParkingPlaceCount: 0,
			},
			ticketDraw: {
				list: [],
			},
			warns: 0,
			level: 20,
			violations: 0,
			lotteryInfo: {
				priceBuy: 500000,
				winMoney: 100,
			},
			mainInfo: {
				firstName: "Randomchik",
				lastName: "Dev",
				sex: "Мужской",
				passId: 412433,
				dateRegstration: "24.01.2023",
			},
			timerMenu: {
				raffleInfo: {
					name: "Какой то розыгрыш",
					time: 1688399888879,
				},
				timeToTakeVehicle: {
					time: 1688399888879,
					vehName: "M5 COMP",
				},
			},
			timeData: {
				inGame: 10,
				lastEntry: "27.03.2023",
			},
			financyData: {
				cash: 240000,
				card: 425000,
			},
			busines: {
				Position: { X: 0, Y: 0, Z: 0 },
				Name: "Магазин одежды - #139",
			},
			house: {
				Position: { X: 0, Y: 0, Z: 0 },
				Name: "Ваинвуд стрит - #139",
			},
		},
		spendingList: [],
		miniGameInfo: MiniGamesInfo,
		battlePass: {
			items: BattlePassItemsList,
			takedItems: {
				free: {},
				premium: {},
			},
			lvl: {
				active: 4,
				exp: 10,
				needExp: 200,
			},
			tasksList: [
				["Buy_Sim_Card", 3000],
				["Find_Item_On_Driver", 0],
				["Parking_Auto", 13],
				["Find_Fre_Okun", 3],
				["Take_Two_SkinCow", 6],
				["Take_Fre_Korushki", 0],
			],
			havePremium: false,
			allowTakeExpTimeStamp: Date.now() + 122000,
			allowChangeTask: true,
			taskRaitingList: [
				{
					name: "string",
					staticId: 2,
					completedTasks: 34,
					allExperienceGained: 87,
				},
				{
					name: "string",
					staticId: 2,
					completedTasks: 34,
					allExperienceGained: 87,
				},
				{
					name: "string",
					staticId: 2,
					completedTasks: 34,
					allExperienceGained: 87,
				},
				{
					name: "string",
					staticId: 2,
					completedTasks: 34,
					allExperienceGained: 87,
				},
				{
					name: "string",
					staticId: 2,
					completedTasks: 34,
					allExperienceGained: 87,
				},
			],
		},
		donateInventory: {
			CategoryList: [
				{
					Type: "Все",
					Engine: -1
				},
				{
					Type: "Деньги",
					Engine: 0
				},
				{
					Type: "Транспорт",
					Engine: 1
				},
				{
					Type: "Предмет",
					Engine: 4
				},
				{
					Type: "Опыт",
					Engine: 5
				},
				{
					Type: "Лицензии",
					Engine: 6
				},
				{
					Type: "VIP",
					Engine: 7
				},
				{
					Type: "Одежда",
					Engine: 8
				},
				{
					Type: "Оружие",
					Engine: 9
				},
				{
					Type: "Скин на бронежилет",
					Engine: 10
				},
				{
					Type: "Раскраски на оружие",
					Engine: 12
				},
				{
					Type: "Стикеры на оружие",
					Engine: 13
				},
				{
					Type: "Анимации",
					Engine: 14
				},
				{
					Type: "Тату",
					Engine: 17
				},
				{
					Type: "Кейс",
					Engine: 18
				},
			],
			PrizeList: [
				// {
                //     Name: "Анимация Lavish",
                //     Image: "animations/lavish.webm",
                //     SellPrice: 1000,
                //     SellType: 1,
				// 	ColorType: 1,
				// 	GiftType: 14,
				// 	Amount: 1,
                // },
                // {
                //     Name: "Кофта",
                //     Image: "inventory/clothes/male/11/1103/3.png",
                //     SellPrice: 1000,
                //     SellType: 1,
				// 	ColorType: 2,
				// 	GiftType: 8,
				// 	Amount: 1,
                // },
			],
			CurrentPage: 1,
			MaxItemsInPage: 30,
			AllItemsInCurrentCategory: 120,
			CurrentCategory: -1,
		},
		donateClothes: {
			Items: [
				// {
				// 	Price: 1500,
				// 	TypePrice: 2,
				// 	Name: "Шахидка",
				// 	Image: "inventory/clothes/male/11/1103/3.png",
				// }
			]
		},
		casesData: {
			playerPrizeList: [],
			casesCount: {
				// 0: 10
			},
			casesList: [
				// {
				// 	Name: "Новогодние каникулы",
				// 	Description: "Этот кейс может принести вам как богатство в игре так и в жизни.",
				// 	Image: "christmastime.png",
				// 	CaseType: 0,
				// 	Price: 10,
				// 	PriceType: 5,
				// 	Rewards: [
				// 		{
				// 			Name: "Mercedes w223",
				// 			Color: 1,
				// 			Image: "vehicles/w223.png",
				// 			SellType: 2,
				// 			SellPrice: 100
				// 		},
				// 	]
				// },
			]
		},
		achievments: {
			Tasks: [
				// {
				// 	Id: 14,
				// 	IsComplete: true,
				// }
			],
		}
	},
	getters: {
		PlayerMenu_GetDonateClothesMenu(state) {
			return state.donateClothes.Items;
		},
		PlayerMenu_GetDonateInventoryData(state) {
			return { 
				CurrentPage: state.donateInventory.CurrentPage,
				MaxItemsInPage: state.donateInventory.MaxItemsInPage,
				AllItemsInCurrentCategory: state.donateInventory.AllItemsInCurrentCategory,
				CurrentCategory: state.donateInventory.CurrentCategory,
            };
		},
		PlayerMenu_GetDonateInventoryCategoryList(state) {
			return state.donateInventory.CategoryList;
		},
		PlayerMenu_GetParkingData(state) {
			return state.playerInfo.parkingData;
		},
		PlayerMenu_GetCasesList(state) {
			return state.casesData.casesList;
		},
		PlayerMenu_GetCasesCountData(state) {
			return state.casesData.casesCount;
		},
		PlayerMenu_GetAchievmentsDataTasks(state) {
			return state.achievments.Tasks;
		},
		PlayerMenu_GetCasesPrizeList(state) {
			return state.casesData.playerPrizeList;
		},
		PlayerMenu_GetDonateInventoryPrizeList(state) {
			return state.donateInventory.PrizeList;
		},
		PlayerMenu_getPlayerGender(state) {
			return state.playerInfo.mainInfo.sex == "Мужской";
		},
		PlayerMenu_getBattlePassItems(state) {
			return state.battlePass.items;
		},
		PlayerMenu_getBattlePassTakedItems(state) {
			return state.battlePass.takedItems;
		},
		PlayerMenu_getBattlePassLVLData(state) {
			return state.battlePass.lvl;
		},
		PlayerMenu_getBattlePassTasksList(state) {
			return state.battlePass.tasksList;
		},
		PlayerMenu_getBattlePassHavePremium(state) {
			return state.battlePass.havePremium;
		},
		PlayerMenu_getBattlePassAllowTakeExpTimeStamp(state) {
			return state.battlePass.allowTakeExpTimeStamp;
		},
		PlayerMenu_getBattlePassAllowChangeTask(state) {
			return state.battlePass.allowChangeTask;
		},
		PlayerMenu_getBattlePassTaskRaitingList(state) {
			return state.battlePass.taskRaitingList;
		},

		PlayerMenu_getMiniGameInfo(state) {
			return state.miniGameInfo;
		},
		PlayerMenu_getSpendingList(state) {
			return state.spendingList;
		},
		PlayerMenu_getInfoMainMenu(state) {
			return {
				login: state.playerInfo.account.login,
				crystalCoins: state.playerInfo.account.crystalCoins,
				rubles: state.playerInfo.account.rubles,
				levelPlayer: state.playerInfo.level,
				socialClub: state.playerInfo.account.socialClub,
				ticketDraw: state.playerInfo.account.ticketDrawCount,
				vipStatus: state.playerInfo.account.vipStatus,
			};
		},
		getPlayerInfo(state) {
			return state.playerInfo;
		},
		getStatisticsInfo(state) {
			return state.statisticsInfo;
		},
		PlayerMenu_getPassId(state) {
			return state.playerInfo.mainInfo.passId;
		}
	},
	mutations: {
		PlayerMenu_setPlayerAllData(state, json) {
			state.playerInfo = JSON.parse(json);
		},
		PlayerMenu_setPlayerFirstData(state, json) {
			json = JSON.parse(json);
			state.playerInfo.account = json.Account;
			state.playerInfo.level = json.PlayerLevel;
			state.playerInfo.mainInfo.sex = json.Sex;
			state.playerInfo.parkingData = json.ParkingData;
		},
		PlayerMenu_setPlayerSpendingList(state, json) {
			state.spendingList = JSON.parse(json);
		},
	},
	actions: {},
	modules: {},
};

if (global.mp) {

	// Уменьшение количества предметов в пачке донат инвентаря
	events.add("PlayerMenu:DonateInventory:SetAmount:Cef", (id, amount) => {
		const indexItem = PlayerMenu.state.donateInventory.PrizeList.findIndex(_ => _.Id == id);
        if (indexItem !== -1) {
			PlayerMenu.state.donateInventory.PrizeList[indexItem].Amount = amount;
        }
	});

	// Удаление предмета из инвентаря донат
	events.add("PlayerMenu:DonateInventory:DeleteItemById:Cef", (id) => {
		const indexItem = PlayerMenu.state.donateInventory.PrizeList.findIndex(_ => _.Id == id);
		if (indexItem !== -1) {
			PlayerMenu.state.donateInventory.PrizeList.splice(indexItem, 1);
		}
	});

	// Загрузка донат инвентаря
	events.add("PlayerMenu:DonateInventory:LoadData", (data) => {
		data = JSON.parse(data);
		PlayerMenu.state.donateInventory.PrizeList = data.PrizeList;
		PlayerMenu.state.donateInventory.CurrentPage = data.CurrentPage;
		PlayerMenu.state.donateInventory.AllItemsInCurrentCategory = data.AllItemsInCurrentCategory;
		PlayerMenu.state.donateInventory.MaxItemsInPage = data.MaxItemsInPage;
		PlayerMenu.state.donateInventory.CurrentCategory = data.CurrentCategory;
	});

	// Загрузка донат одежда
	events.add("PlayerMenu:DonateClothes:LoadItems", (data) => {
		PlayerMenu.state.donateClothes.Items = JSON.parse(data);
	});

	// Кейсы по одному
	mp.events.add("PlayerMenu:CasesList:Add", (data) => {
		PlayerMenu.state.casesData.casesList.push(JSON.parse(data));
	});

	// Кейсы кол-во
	events.add("PlayerMenu:CasesCount:SetData", (data) => {
		PlayerMenu.state.casesData.casesCount = JSON.parse(data);
	});

	// Ачивки
	events.add("PlayerMenu:Achievments:SetData", (data) => {
		PlayerMenu.state.achievments.Tasks = JSON.parse(data);
	});

	// Player Prize Cases
	events.add("PlayerMenu:CasesPrize:SetItems", (items) => {
		PlayerMenu.state.casesData.playerPrizeList = JSON.parse(items);
	});
	
	// DonateInventory
	events.add("PlayerMenu:DonateInventory:SetItems", (items) => {
		PlayerMenu.state.donateInventory.PrizeList = JSON.parse(items);
	});

	// BP
	events.add("PlayerMenu:BattlePass:SetTakedItemsIds", (free, premium) => {
		PlayerMenu.state.battlePass.takedItems = {
			free: JSON.parse(free),
			premium: JSON.parse(premium),
		};
	});
	events.add("PlayerMenu:BattlePass:SetTakedItemByKey", (type, id, value) => {
		//type - "free" or "premium"
		type = type == 0 ? "free" : "premium";
		PlayerMenu.state.battlePass.takedItems[type][id] = value;
	})
	events.add("PlayerMenu:BattlePass:SetTakedChildItemByKey", (type, id, childId, value) => {
		//type - "free" or "premium"
		type = type == 0 ? "free" : "premium";
		if (!PlayerMenu.state.battlePass.takedItems[type][id]){
			PlayerMenu.state.battlePass.takedItems[type][id] = {};
		}
		PlayerMenu.state.battlePass.takedItems[type][id][childId] = value;
	});
	events.add("PlayerMenu:BattlePass:UpdateLVLParam", (key, value) => {
		//key - "active" or "exp" or "needExp"
		PlayerMenu.state.battlePass.lvl[key] = Number(value);
	});
	events.add(
		"PlayerMenu:BattlePass:SetLVLData",
		(activeLVL, exp, needExp) => {
			PlayerMenu.state.battlePass.lvl.active = activeLVL;
			PlayerMenu.state.battlePass.lvl.exp = exp;
			PlayerMenu.state.battlePass.lvl.needExp = needExp;
		}
	);
	events.add("PlayerMenu:BattlePass:SetTasksList", (tasksList) => {
		//tasksList example - {0: 25, 6: 0, 17: 0, 24: 3, 25: 6, 87: 0}. Object key(string or number) - task id, value - task progress.
		tasksList = JSON.parse(tasksList);
		PlayerMenu.state.battlePass.tasksList = [];
		for (const key in tasksList) {
			PlayerMenu.state.battlePass.tasksList.push([key, tasksList[key]]);
		}
	});
	events.add("PlayerMenu:BattlePass:UpdateTaskProgress", (taskKey, value) => {
		const index = PlayerMenu.state.battlePass.tasksList.findIndex(
			(task) => task[0] === taskKey
		);
		PlayerMenu.state.battlePass.tasksList[index][1] = Number(value);
	});
	events.add("PlayerMenu:BattlePass:ChangeTask", (oldTaskKey, newTaskKey) => {
		const index = PlayerMenu.state.battlePass.tasksList.findIndex(
			(task) => task[0] === oldTaskKey
		);
		PlayerMenu.state.battlePass.tasksList[index] = [newTaskKey, 0];
	});
	events.add("PlayerMenu:BattlePass:SetHavePremium", (state) => {
		PlayerMenu.state.battlePass.havePremium = state;
	});
	events.add("PlayerMenu:BattlePass:SetAllowTakeExpSeconds", (seconds) => {
		PlayerMenu.state.battlePass.allowTakeExpTimeStamp =
			Date.now() + seconds * 1000;
	});
	events.add("PlayerMenu:BattlePass:SetAllowChangeTask", (state) => {
		PlayerMenu.state.battlePass.allowChangeTask = state;
	});
	events.add("PlayerMenu:BattlePass:SetTaskRaitingList", (list) => {
		PlayerMenu.state.battlePass.taskRaitingList = JSON.parse(list);
	});
}

export default PlayerMenu;

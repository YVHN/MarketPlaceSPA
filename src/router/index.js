import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
	// {
	// 	path: "/bar",
	// 	component: () => import("../views/Bar/BarMenu.vue")
	// },
	// {
	// 	path: "/blackShop",
	// 	component: () => import("../views/BlackShop/BlackShop.vue")
	// },
	// {
	// 	path: "/Shop",
	// 	component: () => import("../views/Shop/Shop.vue")
	// },
	// {
	// 	path: "/RentCar",
	// 	component: () => import("../views/RentCar/RentCar.vue")
	// },
	// {
	// 	path: "/Sushi",
	// 	component: () => import("../views/Sushi/Sushi.vue")
	// },
	// {
	// 	path: "/CaptMapGetto",
	// 	component: () => import("../views/MapGetto/CaptMapGetto.vue")
	// },
	// {
	// 	path: "/AutoSchool",
	// 	component: () => import("../views/AutoSchool/AutoSchool.vue")
	// },
	// {
	// 	path: "/FishAndMeatSell",
	// 	component: () => import("../views/FishAndMeatSell/FishAndMeatSell.vue")
	// },
	// {
	// 	path: "/FamilyCreator",
	// 	component: () => import("../views/Family/FamilyCreator/FamilyCreator.vue")
	// },
	// {
	// 	path: "/FamilyTabs",
	// 	component: () => import("../views/Family/FamilyTabs/FamilyTabs.vue")
	// },
	// {
	// 	path: "/FamilyContracts",
	// 	component: () => import("../views/Family/FamilyContracts/FamilyContracts.vue")
	// },
	// {
	// 	path: "/FamilyBuyOffice",
	// 	component: () => import("../views/Family/FamilyBuyOffice/FamilyBuyOffice.vue")
	// },
	// {
	// 	path: "/FamilyCraft",
	// 	component: () => import("../views/Family/FamilyCraft/FamilyCraft.vue")
	// },
	// {
	// 	path: "/FamilyEnterPrise",
	// 	component: () => import("../views/Family/FamilyEnterPrises/EnterPrise.vue")
	// },
	// {
	// 	path: "/AutoSell",
	// 	component: () => import("../views/AutoSell/AutoSell.vue")
	// },
	// {
	// 	path: "/MiniGame/FamilyScheme",
	// 	component: () => import("../views/MiniGame/FamilyScheme/Scheme.vue")
	// },
	// {
	// 	path: "/MiniGame/Fishing",
	// 	component: () => import("../views/MiniGame/Fishing/Fish.vue")
	// },
	// {
	// 	path: "/MiniGame/MushRoom",
	// 	component: () => import("../views/MiniGame/MushRooms/MushRoom.vue")
	// },
	// {
	// 	path: "/GarageMenu",
	// 	component: () => import("../views/Garage/Garage.vue")
	// },
	// {
	// 	path: "/BusinessInfoMenu",
	// 	component: () => import("../views/BusinessInfo/BusinessInfo.vue")
	// },
	// {
	// 	path: "/HouseInfoMenu",
	// 	component: () => import("../views/HouseInfo/HouseInfo.vue")
	// },
	// {
	// 	path: "/ParkingMenu",
	// 	component: () => import("../views/Parking/Parking.vue")
	// },
	// {
	// 	path: "/DialogMenu",
	// 	component: () => import("../views/Dialogi/Dialogi.vue")
	// },
	// {
	// 	path: "/CraftItems",
	// 	component: () => import("../views/CraftItems/CraftItems.vue")
	// },
	// {
	// 	path: "/BackShopMenu",
	// 	component: () => import("../views/BackShop/BackShop.vue")
	// },
	// {
	// 	path: "/EveryDayPrizes",
	// 	component: () => import("../views/EveryDayPrizes/EveryDayPrizes.vue")
	// },
	// {
	// 	path: "/WearHouse",
	// 	component: () => import("../views/WearHouse/WearHouse.vue")
	// },
	// {
	// 	path: "/HitAndScope",
	// 	component: () => import("../views/HitAndScope/HitAndScope.vue")
	// },
	// {
	// 	path: "/ChangeGoldMenu",
	// 	component: () => import("../views/ChangeGoldMenu/ChangeGoldMenu.vue")
	// },
	// {
	// 	path: "/DuelMenu",
	// 	component: () => import("../views/DuelMenu/DuelMenu.vue")
	// },
	// {
	// 	path: "/ApartamentsMenu",
	// 	component: () => import("../views/Apartaments/Apartaments.vue")
	// },
	// {
	// 	path: "/LiftMenu",
	// 	component: () => import("../views/LiftMenu/LiftMenu.vue")
	// },
	// {
	// 	path: "/DeathMenu",
	// 	component: () => import("../views/DeathMenu/Death.vue")
	// },
	// {
	// 	path: "/MenuCrime",
	// 	component: () => import("../views/MenuCrime/MenuCrime.vue")
	// },
	// {
	// 	path: "/ATM",
	// 	component: () => import("../views/ATM/Index.vue")
	// },
	// {
	// 	path: "/MarketBuy",
	// 	component: () => import("../views/MarketPlaceMenu/MarketBuy.vue")
	// },
	// {
	// 	path: "/MarketControl",
	// 	component: () => import("../views/MarketPlaceMenu/MarketControl.vue")
	// },
	// {
	// 	path: "/ReportPlayer",
	// 	component: () => import("../views/Report/ReportPlayer.vue")
	// },
	// {
	// 	path: "/AutoShop",
	// 	component: () => import("../views/AutoShop/AutoShop.vue")
	// },
	// {
	// 	path: "/TunningMenu",
	// 	component: () => import("../views/Tunning/Tunning.vue")
	// },
	// {
	// 	path: "/GunShopMenu",
	// 	component: () => import("../views/GunShop/GunShop.vue")
	// },
	// {
	// 	path: "/EcologyMenu",
	// 	component: () => import("../views/EcologyMenu/Ecology.vue")
	// },
	// {
	// 	path: "/TaxiJobMenu",
	// 	component: () => import("../views/TaxiMenu/Taxi.vue")
	// },
	// {
	// 	path: "/FractionChangeClothes",
	// 	component: () => import("../views/FractionChangeClothes/FractionChangeClothes.vue")
	// },
	// {
	// 	path: "/ContainersAuction",
	// 	component: () => import("../views/Containers/Containers.vue")
	// },
	// {
	// 	path: "/Passport",
	// 	component: () => import("../views/Passport/Passport.vue")
	// },
	// {
	// 	path: "/Licenses",
	// 	component: () => import("../views/Licenses/Licenses.vue")
	// },
	// {
	// 	path: "/Certificate",
	// 	component: () => import("../views/Certificate/Certificate.vue")
	// },
	// {
	// 	path: "/LoadingMats",
	// 	component: () => import("../views/LoadingMats/LoadingMats.vue")
	// },
	// {
	// 	path: "/FractionStock",
	// 	component: () => import("../views/FractionStock/FractionStock.vue")
	// },
	// {
	// 	path: "/CreatorCharacter",
	// 	component: () => import("../views/CreatorCharacter/CreatorCharacter.vue")
	// },
	// {
	// 	path: "/SelectCharacter",
	// 	component: () => import("../views/SelectCharacter/SelectCharacter.vue")
	// },
	// {
	// 	path: "/WeazelNews",
	// 	component: () => import("../views/WeazelNews/WeazelNews.vue")
	// },
	// {
	// 	path: "/JobNewYear",
	// 	component: () => import("../views/JobNewYear/JobNewYear.vue")
	// },
	// {
	// 	path: "/NewYearGiftBox",
	// 	component: () => import("../views/NewYearGiftBox/NewYearGiftBox.vue")
	// },
	// {
	// 	path: "/MenuInformation",
	// 	component: () => import("../views/MenuInformation/MenuInformation.vue")
	// },
	// {
	// 	path: "/TattooShop",
	// 	component: () => import("../views/TattooShop/TattooShop.vue")
	// },
	// {
	// 	path: "/BarberShop",
	// 	component: () => import("../views/BarberShop/BarberShop.vue")
	// },
	// {
	// 	path: "/Authentication",
	// 	component: () => import("../views/Authentication/Authentication.vue")
	// },
	// {
	// 	path: "/GangLabs",
	// 	component: () => import("../views/GangLabs/GangLabs.vue")
	// },
	// {
	// 	path: "/SelectSpawn",
	// 	component: () => import("../views/SelectSpawn/SelectSpawn.vue")
	// },
	// {
	// 	path: "/CreateBankCard",
	// 	component: () => import("../views/CreateBankCard/CreateBankCard.vue")
	// },
	// {
	// 	path: "/BuyVehicleNumbers",
	// 	component: () => import("../views/BuyVehicleNumbers/BuyVehicleNumbers.vue")
	// },
	// {
	// 	path: "/TabletMenu",
	// 	component: () => import("../views/TabletMenu/TabletMenu.vue"),
	// 	children: [
	// 		{
	// 			path: "",
	// 			name: "main",
	// 			component: () => import("../views/TabletMenu/views/TheMain.vue"),
	// 		},
	// 		{
	// 			path: "settings",
	// 			name: "settings",
	// 			component: () => import("../views/TabletMenu/views/settings/TheSettings.vue"),
	// 		},
	// 		{
	// 			path: "radio",
	// 			name: "radio",
	// 			component: () => import("../views/TabletMenu/views/TheFM.vue"),
	// 		},
	// 		{
	// 			path: "settings/mode",
	// 			name: "mode",
	// 			component: () => import("../views/TabletMenu/views/settings/TheMode.vue"),
	// 		},
	// 		{
	// 			path: "settings/clock",
	// 			name: "clock",
	// 			component: () => import("../views/TabletMenu/views/settings/TheClock.vue"),
	// 		},
	// 		{
	// 			path: "settings/themes",
	// 			name: "themes",
	// 			component: () => import("../views/TabletMenu/views/settings/TheThemes.vue"),
	// 		},
	// 		{
	// 			path: "settings/brightness",
	// 			name: "brightness",
	// 			component: () => import("../views/TabletMenu/views/settings/TheBrightness.vue"),
	// 		},
	// 		{
	// 			path: "settings/orientation",
	// 			name: "orientation",
	// 			component: () => import("../views/TabletMenu/views/settings/TheOrientation.vue"),
	// 		},
	// 		{
	// 			path: "notepad",
	// 			name: "notepad",
	// 			component: () => import("../views/TabletMenu/views/notepad/TheNotepad.vue"),
	// 		},
	// 		{
	// 			path: "notepad/note",
	// 			name: "note",
	// 			component: () => import("../views/TabletMenu/views/notepad/TheNote.vue"),
	// 		},
	// 		{
	// 			path: "notepad/add",
	// 			name: "add",
	// 			component: () => import("../views/TabletMenu/views/notepad/TheAdd.vue"),
	// 		},
	// 		{
	// 			path: "notepad/edit",
	// 			name: "edit",
	// 			component: () => import("../views/TabletMenu/views/notepad/TheEdit.vue"),
	// 		},
	// 		{
	// 			path: "fm",
	// 			name: "fm",
	// 			component: () => import("../views/TabletMenu/views/TheFM.vue"),
	// 		},
	// 		{
	// 			path: "taxi",
	// 			name: "taxi",
	// 			component: () => import("../views/TabletMenu/views/TheTaxi.vue"),
	// 		},
	// 		{
	// 			path: "Home",
	// 			name: "Home",
	// 			component: () => import("../views/TabletMenu/views/home/TheHome.vue"),
	// 		},
	// 		{
	// 			path: "mebel",
	// 			name: "mebel",
	// 			component: () => import("../views/TabletMenu/views/home/TheMebel.vue"),
	// 		},
	// 		{
	// 			path: "inventory",
	// 			name: "inventory",
	// 			component: () => import("../views/TabletMenu/views/home/TheInventory.vue"),
	// 		},
	// 		{
	// 			path: "analytics",
	// 			name: "analytics",
	// 			component: () => import("../views/TabletMenu/views/TheAnalytics.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/Players",
	// 			name: "Players",
	// 			component: () => import("../views/TabletMenu/views/Fractions/Players.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/BankManager",
	// 			name: "BankManager",
	// 			component: () => import("../views/TabletMenu/views/Fractions/BankManager.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/Calls",
	// 			name: "Calls",
	// 			component: () => import("../views/TabletMenu/views/Fractions/Calls.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/Vehicles",
	// 			name: "Vehicles",
	// 			component: () => import("../views/TabletMenu/views/Fractions/Vehicles.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/SettingRangs",
	// 			name: "SettingRangs",
	// 			component: () => import("../views/TabletMenu/views/Fractions/SettingRangs.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/Logs",
	// 			name: "Logs",
	// 			component: () => import("../views/TabletMenu/views/Fractions/Logs.vue"),
	// 		},
	// 		{
	// 			path: "Fractions/DelightMap",
	// 			name: "DelightMap",
	// 			component: () => import("../views/TabletMenu/views/Fractions/TheDelight.vue"),
	// 		},
	// 		{
	// 			path: "Business",
	// 			name: "Business",
	// 			component: () => import("../views/TabletMenu/views/TheBusiness.vue"),
	// 		},
	// 		{
	// 			path: "google",
	// 			name: "google",
	// 			component: () => import("../views/TabletMenu/views/TheGoogle.vue"),
	// 		},
	// 		{
	// 			path: "youtube",
	// 			name: "youtube",
	// 			component: () => import("../views/TabletMenu/views/TheYoutube.vue"),
	// 		},
	// 		{
	// 			path: "site",
	// 			name: "site",
	// 			component: () => import("../views/TabletMenu/views/TheSite.vue"),
	// 		},
	// 		{
	// 			path: "forum",
	// 			name: "forum",
	// 			component: () => import("../views/TabletMenu/views/TheForum.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	path: "/ArrestMenu",
	// 	component: () => import("../views/ArrestMenu/ArrestMenu.vue")
	// },
	// {
	// 	path: "/MarriedMenu",
	// 	component: () => import("../views/MarriedMenu/MarriedMenu.vue")
	// },
	// {
	// 	path: "/CasinoRoulette",
	// 	component: () => import("../views/Casino/Roulette/Roulette.vue")
	// },
	// {
	// 	path: "/CasinoApparats",
	// 	component: () => import("../views/Casino/Apparats/Apparats.vue")
	// },
	// {
	// 	path: "/CasinoBlackJack",
	// 	component: () => import("../views/Casino/BlackJack/BlackJack.vue")
	// },
	// {
	// 	path: "/Auction",
	// 	name: "Auction",
	// 	component: () => import("../views/Auction/index.vue"),
	// 	children: [
	// 		{
	// 			path: "",
	// 			component: () => import("../views/Auction/views/TheHome.vue"),
	// 		},
	// 		{
	// 			path: "Rates",
	// 			component: () => import("../views/Auction/views/TheRates.vue"),
	// 		},
	// 		{
	// 			path: "Lots",
	// 			component: () => import("../views/Auction/views/TheLots.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	path: '/playerMenu',
	// 	component: () => import('../views/PlayerMenu/PlayerMenu.vue'),
	// 	children: [
	// 		{
	// 			path: '/playerMenu/main',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuMain/PlayerMenuMain.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/statistics',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuStatistics/PlayerMenuStatistics.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/bulletproof',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBulletproof/PlayerMenuBulletproof.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/WeaponSkinsDraw',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuWeaponSkins/PlayerMenuWeaponDraw.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/WeaponSkinsSticker',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuWeaponSkins/PlayerMenuWeaponsSticker.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/carsShop',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCarsShop/PlayerMenuCarsShop.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/donateAnimations',
	// 			component: () => import('../views/PlayerMenu/Animations/Animations.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/servicesShop',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuServicesShop/PlayerMenuServicesShop.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/casesShop',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCasesShop/PlayerMenuCasesShop.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/currencyConversion',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCurrencyConversion/PlayerMenuCurrencyConversion.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/buyVIP',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBuyVIP/PlayerMenuBuyVIP.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/specialOffer',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuSpecialOffer/PlayerMenuSpecialOffer.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/settings',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuSettings/PlayerMenuSettings.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/roulette',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuRoulette/PlayerMenuRoulette.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/openCase/:index',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuOpenCase/PlayerMenuOpenCase.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/casesPrise',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCasesPrise/PlayerMenuCasesPrise.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/carsGame',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCarsGame/PlayerMenuCarsGame.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/minerGame',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuMinerGame/PlayerMenuMinerGame.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/cardGame',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuCardGame/PlayerMenuCardGame.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/referal',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuReferal/PlayerMenuReferal.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/chatSettings',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuChatSettings/PlayerMenuChatSettings.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/achieving',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuAchieving/PlayerMenuAchieving.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/forbesPlayers',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuForbes/PlayerMenuForbesPlayers.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/forbesFamilies',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuForbes/PlayerMenuForbesFamilies.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/AccountSettings',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuAccountSettings/PlayerMenuAccountSettings.vue'),
	// 		},
	// 		{
	//             path: '/playerMenu/BuyLottery',
	//             component: () => import('../views/PlayerMenu/Pages/PlayerMenuBuyLottery/PlayerMenuBuyLottery.vue'),
	//         },
	// 		{
	// 			path: '/playerMenu/battlePassMain',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBattlePass/Main.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/battlePassTasks',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBattlePass/Tasks.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/battlePassTasksRating',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBattlePass/TasksRating.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/battlePassExperience',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuBattlePass/Experience.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/donateInventory',
	// 			component: () => import('../views/PlayerMenu/DonateInventory/DonateInventory.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/donateOther',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuDonateOther/PlayerMenuDonateOther.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/animations/:id',
	// 			component: () => import('../views/PlayerMenu/Animations/Animations.vue'),
	// 		},
	// 		{
	// 			path: '/playerMenu/donateClothes',
	// 			component: () => import('../views/PlayerMenu/Pages/PlayerMenuDonateClothes/PlayerMenuDonateClothes.vue'),
	// 		},
	// 	],
	// },
	// {
	// 	path: "/circularAnimations",
	// 	component: () => import("../views/CircularAnimations/CircularAnimations.vue")
	// },
	// {
	// 	path: "/DeleteTattooMenu",
	// 	component: () => import("../views/DeleteTattooMenu/DeleteTattooMenu.vue")
	// },
	// {
	// 	path: "/SummerLottery",
	// 	component: () => import("../views/SummerLottery/SummerLottery.vue")
	// },
	// {
	// 	path: "/BanMenu",
	// 	component: () => import("../views/BanMenu/BanMenu.vue")
	// },
	// {
	// 	path: "/ATM",
	// 	component: () => import("../views/ATM/Index.vue")
	// },
	// {
	// 	path: "/ClothesShop",
	// 	component: () => import("../views/ClothesShop/ClothesShop.vue")
	// },
	// {
	// 	path: "/BankCardMenu",
	// 	component: () => import("../views/BankCardMenu/BankCardMenu.vue")
	// },
	// {
	// 	path: "/GasStation",
	// 	component: () => import("../views/GasStation/GasStantion.vue")
	// },
	// {
	// 	path: "/inventory/:type",
	// 	component: () => import("../views/Inventory/Inventory-UI.vue"),
	// },
	// {
	// 	path: "/Admin/PlayerList",
	// 	component: () => import("../views/Admins/PlayerList/PlayerList.vue")
	// },
	// {
	// 	path: "/Admin/PlayerKills",
	// 	component: () => import("../views/Admins/PlayerKills/PlayerKills.vue")
	// },
	// {
	// 	path: "/Admin/PunishLog",
	// 	component: () => import("../views/Admins/PunishLog/PunishLog.vue")
	// },
	// {
	// 	path: "/BuyVehicleMenu",
	// 	component: () => import("../views/BuyVehicleMenu/BuyVehicleMenu.vue")
	// },
	// {
	// 	path: "/SellVehicleMenu",
	// 	component: () => import("../views/SellVehicleMenu/SellVehicleMenu.vue")
	// },
	// {
	// 	path: "/Authentication/Preload",
	// 	component: () => import("../views/Authentication/PreloadMenu/Preload/Preload.vue")
	// },
	// {
	// 	path: "/Authentication/EnterGame",
	// 	component: () => import("../views/Authentication/PreloadMenu/EnterGame/EnterGame.vue")
	// },
	// {
	// 	path: "/ExchangeMenu",
	// 	component: () => import("../views/Exchange/Exchange.vue")
	// }
	{
		path: '/market-place',
		component: () =>
			import('@/views/MarketPlace/MarketPlace.vue'),
		children: [
			{
				path: 'viewing/:section',
				props: true,
				component: () =>
					import(
						'@/views/MarketPlace/Pages/ListingsViewing.vue'
					),
				children: [
					{
						path: ':action',
						props: true,
						component: () =>
							import(
								'@/views/MarketPlace/Components/OpenedItem/OpenedItem.vue'
							),
					},
				],
			},
			{
				path: 'createListing/:filter',
				component: () =>
					import(
						'@/views/MarketPlace/Pages/CreateListing/CreateListing.vue'
					),
				children: [
					{
						path: ':type',
						props: true,
						component: () =>
							import(
								'@/views/MarketPlace/Pages/CreateListing/Components/ListingEditor/ListingEditor.vue'
							),
					},
				],
			},
		],
	},
]
const router = new VueRouter({
	routes
})
export default router

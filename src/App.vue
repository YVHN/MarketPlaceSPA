<template>
	<div id="app">
		<!-- <CustomAnimationMenu :activeCustomMenuAnimation="activeCustomMenuAnimation" />
		<InventoryEvents /> -->
		<div>
			<router-view :key="$route.fullPath">
			</router-view>
			<!-- <CircleMenu />
			<Hud :isOpenedHintsMenu="isOpenedHintsMenu" />
			<Report />
			<Sounds />
			<SoundAPI />
			<AimSetting />
			<Notify />
			<MusicPlayer />
			<KillList /> -->
		</div>
	</div>
</template>
<script>
import events from "./modules/events";

import "./fonts/PFDinDisplayPro/stylesheet.css";
import "./fonts/ProximaNova/stylesheet.css";
import "./fonts/montserrat/stylesheet.css";
import "./fonts/Trappist/stylesheet.css";
import "./fonts/Inter/stylesheet.css";
// import Report from "./views/Report/Report.vue";
// import Sounds from "./views/Sound/Sound.vue";
// import Hud from "./views/Hud/Hud.vue";
// import AimSetting from './views/HitAndScope/HitAndScope.vue';
// import Notify from './views/Hud/components/Announcements/Announcements.vue';
// import CircleMenu from './views/CircleMenu/CircleMenu.vue';
// import CustomAnimationMenu from './views/CustomAnimation/CustomAnimation.vue';
// import SoundAPI from './views/SoundAPI/SoundAPI.vue';
// import MusicPlayer from './views/VehicleMusic/MusicPlayer.vue';
// import KillList from './views/KillList/KillList.vue';
// import InventoryEvents from "./views/Inventory/inventory-events.vue";
export default {
	data() {
		return {
			isOpenedHintsMenu: true,
			activeCustomMenuAnimation: false,
		}
	},
	components: {
		// CustomAnimationMenu,
		// Report,
		// Sounds,
		// Hud,
		// AimSetting,
		// Notify,
		// CircleMenu,
		// SoundAPI,
		// MusicPlayer,
		// KillList,
		// InventoryEvents
	},
	created() {
		// this.$eventbus.$on("UpdateHintsMenu", () => this.isOpenedHintsMenu = !this.isOpenedHintsMenu);
		// this.$eventbus.$on("SetActiveHintsMenu", (state) => this.isOpenedHintsMenu = state);
		// events.add("SetStateCustomAnimation", (state) => {
		// 	this.activeCustomMenuAnimation = state
		// });
		// if (typeof mp != 'undefined') {
		// 	mp.events.add("TabletMenu:SetTabletClientData", (json) => this.$store.commit("setClientData", json));
		// 	mp.events.add("TabletMenu:SetTabletFractionData", (type, json) => this.$store.commit("setFractionData", { Type: type, Data: json }));
		// 	mp.events.add("TabletMenu:SetTabletBusinessData", (type, json) => this.$store.commit("setBusinessData", { Type: type, Data: json }));
		// 	mp.events.add("TabletMenu:SetTabletTaxiData", (type, json) => this.$store.commit("setTaxiData", { Type: type, Data: json }));
		// 	mp.events.add("TabletMenu:SetTabletHouseData", (type, json) => this.$store.commit("setHouseData", { Type: type, Data: json }));
		// 	mp.events.add("TabletMenu:GetTabletSettingClientData", () => this.$store.commit("saveClientUpdateData"));
		// 	mp.events.add("TabletMenu:SetTabletActivePage", (pageName) => this.$store.state.Tablet.CurrentPage = pageName);
		// 	mp.events.add("PlayerMenu:LoadFirstPlayerData:Cef", (json) => this.$store.commit("PlayerMenu_setPlayerFirstData", json));
		// 	mp.events.add("PlayerMenu:LoadPlayerAllData:Cef", (json) => this.$store.commit("PlayerMenu_setPlayerAllData", json));
		// 	mp.events.add("PlayerMenu:LoadPlayerSpendingList:Cef", (json) => this.$store.commit("PlayerMenu_setPlayerSpendingList", json));
		// 	events.add("App:ChangeLanguageType:Cef", (languageType) => this.$store.commit("App_setCurrentLanguage", languageType));
		// 	mp.trigger("SPAMenu:Vue:Ready:Client");
		// }
	},
	mounted() {
		// if (typeof mp != 'undefined' && !mp.dev) {
		// 	this.$router.push("/Authentication/Preload")
		// }
	}
}
</script>
<style>
body {
	overflow: hidden;
	color: #fff;
	margin: 0;
	padding: 0;
}

@font-face {
	font-family: 'PF DinDisplay Pro';
	src: url(./fonts/PFDinDisplayPro/PFDinDisplayPro-LightItalic.eot);
	font-weight: 300;
	font-style: italic;
	user-select: none;
}
</style>
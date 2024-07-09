import Vuex from "vuex";
//import StoreBattlePass from "./BattlePass";
//import _StoreCrosshairSettings from "./Crosshair/CrosshairMenu";
import Vue from "vue";
//import _PlayerMenuJobsStatistics from "./PlayerMenuJobsStatistics";
//import _StoreHud from "./Hud/Hud";
import _StoreMarketPlace from "./marketPlace";

Vue.use(Vuex)
class State {
	// battlePass = new StoreBattlePass();
	// crosshairMenu = new _StoreCrosshairSettings();
	// playerMenu = {
	// 	jobsStatistics: new _PlayerMenuJobsStatistics()
	// }
	// hud = new _StoreHud();
	marketPlace = new _StoreMarketPlace();
}

const state = new State();

export const store2 = new Vuex.Store({ state });
export const getStore = () => {
	return store2.state as State;
};
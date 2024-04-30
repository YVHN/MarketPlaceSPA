import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/views/MarketPlace/Assets/Fonts/PFDinDisplayPro/PFDinDisplayPro.scss';

import './functions/multilanguage'
// import "./functions/camera"
// import "./functions/functions"
// import "./functions/vehicle"
import "jquery-ui-dist/jquery-ui.js"
import events from '@/modules/events'

window.eventbus = new Vue();
Vue.prototype.$eventbus = window.eventbus;
Vue.config.productionTip = false
window.Application = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
window.router = window.Application.$router;
events.add("ChangeStateRouter", (page) => {
	if (window.router.currentRoute.path == page) return;
	window.router.push(page);
});
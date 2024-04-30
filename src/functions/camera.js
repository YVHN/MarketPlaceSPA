import Vue from 'vue'
Vue.prototype.$isEmpyZoneDOM = (targetId) => {
	const allId = [ "tattooShop", "creator", "clothes-shop-tag", "fractionchangeclothes", "backpack-shop" ];
	for (const id of allId) {
		if (id == targetId) {
			return true;
		}
	}
	return false;
}
let isCamera3DActive = false;
window.onmousedown = function (event) {
	if (event.target.tagName == "HTML" || Vue.prototype.$isEmpyZoneDOM(event.target.id)) {
		isCamera3DActive = true;
		mp.trigger('Camera3DActive::CLIENT');
	}
}
window.onmouseup = function () {
	if (isCamera3DActive == true) {
		mp.trigger('Camera3DInactive::CLIENT');
	}
	isCamera3DActive = false;
}
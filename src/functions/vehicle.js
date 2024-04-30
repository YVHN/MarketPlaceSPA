import Vue from 'vue'
import VehicleDetailsInfo from "../../../configServer/Vehicle/vehicleInfoList.json"

const getDefaultVehicleInfoArgs = (modelName) => {
    return {
        maxSpeed: 1050, // Максимальная скорость
        boost: 79, // Ускорение
        clutch: 50, // Сцепление
        controllability: 70, //Управляемость
        brakes: 30, // Тормозная система
        realName: modelName, // Реальное название
        vehicleClass: "Седан"
    }
}
Vue.prototype.$GetParamsVehicleByModelName = (modelName) => VehicleDetailsInfo[modelName] && VehicleDetailsInfo[modelName] || getDefaultVehicleInfoArgs(modelName);
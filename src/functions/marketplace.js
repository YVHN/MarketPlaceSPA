import store from "@/store";
export function getAddress() {
    const area = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(x, y, z));
    const adress = mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(
        x,
        y,
        z,
        0,
        0
    ).streetName);
    const addressHouse = area + " | " + adress;
    return addressHouse;
};

export function getEndTime(endItemTime) {
    const currentTime = new Date();
    const endTime = new Date(endItemTime);
    const differenceInMilliseconds = Math.abs(currentTime - endTime);

    if (differenceInMilliseconds) {
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        const showDays = days ? `${days} д. ` : '';
        const showHours = hours ? `${hours} ч. ` : '';
        const showMinutes = minutes ? `${minutes} м. ` : '';

        return `${showDays}${showHours}${showMinutes}`;
    } else {
        return 'Время недоступно';
    }
};

export function parseDate(dateString, type) {
    // Создание объекта Date из строки
    const date = new Date(dateString);

    // Извлечение компонентов даты и времени
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы считаются с 0
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Форматирование даты и времени
    if (type === 'default') return `${day}.${month} ${hours}:${minutes}`;
    else if (type === 'object') return {
        date: `${day}.${month}.${year}`,
        time: `${hours}:${minutes}`,
    };
};

export function formatNumber(num) {
    if (!num) return 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function getItemSubTitle(itemCard, section) {
    const isDefault = section === 'favorites' || section === 'auction';
    const item = itemCard.sellData;
    let subTitle = '';
    if (['house', 'apartment'].includes(item.type)) {
        subTitle = isDefault ? 'Недвижимость' : 'Адрес';
    } else if (item.type === 'business') {
        subTitle = isDefault ? 'Бизнес' : 'Адрес';
    } else if (['transportRent', 'transport'].includes(item.type)) {
        subTitle = isDefault ? 'Транспорт' : item.dealerShip;
    } else if (item.type === 'item') {
        subTitle = 'Разное';
    } else if (item.type === 'service') {
        subTitle = 'Услуги и прочее';
    } else if (item.type === 'clothes') {
        const categories = {
            '-1': 'Маска',
            '-3': 'Перчатки',
            '-4': 'Штаны',
            '-6': 'Ботинки',
            '-7': 'Ювелирка',
            '-8': 'Рубашка',
            '-9': 'Бронежилет',
            '-10': 'хз',
            '-11': 'Верх',
            '-12': 'Шляпа',
            '-13': 'Очки',
            '-14': 'Аксесcуары'
        }
        subTitle = categories[item.itemType] || '';
    }
    return subTitle;
};

export function getItemTitle(itemCard) {
    const item = itemCard.sellData;
    let title = '';
    if (item.type === 'house') {
       title = 'Дом'
    } else if(item.type === 'apartment') {
        title = 'Апартаменты'
    } else if (['transportRent', 'transport'].includes(item.type)) {
        title = item.vehicleName;
    } else if (item.type === 'item') {
        title = item.itemName;
    } else if (['business'].includes(item.type)) {
        const titles = {
            0: 'Магазин 24/7',
            1: 'Заправка',
            2: 'Автосалон Luxe',
            3: 'Автосалон Premium',
            4: 'Автосалон Econom',
            5: 'Мотосалон',
            6: 'Магазин оружия',
            7: 'Магазин одежды',
            9: 'Тату-Салон',
            10: 'Парикмахерская',
            12: 'LS Customs',
            13: 'Автомойка',
            15: 'Армейская заправка',
            16: 'Вертолетная заправка',
            25: 'Воздушный транспорт',
            26: 'Водный тра'
        }
        title = titles[item.businessType] || '';
    } else if (['clothes', 'item'].includes(item.type)) {
        title = item.itemName;
    } else if (item.type === 'service') {
        title = item.title;
    }
    if(['apartment', 'house', 'business'].includes(item.type)) {
        return `${store.getters.getLanguageText(title)} #${item.id}`;
    }
    return store.getters.getLanguageText(title);
};

export function setFieldValue(obj, fieldName, value) {
	// Проверяем, существует ли объект
	if (obj && typeof obj === "object") {
		// Проверяем, существует ли поле в текущем объекте
		if (fieldName in obj) {
			// Если поле является объектом, вызываем функцию рекурсивно
			if (typeof obj[fieldName] === "object") {
				setFieldValue(obj[fieldName], fieldName, value);
			} else {
				// Устанавливаем значение поля
				obj[fieldName] = value;
				console.log(`Значение поля ${fieldName} было успешно установлено: ${value}`);
			}
		} else {
			// Если поле отсутствует в текущем объекте, ищем во вложенных объектах
			for (let key in obj) {
				if (typeof obj[key] === "object") {
					setFieldValue(obj[key], fieldName, value);
				}
			}
		}
	} else {
		console.log(`Объект не существует или не является объектом.`);
	}
	console.log(obj);
}
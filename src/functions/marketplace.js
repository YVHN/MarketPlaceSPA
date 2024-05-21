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
}
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
}
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
}
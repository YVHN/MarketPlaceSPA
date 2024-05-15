export default function getAddress() {
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
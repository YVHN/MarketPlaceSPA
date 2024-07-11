export default {
    auction: [
        {
            id: 1,
            views: 200,
            likes: 100,
            isLiked: false,
            isFavorite: false,
            endTime: '2024-05-24T21:06:06.9686271+03:00',
            created: '2024-05-21T17:06:06.9686271+03:00',
            sellData: {
                id: 1,
                img: 'House123',
                type: 'house',
                description: '...',
                statePrice: 4300,
                address: 'VineWood, Baker.STR 23',
                parkingCapacity: 30,
                maxTenants: 12,
            },
            auctionData: {
                
            },
        },
        {
            id: 2,
            likes: 74,
            views: 38,
            isLiked: false,
            isFavorite: false,
            endTime: '2024-05-22T21:06:06.9686271+03:00',
            created: '2024-05-21T17:06:06.9686271+03:00',
            sellData: {
                img: 'image.png',
                vehicleName: 'W4 J82 Contention',
                vehicleModel: 'bmistralw16',
                type: 'transport',
                dealerShip: 'Хуй',
                competitors: 12,
                startPrice: 400000,
                licensePlate: 'XXXXXX',
                dealerShip: 'Ubermacht',
                mileage: 100,
            },
            auctionData: {
                lastBet: 1232,
                competitors: 3,
            },
        },
    ],
    estate: [
        {
            id: 20,
            views: 33,
            isFavorite: false,
            listingData: {},
            created: '11.04.2024 13:53',
            sellData: {
                id: 12,
                type: 'apartment',
                img: 'House123',

                price: 50000,
                parkingCapacity: 4,
                maxTenants: 1,
                coordinates: {
                    x: -1816.8712,
                    y: -636.77,
                    z: 9.818936
                }
            },
        },
    ],
    transport: [
        {
            id: 31,
            views: 10,
            isFavorite: false,
            listingData: {},
            sellData: {
                id: 54,
                vehicleName: 'Bugattи Roaдster',
                vehicleModel: 'bmistralw16',
                type: 'transportRent',
                img: 'image.png',
                description: '...',
                dealerShip: 'Хуй',
                price: 2000000,
            },
        },
    ],
    items: [
        {
            "id": 0,
            "sellData": {
                "type": "item",
                "img": null,
                "description": null,
                "weight": 0.01,
                "quantity": 4,
                "itemType": 599,
                "itemName": "Конфеты",
            },
            "views": 7,
            "isFavorite": true,
            "tradeData": {
                "startPrice": 500,
                "available": 55
            }
        },
        {
            "id": 0,
            "sellData": {
                "type": "itemWithData",
                "img": null,
                "description": "123",
                "weight": 5.0,
                "quantity": 1,
                "itemType": 603,
                "itemName": "Дефибриллятор",
                "price": 123123,
                "serial": "Families-II648KO-335969151",
                "spent": 15
            },
            "views": 1,
            "isFavorite": false,
            "created": "2024-07-07T15:35:21.1121881+03:00",
            "listingData": {
                "seller": {
                    "username": "Cherry Waves",
                    "static": 128683,
                    "phone": 233197770
                }
            },
            "endTime": "2024-07-13T01:35:21.1121881+03:00"
        },
        {
            "id": 24,
            "sellData": {
                "type": "armor",
                "img": null,
                "description": null,
                "variation": 61,
                "texture": 0,
                "itemType": -35,
                "itemName": "Бронежилет SWATPD",
                "price": 0,
                "state": 100
            },
            "status": "owned"
        }
    ],
    transportRent: [
        {
            id: 51,
            views: 10,
            isFavorite: false,
            listingData: {},
            sellData: {
                id: 54,
                vehicleName: 'Bugattи Roaдster',
                vehicleModel: 'bmistralw16',
                rentPrice: 0,
                mileage: 100,
                type: 'transportRent',
                img: 'image.png',
                description: '...',
            },
        },
    ],
    clothes: [
        {
            "id": 0,
            "sellData": {
                "type": "clothes",
                itemName: 'Лупа',
                "img": null,
                "description": "1",
                "price": 1000,
                "variation": 277,
                "texture": 0,
                "gender": false,
                "itemType": -6,
                gender: 0,
            },
            "views": 2,
            "isFavorite": false,
            "created": "2024-05-27T13:08:27.2905118+03:00",
            "listingData": {
                "seller": {
                    "username": "Cherry_Waves",
                    "static": 128683,
                    "phone": 233197770
                }
            },
            "endTime": "2024-05-27T14:08:27.2905118+03:00"
        }
    ],
    services: [
        {
            "id": 22,
            "sellData": {
                "type": "service",
                "img": null,
                "description": "testing",
                "title": "testing"
            },
            "views": 1,
            "isFavorite": false,
            "created": "2024-06-28T19:31:50.4238053+03:00",
            "listingData": {
                "seller": {
                    "username": "Cherry Waves",
                    "static": 128683,
                    "phone": 233197770
                }
            },
            "endTime": "2024-06-30T21:31:50.4238053+03:00"
        }
    ],
    business: [
        {
            "id": 96,
            "sellData": {
                "type": "business",
                "img": null,
                "description": "123",
                "id": 465,
                "businessType": 1,
                "price": 123123123123,
                "statePrice": 0,
                "coordinates": {
                    "x": 496.329,
                    "y": 2179.589,
                    "z": 80.45463
                },
                "address": ""
            },
            "views": 3,
            "isFavorite": false,
            "listingData": {},
            "endTime": "2024-07-12T01:03:21.9226212+03:00"
        }
    ],
    storage: [
        {
            id: 11,
            sellData: {
                itemName: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 15,
                weight: 12,
            },
            storageData: {
                added: "2024-05-31T11:44:23.9085336+03:00",
                endTime: '2024-05-22T21:06:06.9686271+03:00'
            },
        },
        {
            id: 0,
            sellData: {
                type: "transportRent",
                img: null,
                description: "1",
                dealerShip: 'Это аренда',
                id: 923471,
                vehicleName: "Ferari Daytona",
                vehicleModel: "daytona",
                rentPrice: 100000,
                rentTime: 60
            },
            storageData: {
                added: "2024-05-31T11:44:23.9085336+03:00",
                endTime: "2024-06-04T11:44:23.9085336+03:00"
            }
        }
        // {
        //     id: 40,
        //     sellData: {
        //         id: 12,
        //         img: 'W4J82Contention',
        //         vehicleName: 'Буба лупа V8',
        //         vehicleModel: 'W4 J82 Contention',
        //         type: 'transport',
        //         dealerShip: 'Ubermacht',
        //         quantity: 3,
        //         mileage: 100,
        //     },
        //     storageData: {
        //         endTime: '15.05.2024 15:50',
        //     },
        // },
        // {
        //     id: 13,
        //     sellData: {
        //         id: 3,
        //         type: 'house',
        //         img: 'House123',
        //         address: 'Хабибовна 33',
        //         parkingCapacity: 6,
        //         maxTenants: 3,
        //     },
        //     storageData: {
        //         endTime: '15.05.2024 15:51',
        //     },
        // },
    ],
    favorites: [
        {
            id: 31,
            views: 10,
            isFavorite: false,
            listingData: {},
            sellData: {
                id: 54,
                vehicleName: 'Bugattи Roaдster',
                vehicleModel: 'bmistralw16',
                type: 'transportRent',
                img: 'image.png',
                description: '...',
                dealerShip: 'Хуй',
                price: 2000000,
                mileage: 100,
            },
        },
        {
            id: 20,
            views: 33,
            isFavorite: false,
            listingData: {},
            created: '11.04.2024 13:53',
            sellData: {
                id: 12,
                type: 'house',
                img: 'House123',
                address: 'Хабибовна 33',
                price: 50000,
                parkingCapacity: 4,
                maxTenants: 1,
                coordinates: {
                    x: -1816.8712,
                    y: -636.77,
                    z: 9.818936
                }
            },
        },
    ],
    listings: [
        {
            "id": 1,
            "sellData": {
                "type": "weapon",
                "img": null,
                "description": "123",
                "state": 100,
                "itemType": 128,
                "itemName": "Advanced Rifle",
                "price": 123,
                "serial": "GUNSHOP-LM203E-335969151",
                "weight": 3.85
            },
            "isOwner": true
        },
        {
            "id": 12,
            "sellData": {
                "type": "item",
                "img": null,
                "description": null,
                "weight": 0.01,
                "quantity": 4,
                "itemType": 599,
                "itemName": "Конфеты",
            },
            "views": 7,
            "isFavorite": true,
            "isOwner": true
        },
        {
            id: 33,
            views: 200,
            likes: 100,
            isLiked: false,
            isFavorite: false,
            endTime: '2024-05-24T21:06:06.9686271+03:00',
            created: '2024-05-21T17:06:06.9686271+03:00',
            sellData: {
                id: 1,
                img: 'House123',
                type: 'house',
                description: '...',
                statePrice: 4300,
                address: 'VineWood, Baker.STR 23',
                parkingCapacity: 30,
                maxTenants: 12,
            },
            auctionData: {
                pupa: 32,
            },
            "isOwner": true
        },
    ],
    history: [
        {
            id: 11,
            sellData: {
                itemName: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 15,
                weight: 12,
                price: 3000,
            },
        },
        {
            id: 0,
            sellData: {
                type: "transportRent",
                img: null,
                description: "1",
                dealerShip: 'Это аренда',
                id: 923471,
                vehicleName: "Ferari Daytona",
                vehicleModel: "daytona",
                rentPrice: 100000,
                rentTime: 60
            },
        }
    ],
    createListing: [
        {
            id: 12,
            sellData: {
                id: 44,
                type: 'house',
                img: 'House123',
                parkingCapacity: 6,
                maxTenants: 3,
                address: 'Хабибовна 33',
            },
            status: 'owned',
        },
        {
            "id": 88,
            "sellData": {
                "type": "weapon",
                "img": null,
                "description": null,
                "weight": 4.0,
                "serial": "GUNSHOP-AJ397D-335969151",
                "state": 60,
                "itemType": 111,
                "itemName": "Double Action",
                "price": 0
            },
            "status": "owned"
        },
        {
            "id": 14,
            "sellData": {
                "type": "transport",
                "img": null,
                "description": "0",
                "id": 923471,
                "vehicleModel": "daytona",
                "vehicleName": "Ferari Daytona",
                "licensePlace": "",
                "dealerShip": null,
                "specifications": {
                    "engine": 0,
                    "brake": 0,
                    "suspencion": 0,
                    "turbine": 0
                },
                "price": 1000000,
                "statePrice": 321312,
            },
            "views": 4,
            "isFavorite": false,
            "created": "2024-06-12T20:21:25.6750976+03:00",
            "listingData": {
                "seller": {
                    "username": "Cherry Waves",
                    "static": 128683,
                    "phone": 233197770
                }
            },
            "endTime": "2024-06-12T21:21:25.6750976+03:00"
        },
        {
            id: 77,
            sellData: {
                itemName: 'Хранилище данных - 12 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 43,
            },
            status: 'storage',
        },
        {
            id: 7,
            sellData: {
                id: 12,
                type: 'business',
                img: null,
                description: null,
                price: 0,
                businessType: 1,
                address: 'Пушкинская 13',
                statePrice: 1200,
            },
            status: 'storage'
        }
    ],
    ammunition:  [
        {
          "id": 16,
          "sellData": {
            "type": "weaponComponent",
            "img": null,
            "description": "good component",
            "componentKey": "flashlight",
            "componentChildKey": null,
            "itemType": 740,
            "itemName": "Компонент оружия",
            "price": 10000,
            "state": 100
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-15T07:34:37.3018044+03:00"
        },
        {
          "id": 17,
          "sellData": {
            "type": "weaponComponent",
            "img": null,
            "description": "good component",
            "componentKey": "butt",
            "componentChildKey": null,
            "itemType": 740,
            "itemName": "Компонент оружия",
            "price": 10000,
            "state": 100
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-15T07:34:44.4161429+03:00"
        },
        {
          "id": 25,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "good gun",
            "state": 100,
            "itemType": 100,
            "itemName": "Pistol",
            "price": 10000,
            "serial": "GUNSHOP-EA590O-335969151",
            "weight": 2.5
          },
          "views": 4,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-15T07:35:28.2286844+03:00"
        },
        {
          "id": 63,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 111,
            "itemName": "Double Action",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 4.0
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:14.5612739+03:00"
        },
        {
          "id": 64,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 130,
            "itemName": "Bullpup Rifle",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 3.87
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:22.2431566+03:00"
        },
        {
          "id": 65,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 118,
            "itemName": "Assault SMG",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 3.35
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:30.6010048+03:00"
        },
        {
          "id": 66,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 112,
            "itemName": "Pistol Mk2",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 2.0
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:37.7437641+03:00"
        },
        {
          "id": 67,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 102,
            "itemName": "Pistol 50",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 2.75
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:43.5108843+03:00"
        },
        {
          "id": 68,
          "sellData": {
            "type": "weapon",
            "img": null,
            "description": "test",
            "state": 100,
            "itemType": 105,
            "itemName": "Vintage Pistol",
            "price": 2500000,
            "serial": "0_0_100",
            "weight": 4.0
          },
          "views": 0,
          "isFavorite": false,
          "listingData": {},
          "endTime": "2024-07-16T21:00:50.0597485+03:00"
        },
        {
          "id": 18,
          "sellData": {
            "type": "item",
            "img": null,
            "description": null,
            "weight": 0.1,
            "itemType": 203,
            "itemName": ".50 BMG",
            "price": 0,
            "quantity": 1
          },
          "views": 2,
          "isFavorite": false,
          "tradeData": {
            "startPrice": 999,
            "available": 10
          }
        },
        {
          "id": 19,
          "sellData": {
            "type": "item",
            "img": null,
            "description": null,
            "weight": 0.03,
            "itemType": 204,
            "itemName": "12ga Buckshot",
            "price": 0,
            "quantity": 1
          },
          "views": 0,
          "isFavorite": false,
          "tradeData": {
            "startPrice": 99,
            "available": 8
          }
        },
        {
          "id": 20,
          "sellData": {
            "type": "item",
            "img": null,
            "description": null,
            "weight": 0.05,
            "itemType": 202,
            "itemName": "7.62mm",
            "price": 0,
            "quantity": 1
          },
          "views": 0,
          "isFavorite": false,
          "tradeData": {
            "startPrice": 999,
            "available": 30
          }
        },
        {
          "id": 21,
          "sellData": {
            "type": "item",
            "img": null,
            "description": null,
            "weight": 0.035,
            "itemType": 201,
            "itemName": "5x56mm",
            "price": 0,
            "quantity": 1
          },
          "views": 0,
          "isFavorite": false,
          "tradeData": {
            "startPrice": 999,
            "available": 30
          }
        },
        {
          "id": 22,
          "sellData": {
            "type": "item",
            "img": null,
            "description": null,
            "weight": 0.025,
            "itemType": 200,
            "itemName": "9x19mm",
            "price": 0,
            "quantity": 1
          },
          "views": 1,
          "isFavorite": false,
          "tradeData": {
            "startPrice": 999,
            "available": 12
          }
        }
      ]
};
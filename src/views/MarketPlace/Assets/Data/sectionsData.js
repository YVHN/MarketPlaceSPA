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
                id: 666,
                img: 'House123',
                type: 'house',
                description: '...',
                statePrice: 4300,
                address: 'VineWood, Baker.STR 23',
                parkingCapacity: 30,
                maxTenants: 12,
            },
            auctionData: {
                lastBet: 666666,
                competitors: 6,
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
                mileage: 100,
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
              "weight": 0.4,
              "itemType": 599,
              "itemName": "Конфеты",
            },
            "views": 0,
            "isFavorite": false,
            "created": "0001-01-01T00:00:00",
            "tradeData": {
              "startPrice": 100,
              "available": 310,
              "offers": [
                {
                  "id": 0,
                  "playerData": {
                    "username": "Cherry_Waves",
                    "static": 128683,
                    "phone": 233197770
                  },
                  "quantity": 20,
                  "pricePerItem": 1000
                },
                {
                  "id": 1,
                  "playerData": {
                    "username": "Cherry Waves",
                    "static": 128683,
                    "phone": 233197770
                  },
                  "quantity": 20,
                  "pricePerItem": 1000
                },
                {
                  "id": 2,
                  "playerData": {
                    "username": "Cherry Waves",
                    "static": 128683,
                    "phone": 233197770
                  },
                  "quantity": 10,
                  "pricePerItem": 100
                }
              ],
              
            }
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
                "itemType": -6
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
    services: [],
    business: [],
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
    userListings: [],
    history: [],
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
            id: 5,
            sellData: {
                img: 'W4J82Contention',
                vehicleName: 'Bugattи Roadstrer',
                vehicleModel: 'bmistralw16',
                type: 'transport',
                dealerShip: 'Ubermacht',
                "specifications": {
                    "engine": 0,
                    "brake": 0,
                    "suspencion": 12,
                    "turbine": 0
                },
                mileage: 66,
            },
            status: 'storage',
        },
        {
            id: 2,
            sellData: {
                itemName: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 1,
            },
            status: 'storage',
        },
        {
            id: 14,
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
};
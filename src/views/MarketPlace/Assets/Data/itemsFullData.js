export default {
    auction: [
        {
            "id": 4,
            "sellData": {
                "type": "apartment",
                "img": null,
                "description": null,
                "id": 1,
                "apartmentType": "Комфорт",
                "parkingCapacity": 6,
                "maxTenants": 4,
                "coordinates": {
                    "x": 1553.0693,
                    "y": 3689.9731,
                    "z": 34.556717
                },
                "price": 0,
                "statePrice": 90000000
            },
            "views": 1,
            "isFavorite": false,
            "created": "2024-06-12T20:01:32.0033998+03:00",
            "endTime": "2024-06-13T20:01:32.0033998+03:00",
            "likes": 12,
            "isLiked": false,
            "auctionData": {
                "lastBet": 90000000,
                "competitors": 0,
                graphData: {
                    type: 'year',
                    data: [
                        {
                            date: '2024-06-12T20:01:32',
                            amount: 1232,
                        },
                        {
                            date: '2024-12-12T20:01:32',
                            amount: 1232,
                        },
                    ]
                },
                "offers": [
                    {
                        playerData: {
                            username: 'Maneskin Benson32113132312',
                            static: 123,
                        },
                        bet: 74300,
                        created: '2024-05-24T21:06:06.9686271+03:00',
                    },
                    {
                        playerData: {
                            username: 'Maneskin Benson32113132312',
                            static: 123,
                        },
                        bet: 74300,
                        created: '2024-05-24T21:06:06.9686271+03:00',
                    },
                ]
            },
        }
    ],
    exchange: [
        {
            id: 40,
            isFavorite: false,
            sellData: {
                itemType: 2,
                img: 'DataStorage16TB',
                title: 'Хранилище данных - 16 TB',
                type: 'item',
                weight: 123,
                description:
                    'На этом жестком диске хранятся зашифроманные данные, которые вы можете передать или продать.',
            },
            tradeData: {
                startPrice: 7000,
                available: 100,
                graphData: {
                    type: 'month',
                    data: [
                        {
                            date: '2024-06-12T20:01:32',
                            amount: 1232,
                        },
                        {
                            date: '2024-12-12T20:01:32',
                            amount: 1232,
                        },
                    ]
                },
                offers: [
                    {
                        id: 1,
                        playerData: {
                            username: 'Maneskin Benson',
                            static: '123',
                        },
                        state: 'Отличное',
                        quantity: 123,
                        pricePerItem: 7000,
                        endTime: '2024-06-24T21:06:06.9686271+03:00',
                    },
                ],
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
    listings: [
        {
            id: 20,
            views: 59,
            created: '11.04.2024 13:53',
            isFavorite: false,
            sellData: {
                id: 777,
                type: 'house',
                img: 'House123',
                address: 'Хабибовна 33',
                description: 'буба',
                price: 50000,
                statePrice: 30000,
                parkingCapacity: 4,
                maxTenants: 1,
            },
            listingData: {
                seller: {
                    username: 'First_Last',
                    static: 666666,
                    phone: null,
                }
            },
        },
        {
            id: 31,
            views: 20,
            isFavorite: false,
            created: '16.04.2024 14:59:25',
            listingData: {
                seller: {
                    username: 'First_Last',
                    static: 666666,
                    phone: null,
                },
            },
            sellData: {
                id: 18,
                vehicleModel: 'Mcлaren Seннa',
                vehicleName: 'senna',
                statePrice: 1000000,
                mileage: 100,
                specifications: {
                    acceleration: '56',
                    clutch: '23',
                    controllability: '40',
                    speed: '138',
                },
                type: 'transport',
                img: 'image.png',
                description: '...',
                price: 2000000,
            },
        },
        {
            id: 51,
            views: 10,
            isFavorite: false,
            created: '16.04.2024 14:59:25',
            listingData: {
                seller: {
                    username: 'First_Last',
                    static: 666666,
                    phone: null,
                },
            },
            sellData: {
                id: 54,
                vehicleName: 'Bugattи Roaдster',
                vehicleModel: 'bmistralw16',
                rentPrice: 10,
                specifications: {
                    acceleration: '56',
                    clutch: '23',
                    controllability: '40',
                    speed: '138',
                },
                type: 'transportRent',
                img: 'image.png',
                description: '...',
                price: 2000000,
            },
        },
    ],
    transport: [
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
                rentPrice: 23131,
                "specifications": {
                    "engine": 0,
                    "brake": 0,
                    "suspencion": 0,
                    "turbine": 0
                },
                "price": 1000000,
                "statePrice": 32131
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
            "id": 1,
            "sellData": {
                "type": "apartment",
                "img": null,
                "description": null,
                "id": 1,
                "apartmentType": "Комфорт",
                "parkingCapacity": 6,
                "maxTenants": 4,
                "coordinates": {
                    "x": 1553.0693,
                    "y": 3689.9731,
                    "z": 34.556717
                },
                "price": 0,
                "statePrice": 90000000
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
    ],
    estate: [
        {
            "id": 1,
            "sellData": {
                "type": "apartment",
                "img": null,
                "description": null,
                "id": 1,
                "apartmentType": "Комфорт",
                "parkingCapacity": 6,
                "maxTenants": 4,
                "coordinates": {
                    "x": 1553.0693,
                    "y": 3689.9731,
                    "z": 34.556717
                },
                "price": 0,
                "statePrice": 90000000
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
    ]
};
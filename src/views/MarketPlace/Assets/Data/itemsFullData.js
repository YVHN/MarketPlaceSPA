export default itemsData = {
    auction: [
        {
            "id": 1,
            "sellData": {
                "type": "transport",
                "img": null,
                "description": "test",
                "price": 0,
                "id": 923260,
                "vehicleModel": "daytona",
                "vehicleName": "Ferari Daytona",
                "statePrice": 0,
                "specifications": {}
            },
            "views": 0,
            "isFavorite": false,
            "created": "02.05.2024 16:16:39",
            "endTime": "02.05.2024 21:16:39",
            "likes": 0,
            "isLiked": false,
            "auctionData": {
                "seller": {
                    "username": "Cherry_Waves",
                    "static": 128683,
                    "phone": 233197770
                },
                "lastBet": 1000000,
                "competitors": 0,
                "offers": []
            },
            "sales": []
        },
        {
            id: 2,
            likes: 123,
            views: 321,
            isLiked: false,
            isFavorite: false,
            created: '11.04.2024 13:53',
            endTime: '15.04.2024 15:53',
            sellData: {
                img: 'W4J82Contention',
                model: 'W4 J82 Contention',
                type: 'transport',
                licensePlate: 'XXXXXX',
                dealerShip: 'Ubermacht',
                tuningStatus: 'Отличное',
                mileage: 100,
                weight: 100,
                statePrice: 12312,
                description: 'biba ;ipa',
                specifications: {
                    acceleration: 56,
                    clutch: 23,
                    controllability: 40,
                    speed: 130,
                },
            },
            auctionData: {
                competitors: 7,
                lastBet: 50000,
                offers: [
                    {
                        playerData: {
                            username: 'Maneskin Benson',
                            static: 123,
                        },
                        bet: 74300,
                        created: '11.04.2024 18:31',
                    },
                ],
            },
        },
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
                graphStat: [
                    {
                        date: 'Апрель',
                        amount: 1232,
                    },
                ],
                offers: [
                    {
                        id: 21,
                        playerData: {
                            username: 'Maneskin Benson',
                            static: '123',
                        },
                        state: 'Отличное',
                        quantity: 123,
                        pricePerItem: 7000,
                        created: '15.04.2024 16:05',
                    },
                ],
            },
        },
    ],
    items: [
        {
            id: 5,
            img: 'W4J82Contention',
            model: 'W4 J82 Contention',
            type: 'transport',
            licensePlate: 'XXXXXX',
            dealerShip: 'Ubermacht',
            tuningStatus: 'Отличное',
            mileage: 100,
            weight: 100,
            statePrice: 12312,
            specifications: {
                acceleration: 56,
                clutch: 23,
                controllability: 40,
                speed: 130,
            },
        },
        {
            id: 12,
            type: 'house',
            img: 'House123',
            address: 'Хабибовна 33',
            statePrice: 12322,
            parkingCapacity: 4,
            maxTenants: 1,
        },
    ],
    listings: [
        {
            id: 20,
            views: 59,
            created: '11.04.2024 13:53',
            sellData: {
                id: 12,
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
                    phone: '666-666-666',
                },
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
};
export default {
    auction: [
        {
            id: 1,
            views: 200,
            likes: 100,
            isLiked: false,
            isFavorite: false,
            endTime: '15.04.2024 18:55',
            created: '11.04.2024 13:53',
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
            created: '11.04.2024 13:53',
            endTime: '15.04.2024 15:53',
            sellData: {
                img: 'image.png',
                vehicleName: 'W4 J82 Contention',
                type: 'transport',
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
                price: 2000000,
                mileage: 100,
            },
        },
    ],
    items: [
        {
            id: 40,
            isFavorite: false,
            sellData: {
                title: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                type: 'item',
                category: 'different',
            },
            tradeData: {
                startPrice: 5620,
                available: 4321,
            },
        },
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
    clothes: [],
    services: [],
    business: [],
    storage: [
        {
            id: 11,
            sellData: {
                title: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 15,
                weight: 12,
            },
            storageData: {
                endTime: '15.05.2024 16:13'
            },
        },
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
    favorites: [],
    userListings: [],
    history: [],
    createListing: [
        {
            id: 12,
            sellData: {
                id: 10,
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
                vehicleName: 'Bugattи Roadster',
                vehicleModel: 'bmistralw16',
                type: 'transport',
                dealerShip: 'Ubermacht',
                specifications: {
                    acceleration: 56,
                    clutch: 23,
                    controllability: 40,
                    speed: 130,
                },
                mileage: 66,
            },
            status: 'storage',
        },
        {
            id: 2,
            sellData: {
                title: 'Хранилище данных - 16 TB',
                img: 'DataStorage16TB',
                state: 'Отличное',
                type: 'item',
                itemType: 4,
                quantity: 3,
            },
            status: 'storage',
        },
        {
            id: 14,
            sellData: {
                type: 'business',
                img: null,
                description: null,
                price: 0,
                businessId: 12,
                businessType: 1,
                address: 'Пушкинская 13',
                statePrice: 1200,
            },
            status: 'storage'
        }
    ],
};
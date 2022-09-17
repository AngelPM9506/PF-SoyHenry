import prisma from "src/utils/prisma";
import cloudinary from "src/utils/cloudinary";
import {
    typeSort,
    condition,
    createActivities,
    createCity,
    createUsers,
} from "src/utils/interface";
const { CLOUDINARY_PRESET_TRIPS } = process.env;

type query = {
    id?: string | string[];
    wName?: string | string[];
    sort?: string | string[];
    sortBy?: string | string[];
    wActivity?: string | string[];
    wplanner?: string | string[];
    wCity?: string | string[];
    maxPrice?: string | string[];
};

type body = {
    name?: string;
    initDate?: Date;
    endDate?: Date;
    planner?: string;
    description?: string;
    price?: number;
    activitiesName?: string[];
    image?: string;
    cities?: string[];
    active?: any;
    traveler?: string | string[];
    idPartaker?: string[];
};

const uploadImage = async (image: string, name: string) => {
    let resp = await cloudinary.uploader.upload(
        image,
        {
            upload_preset: CLOUDINARY_PRESET_TRIPS,
            public_id: `${name}-image:${Date.now()}`,
            allowed_formats: ["png", "jpg", "jpeg", "jfif", "gif"],
        },
        function (error: any, result: any) {
            if (error) console.log(error);
            console.log(result);
        }
    );
    return resp;
};

const TripsControllers = {
    getTrips: async (query: query) => {
        let { wName, sort, sortBy, wActivity, wplanner, wCity, maxPrice } = query;

        let orderBy: typeSort[] = [];
        let sortfrom: typeSort = {};
        /**
         * http://127.0.0.1:3000/api/trips?sort=asc&sortBy=price&wName=10&wplanner=cl7z6as0h01100cqiw589yste&maxPrice=7&wActivity=uno&wCity=Mex*/
        let sortName: string = sortBy ? sortBy.toString().toLowerCase() : "name";
        sortfrom[sortName] = sort ? sort.toString().toLowerCase() : "desc";
        orderBy.push(sortfrom);
        var condition: condition = {
            where: wName ? { name: { contains: wName.toString() } } : {},
            include: {
                planner: true,
                tripOnUser: {
                    include: { user: true, trip: true },
                },
                activitiesOnTrips: {
                    include: { activity: true },
                },
                citiesOnTrips: {
                    include: { city: true },
                },
            },
            orderBy,
        };

        wplanner
            ? (condition.where = {
                ...condition.where,
                planner: { is: { id: wplanner.toString() } },
            })
            : "";
        wActivity
            ? (condition.where = {
                ...condition.where,
                activitiesOnTrips: {
                    some: {
                        activity: {
                            is: {
                                name: {
                                    contains: wActivity.toString(),
                                },
                            },
                        },
                    },
                },
            })
            : "";
        wCity
            ? (condition.where = {
                citiesOnTrips: {
                    some: {
                        city: {
                            is: {
                                name: {
                                    contains: wCity.toString(),
                                },
                            },
                        },
                    },
                },
            })
            : "";

        maxPrice
            ? (condition.where = {
                ...condition.where,
                price: { lte: parseFloat(maxPrice.toString()) },
            })
            : "";

        const response = await prisma.trip.findMany(condition);
        return response;
    },
    postTrip: async (body: body) => {
        const { name, initDate, endDate, planner, description, price, activitiesName, image, cities, } = body;
        if (
            !name || !initDate || !image || !endDate || !description || !price || !planner || !activitiesName || !cities ||
            !Array.isArray(activitiesName) || !Array.isArray(cities)
        ) { throw new Error("Missing or invalid data, try again"); }

        let initialDate = new Date(initDate);
        let finishDate = new Date(endDate);

        // idPartaker,
        // (idPartaker && !Array.isArray(idPartaker)) ||
        // let createUsers: createUsers[] = idPartaker ? idPartaker.map((idP: string) => {
        //     return {
        //         user: {
        //             connect: {
        //                 id: idP.toString()
        //             }
        //         }
        //     }
        // }) : [];
        // tripOnUser: { create: createUsers },
        // tripOnUser: {
        //     include: { user: true, trip: true }
        // },

        let createActivities: createActivities[] = activitiesName
            ? activitiesName.map((nameAct: string) => {
                return { activity: { connect: { name: nameAct, }, }, };
            }) : [];

        let createCities: createCity[] = cities
            ? cities.map((nameCity: string) => {
                return { city: { connect: { name: nameCity.toString(), }, }, };
            }) : [];

        let uploadedImage = await uploadImage(image, name.toString());

        let condition = {
            data: {
                name: name.toLowerCase(),
                initDate: initialDate,
                endDate: finishDate,
                description: description,
                price: price,
                plannerId: planner,
                image: uploadedImage.secure_url,
                public_id_image: uploadedImage.public_id,
                activitiesOnTrips: { create: createActivities },
                citiesOnTrips: { create: createCities },
            },
            include: {
                planner: true,
                activitiesOnTrips: {
                    include: { activity: true },
                },
                citiesOnTrips: {
                    include: { city: true },
                },
            },
        }
        try {
            const response = await prisma.trip.create(condition);
            //console.log(response);
            return response;
        } catch (error) {
            //console.log(error);
            return error;
        }

        /** Forma en la que se envia la informasión
         * idPartaker se queda comentado 
         * activitiesName y citiesName es necesario contar con almenos uno
             {
                "name": "Trip de pruebas",
                "initDate": "2022-06-15",
                "endDate": "2022-12-12",
                "planner": "cl82bc4ow0091auqirz3xjdxv",
                "description": "Pruebas...",
                "price": 15.30,
                "image": "Pruebas de imagen",
                "activitiesName": ["Chichen Itza"],
                "cities": ["Toluca"]
            }
        */
    },
    getTrip: async (query: query) => {
        const { id } = query;

        let condition = {
            where: {
                id: id.toString(),
            },
            include: {
                planner: true,
                tripOnUser: {
                    include: { user: true },
                },
                activitiesOnTrips: {
                    include: { activity: true },
                },
                citiesOnTrips: {
                    include: { city: true },
                },
            },
        };
        let response = await prisma.trip.findUnique(condition);
        return response;
    },
    putTrip: async (body: body, query: query) => {
        const {
            description,
            active,
            traveler,
            idPartaker,
            activitiesName,
            cities,
            image,
        } = body;
        const { id } = query;

        if (!active && !description && !traveler)
            throw new Error("Missing data try again");

        let createUsers: createUsers[] =
            idPartaker && Array.isArray(idPartaker)
                ? idPartaker.map((idP: string) => {
                    return {
                        user: {
                            connect: {
                                id: idP.toString(),
                            },
                        },
                    };
                })
                : [];

        let createActivities: createActivities[] = activitiesName
            ? activitiesName.map((nameAct: string) => {
                return {
                    activity: {
                        connect: {
                            name: nameAct,
                        },
                    },
                };
            })
            : [];

        let createCities: createCity[] = cities
            ? cities.map((nameCity: string) => {
                return {
                    city: {
                        connect: {
                            name: nameCity.toString(),
                        },
                    },
                };
            })
            : [];

        let trip = await prisma.trip.findUnique({ where: { id: id.toString() } });
        if (!trip) throw new Error("Trip not found, try again");

        let condition = {
            where: {
                id: id.toString(),
            },
            data: {
                description: description ? description : trip.description,
                active: trip.active ? false : true,
                tripOnUser: { create: createUsers },
                image: trip.image,
                public_id_image: trip.public_id_image,
                activitiesOnTrips: { create: createActivities },
                citiesOnTrips: { create: createCities },
            },
            include: {
                planner: true,
                tripOnUser: {
                    include: { user: true, trip: true },
                },
                activitiesOnTrips: {
                    include: { activity: true },
                },
                citiesOnTrips: {
                    include: { city: true },
                },
            },
        };

        if (image) {
            let uploadedImage = await uploadImage(image, trip.name);

            condition.data.image = uploadedImage.secure_url;
            condition.data.public_id_image = uploadedImage.public_id;
        }

        if (active !== undefined) return await prisma.trip.update(condition);
        else {
            delete condition.data.active;
            return await prisma.trip.update(condition);
        }
    },
};

export default TripsControllers;

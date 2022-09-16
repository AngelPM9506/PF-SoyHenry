import { typeSort, condition, Activity, weekdays } from 'src/utils/interface';
import prisma from 'src/utils/prisma';
import cloudinary from 'src/utils/cloudinary';
const { CLOUDINARY_PRESET_ACTIVITIES } = process.env;

type query = {
    wName?: string | string[];
    sort?: string | string[];
    sortBy?: string | string[];
    wCity?: string | string[];
    maxPrice?: string | string[];
}

type body = {
    name?: string | string[]
    availability?: any
    description?: string | string[]
    price?: string
    cityName?: string | string[]
    image?: string
}
type post = {
    data: {
        name: string,
        availability: string[],
        description: string,
        price: string,
        image: string,
        city: object
    };
    include?: object;
}

const ActivitiesControles = {
    getActivities: async (query: query) => {
        let { wName, sort, sortBy, wCity, maxPrice } = query;
        let orderBy: typeSort[] = [];
        let sortfrom: typeSort = {};
        /**http://127.0.0.1:3000/api/activities?sort=asc&sortBy=price&wName=nadar&wCity=Dubai&maxPrice=60*/
        let sortName: string = sortBy ? sortBy.toString().toLowerCase() : 'name';
        sortfrom[sortName] = sort ? sort.toString().toLowerCase() : 'desc';
        orderBy.push(sortfrom);

        let condition: condition = {
            where: wName ? { name: { contains: wName.toString() } } : {},
            include: { city: true },
            orderBy,
        };

        wCity ? (condition.where = {
            ...condition.where,
            city: { is: { name: { contains: wCity.toString() } } },
        }) : '';

        maxPrice ? (condition.where = {
            ...condition.where,
            price: { lte: parseFloat(maxPrice.toString()) },
        }) : '';

        var responseG = await prisma.activity.findMany(condition);
        return responseG;
    },
    postActivity: async (body: body) => {
        /**Comprobar que existan los argumentos y que availability este en el enum*/
        try {
            let { name, availability, description, price, cityName, image } = body;
            if (
                !name || !availability || !description || !price || !cityName || !image
            ) { return { status: 'error', msg: 'Missing data, try again' } }

            const uploadImage = await cloudinary.uploader.upload(image,
                {
                    upload_preset: CLOUDINARY_PRESET_ACTIVITIES,
                    public_id: `${name}-image:${Date.now()}`,
                    allowed_formats: ['png', 'jpg', 'jpeg', 'jfif', 'gif']
                },
                function (error: any, result: any) {
                    if (error) console.log(error);
                    console.log(result);
                });

            let activity = {
                data: {
                    name: name.toString(),
                    availability: availability,
                    description: description.toString(),
                    price: parseFloat(price),
                    image: uploadImage.secure_url,
                    public_id_image: uploadImage.public_id,
                    city: { connect: { name: cityName.toString() } }
                },
                include: { city: true }
            };
            var responseP = await prisma.activity.create(activity);
            return responseP;
        } catch (error) {
            return { status: 'error', error }
        }
    }
}
export default ActivitiesControles
import {
  typeSort,
  condition,
  Activity,
  weekdays,
  createComment,
} from "src/utils/interface";
import prisma from "src/utils/prisma";
import cloudinary from "src/utils/cloudinary";
const { CLOUDINARY_PRESET_ACTIVITIES } = process.env;

type query = {
  id?: string | string[];
  wName?: string | string[];
  sort?: string | string[];
  sortBy?: string | string[];
  wCity?: string | string[];
  maxPrice?: string | string[];
  idFeedback?: String;
  byName?: String | String[];
};

type body = {
  name?: string | string[];
  availability?: any;
  description?: string | string[];
  price?: string;
  cityName?: string | string[];
  image?: string;
  active?: any;
  comment?: String;
  mail?: String;
  rating?: Number;
  ID?: String;
  idFeedback?: String;
};

type activity = {
  where: object;
  data: {
    name: string;
    availability: any;
    description: string;
    price: number;
    active: any;
    image?: string;
    public_id_image?: string;
  };
  include?: object;
};

type postActivity = {
  data: {
    name: string;
    availability: any;
    description: string;
    price: number;
    image?: string;
    public_id_image?: string;
    city: {
      connect: {
        name?: string;
      };
    };
  };
  include?: object;
};

const uploadImage = async (image: string, name: string) => {
  let resp = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: CLOUDINARY_PRESET_ACTIVITIES,
      public_id: `${name}-image:${Date.now()}`,
      allowed_formats: ["png", "jpg", "jpeg", "jfif", "gif"],
    },
    function (error: any, result: any) {
      if (error) console.log(error);
    }
  );
  return resp;
};

const ActivitiesControles = {
  getActivitiesByName: async (query: query) => {
    let { byName } = query;
    if (byName) {
      let response = await prisma.activity.findMany({
        select: {
          id: true,
          name: true,
          availability: true,
          price: true,
          image: true,
          public_id_image: true,
          active: true,
          city: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    }
  },

  getActivities: async (query: query) => {
    let { wName, sort, sortBy, wCity, maxPrice } = query;
    let orderBy: typeSort[] = [];
    let sortfrom: typeSort = {};
    /**http://127.0.0.1:3000/api/activities?sort=asc&sortBy=price&wName=nadar&wCity=Dubai&maxPrice=60*/
    let sortName: string = sortBy ? sortBy.toString().toLowerCase() : "name";
    sortfrom[sortName] = sort ? sort.toString().toLowerCase() : "desc";
    orderBy.push(sortfrom);

    let condition: condition = {
      where: wName ? { name: { contains: wName.toString(), mode: 'insensitive' } } : {},
      include: {
        activitiesOnTrips: {
          include: { trip: true },
        },
        city: true,
        feedbacks: {
          select: {
            id: true,
            userMail: true,
            comment: true,
            rating: true,
            feedbackDate: true,
            User: {
              select: {
                name: true,
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy,
    };

    wCity
      ? (condition.where = {
          ...condition.where,
          city: { is: { name: { contains: wCity.toString(), mode: 'insensitive' } } },
        })
      : "";

    maxPrice
      ? (condition.where = {
          ...condition.where,
          price: { lte: parseFloat(maxPrice.toString()) },
        })
      : "";

    var responseG = await prisma.activity.findMany(condition);
    return responseG;
  },
  postActivity: async (body: body) => {
    /**Comprobar que existan los argumentos y que availability este en el enum*/
    try {
      let { name, availability, description, price, cityName, image } = body;
      if (!name || !availability || !description || !price || !cityName) {
        throw new Error("Missing data, try again");
      }
      let activity: postActivity = {
        data: {
          name: name.toString(),
          availability: availability,
          description: description.toString(),
          price: parseFloat(price),
          city: { connect: { name: cityName.toString() } },
        },
        include: { city: true },
      };

      if (image) {
        let uploadedImage = await uploadImage(image, name.toString());
        activity.data.image = uploadedImage.secure_url;
        activity.data.public_id_image = uploadedImage.public_id;
      } else {
        activity.data.image =
          "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";
        activity.data.public_id_image =
          "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";
      }
      var responseP = await prisma.activity.create(activity);
      return responseP;
    } catch (error) {
      return { status: "error", error };
    }
  },

  getActivity: async (query: query) => {
    let { id } = query;
    try {
      let response = await prisma.activity.findUnique({
        where: {
          id: id.toString(),
        },
        include: {
          activitiesOnTrips: {
            include: { trip: true },
          },
          city: true,
          feedbacks: {
            select: {
              id: true,
              userMail: true,
              comment: true,
              rating: true,
              feedbackDate: true,
              User: {
                select: {
                  name: true,
                  id: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  putActivity: async (body: body, query: query) => {
    let {
      name,
      image,
      availability,
      description,
      price,
      active,
      comment,
      rating,
    } = body;
    let { id, idFeedback } = query;
    try {
      /**Si no existe ningun valor retorna un error*/
      if (
        !name &&
        !image &&
        !availability &&
        !description &&
        !price &&
        !active &&
        !idFeedback &&
        !comment
      ) {
        throw new Error("Missing data, try again");
      }
      if (idFeedback) {
        await prisma.feedback.update({
          where: { id: idFeedback.toString() },
          data: { comment: comment.toString(), rating: Number(rating) },
        });
        return "Updated succefully";
      }
      let toUpActivity = await prisma.activity.findUnique({
        where: { id: id.toString() },
      });
      if (!toUpActivity) throw new Error("Activity not found, try again");
      let activity: activity = {
        where: {
          id: id.toString(),
        },
        data: {
          name: name ? name.toString() : toUpActivity.name,
          availability: availability ? availability : toUpActivity.availability,
          description: description
            ? description.toString()
            : toUpActivity.description,
          image: toUpActivity.image,
          public_id_image: toUpActivity.public_id_image,
          price: price ? parseFloat(price) : toUpActivity.price,
          active: active,
        },
        include: {
          activitiesOnTrips: {
            include: { trip: true },
          },
          city: true,
        },
      };

      if (image) {
        let uploadedImage = await uploadImage(
          image,
          name ? name.toString() : toUpActivity.name
        );
        activity.data.image = uploadedImage.secure_url;
        activity.data.public_id_image = uploadedImage.public_id;
      }

      if (active !== undefined) {
        let response = await prisma.activity.update(activity);
        return response;
      } else {
        delete activity.data.active;
        let response = await prisma.activity.update(activity);
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  deletActivity: async (query: query) => {
    let { id, idFeedback } = query;
    if (idFeedback) {
      await prisma.feedback.delete({
        where: { id: idFeedback.toString() },
      });
      return "The feedback was delete succefully";
    } else {
      let response = await prisma.activity.delete({
        where: { id: id.toString() },
      });
      await cloudinary.uploader.destroy(response.public_id_image);
      return response;
    }
  },
  patchActivity: async (body: body, query: query) => {
    let { id } = query;
    let { comment, mail, rating } = body;
    if (!comment && !rating) throw "Missing data";
    await prisma.feedback.create({
      data: {
        comment: comment.toString(),
        rating: Number(rating),
        activityId: id.toString(),
        userMail: mail.toString(),
      },
    });
    return "Feedback added";
  },
};
export default ActivitiesControles;

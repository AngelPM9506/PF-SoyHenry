import prisma from "src/utils/prisma";
import cloudinary from "src/utils/cloudinary";
import { User } from "src/utils/interface";
import { UserData } from "src/components/UserProfile";
import { Query } from "react-query";
const { CLOUDINARY_PRESET_ACTIVITIES } = process.env;
import { cloudinaryImg } from "src/utils/cloudinaryUpload";

type body = {
  name?: string;
  description?: string;
  mail?: string;
  avatar?: string;
  keyWords?: string;
  urlTikTok?: string;
  urlInstagram?: string;
  urlFaceBook?: string;
  isAdmin?: boolean;
  active?: boolean;
};

type query = { id?: string | string[] };

let usersControllers = {
  getUsers: async () => {
    const response = await prisma.user.findMany();
    // return response.length ? response : ["Not exist active users"];
    return response;
  },

  postUser: async (body: body) => {
    let { name, mail, avatar, description } = body;
    if (!name || !mail) return "Missing data, try again";

    if (mail === "admin@gmail.com") {
      const response = await prisma.user.create({
        data: {
          name: name,
          mail: mail,
          description: description,
          isAdmin: true,
        },
      });
      return response;
    } else {
      const response = await prisma.user.upsert({
        where: { mail: mail },
        update: {},
        create: {
          name: name,
          mail: mail,
          avatar: avatar,
          description: description,
        },
      });
      return response;
    }
  },

  getUser: async (query: query) => {
    let { id } = query;
    const response = await prisma.user.findUnique({
      where: { id: id.toString() },
      select: {
        id: true,
        name: true,
        avatar: true,
        description: true,
        keyWords: true,
        urlTikTok: true,
        urlInstagram: true,
        urlFaceBook: true,
        isAdmin: true,
        trips: true,
        useOnTrip: { select: { trip: true } },
        active: true,
      },
    });
    if (response.active) {
      return response;
    } else {
      return "Inactive user contact the admin";
    }
  },

  putUser: async (body: body) => {
    let {
      name,
      description,
      mail,
      avatar,
      keyWords,
      urlTikTok,
      urlInstagram,
      urlFaceBook,
      isAdmin,
      active,
    } = body;
    if (!name && !description && !mail) return "Missing data, try again";
    let user: UserData = {
      name,
      description,
      mail,
      avatar,
      urlTikTok,
      urlInstagram,
      urlFaceBook,
      keyWords,
      isAdmin,
      active,
    };

    const userInfo = await prisma.user.findUnique({
      where: { mail: mail },
    });
    let uploadImage = null;
    if (user.avatar) uploadImage = await cloudinaryImg(user);
    const response = await prisma.user.update({
      where: { mail: mail },
      data: {
        name: user.name,
        description: user.description,
        mail: user.mail,
        avatar: uploadImage ? uploadImage.secure_url : userInfo.avatar,
        urlTikTok: user.urlTikTok,
        urlInstagram: user.urlInstagram,
        urlFaceBook: user.urlFaceBook,
        keyWords: user.keyWords,
        isAdmin: user.isAdmin,
        active: user.active,
      },
    });
    console.log(response);
    if (response.active) {
      return response;
    } else {
      return "Inactive user contact the admin";
    }
  },

  deleteUser: async (query: query) => {
    let { id } = query;
    await prisma.user.update({
      where: { id: id?.toString() },
      data: { active: false },
    });
    return "Suspendeed acount";
  },

  searchUser: async (idTrip: string, idUser: string) => {
    const searchUser = await prisma.usersOnTrips.findFirst({
      where: {
        userid: idUser,
        tripId: idTrip,
      },
    });
    return searchUser ? true : false;
  },
};
export default usersControllers;

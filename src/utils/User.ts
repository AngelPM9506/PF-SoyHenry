import axios from "axios";
import { UserData } from "src/components/UserProfile";
export interface UserAuth0 {
  user?: {
    name?: string;
    email?: string;
    picture?: string;
    mail?: string;
    avatar?: string;
  };
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  description?: string;
}
export const getOrCreateUser = async (user: UserAuth0) => {
  const userDb: UserData = await axios.post("/api/users", {
    name: user.name,
    mail: user.email,
    avatar: user.picture,
    description: "",
  });

  return userDb;
};

export const getUsers = async () => {
  const userDb: UserData[] = await axios.get(
    "http://localhost:3000/api/users/"
  );

  return userDb.data;
};

export const updateUser = async (user: UserData) => {
  const userDb = await axios.put(`/api/users/:${user.mail}`, {
    name: user.name,
    mail: user.mail,
    avatar: user.avatar,
    description: user.description,
    urlTikTok: user.urlTikTok,
    urlFaceBook: user.urlFaceBook,
    urlInstagram: user.urlInstagram,
    keyWords: user.keyWords,
  });
  return userDb;
};

import axios from "axios";

export const getUserDetail = async (id: string) => {
  const res = await axios(`/users/${id}`);
  const profileDetail = await res.data;
  return profileDetail;
};

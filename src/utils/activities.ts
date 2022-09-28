import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Activity } from "./interface";
export const getActivities = async (
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string
) => {
  let urlGet = `/api/activities?`;
  sort ? (urlGet += `&sort=${sort}`) : "";
  wCity ? (urlGet += `&wCity=${wCity}`) : "";
  wName ? (urlGet += `&wName=${wName}`) : "";
  maxPrice ? (urlGet += `&maxPrice=${maxPrice}`) : "";
  sortBy ? (urlGet += `&sortBy=${sortBy}`) : "";
  const activities = await axios.get(urlGet);
  return activities.data;
};

export const getActivitiesId = async (
  id: QueryFunctionContext<string[], any>
) => {
  const activity = await axios.get(`/api/activities/${id}`);
  return activity.data;
};

export const createActivity = async ({
  name,
  image,
  cityName,
  availability,
  description,
  price,
}: Activity) => {
  try {
    const activity = await axios.post("/api/activities", {
      name,
      image,
      cityName,
      availability,
      description,
      price,
    });
    console.log(activity);
    console.log(activity.data);
    return activity.data;
  } catch (err) {
    console.error(err);
  }
};

export const editActivity = async ({
  id,
  name,
  image,
  availability,
  description,
  price,
  active,
}: Activity) => {
  const activity = await axios.put(`/api/activities/${id}`, {
    name,
    image,
    active,
    availability,
    description,
    price,
  });

  return activity.data;
};

export interface Props {
  comment: string;
  mail: string;
  rating: number;
  id: string;
}

export const patchActivity = async ({ comment, mail, rating, id }: Props) => {
  try {
    const commentRating = await axios.patch(`/api/activities/${id}`, {
      comment,
      mail,
      rating,
    });

    return commentRating.data;
  } catch (err) {
    console.error(err);
  }
};

export interface propsEdit {
  id: string;
  idFeedback: string;
  comment: string;
  rating: number;
}

export const editComment = async ({
  id,
  idFeedback,
  comment,
  rating,
}: propsEdit) => {
  const activity = await axios.put(
    `/api/activities/${id}?idFeedback=${idFeedback}`,
    {
      comment,
      rating,
    }
  );

  return activity.data;
};

export const deleteActivity = async (id: string) => {
  const activity = await axios.delete(`/api/activities/${id}`);

  return activity.data;
};

export const deleteComment = async ({ id, idFeedback }: any) => {
  const comment = await axios.delete(
    `/api/activities/${id}?idFeedback=${idFeedback}`
  );

  return comment.data;
};

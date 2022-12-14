import moment, { now } from "moment";
import { UserData } from "src/components/UserProfile";
import { Activity, Trip } from "src/utils/interface";
import { Errors } from "src/utils/interface";

export const validateName = (name: string) => {
  return /^(?=.{3,50}$)[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+$/.test(
    name
  );
};

export const oneKeyWord = (keyWord: string) => {
  return /^[a-zA-Z]{0,10}$/.test(keyWord);
};

export const validateImgUrl = (url: string) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const validateDescription = (description: string) => {
  return /^(?=.{3,1000}$)[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+$/.test(
    description
  );
};

export const validatePrice = (price: number) => {
  return /^[1-9]\d*(\.\d+)?$/.test(price.toString());
};

export const validateDates = (date: string) => {
  let result = moment(date, "YYYY-MM-DD").isValid();
  return result;
};

export const valActDateFormat = (date: string) => {
  let errors: Errors = {};
  if (!validateDates(date)) {
    errors.date = "Please, type a valid date";
  }
  return errors;
};

export const dateCompare = (initDate: string, endDate: string) => {
  const date1 = new Date(initDate);
  const date2 = new Date(endDate);
  if (date1 < date2) {
    return true;
  } else if (date1 > date2) {
    return false;
  } else {
    return true;
  }
};

export const formControl = (input: Trip, trips?: Trip[]) => {
  let errors: Errors = {};
  if (!input.name || input.name.length < 1) {
    errors.name = "Please, type a name for your trip";
  } else if (!validateName(input.name)) {
    errors.name = "Symbols are not allowed";
  } else if (
    trips?.find((t) => t.name.toLowerCase() === input.name?.toLowerCase())
  ) {
    errors.name = "There is already a trip with that name";
  } else if (!validateDates(input.initDate) || input.initDate.length === 0) {
    errors.initDate =
      "Please, select the right format of the date, can't be in the past";
  } else if (!validateDates(input.endDate) || input.endDate.length === 0) {
    errors.endDate = "Please, select the right format of the date";
  } else if (!dateCompare(input.initDate, input.endDate)) {
    errors.endDate = "The init date must be greater than the end date";
  } else if (!validateDescription) {
    errors.description = "Only 1000 characters are allowed";
  }
  return errors;
};

export const controlCities = (input: Trip) => {
  let errorCities: Errors = {};
  if (input.cities.length === 0) {
    errorCities.cities = "Please, select at least one city";
  }
  return errorCities;
};

export const controlActivities = (input: Trip) => {
  let errorActivities: Errors = {};
  if (input.activitiesName.length === 0) {
    errorActivities.activitiesName = " Please, select at least one activity";
  }
  return errorActivities;
};

export const formControlActivity = (
  input: Activity,
  activities: Activity[]
) => {
  let errors: Errors = {};
  if (!input.name.length) {
    errors.name = "Name is required";
  } else if (!validateName(input.name)) {
    errors.name =
      "Name has to be at least 3 characters long and cannot contain special characters";
  } else if (
    activities?.find((a) => a.name.toLowerCase() === input.name?.toLowerCase())
  ) {
    errors.name = "There is already an activity with that name";
  } else if (!validatePrice(input.price)) {
    errors.price = "Price has to be a number";
  } else if (!validateDescription) {
    errors.description = "Only 1000 characters are allowed";
  }
  return errors;
};

export const profileControl = (input: any) => {
  let errors: Errors = {};
  if (input.name === "") {
    errors.name = "Name is required";
  } else if (!validateName(input.name)) {
    errors.name =
      "Name has to be at least 3 characters long and cannot contain special characters";
  } else if (!validateDescription(input.description)) {
    errors.description = "Only 1000 characters are allowed";
  }
  return errors;
};

export const validateKeyWords = (keyWord: string) => {
  let errors: Errors = {};
  if (!oneKeyWord(keyWord)) {
    errors.keyWords = "Please, type one word per keyword";
  }
  return errors;
};

export const threeKeyWords = (keyWords: string[]) => {
  let errors: Errors = {};
  if (keyWords.length > 3) {
    errors.keyWords = "Please, only three interests are allowed";
  }
  return errors;
};

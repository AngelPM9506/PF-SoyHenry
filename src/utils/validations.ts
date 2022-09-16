import moment from "moment";
import { Trip } from "src/utils/interface";
import { Errors } from "src/utils/interface";

export const validateName = (name: string) => {
  return /^(?=.{3,50}$)[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+$/.test(
    name
  );
};

export const validateImgUrl = (url: string) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const validateDescription = (description: string) => {
  return /^(?=.{3,1000}$)[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s]+$/.test(
    description
  );
};

export const validateDates = (date: Date) => {
  let result = moment(date, "YYYY-MM-DD").isValid();
  return result;
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

export const formControl = (input: Trip, trips: Trip[]) => {
  let errors: Errors = {};
  if (!input.name || input.name.length < 1) {
    errors.name = "Please, type a name for your trip";
  } else if (!validateName(input.name)) {
    errors.name = "Symbols are not allowed";
  } else if (
    trips?.find((t) => t.name.toLowerCase() === input.name?.toLowerCase())
  ) {
    errors.name = "There is already a trip with that name";
  } else if (!validateImgUrl(input.image)) {
    errors.image = "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url";
  } else if (!validateDates(input.initDate)) {
    errors.initDate = "Please, select the right format of the date";
  } else if (!validateDates(input.initDate)) {
    errors.endDate = "Please, select the right format of the date";
  } else if (!dateCompare(input.initDate, input.endDate)) {
    errors.endDate = "The init date must be greater than the enn date";
  } else if (!validateDescription) {
    errors.description = "Only 1000 characters are allowed";
  }
  return errors;
};
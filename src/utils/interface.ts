export interface Trip {
  id?: String;
  name: String;
  initDate: String;
  cities?: String[];
  endDate: String;
  plannerId?: String;
  tripOnUser: Object[];
  description: String;
  image?: String;
  price: Number;
}

export interface User {
  name: String;
  mail: String;
  description: String;
}

export interface UserUpdate {
  name: String;
  description: String;
}

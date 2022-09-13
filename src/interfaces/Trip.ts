export interface Trip {
  id: String;
  name: String;
  initDate: string;
  endDate: string;
  planner: object;
  plannerId: String;
  tripOnUser: object[];
  description: String;
  image?: String;
  price: Number;
}

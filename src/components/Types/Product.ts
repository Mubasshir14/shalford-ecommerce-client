export enum Gender {
  Male = "male",
  Female = "female",
  Unisex = "unisex",
}

export enum Size {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum Color {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  BLACK = 'black',
  WHITE = 'white',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple',
  PINK = 'pink',
  BROWN = 'brown',
  GREY = 'grey',
}

export interface IProduct {
  name: string;
  description: string;
  images: string[];
  reviews: string[];
  category: string;
  gender: Gender;
  size: Size[];
  color: Color[];
  price: number;
  delPrice: number;
  stock: number;
  isFeatured: boolean;
  isOnSale: boolean;
  isActive: boolean;
}
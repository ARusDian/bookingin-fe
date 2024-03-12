export type AxiosErrorResponse = {
  status: string;
  code: number;
  message: string;
};

export type UserForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "user" | "partner";
};

export type HotelForm = {
  name: string,
  address: string, 
  description: string
}

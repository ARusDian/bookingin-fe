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
  name: string;
  address: string;
  description: string;
};

export type AirlineForm = HotelForm;

export interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
}

export type Room = {
  name: string;
  description: string;
};

export interface HotelWithRoom extends Hotel {
  rooms: Room[];
}

export interface HotelResponse {
  data: Hotel[];
  meta: {
    currentPage: number;
    items: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface HotelWithRoomResponse extends HotelResponse {
  id: number;
  user_id: number;
  name: string;
  address: string;
  description: string;
  created_at: string;
  updated_at: string;
  rooms: Room[];
}

export interface CreateHotelRoom {
  hotel_id: number;
  type_id: number | null;
  name: string;
  description: string;
}

export interface FacilityCreate {
  hotel_id: number;
  name: string;
  description: string;
}

export interface FacilityResponse extends FacilityCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface HotelTypeCreate {
  hotel_id: number;
  name: string;
  description: string;
  price: number;
  facilities: number[];
}

export interface TypeResponse extends HotelTypeCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

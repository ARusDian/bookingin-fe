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
  data: HotelWithRoom[];
}

export interface CreateHotelRoom {
  room: {
    name: string;
    description: string;
  };
  type: {
    hotel_id: number;
    name: string;
    description: string;
    price: number;
    facilities: number[];
  }
  facility: {
    hotel_id: number;
    name: string;
    description: string;
  }
}

export interface FacilityCreate {
  hotel_id: number;
  name: string;
  description: string;
}

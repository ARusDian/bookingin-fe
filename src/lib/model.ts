type Meta = {
  currentPage: number;
  items: number;
  totalItems: number;
  totalPages: number;
};

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
  id: number;
  hotel_id: number;
  name: string;
  description: string;
  type: {
    created_at: string;
    description: string;
    id: 2;
    name: "PREMIUM";
    price: 450000;
    updated_at: string;
  };
};

export type RoomResponse = {
  data: Room[];
  meta: Meta;
};

export interface HotelWithRoom extends Hotel {
  rooms: Room[];
}

export interface HotelResponse {
  data: Hotel[];
  meta: Meta;
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

export interface AirlineTypeResponse {
  data: AirlineType[];
  meta: Meta;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user?: {
    id: number;
    name: string;
  };
}

export interface HotelWithRoom extends Hotel {
  rooms: Room[];
}

export interface HotelResponse {
  data: Hotel[];
  meta: Meta;
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

export type Airline = {
  id: number;
  name: string;
  address: string;
  description: string;
  user?: {
    id: number;
    name: string;
  };
};

export type AirlineResponse = {
  data: Airline[];
  meta: Meta;
};

export type AirlinePlane = {
  id: number;
  airline_id: number;
  plane_type_id: number | null;
  name: string;
  description: string;
};

export type AirlinePlaneCreate = Omit<AirlinePlane, "id">;
export type AirlinePlaneEdit = Omit<AirlinePlane, "id" | "airline_id">;

export type AirlinePlaneResponse = {
  data: AirlinePlane[];
  meta: Meta;
};

export type AirlineTypeCreate = Omit<AirlinePlane, "id" | "plane_type_id">;

export type AirlineType = Omit<AirlinePlane, "plane_type_id">;

export interface AirlineTypeResponse {
  data: AirlineType[];
  meta: Meta;
}

export type PlaneSeat = {
  id: number;
  plane_id: number;
  available?: boolean;
  name: string;
  code?: string;
  user?: {
    id: number;
    name: string;
  };
};

export type PlaneSeatCreate = {
  plane_id: string;
  seat_line: string;
  start_number: number;
  end_number: number;
};

export type PlaneSeatResponse = {
  data: PlaneSeat[];
  meta: Meta;
};

export type PlaneFlight = {
  id: number;
  plane_id: number;
  last_check_in: string;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  arrival_airport: string;
  price: number;
};

export type PlaneFlightResponse = {
  data: PlaneFlight[];
  meta: Meta;
};

export type PlaneFlightCreate = Omit<PlaneFlight, "id">;

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "partner";
};

export type Transaction = {
  id: number;
  code: string;
  transaction_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
};

export type FlightTicket = Transaction & {
  plane_flight_id: number;
  plane_seat_id: number;
  deleted_at: null;
};

export type FlightTicketResponse = {
  data: FlightTicket[];
  meta: Meta;
};

export type RoomTransaction = Transaction & {
  hotel_id: number;
  room_id: number;
  room: Room;
  check_in: string;
  check_out: string;
};

export type RoomTransactionResponse = {
  data: RoomTransaction[];
  meta: Meta;
};

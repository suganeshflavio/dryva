import { locationDescType } from "./Location";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface StopLocation {
  latitude: number | undefined;
  longitude: number | undefined;
  location_desc: string | null;
}

export interface EstimateTripPayload {
  pickup: LatLng;
  drop: LatLng;
  is_round_trip: boolean;
  is_hourly: boolean;
  total_hours?: number | null;
  add_stop: StopLocation[];
}

export interface VehicleEstimate {
  vehicle_type_id: string;
  vehicle_name: string;
  icon_url: string;
  unit: string;
  distance: number;
  estimated_duration_minutes: number;
  total_amount: number;
  boundary_id: string | null;
  base_amount: number;
  time_amount: number;
}


export interface EstimateTripResponse {
  status: number;
  estimates: VehicleEstimate[];
  approximate_arrival_time: string;
  currency: string;
  message: string;
  error?: string;
}


export interface CardDetails {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'rupay' | 'discover' | string;
  last4: string;
  exp_month: number;
  exp_year: number;
  funding: 'credit' | 'debit' | 'prepaid' | string;
  is_default: boolean;
}

export interface CreateTripPayload {
  small_suitcase: string;
  large_suitcase: string;
  total_passengers: string;
  date_time: string;
  distance_units: string;
  est_distance: number;
  est_time: number;
  est_price: number;
  driver_mapping: string | null;
  is_round_trip: boolean;
  is_hourly: boolean;
  total_hours: number;
  payment_method_id: string | null;
  tz_str: string;
  tz_offset: number;
  vehicle_type_id: string;
  boundary_id: string | null;
  pickup: LatLng;
  drop: LatLng;
  add_stop: StopLocation[];
  location_description?: locationDescType;
}

// types/ride.ts
// export type RideStatus = 'Upcoming' | 'Completed' | 'Cancelled';

// export interface Ride {
//   bookingId: string;
//   vehicle: string;
//   dateTime: string;
//   pickup: string;
//   drop: string;
//   distance: string;
//   fare: number;
//   status: string;
// }


// app/Types/AddRide.ts
export interface Ride {
  id: string;
  bookingId: string;
  vehicle: string;
  dateTime: string;
  distance: string;
  fare: number;
  route_image_url?: string | null;
  status: string;
  passengers: number;
  isHourly: boolean;
  isRoundTrip: boolean;
  location_description: locationDescType | null;
}

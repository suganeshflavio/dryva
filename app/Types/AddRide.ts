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


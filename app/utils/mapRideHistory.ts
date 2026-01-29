// utils/mapRideHistory.ts
import { Ride } from '@/app/Types/AddRide';

export function mapRideHistory(apiResponse: any): {
  date: string;
  rides: Ride[];
}[] {
  return apiResponse.data.map((group: any) => ({
    date: group.date,
    rides: group.data.map((ride: any): Ride => ({
      id: ride._id,
      bookingId: ride.order_number,
      vehicle: ride.vehicle_type_name,
      dateTime: ride.date_time,
      distance: `${ride.est_distance} ${ride.distance_units}`,
      location_description: ride.location_description || null,
      fare: ride.est_price,
      status: ride.status,
      passengers: ride.total_passengers,
      isHourly: ride.is_hourly,
      isRoundTrip: ride.is_round_trip,
    })),
  }));
}

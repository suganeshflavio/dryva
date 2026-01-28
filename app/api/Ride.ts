import { CardDetails, EstimateTripPayload, EstimateTripResponse } from "@/app/Types/AddRide";
import { getHeaders } from "./Header";
import { log } from "console";

const url=process.env.NEXT_PUBLIC_API_BASE_URL


export async function EstimateRide(payload:EstimateTripPayload): Promise<EstimateTripResponse> {
  const res = await fetch(`${url}/dryva-passenger/dryva_passenger/estimate_trip`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

 const data: EstimateTripResponse = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to calculate estimate");
  }

  return data;
}

export async function GetStoreCard(): Promise<CardDetails[]> {
  const res = await fetch(`${url}/dryva-passenger/payment/get_stored_cards`, {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to fetch stored cards");
  }

  return data.cards as CardDetails[];
}

export async function CreateTrip() {
  const res = await fetch(`${url}/dryva-passenger/dryva_passenger/create_trip`, {
    method: 'POST',
    headers: getHeaders(),
    // body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to create trip");
  }
  return data;
}
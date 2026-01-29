import {
  CardDetails,
  CreateTripPayload,
  EstimateTripPayload,
  EstimateTripResponse,
} from "@/app/Types/AddRide";
import { getHeaders } from "./Header";
import { log } from "console";
import { TokenRefresh } from "./TokenValid";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function EstimateRide(
  payload: EstimateTripPayload,
): Promise<EstimateTripResponse> {
  const res = await fetch(
    `${url}/dryva-passenger/dryva_passenger/estimate_trip`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    },
  );

  const data: EstimateTripResponse = await res.json();

  if (!res.ok) {
    const errormsg =
      data.message || data.error || "Failed to calculate estimate";
    if (errormsg === "Invalid token" || errormsg === "Token expired") {
      TokenRefresh(errormsg);
    }
    throw new Error(errormsg);
  }

  return data;
}

export async function GetStoreCard(): Promise<CardDetails[]> {
  const res = await fetch(`${url}/dryva-passenger/payment/get_stored_cards`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    const errormsg =
      data.message || data.error || "Failed to fetch stored cards";
    if (errormsg === "Invalid token" || errormsg === "Token expired") {
      TokenRefresh(errormsg);
    }
    throw new Error(errormsg);
  }

  return data.cards as CardDetails[];
}

export async function CreateTrip(payload: CreateTripPayload) {
  const res = await fetch(
    `${url}/dryva-passenger/dryva_passenger/create_trip`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    const errormsg = data.message || data.error || "Failed to create trip";
    if (errormsg === "Invalid token" || errormsg === "Token expired") {
      TokenRefresh(errormsg);
    }
    throw new Error(errormsg);
  }
  return data;
}

export async function RideHistory() {
  const res = await fetch(
    `${url}/dryva-passenger/dryva_passenger/rides_with_payments`,
    {
      method: "GET",
      headers: getHeaders(),
      // body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    const errormsg =
      data.message || data.error || "Failed to fetch ride history";
    if (errormsg === "Invalid token" || errormsg === "Token expired") {
      TokenRefresh(errormsg);
    }
    throw new Error(errormsg);
  }
  return data;
}

export async function GetPassengerDetails() {
  const res = await fetch(
    `${url}/dryva-passenger/dryva_passenger/get_passenger`,
    {
      method: "GET",
      headers: getHeaders(),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    const errormsg =
      data.message || data.error || "Failed to fetch passenger details";
    if (errormsg === "Invalid token" || errormsg === "Token expired") {
      TokenRefresh(errormsg);
    }
    throw new Error(errormsg);
  }
  return data.data;
}

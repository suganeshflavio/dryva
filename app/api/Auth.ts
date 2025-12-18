const url=process.env.NEXT_PUBLIC_API_BASE_URL


export interface RegisterPassengerPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | undefined;
  flag_code: string | undefined;
  country_code: string;
  pickup: {
    lat: number;
    lng: number;
  };
}

export async function registerPassenger(
  payload: RegisterPassengerPayload
) {
    console.log("im in the api");

  const response = await fetch(
    `${url}/dryva-passenger/dryva_passenger/register_passenger`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
    console.log("im in the api");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Registration failed');
  }

  return response.json();
}

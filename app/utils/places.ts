

export const GetPlaceFromLatLng = async (lat: number, lng: number): Promise<string> => {
    try {
        const geocode=new google.maps.Geocoder();

        const response = await geocode.geocode({ location: { lat, lng } });

        if (!response.plus_code) {
        throw new Error("Failed to fetch place data");
        }
        const data = await response.results[0].formatted_address;
        return data || "Unknown Location";
    } catch (error) {
        console.error("Error fetching place from lat/lng:", error);
        return "Unknown Location";
    }
}
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

export const getLocationName = async (latitude: number, longitude: number) => {
  try {
    const url = `${NOMINATIM_URL}?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const address = data.display_name; // Use display_name for a more complete address
      console.log('Location name:', address);
      return data;
    } else {
      console.error('Error fetching location name:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting location name:', error);
    return null;
  }
};

// Define types for response objects
interface GooglePlacesResponse {
  predictions: Array<any>;
  status: string;
}

interface PlaceDetailsResponse {
  result: any;
  status: string;
}

interface GeocodeResponse {
  results: Array<any>;
  status: string;
}

interface NearbySearchResponse {
  results: Array<any>;
  status: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const googlePlacesApi = async (
  data: string,
  latLng?: any,
  countries: string[] = [] // Default to an empty array if not provided
): Promise<GooglePlacesResponse | undefined> => {
  try {
    // Create the country filter string based on the provided countries array
    const countryFilter = countries.length > 0 
      ? countries.map((country) => `country:${country}`).join('|')
      : '';

    // Construct the URL with the components parameter if countryFilter is not empty
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      data
    )}&location=${latLng}${countryFilter ? `&components=${countryFilter}` : ''}&key=${process.env.MAP_KEY}`;

    const res = await fetch(url, {
      method: 'GET',
    });

    const response: GooglePlacesResponse = await res.json();
    console.log('ressss', response);
    return response;
  } catch (e) {
    console.error('error in google place', e);
  }
};

export const getPlaceDetails = async (
  id: string,
  key?: string
): Promise<PlaceDetailsResponse | undefined> => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.MAP_KEY}`,
      {
        method: 'GET',
      }
    );
    const response: PlaceDetailsResponse = await res.json();
    return response;
  } catch (e) {
    console.error("error in google place", e);
  }
}

export const placesGeoCoding = async (
  lat: number,
  long: number,
): Promise<GeocodeResponse | undefined> => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.MAP_KEY}`,
      {
        method: 'GET',
      }
    );
    const response: GeocodeResponse = await res.json();
    return response;
  } catch (e) {
    console.error("error in google place", e);
  }
}

export const nearbySearch = async (
  latlng: string,
  type: string = "city",
  radius: number = 5000
): Promise<NearbySearchResponse | undefined> => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlng}&type=${type}&radius=${radius}&key=${process.env.MAP_KEY}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    const response: NearbySearchResponse = await res.json();
    return response;
  } catch (e) {
    console.error("error in google place", e);
  }
}

export const getNearByPlacesMarker = async (
  lat: number,
  long: number,
  radius: number,
  places: string,
): Promise<NearbySearchResponse | undefined> => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=${places}&keyword=cruise&key=${process.env.MAP_KEY}`,
      {
        method: 'GET',
      }
    );
    const response: NearbySearchResponse = await res.json();
    console.log(response, "response");
    return response;
  } catch (e) {
    console.error("error in google place", e);
  }
}

import { getGeocode, getLatLng } from "use-places-autocomplete";

export async function getLatLong(description: string) {
  const [result, ...res] = await getGeocode({ address: description });
  return getLatLng(result);
}
